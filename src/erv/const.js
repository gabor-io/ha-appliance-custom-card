/**
 * Domain constants for the Fisher heat-recovery ventilator card.
 *
 * The appliance speaks Tuya and reaches Home Assistant through
 * [tuya-local](https://github.com/make-all/tuya-local) with the
 * `fisher_ervq_hd_hrv` device config: a fan with preset modes, four air
 * sensors, two fan-speed numbers, the filter life and a filter reset.
 */

export const CARD_NAME = 'fisher-erv-card';
export const EDITOR_NAME = 'fisher-erv-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** Preset modes the device config maps, in the order the card lists them. */
export const PRESETS = [
  { key: 'manual', option: 'Manual', icon: 'manual' },
  { key: 'auto', option: 'auto', icon: 'auto' },
  { key: 'sleep', option: 'sleep', icon: 'sleep' },
  { key: 'pure_l', option: 'Pure L', icon: 'leaf' },
  { key: 'pure_m', option: 'Pure M', icon: 'leaf' },
  { key: 'pure_h', option: 'Pure H', icon: 'leaf' },
];

/** The two fan speeds the appliance exposes, 1-8 each. */
export const SPEEDS = [
  { key: 'supply', icon: 'supply' },
  { key: 'exhaust', icon: 'exhaust' },
];

/**
 * CO2 bands in ppm. The appliance ventilates on CO2, so these drive the
 * colour of the reading and the wording under it.
 */
export const CO2_BANDS = [
  { max: 600, level: 'excellent' },
  { max: 800, level: 'good' },
  { max: 1000, level: 'fair' },
  { max: 1400, level: 'poor' },
  { max: Infinity, level: 'bad' },
];

/** PM2.5 bands in µg/m³, following the WHO 2021 daily guidance. */
export const PM25_BANDS = [
  { max: 10, level: 'excellent' },
  { max: 15, level: 'good' },
  { max: 25, level: 'fair' },
  { max: 50, level: 'poor' },
  { max: Infinity, level: 'bad' },
];

/**
 * The lowest CO2 reading that can be a measurement.
 *
 * Outdoor air sits around 420 ppm and a room never goes below it, so zero is
 * not a low reading - it is the sensor not sampling. The appliance only runs
 * its air sensors while air is moving: switched off it reports 0 ppm and
 * 0 µg/m³ while still giving a real temperature and humidity.
 */
export const CO2_MIN_PPM = 1;

/** Below this many days left the card warns about the filter. */
export const FILTER_WARN_DAYS = 14;
