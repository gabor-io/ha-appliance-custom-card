import { BASE_STYLES } from '../shared/base-styles.js';

/**
 * The card is one picture with text in front of it, which makes most of
 * these rules about two things: keeping the text off the picture (the fg
 * column stops short of the right edge), and what is left when there is no
 * picture at all - no artwork, no title, a player that is merely "on".
 * Every element the markup can leave out is laid out with gap rather than
 * margins, so dropping one leaves no hole behind.
 */
export const STYLES = `
${BASE_STYLES}

:host { --mr-bg: var(--ha-card-background, var(--card-background-color, #fff)); }

/* the artwork runs to the card's own edges, so the padding belongs to each
   strip rather than to one box around all of them */
.wrap { display: block; padding: 0; gap: 0; }

/* ---------- the hero: artwork behind, everything else in front ---------- */
.hero {
  position: relative; isolation: isolate; overflow: hidden;
  padding: 16px; display: grid; grid-template-columns: minmax(0, 1fr);
  min-height: 172px;
}
/* the single row has to fill the hero, or the column inside it has no spare
   height to push the buttons down into */
.hero > .fg { align-self: stretch; }
.compact .hero { padding: 12px; min-height: 128px; gap: 10px; }

.bg { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
/* blurred and oversized, so the blur has pixels to work with past the edges
   instead of fading into nothing at the border */
.bg .blur {
  position: absolute; inset: -30px; width: calc(100% + 60px); height: calc(100% + 60px);
  object-fit: cover; filter: blur(28px) saturate(1.25); opacity: .65;
}
/* the sharp copy would otherwise start with a visible vertical seam against
   the blurred one behind it; the mask dissolves its left edge instead */
.bg .shot {
  position: absolute; top: 0; right: 0; height: 100%; width: 40%;
  object-fit: cover; cursor: pointer;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 26%);
  mask-image: linear-gradient(to right, transparent 0%, #000 26%);
}
.bg .mark { position: absolute; top: 0; right: 0; height: 100%; width: 40%;
  display: grid; place-items: center; }
.bg .mark .icon { width: 56px; height: 56px; color: var(--ap-muted); opacity: .35; }
/* opaque enough on the left to read a title over, gone by the right edge so
   the picture is a picture there; never fully opaque, or the blurred copy
   under it could not tint anything */
.bg .veil {
  position: absolute; inset: 0;
  background: linear-gradient(to right,
    color-mix(in srgb, var(--mr-bg) 96%, transparent) 0%,
    color-mix(in srgb, var(--mr-bg) 93%, transparent) 38%,
    color-mix(in srgb, var(--mr-bg) 55%, transparent) 58%,
    transparent 74%);
}
.wrap.noart .hero { min-height: 0; }

.fg { display: grid; gap: 12px; align-content: space-between; min-width: 0; }
/* The artwork is on the right, so the title and the buttons stop before it.
   This is a padding rather than a max-width on the children, because a
   percentage width inside an auto-sized grid track resolves against a width
   that is itself being derived from the children - the column collapses to
   a sliver. The header is deliberately outside it: its right-hand badge
   belongs over the picture, the way the stock card puts the runtime there. */
.body { display: grid; gap: 12px; min-width: 0; padding-right: 42%; }
.wrap.noart .body { padding-right: 0; }
@container (max-width: 400px) { .body { padding-right: 34%; } }
@container (max-width: 320px) { .body { padding-right: 24%; } }

/* ---------- header ---------- */
.head { display: flex; align-items: flex-start; gap: 10px; min-width: 0; }
.head .who { min-width: 0; }
.head .room { font-size: .98rem; font-weight: 600; color: var(--ap-text); line-height: 1.2;
  cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head .src { font-size: .76rem; color: var(--ap-muted); display: flex; align-items: center; gap: 5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head .src .icon { width: 13px; height: 13px; flex: none; }
.head .spacer { flex: 1; }
/* this badge sits over the picture, where the card's own accent-on-tint
   colours have nothing to hold on to - it gets its own scrim instead, the
   way the stock card writes the runtime over the artwork */
.head .pill { flex: none; background: rgba(0, 0, 0, .42); color: #fff; backdrop-filter: blur(2px); }
.wrap.noart .head .pill {
  background: color-mix(in srgb, var(--ap-accent) 16%, transparent);
  color: var(--ap-accent); backdrop-filter: none;
}

/* ---------- what is playing ---------- */
.said { min-width: 0; display: grid; gap: 3px; }
.said .title {
  font-size: 1.3rem; font-weight: 700; line-height: 1.22; color: var(--ap-text);
  overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.compact .said .title { font-size: 1.08rem; -webkit-line-clamp: 1; }
.said .sub { font-size: .85rem; color: var(--ap-muted); overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

/* ---------- controls ---------- */
/* flat icons rather than filled circles: over a picture a row of solid discs
   reads as a second card sitting on the first */
.controls { display: flex; align-items: center; gap: 2px; flex-wrap: wrap; margin-left: -8px; }
.ctl {
  width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer;
  display: grid; place-items: center; padding: 0; background: none; color: var(--ap-text);
}
.ctl .icon { width: 23px; height: 23px; }
.ctl.main .icon { width: 32px; height: 32px; color: var(--ap-accent); }
.ctl:hover { background: color-mix(in srgb, var(--ap-text) 12%, transparent); }
.ctl[disabled] { opacity: .35; cursor: default; }
.compact .ctl { width: 36px; height: 36px; }

/* ---------- progress, as the strip under the artwork ---------- */
.prog { display: grid; gap: 4px; padding: 10px 16px 12px; }
.compact .prog { padding: 8px 12px 10px; }
.prog .bar { height: 4px; }
.prog .bar > i { transition: width .95s linear; }
.paused .prog .bar > i { transition: none; }
.prog .times { display: flex; justify-content: space-between; font-size: .73rem;
  color: var(--ap-muted); font-variant-numeric: tabular-nums; }

/* ---------- volume ---------- */
.vol { display: flex; align-items: center; gap: 10px; padding: 0 16px 12px; }
.compact .vol { padding: 0 12px 10px; }
.vol input[type="range"] { flex: 1; accent-color: var(--ap-accent); min-width: 80px; }
.vol .icon { width: 18px; height: 18px; color: var(--ap-muted); }
.vol .mute { cursor: pointer; background: none; border: none; padding: 0; display: grid; place-items: center; }
.vol .mute.on .icon { color: var(--error-color, #db4437); }
.vol .only { font-size: .8rem; color: var(--ap-muted); }
.vol .val { font-size: .76rem; color: var(--ap-muted); font-variant-numeric: tabular-nums;
  min-width: 34px; text-align: right; }

/* ---------- the player row ---------- */
.players { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 16px 14px; }
.compact .players { padding: 0 12px 12px; }
.chip {
  display: inline-flex; align-items: center; gap: 7px; min-width: 0;
  padding: 6px 11px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--ap-line); background: transparent;
  color: var(--ap-muted); font: inherit; font-size: .78rem;
}
.chip .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; flex: none; opacity: .45; }
.chip .label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chip .what { opacity: .75; }
.chip.live { color: var(--ap-accent); border-color: var(--ap-accent-soft); }
.chip.live .dot { opacity: 1; }
.chip.shown { background: color-mix(in srgb, var(--ap-accent) 14%, transparent); font-weight: 600; }
.chip.dead { opacity: .55; }
.chip.gone { color: var(--error-color, #db4437); border-style: dashed; }

/* ---------- nothing playing ---------- */
.quiet { display: flex; align-items: center; gap: 12px; padding: 16px; }
.quiet .icon { width: 30px; height: 30px; color: var(--ap-muted); flex: none; }
.quiet .lines { min-width: 0; }
.quiet .big { font-size: 1.02rem; font-weight: 600; color: var(--ap-text); }
.quiet .small { font-size: .8rem; color: var(--ap-muted); }

.empty { display: flex; align-items: center; gap: 12px; color: var(--ap-muted); font-size: .9rem; padding: 16px; }
.empty .icon { width: 26px; height: 26px; flex: none; }
`;
