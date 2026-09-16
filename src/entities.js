/**
 * Entity discovery for the Electrolux integration (TTLucian/ha-electrolux).
 *
 * The integration names every entity of a dishwasher consistently, so the card
 * only needs the common object-id prefix (e.g. `aeg_gi8200x5tn`). The prefix is
 * derived from the configured device, from an explicit `prefix` option, or -
 * when neither is given - by looking for the single `*_appliance_state` sensor
 * in the state machine.
 */

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

/** Finds the object-id prefix shared by the appliance entities. */
export function resolvePrefix(hass, config) {
  if (config?.prefix) return config.prefix;

  if (config?.device && hass?.entities) {
    const entry = Object.values(hass.entities).find(
      (e) => e.device_id === config.device && /_appliance_state$/.test(e.entity_id),
    );
    if (entry) return entry.entity_id.replace(/^sensor\./, '').replace(/_appliance_state$/, '');
    // fall back to the longest common prefix of the device's entities
    const ids = Object.values(hass.entities)
      .filter((e) => e.device_id === config.device)
      .map((e) => e.entity_id.split('.')[1]);
    if (ids.length) return commonPrefix(ids);
  }

  if (config?.entities?.appliance_state) {
    return config.entities.appliance_state
      .replace(/^sensor\./, '')
      .replace(/_appliance_state$/, '');
  }

  const candidates = Object.keys(hass?.states || {}).filter((id) =>
    /^sensor\..+_appliance_state$/.test(id),
  );
  if (candidates.length === 1) {
    return candidates[0].replace(/^sensor\./, '').replace(/_appliance_state$/, '');
  }
  return null;
}

function commonPrefix(ids) {
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
 * Builds the map of logical key -> entity id. Explicit overrides from
 * `config.entities` always win; every other key is resolved from the prefix and
 * only kept when the entity actually exists.
 */
export function resolveEntities(hass, config) {
  const prefix = resolvePrefix(hass, config);
  const overrides = config?.entities || {};
  const map = {};

  const keys = new Set([...Object.keys(ENTITY_SUFFIXES), ...Object.keys(overrides)]);
  for (const key of keys) {
    const override = overrides[key];
    if (override) {
      map[key] = override;
      continue;
    }
    const suffix = ENTITY_SUFFIXES[key];
    if (!suffix || !prefix) continue;
    const candidate = `${suffix[0]}.${prefix}_${suffix[1]}`;
    if (hass?.states?.[candidate]) map[key] = candidate;
  }

  // wash options live on switches that follow the same naming scheme
  if (prefix) {
    map.options = {};
    for (const suffix of [
      'xtra_dry_option',
      'extra_power_option',
      'extra_silent_option',
      'glass_care_option',
      'sanitize_option',
      'spray_zone_option',
      'zone_clean_option',
      'one_rack_option',
      'auto_door_opener',
    ]) {
      const id = `switch.${prefix}_${suffix}`;
      if (hass?.states?.[id]) map.options[suffix] = id;
    }
  }
  map.prefix = prefix;
  return map;
}

/** Lists the Electrolux dishwasher devices, for the visual editor. */
export function listDishwasherDevices(hass) {
  if (!hass?.entities || !hass?.devices) return [];
  const devices = new Map();
  for (const entry of Object.values(hass.entities)) {
    if (!/_appliance_state$/.test(entry.entity_id)) continue;
    if (!entry.device_id) continue;
    const device = hass.devices[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

/** Uppercase, underscore-free key used to compare enum-ish states. */
export function normaliseKey(value) {
  if (value === undefined || value === null) return '';
  return String(value).toUpperCase().replace(/[\s\-.]+/g, '_').replace(/_+/g, '_');
}

export function isUnavailable(stateObj) {
  return !stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown';
}
