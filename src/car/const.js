/**
 * Domain constants for the Škoda (MySkoda) status card.
 *
 * Everything here mirrors the `myskoda` integration: entity translation keys,
 * the English entity names Home Assistant builds object ids from, and the
 * `DoorWindowState` semantics of the per-door / per-window binary sensors.
 */

export const CARD_NAME = 'skoda-car-card';
export const EDITOR_NAME = 'skoda-car-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** The four doors and windows, in the order the card lists them. */
export const CORNERS = ['front_left', 'front_right', 'rear_left', 'rear_right'];

/** Corner -> the SVG group id used by the illustration. */
export const CORNER_SVG = {
  front_left: 'fl',
  front_right: 'fr',
  rear_left: 'rl',
  rear_right: 'rr',
};

/** Openings that are not a door or a window. */
export const EXTRAS = ['trunk', 'bonnet', 'sunroof'];

/** Fuel-level sensors, in the order the card prefers them. */
export const LEVEL_KEYS = ['fuel_level', 'gas_level', 'battery_percentage'];

/** Range sensors that may stand in for the combined range. */
export const RANGE_KEYS = ['range', 'combustion_range', 'electric_range', 'gas_range'];

/** Rows of the "trip" section: `[entity key, icon, unit hint]`. */
export const TRIP_ROWS = [
  ['last_trip_mileage', 'range'],
  ['last_trip_travel_time', 'travel_time'],
  ['last_trip_average_speed', 'gauge'],
  ['last_trip_average_fuel_consumption', 'fuel'],
  ['last_trip_average_electric_consumption', 'charger'],
  ['overall_mileage', 'odometer'],
  ['overall_travel_time', 'travel_time'],
  ['overall_average_speed', 'gauge'],
  ['overall_average_fuel_consumption', 'fuel'],
  ['overall_average_electric_consumption', 'charger'],
];

/** Rows of the "service" section. */
export const SERVICE_ROWS = [
  ['inspection', 'service'],
  ['inspection_in_km', 'service'],
  ['oil_service_in_days', 'adblue'],
  ['oil_service_in_km', 'adblue'],
];

/** Rows of the "position and system" section. */
export const SYSTEM_ROWS = [
  ['software_version', 'software'],
  ['car_captured', 'history'],
  ['operation', 'info'],
  ['service_event', 'info'],
  ['camping_mode_ends_at', 'ac'],
];

/** Charging rows, shown only for vehicles that report them. */
export const CHARGING_ROWS = [
  ['charging_state', 'charger'],
  ['charging_power', 'charger'],
  ['charging_rate', 'charger'],
  ['remaining_charging_time', 'travel_time'],
  ['target_battery_percentage', 'battery_car'],
  ['electric_range', 'range'],
];
