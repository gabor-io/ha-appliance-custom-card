import { CARD_VERSION, ROOMS_CARD_NAME, ROOMS_EDITOR_NAME } from './const.js';
import { getLanguage, translator } from './i18n.js';
import { buildHouseModel, buildRoomsModel } from './model.js';
import { applyRoomAction, roomRowHtml } from './room-ui.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml } from '../shared/format.js';

export const ROOMS_DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_controls: true,
  show_parts: true,
  show_boost: true,
};

/**
 * The rooms.
 *
 * With `room:` (or `szoba:`) in the config it is one room's own card; without
 * it, every room in the list. Either way the controls write helpers and never
 * a `climate` entity - the heating logic owns the hardware.
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
    // an open window's age keeps counting between state updates
    this._timer = window.setInterval(() => this._render(), 60000);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
    return 2 + (this._rooms?.length || 1) * 2;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  /** `room:` or its Hungarian spelling - the HA side names rooms in Hungarian. */
  get _only() {
    return this._config?.room || this._config?.szoba || null;
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
    const only = this._only;
    const rooms = only ? model.rooms.filter((room) => room.key === only) : model.rooms;
    this._model = model;
    this._rooms = rooms;
    this._season = house.season.active;

    /* a single-room card takes its colour from that room's own source, a
       list from the house, so the card always answers "what is heating me" */
    const accent = only
      ? rooms[0]?.suggestion?.accent || house.source.accent
      : house.source.accent;
    const classes = ['wrap', `accent-${accent}`];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    const className = classes.join(' ');
    if (this._wrap.className !== className) this._wrap.className = className;

    this._section('header', this._headerHtml(rooms, t));
    this._section('rooms', this._roomsHtml(rooms, t));
  }

  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    this._sections[name].hidden = !html;
  }

  _headerHtml(rooms, t) {
    const only = this._only;
    const fallback = only ? rooms[0]?.name || only : t('rooms_card_name');
    return `<div class="header"><div><div class="title">${escapeHtml(this._config.name || fallback)}</div></div></div>`;
  }

  _roomsHtml(rooms, t) {
    if (!rooms.length) {
      return `<div class="empty">${icon('radiator')}<div>${escapeHtml(t('ui.no_rooms'))}</div></div>`;
    }
    const options = {
      t,
      hass: this._hass,
      season: this._season,
      showControls: this._config.show_controls,
      showParts: this._config.show_parts,
      showBoost: this._config.show_boost,
    };
    return `<div class="rooms">${rooms.map((room) => roomRowHtml(room, options)).join('')}</div>`;
  }

  /* ------------------------------ actions ----------------------------- */

  _room(key) {
    return this._rooms?.find((room) => room.key === key) || null;
  }

  _act(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const room = this._room(target.dataset.room);
    if (!room) return;
    const changed = applyRoomAction({
      hass: this._hass,
      config: this._config,
      room,
      action: target.dataset.action,
      target,
    });
    if (changed) this._haptic(target.dataset.action === 'boost' ? 'medium' : 'light');
  }

  _onClick(ev) {
    this._act(ev);
  }

  _onChange(ev) {
    this._act(ev);
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
    description: 'Szobánkénti mért és célhőmérséklet, kézi felülírás, forrásjavaslat az indoklásával, ablakállapot és boost – mindig helper entitásokon keresztül. Egy szobára szűkíthető.',
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
