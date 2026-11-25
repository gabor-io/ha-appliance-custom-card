import { makeTranslator, pickLanguage } from '../shared/i18n.js';

const HU = {
  card_name: 'Médiaszoba',
  state: {
    playing: 'Megy',
    paused: 'Megállítva',
    buffering: 'Töltődik',
    idle: 'Készenlétben',
    on: 'Bekapcsolva',
    off: 'Kikapcsolva',
    unavailable: 'Nem válaszol',
    unknown: 'Ismeretlen',
  },
  ui: {
    nothing: 'Most semmi nem megy',
    nothing_sub: 'Mindkét lejátszó néma – ami elindul, az jelenik meg itt.',
    nothing_sub_one: 'A lejátszó néma – ami elindul, az jelenik meg itt.',
    no_entities:
      'Nincs megadva lejátszó. Írd be az `entities:` alá azokat a media_player entitásokat, amik ugyanazt a képernyőt hajtják.',
    missing_entities: 'A megadott lejátszók egyike sem létezik ebben a Home Assistantban.',
    players: 'Lejátszók',
    pinned: 'rögzítve',
    pin_hint: 'Koppints egy lejátszóra, hogy azt mutassa a kártya',
    volume: 'Hangerő',
    muted: 'Némítva',
    volume_of: 'hangerő: {name}',
    source: 'Forrás',
    sound_mode: 'Hangzás',
    remote: 'Távirányító',
    left: 'még {time}',
    of: '{elapsed} / {duration}',
    power: 'Be/ki',
    prev: 'Előző',
    next: 'Következő',
    play: 'Lejátszás',
    pause: 'Szünet',
    stop: 'Leállítás',
    mute: 'Némítás',
    unmute: 'Némítás vissza',
    unavailable_player: 'nem válaszol',
    missing_player: 'nincs ilyen entitás',
  },
  key: {
    up: 'Fel', down: 'Le', left: 'Balra', right: 'Jobbra', select: 'OK',
    back: 'Vissza', home: 'Főmenü', menu: 'Menü',
    rewind: 'Vissza egy kicsit', forward: 'Előre egy kicsit',
  },
  editor: {
    entities: 'Lejátszók',
    volume_entity: 'A hangerő ezé',
    volume_entity_hint:
      'Ha a hang nem abból jön, ami játszik – például a box képet ad, a TV hangot –, itt add meg a TV-t.',
    volume_entity_auto: 'Ami épp megy',
    entities_hint: 'Amelyik elindul, az jelenik meg. Egyenlő állapotnál a lista sorrendje dönt.',
    name: 'Név',
    language: 'Nyelv',
    language_auto: 'Automatikus',
    sections: 'Mit mutasson',
    show_artwork: 'Borítókép',
    show_progress: 'Játékidő',
    show_volume: 'Hangerő',
    show_players: 'Lejátszók sora',
    show_sources: 'Forrás és hangzás',
    show_remote: 'Távirányító gomb',
    compact: 'Tömör',
  },
};

const EN = {
  card_name: 'Media room',
  state: {
    playing: 'Playing',
    paused: 'Paused',
    buffering: 'Buffering',
    idle: 'Idle',
    on: 'On',
    off: 'Off',
    unavailable: 'Not answering',
    unknown: 'Unknown',
  },
  ui: {
    nothing: 'Nothing playing',
    nothing_sub: 'Both players are quiet - whichever starts will show up here.',
    nothing_sub_one: 'The player is quiet - whatever starts will show up here.',
    no_entities:
      'No players configured. List the media_player entities that drive the same screen under `entities:`.',
    missing_entities: 'None of the configured players exist in this Home Assistant.',
    players: 'Players',
    pinned: 'pinned',
    pin_hint: 'Tap a player to make the card show that one',
    volume: 'Volume',
    muted: 'Muted',
    volume_of: 'volume: {name}',
    source: 'Source',
    sound_mode: 'Sound mode',
    remote: 'Remote',
    left: '{time} left',
    of: '{elapsed} / {duration}',
    power: 'Power',
    prev: 'Previous',
    next: 'Next',
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    mute: 'Mute',
    unmute: 'Unmute',
    unavailable_player: 'not answering',
    missing_player: 'no such entity',
  },
  key: {
    up: 'Up', down: 'Down', left: 'Left', right: 'Right', select: 'OK',
    back: 'Back', home: 'Home', menu: 'Menu',
    rewind: 'Skip back', forward: 'Skip forward',
  },
  editor: {
    entities: 'Players',
    volume_entity: 'Volume belongs to',
    volume_entity_hint:
      'When the sound comes from something other than the player - a box for the picture, the TV for the sound - name the TV here.',
    volume_entity_auto: 'Whatever is playing',
    entities_hint: 'Whichever starts is shown. On equal states the list order decides.',
    name: 'Name',
    language: 'Language',
    language_auto: 'Automatic',
    sections: 'What to show',
    show_artwork: 'Artwork',
    show_progress: 'Progress',
    show_volume: 'Volume',
    show_players: 'Player row',
    show_sources: 'Source and sound mode',
    show_remote: 'Remote button',
    compact: 'Compact',
  },
};

const DICTIONARIES = { hu: HU, en: EN };
export const LANGUAGES = Object.keys(DICTIONARIES);

export function getLanguage(config, hass) {
  return pickLanguage(config, hass, LANGUAGES);
}

export function translator(lang) {
  return makeTranslator(DICTIONARIES, lang, 'hu');
}

/** `{name}` substitution, the same helper every card in the family uses. */
export function fill(text, values) {
  return String(text).replace(/\{(\w+)\}/g, (match, key) =>
    values[key] === undefined ? match : String(values[key]),
  );
}
