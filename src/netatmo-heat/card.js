import { BATTERY_CRITICAL, BATTERY_WARN, CARD_NAME, CARD_VERSION, EDITOR_NAME, MODES } from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listHeatingDevices } from './entities.js';
import { applyDevice, renderDefs, renderThermostat, renderValve } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatDecimal } from '../shared/format.js';
import { openDuration } from '../shared/openings.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_art: true,
  show_schedule: true,
  show_openings: true,
  show_batteries: true,
};

let uidCounter = 0;

/** Card for a Netatmo heating system: one thermostat, any number of valves. */
export class NetatmoHeatingCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig() {
    return { type: `custom:${CARD_NAME}` };
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
    this._uid = `nheat${uidCounter}`;
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

  connectedCallback() {
    // an open window's age has to keep counting between state updates
    this._timer = window.setInterval(() => this._render(), 60000);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
    return 5 + (this._model?.rooms?.length || 0);
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

    for (const name of ['top', 'hero', 'alerts', 'modes', 'schedule', 'rooms']) {
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
    this._section('modes', this._segHtml(model, t));
    this._section('schedule', this._scheduleHtml(model, t));
    this._roomsSection(model, t);
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
      <div class="empty">${icon('radiator')}
        <div>${escapeHtml(t(`ui.${model.reason}`))}</div>
      </div>`;
  }

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

    const colour = (MODES.find((mode) => mode.key === model.mode) || MODES[0]).colour;
    if (this._wrap.style.getPropertyValue('--ap-accent') !== colour) {
      this._wrap.style.setProperty('--ap-accent', colour);
    }
  }

  /* ---------------------------- sections ---------------------------- */

  _topHtml(model, t) {
    const mode = MODES.find((entry) => entry.key === model.mode) || MODES[0];
    return `
      <div class="top">
        <div>
          <div class="name">${escapeHtml(this._config.name || t('card_name'))}</div>
          <div class="sub">Netatmo · ${escapeHtml(fill(t('ui.rooms_count'), { count: model.rooms.length }))}${
            model.heads.length ? `, ${escapeHtml(fill(t('ui.heads_count'), { count: model.heads.length }))}` : ''}</div>
        </div>
        <div class="spacer"></div>
        <span class="pill">${icon(mode.icon)}${escapeHtml(t(`mode.${mode.key}`))}</span>
      </div>`;
  }

  _heroSection(model, t) {
    if (!this._sections.hero.querySelector('.hero')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="art">${renderThermostat(this._uid)}</div>
          <div class="status"></div>
          <div class="outside"></div>
        </div>`;
      this._statusNode = this._sections.hero.querySelector('.status');
      this._outsideNode = this._sections.hero.querySelector('.outside');
    }

    const art = this._sections.hero.querySelector('.art');
    art.hidden = !this._config.show_art;
    if (this._config.show_art) {
      /* the hero device stands for the house: it glows while anything heats */
      /* the drawing is the wall thermostat, so it shows the thermostat's own
         room; the glow still stands for the whole house */
      const reference =
        model.rooms.find((room) => room.heads.some((head) => /thermostat/i.test(head.label))) ||
        model.rooms.find((room) => room.heating) ||
        model.rooms[0];
      applyDevice(art.querySelector('.dev'), {
        ...reference,
        heating: model.heating > 0,
        request: null,
      });
    }

    const headline = model.heating
      ? fill(t('state.heating_rooms'), { count: model.heating })
      : model.mode === 'frost_guard'
        ? t('state.all_off')
        : t('state.nothing');

    const sub =
      model.mode === 'schedule'
        ? fill(t('sub.schedule'), { name: model.schedule.current || '–' })
        : fill(t(`sub.${model.mode}`), { temp: formatDecimal(model.setpoint, this._hass, 1) });

    const statusHtml = `
      <div class="mode-name">${escapeHtml(t(`mode.${model.mode}`))}</div>
      <div class="state">${escapeHtml(headline)}</div>
      <div class="state-sub">${escapeHtml(sub)}</div>`;
    if (this._signatures.status !== statusHtml) {
      this._signatures.status = statusHtml;
      this._statusNode.innerHTML = statusHtml;
    }

    const outsideHtml =
      model.outside === null
        ? ''
        : `<div class="cap">${escapeHtml(t('ui.outside'))}${
            model.outsideStale ? `<span class="open-badge none">${escapeHtml(t('ui.stale'))}</span>` : ''
          }</div>
           <div class="big ${model.outsideStale ? 'muted' : ''}">${formatDecimal(model.outside, this._hass, 1)}<small> °C</small></div>`;
    if (this._signatures.outside !== outsideHtml) {
      this._signatures.outside = outsideHtml;
      this._outsideNode.innerHTML = outsideHtml;
    }
  }

