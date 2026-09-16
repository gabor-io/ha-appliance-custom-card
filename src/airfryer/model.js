/** Turns the raw `hass` object into the view model the airfryer card renders. */

import {
  ACTIVE_STATUSES,
  COUNTDOWN_STATUSES,
  METHODS,
  RANGES,
  STATUS,
  STATUS_ACCENT,
  STEAM_METHODS,
} from './const.js';
import { isUnavailable, normaliseKey, resolveEntities } from './entities.js';

function num(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

/** Seconds, whatever unit the duration sensor reports in. */
function seconds(stateObj) {
  const value = num(stateObj);
  if (value === null || value < 0) return null;
  const unit = (stateObj.attributes?.unit_of_measurement || 's').toLowerCase();
  if (unit === 'min' || unit === 'm') return Math.round(value * 60);
  if (unit === 'h') return Math.round(value * 3600);
  return Math.round(value);
}

/** Number entity plus the bounds it advertises, falling back to the manual's. */
function control(stateObj, fallback) {
  if (!stateObj) return null;
  const attrs = stateObj.attributes || {};
  return {
    value: num(stateObj),
    min: Number.isFinite(attrs.min) ? attrs.min : fallback.min,
    max: Number.isFinite(attrs.max) ? attrs.max : fallback.max,
    step: Number.isFinite(attrs.step) ? attrs.step : fallback.step,
    unit: attrs.unit_of_measurement || '',
  };
}

function options(stateObj) {
  const list = stateObj?.attributes?.options;
  return Array.isArray(list) ? list : [];
}

function isSet(stateObj) {
  return stateObj?.state === 'on';
}

/** Anything that is not a plain zero / "none" counts as a reported error. */
function errorCode(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const raw = String(stateObj.state).trim();
  if (!raw || raw === '0' || /^(none|no|off|ok)$/i.test(raw)) return null;
  return raw;
}

export function buildModel(hass, config) {
  const entities = resolveEntities(hass, config);
  const get = (key) => (entities[key] ? hass.states[entities[key]] : undefined);

  const statusEntity = get('status');
  if (!entities.prefix || !statusEntity) {
    return { ok: false, reason: entities.prefix ? 'unavailable' : 'not_configured', entities };
  }

  const rawStatus = normaliseKey(statusEntity.state);
  const status = rawStatus in STATUS ? rawStatus : STATUS.UNKNOWN;

  const methodEntity = get('sel_method');
  const methodKey = normaliseKey(methodEntity?.state);
  const method = METHODS[methodKey] ? methodKey : null;

  const remaining = seconds(get('remaining'));
  const total = seconds(get('total_time'));
  const active = ACTIVE_STATUSES.includes(status);
  const counting = COUNTDOWN_STATUSES.includes(status);
  const progress =
    counting && remaining !== null && total
      ? Math.min(1, Math.max(0, 1 - remaining / total))
      : status === STATUS.FINISH
        ? 1
        : 0;

  const currentTemp = num(get('current_temp'));
  const targetTemp = num(get('target_temp'));
  const tempUnit = get('current_temp')?.attributes?.unit_of_measurement || '°C';

  const probePlugged = get('probe_unplugged') ? !isSet(get('probe_unplugged')) : false;
  const probeCurrent = num(get('probe_current'));
  const probeTarget = num(get('probe_target'));

  const drawerEntity = get('drawer');
  const drawerOpen = drawerEntity ? isSet(drawerEntity) : null;

  // only a running cycle has a meaningful finish clock
  const finishAt =
    active && remaining !== null && remaining > 0 ? new Date(Date.now() + remaining * 1000) : null;

  const recipe = get('recipe')?.state;
  const keepWarm = get('keep_warm_status')?.state;
  const preheatStatus = get('preheat_status')?.state;

  return {
    ok: true,
    entities,
    status,
    accent: STATUS_ACCENT[status] || 'idle',
    power: get('power') ? isSet(get('power')) : status !== STATUS.STANDBY,
    method,
    methodRaw: methodEntity?.state || null,
    methodOptions: options(methodEntity).map((label) => ({ label, key: normaliseKey(label) })),
    presetOptions: options(get('sel_preset')),
    presetSelected: get('sel_preset')?.state || null,
    autocookSelected: get('sel_autocook')?.state || null,
    steam: STEAM_METHODS.includes(method),
    remaining,
    total,
    progress,
    finishAt,
    currentTemp,
    targetTemp,
    tempUnit,
    heating: active && currentTemp !== null && targetTemp ? currentTemp < targetTemp - 2 : false,
    probe: {
      plugged: probePlugged,
      required: isSet(get('probe_required')),
      current: probeCurrent,
      target: probeTarget,
      progress:
        probePlugged && probeCurrent !== null && probeTarget
          ? Math.min(1, Math.max(0, probeCurrent / probeTarget))
          : 0,
    },
    drawerOpen,
    shake: isSet(get('shake')),
    flip: isSet(get('flip')),
    resting: isSet(get('resting')),
    preheatActive: isSet(get('preheat_active')),
    preheatStatus: preheatStatus && !isUnavailable(get('preheat_status')) ? preheatStatus : null,
    preheatEnabled: get('sw_preheat') ? isSet(get('sw_preheat')) : null,
    keepWarm: keepWarm && !isUnavailable(get('keep_warm_status')) ? keepWarm : null,
    recipe: recipe && !isUnavailable(get('recipe')) && recipe !== 'unknown' ? recipe : null,
    stage: num(get('stage')),
    voltage: num(get('voltage')),
    error: errorCode(get('error')),
    controls: {
      temperature: control(get('num_temp'), RANGES.temperature),
      time: control(get('num_time'), RANGES.time),
      airspeed: control(get('num_airspeed'), RANGES.airspeed),
      probe: control(get('num_probe'), RANGES.probe),
    },
    airspeed: num(get('airspeed')),
    name:
      config.name ||
      statusEntity.attributes?.friendly_name?.replace(/\s*Cooking Status$/i, '') ||
      null,
  };
}
