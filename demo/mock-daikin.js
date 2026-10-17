/** Mock `hass` for the air conditioner card, shaped after four Daikin units. */

const ROOMS = [
  { id: 'halo_szoba', name: 'Hálószoba', device: 'dev-halo', area: 'halo' },
  { id: 'nappali', name: 'Nappali', device: 'dev-nappali', area: 'nappali' },
  { id: 'gyerekszoba', name: 'Gyerekszoba', device: 'dev-gyerek', area: 'gyerek' },
  { id: 'dolgozo', name: 'Dolgozó', device: 'dev-dolgozo', area: 'dolgozo' },
];

/**
 * Window contacts per area. The study deliberately has none, so the card has
 * to stay quiet about it rather than imply the window is shut.
 */
const WINDOWS = {
  /* a bukó-nyíló window: two contacts on the same sash. Top alone means it
     is on the latch, both mean it is swung open - one window either way. */
  halo: ['halo_ablak_top', 'halo_ablak_bottom'],
  nappali: ['nappali_terasz_ajto', 'nappali_ablak'],
  gyerek: ['gyerek_ablak'],
};

/** Contacts that are not a room's window, and must never be counted as one. */
const DECOYS = [
  /* the car parks outside and reports both */
  { id: 'skoda_ablakok', area: 'virtual', device_class: 'window', device: 'dev-car', name: 'Škoda ablakok' },
  { id: 'skoda_ajtok_nyitva', area: 'virtual', device_class: 'door', device: 'dev-car', name: 'Škoda ajtók' },
  /* a door in the living room: doors are opt-in, so this one stays silent
     until `openings.classes` asks for it */
  { id: 'nappali_bejarati_ajto', area: 'nappali', device_class: 'door', device: 'dev-bejarat', name: 'Bejárati ajtó' },
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

    // window contacts, with the area on the device as zigbee2mqtt leaves it
    ...Object.entries(WINDOWS).flatMap(([area, ids]) =>
      ids.map((id) => [
        `binary_sensor.${id}`,
        'off',
        { device_class: 'window', friendly_name: id.replace(/_/g, ' ') },
        { platform: 'mqtt', device_id: `dev-${id}`, area_id: null },
      ]),
    ),
    ...DECOYS.map((decoy) => [
      `binary_sensor.${decoy.id}`,
      'off',
      { device_class: decoy.device_class, friendly_name: decoy.name },
      { platform: 'mock', device_id: decoy.device, area_id: null },
    ]),

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
  /* the bedroom window is on the latch while the unit cools */
  bukora: {
    'climate.halo_szoba': { state: 'cool', temperature: 23, fan_mode: '3', hvac_action: 'cooling' },
    'climate.nappali': { state: 'off', hvac_action: 'off' },
    'climate.gyerekszoba': { state: 'off', hvac_action: 'off' },
    'climate.dolgozo': { state: 'off', hvac_action: 'off' },
    'binary_sensor.halo_ablak_top': { state: 'on', openFor: 35 },
  },
  /* cooling into an open terrace door, with the car reporting open too */
  nyitott_ablak: {
    'climate.nappali': { state: 'cool', temperature: 23, fan_mode: '4', hvac_action: 'cooling' },
    'climate.halo_szoba': { state: 'cool', temperature: 24, hvac_action: 'cooling' },
    'climate.gyerekszoba': { state: 'off', hvac_action: 'off' },
    'binary_sensor.nappali_terasz_ajto': { state: 'on', openFor: 23 },
    /* both contacts of the bedroom window: one window swung open, not two */
    'binary_sensor.halo_ablak_top': { state: 'on', openFor: 50 },
    'binary_sensor.halo_ablak_bottom': { state: 'on', openFor: 50 },
    'binary_sensor.gyerek_ablak': { state: 'on', openFor: 90 },
    'binary_sensor.skoda_ablakok': { state: 'on', openFor: 300 },
    'binary_sensor.nappali_bejarati_ajto': { state: 'on', openFor: 12 },
  },
};

export function makeHass(scenario = 'futes') {
  const overrides = SCENARIOS[scenario] || {};
  const states = {};
  const entities = {};
  const areas = Object.fromEntries(
    ROOMS.map((room) => [room.area, { area_id: room.area, name: room.name }]),
  );
  areas.virtual = { area_id: 'virtual', name: 'Virtuális' };

  const devices = Object.fromEntries(
    ROOMS.map((room) => [room.device, { id: room.device, name: room.name, area_id: room.area }]),
  );
  for (const [area, ids] of Object.entries(WINDOWS)) {
    for (const id of ids) devices[`dev-${id}`] = { id: `dev-${id}`, name: id, area_id: area };
  }
  for (const decoy of DECOYS) {
    devices[decoy.device] = { id: decoy.device, name: decoy.name, area_id: decoy.area };
  }

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

    /* contacts need a `last_changed`: the cards measure how long a window has
       been open from it, and a missing one reads as "unknown", not "just now" */
    const openFor = finalAttrs.openFor;
    delete finalAttrs.openFor;
    const ageMs = entityId.startsWith('binary_sensor.')
      ? (openFor ?? (finalState === 'on' ? 40 : 180)) * 60_000
      : 3600_000;

    states[entityId] = {
      entity_id: entityId,
      state: String(finalState),
      attributes: finalAttrs,
      last_changed: new Date(Date.now() - ageMs).toISOString(),
    };
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
    areas,
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
