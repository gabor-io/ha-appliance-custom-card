/**
 * Styles for the Nanoleaf Shapes card.
 *
 * The card takes its accent from whatever the panels are showing, so a scene
 * running on the wall tints the card it is controlled from. The panels
 * themselves are the Black edition: the frame between them stays dark on both
 * themes, because that seam is what the product looks like.
 */

import { BASE_STYLES } from '../shared/base-styles.js';

export const STYLES = `
${BASE_STYLES}

:host {
  --nl-frame: #15181b;
  --nl-dark: #23272b;
  /* the five palette slots the cluster cycles through */
  --nl-c0: #2b2f33; --nl-c1: #2b2f33; --nl-c2: #2b2f33; --nl-c3: #2b2f33; --nl-c4: #2b2f33;
  --nl-level: 0;
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 13%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header ---------- */
.top { display: flex; align-items: flex-start; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; line-height: 1.15; cursor: pointer; }
.top .sub { font-size: .72rem; color: var(--ap-muted); margin-top: 1px; }
.top .spacer { flex: 1; }
.ind { display: flex; gap: 6px 10px; flex-wrap: wrap; justify-content: flex-end; }
.ind > span { display: inline-flex; align-items: center; gap: 4px; font-size: .74rem; color: var(--ap-muted); white-space: nowrap; }
.ind .icon { width: 13px; height: 13px; opacity: .75; }
.ind b { color: var(--ap-text); font-weight: 600; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 150px minmax(0,1fr); gap: 14px; align-items: center; }
.hero.no-art { grid-template-columns: minmax(0,1fr); }
/* a long run of panels takes the full width and the text goes underneath:
   squeezed into the side column it would be a stripe */
.hero.wide { grid-template-columns: minmax(0,1fr); gap: 10px; }
.compact .hero { grid-template-columns: 112px minmax(0,1fr); gap: 10px; }
@container (max-width: 420px) {
  .hero { grid-template-columns: minmax(0,1fr); }
  .hero .art { max-width: 230px; justify-self: center; }
}

.mode-name { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ap-accent); }
.state { font-size: 1.02rem; font-weight: 600; line-height: 1.25; margin-top: 2px; }
.state-sub { font-size: .76rem; color: var(--ap-muted); margin-top: 2px; }

/* ---------- the panels ---------- */
.art { display: block; cursor: pointer; }
.art[hidden] { display: none; }
.panels { width: 100%; height: auto; display: block; overflow: visible; }

.panels .frame { fill: none; stroke: var(--nl-frame); stroke-width: 2.2; }
.panels .lit { fill: var(--nl-dark); transition: fill 1s ease, opacity .6s ease; }
.panels .sheen { opacity: .9; pointer-events: none; }
.panels .glow { fill: var(--nl-c0); opacity: 0; transition: opacity 1s ease, fill 1s ease; }

.panels.on .lit { fill: var(--nl-c0); opacity: var(--nl-level); }
.panels.on .glow { opacity: calc(var(--nl-level) * .42); }

/* a running scene travels across the wall rather than changing it at once:
   each panel starts the same cycle a little later, by its position */
.panels.scene .lit,
.panels.scene .glow {
  animation: nl-wash 7s linear infinite;
  animation-delay: calc(var(--phase) * -7s);
}
@keyframes nl-wash {
  0%, 100% { fill: var(--nl-c0); }
  20% { fill: var(--nl-c1); }
  40% { fill: var(--nl-c2); }
  60% { fill: var(--nl-c3); }
  80% { fill: var(--nl-c4); }
}
.panels .lead path { stroke: var(--nl-frame); stroke-width: 1.3; fill: none; stroke-linecap: round; }
.panels.dead { opacity: .4; filter: saturate(.2); }

/* ---------- brightness ---------- */
.bright { display: flex; align-items: center; gap: 10px; }
.bright .icon { width: 17px; height: 17px; color: var(--ap-muted); flex: 0 0 auto; }
.bright input {
  flex: 1; min-width: 0; height: 22px; margin: 0; cursor: pointer;
  accent-color: var(--ap-accent); background: transparent;
}
.bright .val { font-size: .8rem; font-weight: 600; font-variant-numeric: tabular-nums; min-width: 42px; text-align: right; }
.bright input[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- scenes ---------- */
.scenes { display: flex; flex-wrap: wrap; gap: 7px; }
.scene-chip {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 11px 5px 5px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .76rem; font-weight: 500;
  transition: border-color .2s ease, background .2s ease, transform .1s ease;
}
.scene-chip .swatch {
  width: 18px; height: 18px; border-radius: 50%; flex: 0 0 auto;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.18);
}
.scene-chip:hover:not([disabled]) { border-color: var(--ap-accent); }
.scene-chip:active:not([disabled]) { transform: scale(.97); }
.scene-chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 48%, transparent);
  font-weight: 650;
}
.scene-chip[disabled] { opacity: .45; cursor: not-allowed; }
/* a scene the card has no palette for says so instead of inventing colours */
.scene-chip.unknown .swatch { box-shadow: inset 0 0 0 1px rgba(127,127,127,.5); }

/* ---------- whites and the rest ---------- */
.whites { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
.white-chip {
  width: 30px; height: 30px; border-radius: 50%; cursor: pointer; padding: 0;
  border: 1px solid var(--ap-line); font: inherit;
  transition: transform .1s ease, box-shadow .2s ease, border-color .2s ease;
}
.white-chip:hover:not([disabled]) { border-color: var(--ap-accent); }
.white-chip:active:not([disabled]) { transform: scale(.94); }
.white-chip[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--ap-accent); }
.white-chip[disabled] { opacity: .4; cursor: not-allowed; }
.whites .cap { font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--ap-muted); margin-right: 2px; }

.btnrow { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .78rem; font-weight: 500;
  transition: border-color .2s ease, transform .1s ease;
}
.ghost .icon { width: 15px; height: 15px; color: var(--ap-muted); }
.ghost:hover:not([disabled]) { border-color: var(--ap-accent); }
.ghost:active:not([disabled]) { transform: scale(.97); }
.ghost[disabled] { opacity: .4; cursor: not-allowed; }

.touch { display: inline-flex; align-items: center; gap: 6px; font-size: .76rem; color: var(--ap-muted); }
.touch .icon { width: 15px; height: 15px; }
.touch b { color: var(--ap-text); font-weight: 600; }

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
.seg button:active { transform: scale(.98); }
.seg button[aria-pressed="true"] {
  background: var(--card-background-color, #fff); color: var(--ap-accent);
  box-shadow: 0 1px 4px rgba(0,0,0,.14);
}
.dark .seg button[aria-pressed="true"] { background: color-mix(in srgb, var(--ap-text) 14%, transparent); }
`;
