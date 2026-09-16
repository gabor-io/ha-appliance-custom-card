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

function parseAlerts(stateObj) {
  if (isUnavailable(stateObj)) return [];
  const raw = stateObj.attributes?.alerts ?? stateObj.attributes?.alert_list ?? stateObj.state;
  let list = [];
  if (Array.isArray(raw)) {
    list = raw.map((item) => (typeof item === 'string' ? item : item?.code));
  } else if (typeof raw === 'string') {
    list = raw.split(/[,;]/);
  }
  return list
    .map((item) => normaliseKey(item))
    .filter((item) => item && !['NONE', 'OFF', 'OK', '0', 'UNKNOWN', 'UNAVAILABLE'].includes(item));
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

  const delayRaw = num(get('start_time'));
  const delay = delayRaw !== null && delayRaw > 0 ? delayRaw : 0;

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
    // not started yet: the estimate assumes the cycle begins now
    minutesToFinish = reported !== null ? reported : programMinutes || null;
  }

  const finishAt =
    minutesToFinish !== null ? new Date(Date.now() + minutesToFinish * 60000) : null;
  const startAt = state === STATE.DELAYED_START && delay ? new Date(Date.now() + delay * 60000) : null;

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
    options,
    name:
      config.name ||
      applianceState.attributes?.friendly_name?.replace(/\s*Appliance state$/i, '') ||
      null,
  };
}
