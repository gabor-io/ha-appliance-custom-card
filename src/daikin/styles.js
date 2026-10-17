/**
 * Styles for the Daikin card.
 *
 * The card is deliberately dense: a header with the readings, one hero row,
 * the mode bar, and one row of controls. Everything takes its colour from
 * `--ap-accent`, which the card sets from the current mode, so heating and
 * cooling are told apart at a glance rather than by reading.
 */

import { BASE_STYLES } from '../shared/base-styles.js';

export const STYLES = `
${BASE_STYLES}

:host {
  --ap-heat: #f57c00;
  --ap-cool: #0288d1;
  --ap-dry: #00909e;
  --ap-fan: #6d7f8b;
  --ap-auto: #6c4ec4;
  --ap-off: var(--state-icon-color, #8a9199);
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
/* a wash of the mode colour, so the card reads as warm or cool at a glance */
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

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 112px minmax(0,1fr) auto; gap: 12px; align-items: center; }
.hero.no-art { grid-template-columns: minmax(0,1fr) auto; }
.compact .hero { grid-template-columns: 86px minmax(0,1fr) auto; gap: 10px; }
@container (max-width: 340px) {
  .hero { grid-template-columns: minmax(0,1fr) auto; }
  .hero .art { display: none; }
}

.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }

.dial { display: grid; grid-template-columns: auto auto; align-items: center; gap: 8px; }
.big { white-space: nowrap; font-size: 2.9rem; font-weight: 600; letter-spacing: -.04em; line-height: .9;
  font-variant-numeric: tabular-nums; color: var(--ap-text); }
.compact .big { font-size: 2.2rem; }
.big small { font-size: 1rem; font-weight: 600; color: var(--ap-muted); letter-spacing: 0; }
.updown { display: grid; gap: 4px; }
.updown button {
  width: 34px; height: 30px; border-radius: 9px; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  display: grid; place-items: center; transition: border-color .15s, color .15s, transform .08s;
}
.updown .icon { width: 16px; height: 16px; }
.updown button:hover:not([disabled]) { border-color: var(--ap-accent); color: var(--ap-accent); }
.updown button:active:not([disabled]) { transform: scale(.93); }
.updown button[disabled] { opacity: .3; cursor: not-allowed; }

/* ---------- segmented mode bar ---------- */
.seg {
  display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 2px;
  background: color-mix(in srgb, var(--ap-text) 6%, transparent);
  border-radius: 13px; padding: 3px;
}
.seg button {
  border: 0; background: transparent; cursor: pointer; color: var(--ap-muted);
  font: inherit; font-size: .67rem; font-weight: 600;
  display: grid; justify-items: center; gap: 2px; padding: 7px 2px 6px;
  border-radius: 10px; transition: background .18s, color .18s, box-shadow .18s;
}
.seg .icon { width: 19px; height: 19px; }
.seg button:hover:not([disabled]) { color: var(--ap-text); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 3px rgba(0,0,0,.14), 0 0 0 1px color-mix(in srgb, var(--ap-accent) 22%, transparent);
}
.seg button.power[aria-pressed="true"] { color: var(--ap-muted); }
.seg button[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- fan ---------- */
.fan {
  display: flex; align-items: center; gap: 9px; min-width: 0;
  padding: 7px 11px; border-radius: 12px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent);
}
.fan .cap { font-size: .68rem; text-transform: uppercase; letter-spacing: .06em; color: var(--ap-muted); }
.fan .val { margin-left: auto; font-size: .8rem; font-weight: 600; }
.ticks { display: flex; gap: 3px; align-items: flex-end; }
.ticks button {
  width: 13px; border: 0; padding: 0; cursor: pointer; border-radius: 3px;
  background: color-mix(in srgb, var(--ap-text) 14%, transparent);
  transition: background .18s, transform .1s;
}
.ticks button:hover:not([disabled]) { transform: scaleY(1.15); }
.ticks button.on { background: var(--ap-accent); }
.ticks button.auto {
  width: 20px; height: 17px; font: inherit; font-size: .6rem; font-weight: 700;
  color: var(--ap-muted); background: none;
}
.ticks button.auto.on { color: var(--ap-accent); }
.ticks button[disabled] { opacity: .45; cursor: not-allowed; }

/* ---------- ghost buttons ---------- */
.btnrow { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 7px; }
.ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  padding: 7px 10px; border-radius: 10px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .74rem; font-weight: 600;
  transition: border-color .15s, color .15s, background .15s;
}
.ghost .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.ghost:hover:not([disabled]) { border-color: var(--ap-accent); }
.ghost[aria-pressed="true"] {
  color: var(--ap-accent); border-color: color-mix(in srgb, var(--ap-accent) 40%, transparent);
  background: color-mix(in srgb, var(--ap-accent) 10%, transparent);
}
.ghost[aria-pressed="true"] .icon { color: var(--ap-accent); }
.ghost[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- group rows ---------- */
.rows { display: grid; gap: 6px; }
.sec-cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.divider { height: 1px; background: var(--ap-line); }

.row { border-radius: 13px; transition: background .18s; --ap-accent: var(--row-accent); }
.row.open { background: color-mix(in srgb, var(--row-accent) 7%, transparent); }
.row-head {
  display: grid; grid-template-columns: 46px minmax(0,1fr) auto 16px; gap: 10px;
  align-items: center; width: 100%; padding: 7px 10px 7px 6px;
  border: 0; background: transparent; cursor: pointer; border-radius: 13px;
  font: inherit; color: var(--ap-text); text-align: left;
}
.row-head:hover { background: color-mix(in srgb, var(--ap-text) 4%, transparent); }
.row.open .row-head:hover { background: transparent; }
.row .rname { display: block; font-size: .89rem; font-weight: 600; letter-spacing: -.01em; }
.row .rstate { display: block; font-size: .71rem; font-weight: 600; color: var(--row-accent); margin-top: 1px; }
.row .rstate em { font-style: normal; color: var(--ap-muted); font-weight: 500; }
.row .rtemp {
  text-align: right; font-size: .78rem; color: var(--ap-muted);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.row .rtemp b { font-size: 1.04rem; color: var(--ap-text); font-weight: 650; letter-spacing: -.02em; }
.row .caret { width: 16px; height: 16px; color: var(--ap-muted); transition: transform .25s; }
.row.open .caret { transform: rotate(180deg); }
.row-body { display: none; padding: 2px 10px 11px; gap: 9px; }
.row.open .row-body { display: grid; }
.rowbottom { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.rowbottom .big { font-size: 1.45rem; }
.rowbottom .big small { font-size: .72rem; }
.rowbottom .btnrow { grid-auto-columns: auto; }
.rowbottom .updown { grid-auto-flow: column; }
.rowbottom .updown button { width: 31px; height: 29px; }

/* ---------- the drawing ---------- */
.defs { position: absolute; width: 0; height: 0; }
.ac, .mini { width: 100%; height: auto; display: block; }
.art { cursor: pointer; }

.outline { fill: none; stroke: #000; stroke-opacity: .11; }
.grille { stroke: #9aa5ad; stroke-opacity: .45; stroke-width: 1.7; stroke-linecap: round; }
.mini .grille { stroke-width: 1.2; }
.sheen { stroke: #fff; stroke-opacity: .8; stroke-width: 2; }
.flap-sheen { stroke: #fff; stroke-opacity: .75; stroke-width: 1.6; }
.shadow { fill: #000; opacity: .2; }
.mbody { fill: #f2f5f7; stroke: #000; stroke-opacity: .11; }
.mcavity { fill: #2b3740; }

/* seen from the front the flap slides down and foreshortens as it opens */
.louver, .mflap { transform-box: view-box; transition: transform .6s ease; }
.louver { transform-origin: 100px 70px; }
.mflap { transform-origin: 30px 30px; }
.ac.off .louver, .mini.off .mflap { transform: none; }
.ac.fixed .louver { transform: translateY(7px) scaleY(.46); }
.mini.fixed .mflap { transform: translateY(2.5px) scaleY(.45); }
.ac.swing .louver { animation: daikin-louver 5.5s ease-in-out infinite; }
.mini.swing .mflap { animation: daikin-mini-louver 4s ease-in-out infinite; }
@keyframes daikin-louver {
  0%, 100% { transform: translateY(5px) scaleY(.56); }
  50%      { transform: translateY(12px) scaleY(.24); }
}
@keyframes daikin-mini-louver {
  0%, 100% { transform: translateY(2px) scaleY(.55); }
  50%      { transform: translateY(5px) scaleY(.22); }
}

.stream path {
  fill: none; stroke: var(--ap-accent); stroke-linecap: round;
  stroke-width: 3.6; stroke-dasharray: 11 16; opacity: 0; transition: opacity .4s;
}
.mini .stream path { stroke-width: 3; stroke-dasharray: 6 9; }
.ac.on .stream path, .mini.on .stream path { opacity: .78; animation: daikin-flow var(--flow-duration, 2.6s) linear infinite; }
.ac.on .stream path:nth-child(2) { animation-delay: -.4s; }
.ac.on .stream path:nth-child(3) { animation-delay: -.8s; }
.ac.on .stream path:nth-child(4) { animation-delay: -1.2s; }
.mini.on .stream path:nth-child(2) { animation-delay: -.6s; }
@keyframes daikin-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -54; } }
.mini .stream path { animation-name: daikin-mini-flow; }
@keyframes daikin-mini-flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -30; } }

/* ---------- the open-window badge on a group row ---------- */
.open-badge {
  display: inline-flex; align-items: center; gap: 4px; margin-left: 7px; padding: 1px 7px;
  border-radius: 999px; font-size: .64rem; font-weight: 700; vertical-align: 1px;
  background: color-mix(in srgb, var(--warning-color, #ffa726) 20%, transparent);
  color: var(--warning-color, #ffa726);
}
.open-badge .icon { width: 11px; height: 11px; }
/* open, but the unit is not conditioning the room - worth noting, not warning */
.open-badge.calm {
  background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-muted); font-weight: 600;
}

.wash { opacity: 0; transition: opacity .6s; color: var(--ap-accent); }
.ac.on .wash { opacity: .15; }
.led { fill: #c9d2d8; }
.ac.on .led { fill: var(--ap-accent); }
.ac.off .body { opacity: .72; }
.mini.off { opacity: .45; }
`;
