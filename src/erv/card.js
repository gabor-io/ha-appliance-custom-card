import { CARD_NAME, CARD_VERSION, EDITOR_NAME, PRESETS, SPEEDS } from './const.js';
import { getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listVentilatorDevices } from './entities.js';
import { renderVentilator, updateErvDisplay } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatNumber } from '../shared/format.js';
import { formatClock } from '../shared/format.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_air: true,
  show_pm25: true,
  show_modes: true,
  show_speeds: true,
  show_filter: true,
  show_extra: false,
};

/** Card for the Fisher heat-recovery ventilator behind tuya-local. */
export class FisherErvCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listVentilatorDevices(hass);
    return { type: `custom:${CARD_NAME}`, device: devices[0]?.id };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
  }

  setConfig(config) {
    this._config = { ...DEFAULTS, ...(config || {}) };
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
    // the appliance shows a clock, so keep it ticking between state updates
    this._timer = window.setInterval(() => this._render(), 30000);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
    return this._config?.compact ? 5 : 8;
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

    for (const name of ['header', 'hero', 'alerts', 'modes', 'speeds', 'filter', 'details']) {
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
    const model = buildModel(this._hass, this._config);
    this._model = model;

    if (!model.ok) {
      this._renderEmpty(model, t);
      return;
    }
    this._emptyShown = false;

    this._applyHostClasses(model);
    this._section('header', this._headerHtml(model, t));
    this._heroSection(model, t);
    this._section('alerts', this._alertsHtml(model, t));
    this._section('modes', this._config.show_modes ? this._modesHtml(model, t) : '');
    this._section('speeds', this._config.show_speeds ? this._speedsHtml(model, t) : '');
    this._section('filter', this._config.show_filter ? this._filterHtml(model, t) : '');
    this._section('details', this._detailsHtml(model, t));
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    for (const node of Object.values(this._sections)) {
      node.innerHTML = '';
      node.hidden = false;
    }
    this._sections.header.innerHTML = `
      <div class="empty">
        ${icon('wind')}
        <div>${escapeHtml(t(`ui.${model.reason}`))}</div>
      </div>`;
  }

  /** Replaces a section only when its markup actually changed. */
  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    this._sections[name].hidden = !html;
  }

  _applyHostClasses(model) {
    const classes = ['wrap'];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    if (this._hass.themes?.darkMode) classes.push('dark');
    classes.push(`accent-${this._accent(model)}`);
    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;
  }

  _accent(model) {
    if (!model.available || !model.on) return 'idle';
    if (model.problem?.on) return 'alarm';
    const level = model.co2?.level;
    if (level === 'bad' || level === 'poor') return 'paused';
    return 'running';
  }

  /* ---------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const badges = [];
    if (model.problem?.on) {
      badges.push(`<span class="bad" title="${escapeHtml(t('alert.problem'))}">${icon('error')}</span>`);
    }
    if (model.filter.due) {
      badges.push(`<span class="warn" title="${escapeHtml(t('ui.filter'))}">${icon('filter')}</span>`);
    }

    const label = !model.available
      ? t('ui.offline')
      : model.on
        ? model.preset
          ? t(`preset.${model.preset.key}`)
          : model.presetOption || t('ui.on')
        : t('ui.off');

    return `
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${escapeHtml(model.name || t('card_name'))}</div>
          ${model.model ? `<div class="sub">${escapeHtml(model.model)}</div>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="badges">${badges.join('')}</div>
        <div class="pill">${icon(
          !model.available ? 'offline' : model.on ? 'fan' : 'power',
        )}${escapeHtml(label)}</div>
      </div>`;
  }

  _heroSection(model, t) {
    if (!this._sections.hero.querySelector('.erv')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="erv-wrap" data-action="more-info">${renderVentilator()}</div>
          <div class="status"></div>
        </div>`;
      this._statusNode = this._sections.hero.querySelector('.status');
    }

    const html = this._config.show_air ? this._airHtml(model, t) : '';
    if (this._signatures.air !== html) {
      this._signatures.air = html;
      this._statusNode.innerHTML = html;
    }

    const svg = this._sections.hero.querySelector('.erv');
    if (svg) {
      svg.classList.toggle('running', model.on);
      svg.classList.toggle('off', !model.on);
      svg.classList.toggle('filter-due', model.filter.due);
      // speed 1 drifts, speed 8 races
      const speed = model.speedDigit ?? 1;
      svg.style.setProperty('--flow-duration', `${(3.4 - speed * 0.3).toFixed(2)}s`);
    }

    updateErvDisplay(this._sections.hero, {
      co2: model.co2 ? String(Math.round(model.co2.value)) : '---',
      temp: model.temperature !== null ? `${Math.round(model.temperature)}°C` : '--°C',
      humidity: model.humidity !== null ? `${Math.round(model.humidity)}%` : '--%',
      speed: model.on && model.speedDigit !== null ? String(model.speedDigit) : '-',
      clock: formatClock(new Date(), this._hass),
    });
  }

  _airHtml(model, t) {
    const blocks = [];

    const meter = (key, value, iconName, entityId) => {
      if (!value) return '';
      return `
        <div class="reading" data-action="more-info" data-entity="${escapeHtml(entityId || '')}">
          <div class="top">${icon(iconName)}<span>${escapeHtml(t(`ui.${key}`))}</span>
            <span class="val level-${value.level}"><b>${formatNumber(value.value, 0)}</b><small>${escapeHtml(value.unit)}</small></span>
          </div>
          <div class="meter"><i class="fill-${value.level}" style="width:${Math.round(value.ratio * 100)}%"></i></div>
          <div class="band level-${value.level}">${escapeHtml(t(`level.${value.level}`))}</div>
        </div>`;
    };

    blocks.push(meter('co2', model.co2, 'co2', model.entities.co2));
    if (this._config.show_pm25) {
      blocks.push(meter('pm25', model.pm25, 'pm25', model.entities.pm25));
    }

    const climate = [];
    if (model.temperature !== null) {
      climate.push(`<span class="fact" data-action="more-info" data-entity="${escapeHtml(model.entities.temperature || '')}">
        ${icon('temperature')}<b>${formatNumber(model.temperature, 0)} ${escapeHtml(model.temperatureUnit)}</b></span>`);
    }
    if (model.humidity !== null) {
      climate.push(`<span class="fact" data-action="more-info" data-entity="${escapeHtml(model.entities.humidity || '')}">
        ${icon('water_percent')}<b>${formatNumber(model.humidity, 0)} %</b></span>`);
    }
    if (climate.length) blocks.push(`<div class="climate">${climate.join('')}</div>`);

    return `<div class="air">${blocks.filter(Boolean).join('')}</div>`;
  }

  _alertsHtml(model, t) {
    const items = [];
    if (!model.available) {
      items.push({ severity: 'error', text: t('alert.offline'), iconName: 'offline',
        entityId: model.entities.fan });
    }
    if (model.problem?.on) {
      items.push({
        severity: 'error',
        text: model.problem.code
          ? t('alert.problem_code').replace('{code}', model.problem.code)
          : t('alert.problem'),
        iconName: 'error',
        entityId: model.problem.entityId,
      });
    }
    if (model.filter.days !== null && model.filter.days <= 0) {
      items.push({ severity: 'warning', text: t('alert.filter_over'), iconName: 'filter', entityId: model.filter.entityId });
    } else if (model.filter.due) {
      items.push({
        severity: 'warning',
        text: t('alert.filter_due').replace('{days}', model.filter.days),
        iconName: 'filter',
        entityId: model.filter.entityId,
      });
    }
    if (model.on && (model.co2?.level === 'bad' || model.co2?.level === 'poor')) {
      items.push({
        severity: 'warning',
        text: t('alert.co2_high').replace('{value}', formatNumber(model.co2.value, 0)),
        iconName: 'co2',
        entityId: model.entities.co2,
      });
    }

    if (!items.length) return '';
    return `<div class="alerts">${items
      .map(
        (item) => `
        <div class="alert ${item.severity}" data-action="more-info" data-entity="${escapeHtml(item.entityId || '')}">
          ${icon(item.iconName)}<span>${escapeHtml(item.text)}</span>
        </div>`,
      )
      .join('')}</div>`;
  }

  _modesHtml(model, t) {
    const chips = [];
    // the appliance decides which presets it offers, so follow its list
    for (const option of model.presetOptions) {
      const known = PRESETS.find((entry) => entry.option === option);
      const label = known ? t(`preset.${known.key}`) : option;
      const hint = known ? t(`preset_hint.${known.key}`, '') : '';
      chips.push(`
        <button class="chip" type="button" data-action="preset" data-value="${escapeHtml(option)}"
          aria-pressed="${model.presetOption === option}" ${hint ? `title="${escapeHtml(hint)}"` : ''}
          ${model.on ? '' : 'disabled'}>
          ${icon(known?.icon || 'fan')}<span>${escapeHtml(label)}</span></button>`);
    }

    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.modes'))}</div>
        <div class="chips">${chips.join('')}</div>
        <div class="controls">
          <button class="btn ${model.on || !model.available ? '' : 'primary'}" type="button"
            data-action="power" ${model.available ? '' : 'disabled'}>
            ${icon('power')}<span>${escapeHtml(t(model.on ? 'ui.power_off' : 'ui.power_on'))}</span>
          </button>
        </div>
      </div>`;
  }

  _speedsHtml(model, t) {
    const boxes = SPEEDS.map(({ key, icon: iconName }) => {
      const speed = model.speeds[key];
      if (!speed || speed.value === null || speed.value === undefined) return '';
      const ticks = [];
      for (let step = speed.min; step <= speed.max; step += speed.step) {
        ticks.push(`<i class="${step <= speed.value ? 'on' : ''}"></i>`);
      }
      return `
        <div class="speed-box">
          <div class="label">${icon(iconName)}<span>${escapeHtml(t(`ui.${key}`))}</span></div>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-speed="${key}" data-dir="-1"
              ${speed.value <= speed.min ? 'disabled' : ''}>−</button>
            <div class="value">${formatNumber(speed.value, 0)}</div>
            <button class="step-btn" type="button" data-action="step" data-speed="${key}" data-dir="1"
              ${speed.value >= speed.max ? 'disabled' : ''}>+</button>
            <div class="ticks">${ticks.join('')}</div>
          </div>
        </div>`;
    }).filter(Boolean);

    if (!boxes.length) return '';
    const note =
      model.presetOption && model.presetOption !== 'Manual'
        ? `<div class="note">${icon('info')}<span>${escapeHtml(t('preset_hint.auto'))}</span></div>`
        : '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.speeds'))}</div>
        <div class="speeds">${boxes.join('')}</div>
        ${note}
      </div>`;
  }

  _filterHtml(model, t) {
    const rows = [];
    if (model.filter.days !== null) {
      rows.push(`
        <div class="fact" data-action="more-info" data-entity="${escapeHtml(model.filter.entityId || '')}">
          ${icon('filter')}<span>${escapeHtml(t('ui.filter_left'))}</span>
          <b>${formatNumber(model.filter.days, 0)} ${escapeHtml(t('ui.days'))}</b></div>`);
    }
    if (model.filter.reset) {
      rows.push(`
        <button class="chip" type="button" data-action="filter-reset">
          ${icon('reset')}<span>${escapeHtml(t('ui.filter_reset'))}</span></button>`);
    }

    const lifespan = model.filter.lifespan;
    const options = lifespan
      ? lifespan.options
          .map(
            (option) => `
          <button class="chip" type="button" data-action="lifespan" data-value="${escapeHtml(option)}"
            aria-pressed="${lifespan.state === option}">${escapeHtml(this._lifespanLabel(option, t))}</button>`,
          )
          .join('')
      : '';

    if (!rows.length && !options) return '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.filter'))}</div>
        ${rows.length ? `<div class="facts">${rows.join('')}</div>` : ''}
        ${options ? `<div class="chips">${options}</div>` : ''}
      </div>`;
  }

  /** "180 days" as the appliance sends it -> "180 nap" on a Hungarian card. */
  _lifespanLabel(option, t) {
    const match = /^(\d+)\s*days?$/i.exec(String(option).trim());
    return match ? `${match[1]} ${t('ui.days')}` : option;
  }

  _detailsHtml(model, t) {
    if (!this._config.show_extra || !model.extra.length) return '';
    const items = model.extra
      .map(
        (item) => `
        <div class="detail" data-action="more-info" data-entity="${escapeHtml(item.entityId)}">
          <span class="k">${escapeHtml(item.name)}</span>
          <span class="v">${icon('info')}${escapeHtml(String(item.state ?? '–'))}</span>
        </div>`,
      )
      .join('');
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.other'))}</div>
        <div class="details">${items}</div>
      </div>`;
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const { action, entity, value, speed, dir } = target.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity || model?.entities?.fan);
        break;
      case 'power':
        this._haptic('medium');
        this._call('fan', model.on ? 'turn_off' : 'turn_on', { entity_id: model.entities.fan });
        break;
      case 'preset':
        this._haptic('light');
        this._call('fan', 'set_preset_mode', { entity_id: model.entities.fan, preset_mode: value });
        break;
      case 'step':
        this._step(speed, Number(dir));
        break;
      case 'lifespan':
        this._haptic('light');
        this._call('select', 'select_option', {
          entity_id: model.filter.lifespan?.entityId,
          option: value,
        });
        break;
      case 'filter-reset':
        this._haptic('medium');
        this._call('button', 'press', { entity_id: model.filter.reset });
        break;
      default:
        break;
    }
  }

  _step(key, direction) {
    const speed = this._model?.speeds?.[key];
    if (!speed || speed.value === null) return;
    const next = Math.min(speed.max, Math.max(speed.min, speed.value + direction * speed.step));
    if (next === speed.value) return;
    this._haptic('light');
    this._call('number', 'set_value', { entity_id: speed.entityId, value: next });
  }

  _call(domain, service, data) {
    if (!data.entity_id) return Promise.resolve();
    return this._hass.callService(domain, service, data);
  }

  _moreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }),
    );
  }

  _haptic(type) {
    this.dispatchEvent(new CustomEvent('haptic', { detail: type, bubbles: true, composed: true }));
  }
}

export function registerCard() {
  if (customElements.get(CARD_NAME)) return;
  customElements.define(CARD_NAME, FisherErvCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Fisher ERV Card',
    description:
      'Card for Tuya heat-recovery ventilators: CO2 and PM2.5, temperature, humidity, fan speeds and the filter.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#00796b;font-weight:700;border-radius:3px 0 0 3px',
    'color:#00796b;background:#e0f2f1;font-weight:700;border-radius:0 3px 3px 0',
  );
}
