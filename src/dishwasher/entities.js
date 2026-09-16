/**
 * Entity discovery for the Electrolux integration (TTLucian/ha-electrolux).
 *
 * The integration names every entity of a dishwasher consistently, so the card
 * only needs the common object-id prefix, e.g. `aeg_gi8200x5tn`.
 */

import { findPrefix, listDevices, resolveByPrefix } from '../shared/entities.js';

export { normaliseKey, isUnavailable } from '../shared/entities.js';

/** The entity that identifies an Electrolux appliance. */
const ANCHOR = { domain: 'sensor', suffix: 'appliance_state', key: 'appliance_state' };

/** suffix of the entity object id, per logical key */
export const ENTITY_SUFFIXES = {
  appliance_state: ['sensor', 'appliance_state'],
  cycle_phase: ['sensor', 'cycle_phase'],
  time_to_end: ['sensor', 'time_to_end'],
  alerts: ['sensor', 'alerts'],
  eco_score: ['sensor', 'eco_score'],
  energy_score: ['sensor', 'energy_score'],
  water_score: ['sensor', 'water_score'],
  total_cycle_counter: ['sensor', 'total_cycle_counter'],
  remote_control: ['sensor', 'remote_control'],
  link_quality: ['sensor', 'network_interface_link_quality_indicator'],
  door_state: ['binary_sensor', 'door_state'],
  connectivity: ['binary_sensor', 'connectivity_state'],
  eco_mode: ['binary_sensor', 'miscellaneous_state_eco_mode'],
  program: ['select', 'program_uid'],
  water_hardness: ['select', 'water_hardness'],
  start_time: ['number', 'start_time'],
  rinse_aid_level: ['number', 'rinse_aid_level'],
  cmd_on: ['button', 'execute_command_on'],
  cmd_off: ['button', 'execute_command_off'],
  cmd_start: ['button', 'execute_command_start'],
  cmd_pause: ['button', 'execute_command_pause'],
  cmd_resume: ['button', 'execute_command_resume'],
  cmd_stopreset: ['button', 'execute_command_stopreset'],
};

const OPTION_SUFFIXES = [
  'xtra_dry_option',
  'extra_power_option',
  'extra_silent_option',
  'glass_care_option',
  'sanitize_option',
  'spray_zone_option',
  'zone_clean_option',
  'one_rack_option',
  'auto_door_opener',
];

export function resolvePrefix(hass, config) {
  return findPrefix(hass, config, ANCHOR);
}

export function resolveEntities(hass, config) {
  const prefix = resolvePrefix(hass, config);
  const map = resolveByPrefix(hass, config, ENTITY_SUFFIXES, prefix);

  // wash options live on switches that follow the same naming scheme
  map.options = {};
  if (prefix) {
    for (const suffix of OPTION_SUFFIXES) {
      const id = `switch.${prefix}_${suffix}`;
      if (hass?.states?.[id]) map.options[suffix] = id;
    }
  }
  map.prefix = prefix;
  return map;
}

/** Lists the Electrolux dishwasher devices, for the visual editor. */
export function listDishwasherDevices(hass) {
  return listDevices(hass, ANCHOR);
}
