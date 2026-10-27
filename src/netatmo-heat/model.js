/**
 * Turns `hass` into everything the Netatmo heating card draws.
 *
 * Two things here are not obvious and both were found on a live system:
 *
 * - `heating_power_request` is reported by the **valves** and not by the
 *   thermostat, so a room with a thermostat has no percentage at all. The
 *   missing key is not zero; treating it as zero would leave that room dark
 *   while it is heating. The fallback is `hvac_action`.
 * - A room whose valve has gone quiet keeps its climate entity but loses
 *   every attribute. It is neither heating nor idle, and the card has to say
 *   so rather than show a plausible-looking zero.
 */

import { BATTERY_CRITICAL, BATTERY_WARN, MODE_KEYS } from './const.js';
import {
  entityArea,
  findScheduleSelect,
  isUnavailable,
  listRoomEntities,
  openingsFor,
  roomBatteries,
  roomName,
  roomsForDevice,
} from './entities.js';
import { summariseOpenings, OPEN_DELAY_S } from '../shared/openings.js';

function num(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

/** One heated room. */
export function buildRoom(hass, entityId, config) {
  const stateObj = hass?.states?.[entityId];
  if (!stateObj) return null;

  const attrs = stateObj.attributes || {};
  const area = entityArea(hass, entityId);
  const available = !isUnavailable(stateObj);

  /* the key is absent on thermostats - distinguish that from a real zero */
  const hasRequest = Object.prototype.hasOwnProperty.call(attrs, 'heating_power_request');
  const request = hasRequest ? Number(attrs.heating_power_request) : null;
  const heating = available
    ? hasRequest
      ? request > 0
      : attrs.hvac_action === 'heating'
    : false;

  const heads = config?.show_batteries === false ? [] : roomBatteries(hass, area);
  const openings =
    config?.show_openings === false ? [] : openingsFor(hass, area, config, entityId);

  return {
    entityId,
    area,
    name: config?.rooms?.[entityId]?.name || roomName(hass, entityId, area),
    available,
    mode: stateObj.state,
    action: attrs.hvac_action || null,
    preset: attrs.preset_mode || null,
    boost: attrs.preset_mode === 'boost',
    current: attrs.current_temperature ?? null,
    target: attrs.temperature ?? null,
    minTemp: attrs.min_temp ?? 7,
    maxTemp: attrs.max_temp ?? 30,
    step: attrs.target_temp_step ?? 0.5,
    schedule: attrs.selected_schedule || null,
    /** null when the device never reports it, a number when it does */
    request: hasRequest ? request : null,
    heating,
    canTurnOff: (attrs.hvac_modes || []).includes('off'),
    heads,
    openings: summariseOpenings(openings, config?.open_delay ?? OPEN_DELAY_S, {
      pairs: config?.openings?.pairs,
      windows: config?.openings?.windows,
    }),
  };
}

/** The house mode: Netatmo sets the same preset on every room. */
function housePreset(rooms) {
  const presets = rooms
    .filter((room) => room.available && room.preset && MODE_KEYS.includes(room.preset))
    .map((room) => room.preset);
  if (!presets.length) return 'schedule';
  return [...new Set(presets)].sort(
    (a, b) => presets.filter((p) => p === b).length - presets.filter((p) => p === a).length,
  )[0];
}

/**
 * The rooms the card is about, and whether the user picked just one.
 *
 * `entity` and `device` both narrow to a single room; `entities` takes a
 * list. Nothing at all means the whole house. The visual editor writes
 * `device`, which used to be ignored here - the picker was in the editor
 * and did nothing.
 */
function targetRooms(hass, config) {
  if (config?.entity) return { ids: [config.entity], picked: true };
  if (config?.device) {
    const ids = roomsForDevice(hass, config.device);
    if (ids.length) return { ids, picked: true };
  }
  if (config?.entities?.length) return { ids: config.entities, picked: true };
  return { ids: listRoomEntities(hass), picked: false };
}

export function buildModel(hass, config) {
  const { ids, picked } = targetRooms(hass, config);
  if (!ids.length) return { ok: false, reason: 'no_entity' };

  const rooms = ids.map((id) => buildRoom(hass, id, config)).filter(Boolean);
  if (!rooms.length) return { ok: false, reason: 'no_entity' };

  const selectId = config?.schedule_entity || findScheduleSelect(hass);
  const selectState = selectId ? hass?.states?.[selectId] : null;
  const live = rooms.filter((room) => room.available);
  const heating = rooms.filter((room) => room.heating);

  /* the frost-guard and away setpoints are the same on every room, so one
     room is enough to name them */
  const reference = live[0] || rooms[0];

  const heads = rooms.flatMap((room) =>
    room.heads.map((head) => ({ ...head, room: room.name })),
  );

  /* one room, asked for by name: the card drops the house-wide furniture
     and becomes a room card. `view` forces it either way. */
  const single =
    config?.view === 'room' ||
    (config?.view !== 'house' && picked && rooms.length === 1);

  return {
    ok: true,
    single,
    room: rooms[0],
    rooms,
    heating: heating.length,
    mode: housePreset(rooms),
    schedule: {
      entityId: selectId,
      current: selectState && !isUnavailable(selectState) ? selectState.state : null,
      options: selectState?.attributes?.options || [],
    },
    setpoint: reference?.target ?? null,
    outside: num(hass, config?.sources?.outside),
    outsideStale: isStale(hass, config?.sources?.outside_connectivity),
    heads,
    batteryLow: heads.filter(
      (head) => head.battery !== null && head.battery <= BATTERY_WARN,
    ),
    batteryCritical: heads.filter(
      (head) => head.battery !== null && head.battery <= BATTERY_CRITICAL,
    ),
    batterySilent: heads.filter((head) => head.battery === null).length,
    dead: rooms.filter((room) => !room.available),
    /* a window open in a room that is actually heating is the only opening
       worth interrupting someone for */
    draughty: rooms.filter((room) => room.heating && room.openings.warn),
  };
}

/**
 * Whether a reading should be treated as stale.
 *
 * A module that drops off the radio keeps its last value instead of going
 * unavailable, so the only honest signal is its connectivity entity.
 */
export function isStale(hass, connectivityEntityId) {
  if (!connectivityEntityId) return false;
  const stateObj = hass?.states?.[connectivityEntityId];
  if (!stateObj) return false;
  return stateObj.state === 'off';
}
