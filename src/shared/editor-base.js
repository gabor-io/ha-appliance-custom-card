/**
 * Visual editor shared by the cards: device picker, name, language and the
 * per-card list of section toggles.
 */

import { escapeHtml } from './format.js';

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
`;

/**
 * @param {object} spec
 * @param {string} spec.cardName custom element name of the card being edited
 * @param {string[]} spec.toggles config keys rendered as checkboxes
 * @param {object} spec.defaults default value per config key
 * @param {Function} spec.listDevices `(hass) => [{ id, name }]`
 * @param {Function} spec.getLanguage `(config, hass) => lang`
 * @param {Function} spec.translator `(lang) => t`
 * @param {string[]} spec.languages selectable language codes
 */
export function createEditorClass(spec) {
  return class ApplianceCardEditor extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
      this._config = { ...config };
      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      this._render();
    }

    _render() {
      if (!this._config || !this._hass) return;
      const t = spec.translator(spec.getLanguage(this._config, this._hass));
      const devices = spec.listDevices(this._hass);
      const current = this._config.device || '';

      const deviceOptions = [
        `<option value="" ${current ? '' : 'selected'}>${escapeHtml(t('editor.device_auto'))}</option>`,
        ...devices.map(
          (device) =>
            `<option value="${escapeHtml(device.id)}" ${device.id === current ? 'selected' : ''}>${escapeHtml(device.name)}</option>`,
        ),
      ].join('');

      const languageOptions = [
        `<option value="auto">${escapeHtml(t('editor.language_auto'))}</option>`,
        ...spec.languages.map(
          (code) =>
            `<option value="${code}" ${this._config.language === code ? 'selected' : ''}>${code.toUpperCase()}</option>`,
        ),
      ].join('');

      const toggles = spec.toggles
        .map((key) => {
          const value = this._config[key] ?? spec.defaults[key] ?? false;
          return `<label class="toggle"><input type="checkbox" data-key="${key}" ${value ? 'checked' : ''}>
            <span>${escapeHtml(t(`editor.${key}`))}</span></label>`;
        })
        .join('');

      this.shadowRoot.innerHTML = `
        <style>${EDITOR_STYLES}</style>
        <div class="form">
          <label>${escapeHtml(t('editor.device'))}
            <select data-key="device">${deviceOptions}</select>
          </label>
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
    }

    _onChange(ev) {
      const input = ev.target;
      const key = input.dataset.key;
      const config = { ...this._config, type: this._config.type || `custom:${spec.cardName}` };
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
