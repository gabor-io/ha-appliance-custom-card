import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listVentilatorDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const FisherErvCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_air',
    'show_pm25',
    'show_modes',
    'show_speeds',
    'show_filter',
    'show_extra',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listVentilatorDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, FisherErvCardEditor);
  }
}
