/**
 * The room row, shared by the room card and the house card's room list.
 *
 * Both cards show the same room and must agree about it, so the markup and
 * the service calls live here once. The difference is only how much is on
 * screen: the house list is one tight line per room that opens into the full
 * row, the room card shows the full row straight away.
 */

import { TEMP_MAX, TEMP_MIN, TEMP_STEP } from './const.js';
import { fill } from './i18n.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatClock, formatDecimal } from '../shared/format.js';

const temp = (value, hass) => (value === null || value === undefined ? '–' : `${formatDecimal(value, hass, 1)} °C`);

/** The tags that say what is happening to the room right now. */
function tagsHtml(room, { t }) {
  const tags = [];
  if (room.paused) {
    tags.push(`<span class="tag warn">${icon('window_open')}${escapeHtml(t('ui.paused_window'))}</span>`);
  } else if (room.active) {
    tags.push(
      `<span class="tag${room.active.key === 'nincs' ? ' idle' : ''}">${icon(room.active.icon)}${escapeHtml(t(`active.${room.active.key}`))}</span>`,
    );
  }
  if (room.window?.warn) {
    const minutes = room.window.minutes === null ? '' : ` · ${room.window.minutes} ${t('ui.minute_short')}`;
    tags.push(
      `<span class="tag warn">${icon(room.window.icon)}${escapeHtml(t(`window.${room.window.state}`))}${escapeHtml(minutes)}</span>`,
    );
  }
  tags.push(learningHtml(room, { t }));
  return tags.filter(Boolean).join('');
}

/** How the room feels, in its own colour. */
export function comfortHtml(room, { t, hass }) {
  const comfort = room.comfort;
  if (!comfort || (!comfort.text && comfort.felt === null)) return '';
  const felt =
    comfort.felt === null
      ? ''
      : ` title="${escapeHtml(fill(t('ui.felt'), { value: formatDecimal(comfort.felt, hass, 1) }))}"`;
  const level = comfort.level ? ` comfort-${comfort.level}` : '';
  return `<span class="tag comfort${level}"${felt}>${icon('target')}${escapeHtml(comfort.text || '')}</span>`;
}

/** A measurement is running: the logic is learning how fast the room warms. */
export function learningHtml(room, { t }) {
  if (!room.learning) return '';
  const detail = fill(t('ui.learning_detail'), {
    source: t(`source.${room.learning.source}`, room.learning.source || ''),
    from: room.learning.from,
    target: room.learning.target,
  });
  return `<span class="tag idle" title="${escapeHtml(detail)}">${icon('timer')}${escapeHtml(t('ui.learning'))}</span>`;
}

/** The learned heat-up rates, one line in the detail view. */
export function learnedHtml(room, { t, hass }) {
  const parts = Object.entries(room.learned || {})
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([source, value]) =>
      fill(t('ui.learned_rate'), {
        source: t(`source.${source}`, source),
        value: formatDecimal(value, hass, 2),
      }),
    );
  if (!parts.length) return '';
  return `<div class="note">${escapeHtml(t('ui.learned_title'))}: ${escapeHtml(parts.join(' · '))}</div>`;
}

/** Why the logic would heat this room the way it does. */
export function suggestionHtml(room, { t, withReason = true }) {
  if (!room.suggestion) return '';
  const label = t(`suggestion.${room.suggestion.key}`, room.suggestion.key);
  const reason =
    withReason && room.suggestion.reason
      ? `<div class="note">${escapeHtml(room.suggestion.reason)}</div>`
      : '';
  return `
    <div class="suggest accent-${room.suggestion.accent}">
      <span class="tag">${icon(room.suggestion.icon)}${escapeHtml(label)}</span>
    </div>${reason}`;
}

function partsHtml(room, { t, hass }) {
  if (!room.parts.length) return '';
  return `<div class="parts">${room.parts
    .map((part) => {
      const classes = [];
      if (part.key === room.leading) classes.push('lead');
      if (part.excluded) classes.push('out');
      const suffix = part.excluded
        ? ` (${t('ui.kitchen_excluded')})`
        : part.key === room.leading
          ? ` (${t('ui.leading')})`
          : '';
      return `<span class="${classes.join(' ')}">${escapeHtml(part.name)} <b>${escapeHtml(temp(part.value, hass))}</b>${escapeHtml(suffix)}</span>`;
    })
    .join('')}</div>`;
}

