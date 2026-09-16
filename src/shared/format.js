/** Small formatting helpers shared by the card and the editor. */

export function formatClock(date, hass) {
  if (!date) return '';
  const locale = hass?.locale?.language || hass?.language || 'hu';
  const format = hass?.locale?.time_format;
  const options = { hour: '2-digit', minute: '2-digit' };
  if (format === '12') options.hour12 = true;
  if (format === '24') options.hour12 = false;
  try {
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (err) {
    return date.toTimeString().slice(0, 5);
  }
}

/** `195` -> `{ value: '3:15', unit: 'h' }`, `45` -> `{ value: '45', unit: 'm' }` */
export function splitDuration(minutes, t) {
  if (minutes === null || minutes === undefined) return null;
  const total = Math.max(0, Math.round(minutes));
  if (total < 60) return { value: String(total), unit: t('ui.minute_short') };
  const h = Math.floor(total / 60);
  const m = total % 60;
  return { value: `${h}:${String(m).padStart(2, '0')}`, unit: t('ui.hour_short') };
}

export function formatDuration(minutes, t) {
  const parts = splitDuration(minutes, t);
  return parts ? `${parts.value} ${parts.unit}` : '';
}

/** Compact `3:15` style text for the appliance display. */
export function displayTime(minutes) {
  if (minutes === null || minutes === undefined) return null;
  const total = Math.max(0, Math.round(minutes));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}` : `0:${String(m).padStart(2, '0')}`;
}

export function formatNumber(value, digits = 1) {
  if (value === null || value === undefined || !Number.isFinite(value)) return '–';
  return value.toFixed(digits).replace(/\.0$/, '');
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[ch]);
}
