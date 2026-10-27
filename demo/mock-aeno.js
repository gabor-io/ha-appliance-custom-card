/**
 * Mock `hass` for the AENO panel heater card, shaped after the real pair.
 *
 * Both panels report the same `friendly_name` ("AENO Smart Heater"), because
 * that is the name the app gave them - so the card has to take its title from
 * the **area**, and the editor's picker has to say which room each one is in.
 * That collision is deliberate here.
 *
 * Two device profiles are represented, because the panel can be running under
 * either one:
 *
 * - **full**: the profile from `docs/aeno-capabilities.md`, with the demand
 *   signal, the two heating modes, power, energy, the panel's own surface
 *   temperature, the element limit, the child lock and the countdown;
 * - **stock**: `princess_panel_heater`, which the AGH0001S matches out of the
 *   box and which gives nothing but on/off, the setpoint and the room
 *   temperature. The card has to lose its extras quietly, not show dead ones.
 */

const AREAS = {
  dolgozo: { area_id: 'dolgozo', name: 'Dolgozó' },
  halo: { area_id: 'halo', name: 'Hálószoba' },
};

/** The entity ids both panels create. Study = full profile, bedroom = stock. */
function panelEntities(id, profile) {
  const base = {
    climate: `climate.aeno_smart_heater${id}`,
    unit: `select.aeno_smart_heater${id}_homerseklet_mertekegysege`,
  };
  if (profile !== 'full') return base;
  return {
    ...base,
    panel: `sensor.aeno_smart_heater${id}_panel_temperature`,
    power: `sensor.aeno_smart_heater${id}_teljesitmeny`,
    energy: `sensor.aeno_smart_heater${id}_energia`,
    lock: `lock.aeno_smart_heater${id}_gyerekzar`,
    limit: `number.aeno_smart_heater${id}_maximum_homerseklet`,
    timer: `select.aeno_smart_heater${id}_idozito`,
    remaining: `sensor.aeno_smart_heater${id}_hatralevo_ido`,
    mount: `switch.aeno_smart_heater${id}_ceiling_mount`,
    brightness: `select.aeno_smart_heater${id}_indicator_brightness`,
  };
}

const PANELS = [
  { id: '', device: 'dev-study', area: 'dolgozo', profile: 'full' },
  { id: '_2', device: 'dev-bed', area: 'halo', profile: 'stock' },
];

/**
 * Window contacts, by area.
 *
 * The study's window is a tilt-and-turn: two contacts on one sash, where the
 * top one alone means it is only on the latch. Their ids carry the shape a
 * real installation has - the position word sits in the **middle**, and the
 * friendly name words it differently again, because the id was generated from
 * an older name. The bedroom has no contact at all, and the card has to say so
 * rather than imply the window is shut.
 */
const WINDOWS = {
  dolgozo: [
    ['dolgozo_ablak_felso_utcai_sensor', 'Dolgozó utcai ablak felső'],
    ['dolgozo_ablak_also_utcai_sensor', 'Dolgozó utcai ablak alsó'],
  ],
};

function climateState(panel, over = {}) {
  const full = panel.profile === 'full';
  return {
    entity_id: panelEntities(panel.id, panel.profile).climate,
    state: 'heat',
    attributes: {
      friendly_name: 'AENO Smart Heater',
      hvac_modes: ['off', 'heat'],
      min_temp: 0,
      max_temp: 40,
      target_temp_step: 1,
      current_temperature: 21.5,
      temperature: 24,
      /* the stock profile reports neither of these */
      ...(full ? { hvac_action: 'heating', preset_mode: 'comfort', preset_modes: ['comfort', 'manual'] } : {}),
      supported_features: full ? 401 : 385,
      ...over,
    },
    last_changed: new Date(Date.now() - 42 * 60000).toISOString(),
  };
}

/**
 * @param {object} over per-panel attribute overrides, plus the extras:
 *   `panelTemp`, `power`, `energy`, `locked`, `limit`, `timer`, `remaining`
 */
function buildPanel(hass, panel, over = {}) {
  const ids = panelEntities(panel.id, panel.profile);
  const { panelTemp, power, energy, locked, limit, timer, remaining, ...attrs } = over;

  hass.devices[panel.device] = {
    id: panel.device,
    name: 'AENO Smart Heater',
    name_by_user: null,
    area_id: panel.area,
  };

  const add = (entityId, state, attributes = {}, registry = {}) => {
    hass.states[entityId] = { entity_id: entityId, state: String(state), attributes };
    hass.entities[entityId] = {
      entity_id: entityId,
      device_id: panel.device,
      platform: 'tuya_local',
      area_id: null,
      ...registry,
    };
  };

  hass.states[ids.climate] = climateState(panel, attrs);
  hass.entities[ids.climate] = {
    entity_id: ids.climate,
    device_id: panel.device,
    platform: 'tuya_local',
    area_id: null,
    /* tuya-local sets this from the profile's `translation_only_key: heater`,
       which is how the card tells a panel heater from the air conditioners
       that arrive on the same platform */
    translation_key: 'heater',
  };

  add(ids.unit, 'celsius', { options: ['celsius', 'fahrenheit'] }, { translation_key: 'temperature_unit' });
  if (panel.profile !== 'full') return;

  add(ids.panel, panelTemp ?? 52, { device_class: 'temperature', unit_of_measurement: '°C' });
  add(ids.power, power ?? 802, { device_class: 'power', unit_of_measurement: 'W' });
  add(ids.energy, energy ?? 721.004, { device_class: 'energy', unit_of_measurement: 'kWh' });
  add(ids.lock, locked ? 'locked' : 'unlocked', {}, { translation_key: 'child_lock' });
  add(
    ids.limit,
    limit ?? 120,
    { min: 60, max: 120, step: 5, unit_of_measurement: '°C' },
    { translation_key: 'maximum_temperature' },
  );
  add(
    ids.timer,
    timer ?? 'cancel',
    { options: ['cancel', ...Array.from({ length: 24 }, (_, i) => `${i + 1}h`)] },
    { translation_key: 'timer' },
  );
  add(ids.remaining, remaining ?? 0, { device_class: 'duration', unit_of_measurement: 'min' }, { translation_key: 'time_remaining' });
  add(ids.mount, 'off');
  add(ids.brightness, 'off', { options: ['Off', 'Low', 'Medium', 'High'] });
}

