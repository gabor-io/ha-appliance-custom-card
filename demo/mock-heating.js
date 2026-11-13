/**
 * Mock `hass` for the heating family.
 *
 * The entity ids follow the contract in `docs/heating-capabilities.md`; the
 * room keys and names are the demo's own. A household names its rooms in its
 * own dashboard config, so nothing personal belongs in this file.
 *
 * The numbers are a real winter day: the budget is 70% spent, the pace is
 * fine, but gas alone would not get the house to the end of the period - the
 * case the card has to make visible at a glance.
 */

const HEATING_VALUE = 34.92; // MJ/m³

/** The room list the cards take in their config. */
export const ROOMS = [
  {
    key: 'bath',
    name: 'Fürdő',
    climate: 'climate.bath',
    /* the bathroom warms up for a shower on a plan of its own */
    schedule_entity: 'schedule.furdo_komfort',
    boost: false,
    humidity: 'sensor.bath_humidity',
  },
  {
    key: 'living',
    name: 'Étkező · konyha · előszoba',
    climate: 'climate.living',
    boost: false,
    humidity: 'sensor.living_humidity',
    /* the parts are plain sensors wherever they happen to live - a zone's
       points are rarely named after the zone */
    parts: [
      { key: 'etkezo', name: 'Étkező', entity: 'sensor.dining_room_temperature', comfort_key: 'dining', humidity: 'sensor.dining_room_humidity' },
      { key: 'konyha', name: 'Konyha', entity: 'sensor.kitchen_temperature', comfort_key: 'kitchen', humidity: 'sensor.kitchen_humidity' },
      { key: 'eloszoba', name: 'Előszoba', entity: 'sensor.ante_room_temperature', comfort_key: 'eloszoba', humidity: 'sensor.ante_room_humidity' },
    ],
  },
  /* boost only where there is something to boost */
  {
    key: 'room_1',
    name: 'Háló 1',
    climate: 'climate.room_1',
    boost: true,
    humidity: 'sensor.room_1_humidity',
    entities: { cop: 'sensor.klima_cop', heat_cost: 'sensor.klima_hokoltseg' },
    ac: 'climate.room_1_ac',
  },
  {
    key: 'room_2',
    name: 'Háló 2',
    climate: 'climate.room_2',
    boost: false,
    humidity: 'sensor.room_2_humidity',
    ac: 'climate.room_2_ac',
  },
  {
    key: 'room_3',
    name: 'Háló 3',
    climate: 'climate.room_3',
    boost: false,
    humidity: 'sensor.room_3_humidity',
    /* the smaller unit: same weather, lower COP */
    entities: {
      cop: 'sensor.klima_cop_kicsi',
      heat_cost: 'sensor.klima_hokoltseg_kicsi',
      inefficient: 'binary_sensor.klima_nem_hatekony',
    },
  },
  { key: 'hall', name: 'Előtér', readonly: true },
];

/* Two zones for now - eco and away come later, and the bathroom has no
   cooling setpoints at all, which the card has to survive. */
const ZONE_TEMPS = {
  futes: {
    komfort: { bath: 20.5, living: 20.5, room_1: 20.5, room_2: 20.5, room_3: 20.5 },
    ejszaka: { bath: 19, living: 19, room_1: 19.5, room_2: 19.5, room_3: 19.5 },
  },
  hutes: {
    komfort: { living: 25.5, room_1: 25.5, room_2: 25.5, room_3: 25.5 },
    ejszaka: { living: 26.5, room_1: 26.5, room_2: 26.5, room_3: 26.5 },
  },
};

