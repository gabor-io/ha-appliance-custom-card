import { makeTranslator, pickLanguage } from '../shared/i18n.js';

const HU = {
  card_name: 'Infrapanel',
  mode: { off: 'Ki', heat: 'Fűtés' },
  mode_long: { off: 'Kikapcsolva', heat: 'Fűtés' },
  preset: { comfort: 'Smart', manual: 'Folyamatos' },
  state: {
    unavailable: 'A panel nem válaszol',
    off: 'Kikapcsolva',
    /* no article before the number: in Hungarian it would have to agree with
       how the number is spoken (a huszonegy, az öt), which a template cannot
       know. So the number leads and the verb closes the sentence. */
    heating_to: 'Fűt {temp} °C-ra',
    holding: '{temp} °C-ot tart',
    above: 'Melegebb a beállítottnál',
    continuous: 'Folyamatosan fűt',
    warming_up: 'Melegszik',
  },
  sub: {
    unavailable: 'Nincs válasz a panelről – áram vagy hálózat',
    off: 'Legutóbbi cél: {temp} °C',
    off_no_target: 'A panel áll',
    reached: 'Elérte a hőfokot, az elem nem fűt',
    below_by: '{diff} °C-kal hidegebb a szoba',
    above_by: '{diff} °C-kal melegebb a szoba',
    /* the one thing worth saying out loud about this panel: in manual mode the
       element ignores the setpoint entirely */
    continuous: 'Folyamatos módban az elem a beállított hőfoktól függetlenül megy',
    panel_warming: 'A lap {temp} °C-os, még melegszik',
    panel_hot: 'A lap {temp} °C-os',
  },
  alert: {
    window_open: '{name} nyitva {duration} – a panel nyitott ablakba fűt',
    window_tilted: '{name} bukóra van {duration} – a panel nyitott ablakba fűt',
    continuous: 'Folyamatos mód: a panel a hőfok elérése után sem áll le',
    locked: 'Gyerekzár – a panel gombjai nem működnek',
    timer: 'Időzítő: {remaining} múlva kikapcsol',
  },
  ui: {
    device: 'AENO AGH0001S',
    room: 'Szoba',
    panel: 'Lap',
    power: 'Teljesítmény',
    energy: 'Fogyasztás',
    device_reads: 'a panel szerint',
    limit: 'Lap max.',
    lock: 'Gyerekzár',
    timer: 'Időzítő',
    timer_off: 'nincs',
    timer_cancel: 'Időzítő törlése',
    window: 'Ablak',
    window_open: 'nyitva',
    window_tilted: 'bukóra',
    windows_open: '{count} ablak nyitva',
    no_window_sensor: 'nincs nyitásérzékelő',
    minute_short: 'perc',
    hour_short: 'ó',
    no_entity: 'Nem találtam infrapanelt ebben a Home Assistantban.',
    many_entities: 'Több panel is van – válaszd ki, melyikről szóljon a kártya.',
    missing_entity: 'A megadott entitás nem létezik.',
  },
  editor: {
    device: 'Eszköz',
    device_auto: 'Automatikus',
    name: 'Név (üresen a terület neve)',
    language: 'Nyelv',
    language_auto: 'Automatikus',
    sections: 'Mit mutasson',
    show_art: 'Panelrajz',
    show_readings: 'Mért értékek',
    show_modes: 'Be/ki sáv',
    show_presets: 'Fűtési mód',
    show_setpoint: 'Hőfok a panelen',
    show_extras: 'Gyerekzár, lap max.',
    show_openings: 'Nyitásérzékelők',
    compact: 'Kompakt',
    animate: 'Animációk',
  },
};

const EN = {
  card_name: 'Panel heater',
  mode: { off: 'Off', heat: 'Heat' },
  mode_long: { off: 'Off', heat: 'Heating' },
  preset: { comfort: 'Smart', manual: 'Constant' },
  state: {
    unavailable: 'The panel is not responding',
    off: 'Off',
    heating_to: 'Heating to {temp} °C',
    holding: 'Holding {temp} °C',
    above: 'Warmer than the setpoint',
    continuous: 'Heating continuously',
    warming_up: 'Warming up',
  },
  sub: {
    unavailable: 'No answer from the panel - power or network',
    off: 'Last target: {temp} °C',
    off_no_target: 'The panel is idle',
    reached: 'At temperature, the element is off',
    below_by: 'The room is {diff} °C cooler',
    above_by: 'The room is {diff} °C warmer',
    continuous: 'In Constant mode the element runs whatever the setpoint says',
    panel_warming: 'The surface is at {temp} °C and still warming',
    panel_hot: 'The surface is at {temp} °C',
  },
  alert: {
    window_open: '{name} has been open {duration} - the panel is heating it',
    window_tilted: '{name} has been on the latch {duration} - the panel is heating it',
    continuous: 'Constant mode: the panel will not stop at the setpoint',
    locked: 'Child lock - the panel buttons do nothing',
    timer: 'Timer: switches off in {remaining}',
  },
  ui: {
    device: 'AENO AGH0001S',
    room: 'Room',
    panel: 'Surface',
    power: 'Power',
    energy: 'Energy',
    device_reads: 'panel reads',
    limit: 'Element max.',
    lock: 'Child lock',
    timer: 'Timer',
    timer_off: 'none',
    timer_cancel: 'Cancel timer',
    window: 'Window',
    window_open: 'open',
    window_tilted: 'on the latch',
    windows_open: '{count} windows open',
    no_window_sensor: 'no opening sensor',
    minute_short: 'min',
    hour_short: 'h',
    no_entity: 'No panel heater found in this Home Assistant.',
    many_entities: 'There is more than one panel - pick the one this card is about.',
    missing_entity: 'The configured entity does not exist.',
  },
  editor: {
    device: 'Device',
    device_auto: 'Automatic',
    name: 'Name (the area name when empty)',
    language: 'Language',
    language_auto: 'Automatic',
    sections: 'Sections',
    show_art: 'Panel drawing',
    show_readings: 'Readings',
    show_modes: 'On/off bar',
    show_presets: 'Heating mode',
    show_setpoint: 'Setpoint on the panel',
    show_extras: 'Child lock, element max.',
    show_openings: 'Opening sensors',
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
