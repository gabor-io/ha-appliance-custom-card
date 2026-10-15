/**
 * The hero illustration: the ventilator seen from the front, with the same
 * display the appliance has - CO2 as the big number, temperature and humidity
 * under it, and the fan-speed digit in its own box.
 *
 * Airflow is drawn as two dashed streams: fresh air drawn in and stale air
 * pushed out. Their animation speed follows the fan speed through the
 * `--flow-duration` custom property, so a state update never rebuilds the SVG.
 */

export function renderVentilator() {
  return `
<svg class="erv" viewBox="0 0 190 250" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="erv-body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--erv-body-dark)"/>
      <stop offset=".28" stop-color="var(--erv-body-light)"/>
      <stop offset=".75" stop-color="var(--erv-body)"/>
      <stop offset="1" stop-color="var(--erv-body-dark)"/>
    </linearGradient>
    <linearGradient id="erv-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3137"/>
      <stop offset="1" stop-color="#15191d"/>
    </linearGradient>
    <clipPath id="erv-flow-clip"><rect x="14" y="30" width="100" height="200" rx="10"/></clipPath>
  </defs>

  <ellipse class="shadow" cx="95" cy="244" rx="74" ry="7"/>

  <!-- cabinet -->
  <rect class="body" x="10" y="6" width="170" height="236" rx="14"/>
  <rect class="base" x="10" y="208" width="170" height="34" rx="14"/>
  <rect class="column" x="116" y="6" width="64" height="236" rx="14"/>
  <rect class="front" x="14" y="10" width="104" height="198" rx="12"/>

  <!-- airflow between the two streams -->
  <g class="flow" clip-path="url(#erv-flow-clip)">
    <g class="stream in">
      ${[36, 58, 80].map((x, i) => `<path style="--delay:${i * 0.4}s" d="M${x} 36 V196"/>`).join('')}
    </g>
    <g class="stream out">
      ${[47, 69, 91].map((x, i) => `<path style="--delay:${i * 0.4 + 0.2}s" d="M${x} 196 V36"/>`).join('')}
    </g>
  </g>

  <!-- brand plate -->
  <rect class="plate" x="40" y="96" width="52" height="12" rx="6"/>

  <!-- display -->
  <g class="panel">
    <rect class="panel-body" x="122" y="18" width="52" height="92" rx="7"/>
    <circle class="led wifi" cx="130" cy="26" r="2"/>
    <text class="clock" x="168" y="29" text-anchor="end">--:--</text>

    <rect class="panel-cell" x="126" y="32" width="44" height="30" rx="4"/>
    <text class="co2-value" x="148" y="54" text-anchor="middle">---</text>
    <text class="co2-label" x="128" y="60">CO2</text>

    <rect class="panel-cell" x="126" y="66" width="28" height="24" rx="4"/>
    <text class="small" x="130" y="76">--°C</text>
    <text class="small" x="130" y="86">--%</text>

    <rect class="panel-cell" x="158" y="66" width="12" height="24" rx="4"/>
    <text class="speed" x="164" y="80" text-anchor="middle">-</text>

    <g class="keys">
      <circle cx="134" cy="102" r="4"/>
      <circle cx="148" cy="102" r="4"/>
      <circle cx="162" cy="102" r="4"/>
    </g>
  </g>

  <!-- filter strip -->
  <rect class="filter-strip" x="24" y="214" width="84" height="6" rx="3"/>
</svg>`;
}

/** Writes the readings onto the display without touching the rest. */
export function updateErvDisplay(root, { co2, temp, humidity, speed, clock }) {
  const set = (selector, text) => {
    const node = root.querySelector(selector);
    if (node && text !== undefined && node.textContent !== text) node.textContent = text;
  };
  set('.erv .co2-value', co2);
  set('.erv .speed', speed);
  set('.erv .clock', clock);

  const smalls = root.querySelectorAll('.erv text.small');
  if (smalls[0] && smalls[0].textContent !== temp) smalls[0].textContent = temp;
  if (smalls[1] && smalls[1].textContent !== humidity) smalls[1].textContent = humidity;
}
