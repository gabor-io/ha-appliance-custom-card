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

/**
 * Suffix pairs that mean "two contacts, one tilt-and-turn window".
 *
 * A bukó-nyíló window often carries a contact at the top of the sash and
 * another at the bottom. They are not two windows, and the difference
 * between them is the whole point:
 *
 * - the sash pivots on its bottom edge when tilted, so the **top** contact
 *   opens and the bottom one stays shut - the window is on the latch;
 * - swung fully open, the sash leaves the frame everywhere, so **both**
 *   contacts open.
 *
 * The first suffix of each pair is the top contact. Object ids are
 * slugified, so the Hungarian pair loses its accents here.
 */
export const DEFAULT_OPENING_PAIRS = [
  ['top', 'bottom'],
  ['felso', 'also'],
  ['upper', 'lower'],
];

/** Trailing words a contact's object id may carry after the position. */
const TAIL = /_(contact|sensor|nyitas|allapot|state)$/;

function objectId(entityId) {
  return entityId.includes('.') ? entityId.slice(entityId.indexOf('.') + 1) : entityId;
}

/**
 * Splits a contact's object id into the window it belongs to and its role.
 *
 * The position word is looked for **anywhere** in the id, not only at the
 * end. On a real installation the ids run
 * `<room>_window_top_sensor_<which window>_contact`: the position sits in
 * the middle and the last word says which of the room's windows it is.
 * Matching only a suffix pairs nothing there, and every contact ends up
 * counted as a window of its own.
 *
 * The word has to be a whole underscore-delimited segment, so `laptop` and
 * `rooftop` are not positions. The base is the id with that one segment
 * taken out, which is what makes the two contacts of one sash meet:
 *
 *   bedroom_window_top_sensor_street     -> bedroom_window_sensor_street
 *   bedroom_window_bottom_sensor_street  -> bedroom_window_sensor_street
 *
 * and keeps a different window of the same room apart, because its last
 * segment differs (`..._garden`).
 *
 * Returns null when the id carries no position word at all, which is the
 * ordinary case of one contact per window.
 */
function splitPosition(entityId, pairs) {
  const id = objectId(entityId).replace(TAIL, '');
  for (const [top, bottom] of pairs) {
    for (const [word, role] of [[top, 'top'], [bottom, 'bottom']]) {
      /* a whole segment: `_top_` in the middle, or `_top` at the end */
      const match = new RegExp(`_${word}(?=_|$)`, 'g');
      let last = null;
      for (let hit = match.exec(id); hit; hit = match.exec(id)) last = hit;
      if (!last) continue;
      const base = id.slice(0, last.index) + id.slice(last.index + last[0].length);
      if (base) return { base, role, word };
    }
  }
  return null;
}

