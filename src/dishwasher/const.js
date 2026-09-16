/**
 * Domain constants for the AEG / Electrolux dishwasher card.
 *
 * The values here come from the appliance capability document reported by the
 * Electrolux cloud (see `docs/appliance-capabilities.md`) and from the
 * GI8200X5TN user manual (consumption table, alarm codes).
 */

export const CARD_NAME = 'aeg-dishwasher-card';
export const EDITOR_NAME = 'aeg-dishwasher-card-editor';
// replaced by the build with the version from package.json
export const CARD_VERSION =
  typeof __CARD_VERSION__ === 'string' ? __CARD_VERSION__ : 'dev';

/** Appliance states reported by `sensor.<device>_appliance_state`. */
export const STATE = {
  OFF: 'OFF',
  IDLE: 'IDLE',
  READY_TO_START: 'READY_TO_START',
  DELAYED_START: 'DELAYED_START',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  END_OF_CYCLE: 'END_OF_CYCLE',
  ALARM: 'ALARM',
  UNKNOWN: 'UNKNOWN',
};

/** Normalised state -> accent colour role used by the stylesheet. */
export const STATE_ACCENT = {
  [STATE.OFF]: 'idle',
  [STATE.IDLE]: 'idle',
  [STATE.READY_TO_START]: 'ready',
  [STATE.DELAYED_START]: 'delayed',
  [STATE.RUNNING]: 'running',
  [STATE.PAUSED]: 'paused',
  [STATE.END_OF_CYCLE]: 'done',
  [STATE.ALARM]: 'alarm',
  [STATE.UNKNOWN]: 'idle',
};

/** Cycle phases reported by `sensor.<device>_cycle_phase`. */
export const PHASE = {
  PREWASH: 'PREWASH',
  MAINWASH: 'MAINWASH',
  COLDRINSE: 'COLDRINSE',
  HOTRINSE: 'HOTRINSE',
  EXTRARINSE: 'EXTRARINSE',
  DRYING: 'DRYING',
  ADO_DRYING: 'ADO_DRYING',
  UNAVAILABLE: 'UNAVAILABLE',
};

/** The four timeline steps the card draws, and the phases that map onto them. */
export const TIMELINE_STEPS = ['PREWASH', 'MAINWASH', 'RINSE', 'DRYING'];

export const PHASE_TO_STEP = {
  [PHASE.PREWASH]: 'PREWASH',
  [PHASE.MAINWASH]: 'MAINWASH',
  [PHASE.COLDRINSE]: 'RINSE',
  [PHASE.HOTRINSE]: 'RINSE',
  [PHASE.EXTRARINSE]: 'RINSE',
  [PHASE.DRYING]: 'DRYING',
  [PHASE.ADO_DRYING]: 'DRYING',
};

/**
 * Programs of the GI8200X5TN.
 *
 * `water` (l), `energy` (kWh) and `duration` (min) are the declared values from
 * the manual's consumption table; `steps` lists the timeline steps the program
 * actually runs so the card can grey out the ones that never happen.
 */
export const PROGRAMS = {
  ECO: {
    icon: 'leaf',
    water: 8.4,
    energy: 0.488,
    duration: 310,
    steps: ['PREWASH', 'MAINWASH', 'RINSE', 'DRYING'],
  },
  AUTO: {
    icon: 'auto',
    water: 12.5,
    energy: 1.0,
    duration: 180,
    steps: ['PREWASH', 'MAINWASH', 'RINSE', 'DRYING'],
  },
  QUICK30: {
    icon: 'quick',
    water: 8.5,
    energy: 0.475,
    duration: 30,
    steps: ['MAINWASH', 'RINSE'],
  },
  QUICK60: {
    icon: 'clock',
    water: 10.5,
    energy: 1.0,
    duration: 60,
    steps: ['MAINWASH', 'RINSE', 'DRYING'],
  },
  NORMAL90: {
    icon: 'clock',
    water: 10.5,
    energy: 1.0,
    duration: 90,
    steps: ['MAINWASH', 'RINSE', 'DRYING'],
  },
  '120_MIN': {
    icon: 'clock',
    water: 10.5,
    energy: 0.9,
    duration: 120,
    steps: ['MAINWASH', 'RINSE', 'DRYING'],
  },
  RINSE: {
    icon: 'rinse',
    water: 4.0,
    energy: 0.15,
    duration: 15,
    steps: ['PREWASH'],
    // the appliance reports no eco/energy/water score for this program
    scores: false,
  },
  MACHINE_CARE: {
    icon: 'care',
    water: 10.0,
    energy: 0.575,
    duration: 60,
    steps: ['MAINWASH', 'RINSE', 'DRYING'],
    scores: false,
  },
};