function notesHtml(room, { t, hass, season }) {
  const notes = [];
  if (room.overshoot) notes.push(t('ui.overshoot'));
  if (room.override.until) {
    notes.push(fill(t('ui.override_until'), { when: formatClock(room.override.until, hass) }));
  }
  if (room.preheat) {
    const cooling = room.preheatDirection === 'hutes' || season === 'hutes';
    notes.push(
      fill(cooling ? t('ui.precool') : t('ui.preheat'), { when: formatClock(room.preheat, hass) }),
    );
  }
  return notes.length ? `<div class="note">${escapeHtml(notes.join(' · '))}</div>` : '';
}

export function stepButtonsHtml(room, { t }) {
  const disabled = room.climate || room.override.entity ? '' : 'disabled';
  return `
    <button class="step-btn" type="button" data-action="step" data-room="${escapeHtml(room.key)}" data-dir="-1"
      aria-label="${escapeHtml(t('ui.target'))} −" ${disabled}>−</button>
    <button class="step-btn" type="button" data-action="step" data-room="${escapeHtml(room.key)}" data-dir="1"
      aria-label="${escapeHtml(t('ui.target'))} +" ${disabled}>+</button>`;
}

/**
 * The room thermostat's mode.
 *
 * This writes a template `climate` entity the heating logic publishes for
 * the card - not the Daikin or Netatmo hardware behind it, which stays the
 * logic's to drive.
 */
export function modeButtonsHtml(room, { t }) {
  const modes = room.climate?.modes || [];
  if (!modes.length) return '';
  return `
    <div class="seg small">
      ${modes
        .map(
          (mode) =>
            `<button type="button" data-action="hvac" data-room="${escapeHtml(room.key)}" data-value="${escapeHtml(mode)}"
              aria-pressed="${mode === room.climate.mode}">${escapeHtml(t(`hvac.${mode}`, mode))}</button>`,
        )
        .join('')}
    </div>`;
}

export function controlsHtml(room, options) {
  const { t, showBoost = true } = options;
  const select = (role, values, current, title) =>
    values.length
      ? `<select data-action="${role}" data-room="${escapeHtml(room.key)}" title="${escapeHtml(title)}">
          ${values
            .map(
              (value) =>
                `<option value="${escapeHtml(value)}" ${value === current ? 'selected' : ''}>${escapeHtml(t(`${role === 'source' ? 'source' : 'aggregation'}.${value}`, value))}</option>`,
            )
            .join('')}
        </select>`
      : '';

  const boost = showBoost
    ? `<button class="chip" type="button" data-action="boost" data-room="${escapeHtml(room.key)}">
        ${icon('boost')}<span>${escapeHtml(t('ui.boost'))}</span></button>`
    : '';

  /* with a thermostat the mode comes from it; the source select is only for
     installations that have no room thermostat */
  const mode = room.climate
    ? modeButtonsHtml(room, options)
    : select('source', room.source.options, room.source.value, t('ui.source_title'));

  return `
    <div class="controls">
      ${stepButtonsHtml(room, options)}
      ${mode}
      ${room.parts.length ? select('aggregation', room.aggregation.options, room.aggregation.value, t('ui.aggregation_title')) : ''}
      ${boost}
    </div>`;
}

/** A measured-only place: no target, no source, just the number. */
function readonlyRowHtml(room, { t, hass }) {
  const frost = room.frost
    ? `<span class="tag bad">${icon('frost')}${escapeHtml(t('ui.frost_risk'))}</span>`
    : '';
  return `
    <div class="room readonly" data-room="${escapeHtml(room.key)}">
      <div class="line">
        <div class="name">${escapeHtml(room.name)}</div>
        <div class="spacer"></div>
        ${frost}
        <div><div class="temp">${escapeHtml(temp(room.temperature, hass))}</div></div>
      </div>
      <div class="note">${escapeHtml(t('ui.readonly'))}</div>
    </div>`;
}

/** The full row: everything the room card shows. */
export function roomRowHtml(room, options) {
  const { t, hass, showControls = true, showParts = true } = options;
  if (room.readonly) return readonlyRowHtml(room, options);

  const goal =
    room.target === null
      ? ''
      : `<div class="goal">${escapeHtml(t('ui.target'))} ${escapeHtml(temp(room.target, hass))}</div>`;

  return `
    <div class="room" data-room="${escapeHtml(room.key)}">
      <div class="line">
        <div class="name">${escapeHtml(room.name)}</div>
        <div class="spacer"></div>
        ${comfortHtml(room, options)}
        ${tagsHtml(room, options)}
        <div>
          <div class="temp">${escapeHtml(temp(room.temperature, hass))}</div>
          ${goal}
        </div>
      </div>
      ${suggestionHtml(room, options)}
      ${showParts ? partsHtml(room, options) : ''}
      ${notesHtml(room, options)}
      ${learnedHtml(room, options)}
      ${showControls ? controlsHtml(room, options) : ''}
    </div>`;
}

