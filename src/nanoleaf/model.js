/**
 * Turns `hass` into everything the Nanoleaf card draws.
 *
 * The one judgement here is what the panels are actually showing. Home
 * Assistant has no "effect" colour mode, so the light reports `hs` whenever
 * it is not on a white, and the hue and saturation it carries while a scene
 * runs are **the last fixed colour, not what is on the wall**: a device
 * running Prism reports hue 0, saturation 0, which is white. Painting the
 * drawing from that would show a blank wall under a rainbow.
 *
 * So the card reads the effect first: a named effect means a scene is
 * running and the palette comes from the scene; no effect means the panels
 * are on one colour, and only then do hs or the colour temperature mean
 * anything.
 */

import { EFFECT_PALETTES, GESTURES, UNKNOWN_PALETTE } from './const.js';
import { deviceEntities, hasSeveral, isUnavailable, pickLight } from './entities.js';

/** The palette a scene is drawn with, by name, case and spacing ignored. */
export function paletteFor(effect) {
  if (!effect) return null;
  return EFFECT_PALETTES[String(effect).trim().toLowerCase()] || UNKNOWN_PALETTE;
}

/** True when the card has a palette of its own for this scene. */
export function knownEffect(effect) {
  return Boolean(effect) && String(effect).trim().toLowerCase() in EFFECT_PALETTES;
}

/**
 * The panels' name.
 *
 * An entity that has gone unavailable can arrive with its attributes
 * stripped, friendly_name included - falling through to the entity id would
 * put `light.nanoleaf_shapes` in the header at exactly the moment the card is
 * explaining that something is wrong.
 */
function friendlyName(hass, entityId) {
  const attr = hass?.states?.[entityId]?.attributes?.friendly_name;
  if (attr) return attr;
  const deviceId = hass?.entities?.[entityId]?.device_id;
  const device = deviceId ? hass.devices?.[deviceId] : null;
  return device?.name_by_user || device?.name || '';
}

/**
 * The line under the name: the model the device registry holds.
 *
 * Skipped when it only repeats the name, which it does by default - the
 * panels are called "Nanoleaf Shapes" and the model is "NL42", but someone
 * who renamed them to "Shapes" would otherwise read "Shapes / Shapes".
 */
function modelOf(hass, lightEntityId, name) {
  const deviceId = hass?.entities?.[lightEntityId]?.device_id;
  const device = deviceId ? hass.devices?.[deviceId] : null;
  const lower = (name || '').toLowerCase();
  const candidates = [device?.model_id, device?.model].filter(Boolean);
  return candidates.find((value) => !lower.includes(String(value).toLowerCase())) || null;
}

/** `hs` plus a CSS colour for it, at full lightness - the panels are emissive. */
function hsColour(hue, saturation) {
  if (hue === null || hue === undefined || saturation === null || saturation === undefined) {
    return null;
  }
  return { hue, saturation, css: `hsl(${hue} ${saturation}% 50%)` };
}

/**
 * Roughly what a colour temperature looks like, for the swatches.
 *
 * A full black-body curve is more than a 24px dot needs; this is a two-leg
 * interpolation through warm candle, neutral and cool daylight, which lands
 * close enough for a swatch and nowhere near close enough to grade a photo by.
 */
export function kelvinColour(kelvin) {
  if (kelvin === null || kelvin === undefined) return null;
  const stops = [
    [1200, [255, 147, 41]],
    [2700, [255, 197, 143]],
    [4000, [255, 228, 206]],
    [5000, [255, 244, 237]],
    [6500, [227, 238, 255]],
  ];
  const value = Math.max(stops[0][0], Math.min(stops[stops.length - 1][0], kelvin));
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i += 1) {
    if (value >= stops[i][0] && value <= stops[i + 1][0]) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }
  const span = upper[0] - lower[0];
  const t = span === 0 ? 0 : (value - lower[0]) / span;
  const mix = lower[1].map((c, i) => Math.round(c + (upper[1][i] - c) * t));
  return `rgb(${mix.join()})`;
}

