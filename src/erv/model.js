/** Turns the raw `hass` object into the view model the ventilator card renders. */

import { CO2_BANDS, CO2_MIN_PPM, FILTER_WARN_DAYS, PM25_BANDS, PRESETS, SPEEDS } from './const.js';
import { isUnavailable, resolveEntities } from './entities.js';

function num(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

/**
 * Reading plus the air-quality band it falls into.
 *
 * `measuring: false` says the number arrived but is not a measurement. It
 * keeps its row on the card - the reader should see that the appliance has a
 * CO2 sensor and that it is saying nothing - but gets no band and no meter,
 * because there is nothing to grade.
 */
function reading(stateObj, bands, measuring = true) {
  if (!stateObj || isUnavailable(stateObj)) return null;
  const value = num(stateObj);
  if (value === null) return null;
  const unit = stateObj.attributes?.unit_of_measurement || '';
  if (!measuring) return { value, unit, level: null, ratio: 0, measuring: false };

  const band = bands.find((entry) => value <= entry.max) || bands[bands.length - 1];
  const worst = bands[bands.length - 2]?.max || 1;
  return {
    value,
    unit,
    level: band.level,
    // how far along the scale the reading sits, for the meter
    ratio: Math.max(0, Math.min(1, value / worst)),
    measuring: true,
  };
}

/** Number entity plus the bounds it advertises. */
function control(stateObj) {
  if (!stateObj || isUnavailable(stateObj)) return null;
  const attrs = stateObj.attributes || {};
  return {
    value: num(stateObj),
    min: Number.isFinite(attrs.min) ? attrs.min : 1,
    max: Number.isFinite(attrs.max) ? attrs.max : 8,
    step: Number.isFinite(attrs.step) && attrs.step > 0 ? attrs.step : 1,
  };
}

function applianceName(hass, config, entities) {
  if (config?.name) return config.name;
  const device = entities.device ? hass.devices?.[entities.device] : null;
  if (device) return device.name_by_user || device.name;
  return hass.states[entities.fan]?.attributes?.friendly_name || null;
}

/** The model badge, skipped when it only repeats the appliance name. */
function applianceModel(hass, config, entities, name) {
  if (config?.subtitle !== undefined) return config.subtitle || null;
  const device = entities.device ? hass.devices?.[entities.device] : null;
  if (!device) return null;
  const lower = (name || '').toLowerCase();
  const candidates = [device.model_id, device.model].filter(Boolean);
  return candidates.find((value) => !lower.includes(String(value).toLowerCase())) || null;
}

export function buildModel(hass, config) {
  const entities = resolveEntities(hass, config);
  const get = (entityId) => (entityId ? hass.states[entityId] : undefined);

  const fanState = get(entities.fan);
  if (!fanState) {
    return {
      ok: false,
      reason: entities.device || entities.prefix ? 'unavailable' : 'not_configured',
      entities,
    };
  }

  /* An unreachable appliance keeps its fan entity and reports `unavailable`.
     Treating that as "not running" makes the card say the unit is switched
     off, which reads as "someone turned it off" rather than "the house has
     lost the appliance" - the opposite of useful when the device has
     dropped off the network. */
  const available = !isUnavailable(fanState);
  const on = available && fanState.state === 'on';
  const presetOption = fanState.attributes?.preset_mode || null;
  const presetOptions = Array.isArray(fanState.attributes?.preset_modes)
    ? fanState.attributes.preset_modes
    : [];
  const preset = PRESETS.find((entry) => entry.option === presetOption) || null;

  const speeds = {};
  for (const { key } of SPEEDS) {
    const entityId = entities[key];
    speeds[key] = entityId ? { entityId, ...(control(get(entityId)) || {}) } : null;
  }

  const filterDays = num(get(entities.filter_life));
  const lifespanState = get(entities.filter_lifespan);
  const problemState = get(entities.problem);

  /* The air sensors only sample while air is moving: switched off the
     appliance reports 0 ppm and 0 µg/m³, and a room's CO2 cannot be zero - it
     never goes below the ~420 ppm of outdoor air. Grading that as "excellent"
     would have the card say the most reassuring thing it has at exactly the
     moment it knows nothing about the air. Dust can honestly read zero on a
     running unit with a fresh filter, so only the stopped case is discounted
     there. */
  const co2Value = num(get(entities.co2));
  const pm25Value = num(get(entities.pm25));
  const co2 = reading(get(entities.co2), CO2_BANDS, co2Value === null || co2Value >= CO2_MIN_PPM);
  const pm25 = reading(get(entities.pm25), PM25_BANDS, on || pm25Value === null || pm25Value > 0);

  return {
    ok: true,
    entities,
    available,
    name: applianceName(hass, config, entities),
    model: applianceModel(hass, config, entities, applianceName(hass, config, entities)),
    on,
    preset,
    presetOption,
    presetOptions,
    co2,
    pm25,
    temperature: num(get(entities.temperature)),
    temperatureUnit: get(entities.temperature)?.attributes?.unit_of_measurement || '°C',
    humidity: num(get(entities.humidity)),
    speeds,
    // the display digit of the unit follows the supply fan
    speedDigit: speeds.supply?.value ?? speeds.exhaust?.value ?? null,
    filter: {
      days: filterDays,
      entityId: entities.filter_life,
      due: filterDays !== null && filterDays <= FILTER_WARN_DAYS,
      lifespan: lifespanState
        ? {
            entityId: entities.filter_lifespan,
            state: lifespanState.state,
            options: Array.isArray(lifespanState.attributes?.options)
              ? lifespanState.attributes.options
              : [],
          }
        : null,
      reset: entities.filter_reset || null,
    },
    problem: problemState
      ? {
          entityId: entities.problem,
          on: problemState.state === 'on',
          code: problemState.attributes?.fault_code ?? null,
        }
      : null,
    extra: (entities.extra || []).map((entityId) => ({
      entityId,
      name: hass.states[entityId]?.attributes?.friendly_name || entityId,
      state: hass.states[entityId]?.state,
    })),
  };
}
