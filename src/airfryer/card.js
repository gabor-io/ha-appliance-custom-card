import {
  ACTIVE_STATUSES,
  COUNTDOWN_STATUSES,
  CARD_NAME,
  CARD_VERSION,
  COMMAND_META,
  CORE_TEMPERATURES,
  EDITOR_NAME,
  METHODS,
  SETTABLE_STATUSES,
  STATUS,
  STATUS_COMMANDS,
  TEMP_PRESETS,
  TIME_PRESETS,
} from './const.js';
import { getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listAirfryerDevices } from './entities.js';
import { renderAirfryer, updateFryerDisplay } from './graphics.js';
import { icon } from '../shared/icons.js';
import { STYLES } from './styles.js';
import { escapeHtml, formatClock } from '../shared/format.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_methods: true,
  show_presets: true,
  show_settings: true,
  show_probe: true,
  show_details: true,
  show_controls: true,
};

/** `754` -> `{ value: '12:34', unit: 'm' }`, `4500` -> `{ value: '1:15', unit: 'h' }` */
function splitClock(totalSeconds, t) {
  if (totalSeconds === null || totalSeconds === undefined) return null;
  const secs = Math.max(0, Math.round(totalSeconds));
  if (secs >= 3600) {
    const h = Math.floor(secs / 3600);
    const m = Math.round((secs % 3600) / 60);
    return { value: `${h}:${String(m).padStart(2, '0')}`, unit: t('ui.hour_short') };
  }
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return { value: `${m}:${String(s).padStart(2, '0')}`, unit: t('ui.minute_short') };
}

