/**
 * Entity discovery for the Nanoleaf Shapes.
 *
 * The integration makes one device per controller and hangs its three
 * entities off it, so the card resolves by device rather than by object id -
 * the ids are built from the name the owner gave the panels in the Nanoleaf
 * app, and that name is in whatever language and spelling they chose.
 *
 * The touch entity is absent on the models without touch, and the identify
 * button is absent on devices with no event stream at all. Neither is an
 * error: the card simply has one row fewer.
 */

import { isUnavailable } from '../shared/entities.js';
import { PLATFORM } from './const.js';

export { isUnavailable };

function registryEntries(hass) {
  return Object.values(hass?.entities || {});
}

/** Every Nanoleaf light in this Home Assistant. */
export function listLights(hass) {
  return registryEntries(hass)
    .filter((entry) => entry.platform === PLATFORM && entry.entity_id.startsWith('light.'))
    .map((entry) => entry.entity_id);
}

/** Devices that own a Nanoleaf light, for the visual editor. */
export function listNanoleafDevices(hass) {
  const devices = new Map();
  for (const entry of registryEntries(hass)) {
    if (entry.platform !== PLATFORM || !entry.device_id) continue;
    if (!entry.entity_id.startsWith('light.')) continue;
    const device = hass.devices?.[entry.device_id];
    if (!device) continue;
    devices.set(entry.device_id, device.name_by_user || device.name || entry.device_id);
  }
  return [...devices.entries()].map(([id, name]) => ({ id, name }));
}

/** Picks the light entity the card is about. */
export function pickLight(hass, config) {
  const ofDevice = config?.device
    ? registryEntries(hass).find(
        (item) => item.device_id === config.device && item.entity_id.startsWith('light.'),
      )?.entity_id
    : null;

  /* `entity` is the more specific of the two, except when `device` names a
     different set of panels - then the config contradicts itself and the
     device, which is what the editor's picker writes, wins */
  if (config?.entity) {
    const sameDevice = !ofDevice || hass?.entities?.[config.entity]?.device_id === config.device;
    if (sameDevice) return config.entity;
  }
  if (ofDevice) return ofDevice;

  const all = listLights(hass);
  return all.length === 1 ? all[0] : null;
}

export function hasSeveral(hass) {
  return listLights(hass).length > 1;
}

/**
 * The identify button and the touch event of the same device.
 *
 * Both are matched by domain rather than by name: the integration creates at
 * most one of each per device, and their object ids carry the panels' own
 * name, which cannot be guessed.
 */
export function deviceEntities(hass, lightEntityId) {
  const deviceId = hass?.entities?.[lightEntityId]?.device_id;
  if (!deviceId) return {};

  const own = registryEntries(hass).filter(
    (item) => item.device_id === deviceId && item.platform === PLATFORM,
  );
  const onlyOf = (domain) => own.find((item) => item.entity_id.startsWith(`${domain}.`))?.entity_id;

  return { identify: onlyOf('button'), touch: onlyOf('event') };
}
