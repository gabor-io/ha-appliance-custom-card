/** Mock `hass` for the Philips airfryer card, shaped after a real HD9880. */

const PREFIX = 'airfryer_combi_7000_series_xxl_cloud';

const BASE = {
  status: 'powersave',
  target_temp: '0',
  current_temp: '116',
  total_time: '0',
  remaining: '0',
  method: 'No Selection',
  preset: 'unknown',
  recipe: 'unknown',
  error: '0',
  airspeed: '0',
  probe_target: '0',
  probe_current: '0',
  probe_unplugged: 'on',
  probe_required: 'off',
  drawer: 'off',
  shake: 'off',
  flip: 'off',
  resting: 'off',
  preheat_active: 'off',
  power: 'off',
  sw_preheat: 'off',
  keep_warm: 'off',
  num_temp: '180',
  num_time: '15',
  num_airspeed: '2',
  num_probe: '70',
  stage: '0',
  voltage: '236',
};

export const SCENARIOS = {
  standby: {},
  ready: {
    status: 'idle',
    power: 'on',
    method: 'Manual',
    num_temp: '185',
    num_time: '15',
  },
  preheating: {
    status: 'precook',
    power: 'on',
    method: 'Manual',
    target_temp: '185',
    current_temp: '92',
    total_time: '15',
    remaining: '900',
    airspeed: '2',
  },
  cooking: {
    status: 'cooking',
    power: 'on',
    method: 'Manual',
    target_temp: '185',
    current_temp: '181',
    total_time: '15',
    remaining: '412',
    airspeed: '2',
  },
  shake: {
    status: 'user_action',
    power: 'on',
    method: 'Auto Cook',
    recipe: 'Speciális airfryeres sültkrumpli',
    target_temp: '180',
    current_temp: '176',
    total_time: '22',
    remaining: '660',
    shake: 'on',
    airspeed: '2',
  },
  drawer_open: {
    status: 'pause',
    power: 'on',
    method: 'Manual',
    target_temp: '185',
    current_temp: '168',
    total_time: '15',
    remaining: '300',
    drawer: 'on',
    airspeed: '2',
  },
  probe: {
    status: 'cooking',
    power: 'on',
    method: 'Manual',
    recipe: 'Egész csirke, száraz fűszerkeverékkel bedörzsölve',
    target_temp: '170',
    current_temp: '168',
    total_time: '75',
    remaining: '2280',
    probe_unplugged: 'off',
    probe_current: '54',
    probe_target: '82',
    num_probe: '82',
    airspeed: '1',
  },
  steam: {
    status: 'cooking',
    power: 'on',
    method: 'Air Steam',
    target_temp: '160',
    current_temp: '158',
    total_time: '30',
    remaining: '1140',
    airspeed: '1',
  },
  finished: {
    status: 'finish',
    power: 'on',
    method: 'Manual',
    target_temp: '185',
    current_temp: '162',
    total_time: '15',
    remaining: '0',
  },
  keep_warm: {
    status: 'maintain',
    power: 'on',
    method: 'Keep Warm',
    target_temp: '65',
    current_temp: '66',
    total_time: '60',
    remaining: '2700',
    keep_warm: 'on',
  },
  error: {
    status: 'idle',
    power: 'on',
    method: 'Manual',
    error: '3',
    drawer: 'on',
  },
};

const METHOD_OPTIONS = ['Manual', 'Auto Cook', 'Keep Warm', 'Recipe', 'No Selection'];
const MY_PRESETS = ['Saját program 1', 'Saját program 2'];

function entity(id, state, attributes = {}) {
  return [id, { entity_id: id, state, attributes }];
}

