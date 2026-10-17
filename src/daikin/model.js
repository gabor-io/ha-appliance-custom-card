/**
 * Turns `hass` into everything the Daikin card draws.
 *
 * Two shapes come out of here: a single unit, and a group that carries its
 * members as units of the same shape. The card renders one or the other, but
 * the per-unit controls are identical in both.
 */

import {
  CONDITIONING_MODES,
  FAN_ORDER,
  IDLE_POWER_W,
  MODE_KEYS,
  PRESETS,
  SAFE_SWING_MODES,
  TEMP_TOLERANCE,
} from './const.js';
import { groupMembers, isUnavailable, openingsFor, pickClimate, resolveUnit } from './entities.js';
import { OPEN_DELAY_S, summariseOpenings } from '../shared/openings.js';

function num(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function unitOf(hass, entityId, fallback = '') {
  return hass?.states?.[entityId]?.attributes?.unit_of_measurement || fallback;
}

function friendlyName(hass, entityId) {
  return hass?.states?.[entityId]?.attributes?.friendly_name || '';
}

/** Orders fan modes low to high where we recognise them, else as given. */
function sortFanModes(modes) {
  const rank = (mode) => {
    const index = FAN_ORDER.indexOf(String(mode).toLowerCase());
    return index === -1 ? FAN_ORDER.length : index;
  };
  return [...modes].sort((a, b) => rank(a) - rank(b));
}

/**
 * Builds one unit.
 *
 * @param {object} sources entity ids the user pointed at this unit
 * @param {object} config the card config, for the display options
 */
export function buildUnit(hass, climateEntityId, sources = {}, config = {}) {
  const stateObj = hass?.states?.[climateEntityId];
  if (!stateObj) return null;

  const entities = resolveUnit(hass, climateEntityId, sources);
  const attrs = stateObj.attributes || {};
  const mode = stateObj.state;
  const on = mode !== 'off' && !isUnavailable(stateObj);

  const inside = num(hass, entities.inside) ?? (attrs.current_temperature ?? null);
  const room = num(hass, entities.room);
  const measured = room ?? inside;
  const target = attrs.temperature ?? null;

  const swingModes = (attrs.swing_modes || []).filter((swing) =>
    config.show_all_swing ? true : SAFE_SWING_MODES.includes(String(swing).toLowerCase()),
  );

  const presetModes = attrs.preset_modes || [];
  const presets = PRESETS.filter((preset) => presetModes.includes(preset.key)).map((preset) => ({
    ...preset,
    on: attrs.preset_mode === preset.key,
  }));

  const power = num(hass, entities.power);

  /* the per-unit openings block wins over the card-wide one, so a group can
     name the contacts of one member without repeating the rest */
  const openings =
    config.show_openings === false
      ? summariseOpenings([])
      : summariseOpenings(
          openingsFor(hass, climateEntityId, {
            openings: { ...(config.openings || {}), ...(sources.openings || {}) },
          }),
          config.open_delay ?? OPEN_DELAY_S,
        );

  return {
    entityId: climateEntityId,
    entities,
    name: sources.name || friendlyName(hass, climateEntityId) || climateEntityId,
    available: !isUnavailable(stateObj),
    on,
    mode,
    action: attrs.hvac_action || null,
    modes: (attrs.hvac_modes || []).filter((item) => MODE_KEYS.includes(item)),

    target,
    targetStep: attrs.target_temp_step || 1,
    minTemp: attrs.min_temp ?? 16,
    maxTemp: attrs.max_temp ?? 32,
    unit: hass?.config?.unit_system?.temperature || '°C',

    inside,
    room,
    measured,
    /** true when the number on the card comes from the user's own thermometer */
    external: room !== null,
    outside: num(hass, entities.outside),
    humidity: num(hass, entities.humidity),
    power,
    powerUnit: unitOf(hass, entities.power, 'W'),
    energy: num(hass, entities.energy),
    energyUnit: unitOf(hass, entities.energy, 'kWh'),

    fanModes: sortFanModes(attrs.fan_modes || []),
    fanMode: attrs.fan_mode || null,
    swingModes,
    swingMode: attrs.swing_mode || null,
    /** the flap moves unless swing is explicitly off */
    swinging: Boolean(attrs.swing_mode) && String(attrs.swing_mode).toLowerCase() !== 'off',
    presets,
    presetMode: attrs.preset_mode || null,
    away: attrs.preset_mode === 'away',

    /** the plug meter knows whether the compressor is actually working */
    idle:
      on && power !== null
        ? power < IDLE_POWER_W
        : on && attrs.hvac_action === 'idle',

    openings,
    /** conditioning the room while a window has been open a while */
    draughty: on && CONDITIONING_MODES.includes(mode) && openings.warn,
  };
}

/** Where the room sits relative to the target: below, at, or above. */
export function compare(unit) {
  if (unit.measured === null || unit.target === null) return null;
  const diff = unit.measured - unit.target;
  if (Math.abs(diff) < TEMP_TOLERANCE) return 'at';
  return diff > 0 ? 'above' : 'below';
}

/** The headline, as a translation key plus the values it needs. */
export function stateKey(unit) {
  if (!unit.available) return { key: 'state.unavailable' };
  if (!unit.on) return { key: 'state.standby' };
  if (unit.mode === 'dry') return { key: 'state.drying' };
  if (unit.mode === 'fan_only') return { key: 'state.fan_only' };

  const rel = compare(unit);
  if (rel === 'at' || rel === null) return { key: 'state.holding', target: unit.target };
  if (unit.mode === 'heat') {
    return rel === 'below'
      ? { key: 'state.heating_to', target: unit.target }
      : { key: 'state.above_target' };
  }
  if (unit.mode === 'cool') {
    return rel === 'above'
      ? { key: 'state.cooling_to', target: unit.target }
      : { key: 'state.below_target' };
  }
  return { key: 'state.holding', target: unit.target };
}

/** The quieter line under the headline. */
export function subKey(unit) {
  if (!unit.available) return { key: 'sub.unavailable' };
  if (!unit.on) return { key: 'sub.last_target', target: unit.target };
  if (unit.idle && unit.power !== null) return { key: 'sub.compressor_idle_power', power: unit.power };
  if (unit.idle) return { key: 'sub.compressor_idle' };

  const rel = compare(unit);
  if (rel === null) return { key: '' };
  if (rel === 'at') return { key: 'sub.reached' };
  const diff = Math.round(Math.abs(unit.measured - unit.target) * 10) / 10;
  return { key: rel === 'above' ? 'sub.above_by' : 'sub.below_by', diff };
}

function mean(values) {
  const usable = values.filter((value) => value !== null && Number.isFinite(value));
  if (!usable.length) return null;
  return usable.reduce((sum, value) => sum + value, 0) / usable.length;
}

/**
 * Builds the group.
 *
 * The numbers follow what `climate_group` itself reports: the target and the
 * measured temperature are means over every member, the mode is the most
 * common one that is not `off`. `mixed` says the members disagree, and the
 * card uses it to avoid pretending they are in step.
 */
export function buildGroup(hass, entityId, members, config) {
  const unitConfigs = config?.units || {};
  const units = members
    .map((id) => buildUnit(hass, id, unitConfigs[id] || {}, config))
    .filter(Boolean);

  const stateObj = hass?.states?.[entityId];
  const attrs = stateObj?.attributes || {};
  const running = units.filter((unit) => unit.on);
  const modes = running.map((unit) => unit.mode);
  const commonest = modes.length
    ? [...new Set(modes)].sort(
        (a, b) => modes.filter((m) => m === b).length - modes.filter((m) => m === a).length,
      )[0]
    : 'off';

  const powers = units.map((unit) => unit.power).filter((value) => value !== null);

  return {
    isGroup: true,
    entityId,
    name: config?.name || friendlyName(hass, entityId) || entityId,
    available: !isUnavailable(stateObj),
    units,
    running: running.length,
    total: units.length,
    on: running.length > 0,
    mode: attrs.hvac_mode || (stateObj?.state !== 'off' ? stateObj?.state : null) || commonest,
    mixed:
      new Set(units.map((unit) => (unit.on ? unit.mode : 'off'))).size > 1 ||
      new Set(units.map((unit) => unit.target)).size > 1,
    modes: (attrs.hvac_modes || []).filter((item) => MODE_KEYS.includes(item)),
    target: attrs.temperature ?? mean(units.map((unit) => unit.target)),
    targetStep: attrs.target_temp_step || 1,
    minTemp: attrs.min_temp ?? 16,
    maxTemp: attrs.max_temp ?? 32,
    unit: hass?.config?.unit_system?.temperature || '°C',
    measured: mean(units.map((unit) => unit.measured)),
    draughty: units.filter((unit) => unit.draughty),
    outside: units.map((unit) => unit.outside).find((value) => value !== null) ?? null,
    power: powers.length ? powers.reduce((sum, value) => sum + value, 0) : null,
    powerUnit: 'W',
  };
}

/**
 * The card's model.
 *
 * `ok: false` carries a reason the card prints instead of drawing an empty
 * frame, so a mistyped entity says so rather than looking broken.
 */
export function buildModel(hass, config) {
  const entityId = pickClimate(hass, config);
  if (!entityId) return { ok: false, reason: 'no_entity' };
  if (!hass?.states?.[entityId]) return { ok: false, reason: 'missing_entity' };

  const members = groupMembers(hass, entityId);
  if (members.length) {
    const group = buildGroup(hass, entityId, members, config);
    return group.units.length ? { ok: true, ...group } : { ok: false, reason: 'empty_group' };
  }

  const unit = buildUnit(hass, entityId, config?.sources || {}, config);
  if (!unit) return { ok: false, reason: 'missing_entity' };
  return { ok: true, isGroup: false, ...unit, name: config?.name || unit.name };
}