/**
 * One tight line for the house card's list: the numbers, the setpoint
 * buttons and two icons that say what is heating the room and whether a
 * window is open. Tapping the line opens the full row underneath.
 */
export function compactRowHtml(room, options) {
  const { t, hass, expanded } = options;
  if (room.readonly) {
    const frost = room.frost ? `<span class="tag bad">${icon('frost')}</span>` : '';
    return `
      <div class="room readonly" data-room="${escapeHtml(room.key)}">
        <div class="line">
          <div class="name">${escapeHtml(room.name)}</div>
          <div class="spacer"></div>
          ${frost}
          <div class="temp">${escapeHtml(temp(room.temperature, hass))}</div>
        </div>
      </div>`;
  }

  const marks = [];
  if (room.suggestion) {
    marks.push(
      `<span class="mark accent-${room.suggestion.accent}" title="${escapeHtml(t(`suggestion.${room.suggestion.key}`, room.suggestion.key))}">${icon(room.suggestion.icon)}</span>`,
    );
  }
  if (room.window?.warn) {
    marks.push(
      `<span class="mark warn" title="${escapeHtml(t(`window.${room.window.state}`))}">${icon(room.window.icon)}</span>`,
    );
  }
  if (room.learning) {
    marks.push(`<span class="mark" title="${escapeHtml(t('ui.learning'))}">${icon('timer')}</span>`);
  }
  if (room.comfort?.level) {
    marks.push(
      `<span class="mark comfort-${room.comfort.level}" title="${escapeHtml(room.comfort.text || '')}">${icon('target')}</span>`,
    );
  }

  return `
    <div class="room compact${expanded ? ' open' : ''}" data-room="${escapeHtml(room.key)}">
      <div class="line" data-action="toggle-room" data-room="${escapeHtml(room.key)}">
        <div class="name">${escapeHtml(room.name)}</div>
        <div class="spacer"></div>
        <div class="marks">${marks.join('')}</div>
        <div class="nums">
          <span class="temp">${escapeHtml(temp(room.temperature, hass))}</span>
          <span class="goal">${escapeHtml(room.target === null ? '' : temp(room.target, hass))}</span>
        </div>
        <span class="quick">${stepButtonsHtml(room, options)}</span>
        ${icon(expanded ? 'chevron_up' : 'chevron')}
      </div>
      ${expanded ? `${suggestionHtml(room, options)}${partsHtml(room, options)}${notesHtml(room, options)}${learnedHtml(room, options)}${controlsHtml(room, options)}` : ''}
    </div>`;
}

/**
 * The service calls a room row can make.
 *
 * Every one of them writes a helper. The step deliberately writes only the
 * override value: when it ends is the logic's business, because the logic is
 * the side that knows when the next zone change falls.
 */
export function applyRoomAction({ hass, config, room, action, target }) {
  const call = (domain, service, data) => hass?.callService?.(domain, service, data);

  if (action === 'step') {
    const direction = Number(target.dataset.dir);

    /* a room thermostat owns its own setpoint; the override helper is only
       for installations that have no thermostat entity */
    if (room.climate) {
      const base = room.target ?? room.temperature;
      if (base === null || base === undefined) return false;
      const step = room.climate.step || TEMP_STEP;
      const next = Math.min(
        room.climate.max ?? TEMP_MAX,
        Math.max(room.climate.min ?? TEMP_MIN, base + direction * step),
      );
      if (next === base) return false;
      call('climate', 'set_temperature', { entity_id: room.climate.entity, temperature: next });
      return true;
    }

    const base = room.override.value ?? room.target ?? room.temperature;
    if (base === null || base === undefined || !room.override.entity) return false;
    const next = Math.min(TEMP_MAX, Math.max(TEMP_MIN, base + direction * TEMP_STEP));
    if (next === base) return false;
    call('input_number', 'set_value', { entity_id: room.override.entity, value: next });
    return true;
  }

  if (action === 'hvac') {
    if (!room.climate) return false;
    call('climate', 'set_hvac_mode', {
      entity_id: room.climate.entity,
      hvac_mode: target.dataset.value,
    });
    return true;
  }

  if (action === 'source') {
    call('input_select', 'select_option', { entity_id: room.source.entity, option: target.value });
    return true;
  }

  if (action === 'aggregation') {
    call('input_select', 'select_option', {
      entity_id: room.aggregation.entity,
      option: target.value,
    });
    return true;
  }

  if (action === 'boost') {
    const script = config?.boost_script || 'script.futes_boost';
    const [, objectId] = script.split('.');
    if (!objectId) return false;
    call('script', objectId, { szoba: room.key });
    return true;
  }

  return false;
}
