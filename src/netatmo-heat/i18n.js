import { makeTranslator, pickLanguage } from '../shared/i18n.js';

const HU = {
  card_name: 'Fűtés',
  mode: { schedule: 'Ütemterv', away: 'Távollét', frost_guard: 'Fagyvédelem' },
  state: {
    heating_rooms: '{count} szobában megy a fűtés',
    nothing: 'Egyik szoba sem kér hőt',
    all_off: 'A fűtés áll',
    unavailable: 'A fűtés nem elérhető',
    /* a single room's headline - the target is the useful half */
    room_heating: 'Fűt {temp} °C-ra',
    /* no article: in Hungarian it would have to agree with how the number
       is spoken (a huszonegy, az öt), which a template cannot know */
    room_reached: '{temp} °C-ot tart',
    room_dead: 'A szelep nem válaszol',
  },
  sub: {
    schedule: 'Ütemterv: {name}',
    away: 'Távolléti hőfok: {temp} °C',
    frost_guard: 'Fagyvédelmi hőfok: {temp} °C',
  },
  room: {
    heating: 'Fűt',
    reached: 'Elérte a hőfokot',
    boost: 'Rásegítés',
    away: 'Távollét',
    frost_guard: 'Fagyvédelem',
    unavailable: 'Nem válaszol',
  },
  alert: {
    frost_guard: 'Fagyvédelem – a fűtés ki van kapcsolva, csak {temp} °C alá nem engedi a házat',
    room_dead: '{room} · a szelep nem válaszol',
    battery_low: '{room} ({head}) · fogy az elem ({value} %)',
    battery_critical: '{room} ({head}) · az elem kritikus ({value} %) – cseréld ki',
    battery_silent: '{count} fej nem jelent elemszintet – nézd meg őket',
    window_open: '{room} · nyitva az ablak, miközben fűt ({duration})',
    window_tilted: '{room} · bukóra van az ablak, miközben fűt ({duration})',
    /* on a one-room card the header already says which room it is */
    window_open_here: 'Nyitva az ablak, miközben fűt ({duration})',
    window_tilted_here: 'Bukóra van az ablak, miközben fűt ({duration})',
  },
  ui: {
    rooms: 'Szobák',
    rooms_count: '{count} szoba',
    schedule: 'Ütemterv',
    tap_hint: 'koppints a vezérlőkért',
    outside: 'Kint',
    boost: 'Rásegítés',
    turn_off: 'Kikapcsolás',
    heads: 'Fejek',
    heads_count: '{count} fej',
    no_sensor: 'nincs érzékelő',
    window_open: 'nyitva',
    window_tilted: 'bukóra',
    windows_open: '{count} nyitva',
    silent: 'nem jelent',
    dead_hint: 'A szelep nem jelentkezik be – valószínűleg lemerült az eleme.',
    stale: 'nem frissül',
    current: 'Most',
    no_entity: 'Nem találtam Netatmo fűtést ebben a Home Assistantban.',
    minute_short: 'perce',
    hour_short: 'órája',
  },
  editor: {
    device: 'Készülék', device_auto: 'Automatikus',
    language: 'Nyelv', language_auto: 'Automatikus',
    show_art: 'Készülékrajz', show_schedule: 'Ütemtervek', show_openings: 'Nyitásérzékelők',
    show_batteries: 'Elemszintek', compact: 'Kompakt', animate: 'Animációk',
  },
};

const EN = {
  card_name: 'Heating',
  mode: { schedule: 'Schedule', away: 'Away', frost_guard: 'Frost guard' },
  state: {
    heating_rooms: 'Heating in {count} rooms',
    nothing: 'No room is calling for heat',
    all_off: 'Heating is off',
    unavailable: 'Heating is unavailable',
    room_heating: 'Heating to {temp} °C',
    room_reached: 'Holding {temp} °C',
    room_dead: 'The valve is not responding',
  },
  sub: {
    schedule: 'Schedule: {name}',
    away: 'Away temperature: {temp} °C',
    frost_guard: 'Frost guard: {temp} °C',
  },
  room: {
    heating: 'Heating',
    reached: 'At temperature',
    boost: 'Boost',
    away: 'Away',
    frost_guard: 'Frost guard',
    unavailable: 'Not responding',
  },
  alert: {
    frost_guard: 'Frost guard – heating is off, the house is only kept above {temp} °C',
    room_dead: '{room} · the valve is not responding',
    battery_low: '{room} ({head}) · battery getting low ({value} %)',
    battery_critical: '{room} ({head}) · battery critical ({value} %) – replace it',
    battery_silent: '{count} heads report no battery level – check them',
    window_open: '{room} · window open while heating ({duration})',
    window_tilted: '{room} · window on the latch while heating ({duration})',
    window_open_here: 'Window open while heating ({duration})',
    window_tilted_here: 'Window on the latch while heating ({duration})',
  },
  ui: {
    rooms: 'Rooms',
    rooms_count: '{count} rooms',
    schedule: 'Schedule',
    tap_hint: 'tap for controls',
    outside: 'Outside',
    boost: 'Boost',
    turn_off: 'Turn off',
    heads: 'Heads',
    heads_count: '{count} heads',
    no_sensor: 'no sensor',
    window_open: 'open',
    window_tilted: 'on the latch',
    windows_open: '{count} open',
    silent: 'silent',
    dead_hint: 'The valve is not checking in – most likely a flat battery.',
    stale: 'stale',
    current: 'Now',
    no_entity: 'No Netatmo heating found in this Home Assistant.',
    minute_short: 'min',
    hour_short: 'h',
  },
  editor: {
    device: 'Device', device_auto: 'Automatic',
    language: 'Language', language_auto: 'Automatic',
    show_art: 'Device drawing', show_schedule: 'Schedules', show_openings: 'Opening sensors',
    show_batteries: 'Battery levels', compact: 'Compact', animate: 'Animations',
  },
};

const DICTIONARIES = { hu: HU, en: EN };
export const LANGUAGES = Object.keys(DICTIONARIES);

export function getLanguage(config, hass) {
  return pickLanguage(config, hass, LANGUAGES);
}

export function translator(lang) {
  return makeTranslator(DICTIONARIES, lang);
}

export function fill(text, values = {}) {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
    text,
  );
}
