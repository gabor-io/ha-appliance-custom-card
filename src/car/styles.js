import { BASE_STYLES } from '../shared/base-styles.js';

/** Car-specific styles: the split hero, the data rows and the vehicle SVG. */
const CARD_STYLES = `
:host {
  --car-paint: #c6ccd4;
  --car-paint-light: #e6eaef;
  --car-paint-dark: #97a0ab;
  --car-cabin: #2b3138;
  --car-glass: #8ea3b5;
  --car-glass-light: #c2d1dd;
  --car-roof: #b6bec8;
  --car-line: rgba(30,35,42,.42);
  --car-tyre: #4a5058;
  --car-light-off: #dfe4ea;
  --car-open: #f2a63c;
  --car-open-line: #b9711a;
  --car-alarm: var(--error-color, #e03b2c);
  --car-stage: 152px;
}

/* the drawn car keeps its own palette on a dark theme so it stays a silver car */
.wrap.dark {
  --car-paint: #9aa2ac;
  --car-paint-light: #c3cad2;
  --car-paint-dark: #6e767f;
  --car-cabin: #14181c;
  --car-glass: #5d7183;
  --car-glass-light: #8ea3b5;
  --car-roof: #858e98;
  --car-line: rgba(0,0,0,.5);
  --car-tyre: #23282e;
  --car-light-off: #aeb5bd;
}

/* ---------- hero ---------- */
.split { display: grid; grid-template-columns: var(--car-stage) minmax(0, 1fr); gap: 16px; align-items: start; }
.compact .split { --car-stage: 112px; gap: 12px; }
@container (max-width: 340px) { .split { grid-template-columns: 1fr; justify-items: center; } .split .primary { width: 100%; } }

.stage { width: 100%; max-width: var(--car-stage); margin: 0 auto; }
.primary { display: grid; gap: 10px; min-width: 0; }
.state-line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.state-text { font-size: 1.35rem; font-weight: 700; color: var(--ap-accent); line-height: 1.1; }
.compact .state-text { font-size: 1.15rem; }
.state-sub { font-size: .78rem; color: var(--ap-muted); }

.metric { display: grid; gap: 5px; }
.metric .top { display: flex; align-items: center; gap: 6px; font-size: .8rem; color: var(--ap-muted); }
.metric .top .icon { width: 16px; height: 16px; }
.metric .top .val { margin-left: auto; color: var(--ap-text); font-weight: 600; font-variant-numeric: tabular-nums; }
.metric .top .val b { font-size: .95rem; }
.metric .bar > i { background: linear-gradient(90deg, #7ac47f, var(--success-color, #43a047)); }
.metric.low .bar > i { background: linear-gradient(90deg, #ffb74d, var(--warning-color, #fb8c00)); }
.metric.empty-tank .bar > i { background: linear-gradient(90deg, #ef9a9a, var(--error-color, #db4437)); }

.line { display: flex; align-items: center; gap: 8px; font-size: .84rem; cursor: pointer; }
.line .k { color: var(--ap-muted); display: flex; align-items: center; gap: 6px; min-width: 0; }
.line .k .icon { width: 16px; height: 16px; }
.line .k span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line .v { margin-left: auto; font-weight: 600; font-variant-numeric: tabular-nums; text-align: right; }

/* ---------- collapsible sections ---------- */
.fold { border-top: 1px solid var(--ap-line); padding-top: 10px; }
.fold > summary {
  cursor: pointer; list-style: none; display: flex; align-items: center; gap: 8px;
  font-size: .78rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
  color: var(--ap-muted);
}
.fold > summary::-webkit-details-marker { display: none; }
.fold > summary .icon { width: 16px; height: 16px; }
.fold > summary .chev { margin-left: auto; transition: transform .2s ease; }
.fold[open] > summary .chev { transform: rotate(180deg); }
.fold .body { display: grid; gap: 8px; padding: 10px 0 4px; }
.fold .body .line { cursor: pointer; }

.readonly { font-size: .72rem; color: var(--ap-muted); display: flex; align-items: center; gap: 6px; }
.readonly .icon { width: 14px; height: 14px; }

/* ---------- vehicle illustration ---------- */
.car { display: block; width: 100%; height: auto; overflow: visible; }
.car .shadow { fill: rgba(0,0,0,.2); filter: blur(11px); }
.car .tyres rect { fill: var(--car-tyre); opacity: .85; }
.car .paint { fill: url(#car-paint); }
.car .aperture { fill: var(--car-cabin); }
.car .bay { fill: color-mix(in srgb, var(--car-cabin) 62%, var(--car-paint-dark)); }
.car .glass { fill: url(#car-glass); stroke: var(--car-line); stroke-width: 1.2; }
.car .roof { fill: var(--car-roof); stroke: var(--car-line); stroke-width: 1.2; }
.car .sunroof-glass { stroke: none; fill: color-mix(in srgb, var(--car-glass) 62%, transparent); }
.car .rail { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: .8; }
.car .antenna { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: .8; }
.car .outline { fill: none; stroke: var(--car-line); stroke-width: 2.6; }
.car .seam { stroke: var(--car-line); stroke-width: 1.1; fill: none; opacity: .42; }
.car .seam.bumper { stroke-width: 1.8; opacity: .28; }
.car .seam.spoiler { stroke-width: 2; opacity: .35; }
.car .wiper { stroke: var(--car-cabin); stroke-width: 1.6; stroke-linecap: round; opacity: .45; fill: none; }
.car .grille { fill: var(--car-cabin); opacity: .75; }
.car .plate { fill: #f2f4f6; stroke: var(--car-line); stroke-width: .8; }
.car .filler { fill: none; stroke: var(--car-line); stroke-width: 1; opacity: .5; }
.car .sheen { fill: url(#car-sheen); pointer-events: none; }

.car .lamp .lens { fill: var(--car-light-off); stroke: var(--car-line); stroke-width: .8; }
.car .lamp .led { fill: color-mix(in srgb, #ffe082 60%, var(--car-light-off)); }
.car .lamp.tail .lens { fill: color-mix(in srgb, #c62828 55%, var(--car-light-off)); }
.car.lights-on .lamp.head .lens { fill: #fff3c4; filter: drop-shadow(0 0 7px rgba(255,214,86,.95)); }
.car.lights-on .lamp.tail .lens { fill: #ff5f52; filter: drop-shadow(0 0 7px rgba(255,80,70,.9)); }
.car.offline { opacity: .55; filter: grayscale(.45); }

.car .door { transform-box: view-box; transform-origin: var(--hinge-x) var(--hinge-y); }
.car .door .panel { fill: url(#car-paint); stroke: var(--car-line); stroke-width: 1.4; }
.car .door .window { fill: var(--car-glass); stroke: var(--car-line); stroke-width: 1; }
.car .door .handle { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: .6; }
.car .mirror { fill: var(--car-paint-dark); stroke: var(--car-line); stroke-width: 1.1; }
.car .mirror-glass { fill: var(--car-glass); }

.car .door.open .panel { fill: var(--car-open); stroke: var(--car-open-line); }
.car .door[data-door="fl"].open, .car .door[data-door="rl"].open {
  animation: car-door-left 900ms cubic-bezier(.22,.9,.28,1) forwards;
}
.car .door[data-door="fr"].open, .car .door[data-door="rr"].open {
  animation: car-door-right 900ms cubic-bezier(.22,.9,.28,1) forwards;
}
@keyframes car-door-left {
  0% { transform: rotate(0deg); } 72% { transform: rotate(42deg); } 100% { transform: rotate(38deg); }
}
@keyframes car-door-right {
  0% { transform: rotate(0deg); } 72% { transform: rotate(-42deg); } 100% { transform: rotate(-38deg); }
}

.car .window.open { fill: var(--car-alarm); stroke: var(--car-alarm); animation: car-window 1.7s ease-in-out infinite; }
@keyframes car-window { 0%, 100% { opacity: 1; } 50% { opacity: .42; } }

.car .lid { transform-box: view-box; }
.car .bonnet { transform-origin: 120px 152px; }
.car .trunk { transform-origin: 120px 356px; }
.car .lid.open { animation: car-lid 820ms cubic-bezier(.22,.9,.28,1) forwards; }
.car .lid.open .paint { fill: var(--car-open); }
.car .lid.open .lamp, .car .lid.open .plate, .car .lid.open .grille { opacity: 0; }
@keyframes car-lid { 0% { transform: scaleY(1); } 100% { transform: scaleY(.4); } }

.car .sunroof { fill: none; stroke: none; }
.car .sunroof.visible { stroke: var(--car-line); stroke-width: 1; stroke-dasharray: 4 3; }
.car .sunroof.visible.open {
  fill: color-mix(in srgb, var(--car-alarm) 55%, transparent);
  stroke: var(--car-alarm); stroke-dasharray: none;
  animation: car-window 1.7s ease-in-out infinite;
}
`;

export const STYLES = `${BASE_STYLES}\n${CARD_STYLES}`;