export function makeHass(scenarioKey) {
  const s = { ...BASE, ...(SCENARIOS[scenarioKey] || {}) };
  const celsius = { unit_of_measurement: '°C', device_class: 'temperature' };

  const states = Object.fromEntries([
    entity(`sensor.${PREFIX}_cooking_status`, s.status, {
      friendly_name: 'Airfryer Combi 7000 Series XXL Cooking Status',
    }),
    entity(`sensor.${PREFIX}_target_temperature`, s.target_temp, celsius),
    entity(`sensor.${PREFIX}_current_temperature`, s.current_temp, celsius),
    entity(`sensor.${PREFIX}_total_cook_time`, s.total_time, {
      unit_of_measurement: 'min',
      device_class: 'duration',
    }),
    entity(`sensor.${PREFIX}_time_remaining`, s.remaining, {
      unit_of_measurement: 's',
      device_class: 'duration',
    }),
    entity(`sensor.${PREFIX}_preset`, s.preset),
    entity(`sensor.${PREFIX}_recipe`, s.recipe),
    entity(`sensor.${PREFIX}_error_code`, s.error),
    entity(`sensor.${PREFIX}_preheat_status`, 'off'),
    entity(`sensor.${PREFIX}_keep_warm`, s.keep_warm),
    entity(`sensor.${PREFIX}_air_speed`, s.airspeed),
    entity(`sensor.${PREFIX}_probe_temperature`, s.probe_target, celsius),
    entity(`sensor.${PREFIX}_current_probe_temperature`, s.probe_current, celsius),
    entity(`sensor.${PREFIX}_current_stage`, s.stage),
    entity(`sensor.${PREFIX}_voltage`, s.voltage, { unit_of_measurement: 'V' }),
    entity(`binary_sensor.${PREFIX}_drawer`, s.drawer, { device_class: 'opening' }),
    entity(`binary_sensor.${PREFIX}_shake_reminder`, s.shake),
    entity(`binary_sensor.${PREFIX}_flip_reminder`, s.flip),
    entity(`binary_sensor.${PREFIX}_preheat_active`, s.preheat_active),
    entity(`binary_sensor.${PREFIX}_probe_unplugged`, s.probe_unplugged),
    entity(`binary_sensor.${PREFIX}_probe_required`, s.probe_required),
    entity(`binary_sensor.${PREFIX}_resting`, s.resting),
    entity(`button.${PREFIX}_start_cooking`, 'unknown'),
    entity(`button.${PREFIX}_pause`, 'unknown'),
    entity(`button.${PREFIX}_stop`, 'unknown'),
    entity(`button.${PREFIX}_keep_warm`, 'unknown'),
    entity(`number.${PREFIX}_set_temperature`, s.num_temp, {
      min: 40,
      max: 200,
      step: 5,
      unit_of_measurement: '°C',
    }),
    entity(`number.${PREFIX}_set_cook_time`, s.num_time, {
      min: 1,
      max: 60,
      step: 1,
      unit_of_measurement: 'min',
    }),
    entity(`number.${PREFIX}_set_air_speed`, s.num_airspeed, { min: 1, max: 2, step: 1 }),
    entity(`number.${PREFIX}_set_probe_temperature`, s.num_probe, {
      min: 40,
      max: 100,
      step: 1,
      unit_of_measurement: '°C',
    }),
    entity(`select.${PREFIX}_cooking_method`, s.method, { options: METHOD_OPTIONS }),
    entity(`select.${PREFIX}_my_presets`, MY_PRESETS[0], { options: MY_PRESETS }),
    entity(`switch.${PREFIX}_power`, s.power),
    entity(`switch.${PREFIX}_preheat`, s.sw_preheat),
  ]);

  return {
    states,
    entities: Object.fromEntries(
      Object.keys(states).map((id) => [
        id,
        { entity_id: id, device_id: 'demo-airfryer', platform: 'philips_homeid' },
      ]),
    ),
    devices: {
      'demo-airfryer': {
        id: 'demo-airfryer',
        name: 'Airfryer Combi 7000 Series XXL',
        manufacturer: 'Philips',
      },
    },
    language: 'hu',
    locale: { language: 'hu', time_format: '24' },
    callService: (domain, service, data) => {
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };
}

window.demo = { SCENARIOS, makeHass };
