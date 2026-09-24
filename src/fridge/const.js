/**
 * Domain constants for the Liebherr fridge card.
 *
 * Everything here mirrors Home Assistant's built-in `liebherr` integration:
 * the controls the SmartDevice API reports (`nightmode`, `supercool`,
 * `temperature`, …), the zone positions, and the entity naming rules.
 */

export const CARD_NAME = 'liebherr-fridge-card';
export const EDITOR_NAME = 'liebherr-fridge-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** Zone positions, top to bottom, as the integration names them. */
export const ZONES = ['top', 'middle', 'bottom'];

/** Zone position -> the suffix Home Assistant adds to a multi-zone entity. */
export const ZONE_SUFFIX = {
  top: 'top_zone',
  middle: 'middle_zone',
  bottom: 'bottom_zone',
};

/** Per-zone switches: `key -> [translation key, object-id suffix, icon]`. */
export const ZONE_SWITCHES = {
  supercool: ['super_cool', 'supercool', 'snowflake'],
  superfrost: ['super_frost', 'superfrost', 'frost'],
};

/** Device-wide switches. */
export const DEVICE_SWITCHES = {
  nightmode: ['night_mode', 'nightmode', 'night'],
  partymode: ['party_mode', 'partymode', 'party'],
};

/** Per-zone selects. */
export const ZONE_SELECTS = {
  icemaker: ['ice_maker', 'icemaker', 'ice'],
  hydrobreeze: ['hydro_breeze', 'hydrobreeze', 'mist'],
  biofresh: ['bio_fresh_plus', 'biofresh_plus', 'leaf'],
};

/** Quick temperature presets, clamped to what the appliance accepts. */
export const TEMP_PRESETS = [2, 4, 5, 7];

/** A zone is "at temperature" within this many degrees of its setpoint. */
export const AT_TARGET_TOLERANCE = 0.6;
