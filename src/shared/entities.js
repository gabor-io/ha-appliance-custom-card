/**
 * Entity discovery helpers.
 *
 * Both integrations name a device's entities consistently, so a card only needs
 * the common object-id prefix (e.g. `aeg_gi8200x5tn`). The prefix comes from the
 * configured device, from an explicit `prefix` option, or from the one entity
 * that is unique to the appliance type (the "anchor").
 */

/** Uppercase, underscore-separated key used to compare enum-ish states. */
export function normaliseKey(value) {
  if (value === undefined || value === null) return '';
  return String(value).toUpperCase().replace(/[\s\-.]+/g, '_').replace(/_+/g, '_');
}

export function isUnavailable(stateObj) {
  return !stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown';
}

function commonPrefix(ids) {
  if (!ids.length) return null;
  let prefix = ids[0];
  for (const id of ids.slice(1)) {
    let i = 0;
    while (i < prefix.length && i < id.length && prefix[i] === id[i]) i += 1;
    prefix = prefix.slice(0, i);
  }
  return prefix.replace(/_+$/, '') || null;
}

/**
 * Finds the object-id prefix of the appliance.
 *
 * @param {object} anchor `{ domain, suffix }` of the entity that identifies the
 *   appliance type, e.g. `{ domain: 'sensor', suffix: 'appliance_state' }`.
 */
export function findPrefix(hass, config, anchor) {
  if (config?.prefix) return config.prefix;

  const anchorRe = new RegExp(`^${anchor.domain}\\..+_${anchor.suffix}$`);
  const strip = (entityId) =>
    entityId.replace(new RegExp(`^${anchor.domain}\\.`), '').replace(new RegExp(`_${anchor.suffix}$`), '');

  if (config?.device && hass?.entities) {
    const entry = Object.values(hass.entities).find(
      (item) => item.device_id === config.device && anchorRe.test(item.entity_id),
    );
    if (entry) return strip(entry.entity_id);
    const ids = Object.values(hass.entities)
      .filter((item) => item.device_id === config.device)
      .map((item) => item.entity_id.split('.')[1]);
    if (ids.length) return commonPrefix(ids);
  }

  const override = config?.entities?.[anchor.key];
  if (override) return strip(override);

  const candidates = Object.keys(hass?.states || {}).filter((id) => anchorRe.test(id));
  return candidates.length === 1 ? strip(candidates[0]) : null;
}

/**
 * Maps logical keys to entity ids. Explicit overrides win; resolved ids are kept
 * only when the entity exists in the state machine.
 */
export function resolveByPrefix(hass, config, suffixes, prefix) {
  const overrides = config?.entities || {};
  const map = {};
  for (const key of new Set([...Object.keys(suffixes), ...Object.keys(overrides)])) {
    const override = overrides[key];
    if (override) {
      map[key] = override;
      continue;
    }
    const suffix = suffixes[key];
    if (!suffix || !prefix) continue;
    const candidate = `${suffix[0]}.${prefix}_${suffix[1]}`;
    if (hass?.states?.[candidate]) map[key] = candidate;
  }
  return map;
}

/** Lists the devices that own an anchor entity, for the visual editors. */
export function listDevices(hass, anchor) {
  if (!hass?.entities || !hass?.devices) return [];
  const anchorRe = new RegExp(`^${anchor.domain}\\..+_${anchor.suffix}$`);
  const devices = new Map();
  for (const entry of Object.values(hass.entities)) {
    if (!entry.device_id || !anchorRe.test(entry.entity_id)) continue;
    const device = hass.devices[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}
