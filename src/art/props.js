// ============================================================
// Eclipse System — procedural world props
// ============================================================
import { makeCanvas, pxl, mulberry32, TAU } from '../utils.js';

function disc(g, cx, cy, r, color) {
  g.fillStyle = color;
  for (let y = -r; y <= r; y++) {
    const w = Math.floor(Math.sqrt(Math.max(0, r * r - y * y)));
    g.fillRect(Math.round(cx - w), Math.round(cy + y), w * 2 + 1, 1);
  }
}

function ellipse(g, cx, cy, rx, ry, color) {
  g.fillStyle = color;
  for (let y = -ry; y <= ry; y++) {
    const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry))));
    g.fillRect(Math.round(cx - w), Math.round(cy + y), w * 2 + 1, 1);
  }
}

function outlineRect(g, x, y, w, h, col) {
  g.fillStyle = col;
  g.fillRect(x, y, w, 1); g.fillRect(x, y + h - 1, w, 1);
  g.fillRect(x, y, 1, h); g.fillRect(x + w - 1, y, 1, h);
}

function tree(seed, hue = 0) {
  const c = makeCanvas(60, 82), g = c.getContext('2d'), r = mulberry32(seed);
  const pal = hue === 0
    ? { dark: '#173b27', mid: '#235335', light: '#386d43', hi: '#4f8350', trunk: '#3b2b22', trunkHi: '#574232' }
    : hue === 1
      ? { dark: '#142f27', mid: '#1c4332', light: '#2d5e41', hi: '#3f754f', trunk: '#34281f', trunkHi: '#4c3a2b' }
      : { dark: '#26331f', mid: '#3b4d27', light: '#586c31', hi: '#778845', trunk: '#3a2c20', trunkHi: '#573f2d' };
  // trunk
  g.fillStyle = '#1c1410';
  g.fillRect(22, 48, 16, 32);
  g.fillStyle = pal.trunk;
  g.fillRect(25, 46, 10, 34);
  g.fillStyle = pal.trunkHi;
  g.fillRect(26, 47, 3, 31);
  g.fillStyle = '#2a1d16';
  g.fillRect(31, 50, 3, 28);
  // roots
  g.fillStyle = pal.trunk;
  g.fillRect(17, 78, 10, 3); g.fillRect(33, 78, 12, 3);
  g.fillRect(20, 75, 5, 4); g.fillRect(36, 75, 7, 4);
  // branches
  g.fillStyle = pal.trunk;
  g.fillRect(18, 49, 10, 3); g.fillRect(34, 46, 10, 3);
  g.fillRect(14, 45, 8, 2); g.fillRect(40, 41, 10, 2);
  // canopy base
  for (let i = 0; i < 7; i++) {
    disc(g, 12 + r() * 36, 26 + r() * 24, 9 + r() * 7, i < 3 ? pal.dark : pal.mid);
  }
  disc(g, 30, 27, 25, pal.dark);
  disc(g, 26, 23, 21, pal.mid);
  disc(g, 19, 18, 14, pal.light);
  disc(g, 38, 19, 13, pal.light);
  disc(g, 29, 14, 12, pal.hi);
  disc(g, 15, 27, 9, pal.hi);
  disc(g, 44, 28, 8, pal.mid);
  // leaf clusters
  for (let i = 0; i < 60; i++) {
    const ax = 5 + Math.floor(r() * 50), ay = 5 + Math.floor(r() * 45);
    const dx = ax - 30, dy = ay - 27;
    if (dx * dx / 650 + dy * dy / 520 > 1) continue;
    pxl(g, ax, ay, r() > 0.65 ? pal.hi : r() > 0.35 ? pal.light : pal.dark);
    if (r() > 0.75) pxl(g, ax + 1, ay, pal.light);
  }
  // hanging vines
  if (hue !== 2) {
    g.fillStyle = '#2a4932';
    g.fillRect(12, 40, 1, 8); g.fillRect(48, 36, 1, 6);
  }
  // outline
  return c;
}

function pine(seed) {
  const c = makeCanvas(44, 86), g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = '#2a1e17'; g.fillRect(19, 66, 6, 19);
  g.fillStyle = '#4a3525'; g.fillRect(20, 67, 2, 16);
  const layers = [
    [36, 12, 18], [40, 26, 16], [44, 40, 14], [48, 54, 12],
  ];
  for (let i = layers.length - 1; i >= 0; i--) {
    const [baseY, topY, half] = layers[i];
    g.fillStyle = i % 2 ? '#1a3a2b' : '#204632';
    for (let y = topY; y <= baseY; y++) {
      const t = (y - topY) / (baseY - topY);
      const w = Math.round(t * half);
      g.fillRect(22 - w, y, w * 2, 1);
    }
    g.fillStyle = '#2d5b3e';
    for (let y = topY; y <= baseY; y += 4) {
      const t = (y - topY) / (baseY - topY);
      const w = Math.round(t * half);
      g.fillRect(22 - w, y, Math.max(1, w), 1);
    }
    for (let j = 0; j < 6; j++) {
      const yy = topY + Math.floor(r() * (baseY - topY));
      const xx = 22 - Math.floor((yy - topY) / (baseY - topY) * half) + Math.floor(r() * half * 0.8);
      pxl(g, xx, yy, r() > 0.5 ? '#3f7351' : '#122b20');
    }
  }
  g.fillStyle = '#0f241a';
  g.fillRect(21, 4, 2, 4);
  return c;
}