/** What each season looks like, where the seasons differ. */
export const SEASONS = {
  futes: {
    season_active: 'futes',
    season_choice: 'auto',
    source: 'klima',
    reason:
      'A kazán ki van kapcsolva, a klíma fűt. A gáz a várható fűtési igény kb. 70%-át fedezné, javasolt: kazán be, hibrid üzem.',
    outside: 2,
    outdoor3: 3.4,
    cop: 3.2,
    rooms: {
      bath: {
        temp: 21.8, target: 20.5, active: 'aeno', humidity: 58,
        suggestion: 'gaz', trend: 0.9,
        why: 'Nincs klíma, a gáz fűt; zuhany előtt AENO boost.',
      },
      living: {
        temp: 20.1, target: 20.5, active: 'klima_futes',
        suggestion: 'klima', trend: 0.4, why: 'Kint 2 °C, a klíma itt gyors (1,4 °C/h) – a klíma fűt.',
      },
      room_1: {
        temp: 20.4, target: 20.5, active: 'klima_futes',
        suggestion: 'klima', trend: 1.2, why: 'Kint 2 °C, a klíma itt gyors (1,3 °C/h) – a klíma fűt.',
      },
      room_2: {
        temp: 18.2, target: 20.5, active: 'nincs', window: 'buko', paused: true, humidity: 39,
        suggestion: 'szunetel', trend: -1.8, why: 'Az ablak 34 perce bukóban, a fűtés szünetel.',
      },
      room_3: {
        temp: 20.6, target: 20.5, active: 'nincs',
        suggestion: 'gaz', trend: 0.2, why: 'Kint 2 °C, a klíma itt lassú (0,65 °C/h) – a gáz fűt.',
      },
      hall: { temp: 11.4 },
    },
  },
  hutes: {
    season_active: 'hutes',
    season_choice: 'auto',
    source: 'hutes',
    reason: 'Három napja 20 °C fölött van a kinti átlag, a klíma hűt.',
    outside: 31,
    outdoor3: 24.8,
    cop: 4.8,
    rooms: {
      bath: { temp: 26.2, target: 25.5, active: 'nincs', suggestion: 'ki', why: 'Nincs klíma a fürdőben, hűteni nem tud.' },
      living: { temp: 26.8, target: 25.5, active: 'klima_hutes', suggestion: 'hutes', why: 'Kint 31 °C, a klíma hűt.' },
      room_1: { temp: 25.9, target: 25.5, active: 'klima_hutes', suggestion: 'hutes', why: 'Kint 31 °C, a klíma hűt.' },
      room_2: {
        temp: 27.4, target: 25.5, active: 'nincs', window: 'buko', paused: true,
        suggestion: 'szunetel', why: 'Az ablak 34 perce bukóban, a hűtés szünetel.',
      },
      room_3: { temp: 25.4, target: 25.5, active: 'nincs', suggestion: 'ki', why: 'Elérte a célt, a klíma áll.' },
      hall: { temp: 24.8 },
    },
  },
  atmeneti: {
    season_active: 'atmeneti',
    season_choice: 'auto',
    source: 'ki',
    reason: 'Átmeneti idő: se fűtés, se hűtés nem indokolt.',
    outside: 16,
    outdoor3: 14.2,
    cop: 4.1,
    /* the shoulder-season mock also shows the pace sensor before it has
       enough readings - a state the card has to say out loud */
    paceUnknown: true,
    rooms: {
      bath: { temp: 21.2, target: 20.5, active: 'nincs', suggestion: 'ki', why: 'Átmeneti idő, nincs fűtési igény.' },
      living: { temp: 21.6, target: 20.5, active: 'nincs', suggestion: 'ki', why: 'Átmeneti idő, nincs fűtési igény.' },
      room_1: { temp: 21.1, target: 20.5, active: 'nincs', suggestion: 'ki', why: 'Átmeneti idő, nincs fűtési igény.' },
      room_2: { temp: 20.8, target: 20.5, active: 'nincs', suggestion: 'ki', why: 'Átmeneti idő, nincs fűtési igény.' },
      room_3: { temp: 21.3, target: 20.5, active: 'nincs', suggestion: 'ki', why: 'Átmeneti idő, nincs fűtési igény.' },
      hall: { temp: 17.9 },
    },
  },
};

/**
 * The weekly plan as the schedule helper stores it: only the comfort bands,
 * everything between them is the night band. Weekdays and the weekend differ,
 * so copying a day has something to do.
 */
const BAND = (from, to) => ({ from, to });
export const bathSchedule = {
  id: 'furdo_komfort',
  name: 'Fürdő – komfort sáv',
  ...Object.fromEntries(
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => [
      day,
      [BAND('05:30:00', '09:00:00'), BAND('19:30:00', '23:00:00')],
    ]),
  ),
};

