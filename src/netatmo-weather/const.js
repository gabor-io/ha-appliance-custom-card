/**
 * Domain constants for the Netatmo weather station card.
 *
 * A station is one base unit (NAMain) plus up to three kinds of module. This
 * installation has an outdoor module (NAModule1) and one extra indoor module
 * (NAModule4); the wind gauge and the rain gauge are absent, so the card does
 * not pretend they might show up.
 *
 * Nothing here is resolved by object id. The modules are told apart by what
 * they measure, which survives a renamed device and a translated Home
 * Assistant alike - see `entities.js`.
 */

export const CARD_NAME = 'netatmo-weather-card';
export const EDITOR_NAME = 'netatmo-weather-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

export const PLATFORM = 'netatmo';

/**
 * CO₂ bands, the same five the ventilation card uses.
 *
 * `max` is where the band ends; the meter fills proportionally up to
 * `CO2_SCALE`, so a reading past the last band simply pins the bar full.
 */
export const CO2_BANDS = [
  { level: 'excellent', max: 800 },
  { level: 'good', max: 1000 },
  { level: 'fair', max: 1400 },
  { level: 'poor', max: 2000 },
  { level: 'bad', max: Infinity },
];

export const CO2_SCALE = 2000;

/** Above this the card asks for a window; above the second, it insists. */
export const CO2_HIGH = 1000;
export const CO2_BAD = 1400;

/**
 * The lamp on the drawing has three steps, not five.
 *
 * The real station shows three colours when you tap its top, and five shades
 * a few hundred ppm apart would not be distinguishable on a 34 px cylinder -
 * the palette check fails them for normal and colour-deficient vision alike.
 * The meter keeps all five, where the number and the label carry the detail.
 */
export const GLOW_STEPS = [
  { max: 800, colour: 'var(--air-excellent)' },
  { max: CO2_BAD, colour: 'var(--air-fair)' },
  { max: Infinity, colour: 'var(--air-bad)' },
];

/**
 * Battery thresholds.
 *
 * Netatmo reports a stepped scale (90, 75, 54, …) rather than a true
 * percentage, so a warning at 30 sits between two steps and never fires twice
 * for the same level.
 */
export const BATTERY_WARN = 30;
export const BATTERY_CRITICAL = 15;

/** Trend values the integration reports, and the arrow each one draws. */
export const TRENDS = {
  up: 'trend_up',
  down: 'trend_down',
  stable: 'trend_stable',
};

/** A reading older than this is called out in the header. */
export const STALE_MINUTES = 20;
