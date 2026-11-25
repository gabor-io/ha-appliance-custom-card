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

    for (const name of ['head', 'main', 'vol', 'players']) {
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
      this._section('head', '');
      this._section('main', this._quietHtml(model, t));
      this._section('vol', '');
      this._section('players', this._config.show_players ? this._playersHtml(model, t) : '');
      return;
    }

    this._section('head', this._headHtml(model, t));
    this._section('main', this._mainHtml(model, t));
    this._section('vol', this._config.show_volume ? this._volHtml(model, t) : '');
    this._section('players', this._config.show_players ? this._playersHtml(model, t) : '');
  }

  _renderEmpty(model, t) {
    if (this._emptyShown === model.reason) return;
    this._emptyShown = model.reason;
    this._signatures = {};
    for (const [name, node] of Object.entries(this._sections)) {
      node.innerHTML = '';
      node.hidden = name !== 'head';
    }
    this._sections.head.innerHTML = `
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
    if (this._hass.themes?.darkMode) classes.push('dark');
    const next = classes.join(' ');
    if (this._wrap.className !== next) this._wrap.className = next;
  }

  /* ---------------------------- header ------------------------------ */

  _headHtml(model, t) {
    /* the whole point of merging two players is that the card no longer says
       which box it is - so the box goes in the subtitle, where it belongs */
    const source = [model.app, model.active.name].filter(Boolean);
    return `
      <div class="head">
        <div class="who">
          <div class="room" data-action="more-info">${escapeHtml(model.name)}</div>
          <div class="src">${icon('cast_on')}<span>${escapeHtml(source.join(' · '))}</span></div>
        </div>
        <div class="spacer"></div>
        <div class="pill">${escapeHtml(t(`state.${model.state}`, model.state))}</div>
      </div>`;
  }

  /* ----------------------------- body ------------------------------- */

  /**
   * Artwork on the left, everything about the thing playing on the right.
   *
   * Progress and transport live in that right-hand column rather than under
   * the whole card, because a poster is tall and two lines of title are not:
   * laid out the other way the card has a hole beside the picture the size
   * of the picture.
   */
  _mainHtml(model, t) {
    const art = this._config.show_artwork ? this._artHtml(model) : '';
    const progress = this._config.show_progress ? this._progHtml(model, t) : '';
    return `
      <div class="now${art ? '' : ' noart'}">
        ${art}
        <div class="meta">
          <div class="said">
            <div class="title">${escapeHtml(model.title)}</div>
            ${model.sub ? `<div class="sub">${escapeHtml(model.sub)}</div>` : ''}
            ${
              !model.hasMedia
                ? `<div class="sub">${escapeHtml(t('ui.nothing_sub_one'))}</div>`
                : ''
            }
          </div>
          ${progress}
          ${this._controlsHtml(model, t)}
        </div>
      </div>`;
  }

  _artHtml(model) {
    /* a player that is merely on is not playing anything, so there is no
       picture to show and an empty tile the height of a poster is just a
       hole in the card */
    if (!model.artwork && !model.hasMedia) return '';
    /* an album cover is square, a channel logo or a game is landscape and a
       film is a tall poster; forcing one shape on all three crops whichever
       two are wrong, so the box follows the content type */
    const type = String(model.active.stateObj?.attributes?.media_content_type || '').toLowerCase();
    const shape = ['music', 'playlist', 'podcast'].includes(type)
      ? ' square'
      : ['channel', 'app', 'game', 'url', 'video'].includes(type)
        ? ' wide'
        : '';
    const inner = model.artwork
      ? `<img src="${escapeHtml(model.artwork)}" alt="" loading="lazy">`
      : icon(model.icon);
    const code =
      model.sub && /^S\d+E\d+$/.test(model.sub.split(' · ').pop() || '')
        ? model.sub.split(' · ').pop()
        : null;
    return `<div class="art${shape}" data-action="more-info">
      ${inner}${code ? `<span class="tag">${escapeHtml(code)}</span>` : ''}
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
    if (model.can.power) {
      parts.push(
        button('power', 'power', t('ui.power'), { cls: model.live ? 'off' : '' }),
      );
    }
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
    if (!model.can.volume && !model.can.mute) return '';
    const percent = model.volume === null ? null : Math.round(model.volume * 100);
    const mute = model.can.mute
      ? `<button class="mute${model.muted ? ' on' : ''}" data-action="mute"
          title="${escapeHtml(model.muted ? t('ui.unmute') : t('ui.mute'))}"
          aria-label="${escapeHtml(model.muted ? t('ui.unmute') : t('ui.mute'))}">
          ${icon(model.muted ? 'volume_off' : 'volume')}
        </button>`
      : icon('volume');
    const slider =
      model.can.volume && percent !== null
        ? `<input type="range" min="0" max="100" step="1" value="${percent}"
             data-action="volume" aria-label="${escapeHtml(t('ui.volume'))}">
           <span class="val">${model.muted ? escapeHtml(t('ui.muted')) : `${percent}%`}</span>`
        : /* without a slider the speaker on its own reads as decoration, so
             it gets the word that says it is a button */
          `<span class="only">${escapeHtml(model.muted ? t('ui.muted') : t('ui.mute'))}</span>`;
    return `<div class="vol">${mute}${slider}</div>`;
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
    const progress = this._model.progress;
    if (!progress) return;

    /* recompute from the entity rather than adding a second to the last
       drawing, so a state update that moved the playhead is not fought */
    const fresh = buildModel(this._hass, this._config, this._t, this._pinned);
    if (!fresh.ok || !fresh.progress) return;
    this._model = fresh;

    const bar = this._sections.main.querySelector('.bar > i');
    const elapsed = this._sections.main.querySelector('[data-role="elapsed"]');
    const left = this._sections.main.querySelector('[data-role="left"]');
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
    this._signatures.main = null;
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
      this._call('volume_set', { volume_level: percent / 100 });
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
        this._call('volume_mute', { is_volume_muted: !model.muted });
        break;
      default:
        break;
    }
  }

  _call(service, data) {
    const entityId = this._model?.active?.entityId;
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
