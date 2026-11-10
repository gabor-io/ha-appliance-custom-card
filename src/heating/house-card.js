import {
  CARD_VERSION,
  HOUSE_CARD_NAME,
  HOUSE_EDITOR_NAME,
  MODES,
  SEASON_CHOICES,
  WINDOW_WARN_MINUTES,
} from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildHouseModel, buildRoomsModel, openWindows, outsideCoolingSeason } from './model.js';
import { num } from './entities.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatClock, formatDecimal } from '../shared/format.js';

export const HOUSE_DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_gas: true,
  show_pace: true,
  show_forecast: true,
  show_source: true,
  show_mode: true,
  show_meter: true,
  show_power_note: false,
};

const SECTIONS = ['header', 'alerts', 'gas', 'pace', 'source', 'mode', 'meter'];

/** House-level card: the gas budget, what is heating the house, and why. */
export class HouseHeatingCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(HOUSE_EDITOR_NAME);
  }

  static getStubConfig() {
    return { type: `custom:${HOUSE_CARD_NAME}` };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
    /* a season the user picked that needs a second look - held here, not
       written, until they answer */
    this._pendingSeason = null;
  }

  setConfig(config) {
    this._config = { ...HOUSE_DEFAULTS, ...(config || {}) };
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
    // the age of an open window keeps counting between state updates
    this._timer = window.setInterval(() => this._render(), 60000);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
    return 7;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  /* ------------------------------------------------------------------ */

  _build() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    const card = document.createElement('ha-card');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.addEventListener('click', (ev) => this._onClick(ev));

    for (const name of SECTIONS) {
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
    const model = buildHouseModel(this._hass, this._config);
    const rooms = buildRoomsModel(this._hass, this._config).rooms;
    this._model = model;
    this._rooms = rooms;

    const classes = ['wrap', `accent-${model.source.accent}`];
    /* while the house is cooling the gas budget is not the story of the day,
       so it stays on the card - the limit is still a limit - but steps back */
    if (model.season.active === 'hutes') classes.push('cooling');
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    const className = classes.join(' ');
    if (this._wrap.className !== className) this._wrap.className = className;

    this._section('header', this._headerHtml(model, t));
    this._section('alerts', this._alertsHtml(model, rooms, t));
    this._section('gas', this._config.show_gas ? this._gasHtml(model, t) : '');
    this._section('pace', this._config.show_pace ? this._paceHtml(model, t) : '');
    this._section('source', this._config.show_source ? this._sourceHtml(model, t) : '');
    this._section('mode', this._config.show_mode ? this._modeHtml(model, t) : '');
    this._section('meter', this._config.show_meter ? this._meterHtml(model, t) : '');
  }

  /** Replaces a section only when its markup actually changed. */
  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    this._sections[name].hidden = !html;
    if (name === 'meter') this._restoreMeterInput();
  }

  /* ----------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const name = escapeHtml(this._config.name || t('house_card_name'));
    const season = model.season.active
      ? `<div class="pill">${icon(model.season.active === 'hutes' ? 'snowflake' : 'heat')}${escapeHtml(t(`season.${model.season.active}`))}</div>`
      : '';
    const note =
      this._config.show_power_note
        ? `<span class="tag bad" title="${escapeHtml(t('ui.power_budget'))}">${icon('alert')}${escapeHtml(t('ui.power_budget'))}</span>`
        : '';
    return `
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${name}</div>
        </div>
        <div class="spacer"></div>
        <div class="meta">${note}${season}</div>
      </div>`;
  }

  _alertsHtml(model, rooms, t) {
    const alerts = [];

    if (model.meter.stale) {
      alerts.push(`<div class="alert error">${icon('alert')}<span>${escapeHtml(t('ui.stale'))}</span></div>`);
    }

    if (model.forecast.balance !== null && model.forecast.balance < 0) {
      alerts.push(
        `<div class="alert">${icon('heat')}<span>${escapeHtml(
          fill(t('ui.forecast_bad'), {
            balance: formatDecimal(Math.abs(model.forecast.balance), this._hass, 1),
          }),
        )}</span></div>`,
      );
    }

    /* an open window matters only while the house is spending energy on
       that room, so the warning rides on the heating season, not the clock */
    if (model.season.active !== 'atmeneti') {
      const outside = num(this._hass, model.entities.outside);
      for (const room of openWindows(rooms, WINDOW_WARN_MINUTES)) {
        const values = {
          room: room.name,
          minutes: room.window.minutes,
          state: t(`window.${room.window.state}`).toLowerCase(),
          temp: outside === null ? '' : formatDecimal(outside, this._hass, 0),
        };
        const text = outside === null ? fill(t('ui.window_warn'), values) : fill(t('ui.window_warn_cold'), values);
        alerts.push(`<div class="alert">${icon('window_open')}<span>${escapeHtml(text)}</span></div>`);
      }
    }

    if (model.flags.boiler === false && ['gaz', 'hibrid'].includes(model.source.key)) {
      alerts.push(`<div class="alert">${icon('info')}<span>${escapeHtml(t('ui.boiler_off'))}</span></div>`);
    }
    if (model.flags.ervLock) {
      alerts.push(`<div class="alert info">${icon('info')}<span>${escapeHtml(t('ui.erv_lock'))}</span></div>`);
    }

    return alerts.length ? `<div class="alerts">${alerts.join('')}</div>` : '';
  }

  _gasHtml(model, t) {
    const { gas } = model;
    if (!gas.ratios) {
      return `<div class="section"><div class="section-title">${escapeHtml(t('ui.budget'))}</div>
        <div class="muted">${escapeHtml(t('ui.not_configured'))}</div></div>`;
    }

    const pct = (value) => `${(value * 100).toFixed(2)}%`;
    const paceMarker =
      gas.ratios.allowed === null
        ? ''
        : `<i class="pace" style="left:${pct(gas.ratios.allowed)}"></i>`;
    const reserve = gas.ratios.reserve
      ? `<i class="reserve" style="width:${pct(gas.ratios.reserve)}"></i>`
      : '';

    const mj =
      gas.usedMj === null || gas.budgetMj === null
        ? ''
        : `<div class="mj">${escapeHtml(fill(t('ui.megajoule'), { value: formatDecimal(gas.usedMj, this._hass, 0) }))} / ${escapeHtml(fill(t('ui.megajoule'), { value: formatDecimal(gas.budgetMj, this._hass, 0) }))}</div>`;

    const days =
      gas.daysLeft === null
        ? ''
        : `<span>${escapeHtml(fill(t('ui.days_left'), { days: formatDecimal(gas.daysLeft, this._hass, 0) }))}</span>`;

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.budget'))}</div>
        <div class="barline">
          <div>
            <div class="big">${escapeHtml(
              fill(t('ui.used_of'), {
                used: formatDecimal(gas.used, this._hass, 1),
                total: formatDecimal(gas.budget, this._hass, 1),
              }),
            )}</div>
            ${mj}
          </div>
          <div class="muted">${escapeHtml(t('ui.left'))}: <b>${escapeHtml(formatDecimal(gas.left, this._hass, 1))} m³</b></div>
        </div>
        <div class="gasbar level-${gas.level}">
          <i class="fill" style="width:${pct(gas.ratios.used)}"></i>
          ${reserve}${paceMarker}
        </div>
        <div class="legend">
          <span><i class="dot pace"></i>${escapeHtml(t('ui.pace_marker'))}: ${escapeHtml(formatDecimal(gas.allowed, this._hass, 0))} m³</span>
          <span><i class="dot reserve"></i>${escapeHtml(t('ui.reserve'))}: ${escapeHtml(formatDecimal(gas.reserve, this._hass, 0))} m³</span>
          ${days}
        </div>
      </div>`;
  }

  _paceHtml(model, t) {
    const { pace, forecast, gas } = model;
    if (pace.actual === null && pace.heatingDaily === null) return '';

    const allowedTotal =
      pace.heatingDaily === null ? null : pace.heatingDaily + (pace.hotWater || 0);
    const over = allowedTotal !== null && pace.actual !== null && pace.actual > allowedTotal;

    const boxes = [
      `<div class="pacebox${over ? ' over' : ''}">
        <div class="k">${escapeHtml(t('ui.pace_actual'))}</div>
        <div class="v">${escapeHtml(formatDecimal(pace.actual, this._hass, 1))}</div>
        <div class="u">${escapeHtml(t('ui.per_day'))}</div>
      </div>`,
      allowedTotal === null
        ? ''
        : `<div class="pacebox">
            <div class="k">${escapeHtml(t('ui.pace_allowed'))}</div>
            <div class="v">${escapeHtml(formatDecimal(allowedTotal, this._hass, 1))}</div>
            <div class="u">${escapeHtml(t('ui.per_day'))}</div>
          </div>`,
    ].join('');

    const lasts =
      pace.lastsDays === null
        ? ''
        : gas.daysLeft !== null && pace.lastsDays < gas.daysLeft
          ? `<div class="muted">${escapeHtml(t('ui.lasts_short'))}</div>`
          : `<div class="muted">${escapeHtml(fill(t('ui.lasts'), { days: pace.lastsDays }))}</div>`;

    const hotWater =
      pace.hotWater === null
        ? ''
        : `<div class="muted">${escapeHtml(fill(t('ui.hot_water'), { value: formatDecimal(pace.hotWater, this._hass, 1) }))}</div>`;

    const forecastLine =
      !this._config.show_forecast || forecast.balance === null
        ? ''
        : `<div class="muted">${escapeHtml(
            forecast.balance < 0
              ? fill(t('ui.forecast_bad'), { balance: formatDecimal(Math.abs(forecast.balance), this._hass, 1) })
              : fill(t('ui.forecast_ok'), { balance: formatDecimal(forecast.balance, this._hass, 1) }),
          )}</div>`;

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.pace_title'))}</div>
        <div class="pacegrid">${boxes}</div>
        ${lasts}${hotWater}${forecastLine}
      </div>`;
  }

  _sourceHtml(model, t) {
    if (!model.source.key) return '';
    const label = t(`source.${model.source.key}`, t('source.unknown'));
    const why = model.source.reason ? `<div class="why">${escapeHtml(model.source.reason)}</div>` : '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(this._sourceTitle(model, t))}</div>
        <div class="sourcebox">
          <div class="ring">${icon(model.source.icon)}</div>
          <div>
            <div class="label">${escapeHtml(label)}</div>
            ${why}
          </div>
        </div>
      </div>`;
  }

  /** "Most fűt" would be a lie while nothing is running. */
  _sourceTitle(model, t) {
    if (model.source.cooling) return t('ui.source_cooling');
    if (model.source.key === 'ki') return t('ui.source_idle');
    return t('ui.source_title');
  }

  _modeHtml(model, t) {
    const modeButtons = this._segment(
      MODES.filter((mode) => !model.mode.options.length || model.mode.options.includes(mode.key)),
      model.mode.key,
      'mode',
      t,
    );
    const seasonButtons = this._segment(
      SEASON_CHOICES.filter(
        (season) => !model.season.options.length || model.season.options.includes(season.key),
      ),
      model.season.choice,
      'season',
      t,
    );

    /* the logic can disagree with the chosen mode - the budget is the one
       thing that overrules a person - and then the card says so out loud */
    const overridden =
      model.mode.key === 'csak_gaz' && ['klima', 'hibrid'].includes(model.source.key)
        ? `<div class="muted">${icon('info')} ${escapeHtml(t('ui.overridden'))}</div>`
        : '';

    const confirm = this._pendingSeason
      ? `<div class="confirm">
          <div class="q">${escapeHtml(t('ui.cool_confirm'))}</div>
          <div class="hint">${escapeHtml(t('ui.cool_confirm_hint'))}</div>
          <div class="row">
            <button class="btn primary" type="button" data-action="season-confirm">${escapeHtml(t('ui.yes'))}</button>
            <button class="btn" type="button" data-action="season-cancel">${escapeHtml(t('ui.cancel'))}</button>
          </div>
        </div>`
      : '';

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.mode_title'))}</div>
        <div class="seg" data-group="mode">${modeButtons}</div>
        <div class="section-title">${escapeHtml(t('ui.season_title'))}</div>
        <div class="seg" data-group="season">${seasonButtons}</div>
        ${overridden}${confirm}
      </div>`;
  }

  _segment(items, current, group, t) {
    return items
      .map(
        (item) => `<button type="button" data-action="${group}" data-value="${escapeHtml(item.key)}"
          aria-pressed="${item.key === current}">${icon(item.icon)}<span>${escapeHtml(t(`${group}.${item.key}`))}</span></button>`,
      )
      .join('');
  }

  _meterHtml(model, t) {
    const { meter } = model;
    const last = meter.lastRead
      ? `<div class="muted">${escapeHtml(fill(t('ui.meter_last'), { when: this._when(meter.lastRead) }))}</div>`
      : '';
    const reading =
      meter.value === null
        ? ''
        : `<div class="muted">${escapeHtml(t('ui.meter_value'))}: <b>${escapeHtml(formatDecimal(meter.value, this._hass, 2))} m³</b></div>`;

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.meter_title'))}</div>
        ${reading}
        <div class="meter">
          <label class="field">
            <span>${escapeHtml(t('ui.meter_manual'))}</span>
            <input type="number" inputmode="decimal" step="0.01" data-action="meter-input"
              placeholder="${escapeHtml(formatDecimal(meter.manual ?? meter.value, this._hass, 2))}">
          </label>
          <button class="btn primary" type="button" data-action="meter-save">${icon('check')}<span>${escapeHtml(t('ui.meter_save'))}</span></button>
        </div>
        ${last}
      </div>`;
  }

  _when(date) {
    const today = new Date();
    const sameDay = date.toDateString() === today.toDateString();
    const clock = formatClock(date, this._hass);
    if (sameDay) return clock;
    const locale = this._hass?.locale?.language || 'hu';
    try {
      return `${new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(date)} ${clock}`;
    } catch (err) {
      return clock;
    }
  }

  /** The typed reading survives a re-render, so state updates do not eat it. */
  _restoreMeterInput() {
    const input = this._sections.meter?.querySelector('[data-action="meter-input"]');
    if (input && this._meterDraft !== undefined) input.value = this._meterDraft;
    if (input && !input.dataset.bound) {
      input.dataset.bound = '1';
      input.addEventListener('input', () => {
        this._meterDraft = input.value;
      });
    }
  }

  /* ------------------------------ actions ----------------------------- */

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const { action, value } = target.dataset;
    const model = this._model;
    if (!model) return;

    switch (action) {
      case 'more-info':
        this._moreInfo(model.entities.source);
        break;
      case 'mode':
        this._select(model.entities.mode, value);
        break;
      case 'season':
        this._chooseSeason(value);
        break;
      case 'season-confirm': {
        const wanted = this._pendingSeason;
        this._pendingSeason = null;
        this._select(model.entities.season_select, wanted);
        break;
      }
      case 'season-cancel':
        this._pendingSeason = null;
        this._render();
        break;
      case 'meter-save':
        this._saveMeter();
        break;
      default:
        break;
    }
  }

  /**
   * Cooling in the middle of the heating season is a question, not a tap.
   *
   * The logic never does it on its own between October and April, so a card
   * that just wrote the helper would turn a mis-tap into a cold house.
   */
  _chooseSeason(value) {
    if (value === 'hutes' && outsideCoolingSeason()) {
      this._pendingSeason = value;
      this._render();
      return;
    }
    this._pendingSeason = null;
    this._select(this._model.entities.season_select, value);
  }

  _saveMeter() {
    const input = this._sections.meter?.querySelector('[data-action="meter-input"]');
    const raw = input?.value;
    const value = Number(raw);
    if (raw === undefined || raw === '' || !Number.isFinite(value)) return;
    this._haptic('medium');
    this._call('input_number', 'set_value', {
      entity_id: this._model.entities.manual,
      value,
    });
    this._meterDraft = '';
    if (input) input.value = '';
  }

  _select(entityId, option) {
    if (!entityId || !option) return;
    this._haptic('light');
    this._call('input_select', 'select_option', { entity_id: entityId, option });
  }

  _call(domain, service, data) {
    this._hass?.callService?.(domain, service, data);
  }

  _haptic(kind) {
    this.dispatchEvent(new CustomEvent('haptic', { bubbles: true, composed: true, detail: kind }));
  }

  _moreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

export function registerHouseCard() {
  if (customElements.get(HOUSE_CARD_NAME)) return;
  customElements.define(HOUSE_CARD_NAME, HouseHeatingCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: HOUSE_CARD_NAME,
    name: 'Fűtés és gázkeret',
    description: 'A gázkeret állása ütemjelölővel, a napi ütem, az aktív fűtési forrás az indoklásával, üzemmód- és évszakváltó, és a gázóra kézi leolvasása.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${HOUSE_CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#e8710a;font-weight:700;border-radius:3px 0 0 3px',
    'color:#e8710a;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0',
  );
  /* eslint-enable no-console */
}
