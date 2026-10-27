/**
 * Domain constants for the AENO infrared panel heater card.
 *
 * The panels reach Home Assistant through
 * [tuya-local](https://github.com/make-all/tuya-local), which builds every
 * entity from a YAML device profile. Which entities exist therefore depends on
 * the profile the device matched, and the card is written for both:
 *
 * - `princess_panel_heater`, which the AGH0001S matches out of the box and
 *   which describes only on/off, the setpoint and the room temperature;
 * - a full profile for the panel (see `docs/aeno-capabilities.md`), which adds
 *   the demand signal, the two heating modes, power, cumulative energy, the
 *   panel's own surface temperature, the element limit, the child lock and the
 *   countdown.
 *
 * Everything beyond the climate entity is therefore optional, and the card
 * draws only what it actually finds.
 */

export const CARD_NAME = 'aeno-heater-card';
export const EDITOR_NAME = 'aeno-heater-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** The integration that owns the entities the card resolves by itself. */
export const PLATFORM = 'tuya_local';

/**
 * The registry translation key tuya-local gives a heater's climate entity.
 *
 * Both profiles set it (`translation_only_key: heater`), so this is what tells
 * a panel heater apart from the air conditioners and water heaters that arrive
 * on the same platform.
 */
export const HEATER_KEY = 'heater';

/** Registry translation keys of the extra entities, where the profile sets one. */
export const KEYS = {
  lock: 'child_lock',
  limit: 'maximum_temperature',
  remaining: 'time_remaining',
  timer: 'timer',
  unit: 'temperature_unit',
};

/** The two hvac modes the panel has. `off` leads: it is the control people reach for. */
export const MODES = [
  { key: 'off', icon: 'power', colour: 'var(--ae-off)' },
  { key: 'heat', icon: 'heat', colour: 'var(--ae-heat)' },
];

export const MODE_KEYS = MODES.map((mode) => mode.key);

/**
 * The panel's two regulating modes.
 *
 * The app calls them SMART and Constant; the device sends `smart` and
 * `manual`, and tuya-local maps the first onto the standard `comfort` preset.
 * The difference matters: in SMART the element follows the setpoint, in
 * Constant it runs regardless of it, so a panel left in Constant will heat an
 * already warm room all day. That is the one thing worth saying out loud on
 * the card.
 */
export const PRESETS = [
  { key: 'comfort', icon: 'target' },
  { key: 'manual', icon: 'manual' },
];

/** The preset in which the setpoint is ignored. */
export const CONTINUOUS_PRESET = 'manual';

/**
 * Half a degree of slack before the card calls the room warmer or colder than
 * the target, so the headline and the line under it cannot disagree.
 */
export const TEMP_TOLERANCE = 0.5;

/**
 * Below this many watts the element is off.
 *
 * The measured panel draws about 800 W with the element on and 0 W with it
 * off - there is nothing in between, so any low threshold does. It is only
 * needed where the profile reports power but not the demand signal.
 */
export const IDLE_POWER_W = 50;

/**
 * The surface temperature range the glow is scaled over.
 *
 * Measured on a running panel: 25 °C from cold, 70 °C after a quarter of an
 * hour. Below `cold` the drawing stays grey however loudly the device claims
 * to be heating, which is the honest reading of a panel that has only just
 * been switched on.
 */
export const PANEL_TEMP = { cold: 28, hot: 68 };

/**
 * The setpoint range, for the rare case where the entity does not carry it.
 *
 * The app allows 0 to 40 °C. The stock `princess_panel_heater` profile claims
 * 0 to 37, which is where that number comes from if you see it.
 */
export const TEMP_RANGE = { min: 0, max: 40 };