function deadTree(seed) {
  const c = makeCanvas(50, 78), g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = '#1b1612';
  g.fillRect(21, 36, 8, 41);
  g.fillStyle = '#3a2b22';
  g.fillRect(23, 35, 4, 41);
  g.fillStyle = '#55402f';
  g.fillRect(23, 36, 1, 38);
  // branches
  const branch = (x, y, dx, dy, len) => {
    let cx = x, cy = y;
    for (let i = 0; i < len; i++) {
      g.fillStyle = i < 2 ? '#4a3627' : '#2b2019';
      g.fillRect(cx, cy, 2, 2);
      cx += dx + (r() - 0.5) * 0.5; cy += dy;
    }
  };
  branch(22, 52, -1, -0.8, 16);
  branch(27, 44, 1, -0.9, 18);
  branch(22, 38, -0.7, -1.1, 14);
  branch(27, 30, 0.4, -1.2, 12);
  branch(18, 34, -1.1, -0.4, 9);
  branch(32, 27, 1.1, -0.5, 8);
  // hanging roots
  g.fillStyle = '#241b16';
  fLine(g, 18, 60, 13, 70); fLine(g, 31, 52, 36, 63);
  return c;
}
function fLine(g, x1, y1, x2, y2) {
  const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let i = 0; i <= n; i++) {
    g.fillRect(Math.round(x1 + (x2 - x1) * i / n), Math.round(y1 + (y2 - y1) * i / n), 1, 1);
  }
}

function bush(seed) {
  const c = makeCanvas(30, 24), g = c.getContext('2d'), r = mulberry32(seed);
  disc(g, 15, 15, 11, '#183b27');
  disc(g, 11, 12, 8, '#245132');
  disc(g, 20, 12, 7, '#2c5d39');
  disc(g, 15, 9, 6, '#396d43');
  for (let i = 0; i < 18; i++) {
    pxl(g, 4 + Math.floor(r() * 22), 5 + Math.floor(r() * 16), r() > 0.5 ? '#4b804f' : '#122e1f');
  }
  if (r() > 0.5) {
    pxl(g, 9, 12, '#b64c59'); pxl(g, 10, 12, '#d76b72');
  }
  return c;
}

function rock(seed, big = false) {
  const w = big ? 38 : 26, h = big ? 28 : 20;
  const c = makeCanvas(w, h), g = c.getContext('2d'), r = mulberry32(seed);
  const base = big ? ['#4b515d', '#5b616d', '#6b707a', '#353a45'] : ['#505662', '#606672', '#70757e', '#363b45'];
  // blob shape
  for (let y = 0; y < h; y++) {
    const t = y / h;
    const ww = Math.round((big ? 15 : 10) * Math.pow(1 - t, 0.45) + 2);
    g.fillStyle = base[Math.floor(r() * base.length)];
    g.fillRect(Math.round(w / 2 - ww), y + 3, ww * 2, 1);
  }
  g.fillStyle = base[1];
  g.fillRect(Math.round(w / 2 - 9), 9, 18, 10);
  g.fillStyle = base[2];
  g.fillRect(Math.round(w / 2 - 7), 7, 12, 5);
  g.fillStyle = base[3];
  g.fillRect(Math.round(w / 2 - 8), 18, 16, 4);
  for (let i = 0; i < 14; i++) pxl(g, 4 + Math.floor(r() * (w - 8)), 4 + Math.floor(r() * (h - 6)), r() > 0.5 ? '#7d828b' : '#2b3039');
  if (r() > 0.55) {
    g.fillStyle = '#3f6544';
    g.fillRect(Math.round(w / 2 - 8), 19, 6, 2);
    g.fillRect(Math.round(w / 2 + 1), 20, 4, 1);
  }
  return c;
}

function flower(seed) {
  const c = makeCanvas(20, 18), g = c.getContext('2d'), r = mulberry32(seed);
  const cols = ['#e8dc8b', '#b99ae0', '#d87082', '#e6e9ef'];
  for (let i = 0; i < 5; i++) {
    const x = 3 + Math.floor(r() * 14), y = 5 + Math.floor(r() * 10);
    g.fillStyle = '#2d5d37'; g.fillRect(x, y + 1, 1, 4);
    pxl(g, x - 1, y, cols[i % 4]); pxl(g, x + 1, y, cols[i % 4]);
    pxl(g, x, y - 1, cols[i % 4]); pxl(g, x, y + 1, cols[i % 4]);
    pxl(g, x, y, '#f5e6a3');
  }
  return c;
}

