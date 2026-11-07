// ============================================================
// Eclipse System — shared utilities
// ============================================================

export const TAU = Math.PI * 2;
export const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const invLerp = (a, b, v) => (v - a) / (b - a || 1);
export const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
export const dist2 = (x1, y1, x2, y2) => {
  const dx = x2 - x1, dy = y2 - y1;
  return dx * dx + dy * dy;
};
export const angleTo = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
export const normAngle = (a) => {
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
};
export const lerpAngle = (a, b, t) => a + normAngle(b - a) * t;
export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInCubic = (t) => t * t * t;
export const easeOutQuad = (t) => t * (2 - t);
export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const smoothstep = (t) => t * t * (3 - 2 * t);

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let _seedCounter = 1;
export function seedRandom(seed) {
  return mulberry32(seed);
}
export function randomSeed() {
  return (Math.random() * 0xffffffff) >>> 0;
}
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
export const chance = (p) => Math.random() < p;
export const pick = (arr, rng = Math.random) => arr[Math.floor(rng() * arr.length)];
export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function weightedPick(entries, rng = Math.random) {
  let total = 0;
  for (const e of entries) total += e.weight;
  let r = rng() * total;
  for (const e of entries) {
    r -= e.weight;
    if (r <= 0) return e.value;
  }
  return entries[entries.length - 1].value;
}

// deterministic 2D hash in [0,1)
export function hash2(x, y, seed = 0) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
export function valueNoise(x, y, seed = 0) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = smoothstep(xf), v = smoothstep(yf);
  const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
export function fbm(x, y, seed = 0, octaves = 4) {
  let value = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    value += valueNoise(x * freq, y * freq, seed + i * 31) * amp;
    amp *= 0.5;
    freq *= 2;
  }
  return value;
}

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return c;
}

export function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}
export function pxl(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
}

export function shade(hex, amt) {
  const h = hex.replace('#', '');
  const num = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  if (amt >= 0) {
    r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt;
  } else {
    r *= 1 + amt; g *= 1 + amt; b *= 1 + amt;
  }
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
}

export function hexToRgba(hex, a = 1) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function fmt(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e4) return (n / 1e3).toFixed(1) + 'K';
  return String(Math.floor(n));
}

export function roman(n) {
  const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '';
  for (const [v, r] of map) while (n >= v) { s += r; n -= v; }
  return s;
}

export function formatTime(t) {
  const total = ((t % 1) + 1) % 1;
  const hours = Math.floor(total * 24);
  const mins = Math.floor((total * 24 - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function timeLabel(t) {
  const h = (((t % 1) + 1) % 1) * 24;
  if (h < 5) return 'DEAD OF NIGHT';
  if (h < 8) return 'DAWN';
  if (h < 12) return 'MORNING';
  if (h < 16) return 'AFTERNOON';
  if (h < 19) return 'DUSK';
  if (h < 22) return 'NIGHTFALL';
  return 'NIGHT';
}

export function dayCount(t, startDay = 1) {
  return startDay + Math.floor(t);
}

export function emitName() {
  const first = ['Kael', 'Nyx', 'Ashen', 'Vale', 'Riven', 'Sable', 'Orin', 'Mira', 'Thane', 'Eira', 'Lucan', 'Sera', 'Dain', 'Yara', 'Corvin', 'Ilya', 'Mael', 'Rhea'];
  const last = ['Vex', 'Duskbane', 'Ferrow', 'Nightsong', 'Harrow', 'Vayne', 'Ashfall', 'Wren', 'Morne', 'Sol', 'Drift', 'Grey', 'Thorn', 'Vale', 'Umber'];
  return pick(first) + ' ' + pick(last);
}

export function shortNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(Math.round(n));
}

export function clamp01(v) { return clamp(v, 0, 1); }

export function poly(ctx, points) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
  ctx.closePath();
}

export function withinCone(px_, py_, cx, cy, dir, range, halfAngle) {
  const d = dist(px_, py_, cx, cy);
  if (d > range) return false;
  const a = angleTo(cx, cy, px_, py_);
  return Math.abs(normAngle(a - dir)) <= halfAngle;
}
