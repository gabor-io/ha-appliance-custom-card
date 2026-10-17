/**
 * Styles for the Netatmo weather station card.
 *
 * The accent is the air quality of the worst room that is still reporting, so
 * the whole card warms up when it is time to open a window. A module whose
 * link is down is drained of colour rather than hidden: the numbers are still
 * there, they are just not news any more.
 */

import { BASE_STYLES } from '../shared/base-styles.js';

export const STYLES = `
${BASE_STYLES}

:host {
  /* the same five bands the ventilation card uses */
  --air-excellent: #2e9e5b;
  --air-good: #7cb342;
  --air-fair: #e8b02a;
  --air-poor: #ef7b23;
  --air-bad: #d93a2b;
  --nw-cool: #0288d1;
}

.wrap { padding: 14px 16px 16px; gap: 12px; position: relative; }
.wrap::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 0% 0%,
    color-mix(in srgb, var(--ap-accent) 11%, transparent), transparent 62%);
}
.wrap > * { position: relative; }

/* ---------- header ---------- */
.top { display: flex; align-items: baseline; gap: 10px; }
.top .name { font-size: 1rem; font-weight: 650; letter-spacing: -.01em; cursor: pointer; }
.top .spacer { flex: 1; }
.top .age { font-size: .72rem; color: var(--ap-muted); }
.top .age.late { color: var(--air-poor); font-weight: 600; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 92px minmax(0,1fr) auto; gap: 14px; align-items: center; }
.compact .hero { grid-template-columns: 68px minmax(0,1fr) auto; }
@container (max-width: 340px) { .hero { grid-template-columns: minmax(0,1fr) auto; } .hero .art { display: none; } }
.hero .art { cursor: pointer; }
.cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.state { font-size: .96rem; font-weight: 600; line-height: 1.25; margin-top: 2px; letter-spacing: -.01em; }
.big {
  white-space: nowrap; font-size: 2.5rem; font-weight: 600; letter-spacing: -.04em;
  line-height: .9; font-variant-numeric: tabular-nums; color: var(--ap-text);
}
.big small { font-size: .95rem; font-weight: 600; color: var(--ap-muted); letter-spacing: 0; }
.big.muted { color: var(--ap-muted); }

/* ---------- facts: humidity, pressure, noise ---------- */
.facts { display: flex; flex-wrap: wrap; gap: 4px 13px; margin-top: 6px; }
/* the shared .fact is a tile; here they sit inline on one line, so the
   padding and the pill background are taken back off */
.fact {
  display: inline-flex; align-items: center; gap: 5px; padding: 0; border-radius: 0;
  background: none; font-size: .78rem; color: var(--ap-muted); font-variant-numeric: tabular-nums;
}
.fact .icon { width: 14px; height: 14px; color: var(--ap-muted); }
.fact b { color: var(--ap-text); font-weight: 600; }

/* ---------- the trend arrow ---------- */
.trend {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: .74rem; color: var(--ap-muted); white-space: nowrap;
}
.trend .icon { width: 14px; height: 14px; }
.trend.up { color: var(--air-poor); }
.trend.down { color: var(--nw-cool); }

/* ---------- badges ---------- */
.tag {
  display: inline-flex; align-items: center; gap: 4px; margin-left: 7px; padding: 1px 7px;
  border-radius: 999px; font-size: .62rem; font-weight: 700; vertical-align: 1px;
  text-transform: uppercase; letter-spacing: .04em;
  background: color-mix(in srgb, var(--air-poor) 18%, transparent); color: var(--air-poor);
}
.tag.quiet {
  background: color-mix(in srgb, var(--ap-text) 8%, transparent);
  color: var(--ap-muted); text-transform: none; letter-spacing: 0; font-weight: 600;
}

/* a module that has gone quiet is a note, not a warning: it needs a new
   battery some time this week, not a window opened now */
.alert.quiet { background: color-mix(in srgb, var(--ap-text) 7%, transparent); }
.alert.quiet .icon { color: var(--ap-muted); }

/* ---------- rooms ---------- */
.divider { height: 1px; background: var(--ap-line); }
.sec-cap { font-size: .66rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: var(--ap-muted); }
.rooms { display: grid; gap: 4px; }
.room {
  display: grid; grid-template-columns: 38px minmax(0,1fr); gap: 10px; align-items: center;
  width: 100%; padding: 6px 8px; border: 0; background: transparent; border-radius: 12px;
  font: inherit; color: var(--ap-text); text-align: left; cursor: pointer;
}
.room:hover { background: color-mix(in srgb, var(--ap-text) 4%, transparent); }
.rname { display: block; font-size: .88rem; font-weight: 600; letter-spacing: -.01em; }
.rline { display: flex; align-items: baseline; flex-wrap: wrap; gap: 4px 12px; margin-top: 1px; }
.rtemp { font-size: 1.02rem; font-weight: 650; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.room.dead .rname, .room.dead .rtemp { color: var(--ap-muted); }
.room.dead, .room.stale { opacity: .78; }
.quiet { font-size: .73rem; color: var(--ap-muted); margin-top: 2px; }

/* ---------- the CO2 meter ---------- */
.co2 { margin-top: 5px; }
.co2 .track {
  height: 5px; border-radius: 999px; overflow: hidden;
  background: color-mix(in srgb, var(--ap-text) 10%, transparent);
}
.co2 .track i { display: block; height: 100%; border-radius: 999px; transition: width .6s ease, background-color .6s ease; }
.co2 .read { display: flex; align-items: baseline; gap: 7px; margin-top: 3px; font-size: .74rem; color: var(--ap-muted); }
.co2 .read b { color: var(--ap-text); font-weight: 650; font-variant-numeric: tabular-nums; }
.co2 .read .band { font-weight: 700; }

.fill-excellent { background: var(--air-excellent); }
.fill-good { background: var(--air-good); }
.fill-fair { background: var(--air-fair); }
.fill-poor { background: var(--air-poor); }
.fill-bad { background: var(--air-bad); }
.level-excellent { color: var(--air-excellent); }
.level-good { color: var(--air-good); }
.level-fair { color: var(--air-fair); }
.level-poor { color: var(--air-poor); }
.level-bad { color: var(--air-bad); }

/* ---------- the drawing ---------- */
.defs { position: absolute; width: 0; height: 0; }
.dev { display: block; width: 100%; height: auto; }
.shell { stroke: rgba(0,0,0,.08); stroke-width: .8; }
.base, .cap { fill: #fcfdfd; stroke: rgba(0,0,0,.07); stroke-width: .7; }
.cap-inner { fill: #eef1f2; }
.groove { fill: #aeb4b8; opacity: .55; }
.shadow { fill: #000; opacity: .16; }

.halo, .lamp { fill: var(--glow, transparent); opacity: 0; transition: opacity .5s ease; }
.dev.lit .lamp { opacity: .95; animation: nw-breathe 5.5s ease-in-out infinite; }
.dev.lit .halo { opacity: .3; filter: blur(2.6px); animation: nw-breathe 5.5s ease-in-out infinite; }
@keyframes nw-breathe {
  0%, 100% { opacity: .95; }
  50% { opacity: .62; }
}
.dev.lit .halo { animation-name: nw-breathe-halo; }
@keyframes nw-breathe-halo {
  0%, 100% { opacity: .3; }
  50% { opacity: .16; }
}
.no-animation .dev.lit .lamp, .no-animation .dev.lit .halo { animation: none; }
.dev.dead { opacity: .4; }
.dev.stale { opacity: .62; filter: saturate(.25); }
`;
