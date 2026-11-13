/**
 * Entity resolution for the heating cards.
 *
 * Unlike the appliance cards there is no integration to ask: these entities
 * are helpers and template sensors a household creates itself. So the card
 * resolves by **naming convention plus config override** rather than from the
 * entity registry, and it ships no room names of its own - the room keys come
 * from the card config, which lives in the household's own dashboard.
 */

import { HOUSE_ENTITIES, LEARNED_SOURCES, ROOM_SUFFIXES } from './const.js';

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
      /* these name the function before the room, so they read as one series
         across the house rather than as each room's own sensor */
      ids.preheat = `sensor.${prefix}_elofutes_${key}`;
      ids.learning = `input_text.${prefix}_tanulas_${key}`;
      ids.trend = `sensor.${prefix}_trend_${key}`;
      /* what the logic learned about this radiator valve: how far its own
         reading sits from the room's */
      ids.offset = `input_number.${prefix}_szelep_eltolas_${key}`;
      /* the learned rate recomputed for the temperature difference that
         happens to be outside right now, and the room's own loss factor */
      ids.rate_now = `sensor.${prefix}_sebesseg_${key}`;
      ids.loss = `input_number.${prefix}_hoveszteseg_${key}`;
      ids.regression = `input_text.${prefix}_felfutes_regr_${key}`;

      /* the air conditioner that serves this room. Its name follows the
         Daikin integration, not the heating prefix, so it comes from the
         config; the card touches nothing on it but the flap. */
      if (room.ac) ids.ac = room.ac;

      /* humidity has no naming rule of its own - the sensors sit wherever
         the hardware put them - so it only exists when the config says so */
      if (room.humidity) ids.humidity = room.humidity;
      /* what the 24 hour sparkline charts; falls back to the measured
         temperature, and to the thermostat when that is all there is */
      if (room.history) ids.history = room.history;

      /* the room's own thermostat - a template climate entity the heating
         logic publishes. There is no naming rule for it, so it comes from
         the config; without one the card falls back to the helpers. */
      if (room.climate) ids.climate = room.climate;

      const parts = (room.parts || []).map((part) => ({
        key: part.key,
        name: part.name || part.key,
        comfortKey: part.comfort_key || part.key,
        humidity: part.humidity || null,
        entity: part.entity || build('sensor', prefix, key, part.key),
        /* a part can be left out of the zone value for a while - the kitchen
           while someone is cooking - and says so with its own flag */
        excluded: part.excluded || build('binary_sensor', prefix, key, `${part.key}_kizarva`),
      }));

      /* the learned heat-up rate per source, °C/h */
      const learned = {};
      for (const source of LEARNED_SOURCES) {
        learned[source] = room.learned?.[source] || `input_number.${prefix}_tanult_${key}_${source}`;
      }

      /* the comfort sensors are keyed by place, and a zone's parts have
         their own - so the key is configurable and defaults to the room's */
      const comfortKey = room.comfort_key || key;

      return {
        key,
        name: room.name || key,
        comfortKey,
        learnedIds: learned,
        readonly: Boolean(room.readonly),
        /* a room can follow its own weekly plan: the bathroom warms up for a
           shower and cools down again long before the rest of the house */
        scheduleEntity: room.schedule_entity || null,
        scheduleId: room.schedule_id || null,
        /* boost is a per-room thing: only rooms with something to boost get
           the button, so it never promises an action nothing answers */
        boost: room.boost,
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
