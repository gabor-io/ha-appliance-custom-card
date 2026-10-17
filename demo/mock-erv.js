/** Mock `hass` for the ventilator card, shaped after a Fisher F-ERVQ-B150CO2-I. */

const DEVICE = 'demo-erv';
const PREFIX = 'fisher_f_ervq_b150co2_i';

/** `[entity_id, state, attributes]` - the ids come from a Hungarian HA. */
function baseEntities() {
  return [
    [`fan.${PREFIX}`, 'on', {
      friendly_name: 'Fisher F-ERVQ-B150CO2-I',
      preset_mode: 'Manual',
      preset_modes: ['Manual', 'auto', 'sleep', 'Pure L', 'Pure M', 'Pure H'],
      supported_features: 56,
    }],
    [`sensor.${PREFIX}_szen_dioxid`, '830', { device_class: 'carbon_dioxide', unit_of_measurement: 'ppm', friendly_name: 'Szén-dioxid' }],
    [`sensor.${PREFIX}_szallo_por_25_mm`, '0', { device_class: 'pm25', unit_of_measurement: 'μg/m³', friendly_name: 'Szálló por 2,5 μm' }],
    [`sensor.${PREFIX}_paratartalom`, '48', { device_class: 'humidity', unit_of_measurement: '%', friendly_name: 'Páratartalom' }],
    [`sensor.${PREFIX}_homerseklet`, '22', { device_class: 'temperature', unit_of_measurement: '°C', friendly_name: 'Hőmérséklet' }],
    [`sensor.${PREFIX}_szuro_elettartam`, '180', { device_class: 'duration', unit_of_measurement: 'd', friendly_name: 'Szűrő élettartam' }],
    [`binary_sensor.${PREFIX}_problema`, 'off', { device_class: 'problem', fault_code: 0, friendly_name: 'Probléma' }],
    [`number.${PREFIX}_supply_fan_speed`, '1', { min: 1, max: 8, step: 1, friendly_name: 'Supply fan speed' }],
    [`number.${PREFIX}_exhaust_fan_speed`, '1', { min: 1, max: 8, step: 1, friendly_name: 'Exhaust fan speed' }],
    [`select.${PREFIX}_filter_lifespan`, '180 days', {
      options: ['90 days', '120 days', '150 days', '180 days'],
      friendly_name: 'Filter lifespan',
    }],
    [`button.${PREFIX}_szuro_visszaallitas`, '2026-10-15T15:18:31+00:00', { friendly_name: 'Szűrő visszaállítás' }],
  ];
}

export const SCENARIOS = {
  alap: {},
  szellozteto: {
    [`sensor.${PREFIX}_szen_dioxid`]: '1320',
    [`number.${PREFIX}_supply_fan_speed`]: '5',
    [`number.${PREFIX}_exhaust_fan_speed`]: '5',
    [`fan.${PREFIX}`]: { state: 'on', preset_mode: 'auto' },
  },
  pure: {
    [`fan.${PREFIX}`]: { state: 'on', preset_mode: 'Pure H' },
    [`sensor.${PREFIX}_szallo_por_25_mm`]: '34',
    [`number.${PREFIX}_supply_fan_speed`]: '8',
    [`number.${PREFIX}_exhaust_fan_speed`]: '7',
  },
  kikapcsolva: {
    [`fan.${PREFIX}`]: { state: 'off' },
  },
  szuro_hiba: {
    [`sensor.${PREFIX}_szuro_elettartam`]: '6',
    [`binary_sensor.${PREFIX}_problema`]: { state: 'on', fault_code: 2 },
  },
  /* The appliance is off the network. tuya_local keeps every entity and
     turns them all unavailable at once - the fan entity included, which is
     what the card has to notice: an unavailable fan is not a fan that was
     switched off. */
  nem_elerheto: Object.fromEntries(
    baseEntities().map(([entityId]) => [entityId, 'unavailable']),
  ),
};

export function makeHass(scenario = 'alap') {
  const overrides = SCENARIOS[scenario] || {};
  const states = {};
  const entities = {};

  for (const [entityId, state, attributes] of baseEntities()) {
    const override = overrides[entityId];
    const extraAttrs = override && typeof override === 'object' ? { ...override } : {};
    delete extraAttrs.state;
    states[entityId] = {
      entity_id: entityId,
      state: String(
        typeof override === 'string' ? override : override?.state !== undefined ? override.state : state,
      ),
      attributes: { ...attributes, ...extraAttrs },
    };
    entities[entityId] = { entity_id: entityId, device_id: DEVICE, platform: 'tuya_local' };
  }

  return {
    states,
    entities,
    devices: {
      [DEVICE]: {
        id: DEVICE,
        name: 'Fisher F-ERVQ-B150CO2-I',
        manufacturer: 'Fisher',
        model: 'Heat recovery ventilator',
        model_id: 'F-ERVQ-B150CO2-I',
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
