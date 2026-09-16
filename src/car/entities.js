/**
 * Entity discovery for the MySkoda integration (skodaconnect/homeassistant-myskoda).
 *
 * MySkoda entities are translated, so Home Assistant builds their object ids
 * from the English entity names (`binary_sensor.superb_combi_door_front_left`).
 * Two sensor pairs share a name ("Next Inspection", "Oil Service"), which makes
 * the object id of the second one end in `_2`, so the card prefers the entity
 * registry - it carries the integration's own `translation_key` - and only falls
 * back to object-id matching when the registry is not available.
 */

import { isUnavailable, normaliseKey } from '../shared/entities.js';

export { isUnavailable, normaliseKey };

export const PLATFORM = 'myskoda';

/**
 * Logical key -> `[domain, translation_key, object-id suffix]`.
 * The suffix is the slug of the English entity name.
 */
export const ENTITY_MAP = {
  // --- openings, locks, lights -------------------------------------------
  lock_vehicle: ['binary_sensor', 'vehicle_lock', 'vehicle_locked'],
  lock_doors: ['binary_sensor', 'doors_lock', 'doors_locked'],
  doors_open: ['binary_sensor', 'doors_open', 'doors_open'],
  windows_open: ['binary_sensor', 'windows_open', 'windows'],
  trunk: ['binary_sensor', 'trunk_open', 'trunk'],
  bonnet: ['binary_sensor', 'bonnet_open', 'bonnet'],
  sunroof: ['binary_sensor', 'sunroof_open', 'sunroof'],
  door_front_left: ['binary_sensor', 'door_open_front_left', 'door_front_left'],
  door_front_right: ['binary_sensor', 'door_open_front_right', 'door_front_right'],
  door_rear_left: ['binary_sensor', 'door_open_rear_left', 'door_rear_left'],
  door_rear_right: ['binary_sensor', 'door_open_rear_right', 'door_rear_right'],
  window_front_left: ['binary_sensor', 'window_open_front_left', 'window_front_left'],
  window_front_right: ['binary_sensor', 'window_open_front_right', 'window_front_right'],
  window_rear_left: ['binary_sensor', 'window_open_rear_left', 'window_rear_left'],
  window_rear_right: ['binary_sensor', 'window_open_rear_right', 'window_rear_right'],
  lights: ['binary_sensor', 'parkinglights_on', 'parking_lights'],
  in_motion: ['binary_sensor', 'vehicle_in_motion', 'in_motion'],
  reachable: ['binary_sensor', 'vehicle_reachable', 'reachable'],
  battery_protection: ['binary_sensor', 'vehicle_battery_protection', 'battery_protection'],
  charger_connected: ['binary_sensor', 'charger_connected', 'charger_connected'],
  charger_lock: ['binary_sensor', 'charger_lock', 'charge_lock'],

  // --- range and levels ---------------------------------------------------
  mileage: ['sensor', 'mileage', 'mileage'],
  range: ['sensor', 'range', 'range'],
  combustion_range: ['sensor', 'combustion_range', 'combustion_range'],
  electric_range: ['sensor', 'electric_range', 'electric_range'],
  gas_range: ['sensor', 'gas_range', 'gas_range'],
  fuel_level: ['sensor', 'fuel_level', 'fuel_level'],
  gas_level: ['sensor', 'gas_level', 'gas_level'],
  battery_percentage: ['sensor', 'battery_percentage', 'battery_percentage'],
  adblue_range: ['sensor', 'adblue_range', 'adblue_range'],
  outside_temperature: ['sensor', 'outside_temperature', 'outside_temperature'],

  // --- service ------------------------------------------------------------
  inspection: ['sensor', 'inspection', 'next_inspection'],
  inspection_in_km: ['sensor', 'inspection_in_km', 'next_inspection_2'],
  oil_service_in_days: ['sensor', 'oil_service_in_days', 'oil_service'],
  oil_service_in_km: ['sensor', 'oil_service_in_km', 'oil_service_2'],
  software_version: ['sensor', 'software_version', 'software_version'],

  // --- system -------------------------------------------------------------
  car_captured: ['sensor', 'car_captured', 'last_updated'],
  operation: ['sensor', 'operation', 'last_operation'],
  service_event: ['sensor', 'service_event', 'last_service_event'],
  camping_mode_ends_at: ['sensor', 'camping_mode_ends_at', 'camping_mode_ends'],

  // --- trips --------------------------------------------------------------
  last_trip_mileage: ['sensor', 'last_trip_mileage', 'last_trip_mileage'],
  last_trip_travel_time: ['sensor', 'last_trip_travel_time', 'last_trip_travel_time'],
  last_trip_average_speed: ['sensor', 'last_trip_average_speed', 'last_trip_average_speed'],
  last_trip_average_fuel_consumption: [
    'sensor',
    'last_trip_average_fuel_consumption',
    'last_trip_average_fuel_consumption',
  ],
  last_trip_average_electric_consumption: [
    'sensor',
    'last_trip_average_electric_consumption',
    'last_trip_average_electric_consumption',
  ],
  overall_mileage: ['sensor', 'overall_mileage', 'overall_mileage'],
  overall_travel_time: ['sensor', 'overall_travel_time', 'overall_travel_time'],
  overall_average_speed: ['sensor', 'overall_average_speed', 'overall_average_speed'],
  overall_average_fuel_consumption: [
    'sensor',
    'overall_average_fuel_consumption',
    'overall_average_fuel_consumption',
  ],
  overall_average_electric_consumption: [
    'sensor',
    'overall_average_electric_consumption',
    'overall_average_electric_consumption',
  ],

  // --- charging (electric and plug-in models) -----------------------------
  charging_state: ['sensor', 'charging_state', 'charging_state'],
  charging_power: ['sensor', 'charging_power', 'charging_power'],
  charging_rate: ['sensor', 'charging_rate', 'charging_rate'],
  charge_type: ['sensor', 'charge_type', 'charge_type'],
  remaining_charging_time: ['sensor', 'remaining_charging_time', 'remaining_charging_time'],
  target_battery_percentage: ['sensor', 'target_battery_percentage', 'target_battery_percentage'],

  // --- other platforms ----------------------------------------------------
  position: ['device_tracker', 'device_tracker', null],
  climate: ['climate', 'climate', 'air_conditioning'],
  render: ['image', 'render_vehicle_main', 'main_render_of_vehicle'],
};

