import {
  CARD_VERSION,
  ROOMS_CARD_NAME,
  ROOMS_EDITOR_NAME,
  TEMP_MAX,
  TEMP_MIN,
  TEMP_STEP,
} from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildHouseModel, buildRoomsModel } from './model.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatClock, formatDecimal } from '../shared/format.js';

export const ROOMS_DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_controls: true,
  show_parts: true,
  show_boost: true,
};

/**
 * The room list.
 *
 * Every control here writes a helper - an override, a source choice, a boost
 * script - and never a `climate` entity. The heating logic owns the hardware;
 * the card only tells it what the household wants.
 */
export class HeatingRoomsCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(ROOMS_EDITOR_NAME);
  }

  static getStubConfig() {
    return { type: `custom:${ROOMS_CARD_NAME}`, rooms: [] };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
  }

  setConfig(config) {
    this._config = { ...ROOMS_DEFAULTS, ...(config || {}) };
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

  connectedCallback() {
    this._timer = window.setInterval(() => this._render(), 60000);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
    return 2 + (this._model?.rooms?.length || 0) * 2;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  _build() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    const card = document.createElement('ha-card');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.addEventListener('click', (ev) => this._onClick(ev));
    wrap.addEventListener('change', (ev) => this._onChange(ev));

    for (const name of ['header', 'rooms']) {
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
    const model = buildRoomsModel(this._hass, this._config);
    const house = buildHouseModel(this._hass, this._config);
    this._model = model;
    this._season = house.season.active;

    const classes = ['wrap', `accent-${house.source.accent}`];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    const className = classes.join(' ');
    if (this._wrap.className !== className) this._wrap.className = className;

    this._section('header', this._headerHtml(t));
    this._section(
      'rooms',
      model.ok
        ? `<div class="rooms">${model.rooms.map((room) => this._roomHtml(room, t)).join('')}</div>`
        : `<div class="empty">${icon('radiator')}<div>${escapeHtml(t('ui.no_rooms'))}</div></div>`,
    );
  }

  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    this._sections[name].hidden = !html;
  }

  _headerHtml(t) {
    const name = escapeHtml(this._config.name || t('rooms_card_name'));
    return `<div class="header"><div><div class="title">${name}</div></div></div>`;
  }

  _roomHtml(room, t) {
    const temperature =
      room.temperature === null
        ? '–'
        : `${formatDecimal(room.temperature, this._hass, 1)} °C`;

    if (room.readonly) {
      const frost = room.frost
        ? `<span class="tag bad">${icon('frost')}${escapeHtml(t('ui.frost_risk'))}</span>`
        : '';
      return `
        <div class="room readonly">
          <div class="line">
            <div class="name">${escapeHtml(room.name)}</div>
            <div class="spacer"></div>
            ${frost}
            <div class="temp">${escapeHtml(temperature)}</div>
          </div>
          <div class="note">${escapeHtml(t('ui.readonly'))}</div>
        </div>`;
    }

    const goal =
      room.target === null
        ? ''
        : `<div class="goal">${escapeHtml(t('ui.target'))} ${escapeHtml(formatDecimal(room.target, this._hass, 1))} °C</div>`;

    const tags = [];
    if (room.paused) {
      tags.push(`<span class="tag warn">${icon('window_open')}${escapeHtml(t('ui.paused_window'))}</span>`);
    } else if (room.active) {
      tags.push(
        `<span class="tag${room.active.key === 'nincs' ? ' idle' : ''}">${icon(room.active.icon)}${escapeHtml(t(`active.${room.active.key}`))}</span>`,
      );
    }
    if (room.window?.warn) {
      const minutes = room.window.minutes === null ? '' : ` · ${room.window.minutes} ${t('ui.minute_short', 'p')}`;
      tags.push(
        `<span class="tag warn">${icon(room.window.icon)}${escapeHtml(t(`window.${room.window.state}`))}${escapeHtml(minutes)}</span>`,
      );
    }

    const parts =
      this._config.show_parts && room.parts.length
        ? `<div class="parts">${room.parts
            .map((part) => {
              const classes = [];
              if (part.key === room.leading) classes.push('lead');
              if (part.excluded) classes.push('out');
              const value = part.value === null ? '–' : `${formatDecimal(part.value, this._hass, 1)} °C`;
              const suffix = part.excluded
                ? ` (${t('ui.kitchen_excluded')})`
                : part.key === room.leading
                  ? ` (${t('ui.leading')})`
                  : '';
              return `<span class="${classes.join(' ')}">${escapeHtml(part.name)} <b>${escapeHtml(value)}</b>${escapeHtml(suffix)}</span>`;
            })
            .join('')}</div>`
        : '';

    const notes = [];
    if (room.overshoot) notes.push(t('ui.overshoot'));
    if (room.override.until) {
      notes.push(fill(t('ui.override_until'), { when: formatClock(room.override.until, this._hass) }));
    }
    if (room.preheat) {
      const cooling = room.preheatDirection === 'hutes' || this._season === 'hutes';
      notes.push(
        fill(cooling ? t('ui.precool') : t('ui.preheat'), {
          when: formatClock(room.preheat, this._hass),
        }),
      );
    }
    const noteHtml = notes.length
      ? `<div class="note">${escapeHtml(notes.join(' · '))}</div>`
      : '';

    const controls = this._config.show_controls ? this._controlsHtml(room, t) : '';

    return `
      <div class="room" data-room="${escapeHtml(room.key)}">
        <div class="line">
          <div class="name">${escapeHtml(room.name)}</div>
          <div class="spacer"></div>
          ${tags.join('')}
          <div>
            <div class="temp">${escapeHtml(temperature)}</div>
            ${goal}
          </div>
        </div>
        ${parts}${noteHtml}${controls}
      </div>`;
  }

  _controlsHtml(room, t) {
    const sources = room.source.options.length
      ? `<select data-action="source" data-room="${escapeHtml(room.key)}">
          ${room.source.options
            .map(
              (option) =>
                `<option value="${escapeHtml(option)}" ${option === room.source.value ? 'selected' : ''}>${escapeHtml(t(`source.${option}`, option))}</option>`,
            )
            .join('')}
        </select>`
      : '';

    const boost =
      this._config.show_boost && this._config.boost_script !== false
        ? `<button class="chip" type="button" data-action="boost" data-room="${escapeHtml(room.key)}">
            ${icon('boost')}<span>${escapeHtml(t('ui.boost'))}</span></button>`
        : '';

    const aggregation =
      room.parts.length && room.aggregation.options.length
        ? `<select data-action="aggregation" data-room="${escapeHtml(room.key)}" title="${escapeHtml(t('ui.aggregation_title'))}">
            ${room.aggregation.options
              .map(
                (option) =>
                  `<option value="${escapeHtml(option)}" ${option === room.aggregation.value ? 'selected' : ''}>${escapeHtml(t(`aggregation.${option}`, option))}</option>`,
              )
              .join('')}
          </select>`
        : '';

    return `
      <div class="controls">
        <button class="step-btn" type="button" data-action="step" data-room="${escapeHtml(room.key)}" data-dir="-1">−</button>
        <button class="step-btn" type="button" data-action="step" data-room="${escapeHtml(room.key)}" data-dir="1">+</button>
        ${sources}${aggregation}${boost}
      </div>`;
  }

  /* ------------------------------ actions ----------------------------- */

  _room(key) {
    return this._model?.rooms.find((room) => room.key === key) || null;
  }

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const { action, room: key, dir } = target.dataset;
    const room = this._room(key);
    if (!room) return;

    if (action === 'step') this._step(room, Number(dir));
    if (action === 'boost') this._boost(room);
  }

  _onChange(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target) return;
    const room = this._room(target.dataset.room);
    if (!room) return;
    if (target.dataset.action === 'source') {
      this._call('input_select', 'select_option', {
        entity_id: room.source.entity,
        option: target.value,
      });
    }
    if (target.dataset.action === 'aggregation') {
      this._call('input_select', 'select_option', {
        entity_id: room.aggregation.entity,
        option: target.value,
      });
    }
  }

  /**
   * A step writes the override helper only.
   *
   * How long the override lasts is the logic's business - it is the side that
   * knows when the next zone change falls - so the card deliberately leaves
   * `..._felulir_vege` alone rather than guessing an end time.
   */
  _step(room, direction) {
    const base = room.override.value ?? room.target ?? room.temperature;
    if (base === null || base === undefined) return;
    const next = Math.min(TEMP_MAX, Math.max(TEMP_MIN, base + direction * TEMP_STEP));
    if (next === base) return;
    this._haptic('light');
    this._call('input_number', 'set_value', { entity_id: room.override.entity, value: next });
  }

  _boost(room) {
    const script = this._config.boost_script || 'script.futes_boost';
    const [, objectId] = script.split('.');
    if (!objectId) return;
    this._haptic('medium');
    this._call('script', objectId, { szoba: room.key });
  }

  _call(domain, service, data) {
    this._hass?.callService?.(domain, service, data);
  }

  _haptic(kind) {
    this.dispatchEvent(new CustomEvent('haptic', { bubbles: true, composed: true, detail: kind }));
  }
}

export function registerRoomsCard() {
  if (customElements.get(ROOMS_CARD_NAME)) return;
  customElements.define(ROOMS_CARD_NAME, HeatingRoomsCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: ROOMS_CARD_NAME,
    name: 'Fűtés – szobák',
    description: 'Szobánkénti mért és célhőmérséklet, kézi felülírás, forrásválasztás, ablakállapot és boost – mindig helper entitásokon keresztül.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${ROOMS_CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#1a73e8;font-weight:700;border-radius:3px 0 0 3px',
    'color:#1a73e8;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0',
  );
  /* eslint-enable no-console */
}