/** Order in which the program chips are rendered. */
export const PROGRAM_ORDER = [
  'ECO',
  'AUTO',
  'QUICK30',
  'QUICK60',
  'NORMAL90',
  '120_MIN',
  'RINSE',
  'MACHINE_CARE',
];

/**
 * Wash options, in render order. `entity` is the suffix of the matching switch
 * entity, `programs` lists the programs that accept the option (taken from the
 * capability document -- the appliance simply ignores the others).
 */
export const OPTIONS = [
  {
    key: 'xtra_dry',
    entity: 'xtra_dry_option',
    icon: 'dry',
    programs: ['ECO', 'QUICK60', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'extra_power',
    entity: 'extra_power_option',
    icon: 'power',
    programs: ['QUICK30', 'QUICK60', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'extra_silent',
    entity: 'extra_silent_option',
    icon: 'silent',
    programs: ['ECO', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'glass_care',
    entity: 'glass_care_option',
    icon: 'glass',
    programs: ['QUICK30', 'QUICK60', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'sanitize',
    entity: 'sanitize_option',
    icon: 'sanitize',
    programs: ['QUICK30', 'QUICK60', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'spray_zone',
    entity: 'spray_zone_option',
    icon: 'spray',
    programs: ['QUICK30', 'QUICK60', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'zone_clean',
    entity: 'zone_clean_option',
    icon: 'zone',
    programs: ['QUICK30', 'QUICK60', 'NORMAL90', '120_MIN'],
  },
  {
    key: 'one_rack',
    entity: 'one_rack_option',
    icon: 'rack',
    programs: ['QUICK30', 'QUICK60'],
  },
  {
    key: 'auto_door_opener',
    entity: 'auto_door_opener',
    icon: 'door',
    programs: null, // available for every program
  },
];

/**
 * Which command buttons make sense in a given appliance state. Mirrors the
 * `applianceState` triggers of the capability document.
 */
export const STATE_COMMANDS = {
  [STATE.OFF]: ['on'],
  [STATE.IDLE]: ['start', 'off'],
  [STATE.READY_TO_START]: ['start', 'off'],
  [STATE.DELAYED_START]: ['stopreset'],
  [STATE.RUNNING]: ['pause'],
  [STATE.PAUSED]: ['resume', 'stopreset'],
  [STATE.END_OF_CYCLE]: ['stopreset', 'off'],
  [STATE.ALARM]: ['stopreset', 'off'],
  [STATE.UNKNOWN]: [],
};

export const COMMAND_META = {
  on: { icon: 'power', style: 'ghost' },
  off: { icon: 'power', style: 'ghost' },
  start: { icon: 'play', style: 'primary' },
  pause: { icon: 'pause', style: 'primary' },
  resume: { icon: 'play', style: 'primary' },
  stopreset: { icon: 'stop', style: 'ghost' },
};

/** Alert codes the appliance can report, with a severity used for styling. */
export const ALERT_SEVERITY = {
  DISH_ALARM_SALT_MISSING: 'warning',
  DISH_ALARM_RINSE_AID_LOW: 'warning',
  DISH_ALARM_I10: 'error',
  DISH_ALARM_I11: 'error',
  DISH_ALARM_I20: 'error',
  DISH_ALARM_I30: 'error',
  DISH_ALARM_I41: 'error',
  DISH_ALARM_I43: 'error',
  DISH_ALARM_I44: 'error',
  DISH_ALARM_IF1: 'error',
};

/** Delayed-start shortcuts offered by the card, in minutes. */
export const DELAY_PRESETS = [60, 120, 180, 240, 360, 480, 720];