function mushroom(seed) {
  const c = makeCanvas(18, 18), g = c.getContext('2d'), r = mulberry32(seed);
  g.fillStyle = '#d9cbb8'; g.fillRect(8, 9, 2, 7);
  disc(g, 9, 8, 6, '#8d2f45');
  disc(g, 7, 6, 4, '#b94a5e');
  pxl(g, 6, 5, '#f2d8d8'); pxl(g, 10, 4, '#f2d8d8'); pxl(g, 11, 7, '#e3b9be');
  g.fillStyle = '#5c1f30'; g.fillRect(4, 10, 11, 1);
  return c;
}

function stump(seed) {
  const c = makeCanvas(24, 20), g = c.getContext('2d');
  g.fillStyle = '#3a2a20'; g.fillRect(4, 8, 16, 10);
  g.fillStyle = '#57402e'; g.fillRect(6, 9, 12, 8);
  ellipse(g, 12, 8, 9, 4, '#6b5138');
  ellipse(g, 12, 8, 6, 2, '#8a6b49');
  pxl(g, 10, 8, '#5d462f'); pxl(g, 14, 7, '#5d462f');
  g.fillStyle = '#2f2118'; g.fillRect(3, 16, 18, 2);
  return c;
}

function fence(seed) {
  const c = makeCanvas(36, 28), g = c.getContext('2d');
  g.fillStyle = '#2a2018'; g.fillRect(3, 6, 4, 20); g.fillRect(29, 6, 4, 20);
  g.fillStyle = '#57422e'; g.fillRect(4, 7, 2, 18); g.fillRect(30, 7, 2, 18);
  g.fillStyle = '#4f3a28'; g.fillRect(1, 10, 34, 4); g.fillRect(1, 19, 34, 4);
  g.fillStyle = '#776042'; g.fillRect(1, 10, 34, 1); g.fillRect(1, 19, 34, 1);
  g.fillStyle = '#241a12'; g.fillRect(1, 13, 34, 1); g.fillRect(1, 22, 34, 1);
  return c;
}

function lamp(seed) {
  const c = makeCanvas(24, 60), g = c.getContext('2d');
  g.fillStyle = '#1c1b20'; g.fillRect(10, 24, 4, 34);
  g.fillStyle = '#3d3b44'; g.fillRect(11, 25, 1, 32);
  g.fillStyle = '#2b2930'; g.fillRect(6, 56, 12, 3);
  g.fillStyle = '#3b3942'; g.fillRect(7, 30, 10, 2);
  g.fillStyle = '#17161b'; g.fillRect(7, 8, 10, 17);
  g.fillStyle = '#2b2a32'; g.fillRect(8, 9, 8, 15);
  g.fillStyle = '#ffd98a'; g.fillRect(9, 12, 6, 9);
  g.fillStyle = '#fff2c8'; g.fillRect(10, 13, 3, 7);
  g.fillStyle = '#8a5d2b'; g.fillRect(8, 10, 8, 1); g.fillRect(8, 21, 8, 1);
  g.fillStyle = '#101014'; g.fillRect(10, 4, 4, 4); g.fillRect(8, 7, 8, 2);
  g.fillStyle = '#2e2c35'; g.fillRect(9, 2, 6, 2);
  // glass shine
  pxl(g, 9, 11, '#fff9e0');
  return c;
}

function torch(seed) {
  const c = makeCanvas(16, 40), g = c.getContext('2d');
  g.fillStyle = '#1b1511'; g.fillRect(7, 16, 3, 22);
  g.fillStyle = '#533b26'; g.fillRect(8, 17, 1, 20);
  g.fillStyle = '#241b14'; g.fillRect(6, 10, 5, 7);
  g.fillStyle = '#6b4b2c'; g.fillRect(7, 11, 3, 5);
  g.fillStyle = '#ff7a2f'; g.fillRect(6, 2, 4, 9);
  g.fillStyle = '#ffb45b'; g.fillRect(7, 3, 2, 6);
  g.fillStyle = '#ffe6a8'; g.fillRect(8, 5, 1, 4);
  g.fillStyle = '#d84a1f'; g.fillRect(5, 6, 1, 4); g.fillRect(10, 5, 1, 4);
  return c;
}

function crate(seed) {
  const c = makeCanvas(26, 24), g = c.getContext('2d');
  g.fillStyle = '#2a1f16'; g.fillRect(2, 4, 22, 19);
  g.fillStyle = '#5b4128'; g.fillRect(3, 5, 20, 17);
  g.fillStyle = '#6e5133'; g.fillRect(4, 6, 18, 6);
  g.fillStyle = '#3f2c1c'; g.fillRect(4, 13, 18, 1); g.fillRect(4, 19, 18, 1);
  g.fillStyle = '#82623f'; g.fillRect(5, 7, 2, 5); g.fillRect(9, 7, 2, 5); g.fillRect(13, 7, 2, 5); g.fillRect(17, 7, 2, 5);
  g.fillStyle = '#33241a'; g.fillRect(3, 5, 2, 17); g.fillRect(21, 5, 2, 17);
  return c;
}

