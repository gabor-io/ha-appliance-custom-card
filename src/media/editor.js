/**
 * Visual editor for the media room card.
 *
 * The shared editor builds a single-device picker, which this card cannot
 * use: it is about a list, and the order of that list is a setting in its own
 * right - it decides which player wins when both report the same state. So
 * the chosen players are shown as an ordered list with the arrows to move
 * them, and everything else follows the family's form.
 */

import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { configuredPlayers, listMediaPlayers } from './entities.js';
import { escapeHtml } from '../shared/format.js';

const EDITOR_STYLES = `
:host { display: block; }
.form { display: grid; gap: 14px; padding: 4px 0; }
label { display: grid; gap: 4px; font-size: .85rem; color: var(--secondary-text-color, #70757a); }
input[type="text"], select {
  font: inherit; padding: 9px 10px; border-radius: 10px;
  border: 1px solid var(--divider-color, rgba(127,127,127,.35));
  background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121);
}
.title { font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--secondary-text-color, #70757a); margin-top: 4px; }
.hint { font-size: .78rem; color: var(--secondary-text-color, #70757a); }
.chosen { display: grid; gap: 6px; }
.row {
  display: flex; align-items: center; gap: 8px; padding: 7px 10px;
  border: 1px solid var(--divider-color, rgba(127,127,127,.35)); border-radius: 10px;
  color: var(--primary-text-color, #212121); font-size: .85rem;
}
.row .grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.row .id { font-size: .72rem; color: var(--secondary-text-color, #70757a); }
.row button {
  font: inherit; cursor: pointer; border: none; background: none; padding: 2px 6px;
  color: var(--secondary-text-color, #70757a); border-radius: 6px;
}
.row button:hover { background: var(--divider-color, rgba(127,127,127,.2)); }
.row button[disabled] { opacity: .3; cursor: default; }
.toggles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px; }
.toggle { display: flex; align-items: center; gap: 8px; font-size: .85rem;
  color: var(--primary-text-color, #212121); cursor: pointer; }
`;

const TOGGLES = ['show_artwork', 'show_progress', 'show_volume', 'show_players', 'compact'];

export class MediaRoomCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  /* as in the shared editor: the form is rebuilt only when the list of
     players changes, and never while something in it has focus */
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) {
      this._render();
      return;
    }
    if (this.shadowRoot.activeElement) return;
    if (this._playerSignature() === this._players) return;
    this._render();
  }

  _playerSignature() {
    if (!this._hass) return '';
    return listMediaPlayers(this._hass)
      .map((player) => `${player.id}:${player.name}`)
      .join('|');
  }

  _chosen() {
    return configuredPlayers(this._config).map((item) => item.entityId);
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._players = this._playerSignature();
    const t = translator(getLanguage(this._config, this._hass));
    const all = listMediaPlayers(this._hass);
    const names = new Map(all.map((player) => [player.id, player.name]));
    const chosen = this._chosen();

    const rows = chosen
      .map(
        (entityId, index) => `
        <div class="row">
          <span class="grow">${escapeHtml(names.get(entityId) || entityId)}
            <span class="id">${escapeHtml(entityId)}</span></span>
          <button data-move="${index}" data-dir="-1" ${index === 0 ? 'disabled' : ''}
            title="fel" aria-label="fel">&#9650;</button>
          <button data-move="${index}" data-dir="1" ${index === chosen.length - 1 ? 'disabled' : ''}
            title="le" aria-label="le">&#9660;</button>
          <button data-remove="${index}" title="törlés" aria-label="törlés">&#10005;</button>
        </div>`,
      )
      .join('');

    const addable = all.filter((player) => !chosen.includes(player.id));
    const addOptions = [
      `<option value="" selected>+</option>`,
      ...addable.map(
        (player) =>
          `<option value="${escapeHtml(player.id)}">${escapeHtml(player.name)} (${escapeHtml(player.id)})</option>`,
      ),
    ].join('');

    const languageOptions = [
      `<option value="auto">${escapeHtml(t('editor.language_auto'))}</option>`,
      ...LANGUAGES.map(
        (code) =>
          `<option value="${code}" ${this._config.language === code ? 'selected' : ''}>${code.toUpperCase()}</option>`,
      ),
    ].join('');

    const toggles = TOGGLES.map((key) => {
      const value = this._config[key] ?? DEFAULTS[key] ?? false;
      return `<label class="toggle"><input type="checkbox" data-key="${key}" ${value ? 'checked' : ''}>
        <span>${escapeHtml(t(`editor.${key}`))}</span></label>`;
    }).join('');

    this.shadowRoot.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="form">
        <div class="title">${escapeHtml(t('editor.entities'))}</div>
        <div class="hint">${escapeHtml(t('editor.entities_hint'))}</div>
        <div class="chosen">${rows}</div>
        <label><select data-add>${addOptions}</select></label>
        <label>${escapeHtml(t('editor.name'))}
          <input type="text" data-key="name" value="${escapeHtml(this._config.name || '')}">
        </label>
        <label>${escapeHtml(t('editor.language'))}
          <select data-key="language">${languageOptions}</select>
        </label>
        <div class="title">${escapeHtml(t('editor.sections'))}</div>
        <div class="toggles">${toggles}</div>
      </div>`;

    this.shadowRoot
      .querySelectorAll('[data-key]')
      .forEach((input) => input.addEventListener('change', (ev) => this._onChange(ev)));
    this.shadowRoot
      .querySelector('[data-add]')
      ?.addEventListener('change', (ev) => this._onAdd(ev));
    this.shadowRoot
      .querySelectorAll('[data-move], [data-remove]')
      .forEach((button) => button.addEventListener('click', (ev) => this._onOrder(ev)));
  }

  _emit(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
    );
    this._render();
  }

  _base() {
    return { ...this._config, type: this._config.type || `custom:${CARD_NAME}` };
  }

  _onAdd(ev) {
    const entityId = ev.target.value;
    if (!entityId) return;
    this._emit({ ...this._base(), entity: undefined, entities: [...this._chosen(), entityId] });
  }

  _onOrder(ev) {
    const button = ev.currentTarget;
    const list = this._chosen();
    if (button.dataset.remove !== undefined) {
      list.splice(Number(button.dataset.remove), 1);
    } else {
      const from = Number(button.dataset.move);
      const to = from + Number(button.dataset.dir);
      if (to < 0 || to >= list.length) return;
      [list[from], list[to]] = [list[to], list[from]];
    }
    this._emit({ ...this._base(), entity: undefined, entities: list });
  }

  _onChange(ev) {
    const input = ev.target;
    const key = input.dataset.key;
    const config = this._base();
    if (input.type === 'checkbox') config[key] = input.checked;
    else if (input.value === '') delete config[key];
    else config[key] = input.value;
    this._emit(config);
  }
}

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, MediaRoomCardEditor);
  }
}
