/**
 * Turns the helper entities into the three models the cards draw.
 *
 * Everything here is read-only: the cards never compute a setpoint or decide
 * a source, they only arrange what Home Assistant already decided. The one
 * exception is arithmetic the card needs for drawing - bar ratios, how long
 * the budget lasts at the current pace - which is derived, never stored.
 */

import {
  COOLING_FROM,
  COOLING_TO,
  ROOM_ACTIVE,
  ROOM_SUGGESTION,
  SOURCES,
  WEEKDAYS,
  WINDOW_STATES,
  ZONE_KEYS,
} from './const.js';
import {
  houseEntities,
  isOn,
  isUnavailable,
  listRooms,
  minutesSince,
  num,
  optionsOf,
  stateObj,
  stateOf,
  timeOf,
  zoneTempEntity,
} from './entities.js';

/** MJ per m³ of natural gas, the value the Hungarian bill settles on. */
export const DEFAULT_HEATING_VALUE = 34.92;

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/* ------------------------------- house ------------------------------- */

export function buildHouseModel(hass, config) {
  const ids = houseEntities(config);
  const heatingValue = Number(config?.heating_value) || DEFAULT_HEATING_VALUE;

  const used = num(hass, ids.used);
  const budget = num(hass, ids.budget);
  const left = num(hass, ids.left);
  const allowed = num(hass, ids.allowed);
  const reserve = num(hass, ids.reserve);
  const daysLeft = num(hass, ids.days_left);

  const configured = used !== null || budget !== null;

  /* The bar is drawn in three pieces: what is used, where the pace marker
     sits, and the reserve kept back at the far end. Without a budget there
     is nothing to divide by, so the ratios stay null and the card says so. */
  const ratios =
    budget && budget > 0
      ? {
          used: clamp01((used || 0) / budget),
          allowed: allowed === null ? null : clamp01(allowed / budget),
          reserve: reserve === null ? 0 : clamp01(reserve / budget),
        }
      : null;

  /* green while the house is inside the pace, amber once it is ahead of it
     but still inside the budget, red once it would eat into the reserve */
  let level = 'ok';
  if (used !== null && allowed !== null && used > allowed) level = 'warn';
  if (used !== null && budget !== null && reserve !== null && used > budget - reserve) {
    level = 'bad';
  }

  const pace = num(hass, ids.pace);
  /* the daily pace needs two readings inside its window; until then the
     sensor is unavailable, which is a different thing from "zero" */
  const paceUnknown = pace === null && isUnavailable(stateOf(hass, ids.pace));
  const heatingDaily = num(hass, ids.heating_daily);
  const hotWater = num(hass, ids.hot_water_daily);
  const spendable = left === null ? null : left - (reserve || 0);
  const lastsDays = pace && pace > 0 && spendable !== null ? Math.floor(spendable / pace) : null;

  const balance = num(hass, ids.balance);

  const sourceKey = stateOf(hass, ids.source);
  const source = SOURCES[sourceKey] || null;

  const manualTime = timeOf(hass, ids.manual_time);

  return {
    ok: configured,
    reason: configured ? null : 'not_configured',
    entities: ids,
    gas: {
      used,
      budget,
      left,
      allowed,
      reserve,
      daysLeft,
      ratios,
      level,
      usedMj: used === null ? null : Math.round(used * heatingValue),
      /* the bill states the budget in MJ and the m³ figure is derived from
         it, so a configured MJ value is the authority - deriving it back
         from rounded m³ would show a number the bill never mentions */
      budgetMj:
        Number(config?.budget_mj) ||
        (budget === null ? null : Math.round(budget * heatingValue)),
    },
    pace: { actual: pace, unknown: paceUnknown, heatingDaily, hotWater, lastsDays },
    forecast: { gasOnly: num(hass, ids.forecast), balance },
    source: {
      key: isUnavailable(sourceKey) ? null : sourceKey,
      icon: source?.icon || 'info',
      accent: source?.accent || 'idle',
      reason: stateOf(hass, ids.reason),
      cooling: sourceKey === 'hutes',
    },
    season: {
      choice: stateOf(hass, ids.season_select) || null,
      active: stateOf(hass, ids.season_active) || null,
      options: optionsOf(hass, ids.season_select),
      /* the three-day outdoor average is what decides cooling in `auto`, so
         it belongs next to the season switch rather than in a tooltip */
      outdoor3: num(hass, ids.outdoor_3day),
      outside: num(hass, ids.outside),
    },
    mode: {
      key: stateOf(hass, ids.mode) || null,
      options: optionsOf(hass, ids.mode),
    },
    meter: {
      value: num(hass, ids.meter),
      manual: num(hass, ids.manual),
      lastRead: manualTime,
      stale: isOn(hass, ids.stale),
    },
    flags: {
      boiler: stateObj(hass, ids.boiler) ? isOn(hass, ids.boiler) : null,
      ervLock: stateObj(hass, ids.erv_lock) ? isOn(hass, ids.erv_lock) : null,
    },
  };
}