  _alertsHtml(model, t) {
    const items = [];

    if (model.mode === 'frost_guard') {
      items.push(['', 'frost_guard', fill(t('alert.frost_guard'), { temp: formatDecimal(model.setpoint, this._hass, 1) })]);
    }

    /* an open window only matters while the room is paying to be warm */
    for (const room of model.draughty) {
      items.push([
        'warn',
        'window_open',
        fill(t('alert.window_open'), {
          room: room.name,
          duration: this._ago(room.openings.openFor, t),
        }),
      ]);
    }

    for (const room of model.dead) {
      items.push(['quiet', 'battery', fill(t('alert.room_dead'), { room: room.name })]);
    }
    for (const head of model.batteryLow) {
      const critical = head.battery <= BATTERY_CRITICAL;
      items.push([
        critical ? 'warn' : 'quiet',
        'battery',
        fill(t(critical ? 'alert.battery_critical' : 'alert.battery_low'), {
          room: head.room,
          head: head.label,
          value: head.battery,
        }),
      ]);
    }
    if (model.batterySilent) {
      items.push(['quiet', 'battery', fill(t('alert.battery_silent'), { count: model.batterySilent })]);
    }

    if (!items.length) return '';
    return items
      .map(
        ([cls, iconName, text]) =>
          `<div class="alert ${cls}">${icon(iconName)}<span>${escapeHtml(text)}</span></div>`,
      )
      .join('');
  }

  /** `930` seconds -> "15 perce" */
  _ago(seconds, t) {
    return openDuration(seconds, t('ui.minute_short'), t('ui.hour_short'));
  }

  _segHtml(model, t) {
    const buttons = MODES.map(
      (mode) => `
      <button type="button" data-action="mode" data-value="${mode.key}"
        aria-pressed="${mode.key === model.mode}">
        ${icon(mode.icon)}<span>${escapeHtml(t(`mode.${mode.key}`))}</span>
      </button>`,
    ).join('');
    return `<div class="seg">${buttons}</div>`;
  }

  _scheduleHtml(model, t) {
    if (!this._config.show_schedule) return '';
    /* the schedule only means anything while the house follows one */
    if (model.mode !== 'schedule' || !model.schedule.options.length) return '';
    const chips = model.schedule.options
      .map(
        (option) => `
        <button type="button" class="chip" data-action="schedule" data-value="${escapeHtml(option)}"
          aria-pressed="${option === model.schedule.current}">${escapeHtml(option)}</button>`,
      )
      .join('');
    return `
      <div>
        <div class="cap" style="margin-bottom:6px">${escapeHtml(t('ui.schedule'))}</div>
        <div class="chips">${chips}</div>
      </div>`;
  }

