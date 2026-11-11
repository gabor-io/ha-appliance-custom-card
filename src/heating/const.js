/**
 * Domain constants for the heating family: the house card, the room list and
 * the weekly schedule editor.
 *
 * The three cards read **helper entities**, never the appliances. The heating
 * logic lives in Home Assistant and owns the `climate.*` entities; a card that
 * wrote a thermostat directly would fight that logic, so every control here
 * writes an `input_*` helper or calls a script and then waits for the logic to
 * act. See `docs/heating-capabilities.md` for the full contract.
 */

export const HOUSE_CARD_NAME = 'house-heating-card';
export const HOUSE_EDITOR_NAME = 'house-heating-card-editor';
export const ROOMS_CARD_NAME = 'heating-rooms-card';
export const ROOMS_EDITOR_NAME = 'heating-rooms-card-editor';
export const SCHEDULE_CARD_NAME = 'heating-schedule-card';
export const SCHEDULE_EDITOR_NAME = 'heating-schedule-card-editor';

// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/**
 * The house-wide entities, with the defaults of the reference installation.
 * Every one of them can be overridden from `entities:` in the card config.
 */
export const HOUSE_ENTITIES = {
  meter: 'sensor.gazora_allas',
  manual: 'input_number.gazora_kezi_allas',
  manual_time: 'input_datetime.gazora_kezi_idopont',
  stale: 'binary_sensor.gazadat_elavult',

  budget: 'sensor.gazkeret_m3',
  used: 'sensor.gazkeret_felhasznalt',
  left: 'sensor.gazkeret_maradek',
  allowed: 'sensor.gazkeret_megengedett_eddig',
  reserve: 'input_number.gazkeret_tartalek',
  days_left: 'sensor.gazkeret_hatralevo_nap',

  pace: 'sensor.gaz_napi_utem',
  heating_daily: 'sensor.gaz_futesi_keret_napi',
  hot_water_daily: 'input_number.gaz_melegviz_napi',
  forecast: 'sensor.gaz_elorejelzes_csak_gaz',
  balance: 'sensor.gaz_elorejelzes_egyenleg',

  mode: 'input_select.futes_mod',
  season_select: 'input_select.klima_evszak',
  season_active: 'sensor.klima_evszak_aktiv',
  source: 'sensor.futes_forras',
  reason: 'sensor.futes_forras_indoklas',
  boiler: 'input_boolean.kazan_uzemkesz',
  automation: 'input_boolean.futes_automatika',
  erv_lock: 'input_boolean.szellozteto_gaz_retesz',
  /* the weekly plan is a built-in Home Assistant schedule helper: on means
     the comfort band, off means the night band */
  schedule: 'schedule.futes_komfort',
  zone_select: 'input_select.futes_zona',
  /* no sensible default: every house names its weather station differently */
  outside: null,
  outdoor_3day: null,
};

/**
 * Per-room entities. `{prefix}` is the card's `prefix` option (`futes` by
 * default) and `{room}` the room key from the config - the card ships no room
 * names of its own, so a household's own room keys stay in its own config.
 */
export const ROOM_SUFFIXES = {
  temperature: ['sensor', 'homerseklet'],
  target: ['sensor', 'cel'],
  override: ['input_number', 'felulir'],
  override_until: ['input_datetime', 'felulir_vege'],
  source: ['input_select', 'forras'],
  active: ['sensor', 'aktiv'],
  window: ['sensor', 'ablak'],
  paused: ['binary_sensor', 'szunetel'],
  preheat: ['sensor', null], // sensor.<prefix>_elofutes_<room>, built separately
  frost: ['binary_sensor', 'fagyveszely'],
  /* the thermostat behind the room: an input_number the template climate
     entity publishes as its target */
  target_number: ['input_number', 'cel'],
  mode: ['input_select', 'uzemmod'],
  suggestion: ['sensor', 'forras_javaslat'],
  suggestion_reason: ['sensor', 'forras_indoklas'],
  leading: ['sensor', 'mertado'],
  aggregation: ['input_select', 'aggregalas'],
  overshoot: ['binary_sensor', 'tulloves_korlat'],
};

/** House modes, in the order the segmented bar lists them. */
export const MODES = [
  { key: 'auto', icon: 'auto' },
  { key: 'csak_gaz', icon: 'heat' },
  { key: 'csak_klima', icon: 'ac' },
  { key: 'tavol', icon: 'away' },
  { key: 'ki', icon: 'power' },
];