function buildWindows(hass, openSeconds = {}) {
  for (const [area, contacts] of Object.entries(WINDOWS)) {
    for (const [objectId, friendlyName] of contacts) {
      const entityId = `binary_sensor.${objectId}`;
      const seconds = openSeconds[objectId];
      const open = seconds !== undefined;
      hass.states[entityId] = {
        entity_id: entityId,
        state: open ? 'on' : 'off',
        attributes: { device_class: 'window', friendly_name: friendlyName },
        last_changed: new Date(Date.now() - (seconds ?? 9000) * 1000).toISOString(),
      };
      hass.entities[entityId] = {
        entity_id: entityId,
        device_id: `dev-${objectId}`,
        platform: 'zha',
        area_id: null,
      };
      hass.devices[`dev-${objectId}`] = { id: `dev-${objectId}`, name: objectId, area_id: area };
    }
  }
}

/* Each scenario says what the two panels are doing. `over` lands on the study
   panel (the full profile), `over2` on the bedroom one (the stock profile). */
const SCENARIOS = {
  most: { over: {}, windows: {} },

  'elérte': {
    over: {
      hvac_action: 'idle',
      current_temperature: 24,
      temperature: 24,
      power: 0,
      panelTemp: 61,
    },
    windows: {},
  },

  /* the one trap: in Constant the element ignores the setpoint entirely */
  folyamatos: {
    over: { preset_mode: 'manual', current_temperature: 24.4, temperature: 24, panelTemp: 66 },
    windows: {},
  },

  /* switched on a minute ago: the device says "heating" long before the plate
     radiates anything, and the drawing must not pretend otherwise */
  melegszik: {
    over: { current_temperature: 18.2, temperature: 24, panelTemp: 29, power: 802 },
    windows: {},
  },

  ki: {
    over: { state: 'off', hvac_action: 'off', power: 0, panelTemp: 23 },
    over2: { state: 'off' },
    windows: {},
  },

  halott: { over: { state: 'unavailable' }, windows: {} },
  /* tuya-local marks every entity of an offline device unavailable, not just
     the climate one, so the readings have to vanish with it */

  /* heating a room whose tilt-and-turn window has been on the latch an hour */
  bukó: { over: {}, windows: { dolgozo_ablak_felso_utcai_sensor: 3600 } },

  'nyitva': {
    over: {},
    windows: {
      dolgozo_ablak_felso_utcai_sensor: 2400,
      dolgozo_ablak_also_utcai_sensor: 2400,
    },
  },

  'időzítő': { over: { timer: '3h', remaining: 179 }, windows: {} },

  zár: { over: { locked: true }, windows: {} },

  /* the element limit turned right down - the panel will not get as hot */
  'lap 60': { over: { limit: 60, panelTemp: 44 }, windows: {} },
};

function makeHass(key) {
  const scenario = SCENARIOS[key] || SCENARIOS.most;
  const hass = {
    states: {},
    entities: {},
    devices: {},
    areas: { ...AREAS },
    config: { unit_system: { temperature: '°C' } },
    locale: { language: 'hu' },
    themes: { darkMode: false },
    callService: (domain, service, data) => {
      // eslint-disable-next-line no-console
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };

  const [study, bedroom] = PANELS;
  buildPanel(hass, study, scenario.over || {});
  buildPanel(hass, bedroom, scenario.over2 || {});
  buildWindows(hass, scenario.windows || {});

  /* the `state` override lands on the climate entity's state, not on its
     attributes, so it has to be moved after the fact */
  for (const [panel, over] of [[study, scenario.over], [bedroom, scenario.over2]]) {
    const ids = panelEntities(panel.id, panel.profile);
    if (!over?.state) continue;
    hass.states[ids.climate].state = over.state;
    if (over.state !== 'unavailable') continue;
    hass.states[ids.climate].attributes = {};
    /* the whole device goes with it */
    for (const entityId of Object.values(ids)) {
      if (hass.states[entityId]) hass.states[entityId].state = 'unavailable';
    }
  }

  return hass;
}

window.demo = { SCENARIOS, makeHass, PANELS, panelEntities };
