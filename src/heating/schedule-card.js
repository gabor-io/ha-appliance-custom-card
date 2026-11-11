import {
  CARD_VERSION,
  SCHEDULE_CARD_NAME,
  SCHEDULE_EDITOR_NAME,
  SCHEDULE_ZONES,
  TEMP_MAX,
  TEMP_MIN,
  TEMP_STEP,
  WEEKDAYS,
  ZONES,
} from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import {
  buildHouseModel,
  buildScheduleModel,
  buildZoneTable,
  clockToMinutes,
  DAY_KEYS,
  minutesToClock,
} from './model.js';
import { listRooms, stateObj } from './entities.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatClock, formatDecimal } from '../shared/format.js';

export const SCHEDULE_DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_timeline: true,
  show_zones: true,
};

const ZONE_BY_KEY = Object.fromEntries(ZONES.map((zone) => [zone.key, zone]));
const EMPTY_WEEK = Object.fromEntries(Object.values(DAY_KEYS).map((day) => [day, []]));

/** `"06:15"` -> `"06:15:00"`, which is what the schedule helper stores. */
const toStored = (value) => (String(value).length === 5 ? `${value}:00` : String(value));

/**
 * The weekly plan, drawn the way the Netatmo app draws it.
 *
 * The plan itself is a built-in Home Assistant **schedule helper**: inside a
 * band the house is in the comfort zone, outside it in the night zone. The
 * entity only publishes on/off and `next_event`, so the weekly blocks are
 * fetched over the websocket (`schedule/list`) and written back with
 * `schedule/update` - the same pair the helper's own editor uses.
 *
 * The setpoints are separate: one `input_number` per zone and room, in two
 * sets, one for heating and one for cooling.
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
    this._blocks = null;
    this._scheduleId = null;
    this._loading = false;
    this._error = null;
  }

  setConfig(config) {
    this._config = { ...SCHEDULE_DEFAULTS, ...(config || {}) };
    this._signatures = {};
    this._blocks = null;
    this._scheduleId = null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    /* the weekly blocks are not in the state machine, so they are fetched
       once and then only when the helper itself says something changed */
    const entityId = this._config?.schedule_entity || 'schedule.futes_komfort';
    if (!this._blocks || previous?.states?.[entityId] !== hass?.states?.[entityId]) {
      this._loadBlocks();
    }
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

  get _season() {
    if (this._tab) return this._tab;
    return this._houseSeason === 'hutes' ? 'hutes' : 'futes';
  }

  /* ------------------------------ websocket --------------------------- */

  /**
   * Finds the helper's storage id for the configured entity.
   *
   * The id is the entity's unique id, which the state machine does not
   * carry, so it is read from the entity registry; a single-item list or an
   * explicit `schedule_id` in the config are the fallbacks.
   */
  async _resolveScheduleId(items, entityId) {
    if (this._config.schedule_id) return this._config.schedule_id;
    try {
      const entry = await this._hass.callWS({
        type: 'config/entity_registry/get',
        entity_id: entityId,
      });
      if (entry?.unique_id && items.some((item) => item.id === entry.unique_id)) {
        return entry.unique_id;
      }
    } catch (err) {
      /* a non-admin user may not read the registry - fall through */
    }
    if (items.length === 1) return items[0].id;
    const slug = entityId.split('.')[1];
    const byName = items.find(
      (item) => String(item.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '_') === slug,
    );
    return byName?.id || null;
  }

  async _loadBlocks() {
    if (this._loading || !this._hass?.callWS) return;
    const entityId = this._config?.schedule_entity || 'schedule.futes_komfort';
    if (!stateObj(this._hass, entityId)) return;
    this._loading = true;
    try {
      const items = await this._hass.callWS({ type: 'schedule/list' });
      const id = await this._resolveScheduleId(items || [], entityId);
      const item = (items || []).find((entry) => entry.id === id);
      this._scheduleId = id;
      this._blocks = item
        ? Object.fromEntries(Object.values(DAY_KEYS).map((day) => [day, item[day] || []]))
        : { ...EMPTY_WEEK };
      this._name = item?.name || null;
      this._error = null;
    } catch (err) {
      this._error = String(err?.message || err);
    } finally {
      this._loading = false;
      this._signatures = {};
      this._render();
    }
  }

  /** Writes the whole week back; `schedule/update` replaces the item. */
  async _save(blocks) {
    if (!this._scheduleId || !this._hass?.callWS) return;
    this._blocks = blocks;
    this._signatures = {};
    this._render();
    try {
      await this._hass.callWS({
        type: 'schedule/update',
        schedule_id: this._scheduleId,
        name: this._name || this._config.name || 'Fűtés',
        ...blocks,
      });
    } catch (err) {
      this._error = String(err?.message || err);
      this._loadBlocks();
    }
  }

  /* ------------------------------- render ----------------------------- */

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

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._built) this._build();

    const t = translator(getLanguage(this._config, this._hass));
    const house = buildHouseModel(this._hass, this._config);
    this._houseSeason = house.season.active;

    const model = buildScheduleModel(this._hass, this._config, this._blocks);
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
    this._section('days', model.ok ? this._daysHtml(t) : '');
    this._section('timeline', model.ok && this._config.show_timeline ? this._timelineHtml(model, t) : '');
    this._section('slots', model.ok ? this._bandsHtml(model, rooms, t) : this._emptyHtml(model, t));
    this._section('copy', this._copyHtml(t));
    this._section('zones', this._config.show_zones ? this._zonesHtml(model, rooms, t) : '');
  }

  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    this._sections[name].hidden = !html;
  }

  _emptyHtml(model, t) {
    const message = this._error
      ? this._error
      : model.reason === 'loading'
        ? t('ui.loading')
        : t('ui.no_schedule');
    return `<div class="empty">${icon('calendar')}<div>${escapeHtml(message)}</div></div>`;
  }

  _headerHtml(model, t) {
    const name = escapeHtml(this._config.name || t('schedule_card_name'));
    const now = model.zoneNow
      ? `<div class="pill">${icon(ZONE_BY_KEY[model.zoneNow]?.icon || 'calendar')}${escapeHtml(
          fill(t('ui.current_zone'), { zone: t(`zone.${model.zoneNow}`, model.zoneNow) }),
        )}</div>`
      : '';

    /* the helper's own next_event is the authority; the day strip is only a
       drawing of the same data and can disagree while a save is in flight */
    const next = model.nextEvent
      ? `<div class="sub">${escapeHtml(
          fill(t('ui.next_change'), {
            zone: t(`zone.${model.zoneNow === model.zoneOn ? model.zoneOff : model.zoneOn}`),
            time: formatClock(model.nextEvent, this._hass),
          }),
        )}</div>`
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

  /** One row per comfort band: when it starts, when it ends, and the setpoints. */
  _bandsHtml(model, rooms, t) {
    const dayKey = DAY_KEYS[this._day];
    const bands = model.blocks?.[dayKey] || [];
    const table = buildZoneTable(this._hass, this._config, this._season, rooms);

    const temps = (zone) =>
      rooms
        .map((room) => {
          const cell = table[zone]?.[room.key];
          return cell && cell.value !== null
            ? `${room.name} ${formatDecimal(cell.value, this._hass, 1)}`
            : null;
        })
        .filter(Boolean)
        .join(' · ');

    const rows = bands
      .map((band, index) => {
        const zone = ZONE_BY_KEY[model.zoneOn];
        return `
          <div class="slot" data-index="${index}">
            <i class="swatch" style="background:${zone?.colour || 'var(--ap-line)'}"></i>
            <span class="zone">${escapeHtml(t(`zone.${model.zoneOn}`, model.zoneOn))}</span>
            <input type="time" value="${escapeHtml(String(band.from).slice(0, 5))}" data-action="band-from">
            <span class="zone">–</span>
            <input type="time" value="${escapeHtml(String(band.to).slice(0, 5))}" data-action="band-to">
            <div class="spacer"></div>
            <button class="step-btn" type="button" data-action="band-remove" title="${escapeHtml(t('ui.remove_slot'))}">−</button>
            <div class="temps">${escapeHtml(temps(model.zoneOn))}</div>
          </div>`;
      })
      .join('');

    const nightNote = `<div class="muted">${icon('night')} ${escapeHtml(
      fill(t('ui.outside_bands'), { zone: t(`zone.${model.zoneOff}`, model.zoneOff) }),
    )}${temps(model.zoneOff) ? ` · ${escapeHtml(temps(model.zoneOff))}` : ''}</div>`;

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.slots_title'))}</div>
        <div class="slots">${rows || `<div class="muted">${escapeHtml(t('ui.no_bands'))}</div>`}</div>
        ${nightNote}
        <div class="controls">
          <button class="chip" type="button" data-action="band-add">${icon('clock')}<span>${escapeHtml(t('ui.add_slot'))}</span></button>
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

  _zonesHtml(model, rooms, t) {
    if (!rooms.length) return `<div class="muted">${escapeHtml(t('ui.no_rooms'))}</div>`;
    const zones = this._config.zones || model.zones || SCHEDULE_ZONES;
    const table = buildZoneTable(this._hass, this._config, this._season, rooms);

    const head = rooms.map((room) => `<th>${escapeHtml(room.name)}</th>`).join('');
    const body = zones
      .map((key) => {
        const zone = ZONE_BY_KEY[key];
        const cells = rooms
          .map((room) => {
            const cell = table[key]?.[room.key];
            /* a room without a setpoint for this season - the bathroom has
               no cooling - gets a dash, not an input that writes nowhere */
            if (!cell || !stateObj(this._hass, cell.entity)) return '<td class="muted">–</td>';
            return `<td><input class="val" type="number" step="${TEMP_STEP}" min="${TEMP_MIN}" max="${TEMP_MAX}"
              value="${cell.value === null ? '' : cell.value}"
              data-action="zone-temp" data-entity="${escapeHtml(cell.entity)}"></td>`;
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
        this._signatures = {};
        this._render();
        break;
      case 'day':
        this._day = value;
        this._render();
        break;
      case 'band-add':
        this._addBand();
        break;
      case 'band-remove':
        this._removeBand(Number(target.closest('.slot').dataset.index));
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
      this._hass.callService('input_number', 'set_value', {
        entity_id: target.dataset.entity,
        value,
      });
      return;
    }

    if (action === 'band-from' || action === 'band-to') {
      const index = Number(target.closest('.slot').dataset.index);
      this._editBand(index, action === 'band-from' ? { from: toStored(target.value) } : { to: toStored(target.value) });
    }
  }

  _week() {
    return { ...EMPTY_WEEK, ...(this._blocks || {}) };
  }

  /**
   * The helper refuses overlapping or inverted ranges, so the card keeps the
   * day sorted and drops anything that would not survive the save.
   */
  _normalise(ranges) {
    return [...ranges]
      .filter((range) => clockToMinutes(range.to) > clockToMinutes(range.from))
      .sort((a, b) => clockToMinutes(a.from) - clockToMinutes(b.from))
      .filter((range, index, all) => index === 0 || clockToMinutes(all[index - 1].to) <= clockToMinutes(range.from));
  }

  _writeDay(day, ranges) {
    const week = this._week();
    week[day] = this._normalise(ranges);
    this._save(week);
  }

  _editBand(index, change) {
    const dayKey = DAY_KEYS[this._day];
    const ranges = (this._week()[dayKey] || []).map((range, position) =>
      position === index ? { ...range, ...change } : range,
    );
    this._writeDay(dayKey, ranges);
  }

  _removeBand(index) {
    const dayKey = DAY_KEYS[this._day];
    this._writeDay(
      dayKey,
      (this._week()[dayKey] || []).filter((range, position) => position !== index),
    );
  }

  /** Puts a new comfort band in the longest stretch of night. */
  _addBand() {
    const dayKey = DAY_KEYS[this._day];
    const ranges = this._week()[dayKey] || [];
    const night = (this._model.days[this._day] || []).filter(
      (segment) => segment.zone === this._model.zoneOff,
    );
    if (!night.length) return;

    const longest = night.reduce((best, segment) =>
      segment.end - segment.start > best.end - best.start ? segment : best,
    );
    const span = longest.end - longest.start;
    const from = longest.start + Math.max(0, Math.round((span / 3) / 15) * 15);
    const to = Math.min(1440, from + Math.max(60, Math.round((span / 3) / 15) * 15));
    if (to <= from) return;

    this._writeDay(dayKey, [
      ...ranges,
      { from: `${minutesToClock(from)}:00`, to: to === 1440 ? '24:00:00' : `${minutesToClock(to)}:00` },
    ]);
  }

  _applyCopy() {
    const boxes = [...this._sections.copy.querySelectorAll('[data-copy]')];
    const targets = boxes.filter((box) => box.checked).map((box) => box.dataset.copy);
    this._copyOpen = false;
    if (!targets.length) {
      this._render();
      return;
    }
    const week = this._week();
    const source = week[DAY_KEYS[this._day]] || [];
    for (const day of targets) week[DAY_KEYS[day]] = source.map((range) => ({ ...range }));
    this._save(week);
  }
}

export function registerScheduleCard() {
  if (customElements.get(SCHEDULE_CARD_NAME)) return;
  customElements.define(SCHEDULE_CARD_NAME, HeatingScheduleCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: SCHEDULE_CARD_NAME,
    name: 'Fűtés – ütemterv',
    description: 'Heti ütemterv színes idővonallal a Home Assistant beépített schedule helpere fölött, komfort sávok szerkesztésével és zónánkénti hőmérséklet-táblázattal, fűtésre és hűtésre.',
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
