/**
 * Door and window contacts, paired to rooms.
 *
 * An open window matters on exactly two kinds of card: the ones that spend
 * energy on the room's temperature. The pairing is by area, because that is
 * the one thing Home Assistant already knows and the user does not have to
 * repeat.
 *
 * Three details decide how this has to be written, all of them learned from a
 * real installation rather than guessed:
 *
 * 1. The entity registry's `area_id` is usually **null**: the area lives on
 *    the device and the entity inherits it. Reading only the entity record
 *    finds nothing.
 * 2. A car reports doors and windows too. Those entities sit in their own
 *    area and must never be counted as a room's window, so the pairing starts
 *    from the room and never from the sensor.
 * 3. Appliances report `door` and `opening` as well - a dishwasher door is not
 *    a draught. Only `window` counts by default; doors are opt-in.
 */

import { isUnavailable } from './entities.js';

/** Contacts the cards treat as a draught unless told otherwise. */
export const DEFAULT_OPENING_CLASSES = ['window'];

/**
 * How long a contact must have been open before it is worth a warning.
 *
 * Measured on a real installation: genuine airings run from 47 seconds to
 * several hours, so a long delay would hide the short ones. Half a minute is
 * enough to swallow contact bounce without losing a real opening.
 */
export const OPEN_DELAY_S = 30;

/** The area an entity belongs to, from the device when the entity has none. */
export function entityArea(hass, entityId) {
  const entry = hass?.entities?.[entityId];
  if (!entry) return null;
  if (entry.area_id) return entry.area_id;
  const device = entry.device_id ? hass.devices?.[entry.device_id] : null;
  return device?.area_id || null;
}

function secondsSince(stateObj) {
  const changed = stateObj?.last_changed;
  if (!changed) return null;
  const seconds = (Date.now() - new Date(changed).getTime()) / 1000;
  return Number.isFinite(seconds) ? Math.max(0, seconds) : null;
}

/**
 * Reads one contact.
 *
 * `openFor` comes from `last_changed`, which Home Assistant resets on a
 * restart and on the one-second false closures some contacts emit. Both make
 * the figure too small rather than too large, so a warning is late at worst,
 * never early.
 */
export function readOpening(hass, entityId) {
  const stateObj = hass?.states?.[entityId];
  const entry = hass?.entities?.[entityId];
  const deviceClass = stateObj?.attributes?.device_class || entry?.original_device_class || null;
  const name = stateObj?.attributes?.friendly_name || entityId;

  if (isUnavailable(stateObj)) {
    return { entityId, name, deviceClass, available: false, open: false, openFor: null };
  }

  const open = stateObj.state === 'on';
  return {
    entityId,
    name,
    deviceClass,
    available: true,
    open,
    openFor: open ? secondsSince(stateObj) : null,
  };
}

/**
 * The contacts belonging to one room.
 *
 * @param {object} options
 *   `areas` - area ids the room covers (usually one)
 *   `classes` - device classes that count; defaults to windows only
 *   `include` - extra entity ids, for contacts with no device and so no area
 *   `exclude` - entity ids to ignore, e.g. an interior door left open on purpose
 */
export function roomOpenings(hass, { areas = [], classes = DEFAULT_OPENING_CLASSES, include = [], exclude = [] } = {}) {
  const wanted = new Set(areas.filter(Boolean));
  const skip = new Set(exclude);
  const found = new Map();

  if (wanted.size) {
    for (const entityId of Object.keys(hass?.states || {})) {
      if (!entityId.startsWith('binary_sensor.') || skip.has(entityId)) continue;
      const stateObj = hass.states[entityId];
      const entry = hass.entities?.[entityId];
      const deviceClass = stateObj.attributes?.device_class || entry?.original_device_class;
      if (!classes.includes(deviceClass)) continue;
      const area = entityArea(hass, entityId);
      if (!area || !wanted.has(area)) continue;
      found.set(entityId, readOpening(hass, entityId));
    }
  }

  // contacts named explicitly: these may have no device, so no area at all
  for (const entityId of include) {
    if (skip.has(entityId) || found.has(entityId)) continue;
    if (!hass?.states?.[entityId]) continue;
    found.set(entityId, readOpening(hass, entityId));
  }

  return [...found.values()];
}

/** Summarises a room's contacts for the card. */
export function summariseOpenings(openings, openDelay = OPEN_DELAY_S) {
  const known = openings.filter((item) => item.available);
  const open = known.filter((item) => item.open);
  /* only a contact that has been open a while is worth saying out loud */
  const settled = open.filter((item) => (item.openFor ?? 0) >= openDelay);
  const longest = settled.reduce(
    (best, item) => ((item.openFor ?? 0) > (best?.openFor ?? -1) ? item : best),
    null,
  );
  return {
    total: openings.length,
    /** no contact in this room at all - the card must not imply "closed" */
    none: openings.length === 0,
    unavailable: openings.filter((item) => !item.available).length,
    open: open.length,
    /** open long enough to warn about */
    warn: settled.length > 0,
    longest,
    openFor: longest?.openFor ?? null,
  };
}

/**
 * How long a contact has been open, in words.
 *
 * Both cards that use this draw the same little "23 perce" label, so the
 * arithmetic lives here and only the two words come from the card's own
 * translations. Under a minute reads as one minute rather than "0", because
 * the warning delay already guarantees it has been open a while.
 */
export function openDuration(seconds, minuteLabel, hourLabel) {
  if (seconds === null || seconds === undefined) return '';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${Math.max(1, minutes)} ${minuteLabel}`;
  return `${Math.round(minutes / 60)} ${hourLabel}`;
}
