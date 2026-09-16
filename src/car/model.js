/** Turns the raw `hass` object into the view model the car card renders. */

import {
  CHARGING_ROWS,
  CORNERS,
  CORNER_SVG,
  LEVEL_KEYS,
  RANGE_KEYS,
  SERVICE_ROWS,
  SYSTEM_ROWS,
  TRIP_ROWS,
} from './const.js';
import { isUnavailable, resolveEntities } from './entities.js';

const DRIVE_ROWS = [
  ['outside_temperature', 'temperature'],
  ['adblue_range', 'adblue'],
  ['combustion_range', 'range'],
  ['electric_range', 'range'],
  ['gas_range', 'range'],
  ['gas_level', 'fuel'],
  ['battery_percentage', 'battery_car'],
];

function num(stateObj) {
  if (isUnavailable(stateObj)) return null;
  const value = Number(stateObj.state);
  return Number.isFinite(value) ? value : null;
}

/** `on`/`off` binary sensor, `null` when the car does not report it. */
function bool(stateObj) {
  if (isUnavailable(stateObj)) return null;
  return stateObj.state === 'on';
}

/** A lock binary sensor is `on` when the car is *un*locked. */
function locked(stateObj) {
  const open = bool(stateObj);
  return open === null ? null : !open;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "12 perce" / "12 minutes ago" for the timestamps MySkoda reports. */
export function relativeTime(date, hass) {
  if (!date) return null;
  const locale = hass?.locale?.language || hass?.language || 'hu';
  const seconds = (date.getTime() - Date.now()) / 1000;
  const abs = Math.abs(seconds);
  const steps = [
    ['second', 1, 60],
    ['minute', 60, 3600],
    ['hour', 3600, 86400],
    ['day', 86400, 2592000],
    ['month', 2592000, 31536000],
    ['year', 31536000, Infinity],
  ];
  const [unit, size] = steps.find(([, , limit]) => abs < limit) || steps[steps.length - 1];
  try {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
      Math.round(seconds / size),
      unit,
    );
  } catch (err) {
    return date.toLocaleString();
  }
}

/** Human-readable value of any entity, using Home Assistant's own formatter. */
export function displayState(hass, stateObj) {
  if (isUnavailable(stateObj)) return null;
  const attrs = stateObj.attributes || {};

  if (attrs.device_class === 'timestamp') {
    const date = parseDate(stateObj.state);
    if (date) return relativeTime(date, hass);
  }

  if (typeof hass?.formatEntityState === 'function') {
    try {
      const formatted = hass.formatEntityState(stateObj);
      if (formatted) return formatted;
    } catch (err) {
      /* fall through to the manual formatting below */
    }
  }

  const value = Number(stateObj.state);
  if (Number.isFinite(value)) {
    const locale = hass?.locale?.language || hass?.language || 'hu';
    let text;
    try {
      text = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
    } catch (err) {
      text = String(value);
    }
    return attrs.unit_of_measurement ? `${text} ${attrs.unit_of_measurement}` : text;
  }

  const raw = String(stateObj.state);
  return raw.charAt(0).toUpperCase() + raw.slice(1).replace(/_/g, ' ');
}

/** `1284` minutes -> `21 h 24 min`; the raw minute count is unreadable. */
function travelTime(stateObj) {
  const minutes = num(stateObj);
  const unit = (stateObj?.attributes?.unit_of_measurement || '').toLowerCase();
  if (minutes === null || !['min', 'm'].includes(unit) || minutes < 120) return null;
  const hours = Math.floor(minutes / 60);
  return `${hours} h ${Math.round(minutes % 60)} min`;
}

/** Builds `[{ key, entityId, value, icon }]`, skipping everything unavailable. */
function rows(hass, entities, definitions, skipValues = []) {
  const out = [];
  for (const [key, iconName] of definitions) {
    const entityId = entities[key];
    if (!entityId) continue;
    const stateObj = hass.states[entityId];
    const value = key.endsWith('travel_time')
      ? travelTime(stateObj) || displayState(hass, stateObj)
      : displayState(hass, stateObj);
    if (value === null) continue;
    // a secondary range that repeats the headline range adds nothing
    if (key.endsWith('_range') && skipValues.includes(value)) continue;
    out.push({ key, entityId, value, icon: iconName });
  }
  return out;
}

function vehicleName(hass, config, entities) {
  if (config?.name) return config.name;
  const device = entities.device ? hass.devices?.[entities.device] : null;
  if (device) return device.name_by_user || device.name;
  const anchor = entities.mileage ? hass.states[entities.mileage] : null;
  return anchor?.attributes?.friendly_name?.replace(/\s*Mileage$/i, '') || null;
}