function barrel(seed) {
  const c = makeCanvas(22, 28), g = c.getContext('2d');
  g.fillStyle = '#201710'; g.fillRect(3, 4, 16, 22);
  g.fillStyle = '#5c4126'; g.fillRect(4, 5, 14, 20);
  g.fillStyle = '#735331'; g.fillRect(6, 6, 4, 18);
  g.fillStyle = '#47301b'; g.fillRect(13, 6, 3, 18);
  g.fillStyle = '#2b2b30'; g.fillRect(4, 9, 14, 2); g.fillRect(4, 20, 14, 2);
  g.fillStyle = '#6e7078'; g.fillRect(4, 9, 14, 1); g.fillRect(4, 20, 14, 1);
  g.fillStyle = '#3e2a17'; g.fillRect(5, 4, 12, 1);
  return c;
}

function grave(seed) {
  const c = makeCanvas(24, 34), g = c.getContext('2d');
  g.fillStyle = '#2d323a';
  g.fillRect(4, 10, 16, 22);
  g.fillStyle = '#555c68'; g.fillRect(5, 8, 14, 23);
  ellipse(g, 12, 9, 7, 4, '#555c68');
  g.fillStyle = '#6b7280'; g.fillRect(6, 9, 5, 20);
  g.fillStyle = '#3a3f49'; g.fillRect(12, 12, 1, 12);
  g.fillRect(9, 15, 6, 1);
  g.fillStyle = '#2e4332'; g.fillRect(5, 24, 4, 2);
  g.fillStyle = '#1b1e24'; g.fillRect(3, 31, 18, 2);
  return c;
}

function pillar(seed, broken = false) {
  const h = broken ? 40 : 60;
  const c = makeCanvas(30, h + 4), g = c.getContext('2d');
  const top = broken ? 6 : 4;
  g.fillStyle = '#272b35'; g.fillRect(7, top + 6, 16, h - top - 6);
  g.fillStyle = '#6a6f7c'; g.fillRect(6, top + 5, 18, h - top - 8);
  g.fillStyle = '#7d828e'; g.fillRect(8, top + 6, 4, h - top - 10);
  g.fillStyle = '#4a4f5c'; g.fillRect(19, top + 6, 4, h - top - 10);
  g.fillStyle = '#8b909b'; g.fillRect(4, top, 22, 7);
  g.fillStyle = '#5a5f6b'; g.fillRect(4, top + 5, 22, 2);
  if (!broken) {
    g.fillStyle = '#7e8490'; g.fillRect(3, top, 24, 2);
    g.fillStyle = '#4a4f5a'; g.fillRect(3, h - 2, 24, 5);
    g.fillStyle = '#3b3f49'; g.fillRect(2, h + 1, 26, 2);
  } else {
    g.fillStyle = '#2c303a'; g.fillRect(7, top + 5, 17, 3);
    g.fillStyle = '#1f222a'; g.fillRect(10, top + 2, 8, 4);
  }
  // cracks / moss
  const r = mulberry32(seed);
  for (let i = 0; i < 8; i++) {
    pxl(g, 8 + Math.floor(r() * 12), top + 10 + Math.floor(r() * (h - 18)), r() > 0.5 ? '#3b404b' : '#90959e');
  }
  g.fillStyle = '#39573f'; g.fillRect(6, h - 12, 5, 2); g.fillRect(6, h - 8, 3, 2);
  return c;
}

function statue(seed) {
  const c = makeCanvas(42, 74), g = c.getContext('2d');
  // plinth
  g.fillStyle = '#22262f'; g.fillRect(6, 64, 30, 9);
  g.fillStyle = '#4a505c'; g.fillRect(7, 61, 28, 5);
  g.fillStyle = '#626976'; g.fillRect(8, 57, 26, 5);
  // cloaked figure
  g.fillStyle = '#343b48';
  g.beginPath();
  g.moveTo(21, 20); g.lineTo(32, 52); g.lineTo(10, 52);
  g.closePath(); g.fill();
  g.fillStyle = '#4b5362';
  g.fillRect(17, 24, 8, 30);
  g.fillStyle = '#5c6576'; g.fillRect(18, 25, 2, 28);
  // head
  ellipse(g, 21, 17, 7, 8, '#4c5463');
  g.fillStyle = '#333946'; g.fillRect(15, 16, 12, 3);
  // arms
  g.fillStyle = '#3d4553'; g.fillRect(12, 33, 5, 14); g.fillRect(25, 33, 5, 14);
  // sword
  g.fillStyle = '#8a909c'; g.fillRect(33, 30, 2, 28);
  g.fillStyle = '#b6bcc8'; g.fillRect(33, 31, 1, 24);
  g.fillStyle = '#6a5230'; g.fillRect(30, 58, 8, 2);
  // moss and runes
  g.fillStyle = '#3a5c43'; g.fillRect(10, 54, 5, 2); g.fillRect(17, 50, 2, 4);
  g.fillStyle = '#5e8f6c'; pxl(g, 14, 45, '#5e8f6c'); pxl(g, 24, 38, '#5e8f6c');
  return c;
}

