// ============================================================
// Eclipse System — hero, NPC and portrait pixel art
// ============================================================
import { makeCanvas, pxl, shade } from '../utils.js';

export const FRAMES = 9;

function R(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }

const SKIN = '#c99573';
const SKIN_DARK = '#a47354';
const SKIN_LIGHT = '#e0b38b';
const LEATHER = '#3b4761';
const LEATHER_DARK = '#252d41';
const LEATHER_LIGHT = '#4b5b7c';
const BOOT = '#241f27';
const BOOT_LIGHT = '#3a3340';
const GOLD = '#d6ac5b';

function hairPixels(g, style, col, dir, frame) {
  const dark = shade(col, -0.4);
  const light = shade(col, 0.22);
  if (style === 0) { // shorn
    R(g, 10, 5, 8, 3, col); R(g, 9, 6, 10, 2, col);
    R(g, 9, 7, 2, 3, dark); R(g, 17, 7, 2, 3, dark);
    R(g, 10, 5, 5, 1, light);
    if (dir === 'down') { R(g, 10, 8, 8, 1, dark); }
  } else if (style === 1) { // nomad
    R(g, 9, 4, 10, 4, col); R(g, 8, 6, 12, 3, col);
    R(g, 8, 7, 2, 6, dark); R(g, 18, 7, 2, 6, dark);
    R(g, 10, 4, 6, 1, light); R(g, 8, 8, 1, 4, col);
    if (dir === 'down') { R(g, 10, 8, 3, 2, col); R(g, 15, 7, 3, 2, col); }
    if (dir === 'up') { R(g, 9, 8, 10, 7, col); R(g, 10, 9, 8, 5, dark); R(g, 10, 9, 6, 1, light); }
    if (dir === 'side') { R(g, 9, 8, 5, 5, col); }
  } else if (style === 2) { // raven long
    R(g, 8, 4, 12, 5, col); R(g, 7, 6, 14, 3, col);
    R(g, 7, 8, 3, 12, dark); R(g, 18, 8, 3, 12, dark);
    R(g, 9, 4, 8, 1, light);
    R(g, 8, 7, 1, 9, col); R(g, 19, 7, 1, 9, col);
    if (dir === 'down') { R(g, 9, 8, 4, 2, col); R(g, 16, 7, 3, 2, col); }
    if (dir === 'up') { R(g, 8, 8, 12, 12, col); R(g, 9, 9, 10, 9, dark); R(g, 10, 9, 7, 1, light); R(g, 11, 12, 2, 8, col); }
    if (dir === 'side') { R(g, 8, 8, 4, 10, col); R(g, 9, 12, 2, 7, dark); }
  } else { // veiled hood
    const hood = shade('#3b2a4f', 0.1);
    R(g, 8, 3, 12, 10, hood);
    R(g, 7, 6, 14, 8, hood);
    R(g, 9, 5, 10, 6, '#191426');
    R(g, 10, 6, 8, 4, '#0c0a14');
    R(g, 12, 9, 1, 1, '#8ef0ff'); R(g, 16, 9, 1, 1, '#8ef0ff');
    R(g, 8, 4, 5, 1, shade(hood, 0.25));
    R(g, 7, 12, 2, 9, shade(hood, -0.2));
    R(g, 19, 12, 2, 9, shade(hood, -0.2));
    if (dir === 'up') { R(g, 8, 9, 12, 10, hood); R(g, 9, 10, 10, 8, shade(hood, -0.28)); }
  }
}

function bodyBase(g, app, dir, bob, attackT) {
  const cloak = app.cloakColor || '#25324d';
  const cloakDark = shade(cloak, -0.3);
  const cloakLight = shade(cloak, 0.22);
  const hood = app.hair === 3;
  // cape / cloak volume
  if (dir === 'up') {
    R(g, 6, 17 + bob, 16, 15, cloakDark);
    R(g, 7, 17 + bob, 14, 13, cloak);
    R(g, 8, 18 + bob, 5, 11, cloakLight);
    R(g, 8, 31 + bob, 12, 2, cloakDark);
    // folds
    R(g, 10, 22 + bob, 1, 8, cloakDark); R(g, 17, 21 + bob, 1, 9, cloakDark);
  } else {
    R(g, 5, 17 + bob, 18, 13, cloakDark);
    R(g, 6, 18 + bob, 4, 12, cloak);
    R(g, 18, 18 + bob, 4, 12, cloak);
    R(g, 7, 18 + bob, 1, 10, cloakLight);
    R(g, 6, 29 + bob, 4, 2, cloakDark); R(g, 18, 29 + bob, 4, 2, cloakDark);
  }
  // torso tunic
  if (dir === 'side') {
    R(g, 10, 17 + bob, 8, 11, LEATHER);
    R(g, 11, 18 + bob, 5, 9, LEATHER_LIGHT);
    R(g, 15, 18 + bob, 3, 8, LEATHER_DARK);
    R(g, 10, 26 + bob, 8, 2, '#1f2433');
  } else {
    R(g, 9, 17 + bob, 10, 11, LEATHER);
    R(g, 10, 18 + bob, 3, 8, LEATHER_LIGHT);
    R(g, 16, 18 + bob, 3, 8, LEATHER_DARK);
    R(g, 9, 26 + bob, 10, 2, '#1f2433');
  }
  // belt
  R(g, 8, 25 + bob, 12, 2, '#2a2017');
  R(g, 8, 25 + bob, 12, 1, '#59442a');
  R(g, 13, 25 + bob, 2, 2, GOLD);
  if (hood) {
    R(g, 7, 17 + bob, 3, 12, cloakDark); R(g, 18, 17 + bob, 3, 12, cloakDark);
  }
  return { cloak, cloakDark, cloakLight, hood };
}

