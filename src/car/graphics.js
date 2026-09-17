/**
 * The hero illustration: a top view of the estate car, drawn as one SVG.
 *
 * The shape follows a fourth-generation Superb Combi (4902 x 1849 mm): the
 * body bulges over the wheel arches and tapers towards the nose and the tail,
 * the glasshouse is inset, and the paint is shaded with gradients so the roof
 * and the flanks read as curved sheet metal rather than flat rectangles.
 *
 * Every panel that can move is its own group, so a state change only toggles a
 * class: doors swing around their hinge, the bonnet and the tailgate tip up
 * towards their hinge line, and an open window turns red. The illustration is
 * built once, which keeps the CSS animations from restarting on every update.
 */

/** Outer silhouette: widest over the arches, tapered at both ends. */
const BODY =
  'M130 24 C104 24 86 28 72 36 C58 44 48 60 45 80 C42 100 41 120 41 150 '
  + 'C41 220 41 320 41 390 C41 430 43 455 46 468 C49 482 56 492 68 494 '
  + 'C86 497 174 497 192 494 C204 492 211 482 214 468 C217 455 219 430 219 390 '
  + 'C219 320 219 220 219 150 C219 120 218 100 215 80 C212 60 202 44 188 36 '
  + 'C174 28 156 24 130 24 Z';

/** Door geometry plus the hinge each door turns on. */
const DOORS = {
  fl: { x: 41, y: 230, w: 26, h: 76, hinge: [42, 230] },
  rl: { x: 41, y: 308, w: 26, h: 68, hinge: [42, 308] },
  fr: { x: 193, y: 230, w: 26, h: 76, hinge: [218, 230] },
  rr: { x: 193, y: 308, w: 26, h: 68, hinge: [218, 308] },
};

const MIRRORS = {
  fl: {
    arm: 'M43 242 L34 238 Q28 239 28 245 Q28 251 34 251 L43 251 Z',
    glass: 'M41 242 L35 240 Q31 241 31 245 Q31 249 35 249 L41 249 Z',
  },
  fr: {
    arm: 'M217 242 L226 238 Q232 239 232 245 Q232 251 226 251 L217 251 Z',
    glass: 'M219 242 L225 240 Q229 241 229 245 Q229 249 225 249 L219 249 Z',
  },
};

function door(key) {
  const d = DOORS[key];
  const left = key === 'fl' || key === 'rl';
  // the glazing sits inboard of the door skin, where the real glass line runs
  const glassX = left ? d.x + d.w - 9 : d.x + 2;
  const handleX = left ? d.x + 2 : d.x + d.w - 5;
  const mirror = MIRRORS[key]
    ? `<path class="mirror-arm" d="${MIRRORS[key].arm}"/><path class="mirror-glass" d="${MIRRORS[key].glass}"/>`
    : '';
  return `
    <g class="door" data-door="${key}" style="--hinge-x:${d.hinge[0]}px;--hinge-y:${d.hinge[1]}px;">
      <rect class="panel" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="2"/>
      <rect class="panel-shade" x="${d.x}" y="${d.y}" width="${d.w}" height="${d.h}" rx="2"/>
      <rect class="window${key.startsWith('r') ? ' tinted' : ''}" data-window="${key}"
        x="${glassX}" y="${d.y + 7}" width="7" height="${d.h - 14}" rx="2.5"/>
      <rect class="handle" x="${handleX}" y="${d.y + d.h - 30}" width="3" height="13" rx="1.5"/>
      ${mirror}
    </g>`;
}

