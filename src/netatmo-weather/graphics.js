/**
 * The station drawing.
 *
 * Every Netatmo weather module is the same brushed-aluminium cylinder with a
 * white cap and base: the base station is the tall one (155 mm), the modules
 * are short (105 mm), and the outdoor module has a small notch in its foot.
 * One function draws all three, which is also why they read as one family on
 * the card.
 *
 * The slot down the front is the station's own light. The real device shows
 * it only when you tap the top; the card leaves it on, because a drawing that
 * is dark whenever the air is fine would waste the one place a colour is
 * genuinely useful.
 *
 * The lamp is driven from a CSS variable rather than redrawn, so the colour
 * can change without replacing the node - replacing it would restart the
 * breathing animation on every state update.
 */

/** Shared gradients and filters; rendered once per card. */
export function renderDefs(uid) {
  return `
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <linearGradient id="${uid}-alu" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b4b9bc"/>
        <stop offset=".18" stop-color="#dfe3e5"/>
        <stop offset=".42" stop-color="#f4f6f7"/>
        <stop offset=".72" stop-color="#dde1e4"/>
        <stop offset="1" stop-color="#aeb3b7"/>
      </linearGradient>
      <filter id="${uid}-soft" x="-60%" y="-20%" width="220%" height="170%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>
  </svg>`;
}

/**
 * One cylinder.
 *
 * @param {object} options
 *   `uid`   the card instance, so two cards never share gradient ids
 *   `tall`  the base station is taller than the modules
 *   `notch` the outdoor module has a cut-out in its foot
 */
export function renderModule(uid, { tall = false, notch = false } = {}) {
  const height = tall ? 196 : 138;
  const bodyTop = 16;
  const bodyH = tall ? 162 : 104;
  const width = 52;
  const x = (100 - width) / 2;
  const slotTop = bodyTop + bodyH * 0.22;
  const slotH = bodyH * 0.56;
  const baseH = 16;
  const baseY = bodyTop + bodyH - baseH;

  return `
  <svg class="dev" viewBox="0 0 100 ${height}" role="img" aria-hidden="true">
    <ellipse class="shadow" cx="50" cy="${bodyTop + bodyH + 6}" rx="30" ry="5" filter="url(#${uid}-soft)"/>
    <rect class="shell" x="${x}" y="${bodyTop}" width="${width}" height="${bodyH}" rx="3"
      fill="url(#${uid}-alu)"/>
    <rect class="base" x="${x}" y="${baseY}" width="${width}" height="${baseH}" rx="3"/>
    <ellipse class="base" cx="50" cy="${bodyTop + bodyH}" rx="${width / 2}" ry="4.5"/>
    ${notch ? `<rect class="groove" x="48" y="${bodyTop + bodyH - 3}" width="4" height="6" rx="2"/>` : ''}
    <ellipse class="cap" cx="50" cy="${bodyTop}" rx="${width / 2}" ry="6"/>
    <ellipse class="cap-inner" cx="50" cy="${bodyTop + 0.6}" rx="${width / 2 - 7}" ry="3.6"/>
    <rect class="groove" x="48.3" y="${slotTop}" width="3.4" height="${slotH}" rx="1.7"/>
    <rect class="halo" x="47.2" y="${slotTop}" width="5.6" height="${slotH}" rx="2.8"/>
    <rect class="lamp" x="48.3" y="${slotTop}" width="3.4" height="${slotH}" rx="1.7"/>
  </svg>`;
}

/**
 * Points an existing drawing at a module's state.
 *
 * Only classes and one custom property change, so the lamp keeps breathing
 * across an update instead of starting over.
 */
export function applyModule(node, { glow = null, dead = false, stale = false } = {}) {
  if (!node) return;
  node.classList.toggle('lit', Boolean(glow));
  node.classList.toggle('dead', Boolean(dead));
  node.classList.toggle('stale', Boolean(stale));
  const current = node.style.getPropertyValue('--glow');
  if (glow && current !== glow) node.style.setProperty('--glow', glow);
  if (!glow && current) node.style.removeProperty('--glow');
}
