/**
 * The panel, drawn front-on as it hangs on the wall.
 *
 * It is an *infrared* panel: it heats by radiating from the face of the glass,
 * not by convection, so the warmth leaves the plate perpendicular to it rather
 * than rising off the top. The drawing follows that - a warm halo around the
 * whole plate with waves expanding outwards from it - because a column of
 * rising air would be the wrong picture of how this heater works.
 *
 * Mounted on the wall it has no legs. The control box with its indicator sits
 * on the right-hand edge, and the AENO lettering in the bottom right corner -
 * plain type, not the real wordmark: at this size the logo's own glyphs are
 * indistinguishable from lettering and only crowd what is next to them.
 *
 * The drawing is emitted once and then only has classes toggled on it, so the
 * CSS animations keep running instead of restarting on every state update.
 */

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
      <!-- darker towards both edges, so the plate has a body -->
      <linearGradient id="${uid}-vign" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b9c2c9" stop-opacity=".40"/>
        <stop offset=".07" stop-color="#b9c2c9" stop-opacity="0"/>
        <stop offset=".93" stop-color="#b9c2c9" stop-opacity="0"/>
        <stop offset="1" stop-color="#b9c2c9" stop-opacity=".40"/>
      </linearGradient>
      <!-- the bright band that runs across the real plate -->
      <linearGradient id="${uid}-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/>
        <stop offset=".18" stop-color="#fff" stop-opacity=".95"/>
        <stop offset=".62" stop-color="#fff" stop-opacity=".75"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <filter id="${uid}-wall" x="-30%" y="-40%" width="160%" height="200%">
        <feGaussianBlur stdDeviation="4.5"/>
      </filter>
      <filter id="${uid}-glow" x="-45%" y="-70%" width="190%" height="260%">
        <feGaussianBlur stdDeviation="9"/>
      </filter>
    </defs>
  </svg>`;
}

/** The plate itself. */
export function renderPanel(uid) {
  return `
  <svg class="panel" viewBox="0 0 272 148" role="img" aria-hidden="true">
    <!-- the radiated heat, leaving the face of the plate -->
    <g class="heat">
      <rect class="halo" x="16" y="26" width="240" height="96" rx="7" filter="url(#${uid}-glow)"/>
      <g class="waves" filter="url(#${uid}-glow)">
        <rect class="wave w0" x="16" y="26" width="240" height="96" rx="7" fill="none"/>
        <rect class="wave w1" x="16" y="26" width="240" height="96" rx="7" fill="none"/>
        <rect class="wave w2" x="16" y="26" width="240" height="96" rx="7" fill="none"/>
      </g>
    </g>

    <!-- the wall behind: the panel stands a few centimetres off it -->
    <rect class="wall" x="22" y="34" width="228" height="92" rx="6" filter="url(#${uid}-wall)"/>

    <rect class="glass" x="16" y="26" width="240" height="96" rx="6" fill="url(#${uid}-glass)"/>
    <rect class="vign" x="16" y="26" width="240" height="96" rx="6" fill="url(#${uid}-vign)"/>
    <rect class="sheen" x="21" y="55" width="230" height="7.5" rx="3.75" fill="url(#${uid}-sheen)"/>
    <rect class="sheen-soft" x="21" y="63" width="230" height="16" rx="8" fill="url(#${uid}-sheen)" opacity=".3"/>
    <rect class="edge" x="16.4" y="26.4" width="239.2" height="95.2" rx="5.8" fill="none"/>

    <!-- The setpoint, etched into the glass. The real panel has no display at
         all, so this is drawn as faint engraving rather than as a lit readout:
         it is the card's own annotation and must not look like hardware. -->
    <text class="setpoint" x="36" y="82"><tspan class="value"></tspan
      ><tspan class="unit" dx="5" dy="-14"></tspan></text>

    <text class="brand" x="200" y="110">AENO</text>

    <!-- control box on the right edge, with its indicator -->
    <rect class="box" x="254" y="58" width="10" height="30" rx="3"/>
    <circle class="led-halo" cx="259" cy="73" r="4.6"/>
    <circle class="led" cx="259" cy="73" r="2.3"/>
  </svg>`;
}

/**
 * Points an existing drawing at a panel.
 *
 * The glow follows the measured surface temperature where the profile reports
 * it, and only falls back to the demand signal where it does not: a panel
 * switched on a minute ago says "heating" long before it radiates anything, and
 * drawing it already hot would be the one thing the picture must not lie about.
 */
export function applyPanel(svg, panel, showSetpoint = true) {
  if (!svg) return;

  const warm = panel.on && panel.heating;
  svg.classList.toggle('hot', Boolean(warm));
  svg.classList.toggle('dead', !panel.available);

  const glow = panel.glow !== null ? panel.glow : warm ? 1 : 0;
  svg.style.setProperty('--ae-glow', glow.toFixed(2));

  const value = showSetpoint && panel.target !== null ? String(Math.round(panel.target)) : '';
  const number = svg.querySelector('.setpoint .value');
  const unit = svg.querySelector('.setpoint .unit');
  if (number.textContent !== value) number.textContent = value;
  /* `dx` on the unit tspan puts it after the number whatever the glyphs
     measure, so it cannot collide the way a computed x did */
  const unitText = value ? '°C' : '';
  if (unit.textContent !== unitText) unit.textContent = unitText;
}
