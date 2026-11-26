/**
 * Mock `hass` for the media room card: one screen with two things that can
 * play on it - a streaming box and the TV's own Plex app.
 *
 * The scenarios are the states a room like that actually goes through, and
 * the awkward ones are deliberate: both players alive at once (which one is
 * "the" player?), a player that is on but says nothing about what it is
 * doing, and an entity that has gone missing from the registry entirely.
 */

const BOX = 'media_player.bedroom_streaming_box';
const TV = 'media_player.bedroom_tv_plex';
const SET = 'media_player.bedroom_television';

/* a poster, drawn rather than fetched: the demo has no Home Assistant behind
   it to proxy artwork from */
const poster = (top, bottom, label) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/>
      </linearGradient></defs>
      <rect width="200" height="300" fill="url(#g)"/>
      <circle cx="100" cy="120" r="46" fill="rgba(255,255,255,.14)"/>
      <text x="100" y="128" text-anchor="middle" font-family="sans-serif"
        font-size="34" fill="rgba(255,255,255,.85)">${label}</text>
    </svg>`)}`;

const EPISODE = {
  media_title: 'Úton a biztonság felé',
  media_series_title: 'A hosszú sötét',
  media_season: 2,
  media_episode: 1,
  media_content_type: 'tvshow',
  media_duration: 4020,
  app_name: 'Plex',
  entity_picture: poster('#2b4a6f', '#10202f', 'S2'),
};

const FILM = {
  media_title: 'A nagy utazás',
  media_content_type: 'movie',
  media_duration: 7500,
  app_name: 'Plex',
  entity_picture: poster('#6f2b4a', '#2f1020', 'F'),
};

const ALBUM = {
  media_title: 'Esti dal',
  media_artist: 'Kórus',
  media_album_name: 'Négy évszak',
  media_content_type: 'music',
  media_duration: 272,
  app_name: 'Plex',
  entity_picture: poster('#2b6f4a', '#102f20', '♪'),
};

/* Apple TV style box: seek yes, volume no - which is what the real one
   reports (pyatv: SetPosition available, SetVolume unavailable) */
const BOX_FEATURES = 1 | 2 | 16 | 32 | 128 | 256 | 512 | 2048 | 4096 | 16384 | 131072;
/* a Plex client: transport and volume, no power */
const TV_FEATURES = 1 | 2 | 4 | 8 | 16 | 32 | 512 | 4096 | 16384;
/* the television set itself, as ha-samsungtv-smart reports it: it never says
   "playing", only on or off, but it is the only thing in the room with a
   volume - 221117 is the real supported_features of a UE55MU7052 */
const SET_FEATURES = 221117;

/* what the two boxes answer `remote.send_command` with */
const PLATFORMS = {
  [BOX]: 'apple_tv',
  [TV]: 'plex',
  [SET]: 'samsungtv_smart',
};
const DEVICES = { [BOX]: 'dev-box', [TV]: 'dev-tv-plex', [SET]: 'dev-set' };
const REMOTES = { 'remote.bedroom_box': 'dev-box', 'remote.television': 'dev-set' };

const TV_SOURCES = [
  'TV', 'Apple TV', 'Plex', 'Disney+', 'YouTube', 'Internet', 'HBO Max',
  'SkyShowtime', 'Prime Video', 'Netflix', 'Spotify',
];
const SOUND_MODES = ['Normál', 'Optimalizálva', 'Hangosított'];
const BOX_APPS = ['Plex', 'YouTube', 'Netflix', 'Apple TV+', 'Képernyővédő'];
const BOX_SOURCE = { source: 'Plex', source_list: BOX_APPS };

function player(entityId, name, state, extra = {}, features = BOX_FEATURES) {
  const { position = null, ...attrs } = extra;
  return {
    entity_id: entityId,
    state,
    attributes: {
      friendly_name: name,
      supported_features: features,
      ...(position === null
        ? {}
        : {
            media_position: position,
            media_position_updated_at: new Date(Date.now() - 12000).toISOString(),
          }),
      ...attrs,
    },
  };
}

const CHANNEL = {
  media_title: 'M4 Sport (8)',
  media_channel: '8',
  media_content_type: 'channel',
  app_name: null,
  source: 'TV',
  /* a channel logo, which is a logo and not a still - the card must not crop
     it to the artwork strip */
  entity_picture:
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60">' +
        '<rect width="160" height="60" rx="8" fill="#0b4da2"/>' +
        '<text x="80" y="40" text-anchor="middle" font-family="sans-serif"' +
        ' font-size="28" font-weight="700" fill="#fff">M4</text></svg>',
    ),
};

