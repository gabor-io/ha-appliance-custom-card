import { CARD_NAME, EDITOR_NAME } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listClimateDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

export const DaikinAcCardEditor = createEditorClass({
  cardName: CARD_NAME,
  toggles: [
    'show_art',
    'show_readings',
    'show_modes',
    'show_fan',
    'show_presets',
    'show_all_swing',
    'show_openings',
    'compact',
    'animate',
  ],
  defaults: DEFAULTS,
  listDevices: listClimateDevices,
  getLanguage,
  translator,
  languages: LANGUAGES,
});

export function registerEditor() {
  if (!customElements.get(EDITOR_NAME)) {
    customElements.define(EDITOR_NAME, DaikinAcCardEditor);
  }
}
