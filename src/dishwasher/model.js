/** Turns the raw `hass` object into the view model the card renders. */

import { PHASE_TO_STEP, PROGRAMS, STATE, STATE_ACCENT, OPTIONS } from './const.js';
import { isUnavailable, normaliseKey, resolveEntities } from './entities.js';

const PROGRESS_STORE = 'aeg-dishwasher-card:progress';

function num(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

/**
 * Remaining minutes. The Electrolux cloud reports seconds, the integration
 * usually converts to minutes - trust the unit when it is there, and fall back
 * to a magnitude check so both variants work.
 */
function remainingMinutes(stateObj) {
  const value = num(stateObj);
  if (value === null || value < 0) return null;
  const unit = (stateObj.attributes?.unit_of_measurement || '').toLowerCase();
  if (unit === 's' || unit === 'sec' || unit === 'seconds') return Math.round(value / 60);
  if (unit === 'h') return Math.round(value * 60);
  if (unit) return Math.round(value);
  return value > 1000 ? Math.round(value / 60) : Math.round(value);
}

const NO_ALERT = ['NONE', 'OFF', 'OK', '0', 'UNKNOWN', 'UNAVAILABLE'];

/**
 * Active alerts as `{ code, severity }`.
 *
 * The integration puts the *number* of alerts in the state and the codes in the
 * attributes: every code the appliance knows maps to `OFF`, an active one to
 * `"<severity>-<acknowledge status>"` (e.g. `WARNING-NOT_NEEDED`). Older
 * versions listed the codes in the state, which is still handled.
 */
function parseAlerts(stateObj) {
  if (isUnavailable(stateObj)) return [];
  const attributes = stateObj.attributes || {};

  const fromAttributes = Object.entries(attributes)
    .filter(([key, value]) => /^[A-Z][A-Z0-9_]*$/.test(key) && typeof value === 'string')
    .filter(([, value]) => !NO_ALERT.includes(normaliseKey(value).split('-')[0]))
    .map(([key, value]) => ({
      code: normaliseKey(key),
      severity: normaliseKey(String(value).split('-')[0]),
    }));
  if (fromAttributes.length) return fromAttributes;

  const raw = attributes.alerts ?? attributes.alert_list ?? stateObj.state;
  let list = [];
  if (Array.isArray(raw)) {
    list = raw.map((item) => (typeof item === 'string' ? item : item?.code));
  } else if (typeof raw === 'string' && !/^\d+$/.test(raw.trim())) {
    list = raw.split(/[,;]/);
  }
  const codes = list
    .map((item) => normaliseKey(item))
    .filter((item) => item && !NO_ALERT.includes(item))
    .map((code) => ({ code, severity: '' }));
  if (codes.length) return codes;

  // only a count is known: report that much rather than nothing
  const count = Number(stateObj.state);
  return Number.isFinite(count) && count > 0 ? [{ code: '', severity: '', count }] : [];
}

/**
 * The delayed-start number entity is minutes on some integration versions and
 * seconds on others (min -1, max 86400, step 60). Read the scale off the entity
 * instead of guessing, so both write the right value.
 */
function delayControl(stateObj) {
  if (!stateObj) return null;
  const attrs = stateObj.attributes || {};
  const unit = String(attrs.unit_of_measurement || '').toLowerCase();
  const max = Number.isFinite(attrs.max) ? attrs.max : 1440;
  const seconds = unit === 's' || unit === 'sec' || unit === 'seconds' || (!unit && max > 5000);
  const raw = num(stateObj);
  return {
    raw,
    seconds,
    step: Number.isFinite(attrs.step) ? attrs.step : seconds ? 60 : 1,
    min: Number.isFinite(attrs.min) ? attrs.min : -1,
    max,
    minutes: raw === null || raw <= 0 ? 0 : seconds ? Math.round(raw / 60) : raw,
  };
}

function readStore() {
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_STORE) || '{}');
  } catch (err) {
    return {};
  }
}

function writeStore(data) {
  try {
    window.localStorage.setItem(PROGRESS_STORE, JSON.stringify(data));
  } catch (err) {
    /* private mode - progress simply falls back to the nominal duration */
  }
}

/**
 * The appliance never reports a progress percentage, so the card derives one:
 * the longest remaining time seen during the current cycle (or the program's
 * nominal duration, whichever is larger) is treated as the cycle length.
 */
function cycleProgress(key, program, state, remaining) {
  const active = state === STATE.RUNNING || state === STATE.PAUSED;
  const store = readStore();
  const entry = store[key];

  if (!active) {
    if (entry && state !== STATE.DELAYED_START) {
      delete store[key];
      writeStore(store);
    }
    return { progress: state === STATE.END_OF_CYCLE ? 1 : 0, total: null };
  }
  if (remaining === null) return { progress: 0, total: null };

  const nominal = PROGRAMS[program]?.duration || 0;
  const sameCycle = entry && entry.program === program;
  const total = Math.max(remaining, nominal, sameCycle ? entry.total : 0);

  if (!sameCycle || total !== entry.total) {
    store[key] = { program, total };
    writeStore(store);
  }
  return { progress: total ? Math.min(1, Math.max(0, 1 - remaining / total)) : 0, total };
}

/**
 * A select entity that is really an on/off setting (e.g. the floor projection
 * or the end-of-cycle sound). `offKeys` names the options that mean "off".
 */
function toggleSelect(stateObj, offKeys) {
  if (isUnavailable(stateObj)) return null;
  const options = stateObj.attributes?.options || [];
  const isOff = (label) => offKeys.includes(normaliseKey(label));
  const offOption = options.find(isOff) || null;
  const onOption = options.find((label) => !isOff(label)) || null;
  if (!offOption || !onOption) return null;
  return { on: !isOff(stateObj.state), onOption, offOption };
}

