import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listAirfryerDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const PhilipsAirfryerCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_methods',
    'show_presets',
    'show_settings',
    'show_probe',
    'show_details',
    'show_controls',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listAirfryerDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, PhilipsAirfryerCardEditor);
  }
}