/** Entity domains the card is allowed to read; controls are never touched. */
export const READ_ONLY_DOMAINS = ['sensor', 'binary_sensor', 'device_tracker'];

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

function isMySkoda(entry) {
  return !entry.platform || entry.platform === PLATFORM;
}

/** Devices that own MySkoda entities, for the visual editor. */
export function listCarDevices(hass) {
  const devices = new Map();
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM || !entry.device_id) continue;
    const device = hass.devices?.[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

/** The device the card should read, when the configuration does not name one. */
function pickDevice(hass, config) {
  if (config?.device) return config.device;
  const devices = listCarDevices(hass);
  return devices.length === 1 ? devices[0].id : null;
}

/** `sensor.superb_combi_mileage` -> `superb_combi` */
function prefixFromStates(hass) {
  const ids = Object.keys(hass?.states || {}).filter((id) => /^sensor\..+_mileage$/.test(id));
  if (ids.length !== 1) return null;
  return ids[0].replace(/^sensor\./, '').replace(/_mileage$/, '');
}

/** Longest common object-id prefix of the device's entities. */
function prefixFromDevice(hass, deviceId) {
  const ids = registryEntries(hass)
    .filter((entry) => entry.device_id === deviceId && isMySkoda(entry))
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
 * Resolves every known entity of one vehicle.
 *
 * @returns {{ prefix: string|null, device: string|null, extra: string[] }} plus
 *   `key -> entity_id` for each entity the card knows about. `extra` lists the
 *   readable MySkoda entities of the same device that the card has no row for.
 */
export function resolveEntities(hass, config) {
  const device = pickDevice(hass, config);
  const prefix = config?.prefix || prefixFromDevice(hass, device) || prefixFromStates(hass);
  const overrides = config?.entities || {};
  const map = { prefix, device };
  const used = new Set();

  // 1. the entity registry knows the integration's own translation keys
  const byTranslationKey = new Map();
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM) continue;
    if (device && entry.device_id !== device) continue;
    if (!entry.translation_key || byTranslationKey.has(entry.translation_key)) continue;
    byTranslationKey.set(entry.translation_key, entry.entity_id);
  }

  for (const [key, [domain, translationKey, suffix]] of Object.entries(ENTITY_MAP)) {
    const override = overrides[key];
    if (override) {
      map[key] = override;
      used.add(override);
      continue;
    }

    const fromRegistry = byTranslationKey.get(translationKey);
    if (fromRegistry && fromRegistry.startsWith(`${domain}.`) && hass?.states?.[fromRegistry]) {
      map[key] = fromRegistry;
      used.add(fromRegistry);
      continue;
    }

    if (!prefix || !suffix) continue;
    const candidate = `${domain}.${prefix}_${suffix}`;
    if (hass?.states?.[candidate]) {
      map[key] = candidate;
      used.add(candidate);
    }
  }

  // the device tracker is named after the vehicle, so its object id varies
  if (!map.position && prefix) {
    for (const candidate of [`device_tracker.${prefix}`, `device_tracker.${prefix}_${prefix}`]) {
      if (hass?.states?.[candidate]) {
        map.position = candidate;
        used.add(candidate);
        break;
      }
    }
  }

  map.extra = registryEntries(hass)
    .filter(
      (entry) =>
        entry.platform === PLATFORM &&
        (!device || entry.device_id === device) &&
        READ_ONLY_DOMAINS.includes(entry.entity_id.split('.')[0]) &&
        !used.has(entry.entity_id) &&
        hass?.states?.[entry.entity_id],
    )
    .map((entry) => entry.entity_id)
    .sort();

  return map;
}
