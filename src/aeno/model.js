/**
 * Turns `hass` into everything the AENO panel card draws.
 *
 * The panel is a simple device - on, off and a setpoint - so most of the work
 * here is deciding what is honestly knowable from whichever device profile the
 * heater matched. Two things are deliberate:
 *
 * - the demand signal is preferred, then the plug meter, then a comparison of
 *   the room against the setpoint; a card that claims "heating" because the
 *   room is cold would be guessing;
 * - the glow on the drawing follows the panel's measured surface temperature
 *   and not the demand, because a panel switched on a minute ago is not yet
 *   radiating anything.
 */

import {
  CONTINUOUS_PRESET,
  IDLE_POWER_W,
  MODE_KEYS,
  PANEL_TEMP_MAX,
  PRESETS,
  TEMP_RANGE,
  TEMP_TOLERANCE,
  WARMING_UP,
} from './const.js';
import {
  areaName,
  hasSeveral,
  isUnavailable,
  openingsFor,
  pickHeater,
  resolvePanel,
} from './entities.js';
import { entityArea, OPEN_DELAY_S, summariseOpenings } from '../shared/openings.js';

function num(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function text(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  return isUnavailable(stateObj) ? null : stateObj.state;
}

function unitOf(hass, entityId, fallback = '') {
  return hass?.states?.[entityId]?.attributes?.unit_of_measurement || fallback;
}

function friendlyName(hass, entityId) {
  return hass?.states?.[entityId]?.attributes?.friendly_name || '';
}

/**
 * The card's title.
 *
 * The area comes first on purpose: both panels are called "AENO Smart Heater",
 * so the room is the only thing that tells the two cards apart.
 */
function titleOf(hass, config, climateEntityId) {
  if (config?.name) return config.name;
  const area = areaName(hass, entityArea(hass, climateEntityId));
  if (area) return area;
  const deviceId = hass?.entities?.[climateEntityId]?.device_id;
  const device = deviceId ? hass.devices?.[deviceId] : null;
  return device?.name_by_user || device?.name || friendlyName(hass, climateEntityId) || climateEntityId;
}

/** How far up the 0-120 °C range the panel surface is, 0 to 1. */
function glowOf(panelTemp) {
  if (panelTemp === null) return null;
  return Math.max(0, Math.min(1, panelTemp / PANEL_TEMP_MAX));
}

/** Builds one panel. */
export function buildPanel(hass, climateEntityId, config = {}) {
  const stateObj = hass?.states?.[climateEntityId];
  if (!stateObj) return null;

  const entities = resolvePanel(hass, climateEntityId, config?.sources || {});
  const attrs = stateObj.attributes || {};
  const available = !isUnavailable(stateObj);
  const mode = stateObj.state;
  const on = available && mode !== 'off';

  const inside = attrs.current_temperature ?? null;
  const room = num(hass, entities.room);
  const measured = room ?? inside;
  const target = attrs.temperature ?? null;

  const presetModes = attrs.preset_modes || [];
  const presets = PRESETS.filter((preset) => presetModes.includes(preset.key)).map((preset) => ({
    ...preset,
    on: attrs.preset_mode === preset.key,
  }));
  const continuous = on && attrs.preset_mode === CONTINUOUS_PRESET;

  const power = num(hass, entities.power);
  const panelTemp = num(hass, entities.panel);

  /* The element is running when the device says so; failing that, when the
     meter sees the load. With neither, the setpoint is all there is - and that
     is a guess, so `heatingKnown` says which of the two the card is reading. */
  const action = on ? attrs.hvac_action || null : available ? 'off' : null;
  const heatingKnown = action !== null || power !== null;
  let heating;
  if (!on) heating = false;
  else if (action) heating = action === 'heating';
  else if (power !== null) heating = power >= IDLE_POWER_W;
  else heating = measured === null || target === null ? true : measured < target - TEMP_TOLERANCE;

  const limitState = hass?.states?.[entities.limit];
  const limit = limitState && !isUnavailable(limitState)
    ? {
        entityId: entities.limit,
        value: Number(limitState.state),
        min: limitState.attributes?.min ?? 60,
        max: limitState.attributes?.max ?? 120,
        step: limitState.attributes?.step ?? 5,
        unit: limitState.attributes?.unit_of_measurement || '°C',
      }
    : null;

  const lockState = hass?.states?.[entities.lock];
  const locked = lockState && !isUnavailable(lockState) ? lockState.state === 'locked' : null;

  const timerState = text(hass, entities.timer);
  const timer = {
    entityId: entities.timer,
    /* the countdown runs off plus 1 to 24 whole hours, and this device spells
       off as "cancel" where most Tuya heaters send "0h" */
    set: Boolean(timerState) && timerState !== 'cancel' && timerState !== 'off',
    label: timerState,
    remaining: num(hass, entities.remaining),
  };

  const openings =
    config.show_openings === false
      ? summariseOpenings([])
      : summariseOpenings(
          openingsFor(hass, climateEntityId, config),
          config.open_delay ?? OPEN_DELAY_S,
          { pairs: config.openings?.pairs, windows: config.openings?.windows },
        );

  return {
    entityId: climateEntityId,
    entities,
    name: titleOf(hass, config, climateEntityId),
    available,
    on,
    mode,
    modes: (attrs.hvac_modes || []).filter((item) => MODE_KEYS.includes(item)),
    action,
    heating,
    /** false when the card is inferring the element's state from the setpoint */
    heatingKnown,
    continuous,

    target,
    targetStep: attrs.target_temp_step || 1,
    minTemp: attrs.min_temp ?? TEMP_RANGE.min,
    maxTemp: attrs.max_temp ?? TEMP_RANGE.max,
    unit: hass?.config?.unit_system?.temperature || '°C',

    inside,
    room,
    measured,
    /** true when the number on the card comes from the user's own thermometer */
    external: room !== null,
    humidity: num(hass, entities.humidity),

    panelTemp,
    glow: glowOf(panelTemp),
    power,
    powerUnit: unitOf(hass, entities.power, 'W'),
    energy: num(hass, entities.energy),
    energyUnit: unitOf(hass, entities.energy, 'kWh'),

    presets,
    presetMode: attrs.preset_mode || null,
    locked,
    limit,
    timer,

    openings,
    /** heating a room whose window has been open a while */
    draughty: on && heating && openings.warn,
  };
}

/** Where the room sits relative to the target: below, at, or above. */
export function compare(panel) {
  if (panel.measured === null || panel.target === null) return null;
  const diff = panel.measured - panel.target;
  if (Math.abs(diff) < TEMP_TOLERANCE) return 'at';
  return diff > 0 ? 'above' : 'below';
}

/** The headline, as a translation key plus the values it needs. */
export function stateKey(panel) {
  if (!panel.available) return { key: 'state.unavailable' };
  if (!panel.on) return { key: 'state.off' };
  if (panel.continuous) return { key: 'state.continuous' };
  if (panel.target === null) return { key: panel.heating ? 'state.warming_up' : 'state.off' };

  const rel = compare(panel);
  if (panel.heating && rel !== 'above') return { key: 'state.heating_to', temp: panel.target };
  if (rel === 'above') return { key: 'state.above' };
  return { key: 'state.holding', temp: panel.target };
}

/**
 * The quieter line under the headline.
 *
 * It answers the question the headline raises. "Heating to 24" invites "how
 * far off is it", "holding 24" invites "is the element on" - and on a panel
 * that has only just started, the surface temperature is the honest answer to
 * both, because that is what the room will actually feel.
 */
export function subKey(panel) {
  if (!panel.available) return { key: 'sub.unavailable' };
  if (!panel.on) {
    return panel.target === null
      ? { key: 'sub.off_no_target' }
      : { key: 'sub.off', temp: panel.target };
  }
  /* nothing about the mode here: the alert strip already says what Constant
     means, and printing it twice wastes the one line that could say how far
     the room actually is from the setpoint */

  if (panel.panelTemp !== null && panel.heating && panel.glow !== null && panel.glow < WARMING_UP) {
    return { key: 'sub.panel_warming', temp: Math.round(panel.panelTemp) };
  }
  if (!panel.heating && panel.heatingKnown) return { key: 'sub.reached' };

  const rel = compare(panel);
  if (rel === null || rel === 'at') {
    return panel.panelTemp !== null
      ? { key: 'sub.panel_hot', temp: Math.round(panel.panelTemp) }
      : { key: '' };
  }
  const diff = Math.round(Math.abs(panel.measured - panel.target) * 10) / 10;
  return { key: rel === 'above' ? 'sub.above_by' : 'sub.below_by', diff };
}

/**
 * The card's model.
 *
 * `ok: false` carries a reason the card prints instead of drawing an empty
 * frame, so a mistyped entity says so rather than looking broken. With two
 * panels installed and neither named, the reason says exactly that - picking
 * one of them at random would put the wrong room on the dashboard.
 */
export function buildModel(hass, config) {
  const entityId = pickHeater(hass, config);
  if (!entityId) {
    return { ok: false, reason: hasSeveral(hass) ? 'many_entities' : 'no_entity' };
  }
  if (!hass?.states?.[entityId]) return { ok: false, reason: 'missing_entity' };

  const panel = buildPanel(hass, entityId, config);
  if (!panel) return { ok: false, reason: 'missing_entity' };
  return { ok: true, ...panel };
}
