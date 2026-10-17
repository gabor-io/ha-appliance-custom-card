import { CARD_NAME, CARD_VERSION, EDITOR_NAME, MODES } from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildModel, stateKey, subKey } from './model.js';
import { listClimateDevices } from './entities.js';
import { applyUnit, renderDefs, renderMini, renderUnit } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatNumber } from '../shared/format.js';
import { openDuration } from '../shared/openings.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_art: true,
  show_readings: true,
  show_modes: true,
  show_fan: true,
  show_presets: true,
  show_all_swing: false,
  show_openings: true,
};

let uidCounter = 0;

/** Card for a Daikin air conditioner, or for a group of them. */
export class DaikinAcCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listClimateDevices(hass);
    return { type: `custom:${CARD_NAME}`, device: devices[0]?.id };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._rows = new Map();
    this._open = new Set();
    this._built = false;
    uidCounter += 1;
    this._uid = `daikin${uidCounter}`;
  }

  setConfig(config) {
    this._config = { ...DEFAULTS, ...(config || {}) };
    this._signatures = {};
    this._rows.clear();
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
    if (this._model?.isGroup) return 4 + (this._model.units?.length || 0);
    return this._config?.compact ? 4 : 6;
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

    for (const name of ['top', 'hero', 'alerts', 'modes', 'fan', 'buttons', 'units']) {
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
    if (model.isGroup) this._renderGroup(model, t);
    else this._renderSingle(model, t);
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    this._rows.clear();
    for (const [name, node] of Object.entries(this._sections)) {
      node.innerHTML = '';
      node.hidden = name !== 'top';
    }
    this._sections.top.innerHTML = `
      <div class="empty">
        ${icon('ac')}
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

    const colour = this._accent(model.isGroup ? (model.running ? model.mode : 'off') : (model.on ? model.mode : 'off'));
    if (this._wrap.style.getPropertyValue('--ap-accent') !== colour) {
      this._wrap.style.setProperty('--ap-accent', colour);
    }
  }

  _accent(mode) {
    return (MODES.find((entry) => entry.key === mode) || MODES[0]).colour;
  }

  /* --------------------------- single unit -------------------------- */

  _renderSingle(unit, t) {
    this._section('top', this._topHtml(unit, t));
    this._heroSection(unit, t);
    this._section('alerts', this._alertsHtml(unit, t));
    this._section('modes', this._config.show_modes ? this._segHtml(unit, t) : '');
    this._section('fan', this._config.show_fan ? this._fanHtml(unit, t) : '');
    this._section('buttons', this._buttonsHtml(unit, t));
    this._section('units', '');
  }

  _topHtml(model, t) {
    /* on a single unit the badge is the only place an open window shows while
       the unit is off: there is no alert then, and silence would read as shut */
    const sub = model.isGroup
      ? `${escapeHtml(fill(t('group.unit_count'), model))} · ${escapeHtml(model.entityId)}`
      : `Daikin${model.draughty ? '' : this._openBadge(model, t)}`;
    return `
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${escapeHtml(model.name)}</div>
          <div class="sub">${sub}</div>
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
          ${icon(iconName)}<b>${formatNumber(value, digits)} ${escapeHtml(unit)}</b>${extra}
        </span>`);
    };

    if (model.isGroup) {
      reading('indoor', model.measured, 1, model.unit, '', `<span class="raw">${escapeHtml(t('group.average'))}</span>`);
      reading('outdoor', model.outside, 0, model.unit, '');
      reading('energy', model.power, 0, model.powerUnit, '');
      return parts.join('');
    }

    // the unit's own thermometer sits up on the wall; when a room sensor is
    // configured the card leads with that and keeps the unit's reading visible
    const raw =
      model.external && model.inside !== null
        ? `<span class="raw">${escapeHtml(t('ui.device_reads'))} ${formatNumber(model.inside, 0)}</span>`
        : '';
    reading('indoor', model.measured, 1, model.unit, model.entities.room || model.entities.inside, raw);
    reading('water_percent', model.humidity, 0, '%', model.entities.humidity);
    reading('outdoor', model.outside, 0, model.unit, model.entities.outside);
    reading('energy', model.power, 0, model.powerUnit, model.entities.power);
    reading('counter', model.energy, 1, model.energyUnit, model.entities.energy);
    return parts.join('');
  }

  _heroSection(unit, t) {
    const wantArt = this._config.show_art;
    if (!this._sections.hero.querySelector('.hero')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="art" data-action="more-info">${renderUnit(this._uid)}</div>
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
    if (wantArt) applyUnit(art.querySelector('.ac'), unit);

    const state = stateKey(unit);
    const sub = subKey(unit);
    const statusHtml = `
      <div class="mode-name">${escapeHtml(t(`mode_long.${unit.on ? unit.mode : 'off'}`, unit.mode))}</div>
      <div class="state">${escapeHtml(fill(t(state.key), state))}</div>
      <div class="state-sub">${escapeHtml(sub.key ? fill(t(sub.key), sub) : '')}</div>`;
    if (this._signatures.status !== statusHtml) {
      this._signatures.status = statusHtml;
      this._statusNode.innerHTML = statusHtml;
    }

    const dialHtml = this._dialHtml(unit);
    if (this._signatures.dial !== dialHtml) {
      this._signatures.dial = dialHtml;
      this._dialNode.innerHTML = dialHtml;
    }
  }

  _dialHtml(target, small = false) {
    const value = target.target;
    const disabled = !target.on || value === null;
    const up = `<button type="button" data-action="temp" data-dir="1" data-target="${escapeHtml(target.entityId)}"
      ${disabled || value >= target.maxTemp ? 'disabled' : ''} aria-label="+">${icon('chevron_up')}</button>`;
    const down = `<button type="button" data-action="temp" data-dir="-1" data-target="${escapeHtml(target.entityId)}"
      ${disabled || value <= target.minTemp ? 'disabled' : ''} aria-label="−">${icon('chevron')}</button>`;
    const big = `<div class="big">${value === null ? '––' : formatNumber(value, 1)}<small> ${escapeHtml(target.unit)}</small></div>`;
    return small
      ? `<div class="updown">${down}${up}</div>${big}`
      : `${big}<div class="updown">${up}${down}</div>`;
  }

  /**
   * The alert strip: away mode, and an open window the unit is fighting.
   *
   * The draught alert names the contact on a single unit and the room on a
   * group, because that is the thing the reader has to go and close.
   */
  _alertsHtml(model, t) {
    const items = [];

    if (!model.isGroup && model.away) {
      /* away is information, the draught below is the one to act on, so the
         two never share a colour when they appear together */
      items.push(['info', 'away', t('alert.away')]);
    }

    if (this._config.show_openings) {
      const draughty = model.isGroup ? model.draughty : model.draughty ? [model] : [];
      for (const unit of draughty) {
        const duration = this._ago(unit.openings.openFor, t);
        items.push([
          '',
          'window_open',
          model.isGroup
            ? fill(t('alert.window_open_unit'), { unit: unit.name, duration })
            : fill(t('alert.window_open'), {
                name: unit.openings.longest?.name || t('ui.window'),
                duration,
              }),
        ]);
      }
    }

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

  /**
   * The little "nyitva" pill.
   *
   * Muted when the unit is not conditioning the room: the window is still
   * open, but nothing is being paid for it, so it is a note and not a warning.
   */
  _openBadge(unit, t) {
    if (!this._config.show_openings) return '';
    const openings = unit.openings;
    if (openings.none || !openings.open) return '';
    const label =
      openings.open > 1
        ? fill(t('ui.windows_open'), { count: openings.open })
        : t('ui.window_open');
    return `<span class="open-badge${unit.draughty ? '' : ' calm'}">${icon(
      'window_open',
    )}${escapeHtml(label)}</span>`;
  }

  /** The segmented mode bar, for a unit or for the whole group. */
  _segHtml(target, t) {
    const available = target.modes?.length ? target.modes : MODES.map((mode) => mode.key);
    const current = target.isGroup
      ? target.mixed || !target.running
        ? null
        : target.mode
      : target.on
        ? target.mode
        : 'off';
    const isOff = target.isGroup ? target.running === 0 : !target.on;

    const buttons = MODES.filter((mode) => mode.key === 'off' || available.includes(mode.key))
      .map((mode) => {
        const pressed = mode.key === 'off' ? isOff : current === mode.key;
        return `
        <button type="button" class="${mode.key === 'off' ? 'power' : ''}"
          data-action="mode" data-value="${mode.key}" data-target="${escapeHtml(target.entityId)}"
          aria-pressed="${pressed}">
          ${icon(mode.icon)}<span>${escapeHtml(t(`mode.${mode.key}`))}</span>
        </button>`;
      })
      .join('');

    return `<div class="seg">${buttons}</div>`;
  }

  /** Fan speed as a tick bar: `A` for auto, then one rising bar per step. */
  _fanHtml(unit, t) {
    if (!unit.fanModes.length) return '';
    const steps = unit.fanModes.filter((mode) => String(mode).toLowerCase() !== 'auto');
    const ticks = unit.fanModes
      .map((mode, index) => {
        const lower = String(mode).toLowerCase();
        const on = unit.fanMode === mode;
        if (lower === 'auto') {
          return `<button type="button" class="auto ${on ? 'on' : ''}" data-action="fan"
            data-value="${escapeHtml(mode)}" data-target="${escapeHtml(unit.entityId)}"
            ${unit.on ? '' : 'disabled'} aria-label="Auto">A</button>`;
        }
        const position = steps.indexOf(mode);
        const height = 8 + position * 1.8;
        const filled =
          unit.fanMode !== null &&
          String(unit.fanMode).toLowerCase() !== 'auto' &&
          position <= steps.indexOf(unit.fanMode);
        return `<button type="button" class="${filled ? 'on' : ''}" style="height:${height.toFixed(1)}px"
          data-action="fan" data-value="${escapeHtml(mode)}" data-target="${escapeHtml(unit.entityId)}"
          ${unit.on ? '' : 'disabled'} aria-label="${escapeHtml(this._fanLabel(mode, t))}"></button>`;
      })
      .join('');

    return `
      <div class="fan">
        <span class="cap">${escapeHtml(t('ui.fan'))}</span>
        <div class="ticks">${ticks}</div>
        <span class="val">${escapeHtml(unit.fanMode ? this._fanLabel(unit.fanMode, t) : '–')}</span>
      </div>`;
  }

  _fanLabel(mode, t) {
    return t(`fan.${String(mode).toLowerCase()}`, String(mode));
  }

  _swingLabel(mode, t) {
    return t(`swing.${String(mode).toLowerCase()}`, String(mode));
  }

  /** Swing plus the presets the entity actually offers. */
  _buttonsHtml(unit, t) {
    const buttons = [];

    if (unit.swingModes.length > 1) {
      if (this._config.show_all_swing) {
        for (const mode of unit.swingModes) {
          buttons.push(`
            <button type="button" class="ghost" data-action="swing" data-value="${escapeHtml(mode)}"
              data-target="${escapeHtml(unit.entityId)}" aria-pressed="${unit.swingMode === mode}"
              ${unit.on ? '' : 'disabled'}>${icon('swing')}${escapeHtml(this._swingLabel(mode, t))}</button>`);
        }
      } else {
        // one toggle between parked and swinging; the unit only moves the flap
        // up and down, so a list of four would be three lies and one control
        const moving = unit.swingModes.find((mode) => String(mode).toLowerCase() !== 'off');
        const parked = unit.swingModes.find((mode) => String(mode).toLowerCase() === 'off');
        buttons.push(`
          <button type="button" class="ghost" data-action="swing"
            data-value="${escapeHtml(unit.swinging ? parked ?? 'off' : moving ?? 'vertical')}"
            data-target="${escapeHtml(unit.entityId)}" aria-pressed="${unit.swinging}"
            ${unit.on ? '' : 'disabled'}>${icon('swing')}${escapeHtml(t('ui.swing'))}</button>`);
      }
    }

    if (this._config.show_presets) {
      for (const preset of unit.presets) {
        buttons.push(`
          <button type="button" class="ghost" data-action="preset" data-value="${preset.key}"
            data-target="${escapeHtml(unit.entityId)}" aria-pressed="${preset.on}"
            ${unit.on ? '' : 'disabled'}>${icon(preset.icon)}${escapeHtml(t(`preset.${preset.key}`))}</button>`);
      }
    }

    if (!buttons.length) return '';
    return `<div class="btnrow">${buttons.join('')}</div>`;
  }

  /* ------------------------------ group ----------------------------- */

  _renderGroup(group, t) {
    this._section('top', this._topHtml(group, t));
    this._groupHero(group, t);
    this._section('alerts', this._alertsHtml(group, t));
    this._section('modes', this._config.show_modes ? this._segHtml(group, t) : '');
    this._section('fan', '');
    this._section('buttons', '');
    this._unitsSection(group, t);
  }

  _groupHero(group, t) {
    if (!this._sections.hero.querySelector('.hero')) {
      this._sections.hero.innerHTML = `
        <div class="hero no-art">
          <div class="status"></div>
          <div class="dial"></div>
        </div>`;
      this._heroNode = this._sections.hero.querySelector('.hero');
      this._statusNode = this._sections.hero.querySelector('.status');
      this._dialNode = this._sections.hero.querySelector('.dial');
    }
    this._heroNode.classList.add('no-art');
    const art = this._sections.hero.querySelector('.art');
    if (art) art.hidden = true;

    const headline = group.running === 0
      ? t('group.all_off')
      : group.mixed
        ? t('group.mixed')
        : t(`mode_long.${group.mode}`, group.mode);

    const statusHtml = `
      <div class="mode-name">${escapeHtml(headline)}</div>
      <div class="state">${escapeHtml(fill(t('group.running'), group))}</div>
      <div class="state-sub">${escapeHtml(
        group.mixed && group.running ? t('group.mixed_note') : t('group.in_step'),
      )}</div>`;
    if (this._signatures.status !== statusHtml) {
      this._signatures.status = statusHtml;
      this._statusNode.innerHTML = statusHtml;
    }

    const dialHtml = this._dialHtml({ ...group, on: true });
    if (this._signatures.dial !== dialHtml) {
      this._signatures.dial = dialHtml;
      this._dialNode.innerHTML = dialHtml;
    }
  }

  /**
   * The member rows.
   *
   * Each row is built once and then only updated, so the little drawings keep
   * animating instead of restarting whenever a temperature ticks over.
   */
  _unitsSection(group, t) {
    const section = this._sections.units;
    if (!section.querySelector('.rows')) {
      section.innerHTML = `
        <div class="divider"></div>
        <div class="sec-cap">${escapeHtml(t('group.units'))}
          <span style="float:right;font-weight:500;letter-spacing:0;text-transform:none">
            ${escapeHtml(t('group.tap_hint'))}</span></div>
        <div class="rows"></div>`;
      this._rowsNode = section.querySelector('.rows');
      this._rows.clear();
    }
    section.hidden = false;

    const seen = new Set();
    for (const unit of group.units) {
      seen.add(unit.entityId);
      let row = this._rows.get(unit.entityId);
      if (!row) {
        const el = document.createElement('div');
        el.className = 'row';
        el.innerHTML = `
          <button class="row-head" type="button" data-action="toggle-row" data-target="${escapeHtml(unit.entityId)}">
            ${renderMini(this._uid)}
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${icon('chevron', 'icon caret')}
          </button>
          <div class="row-body"></div>`;
        this._rowsNode.appendChild(el);
        row = {
          el,
          mini: el.querySelector('.mini'),
          name: el.querySelector('.rname'),
          state: el.querySelector('.rstate'),
          temp: el.querySelector('.rtemp'),
          body: el.querySelector('.row-body'),
          sig: {},
        };
        this._rows.set(unit.entityId, row);
      }

      const open = this._open.has(unit.entityId);
      row.el.classList.toggle('open', open);
      row.el.style.setProperty('--row-accent', this._accent(unit.on ? unit.mode : 'off'));
      applyUnit(row.mini, unit);

      const name = unit.name;
      if (row.sig.name !== name) {
        row.sig.name = name;
        row.name.textContent = name;
      }

      const stateHtml = `${escapeHtml(t(`mode_long.${unit.on ? unit.mode : 'off'}`, unit.mode))}${
        unit.on && unit.fanMode ? ` · ${escapeHtml(this._fanLabel(unit.fanMode, t))}` : ''
      }${unit.power !== null ? `<em> · ${formatNumber(unit.power, 0)} ${escapeHtml(unit.powerUnit)}</em>` : ''}${this._openBadge(unit, t)}`;
      if (row.sig.state !== stateHtml) {
        row.sig.state = stateHtml;
        row.state.innerHTML = stateHtml;
      }

      const measured = unit.measured === null ? '––' : formatNumber(unit.measured, 1);
      const tempHtml = unit.on
        ? `${measured} ${escapeHtml(unit.unit)} → <b>${formatNumber(unit.target, 1)} ${escapeHtml(unit.unit)}</b>`
        : `${measured} ${escapeHtml(unit.unit)} · <b>${escapeHtml(t('ui.standby_short'))}</b>`;
      if (row.sig.temp !== tempHtml) {
        row.sig.temp = tempHtml;
        row.temp.innerHTML = tempHtml;
      }

      const bodyHtml = open
        ? `${this._segHtml(unit, t)}
           ${this._config.show_fan ? this._fanHtml(unit, t) : ''}
           <div class="rowbottom">
             <div>${this._buttonsHtml(unit, t)}</div>
             <div class="dial">${this._dialHtml(unit, true)}</div>
           </div>`
        : '';
      if (row.sig.body !== bodyHtml) {
        row.sig.body = bodyHtml;
        row.body.innerHTML = bodyHtml;
      }
    }

    // a member that left the group takes its row with it
    for (const [entityId, row] of this._rows) {
      if (seen.has(entityId)) continue;
      row.el.remove();
      this._rows.delete(entityId);
    }
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const node = ev.target.closest('[data-action]');
    if (!node || node.hasAttribute('disabled')) return;
    const { action, entity, value, dir, target } = node.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity || model?.entityId);
        break;
      case 'toggle-row':
        this._haptic('selection');
        if (this._open.has(target)) this._open.delete(target);
        else this._open.add(target);
        this._render();
        break;
      case 'mode':
        this._haptic(value === 'off' ? 'medium' : 'light');
        this._call('set_hvac_mode', { entity_id: target, hvac_mode: value });
        break;
      case 'fan':
        this._haptic('light');
        this._call('set_fan_mode', { entity_id: target, fan_mode: value });
        break;
      case 'swing':
        this._haptic('light');
        this._call('set_swing_mode', { entity_id: target, swing_mode: value });
        break;
      case 'preset':
        this._haptic('light');
        this._call('set_preset_mode', {
          entity_id: target,
          preset_mode: node.getAttribute('aria-pressed') === 'true' ? 'none' : value,
        });
        break;
      case 'temp':
        this._stepTemperature(target, Number(dir));
        break;
      default:
        break;
    }
  }

  _stepTemperature(entityId, direction) {
    const model = this._model;
    const target =
      model.isGroup && entityId === model.entityId
        ? model
        : model.isGroup
          ? model.units.find((unit) => unit.entityId === entityId)
          : model;
    if (!target || target.target === null) return;

    const step = target.targetStep || 1;
    const next = Math.min(
      target.maxTemp,
      Math.max(target.minTemp, Math.round((target.target + direction * step) * 10) / 10),
    );
    if (next === target.target) return;
    this._haptic('light');
    this._call('set_temperature', { entity_id: entityId, temperature: next });
  }

  _call(service, data) {
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
  customElements.define(CARD_NAME, DaikinAcCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Daikin AC Card',
    description:
      'Card for Daikin air conditioners: modes, target temperature, fan and louver, with room sensors and a plug meter. Drives a climate group too.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px',
    'color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0',
  );
}
