import {
  CARD_NAME,
  CARD_VERSION,
  COMMAND_META,
  DELAY_PRESETS,
  EDITOR_NAME,
  PROGRAMS,
  PROGRAM_ORDER,
  STATE,
  STATE_COMMANDS,
  TIMELINE_STEPS,
  ALERT_SEVERITY,
} from './const.js';
import { getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listDishwasherDevices, normaliseKey } from './entities.js';
import { renderMachine, updateMachineDisplay } from './graphics.js';
import { icon } from '../shared/icons.js';
import { STYLES } from './styles.js';
import {
  displayTime,
  escapeHtml,
  formatClock,
  formatDuration,
  formatNumber,
  splitDuration,
} from '../shared/format.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_programs: true,
  show_options: true,
  show_delay: true,
  show_scores: true,
  show_consumption: true,
  show_details: true,
  show_controls: true,
};

// programs can be picked while the appliance is off (the card powers it on first)
const PROGRAM_STATES = [STATE.OFF, STATE.IDLE, STATE.READY_TO_START];
// options and the delay timer are only writable once the appliance is awake
const SETTABLE_STATES = [STATE.IDLE, STATE.READY_TO_START];

export class AegDishwasherCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listDishwasherDevices(hass);
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
    return this._config?.compact ? 5 : 9;
  }

  /** Sizing hints for the sections view of newer Home Assistant releases. */
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: this._config?.compact ? 6 : 'auto',
    };
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
      'programs',
      'options',
      'delay',
      'meters',
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
    this._card = card;
    this._wrap = wrap;
    this._built = true;
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._built) this._build();

    const lang = getLanguage(this._config, this._hass);
    const t = translator(lang);
    this._t = t;

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
    this._section('programs', this._config.show_programs ? this._programsHtml(model, t) : '');
    this._section('options', this._config.show_options ? this._optionsHtml(model, t) : '');
    this._section('delay', this._config.show_delay ? this._delayHtml(model, t) : '');
    this._section('meters', this._metersHtml(model, t));
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
        ${icon('dishwasher')}
        <div>${escapeHtml(t(`ui.${model.reason}`))}</div>
      </div>`;
  }

  /** Replaces a section only when its markup actually changed. */
  _section(name, html) {
    if (this._signatures[name] === html) return;
    this._signatures[name] = html;
    this._sections[name].innerHTML = html;
  }

  _applyHostClasses(model) {
    const classes = ['wrap'];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    classes.push(`accent-${model.accent}`);
    if (model.state === STATE.RUNNING) classes.push('running', 'busy');
    if (model.state === STATE.PAUSED) classes.push('paused');
    if (model.state === STATE.END_OF_CYCLE) classes.push('done');
    if (model.state === STATE.OFF) classes.push('off');
    if (model.state === STATE.ALARM || model.alerts.some((a) => ALERT_SEVERITY[a] === 'error')) {
      classes.push('alarm');
    }
    if (model.step === 'DRYING') classes.push('phase-drying');
    if (model.doorOpen) classes.push('door-open');
    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;
  }

  /* ---------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const name = escapeHtml(model.name || t('card_name'));
    // before the start the appliance knows the real length (options included)
    const duration =
      [STATE.IDLE, STATE.READY_TO_START].includes(model.state) && model.minutesToFinish
        ? model.minutesToFinish
        : PROGRAMS[model.program]?.duration;
    const sub =
      model.program && duration
        ? `${t(`program.${model.program}`)} · ${formatDuration(duration, t)}`
        : model.programRaw || '';

    const badges = [];
    if (!model.online) badges.push(`<span class="bad" title="${t('ui.offline')}">${icon('wifi_off')}</span>`);
    else if (model.linkQuality) badges.push(`<span title="${t('ui.wifi')}: ${model.linkQuality}">${icon('wifi')}</span>`);
    if (model.doorOpen) badges.push(`<span class="bad" title="${t('ui.door_open')}">${icon('door')}</span>`);
    if (model.ecoMode) badges.push(`<span title="${t('ui.eco_mode')}">${icon('leaf')}</span>`);

    return `
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${name}</div>
          ${sub ? `<div class="sub">${escapeHtml(sub)}</div>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="badges">${badges.join('')}</div>
        <div class="pill">${icon(this._stateIcon(model))}${escapeHtml(t(`state.${model.state}`))}</div>
      </div>`;
  }

  _stateIcon(model) {
    switch (model.state) {
      case STATE.RUNNING:
        return 'water';
      case STATE.PAUSED:
        return 'pause';
      case STATE.END_OF_CYCLE:
        return 'check';
      case STATE.DELAYED_START:
        return 'timer';
      case STATE.ALARM:
        return 'error';
      case STATE.READY_TO_START:
        return 'play';
      default:
        return 'power';
    }
  }

  _heroSection(model, t) {
    // The illustration is built once so its CSS animations never restart.
    if (!this._sections.hero.querySelector('.machine')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="machine-wrap" data-action="more-info">${renderMachine()}</div>
          <div class="status"></div>
        </div>`;
      this._statusNode = this._sections.hero.querySelector('.status');
    }
    const html = this._statusHtml(model, t);
    if (this._signatures.status !== html) {
      this._signatures.status = html;
      this._statusNode.innerHTML = html;
    }
    updateMachineDisplay(this._sections.hero, this._displayText(model, t));
  }

  _displayText(model, t) {
    if (model.state === STATE.OFF) return '';
    if (model.remaining !== null && [STATE.RUNNING, STATE.PAUSED, STATE.DELAYED_START].includes(model.state)) {
      return displayTime(model.remaining);
    }
    if (model.state === STATE.END_OF_CYCLE) return '0:00';
    if (model.program) return t(`program.${model.program}`).slice(0, 8);
    return '--:--';
  }

  _statusHtml(model, t) {
    const lines = [];
    const phase =
      model.state === STATE.RUNNING && model.phase !== 'UNAVAILABLE'
        ? `<span class="phase-text">${escapeHtml(t(`phase_long.${model.phase}`))}</span>`
        : '';
    lines.push(`
      <div class="status-line">
        <span class="state-text">${escapeHtml(t(`state.${model.state}`))}</span>
        ${phase}
      </div>`);

    if (model.program) {
      lines.push(`
        <div class="program-line">
          ${icon(PROGRAMS[model.program]?.icon || 'dishwasher')}
          <span>${escapeHtml(t(`program.${model.program}`))}</span>
        </div>`);
    }

    const countdown = this._countdownHtml(model, t);
    if (countdown) lines.push(countdown);

    if ([STATE.RUNNING, STATE.PAUSED, STATE.END_OF_CYCLE].includes(model.state)) {
      lines.push(`<div class="bar"><i style="width:${Math.round(model.progress * 100)}%"></i></div>`);
      lines.push(this._timelineHtml(model, t));
    }

    return lines.join('');
  }

  _countdownHtml(model, t) {
    if (model.state === STATE.END_OF_CYCLE) {
      return `<div class="countdown"><span class="at">${icon('check')}${escapeHtml(t('ui.finished_hint'))}</span></div>`;
    }
    if (model.state === STATE.DELAYED_START) {
      const parts = splitDuration(model.delay || model.remaining, t);
      if (!parts) return '';
      // with a delay the interesting number is when the dishes are actually done
      const chips = [
        model.startAt
          ? `<span class="at">${icon('timer')}${escapeHtml(t('ui.starts_at'))} ${formatClock(model.startAt, this._hass)}</span>`
          : '',
        model.finishAt
          ? `<span class="at">${icon('clock')}${escapeHtml(t('ui.ready_at'))} ${formatClock(model.finishAt, this._hass)}</span>`
          : '',
      ].join('');
      return `<div class="countdown"><span class="value">${parts.value}</span><span class="unit">${parts.unit}</span>${chips}</div>`;
    }
    if ([STATE.RUNNING, STATE.PAUSED].includes(model.state)) {
      const parts = splitDuration(model.remaining, t);
      if (!parts) return '';
      const at = model.finishAt
        ? `<span class="at">${icon('clock')}${escapeHtml(t('ui.ready_at'))} ${formatClock(model.finishAt, this._hass)}</span>`
        : '';
      return `<div class="countdown"><span class="value">${parts.value}</span><span class="unit">${parts.unit}</span>${at}</div>`;
    }
    // powered on but not started yet: how long it takes and when it would be done
    if ([STATE.IDLE, STATE.READY_TO_START].includes(model.state)) {
      const parts = splitDuration(model.minutesToFinish ?? PROGRAMS[model.program]?.duration, t);
      if (!parts) return '';
      const at = model.finishAt
        ? `<span class="at">${icon('clock')}${escapeHtml(t('ui.ready_at'))} ${formatClock(model.finishAt, this._hass)}</span>`
        : '';
      return `<div class="countdown"><span class="value">${parts.value}</span><span class="unit">${parts.unit}</span>${at}</div>`;
    }
    // switched off: only the program's length is meaningful
    if (model.state === STATE.OFF && model.program && PROGRAMS[model.program]) {
      const parts = splitDuration(PROGRAMS[model.program].duration, t);
      return `<div class="countdown"><span class="value">${parts.value}</span><span class="unit">${parts.unit}</span>
        <span class="at">${icon('timer')}${escapeHtml(t('ui.duration'))}</span></div>`;
    }
    return '';
  }

  _timelineHtml(model, t) {
    const steps = PROGRAMS[model.program]?.steps || TIMELINE_STEPS;
    const activeIndex = model.step ? steps.indexOf(model.step) : -1;
    const items = TIMELINE_STEPS.map((step) => {
      const inProgram = steps.includes(step);
      const index = steps.indexOf(step);
      let cls = 'step';
      if (!inProgram) cls += ' skip';
      else if (activeIndex >= 0 && index < activeIndex) cls += ' done';
      else if (activeIndex >= 0 && index === activeIndex) cls += ' active';
      else if (model.state === STATE.END_OF_CYCLE) cls += ' done';
      return `<div class="${cls}"><span class="dot"></span><span class="label">${escapeHtml(t(`phase.${step}`))}</span></div>`;
    });
    return `<div class="timeline">${items.join('')}</div>`;
  }

  _alertsHtml(model, t) {
    const items = [];
    if (model.doorOpen && model.state !== STATE.OFF) {
      items.push({ severity: 'warning', text: t('ui.door_open'), iconName: 'door' });
    }
    for (const code of model.alerts) {
      const severity = ALERT_SEVERITY[code] || 'warning';
      const text = t(`alert.${code}`, `${t('alert_generic')}: ${code}`);
      items.push({ severity, text, iconName: severity === 'error' ? 'error' : 'alert' });
    }
    if (!model.online) {
      items.push({ severity: 'error', text: t('ui.offline'), iconName: 'wifi_off' });
    }
    if (!items.length) return '';
    return `<div class="alerts">${items
      .map(
        (item) =>
          `<div class="alert ${item.severity}">${icon(item.iconName)}<span>${escapeHtml(item.text)}</span></div>`,
      )
      .join('')}</div>`;
  }

  _programsHtml(model, t) {
    if (!model.entities.program || !model.programOptions.length) return '';
    const selectable = PROGRAM_STATES.includes(model.state) && model.remoteEnabled;
    const known = model.programOptions.filter((option) => PROGRAMS[option.key]);
    const sorted = [
      ...PROGRAM_ORDER.map((key) => known.find((option) => option.key === key)).filter(Boolean),
      ...known.filter((option) => !PROGRAM_ORDER.includes(option.key)),
    ];
    const chips = sorted.map((option) => {
      const active = option.key === model.program;
      const meta = PROGRAMS[option.key];
      const title = `${t(`program_hint.${option.key}`)} · ${formatNumber(meta.water)} l · ${formatNumber(meta.energy, 3)} kWh · ${formatDuration(meta.duration, t)}`;
      return `<button class="chip" type="button" data-action="program" data-value="${escapeHtml(option.label)}"
        aria-pressed="${active}" title="${escapeHtml(title)}" ${selectable ? '' : 'disabled'}>
        ${icon(meta.icon)}<span>${escapeHtml(t(`program.${option.key}`))}</span></button>`;
    });
    const hint = model.program ? escapeHtml(t(`program_hint.${model.program}`)) : '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.program'))}</div>
        <div class="chips">${chips.join('')}</div>
        ${hint ? `<div class="note">${hint}</div>` : ''}
      </div>`;
  }

  _optionsHtml(model, t) {
    if (!model.options.length) return '';
    const editable = SETTABLE_STATES.includes(model.state) && model.remoteEnabled;
    const visible = model.options.filter((option) => option.supported || option.on);
    if (!visible.length) {
      return `
        <div class="section">
          <div class="section-title">${escapeHtml(t('ui.options'))}</div>
          <div class="note">${escapeHtml(t('ui.no_options'))}</div>
        </div>`;
    }
    const chips = visible.map(
      (option) => `<button class="chip" type="button" data-action="option" data-value="${option.entityId}"
        aria-pressed="${option.on}" title="${escapeHtml(t(`option_hint.${option.key}`))}"
        ${editable && option.supported ? '' : 'disabled'}>
        ${icon(option.icon)}<span>${escapeHtml(t(`option.${option.key}`))}</span></button>`,
    );
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.options'))}</div>
        <div class="chips">${chips.join('')}</div>
      </div>`;
  }

  _delayHtml(model, t) {
    if (!model.entities.start_time) return '';
    const active = model.state === STATE.DELAYED_START || model.delay > 0;
    const editable =
      (SETTABLE_STATES.includes(model.state) || model.state === STATE.DELAYED_START) &&
      model.remoteEnabled;
    if (!editable && !active) return '';
    const chips = DELAY_PRESETS.map((minutes) => {
      const selected = model.delay === minutes;
      return `<button class="chip" type="button" data-action="delay" data-value="${minutes}"
        aria-pressed="${selected}" ${editable ? '' : 'disabled'}>
        ${icon('timer')}<span>${minutes / 60} ${escapeHtml(t('ui.hour_short'))}</span></button>`;
    });
    if (active) {
      chips.push(`<button class="chip" type="button" data-action="delay" data-value="-1" ${editable ? '' : 'disabled'}>
        ${icon('stop')}<span>${escapeHtml(t('ui.delay_cancel'))}</span></button>`);
    }
    const current = active
      ? `<span class="hint">${escapeHtml(formatDuration(model.delay, t))}</span>`
      : `<span class="hint">${escapeHtml(t('ui.delay_off'))}</span>`;
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.delay'))}${current}</div>
        <div class="chips">${chips.join('')}</div>
      </div>`;
  }

  _metersHtml(model, t) {
    const blocks = [];
    const { eco, energy, water } = model.scores;
    if (this._config.show_scores && (eco !== null || energy !== null || water !== null)) {
      const meter = (key, cls, iconName, value) => {
        const filled = Math.max(0, Math.min(7, value ?? 0));
        const track = Array.from({ length: 7 }, (_, i) => `<i class="${i < filled ? 'on' : ''}"></i>`).join('');
        return `
          <div class="meter ${cls}">
            <div class="top">${icon(iconName)}<span>${escapeHtml(t(`ui.${key}`))}</span>
              <span class="val">${value === null ? '–' : `${value}/7`}</span></div>
            <div class="track">${track}</div>
          </div>`;
      };
      blocks.push(`
        <div class="meters">
          ${meter('eco_score', 'eco', 'leaf', eco)}
          ${meter('energy_score', 'energy', 'energy', energy)}
          ${meter('water_score', 'water', 'water', water)}
        </div>`);
    }

    if (this._config.show_consumption && model.program && PROGRAMS[model.program]) {
      const meta = PROGRAMS[model.program];
      blocks.push(`
        <div class="facts">
          <span class="fact">${icon('water')}<b>${formatNumber(meta.water)}</b> l</span>
          <span class="fact">${icon('energy')}<b>${formatNumber(meta.energy, 3)}</b> kWh</span>
          <span class="fact">${icon('timer')}<b>${escapeHtml(formatDuration(meta.duration, t))}</b></span>
        </div>`);
    }
    if (!blocks.length) return '';
    return `
      <div class="section">
        <div class="section-title">${escapeHtml(t('ui.scores'))}</div>
        ${blocks.join('')}
      </div>`;
  }

  _controlsHtml(model, t) {
    const commands = STATE_COMMANDS[model.state] || [];
    const buttons = commands
      .filter((command) => model.entities[`cmd_${command}`])
      .map((command) => {
        const meta = COMMAND_META[command];
        const disabled = !model.remoteEnabled && command !== 'off' ? 'disabled' : '';
        return `<button class="btn ${meta.style}" type="button" data-action="command" data-value="${command}" ${disabled}>
          ${icon(meta.icon)}<span>${escapeHtml(t(`command.${command}`))}</span></button>`;
      });
    if (!buttons.length) return '';
    const note = !model.remoteEnabled
      ? `<div class="note">${icon('remote')}${escapeHtml(t('ui.remote_disabled_hint'))}</div>`
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

    if (model.doorOpen !== null) {
      push(
        'door',
        model.doorOpen ? t('ui.door_open') : t('ui.door_closed'),
        model.doorOpen ? 'door' : 'door_closed',
      );
    }
    if (model.remote) {
      const label = model.remote.includes('TEMPORARY')
        ? t('ui.remote_locked')
        : model.remoteEnabled
          ? t('ui.remote_on')
          : t('ui.remote_off');
      push('remote', label, 'remote');
    }
    if (model.linkQuality) {
      const quality = model.linkQuality.replace(/_/g, ' ').toLowerCase();
      push('wifi', quality.charAt(0).toUpperCase() + quality.slice(1), 'wifi');
    }
    if (model.cycles !== null) push('cycles', model.cycles, 'counter');
    if (model.rinseAid !== null) push('rinse_aid', `${model.rinseAid}/8`, 'water_percent');
    if (model.waterHardness) push('water_hardness', model.waterHardness, 'water');

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
    const { action, value } = target.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(model?.entities?.appliance_state);
        break;
      case 'program':
        this._selectProgram(value);
        break;
      case 'option':
        this._haptic('light');
        this._call('switch', 'toggle', { entity_id: value });
        break;
      case 'command':
        this._haptic('medium');
        this._call('button', 'press', { entity_id: model.entities[`cmd_${value}`] });
        break;
      case 'delay':
        this._haptic('light');
        this._call('number', 'set_value', {
          entity_id: model.entities.start_time,
          value: Number(value),
        });
        break;
      default:
        break;
    }
  }

  /** Selecting a program while the appliance is off turns it on first. */
  async _selectProgram(label) {
    const model = this._model;
    this._haptic('light');
    if (model.state === STATE.OFF && model.entities.cmd_on) {
      await this._call('button', 'press', { entity_id: model.entities.cmd_on });
      await new Promise((resolve) => window.setTimeout(resolve, 1500));
    }
    await this._call('select', 'select_option', {
      entity_id: model.entities.program,
      option: label,
    });
  }

  _call(domain, service, data) {
    if (!data.entity_id) return Promise.resolve();
    return this._hass.callService(domain, service, data);
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

  _haptic(type) {
    this.dispatchEvent(new CustomEvent('haptic', { detail: type, bubbles: true, composed: true }));
  }
}

export function registerCard() {
  if (customElements.get(CARD_NAME)) return;
  customElements.define(CARD_NAME, AegDishwasherCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'AEG / Electrolux Dishwasher Card',
    description:
      'Rich status card for AEG and Electrolux dishwashers: phases, remaining time, programs, options and controls.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#039be5;font-weight:700;border-radius:3px 0 0 3px',
    'color:#039be5;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0',
  );
}

export { normaliseKey };