/**
 * True while a manual `hutes` would go against the season.
 *
 * The logic itself only cools between 1 May and 30 September, so a manual
 * choice outside that window is the one case the card asks about twice.
 */
export function outsideCoolingSeason(now = new Date()) {
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const after = month > COOLING_FROM.month || (month === COOLING_FROM.month && day >= COOLING_FROM.day);
  const before = month < COOLING_TO.month || (month === COOLING_TO.month && day <= COOLING_TO.day);
  return !(after && before);
}

/* ------------------------------- rooms ------------------------------- */

export function buildRoomsModel(hass, config) {
  const rooms = listRooms(config).map((room) => {
    const ids = room.entities;
    const windowState = stateOf(hass, ids.window);
    const windowMeta = WINDOW_STATES[windowState] || null;
    const windowSince = stateObj(hass, ids.window)?.last_changed
      ? new Date(stateObj(hass, ids.window).last_changed)
      : null;
    const activeKey = stateOf(hass, ids.active);
    const active = ROOM_ACTIVE[activeKey] || null;
    const suggestionKey = stateOf(hass, ids.suggestion);
    const suggestion = ROOM_SUGGESTION[suggestionKey] || null;

    const parts = room.parts.map((part) => ({
      key: part.key,
      name: part.name,
      value: num(hass, part.entity),
      excluded: isOn(hass, part.excluded),
    }));

    return {
      key: room.key,
      name: room.name,
      readonly: room.readonly,
      temperature: num(hass, ids.temperature),
      target: room.readonly ? null : num(hass, ids.target),
      active: active ? { key: activeKey, ...active } : null,
      suggestion: suggestion
        ? {
            key: suggestionKey,
            ...suggestion,
            reason: stateOf(hass, ids.suggestion_reason),
          }
        : null,
      window: windowMeta
        ? {
            state: windowState,
            icon: windowMeta.icon,
            warn: windowMeta.warn,
            minutes: minutesSince(windowSince),
          }
        : null,
      paused: isOn(hass, ids.paused),
      override: {
        value: num(hass, ids.override),
        until: timeOf(hass, ids.override_until),
        entity: ids.override,
      },
      source: {
        value: stateOf(hass, ids.source),
        options: optionsOf(hass, ids.source),
        entity: ids.source,
      },
      preheat: timeOf(hass, ids.preheat),
      preheatDirection: stateObj(hass, ids.preheat)?.attributes?.irany || null,
      frost: isOn(hass, ids.frost),
      parts,
      leading: stateOf(hass, ids.leading) || null,
      aggregation: {
        value: stateOf(hass, ids.aggregation),
        options: optionsOf(hass, ids.aggregation),
        entity: ids.aggregation,
      },
      overshoot: isOn(hass, ids.overshoot),
      unavailable: isUnavailable(stateOf(hass, ids.temperature)),
      entities: ids,
    };
  });

  return { ok: rooms.length > 0, reason: rooms.length ? null : 'no_rooms', rooms };
}

/** The rooms whose window has been open long enough to be worth a warning. */
export function openWindows(rooms, minimumMinutes) {
  return rooms.filter(
    (room) => room.window?.warn && (room.window.minutes ?? 0) >= minimumMinutes,
  );
}