/** The last touch gesture, and how long ago it was. */
function lastGesture(hass, entityId) {
  const stateObj = entityId ? hass?.states?.[entityId] : null;
  if (!stateObj || isUnavailable(stateObj)) return null;
  const type = stateObj.attributes?.event_type || null;
  /* the state of an event entity is the timestamp of the last one; before
     anything has happened it is "unknown", which isUnavailable already caught */
  const when = Date.parse(stateObj.state);
  if (!type || Number.isNaN(when)) return null;
  return {
    entityId,
    type,
    icon: GESTURES.find((entry) => entry.key === type)?.icon || 'gesture_tap',
    secondsAgo: Math.max(0, Math.round((Date.now() - when) / 1000)),
  };
}

export function buildModel(hass, config) {
  const entityId = pickLight(hass, config);
  if (!entityId) {
    return { ok: false, reason: hasSeveral(hass) ? 'many_entities' : 'no_entity' };
  }
  const stateObj = hass?.states?.[entityId];
  if (!stateObj) return { ok: false, reason: 'missing_entity' };

  const own = deviceEntities(hass, entityId);
  const attrs = stateObj.attributes || {};
  const available = !isUnavailable(stateObj);
  const on = available && stateObj.state === 'on';

  /* The reserved *Solid* / *Static* / *Dynamic* effects are filtered out by
     the integration itself, which reports `null` for them - so a name here
     always means a real scene is running. */
  const effect = on ? attrs.effect || null : null;
  const effects = Array.isArray(attrs.effect_list) ? attrs.effect_list : [];

  const brightness = attrs.brightness ?? null;
  const kelvin = attrs.color_temp_kelvin ?? null;
  const white = on && !effect && attrs.color_mode === 'color_temp';
  const hs = on && !effect && !white ? hsColour(attrs.hs_color?.[0], attrs.hs_color?.[1]) : null;

  return {
    ok: true,
    entityId,
    entities: { light: entityId, ...own },
    name: config?.name || friendlyName(hass, entityId) || entityId,
    model:
      config?.subtitle !== undefined
        ? config.subtitle || null
        : modelOf(hass, entityId, config?.name || friendlyName(hass, entityId)),
    available,
    on,

    /** what the panels are showing: a scene, one colour, or a white */
    mode: !on ? 'off' : effect ? 'effect' : white ? 'white' : 'colour',
    effect,
    effects,
    palette: paletteFor(effect),
    knownEffect: knownEffect(effect),

    /** 0-255 as Home Assistant carries it, and the percentage people read */
    brightness,
    brightnessPct: brightness === null ? null : Math.round((brightness / 255) * 100),

    kelvin,
    kelvinMin: attrs.min_color_temp_kelvin ?? 1200,
    kelvinMax: attrs.max_color_temp_kelvin ?? 6500,
    kelvinCss: kelvinColour(kelvin),
    hs,

    gesture: lastGesture(hass, own.touch),
    /** the model has no touch at all, so there is no row to draw */
    touchable: Boolean(own.touch),
  };
}

/** The headline, as a translation key plus the values it needs. */
export function stateKey(model) {
  if (!model.available) return { key: 'state.unavailable' };
  if (!model.on) return { key: 'state.off' };
  if (model.mode === 'effect') return { key: 'state.effect', effect: model.effect };
  if (model.mode === 'white') return { key: 'state.white', kelvin: model.kelvin };
  return { key: 'state.colour' };
}

/** The quieter line under it. */
export function subKey(model) {
  if (!model.available) return { key: 'sub.unavailable' };
  if (!model.on) return { key: 'sub.off' };
  if (model.brightnessPct === null) return { key: '' };
  /* the one thing worth repeating: a running scene paints its own colours,
     so the brightness is all the light entity still controls */
  return { key: 'sub.brightness', percent: model.brightnessPct };
}
