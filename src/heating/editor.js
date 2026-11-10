/**
 * Visual editors for the heating family.
 *
 * The shared editor is built around a device picker, and these cards have no
 * device: they read helper entities whose ids come from the config. So they
 * get a smaller form of their own - name, language and the section toggles -
 * and the entity ids and the room list stay in YAML, where a list of rooms
 * belongs.
 */

import {
  HOUSE_CARD_NAME,
  HOUSE_EDITOR_NAME,
  ROOMS_CARD_NAME,
  ROOMS_EDITOR_NAME,
  SCHEDULE_CARD_NAME,
  SCHEDULE_EDITOR_NAME,
} from './const.js';
import { HOUSE_DEFAULTS } from './house-card.js';
import { ROOMS_DEFAULTS } from './rooms-card.js';
import { SCHEDULE_DEFAULTS } from './schedule-card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
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
.toggles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px; }
.toggle { display: flex; align-items: center; gap: 8px; font-size: .85rem;
  color: var(--primary-text-color, #212121); cursor: pointer; }
.hint { font-size: .78rem; color: var(--secondary-text-color, #70757a); }
`;

function createEditor({ cardName, toggles, defaults }) {
  return class HeatingCardEditor extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
      this._config = { ...config };
      this._render();
    }

    /* nothing in this form depends on live state, so a state update must
       never rebuild it under the user's fingers */
    set hass(hass) {
      const first = !this._hass;
      this._hass = hass;
      if (first) this._render();
    }

    _render() {
      if (!this._config || !this._hass) return;
      const t = translator(getLanguage(this._config, this._hass));

      const languageOptions = [
        `<option value="auto">${escapeHtml(t('editor.language_auto'))}</option>`,
        ...LANGUAGES.map(
          (code) =>
            `<option value="${code}" ${this._config.language === code ? 'selected' : ''}>${code.toUpperCase()}</option>`,
        ),
      ].join('');

      const boxes = toggles
        .map((key) => {
          const value = this._config[key] ?? defaults[key] ?? false;
          return `<label class="toggle"><input type="checkbox" data-key="${key}" ${value ? 'checked' : ''}>
            <span>${escapeHtml(t(`editor.${key}`))}</span></label>`;
        })
        .join('');

      this.shadowRoot.innerHTML = `
        <style>${EDITOR_STYLES}</style>
        <div class="form">
          <label>${escapeHtml(t('editor.name'))}
            <input type="text" data-key="name" value="${escapeHtml(this._config.name || '')}">
          </label>
          <label>${escapeHtml(t('editor.language'))}
            <select data-key="language">${languageOptions}</select>
          </label>
          <label>${escapeHtml(t('editor.prefix'))}
            <input type="text" data-key="prefix" value="${escapeHtml(this._config.prefix || '')}" placeholder="futes">
          </label>
          <div class="title">${escapeHtml(t('editor.sections'))}</div>
          <div class="toggles">${boxes}</div>
        </div>`;

      this.shadowRoot
        .querySelectorAll('[data-key]')
        .forEach((input) => input.addEventListener('change', (ev) => this._onChange(ev)));
    }

    _onChange(ev) {
      const input = ev.target;
      const key = input.dataset.key;
      const config = { ...this._config, type: this._config.type || `custom:${cardName}` };
      if (input.type === 'checkbox') config[key] = input.checked;
      else if (input.value === '') delete config[key];
      else config[key] = input.value;
      this._config = config;
      this.dispatchEvent(
        new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
      );
    }
  };
}

export const HouseHeatingCardEditor = createEditor({
  cardName: HOUSE_CARD_NAME,
  toggles: [
    'show_gas',
    'show_pace',
    'show_forecast',
    'show_source',
    'show_mode',
    'show_meter',
    'show_power_note',
    'compact',
    'animate',
  ],
  defaults: HOUSE_DEFAULTS,
});

export const HeatingRoomsCardEditor = createEditor({
  cardName: ROOMS_CARD_NAME,
  toggles: ['show_controls', 'show_parts', 'show_boost', 'compact', 'animate'],
  defaults: ROOMS_DEFAULTS,
});

export const HeatingScheduleCardEditor = createEditor({
  cardName: SCHEDULE_CARD_NAME,
  toggles: ['show_timeline', 'show_zones', 'compact', 'animate'],
  defaults: SCHEDULE_DEFAULTS,
});

export function registerEditors() {
  const pairs = [
    [HOUSE_EDITOR_NAME, HouseHeatingCardEditor],
    [ROOMS_EDITOR_NAME, HeatingRoomsCardEditor],
    [SCHEDULE_EDITOR_NAME, HeatingScheduleCardEditor],
  ];
  for (const [name, klass] of pairs) {
    if (!customElements.get(name)) customElements.define(name, klass);
  }
}
