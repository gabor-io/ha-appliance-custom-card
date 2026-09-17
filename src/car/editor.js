import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listCarDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const SkodaCarCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_alerts',
    'show_drive',
    'show_trip',
    'show_service',
    'show_charging',
    'show_climate',
    'show_system',
    'show_extra',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listCarDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, SkodaCarCardEditor);
  }
}
