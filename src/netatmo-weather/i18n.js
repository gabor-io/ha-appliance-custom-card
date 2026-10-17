import { makeTranslator, pickLanguage } from '../shared/i18n.js';

const HU = {
  card_name: 'Időjárás-állomás',
  trend: {
    up: 'emelkedik',
    down: 'süllyed',
    stable: 'állandó',
  },
  band: {
    excellent: 'Kiváló',
    good: 'Jó',
    fair: 'Közepes',
    poor: 'Gyenge',
    bad: 'Rossz',
  },
  state: {
    /* the name goes in front as a label: a Hungarian suffix would have to
       agree with whatever the module is called, and cannot */
    outdoor_stale: 'A kültéri modul leszakadt',
    outdoor_dead: 'A kültéri modul nem válaszol',
    no_outdoor: 'Nincs kültéri modul',
  },
  alert: {
    co2_high: '{name} · kezd elhasználódni a levegő ({value} ppm)',
    /* no band name here: the meter below already says "Gyenge" or "Rossz",
       and a second, different word for the same number reads as a bug */
    co2_bad: '{name} · szellőztess, magas a CO₂ ({value} ppm)',
    stale: '{name} · a modul leszakadt, az adat nem frissül',
    dead: '{name} · a modul nem válaszol',
    battery_low: '{name} · fogy az elem ({value} %)',
    battery_critical: '{name} · az elem kritikus ({value} %) – cseréld ki',
  },
  ui: {
    outside: 'Kint',
    rooms: 'Szobák',
    stale_badge: 'nem frissül',
    dead_badge: 'nem válaszol',
    stale_hint: 'A modul leszakadt – ezek a legutóbbi mért értékek.',
    dead_hint: 'A modul nem küld mérést.',
    co2: 'CO₂',
    updated: '{age} frissült',
    just_now: 'épp most',
    minute_short: 'perce',
    hour_short: 'órája',
    no_station: 'Nem találtam Netatmo időjárás-állomást.',
  },
  editor: {
    device: 'Készülék',
    device_auto: 'Automatikus',
    language: 'Nyelv',
    language_auto: 'Automatikus',
    show_art: 'Készülékrajz',
    show_rooms: 'Szobák',
    show_co2: 'CO₂ mérősáv',
    show_alerts: 'Figyelmeztetések',
    compact: 'Kompakt',
    animate: 'Animációk',
  },
};

const EN = {
  card_name: 'Weather station',
  trend: {
    up: 'rising',
    down: 'falling',
    stable: 'steady',
  },
  band: {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    bad: 'Bad',
  },
  state: {
    outdoor_stale: 'The outdoor module is offline',
    outdoor_dead: 'The outdoor module is not responding',
    no_outdoor: 'No outdoor module',
  },
  alert: {
    co2_high: '{name} · the air is getting stale ({value} ppm)',
    co2_bad: '{name} · open a window, CO₂ is high ({value} ppm)',
    stale: '{name} · the module is offline, the reading is not updating',
    dead: '{name} · the module is not responding',
    battery_low: '{name} · battery getting low ({value} %)',
    battery_critical: '{name} · battery critical ({value} %) – replace it',
  },
  ui: {
    outside: 'Outside',
    rooms: 'Rooms',
    stale_badge: 'not updating',
    dead_badge: 'no answer',
    stale_hint: 'The module is offline – these are its last readings.',
    dead_hint: 'The module is sending no readings.',
    co2: 'CO₂',
    updated: 'updated {age}',
    just_now: 'just now',
    minute_short: 'min ago',
    hour_short: 'h ago',
    no_station: 'No Netatmo weather station found.',
  },
  editor: {
    device: 'Device',
    device_auto: 'Automatic',
    language: 'Language',
    language_auto: 'Automatic',
    show_art: 'Device drawing',
    show_rooms: 'Rooms',
    show_co2: 'CO₂ meter',
    show_alerts: 'Alerts',
    compact: 'Compact',
    animate: 'Animations',
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
