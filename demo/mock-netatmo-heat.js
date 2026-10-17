/**
 * Mock `hass` for the heating card, shaped after a real Netatmo installation:
 * one thermostat, seven valves, five rooms, and window contacts in four of
 * them. The awkward cases are deliberate - they all happen on real hardware.
 */

const ROOMS = [
  { id: 'etkezo', area: 'etkezo', name: 'Étkező', kind: 'valve', temp: 13 },
  { id: 'halo', area: 'halo', name: 'Hálószoba', kind: 'thermostat', temp: 22.6 },
  { id: 'furdo', area: 'furdo', name: 'Fürdőszoba', kind: 'valve', temp: 21 },
  { id: 'gyerek', area: 'gyerek', name: 'Gyerekszoba', kind: 'valve', temp: 20.5 },
  { id: 'kis', area: 'kis', name: 'Kisszoba', kind: 'valve', temp: null },
];

/** head id -> [entity suffix, battery] */
const HEADS = {
  etkezo: [['valve', 90]],
  halo: [['thermostat', 75], ['valve', 90]],
  furdo: [['valve_slim_radiator', 75], ['valve_window', 75]],
  gyerek: [['valve_garden', 75], ['valve_street', null]],
  kis: [['valve', null]],
};

/**
 * Window contacts, by area - the dining room deliberately has none.
 *
 * The bedroom window is a bukó-nyíló with two contacts on the **same**
 * sash: `_top` and `_bottom`. Top alone means the window is on the latch;
 * both mean it is swung open. Either way it is one window, not two.
 */
const WINDOWS = {
  halo: ['halo_window_top', 'halo_window_bottom'],
  furdo: ['furdo_window_1', 'furdo_window_2'],
  gyerek: ['gyerek_window_street', 'gyerek_window_garden'],
  kis: ['kis_window'],
};

const SCHEDULES = ['Winter', 'Holiday', 'Spring Autumn', 'Summer', 'Gas saver', 'Electric'];

function climateAttrs(room, over) {
  const base = {
    friendly_name: `${room.name} Netatmo Valve`,
    hvac_modes: room.kind === 'thermostat' ? ['auto', 'heat', 'off'] : ['auto', 'heat'],
    preset_modes: ['away', 'boost', 'frost_guard', 'schedule'],
    min_temp: 7,
    max_temp: 30,
    target_temp_step: 0.5,
    supported_features: 401,
    current_temperature: room.temp,
    temperature: 7,
    hvac_action: 'idle',
    preset_mode: 'frost_guard',
    selected_schedule: 'Gas saver',
    ...over,
  };
  /* the thermostat never reports a heating request - the key is absent,
     which is a different thing from zero */
  if (room.kind !== 'thermostat' && base.heating_power_request === undefined) {
    base.heating_power_request = 0;
  }
  if (room.kind === 'thermostat') delete base.heating_power_request;
  return base;
}