export function buildModel(hass, config) {
  const entities = resolveEntities(hass, config);
  const get = (key) => (entities[key] ? hass.states[entities[key]] : undefined);

  const known = Object.keys(entities).filter(
    (key) => !['prefix', 'device', 'extra'].includes(key) && entities[key],
  );
  if (!known.length) {
    return { ok: false, reason: entities.prefix || entities.device ? 'unavailable' : 'not_configured', entities };
  }

  const doors = {};
  const windows = {};
  const openings = [];
  for (const corner of CORNERS) {
    const doorState = bool(get(`door_${corner}`));
    const windowState = bool(get(`window_${corner}`));
    doors[CORNER_SVG[corner]] = doorState === true;
    windows[CORNER_SVG[corner]] = windowState === true;
    if (doorState !== null) {
      openings.push({
        key: `door_${corner}`,
        kind: 'door',
        open: doorState,
        entityId: entities[`door_${corner}`],
      });
    }
    if (windowState !== null) {
      openings.push({
        key: `window_${corner}`,
        kind: 'window',
        open: windowState,
        entityId: entities[`window_${corner}`],
      });
    }
  }

  const trunk = bool(get('trunk'));
  const bonnet = bool(get('bonnet'));
  const sunroof = bool(get('sunroof'));
  for (const [key, value] of [['trunk', trunk], ['bonnet', bonnet], ['sunroof', sunroof]]) {
    if (value !== null) openings.push({ key, kind: 'extra', open: value, entityId: entities[key] });
  }

  const levelKey = LEVEL_KEYS.find((key) => entities[key] && num(get(key)) !== null);
  const rangeKey = RANGE_KEYS.find((key) => entities[key] && num(get(key)) !== null);
  const levelState = levelKey ? get(levelKey) : null;
  const rangeState = rangeKey ? get(rangeKey) : null;

  const positionState = get('position');
  const reachable = bool(get('reachable'));
  const capturedDate = parseDate(get('car_captured')?.state);

  // rows already shown at the top of the card must not repeat in the sections
  const shown = new Set([levelKey, rangeKey, 'mileage', 'car_captured'].filter(Boolean));
  const filter = (definitions) => definitions.filter(([key]) => !shown.has(key));
  const headline = [rangeState ? displayState(hass, rangeState) : null].filter(Boolean);

  return {
    ok: true,
    entities,
    name: vehicleName(hass, config, entities),
    locked: locked(get('lock_vehicle')) ?? locked(get('lock_doors')),
    lockEntity: entities.lock_vehicle || entities.lock_doors || null,
    moving: bool(get('in_motion')) === true,
    offline: reachable === false,
    reachable,
    lights: bool(get('lights')) === true,
    batteryProtection: bool(get('battery_protection')),
    chargerConnected: bool(get('charger_connected')),
    doors,
    windows,
    trunk: trunk === true,
    bonnet: bonnet === true,
    sunroof,
    openings,
    openCount: openings.filter((item) => item.open).length,
    level: levelState
      ? {
          key: levelKey,
          entityId: entities[levelKey],
          value: num(levelState),
          unit: levelState.attributes?.unit_of_measurement || '%',
        }
      : null,
    range: rangeState
      ? {
          key: rangeKey,
          entityId: entities[rangeKey],
          value: num(rangeState),
          unit: rangeState.attributes?.unit_of_measurement || 'km',
          text: displayState(hass, rangeState),
        }
      : null,
    odometer: entities.mileage
      ? { entityId: entities.mileage, text: displayState(hass, get('mileage')) }
      : null,
    position: positionState
      ? {
          entityId: entities.position,
          address: positionState.attributes?.parking_address || null,
          zone: displayState(hass, positionState),
        }
      : null,
    lastUpdate: capturedDate
      ? { entityId: entities.car_captured, date: capturedDate, text: relativeTime(capturedDate, hass) }
      : null,
    climate: entities.climate
      ? (() => {
          const state = get('climate');
          if (isUnavailable(state) || state.state === 'invalid') return null;
          return {
            entityId: entities.climate,
            state: displayState(hass, state),
            current: state.attributes?.current_temperature ?? null,
            target: state.attributes?.temperature ?? null,
            unit: hass.config?.unit_system?.temperature || '°C',
          };
        })()
      : null,
    rows: {
      drive: rows(hass, entities, filter(DRIVE_ROWS), headline),
      trip: rows(hass, entities, filter(TRIP_ROWS)),
      service: rows(hass, entities, filter(SERVICE_ROWS)),
      charging: rows(hass, entities, filter(CHARGING_ROWS), headline),
      system: rows(hass, entities, filter(SYSTEM_ROWS)),
    },
    extra: (entities.extra || []).map((entityId) => ({
      entityId,
      name: hass.states[entityId]?.attributes?.friendly_name || entityId,
      value: displayState(hass, hass.states[entityId]),
    })),
  };
}
