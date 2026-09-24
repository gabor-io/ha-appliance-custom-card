/** Turns the raw `hass` object into the view model the fridge card renders. */

import { AT_TARGET_TOLERANCE, DEVICE_SWITCHES, ZONE_SELECTS, ZONE_SWITCHES } from './const.js';
import { isUnavailable, resolveEntities } from './entities.js';

function num(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function isOn(stateObj) {
  if (isUnavailable(stateObj)) return null;
  return stateObj.state === 'on';
}

/** Number entity plus the bounds the appliance advertises. */
function control(stateObj) {
  if (!stateObj || isUnavailable(stateObj)) return null;
  const attrs = stateObj.attributes || {};
  return {
    value: num(stateObj),
    min: Number.isFinite(attrs.min) ? attrs.min : 2,
    max: Number.isFinite(attrs.max) ? attrs.max : 9,
    step: Number.isFinite(attrs.step) && attrs.step > 0 ? attrs.step : 1,
    unit: attrs.unit_of_measurement || '°C',
  };
}

function select(stateObj) {
  if (!stateObj || isUnavailable(stateObj)) return null;
  const options = stateObj.attributes?.options;
  return {
    state: stateObj.state,
    options: Array.isArray(options) ? options : [],
  };
}

function applianceName(hass, config, entities) {
  if (config?.name) return config.name;
  const device = entities.device ? hass.devices?.[entities.device] : null;
  if (device) return device.name_by_user || device.name;
  const anchor = entities.zones[0]?.temp ? hass.states[entities.zones[0].temp] : null;
  return anchor?.attributes?.friendly_name || null;
}

/** "Rd 5000-150 2" from the device registry: the model badge in the header. */
function applianceModel(hass, config, entities) {
  if (config?.subtitle !== undefined) return config.subtitle || null;
  const device = entities.device ? hass.devices?.[entities.device] : null;
  if (!device) return null;
  return device.model_id || device.model || null;
}

export function buildModel(hass, config) {
  const entities = resolveEntities(hass, config);
  const get = (entityId) => (entityId ? hass.states[entityId] : undefined);

  if (!entities.zones.length) {
    return {
      ok: false,
      reason: entities.device || entities.prefix ? 'unavailable' : 'not_configured',
      entities,
    };
  }

  const zones = entities.zones.map((zone, index) => {
    const setpoint = control(get(zone.setpoint));
    const current = num(get(zone.temp));
    const unit = get(zone.temp)?.attributes?.unit_of_measurement || setpoint?.unit || '°C';
    const target = setpoint?.value ?? null;

    const switches = {};
    for (const key of Object.keys(ZONE_SWITCHES)) {
      switches[key] = zone[key] ? { entityId: zone[key], on: isOn(get(zone[key])) } : null;
    }
    const selects = {};
    for (const key of Object.keys(ZONE_SELECTS)) {
      selects[key] = zone[key] ? { entityId: zone[key], ...select(get(zone[key])) } : null;
    }

    return {
      index,
      position: zone.position,
      entityIds: zone,
      current,
      target,
      unit,
      setpoint,
      switches,
      selects,
      autodoor: zone.autodoor ? { entityId: zone.autodoor, state: get(zone.autodoor)?.state } : null,
      // the appliance is warmer than asked while it is still pulling down
      warming: current !== null && target !== null ? current - target > AT_TARGET_TOLERANCE : false,
      atTarget:
        current !== null && target !== null ? Math.abs(current - target) <= AT_TARGET_TOLERANCE : null,
    };
  });

  const modes = {};
  for (const key of Object.keys(DEVICE_SWITCHES)) {
    modes[key] = entities[key] ? { entityId: entities[key], on: isOn(get(entities[key])) } : null;
  }

  const lightState = get(entities.light);
  const boosting = zones.some((zone) => zone.switches.supercool?.on || zone.switches.superfrost?.on);

  return {
    ok: true,
    entities,
    name: applianceName(hass, config, entities),
    model: applianceModel(hass, config, entities),
    zones,
    modes,
    light: lightState
      ? {
          entityId: entities.light,
          on: isOn(lightState),
          brightness: lightState.attributes?.brightness ?? null,
        }
      : null,
    boosting,
    nightMode: modes.nightmode?.on === true,
    partyMode: modes.partymode?.on === true,
    cooling: boosting || zones.some((zone) => zone.warming),
    extra: (entities.extra || []).map((entityId) => ({
      entityId,
      name: hass.states[entityId]?.attributes?.friendly_name || entityId,
      state: hass.states[entityId]?.state,
    })),
  };
}
