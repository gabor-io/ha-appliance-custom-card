/**
 * Mock `hass` for the Nanoleaf card, shaped after a real Shapes Hexagons set.
 *
 * The effect list is the one the device actually reports - sixteen stock
 * scenes - plus one of the owner's own making, because that is the case the
 * card has to handle without inventing colours for it.
 *
 * The awkward case here is deliberate: while a scene runs, the light reports
 * `hs_color: [0, 0]` - white - because Home Assistant has no "effect" colour
 * mode and falls back to the last fixed colour. A card that paints from that
 * would show a blank wall under a rainbow.
 */

const DEVICE = 'demo-nanoleaf';
const LIGHT = 'light.nanoleaf_shapes';
const IDENTIFY = 'button.nanoleaf_shapes_azonositas';
const TOUCH = 'event.nanoleaf_shapes_erintes';

const EFFECTS = [
  'Beatdrop', 'Blaze', 'Cocoa Beach', 'Cotton Candy', 'Date Night', 'Hip Hop',
  'Hot Sauce', 'Jungle', 'Lightscape', 'Morning Sky', 'Northern Lights',
  'Pop Rocks', 'Prism', 'Starlight', 'Sundown', 'Waterfall',
  /* one the card has no palette for */
  'Nappali este',
];

function lightState(over = {}) {
  const { state = 'on', ...attrs } = over;
  return {
    entity_id: LIGHT,
    state,
    attributes: {
      friendly_name: 'Nanoleaf Shapes',
      supported_color_modes: ['color_temp', 'hs'],
      color_mode: 'hs',
      brightness: 255,
      hs_color: [0, 0],
      color_temp_kelvin: 6500,
      min_color_temp_kelvin: 1200,
      max_color_temp_kelvin: 6500,
      effect: 'Prism',
      effect_list: EFFECTS,
      supported_features: 44,
      ...attrs,
    },
  };
}

export const SCENARIOS = {
  prizma: {},
  'északi fény': { effect: 'Northern Lights', brightness: 200 },
  vízesés: { effect: 'Waterfall', brightness: 150 },
  /* a scene of the owner's own: the card knows the name and nothing else */
  'saját jelenet': { effect: 'Nappali este', brightness: 180 },
  'fix szín': { effect: null, color_mode: 'hs', hs_color: [280, 82], brightness: 220 },
  fehér: { effect: null, color_mode: 'color_temp', color_temp_kelvin: 2700, brightness: 120 },
  tompa: { effect: 'Sundown', brightness: 26 },
  ki: { state: 'off', effect: null, brightness: null },
  halott: { state: 'unavailable' },
};

/** @param {string} key scenario name @param {object} options `gesture` seconds ago */
export function makeHass(key, { gestureAgo = 240 } = {}) {
  const over = SCENARIOS[key] || {};
  const hass = {
    states: {},
    entities: {},
    devices: {
      [DEVICE]: { id: DEVICE, name: 'Nanoleaf Shapes', name_by_user: null, area_id: 'nappali' },
    },
    areas: { nappali: { area_id: 'nappali', name: 'Nappali' } },
    config: { unit_system: { temperature: '°C' } },
    locale: { language: 'hu' },
    themes: { darkMode: false },
    callService: (domain, service, data) => {
      // eslint-disable-next-line no-console
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };

  const add = (entityId, state, attributes = {}) => {
    hass.states[entityId] = { entity_id: entityId, state, attributes };
    hass.entities[entityId] = {
      entity_id: entityId,
      device_id: DEVICE,
      platform: 'nanoleaf',
      area_id: null,
    };
  };

  const light = lightState(over);
  hass.states[LIGHT] = light;
  hass.entities[LIGHT] = { entity_id: LIGHT, device_id: DEVICE, platform: 'nanoleaf', area_id: null };
  if (light.state === 'unavailable') light.attributes = {};

  add(IDENTIFY, '2026-10-20T18:20:42+00:00');
  /* an event entity's state is the time of the last event; before anything
     has happened at all it is "unknown" */
  add(
    TOUCH,
    gestureAgo === null ? 'unknown' : new Date(Date.now() - gestureAgo * 1000).toISOString(),
    gestureAgo === null
      ? { event_types: ['single_tap', 'double_tap'] }
      : { event_type: 'double_tap', event_types: ['single_tap', 'double_tap'] },
  );

  return hass;
}

window.demo = { SCENARIOS, makeHass, LIGHT };