function drawLegs(g, dir, frame, bob) {
  const walking = frame >= 2 && frame <= 5;
  let a = 0, b = 0, liftA = 0, liftB = 0;
  if (walking) {
    const w = [1, 0, -1, 0][frame - 2];
    a = w; b = -w; liftA = w > 0 ? -1 : 0; liftB = w < 0 ? -1 : 0;
  }
  if (frame >= 6) { a = -1; b = 1; }
  const legY = 26 + bob;
  if (dir === 'side') {
    R(g, 10 + a, legY, 4, 8 + liftA, '#2b3142');
    R(g, 11 + a, legY, 2, 7, '#3b4359');
    R(g, 10 + b, legY + 1, 4, 7 + liftB, '#232838');
    R(g, 9 + a, 34 + liftA, 6, 4, BOOT);
    R(g, 10 + a, 34 + liftA, 4, 1, BOOT_LIGHT);
    R(g, 9 + b, 34 + liftB, 6, 4, '#1d1a22');
    R(g, 10 + b, 34 + liftB, 4, 1, '#322d38');
  } else {
    R(g, 9 + a, legY, 4, 8 + liftA, '#2b3142');
    R(g, 10 + a, legY, 2, 7, '#3b4359');
    R(g, 15 + b, legY, 4, 8 + liftB, '#232838');
    R(g, 16 + b, legY, 2, 7, '#333a4e');
    R(g, 8 + a, 34 + liftA, 6, 4, BOOT);
    R(g, 9 + a, 34 + liftA, 4, 1, BOOT_LIGHT);
    R(g, 15 + b, 34 + liftB, 6, 4, '#1d1a22');
    R(g, 16 + b, 34 + liftB, 4, 1, '#322d38');
  }
}

function drawArms(g, dir, frame, bob, cloak) {
  const lc = shade(cloak, 0.05);
  if (frame >= 6) {
    const t = frame - 6; // 0,1,2
    if (dir === 'down') {
      R(g, 5, 18 + bob, 3, 7, lc);
      R(g, 20, 18 + bob, 3, 6, lc);
      R(g, 6, 24 + bob + t, 3, 3, SKIN);
      R(g, 19, 23 + bob + t, 3, 3, SKIN_DARK);
    } else if (dir === 'up') {
      R(g, 5, 19 + bob, 3, 6, lc);
      R(g, 20, 18 + bob, 3, 7, lc);
      R(g, 6, 18 + bob - t, 3, 3, SKIN_DARK);
      R(g, 19, 18 + bob - t, 3, 3, SKIN);
    } else {
      R(g, 9, 18 + bob, 3, 6, lc);
      R(g, 16, 18 + bob, 7, 3, lc);
      R(g, 22 + t, 18 + bob, 3, 3, SKIN);
    }
    return;
  }
  if (dir === 'up') {
    R(g, 5, 18 + bob, 3, 8, lc); R(g, 20, 18 + bob, 3, 8, lc);
    R(g, 6, 26 + bob, 2, 2, SKIN_DARK); R(g, 20, 26 + bob, 2, 2, SKIN_DARK);
  } else if (dir === 'side') {
    R(g, 8, 18 + bob, 3, 8, lc);
    R(g, 16, 18 + bob, 3, 6, lc);
    R(g, 19, 22 + bob, 2, 2, SKIN);
  } else {
    R(g, 5, 18 + bob, 3, 7, lc); R(g, 20, 18 + bob, 3, 7, lc);
    R(g, 6, 24 + bob, 2, 2, SKIN); R(g, 20, 24 + bob, 2, 2, SKIN_DARK);
  }
}