export const SCENARIOS = {
  'box megy': {
    [BOX]: player(BOX, 'Hálószoba box', 'playing', { ...EPISODE, ...BOX_SOURCE, position: 2380 }),
    [TV]: player(TV, 'TV – Plex', 'off', {}, TV_FEATURES),
  },
  /* the real case this option exists for: the box has the picture and no
     volume at all, the television has the volume and never says "playing" */
  'box + tv hangereje': {
    [BOX]: player(BOX, 'Hálószoba box', 'playing', { ...EPISODE, ...BOX_SOURCE, position: 2380 }),
    [SET]: player(SET, 'Televízió', 'on', {
      media_title: 'Apple TV', source: 'Apple TV', media_content_type: 'video',
      volume_level: 0.17, source_list: TV_SOURCES, sound_mode: 'Optimalizálva',
      sound_mode_list: SOUND_MODES,
    }, SET_FEATURES),
  },
  'tv adás': {
    [SET]: player(SET, 'Televízió', 'on', {
      ...CHANNEL, volume_level: 0.22, source_list: TV_SOURCES,
      sound_mode: 'Normál', sound_mode_list: SOUND_MODES,
    }, SET_FEATURES),
    [BOX]: player(BOX, 'Hálószoba box', 'off'),
  },
  'tv megy': {
    [BOX]: player(BOX, 'Hálószoba box', 'idle'),
    [TV]: player(TV, 'TV – Plex', 'playing', { ...FILM, position: 640 }, TV_FEATURES),
  },
  zene: {
    [BOX]: player(BOX, 'Hálószoba box', 'off'),
    [TV]: player(TV, 'TV – Plex', 'playing', { ...ALBUM, position: 95, volume_level: 0.32 }, TV_FEATURES),
  },
  szünet: {
    [BOX]: player(BOX, 'Hálószoba box', 'paused', { ...EPISODE, position: 1210 }),
    [TV]: player(TV, 'TV – Plex', 'idle', {}, TV_FEATURES),
  },
  'mindkettő': {
    [BOX]: player(BOX, 'Hálószoba box', 'paused', { ...EPISODE, position: 1210 }),
    [TV]: player(TV, 'TV – Plex', 'playing', { ...FILM, position: 3300, volume_level: 0.55 }, TV_FEATURES),
  },
  'csak bekapcsolva': {
    [BOX]: player(BOX, 'Hálószoba box', 'on'),
    [TV]: player(TV, 'TV – Plex', 'off', {}, TV_FEATURES),
  },
  'semmi': {
    [BOX]: player(BOX, 'Hálószoba box', 'off'),
    [TV]: player(TV, 'TV – Plex', 'off', {}, TV_FEATURES),
  },
  'egyik hiányzik': {
    [BOX]: player(BOX, 'Hálószoba box', 'playing', { ...EPISODE, position: 300 }),
  },
  'némítva': {
    [BOX]: player(BOX, 'Hálószoba box', 'idle'),
    [TV]: player(TV, 'TV – Plex', 'playing', { ...FILM, position: 1800, volume_level: 0.4, is_volume_muted: true }, TV_FEATURES),
  },
};

export function makeHass(key) {
  const states = SCENARIOS[key] || SCENARIOS['box megy'];
  const hass = {
    states: {},
    entities: {},
    devices: {},
    locale: { language: 'hu' },
    themes: { darkMode: false },
    callService: (domain, service, data) => {
      /* eslint-disable no-console */
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };
  for (const [entityId, stateObj] of Object.entries(states)) {
    hass.states[entityId] = stateObj;
    hass.entities[entityId] = {
      entity_id: entityId,
      platform: PLATFORMS[entityId] || 'demo',
      device_id: DEVICES[entityId] || null,
    };
  }
  /* the helper a macro writes, so the pair can show what was last sent -
     the television itself reports nothing about its eco setting */
  hass.states['input_boolean.tv_eco'] = {
    entity_id: 'input_boolean.tv_eco',
    state: 'off',
    attributes: { friendly_name: 'TV eco' },
  };
  hass.entities['input_boolean.tv_eco'] = {
    entity_id: 'input_boolean.tv_eco', platform: 'input_boolean', device_id: null,
  };

  /* each box also has a remote entity on the same device, which is how the
     card finds the one belonging to whatever is playing */
  for (const [entityId, device] of Object.entries(REMOTES)) {
    if (!Object.values(DEVICES).includes(device)) continue;
    if (!Object.keys(states).some((id) => DEVICES[id] === device)) continue;
    hass.states[entityId] = { entity_id: entityId, state: 'on', attributes: {} };
    hass.entities[entityId] = {
      entity_id: entityId,
      platform: entityId.includes('television') ? 'samsungtv_smart' : 'apple_tv',
      device_id: device,
    };
  }
  return hass;
}

window.demo = { SCENARIOS, makeHass, BOX, TV, SET };
