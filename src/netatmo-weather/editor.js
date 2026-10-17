import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listStationDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const NetatmoWeatherCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: ['show_art', 'show_rooms', 'show_co2', 'show_alerts', 'compact', 'animate'],
  defaults: DEFAULTS,
  listDevices: listStationDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, NetatmoWeatherCardEditor);
  }
}
