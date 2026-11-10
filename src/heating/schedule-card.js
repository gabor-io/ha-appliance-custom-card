import {
  CARD_VERSION,
  SCHEDULE_CARD_NAME,
  SCHEDULE_EDITOR_NAME,
  TEMP_MAX,
  TEMP_MIN,
  TEMP_STEP,
  WEEKDAYS,
  ZONES,
  ZONE_KEYS,
} from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import {
  buildHouseModel,
  buildScheduleModel,
  buildZoneTable,
  minutesToClock,
} from './model.js';
import { listRooms } from './entities.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatDecimal } from '../shared/format.js';

export const SCHEDULE_DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_timeline: true,
  show_zones: true,
};

const ZONE_BY_KEY = Object.fromEntries(ZONES.map((zone) => [zone.key, zone]));

/** `"05:45"` -> 345 */
function clockToMinutes(value) {
  const [hours, minutes] = String(value).split(':');
  const total = Number(hours) * 60 + Number(minutes);
  return Number.isFinite(total) ? total : null;
}

/**
 * The weekly schedule, drawn the way the Netatmo app draws it.
 *
 * Every zone change is one Scheduler entry that writes the zone selector, so
 * the card reads the day's segments out of the `switch.schedule_*` attributes
 * and writes them back with `scheduler.add` / `scheduler.edit`. The setpoints
 * themselves live in `input_number` helpers, one per zone and room, in two
 * sets: one for heating and one for cooling.
 */
