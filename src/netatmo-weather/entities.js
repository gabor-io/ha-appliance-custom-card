/**
 * Entity discovery for the Netatmo weather station.
 *
 * Everything is resolved from the entity registry by **device class**, never
 * from the object id. Home Assistant builds object ids from translated names,
 * so `sensor.<room>_szen_dioxid` on this installation is `sensor.<room>_co2`
 * on an English one; a device class is the same in both.
 *
 * Telling the modules apart needs no name either, because the hardware
 * differs in what it measures:
 *
 * - the base station is the only module with an air pressure sensor;
 * - an indoor module measures CO₂, an outdoor module does not;
 * - the heating valves and the thermostat share the `netatmo` platform but
 *   create **only** a battery sensor - no temperature - so they drop out of
 *   the list on their own. (That was verified on a live system: the heating
 *   devices really do not publish a room temperature.)
 *
 * `sources` lets the user override any of it when a house has a shape this
 * does not fit, e.g. two outdoor modules.
 */

import { isUnavailable } from '../shared/entities.js';
import { entityArea } from '../shared/openings.js';
import { PLATFORM } from './const.js';

export { isUnavailable, entityArea };

/** Device classes the card reads, by the name it uses internally. */
const CLASSES = {
  temperature: ['temperature'],
  humidity: ['humidity'],
  co2: ['carbon_dioxide'],
  /* `pressure` is what Home Assistant called it before 2023.9 */
  pressure: ['atmospheric_pressure', 'pressure'],
  noise: ['sound_pressure'],
  battery: ['battery'],
  signal: ['signal_strength'],
  /* read only to recognise a public weather area; never shown */
  rain: ['precipitation', 'precipitation_intensity'],
  wind: ['wind_speed'],
};

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Whether a sensor is a trend, and of what: by translation key, else by id. */
function trendOf(entry) {
  if (entry.translation_key === 'temp_trend') return 'temperature';
  if (entry.translation_key === 'pressure_trend') return 'pressure';
  if (/_(temp|temperature)_trend$/.test(entry.entity_id)) return 'temperature';
  if (/_pressure_trend$/.test(entry.entity_id)) return 'pressure';
  return null;
}

function deviceClassOf(hass, entry) {
  return hass?.states?.[entry.entity_id]?.attributes?.device_class || entry.original_device_class || null;
}

/**
 * Groups every Netatmo sensor by the device that owns it.
 *
 * @returns {Map<string, {sensors: object, trend: object, reachable: string|null}>}
 */
function sensorsByDevice(hass) {
  const byDevice = new Map();
  const slot = (deviceId) => {
    if (!byDevice.has(deviceId)) {
      byDevice.set(deviceId, { sensors: {}, trend: {}, reachable: null });
    }
    return byDevice.get(deviceId);
  };

  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM || !entry.device_id) continue;
    const deviceClass = deviceClassOf(hass, entry);

    if (entry.entity_id.startsWith('binary_sensor.')) {
      if (deviceClass === 'connectivity') slot(entry.device_id).reachable = entry.entity_id;
      continue;
    }
    if (!entry.entity_id.startsWith('sensor.')) continue;

    /* The trend sensors carry no device class - they are enums of
       up / down / stable - so the translation key identifies them. On a
       live system the object id is `..._temperature_trend`, which does not
       match the integration's `temp_trend` key, so the id is a fallback:
       if the key ever changes, or an entity predates it, the arrow still
       appears instead of silently going missing. */
    const trendKind = trendOf(entry);
    if (trendKind) {
      slot(entry.device_id).trend[trendKind] = entry.entity_id;
      continue;
    }

    for (const [key, classes] of Object.entries(CLASSES)) {
      if (classes.includes(deviceClass)) slot(entry.device_id).sensors[key] = entry.entity_id;
    }
  }
  return byDevice;
}

/**
 * A Netatmo **public** weather station - someone else's, shared to the map.
 *
 * The integration creates these for the "weather areas" an account follows,
 * on the same platform and with the same device classes as the user's own
 * hardware: temperature, humidity, air pressure. Left in, the card picks
 * one as the base station and reports a stranger's garden as the house.
 *
 * The model says so outright. The measurements say so too, as a second
 * opinion: a public area carries rain and wind alongside its temperature,
 * while the owner's rain gauge and wind gauge are devices of their own and
 * have no temperature, so they never reach this test.
 */
function isPublicStation(device, sensors) {
  if (/public/i.test(device?.model || '')) return true;
  return Boolean(sensors.rain || sensors.wind);
}

/**
 * Every weather-station module, already sorted into its kind.
 *
 * The model name is a hint and the measurements decide: the base station is
 * the one with an air pressure sensor, and an outdoor module is the one
 * without CO₂. A renamed or re-modelled device still lands correctly.
 *
 * @returns {{main: object|null, outdoor: object|null, indoor: object[]}}
 */
export function discoverStation(hass, config = {}) {
  const sources = config.sources || {};
  const byDevice = sensorsByDevice(hass);

  const modules = [];
  for (const [deviceId, found] of byDevice) {
    /* a module measures a temperature; a valve or a thermostat does not */
    if (!found.sensors.temperature) continue;
    const device = hass?.devices?.[deviceId];
    if (isPublicStation(device, found.sensors)) continue;
    modules.push({
      deviceId,
      name: device?.name_by_user || device?.name || deviceId,
      model: device?.model || '',
      area: device?.area_id || entityArea(hass, found.sensors.temperature),
      ...found,
    });
  }

  const pick = (id) => modules.find((module) => module.deviceId === id) || null;

  let main = sources.main ? pick(sources.main) : null;
  if (!main) main = modules.find((module) => module.sensors.pressure) || null;

  let outdoor = sources.outdoor ? pick(sources.outdoor) : null;
  if (!outdoor) outdoor = modules.find((module) => module !== main && /outdoor/i.test(module.model)) || null;
  if (!outdoor) {
    /* an outdoor module measures temperature and humidity but no CO₂ */
    outdoor = modules.find((module) => module !== main && !module.sensors.co2) || null;
  }

  /* Home Assistant names a linked module after the base station it hangs
     off - "Dining Room Upstairs" for a module in the room upstairs - so
     the house's name is repeated on every row. The module's own part of
     it is the useful half. */
  for (const module of modules) {
    module.label = stripStationPrefix(module.name, main?.name);
  }

  const indoor = modules.filter((module) => module !== outdoor);
  return { main, outdoor, indoor, all: modules };
}

function stripStationPrefix(name, stationName) {
  if (!stationName || name === stationName) return name;
  const prefix = `${stationName} `;
  return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}

/** Whether this Home Assistant has a Netatmo weather station at all. */
export function hasStation(hass) {
  const station = discoverStation(hass);
  return Boolean(station.main || station.outdoor || station.indoor.length);
}

/** Devices for the visual editor's picker. */
export function listStationDevices(hass) {
  return discoverStation(hass).all.map((module) => ({ id: module.deviceId, name: module.name }));
}

/**
 * A module's display name.
 *
 * The area wins, as everywhere else in these cards: the device is called
 * "<room> (indoor module)" out of the box, which repeats the hardware on
 * every row, while the area carries the name people actually use.
 */
export function moduleName(hass, module) {
  const area = module.area ? hass?.areas?.[module.area] : null;
  if (area?.name) return area.name;
  return module.label || module.name;
}
