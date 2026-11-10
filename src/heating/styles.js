import { BASE_STYLES } from '../shared/base-styles.js';

/** Styles shared by the three heating cards. */
const FAMILY_STYLES = `
:host {
  --ht-gas: #e8710a;
  --ht-ac: #1a73e8;
  --ht-cool: #00acc1;
  --ht-hybrid: #8e44ad;
  --ht-frost: #7fc6e8;
  --ht-idle: var(--ap-muted);
  --ht-ok: var(--success-color, #43a047);
  --ht-warn: var(--warning-color, #fb8c00);
  --ht-bad: var(--error-color, #db4437);
}
.wrap.accent-gas { --ap-accent: var(--ht-gas); }
.wrap.accent-ac { --ap-accent: var(--ht-ac); }
.wrap.accent-cool { --ap-accent: var(--ht-cool); }
.wrap.accent-hybrid { --ap-accent: var(--ht-hybrid); }
.wrap.accent-frost { --ap-accent: var(--ht-frost); }
.wrap.accent-idle { --ap-accent: var(--ht-idle); }

/* the header's status group travels together and drops to its own line on a
   narrow card rather than forcing the card wider than its column */
.header { flex-wrap: wrap; }
.header .meta { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.header > div:first-child { min-width: 0; }

/* ---------- tags ---------- */
.tag {
  display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 999px;
  font-size: .72rem; font-weight: 600; white-space: nowrap;
  background: color-mix(in srgb, var(--ap-accent) 14%, transparent); color: var(--ap-accent);
}
.tag .icon { width: 13px; height: 13px; }
.tag.warn { background: color-mix(in srgb, var(--ht-warn) 18%, transparent); color: var(--ht-warn); }
.tag.bad { background: color-mix(in srgb, var(--ht-bad) 18%, transparent); color: var(--ht-bad); }
.tag.idle { background: color-mix(in srgb, var(--ap-text) 8%, transparent); color: var(--ap-muted); }

/* ---------- gas budget bar ---------- */
.gasbar { position: relative; height: 22px; border-radius: 999px; background: var(--ap-line); overflow: hidden; }
.gasbar .fill { position: absolute; inset: 0 auto 0 0; border-radius: 999px; transition: width .6s ease; }
.gasbar.level-ok .fill { background: linear-gradient(90deg, color-mix(in srgb, var(--ht-ok) 55%, transparent), var(--ht-ok)); }
.gasbar.level-warn .fill { background: linear-gradient(90deg, color-mix(in srgb, var(--ht-warn) 55%, transparent), var(--ht-warn)); }
.gasbar.level-bad .fill { background: linear-gradient(90deg, color-mix(in srgb, var(--ht-bad) 55%, transparent), var(--ht-bad)); }
/* the reserve is not spendable, so it is drawn as a wall at the far end */
.gasbar .reserve {
  position: absolute; top: 0; bottom: 0; right: 0;
  background: repeating-linear-gradient(135deg,
    color-mix(in srgb, var(--ap-text) 22%, transparent) 0 6px, transparent 6px 12px);
}
/* where the house is allowed to be today - the pace marker */
.gasbar .pace { position: absolute; top: -3px; bottom: -3px; width: 3px; border-radius: 2px; background: var(--ap-text); }
.gasbar .pace::after {
  content: ''; position: absolute; left: 50%; top: -3px; width: 7px; height: 7px;
  transform: translateX(-50%) rotate(45deg); background: var(--ap-text);
}
.barline { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.barline .big { font-size: 1.25rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.barline .mj { font-size: .76rem; color: var(--ap-muted); }
.legend { display: flex; flex-wrap: wrap; gap: 10px 16px; font-size: .74rem; color: var(--ap-muted); }
.legend .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; margin-right: 5px; vertical-align: baseline; }
.legend .dot.pace { border-radius: 2px; background: var(--ap-text); }
.legend .dot.reserve { background: color-mix(in srgb, var(--ap-text) 30%, transparent); }

.wrap.cooling [data-section="gas"],
.wrap.cooling [data-section="pace"] { opacity: .55; }

/* ---------- pace ---------- */
.pacegrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(132px, 1fr)); gap: 10px; }
.pacebox { padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--ap-text) 5%, transparent); display: grid; gap: 2px; }
.pacebox .k { font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--ap-muted); }
.pacebox .v { font-size: 1.05rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.pacebox .u { font-size: .72rem; color: var(--ap-muted); }
.pacebox.over .v { color: var(--ht-bad); }

/* ---------- source hero ---------- */
.sourcebox { display: flex; align-items: center; gap: 14px; }
.sourcebox .ring {
  width: 56px; height: 56px; border-radius: 50%; flex: 0 0 auto;
  display: grid; place-items: center;
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  color: var(--ap-accent);
}
.sourcebox .ring .icon { width: 30px; height: 30px; }
.sourcebox .label { font-size: 1.3rem; font-weight: 700; color: var(--ap-accent); line-height: 1.15; }
.sourcebox .why { font-size: .84rem; color: var(--ap-muted); line-height: 1.35; }

/* ---------- segmented controls ---------- */
.seg { display: flex; flex-wrap: wrap; gap: 6px; }
.seg button {
  flex: 1 1 auto; min-width: 84px;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 8px 10px; border-radius: 12px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .8rem; font-weight: 600;
}
.seg button .icon { width: 16px; height: 16px; color: var(--ap-muted); }
.seg button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent);
  color: var(--ap-accent);
}
.seg button[aria-pressed="true"] .icon { color: var(--ap-accent); }
.seg button:active:not([disabled]) { transform: scale(.98); }
.seg button[disabled] { opacity: .4; cursor: not-allowed; }

/* ---------- meter ---------- */
.meter { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 10px; }
.meter .field { display: grid; gap: 4px; flex: 1 1 150px; }
.meter .field span { font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--ap-muted); }
.meter input {
  font: inherit; font-size: 1rem; font-weight: 600; padding: 9px 10px; border-radius: 10px;
  border: 1px solid var(--ap-line); background: var(--card-background-color, #fff);
  color: var(--ap-text); width: 100%; box-sizing: border-box;
}

/* ---------- confirm ---------- */
.confirm {
  display: grid; gap: 10px; padding: 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ht-warn) 16%, transparent);
}
.confirm .q { font-size: .9rem; font-weight: 600; color: var(--ap-text); }
.confirm .hint { font-size: .78rem; color: var(--ap-muted); }
.confirm .row { display: flex; gap: 8px; flex-wrap: wrap; }

/* ---------- room rows ---------- */
.rooms { display: grid; gap: 8px; }
.room {
  display: grid; gap: 8px; padding: 10px 12px; border-radius: 14px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent);
}
.room.readonly { background: transparent; border: 1px dashed var(--ap-line); }
/* a room row has to be able to give way: the name wraps and the tags drop to
   their own line rather than making the whole card too wide for a phone */
.room .line { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.room .line .name { min-width: 0; }
.room .line > div:last-child { margin-left: auto; text-align: right; }
.room .name { font-size: .92rem; font-weight: 600; color: var(--ap-text); }
.room .spacer { flex: 1; }
.room .temp { font-size: 1.25rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.room .goal { font-size: .82rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; }
.room .parts { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: .74rem; color: var(--ap-muted); }
.room .parts b { font-weight: 700; color: var(--ap-text); }
.room .parts .lead { color: var(--ap-accent); }
.room .parts .out { text-decoration: line-through; opacity: .7; }
.room .note { font-size: .74rem; color: var(--ap-muted); }
.room .controls { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.step-btn {
  width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: 1.1rem; font-weight: 700; cursor: pointer; padding: 0;
}
.step-btn:active:not([disabled]) { transform: scale(.95); }
.controls select {
  font: inherit; font-size: .82rem; padding: 7px 9px; border-radius: 10px;
  border: 1px solid var(--ap-line); background: var(--card-background-color, #fff); color: var(--ap-text);
}
.step-btn[disabled] { opacity: .35; cursor: not-allowed; }

/* ---------- compact room row (house card list) ---------- */
.room.compact { padding: 8px 10px; gap: 6px; }
/* the whole line opens the room; the setpoint buttons inside it still act as
   buttons, because the nearest [data-action] wins */
.room.compact .line { cursor: pointer; gap: 8px; }
.room.compact .line > .icon { width: 18px; height: 18px; color: var(--ap-muted); flex: 0 0 auto; }
.room.compact .nums { display: flex; align-items: baseline; gap: 6px; white-space: nowrap; }
.room.compact .nums .temp { font-size: 1.05rem; }
.room.compact .nums .goal { font-size: .78rem; }
.room.compact .marks { display: flex; gap: 4px; flex: 0 0 auto; }
.room.compact .quick { display: inline-flex; gap: 6px; flex: 0 0 auto; }
.room.compact .step-btn { width: 30px; height: 30px; font-size: 1rem; }
.mark { display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 8px;
  background: color-mix(in srgb, var(--ap-accent) 14%, transparent); color: var(--ap-accent); }
.mark .icon { width: 15px; height: 15px; }
.mark.warn { background: color-mix(in srgb, var(--ht-warn) 18%, transparent); color: var(--ht-warn); }
/* a room can be heated differently from the house, so its own row carries
   its own accent rather than borrowing the card's */
.accent-gas { --ap-accent: var(--ht-gas); }
.accent-ac { --ap-accent: var(--ht-ac); }
.accent-cool { --ap-accent: var(--ht-cool); }
.accent-hybrid { --ap-accent: var(--ht-hybrid); }
.accent-frost { --ap-accent: var(--ht-frost); }
.accent-idle { --ap-accent: var(--ht-idle); }
.suggest { display: flex; align-items: center; gap: 8px; }

/* ---------- schedule ---------- */
.days { display: flex; gap: 6px; flex-wrap: wrap; }
.days button {
  flex: 1 1 auto; min-width: 38px; padding: 7px 0; border-radius: 10px;
  border: 1px solid var(--ap-line); background: transparent; color: var(--ap-text);
  font: inherit; font-size: .8rem; font-weight: 600; cursor: pointer;
}
.days button[aria-pressed="true"] { background: var(--ap-accent); border-color: transparent; color: var(--text-primary-color, #fff); }
.days button.today { box-shadow: inset 0 -3px 0 color-mix(in srgb, var(--ap-accent) 60%, transparent); }

.timeline { display: flex; height: 30px; border-radius: 10px; overflow: hidden; background: var(--ap-line); }
.timeline .seg-block { position: relative; min-width: 2px; }
.timeline .seg-block[data-selected="true"] { outline: 2px solid var(--ap-text); outline-offset: -2px; }
.hours { display: flex; justify-content: space-between; font-size: .66rem; color: var(--ap-muted); }

.slots { display: grid; gap: 6px; }
.slot { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 12px;
  background: color-mix(in srgb, var(--ap-text) 5%, transparent); flex-wrap: wrap; }
/* the setpoint summary is the first thing to move to a line of its own */
.slot .temps { flex: 1 1 100%; order: 10; }
.slot .swatch { width: 12px; height: 12px; border-radius: 4px; flex: 0 0 auto; }
.slot .time { font-size: .86rem; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.slot .zone { font-size: .82rem; color: var(--ap-text); }
.slot .temps { font-size: .72rem; color: var(--ap-muted); }
.slot .spacer { flex: 1; }
.slot select, .slot input[type="time"] {
  font: inherit; font-size: .82rem; padding: 5px 7px; border-radius: 9px; min-width: 0;
  border: 1px solid var(--ap-line); background: var(--card-background-color, #fff); color: var(--ap-text);
}

.ztable { width: 100%; border-collapse: collapse; font-size: .8rem; }
.ztable th, .ztable td { padding: 5px 4px; text-align: center; }
.ztable th { font-size: .68rem; text-transform: uppercase; letter-spacing: .04em; color: var(--ap-muted); font-weight: 600; }
.ztable th.rowhead, .ztable td.rowhead { text-align: left; white-space: nowrap; }
.ztable td .cell { display: inline-flex; align-items: center; gap: 4px; }
.ztable td .val { min-width: 42px; font-weight: 700; color: var(--ap-text); font-variant-numeric: tabular-nums; }
.ztable .zdot { width: 9px; height: 9px; border-radius: 3px; display: inline-block; margin-right: 6px; }
/* a wide table scrolls inside the card instead of widening it */
.tablewrap { overflow-x: auto; min-width: 0; }
.section { min-width: 0; }
.controls { min-width: 0; }
.controls select { max-width: 100%; }

.tabs { display: flex; gap: 6px; }
.tabs button {
  padding: 6px 14px; border-radius: 999px; border: 1px solid var(--ap-line);
  background: transparent; color: var(--ap-text); font: inherit; font-size: .8rem; font-weight: 600; cursor: pointer;
}
.tabs button[aria-pressed="true"] { background: color-mix(in srgb, var(--ap-accent) 16%, transparent); border-color: color-mix(in srgb, var(--ap-accent) 45%, transparent); color: var(--ap-accent); }

.muted { font-size: .76rem; color: var(--ap-muted); }
.empty { display: grid; gap: 8px; justify-items: center; padding: 22px 8px; color: var(--ap-muted); text-align: center; }
.empty .icon { width: 42px; height: 42px; opacity: .5; }
`;

export const STYLES = BASE_STYLES + FAMILY_STYLES;
