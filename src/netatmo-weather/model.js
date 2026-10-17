/**
 * Turns `hass` into everything the weather card draws.
 *
 * One thing here decides the whole shape of the card, and it is not obvious:
 *
 * **A module that drops off the radio does not go unavailable.** It keeps
 * publishing its last reading, for hours, with no sign that the number is
 * old. The only entity that tells the truth is the module's connectivity
 * binary sensor. So every module has three states, not two:
 *
 * - `live`  - the reading is current
 * - `stale` - the radio link is down and the numbers are frozen leftovers
 * - `dead`  - the readings themselves are unavailable, usually a flat battery
 *
 * A card that knows only "value" and "unavailable" shows a confident 7 °C
 * from yesterday afternoon, which is worse than showing nothing.
 */

import {
  BATTERY_CRITICAL,
  BATTERY_WARN,
  CO2_BAD,
  CO2_BANDS,
  CO2_HIGH,
  CO2_SCALE,
  GLOW_STEPS,
  STALE_MINUTES,
} from './const.js';
import { discoverStation, isUnavailable, moduleName } from './entities.js';

function num(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

function text(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  return isUnavailable(stateObj) ? null : stateObj.state;
}

function unitOf(hass, entityId, fallback) {
  return hass?.states?.[entityId]?.attributes?.unit_of_measurement || fallback;
}

/** Seconds since a sensor last reported, or null when it never has. */
function ageSeconds(hass, entityId) {
  const changed = hass?.states?.[entityId]?.last_updated || hass?.states?.[entityId]?.last_changed;
  if (!changed) return null;
  const seconds = (Date.now() - new Date(changed).getTime()) / 1000;
  return Number.isFinite(seconds) ? Math.max(0, seconds) : null;
}

/** Which CO₂ band a reading falls in, and how full the meter should be. */
export function co2Band(value) {
  if (value === null || value === undefined) return null;
  const band = CO2_BANDS.find((item) => value < item.max) || CO2_BANDS[CO2_BANDS.length - 1];
  return { level: band.level, ratio: Math.min(1, value / CO2_SCALE) };
}

/** The lamp colour on the drawing: three steps, never five. */
export function glowColour(value) {
  if (value === null || value === undefined) return null;
  return (GLOW_STEPS.find((step) => value < step.max) || GLOW_STEPS[GLOW_STEPS.length - 1]).colour;
}

/** One module, with its three-way state resolved. */
export function buildModule(hass, module, kind) {
  if (!module) return null;
  const { sensors, trend, reachable } = module;

  const temperature = num(hass, sensors.temperature);
  /* the readings are gone, not merely old: a flat battery, or the module
     removed from the account */
  const dead = temperature === null;
  /* the connectivity entity is the only honest signal that a value is old */
  const link = text(hass, reachable);
  const stale = !dead && link === 'off';

  const co2 = num(hass, sensors.co2);

  return {
    kind,
    deviceId: module.deviceId,
    name: moduleName(hass, module),
    entityId: sensors.temperature || sensors.battery || null,
    sensors,
    live: !dead && !stale,
    stale,
    dead,
    temperature,
    temperatureTrend: text(hass, trend.temperature),
    humidity: num(hass, sensors.humidity),
    co2,
    band: co2Band(co2),
    glow: dead || stale ? null : glowColour(co2),
    noise: num(hass, sensors.noise),
    pressure: num(hass, sensors.pressure),
    pressureUnit: unitOf(hass, sensors.pressure, 'hPa'),
    pressureTrend: text(hass, trend.pressure),
    battery: num(hass, sensors.battery),
    age: ageSeconds(hass, sensors.temperature),
  };
}

export function buildModel(hass, config) {
  const station = discoverStation(hass, config);
  if (!station.main && !station.outdoor && !station.indoor.length) {
    return { ok: false, reason: 'no_station' };
  }

  const main = buildModule(hass, station.main, 'main');
  const outdoor = buildModule(hass, station.outdoor, 'outdoor');
  const indoor = station.indoor
    .map((module) => buildModule(hass, module, module === station.main ? 'main' : 'module'))
    .filter(Boolean);

  /* the pressure belongs to the base station but is a property of the
     weather outside, so the hero shows it next to the outdoor temperature */
  const pressure = main?.pressure ?? null;

  const live = indoor.filter((module) => module.live);
  const worstCo2 = live.reduce(
    (worst, module) => (module.co2 !== null && module.co2 > worst ? module.co2 : worst),
    0,
  );

  const alerts = [];
  for (const module of indoor) {
    if (module.dead) {
      alerts.push({ kind: 'quiet', icon: 'offline', key: 'alert.dead', values: { name: module.name } });
      continue;
    }
    if (module.stale) {
      alerts.push({ kind: '', icon: 'offline', key: 'alert.stale', values: { name: module.name } });
      continue;
    }
    if (module.co2 !== null && module.co2 >= CO2_BAD) {
      alerts.push({ kind: 'error', icon: 'alert', key: 'alert.co2_bad', values: { name: module.name, value: module.co2 } });
    } else if (module.co2 !== null && module.co2 >= CO2_HIGH) {
      alerts.push({ kind: '', icon: 'alert', key: 'alert.co2_high', values: { name: module.name, value: module.co2 } });
    }
  }
  if (outdoor?.dead) {
    alerts.push({ kind: 'quiet', icon: 'offline', key: 'alert.dead', values: { name: outdoor.name } });
  } else if (outdoor?.stale) {
    alerts.push({ kind: '', icon: 'offline', key: 'alert.stale', values: { name: outdoor.name } });
  }

  /* a module that reports no battery level at all is mains powered - the
     base station is - so a missing value is not a warning */
  for (const module of [...indoor, outdoor].filter(Boolean)) {
    if (module.battery === null) continue;
    if (module.battery <= BATTERY_CRITICAL) {
      alerts.push({ kind: 'error', icon: 'battery', key: 'alert.battery_critical', values: { name: module.name, value: module.battery } });
    } else if (module.battery <= BATTERY_WARN) {
      alerts.push({ kind: 'quiet', icon: 'battery', key: 'alert.battery_low', values: { name: module.name, value: module.battery } });
    }
  }

  const ages = [main, outdoor, ...indoor]
    .filter((module) => module?.live && module.age !== null)
    .map((module) => module.age);

  return {
    ok: true,
    main,
    outdoor,
    indoor,
    pressure,
    pressureUnit: main?.pressureUnit || 'hPa',
    pressureTrend: main?.pressureTrend ?? null,
    /** worst CO₂ among the modules whose reading is current */
    worstCo2: worstCo2 || null,
    heroGlow: glowColour(worstCo2 || null),
    alerts,
    /** how long ago the freshest module last reported */
    age: ages.length ? Math.min(...ages) : null,
    /** every live module is quiet for longer than a station normally is */
    quietFor: ages.length && Math.min(...ages) > STALE_MINUTES * 60,
  };
}
