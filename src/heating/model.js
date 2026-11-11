/**
 * Turns the helper entities into the three models the cards draw.
 *
 * Everything here is read-only: the cards never compute a setpoint or decide
 * a source, they only arrange what Home Assistant already decided. The one
 * exception is arithmetic the card needs for drawing - bar ratios, how long
 * the budget lasts at the current pace - which is derived, never stored.
 */

import {
  COMFORT_LEVELS,
  COOLING_FROM,
  COOLING_TO,
  LEARNED_SOURCES,
  PREDICT_BANDS,
  PREDICT_HOURS,
  ROOM_ACTIVE,
  ROOM_SUGGESTION,
  SCHEDULE_ZONES,
  SOURCES,
  TEMP_MAX,
  TEMP_MIN,
  TEMP_STEP,
  TREND_CLAMP,
  WEEKDAYS,
  WINDOW_STATES,
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

/**
 * Where the room is heading, and what the control will do about it.
 *
 * The heating logic does not act on the measured temperature but on a
 * half-hour forecast, so a room can be below its target and still be left
 * alone - it is already climbing fast enough. Showing the forecast is what
 * makes that look deliberate rather than broken.
 */
export function trendOf(rate, measured, target, bands) {
  if (rate === null || rate === undefined || measured === null || measured === undefined) {
    return null;
  }
  const clamped = Math.min(TREND_CLAMP, Math.max(-TREND_CLAMP, rate));
  const predicted = measured + clamped * PREDICT_HOURS;

  let verdict = null;
  if (target !== null && target !== undefined) {
    if (predicted < target + bands.start) verdict = 'start';
    else if (predicted > target + bands.stop) verdict = 'stop';
    else if (bands.hardStop !== null && measured >= target + bands.hardStop) verdict = 'stop';
  }

  return {
    rate,
    clamped,
    clipped: clamped !== rate,
    predicted,
    minutes: Math.round(PREDICT_HOURS * 60),
    direction: rate > 0.05 ? 'up' : rate < -0.05 ? 'down' : 'flat',
    verdict,
  };
}

/** `1793577484|18.2|klima|20.5|fel` -> what the card can show about it. */
export function parseLearning(raw) {
  const [started, from, source, target, direction] = String(raw).split('|');
  const startedAt = Number(started);
  return {
    raw,
    startedAt: Number.isFinite(startedAt) ? new Date(startedAt * 1000) : null,
    from: Number(from),
    source: source || null,
    target: Number(target),
    up: direction !== 'le',
  };
}

/**
 * How the room feels: a degree figure and a word.
 *
 * The word can carry a humidity note after a separator (`Meleg · párás`), so
 * the first part decides the colour and the whole string is shown as written.
 */
export function comfortOf(hass, config, key) {
  if (!key) return null;
  const feltId = `${config?.felt_prefix || 'sensor.hoerzet'}_${key}`;
  const wordId = `${config?.comfort_prefix || 'sensor.komfort'}_${key}`;
  const felt = num(hass, feltId);
  const word = stateOf(hass, wordId);
  if (felt === null && (!word || isUnavailable(word))) return null;
  const head = String(word || '').split('·')[0].trim().toLowerCase();
  return {
    felt,
    text: isUnavailable(word) ? null : word,
    level: COMFORT_LEVELS[head] || null,
  };
}

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
      automation: stateObj(hass, ids.automation) ? isOn(hass, ids.automation) : null,
      automationEntity: ids.automation,
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
      comfort: comfortOf(hass, config, part.comfortKey),
    }));

    /**
     * The room thermostat.
     *
     * These are template `climate` entities the heating logic publishes for
     * exactly this purpose - they are not the Daikin or Netatmo hardware,
     * which the card still never touches. When a room has one it is the
     * control, and the helpers behind it are only read.
     */
    const climate = ids.climate ? stateObj(hass, ids.climate) : null;
    const climateTarget = climate?.attributes?.temperature;
    const climateTemp = climate?.attributes?.current_temperature;

    const target = room.readonly
      ? null
      : climateTarget !== undefined && climateTarget !== null
        ? Number(climateTarget)
        : (num(hass, ids.target_number) ?? num(hass, ids.target));

    const temperature = num(hass, ids.temperature) ?? (climateTemp ?? null);

    /* "tanul…": the learning helper holds `unix|start°C|source|target|up`
       while a measurement is running, and is empty the rest of the time */
    const learningRaw = stateOf(hass, ids.learning);
    const learning =
      learningRaw && !isUnavailable(learningRaw) && learningRaw.trim() !== ''
        ? parseLearning(learningRaw)
        : null;

    const learned = {};
    for (const source of LEARNED_SOURCES) {
      learned[source] = num(hass, room.learnedIds?.[source]);
    }

    return {
      key: room.key,
      name: room.name,
      readonly: room.readonly,
      temperature,
      target,
      climate: climate
        ? {
            entity: ids.climate,
            mode: climate.state,
            modes: climate.attributes?.hvac_modes || [],
            step: climate.attributes?.target_temp_step || TEMP_STEP,
            min: climate.attributes?.min_temp ?? TEMP_MIN,
            max: climate.attributes?.max_temp ?? TEMP_MAX,
            action: climate.attributes?.hvac_action || null,
          }
        : null,
      mode: {
        value: stateOf(hass, ids.mode),
        options: optionsOf(hass, ids.mode),
        entity: ids.mode,
      },
      learning,
      learned,
      /* the infrared panel reacts faster than a radiator, so a room it heats
         is judged by tighter bands - the logic does the same */
      trend: trendOf(
        num(hass, ids.trend),
        temperature,
        target,
        learned.aeno !== null ? PREDICT_BANDS.aeno : PREDICT_BANDS.default,
      ),
      boost: room.boost,
      /* a room can follow its own weekly plan; the entity's state and
         next_event are enough for the row - the weekly blocks are only
         needed by the schedule card, which fetches them separately */
      schedule: roomSchedule(hass, config, room.scheduleEntity),
      comfort: comfortOf(hass, config, room.comfortKey),
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

/** Which band a room is in right now, per its own schedule helper. */
export function roomSchedule(hass, config, entityId) {
  const ids = houseEntities(config);
  const entity = entityId || config?.schedule_entity || ids.schedule;
  const obj = stateObj(hass, entity);
  if (!obj) return null;
  const zoneOn = config?.zone_on || SCHEDULE_ZONES[0];
  const zoneOff = config?.zone_off || SCHEDULE_ZONES[1];
  const next = obj.attributes?.next_event ? new Date(obj.attributes.next_event) : null;
  return {
    entity,
    own: Boolean(entityId),
    zone: obj.state === 'on' ? zoneOn : zoneOff,
    nextEvent: next && Number.isFinite(next.getTime()) ? next : null,
  };
}

/** The rooms whose window has been open long enough to be worth a warning. */
export function openWindows(rooms, minimumMinutes) {
  return rooms.filter(
    (room) => room.window?.warn && (room.window.minutes ?? 0) >= minimumMinutes,
  );
}

/* ----------------------------- schedule ------------------------------ */

const pad = (value) => String(value).padStart(2, '0');

export function minutesToClock(minutes) {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

/** Monday-first weekday keys as the Home Assistant schedule helper spells them. */
export const DAY_KEYS = {
  mon: 'monday',
  tue: 'tuesday',
  wed: 'wednesday',
  thu: 'thursday',
  fri: 'friday',
  sat: 'saturday',
  sun: 'sunday',
};

/** `"21:30:00"` -> 1290; `"24:00:00"` -> 1440. */
export function clockToMinutes(value) {
  const [hours, minutes] = String(value).split(':');
  const total = Number(hours) * 60 + Number(minutes || 0);
  return Number.isFinite(total) ? total : null;
}

/**
 * Turns a day's comfort bands into a full 24 hour strip.
 *
 * The schedule helper stores only the "on" ranges, so everything between
 * them is the night band. Drawing the gaps as well is what makes the strip
 * readable: a day is never partly undefined.
 */
export function segmentsForDay(ranges, zoneOn, zoneOff) {
  const bands = (ranges || [])
    .map((range) => ({
      start: clockToMinutes(range.from),
      end: clockToMinutes(range.to),
    }))
    .filter((band) => band.start !== null && band.end !== null && band.end > band.start)
    .sort((a, b) => a.start - b.start);

  const segments = [];
  let cursor = 0;
  bands.forEach((band, index) => {
    if (band.start > cursor) {
      segments.push({ start: cursor, end: band.start, zone: zoneOff, index: null });
    }
    segments.push({ start: band.start, end: band.end, zone: zoneOn, index });
    cursor = band.end;
  });
  if (cursor < 1440) segments.push({ start: cursor, end: 1440, zone: zoneOff, index: null });
  return segments;
}

/**
 * The weekly plan, read from a built-in Home Assistant schedule helper.
 *
 * The entity itself only says on or off right now and when the next change
 * falls (`next_event`); the weekly blocks live in the helper's storage
 * collection, which the card fetches over the websocket (`schedule/list`)
 * and writes back with `schedule/update`. Verified against the schedule
 * integration: a day is a list of `{from, to}` ranges, sorted, without
 * overlap, and `24:00:00` is allowed as an end.
 */
export function buildScheduleModel(hass, config, blocks, entityOverride) {
  const ids = houseEntities(config);
  const entityId = entityOverride || config?.schedule_entity || ids.schedule;
  const obj = stateObj(hass, entityId);

  const zoneOn = config?.zone_on || SCHEDULE_ZONES[0];
  const zoneOff = config?.zone_off || SCHEDULE_ZONES[1];

  const days = {};
  for (const day of WEEKDAYS) {
    days[day] = segmentsForDay(blocks?.[DAY_KEYS[day]], zoneOn, zoneOff);
  }

  const nextEventRaw = obj?.attributes?.next_event;
  const nextEvent = nextEventRaw ? new Date(nextEventRaw) : null;

  return {
    ok: Boolean(obj) && Boolean(blocks),
    reason: obj ? (blocks ? null : 'loading') : 'no_schedule',
    entityId,
    zoneOn,
    zoneOff,
    zones: config?.zones || SCHEDULE_ZONES,
    /* on means the comfort band is running right now */
    zoneNow: obj ? (obj.state === 'on' ? zoneOn : zoneOff) : null,
    nextEvent: nextEvent && Number.isFinite(nextEvent.getTime()) ? nextEvent : null,
    days,
    blocks: blocks || null,
  };
}

/** The first band boundary after now, looking into tomorrow if needed. */
export function nextChange(days, now) {
  const todayIndex = (now.getDay() + 6) % 7; // Monday first
  const minutes = now.getHours() * 60 + now.getMinutes();
  for (let offset = 0; offset < 8; offset += 1) {
    const day = WEEKDAYS[(todayIndex + offset) % 7];
    for (const segment of days[day] || []) {
      if (segment.start === 0 && offset === 0) continue;
      if (offset > 0 || segment.start > minutes) {
        return { day, offset, start: segment.start, zone: segment.zone };
      }
    }
  }
  return null;
}

/**
 * The weekly plans in play, with the rooms that follow each.
 *
 * Most houses have one; here the bathroom warms up for a shower on its own
 * plan, so the card has to edit two and keep them apart.
 */
export function scheduleGroups(config) {
  const ids = houseEntities(config);
  const fallback = config?.schedule_entity || ids.schedule;
  const groups = new Map();

  for (const room of listRooms(config)) {
    if (room.readonly) continue;
    const entity = room.scheduleEntity || fallback;
    if (!groups.has(entity)) {
      groups.set(entity, { entity, id: room.scheduleId || null, rooms: [] });
    }
    const group = groups.get(entity);
    group.rooms.push(room);
    if (room.scheduleId) group.id = room.scheduleId;
  }

  if (!groups.size) groups.set(fallback, { entity: fallback, id: null, rooms: [] });

  /* the plan most rooms follow comes first, so the card opens on the house
     rather than on whichever room happens to be first in the config */
  return [...groups.values()]
    .sort((a, b) => b.rooms.length - a.rooms.length)
    .map((group) => ({
      ...group,
    /* a group of one or two reads better by name than as "the rooms" */
      label: group.rooms.length && group.rooms.length <= 2
        ? group.rooms.map((room) => room.name).join(', ')
        : null,
    }));
}

/** The zone setpoints of one season, as `{ zone: { room: value } }`. */
export function buildZoneTable(hass, config, season, rooms) {
  const table = {};
  for (const zone of config?.zones || SCHEDULE_ZONES) {
    table[zone] = {};
    for (const room of rooms) {
      const entity = zoneTempEntity(config, season, zone, room.key);
      table[zone][room.key] = { entity, value: num(hass, entity) };
    }
  }
  return table;
}