export class PhilipsAirfryerCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listAirfryerDevices(hass);
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
    // keeps the "ready at" clock honest between state updates
    this._timer = window.setInterval(() => this._render(), 30000);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
    return this._config?.compact ? 5 : 8;
  }

  /** Sizing hints for the sections view of newer Home Assistant releases. */
  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: this._config?.compact ? 6 : 'auto' };
  }

  /* ------------------------------------------------------------------ */

  _build() {
    const style = document.createElement('style');
    style.textContent = STYLES;

    const card = document.createElement('ha-card');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.addEventListener('click', (ev) => this._onClick(ev));

    for (const name of [
      'header',
      'hero',
      'alerts',
      'gauges',
      'methods',
      'presets',
      'settings',
      'controls',
      'details',
    ]) {
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
    this._section('gauges', this._gaugesHtml(model, t));
    this._section('methods', this._config.show_methods ? this._methodsHtml(model, t) : '');
    this._section('presets', this._config.show_presets ? this._presetsHtml(model, t) : '');
    this._section('settings', this._config.show_settings ? this._settingsHtml(model, t) : '');
    this._section('controls', this._config.show_controls ? this._controlsHtml(model, t) : '');
    this._section('details', this._config.show_details ? this._detailsHtml(model, t) : '');
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    for (const node of Object.values(this._sections)) node.innerHTML = '';
    this._sections.header.innerHTML = `
      <div class="empty">
        ${icon('fryer')}
        <div>${escapeHtml(t(`ui.${model.reason}`))}</div>
      </div>`;
  }

  /** Replaces a section only when its markup actually changed. */
  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
    // an empty section must not leave a gap in the card's grid
    this._sections[name].hidden = !html;
  }

  _applyHostClasses(model) {
    const classes = ['wrap'];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    classes.push(`accent-${model.accent}`);

    if (model.status === STATUS.COOKING) classes.push('cooking', 'busy');
    if (model.status === STATUS.PRECOOK) classes.push('preheat', 'busy', 'heating');
    if (model.status === STATUS.MAINTAIN) classes.push('cooking');
    if (model.status === STATUS.PAUSE || model.status === STATUS.USER_ACTION) classes.push('paused');
    if (model.status === STATUS.FINISH) classes.push('done');
    if ([STATUS.STANDBY, STATUS.POWERSAVE].includes(model.status)) classes.push('off');
    if (model.heating && ACTIVE_STATUSES.includes(model.status)) classes.push('heating');
    if (model.steam && ACTIVE_STATUSES.includes(model.status)) classes.push('steam-mode');
    if (model.drawerOpen) classes.push('drawer-open');
    if (model.probe.plugged) classes.push('probe-plugged');
    if (model.shake || model.flip) classes.push('shake-now');

    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;
  }

  /* ---------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const name = escapeHtml(model.name || t('card_name'));
    const sub = model.recipe || (model.method ? t(`method.${model.method}`) : '');

    const badges = [];
    if (model.drawerOpen) {
      badges.push(`<span class="warn" title="${t('ui.drawer')}: ${t('ui.drawer_open')}">${icon('drawer')}</span>`);
    }
    if (model.probe.plugged) badges.push(`<span title="${t('ui.probe')}">${icon('probe')}</span>`);
    if (model.error) badges.push(`<span class="bad" title="${t('alert.error')} ${model.error}">${icon('error')}</span>`);

    return `
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${name}</div>
          ${sub ? `<div class="sub">${escapeHtml(sub)}</div>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="badges">${badges.join('')}</div>
        <div class="pill">${icon(this._statusIcon(model))}${escapeHtml(t(`status.${model.status}`))}</div>
      </div>`;
  }

  _statusIcon(model) {
    switch (model.status) {
      case STATUS.COOKING:
        return 'heat';
      case STATUS.PRECOOK:
        return 'temperature';
      case STATUS.PAUSE:
        return 'pause';
      case STATUS.USER_ACTION:
        return 'alert';
      case STATUS.MAINTAIN:
        return 'warm';
      case STATUS.FINISH:
        return 'check';
      case STATUS.IDLE:
      case STATUS.SETTING:
      case STATUS.PARASETTING:
        return 'play';
      default:
        return 'power';
    }
  }

  _heroSection(model, t) {
    // The illustration is built once so its CSS animations never restart.
    if (!this._sections.hero.querySelector('.fryer')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="fryer-wrap" data-action="more-info">${renderAirfryer()}</div>
          <div class="status"></div>
        </div>`;
      this._statusNode = this._sections.hero.querySelector('.status');
    }
    const html = this._statusHtml(model, t);
    if (this._signatures.status !== html) {
      this._signatures.status = html;
      this._statusNode.innerHTML = html;
    }
    const clock = splitClock(model.remaining, t);
    const showClock = COUNTDOWN_STATUSES.includes(model.status) && clock && model.remaining > 0;
    updateFryerDisplay(
      this._sections.hero,
      model.status === STATUS.STANDBY || model.status === STATUS.POWERSAVE
        ? ''
        : showClock
          ? clock.value
          : '--:--',
      model.currentTemp !== null && model.status !== STATUS.STANDBY ? `${Math.round(model.currentTemp)}°` : '',
    );
  }

  _statusHtml(model, t) {
    const lines = [];
    const detail =
      model.status === STATUS.PRECOOK && model.targetTemp
        ? `<span class="phase-text">${Math.round(model.targetTemp)} ${escapeHtml(model.tempUnit)}</span>`
        : model.resting
          ? `<span class="phase-text">${escapeHtml(t('alert.resting'))}</span>`
          : '';

    lines.push(`
      <div class="status-line">
        <span class="state-text">${escapeHtml(t(`status.${model.status}`))}</span>
        ${detail}
      </div>`);

    if (model.method || model.recipe) {
      lines.push(`
        <div class="program-line">
          ${icon(METHODS[model.method]?.icon || 'manual')}
          <span>${escapeHtml(model.recipe || t(`method.${model.method}`))}</span>
        </div>`);
    }

    const clock = splitClock(model.remaining, t);
    if (COUNTDOWN_STATUSES.includes(model.status) && clock && model.remaining > 0) {
      const at = model.finishAt
        ? `<span class="at">${icon('clock')}${escapeHtml(t('ui.ready_at'))} ${formatClock(model.finishAt, this._hass)}</span>`
        : '';
      lines.push(`
        <div class="countdown">
          <span class="value">${clock.value}</span><span class="unit">${clock.unit}</span>${at}
        </div>`);
    } else if (model.status === STATUS.FINISH) {
      lines.push(`
        <div class="countdown">
          <span class="at">${icon('check')}${escapeHtml(t('ui.finished_hint'))}</span>
        </div>`);
    } else if (model.controls.temperature?.value && model.controls.time?.value) {
      lines.push(`
        <div class="countdown">
          <span class="value">${Math.round(model.controls.temperature.value)}°</span>
          <span class="unit">${escapeHtml(model.tempUnit.replace('°', ''))}</span>
          <span class="at">${icon('timer')}${Math.round(model.controls.time.value)} ${escapeHtml(t('ui.minute_short'))}</span>
        </div>`);
    }

    if (COUNTDOWN_STATUSES.includes(model.status) || model.status === STATUS.FINISH) {
      lines.push(`<div class="bar"><i style="width:${Math.round(model.progress * 100)}%"></i></div>`);
    }
    return lines.join('');
  }

  _alertsHtml(model, t) {
    const items = [];
    if (model.error) {
      items.push({ severity: 'error', text: `${t('alert.error')}: ${model.error}`, iconName: 'error' });
    }
    if (model.drawerOpen) {
      const cooking = ACTIVE_STATUSES.includes(model.status);
      items.push({
        severity: cooking ? 'warning' : 'info',
        text: t(cooking ? 'alert.drawer_open' : 'alert.drawer_open_idle'),
        iconName: 'drawer',
        pulse: cooking,
      });
    }
    if (model.shake) items.push({ severity: 'warning', text: t('alert.shake'), iconName: 'shake', pulse: true });
    if (model.flip) items.push({ severity: 'warning', text: t('alert.flip'), iconName: 'flip', pulse: true });
    if (model.status === STATUS.USER_ACTION && !model.shake && !model.flip) {
      items.push({ severity: 'warning', text: t('alert.user_action'), iconName: 'alert', pulse: true });
    }
    if (model.probe.required && !model.probe.plugged) {
      items.push({ severity: 'warning', text: t('alert.probe_required'), iconName: 'probe' });
    }
    if (model.resting) items.push({ severity: 'info', text: t('alert.resting'), iconName: 'timer' });

    if (!items.length) return '';
    return `<div class="alerts">${items
      .map(
        (item) =>
          `<div class="alert ${item.severity}${item.pulse ? ' pulse' : ''}">${icon(item.iconName)}<span>${escapeHtml(item.text)}</span></div>`,
      )
      .join('')}</div>`;
  }

  _gaugesHtml(model, t) {
    const gauges = [];
    const unit = escapeHtml(model.tempUnit);

    if (model.currentTemp !== null || model.targetTemp !== null) {
      const ratio =
        model.currentTemp !== null && model.targetTemp
          ? Math.min(1, Math.max(0, model.currentTemp / model.targetTemp))
          : 0;
      const value =
        model.targetTemp !== null && model.targetTemp > 0
          ? `<b>${Math.round(model.currentTemp ?? 0)}</b> / ${Math.round(model.targetTemp)} ${unit}`
          : `<b>${Math.round(model.currentTemp ?? 0)}</b> ${unit}`;
      gauges.push(`
        <div class="gauge heat">
          <div class="top">${icon('temperature')}<span>${escapeHtml(t('ui.temperature'))}</span>
            <span class="val">${value}</span></div>
          <div class="track"><i style="width:${Math.round(ratio * 100)}%"></i></div>
        </div>`);
    }

    if (this._config.show_probe && model.probe.plugged) {
      const value =
        model.probe.target
          ? `<b>${Math.round(model.probe.current ?? 0)}</b> / ${Math.round(model.probe.target)} ${unit}`
          : `<b>${Math.round(model.probe.current ?? 0)}</b> ${unit}`;
      gauges.push(`
        <div class="gauge probe">
          <div class="top">${icon('probe')}<span>${escapeHtml(t('ui.probe_core'))}</span>
            <span class="val">${value}</span></div>
          <div class="track"><i style="width:${Math.round(model.probe.progress * 100)}%"></i></div>
        </div>`);
    }

    if (!gauges.length) return '';
    return `<div class="gauges">${gauges.join('')}</div>`;
  }

  _methodsHtml(model, t) {
    if (!model.entities.sel_method || !model.methodOptions.length) return '';
    const editable = SETTABLE_STATUSES.includes(model.status);
    const chips = model.methodOptions.map((option) => {
      const known = METHODS[option.key];
      const label = known ? t(`method.${option.key}`) : option.label;
      const hint = t(`method_hint.${option.key}`, '');
      return `<button class="chip" type="button" data-action="method" data-value="${escapeHtml(option.label)}"
        aria-pressed="${option.key === model.method}" ${hint ? `title="${escapeHtml(hint)}"` : ''}
        ${editable ? '' : 'disabled'}>
        ${icon(known?.icon || 'manual')}<span>${escapeHtml(label)}</span></button>`;
    });
    const hint = model.method ? escapeHtml(t(`method_hint.${model.method}`, '')) : '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.method'))}</div>
        <div class="chips">${chips.join('')}</div>
        ${hint ? `<div class="note">${hint}</div>` : ''}
      </div>`;
  }

  _presetsHtml(model, t) {
    if (!model.entities.sel_preset || !model.presetOptions.length) return '';
    const editable = SETTABLE_STATUSES.includes(model.status);
    const chips = model.presetOptions.map(
      (option) => `<button class="chip" type="button" data-action="preset" data-value="${escapeHtml(option)}"
        aria-pressed="${option === model.presetSelected}" ${editable ? '' : 'disabled'}>
        ${icon('star')}<span>${escapeHtml(option)}</span></button>`,
    );
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.presets'))}</div>
        <div class="chips">${chips.join('')}</div>
      </div>`;
  }

  _settingsHtml(model, t) {
    const editable = SETTABLE_STATUSES.includes(model.status) || model.status === STATUS.PAUSE;
    const blocks = [];

    const stepper = (key, label, control, unit, entityKey) => {
      if (!control || !model.entities[entityKey]) return '';
      const value = control.value ?? control.min;
      const canDown = editable && value > control.min;
      const canUp = editable && value < control.max;
      return `
        <div class="stepper">
          <span class="label">${escapeHtml(label)}</span>
          <div class="row">
            <button class="step-btn" type="button" data-action="step" data-value="${key}" data-dir="-1"
              ${canDown ? '' : 'disabled'} aria-label="−">−</button>
            <span class="value">${Math.round(value)}${escapeHtml(unit)}</span>
            <button class="step-btn" type="button" data-action="step" data-value="${key}" data-dir="1"
              ${canUp ? '' : 'disabled'} aria-label="+">+</button>
          </div>
        </div>`;
    };

    const steppers = [
      stepper('temperature', t('ui.temperature'), model.controls.temperature, ` ${model.tempUnit}`, 'num_temp'),
      stepper('time', t('ui.cook_time'), model.controls.time, ` ${t('ui.minute_short')}`, 'num_time'),
      model.probe.plugged
        ? stepper('probe', t('ui.probe_core'), model.controls.probe, ` ${model.tempUnit}`, 'num_probe')
        : '',
    ].filter(Boolean);

    if (steppers.length) blocks.push(`<div class="steppers">${steppers.join('')}</div>`);

    const quick = [];
    if (model.entities.num_temp) {
      quick.push(
        ...TEMP_PRESETS.map(
          (value) => `<button class="chip" type="button" data-action="set" data-value="temperature:${value}"
            aria-pressed="${Math.round(model.controls.temperature?.value ?? -1) === value}" ${editable ? '' : 'disabled'}>
            ${icon('temperature')}<span>${value}°</span></button>`,
        ),
      );
    }
    if (model.entities.num_time) {
      quick.push(
        ...TIME_PRESETS.filter((value) => value <= (model.controls.time?.max ?? 60)).map(
          (value) => `<button class="chip" type="button" data-action="set" data-value="time:${value}"
            aria-pressed="${Math.round(model.controls.time?.value ?? -1) === value}" ${editable ? '' : 'disabled'}>
            ${icon('timer')}<span>${value} ${escapeHtml(t('ui.minute_short'))}</span></button>`,
        ),
      );
    }
    if (model.entities.num_airspeed) {
      const current = model.controls.airspeed?.value;
      quick.push(
        `<button class="chip" type="button" data-action="set" data-value="airspeed:1"
          aria-pressed="${current === 1}" ${editable ? '' : 'disabled'}>
          ${icon('fan')}<span>${escapeHtml(t('ui.airspeed_low'))}</span></button>`,
        `<button class="chip" type="button" data-action="set" data-value="airspeed:2"
          aria-pressed="${current === 2}" ${editable ? '' : 'disabled'}>
          ${icon('fan')}<span>${escapeHtml(t('ui.airspeed_high'))}</span></button>`,
      );
    }
    if (quick.length) blocks.push(`<div class="chips">${quick.join('')}</div>`);

    if (this._config.show_probe && model.probe.plugged) {
      const rows = CORE_TEMPERATURES.map(
        (row) =>
          `<div class="row"><span>${escapeHtml(t(`ui.food.${row.food}`))} – ${escapeHtml(t(`ui.doneness.${row.doneness}`))}</span><b>${row.range}</b></div>`,
      ).join('');
      blocks.push(`
        <details class="core-temps">
          <summary>${escapeHtml(t('ui.core_temp_help'))}</summary>
          ${rows}
        </details>`);
    }

    if (!blocks.length) return '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.settings'))}</div>
        ${blocks.join('')}
      </div>`;
  }

  _controlsHtml(model, t) {
    const commands = STATUS_COMMANDS[model.status] || [];
    const buttons = commands
      .filter((command) => model.entities[COMMAND_META[command].entity])
      .map((command) => {
        const meta = COMMAND_META[command];
        const blocked = model.drawerOpen && ['start'].includes(command);
        return `<button class="btn ${meta.style}" type="button" data-action="command" data-value="${command}"
          ${blocked ? 'disabled' : ''}>
          ${icon(meta.icon)}<span>${escapeHtml(t(`command.${command}`))}</span></button>`;
      });
    if (!buttons.length) return '';
    const note = model.drawerOpen
      ? `<div class="note">${icon('drawer')}${escapeHtml(t('alert.drawer_open_idle'))}</div>`
      : '';
    return `<div class="section"><div class="controls">${buttons.join('')}</div>${note}</div>`;
  }

  _detailsHtml(model, t) {
    const items = [];
    const push = (key, value, iconName) => {
      if (value === null || value === undefined || value === '') return;
      items.push(`
        <div class="detail">
          <span class="k">${escapeHtml(t(`ui.${key}`))}</span>
          <span class="v">${icon(iconName)}${escapeHtml(String(value))}</span>
        </div>`);
    };

    if (model.drawerOpen !== null) {
      push('drawer', model.drawerOpen ? t('ui.drawer_open') : t('ui.drawer_closed'), 'drawer');
    }
    if (model.airspeed !== null) {
      push('airspeed', model.airspeed >= 2 ? t('ui.airspeed_high') : t('ui.airspeed_low'), 'fan');
    }
    if (model.total) push('total_time', `${Math.round(model.total / 60)} ${t('ui.minute_short')}`, 'timer');
    if (model.preheatEnabled !== null) {
      push('preheat', model.preheatEnabled ? t('ui.on') : t('ui.off'), 'temperature');
    } else if (model.preheatStatus) {
      push('preheat', this._onOff(model.preheatStatus, t), 'temperature');
    }
    if (model.keepWarm) push('keep_warm', this._onOff(model.keepWarm, t), 'warm');
    if (model.stage) push('stage', model.stage, 'info');
    if (model.voltage !== null) push('voltage', `${model.voltage} V`, 'info');
    if (model.error) push('error_code', model.error, 'error');

    if (!items.length) return '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.details'))}</div>
        <div class="details">${items.join('')}</div>
      </div>`;
  }

  /** Renders raw `on`/`off`/`true`/`false` sensor states as words. */
  _onOff(value, t) {
    const raw = String(value).toLowerCase();
    if (['on', 'true', 'yes', '1'].includes(raw)) return t('ui.on');
    if (['off', 'false', 'no', '0'].includes(raw)) return t('ui.off');
    return value;
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target || target.hasAttribute('disabled')) return;
    const { action, value, dir } = target.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(model?.entities?.status);
        break;
      case 'method':
        this._haptic('light');
        this._call('select', 'select_option', { entity_id: model.entities.sel_method, option: value });
        break;
      case 'preset':
        this._haptic('light');
        this._call('select', 'select_option', { entity_id: model.entities.sel_preset, option: value });
        break;
      case 'step':
        this._step(value, Number(dir));
        break;
      case 'set': {
        const [key, raw] = value.split(':');
        this._setControl(key, Number(raw));
        break;
      }
      case 'command': {
        const meta = COMMAND_META[value];
        this._haptic('medium');
        this._call(meta.service[0], meta.service[1], { entity_id: model.entities[meta.entity] });
        break;
      }
      default:
        break;
    }
  }

  _controlEntity(key) {
    return {
      temperature: 'num_temp',
      time: 'num_time',
      probe: 'num_probe',
      airspeed: 'num_airspeed',
    }[key];
  }

  _step(key, direction) {
    const control = this._model.controls[key];
    if (!control) return;
    const current = control.value ?? control.min;
    const next = Math.min(control.max, Math.max(control.min, current + direction * control.step));
    if (next === current) return;
    this._setControl(key, next);
  }

  _setControl(key, value) {
    const entityId = this._model.entities[this._controlEntity(key)];
    if (!entityId) return;
    const control = this._model.controls[key];
    const bounded = control ? Math.min(control.max, Math.max(control.min, value)) : value;
    this._haptic('light');
    this._call('number', 'set_value', { entity_id: entityId, value: bounded });
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
  customElements.define(CARD_NAME, PhilipsAirfryerCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Philips Airfryer Card',
    description:
      'Rich status card for Philips airfryers: cooking status, drawer, temperature, probe, timers and controls.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#f4511e;font-weight:700;border-radius:3px 0 0 3px',
    'color:#f4511e;background:#fbe9e7;font-weight:700;border-radius:0 3px 3px 0',
  );
}