/* ----------------------------- schedule ------------------------------ */

const pad = (value) => String(value).padStart(2, '0');

/** `"06:45:00"` or `"06:45:00 - 21:30:00"` -> minutes from midnight. */
function startMinutes(slot) {
  const [hours, minutes] = String(slot).split('-')[0].trim().split(':');
  return Number(hours) * 60 + Number(minutes);
}

export function minutesToClock(minutes) {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

/**
 * Reads the Scheduler entities that drive the zone selector.
 *
 * Verified against scheduler-component 3.3.9: a `switch.schedule_*` entity
 * carries `weekdays`, `timeslots` (strings, `"HH:MM:SS"` or `"from - to"`),
 * `entities` (what the actions target) and `actions` (one `{service,
 * service_data}` per timeslot, with the target stripped out). So the zone of
 * a segment is `actions[i].service_data.option`, and a schedule belongs to
 * this card only when its `entities` include the zone selector.
 */
export function buildScheduleModel(hass, config) {
  const ids = houseEntities(config);
  const zoneSelect = config?.zone_select || ids.zone_select;

  const schedules = Object.values(hass?.states || {})
    .filter((obj) => obj.entity_id.startsWith('switch.schedule_'))
    .filter((obj) => (obj.attributes?.entities || []).includes(zoneSelect))
    .map((obj) => {
      const slots = obj.attributes?.timeslots || [];
      const actions = obj.attributes?.actions || [];
      return {
        entity_id: obj.entity_id,
        name: obj.attributes?.friendly_name || obj.entity_id,
        enabled: obj.state !== 'off',
        weekdays: obj.attributes?.weekdays || ['daily'],
        currentSlot: obj.attributes?.current_slot ?? null,
        slots: slots.map((slot, index) => ({
          index,
          minutes: startMinutes(slot),
          zone: actions[index]?.service_data?.option || null,
        })),
      };
    });

  const days = {};
  for (const day of WEEKDAYS) {
    const forDay = schedules.filter(
      (schedule) =>
        schedule.weekdays.includes('daily') ||
        schedule.weekdays.includes(day) ||
        (schedule.weekdays.includes('workday') && !['sat', 'sun'].includes(day)) ||
        (schedule.weekdays.includes('weekend') && ['sat', 'sun'].includes(day)),
    );

    const segments = forDay
      .flatMap((schedule) =>
        schedule.slots
          .filter((slot) => slot.zone)
          .map((slot) => ({ ...slot, entity_id: schedule.entity_id })),
      )
      .sort((a, b) => a.minutes - b.minutes)
      .map((segment, index, all) => ({
        ...segment,
        start: segment.minutes,
        end: index + 1 < all.length ? all[index + 1].minutes : 1440,
      }))
      .filter((segment) => segment.end > segment.start);

    days[day] = segments;
  }

  const zoneNow = stateOf(hass, zoneSelect) || null;
  const next = nextChange(days, new Date());

  return {
    ok: schedules.length > 0,
    reason: schedules.length ? null : 'no_schedule',
    zoneSelect,
    schedules,
    days,
    zoneNow,
    next,
  };
}

/** The first segment that starts after now, looking into tomorrow if needed. */
export function nextChange(days, now) {
  const todayIndex = (now.getDay() + 6) % 7; // Monday first
  const minutes = now.getHours() * 60 + now.getMinutes();
  for (let offset = 0; offset < 8; offset += 1) {
    const day = WEEKDAYS[(todayIndex + offset) % 7];
    const segments = days[day] || [];
    for (const segment of segments) {
      if (offset > 0 || segment.start > minutes) {
        return { day, offset, start: segment.start, zone: segment.zone };
      }
    }
  }
  return null;
}

/** The zone setpoints of one season, as `{ zone: { room: value } }`. */
export function buildZoneTable(hass, config, season, rooms) {
  const table = {};
  for (const zone of config?.zones || ZONE_KEYS) {
    table[zone] = {};
    for (const room of rooms) {
      const entity = zoneTempEntity(config, season, zone, room.key);
      table[zone][room.key] = { entity, value: num(hass, entity) };
    }
  }
  return table;
}
