/**
 * Entity discovery for the ventilator behind tuya-local.
 *
 * tuya-local names most of this device's entities from their device class, so
 * on a Hungarian Home Assistant the ids read `sensor.<device>_szen_dioxid`
 * rather than `..._carbon_dioxide`. Guessing object ids would therefore break
 * on every language: the card reads the entity registry, keeps the entities of
 * one device, and picks each one by domain and device class. Only the two fan
 * speeds and the filter select carry English names in the device config, so
 * those fall back to an object-id hint.
 */

import { isUnavailable, normaliseKey } from '../shared/entities.js';

export { isUnavailable, normaliseKey };

export const PLATFORM = 'tuya_local';

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Devices that own a fan from this integration, for the visual editor. */
export function listVentilatorDevices(hass) {
  const devices = new Map();
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM || !entry.device_id) continue;
    if (!entry.entity_id.startsWith('fan.')) continue;
    const device = hass.devices?.[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

function pickDevice(hass, config) {
  if (config?.device) return config.device;
  const devices = listVentilatorDevices(hass);
  return devices.length === 1 ? devices[0].id : null;
}

/** `fan.fisher_f_ervq_b150co2_i` -> `fisher_f_ervq_b150co2_i` */
function prefixFromStates(hass) {
  const ids = Object.keys(hass?.states || {}).filter((id) => id.startsWith('fan.'));
  return ids.length === 1 ? ids[0].slice('fan.'.length) : null;
}

/**
 * Resolves one ventilator.
 *
 * @returns {{ device, prefix, fan, co2, pm25, humidity, temperature,
 *   filter_life, filter_lifespan, filter_reset, problem, supply, exhaust,
 *   extra: string[] }}
 */
export function resolveEntities(hass, config) {
  const device = pickDevice(hass, config);
  const prefix = config?.prefix || prefixFromStates(hass);
  const overrides = config?.entities || {};

  const mine = registryEntries(hass).filter(
    (entry) =>
      entry.platform === PLATFORM &&
      (device ? entry.device_id === device : true) &&
      hass?.states?.[entry.entity_id],
  );
  const pool = mine.length
    ? mine.map((entry) => entry.entity_id)
    : Object.keys(hass?.states || {}).filter((id) => prefix && id.includes(prefix));

  const stateOf = (entityId) => hass?.states?.[entityId];
  const domainOf = (entityId) => entityId.split('.')[0];
  const deviceClassOf = (entityId) => stateOf(entityId)?.attributes?.device_class || null;

  /** First entity of `domain`, optionally matching a device class or an id hint. */
  const find = (domain, { deviceClass = null, hint = null } = {}) =>
    pool.find((entityId) => {
      if (domainOf(entityId) !== domain) return false;
      if (deviceClass && deviceClassOf(entityId) !== deviceClass) return false;
      if (hint && !entityId.includes(hint)) return false;
      return true;
    }) || null;

  const map = {
    device,
    prefix,
    fan: find('fan'),
    co2: find('sensor', { deviceClass: 'carbon_dioxide' }),
    pm25: find('sensor', { deviceClass: 'pm25' }),
    humidity: find('sensor', { deviceClass: 'humidity' }),
    temperature: find('sensor', { deviceClass: 'temperature' }),
    filter_life: find('sensor', { deviceClass: 'duration' }),
    filter_lifespan: find('select'),
    filter_reset: find('button'),
    problem: find('binary_sensor', { deviceClass: 'problem' }),
    supply: find('number', { hint: 'supply' }) || find('number'),
    exhaust: find('number', { hint: 'exhaust' }),
  };

  // the two speeds share a domain, so never hand the same entity to both
  if (map.exhaust && map.exhaust === map.supply) map.exhaust = null;
  if (!map.exhaust) {
    map.exhaust = pool.find((entityId) => domainOf(entityId) === 'number' && entityId !== map.supply) || null;
  }

  for (const [key, value] of Object.entries(overrides)) map[key] = value;

  const used = new Set(Object.values(map).filter((value) => typeof value === 'string' && value.includes('.')));
  map.extra = pool.filter((entityId) => !used.has(entityId)).sort();

  return map;
}
