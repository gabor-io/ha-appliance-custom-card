import {
  CARD_NAME,
  CARD_VERSION,
  DEFAULT_LAYOUT,
  EDITOR_NAME,
  LAYOUTS,
  WHITE_PRESETS,
  WIDE_RATIO,
} from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildModel, kelvinColour, knownEffect, paletteFor, stateKey, subKey } from './model.js';
import { listNanoleafDevices } from './entities.js';
import { applyPanels, geometry, renderDefs, renderPanels } from './graphics.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml } from '../shared/format.js';
import { openDuration } from '../shared/openings.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  animate: true,
  show_art: true,
  show_brightness: true,
  show_effects: true,
  show_white: true,
  show_touch: true,
  show_identify: true,
};

let uidCounter = 0;

/** Card for a set of Nanoleaf Shapes panels. */
export class NanoleafShapesCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    const devices = listNanoleafDevices(hass);
    return { type: `custom:${CARD_NAME}`, device: devices[0]?.id };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
    uidCounter += 1;
    this._uid = `nl${uidCounter}`;
  }

  setConfig(config) {
    this._config = { ...DEFAULTS, ...(config || {}) };
    this._signatures = {};
    /* the cluster is emitted from the layout, so a changed layout has to
       throw the old drawing away rather than reclass it */
    this._layoutKey = null;
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
    return this._config?.compact ? 4 : 6;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  get _layout() {
    const given = this._config?.layout;
    /* a wall can be named rather than spelled out */
    if (typeof given === 'string') return LAYOUTS[given] || DEFAULT_LAYOUT;
    if (!Array.isArray(given) || !given.length) return DEFAULT_LAYOUT;
    return given
      .map((cell) => (Array.isArray(cell) ? [Number(cell[0]), Number(cell[1])] : null))
      .filter((cell) => cell && Number.isFinite(cell[0]) && Number.isFinite(cell[1]));
  }

  /* ------------------------------------------------------------------ */

  _build() {
    const style = document.createElement('style');
    style.textContent = STYLES;

    const card = document.createElement('ha-card');
    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.addEventListener('click', (ev) => this._onClick(ev));
    wrap.addEventListener('input', (ev) => this._onInput(ev));
    wrap.insertAdjacentHTML('beforeend', renderDefs(this._uid));

    for (const name of ['top', 'hero', 'bright', 'scenes', 'whites', 'buttons']) {
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
    this._section('bright', this._config.show_brightness ? this._brightHtml(model, t) : '');
    this._section('scenes', this._config.show_effects ? this._scenesHtml(model, t) : '');
    this._section('whites', this._config.show_white ? this._whitesHtml(model, t) : '');
    this._section('buttons', this._buttonsHtml(model, t));
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    this._wrap.style.setProperty('--ap-accent', 'var(--state-icon-color, #8a9199)');
    for (const [name, node] of Object.entries(this._sections)) {
      node.innerHTML = '';
      node.hidden = name !== 'top';
    }
    this._sections.top.innerHTML = `
      <div class="empty">
        ${icon('bulb')}
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

    /* the card takes its accent from whatever is on the wall */
    const accent = !model.on
      ? 'var(--state-icon-color, #8a9199)'
      : model.mode === 'effect'
        ? model.palette[Math.floor(model.palette.length / 2)]
        : model.mode === 'white'
          ? model.kelvinCss
          : model.hs?.css || 'var(--primary-color, #03a9f4)';
    if (this._wrap.style.getPropertyValue('--ap-accent') !== accent) {
      this._wrap.style.setProperty('--ap-accent', accent);
    }
  }

  /* ---------------------------- header ------------------------------ */

  _topHtml(model, t) {
    const readings = [];
    /* nothing from the device is worth repeating while the card is busy
       saying the device is not answering */
    if (!model.available) return this._headerHtml(model, '');
    if (model.brightnessPct !== null && model.on) {
      readings.push(`<span>${icon('brightness')}<b>${model.brightnessPct}%</b></span>`);
    }
    if (this._config.show_touch && model.gesture) {
      readings.push(
        `<span>${icon('touch')}<b>${escapeHtml(t(`gesture.${model.gesture.type}`, model.gesture.type))}</b></span>`,
      );
    }
    return this._headerHtml(model, readings.join(''));
  }

  _headerHtml(model, readings) {
    return `
      <div class="top">
        <div>
          <div class="name" data-action="more-info">${escapeHtml(model.name)}</div>
          ${model.model ? `<div class="sub">${escapeHtml(model.model)}</div>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="ind">${readings}</div>
      </div>`;
  }

  /* ----------------------------- hero ------------------------------- */

  _heroSection(model, t) {
    const layoutKey = JSON.stringify(this._layout);
    if (layoutKey !== this._layoutKey) {
      this._layoutKey = layoutKey;
      this._sections.hero.innerHTML = `
        <div class="hero">
          <div class="art" data-action="toggle">${renderPanels(this._uid, this._layout)}</div>
          <div class="status"></div>
        </div>`;
      this._heroNode = this._sections.hero.querySelector('.hero');
      this._statusNode = this._sections.hero.querySelector('.status');
      this._signatures.status = null;
    }

    const wantArt = this._config.show_art;
    const { width, height } = geometry(this._layout);
    this._heroNode.classList.toggle('wide', wantArt && width / height >= WIDE_RATIO);
    this._heroNode.classList.toggle('no-art', !wantArt);
    const art = this._sections.hero.querySelector('.art');
    art.hidden = !wantArt;
    if (wantArt) applyPanels(art.querySelector('.panels'), model);

    const state = stateKey(model);
    const sub = subKey(model);
    const statusHtml = `
      <div class="mode-name">${escapeHtml(t(`mode.${model.mode}`))}</div>
      <div class="state">${escapeHtml(fill(t(state.key), state))}</div>
      <div class="state-sub">${escapeHtml(sub.key ? fill(t(sub.key), sub) : '')}</div>
      ${this._seg(model, t)}`;
    if (this._signatures.status !== statusHtml) {
      this._signatures.status = statusHtml;
      this._statusNode.innerHTML = statusHtml;
    }
  }

  _seg(model, t) {
    const button = (value, iconName, label, pressed) => `
      <button type="button" data-action="power" data-value="${value}" aria-pressed="${pressed}"
        ${model.available ? '' : 'disabled'}>${icon(iconName)}<span>${escapeHtml(label)}</span></button>`;
    return `<div class="seg">
      ${button('off', 'power', t('power.off'), model.available && !model.on)}
      ${button('on', 'bulb', t('power.on'), model.on)}
    </div>`;
  }

  /* --------------------------- brightness --------------------------- */

  _brightHtml(model, t) {
    const value = model.brightnessPct ?? 0;
    return `
      <div class="bright">
        ${icon('brightness')}
        <input type="range" min="1" max="100" step="1" value="${value}"
          data-action="brightness" aria-label="${escapeHtml(t('ui.brightness'))}"
          ${model.on ? '' : 'disabled'}>
        <span class="val">${model.on ? `${value}%` : '–'}</span>
      </div>`;
  }

  /* ----------------------------- scenes ----------------------------- */

  /**
   * The effect list as swatches.
   *
   * Home Assistant is handed the names only, so the colours are the card's
   * own reading of the stock scenes. A scene it has no palette for - one of
   * the owner's own making - gets a neutral swatch and says so on hover,
   * rather than being painted with colours nobody promised.
   */
  _scenesHtml(model, t) {
    if (!model.effects.length) return '';
    const chips = model.effects
      .map((name) => {
        const palette = paletteFor(name);
        const known = knownEffect(name);
        const gradient = `linear-gradient(135deg, ${palette.join(', ')})`;
        return `
        <button type="button" class="scene-chip${known ? '' : ' unknown'}"
          data-action="effect" data-value="${escapeHtml(name)}"
          aria-pressed="${model.effect === name}" ${model.available ? '' : 'disabled'}
          ${known ? '' : `title="${escapeHtml(t('ui.unknown_effect'))}"`}>
          <span class="swatch" style="background:${gradient}"></span>${escapeHtml(name)}
        </button>`;
      })
      .join('');
    return `<div class="section">
      <div class="section-title">${escapeHtml(t('ui.effects'))}</div>
      <div class="scenes">${chips}</div>
    </div>`;
  }

  /* ----------------------------- whites ----------------------------- */

  _whitesHtml(model, t) {
    const presets = WHITE_PRESETS.filter(
      (kelvin) => kelvin >= model.kelvinMin && kelvin <= model.kelvinMax,
    );
    if (!presets.length) return '';
    const chips = presets
      .map(
        (kelvin) => `
        <button type="button" class="white-chip" data-action="kelvin" data-value="${kelvin}"
          style="background:${kelvinColour(kelvin)}"
          aria-pressed="${model.mode === 'white' && model.kelvin === kelvin}"
          ${model.available ? '' : 'disabled'}
          aria-label="${kelvin} K" title="${kelvin} K"></button>`,
      )
      .join('');
    return `<div class="whites"><span class="cap">${escapeHtml(t('ui.white'))}</span>${chips}</div>`;
  }

  /* ---------------------------- buttons ----------------------------- */

  _buttonsHtml(model, t) {
    const buttons = [];

    /* the hue wheel belongs to the light entity's own dialog: a second
       colour picker here would be one more thing to keep in step with it */
    buttons.push(`
      <button type="button" class="ghost" data-action="more-info" data-entity="${escapeHtml(model.entityId)}">
        ${icon('palette')}${escapeHtml(t('ui.open_colour'))}
      </button>`);

    if (this._config.show_identify && model.entities.identify) {
      buttons.push(`
        <button type="button" class="ghost" data-action="identify" ${model.available ? '' : 'disabled'}>
          ${icon('sparkle')}${escapeHtml(t('ui.identify'))}
        </button>`);
    }

    if (this._config.show_touch && model.touchable) {
      const text = model.gesture
        ? `<b>${escapeHtml(t(`gesture.${model.gesture.type}`, model.gesture.type))}</b> · ${escapeHtml(
            openDuration(model.gesture.secondsAgo, t('ui.minute_short'), t('ui.hour_short')),
          )}`
        : escapeHtml(t('ui.touch_never'));
      buttons.push(`
        <span class="touch" data-action="more-info" data-entity="${escapeHtml(model.entities.touch || '')}">
          ${icon('touch')}${text}
        </span>`);
    }

    return `<div class="btnrow">${buttons.join('')}</div>`;
  }

  /* ---------------------------- actions ----------------------------- */

  _onInput(ev) {
    const node = ev.target.closest('[data-action="brightness"]');
    if (!node || node.hasAttribute('disabled')) return;
    const percent = Number(node.value);
    const label = node.parentElement.querySelector('.val');
    if (label) label.textContent = `${percent}%`;
    /* the slider fires on every pixel of the drag; the panels only need the
       value the finger came to rest on */
    clearTimeout(this._brightTimer);
    this._brightTimer = setTimeout(() => {
      this._haptic('light');
      this._call('turn_on', { brightness: Math.round((percent / 100) * 255) });
    }, 220);
  }

  _onClick(ev) {
    const node = ev.target.closest('[data-action]');
    if (!node || node.hasAttribute('disabled')) return;
    const { action, entity, value } = node.dataset;
    const model = this._model;
    if (!model?.ok && action !== 'more-info') return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity || model?.entityId);
        break;
      case 'toggle':
      case 'power': {
        const turnOn = action === 'toggle' ? !model.on : value === 'on';
        this._haptic(turnOn ? 'light' : 'medium');
        this._call(turnOn ? 'turn_on' : 'turn_off', {});
        break;
      }
      case 'effect':
        this._haptic('light');
        this._call('turn_on', { effect: value });
        break;
      case 'kelvin':
        this._haptic('light');
        this._call('turn_on', { color_temp_kelvin: Number(value) });
        break;
      case 'identify':
        this._haptic('medium');
        this._hass.callService('button', 'press', { entity_id: model.entities.identify });
        break;
      default:
        break;
    }
  }

  _call(service, data) {
    const model = this._model;
    if (!model?.entityId) return Promise.resolve();
    return this._hass.callService('light', service, { entity_id: model.entityId, ...data });
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
  customElements.define(CARD_NAME, NanoleafShapesCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Nanoleaf Shapes Card',
    description:
      'Card for Nanoleaf Shapes: the panels drawn in their own arrangement and lit by what is running on them, scenes as colour swatches, brightness, white presets and the last touch gesture.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#7c4dff;font-weight:700;border-radius:3px 0 0 3px',
    'color:#7c4dff;background:#ede7f6;font-weight:700;border-radius:0 3px 3px 0',
  );
}
