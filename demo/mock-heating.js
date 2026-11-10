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
  { key: 'bath', name: 'Fürdő' },
  {
    key: 'living',
    name: 'Étkező · konyha · előszoba',
    parts: [
      { key: 'etkezo', name: 'Étkező' },
      { key: 'konyha', name: 'Konyha' },
      { key: 'eloszoba', name: 'Előszoba' },
    ],
  },
  { key: 'room_1', name: 'Háló 1' },
  { key: 'room_2', name: 'Háló 2' },
  { key: 'room_3', name: 'Háló 3' },
  { key: 'hall', name: 'Előtér', readonly: true },
];

const ZONE_TEMPS = {
  futes: {
    komfort: { bath: 20.5, living: 20.5, room_1: 20.5, room_2: 20.5, room_3: 20.5 },
    ejszaka: { bath: 19, living: 19, room_1: 19.5, room_2: 19.5, room_3: 19.5 },
    eco: { bath: 18, living: 18, room_1: 18, room_2: 18, room_3: 18 },
    tavol: { bath: 12, living: 12, room_1: 12, room_2: 12, room_3: 12 },
    fagyvedelem: { bath: 7, living: 7, room_1: 7, room_2: 7, room_3: 7 },
  },
  hutes: {
    komfort: { bath: 25.5, living: 25.5, room_1: 25.5, room_2: 25.5, room_3: 25.5 },
    ejszaka: { bath: 26.5, living: 26.5, room_1: 26.5, room_2: 26.5, room_3: 26.5 },
    eco: { bath: 28, living: 28, room_1: 28, room_2: 28, room_3: 28 },
    tavol: { bath: 30, living: 30, room_1: 30, room_2: 30, room_3: 30 },
    /* no frost guard in summer: the zone exists, it just never cools */
    fagyvedelem: { bath: 32, living: 32, room_1: 32, room_2: 32, room_3: 32 },
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
    rooms: {
      bath: {
        temp: 21.8, target: 20.5, active: 'aeno',
        suggestion: 'gaz',
        why: 'Nincs klíma, a gáz fűt; zuhany előtt AENO boost.',
      },
      living: {
        temp: 20.1, target: 20.5, active: 'klima_futes',
        suggestion: 'klima', why: 'Kint 2 °C, a klíma itt gyors (1,4 °C/h) – a klíma fűt.',
      },
      room_1: {
        temp: 20.4, target: 20.5, active: 'klima_futes',
        suggestion: 'klima', why: 'Kint 2 °C, a klíma itt gyors (1,3 °C/h) – a klíma fűt.',
      },
      room_2: {
        temp: 18.2, target: 20.5, active: 'nincs', window: 'buko', paused: true,
        suggestion: 'szunetel', why: 'Az ablak 34 perce bukóban, a fűtés szünetel.',
      },
      room_3: {
        temp: 20.6, target: 20.5, active: 'nincs',
        suggestion: 'gaz', why: 'Kint 2 °C, a klíma itt lassú (0,65 °C/h) – a gáz fűt.',
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

    /* --- the zone the schedule drives --- */
    entity('input_select.futes_zona', 'komfort', {
      options: ['komfort', 'ejszaka', 'eco', 'tavol', 'fagyvedelem'],
    }),

    /* --- the weekly schedule, as scheduler-component 3.3.9 reports it --- */
    entity('switch.schedule_hetkoznap', 'on', {
      friendly_name: 'Hétköznap',
      weekdays: ['mon', 'tue', 'wed', 'thu', 'fri'],
      timeslots: ['00:00:00', '05:45:00', '21:30:00'],
      entities: ['input_select.futes_zona'],
      actions: [
        { service: 'input_select.select_option', service_data: { option: 'ejszaka' } },
        { service: 'input_select.select_option', service_data: { option: 'komfort' } },
        { service: 'input_select.select_option', service_data: { option: 'ejszaka' } },
      ],
      current_slot: 1,
      next_slot: 2,
      tags: [],
    }),
    entity('switch.schedule_hetvege', 'on', {
      friendly_name: 'Hétvége',
      weekdays: ['sat', 'sun'],
      timeslots: ['00:00:00', '07:30:00', '13:00:00', '22:30:00'],
      entities: ['input_select.futes_zona'],
      actions: [
        { service: 'input_select.select_option', service_data: { option: 'ejszaka' } },
        { service: 'input_select.select_option', service_data: { option: 'komfort' } },
        { service: 'input_select.select_option', service_data: { option: 'eco' } },
        { service: 'input_select.select_option', service_data: { option: 'ejszaka' } },
      ],
      current_slot: null,
      next_slot: 0,
      tags: [],
    }),
    /* a schedule that drives something else entirely - the card must ignore it */
    entity('switch.schedule_locsolas', 'on', {
      friendly_name: 'Locsolás',
      weekdays: ['daily'],
      timeslots: ['06:00:00'],
      entities: ['switch.kerti_csap'],
      actions: [{ service: 'switch.turn_on' }],
      current_slot: null,
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

  /* --- rooms --- */
  for (const room of ROOMS) {
    const mock = season.rooms[room.key] || {};
    const put = (...args) => {
      const [id, obj] = entity(...args);
      states[id] = obj;
    };

    put(`sensor.futes_${room.key}_homerseklet`, mock.temp, { unit_of_measurement: '°C' });
    if (room.readonly) {
      put(`binary_sensor.futes_${room.key}_fagyveszely`, mock.temp !== undefined && mock.temp < 6 ? 'on' : 'off');
      continue;
    }

    put(`sensor.futes_${room.key}_cel`, mock.target, { unit_of_measurement: '°C' });
    put(`sensor.futes_${room.key}_aktiv`, mock.active || 'nincs');
    put(`sensor.futes_${room.key}_forras_javaslat`, mock.suggestion || 'ki');
    put(`sensor.futes_${room.key}_forras_indoklas`, mock.why || '');
    put(`input_number.futes_${room.key}_felulir`, mock.override ?? mock.target, {
      min: 5,
      max: 30,
      step: 0.5,
    });
    put(`input_datetime.futes_${room.key}_felulir_vege`, 'unknown');
    put(`input_select.futes_${room.key}_forras`, mock.source || 'auto', {
      options: ['auto', 'gaz', 'klima', 'ki'],
    });
    /* the tilted window has been open for 34 minutes - long enough for the
       house card to say so, and for the room to show that it is paused */
    put(
      `sensor.futes_${room.key}_ablak`,
      mock.window || 'zarva',
      {},
      mock.window ? minutesAgo(34) : minutesAgo(600),
    );
    put(`binary_sensor.futes_${room.key}_szunetel`, mock.paused ? 'on' : 'off');
    put(
      `sensor.futes_elofutes_${room.key}`,
      room.key === 'room_1' ? '2026-11-10T03:50:00+00:00' : 'unknown',
      room.key === 'room_1'
        ? {
            device_class: 'timestamp',
            irany: seasonKey === 'hutes' ? 'hutes' : 'futes',
            cel: mock.target,
            becsult_sebesseg_c_per_ora: 1.4,
          }
        : {},
    );

    if (room.parts?.length) {
      const values = { etkezo: mock.temp, konyha: (mock.temp || 0) + 1.9, eloszoba: (mock.temp || 0) - 1.1 };
      for (const part of room.parts) {
        put(`sensor.futes_${room.key}_${part.key}`, Number(values[part.key].toFixed(1)), {
          unit_of_measurement: '°C',
        });
        put(`binary_sensor.futes_${room.key}_${part.key}_kizarva`, part.key === 'konyha' ? 'on' : 'off');
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
  };
}

window.demoHeating = { ROOMS, SEASONS, makeHass };
