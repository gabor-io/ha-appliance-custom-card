/**
 * Domain constants for the Nanoleaf Shapes card.
 *
 * The panels reach Home Assistant through the built-in
 * [`nanoleaf`](https://www.home-assistant.io/integrations/nanoleaf)
 * integration, which creates exactly three entities and no more:
 *
 * - a `light` with brightness, HS colour, colour temperature and the effect
 *   list the device holds;
 * - a `button` that flashes the panels to identify them;
 * - an `event` that fires on touch gestures - but **only on the models that
 *   have touch**, which in the integration's own list is Canvas (NL29),
 *   Shapes Hexagons (NL42) and Elements (NL52). Shapes Triangles and Mini
 *   Triangles get no such entity, and the card drops the row rather than
 *   showing a control that can never fire.
 *
 * There is no panel count, no layout and no per-panel colour: the Nanoleaf
 * API has all of it, the integration passes none of it on. The arrangement on
 * the card therefore comes from the config, and the card draws what it is
 * told rather than pretending to know.
 */

export const CARD_NAME = 'nanoleaf-shapes-card';
export const EDITOR_NAME = 'nanoleaf-shapes-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** The integration that owns the entities the card resolves by itself. */
export const PLATFORM = 'nanoleaf';

/** Gesture types the event entity fires, in the order the card lists them. */
export const GESTURES = [
  { key: 'single_tap', icon: 'gesture_tap' },
  { key: 'double_tap', icon: 'gesture_tap' },
  { key: 'swipe_up', icon: 'chevron_up' },
  { key: 'swipe_down', icon: 'chevron' },
  { key: 'swipe_left', icon: 'chevron' },
  { key: 'swipe_right', icon: 'chevron' },
];

/**
 * The white points the colour temperature slider is marked at, in kelvin.
 *
 * The device reports its own range (1200-6500 K on Shapes), which is wider
 * than most bulbs: the warm end is candlelight rather than the usual 2000 K.
 */
export const WHITE_PRESETS = [1200, 2700, 4000, 5000, 6500];

/**
 * Colours for the effects the panels ship with.
 *
 * Home Assistant is given the effect *names* and nothing else - no palette, no
 * preview, not even whether a scene moves. Without this the picker is sixteen
 * identical rows of text, which is the one thing a lighting card should not
 * be. These are therefore the card's own reading of each scene, taken from
 * what the stock scenes look like on the wall, not values the device reports.
 *
 * Anything not listed - a scene of the owner's own making, or one from a
 * firmware newer than this card - falls back to a neutral swatch, which is
 * honest: the card does not know what that one looks like.
 */
export const EFFECT_PALETTES = {
  beatdrop: ['#ff2d95', '#7b2ff7', '#00e5ff'],
  blaze: ['#7a0d00', '#ff4d00', '#ffb300'],
  'cocoa beach': ['#ffd9a0', '#ff8a5c', '#19c6c6'],
  'cotton candy': ['#ffc2e2', '#c9b6ff', '#a6e8ff'],
  'date night': ['#4a0032', '#c2185b', '#ff5c8a'],
  'hip hop': ['#ff6f00', '#ff1f6b', '#8e24aa'],
  'hot sauce': ['#8b0000', '#ff2a00', '#ff7a00'],
  jungle: ['#063d1e', '#2e9e3e', '#b5e61d'],
  lightscape: ['#ffb3c7', '#b8c6ff', '#9ef0d9'],
  'morning sky': ['#1b3a6b', '#7aa8e0', '#ffc7a8'],
  'northern lights': ['#06243d', '#1de9b6', '#7c4dff'],
  'pop rocks': ['#ff1744', '#ffea00', '#00e5ff'],
  prism: ['#ff0000', '#ffd400', '#00c853', '#00b0ff', '#aa00ff'],
  starlight: ['#0b1736', '#cfe3ff', '#ffffff'],
  sundown: ['#ff8f00', '#ff4081', '#6a1b9a'],
  waterfall: ['#003f73', '#00a3e0', '#b3ecff'],
};

/** The swatch for a scene the card has no palette for. */
export const UNKNOWN_PALETTE = ['#8a9199', '#c3c9cf', '#8a9199'];

/**
 * The arrangement the card draws when the config names none.
 *
 * Axial hex coordinates, flat-top: `q` steps right, `r` steps down-right. This
 * default is the seven-panel flower the Shapes starter kit makes, which is
 * a guess - a real wall is whatever its owner screwed to it, so `layout:`
 * overrides this and the drawing follows.
 */
export const DEFAULT_LAYOUT = [
  [0, 0],
  [1, 0],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [0, -1],
  [1, -1],
];
