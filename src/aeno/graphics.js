/**
 * The panel, drawn front-on as it hangs on the wall.
 *
 * It is an *infrared* panel: it heats by radiating from the face of the glass,
 * not by convection, so the warmth leaves the plate perpendicular to it rather
 * than rising off the top. The drawing follows that - a warm halo around the
 * whole plate with waves expanding outwards from it - because a column of
 * rising air would be the wrong picture of how this heater works.
 *
 * Two things are readable without reading a number:
 *
 * - the **frame colour** is the plate's own measured temperature, scaled from
 *   a cold grey to red at the 120 °C the element is allowed to reach;
 * - the **motion** is whether the element is actually drawing power.
 *
 * Keeping those apart matters: a panel switched off ten minutes ago is still
 * hot (warm frame, no motion), and one switched on a minute ago is still cold
 * (grey frame, moving). Either way the picture says what is true.
 *
 * Mounted on the wall it has no legs. The control box with its indicator sits
 * on the right-hand edge, and the AENO lettering in the bottom right corner -
 * plain type, not the real wordmark: at this size the logo's own glyphs are
 * indistinguishable from lettering and only crowd what is next to them.
 *
 * The drawing is emitted once and then only has classes and two numbers
 * changed on it, so the CSS animations keep running instead of restarting on
 * every state update.
 */

/**
 * The frame ramp: a cold plate is the grey of the real aluminium frame, and
 * 120 °C - the hottest the element may run - is red. The two stops between
 * keep the middle of the range from washing out into mud, which a straight
 * grey-to-red mix does.
 */
const FRAME_STOPS = [
  [0, [154, 163, 168]],
  [0.2, [168, 176, 181]],
  [0.42, [240, 169, 43]],
  [0.7, [239, 108, 42]],
  [1, [216, 27, 27]],
];

/** The ramp colour for a 0-to-1 position along it. */
export function frameColour(ratio) {
  if (ratio === null || ratio === undefined) return `rgb(${FRAME_STOPS[0][1].join()})`;
  const value = Math.max(0, Math.min(1, ratio));
  let lower = FRAME_STOPS[0];
  let upper = FRAME_STOPS[FRAME_STOPS.length - 1];
  for (let i = 0; i < FRAME_STOPS.length - 1; i += 1) {
    if (value >= FRAME_STOPS[i][0] && value <= FRAME_STOPS[i + 1][0]) {
      lower = FRAME_STOPS[i];
      upper = FRAME_STOPS[i + 1];
      break;
    }
  }
  const span = upper[0] - lower[0];
  const t = span === 0 ? 0 : (value - lower[0]) / span;
  const mix = lower[1].map((channel, i) => Math.round(channel + (upper[1][i] - channel) * t));
  return `rgb(${mix.join()})`;
}

/** Gradients and blurs, defined once per card. */
export function renderDefs(uid) {
  return `
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <!-- the glass: light at the top, a reflection band, a paler foot -->
      <linearGradient id="${uid}-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".30" stop-color="#f6f8fa"/>
        <stop offset=".345" stop-color="#dfe5ea"/>
        <stop offset=".40" stop-color="#fbfcfd"/>
        <stop offset=".78" stop-color="#eff2f5"/>
        <stop offset="1" stop-color="#e4e9ed"/>
      </linearGradient>
      <!-- the bright band that runs across the real plate -->
      <linearGradient id="${uid}-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset=".18" stop-color="#fff" stop-opacity=".95"/>
        <stop offset=".62" stop-color="#fff" stop-opacity=".75"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <filter id="${uid}-wall" x="-30%" y="-40%" width="160%" height="200%">
        <feGaussianBlur stdDeviation="4"/>
      </filter>
      <filter id="${uid}-glow" x="-45%" y="-70%" width="190%" height="260%">
        <feGaussianBlur stdDeviation="7"/>
      </filter>
    </defs>
  </svg>`;
}

