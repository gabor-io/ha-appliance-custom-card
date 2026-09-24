import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listFridgeDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const LiebherrFridgeCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: ['show_zones', 'show_modes', 'show_selects', 'show_details', 'show_extra', 'compact', 'animate'],
  defaults: DEFAULTS,
  listDevices: listFridgeDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, LiebherrFridgeCardEditor);
  }
}