export const schedule = {
  id: 'futes_komfort',
  name: 'Fűtés – komfort sáv',
  monday: [BAND('05:45:00', '21:30:00')],
  tuesday: [BAND('05:45:00', '21:30:00')],
  wednesday: [BAND('05:45:00', '21:30:00')],
  thursday: [BAND('05:45:00', '21:30:00')],
  friday: [BAND('05:45:00', '22:30:00')],
  saturday: [BAND('07:30:00', '23:00:00')],
  sunday: [BAND('07:30:00', '21:30:00')],
};

function entity(entity_id, state, attributes = {}, lastChanged) {
  return [
    entity_id,
    {
      entity_id,
      state: state === null || state === undefined ? 'unknown' : String(state),
      attributes,
      last_changed: lastChanged || new Date().toISOString(),
      last_updated: lastChanged || new Date().toISOString(),
    },
  ];
}

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60000).toISOString();

export function makeHass(seasonKey = 'futes') {
  const season = SEASONS[seasonKey] || SEASONS.futes;

  const used = 1278.75;
  const budget = 1822.6;
  const left = Number((budget - used).toFixed(2));
  const reserve = 90;
  const allowed = 1345.4;
  const daysLeft = 50;
  const hotWater = 2.5;
  const heatingDaily = 6.58;
  const forecast = 598;

  const states = Object.fromEntries([
    /* --- gas meter and budget --- */
    entity('sensor.gazora_allas', 24781.42, { unit_of_measurement: 'm³', friendly_name: 'Gázóra állás' }),
    entity('input_number.gazora_kezi_allas', 24781.42, { min: 0, max: 99999, step: 0.01 }),
    entity('input_datetime.gazora_kezi_idopont', '2026-11-10 01:40:00', {
      timestamp: Math.floor(new Date('2026-11-10T01:40:00').getTime() / 1000),
    }),
    entity('binary_sensor.gazadat_elavult', 'off'),

    entity('sensor.gazkeret_m3', budget, { unit_of_measurement: 'm³' }),
    entity('sensor.gazkeret_felhasznalt', used, { unit_of_measurement: 'm³' }),
    entity('sensor.gazkeret_maradek', left, { unit_of_measurement: 'm³' }),
    entity('sensor.gazkeret_megengedett_eddig', allowed, { unit_of_measurement: 'm³' }),
    entity('input_number.gazkeret_tartalek', reserve, { min: 0, max: 400, step: 5 }),
    entity('sensor.gazkeret_hatralevo_nap', daysLeft, { unit_of_measurement: 'd' }),

    entity('sensor.gaz_napi_utem', season.paceUnknown ? 'unavailable' : 2.3, {
      unit_of_measurement: 'm³/d',
    }),
    entity('sensor.gaz_futesi_keret_napi', heatingDaily, { unit_of_measurement: 'm³/d' }),
    entity('input_number.gaz_melegviz_napi', hotWater, { min: 0, max: 10, step: 0.1 }),
    entity('sensor.gaz_elorejelzes_csak_gaz', forecast, { unit_of_measurement: 'm³' }),
    /* maradék − tartalék − előrejelzés = 543,75 − 90 − 600 = −146,25 */
    entity('sensor.gaz_elorejelzes_egyenleg', Number((left - reserve - forecast).toFixed(2)), {
      unit_of_measurement: 'm³',
    }),

    /* --- house controls --- */
    entity('input_select.futes_mod', 'auto', {
      options: ['auto', 'csak_gaz', 'csak_klima', 'tavol', 'ki'],
    }),
    entity('input_select.klima_evszak', season.season_choice, {
      options: ['auto', 'futes', 'hutes'],
    }),
    entity('sensor.klima_evszak_aktiv', season.season_active),
    entity('sensor.futes_forras', season.source),
    entity('sensor.futes_forras_indoklas', season.reason),
    entity('input_boolean.kazan_uzemkesz', 'off'),
    entity('input_boolean.szellozteto_gaz_retesz', 'off'),
    entity('sensor.kulso_homerseklet', season.outside, { unit_of_measurement: '°C' }),
    entity('sensor.kinti_homerseklet_3_napos_atlag', season.outdoor3, {
      unit_of_measurement: '°C',
      friendly_name: 'Kinti hőmérséklet, 3 napos átlag',
    }),

    /* --- the weekly plan: a built-in schedule helper --- */
    entity('schedule.futes_komfort', 'on', {
      friendly_name: 'Fűtés – komfort sáv',
      next_event: new Date(new Date().setHours(21, 30, 0, 0)).toISOString(),
      editable: true,
    }),
    entity('schedule.furdo_komfort', 'off', {
      friendly_name: 'Fürdő – komfort sáv',
      next_event: new Date(new Date().setHours(19, 30, 0, 0)).toISOString(),
      editable: true,
    }),
    entity('input_boolean.futes_automatika', 'on'),
    /* the heat pump's own economics, as the house calculates them */
    entity('sensor.klima_cop', season.cop, { state_class: 'measurement' }),
    entity('sensor.klima_cop_kicsi', season.cop ? Number((season.cop - 0.7).toFixed(1)) : null, {
      state_class: 'measurement',
    }),
    entity('sensor.klima_hokoltseg_kicsi', season.cop ? Number((70 / (season.cop - 0.7)).toFixed(1)) : null, {
      unit_of_measurement: 'Ft/kWh',
    }),
    entity('sensor.klima_hokoltseg', season.cop ? Number((70 / season.cop).toFixed(1)) : null, {
      unit_of_measurement: 'Ft/kWh',
    }),
    entity('binary_sensor.klima_nem_hatekony', season.cop && season.cop < 2 ? 'on' : 'off', {
      device_class: 'problem',
    }),
  ]);

  /* --- zone setpoints, both seasons --- */
  for (const [seasonName, zones] of Object.entries(ZONE_TEMPS)) {
    const domain = seasonName === 'hutes' ? 'input_number.hutes_zona' : 'input_number.futes_zona';
    for (const [zone, perRoom] of Object.entries(zones)) {
      for (const [room, value] of Object.entries(perRoom)) {
        const [id, obj] = entity(`${domain}_${zone}_${room}`, value, {
          min: 5,
          max: 32,
          step: 0.5,
          unit_of_measurement: '°C',
        });
        states[id] = obj;
      }
    }
  }

  const put = (...args) => {
    const [id, obj] = entity(...args);
    states[id] = obj;
  };

  /**
   * How a place feels. The word carries a humidity note after a separator,
   * exactly as the Home Assistant side writes it.
   */
  function putComfort(key, measured) {
    if (!key || measured === null || measured === undefined) return;
    const felt = Number((measured - 0.4).toFixed(1));
    let word = 'Kellemes';
    if (felt < 18) word = 'Hideg';
    else if (felt < 19.5) word = 'Hűvös';
    else if (felt > 27) word = 'Túl meleg';
    else if (felt > 24.5) word = 'Meleg';
    put(`sensor.hoerzet_${key}`, felt, { unit_of_measurement: '°C' });
    put(`sensor.komfort_${key}`, key === 'kitchen' ? `${word} · párás` : word);
  }

  /* --- rooms --- */
  for (const room of ROOMS) {
    const mock = season.rooms[room.key] || {};

    /* only the zone has a computed temperature sensor of its own; in every
       other room the thermostat reports the Sonoff sensor behind it */
    if (room.parts?.length || room.readonly) {
      put(`sensor.futes_${room.key}_homerseklet`, mock.temp, { unit_of_measurement: '°C' });
    }
    putComfort(room.key, mock.temp);
    if (room.readonly) {
      put(`binary_sensor.futes_${room.key}_fagyveszely`, mock.temp !== undefined && mock.temp < 6 ? 'on' : 'off');
      continue;
    }

    put(`sensor.futes_${room.key}_cel`, mock.target, { unit_of_measurement: '°C' });
    put(`input_number.futes_${room.key}_cel`, mock.target, { min: 5, max: 30, step: 0.5 });
    put(`input_select.futes_${room.key}_uzemmod`, mock.mode === 'off' ? 'ki' : 'auto', {
      options: ['auto', 'ki'],
    });

    /* the room thermostat: a template climate entity the logic publishes */
    const modes = room.key === 'bath' ? ['heat', 'off'] : ['heat', 'cool', 'off'];
    put(room.climate || `climate.${room.key}`, mock.mode || (seasonKey === 'hutes' ? 'cool' : 'heat'), {
      friendly_name: room.name,
      hvac_modes: modes,
      current_temperature: mock.temp,
      temperature: mock.target,
      min_temp: 5,
      max_temp: 30,
      target_temp_step: 0.5,
      hvac_action: mock.active && mock.active !== 'nincs' ? 'heating' : 'idle',
      supported_features: 1,
    });

    put(`sensor.futes_${room.key}_aktiv`, mock.active || 'nincs');
    put(`sensor.futes_${room.key}_forras_javaslat`, mock.suggestion || 'ki');
    put(`sensor.futes_${room.key}_forras_indoklas`, mock.why || '');
    put(
      `sensor.futes_${room.key}_ablak`,
      mock.window || 'zarva',
      {},
      mock.window ? minutesAgo(34) : minutesAgo(600),
    );
    put(`binary_sensor.futes_${room.key}_szunetel`, mock.paused ? 'on' : 'off');
    put(
      `sensor.futes_elofutes_${room.key}`,
      room.key === 'room_1' ? new Date(Date.now() + 95 * 60000).toISOString() : 'unknown',
      room.key === 'room_1' ? { device_class: 'timestamp', irany: seasonKey === 'hutes' ? 'hutes' : 'futes' } : {},
    );

    /* the learned heat-up rates, and the measurement that is running now */
    /* the bathroom has no heat pump: gas and the infrared panel only */
    const learned =
      room.key === 'bath'
        ? { gaz: 0.8, aeno: 0.98 }
        : { klima: 1.3, gaz: 0.85, hutes: 1.1, hibrid: 1.55 };
    for (const [source, value] of Object.entries(learned)) {
      put(`input_number.futes_tanult_${room.key}_${source}`, value, { min: 0, max: 5, step: 0.05 });
    }

    if (room.humidity) put(room.humidity, mock.humidity ?? 46, { unit_of_measurement: '%', device_class: 'humidity' });
    /* only one room is fitted with the sensor that says the heat pump is
       losing ground; elsewhere the entity simply does not exist */
    if (room.key === 'room_1') put(`binary_sensor.futes_${room.key}_elmarad`, 'on');

    /* the room's air conditioner, as the Daikin integration reports it:
       the flap list always claims four modes, only two of which work */
    if (room.ac) {
      put(room.ac, seasonKey === 'hutes' ? 'cool' : 'heat', {
        friendly_name: `${room.name} klíma`,
        swing_modes: ['Off', 'Vertical', 'Horizontal', '3D'],
        swing_mode: room.key === 'room_1' ? 'Vertical' : 'Off',
        hvac_modes: ['heat', 'cool', 'fan_only', 'off'],
        current_temperature: mock.temp,
        temperature: mock.target,
      });
    }

    /* a few rooms already have enough warm-ups for a regression */
    if (room.key === 'room_1') {
      put(
        `input_text.futes_felfutes_regr_${room.key}`,
        JSON.stringify({ klima: [6, 78, 7.9, 1040, 100.2, -0.035], gaz: [2, 24, 2.1, 300, 25, -1] }),
        { max: 255 },
      );
    }

    /* the learned rate recomputed for the difference outside right now, and
       the room's own loss factor */
    const activeSource =
      seasonKey === 'hutes' ? 'hutes' : room.key === 'bath' ? 'aeno' : mock.suggestion === 'gaz' ? 'gaz' : 'klima';
    const refRate = room.key === 'bath' ? 0.98 : 1.3;
    const delta = Math.abs((mock.temp ?? 20) - season.outside);
    const reference = seasonKey === 'hutes' ? 8 : 15;
    put(
      `sensor.futes_sebesseg_${room.key}`,
      Number((refRate - 0.03 * (delta - reference)).toFixed(2)),
      { unit_of_measurement: '°C/h', forras: activeSource },
    );
    put(`input_number.futes_hoveszteseg_${room.key}`, room.key === 'bath' ? 0.02 : 0.015, {
      min: 0.002,
      max: 0.06,
      step: 0.001,
    });

    /* what the logic learned about this room's radiator valve */
    if (room.key === 'room_3') {
      put(`input_number.futes_szelep_eltolas_${room.key}`, -1.5, { min: -4, max: 5, step: 0.1 });
    }

    /* where the room is heading: a derivative helper, °C/hour */
    put(`sensor.futes_trend_${room.key}`, mock.trend ?? 0, {
      unit_of_measurement: '°C/h',
      friendly_name: `${room.name} trend`,
    });
    put(
      `input_text.futes_tanulas_${room.key}`,
      room.key === 'room_3' ? `${Math.floor(Date.now() / 1000) - 1800}|19.4|gaz|20.5|fel` : '',
      { max: 255 },
    );

    if (room.parts?.length) {
      const offsets = { etkezo: 0, konyha: 1.9, eloszoba: -1.1 };
      for (const part of room.parts) {
        const value = Number(((mock.temp || 0) + offsets[part.key]).toFixed(1));
        put(part.entity, value, { unit_of_measurement: '°C' });
        if (part.humidity) {
          put(part.humidity, part.key === 'konyha' ? 61 : 44, {
            unit_of_measurement: '%',
            device_class: 'humidity',
          });
        }
        put(`binary_sensor.futes_${room.key}_${part.key}_kizarva`, part.key === 'konyha' ? 'on' : 'off');
        putComfort(part.comfort_key, value);
      }
      put(`sensor.futes_${room.key}_mertado`, seasonKey === 'hutes' ? 'konyha' : 'eloszoba');
      put(`input_select.futes_${room.key}_aggregalas`, 'auto', { options: ['auto', 'atlag'] });
      put(`binary_sensor.futes_${room.key}_tulloves_korlat`, 'off');
    }
  }

  return {
    states,
    entities: Object.fromEntries(
      Object.keys(states).map((id) => [id, { entity_id: id, device_id: 'demo', platform: 'demo' }]),
    ),
    devices: { demo: { id: 'demo', name: 'Fűtésvezérlés' } },
    language: 'hu',
    locale: { language: 'hu', time_format: '24' },
    callService: (domain, service, data) => {
      // eslint-disable-next-line no-console
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
    /**
     * The weekly blocks do not live in the state machine, so the card reads
     * and writes them over the websocket, exactly as the helper's own editor
     * does. The demo answers the same three commands.
     */
    callWS: (message) => {
      // eslint-disable-next-line no-console
      console.log('callWS', JSON.stringify(message));
      if (message.type === 'schedule/list') {
        return Promise.resolve([{ ...schedule }, { ...bathSchedule }]);
      }
      if (message.type === 'config/entity_registry/get') {
        const unique = message.entity_id === 'schedule.furdo_komfort' ? bathSchedule.id : schedule.id;
        return Promise.resolve({ entity_id: message.entity_id, unique_id: unique });
      }
      if (message.type === 'schedule/update') {
        const { type, schedule_id: id, ...rest } = message;
        const item = id === bathSchedule.id ? bathSchedule : schedule;
        Object.assign(item, rest);
        return Promise.resolve({ ...item });
      }
      if (message.type === 'history/history_during_period') {
        /* 24 hours of plausible readings so the sparkline has something to
           draw: a slow daily swing around the room's current value */
        const now = Date.now();
        const out = {};
        for (const id of message.entity_ids || []) {
          const climate = id.startsWith('climate.');
          const base = climate
            ? Number(states[id]?.attributes?.current_temperature)
            : Number(states[id]?.state);
          if (!Number.isFinite(base)) continue;
          const rows = [];
          for (let step = 0; step <= 48; step += 1) {
            const when = now - (48 - step) * 30 * 60 * 1000;
            const swing = id.startsWith('input_number.')
              ? 0
              : Math.sin((step / 48) * Math.PI * 2) * 0.8 + (Math.random() - 0.5) * 0.15;
            rows.push(
              climate
                ? { s: states[id].state, lu: when / 1000, a: { current_temperature: Number((base + swing).toFixed(2)) } }
                : { s: (base + swing).toFixed(2), lu: when / 1000 },
            );
          }
          /* a setpoint moves in steps, so the mock gives it one */
          if (id.startsWith('input_number.')) {
            rows[20] = { s: (base - 1.5).toFixed(2), lu: rows[20].lu };
            for (let i = 0; i < 20; i += 1) rows[i] = { s: (base - 1.5).toFixed(2), lu: rows[i].lu };
          }
          out[id] = rows;
        }
        return Promise.resolve(out);
      }
      return Promise.reject(new Error(`unsupported: ${message.type}`));
    },
  };
}

window.demoHeating = { ROOMS, SEASONS, makeHass, schedule };
