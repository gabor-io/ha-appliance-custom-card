/**
 * Domain constants for the Daikin air conditioner card.
 *
 * The unit reaches Home Assistant through the built-in `daikin` integration
 * (pydaikin over the local BRP069 WiFi adapter). That integration exposes one
 * `climate` entity plus a handful of sensors; everything the card shows beyond
 * those comes from entities the user points at (`sources`).
 *
 * The card also drives a climate group (e.g. `climate_group`), which reports
 * its members in the `entity_id` attribute.
 */

export const CARD_NAME = 'daikin-ac-card';
export const EDITOR_NAME = 'daikin-ac-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** The integration that owns the entities the card resolves by itself. */
export const PLATFORM = 'daikin';

/**
 * HVAC modes in the order the segmented bar lists them, with the colour each
 * one paints the whole card with. `off` leads, because that is the control
 * people reach for first.
 */
export const MODES = [
  { key: 'off', icon: 'power', colour: 'var(--ap-off)' },
  { key: 'heat_cool', icon: 'auto', colour: 'var(--ap-auto)' },
  { key: 'heat', icon: 'heat', colour: 'var(--ap-heat)' },
  { key: 'cool', icon: 'snowflake', colour: 'var(--ap-cool)' },
  { key: 'dry', icon: 'water', colour: 'var(--ap-dry)' },
  { key: 'fan_only', icon: 'fan', colour: 'var(--ap-fan)' },
];

export const MODE_KEYS = MODES.map((mode) => mode.key);

/**
 * Swing modes the card offers by default.
 *
 * pydaikin returns the swing list from a fixed translation table rather than
 * asking the unit, so every BRP069 adapter claims `Horizontal` and `3D` even
 * when the indoor unit only moves the flap up and down. Showing controls that
 * do nothing is worse than hiding them, so the card keeps the two that always
 * work and `show_all_swing: true` brings the rest back.
 */
export const SAFE_SWING_MODES = ['off', 'vertical'];

/**
 * Presets the card shows as toggle buttons, in order. `none` is the released
 * state of all three, so it never gets a button of its own.
 */
export const PRESETS = [
  { key: 'boost', icon: 'quick' },
  { key: 'eco', icon: 'leaf' },
  { key: 'away', icon: 'away' },
];

/** Fan modes sorted low to high; anything unknown keeps the entity's order. */
export const FAN_ORDER = ['auto', 'silence', '1', '2', '3', '4', '5'];

/**
 * Half a degree of slack before the card calls the room warmer or colder than
 * the target. Without it the headline and the line under it can disagree.
 */
export const TEMP_TOLERANCE = 0.5;

/**
 * Below this many watts a running unit is only moving air: the compressor is
 * off. The Daikin's own compressor-frequency sensor is disabled by default in
 * the registry and reports a placeholder on some adapters, so a plug meter
 * pointed at `sources.power` answers this far better.
 */
export const IDLE_POWER_W = 100;

/**
 * Modes in which an open window actually costs money.
 *
 * `fan_only` only moves air that is already in the room, so a window open
 * there is not waste and the card stays quiet about it. Drying does run the
 * compressor, so it counts.
 */
export const CONDITIONING_MODES = ['heat', 'cool', 'heat_cool', 'dry'];

/** Airflow animation period, fastest fan to slowest. */
export const FLOW_SECONDS = { min: 1.5, max: 4.6 };