function well(seed) {
  const c = makeCanvas(40, 44), g = c.getContext('2d');
  g.fillStyle = '#2a2520'; g.fillRect(5, 18, 30, 22);
  g.fillStyle = '#5a554c'; g.fillRect(6, 17, 28, 20);
  g.fillStyle = '#6f6a60'; g.fillRect(8, 18, 8, 18);
  g.fillStyle = '#45413a'; g.fillRect(22, 18, 9, 18);
  ellipse(g, 20, 17, 14, 6, '#3c3832');
  ellipse(g, 20, 17, 10, 4, '#101820');
  g.fillStyle = '#1b1510'; g.fillRect(8, 4, 3, 14); g.fillRect(29, 4, 3, 14);
  g.fillStyle = '#4f3926'; g.fillRect(9, 5, 1, 13); g.fillRect(30, 5, 1, 13);
  g.fillStyle = '#2f2119'; g.fillRect(6, 2, 28, 3);
  g.fillStyle = '#5b3d26'; g.fillRect(7, 3, 26, 2);
  g.fillStyle = '#6b5233'; g.fillRect(18, 5, 9, 4);
  g.fillStyle = '#9a8a66'; g.fillRect(19, 6, 7, 1);
  return c;
}

function signpost(seed) {
  const c = makeCanvas(30, 38), g = c.getContext('2d');
  g.fillStyle = '#2a1e14'; g.fillRect(13, 8, 4, 29);
  g.fillStyle = '#5c4229'; g.fillRect(14, 9, 2, 27);
  g.fillStyle = '#2c2016'; g.fillRect(2, 8, 26, 14);
  g.fillStyle = '#6a4b2d'; g.fillRect(3, 9, 24, 12);
  g.fillStyle = '#83613c'; g.fillRect(4, 10, 22, 2);
  g.fillStyle = '#3b2a1b'; g.fillRect(5, 14, 15, 1); g.fillRect(5, 17, 10, 1);
  g.fillStyle = '#d8b463'; g.fillRect(21, 13, 3, 2);
  return c;
}

function bones(seed) {
  const c = makeCanvas(30, 18), g = c.getContext('2d');
  g.fillStyle = '#9b9c8d'; g.fillRect(5, 9, 11, 2); g.fillRect(4, 7, 3, 2); g.fillRect(4, 11, 3, 2);
  g.fillRect(14, 7, 3, 2); g.fillRect(14, 11, 3, 2);
  g.fillStyle = '#c2c1ac'; g.fillRect(6, 9, 9, 1);
  ellipse(g, 23, 10, 5, 4, '#b8b7a4');
  pxl(g, 21, 9, '#3a3a35'); pxl(g, 24, 9, '#3a3a35');
  g.fillStyle = '#3a3a35'; g.fillRect(22, 12, 3, 1);
  return c;
}

function barrelFire(seed) {
  const c = makeCanvas(28, 32), g = c.getContext('2d');
  g.fillStyle = '#241810'; g.fillRect(3, 16, 22, 14);
  g.fillStyle = '#4f3520'; g.fillRect(4, 17, 20, 12);
  g.fillStyle = '#2c2c30'; g.fillRect(4, 20, 20, 2); g.fillRect(4, 27, 20, 2);
  g.fillStyle = '#ff6a2a'; g.fillRect(8, 8, 12, 10);
  g.fillStyle = '#ffb040'; g.fillRect(10, 10, 8, 8);
  g.fillStyle = '#ffe38a'; g.fillRect(12, 12, 4, 5);
  g.fillStyle = '#d83c1c'; g.fillRect(7, 11, 2, 6); g.fillRect(19, 9, 2, 7);
  return c;
}

function crystal(seed, big = false) {
  const w = big ? 34 : 24, h = big ? 46 : 32;
  const c = makeCanvas(w, h), g = c.getContext('2d');
  const cx = Math.floor(w / 2);
  g.fillStyle = '#1b1a2e';
  g.fillRect(cx - 4, 8, 8, h - 8);
  g.fillStyle = '#45336b'; g.fillRect(cx - 3, 6, 3, h - 9);
  g.fillStyle = '#6e53a3'; g.fillRect(cx, 4, 3, h - 10);
  g.fillStyle = '#9a7dd4'; g.fillRect(cx + 1, 8, 1, h - 18);
  g.fillStyle = '#b9a6ef'; g.fillRect(cx, 6, 1, 4);
  g.fillStyle = '#2a2442'; g.fillRect(cx - 7, h - 8, 14, 6);
  g.fillStyle = '#3d345c'; g.fillRect(cx - 5, h - 9, 10, 4);
  g.fillStyle = '#8b6fc8'; g.fillRect(cx - 4, h - 7, 8, 1);
  return c;
}