function drawHead(g, app, dir, frame, bob) {
  const y = 5 + bob;
  const skin = SKIN, skinL = SKIN_LIGHT, skinD = SKIN_DARK;
  // neck
  R(g, 12, 14 + bob, 4, 3, skinD);
  if (dir === 'side') {
    R(g, 10, 6 + bob, 8, 9, skin);
    R(g, 11, 6 + bob, 6, 2, skinL);
    R(g, 10, 12 + bob, 8, 3, skinD);
    // ear
    R(g, 9, 10 + bob, 2, 3, skinD);
    // jaw / nose
    R(g, 18, 10 + bob, 1, 2, skin);
    R(g, 17, 12 + bob, 1, 1, skinD);
    // eye
    if (app.hair !== 3) {
      R(g, 15, 9 + bob, 2, 1, '#f1e5da');
      R(g, 16, 9 + bob, 1, 1, '#2a2a35');
      R(g, 15, 8 + bob, 2, 1, '#3c2f2d');
    }
    // mouth
    R(g, 16, 13 + bob, 2, 1, '#8b5748');
  } else {
    R(g, 9, 6 + bob, 10, 10, skin);
    R(g, 10, 5 + bob, 8, 11, skin);
    R(g, 10, 6 + bob, 3, 3, skinL);
    R(g, 17, 8 + bob, 2, 6, skinD);
    R(g, 10, 14 + bob, 8, 2, skinD);
    // ears
    R(g, 8, 10 + bob, 1, 2, skinD); R(g, 19, 10 + bob, 1, 2, skinD);
    if (app.hair !== 3) {
      if (dir === 'down') {
        R(g, 11, 10 + bob, 2, 1, '#f1e5da');
        R(g, 12, 10 + bob, 1, 1, '#23232e');
        R(g, 15, 10 + bob, 2, 1, '#f1e5da');
        R(g, 16, 10 + bob, 1, 1, '#23232e');
        R(g, 10, 9 + bob, 3, 1, '#3c2f2d');
        R(g, 15, 9 + bob, 3, 1, '#3c2f2d');
        R(g, 13, 12 + bob, 2, 1, skinD);
        R(g, 12, 13 + bob, 4, 1, '#8b5748');
      } else {
        // back of head
        R(g, 10, 11 + bob, 8, 3, skinD);
      }
    }
  }
}

function drawHeroFrame(app, dir, frame) {
  const c = makeCanvas(28, 40), g = c.getContext('2d');
  const idle1 = frame === 1;
  const walk = frame >= 2 && frame <= 5;
  const bob = idle1 ? 1 : walk && (frame === 3 || frame === 5) ? -1 : 0;
  bodyBase(g, app, dir, bob, frame);
  drawLegs(g, dir, frame, bob);
  drawArms(g, dir, frame, bob, app.cloakColor || '#25324d');
  drawHead(g, app, dir, frame, bob);
  hairPixels(g, app.hair ?? 0, app.hairColor || '#2b2533', dir, frame);
  // subtle ambient rim
  const rim = 'rgba(120,190,255,.18)';
  if (dir !== 'up') {
    pxl(g, 9, 5 + bob, rim); pxl(g, 8, 6 + bob, rim);
  }
  // cloak fur trim
  R(g, 8, 16 + bob, 2, 1, '#6a7288');
  R(g, 18, 16 + bob, 2, 1, '#6a7288');
  return c;
}

export function buildHeroSprites(app) {
  const dirs = { down: [], up: [], side: [] };
  for (const d of Object.keys(dirs)) {
    for (let f = 0; f < FRAMES; f++) dirs[d].push(drawHeroFrame(app, d, f));
  }
  return dirs;
}

// ------------------------------------------------------------
// NPC appearance + special silhouettes (small variations)
// ------------------------------------------------------------
export const NPC_LOOKS = {
  elder: { hair: 2, hairColor: '#c9c2b8', cloakColor: '#4a3d68', skin: '#b88968' },
  smith: { hair: 0, hairColor: '#3a2a20', cloakColor: '#5a3a2a', skin: '#a86e4e', beard: true },
  merchant: { hair: 1, hairColor: '#7f2d2d', cloakColor: '#3f5a3a', skin: '#d0a07d' },
  healer: { hair: 2, hairColor: '#c9c2b8', cloakColor: '#3a536b', skin: '#d8ab86' },
  stranger: { hair: 3, hairColor: '#2b2533', cloakColor: '#282134', skin: '#b88968' },
};

