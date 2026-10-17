/**
 * Mock `hass` for the weather station card, shaped after a real Netatmo
 * account: one base station (NAMain), one outdoor module (NAModule1) and one
 * extra indoor module (NAModule4). No wind gauge and no rain gauge, because
 * there are none on the account the card was built for.
 *
 * Two awkward cases are deliberate, and both happen on real hardware:
 *
 * - the **outdoor module drops off the radio** and keeps publishing its last
 *   temperature, so only its connectivity entity knows the number is old;
 * - the **bedroom module goes flat** and its readings turn unavailable.
 *
 * The heating valves are in here too, with nothing but a battery sensor each,
 * because the card has to leave them out on its own.
 */

const MODULES = [
  {
    id: 'main',
    device: 'dev-main',
    area: 'etkezo',
    name: 'Étkező (beltéri modul)',
    sensors: { temperature: 21.5, humidity: 55, co2: 1510, noise: 36, pressure: 1025.6 },
    trend: { temperature: 'stable', pressure: 'stable' },
    connected: true,
  },
  {
    id: 'outdoor',
    device: 'dev-outdoor',
    area: 'kert',
    name: 'Kültéri modul',
    sensors: { temperature: 7, humidity: 80, battery: 54 },
    trend: { temperature: 'down' },
    connected: false, // dropped off the radio; the values are frozen
  },
  {
    id: 'bedroom',
    device: 'dev-bedroom',
    area: 'halo',
    name: 'Hálószoba (beltéri modul)',
    sensors: { temperature: 20.6, humidity: 47, co2: 640, battery: 4 },
    trend: { temperature: 'stable' },
    connected: true,
  },
];

const AREAS = {
  etkezo: 'Étkező',
  kert: 'Kert',
  halo: 'Hálószoba',
};

/** The heating devices: a battery sensor and nothing else, as in real life. */
const HEATING = [
  { device: 'dev-valve-1', area: 'etkezo', name: 'Étkező Netatmo Valve', battery: 90 },
  { device: 'dev-therm', area: 'halo', name: 'Hálószoba Netatmo Thermostat', battery: 75 },
];

const CLASSES = {
  temperature: { device_class: 'temperature', unit_of_measurement: '°C' },
  humidity: { device_class: 'humidity', unit_of_measurement: '%' },
  co2: { device_class: 'carbon_dioxide', unit_of_measurement: 'ppm' },
  noise: { device_class: 'sound_pressure', unit_of_measurement: 'dB' },
  pressure: { device_class: 'atmospheric_pressure', unit_of_measurement: 'hPa' },
  battery: { device_class: 'battery', unit_of_measurement: '%' },
};

export const SCENARIOS = {
  most: {},
  rendben: {
    outdoor: { connected: true, sensors: { temperature: 9.4, humidity: 78, battery: 54 } },
    main: { sensors: { co2: 620, temperature: 21.8 } },
    bedroom: { sensors: { battery: 68 } },
  },
  rossz_levego: {
    outdoor: { connected: true },
    main: { sensors: { co2: 1850 }, trend: { temperature: 'up' } },
    bedroom: { sensors: { co2: 1120, battery: 68 } },
  },
  halott_modul: {
    outdoor: { connected: true },
    main: { sensors: { co2: 720 } },
    bedroom: { dead: true },
  },
  elem_kritikus: {
    outdoor: { connected: true, sensors: { battery: 11 } },
    main: { sensors: { co2: 540 } },
    bedroom: { sensors: { battery: 9 } },
  },
};

export function makeHass(scenario = 'most') {
  const over = SCENARIOS[scenario] || {};
  const states = {};
  const entities = {};
  const devices = {};
  const areas = Object.fromEntries(
    Object.entries(AREAS).map(([id, name]) => [id, { area_id: id, name }]),
  );

  const put = (entityId, state, attributes, registry, ageSeconds = 120) => {
    states[entityId] = {
      entity_id: entityId,
      state: String(state),
      attributes,
      last_changed: new Date(Date.now() - ageSeconds * 1000).toISOString(),
      last_updated: new Date(Date.now() - ageSeconds * 1000).toISOString(),
    };
    entities[entityId] = { entity_id: entityId, ...registry };
  };

  for (const module of MODULES) {
    const patch = over[module.id] || {};
    const sensors = { ...module.sensors, ...(patch.sensors || {}) };
    const trend = { ...module.trend, ...(patch.trend || {}) };
    const connected = patch.connected ?? module.connected;
    const dead = Boolean(patch.dead);

    devices[module.device] = { id: module.device, name: module.name, area_id: module.area };

    for (const [key, value] of Object.entries(sensors)) {
      const id = `sensor.${module.id}_${key}`;
      /* a dead module's readings go unavailable - except the battery, which
         is the one thing it still manages to report */
      const gone = dead && key !== 'battery';
      put(
        id,
        gone ? 'unavailable' : value,
        { ...CLASSES[key], friendly_name: `${module.name} ${key}` },
        { platform: 'netatmo', device_id: module.device, original_device_class: CLASSES[key].device_class },
        /* a module that dropped off stopped updating hours ago */
        connected ? 120 : 9000,
      );
    }

    for (const [key, value] of Object.entries(trend)) {
      put(
        `sensor.${module.id}_${key}_trend`,
        dead ? 'unavailable' : value,
        { friendly_name: `${module.name} ${key} trend` },
        {
          platform: 'netatmo',
          device_id: module.device,
          translation_key: key === 'pressure' ? 'pressure_trend' : 'temp_trend',
        },
      );
    }

    put(
      `binary_sensor.${module.id}_reachable`,
      connected ? 'on' : 'off',
      { device_class: 'connectivity', friendly_name: `${module.name} kapcsolat` },
      { platform: 'netatmo', device_id: module.device, original_device_class: 'connectivity' },
    );
  }

  // the heating side: battery only, so the card must not list these
  for (const head of HEATING) {
    devices[head.device] = { id: head.device, name: head.name, area_id: head.area };
    put(
      `sensor.${head.device}_battery`,
      head.battery,
      { ...CLASSES.battery, friendly_name: `${head.name} Elem` },
      { platform: 'netatmo', device_id: head.device, original_device_class: 'battery' },
    );
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

window.demo = { SCENARIOS, makeHass };
