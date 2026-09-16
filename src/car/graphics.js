/**
 * The hero illustration: a top view of an estate car (Superb Combi proportions,
 * 4902 x 1849 mm) drawn as one SVG.
 *
 * Every panel that can move lives in its own group so the card can toggle a
 * class instead of re-rendering: doors swing around their hinge, the bonnet and
 * the tailgate tip up towards their hinge line, and the window of an open
 * window turns red. The illustration is built once, which keeps the CSS
 * animations from restarting on every state update.
 */

const BODY =
  'M66 44 C56 56 50 74 46 96 L41 150 C38 205 38 300 41 356 L45 420 '
  + 'C47 442 52 456 62 462 L68 464 L172 464 L178 462 C188 456 193 442 195 420 '
  + 'L199 356 C202 300 202 205 199 150 L194 96 C190 74 184 56 174 44 '
  + 'C166 34 150 28 120 28 C90 28 74 34 66 44 Z';

/** Door geometry: `[x, y, width, height]` plus the hinge the door turns on. */
const DOORS = {
  fl: { x: 33, y: 202, w: 22, h: 70, hinge: [34, 202] },
  rl: { x: 33, y: 274, w: 22, h: 62, hinge: [34, 274] },
  fr: { x: 185, y: 202, w: 22, h: 70, hinge: [206, 202] },
  rr: { x: 185, y: 274, w: 22, h: 62, hinge: [206, 274] },
};

const MIRRORS = {
  fl: 'M34 212 L20 206 Q13 208 14 215 Q15 222 22 222 L34 222 Z',
  fr: 'M206 212 L220 206 Q227 208 226 215 Q225 222 218 222 L206 222 Z',
};

const MIRROR_GLASS = {
  fl: 'M32 211 L21 207 Q16 209 17 214 Q18 219 23 219 L32 219 Z',
  fr: 'M208 211 L219 207 Q224 209 223 214 Q222 219 217 219 L208 219 Z',
};

function door(key) {
  const d = DOORS[key];
  const left = key === 'fl' || key === 'rl';
  const handleX = left ? d.x + 1.5 : d.x + d.w - 4.5;
  const mirror = MIRRORS[key]
    ? `<path class="mirror" d="${MIRRORS[key]}"/><path class="mirror-glass" d="${MIRROR_GLASS[key]}"/>`
    : '';
  return `
    <g class="door" data-door="${key}" style="--hinge-x:${d.hinge[0]}px;--hinge-y:${d.hinge[1]}px;">
      <rect class="panel" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="5"/>
      <rect class="window" data-window="${key}" x="${d.x + 4}" y="${d.y + 9}"
        width="${d.w - 8}" height="${d.h - 18}" rx="3"/>
      <rect class="handle" x="${handleX}" y="${d.y + d.h - 26}" width="3" height="11" rx="1.5"/>
      ${mirror}
    </g>`;
}

