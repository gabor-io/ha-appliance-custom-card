/**
 * Domain constants for the media room card.
 *
 * One screen in a room usually has more than one thing that can play on it -
 * an Apple TV box and the TV's own Plex app, say - and Home Assistant gives
 * each of them its own `media_player` entity. Both entities exist all the
 * time, so a dashboard ends up with two cards where the room has one screen,
 * and the one that matters is whichever happens to be playing.
 *
 * This card takes the list of players and shows the active one.
 */

export const CARD_NAME = 'media-room-card';
export const EDITOR_NAME = 'media-room-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

export const DOMAIN = 'media_player';

/**
 * Which player the card shows when several are alive.
 *
 * This is deliberately the same order Home Assistant's own `universal` media
 * player uses to pick its active child (`STATES_ORDER` in
 * `homeassistant/components/universal/media_player.py`): the highest state
 * wins, only children at `idle` or above are considered, and a tie keeps the
 * one listed first. Inventing a different rule here would mean the card and
 * the stock integration disagree about which box is "the" player, for no
 * gain.
 */
export const STATE_ORDER = [
  'unknown',
  'unavailable',
  'off',
  'idle',
  'on',
  'paused',
  'buffering',
  'playing',
];

export const STATE_RANK = Object.fromEntries(STATE_ORDER.map((state, index) => [state, index]));
export const RANK_IDLE = STATE_RANK.idle;

/** A player at this rank or above has something to say. */
export const RANK_ACTIVE = STATE_RANK.on;

/**
 * `supported_features` bits, from `MediaPlayerEntityFeature` in
 * `homeassistant/components/media_player/const.py`.
 *
 * The card draws a control only when the active player claims the matching
 * bit: a next-track button that silently does nothing is worse than no
 * button, and which bits are set changes from player to player - the Plex
 * client and the Apple TV do not support the same things.
 */
export const FEATURE = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  PLAY_MEDIA: 512,
  VOLUME_STEP: 1024,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  SELECT_SOUND_MODE: 65536,
  BROWSE_MEDIA: 131072,
  REPEAT_SET: 262144,
};

/** Content types that get their own icon, so the tile is not always a note. */
export const CONTENT_ICONS = {
  tvshow: 'tv',
  episode: 'tv',
  movie: 'movie',
  video: 'movie',
  music: 'music',
  playlist: 'music',
  podcast: 'podcast',
  game: 'game',
  app: 'apps',
  channel: 'tv',
  url: 'cast',
};

/**
 * Content types whose `entity_picture` is a logo, not a still.
 *
 * A TV integration answers a broadcast channel with the channel's logo and an
 * app with the app's icon. Those are the wrong shape for a cover-cropped
 * background - a logo cropped to a 16:9 strip is a fragment of a logo - so
 * the card lays them out contained instead, and skips the blurred copy that
 * gives a film its colour: blurring a logo gives either a colour block or,
 * if it has transparency, nothing at all.
 */
export const LOGO_TYPES = ['channel', 'app'];

/**
 * What a direction pad sends, per integration.
 *
 * `remote.send_command` takes whatever string the integration's own remote
 * entity understands, and the two here do not agree on a single name: the
 * Apple TV takes pyatv's method names (`up`, `select`, `menu`), a Samsung
 * takes Tizen key codes (`KEY_UP`, `KEY_ENTER`, `KEY_RETURN`). A pad with
 * one hardcoded set would be dead on the other box, so the map is chosen
 * from the remote entity's own platform.
 *
 * Only commands that exist on both sides of each integration are listed:
 * pyatv raises "Command not found" for anything its RemoteControl has no
 * method for, and the Apple TV's own feature list (from its diagnostics)
 * confirms these are the available ones.
 */
export const REMOTE_KEYS = {
  apple: {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    select: 'select',
    back: 'menu',
    home: 'home',
    menu: 'top_menu',
    rewind: 'skip_backward',
    forward: 'skip_forward',
  },
  samsung: {
    up: 'KEY_UP',
    down: 'KEY_DOWN',
    left: 'KEY_LEFT',
    right: 'KEY_RIGHT',
    select: 'KEY_ENTER',
    back: 'KEY_RETURN',
    home: 'KEY_HOME',
    menu: 'KEY_MENU',
    rewind: 'KEY_REWIND',
    forward: 'KEY_FF',
  },
};

/** Which key map an integration's remote entity wants. */
export const PLATFORM_KEYS = {
  apple_tv: 'apple',
  samsungtv: 'samsung',
  samsungtv_smart: 'samsung',
};

/** The pad's layout, drawn as a 3x3 grid plus a row of extras. */
export const PAD_LAYOUT = [
  [null, 'up', null],
  ['left', 'select', 'right'],
  [null, 'down', null],
];
export const PAD_EXTRAS = ['back', 'home', 'menu', 'rewind', 'forward'];

/** Icons for the pad, by key. */
export const PAD_ICONS = {
  up: 'chevron_up',
  down: 'chevron',
  left: 'chevron_left',
  right: 'chevron_right',
  select: 'dot',
  back: 'back',
  home: 'home',
  menu: 'menu',
  rewind: 'rewind',
  forward: 'forward',
};

/** How often the progress bar redraws itself between state updates. */
export const TICK_MS = 1000;
