/**
 * Entity discovery for the AENO panel heater.
 *
 * tuya-local names its entities from the device profile's `translation_key`,
 * so a Hungarian Home Assistant produces object ids like
 * `select.aeno_smart_heater_homerseklet_mertekegysege`. Guessing object ids
 * would break on every language, so the card reads the entity registry and
 * picks the device's entities by their translation key, their device class, or
 * - for the two the profile names in plain English - by being the only one of
 * their domain on the device.
 *
 * Both panels report the same `friendly_name` ("AENO Smart Heater"), because
 * that is the name the app gave them. Names are therefore never used to tell
 * one from the other, and the card's own title comes from the area.
 */

import { isUnavailable } from '../shared/entities.js';
import { DEFAULT_OPENING_CLASSES, entityArea, roomOpenings } from '../shared/openings.js';
import { HEATER_KEY, KEYS, PLATFORM } from './const.js';

export { isUnavailable, entityArea };

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

function isHeaterClimate(hass, entry) {
  if (entry.platform !== PLATFORM) return false;
  if (!entry.entity_id.startsWith('climate.')) return false;
  if (entry.translation_key === HEATER_KEY) return true;
  /* a profile that sets no translation key still gives away a panel heater:
     it heats and does nothing else, so there is no `cool` in its mode list */
  const modes = hass?.states?.[entry.entity_id]?.attributes?.hvac_modes;
  return Array.isArray(modes) && modes.length > 0 && modes.every((mode) => mode === 'off' || mode === 'heat');
}

/** Every panel heater climate entity in this Home Assistant. */
export function listHeaters(hass) {
  return registryEntries(hass)
    .filter((entry) => isHeaterClimate(hass, entry))
    .map((entry) => entry.entity_id);
}

/**
 * Devices that own a panel heater, for the visual editor.
 *
 * The label carries the area, because the device names collide: two panels
 * from the same app are both called "AENO Smart Heater" and a picker offering
 * that twice is useless.
 */
export function listHeaterDevices(hass) {
  const devices = new Map();
  for (const entry of registryEntries(hass)) {
    if (!entry.device_id || !isHeaterClimate(hass, entry)) continue;
    const device = hass.devices?.[entry.device_id];
    if (!device) continue;
    const name = device.name_by_user || device.name || entry.device_id;
    const area = areaName(hass, device.area_id);
    devices.set(entry.device_id, area ? `${area} – ${name}` : name);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

export function areaName(hass, areaId) {
  if (!areaId) return null;
  return hass?.areas?.[areaId]?.name || null;
}

/**
 * Picks the climate entity the card is about.
 *
 * `entity` wins, as the more specific of the two - except when `device` names
 * a different panel, which is a config contradicting itself. That happens to
 * configs written before the editor learned to clear the other key: the
 * picker wrote `device`, the stale `entity` kept winning, and changing the
 * room in the editor did nothing at all. The device is the one the user just
 * chose, so it wins that argument.
 */
export function pickHeater(hass, config) {
  const ofDevice = config?.device
    ? registryEntries(hass).find(
        (item) => item.device_id === config.device && item.entity_id.startsWith('climate.'),
      )?.entity_id
    : null;

  if (config?.entity) {
    const sameDevice = !ofDevice || hass?.entities?.[config.entity]?.device_id === config.device;
    if (sameDevice) return config.entity;
  }
  if (ofDevice) return ofDevice;

  const all = listHeaters(hass);
  return all.length === 1 ? all[0] : null;
}

/** True when more than one panel exists, so the card can say which message to print. */
export function hasSeveral(hass) {
  return listHeaters(hass).length > 1;
}

/**
 * The profile's own entities for the device behind a climate entity.
 *
 * Which of these exist depends on the device profile: with the stock
 * `princess_panel_heater` only `unit` comes back, with the full profile all of
 * them do. Nothing here is required.
 */
export function deviceEntities(hass, climateEntityId) {
  const deviceId = hass?.entities?.[climateEntityId]?.device_id;
  if (!deviceId) return {};

  const own = registryEntries(hass).filter(
    (item) => item.device_id === deviceId && item.platform === PLATFORM,
  );
  const found = {};

  const byKey = (key) => own.find((item) => item.translation_key === key)?.entity_id;
  const sensors = own.filter((item) => item.entity_id.startsWith('sensor.'));
  const classOf = (item) =>
    hass.states?.[item.entity_id]?.attributes?.device_class || item.original_device_class || null;
  const bySensorClass = (deviceClass) =>
    sensors.find((item) => classOf(item) === deviceClass)?.entity_id;
  const onlyOf = (domain, skipKeys = []) => {
    const matches = own.filter(
      (item) => item.entity_id.startsWith(`${domain}.`) && !skipKeys.includes(item.translation_key),
    );
    return matches.length === 1 ? matches[0].entity_id : undefined;
  };

  found.unit = byKey(KEYS.unit);
  found.lock = byKey(KEYS.lock);
  found.limit = byKey(KEYS.limit);
  found.timer = byKey(KEYS.timer);
  found.remaining = byKey(KEYS.remaining);

  found.power = bySensorClass('power');
  found.energy = bySensorClass('energy');
  /* the only temperature sensor on the device is the panel's own surface
     probe - the room temperature lives on the climate entity instead */
  found.panel = bySensorClass('temperature');

  /* the profile names these two in plain English rather than through a
     translation key, so there is no key to match - but each is the only one of
     its domain on the device once the keyed ones are set aside */
  found.mount = onlyOf('switch');
  found.brightness = onlyOf('select', [KEYS.unit, KEYS.timer]);

  return found;
}

/**
 * Resolves one panel: its climate entity, the profile's entities and anything
 * the user pointed at it.
 *
 * `sources` always wins over the profile's own sensor, because that is the
 * whole point of pointing a room thermometer at the card.
 */
export function resolvePanel(hass, climateEntityId, sources = {}) {
  const own = deviceEntities(hass, climateEntityId);
  return {
    climate: climateEntityId,
    room: sources.temperature || null,
    humidity: sources.humidity || null,
    panel: own.panel,
    power: sources.power || own.power,
    energy: sources.energy || own.energy,
    lock: own.lock,
    limit: own.limit,
    timer: own.timer,
    remaining: own.remaining,
    mount: own.mount,
    brightness: own.brightness,
    unit: own.unit,
  };
}

/**
 * Window and door contacts in the room the panel is mounted in.
 *
 * The pairing is by area, read off the climate entity's device: the tuya-local
 * entities carry no area of their own. A panel that was never assigned to an
 * area gets nothing, which is the honest answer - guessing from the device
 * name would pair both panels with the same room, since they share a name.
 */
export function openingsFor(hass, climateEntityId, config = {}) {
  const options = config.openings || {};
  const explicit = options.entities || [];
  if (options.auto === false && !explicit.length) return [];
  const area = options.area || entityArea(hass, climateEntityId);
  return roomOpenings(hass, {
    areas: options.auto === false ? [] : [area].filter(Boolean),
    classes: options.classes || DEFAULT_OPENING_CLASSES,
    include: explicit,
    exclude: options.ignore || [],
  });
}
