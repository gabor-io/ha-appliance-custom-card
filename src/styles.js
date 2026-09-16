export const STYLES = `
:host {
  display: block;
  --dw-radius: 18px;
  --dw-accent: var(--primary-color, #03a9f4);
  --dw-accent-soft: color-mix(in srgb, var(--dw-accent) 45%, transparent);
  --dw-body-1: color-mix(in srgb, var(--card-background-color, #fff) 92%, var(--primary-text-color, #000) 8%);
  --dw-body-2: color-mix(in srgb, var(--card-background-color, #fff) 78%, var(--primary-text-color, #000) 22%);
  --dw-tub-1: color-mix(in srgb, var(--card-background-color, #fff) 60%, #0b2430 40%);
  --dw-tub-2: color-mix(in srgb, var(--card-background-color, #fff) 40%, #06131c 60%);
  --dw-line: var(--divider-color, rgba(127,127,127,.25));
  --dw-muted: var(--secondary-text-color, #70757a);
  --dw-text: var(--primary-text-color, #212121);
}

ha-card {
  overflow: hidden;
  container-type: inline-size;
}

.wrap { padding: 16px; display: grid; gap: 16px; }
.wrap.compact { gap: 12px; padding: 12px; }

/* ---------- header ---------- */
.header { display: flex; align-items: center; gap: 10px; }
.header .title { font-size: 1.05rem; font-weight: 600; color: var(--dw-text); line-height: 1.2; }
.header .sub { font-size: .78rem; color: var(--dw-muted); }
.header .spacer { flex: 1; }
.badges { display: flex; align-items: center; gap: 6px; color: var(--dw-muted); }
.badges .icon { width: 18px; height: 18px; }
.badges .bad { color: var(--error-color, #db4437); }

.pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 999px;
  background: color-mix(in srgb, var(--dw-accent) 16%, transparent);
  color: var(--dw-accent); font-size: .76rem; font-weight: 600;
  white-space: nowrap;
}
.pill .icon { width: 14px; height: 14px; }

/* ---------- hero ---------- */
.hero { display: grid; grid-template-columns: 148px minmax(0, 1fr); gap: 18px; align-items: center; }
.compact .hero { grid-template-columns: 104px minmax(0, 1fr); gap: 14px; }
@container (max-width: 360px) { .hero { grid-template-columns: 96px minmax(0, 1fr); gap: 12px; } }

.status { min-width: 0; display: grid; gap: 10px; }
.status-line { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.state-text { font-size: 1.45rem; font-weight: 700; color: var(--dw-accent); line-height: 1.1; }
.compact .state-text { font-size: 1.2rem; }
.phase-text { font-size: .85rem; color: var(--dw-muted); }
.program-line { display: flex; align-items: center; gap: 6px; font-size: .9rem; color: var(--dw-text); }
.program-line .icon { width: 16px; height: 16px; color: var(--dw-muted); }

.countdown { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.countdown .value { font-size: 2.1rem; font-weight: 700; letter-spacing: -.02em; color: var(--dw-text); line-height: 1; font-variant-numeric: tabular-nums; }
.compact .countdown .value { font-size: 1.6rem; }
.countdown .unit { font-size: .95rem; font-weight: 600; color: var(--dw-muted); }
.countdown .at { font-size: .82rem; color: var(--dw-muted); display: inline-flex; align-items: center; gap: 4px; }
.countdown .at .icon { width: 14px; height: 14px; }

.bar { height: 8px; border-radius: 999px; background: var(--dw-line); overflow: hidden; }
.bar > i {
  display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--dw-accent-soft), var(--dw-accent));
  width: 0%; transition: width .8s ease;
}
.running .bar > i {
  background-image: linear-gradient(90deg, var(--dw-accent-soft), var(--dw-accent)),
    repeating-linear-gradient(115deg, rgba(255,255,255,.28) 0 10px, transparent 10px 20px);
  animation: stripes 1.1s linear infinite;
}
@keyframes stripes { to { background-position: 0 0, 40px 0; } }

/* ---------- timeline ---------- */
.timeline { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; }
.step { display: grid; justify-items: center; gap: 5px; opacity: .45; }
.step .dot {
  width: 100%; height: 4px; border-radius: 999px; background: var(--dw-line);
}
.step .label { font-size: .7rem; color: var(--dw-muted); text-align: center; line-height: 1.15; }
.step.done { opacity: 1; }
.step.done .dot { background: color-mix(in srgb, var(--dw-accent) 55%, transparent); }
.step.active { opacity: 1; }
.step.active .dot { background: var(--dw-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--dw-accent) 18%, transparent); }
.step.active .label { color: var(--dw-accent); font-weight: 600; }
.step.skip { opacity: .2; }

/* ---------- alerts ---------- */
.alerts { display: grid; gap: 8px; }
.alert {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  border-radius: 12px; font-size: .84rem; line-height: 1.3;
  background: color-mix(in srgb, var(--warning-color, #ffa726) 16%, transparent);
  color: var(--dw-text);
}
.alert.error { background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent); }
.alert .icon { width: 20px; height: 20px; flex: 0 0 auto; color: var(--warning-color, #ffa726); }
.alert.error .icon { color: var(--error-color, #db4437); }

/* ---------- sections ---------- */
.section { display: grid; gap: 8px; }
.section-title {
  font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--dw-muted);
}
.section-title .hint { float: right; font-weight: 500; letter-spacing: 0; text-transform: none; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--dw-line); background: transparent;
  color: var(--dw-text); font: inherit; font-size: .82rem; font-weight: 500;
  transition: background .2s ease, border-color .2s ease, color .2s ease, transform .1s ease;
}
.chip .icon { width: 16px; height: 16px; color: var(--dw-muted); }
.chip:hover:not([disabled]) { border-color: var(--dw-accent); }
.chip:active:not([disabled]) { transform: scale(.97); }
.chip[aria-pressed="true"] {
  background: color-mix(in srgb, var(--dw-accent) 16%, transparent);
  border-color: color-mix(in srgb, var(--dw-accent) 45%, transparent);
  color: var(--dw-accent);
}
.chip[aria-pressed="true"] .icon { color: var(--dw-accent); }
.chip[disabled] { opacity: .38; cursor: not-allowed; }
.chip[disabled][aria-pressed="true"] { opacity: .8; }

/* ---------- meters ---------- */
.meters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.meter { display: grid; gap: 6px; }
.meter .top { display: flex; align-items: center; gap: 6px; font-size: .76rem; color: var(--dw-muted); }
.meter .top .icon { width: 15px; height: 15px; }
.meter .top .val { margin-left: auto; font-weight: 600; color: var(--dw-text); font-variant-numeric: tabular-nums; }
.meter .track { display: grid; grid-auto-flow: column; gap: 3px; }
.meter .track i { height: 5px; border-radius: 2px; background: var(--dw-line); }
.meter.eco .track i.on { background: var(--success-color, #43a047); }
.meter.energy .track i.on { background: var(--warning-color, #fb8c00); }
.meter.water .track i.on { background: var(--info-color, #039be5); }

.facts { display: flex; flex-wrap: wrap; gap: 8px; }
.fact {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px;
  border-radius: 10px; background: color-mix(in srgb, var(--dw-text) 6%, transparent);
  font-size: .78rem; color: var(--dw-text);
}
.fact .icon { width: 15px; height: 15px; color: var(--dw-muted); }
.fact b { font-weight: 600; }

/* ---------- controls ---------- */
.controls { display: flex; gap: 10px; flex-wrap: wrap; }
.btn {
  flex: 1 1 auto; min-width: 116px;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 16px; border-radius: 14px; cursor: pointer;
  border: 1px solid var(--dw-line); background: transparent; color: var(--dw-text);
  font: inherit; font-size: .88rem; font-weight: 600;
  transition: transform .1s ease, box-shadow .2s ease, background .2s ease;
}
.btn .icon { width: 18px; height: 18px; }
.btn.primary {
  background: var(--dw-accent); border-color: transparent; color: var(--text-primary-color, #fff);
  box-shadow: 0 6px 18px -8px var(--dw-accent);
}
.btn.primary .icon { color: currentColor; }
.btn:hover:not([disabled]) { box-shadow: 0 6px 16px -10px rgba(0,0,0,.6); }
.btn:active:not([disabled]) { transform: scale(.98); }
.btn[disabled] { opacity: .4; cursor: not-allowed; }

.note { font-size: .76rem; color: var(--dw-muted); display: flex; align-items: center; gap: 6px; }
.note .icon { width: 15px; height: 15px; }

.details { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: 10px; }
.detail { display: grid; gap: 2px; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--dw-text) 5%, transparent); }
.detail .k { font-size: .7rem; color: var(--dw-muted); text-transform: uppercase; letter-spacing: .05em; }
.detail .v { font-size: .86rem; font-weight: 600; color: var(--dw-text); display: flex; align-items: center; gap: 6px; }
.detail .v .icon { width: 15px; height: 15px; color: var(--dw-muted); }

.empty { padding: 24px 16px; text-align: center; color: var(--dw-muted); font-size: .9rem; display: grid; gap: 10px; justify-items: center; }
.empty .icon { width: 36px; height: 36px; }

/* ---------- machine illustration ---------- */
.machine { width: 100%; height: auto; perspective: 620px; overflow: visible; }
.machine .cabinet { fill: color-mix(in srgb, var(--dw-text) 10%, transparent); }
.machine .cavity-glow { fill: color-mix(in srgb, var(--dw-accent) 12%, transparent); opacity: 0; transition: opacity .4s ease; }
.machine .glass { fill: url(#dw-glass); }
.machine .door {
  transform-box: view-box; transform-origin: 90px 206px;
  transition: transform .7s cubic-bezier(.4, 0, .2, 1);
}
.machine .panel-strip { fill: color-mix(in srgb, var(--dw-text) 8%, transparent); }
.machine .handle { fill: color-mix(in srgb, var(--dw-text) 22%, transparent); }
.machine .door-panel { fill: url(#dw-body); stroke: var(--dw-line); stroke-width: 1.2; }
.machine .display { fill: color-mix(in srgb, #04121a 82%, var(--card-background-color, #fff)); }
.machine .display-text {
  fill: var(--dw-accent); font-size: 12px; font-weight: 700;
  font-family: var(--paper-font-body1_-_font-family, inherit); font-variant-numeric: tabular-nums;
  letter-spacing: .04em;
}
.machine .led { fill: var(--dw-accent); }
.machine .tub-body { fill: url(#dw-tub); }
.machine .rack line { stroke: color-mix(in srgb, #ffffff 42%, transparent); stroke-width: 2; stroke-linecap: round; }
.machine .plates rect { fill: color-mix(in srgb, #ffffff 68%, transparent); }
.machine .glasses path { fill: color-mix(in srgb, #ffffff 34%, transparent); }
.machine .spray-arm rect, .machine .spray-arm circle { fill: color-mix(in srgb, #ffffff 55%, transparent); }
.machine .spray-arm .jet { fill: var(--dw-accent); }
.machine .spray-arm { transform-box: view-box; transform-origin: 90px 170px; }
.machine .water path { stroke: var(--dw-accent); stroke-width: 2; stroke-linecap: round; fill: none; opacity: 0; }
.machine .droplets circle { fill: var(--dw-accent); opacity: 0; }
.machine .steam path { stroke: color-mix(in srgb, #ffffff 55%, transparent); stroke-width: 2.4; stroke-linecap: round; fill: none; opacity: 0; }
.machine .sparkles path { fill: var(--success-color, #43a047); opacity: 0; }

/* state driven behaviour */
.running .machine .spray-arm { animation: spin 2.6s linear infinite; }
.running .machine .water path { animation: jet 1.4s ease-in-out infinite; }
.running .machine .water path:nth-child(2) { animation-delay: .25s; }
.running .machine .water path:nth-child(3) { animation-delay: .5s; }
.running .machine .droplets circle { animation: drop 2.4s ease-in infinite; }
.running .machine .droplets circle:nth-child(2) { animation-delay: .5s; }
.running .machine .droplets circle:nth-child(3) { animation-delay: .9s; }
.running .machine .droplets circle:nth-child(4) { animation-delay: 1.4s; }
.running .machine .droplets circle:nth-child(5) { animation-delay: 1.9s; }
.running .machine .led { animation: blink 2.2s ease-in-out infinite; }

.phase-drying .machine .water path, .phase-drying .machine .droplets circle { animation: none; opacity: 0; }
.phase-drying .machine .spray-arm { animation-duration: 8s; }
.phase-drying .machine .steam path { animation: steam 3.4s ease-in-out infinite; }
.phase-drying .machine .steam path:nth-child(2) { animation-delay: .6s; }
.phase-drying .machine .steam path:nth-child(3) { animation-delay: 1.2s; }

.paused .machine .led { animation: blink 1s steps(2, end) infinite; }
.paused .machine .plates rect { opacity: .8; }

.done .machine .sparkles path { animation: twinkle 2.6s ease-in-out infinite; }
.done .machine .sparkles path:nth-child(2) { animation-delay: .6s; }
.done .machine .sparkles path:nth-child(3) { animation-delay: 1.2s; }

.off .machine { filter: saturate(.25); }
.off .machine .display-text { fill: color-mix(in srgb, var(--dw-muted) 60%, transparent); }
.off .machine .led { fill: color-mix(in srgb, var(--dw-muted) 50%, transparent); }

.alarm .machine .led { animation: blink .7s steps(2, end) infinite; }

.door-open .machine .door { transform: rotateX(58deg); }
.door-open .machine .cavity-glow { opacity: 1; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
@keyframes jet {
  0% { opacity: 0; stroke-dasharray: 2 60; stroke-dashoffset: 0; }
  40% { opacity: .9; }
  100% { opacity: 0; stroke-dasharray: 22 40; stroke-dashoffset: -50; }
}
@keyframes drop {
  0% { opacity: 0; transform: translateY(0); }
  20% { opacity: .85; }
  100% { opacity: 0; transform: translateY(26px); }
}
@keyframes steam {
  0% { opacity: 0; transform: translateY(6px) scale(.9); }
  40% { opacity: .7; }
  100% { opacity: 0; transform: translateY(-16px) scale(1.06); }
}
@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1); }
}

.no-animation .machine * { animation: none !important; }
.no-animation .bar > i { animation: none !important; }

@media (prefers-reduced-motion: reduce) {
  .machine * { animation: none !important; }
  .bar > i { animation: none !important; transition: none; }
}

/* accents per state */
.accent-idle { --dw-accent: var(--state-icon-color, #8a9199); }
.accent-ready { --dw-accent: var(--success-color, #43a047); }
.accent-running { --dw-accent: var(--info-color, #039be5); }
.accent-delayed { --dw-accent: #7e57c2; }
.accent-paused { --dw-accent: var(--warning-color, #fb8c00); }
.accent-done { --dw-accent: var(--success-color, #43a047); }
.accent-alarm { --dw-accent: var(--error-color, #db4437); }
`;
