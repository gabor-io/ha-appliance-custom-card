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
  'M66 30 C55 39 48 52 45 70 L43 140 C39 200 39 300 42 356 L46 420 '
  + 'C48 444 56 458 70 463 L170 463 C184 458 192 444 194 420 L198 356 '
  + 'C201 300 201 200 197 140 L195 70 C192 52 185 39 174 30 '
  + 'C169 26 166 23 160 23 L80 23 C74 23 71 26 66 30 Z';

/** Door geometry: `[x, y, width, height]` plus the hinge the door turns on. */
const DOORS = {
  fl: { x: 39, y: 202, w: 21, h: 70, hinge: [40, 202] },
  rl: { x: 39, y: 274, w: 21, h: 62, hinge: [40, 274] },
  fr: { x: 180, y: 202, w: 21, h: 70, hinge: [200, 202] },
  rr: { x: 180, y: 274, w: 21, h: 62, hinge: [200, 274] },
};

const MIRRORS = {
  fl: 'M40 211 L29 206 Q23 208 24 214 Q25 220 30 220 L40 220 Z',
  fr: 'M200 211 L211 206 Q217 208 216 214 Q215 220 210 220 L200 220 Z',
};

const MIRROR_GLASS = {
  fl: 'M38.5 210 L30 207 Q26 209 27 213 Q28 217 31 217 L38.5 217 Z',
  fr: 'M201.5 210 L210 207 Q214 209 213 213 Q212 217 209 217 L201.5 217 Z',
};

function door(key) {
  const d = DOORS[key];
  const left = key === 'fl' || key === 'rl';
  // the glazing sits inboard of the door skin, so it hugs the cabin side
  const handleX = left ? d.x + 1.5 : d.x + d.w - 4.5;
  const mirror = MIRRORS[key]
    ? `<path class="mirror" d="${MIRRORS[key]}"/><path class="mirror-glass" d="${MIRROR_GLASS[key]}"/>`
    : '';
  return `
    <g class="door" data-door="${key}" style="--hinge-x:${d.hinge[0]}px;--hinge-y:${d.hinge[1]}px;">
      <rect class="panel" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="2.5"/>
      <rect class="window${key.startsWith('r') ? ' tinted' : ''}" data-window="${key}"
        x="${left ? d.x + d.w - 10 : d.x + 2}" y="${d.y + 8}" width="8" height="${d.h - 16}" rx="3"/>
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
      <stop offset=".45" stop-color="#fff" stop-opacity=".26"/>
      <stop offset=".7" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <ellipse class="shadow" cx="120" cy="250" rx="90" ry="214"/>

  <g class="tyres">
    <rect x="41" y="104" width="9" height="40" rx="4"/>
    <rect x="190" y="104" width="9" height="40" rx="4"/>
    <rect x="41" y="342" width="9" height="40" rx="4"/>
    <rect x="190" y="342" width="9" height="40" rx="4"/>
  </g>

  <g clip-path="url(#car-body)">
    <rect class="paint" x="24" y="10" width="192" height="478"/>

    <!-- bonnet: hinged at the windscreen, tips up when open -->
    <rect class="bay" x="48" y="46" width="144" height="104" rx="20"/>
    <g class="lid bonnet">
      <rect class="paint" x="24" y="10" width="192" height="142"/>
      <rect class="grille" x="84" y="21" width="72" height="9" rx="4"/>
      <path class="seam bumper" d="M47 62 C72 38 168 38 193 62"/>
      <path class="seam crease" d="M80 42 C74 76 69 110 65 148 M160 42 C166 76 171 110 175 148"/>
      <path class="seam crease" d="M104 36 C102 74 101 112 101 150 M136 36 C138 74 139 112 139 150"/>
      <g class="lamp head left">
        <path class="lens" d="M52 38 L96 30 Q100 30 100 34 L100 43 Q100 47 96 47 L56 53 Q52 53 51 49 L50 42 Q49 39 52 38 Z"/>
        <path class="led" d="M56 47 L97 39"/>
      </g>
      <g class="lamp head right">
        <path class="lens" d="M188 38 L144 30 Q140 30 140 34 L140 43 Q140 47 144 47 L184 53 Q188 53 189 49 L190 42 Q191 39 188 38 Z"/>
        <path class="led" d="M184 47 L143 39"/>
      </g>
    </g>

    <!-- tailgate: glass and all, hinged at the roof, tips up when open -->
    <rect class="bay" x="52" y="338" width="136" height="108" rx="16"/>
    <g class="lid trunk">
      <rect class="paint" x="24" y="324" width="192" height="164"/>
      <path class="glass rear-window tinted" d="M68 326 L172 326 L184 414 L56 414 Z"/>
      <path class="seam" d="M52 422 C76 416 164 416 188 422"/>
      <path class="trim" d="M90 432 L150 432"/>
      <rect class="plate" x="97" y="440" width="46" height="12" rx="2"/>
      <path class="seam bumper" d="M50 456 C76 460 164 460 190 456"/>
      <g class="lamp tail left">
        <path class="lens" d="M43 414 L74 418 Q78 419 78 422 L78 428 Q78 432 74 432 L45 434 Q41 434 40 430 L39.5 419 Q39.5 415 43 414 Z"/>
      </g>
      <g class="lamp tail right">
        <path class="lens" d="M197 414 L166 418 Q162 419 162 422 L162 428 Q162 432 166 432 L195 434 Q199 434 200 430 L200.5 419 Q200.5 415 197 414 Z"/>
      </g>
    </g>

    <!-- the openings the doors leave behind when they swing out -->
    <rect class="aperture" x="39" y="202" width="21" height="70" rx="2.5"/>
    <rect class="aperture" x="39" y="274" width="21" height="62" rx="2.5"/>
    <rect class="aperture" x="180" y="202" width="21" height="70" rx="2.5"/>
    <rect class="aperture" x="180" y="274" width="21" height="62" rx="2.5"/>

    <!-- glazing -->
    <path class="glass windscreen" d="M52 154 L188 154 L177 202 L63 202 Z"/>
    <path class="wiper" d="M74 198 L104 184 M114 198 L144 184"/>
    <path class="roof" d="M63 202 L177 202 L172 322 L68 322 Z"/>
    <path class="rail" d="M68 208 L65 316"/>
    <path class="rail" d="M172 208 L175 316"/>
    <path class="antenna" d="M120 298 Q115 310 113 320 L127 320 Q125 310 120 298 Z"/>
    <path class="seam spoiler" d="M66 322 L174 322"/>
    <path class="seam" d="M39 338 L201 338"/>
    <path class="seam shoulder" d="M46 158 C42 176 41 190 41 202 M194 158 C198 176 199 190 199 202"/>
    <path class="seam shoulder" d="M41 338 C41 366 43 396 46 418 M199 338 C199 366 197 396 194 418"/>
    <circle class="filler" cx="192" cy="322" r="6"/>
    <rect class="sheen" x="24" y="10" width="192" height="478"/>
  </g>

  <path class="outline" d="${BODY}"/>

  ${Object.keys(DOORS).map(door).join('')}

  <!-- sunroof marker, only shown when the car reports one -->
  <rect class="sunroof" x="80" y="214" width="80" height="80" rx="9"/>
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
