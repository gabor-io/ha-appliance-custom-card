import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listNanoleafDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const NanoleafShapesCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_art',
    'show_brightness',
    'show_effects',
    'show_white',
    'show_touch',
    'show_identify',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listNanoleafDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, NanoleafShapesCardEditor);
  }
}
