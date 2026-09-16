/**
 * Entity discovery for the Philips HomeID integration
 * (renaudallard/homeassistant_philips_homeid).
 *
 * Entity ids are `<domain>.<device name>_<entity name>`, so every entity of one
 * airfryer shares a prefix such as `airfryer_combi_7000_series_xxl_cloud`.
 */

import { findPrefix, listDevices, resolveByPrefix } from '../shared/entities.js';

export { normaliseKey, isUnavailable } from '../shared/entities.js';

/** The entity that identifies a Philips airfryer / multicooker. */
const ANCHOR = { domain: 'sensor', suffix: 'cooking_status', key: 'status' };

export const ENTITY_SUFFIXES = {
  status: ['sensor', 'cooking_status'],
  target_temp: ['sensor', 'target_temperature'],
  current_temp: ['sensor', 'current_temperature'],
  total_time: ['sensor', 'total_cook_time'],
  remaining: ['sensor', 'time_remaining'],
  preset: ['sensor', 'preset'],
  recipe: ['sensor', 'recipe'],
  error: ['sensor', 'error_code'],
  preheat_status: ['sensor', 'preheat_status'],
  keep_warm_status: ['sensor', 'keep_warm'],
  airspeed: ['sensor', 'air_speed'],
  probe_target: ['sensor', 'probe_temperature'],
  probe_current: ['sensor', 'current_probe_temperature'],
  dialog: ['sensor', 'dialog'],
  stage: ['sensor', 'current_stage'],
  voltage: ['sensor', 'voltage'],
  drawer: ['binary_sensor', 'drawer'],
  shake: ['binary_sensor', 'shake_reminder'],
  flip: ['binary_sensor', 'flip_reminder'],
  preheat_active: ['binary_sensor', 'preheat_active'],
  probe_unplugged: ['binary_sensor', 'probe_unplugged'],
  probe_required: ['binary_sensor', 'probe_required'],
  resting: ['binary_sensor', 'resting'],
  btn_start: ['button', 'start_cooking'],
  btn_pause: ['button', 'pause'],
  btn_stop: ['button', 'stop'],
  btn_keep_warm: ['button', 'keep_warm'],
  num_temp: ['number', 'set_temperature'],
  num_time: ['number', 'set_cook_time'],
  num_airspeed: ['number', 'set_air_speed'],
  num_probe: ['number', 'set_probe_temperature'],
  num_keep_warm_time: ['number', 'keep_warm_duration'],
  num_keep_warm_temp: ['number', 'keep_warm_temperature'],
  sel_method: ['select', 'cooking_method'],
  sel_preset: ['select', 'my_presets'],
  sel_autocook: ['select', 'autocook_program'],
  power: ['switch', 'power'],
  sw_preheat: ['switch', 'preheat'],
};

export function resolvePrefix(hass, config) {
  return findPrefix(hass, config, ANCHOR);
}

export function resolveEntities(hass, config) {
  const prefix = resolvePrefix(hass, config);
  const map = resolveByPrefix(hass, config, ENTITY_SUFFIXES, prefix);
  map.prefix = prefix;
  return map;
}

/** Lists the Philips airfryer devices, for the visual editor. */
export function listAirfryerDevices(hass) {
  return listDevices(hass, ANCHOR);
}