export class HeatingScheduleCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(SCHEDULE_EDITOR_NAME);
  }

  static getStubConfig() {
    return { type: `custom:${SCHEDULE_CARD_NAME}`, rooms: [] };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
    this._day = WEEKDAYS[(new Date().getDay() + 6) % 7];
    this._tab = null; // null = follow the active season
    this._copyOpen = false;
  }

  setConfig(config) {
    this._config = { ...SCHEDULE_DEFAULTS, ...(config || {}) };
    this._signatures = {};
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  get hass() {
    return this._hass;
  }

  getCardSize() {
    return 9;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 8, rows: 'auto' };
  }

  _build() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    const card = document.createElement('ha-card');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.addEventListener('click', (ev) => this._onClick(ev));
    wrap.addEventListener('change', (ev) => this._onChange(ev));

    for (const name of ['header', 'tabs', 'days', 'timeline', 'slots', 'copy', 'zones']) {
      const node = document.createElement('div');
      node.dataset.section = name;
      this._sections[name] = node;
      wrap.appendChild(node);
    }
    card.appendChild(wrap);
    this.shadowRoot.replaceChildren(style, card);
    this._wrap = wrap;
    this._built = true;
  }

  get _season() {
    if (this._tab) return this._tab;
    return this._houseSeason === 'hutes' ? 'hutes' : 'futes';
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._built) this._build();

    const t = translator(getLanguage(this._config, this._hass));
    const house = buildHouseModel(this._hass, this._config);
    this._houseSeason = house.season.active;

    const model = buildScheduleModel(this._hass, this._config);
    const rooms = listRooms(this._config).filter((room) => !room.readonly);
    this._model = model;
    this._rooms = rooms;

    const classes = ['wrap', `accent-${this._season === 'hutes' ? 'cool' : 'gas'}`];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    const className = classes.join(' ');
    if (this._wrap.className !== className) this._wrap.className = className;

    this._section('header', this._headerHtml(model, t));
    this._section('tabs', this._tabsHtml(t));
    this._section('days', this._daysHtml(t));
    this._section(
      'timeline',
      this._config.show_timeline ? this._timelineHtml(model, t) : '',
    );
    this._section('slots', this._slotsHtml(model, rooms, t));
    this._section('copy', this._copyHtml(t));
    this._section(
      'zones',
      this._config.show_zones ? this._zonesHtml(rooms, t) : '',
    );
  }

  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    this._sections[name].hidden = !html;
  }

  /* ----------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const name = escapeHtml(this._config.name || t('schedule_card_name'));
    const now = model.zoneNow
      ? `<div class="pill">${icon(ZONE_BY_KEY[model.zoneNow]?.icon || 'calendar')}${escapeHtml(
          fill(t('ui.current_zone'), { zone: t(`zone.${model.zoneNow}`, model.zoneNow) }),
        )}</div>`
      : '';
    const next = model.next
      ? `<div class="sub">${escapeHtml(
          fill(t('ui.next_change'), {
            zone: t(`zone.${model.next.zone}`, model.next.zone),
            time: minutesToClock(model.next.start),
          }),
        )}${model.next.offset ? ` · ${escapeHtml(t(`day_long.${model.next.day}`))}` : ''}</div>`
      : '';
    return `
      <div class="header">
        <div>
          <div class="title">${name}</div>
          ${next}
        </div>
        <div class="spacer"></div>
        <div class="meta">${now}</div>
      </div>`;
  }

  _tabsHtml(t) {
    const season = this._season;
    return `
      <div class="tabs">
        <button type="button" data-action="tab" data-value="futes" aria-pressed="${season === 'futes'}">${escapeHtml(t('ui.heating_tab'))}</button>
        <button type="button" data-action="tab" data-value="hutes" aria-pressed="${season === 'hutes'}">${escapeHtml(t('ui.cooling_tab'))}</button>
      </div>`;
  }

  _daysHtml(t) {
    const today = WEEKDAYS[(new Date().getDay() + 6) % 7];
    return `
      <div class="days">
        ${WEEKDAYS.map(
          (day) =>
            `<button type="button" class="${day === today ? 'today' : ''}" data-action="day" data-value="${day}"
              aria-pressed="${day === this._day}" title="${escapeHtml(t(`day_long.${day}`))}">${escapeHtml(t(`day.${day}`))}</button>`,
        ).join('')}
      </div>`;
  }

  _timelineHtml(model, t) {
    const segments = model.days[this._day] || [];
    if (!segments.length) {
      return `<div class="muted">${escapeHtml(t('ui.no_schedule'))}</div>`;
    }
    const blocks = segments
      .map((segment) => {
        const colour = ZONE_BY_KEY[segment.zone]?.colour || 'var(--ap-line)';
        const width = ((segment.end - segment.start) / 1440) * 100;
        const title = `${minutesToClock(segment.start)}–${minutesToClock(segment.end)} ${t(`zone.${segment.zone}`, segment.zone)}`;
        return `<i class="seg-block" style="flex:0 0 ${width.toFixed(3)}%;background:${colour}" title="${escapeHtml(title)}"></i>`;
      })
      .join('');
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.timeline_title'))}</div>
        <div class="timeline">${blocks}</div>
        <div class="hours"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
      </div>`;
  }

  _slotsHtml(model, rooms, t) {
    const segments = model.days[this._day] || [];
    const table = buildZoneTable(this._hass, this._config, this._season, rooms);

    const rows = segments
      .map((segment) => {
        const zone = ZONE_BY_KEY[segment.zone];
        const temps = rooms
          .map((room) => {
            const cell = table[segment.zone]?.[room.key];
            return cell && cell.value !== null
              ? `${room.name} ${formatDecimal(cell.value, this._hass, 1)}`
              : null;
          })
          .filter(Boolean)
          .join(' · ');

        return `
          <div class="slot" data-entity="${escapeHtml(segment.entity_id)}" data-index="${segment.index}">
            <i class="swatch" style="background:${zone?.colour || 'var(--ap-line)'}"></i>
            <input type="time" value="${minutesToClock(segment.start)}" data-action="slot-time">
            <select data-action="slot-zone">
              ${(this._config.zones || ZONE_KEYS)
                .map(
                  (key) =>
                    `<option value="${key}" ${key === segment.zone ? 'selected' : ''}>${escapeHtml(t(`zone.${key}`, key))}</option>`,
                )
                .join('')}
            </select>
            <div class="temps">${escapeHtml(temps)}</div>
            <div class="spacer"></div>
            <button class="step-btn" type="button" data-action="slot-remove" title="${escapeHtml(t('ui.remove_slot'))}">−</button>
          </div>`;
      })
      .join('');

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.slots_title'))}</div>
        <div class="slots">${rows}</div>
        <div class="controls">
          <button class="chip" type="button" data-action="slot-add">${icon('clock')}<span>${escapeHtml(t('ui.add_slot'))}</span></button>
          <button class="chip" type="button" data-action="copy-open">${icon('calendar')}<span>${escapeHtml(t('ui.copy_day'))}</span></button>
        </div>
        <div class="muted">${escapeHtml(t('ui.schedule_hint'))}</div>
      </div>`;
  }

  _copyHtml(t) {
    if (!this._copyOpen) return '';
    const boxes = WEEKDAYS.filter((day) => day !== this._day)
      .map(
        (day) =>
          `<label class="chip"><input type="checkbox" data-copy="${day}"> <span>${escapeHtml(t(`day_long.${day}`))}</span></label>`,
      )
      .join('');
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.copy_to'))}</div>
        <div class="chips">${boxes}</div>
        <div class="controls">
          <button class="btn primary" type="button" data-action="copy-apply">${escapeHtml(t('ui.save'))}</button>
          <button class="btn" type="button" data-action="copy-cancel">${escapeHtml(t('ui.cancel'))}</button>
        </div>
      </div>`;
  }

  _zonesHtml(rooms, t) {
    if (!rooms.length) return `<div class="muted">${escapeHtml(t('ui.no_rooms'))}</div>`;
    const zones = this._config.zones || ZONE_KEYS;
    const table = buildZoneTable(this._hass, this._config, this._season, rooms);

    const head = rooms.map((room) => `<th>${escapeHtml(room.name)}</th>`).join('');
    const body = zones
      .map((key) => {
        const zone = ZONE_BY_KEY[key];
        const cells = rooms
          .map((room) => {
            const cell = table[key]?.[room.key];
            const value = cell?.value;
            return `<td><input class="val" type="number" step="${TEMP_STEP}" min="${TEMP_MIN}" max="${TEMP_MAX}"
              value="${value === null || value === undefined ? '' : value}"
              data-action="zone-temp" data-entity="${escapeHtml(cell?.entity || '')}"></td>`;
          })
          .join('');
        return `<tr>
          <td class="rowhead"><i class="zdot" style="background:${zone?.colour || 'var(--ap-line)'}"></i>${escapeHtml(t(`zone.${key}`, key))}</td>
          ${cells}
        </tr>`;
      })
      .join('');

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.zones_title'))} · ${escapeHtml(this._season === 'hutes' ? t('ui.cooling_tab') : t('ui.heating_tab'))}</div>
        <div class="tablewrap">
          <table class="ztable">
            <thead><tr><th class="rowhead"></th>${head}</tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>`;
  }

  /* ------------------------------ actions ----------------------------- */

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const { action, value } = target.dataset;

    switch (action) {
      case 'tab':
        this._tab = value;
        this._render();
        break;
      case 'day':
        this._day = value;
        this._render();
        break;
      case 'slot-add':
        this._addSlot();
        break;
      case 'slot-remove':
        this._removeSlot(target.closest('.slot'));
        break;
      case 'copy-open':
        this._copyOpen = true;
        this._render();
        break;
      case 'copy-cancel':
        this._copyOpen = false;
        this._render();
        break;
      case 'copy-apply':
        this._applyCopy();
        break;
      default:
        break;
    }
  }

  _onChange(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target) return;
    const { action } = target.dataset;

    if (action === 'zone-temp') {
      const value = Number(target.value);
      if (!target.dataset.entity || !Number.isFinite(value)) return;
      this._call('input_number', 'set_value', { entity_id: target.dataset.entity, value });
      return;
    }

    const slot = target.closest('.slot');
    if (!slot) return;
    if (action === 'slot-time') {
      const minutes = clockToMinutes(target.value);
      if (minutes === null) return;
      this._editSlot(slot, (segment) => ({ ...segment, minutes }));
    }
    if (action === 'slot-zone') {
      this._editSlot(slot, (segment) => ({ ...segment, zone: target.value }));
    }
  }

  /* --------------------------- scheduler I/O --------------------------- */

  /** The segments of the selected day that belong to one schedule entity. */
  _slotsOf(entityId) {
    const schedule = this._model.schedules.find((item) => item.entity_id === entityId);
    return schedule ? schedule.slots.filter((slot) => slot.zone) : [];
  }

  /**
   * One zone change is one Scheduler timeslot with a start and no stop: the
   * entry fires at that time and the zone stays until the next one. Writing
   * always sends the whole list, because `scheduler.edit` replaces it.
   */
  _timeslots(slots) {
    return [...slots]
      .sort((a, b) => a.minutes - b.minutes)
      .map((slot) => ({
        start: `${minutesToClock(slot.minutes)}:00`,
        actions: [
          {
            entity_id: this._model.zoneSelect,
            service: 'input_select.select_option',
            service_data: { option: slot.zone },
          },
        ],
      }));
  }

  _editSlot(slotNode, change) {
    const entityId = slotNode.dataset.entity;
    const index = Number(slotNode.dataset.index);
    const slots = this._slotsOf(entityId).map((slot) =>
      slot.index === index ? change(slot) : slot,
    );
    this._writeSchedule(entityId, slots);
  }

  _removeSlot(slotNode) {
    const entityId = slotNode.dataset.entity;
    const index = Number(slotNode.dataset.index);
    const slots = this._slotsOf(entityId).filter((slot) => slot.index !== index);
    if (!slots.length) {
      /* Scheduler needs at least one timeslot, so an empty day means the
         entry itself goes rather than being left behind with nothing in it */
      this._call('scheduler', 'remove', { entity_id: entityId });
      return;
    }
    this._writeSchedule(entityId, slots);
  }

  /** Adds a change in the middle of the longest stretch of the day. */
  _addSlot() {
    const segments = this._model.days[this._day] || [];
    const zones = this._config.zones || ZONE_KEYS;

    if (!segments.length) {
      this._call('scheduler', 'add', {
        weekdays: [this._day],
        repeat_type: 'repeat',
        timeslots: this._timeslots([{ minutes: 7 * 60, zone: zones[0] }]),
      });
      return;
    }

    const longest = segments.reduce((best, segment) =>
      segment.end - segment.start > best.end - best.start ? segment : best,
    );
    const middle = Math.round((longest.start + longest.end) / 2 / 5) * 5;
    const slots = [
      ...this._slotsOf(longest.entity_id),
      { index: -1, minutes: middle, zone: zones[0] },
    ];
    this._writeSchedule(longest.entity_id, slots);
  }

  _writeSchedule(entityId, slots) {
    this._haptic('light');
    this._call('scheduler', 'edit', {
      entity_id: entityId,
      timeslots: this._timeslots(slots),
    });
  }

  /** Copies the selected day onto the ticked days, entry by entry. */
  _applyCopy() {
    const boxes = [...this._sections.copy.querySelectorAll('[data-copy]')];
    const targets = boxes.filter((box) => box.checked).map((box) => box.dataset.copy);
    const segments = this._model.days[this._day] || [];
    if (!targets.length || !segments.length) {
      this._copyOpen = false;
      this._render();
      return;
    }

    const timeslots = this._timeslots(
      segments.map((segment) => ({ minutes: segment.start, zone: segment.zone })),
    );

    for (const day of targets) {
      const existing = (this._model.days[day] || [])[0];
      if (existing) {
        this._call('scheduler', 'edit', { entity_id: existing.entity_id, timeslots });
      } else {
        this._call('scheduler', 'add', { weekdays: [day], repeat_type: 'repeat', timeslots });
      }
    }
    this._copyOpen = false;
    this._render();
  }

  _call(domain, service, data) {
    this._hass?.callService?.(domain, service, data);
  }

  _haptic(kind) {
    this.dispatchEvent(new CustomEvent('haptic', { bubbles: true, composed: true, detail: kind }));
  }
}

export function registerScheduleCard() {
  if (customElements.get(SCHEDULE_CARD_NAME)) return;
  customElements.define(SCHEDULE_CARD_NAME, HeatingScheduleCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: SCHEDULE_CARD_NAME,
    name: 'Fűtés – ütemterv',
    description: 'Heti zóna-ütemterv színes idővonallal, szakaszok szerkesztésével és zónánkénti hőmérséklet-táblázattal, fűtésre és hűtésre külön.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${SCHEDULE_CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#3d9970;font-weight:700;border-radius:3px 0 0 3px',
    'color:#3d9970;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0',
  );
  /* eslint-enable no-console */
}