  /**
   * The room rows.
   *
   * Built once per room and then only updated, so the glow keeps breathing
   * instead of restarting whenever a temperature ticks over.
   */
  _roomsSection(model, t) {
    const section = this._sections.rooms;
    if (!section.querySelector('.rooms')) {
      section.innerHTML = `
        <div class="divider"></div>
        <div class="cap">${escapeHtml(t('ui.rooms'))}<span class="hint">${escapeHtml(t('ui.tap_hint'))}</span></div>
        <div class="rooms"></div>`;
      this._roomsNode = section.querySelector('.rooms');
      this._rows.clear();
    }
    section.hidden = false;

    const seen = new Set();
    for (const room of model.rooms) {
      seen.add(room.entityId);
      let row = this._rows.get(room.entityId);
      if (!row) {
        const el = document.createElement('div');
        el.className = 'room';
        el.innerHTML = `
          <button class="rhead" type="button" data-action="toggle-row" data-room="${escapeHtml(room.entityId)}">
            <div class="art">${room.heads.some((head) => /thermostat/.test(head.label))
              ? renderThermostat(this._uid)
              : renderValve(this._uid)}</div>
            <span><span class="rname"></span><span class="rstate"></span></span>
            <span class="rtemp"></span>
            ${icon('chevron', 'icon caret')}
            <div class="req" hidden><div class="track"><i></i></div></div>
          </button>
          <div class="rbody"></div>`;
        this._roomsNode.appendChild(el);
        row = {
          el,
          dev: el.querySelector('.dev'),
          name: el.querySelector('.rname'),
          state: el.querySelector('.rstate'),
          temp: el.querySelector('.rtemp'),
          req: el.querySelector('.req'),
          bar: el.querySelector('.req i'),
          body: el.querySelector('.rbody'),
          sig: {},
        };
        this._rows.set(room.entityId, row);
      }

      const open = this._open.has(room.entityId);
      row.el.classList.toggle('open', open);
      row.el.classList.toggle('dead', !room.available);
      row.el.style.setProperty('--row-accent', this._roomColour(room, model.mode));
      applyDevice(row.dev, room);

      const openBadge = this._openBadge(room, t);
      const nameHtml = `${escapeHtml(room.name)}${
        room.heads.length > 1 ? ` <em>· ${escapeHtml(fill(t('ui.heads_count'), { count: room.heads.length }))}</em>` : ''
      }${openBadge}`;
      if (row.sig.name !== nameHtml) {
        row.sig.name = nameHtml;
        row.name.innerHTML = nameHtml;
      }

      const stateHtml = `${escapeHtml(this._roomState(room, model.mode, t))}${
        room.heating && room.request !== null ? `<em> · ${room.request} %</em>` : ''
      }`;
      if (row.sig.state !== stateHtml) {
        row.sig.state = stateHtml;
        row.state.innerHTML = stateHtml;
      }

      const tempHtml = room.available
        ? `${formatDecimal(room.current, this._hass, 1)} °C → <b>${formatDecimal(room.target, this._hass, 1)} °C</b>`
        : '<b>–</b>';
      if (row.sig.temp !== tempHtml) {
        row.sig.temp = tempHtml;
        row.temp.innerHTML = tempHtml;
      }

      const showBar = room.heating && room.request !== null;
      row.req.hidden = !showBar;
      if (showBar) row.bar.style.width = `${Math.min(100, room.request)}%`;

      const bodyHtml = open ? this._roomBodyHtml(room, t) : '';
      if (row.sig.body !== bodyHtml) {
        row.sig.body = bodyHtml;
        row.body.innerHTML = bodyHtml;
      }
    }

    for (const [entityId, row] of this._rows) {
      if (seen.has(entityId)) continue;
      row.el.remove();
      this._rows.delete(entityId);
    }
  }

  _roomColour(room, mode) {
    if (!room.available) return 'var(--nh-idle)';
    if (room.heating) return 'var(--nh-heat)';
    if (mode === 'frost_guard') return 'var(--nh-frost)';
    if (mode === 'away') return 'var(--nh-away)';
    return 'var(--nh-idle)';
  }

  _roomState(room, mode, t) {
    if (!room.available) return t('room.unavailable');
    if (room.boost) return t('room.boost');
    if (room.heating) return t('room.heating');
    if (mode === 'frost_guard') return t('room.frost_guard');
    if (mode === 'away') return t('room.away');
    return t('room.reached');
  }

  /** A quiet badge on the room name when a window is open there. */
  _openBadge(room, t) {
    if (!this._config.show_openings) return '';
    const openings = room.openings;
    if (openings.none) {
      return `<span class="open-badge none">${icon('window_open')}${escapeHtml(t('ui.no_sensor'))}</span>`;
    }
    if (!openings.open) return '';
    const label =
      openings.open > 1
        ? fill(t('ui.windows_open'), { count: openings.open })
        : t('ui.window_open');
    return `<span class="open-badge">${icon('window_open')}${escapeHtml(label)}</span>`;
  }

