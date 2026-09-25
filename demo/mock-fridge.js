/** Mock `hass` for the Liebherr card: a real Rd 5000 and a fridge-freezer. */

const DEVICE = 'demo-fridge';

/** `[domain, object-id suffix, translation_key, state, attributes]` */
function singleZone() {
  return [
    ['sensor', null, null, '4.6', { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Liebherr cooler' }],
    ['number', 'setpoint', 'setpoint_temperature', '4', { min: 2, max: 9, step: 1, unit_of_measurement: '°C', device_class: 'temperature' }],
    ['switch', 'supercool', 'super_cool', 'off', {}],
    ['switch', 'nightmode', 'night_mode', 'off', {}],
  ];
}

function twoZones() {
  return [
    ['sensor', 'top_zone', 'top_zone', '5.1', { device_class: 'temperature', unit_of_measurement: '°C' }],
    ['sensor', 'bottom_zone', 'bottom_zone', '-18.4', { device_class: 'temperature', unit_of_measurement: '°C' }],
    ['number', 'top_zone_setpoint', 'setpoint_temperature_top_zone', '5', { min: 2, max: 9, step: 1, unit_of_measurement: '°C' }],
    ['number', 'bottom_zone_setpoint', 'setpoint_temperature_bottom_zone', '-18', { min: -26, max: -14, step: 1, unit_of_measurement: '°C' }],
    ['switch', 'top_zone_supercool', 'super_cool_top_zone', 'off', {}],
    ['switch', 'bottom_zone_superfrost', 'super_frost_bottom_zone', 'off', {}],
    ['select', 'top_zone_biofresh_plus', 'bio_fresh_plus_top_zone', 'zero_zero', { options: ['minus_two_minus_two', 'minus_two_zero', 'zero_minus_two', 'zero_zero'] }],
    ['select', 'bottom_zone_icemaker', 'ice_maker_bottom_zone', 'on', { options: ['off', 'on', 'max_ice'] }],
    ['switch', 'nightmode', 'night_mode', 'off', {}],
    ['switch', 'partymode', 'party_mode', 'off', {}],
    ['light', 'presentation_light', 'presentation_light', 'off', { brightness: 0, supported_color_modes: ['brightness'] }],
  ];
}

export const SCENARIOS = {
  alap: { zones: singleZone, overrides: {} },
  hut: { zones: singleZone, overrides: { sensor: '6.8' } },
  supercool: { zones: singleZone, overrides: { supercool: 'on', sensor: '2.4' } },
  ejszaka: { zones: singleZone, overrides: { nightmode: 'on' } },
  ajto_nyitva: {
    zones: singleZone,
    overrides: { sensor: '7.2' },
    door: 'on',
    config: { entities: { door: 'binary_sensor.liebherr_cooler_door' } },
  },
  kombi: { zones: twoZones, overrides: {} },
  kombi_boost: {
    zones: twoZones,
    overrides: {
      top_zone_supercool: 'on',
      bottom_zone_superfrost: 'on',
      presentation_light: 'on',
      partymode: 'on',
      top_zone: '7.9',
    },
  },
};

export function makeHass(scenario = 'alap') {
  const spec = SCENARIOS[scenario] || SCENARIOS.alap;
  const prefix = 'liebherr_cooler';
  const states = {};
  const entities = {};

  for (const [domain, suffix, translationKey, state, attributes] of spec.zones()) {
    const entityId = suffix ? `${domain}.${prefix}_${suffix}` : `${domain}.${prefix}`;
    const override = spec.overrides[suffix || domain];
    states[entityId] = {
      entity_id: entityId,
      state: String(override ?? state),
      attributes: {
        friendly_name: `Liebherr cooler ${(suffix || '').replace(/_/g, ' ')}`.trim(),
        ...attributes,
        ...(override === 'on' && domain === 'light' ? { brightness: 180 } : {}),
      },
    };
    entities[entityId] = {
      entity_id: entityId,
      device_id: DEVICE,
      platform: 'liebherr',
      translation_key: translationKey,
    };
  }

  if (spec.door !== undefined) {
    // a door contact does not come from the Liebherr integration; the card
    // takes any entity the configuration points at
    const doorId = 'binary_sensor.liebherr_cooler_door';
    states[doorId] = {
      entity_id: doorId,
      state: spec.door,
      attributes: { friendly_name: 'Hűtő ajtó', device_class: 'door' },
    };
    entities[doorId] = { entity_id: doorId, device_id: DEVICE, platform: 'mqtt' };
  }

  return {
    states,
    entities,
    devices: {
      [DEVICE]: {
        id: DEVICE,
        name: 'Liebherr cooler',
        manufacturer: 'Liebherr',
        model: 'Fridge',
        model_id: 'Rd 5000-150 2',
      },
    },
    language: 'hu',
    locale: { language: 'hu', time_format: '24' },
    config: { unit_system: { temperature: '°C' } },
    callService: (domain, service, data) => {
      console.log('callService', domain, service, data);
      return Promise.resolve();
    },
  };
}

window.demo = { SCENARIOS, makeHass };
