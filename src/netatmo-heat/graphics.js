/**
 * The thermostat and the radiator valves.
 *
 * Both glow when they are calling for heat, which is what the real devices
 * do: the thermostat lights its surround and the valve lights a ring behind
 * the cap. The drawings are emitted once and only have classes toggled, so
 * the glow keeps breathing instead of restarting on every state update.
 */

export function renderDefs(uid) {
  return `
  <svg class="defs" width="0" height="0" aria-hidden="true"><defs>
    <linearGradient id="${uid}-knurl" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b9bec2"/><stop offset=".3" stop-color="#eceef0"/>
      <stop offset=".6" stop-color="#c3c8cc"/><stop offset="1" stop-color="#9aa0a5"/>
    </linearGradient>
    <linearGradient id="${uid}-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f7f9fa"/>
      <stop offset="1" stop-color="#e2e6e9"/>
    </linearGradient>
    <filter id="${uid}-warm" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <filter id="${uid}-soft" x="-50%" y="-40%" width="200%" height="190%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs></svg>`;
}

/** The wall thermostat: two stacked blocks, the back one glowing. */
export function renderThermostat(uid) {
  return `
  <svg class="dev thermostat" viewBox="0 0 120 120" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="62" cy="106" rx="40" ry="5" filter="url(#${uid}-soft)"/>
    <rect class="glow soft" x="12" y="10" width="84" height="84" rx="9" filter="url(#${uid}-warm)"/>
    <rect class="shade" x="14" y="12" width="80" height="80" rx="8"/>
    <rect class="edge" x="14" y="12" width="80" height="80" rx="8"/>
    <rect class="glow soft" x="24" y="20" width="86" height="86" rx="10" filter="url(#${uid}-warm)"/>
    <rect x="26" y="22" width="82" height="82" rx="9" fill="url(#${uid}-body)"/>
    <rect class="edge" x="26" y="22" width="82" height="82" rx="9"/>
    <rect class="glow" x="26" y="98" width="82" height="6" rx="3"/>
    <rect class="glow" x="104" y="22" width="4" height="82" rx="2"/>
    <rect class="screen" x="46" y="42" width="42" height="42" rx="3"/>
    <text class="digit current" x="52" y="66" font-size="22">--</text>
    <text class="digit frac" x="78" y="55" font-size="10"></text>
    <text class="digit ghost target" x="52" y="80" font-size="13">--</text>
  </svg>`;
}

/** A radiator valve, lying the way it sits on the radiator. */
export function renderValve(uid) {
  return `
  <svg class="dev valve" viewBox="0 0 120 70" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="62" cy="60" rx="38" ry="4" filter="url(#${uid}-soft)"/>
    <rect x="8" y="20" width="16" height="26" rx="3" fill="url(#${uid}-knurl)"/>
    <rect class="glow soft" x="20" y="10" width="86" height="46" rx="12" filter="url(#${uid}-warm)"/>
    <rect x="22" y="12" width="82" height="42" rx="11" fill="url(#${uid}-body)"/>
    <rect class="edge" x="22" y="12" width="82" height="42" rx="11"/>
    <rect class="glow" x="88" y="12" width="7" height="42" rx="3.5"/>
    <ellipse class="shade" cx="99" cy="33" rx="9" ry="21"/>
    <ellipse cx="99" cy="33" rx="7" ry="18" fill="#fcfdfd"/>
    <ellipse class="edge" cx="99" cy="33" rx="9" ry="21"/>
    <rect class="screen" x="40" y="20" width="26" height="17" rx="2"/>
    <text class="digit target" x="44" y="34" font-size="13">--</text>
  </svg>`;
}

/**
 * Points a drawing at a room.
 *
 * The glow's strength follows the heating request where the device reports
 * one; a thermostat, which reports none, simply glows at full.
 */
export function applyDevice(svg, room) {
  if (!svg) return;
  svg.classList.toggle('lit', Boolean(room.heating));
  svg.classList.toggle('dead', !room.available);
  const strength = room.request === null ? 0.85 : 0.4 + Math.min(100, room.request) / 200;
  svg.style.setProperty('--lit', strength.toFixed(2));

  const set = (selector, text) => {
    const node = svg.querySelector(selector);
    if (node && node.textContent !== text) node.textContent = text;
  };
  if (!room.available) {
    set('.current', '--');
    set('.frac', '');
    set('.target', '--');
    return;
  }
  if (room.current !== null) {
    set('.current', String(Math.floor(room.current)));
    set('.frac', String(Math.round((room.current % 1) * 10)));
  }
  if (room.target !== null) set('.target', String(room.target).replace('.5', '⁵'));
}
