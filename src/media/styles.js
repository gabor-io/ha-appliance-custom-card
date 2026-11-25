import { BASE_STYLES } from '../shared/base-styles.js';

/**
 * The card is mostly one picture and one block of text, so the layout rules
 * are about what happens when either of them is missing: no artwork, no
 * title, a player that is only "on". Every element the markup can leave out
 * is laid out with `gap` rather than margins, so dropping it leaves no hole.
 */
export const STYLES = `
${BASE_STYLES}

.wrap { gap: 14px; }
.wrap.compact { gap: 10px; }

/* ---------- header ---------- */
.head { display: flex; align-items: center; gap: 10px; min-width: 0; }
.head .who { min-width: 0; }
.head .room { font-size: 1.05rem; font-weight: 600; color: var(--ap-text); line-height: 1.2;
  cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head .src { font-size: .78rem; color: var(--ap-muted); display: flex; align-items: center; gap: 5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.head .src .icon { width: 13px; height: 13px; flex: none; }
.head .spacer { flex: 1; }

/* ---------- the playing block ---------- */
/* align-items: stretch is what makes the right-hand column exactly as tall
   as the artwork, whatever shape the artwork turned out to be - the
   alternative is a hardcoded height that is wrong for two content types
   out of three */
.now { display: grid; grid-template-columns: var(--mr-art) minmax(0, 1fr); gap: 14px; align-items: stretch; }
.wrap { --mr-art: 116px; }
.wrap.compact { --mr-art: 84px; }
.now.noart { grid-template-columns: minmax(0, 1fr); }
@container (max-width: 340px) { .wrap { --mr-art: 88px; } .now { gap: 10px; } }

.art {
  position: relative; aspect-ratio: 2 / 3; border-radius: 12px; overflow: hidden;
  background: color-mix(in srgb, var(--ap-accent) 12%, transparent);
  display: grid; place-items: center; cursor: pointer;
}
.art.wide { aspect-ratio: 16 / 9; }
.art.square { aspect-ratio: 1; }
.art.wide, .art.square { align-self: start; }
.art img { width: 100%; height: 100%; object-fit: cover; display: block; }
.art .icon { width: 34%; height: 34%; color: var(--ap-accent); opacity: .7; }
.art .tag {
  position: absolute; left: 6px; bottom: 6px;
  padding: 2px 7px; border-radius: 999px; font-size: .68rem; font-weight: 700;
  background: rgba(0,0,0,.6); color: #fff; letter-spacing: .02em;
}

/* the right-hand column is as tall as the poster, so its three blocks -
   what is playing, where it is, what you can do about it - are spread over
   that height instead of huddling at the top */
.meta { min-width: 0; display: grid; gap: 10px; align-content: space-between; }
.said { min-width: 0; display: grid; gap: 4px; }
.meta .title {
  font-size: 1.22rem; font-weight: 700; line-height: 1.25; color: var(--ap-text);
  overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.compact .meta .title { font-size: 1.05rem; -webkit-line-clamp: 1; }
.meta .sub { font-size: .86rem; color: var(--ap-muted); overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.meta .app { justify-self: start; }

/* ---------- progress ---------- */
.prog { display: grid; gap: 5px; }
.prog .bar { height: 6px; }
.prog .bar > i { transition: width .95s linear; }
.paused .prog .bar > i { transition: none; }
.prog .times { display: flex; justify-content: space-between; font-size: .74rem;
  color: var(--ap-muted); font-variant-numeric: tabular-nums; }

/* ---------- controls ---------- */
.controls { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
/* the poster is tall; on a narrow card the buttons beside it would be one
   per line, so below that width the picture steps aside */
@container (max-width: 330px) {
  .now { grid-template-columns: minmax(0, 1fr); }
  .art { max-width: 120px; }
}
.ctl {
  width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer;
  display: grid; place-items: center; padding: 0;
  background: color-mix(in srgb, var(--ap-accent) 12%, transparent);
  color: var(--ap-text);
}
.ctl .icon { width: 21px; height: 21px; }
.ctl:hover { background: color-mix(in srgb, var(--ap-accent) 22%, transparent); }
.ctl.main { width: 48px; height: 48px; background: var(--ap-accent); color: var(--text-primary-color, #fff); }
.ctl.main .icon { width: 26px; height: 26px; }
.ctl.main:hover { filter: brightness(1.08); }
.ctl[disabled] { opacity: .35; cursor: default; }
.ctl.off { color: var(--error-color, #db4437); }
.controls .gap { flex: 1; }

/* ---------- volume ---------- */
.vol { display: flex; align-items: center; gap: 10px; }
.vol input[type="range"] { flex: 1; accent-color: var(--ap-accent); min-width: 80px; }
.vol .icon { width: 18px; height: 18px; color: var(--ap-muted); }
.vol .mute { cursor: pointer; background: none; border: none; padding: 0; display: grid; place-items: center; }
.vol .mute.on .icon { color: var(--error-color, #db4437); }
.vol .only { font-size: .8rem; color: var(--ap-muted); }
.vol .val { font-size: .76rem; color: var(--ap-muted); font-variant-numeric: tabular-nums; min-width: 34px; text-align: right; }

/* ---------- the player row ---------- */
.players { display: flex; gap: 8px; flex-wrap: wrap; }
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
.quiet { display: flex; align-items: center; gap: 12px; }
.quiet .icon { width: 30px; height: 30px; color: var(--ap-muted); flex: none; }
.quiet .lines { min-width: 0; }
.quiet .big { font-size: 1.02rem; font-weight: 600; color: var(--ap-text); }
.quiet .small { font-size: .8rem; color: var(--ap-muted); }

.empty { display: flex; align-items: center; gap: 12px; color: var(--ap-muted); font-size: .9rem; }
.empty .icon { width: 26px; height: 26px; flex: none; }
`;