  _roomBodyHtml(room, t) {
    if (!room.available) {
      return `<div class="quiet">${escapeHtml(t('ui.dead_hint'))}</div>${this._headsHtml(room, t)}`;
    }

    const disabled = room.target === null;
    const controls = `
      <div class="rrow">
        <div class="chips">
          <button type="button" class="chip" data-action="boost" data-room="${escapeHtml(room.entityId)}"
            aria-pressed="${room.boost}">${icon('boost')}${escapeHtml(t('ui.boost'))}</button>
          ${room.canTurnOff
            ? `<button type="button" class="chip" data-action="off" data-room="${escapeHtml(room.entityId)}"
                 aria-pressed="${room.mode === 'off'}">${icon('power')}${escapeHtml(t('ui.turn_off'))}</button>`
            : ''}
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="updown">
            <button type="button" data-action="temp" data-room="${escapeHtml(room.entityId)}" data-dir="-1"
              ${disabled || room.target <= room.minTemp ? 'disabled' : ''}>${icon('chevron')}</button>
            <button type="button" data-action="temp" data-room="${escapeHtml(room.entityId)}" data-dir="1"
              ${disabled || room.target >= room.maxTemp ? 'disabled' : ''}>${icon('chevron_up')}</button>
          </div>
          <div class="big">${formatDecimal(room.target, this._hass, 1)}<small> °C</small></div>
        </div>
      </div>`;

    return `${controls}${this._openingsHtml(room, t)}${this._headsHtml(room, t)}`;
  }

  _openingsHtml(room, t) {
    if (!this._config.show_openings || room.openings.none) return '';
    const open = room.openings;
    if (!open.open) return '';
    return `<div class="tags"><span class="tag low">${icon('window_open')}
      ${escapeHtml(open.longest?.name || t('ui.window_open'))}
      <b>${escapeHtml(this._ago(open.openFor, t))}</b></span></div>`;
  }

  _headsHtml(room, t) {
    if (!this._config.show_batteries || !room.heads.length) return '';
    const tags = room.heads
      .map((head) => {
        const cls = head.battery === null ? 'silent' : head.battery <= BATTERY_WARN ? 'low' : '';
        const value = head.battery === null ? t('ui.silent') : `${head.battery} %`;
        return `<span class="tag ${cls}" data-action="more-info" data-entity="${escapeHtml(head.entityId)}">
          ${icon('battery')}${escapeHtml(head.label)} <b>${escapeHtml(value)}</b></span>`;
      })
      .join('');
    return `<div class="tags">${tags}</div>`;
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const node = ev.target.closest('[data-action]');
    if (!node || node.hasAttribute('disabled')) return;
    const { action, room, value, dir, entity } = node.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity);
        break;
      case 'toggle-row':
        this._haptic('selection');
        if (this._open.has(room)) this._open.delete(room);
        else this._open.add(room);
        this._render();
        break;
      case 'mode':
        this._haptic('medium');
        /* Netatmo applies the preset to the whole house, so every room gets it */
        this._call('set_preset_mode', {
          entity_id: model.rooms.map((item) => item.entityId),
          preset_mode: value,
        });
        break;
      case 'schedule':
        this._haptic('light');
        if (model.schedule.entityId) {
          this._hass.callService('select', 'select_option', {
            entity_id: model.schedule.entityId,
            option: value,
          });
        }
        break;
      case 'boost': {
        this._haptic('light');
        const target = model.rooms.find((item) => item.entityId === room);
        this._call('set_preset_mode', {
          entity_id: room,
          preset_mode: target?.boost ? 'schedule' : 'boost',
        });
        break;
      }
      case 'off':
        this._haptic('medium');
        this._call('set_hvac_mode', { entity_id: room, hvac_mode: 'off' });
        break;
      case 'temp':
        this._stepTemperature(room, Number(dir));
        break;
      default:
        break;
    }
  }

  _stepTemperature(entityId, direction) {
    const room = this._model?.rooms?.find((item) => item.entityId === entityId);
    if (!room || room.target === null) return;
    const next = Math.min(
      room.maxTemp,
      Math.max(room.minTemp, Math.round((room.target + direction * room.step) * 10) / 10),
    );
    if (next === room.target) return;
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
  customElements.define(CARD_NAME, NetatmoHeatingCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Netatmo Heating Card',
    description:
      'Card for a Netatmo heating system: rooms, schedules, frost guard, battery levels and open windows.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#f57c00;font-weight:700;border-radius:3px 0 0 3px',
    'color:#f57c00;background:#fff3e0;font-weight:700;border-radius:0 3px 3px 0',
  );
}
