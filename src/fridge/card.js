import { CARD_NAME, CARD_VERSION, EDITOR_NAME, TEMP_PRESETS, ZONE_SELECTS, ZONE_SWITCHES } from './const.js';
import { getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listFridgeDevices } from './entities.js';
import { renderFridge, updateFridgeDisplay } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatNumber } from '../shared/format.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_zones: true,
  show_modes: true,
  show_selects: true,
  show_details: true,
  show_extra: false,
};

const SWITCH_ICONS = { supercool: 'snowflake', superfrost: 'frost', nightmode: 'night', partymode: 'party' };
const SELECT_ICONS = { icemaker: 'ice', hydrobreeze: 'mist', biofresh: 'leaf' };

/** Status card for Liebherr fridges and freezers (the `liebherr` integration). */
export class LiebherrFridgeCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listFridgeDevices(hass);
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

  getCardSize() {
    return this._config?.compact ? 4 : 7;
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

    for (const name of ['header', 'hero', 'alerts', 'zones', 'modes', 'selects', 'details']) {
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
    this._section('zones', this._config.show_zones ? this._zonesHtml(model, t) : '');
    this._section('modes', this._config.show_modes ? this._modesHtml(model, t) : '');
    this._section('selects', this._config.show_selects ? this._selectsHtml(model, t) : '');
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
        ${icon('fridge')}
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
    if (model.boosting) return 'running';
    if (model.nightMode) return 'idle';
    return model.cooling ? 'running' : 'ready';
  }

  _status(model) {
    if (model.zones.some((zone) => zone.switches.superfrost?.on)) return 'superfrost';
    if (model.zones.some((zone) => zone.switches.supercool?.on)) return 'supercool';
    if (model.partyMode) return 'party';
    if (model.nightMode) return 'night';
    return model.cooling ? 'cooling' : 'normal';
  }

  /* ---------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const badges = [];
    if (model.doorOpen) {
      badges.push(`<span class="warn" title="${escapeHtml(t('ui.door_open'))}">${icon('door')}</span>`);
    }
    if (model.nightMode) badges.push(`<span title="${escapeHtml(t('mode.nightmode'))}">${icon('night')}</span>`);
    if (model.partyMode) badges.push(`<span title="${escapeHtml(t('mode.partymode'))}">${icon('party')}</span>`);
    if (model.light?.on) badges.push(`<span title="${escapeHtml(t('mode.light'))}">${icon('bulb')}</span>`);

    const status = this._status(model);
    return `
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${escapeHtml(model.name || t('card_name'))}</div>
          ${model.model ? `<div class="sub">${escapeHtml(model.model)}</div>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="badges">${badges.join('')}</div>
        <div class="pill">${icon(status === 'night' ? 'night' : status === 'party' ? 'party' : 'snowflake')}
          ${escapeHtml(t(`status.${status}`))}</div>
      </div>`;
  }

  /** The appliance reports no alarms, so the only alert is an open door. */
  _alertsHtml(model, t) {
    if (!model.doorOpen) return '';
    const entityId = model.door?.entityId || model.zones[model.openDoors[0]]?.door?.entityId || '';
    const zoneLabel =
      model.zones.length > 1 && model.openDoors.length
        ? ` · ${t(`zone.${model.zones[model.openDoors[0]].position || 'single'}`)}`
        : '';
    return `
      <div class="alerts">
        <div class="alert pulse" data-action="more-info" data-entity="${escapeHtml(entityId)}">
          ${icon('door')}<span>${escapeHtml(t('alert.door_open') + zoneLabel)}</span>
        </div>
      </div>`;
  }

  _heroSection(model, t) {
    // the illustration is built once so its CSS animations never restart
    const zoneCount = model.zones.length;
    if (!this._sections.hero.querySelector('.fridge') || this._zoneCount !== zoneCount) {
      this._zoneCount = zoneCount;
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="fridge-wrap" data-action="more-info">${renderFridge(zoneCount)}</div>
          <div class="status"></div>
        </div>`;
      this._statusNode = this._sections.hero.querySelector('.status');
      this._signatures.status = undefined;
    }

    const html = this._statusHtml(model, t);
    if (this._signatures.status !== html) {
      this._signatures.status = html;
      this._statusNode.innerHTML = html;
    }

    const svg = this._sections.hero.querySelector('.fridge');
    if (svg) {
      svg.classList.toggle('cooling', model.cooling);
      svg.classList.toggle('boost', model.boosting);
      svg.classList.toggle('night', model.nightMode);
      svg.classList.toggle('light-on', !!model.light?.on);
      svg.classList.toggle('door-open', model.doorOpen);
      svg.querySelectorAll('.door').forEach((node) => {
        node.classList.toggle('open', model.openDoors.includes(Number(node.dataset.zone)));
      });
    }
    const lead = model.zones[0];
    updateFridgeDisplay(
      this._sections.hero,
      lead?.current !== null && lead?.current !== undefined ? `${formatNumber(lead.current, 0)}°` : '--',
    );
  }

  _statusHtml(model, t) {
    const lead = model.zones[0];
    const lines = [];

    if (lead?.current !== null && lead?.current !== undefined) {
      const aim =
        lead.target !== null
          ? `<span class="aim">${icon('target')}${escapeHtml(t('ui.target'))} ${formatNumber(lead.target, 0)} ${escapeHtml(lead.unit)}</span>`
          : '';
      lines.push(`
        <div class="reading">
          <span class="value">${formatNumber(lead.current, 1)}</span>
          <span class="unit">${escapeHtml(lead.unit)}</span>
          ${aim}
        </div>`);
    }

    const hint = this._zoneHint(lead, t);
    if (hint) lines.push(`<div class="phase-text">${escapeHtml(hint)}</div>`);

    const facts = [];
    for (const zone of model.zones) {
      for (const [key, value] of Object.entries(zone.switches)) {
        if (value?.on) {
          facts.push(
            `<span class="fact">${icon(SWITCH_ICONS[key])}${escapeHtml(t(`mode.${key}`))}${
              model.zones.length > 1 ? ` · ${escapeHtml(t(`zone.${zone.position || 'single'}`))}` : ''
            }</span>`,
          );
        }
      }
    }
    if (model.nightMode) facts.push(`<span class="fact">${icon('night')}${escapeHtml(t('mode.nightmode'))}</span>`);
    if (facts.length) lines.push(`<div class="facts">${facts.join('')}</div>`);

    return lines.join('');
  }

  _zoneHint(zone, t) {
    if (!zone || zone.current === null || zone.target === null) return '';
    if (zone.switches.supercool?.on) return t('ui.boosting_cool');
    if (zone.switches.superfrost?.on) return t('ui.boosting_frost');
    if (zone.atTarget) return t('ui.at_target');
    const diff = zone.current - zone.target;
    return diff > 0
      ? t('ui.above_target').replace('{diff}', formatNumber(diff, 1))
      : t('ui.below_target').replace('{diff}', formatNumber(-diff, 1));
  }

  _zonesHtml(model, t) {
    const blocks = model.zones.map((zone, index) => {
      const label = t(`zone.${zone.position || 'single'}`);
      const multi = model.zones.length > 1;
      const now =
        multi && zone.current !== null
          ? `<span class="now"><b>${formatNumber(zone.current, 1)}</b> ${escapeHtml(zone.unit)}</span>`
          : '';
      const setpoint = zone.setpoint;
      const stepper = setpoint
        ? `
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-zone="${index}" data-dir="-1"
              ${setpoint.value !== null && setpoint.value <= setpoint.min ? 'disabled' : ''}>−</button>
            <div class="target">${setpoint.value !== null ? formatNumber(setpoint.value, 0) : '–'}<small>${escapeHtml(setpoint.unit)}</small></div>
            <button class="step-btn" type="button" data-action="step" data-zone="${index}" data-dir="1"
              ${setpoint.value !== null && setpoint.value >= setpoint.max ? 'disabled' : ''}>+</button>
            <div class="spacer"></div>
            <div class="chips">${this._presetsHtml(zone, index)}</div>
          </div>`
        : '';
      const hint = multi ? this._zoneHint(zone, t) : '';

      return `
        <div class="zone ${zone.atTarget ? 'at-target' : ''}">
          <div class="zone-head">${icon('temperature')}<span>${escapeHtml(multi ? label : t('ui.setpoint'))}</span>${now}</div>
          ${stepper}
          ${hint ? `<div class="hint">${escapeHtml(hint)}</div>` : ''}
        </div>`;
    });

    if (!blocks.length) return '';
    return `
      <div class="section">
        ${model.zones.length > 1 ? `<div class="section-title">${escapeHtml(t('ui.zones'))}</div>` : ''}
        <div class="zones">${blocks.join('')}</div>
      </div>`;
  }

  /** Quick setpoints, limited to what this zone accepts. */
  _presetsHtml(zone, index) {
    const setpoint = zone.setpoint;
    if (!setpoint) return '';
    return TEMP_PRESETS.filter((value) => value >= setpoint.min && value <= setpoint.max)
      .map(
        (value) => `
        <button class="chip" type="button" data-action="set" data-zone="${index}" data-value="${value}"
          aria-pressed="${setpoint.value === value}">${value}°</button>`,
      )
      .join('');
  }

  _modesHtml(model, t) {
    const chips = [];
    model.zones.forEach((zone, index) => {
      for (const key of Object.keys(ZONE_SWITCHES)) {
        const item = zone.switches[key];
        if (!item) continue;
        const label =
          model.zones.length > 1
            ? `${t(`mode.${key}`)} · ${t(`zone.${zone.position || 'single'}`)}`
            : t(`mode.${key}`);
        chips.push(`
          <button class="chip" type="button" data-action="toggle" data-entity="${escapeHtml(item.entityId)}"
            aria-pressed="${item.on === true}" title="${escapeHtml(t(`mode_hint.${key}`, ''))}">
            ${icon(SWITCH_ICONS[key])}<span>${escapeHtml(label)}</span></button>`);
      }
      void index;
    });

    for (const key of ['nightmode', 'partymode']) {
      const item = model.modes[key];
      if (!item) continue;
      chips.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${escapeHtml(item.entityId)}"
          aria-pressed="${item.on === true}" title="${escapeHtml(t(`mode_hint.${key}`, ''))}">
          ${icon(SWITCH_ICONS[key])}<span>${escapeHtml(t(`mode.${key}`))}</span></button>`);
    }

    if (model.light) {
      chips.push(`
        <button class="chip" type="button" data-action="toggle" data-entity="${escapeHtml(model.light.entityId)}"
          aria-pressed="${model.light.on === true}">
          ${icon('bulb')}<span>${escapeHtml(t('mode.light'))}</span></button>`);
    }

    if (!chips.length) return '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.modes'))}</div>
        <div class="chips">${chips.join('')}</div>
      </div>`;
  }

  _selectsHtml(model, t) {
    const blocks = [];
    for (const zone of model.zones) {
      for (const key of Object.keys(ZONE_SELECTS)) {
        const item = zone.selects[key];
        if (!item || !item.options.length) continue;
        const label =
          model.zones.length > 1
            ? `${t(`select.${key}`)} · ${t(`zone.${zone.position || 'single'}`)}`
            : t(`select.${key}`);
        const chips = item.options
          .map(
            (option) => `
            <button class="chip" type="button" data-action="select" data-entity="${escapeHtml(item.entityId)}"
              data-value="${escapeHtml(option)}" aria-pressed="${item.state === option}">
              ${escapeHtml(t(`option.${option}`, option))}</button>`,
          )
          .join('');
        blocks.push(`
          <div class="section">
            <div class="section-title">${icon(SELECT_ICONS[key])} ${escapeHtml(label)}</div>
            <div class="chips">${chips}</div>
          </div>`);
      }
    }
    return blocks.join('');
  }

  _detailsHtml(model, t) {
    const items = [];
    const push = (key, value, iconName) => {
      if (value === null || value === undefined || value === '') return;
      items.push(`
        <div class="detail">
          <span class="k">${escapeHtml(t(`ui.${key}`, key))}</span>
          <span class="v">${icon(iconName)}${escapeHtml(String(value))}</span>
        </div>`);
    };

    if (this._config.show_details) {
      if (model.zones.length > 1) push('zone_count', model.zones.length, 'fridge');
      for (const zone of model.zones) {
        if (zone.autodoor?.state) {
          push('door', t(zone.autodoor.state === 'open' ? 'ui.open' : 'ui.closed'), 'door');
        }
      }
      if (model.light?.brightness !== null && model.light?.brightness !== undefined) {
        push('light_level', `${Math.round((model.light.brightness / 255) * 100)} %`, 'bulb');
      }
    }

    if (this._config.show_extra) {
      for (const item of model.extra) {
        items.push(`
          <div class="detail" data-action="more-info" data-entity="${escapeHtml(item.entityId)}">
            <span class="k">${escapeHtml(item.name)}</span>
            <span class="v">${icon('info')}${escapeHtml(String(item.state ?? '–'))}</span>
          </div>`);
      }
    }

    if (!items.length) return '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.details'))}</div>
        <div class="details">${items.join('')}</div>
      </div>`;
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const { action, entity, value, zone, dir } = target.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity || model?.zones?.[0]?.entityIds?.temp);
        break;
      case 'toggle':
        this._haptic('light');
        this._call(entity.split('.')[0], 'toggle', { entity_id: entity });
        break;
      case 'select':
        this._haptic('light');
        this._call('select', 'select_option', { entity_id: entity, option: value });
        break;
      case 'step':
        this._step(Number(zone), Number(dir));
        break;
      case 'set':
        this._setTemperature(Number(zone), Number(value));
        break;
      default:
        break;
    }
  }

  _step(index, direction) {
    const setpoint = this._model?.zones?.[index]?.setpoint;
    if (!setpoint) return;
    const current = setpoint.value ?? setpoint.min;
    const next = Math.min(setpoint.max, Math.max(setpoint.min, current + direction * setpoint.step));
    if (next === current) return;
    this._setTemperature(index, next);
  }

  _setTemperature(index, value) {
    const zone = this._model?.zones?.[index];
    if (!zone?.setpoint || !zone.entityIds.setpoint) return;
    const bounded = Math.min(zone.setpoint.max, Math.max(zone.setpoint.min, value));
    this._haptic('light');
    this._call('number', 'set_value', { entity_id: zone.entityIds.setpoint, value: bounded });
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
  customElements.define(CARD_NAME, LiebherrFridgeCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Liebherr Fridge Card',
    description:
      'Card for Liebherr fridges and freezers: temperature per zone, SuperCool / SuperFrost, night mode and BioFresh.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#0b6ea8;font-weight:700;border-radius:3px 0 0 3px',
    'color:#0b6ea8;background:#e1f3fb;font-weight:700;border-radius:0 3px 3px 0',
  );
}