/** Drops diacritics, so `felső` in a name matches `felso` in an object id. */
function fold(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Strips the position word out of a friendly name, so the pair reads as one.
 *
 * The word is taken out wherever it sits, for the same reason the id is
 * matched that way: "Bedroom window top sensor street" has it in the
 * middle. Folding drops the accents, because the word comes from the
 * slugified object id - `felső` arrives here as `felso`.
 */
function windowName(parts) {
  const first = parts[0];
  const word = first.position?.word;
  if (!word) return first.name;

  /* split on the same separators a name uses, then drop the matching word */
  const pieces = first.name.split(/([\s_-]+)/);
  const kept = pieces.filter((piece, index) => !(index % 2 === 0 && fold(piece) === fold(word)));
  const stripped = kept.join('').replace(/[\s_-]{2,}/g, ' ').trim().replace(/[\s_-]+$/, '');
  return stripped || first.name;
}

/**
 * Groups contacts into windows and works out what each window is doing.
 *
 * @param {object} options
 *   `pairs`   - suffix pairs to detect, top first; see DEFAULT_OPENING_PAIRS
 *   `windows` - explicit grouping, `{ name: [topEntity, bottomEntity] }`, for
 *               contacts whose ids follow no convention at all
 */
export function groupOpenings(openings, { pairs = DEFAULT_OPENING_PAIRS, windows = {} } = {}) {
  const byId = new Map(openings.map((item) => [item.entityId, item]));
  const groups = [];
  const used = new Set();

  // hand-written pairs first: they win over anything the ids suggest
  for (const [name, ids] of Object.entries(windows)) {
    const parts = (Array.isArray(ids) ? ids : [ids])
      .map((id, index) => {
        const item = byId.get(id);
        return item ? { ...item, position: { role: index === 0 ? 'top' : 'bottom' } } : null;
      })
      .filter(Boolean);
    if (!parts.length) continue;
    for (const part of parts) used.add(part.entityId);
    groups.push({ key: name, name, parts });
  }

  const byBase = new Map();
  for (const item of openings) {
    if (used.has(item.entityId)) continue;
    const position = splitPosition(item.entityId, pairs);
    if (!position) {
      groups.push({ key: item.entityId, name: item.name, parts: [{ ...item, position: null }] });
      continue;
    }
    if (!byBase.has(position.base)) byBase.set(position.base, []);
    byBase.get(position.base).push({ ...item, position });
  }

  for (const [base, parts] of byBase) {
    /* top first, so the name is stripped from the right part and a lone
       bottom contact still reads sensibly */
    const rank = (part) => (part.position.role === 'top' ? 0 : 1);
    parts.sort((a, b) => rank(a) - rank(b));
    groups.push({ key: base, name: windowName(parts), parts });
  }

  /* a stable order, so a room's windows do not swap places between
     updates just because one of them was regrouped */
  return groups.map(describeWindow).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * One window's state, from its contacts.
 *
 * Tilt can only be *told apart* when both contacts exist: a lone top contact
 * that is open could be either, so the card says "open" rather than guess.
 * A bottom contact open on its own is not a shape the hardware makes - a
 * magnet has slipped, or the sash is fully open with a dead top contact - so
 * it counts as open too.
 */
function describeWindow(group) {
  const parts = group.parts;
  const known = parts.filter((part) => part.available);
  const top = parts.find((part) => part.position?.role === 'top');
  const bottom = parts.find((part) => part.position?.role === 'bottom');
  const paired = Boolean(top && bottom && top.available && bottom.available);

  const openParts = known.filter((part) => part.open);
  const openFor = openParts.reduce(
    (longest, part) => ((part.openFor ?? 0) > longest ? part.openFor : longest),
    0,
  );

  let state = 'closed';
  if (!known.length) state = 'unavailable';
  else if (paired && top.open && !bottom.open) state = 'tilted';
  else if (openParts.length) state = 'open';

  return {
    ...group,
    /** `closed` | `tilted` | `open` | `unavailable` */
    state,
    available: known.length > 0,
    open: state === 'tilted' || state === 'open',
    tilted: state === 'tilted',
    /** true when both contacts are there, so tilt can be told from open */
    paired,
    openFor: openParts.length ? openFor : null,
    entityId: (top || parts[0]).entityId,
  };
}

/**
 * Summarises a room's windows for the card.
 *
 * Counting is by window, not by contact: a tilt-and-turn window swung fully
 * open trips two contacts and is still one open window.
 */
export function summariseOpenings(openings, openDelay = OPEN_DELAY_S, options = {}) {
  const windows = groupOpenings(openings, options);
  const open = windows.filter((window) => window.open);
  /* only a window that has been open a while is worth saying out loud */
  const settled = open.filter((window) => (window.openFor ?? 0) >= openDelay);
  const longest = settled.reduce(
    (best, window) => ((window.openFor ?? 0) > (best?.openFor ?? -1) ? window : best),
    null,
  );
  return {
    windows,
    total: windows.length,
    /** no contact in this room at all - the card must not imply "closed" */
    none: windows.length === 0,
    unavailable: windows.filter((window) => !window.available).length,
    open: open.length,
    tilted: open.filter((window) => window.tilted).length,
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