export function buildNpcSprites(look) {
  const app = { ...NPC_LOOKS[look] };
  const sprites = buildHeroSprites(app);
  // decorate NPC identity on the down frames
  for (const frame of [0, 1]) {
    const c = sprites.down[frame];
    const g = c.getContext('2d');
    if (look === 'elder') {
      // staff
      R(g, 23, 14, 2, 24, '#3a2a1c');
      R(g, 23, 14, 1, 24, '#6a4a2d');
      R(g, 21, 10, 6, 3, '#6a4a2d');
      R(g, 22, 8, 4, 3, '#4f7d8f');
      pxl(g, 24, 7, '#9fe7ff');
    } else if (look === 'smith') {
      // apron + hammer
      R(g, 10, 19, 8, 10, '#3a2419');
      R(g, 11, 19, 6, 9, '#533425');
      R(g, 13, 21, 1, 6, '#2a1810');
      R(g, 22, 17, 2, 13, '#4a3622');
      R(g, 20, 14, 6, 4, '#4a4a54');
      R(g, 21, 14, 4, 2, '#6a6a76');
      R(g, 10, 22, 6, 5, '#2a1710');
    } else if (look === 'merchant') {
      R(g, 8, 4, 12, 3, '#2f4a30');
      R(g, 7, 6, 14, 2, '#3f5a3a');
      R(g, 6, 17, 1, 10, '#8a6a34');
      R(g, 20, 17, 1, 10, '#8a6a34');
      R(g, 6, 20, 16, 3, '#8a6a34');
      pxl(g, 7, 20, '#e7c26b');
    } else if (look === 'healer') {
      R(g, 9, 20, 10, 8, '#2b3b4e');
      R(g, 13, 20, 2, 8, '#d8e6ff');
      R(g, 10, 23, 8, 2, '#d8e6ff');
      R(g, 9, 20, 10, 1, '#b9cbe6');
    } else if (look === 'stranger') {
      R(g, 9, 5, 10, 3, '#1a1424');
      R(g, 12, 9, 1, 1, '#d45cff'); R(g, 16, 9, 1, 1, '#d45cff');
      R(g, 6, 20, 2, 7, '#1d1828'); R(g, 20, 20, 2, 7, '#1d1828');
      pxl(g, 8, 27, '#d45cff'); pxl(g, 19, 27, '#d45cff');
    }
  }
  return sprites;
}

export function makePortrait(sourceCanvas, w = 48, h = 56, scale = 2.2, srcY = 2, mirror = false) {
  const c = makeCanvas(w, h), g = c.getContext('2d');
  g.imageSmoothingEnabled = false;
  const sw = sourceCanvas.width, sh = sourceCanvas.height;
  const dw = sw * scale, dh = sh * scale;
  g.save();
  if (mirror) {
    g.translate(w, 0); g.scale(-1, 1);
  }
  g.drawImage(sourceCanvas, (w - dw) / 2, srcY - (dh - h) * 0.15, dw, dh);
  g.restore();
  // vignette
  const grd = g.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, 'rgba(6,16,34,0)');
  grd.addColorStop(1, 'rgba(6,16,34,.55)');
  g.fillStyle = grd; g.fillRect(0, 0, w, h);
  return c;
}

export function drawPreview(canvas, app, time) {
  const g = canvas.getContext('2d');
  g.imageSmoothingEnabled = false;
  g.clearRect(0, 0, canvas.width, canvas.height);
  // glow
  const cx = canvas.width / 2, cy = canvas.height * 0.72;
  const grd = g.createRadialGradient(cx, cy, 4, cx, cy, 90);
  grd.addColorStop(0, 'rgba(96,150,255,.16)');
  grd.addColorStop(1, 'rgba(96,150,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, canvas.width, canvas.height);
  // rune circle
  g.save();
  g.translate(cx, cy + 10);
  g.strokeStyle = 'rgba(138,100,255,.35)';
  g.lineWidth = 1;
  g.beginPath(); g.ellipse(0, 0, 62, 18, 0, 0, Math.PI * 2); g.stroke();
  g.setLineDash([4, 5]);
  g.beginPath(); g.ellipse(0, 0, 48, 13, 0, 0, Math.PI * 2); g.stroke();
  g.restore();
  const frames = buildHeroSprites(app);
  const f = Math.floor(time * 6) % 5;
  const frame = f === 0 ? 0 : f === 1 ? 2 : f === 2 ? 3 : f === 3 ? 4 : 5;
  const sprite = frames.down[frame];
  const scale = 4;
  g.drawImage(sprite, cx - (sprite.width * scale) / 2, cy - sprite.height * scale + 14, sprite.width * scale, sprite.height * scale);
  // particles
  for (let i = 0; i < 14; i++) {
    const t = (time * 0.13 + i * 0.137) % 1;
    const px_ = cx + Math.sin(i * 7.3 + time * 0.7) * 70;
    const py_ = canvas.height - t * 180;
    g.fillStyle = `rgba(126,170,255,${0.35 * (1 - t)})`;
    g.fillRect(px_, py_, 1.5, 1.5);
  }
}
