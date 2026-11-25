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

/** How often the progress bar redraws itself between state updates. */
export const TICK_MS = 1000;
