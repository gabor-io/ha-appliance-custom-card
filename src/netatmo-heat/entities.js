/**
 * Entity discovery for the Netatmo heating system.
 *
 * Everything hangs off the `climate` entities: one per heated room. Their
 * area is what pairs them with battery sensors and window contacts, and the
 * area usually lives on the device rather than the entity, so it is read
 * through `entityArea`.
 *
 * There is deliberately no lookup for a room temperature sensor. The heating
 * devices do not create one - the temperature is an attribute of the climate
 * entity, and only rooms that happen to hold a weather-station module have a
 * sensor of their own.
 */

import { isUnavailable } from '../shared/entities.js';
import { entityArea, roomOpenings, DEFAULT_OPENING_CLASSES } from '../shared/openings.js';
import { PLATFORM } from './const.js';

export { isUnavailable, entityArea };

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Every Netatmo room thermostat and valve, in a stable order. */
export function listRoomEntities(hass) {
  return registryEntries(hass)
    .filter((entry) => entry.platform === PLATFORM && entry.entity_id.startsWith('climate.'))
    .map((entry) => entry.entity_id)
    .sort();
}

/** The one select the integration offers: the house schedule. */
export function findScheduleSelect(hass) {
  const entry = registryEntries(hass).find(
    (item) => item.platform === PLATFORM && item.entity_id.startsWith('select.'),
  );
  return entry?.entity_id || null;
}

/** Devices owning a Netatmo climate entity, for the visual editor. */
export function listHeatingDevices(hass) {
  const devices = new Map();
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM || !entry.device_id) continue;
    if (!entry.entity_id.startsWith('climate.')) continue;
    const device = hass.devices?.[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

/**
 * The room's name.
 *
 * The climate entity is called "<room> Netatmo Valve", which repeats the
 * integration's name on every row. The area carries the name people actually
 * use, so that wins; the suffix is stripped as a fallback.
 */
export function roomName(hass, entityId, areaId) {
  const area = areaId ? hass?.areas?.[areaId] : null;
  if (area?.name) return area.name;
  const friendly = hass?.states?.[entityId]?.attributes?.friendly_name;
  if (!friendly) return entityId;
  return friendly.replace(/\s+Netatmo\s+(Valve|Thermostat)$/i, '').trim() || friendly;
}

/**
 * A readable label for one head.
 *
 * Several heads share a friendly name - three rooms here have two heads each
 * called the same thing - so the label is cut out of the object id instead,
 * which is unique by construction. `bathroom_netatmo_valve_window` becomes
 * "window", and the card can tell the two bathroom heads apart.
 */
export function headLabel(entityId, areaId) {
  let name = entityId.replace(/^sensor\./, '').replace(/_battery(_percent)?$/, '');
  if (areaId && name.startsWith(`${areaId}_`)) name = name.slice(areaId.length + 1);
  name = name.replace(/^netatmo_/, '');
  /* `valve_window` -> "window", but a bare `valve` keeps its own name */
  const kind = /^(valve|thermostat)_(.+)$/.exec(name);
  if (kind) name = kind[2];
  return name.replace(/_/g, ' ').trim() || entityId;
}

/** Battery sensors of one room, by area. */
export function roomBatteries(hass, areaId) {
  if (!areaId) return [];
  const found = [];
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM) continue;
    if (!entry.entity_id.startsWith('sensor.')) continue;
    if (entityArea(hass, entry.entity_id) !== areaId) continue;
    const stateObj = hass.states?.[entry.entity_id];
    const deviceClass = stateObj?.attributes?.device_class || entry.original_device_class;
    if (deviceClass !== 'battery') continue;
    const value = isUnavailable(stateObj) ? null : Number(stateObj.state);
    found.push({
      entityId: entry.entity_id,
      label: headLabel(entry.entity_id, areaId),
      battery: Number.isFinite(value) ? value : null,
    });
  }
  return found.sort((a, b) => a.entityId.localeCompare(b.entityId));
}

/** Window and door contacts belonging to one room. */
export function openingsFor(hass, areaId, config, entityId) {
  const options = config?.openings || {};
  if (options.auto === false && !options.rooms?.[entityId]) return [];
  return roomOpenings(hass, {
    areas: areaId ? [areaId] : [],
    classes: options.classes || DEFAULT_OPENING_CLASSES,
    include: options.rooms?.[entityId] || [],
    exclude: options.ignore || [],
  });
}