export function renderCar() {
  return `
<svg class="car" viewBox="0 0 260 528" role="img" aria-hidden="true">
  <defs>
    <clipPath id="car-body"><path d="${BODY}"/></clipPath>

    <!-- body paint: dark at the flanks, a bright shoulder highlight either side -->
    <linearGradient id="car-paint" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--car-edge)"/>
      <stop offset=".06" stop-color="var(--car-dark)"/>
      <stop offset=".18" stop-color="var(--car-light)"/>
      <stop offset=".3" stop-color="var(--car-hi)"/>
      <stop offset=".42" stop-color="var(--car-light)"/>
      <stop offset=".6" stop-color="var(--car-paint)"/>
      <stop offset=".78" stop-color="var(--car-dark)"/>
      <stop offset=".9" stop-color="var(--car-light)"/>
      <stop offset="1" stop-color="var(--car-edge)"/>
    </linearGradient>

    <!-- the nose and the tail curve away from the viewer -->
    <linearGradient id="car-ends" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#05080b" stop-opacity=".38"/>
      <stop offset=".07" stop-color="#05080b" stop-opacity=".06"/>
      <stop offset=".16" stop-color="#05080b" stop-opacity="0"/>
      <stop offset=".84" stop-color="#05080b" stop-opacity="0"/>
      <stop offset=".94" stop-color="#05080b" stop-opacity=".08"/>
      <stop offset="1" stop-color="#05080b" stop-opacity=".34"/>
    </linearGradient>

    <!-- crown of a single panel: brighter along its centre line -->
    <linearGradient id="car-crown" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#05080b" stop-opacity=".2"/>
      <stop offset=".22" stop-color="#05080b" stop-opacity=".03"/>
      <stop offset=".45" stop-color="#ffffff" stop-opacity=".09"/>
      <stop offset=".62" stop-color="#ffffff" stop-opacity=".04"/>
      <stop offset=".82" stop-color="#05080b" stop-opacity=".05"/>
      <stop offset="1" stop-color="#05080b" stop-opacity=".22"/>
    </linearGradient>

    <linearGradient id="car-glass" x1="0" y1="0" x2=".8" y2="1">
      <stop offset="0" stop-color="var(--car-glass-light)"/>
      <stop offset=".55" stop-color="var(--car-glass)"/>
      <stop offset="1" stop-color="var(--car-glass-dark)"/>
    </linearGradient>

    <!-- a soft studio reflection running down the car -->
    <linearGradient id="car-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".26" stop-color="#ffffff" stop-opacity=".22"/>
      <stop offset=".34" stop-color="#ffffff" stop-opacity=".05"/>
      <stop offset=".86" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".95" stop-color="#ffffff" stop-opacity=".12"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <linearGradient id="car-rail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="var(--car-rail-dark)"/>
      <stop offset=".45" stop-color="var(--car-rail)"/>
      <stop offset="1" stop-color="var(--car-rail-dark)"/>
    </linearGradient>

    <linearGradient id="car-headlamp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--car-lamp-hi)"/>
      <stop offset=".55" stop-color="var(--car-lamp)"/>
      <stop offset="1" stop-color="var(--car-lamp-dark)"/>
    </linearGradient>

    <linearGradient id="car-taillamp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e2574c"/>
      <stop offset=".5" stop-color="#c0322a"/>
      <stop offset="1" stop-color="#8e211c"/>
    </linearGradient>

    <filter id="car-shadow" x="-40%" y="-20%" width="180%" height="140%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <filter id="car-contact" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="2.4"/>
    </filter>
  </defs>

  <!-- ground shadow -->
  <ellipse class="shadow" cx="132" cy="268" rx="88" ry="230" filter="url(#car-shadow)"/>
  <path class="contact" d="${BODY}" filter="url(#car-contact)"/>

  <!-- tyres, barely visible under the arches -->
  <g class="tyres">
    <rect x="40" y="94" width="8" height="42" rx="3.5"/>
    <rect x="212" y="94" width="8" height="42" rx="3.5"/>
    <rect x="40" y="366" width="8" height="42" rx="3.5"/>
    <rect x="212" y="366" width="8" height="42" rx="3.5"/>
  </g>

  <g clip-path="url(#car-body)">
    <rect class="paint" x="30" y="10" width="200" height="510"/>

    <!-- bonnet: hinged at the cowl, tips up when open -->
    <rect class="bay" x="56" y="58" width="148" height="116" rx="26"/>
    <g class="lid bonnet">
      <rect class="paint" x="30" y="10" width="200" height="166"/>
      <rect class="crown" x="46" y="10" width="168" height="166"/>
      <path class="gap" d="M64 66 C64 104 62 140 60 172"/>
      <path class="gap" d="M196 66 C196 104 198 140 200 172"/>
      <path class="crease" d="M96 44 C94 82 93 124 93 172"/>
      <path class="crease" d="M164 44 C166 82 167 124 167 172"/>
      <path class="cowl" d="M58 172 L202 172"/>

      <!-- nose: grille between the wrap-around headlamps -->
      <path class="bumper" d="M48 74 C62 46 92 32 130 32 C168 32 198 46 212 74"/>
      <g class="grille">
        <path class="grille-body" d="M92 28 C110 25 150 25 168 28 L172 42 C150 38 110 38 88 42 Z"/>
        <path class="grille-frame" d="M92 28 C110 25 150 25 168 28 L172 42 C150 38 110 38 88 42 Z"/>
        <path class="grille-slats" d="M100 28 L98 41 M112 27 L111 40 M124 26.5 L124 39.5
          M136 26.5 L136 39.5 M148 27 L149 40 M160 28 L162 41"/>
      </g>
      <g class="lamp head left">
        <path class="lens" d="M52 60 C60 44 74 36 92 33 L98 47 C84 50 72 57 64 70 Z"/>
        <path class="led" d="M58 60 C66 47 76 42 92 39"/>
      </g>
      <g class="lamp head right">
        <path class="lens" d="M208 60 C200 44 186 36 168 33 L162 47 C176 50 188 57 196 70 Z"/>
        <path class="led" d="M202 60 C194 47 184 42 168 39"/>
      </g>
    </g>

    <!-- tailgate: glass and all, hinged at the roof -->
    <rect class="bay" x="58" y="366" width="144" height="118" rx="20"/>
    <g class="lid trunk">
      <rect class="paint" x="30" y="352" width="200" height="168"/>
      <rect class="crown" x="46" y="352" width="168" height="168"/>
      <path class="glass rear-window tinted" d="M74 356 L186 356 L196 436 L64 436 Z"/>
      <path class="glass-hi" d="M88 360 L118 360 L104 432 L78 432 Z"/>
      <path class="chrome" d="M74 356 L186 356 L196 436 L64 436 Z"/>
      <path class="gap" d="M58 444 C88 438 172 438 202 444"/>
      <path class="trim" d="M96 452 L164 452"/>
      <rect class="plate" x="106" y="458" width="48" height="13" rx="2"/>
      <path class="bumper" d="M56 478 C86 486 174 486 204 478"/>
      <g class="lamp tail left">
        <path class="lens" d="M42 434 C54 434 66 436 72 438 L72 450 C64 448 52 447 42 447 Z"/>
        <path class="lens-inner" d="M50 437 C58 437 64 438 69 440 L69 445 C63 443 56 442 50 442 Z"/>
      </g>
      <g class="lamp tail right">
        <path class="lens" d="M218 434 C206 434 194 436 188 438 L188 450 C196 448 208 447 218 447 Z"/>
        <path class="lens-inner" d="M210 437 C202 437 196 438 191 440 L191 445 C197 443 204 442 210 442 Z"/>
      </g>
    </g>

    <!-- door openings, revealed when a door swings out -->
    <rect class="aperture" x="41" y="230" width="26" height="76" rx="3"/>
    <rect class="aperture" x="41" y="308" width="26" height="68" rx="3"/>
    <rect class="aperture" x="193" y="230" width="26" height="76" rx="3"/>
    <rect class="aperture" x="193" y="308" width="26" height="68" rx="3"/>

    <!-- glasshouse -->
    <path class="glass windscreen" d="M62 176 L198 176 L192 232 L68 232 Z"/>
    <path class="glass-hi" d="M78 180 L112 180 L98 229 L72 229 Z"/>
    <path class="chrome" d="M62 176 L198 176 L192 232 L68 232 Z"/>
    <path class="wiper" d="M84 228 C96 216 106 208 116 202"/>
    <path class="wiper" d="M124 228 C136 216 146 208 156 202"/>

    <path class="roof" d="M68 232 L192 232 L188 352 L72 352 Z"/>
    <rect class="crown roof-crown" x="68" y="232" width="124" height="120"/>
    <path class="rail" d="M75 244 L73 342"/>
    <path class="rail" d="M185 244 L187 342"/>
    <path class="antenna" d="M130 326 C128.6 334 127.4 342 126.6 351 C129 350 131 350 133.4 351 C132.6 342 131.4 334 130 326 Z"/>
    <path class="gap" d="M72 352 L188 352"/>

    <!-- shoulder lines down the flanks -->
    <path class="shoulder" d="M46 180 C43 200 42 214 42 228"/>
    <path class="shoulder" d="M214 180 C217 200 218 214 218 228"/>
    <path class="shoulder" d="M42 378 C42 402 44 430 47 452"/>
    <path class="shoulder" d="M218 378 C218 402 216 430 213 452"/>
    <circle class="filler" cx="210" cy="356" r="6"/>

    <rect class="sheen" x="30" y="10" width="200" height="510"/>
    <rect class="curve" x="30" y="10" width="200" height="510"/>
  </g>

  <path class="outline" d="${BODY}"/>

  ${Object.keys(DOORS).map(door).join('')}

  <!-- sunroof marker, only drawn when the car reports one -->
  <rect class="sunroof" x="92" y="244" width="76" height="86" rx="10"/>
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
