import { CARD_NAME, CARD_VERSION, EDITOR_NAME, MODES } from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildModel, stateKey, subKey } from './model.js';
import { listHeaterDevices } from './entities.js';
import { applyPanel, renderDefs, renderPanel } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatDecimal, formatNumber } from '../shared/format.js';
import { openDuration } from '../shared/openings.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_art: true,
  show_readings: true,
  show_modes: true,
  show_presets: true,
  show_setpoint: true,
  show_extras: true,
  show_openings: true,
};

let uidCounter = 0;

/** Card for an AENO infrared panel heater behind tuya-local. */
export class AenoHeaterCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listHeaterDevices(hass);
    return { type: `custom:${CARD_NAME}`, device: devices[0]?.id };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
    uidCounter += 1;
    this._uid = `aeno${uidCounter}`;
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
    return this._config?.compact ? 4 : 5;
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
    wrap.insertAdjacentHTML('beforeend', renderDefs(this._uid));

    for (const name of ['top', 'hero', 'alerts', 'modes', 'buttons']) {
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

    this._applyWrapClasses(model);
    this._section('top', this._topHtml(model, t));
    this._heroSection(model, t);
    this._section('alerts', this._alertsHtml(model, t));
    this._section('modes', this._config.show_modes ? this._segHtml(model, t) : '');
    this._section('buttons', this._buttonsHtml(model, t));
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    /* no panel, no accent: the blue of the default theme would read as a
       state the card is in, and it is not in any */
    this._wrap.style.setProperty('--ap-accent', 'var(--ae-off)');
    for (const [name, node] of Object.entries(this._sections)) {
      node.innerHTML = '';
      node.hidden = name !== 'top';
    }
    this._sections.top.innerHTML = `
      <div class="empty">
        ${icon('radiator')}
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

  _applyWrapClasses(model) {
    const classes = ['wrap'];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    if (this._hass.themes?.darkMode) classes.push('dark');
    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;

    const colour = (MODES.find((mode) => mode.key === (model.on ? 'heat' : 'off')) || MODES[0]).colour;
    if (this._wrap.style.getPropertyValue('--ap-accent') !== colour) {
      this._wrap.style.setProperty('--ap-accent', colour);
    }
  }

  /* ---------------------------- header ------------------------------ */

  _topHtml(model, t) {
    /* the badge is the only place an open window shows while the panel is
       off: there is no alert then, and silence would read as shut */
    const badge = model.draughty ? '' : this._openBadge(model, t);
    return `
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${escapeHtml(model.name)}</div>
          <div class="sub">${escapeHtml(t('ui.device'))}${badge}</div>
        </div>
        <div class="spacer"></div>
        <div class="ind">${this._readingsHtml(model, t)}</div>
      </div>`;
  }

  _readingsHtml(model, t) {
    if (!this._config.show_readings) return '';
    const parts = [];
    const reading = (iconName, value, digits, unit, entityId, extra = '') => {
      if (value === null || value === undefined) return;
      parts.push(`
        <span data-action="more-info" data-entity="${escapeHtml(entityId || '')}">
          ${icon(iconName)}<b>${this._decimal(value, digits)} ${escapeHtml(unit)}</b>${extra}
        </span>`);
    };

    /* the panel's own thermometer sits on the heated plate on the wall; with a
       room sensor configured the card leads with that and keeps both visible */
    const raw =
      model.external && model.inside !== null
        ? `<span class="raw">${escapeHtml(t('ui.device_reads'))} ${this._decimal(model.inside, 0)}</span>`
        : '';
    reading('indoor', model.measured, 1, model.unit, model.entities.room || model.entityId, raw);
    reading('water_percent', model.humidity, 0, '%', model.entities.humidity);
    reading('temperature', model.panelTemp, 0, model.unit, model.entities.panel);
    reading('energy', model.power, 0, model.powerUnit, model.entities.power);
    reading('counter', model.energy, 1, model.energyUnit, model.entities.energy);
    return parts.join('');
  }

  /**
   * The little "nyitva" pill.
   *
   * Muted when the panel is not heating: the window is still open, but nothing
   * is being paid for it, so it is a note and not a warning.
   */
  _openBadge(model, t) {
    if (!this._config.show_openings) return '';
    const openings = model.openings;
    if (openings.none || !openings.open) return '';
    /* the count is of windows, not contacts: a tilt-and-turn window swung
       fully open trips both of its contacts and is still one window */
    const label =
      openings.open > 1
        ? fill(t('ui.windows_open'), { count: openings.open })
        : t(openings.tilted ? 'ui.window_tilted' : 'ui.window_open');
    return ` <span class="open-badge${model.draughty ? '' : ' calm'}">${icon(
      'window_open',
    )}${escapeHtml(label)}</span>`;
  }

  /* ----------------------------- hero ------------------------------- */

  _heroSection(model, t) {
    const wantArt = this._config.show_art;
    if (!this._sections.hero.querySelector('.hero')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="art" data-action="more-info">${renderPanel(this._uid)}</div>
          <div class="status"></div>
          <div class="dial"></div>
        </div>`;
      this._heroNode = this._sections.hero.querySelector('.hero');
      this._statusNode = this._sections.hero.querySelector('.status');
      this._dialNode = this._sections.hero.querySelector('.dial');
    }

    this._heroNode.classList.toggle('no-art', !wantArt);
    const art = this._sections.hero.querySelector('.art');
    art.hidden = !wantArt;
    if (wantArt) applyPanel(art.querySelector('.panel'), model, this._config.show_setpoint);

    const state = this._localise(stateKey(model));
    const sub = this._localise(subKey(model));
    const statusHtml = `
      <div class="mode-name">${escapeHtml(t(`mode_long.${model.on ? 'heat' : 'off'}`))}</div>
      <div class="state">${escapeHtml(fill(t(state.key), state))}</div>
      <div class="state-sub">${escapeHtml(sub.key ? fill(t(sub.key), sub) : '')}</div>`;
    if (this._signatures.status !== statusHtml) {
      this._signatures.status = statusHtml;
      this._statusNode.innerHTML = statusHtml;
    }

    const dialHtml = this._dialHtml(model);
    if (this._signatures.dial !== dialHtml) {
      this._signatures.dial = dialHtml;
      this._dialNode.innerHTML = dialHtml;
    }
  }

  _dialHtml(model) {
    const value = model.target;
    const disabled = !model.available || value === null;
    const up = `<button type="button" data-action="temp" data-dir="1"
      ${disabled || value >= model.maxTemp ? 'disabled' : ''} aria-label="+">${icon('chevron_up')}</button>`;
    const down = `<button type="button" data-action="temp" data-dir="-1"
      ${disabled || value <= model.minTemp ? 'disabled' : ''} aria-label="−">${icon('chevron')}</button>`;
    const big = `<div class="big">${value === null ? '––' : this._decimal(value, 1)}<small> ${escapeHtml(model.unit)}</small></div>`;
    return `${big}<div class="updown">${up}${down}</div>`;
  }

  /* ---------------------------- alerts ------------------------------ */

  /**
   * The alert strip, in the order the reader should act on it: a window the
   * panel is heating, then manual mode, then the countdown and the lock.
   */
  _alertsHtml(model, t) {
    const items = [];

    if (this._config.show_openings && model.draughty) {
      const duration = this._ago(model.openings.openFor, t);
      /* a window on the latch wastes just as much, but saying "open" sends
         the reader looking for one standing wide */
      const tilted = model.openings.longest?.tilted;
      items.push([
        '',
        'window_open',
        fill(t(tilted ? 'alert.window_tilted' : 'alert.window_open'), {
          name: model.openings.longest?.name || t('ui.window'),
          duration,
        }),
      ]);
    }

    /* Constant is the one trap this panel has: the element keeps running after
       the setpoint is reached, so a panel left in it heats all day */
    if (model.continuous) items.push(['', 'manual', t('alert.continuous')]);

    if (model.on && model.timer.set && model.timer.remaining !== null) {
      items.push([
        'info',
        'timer',
        fill(t('alert.timer'), { remaining: this._ago(model.timer.remaining * 60, t) }),
      ]);
    }

    if (model.locked) items.push(['info', 'lock', t('alert.locked')]);

    if (!items.length) return '';
    const rows = items
      .map(
        ([kind, iconName, text]) =>
          `<div class="alert${kind ? ` ${kind}` : ''}">${icon(iconName)}<span>${escapeHtml(text)}</span></div>`,
      )
      .join('');
    return `<div class="alerts">${rows}</div>`;
  }

  _ago(seconds, t) {
    return openDuration(seconds, t('ui.minute_short'), t('ui.hour_short'));
  }

  /** A number in the reader's own locale: a Hungarian dashboard wants 21,5. */
  _decimal(value, digits = 1) {
    return formatDecimal(value, this._hass, digits);
  }

  /* the status keys carry raw numbers, which have to be written the way the
     reader's locale writes them before they are substituted into the text */
  _localise(entry) {
    const out = { ...entry };
    if (typeof out.temp === 'number') out.temp = this._decimal(out.temp, 1);
    if (typeof out.diff === 'number') out.diff = this._decimal(out.diff, 1);
    return out;
  }

  /* --------------------------- controls ----------------------------- */

  /** On and off, as a two-segment bar. */
  _segHtml(model, t) {
    const available = model.modes?.length ? model.modes : MODES.map((mode) => mode.key);
    const buttons = MODES.filter((mode) => mode.key === 'off' || available.includes(mode.key))
      .map((mode) => {
        /* with the panel unreachable neither segment is pressed: "off" would
           claim a state the card cannot actually see */
        const pressed = model.available && (mode.key === 'off' ? !model.on : model.on);
        return `
        <button type="button" class="${mode.key === 'off' ? 'power' : ''}"
          data-action="mode" data-value="${mode.key}" aria-pressed="${pressed}"
          ${model.available ? '' : 'disabled'}>
          ${icon(mode.icon)}<span>${escapeHtml(t(`mode.${mode.key}`))}</span>
        </button>`;
      })
      .join('');
    return `<div class="seg">${buttons}</div>`;
  }

  /**
   * The heating mode, the child lock and the element limit.
   *
   * All three only exist with the full device profile, so the row disappears
   * entirely on the stock one rather than showing dead controls.
   */
  _buttonsHtml(model, t) {
    const buttons = [];

    if (this._config.show_presets) {
      for (const preset of model.presets) {
        buttons.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${preset.key}"
            aria-pressed="${preset.on}" ${model.on ? '' : 'disabled'}>
            ${icon(preset.icon)}${escapeHtml(t(`preset.${preset.key}`))}
          </button>`);
      }
    }

    if (this._config.show_extras) {
      if (model.locked !== null) {
        buttons.push(`
          <button type="button" class="ghost" data-action="lock" aria-pressed="${model.locked}"
            ${model.available ? '' : 'disabled'}>
            ${icon(model.locked ? 'lock' : 'lock_open')}${escapeHtml(t('ui.lock'))}
          </button>`);
      }

      /* the countdown is off plus 1 to 24 hours, which is a list no card
         should carry - but cancelling a running one is a single tap, and that
         is the half people actually want from a dashboard */
      if (model.timer.set && model.timer.entityId) {
        buttons.push(`
          <button type="button" class="ghost" data-action="timer-cancel"
            ${model.available ? '' : 'disabled'}>
            ${icon('timer')}${escapeHtml(t('ui.timer_cancel'))}
          </button>`);
      }

      if (model.limit) {
        const { value, min, max, unit } = model.limit;
        buttons.push(`
          <span class="limit">
            ${escapeHtml(t('ui.limit'))} <b>${formatNumber(value, 0)} ${escapeHtml(unit)}</b>
            <button type="button" data-action="limit" data-dir="-1"
              ${!model.available || value <= min ? 'disabled' : ''} aria-label="−">${icon('chevron')}</button>
            <button type="button" data-action="limit" data-dir="1"
              ${!model.available || value >= max ? 'disabled' : ''} aria-label="+">${icon('chevron_up')}</button>
          </span>`);
      }
    }

    if (!buttons.length) return '';
    return `<div class="btnrow">${buttons.join('')}</div>`;
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const node = ev.target.closest('[data-action]');
    if (!node || node.hasAttribute('disabled')) return;
    const { action, entity, value, dir } = node.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity || model?.entityId);
        break;
      case 'mode':
        this._haptic(value === 'off' ? 'medium' : 'light');
        this._climate('set_hvac_mode', { entity_id: model.entityId, hvac_mode: value });
        break;
      case 'preset':
        this._haptic('light');
        /* unlike a boost, neither mode is a release state: the panel is always
           in one of the two, so a pressed button is not a toggle to "none" */
        if (node.getAttribute('aria-pressed') !== 'true') {
          this._climate('set_preset_mode', { entity_id: model.entityId, preset_mode: value });
        }
        break;
      case 'timer-cancel':
        this._haptic('medium');
        this._hass.callService('select', 'select_option', {
          entity_id: model.timer.entityId,
          option: 'cancel',
        });
        break;
      case 'lock':
        this._haptic('medium');
        this._hass.callService('lock', model.locked ? 'unlock' : 'lock', {
          entity_id: model.entities.lock,
        });
        break;
      case 'temp':
        this._stepTemperature(Number(dir));
        break;
      case 'limit':
        this._stepLimit(Number(dir));
        break;
      default:
        break;
    }
  }

  _stepTemperature(direction) {
    const model = this._model;
    if (!model || model.target === null) return;
    const step = model.targetStep || 1;
    const next = Math.min(
      model.maxTemp,
      Math.max(model.minTemp, Math.round((model.target + direction * step) * 10) / 10),
    );
    if (next === model.target) return;
    this._haptic('light');
    this._climate('set_temperature', { entity_id: model.entityId, temperature: next });
  }

  _stepLimit(direction) {
    const limit = this._model?.limit;
    if (!limit || !Number.isFinite(limit.value)) return;
    const next = Math.min(limit.max, Math.max(limit.min, limit.value + direction * (limit.step || 5)));
    if (next === limit.value) return;
    this._haptic('light');
    this._hass.callService('number', 'set_value', {
      entity_id: limit.entityId,
      value: next,
    });
  }

  _climate(service, data) {
    if (!data.entity_id) return Promise.resolve();
    return this._hass.callService('climate', service, data);
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
  customElements.define(CARD_NAME, AenoHeaterCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'AENO Heater Card',
    description:
      'Card for AENO infrared panel heaters behind tuya-local: the panel drawn with the setpoint etched on it, radiated heat scaled to the measured surface temperature, heating mode, child lock, element limit and window contacts.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#ef6c00;font-weight:700;border-radius:3px 0 0 3px',
    'color:#ef6c00;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0',
  );
}
