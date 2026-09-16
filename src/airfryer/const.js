/**
 * Domain constants for the Philips airfryer card.
 *
 * Values come from the `philips_homeid` integration (entity naming, status
 * values, setting ranges) and from the HD9880 user manual (cooking modes,
 * temperature and time ranges, core-temperature guidance).
 */

export const CARD_NAME = 'philips-airfryer-card';
export const EDITOR_NAME = 'philips-airfryer-card-editor';
export const CARD_VERSION = '1.0.0';

/** `sensor.<prefix>_cooking_status` values (local_models.py). */
export const STATUS = {
  STANDBY: 'STANDBY',
  POWERSAVE: 'POWERSAVE',
  MAINMENU: 'MAINMENU',
  IDLE: 'IDLE',
  SETTING: 'SETTING',
  PARASETTING: 'PARASETTING',
  PRECOOK: 'PRECOOK',
  COOKING: 'COOKING',
  PAUSE: 'PAUSE',
  USER_ACTION: 'USER_ACTION',
  MAINTAIN: 'MAINTAIN',
  FINISH: 'FINISH',
  PAIRING: 'PAIRING',
  UNKNOWN: 'UNKNOWN',
};

/** Status -> accent colour role used by the stylesheet. */
export const STATUS_ACCENT = {
  [STATUS.STANDBY]: 'idle',
  [STATUS.POWERSAVE]: 'idle',
  [STATUS.MAINMENU]: 'idle',
  [STATUS.IDLE]: 'ready',
  [STATUS.SETTING]: 'ready',
  [STATUS.PARASETTING]: 'ready',
  [STATUS.PRECOOK]: 'preheat',
  [STATUS.COOKING]: 'cooking',
  [STATUS.PAUSE]: 'paused',
  [STATUS.USER_ACTION]: 'paused',
  [STATUS.MAINTAIN]: 'warm',
  [STATUS.FINISH]: 'done',
  [STATUS.PAIRING]: 'idle',
  [STATUS.UNKNOWN]: 'idle',
};

/** Statuses in which the appliance is actively working on a cycle. */
export const ACTIVE_STATUSES = [STATUS.PRECOOK, STATUS.COOKING, STATUS.MAINTAIN];

/** Statuses that have a running (or frozen) countdown to show. */
export const COUNTDOWN_STATUSES = [...ACTIVE_STATUSES, STATUS.PAUSE, STATUS.USER_ACTION];

/** Statuses in which settings (temperature, time, method) may be changed. */
export const SETTABLE_STATUSES = [
  STATUS.IDLE,
  STATUS.SETTING,
  STATUS.PARASETTING,
  STATUS.MAINMENU,
  STATUS.STANDBY,
];

/**
 * Which command buttons make sense per status. `power` is the switch, the rest
 * are the integration's buttons.
 */
export const STATUS_COMMANDS = {
  [STATUS.STANDBY]: ['power_on'],
  [STATUS.POWERSAVE]: ['power_on'],
  [STATUS.MAINMENU]: ['start', 'power_off'],
  [STATUS.IDLE]: ['start', 'power_off'],
  [STATUS.SETTING]: ['start', 'power_off'],
  [STATUS.PARASETTING]: ['start', 'power_off'],
  [STATUS.PRECOOK]: ['pause', 'stop'],
  [STATUS.COOKING]: ['pause', 'stop'],
  [STATUS.PAUSE]: ['start', 'stop'],
  [STATUS.USER_ACTION]: ['start', 'stop'],
  [STATUS.MAINTAIN]: ['stop'],
  [STATUS.FINISH]: ['keep_warm', 'stop'],
  [STATUS.PAIRING]: [],
  [STATUS.UNKNOWN]: [],
};

export const COMMAND_META = {
  power_on: { icon: 'power', style: 'primary', entity: 'power', service: ['switch', 'turn_on'] },
  power_off: { icon: 'power', style: 'ghost', entity: 'power', service: ['switch', 'turn_off'] },
  start: { icon: 'play', style: 'primary', entity: 'btn_start', service: ['button', 'press'] },
  pause: { icon: 'pause', style: 'primary', entity: 'btn_pause', service: ['button', 'press'] },
  stop: { icon: 'stop', style: 'ghost', entity: 'btn_stop', service: ['button', 'press'] },
  keep_warm: {
    icon: 'warm',
    style: 'ghost',
    entity: 'btn_keep_warm',
    service: ['button', 'press'],
  },
};

/** Cooking methods the HD9880 (Venus) exposes through `select.cooking_method`. */
export const METHODS = {
  MANUAL: { icon: 'manual' },
  AUTO_COOK: { icon: 'auto' },
  KEEP_WARM: { icon: 'warm' },
  RECIPE: { icon: 'recipe' },
  NO_SELECTION: { icon: 'dots' },
  // other Philips architectures reuse the same card
  AIR_STEAM: { icon: 'steam' },
  AIR_STEAM_PRO: { icon: 'steam' },
  STEAMING: { icon: 'steam' },
  ROAST: { icon: 'roast' },
  BAKE: { icon: 'bake' },
  GRILL: { icon: 'roast' },
  SLOW_COOK: { icon: 'slow' },
  STEW: { icon: 'slow' },
  DEFROST: { icon: 'defrost' },
  REHEAT: { icon: 'reheat' },
  SOUS_VIDE: { icon: 'probe' },
  EASY_CLEAN: { icon: 'clean' },
  USER_PRESET: { icon: 'star' },
  FROZEN_SNACKS: { icon: 'snack' },
  FRESH_FRIES: { icon: 'fries' },
  CHICKEN: { icon: 'chicken' },
  FISH: { icon: 'fish' },
  MUFFINS_CAKE: { icon: 'bake' },
  MEAT_CHOPS: { icon: 'meat' },
  VEGETABLES: { icon: 'vegetable' },
};

/** Methods that put the appliance into a steam phase (used by the animation). */
export const STEAM_METHODS = ['AIR_STEAM', 'AIR_STEAM_PRO', 'STEAMING', 'STEW', 'SLOW_COOK'];

/** Fallback setting ranges; the entity's own min/max/step always win. */
export const RANGES = {
  temperature: { min: 40, max: 200, step: 5 },
  time: { min: 1, max: 60, step: 1 },
  probe: { min: 40, max: 100, step: 1 },
  airspeed: { min: 1, max: 2, step: 1 },
};

/** Core-temperature guidance from the manual (page 23). */
export const CORE_TEMPERATURES = [
  { food: 'poultry', doneness: 'done', range: '80–85 °C' },
  { food: 'poultry_breast', doneness: 'juicy', range: '70–74 °C' },
  { food: 'beef', doneness: 'rare', range: '45–50 °C' },
  { food: 'beef', doneness: 'medium', range: '55–60 °C' },
  { food: 'beef', doneness: 'well_done', range: '65–70 °C' },
  { food: 'pork', doneness: 'done', range: '70–73 °C' },
  { food: 'pork_chop', doneness: 'medium', range: '58–63 °C' },
  { food: 'fish', doneness: 'translucent', range: '50–55 °C' },
  { food: 'potato', doneness: 'well_done', range: '92–95 °C' },
];

/** Temperature presets offered as one-tap chips. */
export const TEMP_PRESETS = [160, 180, 200];

/** Cook-time presets in minutes. */
export const TIME_PRESETS = [5, 10, 15, 20, 30];
