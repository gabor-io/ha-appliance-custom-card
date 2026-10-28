import { CARD_NAME, EDITOR_NAME, LAYOUTS } from './const.js';
import { DEFAULTS } from './card.js';
import { getLanguage, translator, LANGUAGES } from './i18n.js';
import { listNanoleafDevices } from './entities.js';
import { createEditorClass } from '../shared/editor-base.js';

/**
 * The wall, as something to pick rather than to type.
 *
 * The panel count is in each label because that is what someone counts on
 * their own wall before they can recognise the shape by name.
 */
const LAYOUT_OPTIONS = Object.keys(LAYOUTS).map((key) => ({
  value: key,
  label: { zigzag9: 'Cikcakk · 9', flower7: 'Virág · 7', row5: 'Egy sor · 5' }[key] || key,
}));

export const NanoleafShapesCardEditor = createEditorClass({
  cardName: CARD_NAME,
  selects: [{ key: 'layout', options: LAYOUT_OPTIONS }],
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
