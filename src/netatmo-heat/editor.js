import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listHeatingDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const NetatmoHeatingCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: ['show_art', 'show_schedule', 'show_openings', 'show_batteries', 'compact', 'animate'],
  defaults: DEFAULTS,
  listDevices: listHeatingDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, NetatmoHeatingCardEditor);
  }
}
