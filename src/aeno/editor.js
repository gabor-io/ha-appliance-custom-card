import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listHeaterDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const AenoHeaterCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_art',
    'show_readings',
    'show_modes',
    'show_presets',
    'show_setpoint',
    'show_extras',
    'show_openings',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listHeaterDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, AenoHeaterCardEditor);
  }
}
