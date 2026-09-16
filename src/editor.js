import { CARD_NAME, EDITOR_NAME } from './const.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listDishwasherDevices } from './entities.js';
import { escapeHtml } from './format.js';

const TOGGLES = [
  'show_programs',
  'show_options',
  'show_delay',
  'show_scores',
  'show_consumption',
  'show_details',
  'show_controls',
  'compact',
  'animate',
];

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
.toggles { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; }
.toggle { display: flex; align-items: center; gap: 8px; font-size: .85rem;
  color: var(--primary-text-color, #212121); cursor: pointer; }
`;

export class AegDishwasherCardEditor extends HTMLElement {
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
    const t = translator(getLanguage(this._config, this._hass));
    const devices = listDishwasherDevices(this._hass);
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
      ...LANGUAGES.map(
        (code) =>
          `<option value="${code}" ${this._config.language === code ? 'selected' : ''}>${code.toUpperCase()}</option>`,
      ),
    ].join('');

    const toggles = TOGGLES.map((key) => {
      const checked = this._config[key] !== false;
      const value = key === 'compact' ? this._config.compact === true : checked;
      return `<label class="toggle"><input type="checkbox" data-key="${key}" ${value ? 'checked' : ''}>
        <span>${escapeHtml(t(`editor.${key}`))}</span></label>`;
    }).join('');

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

    this.shadowRoot.querySelectorAll('[data-key]').forEach((input) => {
      const event = input.type === 'text' ? 'change' : 'change';
      input.addEventListener(event, (ev) => this._onChange(ev));
    });
  }

  _onChange(ev) {
    const input = ev.target;
    const key = input.dataset.key;
    const config = { ...this._config, type: this._config.type || `custom:${CARD_NAME}` };
    if (input.type === 'checkbox') config[key] = input.checked;
    else if (input.value === '') delete config[key];
    else config[key] = input.value;

    this._config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, AegDishwasherCardEditor);
  }
}
