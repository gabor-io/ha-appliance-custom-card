import { CARD_NAME, CARD_VERSION, EDITOR_NAME, TRENDS } from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listStationDevices } from './entities.js';
import { applyModule, renderDefs, renderModule } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml, formatDecimal } from '../shared/format.js';
import { openDuration } from '../shared/openings.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_art: true,
  show_rooms: true,
  show_co2: true,
  show_alerts: true,
};

let uidCounter = 0;

/** Card for a Netatmo weather station: the base unit and its modules. */
export class NetatmoWeatherCard extends HTMLElement {
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
    this._built = false;
    uidCounter += 1;
    this._uid = `netatmo${uidCounter}`;
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
    const rooms = this._model?.indoor?.length || 1;
    return (this._config?.compact ? 3 : 4) + rooms;
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

    for (const name of ['top', 'hero', 'alerts', 'rooms']) {
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
    this._section('alerts', this._config.show_alerts ? this._alertsHtml(model, t) : '');
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
      <div class="empty">
        ${icon('gauge')}
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

  /**
   * The card takes its colour from the worst air still being reported.
   *
   * A stale module keeps its last number on screen but never paints the
   * card: a red wash sourced from yesterday afternoon would be a lie about
   * right now.
   */
  _applyWrapClasses(model) {
    const classes = ['wrap'];
    if (this._config.compact) classes.push('compact');
    if (!this._config.animate) classes.push('no-animation');
    if (this._hass.themes?.darkMode) classes.push('dark');
    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;

    const accent = model.heroGlow || 'var(--primary-color, #03a9f4)';
    if (this._wrap.style.getPropertyValue('--ap-accent') !== accent) {
      this._wrap.style.setProperty('--ap-accent', accent);
    }
  }

  /* ----------------------------- pieces ----------------------------- */

  _topHtml(model, t) {
    const age =
      model.age === null
        ? ''
        : `<span class="age ${model.quietFor ? 'late' : ''}">${escapeHtml(
            fill(t('ui.updated'), { age: this._ago(model.age, t) }),
          )}</span>`;
    return `
      <div class="top">
        <span class="name" data-action="more-info" data-entity="${escapeHtml(
          model.main?.entityId || '',
        )}">${escapeHtml(this._config.name || t('card_name'))}</span>
        <span class="spacer"></span>
        ${age}
      </div>`;
  }

  /**
   * The hero: the outdoor temperature, big.
   *
   * The drawing is the base station, and its lamp shows the indoor air -
   * which is exactly what the hardware does when you tap its top. The big
   * number next to it is the outdoor temperature, because that is the one
   * people open the card for.
   */
  _heroSection(model, t) {
    if (!this._sections.hero.querySelector('.hero')) {
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="art" data-action="more-info">${renderModule(this._uid, { tall: true })}</div>
          <div class="status"></div>
          <div class="reading"></div>
        </div>`;
      this._heroNode = this._sections.hero.querySelector('.hero');
      this._statusNode = this._sections.hero.querySelector('.status');
      this._readingNode = this._sections.hero.querySelector('.reading');
    }

    const art = this._sections.hero.querySelector('.art');
    art.hidden = !this._config.show_art;
    if (this._config.show_art) {
      applyModule(art.querySelector('.dev'), {
        glow: model.heroGlow,
        dead: Boolean(model.main?.dead),
        stale: Boolean(model.main?.stale),
      });
      art.dataset.entity = model.main?.entityId || '';
    }

    const outdoor = model.outdoor;
    const line = !outdoor
      ? t('state.no_outdoor')
      : outdoor.dead
        ? t('state.outdoor_dead')
        : outdoor.stale
          ? t('state.outdoor_stale')
          : this._trendHtml(outdoor.temperatureTrend, t);

    /* the pressure comes from the base station and the humidity from the
       outdoor module, so a frozen humidity would sit in the same row as a
       live pressure under one badge - drop it rather than mix the two */
    const facts = [];
    if (outdoor?.live && outdoor.humidity !== null) {
      facts.push(this._fact('water_percent', `${Math.round(outdoor.humidity)} %`));
    }
    if (model.pressure !== null) {
      facts.push(
        this._fact(
          'gauge',
          `${formatDecimal(model.pressure, this._hass, 1)} ${escapeHtml(model.pressureUnit)}`,
          this._trendHtml(model.pressureTrend, t),
        ),
      );
    }

    const badge =
      outdoor?.stale || outdoor?.dead
        ? `<span class="tag">${escapeHtml(t(outdoor.dead ? 'ui.dead_badge' : 'ui.stale_badge'))}</span>`
        : '';

    const statusHtml = `
      <div class="cap">${escapeHtml(t('ui.outside'))}${badge}</div>
      <div class="state">${line}</div>
      ${facts.length ? `<div class="facts">${facts.join('')}</div>` : ''}`;
    if (this._signatures.status !== statusHtml) {
      this._signatures.status = statusHtml;
      this._statusNode.innerHTML = statusHtml;
    }

    const value =
      !outdoor || outdoor.dead
        ? '–'
        : `${formatDecimal(outdoor.temperature, this._hass, 1)}<small> °C</small>`;
    const readingHtml = `<div class="big ${outdoor?.live ? '' : 'muted'}">${value}</div>`;
    if (this._signatures.reading !== readingHtml) {
      this._signatures.reading = readingHtml;
      this._readingNode.innerHTML = readingHtml;
    }
  }

  _fact(iconName, value, extra = '') {
    return `<span class="fact">${icon(iconName)}<b>${value}</b>${extra}</span>`;
  }

  /** The trend arrow and its word; nothing at all when the sensor is silent. */
  _trendHtml(trend, t) {
    const key = TRENDS[trend];
    if (!key) return '';
    return `<span class="trend ${escapeHtml(trend)}">${icon(key)}${escapeHtml(
      t(`trend.${trend}`),
    )}</span>`;
  }

  _alertsHtml(model, t) {
    if (!model.alerts.length) return '';
    const rows = model.alerts
      .map(
        (alert) =>
          `<div class="alert${alert.kind ? ` ${alert.kind}` : ''}">${icon(alert.icon)}<span>${escapeHtml(
            fill(t(alert.key), alert.values),
          )}</span></div>`,
      )
      .join('');
    return `<div class="alerts">${rows}</div>`;
  }

  /**
   * The indoor modules.
   *
   * Built once per module and then only updated, so the lamps keep breathing
   * instead of restarting every time a temperature ticks over.
   */
  _roomsSection(model, t) {
    const section = this._sections.rooms;
    if (!this._config.show_rooms || !model.indoor.length) {
      section.innerHTML = '';
      section.hidden = true;
      this._rows.clear();
      return;
    }

    if (!section.querySelector('.rooms')) {
      section.innerHTML = `
        <div class="divider"></div>
        <div class="sec-cap">${escapeHtml(t('ui.rooms'))}</div>
        <div class="rooms"></div>`;
      this._roomsNode = section.querySelector('.rooms');
      this._rows.clear();
    }
    section.hidden = false;

    const seen = new Set();
    for (const module of model.indoor) {
      seen.add(module.deviceId);
      let row = this._rows.get(module.deviceId);
      if (!row) {
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'room';
        el.dataset.action = 'more-info';
        el.innerHTML = `
          <span class="art">${renderModule(this._uid)}</span>
          <span>
            <span class="rname"></span>
            <span class="body"></span>
          </span>`;
        this._roomsNode.appendChild(el);
        row = {
          el,
          dev: el.querySelector('.dev'),
          name: el.querySelector('.rname'),
          body: el.querySelector('.body'),
          sig: {},
        };
        this._rows.set(module.deviceId, row);
      }

      row.el.dataset.entity = module.entityId || '';
      row.el.classList.toggle('dead', module.dead);
      row.el.classList.toggle('stale', module.stale);
      row.el.querySelector('.art').hidden = !this._config.show_art;
      applyModule(row.dev, { glow: module.glow, dead: module.dead, stale: module.stale });

      const badge = module.dead
        ? `<span class="tag quiet">${escapeHtml(t('ui.dead_badge'))}</span>`
        : module.stale
          ? `<span class="tag">${escapeHtml(t('ui.stale_badge'))}</span>`
          : '';
      const nameHtml = `${escapeHtml(module.name)}${badge}`;
      if (row.sig.name !== nameHtml) {
        row.sig.name = nameHtml;
        row.name.innerHTML = nameHtml;
      }

      const bodyHtml = this._roomBodyHtml(module, t);
      if (row.sig.body !== bodyHtml) {
        row.sig.body = bodyHtml;
        row.body.innerHTML = bodyHtml;
      }
    }

    for (const [deviceId, row] of this._rows) {
      if (seen.has(deviceId)) continue;
      row.el.remove();
      this._rows.delete(deviceId);
    }
  }

  _roomBodyHtml(module, t) {
    if (module.dead) {
      return `<span class="rline"><span class="rtemp">–</span></span>
        <div class="quiet">${escapeHtml(t('ui.dead_hint'))}</div>`;
    }

    const facts = [];
    if (module.humidity !== null) facts.push(this._fact('water_percent', `${Math.round(module.humidity)} %`));
    if (module.noise !== null) facts.push(this._fact('noise', `${Math.round(module.noise)} dB`));

    const line = `
      <span class="rline">
        <span class="rtemp">${formatDecimal(module.temperature, this._hass, 1)} °C</span>
        ${module.stale ? '' : this._trendHtml(module.temperatureTrend, t)}
        ${facts.join('')}
      </span>`;

    /* a frozen reading gets no meter: the bar is a "right now" shape and
       would read as current even with the badge next to it */
    if (module.stale) {
      return `${line}<div class="quiet">${escapeHtml(t('ui.stale_hint'))}</div>`;
    }
    if (!this._config.show_co2 || !module.band) return line;

    return `${line}
      <div class="co2">
        <div class="track"><i class="fill-${module.band.level}"
          style="width:${Math.round(module.band.ratio * 100)}%"></i></div>
        <div class="read">
          <span>${escapeHtml(t('ui.co2'))}</span>
          <b>${module.co2} ppm</b>
          <span class="band level-${module.band.level}">${escapeHtml(t(`band.${module.band.level}`))}</span>
        </div>
      </div>`;
  }

  _ago(seconds, t) {
    if (seconds < 90) return t('ui.just_now');
    return openDuration(seconds, t('ui.minute_short'), t('ui.hour_short'));
  }

  /* ---------------------------- actions ----------------------------- */

  _onClick(ev) {
    const node = ev.target.closest('[data-action]');
    if (!node) return;
    if (node.dataset.action === 'more-info') this._moreInfo(node.dataset.entity);
  }

  _moreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }),
    );
  }
}

export function registerCard() {
  if (customElements.get(CARD_NAME)) return;
  customElements.define(CARD_NAME, NetatmoWeatherCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Netatmo Weather Card',
    description:
      'Card for a Netatmo weather station: outdoor temperature, pressure, and CO₂ per room, with modules that have gone quiet called out rather than shown as current.',
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

export { listStationDevices };
