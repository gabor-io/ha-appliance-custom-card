/**
 * The panels, drawn as they hang on the wall.
 *
 * Shapes hexagons tile edge to edge, so the drawing is a real hex grid rather
 * than a scatter of shapes: the layout is given in axial coordinates and the
 * geometry falls out of it, which means any arrangement someone actually
 * screwed to their wall can be described. Flat-top hexagons, `q` stepping
 * right and `r` stepping down-right.
 *
 * The panels are the Black edition, so the frame between them is dark on both
 * themes - that seam is the product, not a styling choice.
 *
 * While a scene runs the faces cycle through its palette with a delay taken
 * from each panel's position, which is what the real wall does: the colour
 * travels across it rather than changing everywhere at once.
 */

/** Centre-to-vertex radius. Everything else is derived from it. */
const R = 10;

/** Axial (q, r) -> the centre of a flat-top hexagon. */
function centreOf([q, r]) {
  return { x: R * 1.5 * q, y: R * Math.sqrt(3) * (r + q / 2) };
}

function hexPoints(cx, cy) {
  return Array.from({ length: 6 }, (unused, i) => {
    const angle = (Math.PI / 180) * (60 * i);
    return `${(cx + R * Math.cos(angle)).toFixed(2)},${(cy + R * Math.sin(angle)).toFixed(2)}`;
  }).join(' ');
}

/**
 * Turns a layout into panels and the box that holds them.
 *
 * @param {Array<[number, number]>} layout axial coordinates
 */
export function geometry(layout) {
  const panels = layout.map((cell, index) => {
    const { x, y } = centreOf(cell);
    return { index, x, y, points: hexPoints(x, y) };
  });
  if (!panels.length) return { panels, viewBox: '0 0 1 1', width: 1, height: 1 };

  /* a long run is already wide; the breathing room it needs is at the sides,
     not above and below, where it only pushes the panels into a stripe */
  const padX = R * 0.8;
  const padY = R * 0.4;
  /* the power lead hangs below the first panel and has to fit in the box */
  const leadDrop = R * 1.85;
  const xs = panels.map((p) => p.x);
  const ys = panels.map((p) => p.y);
  const minX = Math.min(...xs) - R - padX;
  const maxX = Math.max(...xs) + R + padX;
  const minY = Math.min(...ys) - R * 0.87 - padY;
  const maxY =
    Math.max(...ys.map((y) => y + R * 0.87), panels[0].y + leadDrop + R * 0.3) + padY;

  /* the wash travels across the wall, so the delay follows the panel's
     distance along the diagonal rather than the order it was listed in */
  const spread = Math.max(1, maxX - minX + (maxY - minY));
  for (const panel of panels) {
    panel.phase = (panel.x - minX + (panel.y - minY)) / spread;
  }

  return {
    panels,
    viewBox: `${minX.toFixed(2)} ${minY.toFixed(2)} ${(maxX - minX).toFixed(2)} ${(maxY - minY).toFixed(2)}`,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/** Gradients and blurs, defined once per card. */
export function renderDefs(uid) {
  return `
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <filter id="${uid}-bloom" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="6"/>
      </filter>
      <linearGradient id="${uid}-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
        <stop offset="1" stop-color="#000" stop-opacity=".18"/>
      </linearGradient>
    </defs>
  </svg>`;
}

/**
 * The cluster.
 *
 * Emitted once per layout, then only reclassed and recoloured. The lead under
 * the first panel is the real one: a Shapes run is powered through one panel,
 * and on a wall it is the thing that says which end is which.
 */
export function renderPanels(uid, layout) {
  const { panels, viewBox } = geometry(layout);
  const glow = panels
    .map((p) => `<polygon class="glow" points="${p.points}" style="--phase:${p.phase.toFixed(3)}"/>`)
    .join('');
  const faces = panels
    .map(
      (p) => `<g class="panel" style="--phase:${p.phase.toFixed(3)}">
        <polygon class="lit" points="${p.points}"/>
        <polygon class="sheen" points="${p.points}" fill="url(#${uid}-face)"/>
        <polygon class="frame" points="${p.points}"/>
      </g>`,
    )
    .join('');

  const first = panels[0];
  const lead = first
    ? `<g class="lead">
        <path d="M${first.x.toFixed(2)} ${(first.y + R * 0.87).toFixed(2)}
                 v${(R * 0.5).toFixed(2)}"/>
        <circle cx="${first.x.toFixed(2)}" cy="${(first.y + R * 1.5).toFixed(2)}" r="${(R * 0.28).toFixed(2)}"/>
      </g>`
    : '';

  return `
  <svg class="panels" viewBox="${viewBox}" role="img" aria-hidden="true">
    <g class="bloom" filter="url(#${uid}-bloom)">${glow}</g>
    ${faces}
    ${lead}
  </svg>`;
}

/**
 * Points an existing cluster at the light.
 *
 * The colours come from the scene when one is running, and only from hs or
 * the colour temperature when none is: the hue the light reports under a
 * scene is the last fixed colour it was set to, not what is on the wall.
 */
export function applyPanels(svg, model) {
  if (!svg) return;

  svg.classList.toggle('on', Boolean(model.on));
  svg.classList.toggle('dead', !model.available);
  svg.classList.toggle('scene', model.mode === 'effect');

  const palette =
    model.mode === 'effect'
      ? model.palette
      : [model.mode === 'white' ? model.kelvinCss : model.hs?.css].filter(Boolean);

  /* five slots, filled round-robin, so a three-colour scene cycles cleanly
     through the same keyframes a five-colour one uses */
  const colours = palette && palette.length ? palette : ['#2b2f33'];
  for (let i = 0; i < 5; i += 1) {
    svg.style.setProperty(`--nl-c${i}`, colours[i % colours.length]);
  }

  /* dimming a lamp does not change its colour, it changes how much of it
     there is - so brightness drives the face's opacity, not its lightness */
  const level = model.on && model.brightness !== null ? model.brightness / 255 : 0;
  svg.style.setProperty('--nl-level', model.on ? Math.max(0.25, level).toFixed(2) : '0');
}
