/**
 * Entity discovery for the Daikin air conditioner.
 *
 * The `daikin` integration gives every unit one `climate` entity and names its
 * sensors from `translation_key`, so a Hungarian Home Assistant produces ids
 * like `sensor.<nev>_belso_homerseklet`. Guessing object ids would break on
 * every language, so the card reads the entity registry instead and picks the
 * sensors of one device by their translation key.
 *
 * Everything the integration does not provide - the room thermometer, the
 * humidity, the plug meter - comes from `sources`, which the user fills in.
 */

import { isUnavailable } from '../shared/entities.js';
import { PLATFORM } from './const.js';

export { isUnavailable };

/** The sensors the integration creates, by registry translation key. */
const SENSOR_KEYS = {
  inside: 'inside_temperature',
  outside: 'outside_temperature',
};

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Every Daikin climate entity in this Home Assistant. */
export function listClimateEntities(hass) {
  return registryEntries(hass)
    .filter((entry) => entry.platform === PLATFORM && entry.entity_id.startsWith('climate.'))
    .map((entry) => entry.entity_id);
}

/** Devices that own a Daikin climate entity, for the visual editor. */
export function listClimateDevices(hass) {
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
 * The members of a climate group.
 *
 * `climate_group` lists them in the `entity_id` attribute, so the card never
 * asks the user to repeat what the group already knows. Anything that is not a
 * climate entity is dropped.
 */
export function groupMembers(hass, entityId) {
  const attr = hass?.states?.[entityId]?.attributes?.entity_id;
  if (!Array.isArray(attr)) return [];
  return attr.filter((id) => typeof id === 'string' && id.startsWith('climate.'));
}

/** Picks the climate entity the card is about. */
export function pickClimate(hass, config) {
  if (config?.entity) return config.entity;
  if (config?.device) {
    const entry = registryEntries(hass).find(
      (item) => item.device_id === config.device && item.entity_id.startsWith('climate.'),
    );
    if (entry) return entry.entity_id;
  }
  const all = listClimateEntities(hass);
  return all.length === 1 ? all[0] : null;
}

/**
 * The integration's own sensors for the device behind a climate entity.
 *
 * @returns {{ inside: string|undefined, outside: string|undefined }}
 */
export function deviceSensors(hass, climateEntityId) {
  const entry = hass?.entities?.[climateEntityId];
  const deviceId = entry?.device_id;
  if (!deviceId) return {};

  const found = {};
  for (const item of registryEntries(hass)) {
    if (item.device_id !== deviceId || item.platform !== PLATFORM) continue;
    for (const [key, translationKey] of Object.entries(SENSOR_KEYS)) {
      if (item.translation_key === translationKey) found[key] = item.entity_id;
    }
  }
  return found;
}

/**
 * Resolves one unit: its climate entity, the integration's sensors and the
 * external sources pointed at it.
 *
 * `sources` always wins over the integration's own sensor, because that is the
 * whole point of pointing a room thermometer at the card.
 */
export function resolveUnit(hass, climateEntityId, sources = {}) {
  const own = deviceSensors(hass, climateEntityId);
  return {
    climate: climateEntityId,
    inside: own.inside,
    outside: sources.outside || own.outside,
    room: sources.temperature || null,
    humidity: sources.humidity || null,
    power: sources.power || null,
    energy: sources.energy || null,
  };
}
