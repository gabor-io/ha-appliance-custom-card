/** Translation plumbing shared by the cards. */

/** Picks the card language: explicit config, else the Home Assistant locale. */
export function pickLanguage(config, hass, available) {
  const wanted = config?.language && config.language !== 'auto' ? config.language : null;
  const haLang = (hass?.locale?.language || hass?.language || 'en').slice(0, 2).toLowerCase();
  const lang = wanted || haLang;
  return available.includes(lang) ? lang : 'en';
}

/**
 * Builds a `t('a.b.c', fallback)` lookup over a dictionary, falling back to the
 * English dictionary before the caller's fallback.
 */
export function makeTranslator(dictionaries, lang, fallbackLang = 'en') {
  const dict = dictionaries[lang] || dictionaries[fallbackLang];
  const base = dictionaries[fallbackLang];
  const read = (source, path) =>
    path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), source);

  return (path, fallback = '') => {
    const value = read(dict, path);
    if (value !== undefined) return value;
    const fromBase = read(base, path);
    return fromBase !== undefined ? fromBase : fallback;
  };
}