function chest(seed, open = false) {
  const c = makeCanvas(30, 28), g = c.getContext('2d');
  g.fillStyle = '#24180d'; g.fillRect(2, 8, 26, 17);
  g.fillStyle = '#6b4824'; g.fillRect(3, 9, 24, 15);
  g.fillStyle = '#8a5f30'; g.fillRect(4, 10, 22, 6);
  if (open) {
    g.fillStyle = '#2a1c0f'; g.fillRect(4, 9, 22, 7);
    g.fillStyle = '#f2c85e'; g.fillRect(7, 12, 16, 3);
    g.fillStyle = '#ffe49a'; g.fillRect(9, 13, 10, 1);
    g.fillStyle = '#5a3b1c'; g.fillRect(3, 2, 24, 7);
    g.fillStyle = '#80552a'; g.fillRect(4, 3, 22, 5);
  } else {
    g.fillStyle = '#3b2814'; g.fillRect(3, 5, 24, 6);
    g.fillStyle = '#7a542a'; g.fillRect(4, 6, 22, 4);
  }
  g.fillStyle = '#c9a23e'; g.fillRect(3, 13, 24, 1); g.fillRect(14, 8, 2, 9);
  g.fillStyle = '#f0d276'; g.fillRect(14, 10, 2, 4);
  g.fillStyle = '#3f2a14'; g.fillRect(3, 22, 24, 2);
  return c;
}

function caveEntrance(seed) {
  const c = makeCanvas(104, 84), g = c.getContext('2d'), r = mulberry32(seed);
  // rocky mound
  ellipse(g, 52, 48, 46, 34, '#2b2e36');
  ellipse(g, 52, 44, 40, 29, '#3a3e47');
  ellipse(g, 40, 35, 22, 18, '#4a4e58');
  ellipse(g, 66, 38, 19, 16, '#474b55');
  ellipse(g, 52, 28, 20, 14, '#555964');
  // arch
  g.fillStyle = '#11131a';
  ellipse(g, 52, 60, 21, 21, '#0b0d12');
  g.fillRect(31, 56, 42, 28);
  g.fillStyle = '#171a20';
  ellipse(g, 52, 61, 17, 17, '#06080c');
  // rocks around mouth
  for (let i = 0; i < 18; i++) {
    const a = r() * Math.PI * 2;
    const rr = 22 + r() * 10;
    const x = 52 + Math.cos(a) * rr, y = 58 + Math.sin(a) * rr * 0.7;
    disc(g, x, y, 2 + r() * 4, r() > 0.5 ? '#3d414a' : '#2c3038');
  }
  // moss
  for (let i = 0; i < 20; i++) {
    pxl(g, 20 + Math.floor(r() * 60), 20 + Math.floor(r() * 30), r() > 0.5 ? '#3a5b40' : '#263f2c');
  }
  // runes
  g.fillStyle = '#6242a0';
  g.fillRect(28, 44, 1, 5); g.fillRect(26, 46, 5, 1);
  g.fillRect(76, 40, 1, 5); g.fillRect(74, 42, 5, 1);
  return c;
}

function portal(seed, color = '#8a64ff') {
  const c = makeCanvas(56, 76), g = c.getContext('2d');
  // stone arch
  g.fillStyle = '#1c1b28';
  g.fillRect(6, 18, 44, 50);
  g.fillStyle = '#3d374d'; g.fillRect(8, 20, 40, 46);
  g.fillStyle = '#57506c'; g.fillRect(10, 22, 36, 42);
  // hole
  ellipse(g, 28, 44, 15, 22, '#0a0614');
  ellipse(g, 28, 44, 12, 19, '#120a24');
  // runes
  g.fillStyle = color;
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU;
    pxl(g, 28 + Math.cos(a) * 18, 44 + Math.sin(a) * 24, color);
    pxl(g, 28 + Math.cos(a) * 17, 44 + Math.sin(a) * 23, '#d8c8ff');
  }
  // inner swirl
  g.strokeStyle = color; g.lineWidth = 1.4;
  g.beginPath();
  for (let i = 0; i < 30; i++) {
    const t = i / 29;
    const a = t * TAU * 1.5;
    const rr = 2 + t * 9;
    const x = 28 + Math.cos(a) * rr, y = 44 + Math.sin(a) * rr * 1.3;
    i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.stroke();
  g.fillStyle = '#e6dbff'; g.fillRect(27, 41, 2, 6); g.fillRect(25, 43, 6, 2);
  // base
  g.fillStyle = '#24202f'; g.fillRect(4, 68, 48, 7);
  g.fillStyle = '#403a52'; g.fillRect(7, 66, 42, 4);
  return c;
}