/**
 * A select entity whose options are numbered levels ("Display Light 0" ...
 * "Display Light 9"), presented as a stepper.
 */
function levelSelect(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const level = (label) => {
    const match = String(label).match(/(\d+)\s*$/);
    return match ? Number(match[1]) : null;
  };
  const levels = (stateObj.attributes?.options || [])
    .map((label) => ({ label, value: level(label) }))
    .filter((item) => item.value !== null)
    .sort((a, b) => a.value - b.value);
  if (!levels.length) return null;
  const current = levels.find((item) => item.label === stateObj.state);
  return {
    levels,
    value: current ? current.value : level(stateObj.state),
    min: levels[0].value,
    max: levels[levels.length - 1].value,
  };
}

export function buildModel(hass, config) {
  const entities = resolveEntities(hass, config);
  const get = (key) => (entities[key] ? hass.states[entities[key]] : undefined);

  const applianceState = get('appliance_state');
  if (!entities.prefix || !applianceState) {
    return { ok: false, reason: entities.prefix ? 'unavailable' : 'not_configured', entities };
  }

  const state = normaliseKey(applianceState.state) in STATE
    ? normaliseKey(applianceState.state)
    : STATE.UNKNOWN;

  const programEntity = get('program');
  const program = normaliseKey(programEntity?.state);
  const programKey = PROGRAMS[program] ? program : null;

  const phaseRaw = normaliseKey(get('cycle_phase')?.state) || 'UNAVAILABLE';
  const step = PHASE_TO_STEP[phaseRaw] || null;

  const remaining = remainingMinutes(get('time_to_end'));
  const { progress } = cycleProgress(entities.prefix, programKey, state, remaining);

  const delayEntity = delayControl(get('start_time'));
  const delay = delayEntity ? delayEntity.minutes : 0;

  const doorEntity = get('door_state');
  const doorOpen = doorEntity ? doorEntity.state === 'on' : null;

  const connectivityEntity = get('connectivity');
  const online = connectivityEntity ? connectivityEntity.state === 'on' : true;

  const remote = normaliseKey(get('remote_control')?.state);
  const remoteEnabled = remote === '' || remote.includes('ENABLED');

  /**
   * How long until the dishes are done, in minutes.
   *
   * The appliance reports `timeToEnd` for the selected program even while it is
   * only waiting to be started, and that value already accounts for the chosen
   * options - so it is preferred over the program's nominal duration from the
   * manual, which is the fallback. With a delayed start the appliance normally
   * counts the delay into `timeToEnd` as well; when it does not, delay plus
   * program duration is the next best estimate.
   */
  const programMinutes = PROGRAMS[programKey]?.duration || 0;
  const reported = remaining !== null && remaining > 0 ? remaining : null;

  let minutesToFinish = null;
  if (state === STATE.RUNNING || state === STATE.PAUSED) {
    minutesToFinish = remaining;
  } else if (state === STATE.DELAYED_START) {
    minutesToFinish =
      reported !== null && reported > delay ? reported : programMinutes ? delay + programMinutes : null;
  } else if (state === STATE.IDLE || state === STATE.READY_TO_START) {
    // not started yet: the estimate assumes the cycle begins now, or after the
    // delay when one is already dialled in
    const cycle = reported !== null ? reported : programMinutes || null;
    minutesToFinish = cycle === null ? null : cycle + delay;
  }

  const finishAt =
    minutesToFinish !== null ? new Date(Date.now() + minutesToFinish * 60000) : null;
  const startAt = delay ? new Date(Date.now() + delay * 60000) : null;

  const options = OPTIONS.map((option) => {
    const entityId = entities.options?.[option.entity];
    const stateObj = entityId ? hass.states[entityId] : undefined;
    return {
      ...option,
      entityId,
      on: stateObj?.state === 'on',
      exists: Boolean(stateObj),
      supported: !option.programs || !programKey || option.programs.includes(programKey),
    };
  }).filter((option) => option.exists);

  const programOptions = (programEntity?.attributes?.options || []).map((label) => ({
    label,
    key: normaliseKey(label),
  }));

  return {
    ok: true,
    entities,
    state,
    accent: STATE_ACCENT[state] || 'idle',
    phase: phaseRaw,
    step,
    program: programKey,
    programRaw: programEntity?.state || null,
    programOptions,
    remaining,
    minutesToFinish,
    progress,
    finishAt,
    startAt,
    delay,
    delayControl: delayEntity,
    delayEntity: entities.start_time,
    doorOpen,
    online,
    remote,
    remoteEnabled,
    alerts: parseAlerts(get('alerts')),
    scores: {
      eco: num(get('eco_score')),
      energy: num(get('energy_score')),
      water: num(get('water_score')),
    },
    cycles: num(get('total_cycle_counter')),
    linkQuality: normaliseKey(get('link_quality')?.state),
    ecoMode: get('eco_mode')?.state === 'on',
    rinseAid: num(get('rinse_aid_level')),
    waterHardness: get('water_hardness')?.state || null,
    // appliance settings that the card exposes as chips and a stepper
    settings: {
      brightness: levelSelect(get('display_light')),
      floorLight: toggleSelect(get('display_on_floor'), ['OFF']),
      endSound: toggleSelect(get('end_of_cycle_sound'), ['NO_SOUND', 'OFF']),
      keyTone: entities.key_tone ? { on: get('key_tone')?.state === 'on' } : null,
    },
    options,
    name:
      config.name ||
      applianceState.attributes?.friendly_name?.replace(/\s*Appliance state$/i, '') ||
      null,
  };
}
