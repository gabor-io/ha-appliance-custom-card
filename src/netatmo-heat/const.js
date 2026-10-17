/**
 * Domain constants for the Netatmo heating card.
 *
 * The integration gives one `climate` entity per heated room, a single
 * `select` for the house schedule, and a battery sensor per head. There is no
 * room temperature sensor: the temperature lives in the climate entity's
 * `current_temperature` attribute.
 */

export const CARD_NAME = 'netatmo-heating-card';
export const EDITOR_NAME = 'netatmo-heating-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

export const PLATFORM = 'netatmo';

/**
 * The three house modes, in the order the segmented bar lists them.
 *
 * Netatmo calls them presets and sets them on every room at once, so the card
 * treats them as one house-wide control rather than five identical ones.
 */
export const MODES = [
  { key: 'schedule', icon: 'calendar', colour: 'var(--nh-heat)' },
  { key: 'away', icon: 'away', colour: 'var(--nh-away)' },
  { key: 'frost_guard', icon: 'frost_guard', colour: 'var(--nh-frost)' },
];

export const MODE_KEYS = MODES.map((mode) => mode.key);

/** Per-room presets that override the house mode for a while. */
export const ROOM_PRESETS = [{ key: 'boost', icon: 'boost' }];

/**
 * Battery thresholds.
 *
 * Netatmo reports a stepped scale rather than a true percentage - 90, 75, 50
 * and so on - so a warning at 30 sits between steps and never fires twice for
 * the same level. A head that reports nothing at all is worse than a low
 * number and gets its own message.
 */
export const BATTERY_WARN = 30;
export const BATTERY_CRITICAL = 15;
