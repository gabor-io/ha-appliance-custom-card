import { CARD_NAME, CARD_VERSION, EDITOR_NAME } from './const.js';
import { getLanguage, translator } from './i18n.js';
import { buildModel } from './model.js';
import { listCarDevices } from './entities.js';
import { renderCar, updateCar } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml } from '../shared/format.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_alerts: true,
  show_panels: true,
  show_drive: true,
  show_trip: true,
  show_service: true,
  show_charging: true,
  show_climate: true,
  show_system: true,
  show_extra: false,
};

/** Sections that are rendered as a `<details>` fold, in card order. */
const FOLDS = [
  { name: 'drive', option: 'show_drive', icon: 'range' },
  { name: 'trip', option: 'show_trip', icon: 'trip' },
  { name: 'service', option: 'show_service', icon: 'service' },
  { name: 'charging', option: 'show_charging', icon: 'charger' },
  { name: 'system', option: 'show_system', icon: 'marker' },
];

/**
 * Read-only status card for a Škoda vehicle exposed by the MySkoda integration.
 * It never calls a service: the only interaction is opening the more-info
 * dialog of the entity behind a row.
 */
export class SkodaCarCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listCarDevices(hass);
    return { type: `custom:${CARD_NAME}`, device: devices[0]?.id };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._open = {};
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
    // keeps the "updated x minutes ago" line honest between state updates
    this._timer = window.setInterval(() => this._render(), 60000);
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
    wrap.addEventListener('toggle', (ev) => this._onToggle(ev), true);

    for (const name of ['header', 'hero', 'alerts', 'panels', 'folds', 'footer']) {
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
    this._section('alerts', this._config.show_alerts ? this._alertsHtml(model, t) : '');
    this._section('panels', this._config.show_panels ? this._panelsHtml(model, t) : '');
    this._section('folds', this._foldsHtml(model, t));
    this._section('footer', this._footerHtml(model, t));
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
        ${icon('car')}
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
    if (model.offline) return 'idle';
    if (model.openCount) return 'paused';
    if (model.moving) return 'running';
    return model.locked === false ? 'paused' : 'ready';
  }

  /* ---------------------------- sections ---------------------------- */

  _headerHtml(model, t) {
    const name = escapeHtml(model.name || t('card_name'));
    const sub = model.spec || '';

    const badges = [];
    if (model.lights) {
      badges.push(`<span class="warn" title="${escapeHtml(t('ui.lights'))}">${icon('lights')}</span>`);
    }
    if (model.offline) {
      badges.push(`<span title="${escapeHtml(t('ui.not_reachable'))}">${icon('wifi_off')}</span>`);
    }

    const lockPill =
      model.locked === null
        ? ''
        : `<div class="pill" data-action="more-info" data-entity="${escapeHtml(model.lockEntity || '')}">
            ${icon(model.locked ? 'lock' : 'lock_open')}
            ${escapeHtml(t(model.locked ? 'state.locked' : 'state.unlocked'))}
          </div>`;

    return `
      <div class="header">
        <div>
          <div class="title" data-action="more-info">${name}</div>
          ${sub ? `<div class="sub">${escapeHtml(sub)}</div>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="badges">${badges.join('')}</div>
        ${lockPill}
      </div>`;
  }

  _heroSection(model, t) {
    // the illustration is built once so its CSS animations never restart
    if (!this._sections.hero.querySelector('.car')) {
      this._sections.hero.innerHTML = `
        <div class="split">
          <div class="stage" data-action="more-info">${renderCar()}</div>
          <div class="primary"></div>
        </div>`;
      this._primaryNode = this._sections.hero.querySelector('.primary');
    }

    const html = this._primaryHtml(model, t);
    if (this._signatures.primary !== html) {
      this._signatures.primary = html;
      this._primaryNode.innerHTML = html;
    }
    updateCar(this._sections.hero, model);
  }

  _primaryHtml(model, t) {
    const parts = [];
    const status = model.offline ? 'offline' : model.moving ? 'moving' : 'parked';

    // the line under the state says what the car is doing, not where it is
    const facts = [];
    if (model.reachable !== null) {
      facts.push(t(model.reachable ? 'ui.reachable' : 'ui.not_reachable'));
    }
    if (model.lights) facts.push(t('ui.lights_on'));
    if (model.chargerConnected) facts.push(t('ui.charging_plug'));
    if (model.batteryProtection) facts.push(t('ui.battery_protection'));

    parts.push(`
      <div class="state-block">
        <div class="state-text">${escapeHtml(t(`status.${status}`))}</div>
        ${facts.length ? `<div class="state-sub">${escapeHtml(facts.join(' · '))}</div>` : ''}
      </div>`);

    if (model.level) {
      const percent = Math.max(0, Math.min(100, Math.round(model.level.value)));
      const tone = percent <= 10 ? ' empty-tank' : percent <= 25 ? ' low' : '';
      const label = model.level.key === 'battery_percentage' ? 'level' : 'fuel';
      const value = model.range?.text
        ? `<b>${percent} ${escapeHtml(model.level.unit)}</b> · ${escapeHtml(model.range.text)}`
        : `<b>${percent} ${escapeHtml(model.level.unit)}</b>`;
      parts.push(`
        <div class="metric${tone}" data-action="more-info" data-entity="${escapeHtml(model.level.entityId)}">
          <div class="top">${icon(label === 'level' ? 'battery_car' : 'fuel')}
            <span>${escapeHtml(t(`ui.${label}`))}</span><span class="val">${value}</span></div>
          <div class="bar"><i style="width:${percent}%"></i></div>
        </div>`);
    } else if (model.range?.text) {
      parts.push(this._lineHtml('range', t('ui.range'), model.range.text, model.range.entityId));
    }

    if (model.odometer?.text) {
      parts.push(this._lineHtml('odometer', t('ui.odometer'), model.odometer.text, model.odometer.entityId));
    }
    for (const row of model.primaryRows) {
      parts.push(this._lineHtml(row.icon, t(`primary.${row.key}`, t(`entity.${row.key}`, row.key)), row.value, row.entityId));
    }

    return parts.join('');
  }

  /** The three summary panels under the alerts: service, last trip, score. */
  _panelsHtml(model, t) {
    const panel = (name, rows) => {
      if (!rows.length) return '';
      const lines = rows
        .map(
          (row) => `
          <div class="line" data-action="more-info" data-entity="${escapeHtml(row.entityId)}">
            <span>${escapeHtml(t(`panel.${row.key}`, t(`entity.${row.key}`, row.key)))}</span>
            <b>${escapeHtml(row.value)}</b>
          </div>`,
        )
        .join('');
      return `
        <div class="panel">
          <h4>${escapeHtml(t(`section.${name}`))}</h4>
          ${lines}
        </div>`;
    };

    const blocks = [
      panel('service', model.panels.service),
      panel('last_trip', model.panels.trip),
      panel('score', model.panels.score),
    ].filter(Boolean);

    if (!blocks.length) return '';
    return `<div class="panels">${blocks.join('')}</div>`;
  }

  /** Where the car is parked and how fresh the data is. */
  _footerHtml(model, t) {
    const place = model.position?.address || model.position?.zone;
    const entityId = model.position?.entityId || model.entities.car_captured || '';
    const line =
      place || model.lastUpdate
        ? `
        <div class="footer" data-action="more-info" data-entity="${escapeHtml(entityId)}">
          <span class="k">${icon('marker')}<span>${escapeHtml(place || t('ui.position'))}</span></span>
          ${model.lastUpdate ? `<span class="v">${escapeHtml(model.lastUpdate.text)}</span>` : ''}
        </div>`
        : '';
    return `${line}
      <div class="readonly">${icon('info')}<span>${escapeHtml(t('ui.read_only'))}</span></div>`;
  }

  _lineHtml(iconName, label, value, entityId) {
    return `
      <div class="line" data-action="more-info" data-entity="${escapeHtml(entityId || '')}">
        <span class="k">${icon(iconName)}<span>${escapeHtml(label)}</span></span>
        <span class="v">${escapeHtml(value)}</span>
      </div>`;
  }

  _alertsHtml(model, t) {
    const items = [];
    if (model.offline) {
      items.push({ severity: 'info', text: t('alert.offline'), iconName: 'wifi_off' });
    }

    const open = (kind) => model.openings.filter((item) => item.open && item.kind === kind);
    const openDoors = open('door');
    const openWindows = open('window');

    // one row per opening reads best up to two; beyond that the card sums them up
    if (openDoors.length > 2) {
      items.push({
        severity: 'warning',
        text: t('alert.doors_open').replace('{count}', openDoors.length),
        iconName: 'car_door',
        entityId: model.entities.doors_open,
      });
    } else {
      for (const item of openDoors) {
        items.push({
          severity: 'warning',
          text: t('alert.door_open').replace('{name}', t(`opening.${item.key}`)),
          iconName: 'car_door',
          entityId: item.entityId,
        });
      }
    }

    if (openWindows.length > 2) {
      items.push({
        severity: 'error',
        text: t('alert.windows_open').replace('{count}', openWindows.length),
        iconName: 'window_open',
        entityId: model.entities.windows_open,
      });
    } else {
      for (const item of openWindows) {
        items.push({
          severity: 'error',
          text: t('alert.window_open').replace('{name}', t(`opening.${item.key}`)),
          iconName: 'window_open',
          entityId: item.entityId,
        });
      }
    }

    for (const item of open('extra')) {
      items.push({
        severity: 'warning',
        text: t(`alert.${item.key}_open`),
        iconName: item.key === 'trunk' ? 'trunk' : item.key === 'bonnet' ? 'bonnet' : 'sunroof',
        entityId: item.entityId,
      });
    }

    if (model.locked === false) {
      items.push({
        severity: 'warning',
        text: t('alert.unlocked'),
        iconName: 'lock_open',
        entityId: model.lockEntity,
      });
    }
    if (model.lights) {
      items.push({
        severity: 'warning',
        text: t('alert.lights_on'),
        iconName: 'lights',
        entityId: model.entities.lights,
      });
    }

    if (!items.length && model.openings.length) {
      items.push({ severity: 'ok', text: t('alert.all_closed'), iconName: 'check' });
    }
    if (!items.length) return '';

    return `<div class="alerts">${items
      .map(
        (item) => `
        <div class="alert ${item.severity === 'ok' ? 'info ok' : item.severity}"
          data-action="more-info" data-entity="${escapeHtml(item.entityId || '')}">
          ${icon(item.iconName)}<span>${escapeHtml(item.text)}</span>
        </div>`,
      )
      .join('')}</div>`;
  }

  _foldsHtml(model, t) {
    const blocks = [];

    for (const fold of FOLDS) {
      if (!this._config[fold.option]) continue;
      const rows = model.rows[fold.name] || [];
      const extra = fold.name === 'system' ? this._systemExtras(model, t) : [];
      if (!rows.length && !extra.length) continue;
      const body = [
        ...extra,
        ...rows.map((row) =>
          this._lineHtml(row.icon, t(`entity.${row.key}`, row.key), row.value, row.entityId),
        ),
      ].join('');
      blocks.push(this._foldHtml(fold.name, fold.icon, t(`section.${fold.name}`), body));
    }

    if (this._config.show_climate && model.climate) {
      const rows = [
        this._lineHtml('ac', t('ui.climate_state'), model.climate.state, model.climate.entityId),
      ];
      if (model.climate.current !== null) {
        rows.push(
          this._lineHtml(
            'snowflake',
            t('ui.current_temp'),
            `${model.climate.current} ${model.climate.unit}`,
            model.climate.entityId,
          ),
        );
      }
      if (model.climate.target !== null) {
        rows.push(
          this._lineHtml(
            'ac',
            t('ui.target_temp'),
            `${model.climate.target} ${model.climate.unit}`,
            model.climate.entityId,
          ),
        );
      }
      blocks.push(this._foldHtml('climate', 'ac', t('section.climate'), rows.join('')));
    }

    if (this._config.show_extra && model.extra.length) {
      const body = model.extra
        .map((item) => this._lineHtml('info', item.name, item.value ?? '–', item.entityId))
        .join('');
      blocks.push(this._foldHtml('extra', 'info', t('section.extra'), body));
    }

    return blocks.join('');
  }

  /** Rows of the system section that do not come from a single entity. */
  _systemExtras(model, t) {
    const out = [];
    if (model.position) {
      out.push(
        this._lineHtml(
          'marker',
          t('ui.position'),
          model.position.address || model.position.zone || '–',
          model.position.entityId,
        ),
      );
    }
    if (model.batteryProtection !== null) {
      out.push(
        this._lineHtml(
          'battery_car',
          t('ui.battery_protection'),
          t(model.batteryProtection ? 'state.on' : 'state.off'),
          model.entities.battery_protection,
        ),
      );
    }
    return out;
  }

  _foldHtml(name, iconName, title, body) {
    const open = this._open[name] ? ' open' : '';
    return `
      <details class="fold" data-fold="${name}"${open}>
        <summary>${icon(iconName)}<span>${escapeHtml(title)}</span>${icon('chevron', 'icon chev')}</summary>
        <div class="body">${body}</div>
      </details>`;
  }

  /* ---------------------------- actions ----------------------------- */

  /** Remembers which folds are open so a re-render does not close them. */
  _onToggle(ev) {
    const details = ev.target;
    if (!details?.dataset?.fold) return;
    this._open[details.dataset.fold] = details.open;
  }

  _onClick(ev) {
    const target = ev.target.closest('[data-action]');
    if (!target) return;
    if (target.dataset.action !== 'more-info') return;
    const entityId =
      target.dataset.entity ||
      this._model?.entities?.lock_vehicle ||
      this._model?.entities?.mileage ||
      this._model?.entities?.position;
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }),
    );
  }
}

export function registerCard() {
  if (customElements.get(CARD_NAME)) return;
  customElements.define(CARD_NAME, SkodaCarCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Škoda Car Card',
    description:
      'Top-view status card for Škoda vehicles (MySkoda): doors, windows, range, service and trips. Status only.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#0e3a2f;font-weight:700;border-radius:3px 0 0 3px',
    'color:#0e3a2f;background:#d6f2e6;font-weight:700;border-radius:0 3px 3px 0',
  );
}
