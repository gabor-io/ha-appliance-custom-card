/**
 * Entity resolution for the heating cards.
 *
 * Unlike the appliance cards there is no integration to ask: these entities
 * are helpers and template sensors a household creates itself. So the card
 * resolves by **naming convention plus config override** rather than from the
 * entity registry, and it ships no room names of its own - the room keys come
 * from the card config, which lives in the household's own dashboard.
 */

import { HOUSE_ENTITIES, ROOM_SUFFIXES } from './const.js';

export const DEFAULT_PREFIX = 'futes';

/** The house-wide entity map, with `entities:` from the config layered on. */
export function houseEntities(config) {
  return { ...HOUSE_ENTITIES, ...(config?.entities || {}) };
}

/** `sensor.futes_room_1_homerseklet` */
function build(domain, prefix, room, suffix) {
  return `${domain}.${prefix}_${room}_${suffix}`;
}

/**
 * Normalises the `rooms:` list.
 *
 * A room is `{ key, name }` at its simplest. `parts` turns it into a zone of
 * several sensors, `readonly` into a measured-only place (an unheated hall),
 * and `entities` overrides any id individually.
 */
export function listRooms(config) {
  const prefix = config?.prefix || DEFAULT_PREFIX;
  return (config?.rooms || [])
    .filter((room) => room && (room.key || room.entity))
    .map((room) => {
      const key = room.key || room.name || '';
      const ids = {};
      for (const [role, [domain, suffix]] of Object.entries(ROOM_SUFFIXES)) {
        if (!suffix) continue;
        ids[role] = build(domain, prefix, key, suffix);
      }
      /* the pre-heat sensor names the function before the room, so it reads
         as one series across the house rather than as a room's own sensor */
      ids.preheat = `sensor.${prefix}_elofutes_${key}`;

      const parts = (room.parts || []).map((part) => ({
        key: part.key,
        name: part.name || part.key,
        entity: part.entity || build('sensor', prefix, key, part.key),
        /* a part can be left out of the zone value for a while - the kitchen
           while someone is cooking - and says so with its own flag */
        excluded: part.excluded || build('binary_sensor', prefix, key, `${part.key}_kizarva`),
      }));

      return {
        key,
        name: room.name || key,
        readonly: Boolean(room.readonly),
        parts,
        entities: { ...ids, ...(room.entities || {}) },
      };
    });
}

/** `input_number.futes_zona_komfort_room_1` / `input_number.hutes_zona_…` */
export function zoneTempEntity(config, season, zone, roomKey) {
  const base =
    season === 'hutes'
      ? config?.cool_prefix || 'input_number.hutes_zona'
      : config?.heat_prefix || 'input_number.futes_zona';
  return `${base}_${zone}_${roomKey}`;
}

export function stateObj(hass, entityId) {
  return entityId ? hass?.states?.[entityId] : undefined;
}

export function stateOf(hass, entityId) {
  return stateObj(hass, entityId)?.state;
}

export function isUnavailable(state) {
  return state === undefined || state === null || state === 'unavailable' || state === 'unknown';
}

/** A number, or null for anything Home Assistant cannot turn into one. */
export function num(hass, entityId) {
  const raw = stateOf(hass, entityId);
  if (isUnavailable(raw)) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function isOn(hass, entityId) {
  return stateOf(hass, entityId) === 'on';
}

/** The options of an `input_select`, for the segmented controls. */
export function optionsOf(hass, entityId) {
  const attrs = stateObj(hass, entityId)?.attributes;
  return Array.isArray(attrs?.options) ? attrs.options : [];
}

/** A timestamp sensor or `input_datetime`, as a `Date`. */
export function timeOf(hass, entityId) {
  const obj = stateObj(hass, entityId);
  if (!obj || isUnavailable(obj.state)) return null;
  const raw = obj.attributes?.timestamp
    ? obj.attributes.timestamp * 1000
    : Date.parse(obj.state);
  const date = new Date(raw);
  return Number.isFinite(date.getTime()) ? date : null;
}

/** Whole minutes since `date`, or null. */
export function minutesSince(date) {
  if (!date) return null;
  return Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
}
