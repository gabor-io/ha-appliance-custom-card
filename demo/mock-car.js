/** Mock `hass` for the Škoda card, shaped after a real Superb Combi (MySkoda). */

const PREFIX = 'superb_combi';
const DEVICE = 'demo-car';

/** `[domain, object-id suffix, translation_key, state, attributes]` */
const ENTITIES = [
  ['binary_sensor', 'vehicle_locked', 'vehicle_lock', 'off', { device_class: 'lock' }],
  ['binary_sensor', 'doors_locked', 'doors_lock', 'off', { device_class: 'lock' }],
  ['binary_sensor', 'doors_open', 'doors_open', 'off', { device_class: 'door' }],
  ['binary_sensor', 'windows', 'windows_open', 'off', { device_class: 'window' }],
  ['binary_sensor', 'trunk', 'trunk_open', 'off', { device_class: 'opening' }],
  ['binary_sensor', 'bonnet', 'bonnet_open', 'off', { device_class: 'opening' }],
  ['binary_sensor', 'door_front_left', 'door_open_front_left', 'off', { device_class: 'door' }],
  ['binary_sensor', 'door_front_right', 'door_open_front_right', 'off', { device_class: 'door' }],
  ['binary_sensor', 'door_rear_left', 'door_open_rear_left', 'off', { device_class: 'door' }],
  ['binary_sensor', 'door_rear_right', 'door_open_rear_right', 'off', { device_class: 'door' }],
  ['binary_sensor', 'window_front_left', 'window_open_front_left', 'off', { device_class: 'window' }],
  ['binary_sensor', 'window_front_right', 'window_open_front_right', 'off', { device_class: 'window' }],
  ['binary_sensor', 'window_rear_left', 'window_open_rear_left', 'off', { device_class: 'window' }],
  ['binary_sensor', 'window_rear_right', 'window_open_rear_right', 'off', { device_class: 'window' }],
  ['binary_sensor', 'parking_lights', 'parkinglights_on', 'off', { device_class: 'light' }],
  ['binary_sensor', 'in_motion', 'vehicle_in_motion', 'off', {}],
  ['binary_sensor', 'reachable', 'vehicle_reachable', 'on', {}],
  ['binary_sensor', 'battery_protection', 'vehicle_battery_protection', 'off', {}],

  ['sensor', 'mileage', 'mileage', '64026', { unit_of_measurement: 'km', device_class: 'distance' }],
  ['sensor', 'range', 'range', '670', { unit_of_measurement: 'km', device_class: 'distance' }],
  ['sensor', 'combustion_range', 'combustion_range', '670', { unit_of_measurement: 'km', device_class: 'distance' }],
  ['sensor', 'fuel_level', 'fuel_level', '62', { unit_of_measurement: '%' }],
  ['sensor', 'adblue_range', 'adblue_range', '16500', { unit_of_measurement: 'km', device_class: 'distance' }],
  ['sensor', 'outside_temperature', 'outside_temperature', '23.0', { unit_of_measurement: '°C', device_class: 'temperature' }],
  ['sensor', 'next_inspection', 'inspection', '219', { unit_of_measurement: 'd', device_class: 'duration' }],
  ['sensor', 'next_inspection_2', 'inspection_in_km', '12900', { unit_of_measurement: 'km', device_class: 'distance' }],
  ['sensor', 'oil_service', 'oil_service_in_days', '154', { unit_of_measurement: 'd', device_class: 'duration' }],
  ['sensor', 'oil_service_2', 'oil_service_in_km', '8400', { unit_of_measurement: 'km', device_class: 'distance' }],
  ['sensor', 'software_version', 'software_version', '1946', {}],
  ['sensor', 'last_updated', 'car_captured', null, { device_class: 'timestamp' }],
  ['sensor', 'last_operation', 'operation', 'Lock completed', {}],
  ['sensor', 'last_trip_mileage', 'last_trip_mileage', '24.8', { unit_of_measurement: 'km' }],
  ['sensor', 'last_trip_travel_time', 'last_trip_travel_time', '41', { unit_of_measurement: 'min' }],
  ['sensor', 'last_trip_average_speed', 'last_trip_average_speed', '36', { unit_of_measurement: 'km/h' }],
  ['sensor', 'last_trip_average_fuel_consumption', 'last_trip_average_fuel_consumption', '6.1', { unit_of_measurement: 'l/100km' }],
  ['sensor', 'overall_mileage', 'overall_mileage', '63840', { unit_of_measurement: 'km' }],
  ['sensor', 'overall_travel_time', 'overall_travel_time', '1284', { unit_of_measurement: 'min' }],
  ['sensor', 'overall_average_speed', 'overall_average_speed', '42', { unit_of_measurement: 'km/h' }],
  ['sensor', 'overall_average_fuel_consumption', 'overall_average_fuel_consumption', '6.8', { unit_of_measurement: 'l/100km' }],
];

