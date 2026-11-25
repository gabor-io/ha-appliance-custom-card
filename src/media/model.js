/**
 * Everything the media room card draws, worked out from `hass` once per
 * render so the view code has no decisions left to make.
 */

import {
  CONTENT_ICONS,
  FEATURE,
  LOGO_TYPES,
  RANK_ACTIVE,
  RANK_IDLE,
  STATE_RANK,
} from './const.js';
import { configuredPlayers, friendlyName } from './entities.js';

const rankOf = (state) => STATE_RANK[state] ?? 0;

function supports(stateObj, bit) {
  return Boolean((Number(stateObj?.attributes?.supported_features) || 0) & bit);
}

/**
 * Where the playhead is right now.
 *
 * `media_position` is a snapshot taken at `media_position_updated_at`, not a
 * live value: a player that is playing reports the same number until
 * something else makes it send an update, which can be minutes. The elapsed
 * time is therefore the snapshot plus the wall clock since it was taken -
 * but only while the thing is actually playing, because a paused player's
 * snapshot is already correct and adding to it would run the bar past the
 * end of a film nobody is watching.
 */
export function progressOf(stateObj, now = Date.now()) {
  const attrs = stateObj?.attributes || {};
  const duration = Number(attrs.media_duration);
  const position = Number(attrs.media_position);
  if (!Number.isFinite(duration) || duration <= 0) return null;
  if (!Number.isFinite(position)) return null;

  let elapsed = position;
  if (stateObj.state === 'playing' && attrs.media_position_updated_at) {
    const since = (now - Date.parse(attrs.media_position_updated_at)) / 1000;
    if (Number.isFinite(since) && since > 0) elapsed += since;
  }
  elapsed = Math.max(0, Math.min(duration, elapsed));
  return {
    elapsed,
    duration,
    remaining: duration - elapsed,
    percent: (elapsed / duration) * 100,
  };
}

/** `S02E01`, when the player says both numbers. */
export function episodeCode(attrs) {
  const season = Number(attrs?.media_season);
  const episode = Number(attrs?.media_episode);
  const pad = (value) => String(value).padStart(2, '0');
  if (Number.isFinite(season) && Number.isFinite(episode)) {
    return `S${pad(season)}E${pad(episode)}`;
  }
  if (Number.isFinite(episode)) return `E${pad(episode)}`;
  if (attrs?.media_episode) return String(attrs.media_episode);
  return null;
}

/**
 * The two lines of text under the artwork.
 *
 * Which attributes a player fills in is a matter of taste on the
 * integration's side: an episode may arrive as a title plus a series title,
 * or as a title that already contains everything. The card prefers the most
 * specific thing it is given and never repeats the same string twice.
 */
function titlesOf(stateObj, t) {
  const attrs = stateObj?.attributes || {};
  const title = attrs.media_title || attrs.media_channel || null;
  const code = episodeCode(attrs);
  const parts = [];

  if (attrs.media_series_title && attrs.media_series_title !== title) {
    parts.push(attrs.media_series_title);
  }
  if (code) parts.push(code);
  if (attrs.media_artist && attrs.media_artist !== title) parts.push(attrs.media_artist);
  if (attrs.media_album_name && attrs.media_album_name !== title) parts.push(attrs.media_album_name);

  return {
    title: title || t(`state.${stateObj?.state}`, t('state.unknown')),
    sub: parts.join(' · ') || null,
    hasMedia: Boolean(title),
  };
}

/**
 * Which entity the volume belongs to.
 *
 * In a room with a streaming box feeding a television, the box plays and the
 * television makes the sound: the box's entity has no volume feature at all,
 * so a card that always sends volume to whatever is playing has no volume
 * control exactly when it is being used. `volume_entity` names the thing
 * that makes the sound, and the row is then drawn from its state, not the
 * active player's.
 */
