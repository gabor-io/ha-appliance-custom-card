/**
 * Styles for the AENO panel heater card.
 *
 * The layout follows the air conditioner card: a header with the readings, one
 * hero row with the drawing, the status and the big setpoint, then the on/off
 * bar and a row of controls. Everything takes its colour from `--ap-accent`,
 * which the card sets from the state, so a running panel reads as warm without
 * having to be read.
 */

import { BASE_STYLES } from '../shared/base-styles.js';

export const STYLES = `
${BASE_STYLES}

:host {
  --ae-heat: #ef6c00;
  --ae-off: var(--state-icon-color, #8a9199);
  /* how far along cold -> hot the panel surface is, 0 to 1 */
  --ae-glow: 0;
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
/* a wash of the accent, so the card reads as warm at a glance */
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 11%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header with the readings ---------- */
.top { display: flex; align-items: flex-start; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; cursor: pointer; }
.top .sub { font-size: .72rem; color: var(--ap-muted); margin-top: 1px; }
.top .spacer { flex: 1; }

.ind { display: flex; gap: 6px 10px; flex-wrap: wrap; justify-content: flex-end; }
.ind > span {
  display: inline-flex; align-items: center; gap: 4px; cursor: pointer;
  font-size: .74rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; white-space: nowrap;
}
.ind b { color: var(--ap-text); font-weight: 600; }
.ind .icon { width: 13px; height: 13px; opacity: .75; }
.ind .raw { font-size: .68rem; }

.open-badge {
  display: inline-flex; align-items: center; gap: 3px; margin-left: 6px;
  color: var(--warning-color, #fb8c00); font-weight: 600;
}
.open-badge .icon { width: 12px; height: 12px; }
.open-badge.calm { color: var(--ap-muted); font-weight: 500; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 132px minmax(0,1fr) auto; gap: 14px; align-items: center; }
.hero.no-art { grid-template-columns: minmax(0,1fr) auto; }
.compact .hero { grid-template-columns: 104px minmax(0,1fr) auto; gap: 10px; }
/* On a narrow card the readings cannot share a line with the name without
   breaking the model number in half, so they drop to a line of their own. */
@container (max-width: 420px) {
  .top { flex-wrap: wrap; }
  .top .spacer { display: none; }
  .ind { width: 100%; justify-content: flex-start; }
}

/* A phone card in portrait is about 390px wide: too narrow for the drawing,
   the status text and the setpoint side by side, but no reason to drop the
   drawing - it stacks above the other two instead. */
@container (max-width: 420px) {
  .hero {
    grid-template-columns: minmax(0,1fr) auto;
    grid-template-areas: 'art art' 'status dial';
    gap: 10px 12px;
  }
  .hero .art { grid-area: art; width: 100%; max-width: 230px; justify-self: center; }
  .hero .status { grid-area: status; }
  .hero .dial { grid-area: dial; }
  .hero.no-art { grid-template-areas: 'status dial'; }
}

.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }

.dial { display: flex; align-items: center; gap: 8px; }
.dial .big {
  font-size: 2rem; font-weight: 300; letter-spacing: -.03em; line-height: 1;
  color: var(--ap-text); font-variant-numeric: tabular-nums; white-space: nowrap;
}
.compact .dial .big { font-size: 1.6rem; }
.dial .big small { font-size: .8rem; font-weight: 600; color: var(--ap-muted); margin-left: 3px; }
.updown { display: grid; gap: 4px; }
.updown button {
  width: 30px; height: 26px; border-radius: 8px; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  display: inline-flex; align-items: center; justify-content: center;
  transition: border-color .2s ease, transform .1s ease;
}
.updown button .icon { width: 18px; height: 18px; }
.updown button:hover:not([disabled]) { border-color: var(--ap-accent); }
.updown button:active:not([disabled]) { transform: scale(.94); }
.updown button[disabled] { opacity: .32; cursor: not-allowed; }

/* ---------- on/off bar ---------- */
.seg {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px;
  padding: 4px; border-radius: 14px; background: color-mix(in srgb, var(--ap-text) 6%, transparent);
}
.seg button {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 9px 6px; border-radius: 10px; cursor: pointer; min-width: 0;
  border: 0; background: transparent; color: var(--ap-muted);
  font: inherit; font-size: .78rem; font-weight: 600;
  transition: background .2s ease, color .2s ease, transform .1s ease;
}
.seg button .icon { width: 17px; height: 17px; flex: 0 0 auto; }
.seg button span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.seg button:active { transform: scale(.98); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 4px rgba(0,0,0,.14);
}
.dark .seg button[aria-pressed="true"] { background: color-mix(in srgb, var(--ap-text) 14%, transparent); }
.seg button.power[aria-pressed="true"] { color: var(--ae-off); }
@container (max-width: 320px) { .seg button span { display: none; } }

/* ---------- control row ---------- */
.btnrow { display: flex; flex-wrap: wrap; gap: 8px; }
.ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .78rem; font-weight: 500;
  transition: border-color .2s ease, background .2s ease, color .2s ease, transform .1s ease;
}
.ghost .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.ghost:hover:not([disabled]) { border-color: var(--ap-accent); }
.ghost:active:not([disabled]) { transform: scale(.97); }
.ghost[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 15%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  color: var(--ap-accent);
}
.ghost[aria-pressed="true"] .icon { color: var(--ap-accent); }
.ghost[disabled] { opacity: .4; cursor: not-allowed; }

/* the element limit, as a small stepper on the same row */
.limit {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 6px 4px 12px;
  border-radius: 999px; border: 1px solid var(--ap-line);
  font-size: .78rem; color: var(--ap-muted);
}
.limit b { color: var(--ap-text); font-weight: 600; font-variant-numeric: tabular-nums; }
.limit button {
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer; padding: 0;
  border: 0; background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-text);
  display: inline-flex; align-items: center; justify-content: center;
}
.limit button .icon { width: 15px; height: 15px; }
.limit button:active:not([disabled]) { transform: scale(.92); }
.limit button[disabled] { opacity: .32; cursor: not-allowed; }

/* ---------- the panel drawing ---------- */
.art { display: block; }
.art[hidden] { display: none; }
.panel { width: 100%; height: auto; display: block; overflow: visible; }
.panel .wall { fill: #000; opacity: .16; }
.panel .glass { stroke: rgba(0,0,0,.06); stroke-width: .6; }
.panel .box { fill: #f1f4f5; stroke: rgba(0,0,0,.14); stroke-width: .7; }
.panel .led { fill: #9aa3a8; transition: fill .5s ease; }
.panel .led-halo { fill: #5bd07a; opacity: 0; transition: opacity .5s ease; }
.panel.hot .led { fill: #5bd07a; }
.panel.hot .led-halo { opacity: .3; }
.panel .brand { font: 600 7px/1 Roboto, Arial, sans-serif; letter-spacing: 1.9px; fill: #a7aeb3; }

/* the frame carries the plate's measured temperature, 0 °C grey to 120 red */
.panel .frame {
  stroke: var(--ae-frame, #9aa3a8); stroke-width: 2.6;
  transition: stroke 1.2s ease, stroke-width .6s ease;
}
/* while the element runs the frame breathes, so motion says "working" and
   colour says "hot" - a panel can be either without being the other */
.panel.hot .frame { stroke-width: 3.4; animation: ae-frame 2.4s ease-in-out infinite; }
@keyframes ae-frame { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }

/* the two numbers etched into the glass */
.panel .setpoint {
  font: 300 46px/1 "DIN Alternate", "Helvetica Neue", Arial, sans-serif;
  letter-spacing: -1.5px; transition: fill 1.2s ease;
  fill: color-mix(in srgb, var(--ae-frame, #9aa3a8) 70%, #6d767c);
}
.panel .setpoint .unit {
  font: 600 14px/1 Roboto, Arial, sans-serif; letter-spacing: 0;
}
.panel .surface {
  font: 600 17px/1 Roboto, Arial, sans-serif; transition: fill 1.2s ease;
  fill: var(--ae-frame, #9aa3a8);
}

/* the radiated heat: colour and strength both follow the surface temperature */
.panel .halo { fill: var(--ae-frame, #ff9336); opacity: 0; transition: opacity 1.2s ease, fill 1.2s ease; }
.panel.hot .halo {
  opacity: calc(.12 + var(--ae-glow) * .34);
  animation: ae-breathe 2.4s ease-in-out infinite;
}
.panel .wave {
  stroke: var(--ae-frame, #ff9336); stroke-width: 5; opacity: 0;
  transform-box: view-box; transform-origin: 50% 50%;
}
.panel.hot .wave { animation: ae-radiate 2.8s ease-out infinite; }
.panel.hot .wave.w1 { animation-delay: -.93s; }
.panel.hot .wave.w2 { animation-delay: -1.86s; }
@keyframes ae-radiate {
  0% { opacity: 0; transform: scale(1); }
  22% { opacity: calc(.3 + var(--ae-glow) * .4); }
  100% { opacity: 0; transform: scale(1.2); }
}
@keyframes ae-breathe {
  0%, 100% { opacity: calc(.12 + var(--ae-glow) * .34); }
  50% { opacity: calc(.06 + var(--ae-glow) * .18); }
}
.panel.dead { opacity: .45; filter: saturate(.25); }

.dark .panel .wall { opacity: .34; }
.dark .panel .box { fill: #d9dee1; }
.dark .panel .brand { fill: #868f96; }
`;