export const SCENARIOS = {
  zart: {},
  ajto_ablak: {
    door_front_left: 'on',
    window_rear_right: 'on',
    doors_open: 'on',
    windows: 'on',
    vehicle_locked: 'on',
    doors_locked: 'on',
  },
  minden_nyitva: {
    door_front_left: 'on',
    door_front_right: 'on',
    door_rear_left: 'on',
    door_rear_right: 'on',
    window_front_left: 'on',
    window_rear_right: 'on',
    trunk: 'on',
    bonnet: 'on',
    doors_open: 'on',
    windows: 'on',
    vehicle_locked: 'on',
    doors_locked: 'on',
    parking_lights: 'on',
  },
  uton: {
    in_motion: 'on',
    range: '512',
    fuel_level: '47',
    parking_lights: 'on',
  },
  tank_ures: {
    fuel_level: '7',
    range: '74',
  },
  offline: {
    reachable: 'off',
  },
};

export function makeHass(scenario = 'zart') {
  const overrides = SCENARIOS[scenario] || {};
  const captured = new Date(Date.now() - 12 * 60 * 1000).toISOString();
  const states = {};
  const entities = {};

  for (const [domain, suffix, translationKey, state, attributes] of ENTITIES) {
    const entityId = `${domain}.${PREFIX}_${suffix}`;
    states[entityId] = {
      entity_id: entityId,
      state: String(overrides[suffix] ?? state ?? captured),
      attributes: { friendly_name: `Superb Combi ${suffix.replace(/_/g, ' ')}`, ...attributes },
    };
    entities[entityId] = {
      entity_id: entityId,
      device_id: DEVICE,
      platform: 'myskoda',
      translation_key: translationKey,
    };
  }

  // the sunroof is reported as unsupported on this car
  const sunroof = `binary_sensor.${PREFIX}_sunroof`;
  states[sunroof] = { entity_id: sunroof, state: 'unavailable', attributes: {} };
  entities[sunroof] = {
    entity_id: sunroof,
    device_id: DEVICE,
    platform: 'myskoda',
    translation_key: 'sunroof_open',
  };

  const tracker = `device_tracker.${PREFIX}`;
  states[tracker] = {
    entity_id: tracker,
    state: overrides.in_motion === 'on' ? 'not_home' : 'home',
    attributes: {
      friendly_name: 'Superb Combi',
      source_type: 'gps',
      latitude: 47.4979,
      longitude: 19.0402,
      parking_address: 'Budapest, Kossuth Lajos tér',
    },
  };
  entities[tracker] = {
    entity_id: tracker,
    device_id: DEVICE,
    platform: 'myskoda',
    translation_key: 'device_tracker',
  };

  return {
    states,
    entities,
    devices: {
      [DEVICE]: {
        id: DEVICE,
        name: 'Superb Combi',
        manufacturer: 'Škoda',
        model: 'Superb',
        hw_version: 'NP3-2024',
        sw_version: '1946',
      },
    },
    language: 'hu',
    locale: { language: 'hu', time_format: '24' },
    config: { unit_system: { temperature: '°C' } },
    callService: (domain, service, data) => {
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };
}

window.demo = { SCENARIOS, makeHass };
