import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listDishwasherDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const AegDishwasherCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_programs',
    'show_options',
    'show_delay',
    'show_scores',
    'show_consumption',
    'show_appliance_settings',
    'show_details',
    'show_controls',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listDishwasherDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, AegDishwasherCardEditor);
  }
}