function soundOf(hass, config, active) {
  const named = config?.volume_entity;
  const stateObj = (named && hass?.states?.[named]) || active?.stateObj || null;
  if (!stateObj) return null;
  const entityId = stateObj.entity_id || active?.entityId;
  const level = Number(stateObj.attributes?.volume_level);
  return {
    entityId,
    name: friendlyName(hass, entityId),
    other: Boolean(named && hass?.states?.[named] && entityId !== active?.entityId),
    level: Number.isFinite(level) ? level : null,
    muted: Boolean(stateObj.attributes?.is_volume_muted),
    can: {
      set: supports(stateObj, FEATURE.VOLUME_SET),
      mute: supports(stateObj, FEATURE.VOLUME_MUTE),
    },
  };
}

function iconFor(stateObj) {
  const type = String(stateObj?.attributes?.media_content_type || '').toLowerCase();
  return CONTENT_ICONS[type] || (stateObj?.attributes?.media_title ? 'cast_on' : 'tv');
}

/**
 * One entry per configured player, plus whichever of them the card shows.
 *
 * @param {object} hass
 * @param {object} config
 * @param {Function} t translator, for the fallback title of a player that is
 *   playing something it will not name
 * @param {string|null} pinned entity the user tapped in the player row; it
 *   wins over the state order for as long as it is awake, because the only
 *   reason to tap is to disagree with the card's choice
 */
export function buildModel(hass, config, t, pinned = null) {
  const configured = configuredPlayers(config);
  if (!configured.length) return { ok: false, reason: 'no_entities' };

  const players = configured.map((item) => {
    const stateObj = hass?.states?.[item.entityId] || null;
    const state = stateObj?.state || 'unavailable';
    return {
      entityId: item.entityId,
      name: item.name || friendlyName(hass, item.entityId),
      stateObj,
      state,
      rank: rankOf(state),
      missing: !stateObj,
      app: stateObj?.attributes?.app_name || null,
    };
  });

  if (players.every((player) => player.missing)) return { ok: false, reason: 'missing_entities' };

  const awake = players.filter((player) => player.rank >= RANK_IDLE);
  const pinnedPlayer = awake.find((player) => player.entityId === pinned) || null;
  /* strict `>` keeps the earlier of two equal players, which is what the
     config order is for */
  const best = awake.reduce(
    (winner, player) => (!winner || player.rank > winner.rank ? player : winner),
    null,
  );
  const active = pinnedPlayer || best;

  if (!active) {
    return {
      ok: true,
      idle: true,
      players,
      active: null,
      name: config?.name || null,
    };
  }

  const stateObj = active.stateObj;
  const titles = titlesOf(stateObj, t);
  const contentType = String(stateObj.attributes?.media_content_type || '').toLowerCase();
  /* a television reports the input it is on rather than an app name; it is
     worth showing, but not twice when it is also the title */
  const app = active.app || stateObj.attributes?.source || null;

  return {
    ok: true,
    idle: false,
    players,
    active,
    pinned: Boolean(pinnedPlayer),
    name: config?.name || active.name,
    state: active.state,
    playing: active.state === 'playing',
    buffering: active.state === 'buffering',
    live: active.rank >= RANK_ACTIVE,
    title: titles.title,
    sub: titles.sub,
    hasMedia: titles.hasMedia,
    app: app && app !== titles.title ? app : null,
    artwork: stateObj.attributes?.entity_picture || null,
    logo: LOGO_TYPES.includes(contentType),
    icon: iconFor(stateObj),
    progress: progressOf(stateObj),
    sound: soundOf(hass, config, active),
    can: {
      power: supports(stateObj, FEATURE.TURN_ON) || supports(stateObj, FEATURE.TURN_OFF),
      turnOn: supports(stateObj, FEATURE.TURN_ON),
      turnOff: supports(stateObj, FEATURE.TURN_OFF),
      play: supports(stateObj, FEATURE.PLAY),
      pause: supports(stateObj, FEATURE.PAUSE),
      stop: supports(stateObj, FEATURE.STOP),
      prev: supports(stateObj, FEATURE.PREVIOUS_TRACK),
      next: supports(stateObj, FEATURE.NEXT_TRACK),
      seek: supports(stateObj, FEATURE.SEEK),
    },
  };
}

/** `1:02:03` or `4:05`, which is how long-form and short-form media read. */
export function clock(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);
  const pad = (value) => String(value).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