/** The manual season choice (`input_select.klima_evszak`). */
export const SEASON_CHOICES = [
  { key: 'auto', icon: 'auto' },
  { key: 'futes', icon: 'heat' },
  { key: 'hutes', icon: 'snowflake' },
];

/** What the house is actually doing right now (`sensor.klima_evszak_aktiv`). */
export const SEASONS = ['futes', 'hutes', 'atmeneti'];

/** Heating source, with the icon and the accent role the stylesheet knows. */
export const SOURCES = {
  gaz: { icon: 'heat', accent: 'gas' },
  hibrid: { icon: 'manual', accent: 'hybrid' },
  klima: { icon: 'ac', accent: 'ac' },
  hutes: { icon: 'snowflake', accent: 'cool' },
  fagyvedelem: { icon: 'frost_guard', accent: 'frost' },
  ki: { icon: 'power', accent: 'idle' },
};

/** What is heating a given room right now (`sensor.<prefix>_<room>_aktiv`). */
export const ROOM_ACTIVE = {
  radiator: { icon: 'radiator', accent: 'gas' },
  klima_futes: { icon: 'ac', accent: 'ac' },
  klima_hutes: { icon: 'snowflake', accent: 'cool' },
  aeno: { icon: 'reheat', accent: 'gas' },
  nincs: { icon: 'power', accent: 'idle' },
};

/**
 * What the logic would use in a given room, per
 * `sensor.<prefix>_<room>_forras_javaslat`.
 *
 * This is the room's own answer and can differ from the house-wide source:
 * a bathroom with no heat pump is on gas while the rest of the house runs on
 * the heat pump, and a room with an open window is paused whatever the house
 * is doing.
 */
export const ROOM_SUGGESTION = {
  gaz: { icon: 'heat', accent: 'gas' },
  klima: { icon: 'ac', accent: 'ac' },
  hutes: { icon: 'snowflake', accent: 'cool' },
  aeno: { icon: 'reheat', accent: 'gas' },
  szunetel: { icon: 'window_open', accent: 'idle' },
  ki: { icon: 'power', accent: 'idle' },
};

/** Window states a room can report. */
export const WINDOW_STATES = {
  zarva: { icon: 'window_closed', warn: false },
  buko: { icon: 'window_open', warn: true },
  nyitva: { icon: 'window_open', warn: true },
};

/**
 * How warm the room feels, from `sensor.komfort_<kulcs>`.
 *
 * The state is a Hungarian word, optionally followed by ` · száraz` or
 * ` · párás`, so the first word decides the colour and the rest rides along
 * as written.
 */
export const COMFORT_LEVELS = {
  hideg: 'cold',
  huvos: 'cold',
  hűvös: 'cold',
  kellemes: 'good',
  meleg: 'warm',
  'tul meleg': 'hot',
  'túl meleg': 'hot',
};

/** The heat-up / cool-down rates the logic learns, per source. */
export const LEARNED_SOURCES = ['klima', 'gaz', 'hutes'];

/** The two zones the weekly schedule has today; eco and away come later. */
export const SCHEDULE_ZONES = ['komfort', 'ejszaka'];

/** The five zones of the weekly schedule, with the Netatmo-like colours. */
export const ZONES = [
  { key: 'komfort', icon: 'heat', colour: '#f5b301' },
  { key: 'ejszaka', icon: 'night', colour: '#3f6fd8' },
  { key: 'eco', icon: 'leaf', colour: '#3d9970' },
  { key: 'tavol', icon: 'away', colour: '#9aa0a6' },
  { key: 'fagyvedelem', icon: 'frost_guard', colour: '#7fc6e8' },
];

export const ZONE_KEYS = ZONES.map((zone) => zone.key);

/** Monday first, as a Hungarian week is written. */
export const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/** Zone setpoints move in half degrees, like the Netatmo app's own dial. */
export const TEMP_STEP = 0.5;
export const TEMP_MIN = 5;
export const TEMP_MAX = 30;

/**
 * Cooling is a summer-only business.
 *
 * In `auto` the logic itself only allows cooling between these two dates, so
 * a manual `hutes` outside them is a decision worth a second look rather than
 * something to let through on a mis-tap: the card asks first.
 */
export const COOLING_FROM = { month: 5, day: 1 };
export const COOLING_TO = { month: 9, day: 30 };

/** A window open this long during heating is worth a line on the house card. */
export const WINDOW_WARN_MINUTES = 30;