function rift(seed) {
  const c = makeCanvas(78, 92), g = c.getContext('2d'), r = mulberry32(seed);
  // torn space
  g.fillStyle = '#0b0715';
  g.beginPath();
  g.moveTo(39, 6); g.lineTo(56, 30); g.lineTo(48, 46); g.lineTo(62, 64); g.lineTo(39, 88);
  g.lineTo(18, 66); g.lineTo(28, 44); g.lineTo(15, 24); g.closePath(); g.fill();
  g.strokeStyle = '#6b44b8'; g.lineWidth = 2; g.stroke();
  g.strokeStyle = '#c0a4ff'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(39, 12); g.lineTo(50, 32); g.lineTo(43, 48); g.lineTo(53, 64); g.lineTo(39, 80); g.lineTo(25, 62); g.lineTo(32, 46); g.lineTo(23, 28); g.closePath(); g.stroke();
  for (let i = 0; i < 20; i++) {
    pxl(g, 20 + Math.floor(r() * 38), 14 + Math.floor(r() * 64), r() > 0.5 ? '#a58bff' : '#4d3a86');
  }
  // shards
  g.fillStyle = '#3a2a62'; g.fillRect(12, 72, 5, 12); g.fillRect(61, 66, 4, 15);
  return c;
}

function house(seed, variant = 0) {
  const c = makeCanvas(176, 138), g = c.getContext('2d'), r = mulberry32(seed);
  const roofCols = [
    ['#4b2b32', '#663943', '#7d4b52'],
    ['#2b3a51', '#3a4f6b', '#4c6485'],
    ['#3b3225', '#50432f', '#665840'],
  ][variant % 3];
  const wallCols = variant === 1 ? ['#6d604d', '#83745d', '#93846b'] : ['#7c6a50', '#917d5e', '#a39070'];
  // foundation
  g.fillStyle = '#2c2a28'; g.fillRect(18, 104, 140, 28);
  g.fillStyle = '#4b4740'; g.fillRect(20, 102, 136, 26);
  // walls
  g.fillStyle = '#221d18'; g.fillRect(22, 62, 132, 44);
  g.fillStyle = wallCols[0]; g.fillRect(25, 64, 126, 40);
  for (let y = 66; y < 104; y += 7) {
    g.fillStyle = wallCols[1]; g.fillRect(26, y, 124, 5);
    g.fillStyle = wallCols[2]; g.fillRect(26, y, 124, 1);
    g.fillStyle = 'rgba(0,0,0,.16)'; g.fillRect(26, y + 5, 124, 2);
  }
  // timber frame
  g.fillStyle = '#2e2118';
  g.fillRect(25, 62, 4, 42); g.fillRect(147, 62, 4, 42);
  g.fillRect(86, 62, 4, 42);
  g.fillRect(23, 62, 130, 3);
  g.fillRect(23, 100, 130, 3);
  // door
  g.fillStyle = '#1a120c'; g.fillRect(76, 74, 24, 30);
  g.fillStyle = '#4b301c'; g.fillRect(78, 76, 20, 28);
  g.fillStyle = '#67422a'; g.fillRect(80, 78, 16, 24);
  g.fillStyle = '#2d1b10'; g.fillRect(88, 78, 1, 24);
  g.fillStyle = '#d4ac58'; g.fillRect(92, 89, 2, 2);
  g.fillStyle = '#2a1b11'; g.fillRect(75, 72, 26, 3);
  // windows
  const win = (x, y) => {
    g.fillStyle = '#2b1e13'; g.fillRect(x, y, 19, 17);
    g.fillStyle = '#e3b75e'; g.fillRect(x + 2, y + 2, 15, 13);
    g.fillStyle = '#f7d68d'; g.fillRect(x + 3, y + 3, 6, 10);
    g.fillStyle = '#2b1e13'; g.fillRect(x + 9, y + 2, 1, 13); g.fillRect(x + 2, y + 8, 15, 1);
    g.fillStyle = '#5b3d22'; g.fillRect(x - 2, y + 16, 23, 2);
  };
  win(38, 76); win(117, 76);
  // roof
  g.fillStyle = '#1d1715';
  g.beginPath(); g.moveTo(10, 66); g.lineTo(46, 18); g.lineTo(130, 18); g.lineTo(166, 66); g.closePath(); g.fill();
  g.fillStyle = roofCols[0];
  g.beginPath(); g.moveTo(14, 62); g.lineTo(48, 22); g.lineTo(128, 22); g.lineTo(162, 62); g.closePath(); g.fill();
  // roof tiles rows
  for (let row = 0; row < 6; row++) {
    const y = 26 + row * 7;
    const t = row / 6;
    const x1 = 47 - t * 34, x2 = 129 + t * 34;
    g.fillStyle = row % 2 ? roofCols[1] : roofCols[2];
    for (let x = x1; x < x2; x += 8) {
      g.fillRect(Math.round(x), y, 6, 5);
      g.fillStyle = 'rgba(255,255,255,.07)';
      g.fillRect(Math.round(x), y, 4, 1);
      g.fillStyle = row % 2 ? roofCols[1] : roofCols[2];
    }
    g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(Math.round(x1), y + 5, Math.round(x2 - x1), 1);
  }
  // ridge
  g.fillStyle = '#1c1514'; g.fillRect(45, 17, 86, 6);
  g.fillStyle = roofCols[1]; g.fillRect(47, 18, 82, 3);
  // chimney
  if (variant !== 2) {
    g.fillStyle = '#2e2520'; g.fillRect(116, 10, 16, 22);
    g.fillStyle = '#5b4b41'; g.fillRect(118, 12, 12, 18);
    g.fillStyle = '#3a2e28'; g.fillRect(117, 9, 14, 4);
    g.fillStyle = '#726157'; g.fillRect(117, 9, 14, 1);
    // smoke wisp
    g.fillStyle = 'rgba(150,160,180,.16)';
    g.fillRect(120, 2, 5, 4); g.fillRect(124, -4, 7, 5);
  }
  // plants
  g.fillStyle = '#2d5335'; g.fillRect(30, 100, 8, 4); g.fillRect(137, 99, 9, 5);
  g.fillStyle = '#417247'; g.fillRect(32, 98, 5, 3); g.fillRect(139, 97, 5, 3);
  // hanging sign
  if (variant === 0) {
    g.fillStyle = '#2a1d13'; g.fillRect(148, 68, 12, 3); g.fillRect(150, 71, 1, 8);
    g.fillStyle = '#6e4b28'; g.fillRect(146, 78, 18, 10);
    g.fillStyle = '#8e6738'; g.fillRect(147, 79, 16, 8);
    g.fillStyle = '#e2bd67'; g.fillRect(151, 82, 8, 1); g.fillRect(154, 80, 1, 5);
  }
  return c;
}

