/**
 * Entity discovery for Home Assistant's built-in `liebherr` integration.
 *
 * The integration names entities per zone, but only when the appliance has
 * more than one: a single-zone fridge gets `number.<device>_setpoint` and its
 * temperature sensor takes the device name itself (`sensor.<device>`), while a
 * fridge-freezer gets `number.<device>_top_zone_setpoint` and so on. The card
 * therefore reads the entity registry first - it carries the integration's own
 * `translation_key` - and falls back to object-id matching when the registry is
 * not available.
 */

import { isUnavailable, normaliseKey } from '../shared/entities.js';
import { DEVICE_SWITCHES, ZONES, ZONE_SELECTS, ZONE_SUFFIX, ZONE_SWITCHES } from './const.js';

export { isUnavailable, normaliseKey };

export const PLATFORM = 'liebherr';

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Devices that own Liebherr entities, for the visual editor. */
export function listFridgeDevices(hass) {
  const devices = new Map();
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM || !entry.device_id) continue;
    const device = hass.devices?.[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

function pickDevice(hass, config) {
  if (config?.device) return config.device;
  const devices = listFridgeDevices(hass);
  return devices.length === 1 ? devices[0].id : null;
}

/** `number.liebherr_cooler_setpoint` -> `liebherr_cooler` */
function prefixFromStates(hass) {
  const ids = Object.keys(hass?.states || {}).filter((id) =>
    /^number\..+_setpoint(_temperature)?$/.test(id),
  );
  if (ids.length !== 1) return null;
  return ids[0].replace(/^number\./, '').replace(/_setpoint(_temperature)?$/, '');
}

function prefixFromDevice(hass, deviceId) {
  const ids = registryEntries(hass)
    .filter((entry) => entry.device_id === deviceId && entry.platform === PLATFORM)
    .map((entry) => entry.entity_id.split('.')[1]);
  if (!ids.length) return null;
  let prefix = ids[0];
  for (const id of ids.slice(1)) {
    let i = 0;
    while (i < prefix.length && i < id.length && prefix[i] === id[i]) i += 1;
    prefix = prefix.slice(0, i);
  }
  return prefix.replace(/_+$/, '') || null;
}

/**
 * Resolves one appliance.
 *
 * @returns {{
 *   device: string|null, prefix: string|null,
 *   zones: Array<{ position: string|null, temp: string, setpoint: string,
 *     supercool: string, superfrost: string, icemaker: string,
 *     hydrobreeze: string, biofresh: string, autodoor: string }>,
 *   nightmode: string, partymode: string, light: string, extra: string[]
 * }}
 */
export function resolveEntities(hass, config) {
  const device = pickDevice(hass, config);
  const prefix = config?.prefix || prefixFromDevice(hass, device) || prefixFromStates(hass);
  const overrides = config?.entities || {};
  const used = new Set();

  const mine = registryEntries(hass).filter(
    (entry) => entry.platform === PLATFORM && (!device || entry.device_id === device),
  );
  const byKey = new Map();
  for (const entry of mine) {
    if (entry.translation_key && !byKey.has(entry.translation_key)) {
      byKey.set(entry.translation_key, entry.entity_id);
    }
  }

  const exists = (entityId) => (entityId && hass?.states?.[entityId] ? entityId : null);

  /** Registry first (translation key), then the object-id the name produces. */
  const find = (domain, translationKey, suffix, zone) => {
    const zoned = zone ? `${translationKey}_${ZONE_SUFFIX[zone]}` : translationKey;
    const fromRegistry = byKey.get(zoned);
    if (fromRegistry && fromRegistry.startsWith(`${domain}.`) && exists(fromRegistry)) {
      return fromRegistry;
    }
    if (!prefix || !suffix) return null;
    const objectId = zone ? `${prefix}_${ZONE_SUFFIX[zone]}_${suffix}` : `${prefix}_${suffix}`;
    return exists(`${domain}.${objectId}`);
  };

  /** The temperature sensor of a zone; a single-zone appliance has no key. */
  const findTemp = (zone) => {
    if (zone) {
      const zoned = byKey.get(ZONE_SUFFIX[zone]);
      if (zoned && zoned.startsWith('sensor.') && exists(zoned)) return zoned;
      return prefix ? exists(`sensor.${prefix}_${ZONE_SUFFIX[zone]}`) : null;
    }
    const bare = mine.find(
      (entry) =>
        entry.entity_id.startsWith('sensor.') &&
        !entry.translation_key &&
        hass?.states?.[entry.entity_id]?.attributes?.device_class === 'temperature',
    );
    if (bare) return bare.entity_id;
    return prefix ? exists(`sensor.${prefix}`) : null;
  };

  const zoneFor = (position) => {
    const zone = { position };
    zone.temp = findTemp(position);
    zone.setpoint = find('number', 'setpoint_temperature', 'setpoint', position);
    for (const [key, [translationKey, suffix]] of Object.entries(ZONE_SWITCHES)) {
      zone[key] = find('switch', translationKey, suffix, position);
    }
    for (const [key, [translationKey, suffix]] of Object.entries(ZONE_SELECTS)) {
      zone[key] = find('select', translationKey, suffix, position);
    }
    zone.autodoor = find('cover', 'auto_door', 'autodoor', position);
    return zone;
  };

  // a zone exists when the appliance reports a setpoint or a temperature for it
  const multi = ZONES.map(zoneFor).filter((zone) => zone.setpoint || zone.temp);
  const single = { ...zoneFor(null), temp: findTemp(null) };
  const zones = multi.length ? multi : single.setpoint || single.temp ? [single] : [];

  const map = {
    device,
    prefix,
    zones,
    light: find('light', 'presentation_light', 'presentation_light', null),
  };
  for (const [key, [translationKey, suffix]] of Object.entries(DEVICE_SWITCHES)) {
    map[key] = find('switch', translationKey, suffix, null);
  }

  // explicit overrides win, for appliances that do not follow the naming
  for (const [key, value] of Object.entries(overrides)) {
    const zoneMatch = /^zone(\d)_(.+)$/.exec(key);
    if (zoneMatch) {
      const zone = map.zones[Number(zoneMatch[1]) - 1];
      if (zone) zone[zoneMatch[2]] = value;
      continue;
    }
    map[key] = value;
  }

  for (const zone of map.zones) {
    for (const value of Object.values(zone)) if (typeof value === 'string') used.add(value);
  }
  for (const key of ['light', ...Object.keys(DEVICE_SWITCHES)]) {
    if (map[key]) used.add(map[key]);
  }

  map.extra = mine
    .map((entry) => entry.entity_id)
    .filter((entityId) => !used.has(entityId) && hass?.states?.[entityId])
    .sort();

  return map;
}