/** The plate itself. */
export function renderPanel(uid) {
  return `
  <svg class="panel" viewBox="0 0 264 124" role="img" aria-hidden="true">
    <!-- the radiated heat, leaving the face of the plate -->
    <g class="heat">
      <rect class="halo" x="16" y="14" width="232" height="96" rx="7" filter="url(#${uid}-glow)"/>
      <g class="waves" filter="url(#${uid}-glow)">
        <rect class="wave w0" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
        <rect class="wave w1" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
        <rect class="wave w2" x="16" y="14" width="232" height="96" rx="7" fill="none"/>
      </g>
    </g>

    <!-- the wall behind: the panel stands a few centimetres off it -->
    <rect class="wall" x="22" y="22" width="220" height="92" rx="6" filter="url(#${uid}-wall)"/>

    <rect class="glass" x="16" y="14" width="232" height="96" rx="6" fill="url(#${uid}-glass)"/>
    <rect class="sheen" x="21" y="40" width="222" height="7" rx="3.5" fill="url(#${uid}-sheen)"/>
    <rect class="sheen-soft" x="21" y="47" width="222" height="15" rx="7.5" fill="url(#${uid}-sheen)" opacity=".3"/>

    <!-- The frame carries the plate's own temperature as colour. The real
         panel has an aluminium edge, so this is the part of it that is
         actually getting hot - not an indicator bolted onto the picture. -->
    <rect class="frame" x="17.3" y="15.3" width="229.4" height="93.4" rx="5.4" fill="none"/>

    <!-- The setpoint, etched into the glass, with the plate's own temperature
         beside it. The real panel has no display at all, so neither is drawn
         as a lit readout: they are the card's annotation of the thing. -->
    <text class="setpoint" x="38" y="80"><tspan class="value"></tspan
      ><tspan class="unit" dx="5" dy="-16"></tspan></text>
    <text class="surface" x="228" y="40" text-anchor="end"></text>

    <text class="brand" x="228" y="99" text-anchor="end">AENO</text>

    <!-- control box on the right edge, with its indicator -->
    <rect class="box" x="246" y="46" width="10" height="30" rx="3"/>
    <circle class="led-halo" cx="251" cy="61" r="4.6"/>
    <circle class="led" cx="251" cy="61" r="2.3"/>
  </svg>`;
}

/**
 * Points an existing drawing at a panel.
 *
 * The colour follows the measured surface temperature where the profile
 * reports it, and only falls back to the demand signal where it does not: a
 * panel switched on a minute ago says "heating" long before it radiates
 * anything, and drawing it already hot would be the one thing the picture
 * must not lie about.
 */
export function applyPanel(svg, panel, showSetpoint = true) {
  if (!svg) return;

  const warm = panel.on && panel.heating;
  svg.classList.toggle('hot', Boolean(warm));
  svg.classList.toggle('dead', !panel.available);
  /* no surface sensor, no colour to show: the frame stays as the metal is */
  svg.classList.toggle('measured', panel.glow !== null);

  const ratio = panel.glow !== null ? panel.glow : warm ? 0.5 : 0;
  svg.style.setProperty('--ae-glow', ratio.toFixed(2));
  svg.style.setProperty('--ae-frame', frameColour(panel.glow));

  const value = showSetpoint && panel.target !== null ? String(Math.round(panel.target)) : '';
  const number = svg.querySelector('.setpoint .value');
  const unit = svg.querySelector('.setpoint .unit');
  if (number.textContent !== value) number.textContent = value;
  /* `dx` on the unit tspan puts it after the number whatever the glyphs
     measure, so it cannot collide the way a computed x did */
  const unitText = value ? '°C' : '';
  if (unit.textContent !== unitText) unit.textContent = unitText;

  const surface = svg.querySelector('.surface');
  const surfaceText = panel.panelTemp === null ? '' : `${Math.round(panel.panelTemp)} °C`;
  if (surface.textContent !== surfaceText) surface.textContent = surfaceText;
}
