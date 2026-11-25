import { CARD_NAME, CARD_VERSION, EDITOR_NAME, TICK_MS } from './const.js';
import { fill, getLanguage, translator } from './i18n.js';
import { buildModel, clock } from './model.js';
import { listMediaPlayers } from './entities.js';
import { STYLES } from './styles.js';
import { icon } from '../shared/icons.js';
import { escapeHtml } from '../shared/format.js';

export const DEFAULTS = {
  language: 'auto',
  compact: false,
  show_artwork: true,
  show_progress: true,
  show_volume: true,
  show_players: true,
};

/** Card that shows whichever of several media players is actually playing. */
export class MediaRoomCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  static getStubConfig(hass) {
    return {
      type: `custom:${CARD_NAME}`,
      entities: listMediaPlayers(hass)
        .slice(0, 2)
        .map((player) => player.id),
    };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sections = {};
    this._signatures = {};
    this._built = false;
    this._pinned = null;
  }

  setConfig(config) {
    this._config = { ...DEFAULTS, ...(config || {}) };
    this._signatures = {};
    this._pinned = null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  get hass() {
    return this._hass;
  }

  /**
   * The playhead moves whether or not Home Assistant says anything.
   *
   * A player reports its position once and then goes quiet, so without a
   * clock of its own the bar would sit still for minutes at a time. Only the
   * two nodes that carry the time are rewritten here - a full re-render every
   * second would throw away the volume slider under the user's finger.
   */
  connectedCallback() {
    this._timer = window.setInterval(() => this._tick(), TICK_MS);
  }

  disconnectedCallback() {
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  getCardSize() {
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
    wrap.addEventListener('input', (ev) => this._onInput(ev));

    for (const name of ['hero', 'foot', 'vol', 'players']) {
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
    const model = buildModel(this._hass, this._config, t, this._pinned);
    this._model = model;
    this._t = t;

    if (!model.ok) {
      this._renderEmpty(model, t);
      return;
    }
    this._emptyShown = null;
    this._applyWrapClasses(model);

    if (model.idle) {
      this._section('hero', this._quietHtml(model, t));
      this._section('foot', '');
      this._section('vol', '');
      this._section('players', this._config.show_players ? this._playersHtml(model, t) : '');
      return;
    }

    this._section('hero', this._heroHtml(model, t));
    this._section('foot', this._config.show_progress ? this._progHtml(model, t) : '');
    this._section('vol', this._config.show_volume ? this._volHtml(model, t) : '');
    this._section('players', this._config.show_players ? this._playersHtml(model, t) : '');
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    for (const [name, node] of Object.entries(this._sections)) {
      node.innerHTML = '';
      node.hidden = name !== 'hero';
    }
    this._sections.hero.innerHTML = `
      <div class="empty">${icon('cast')}<div>${escapeHtml(t(`ui.${model.reason}`))}</div></div>`;
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
    if (model.state === 'paused') classes.push('paused');
    /* with no picture behind it the text has the whole width, and the hero
       has no reason to stand as tall as a picture would have made it */
    if (!this._config.show_artwork || (!model.artwork && !model.hasMedia)) classes.push('noart');
    /* a contained logo leaves the card's own background behind the header,
       so the badge there does not need the scrim a full-bleed picture wants */
    if (model.logo) classes.push('logo');
    if (this._hass.themes?.darkMode) classes.push('dark');
    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;
  }

  /* ----------------------------- hero ------------------------------- */

  /**
   * The artwork is the card's background, not a tile beside the text.
   *
   * This is the shape Home Assistant's own media control card has, and the
   * reason it works is that a 16:9 still or a poster has nothing worth
   * reading in it: pushed to the right edge and faded out towards the left,
   * it gives the card the colour of what is playing while leaving the half
   * that carries the title plainly legible. A thumbnail in a box does none
   * of that and costs the same space.
   */
  _heroHtml(model, t) {
    const source = [model.app, model.active.name].filter(Boolean);
    const controls = this._controlsHtml(model, t);
    return `
      <div class="hero">
        ${this._config.show_artwork ? this._bgHtml(model) : ''}
        <div class="fg">
          <div class="head">
            <div class="who">
              <div class="room" data-action="more-info">${escapeHtml(model.name)}</div>
              <div class="src">${icon('cast_on')}<span>${escapeHtml(source.join(' · '))}</span></div>
            </div>
            <div class="spacer"></div>
            <div class="pill">${escapeHtml(t(`state.${model.state}`, model.state))}</div>
          </div>
          <div class="body">
            <div class="said">
              <div class="title">${escapeHtml(model.title)}</div>
              ${model.sub ? `<div class="sub">${escapeHtml(model.sub)}</div>` : ''}
              ${
                !model.hasMedia
                  ? `<div class="sub">${escapeHtml(t('ui.nothing_sub_one'))}</div>`
                  : ''
              }
            </div>
            ${controls}
          </div>
        </div>
      </div>`;
  }

  /**
   * Two copies of the same picture: one blurred across the whole card, one
   * sharp on the right.
   *
   * The blurred copy is what gives the left-hand side the colour of the
   * thing playing. Home Assistant's own card gets that colour by reading the
   * dominant one out of the image on a canvas; a blurred copy under a
   * mostly-opaque veil arrives at the same place without touching the pixels
   * - which also means it cannot fail on an image the browser will not let
   * us read.
   */
  _bgHtml(model) {
    if (!model.artwork) {
      return !model.hasMedia
        ? ''
        : `<div class="bg"><div class="mark">${icon(model.icon)}</div><div class="veil"></div></div>`;
    }
    const src = escapeHtml(model.artwork);
    /* a channel logo or an app icon is not a still: cropping it to the strip
       leaves a fragment of a logo, and a blurred copy of one is either a
       colour block or, with transparency, nothing */
    if (model.logo) {
      return `
        <div class="bg logo">
          <img class="shot" src="${src}" alt="" data-action="more-info">
        </div>`;
    }
    return `
      <div class="bg">
        <img class="blur" src="${src}" alt="" aria-hidden="true">
        <img class="shot" src="${src}" alt="" data-action="more-info">
        <div class="veil"></div>
      </div>`;
  }

  _progHtml(model, t) {
    if (!model.progress) return '';
    const { elapsed, duration, remaining, percent } = model.progress;
    return `
      <div class="prog">
        <div class="bar"><i style="width:${percent.toFixed(2)}%"></i></div>
        <div class="times">
          <span data-role="elapsed">${escapeHtml(
            fill(t('ui.of'), { elapsed: clock(elapsed), duration: clock(duration) }),
          )}</span>
          <span data-role="left">${escapeHtml(fill(t('ui.left'), { time: clock(remaining) }))}</span>
        </div>
      </div>`;
  }

  _controlsHtml(model, t) {
    const button = (action, iconName, label, { on = true, main = false, cls = '' } = {}) =>
      `<button class="ctl${main ? ' main' : ''}${cls ? ` ${cls}` : ''}" data-action="${action}"
        title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}" ${on ? '' : 'disabled'}>
        ${icon(iconName)}
      </button>`;

    const parts = [];
    if (model.can.power) parts.push(button('power', 'power', t('ui.power')));
    if (model.can.prev) parts.push(button('prev', 'skip_prev', t('ui.prev')));

    const canToggle = model.can.pause || model.can.play;
    if (canToggle) {
      const pausing = model.playing || model.buffering;
      parts.push(
        button(
          'playpause',
          pausing ? 'pause' : 'play',
          pausing ? t('ui.pause') : t('ui.play'),
          { main: true, on: pausing ? model.can.pause : model.can.play },
        ),
      );
    }
    if (model.can.next) parts.push(button('next', 'skip_next', t('ui.next')));
    if (model.can.stop && model.live) parts.push(button('stop', 'stop', t('ui.stop')));

    return parts.length ? `<div class="controls">${parts.join('')}</div>` : '';
  }

  _volHtml(model, t) {
    const sound = model.sound;
    if (!sound || (!sound.can.set && !sound.can.mute)) return '';
    const percent = sound.level === null ? null : Math.round(sound.level * 100);
    const mute = sound.can.mute
      ? `<button class="mute${sound.muted ? ' on' : ''}" data-action="mute"
          title="${escapeHtml(sound.muted ? t('ui.unmute') : t('ui.mute'))}"
          aria-label="${escapeHtml(sound.muted ? t('ui.unmute') : t('ui.mute'))}">
          ${icon(sound.muted ? 'volume_off' : 'volume')}
        </button>`
      : icon('volume');
    const slider =
      sound.can.set && percent !== null
        ? `<input type="range" min="0" max="100" step="1" value="${percent}"
             data-action="volume" aria-label="${escapeHtml(t('ui.volume'))}">
           <span class="val">${sound.muted ? escapeHtml(t('ui.muted')) : `${percent}%`}</span>`
        : /* without a slider the speaker on its own reads as decoration, so
             it gets the word that says it is a button */
          `<span class="only">${escapeHtml(sound.muted ? t('ui.muted') : t('ui.mute'))}</span>`;
    /* when the sound comes from a different box than the picture, say so -
       otherwise the slider looks like it belongs to the player on screen */
    const whose = sound.other
      ? `<span class="whose">${escapeHtml(sound.name)}</span>`
      : '';
    return `<div class="vol">${mute}${slider}${whose}</div>`;
  }

  _playersHtml(model, t) {
    if (model.players.length < 2 && !model.players.some((player) => player.missing)) return '';
    const chips = model.players
      .map((player) => {
        const shown = model.active?.entityId === player.entityId;
        const live = player.rank >= 4; // on and above
        const classes = ['chip'];
        if (live) classes.push('live');
        if (shown) classes.push('shown');
        if (player.missing) classes.push('gone');
        else if (!live) classes.push('dead');
        const what = player.missing
          ? t('ui.missing_player')
          : t(`state.${player.state}`, player.state);
        return `<button class="${classes.join(' ')}" data-action="pin"
            data-entity="${escapeHtml(player.entityId)}" title="${escapeHtml(player.name)}">
            <span class="dot"></span>
            <span class="label">${escapeHtml(player.name)}</span>
            <span class="what">· ${escapeHtml(what)}</span>
          </button>`;
      })
      .join('');
    return `<div class="players">${chips}</div>`;
  }

  _quietHtml(model, t) {
    const several = model.players.length > 1;
    return `
      <div class="quiet">
        ${icon('cast')}
        <div class="lines">
          <div class="big">${escapeHtml(model.name || t('ui.nothing'))}</div>
          <div class="small">${escapeHtml(
            several ? t('ui.nothing_sub') : t('ui.nothing_sub_one'),
          )}</div>
        </div>
      </div>`;
  }

  /* ---------------------------- ticking ----------------------------- */

  _tick() {
    const model = this._model;
    if (!model?.ok || model.idle || !model.playing || !this._config?.show_progress) return;
    if (!model.progress) return;

    /* recompute from the entity rather than adding a second to the last
       drawing, so a state update that moved the playhead is not fought */
    const fresh = buildModel(this._hass, this._config, this._t, this._pinned);
    if (!fresh.ok || !fresh.progress) return;
    this._model = fresh;

    const bar = this._sections.foot.querySelector('.bar > i');
    const elapsed = this._sections.foot.querySelector('[data-role="elapsed"]');
    const left = this._sections.foot.querySelector('[data-role="left"]');
    if (bar) bar.style.width = `${fresh.progress.percent.toFixed(2)}%`;
    if (elapsed) {
      elapsed.textContent = fill(this._t('ui.of'), {
        elapsed: clock(fresh.progress.elapsed),
        duration: clock(fresh.progress.duration),
      });
    }
    if (left) {
      left.textContent = fill(this._t('ui.left'), { time: clock(fresh.progress.remaining) });
    }
    /* the drawn progress is no longer what the signature says it is */
    this._signatures.foot = null;
  }

  /* ---------------------------- actions ----------------------------- */

  _onInput(ev) {
    const node = ev.target.closest('[data-action="volume"]');
    if (!node) return;
    const percent = Number(node.value);
    const label = node.parentElement.querySelector('.val');
    if (label) label.textContent = `${percent}%`;
    clearTimeout(this._volTimer);
    this._volTimer = setTimeout(() => {
      this._haptic('light');
      this._callOn(this._model?.sound?.entityId, 'volume_set', {
        volume_level: percent / 100,
      });
    }, 200);
  }

  _onClick(ev) {
    const node = ev.target.closest('[data-action]');
    if (!node || node.hasAttribute('disabled')) return;
    const { action, entity } = node.dataset;
    const model = this._model;
    if (!model?.ok) return;

    switch (action) {
      case 'more-info':
        this._moreInfo(entity || model.active?.entityId);
        break;
      case 'pin': {
        /* tapping the player already shown is how you let go of it again */
        this._pinned = this._pinned === entity ? null : entity;
        this._haptic('light');
        this._render();
        break;
      }
      case 'power': {
        const turnOn = !model.live;
        if (turnOn ? !model.can.turnOn : !model.can.turnOff) {
          this._call('toggle', {});
        } else {
          this._call(turnOn ? 'turn_on' : 'turn_off', {});
        }
        this._haptic(turnOn ? 'light' : 'medium');
        break;
      }
      case 'playpause':
        this._haptic('light');
        this._call('media_play_pause', {});
        break;
      case 'prev':
        this._haptic('light');
        this._call('media_previous_track', {});
        break;
      case 'next':
        this._haptic('light');
        this._call('media_next_track', {});
        break;
      case 'stop':
        this._haptic('medium');
        this._call('media_stop', {});
        break;
      case 'mute':
        this._haptic('light');
        this._callOn(model.sound?.entityId, 'volume_mute', {
          is_volume_muted: !model.sound?.muted,
        });
        break;
      default:
        break;
    }
  }

  _call(service, data) {
    return this._callOn(this._model?.active?.entityId, service, data);
  }

  _callOn(entityId, service, data) {
    if (!entityId) return Promise.resolve();
    return this._hass.callService('media_player', service, { entity_id: entityId, ...data });
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
  customElements.define(CARD_NAME, MediaRoomCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_NAME,
    name: 'Media Room Card',
    description:
      'One card for a screen with several players: it shows whichever of them is actually playing, with artwork, progress, transport controls and volume.',
    preview: true,
    documentationURL: 'https://github.com/gabor-io/ha-appliance-custom-card',
  });
  /* eslint-disable no-console */
  console.info(
    `%c ${CARD_NAME} %c ${CARD_VERSION} `,
    'color:#fff;background:#00897b;font-weight:700;border-radius:3px 0 0 3px',
    'color:#00897b;background:#e0f2f1;font-weight:700;border-radius:0 3px 3px 0',
  );
}
