/**
 * The hero illustration: a Liebherr-style fridge seen from the front.
 *
 * The cabinet is split into as many compartments as the appliance reports
 * zones, each with its own door, handle and interior. Cooling, the SuperCool /
 * SuperFrost boost, night mode and the presentation light are CSS states on the
 * built-once SVG, so the animations never restart on a state update.
 */

const WIDTH = 200;
const HEIGHT = 264;
const TOP = 8;
const BOTTOM = 256;
const GAP = 6;

/** Splits the cabinet into one door per zone, top to bottom. */
function doorRects(zoneCount) {
  const count = Math.min(Math.max(zoneCount, 1), 3);
  // the top compartment of a fridge-freezer is the tallest one
  const weights = count === 1 ? [1] : count === 2 ? [1.55, 1] : [1.4, 1, 1];
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const space = BOTTOM - TOP - GAP * (count - 1);
  const rects = [];
  let y = TOP;
  for (const weight of weights) {
    const height = (space * weight) / total;
    rects.push({ y, height });
    y += height + GAP;
  }
  return rects;
}

function compartment(rect, index) {
  const { y, height } = rect;
  const inner = { x: 34, y: y + 22, w: 108, h: height - 36 };
  return `
  <g class="compartment" data-zone="${index}">
    <g class="interior" clip-path="url(#fridge-inner-${index})">
      <rect class="cavity" x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" rx="5"/>
      <rect class="glow" x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" rx="5"/>
      <g class="shelves">
        ${[0.3, 0.56].map((f) => `<rect x="${inner.x + 6}" y="${(inner.y + inner.h * f).toFixed(1)}" width="${inner.w - 12}" height="3" rx="1.5"/>`).join('')}
        <rect class="drawer" x="${inner.x + 6}" y="${(inner.y + inner.h * 0.76).toFixed(1)}"
          width="${inner.w - 12}" height="${(inner.h * 0.2).toFixed(1)}" rx="3"/>
      </g>
      <g class="airflow">
        ${[0.2, 0.45, 0.7].map((f, i) => `<path style="--delay:${i * 0.5}s" d="M${inner.x + 14} ${(inner.y + inner.h * f).toFixed(1)} h${inner.w - 28}"/>`).join('')}
      </g>
      <g class="flakes">
        ${[
          [0.28, 0.18],
          [0.62, 0.12],
          [0.45, 0.42],
          [0.78, 0.3],
        ]
          .map(
            ([fx, fy], i) =>
              `<g transform="translate(${(inner.x + inner.w * fx).toFixed(1)} ${(inner.y + inner.h * fy).toFixed(1)})">
                 <g class="flake" style="--delay:${i * 0.7}s">
                   <path d="M0 -4 V4 M-3.5 -2 L3.5 2 M-3.5 2 L3.5 -2"/>
                 </g>
               </g>`,
          )
          .join('')}
      </g>
    </g>
    <rect class="inner-frame" x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" rx="5"/>
  </g>`;
}

/** The door leaf: hinged on the left, it swings open over the interior. */
function door(rect, index, count) {
  const { y, height } = rect;
  const inner = { x: 34, y: y + 22, w: 108, h: height - 36 };
  const showDisplay = index === 0;
  return `
  <g class="door" data-zone="${index}" style="--hinge-y:${(y + height / 2).toFixed(1)}px">
    <rect class="door-panel" x="22" y="${y}" width="156" height="${height}" rx="8"/>
    <rect class="door-shade" x="22" y="${y}" width="156" height="${height}" rx="8"/>
    <rect class="door-inset" x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" rx="5"/>

    ${
      showDisplay
        ? `<g class="display">
             <rect class="display-body" x="${inner.x}" y="${y + 7}" width="${inner.w}" height="12" rx="3"/>
             <text class="display-text" x="${inner.x + inner.w / 2}" y="${y + 16.4}" text-anchor="middle">--</text>
             <circle class="display-led" cx="${inner.x + 7}" cy="${y + 13}" r="2"/>
           </g>`
        : ''
    }

    <rect class="handle" x="150" y="${y + 12}" width="7" height="${Math.max(24, height - 30)}" rx="3.5"/>
    ${count > 1 && index < count - 1 ? `<path class="seam" d="M22 ${(y + height + GAP / 2).toFixed(1)} H178"/>` : ''}
  </g>`;
}

export function renderFridge(zoneCount = 1) {
  const rects = doorRects(zoneCount);
  const clips = rects
    .map(
      (rect, index) =>
        `<clipPath id="fridge-inner-${index}"><rect x="34" y="${rect.y + 22}" width="108" height="${rect.height - 36}" rx="5"/></clipPath>`,
    )
    .join('');

  return `
<svg class="fridge" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-hidden="true" data-zones="${rects.length}">
  <defs>
    ${clips}
    <linearGradient id="fridge-body" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--fr-body-dark)"/>
      <stop offset=".22" stop-color="var(--fr-body)"/>
      <stop offset=".45" stop-color="var(--fr-body-light)"/>
      <stop offset=".78" stop-color="var(--fr-body)"/>
      <stop offset="1" stop-color="var(--fr-body-dark)"/>
    </linearGradient>
    <linearGradient id="fridge-door-shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#05080b" stop-opacity=".18"/>
      <stop offset=".3" stop-color="#ffffff" stop-opacity=".1"/>
      <stop offset=".65" stop-color="#ffffff" stop-opacity=".02"/>
      <stop offset="1" stop-color="#05080b" stop-opacity=".2"/>
    </linearGradient>
    <linearGradient id="fridge-cavity" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--fr-cavity-light)"/>
      <stop offset="1" stop-color="var(--fr-cavity)"/>
    </linearGradient>
    <radialGradient id="fridge-glow" cx="50%" cy="10%" r="90%">
      <stop offset="0" stop-color="#ffe9b0" stop-opacity=".85"/>
      <stop offset="100%" stop-color="#ffd27a" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse class="shadow" cx="100" cy="258" rx="78" ry="8"/>
  <rect class="cabinet" x="16" y="4" width="168" height="256" rx="11"/>
  ${rects.map((rect, index) => compartment(rect, index)).join('')}
  ${rects.map((rect, index) => door(rect, index, rects.length)).join('')}
  <g class="feet"><rect x="26" y="258" width="14" height="5" rx="2"/><rect x="160" y="258" width="14" height="5" rx="2"/></g>
</svg>`;
}

/** Writes the temperature onto the door display without touching the rest. */
export function updateFridgeDisplay(root, text) {
  const node = root.querySelector('.display-text');
  if (node && node.textContent !== text) node.textContent = text;
}
