/**
 * The indoor unit, drawn front-on.
 *
 * Both drawings are emitted once and then only have classes toggled on them,
 * so the CSS animations keep running instead of restarting on every state
 * update. The flap is the interesting part: seen from the front it does not
 * rotate, it slides down and foreshortens, uncovering the dark outlet behind
 * it - which is exactly what the real louver looks like from a sofa.
 */

import { FAN_ORDER, FLOW_SECONDS } from './const.js';

/** Fan mode -> airflow period. Lower fan steps drift, the top step races. */
export function flowSeconds(fanMode) {
  const index = FAN_ORDER.indexOf(String(fanMode ?? '').toLowerCase());
  const steps = FAN_ORDER.length - 1;
  if (index <= 0) return (FLOW_SECONDS.min + FLOW_SECONDS.max) / 2; // auto, or unknown
  const ratio = (index - 1) / Math.max(1, steps - 1);
  return FLOW_SECONDS.max - ratio * (FLOW_SECONDS.max - FLOW_SECONDS.min);
}

/** Gradients are shared by both drawings, so they are defined once per card. */
export function renderDefs(uid) {
  return `
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${uid}-case" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset=".5" stop-color="#f5f7f9"/>
        <stop offset="1" stop-color="#dde3e8"/>
      </linearGradient>
      <linearGradient id="${uid}-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f3f5f7"/>
        <stop offset="1" stop-color="#c4ccd3"/>
      </linearGradient>
      <linearGradient id="${uid}-cavity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2630"/>
        <stop offset="1" stop-color="#39474f"/>
      </linearGradient>
      <linearGradient id="${uid}-wash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="currentColor"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </linearGradient>
      <filter id="${uid}-soft" x="-40%" y="-40%" width="180%" height="200%">
        <feGaussianBlur stdDeviation="5"/>
      </filter>
    </defs>
  </svg>`;
}

/** The large drawing on a single-unit card. */
export function renderUnit(uid) {
  return `
  <svg class="ac" viewBox="0 0 200 176" role="img" aria-hidden="true">
    <path class="wash" d="M26 92h148l26 84H0Z" fill="url(#${uid}-wash)"/>
    <ellipse class="shadow" cx="100" cy="90" rx="84" ry="8" filter="url(#${uid}-soft)"/>
    <g class="body">
      <rect x="10" y="22" width="180" height="62" rx="15" fill="url(#${uid}-case)"/>
      <rect class="outline" x="10" y="22" width="180" height="62" rx="15"/>
      <g class="grille">
        <line x1="34" y1="33" x2="166" y2="33"/>
        <line x1="34" y1="38.5" x2="166" y2="38.5"/>
        <line x1="34" y1="44" x2="166" y2="44"/>
      </g>
      <path class="sheen" d="M18 54h164"/>
      <circle class="led" cx="170" cy="76" r="2.5"/>
      <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${uid}-cavity)"/>
      <g class="louver">
        <rect x="22" y="68" width="140" height="18" rx="6" fill="url(#${uid}-flap)"/>
        <rect class="outline" x="22" y="68" width="140" height="18" rx="6"/>
        <path class="flap-sheen" d="M30 72h124"/>
      </g>
    </g>
    <g class="stream">
      <path d="M44 96c-4 24 -8 42 -14 76"/>
      <path d="M76 98c-2 26 -4 44 -6 74"/>
      <path d="M110 98c2 26 4 44 6 74"/>
      <path d="M142 96c4 24 8 42 14 76"/>
    </g>
  </svg>`;
}

/** The thumbnail in front of each row of the group view. */
export function renderMini(uid) {
  return `
  <svg class="mini" viewBox="0 0 60 58" role="img" aria-hidden="true">
    <rect class="mbody" x="4" y="10" width="52" height="22" rx="6"/>
    <g class="grille">
      <line x1="14" y1="16" x2="46" y2="16"/>
      <line x1="14" y1="19.5" x2="46" y2="19.5"/>
    </g>
    <rect class="mcavity" x="8" y="25" width="44" height="7" rx="2.5"/>
    <rect class="mflap" x="8" y="25" width="44" height="7" rx="2.5" fill="url(#${uid}-flap)"/>
    <g class="stream">
      <path d="M20 36c-1 8 -2 12 -4 20"/>
      <path d="M40 36c1 8 2 12 4 20"/>
    </g>
  </svg>`;
}

/**
 * Points an existing drawing at a unit: running or not, flap swinging or
 * parked open, and how fast the air moves.
 */
export function applyUnit(svg, unit) {
  if (!svg) return;
  svg.classList.toggle('on', Boolean(unit.on));
  svg.classList.toggle('off', !unit.on);
  svg.classList.toggle('swing', Boolean(unit.on && unit.swinging));
  svg.classList.toggle('fixed', Boolean(unit.on && !unit.swinging));
  svg.style.setProperty('--flow-duration', `${flowSeconds(unit.fanMode).toFixed(2)}s`);
}