export function renderCar() {
  return `
<svg class="car" viewBox="-28 6 296 486" role="img" aria-hidden="true">
  <defs>
    <clipPath id="car-body"><path d="${BODY}"/></clipPath>
    <linearGradient id="car-paint" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--car-paint-dark)"/>
      <stop offset=".34" stop-color="var(--car-paint)"/>
      <stop offset=".58" stop-color="var(--car-paint-light)"/>
      <stop offset="1" stop-color="var(--car-paint-dark)"/>
    </linearGradient>
    <linearGradient id="car-glass" x1="0" y1="0" x2=".85" y2="1">
      <stop offset="0" stop-color="var(--car-glass-light)"/>
      <stop offset="1" stop-color="var(--car-glass)"/>
    </linearGradient>
    <linearGradient id="car-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".45" stop-color="#fff" stop-opacity=".30"/>
      <stop offset=".7" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <ellipse class="shadow" cx="120" cy="250" rx="92" ry="216"/>

  <g class="tyres">
    <rect x="37" y="100" width="11" height="46" rx="5"/>
    <rect x="192" y="100" width="11" height="46" rx="5"/>
    <rect x="37" y="340" width="11" height="46" rx="5"/>
    <rect x="192" y="340" width="11" height="46" rx="5"/>
  </g>

  <g clip-path="url(#car-body)">
    <rect class="paint" x="20" y="10" width="200" height="478"/>

    <!-- bonnet: hinged at the windscreen, tips up when open -->
    <rect class="bay" x="32" y="18" width="176" height="132" rx="22"/>
    <g class="lid bonnet">
      <rect class="paint" x="20" y="10" width="200" height="142"/>
      <rect class="grille" x="86" y="20" width="68" height="9" rx="4"/>
      <path class="seam bumper" d="M44 62 C72 44 168 44 196 62"/>
      <path class="seam" d="M64 58 L61 148 M176 58 L179 148"/>
      <path class="seam" d="M120 40 L120 150" />
      <g class="lamp head left">
        <rect class="lens" x="50" y="34" width="46" height="15" rx="7"/>
        <rect class="led" x="54" y="46" width="38" height="3" rx="1.5"/>
      </g>
      <g class="lamp head right">
        <rect class="lens" x="144" y="34" width="46" height="15" rx="7"/>
        <rect class="led" x="148" y="46" width="38" height="3" rx="1.5"/>
      </g>
    </g>

    <!-- tailgate: hinged at the roof, tips up when open -->
    <rect class="bay" x="32" y="358" width="176" height="100" rx="18"/>
    <g class="lid trunk">
      <rect class="paint" x="20" y="356" width="200" height="132"/>
      <path class="seam" d="M48 406 C72 400 168 400 192 406"/>
      <path class="seam bumper" d="M46 452 C74 458 166 458 194 452"/>
      <g class="lamp tail left">
        <rect class="lens" x="42" y="428" width="46" height="14" rx="6"/>
      </g>
      <g class="lamp tail right">
        <rect class="lens" x="152" y="428" width="46" height="14" rx="6"/>
      </g>
      <rect class="plate" x="97" y="440" width="46" height="13" rx="2"/>
    </g>

    <!-- the openings the doors leave behind when they swing out -->
    <rect class="aperture" x="33" y="202" width="22" height="70" rx="5"/>
    <rect class="aperture" x="33" y="274" width="22" height="62" rx="5"/>
    <rect class="aperture" x="185" y="202" width="22" height="70" rx="5"/>
    <rect class="aperture" x="185" y="274" width="22" height="62" rx="5"/>

    <!-- glazing -->
    <path class="glass windscreen" d="M46 154 L194 154 L178 204 L62 204 Z"/>
    <path class="wiper" d="M70 200 L104 184 M112 200 L146 184"/>
    <rect class="roof" x="58" y="204" width="124" height="104" rx="12"/>
    <rect class="glass sunroof-glass" x="78" y="212" width="84" height="84" rx="9"/>
    <rect class="rail" x="58" y="208" width="9" height="96" rx="4.5"/>
    <rect class="rail" x="173" y="208" width="9" height="96" rx="4.5"/>
    <path class="antenna" d="M120 302 Q115 316 113 326 L127 326 Q125 316 120 302 Z"/>
    <path class="seam spoiler" d="M58 308 L182 308"/>
    <path class="glass rear-window" d="M60 310 L180 310 L190 354 L50 354 Z"/>
    <path class="seam" d="M33 338 L207 338"/>
    <circle class="filler" cx="196" cy="322" r="6"/>
    <rect class="sheen" x="20" y="10" width="200" height="478"/>
  </g>

  <path class="outline" d="${BODY}"/>

  ${Object.keys(DOORS).map(door).join('')}

  <!-- sunroof marker, only shown when the car reports one -->
  <rect class="sunroof" x="78" y="212" width="84" height="84" rx="9"/>
</svg>`;
}

/** Applies the model to the illustration without rebuilding it. */
export function updateCar(root, model) {
  const svg = root.querySelector('.car');
  if (!svg) return;

  const flag = (node, name, on) => {
    if (node) node.classList.toggle(name, !!on);
  };

  for (const [key, open] of Object.entries(model.doors)) {
    flag(svg.querySelector(`[data-door="${key}"]`), 'open', open);
  }
  for (const [key, open] of Object.entries(model.windows)) {
    flag(svg.querySelector(`[data-window="${key}"]`), 'open', open);
  }
  flag(svg.querySelector('.bonnet'), 'open', model.bonnet);
  flag(svg.querySelector('.trunk'), 'open', model.trunk);

  const sunroof = svg.querySelector('.sunroof');
  flag(sunroof, 'visible', model.sunroof !== null);
  flag(sunroof, 'open', model.sunroof);

  svg.classList.toggle('lights-on', !!model.lights);
  svg.classList.toggle('offline', !!model.offline);
}