export const SCENARIOS = {
  most: {},
  futes: {
    schedule: 'Winter',
    climate: {
      'climate.etkezo': { state: 'auto', temperature: 21, heating_power_request: 100, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.halo': { state: 'auto', temperature: 20, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.furdo': { state: 'auto', temperature: 23, heating_power_request: 42, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.gyerek': { state: 'auto', temperature: 21, heating_power_request: 0, preset_mode: 'schedule' },
    },
    windows: { gyerek_window_street: 'on' },
  },
  nyitott_ablak: {
    schedule: 'Winter',
    climate: {
      'climate.furdo': { state: 'auto', temperature: 23, heating_power_request: 78, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.etkezo': { state: 'auto', temperature: 21, heating_power_request: 55, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.halo': { state: 'auto', temperature: 20, preset_mode: 'schedule' },
      'climate.gyerek': { state: 'auto', temperature: 21, heating_power_request: 0, preset_mode: 'schedule' },
    },
    windows: { furdo_window_1: 'on' },
    windowAgeMinutes: 23,
  },
  /* the bedroom window is on the latch while the room is heating: only the
     top contact is open */
  bukora: {
    schedule: 'Winter',
    climate: {
      'climate.halo': { state: 'auto', temperature: 21, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.etkezo': { state: 'auto', temperature: 21, heating_power_request: 40, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.furdo': { state: 'auto', temperature: 23, heating_power_request: 0, preset_mode: 'schedule' },
      'climate.gyerek': { state: 'auto', temperature: 21, heating_power_request: 0, preset_mode: 'schedule' },
    },
    windows: { halo_window_top: 'on' },
    windowAgeMinutes: 35,
  },
  /* the same window swung fully open: both contacts, still one window */
  teljesen_nyitva: {
    schedule: 'Winter',
    climate: {
      'climate.halo': { state: 'auto', temperature: 21, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.etkezo': { state: 'auto', temperature: 21, heating_power_request: 40, hvac_action: 'heating', preset_mode: 'schedule' },
      'climate.furdo': { state: 'auto', temperature: 23, heating_power_request: 0, preset_mode: 'schedule' },
      'climate.gyerek': { state: 'auto', temperature: 21, heating_power_request: 0, preset_mode: 'schedule' },
    },
    windows: { halo_window_top: 'on', halo_window_bottom: 'on' },
    windowAgeMinutes: 8,
  },
  tavollet: {
    climate: Object.fromEntries(
      ROOMS.map((room) => [`climate.${room.id}`, { temperature: 12, preset_mode: 'away' }]),
    ),
  },
};

export function makeHass(scenario = 'most') {
  const over = SCENARIOS[scenario] || {};
  const states = {};
  const entities = {};
  const devices = {};
  const areas = {};

  const add = (entityId, state, attributes, registry) => {
    states[entityId] = {
      entity_id: entityId,
      state: String(state),
      attributes,
      last_changed: new Date(Date.now() - 3600_000).toISOString(),
    };
    entities[entityId] = { entity_id: entityId, ...registry };
  };

  for (const room of ROOMS) {
    areas[room.area] = { area_id: room.area, name: room.name };
    const deviceId = `dev_${room.id}`;
    devices[deviceId] = { id: deviceId, name: room.name, area_id: room.area };

    const climateId = `climate.${room.id}`;
    const dead = room.temp === null;
    const attrs = climateAttrs(room, over.climate?.[climateId] || {});
    if (dead) {
      add(climateId, 'unavailable', {
        friendly_name: attrs.friendly_name,
        hvac_modes: attrs.hvac_modes,
        preset_modes: attrs.preset_modes,
        min_temp: 7, max_temp: 30, target_temp_step: 0.5, supported_features: 401,
      }, { platform: 'netatmo', device_id: deviceId });
    } else {
      add(climateId, attrs.state || 'auto', attrs, { platform: 'netatmo', device_id: deviceId });
    }

    for (const [suffix, battery] of HEADS[room.id]) {
      const id = `sensor.${room.id}_netatmo_${suffix}_battery_percent`;
      add(id, battery === null ? 'unavailable' : battery,
        { device_class: 'battery', unit_of_measurement: '%', friendly_name: `${room.name} Netatmo Valve Elem` },
        { platform: 'netatmo', device_id: deviceId, original_device_class: 'battery' });
    }

    for (const windowId of WINDOWS[room.id] || []) {
      const id = `binary_sensor.${windowId}_contact`;
      const open = over.windows?.[windowId] === 'on';
      const ageMs = (over.windowAgeMinutes ?? 40) * 60_000;
      states[id] = {
        entity_id: id,
        state: open ? 'on' : 'off',
        attributes: { device_class: 'window', friendly_name: windowId.replace(/_/g, ' ') },
        last_changed: new Date(Date.now() - (open ? ageMs : 7200_000)).toISOString(),
      };
      /* area comes from the device, exactly as zigbee2mqtt leaves it */
      const windowDevice = `dev_${windowId}`;
      devices[windowDevice] = { id: windowDevice, name: windowId, area_id: room.area };
      entities[id] = { entity_id: id, platform: 'mqtt', device_id: windowDevice, area_id: null };
    }
  }

  // the car reports doors and windows too - these must never count as a room's
  for (const part of ['ablakok', 'ajtok_nyitva']) {
    const id = `binary_sensor.skoda_superb_combi_${part}`;
    states[id] = { entity_id: id, state: 'off', attributes: { device_class: 'window' }, last_changed: new Date().toISOString() };
    devices.dev_car = { id: 'dev_car', name: 'Škoda', area_id: 'virtual' };
    entities[id] = { entity_id: id, platform: 'myskoda', device_id: 'dev_car' };
  }

  add('select.home_netatmo_thermostat', over.schedule || 'Gas saver',
    { friendly_name: 'Home Netatmo Thermostat', options: SCHEDULES },
    { platform: 'netatmo', device_id: 'dev_home' });

  add('sensor.kulteri_homerseklet', 7,
    { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Kültéri hőmérséklet' },
    { platform: 'netatmo' });
  add('binary_sensor.kulteri_modul_csatlakozas', scenario === 'most' ? 'off' : 'on',
    { device_class: 'connectivity', friendly_name: 'Kültéri modul csatlakozás' },
    { platform: 'netatmo' });

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

window.demo = { SCENARIOS, makeHass };