function smithy(seed) {
  const base = house(seed, 2);
  const c = makeCanvas(196, 150), g = c.getContext('2d');
  g.drawImage(base, 10, 12);
  // forge awning
  g.fillStyle = '#1c1512'; g.fillRect(0, 104, 46, 10);
  g.fillStyle = '#4d2a24'; g.fillRect(2, 105, 42, 8);
  g.fillStyle = '#6b342c'; g.fillRect(2, 105, 42, 2);
  // anvil
  g.fillStyle = '#1c1e24'; g.fillRect(24, 128, 22, 6); g.fillRect(30, 122, 12, 7);
  g.fillStyle = '#3e424c'; g.fillRect(26, 126, 18, 4); g.fillRect(31, 121, 10, 5);
  g.fillStyle = '#565b66'; g.fillRect(32, 121, 8, 2);
  // forge fire
  g.fillStyle = '#2a1c16'; g.fillRect(4, 114, 16, 20);
  g.fillStyle = '#ff7b31'; g.fillRect(7, 119, 10, 10);
  g.fillStyle = '#ffc061'; g.fillRect(9, 121, 6, 7);
  g.fillStyle = '#fff0b0'; g.fillRect(11, 123, 3, 4);
  return c;
}

export function buildProps() {
  return {
    tree: [tree(11, 0), tree(12, 0), tree(13, 1), tree(14, 1), tree(15, 2)],
    pine: [pine(21), pine(22), pine(23)],
    deadTree: [deadTree(31), deadTree(32)],
    bush: [bush(41), bush(42), bush(43)],
    rock: [rock(51), rock(52), rock(53, true), rock(54, true)],
    flower: [flower(61), flower(62), flower(63)],
    mushroom: [mushroom(71), mushroom(72)],
    stump: [stump(81), stump(82)],
    fence: [fence(91), fence(92)],
    lamp: [lamp(101), lamp(102)],
    torch: [torch(111)],
    crate: [crate(121), crate(122)],
    barrel: [barrel(131), barrel(132)],
    grave: [grave(141), grave(142)],
    pillar: [pillar(151), pillar(152), pillar(153, true)],
    statue: [statue(161)],
    well: [well(171)],
    signpost: [signpost(181)],
    bones: [bones(191)],
    fire: [barrelFire(201)],
    crystal: [crystal(211), crystal(212, true)],
    chest: [chest(221, false), chest(222, false)],
    chestOpen: [chest(221, true)],
    cave: [caveEntrance(231)],
    portal: [portal(241, '#8a64ff'), portal(242, '#5ed8ff'), portal(243, '#ff5773')],
    rift: [rift(251)],
    house: [house(261, 0), house(262, 1), house(263, 2)],
    smithy: [smithy(271)],
  };
}
