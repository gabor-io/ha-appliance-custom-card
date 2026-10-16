/** Mock `hass` for the air conditioner card, shaped after four Daikin units. */

const ROOMS = [
  { id: 'halo_szoba', name: 'Hálószoba', device: 'dev-halo' },
  { id: 'nappali', name: 'Nappali', device: 'dev-nappali' },
  { id: 'gyerekszoba', name: 'Gyerekszoba', device: 'dev-gyerek' },
  { id: 'dolgozo', name: 'Dolgozó', device: 'dev-dolgozo' },
];

const FAN_MODES = ['Auto', 'Silence', '1', '2', '3', '4', '5'];
const SWING_MODES = ['Off', 'Vertical', 'Horizontal', '3D'];
const HVAC_MODES = ['off', 'heat', 'cool', 'heat_cool', 'dry', 'fan_only'];

/** Base state of one unit; the scenarios override pieces of this. */
function unit(room, over = {}) {
  const base = {
    state: 'heat',
    current_temperature: 25,
    temperature: 23,
    fan_mode: '3',
    swing_mode: 'Vertical',
    preset_mode: 'none',
    hvac_action: 'heating',
    ...over,
  };
  return [
    `climate.${room.id}`,
    base.state,
    {
      friendly_name: room.name,
      current_temperature: base.current_temperature,
      temperature: base.temperature,
      min_temp: 16,
      max_temp: 30,
      target_temp_step: 1,
      hvac_modes: HVAC_MODES,
      hvac_action: base.hvac_action,
      fan_mode: base.fan_mode,
      fan_modes: FAN_MODES,
      swing_mode: base.swing_mode,
      swing_modes: SWING_MODES,
      preset_mode: base.preset_mode,
      preset_modes: ['none', 'away', 'boost', 'eco'],
      supported_features: 441,
    },
  ];
}

/** `[entity_id, state, attributes, registry]` */
function baseEntities() {
  return [
    ...ROOMS.map((room) => unit(room)),

    // the integration's own sensors, named as a Hungarian HA names them
    ...ROOMS.flatMap((room) => [
      [`sensor.${room.id}_belso_homerseklet`, '25', { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Belső hőmérséklet' },
        { platform: 'daikin', translation_key: 'inside_temperature', device_id: room.device }],
      [`sensor.${room.id}_kulso_homerseklet`, '9', { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Külső hőmérséklet' },
        { platform: 'daikin', translation_key: 'outside_temperature', device_id: room.device }],
    ]),

    // two rooms already have a room thermometer and a plug meter
    ['sensor.netatmo_halo_szoba_homerseklet', '23.4', { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Hálószoba hőmérséklet' }],
    ['sensor.netatmo_halo_szoba_paratartalom', '41', { device_class: 'humidity', unit_of_measurement: '%', friendly_name: 'Hálószoba páratartalom' }],
    ['sensor.sonoff_halo_szoba_teljesitmeny', '55', { device_class: 'power', unit_of_measurement: 'W', friendly_name: 'Hálószoba fogyasztás' }],
    ['sensor.netatmo_nappali_homerseklet', '27.8', { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Nappali hőmérséklet' }],
    ['sensor.netatmo_nappali_paratartalom', '55', { device_class: 'humidity', unit_of_measurement: '%', friendly_name: 'Nappali páratartalom' }],
    ['sensor.sonoff_nappali_teljesitmeny', '1180', { device_class: 'power', unit_of_measurement: 'W', friendly_name: 'Nappali fogyasztás' }],

    // the climate_group entity, which lists its members in `entity_id`
    ['climate.daikin_acs', 'heat', {
      friendly_name: 'Klímák',
      entity_id: ROOMS.map((room) => `climate.${room.id}`),
      current_temperature: 23.6,
      temperature: 22.5,
      min_temp: 16,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_modes: HVAC_MODES,
      fan_modes: FAN_MODES,
      swing_modes: SWING_MODES,
      preset_modes: ['none', 'away', 'boost', 'eco'],
      supported_features: 441,
    }],
  ];
}

export const SCENARIOS = {
  futes: {},
  hutes: {
    'climate.nappali': { state: 'cool', temperature: 24, fan_mode: 'Auto', hvac_action: 'cooling' },
  },
  vegyes: {
    'climate.nappali': { state: 'cool', temperature: 24, fan_mode: 'Auto', hvac_action: 'cooling' },
    'climate.gyerekszoba': { state: 'dry', temperature: 22, fan_mode: 'Silence', swing_mode: 'Off', preset_mode: 'eco' },
    'climate.dolgozo': { state: 'off', temperature: 21, fan_mode: '2', swing_mode: 'Off', hvac_action: 'off' },
  },
  tavollet: {
    'climate.halo_szoba': { state: 'heat', temperature: 18, preset_mode: 'away', fan_mode: 'Auto' },
  },
  kikapcsolva: {
    'climate.halo_szoba': { state: 'off', hvac_action: 'off' },
  },
};

export function makeHass(scenario = 'futes') {
  const overrides = SCENARIOS[scenario] || {};
  const states = {};
  const entities = {};
  const devices = Object.fromEntries(
    ROOMS.map((room) => [room.device, { id: room.device, name: room.name }]),
  );

  for (const [entityId, state, attributes, registry] of baseEntities()) {
    const override = overrides[entityId];
    let finalState = state;
    let finalAttrs = { ...attributes };

    if (typeof override === 'string') finalState = override;
    else if (override) {
      finalState = override.state ?? state;
      finalAttrs = { ...finalAttrs, ...override };
      delete finalAttrs.state;
    }

    states[entityId] = { entity_id: entityId, state: String(finalState), attributes: finalAttrs };
    if (registry) entities[entityId] = { entity_id: entityId, ...registry };
    else entities[entityId] = { entity_id: entityId, platform: 'mock' };
  }

  // the climate entities belong to their device, like the real integration
  for (const room of ROOMS) {
    entities[`climate.${room.id}`] = {
      entity_id: `climate.${room.id}`,
      platform: 'daikin',
      device_id: room.device,
    };
  }

  return {
    states,
    entities,
    devices,
    config: { unit_system: { temperature: '°C' } },
    locale: { language: 'hu' },
    themes: { darkMode: false },
    callService: (domain, service, data) => {
      // eslint-disable-next-line no-console
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };
}

/** The sources the card gets told about; two rooms have none yet. */
export const SOURCES = {
  'climate.halo_szoba': {
    temperature: 'sensor.netatmo_halo_szoba_homerseklet',
    humidity: 'sensor.netatmo_halo_szoba_paratartalom',
    power: 'sensor.sonoff_halo_szoba_teljesitmeny',
  },
  'climate.nappali': {
    temperature: 'sensor.netatmo_nappali_homerseklet',
    humidity: 'sensor.netatmo_nappali_paratartalom',
    power: 'sensor.sonoff_nappali_teljesitmeny',
  },
};

window.demo = { SCENARIOS, SOURCES, makeHass };
