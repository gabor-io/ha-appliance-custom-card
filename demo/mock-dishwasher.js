/** Mock `hass` built from the real diagnostics of an AEG GI8200X5TN. */

const PREFIX = 'aeg_gi8200x5tn';

const BASE = {
  appliance_state: 'OFF',
  cycle_phase: 'Unavailable',
  time_to_end: '-1',
  program: 'Eco',
  door: 'off',
  connectivity: 'on',
  alerts: 'DISH_ALARM_SALT_MISSING,DISH_ALARM_RINSE_AID_LOW',
  eco: '7',
  energy: '1',
  water: '1',
  cycles: '312',
  remote: 'Not safety relevant enabled',
  link: 'Very good',
  start_time: '-1',
  rinse_aid: '8',
  hardness: 'Step 5',
  options: {},
};

export const SCENARIOS = {
  off: {},
  ready: {
    appliance_state: 'READY_TO_START',
    alerts: '',
    // the appliance reports the length of the selected program (ExtraDry included)
    time_to_end: '325',
    options: { xtra_dry_option: 'on' },
  },
  running: {
    appliance_state: 'RUNNING',
    cycle_phase: 'Mainwash',
    time_to_end: '138',
    alerts: '',
    options: { xtra_dry_option: 'on', extra_silent_option: 'on' },
  },
  drying: {
    appliance_state: 'RUNNING',
    cycle_phase: 'Drying',
    time_to_end: '24',
    program: '120 Min',
    alerts: '',
  },
  paused: { appliance_state: 'PAUSED', cycle_phase: 'Mainwash', time_to_end: '96', alerts: '' },
  delayed: { appliance_state: 'DELAYED_START', time_to_end: '490', start_time: '180', alerts: '' },
  finished: { appliance_state: 'END_OF_CYCLE', time_to_end: '0', door: 'on', alerts: '' },
  alarm: { appliance_state: 'ALARM', alerts: 'DISH_ALARM_I20', time_to_end: '0' },
  quick: {
    appliance_state: 'READY_TO_START',
    program: 'Quick30',
    alerts: 'DISH_ALARM_RINSE_AID_LOW',
    eco: '3',
    energy: '5',
    water: '4',
  },
  offline: { appliance_state: 'OFF', connectivity: 'off', alerts: '' },
};

const PROGRAM_OPTIONS = ['120 Min', 'Auto', 'Eco', 'Machine Care', 'Normal90', 'Quick30', 'Quick60', 'Rinse'];

const OPTION_SWITCHES = [
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

function entity(id, state, attributes = {}) {
  return [id, { entity_id: id, state, attributes }];
}

export function makeHass(scenarioKey) {
  const s = { ...BASE, ...(SCENARIOS[scenarioKey] || {}) };
  const options = { ...BASE.options, ...(SCENARIOS[scenarioKey]?.options || {}) };

  const states = Object.fromEntries([
    entity(`sensor.${PREFIX}_appliance_state`, s.appliance_state, { friendly_name: 'AEG GI8200X5TN Appliance state' }),
    entity(`sensor.${PREFIX}_cycle_phase`, s.cycle_phase),
    entity(`sensor.${PREFIX}_time_to_end`, s.time_to_end, { unit_of_measurement: 'min', device_class: 'duration' }),
    entity(`sensor.${PREFIX}_alerts`, s.alerts || 'None'),
    entity(`sensor.${PREFIX}_eco_score`, s.eco),
    entity(`sensor.${PREFIX}_energy_score`, s.energy),
    entity(`sensor.${PREFIX}_water_score`, s.water),
    entity(`sensor.${PREFIX}_total_cycle_counter`, s.cycles),
    entity(`sensor.${PREFIX}_remote_control`, s.remote),
    entity(`sensor.${PREFIX}_network_interface_link_quality_indicator`, s.link),
    entity(`binary_sensor.${PREFIX}_door_state`, s.door, { device_class: 'opening' }),
    entity(`binary_sensor.${PREFIX}_connectivity_state`, s.connectivity, { device_class: 'connectivity' }),
    entity(`binary_sensor.${PREFIX}_miscellaneous_state_eco_mode`, 'on'),
    entity(`select.${PREFIX}_program_uid`, s.program, { options: PROGRAM_OPTIONS }),
    entity(`select.${PREFIX}_water_hardness`, s.hardness, { options: ['Soft', 'Medium', 'Hard'] }),
    entity(`number.${PREFIX}_start_time`, s.start_time, { min: -1, max: 1440, step: 1, unit_of_measurement: 'min' }),
    entity(`number.${PREFIX}_rinse_aid_level`, s.rinse_aid, { min: 0, max: 8, step: 1 }),
    ...['on', 'off', 'start', 'pause', 'resume', 'stopreset'].map((cmd) =>
      entity(`button.${PREFIX}_execute_command_${cmd}`, 'unknown'),
    ),
    ...OPTION_SWITCHES.map((sw) => entity(`switch.${PREFIX}_${sw}`, options[sw] || 'off')),
  ]);

  return {
    states,
    entities: Object.fromEntries(
      Object.keys(states).map((id) => [id, { entity_id: id, device_id: 'demo', platform: 'electrolux' }]),
    ),
    devices: { demo: { id: 'demo', name: 'AEG GI8200X5TN', manufacturer: 'AEG' } },
    language: 'hu',
    locale: { language: 'hu', time_format: '24' },
    callService: (domain, service, data) => {
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };
}

window.demo = { SCENARIOS, makeHass };
