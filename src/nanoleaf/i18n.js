import { makeTranslator, pickLanguage } from '../shared/i18n.js';

const HU = {
  card_name: 'Nanoleaf',
  mode: { off: 'Kikapcsolva', effect: 'Jelenet', white: 'Fehér', colour: 'Szín' },
  power: { off: 'Ki', on: 'Be' },
  state: {
    unavailable: 'A panelek nem válaszolnak',
    off: 'Kikapcsolva',
    effect: '{effect}',
    white: '{kelvin} K fehér',
    colour: 'Fix szín',
  },
  sub: {
    unavailable: 'Nincs válasz – áram vagy hálózat',
    off: 'A panelek sötétek',
    brightness: 'Fényerő {percent}%',
  },
  ui: {
    device: 'Nanoleaf Shapes',
    brightness: 'Fényerő',
    effects: 'Jelenetek',
    white: 'Fehér',
    colour: 'Szín',
    identify: 'Felvillantás',
    touch: 'Érintés',
    touch_never: 'még nem volt',
    /* the hue wheel is the light entity's own job - the card says where to go
       rather than building a second colour picker that would drift from it */
    open_colour: 'Színválasztó',
    no_entity: 'Nem találtam Nanoleaf panelt ebben a Home Assistantban.',
    many_entities: 'Több Nanoleaf is van – válaszd ki, melyikről szóljon a kártya.',
    missing_entity: 'A megadott entitás nem létezik.',
    minute_short: 'perc',
    hour_short: 'ó',
    unknown_effect: 'ismeretlen jelenet',
  },
  gesture: {
    single_tap: 'Koppintás',
    double_tap: 'Dupla koppintás',
    swipe_up: 'Felfelé húzás',
    swipe_down: 'Lefelé húzás',
    swipe_left: 'Balra húzás',
    swipe_right: 'Jobbra húzás',
  },
  editor: {
    device: 'Eszköz',
    device_auto: 'Automatikus',
    name: 'Név',
    language: 'Nyelv',
    language_auto: 'Automatikus',
    layout: 'Elrendezés',
    custom: 'Egyedi (YAML-ben)',
    sections: 'Mit mutasson',
    show_art: 'Panelrajz',
    show_brightness: 'Fényerő',
    show_effects: 'Jelenetek',
    show_white: 'Fehér fokozatok',
    show_touch: 'Érintés',
    show_identify: 'Felvillantás',
    compact: 'Kompakt',
    animate: 'Animációk',
  },
};

const EN = {
  card_name: 'Nanoleaf',
  mode: { off: 'Off', effect: 'Scene', white: 'White', colour: 'Colour' },
  power: { off: 'Off', on: 'On' },
  state: {
    unavailable: 'The panels are not responding',
    off: 'Off',
    effect: '{effect}',
    white: '{kelvin} K white',
    colour: 'Solid colour',
  },
  sub: {
    unavailable: 'No answer - power or network',
    off: 'The panels are dark',
    brightness: 'Brightness {percent}%',
  },
  ui: {
    device: 'Nanoleaf Shapes',
    brightness: 'Brightness',
    effects: 'Scenes',
    white: 'White',
    colour: 'Colour',
    identify: 'Identify',
    touch: 'Touch',
    touch_never: 'nothing yet',
    open_colour: 'Colour picker',
    no_entity: 'No Nanoleaf found in this Home Assistant.',
    many_entities: 'There is more than one Nanoleaf - pick the one this card is about.',
    missing_entity: 'The configured entity does not exist.',
    minute_short: 'min',
    hour_short: 'h',
    unknown_effect: 'unknown scene',
  },
  gesture: {
    single_tap: 'Tap',
    double_tap: 'Double tap',
    swipe_up: 'Swipe up',
    swipe_down: 'Swipe down',
    swipe_left: 'Swipe left',
    swipe_right: 'Swipe right',
  },
  editor: {
    device: 'Device',
    device_auto: 'Automatic',
    name: 'Name',
    language: 'Language',
    language_auto: 'Automatic',
    layout: 'Layout',
    custom: 'Custom (in YAML)',
    sections: 'Sections',
    show_art: 'Panel drawing',
    show_brightness: 'Brightness',
    show_effects: 'Scenes',
    show_white: 'White presets',
    show_touch: 'Touch',
    show_identify: 'Identify',
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
