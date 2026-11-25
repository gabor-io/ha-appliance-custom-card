/**
 * Which players the card is about.
 *
 * There is nothing to discover here: two boxes feeding the same screen have
 * nothing in common in Home Assistant - different integrations, different
 * devices, different areas in the registry if nobody tidied them. Only the
 * person who owns the room knows they are one screen, so the card is told,
 * and never guesses.
 */

import { DOMAIN } from './const.js';

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Every media player in this Home Assistant, for the editor's picker. */
export function listMediaPlayers(hass) {
  const ids = new Set(
    registryEntries(hass)
      .map((entry) => entry.entity_id)
      .filter((id) => id.startsWith(`${DOMAIN}.`)),
  );
  /* players created outside the registry (a YAML universal player, say) are
     in `states` but not in `entities`, and leaving them out of the picker
     would hide exactly the entity someone is most likely to combine here */
  for (const id of Object.keys(hass?.states || {})) {
    if (id.startsWith(`${DOMAIN}.`)) ids.add(id);
  }
  return [...ids]
    .map((id) => ({ id, name: friendlyName(hass, id) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function friendlyName(hass, entityId) {
  const stateObj = hass?.states?.[entityId];
  return (
    stateObj?.attributes?.friendly_name ||
    hass?.entities?.[entityId]?.name ||
    entityId.split('.').slice(1).join('.')
  );
}

/**
 * The configured players, in the order they were written.
 *
 * The order is not decoration: it breaks ties when two players report the
 * same state, so the one the owner listed first is the one the card shows.
 */
export function configuredPlayers(config) {
  const raw = config?.entities ?? config?.entity ?? [];
  const list = Array.isArray(raw) ? raw : [raw];
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const entityId = typeof item === 'string' ? item : item?.entity;
    if (typeof entityId !== 'string' || !entityId.includes('.')) continue;
    if (seen.has(entityId)) continue;
    seen.add(entityId);
    out.push({ entityId, name: typeof item === 'object' ? item?.name || null : null });
  }
  return out;
}
