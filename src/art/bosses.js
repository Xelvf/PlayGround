// ============================================================
// Eclipse System — boss sprites
// ============================================================
import { makeCanvas, pxl, shade } from '../utils.js';

function R(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }
function disc(g, cx, cy, r, color) {
  g.fillStyle = color;
  for (let y = -r; y <= r; y++) {
    const w = Math.floor(Math.sqrt(Math.max(0, r * r - y * y)));
    g.fillRect(Math.round(cx - w), Math.round(cy + y), w * 2 + 1, 1);
  }
}
function ell(g, cx, cy, rx, ry, color) {
  g.fillStyle = color;
  for (let y = -ry; y <= ry; y++) {
    const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry))));
    g.fillRect(Math.round(cx - w), Math.round(cy + y), w * 2 + 1, 1);
  }
}
function line(g, x1, y1, x2, y2, col, w = 1) {
  g.fillStyle = col;
  const n = Math.max(1, Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let i = 0; i <= n; i++) g.fillRect(Math.round(x1 + (x2 - x1) * i / n), Math.round(y1 + (y2 - y1) * i / n), w, w);
}

export const BOSS_ART = {
  boss_grove: { w: 92, h: 100, draw(g, f) {
    const sway = [0, 1, 0, -1][f];
    const bob = [0, -1, 0, 1][f];
    ell(g, 46, 96, 32, 5, 'rgba(3,8,6,.6)');
    // roots feet
    for (let i = 0; i < 5; i++) {
      const x = 20 + i * 13;
      line(g, x, 80, x - 10 + i * 5, 96, '#293322', 4);
      line(g, x, 80, x - 7 + i * 4, 93, '#3d4b2e', 2);
    }
    // trunk body
    R(g, 32 + sway, 30 + bob, 30, 56, '#2e3523');
    R(g, 36 + sway, 31 + bob, 21, 53, '#454c2e');
    R(g, 38 + sway, 33 + bob, 8, 46, '#5a6038');
    R(g, 52 + sway, 34 + bob, 5, 44, '#33391f');
    // bark texture
    for (let i = 0; i < 18; i++) {
      R(g, 34 + ((i * 13) % 26) + sway, 35 + ((i * 7) % 44) + bob, 1 + (i % 3), 3 + (i % 4), i % 2 ? '#252b1a' : '#626a3f');
    }
    // chest core
    disc(g, 47 + sway, 55 + bob, 9, '#132620');
    disc(g, 47 + sway, 55 + bob, 7, '#1d4a35');
    disc(g, 47 + sway, 55 + bob, 4, '#48c47a');
    disc(g, 47 + sway, 55 + bob, 2, '#c4ffd6');
    // glowing cracks
    R(g, 39 + sway, 48 + bob, 2, 15, '#48c47a');
    R(g, 55 + sway, 46 + bob, 2, 12, '#2a8a58');
    // arms (branch)
    line(g, 34 + sway, 42 + bob, 8, 58 + f % 2, '#393d25', 8);
    line(g, 33 + sway, 42 + bob, 7, 57 + f % 2, '#555a32', 3);
    line(g, 20, 49, 4, 55, '#2d3020', 4);
    line(g, 23, 48, 4, 56, '#5f643a', 1);
    line(g, 60 + sway, 42 + bob, 84, 56 - f % 2, '#333821', 8);
    line(g, 61 + sway, 42 + bob, 82, 55 - f % 2, '#555a32', 3);
    line(g, 73, 48, 87, 52, '#2b2e1f', 4);
    line(g, 74, 47, 87, 51, '#5f643a', 1);
    // claws / twigs
    line(g, 8, 58, 2, 64, '#6a5a32', 2);
    line(g, 8, 58, 6, 68, '#4c3f23', 2);
    line(g, 84, 56, 90, 62, '#6a5a32', 2);
    line(g, 84, 56, 86, 66, '#4c3f23', 2);
    // head
    R(g, 37 + sway, 14 + bob, 18, 20, '#3b4028');
    R(g, 39 + sway, 15 + bob, 13, 17, '#555b35');
    R(g, 41 + sway, 17 + bob, 8, 13, '#2b2f1d');
    // eyes
    R(g, 41 + sway, 21 + bob, 3, 2, '#6bff9e'); R(g, 49 + sway, 21 + bob, 3, 2, '#6bff9e');
    pxl(g, 42 + sway, 21 + bob, '#e6ffec'); pxl(g, 50 + sway, 21 + bob, '#e6ffec');
    // mouth
    R(g, 43 + sway, 27 + bob, 6, 2, '#151a10');
    for (let i = 0; i < 4; i++) pxl(g, 43 + i * 2, 27 + bob, '#c9d8ae');
    // antlers
    line(g, 42 + sway, 14 + bob, 30, 2, '#6b5b34', 3);
    line(g, 35, 7, 26, 4, '#8a7746', 2);
    line(g, 50 + sway, 14 + bob, 64, 2, '#6b5b34', 3);
    line(g, 58, 7, 70, 5, '#8a7746', 2);
    // canopy leaves
    const r = (i) => ((i * 37) % 50) / 50;
    for (let i = 0; i < 40; i++) {
      const x = 20 + r(i) * 54, y = 2 + r(i + 9) * 26;
      pxl(g, x + sway, y + bob, i % 3 ? '#2f5d3d' : '#4c7a4c');
    }
    // hanging moss
    R(g, 38 + sway, 30 + bob, 1, 10, '#315b3b');
    R(g, 57 + sway, 30 + bob, 1, 8, '#315b3b');
    R(g, 61 + sway, 38 + bob, 1, 6, '#24452d');
  } },

  boss_rune: { w: 66, h: 88, draw(g, f) {
    const bob = [0, -2, 0, 2][f];
    const spin = f * 0.5;
    ell(g, 33, 84, 15, 3, 'rgba(5,6,18,.5)');
    // spectral lower body
    for (let i = 0; i < 6; i++) {
      ell(g, 33 + Math.sin(i + spin) * 2, 60 + i * 3 + bob, 12 - i, 4, `rgba(80,70,150,${0.18 - i * 0.02})`);
    }
    // robe
    g.fillStyle = '#1c1938';
    g.beginPath();
    g.moveTo(33, 13 + bob); g.lineTo(51, 32 + bob); g.lineTo(47, 70 + bob);
    g.lineTo(38, 64 + bob); g.lineTo(33, 74 + bob); g.lineTo(28, 64 + bob); g.lineTo(19, 70 + bob);
    g.lineTo(15, 32 + bob); g.closePath(); g.fill();
    g.fillStyle = '#302a5c';
    g.beginPath();
    g.moveTo(33, 16 + bob); g.lineTo(45, 32 + bob); g.lineTo(42, 64 + bob);
    g.lineTo(33, 68 + bob); g.lineTo(24, 64 + bob); g.lineTo(21, 32 + bob); g.closePath(); g.fill();
    R(g, 26, 36 + bob, 14, 3, '#6b4fa8');
    R(g, 26, 54 + bob, 14, 2, '#453477');
    // arms
    R(g, 12, 32 + bob, 6, 19, '#242044'); R(g, 48, 32 + bob, 6, 19, '#1e1b3a');
    R(g, 13, 34 + bob, 3, 14, '#3a3465'); R(g, 49, 34 + bob, 3, 13, '#332d5b');
    pxl(g, 12, 52 + bob, '#a88cff'); pxl(g, 53, 51 + bob, '#a88cff');
    // staff
    R(g, 55, 18 + bob, 2, 50, '#3a2b1c');
    R(g, 55, 19 + bob, 1, 46, '#664d2c');
    disc(g, 56, 15 + bob, 5, '#2a1a54');
    disc(g, 56, 15 + bob, 3, '#7d5ce0');
    disc(g, 56, 15 + bob, 1, '#e2d4ff');
    // hood
    ell(g, 33, 22 + bob, 14, 15, '#191532');
    ell(g, 33, 23 + bob, 11, 12, '#0a0817');
    // mask
    R(g, 27, 18 + bob, 12, 11, '#2e2a4b');
    R(g, 28, 19 + bob, 10, 8, '#46406f');
    R(g, 29, 22 + bob, 3, 2, '#b599ff'); R(g, 34, 22 + bob, 3, 2, '#b599ff');
    R(g, 31, 27 + bob, 4, 1, '#9c80e0');
    R(g, 30, 19 + bob, 6, 1, '#6a5c99');
    // runes orbiting
    const runes = ['#8d6cff', '#5ed8ff', '#c2a5ff', '#6a4fc4'];
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 + spin;
      const x = 33 + Math.cos(a) * 27, y = 40 + Math.sin(a) * 10 + bob;
      g.fillStyle = runes[i % 4];
      g.fillRect(Math.round(x), Math.round(y), 2, 2);
      if (i % 2) g.fillRect(Math.round(x) + 1, Math.round(y) - 1, 1, 1);
    }
    // floating books/runes
    R(g, 8, 60 + bob, 8, 6, '#3d3266'); R(g, 9, 61 + bob, 6, 4, '#6b5a99');
    R(g, 47, 68 + bob, 7, 5, '#2f2752');
  } },

  boss_tyrant: { w: 94, h: 80, draw(g, f) {
    const bob = [0, 1, 0, -1][f];
    const leg = [0, 2, 0, -2][f];
    ell(g, 47, 76, 34, 5, 'rgba(4,6,12,.6)');
    // tail
    line(g, 18, 50 + bob, 2, 42 + bob, '#3a3138', 7);
    line(g, 18, 50 + bob, 3, 43 + bob, '#55464a', 2);
    // legs
    R(g, 20 + leg, 52 + bob, 13, 20, '#312b30'); R(g, 23 + leg, 54 + bob, 7, 16, '#4a3f44');
    R(g, 58 - leg, 52 + bob, 13, 20, '#2b2629'); R(g, 61 - leg, 54 + bob, 7, 16, '#443a3f');
    R(g, 17 + leg, 70 + bob, 19, 5, '#1a171a'); R(g, 57 - leg, 70 + bob, 19, 5, '#171417');
    // claws
    for (let i = 0; i < 3; i++) {
      R(g, 17 + i * 6 + leg, 73 + bob, 3, 4, '#d8c9a4');
      R(g, 59 + i * 6 - leg, 73 + bob, 3, 4, '#c9ba96');
    }
    // body armor
    ell(g, 47, 43 + bob, 32, 22, '#2c292e');
    ell(g, 47, 40 + bob, 27, 17, '#433e42');
    // plated back
    for (let i = 0; i < 6; i++) {
      const x = 25 + i * 8;
      R(g, x, 20 + bob + (i % 2) * 2, 9, 12, '#3a3639');
      R(g, x + 1, 21 + bob + (i % 2) * 2, 6, 7, '#5c5558');
      R(g, x + 2, 22 + bob + (i % 2) * 2, 3, 2, '#7d7477');
    }
    // head
    ell(g, 62, 42 + bob, 18, 16, '#3a3337');
    ell(g, 64, 40 + bob, 14, 12, '#51474b');
    R(g, 68, 38 + bob, 18, 12, '#393235');
    R(g, 72, 46 + bob, 14, 7, '#2a2427');
    // eyes
    R(g, 65, 36 + bob, 4, 2, '#ff9a3d'); pxl(g, 66, 36 + bob, '#fff0bf');
    R(g, 73, 37 + bob, 3, 2, '#ff9a3d'); pxl(g, 74, 37 + bob, '#fff0bf');
    // mouth / teeth
    R(g, 70, 46 + bob, 17, 6, '#160f14');
    for (let i = 0; i < 6; i++) R(g, 71 + i * 3, 46 + bob, 2, 3, '#e2d5b2');
    for (let i = 0; i < 5; i++) R(g, 72 + i * 3, 50 + bob, 2, 2, '#c9bb97');
    // tusks
    R(g, 67, 48 + bob, 3, 9, '#e8dcc0'); R(g, 86, 49 + bob, 3, 8, '#d8cbaa');
    // horns
    line(g, 56, 27 + bob, 43, 8 + bob, '#b9a071', 3);
    line(g, 69, 28 + bob, 78, 9 + bob, '#8f7852', 3);
    // glowing cracks
    R(g, 40, 34 + bob, 10, 1, '#ff7a3d'); R(g, 48, 38 + bob, 7, 1, '#d84a2a');
    pxl(g, 44, 36 + bob, '#ffcf7a'); pxl(g, 52, 35 + bob, '#ff8a4a');
    // moss patches
    for (let i = 0; i < 10; i++) pxl(g, 18 + (i * 7) % 58, 26 + (i * 11) % 34, '#3c5a3e');
  } },

  boss_revenant: { w: 76, h: 100, draw(g, f) {
    const bob = [0, -1, 0, 1][f];
    const sway = [0, 2, 0, -2][f];
    ell(g, 38, 96, 22, 4, 'rgba(3,4,10,.6)');
    // cape / ghost flames
    const cape = '#4a1424';
    g.fillStyle = '#1c0a12';
    g.beginPath();
    g.moveTo(37, 22 + bob); g.lineTo(66 + sway, 42 + bob); g.lineTo(58 + sway, 88 + bob);
    g.lineTo(48, 76 + bob); g.lineTo(40, 92 + bob); g.lineTo(32, 78 + bob); g.lineTo(22, 90 + bob);
    g.lineTo(16 - sway, 46 + bob); g.closePath(); g.fill();
    g.fillStyle = cape;
    g.beginPath();
    g.moveTo(37, 25 + bob); g.lineTo(59 + sway, 44 + bob); g.lineTo(52 + sway, 79 + bob);
    g.lineTo(44, 70 + bob); g.lineTo(37, 83 + bob); g.lineTo(29, 70 + bob); g.lineTo(23, 80 + bob);
    g.lineTo(18 - sway, 48 + bob); g.closePath(); g.fill();
    // legs
    R(g, 30, 70 + bob, 7, 22, '#2d2c36'); R(g, 40, 70 + bob, 7, 22, '#25242d');
    R(g, 27, 90 + bob, 12, 5, '#17161d'); R(g, 38, 90 + bob, 12, 5, '#131218');
    // armor
    R(g, 26, 46 + bob, 24, 28, '#2d2d38');
    R(g, 28, 47 + bob, 19, 25, '#474753');
    R(g, 30, 48 + bob, 6, 21, '#646475');
    R(g, 44, 49 + bob, 4, 18, '#383844');
    R(g, 24, 68 + bob, 28, 5, '#1b1b23');
    R(g, 33, 68 + bob, 10, 3, '#b08a3f');
    // shoulder spikes
    line(g, 26, 48 + bob, 12, 38 + bob, '#6b6b7c', 4);
    line(g, 49, 48 + bob, 63, 37 + bob, '#555565', 4);
    line(g, 16, 42, 12, 37, '#b08a3f', 2);
    line(g, 59, 41, 64, 36, '#b08a3f', 2);
    // arms
    R(g, 16, 50 + bob, 8, 22, '#3b3b47'); R(g, 52, 50 + bob, 8, 22, '#32323e');
    R(g, 18, 53 + bob, 4, 16, '#575767'); R(g, 53, 53 + bob, 4, 16, '#4a4a5a');
    // greatsword
    R(g, 60, 28 + bob, 5, 48, '#474753');
    R(g, 61, 30 + bob, 2, 42, '#9aa0b4');
    R(g, 60, 28 + bob, 5, 4, '#c9cedd');
    R(g, 56, 33 + bob, 13, 3, '#6b522f');
    R(g, 62, 36 + bob, 1, 34, '#d84a4a');
    pxl(g, 62, 20 + bob, '#ff6a6a'); pxl(g, 63, 22 + bob, '#ff9a6a');
    // helm
    R(g, 26, 23 + bob, 24, 22, '#1f1f28');
    R(g, 28, 24 + bob, 20, 19, '#3b3b48');
    R(g, 30, 25 + bob, 6, 15, '#5a5a6b');
    R(g, 31, 29 + bob, 14, 3, '#101016');
    R(g, 33, 29 + bob, 3, 2, '#ff3d55'); R(g, 41, 29 + bob, 3, 2, '#ff3d55');
    R(g, 37, 36 + bob, 8, 2, '#17171d');
    // horns
    line(g, 30, 23 + bob, 18, 6 + bob, '#7c6a52', 3);
    line(g, 18, 6 + bob, 14, 13 + bob, '#a38963', 2);
    line(g, 45, 23 + bob, 57, 6 + bob, '#6b5a45', 3);
    line(g, 57, 6 + bob, 62, 13 + bob, '#8f7856', 2);
    // crown of embers
    for (let i = 0; i < 5; i++) pxl(g, 31 + i * 3, 20 + bob - (i % 2) * 2, '#ff7a3d');
    // eye glow
    pxl(g, 34, 29 + bob, '#ffd0d6'); pxl(g, 43, 29 + bob, '#ffd0d6');
  } },

  boss_maw: { w: 106, h: 84, draw(g, f) {
    const pulse = [0, 1, 0, -1][f];
    ell(g, 53, 80, 38, 5, 'rgba(3,3,8,.65)');
    // shadow tendrils
    for (let i = 0; i < 9; i++) {
      const a = -Math.PI / 2 + (i / 8) * Math.PI;
      const len = 22 + (i % 3) * 6 + pulse * 2;
      const ex = 53 + Math.cos(a) * (30 + i * 3);
      const ey = 66 + Math.sin(a) * 12;
      line(g, ex, 70, ex + Math.cos(a + 0.6) * len * 0.4, ey - len, '#1b0f24', 5);
      line(g, ex, 70, ex + Math.cos(a + 0.6) * len * 0.4, ey - len, '#3b2150', 2);
      for (let j = 0; j < 3; j++) {
        pxl(g, ex + Math.cos(a + 0.6) * len * 0.4 * (j / 3), ey - len * (j / 3), '#8a5ab8');
      }
    }
    // outer body
    ell(g, 53, 44 + pulse, 42, 33, '#120a1a');
    ell(g, 53, 42 + pulse, 37, 29, '#241430');
    ell(g, 53, 40 + pulse, 30, 23, '#3a1c4e');
    // fleshy ridges
    for (let i = 0; i < 10; i++) {
      const x = 20 + i * 8;
      R(g, x, 19 + pulse + (i % 2) * 3, 5, 12, i % 2 ? '#2a1538' : '#472358');
    }
    // giant mouth
    ell(g, 53, 48 + pulse, 24, 18, '#0a0511');
    ell(g, 53, 48 + pulse, 20, 14, '#160a20');
    // teeth ring
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * Math.PI * 2;
      const x = 53 + Math.cos(a) * 20, y = 48 + pulse + Math.sin(a) * 14;
      const tx = 53 + Math.cos(a) * 10, ty = 48 + pulse + Math.sin(a) * 7;
      line(g, x, y, tx, ty, '#d6c8b0', 2);
    }
    // inner teeth
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + 0.3;
      line(g, 53 + Math.cos(a) * 12, 48 + pulse + Math.sin(a) * 8, 53 + Math.cos(a) * 6, 48 + pulse + Math.sin(a) * 4, '#a89880', 1);
    }
    // core
    disc(g, 53, 48 + pulse, 5, '#6b1f4a');
    disc(g, 53, 48 + pulse, 3, '#c23d7a');
    pxl(g, 53, 47 + pulse, '#ffe0f0');
    // eyes
    ell(g, 32, 25 + pulse, 7, 4, '#0c0711');
    ell(g, 74, 25 + pulse, 7, 4, '#0c0711');
    R(g, 29, 24 + pulse, 5, 2, '#ff5773'); R(g, 72, 24 + pulse, 5, 2, '#ff5773');
    pxl(g, 30, 24 + pulse, '#ffd0d6'); pxl(g, 73, 24 + pulse, '#ffd0d6');
    // drool
    line(g, 45, 62 + pulse, 44, 70, '#6b2a5a', 1);
    line(g, 62, 63 + pulse, 64, 72, '#6b2a5a', 1);
    // chains
    for (let i = 0; i < 5; i++) {
      pxl(g, 15 + i * 4, 55 + (i % 2) * 2 + pulse, '#7d6a55');
      pxl(g, 78 + i * 4, 55 + (i % 2) * 2 + pulse, '#7d6a55');
    }
  } },

  boss_dragon: { w: 142, h: 116, draw(g, f) {
    const bob = [0, -2, 0, 2][f];
    const flap = [3, 0, -3, 0][f];
    ell(g, 71, 111, 48, 6, 'rgba(3,4,8,.65)');
    // tail
    line(g, 35, 78 + bob, 4, 98 + bob, '#47292a', 10);
    line(g, 35, 78 + bob, 5, 97 + bob, '#6b3b34', 3);
    line(g, 4, 98 + bob, 10, 92 + bob, '#2e1a1c', 5);
    // wings
    g.fillStyle = '#3d2228';
    g.beginPath();
    g.moveTo(58, 44 + bob); g.lineTo(12, 10 + bob + flap); g.lineTo(6, 54 + bob + flap); g.lineTo(26, 52 + bob); g.lineTo(18, 82 + bob); g.lineTo(44, 62 + bob); g.closePath(); g.fill();
    g.fillStyle = '#5a3234';
    g.beginPath();
    g.moveTo(58, 44 + bob); g.lineTo(18, 13 + bob + flap); g.lineTo(15, 49 + bob + flap); g.lineTo(32, 50 + bob); g.closePath(); g.fill();
    g.fillStyle = '#2a171d';
    g.beginPath();
    g.moveTo(84, 44 + bob); g.lineTo(130, 10 + bob - flap); g.lineTo(136, 54 + bob - flap); g.lineTo(116, 52 + bob); g.lineTo(124, 82 + bob); g.lineTo(98, 62 + bob); g.closePath(); g.fill();
    g.fillStyle = '#4d2a2e';
    g.beginPath();
    g.moveTo(84, 44 + bob); g.lineTo(124, 13 + bob - flap); g.lineTo(127, 49 + bob - flap); g.lineTo(110, 50 + bob); g.closePath(); g.fill();
    // wing bones
    line(g, 58, 44 + bob, 12, 12 + bob + flap, '#7d4a3a', 2);
    line(g, 58, 44 + bob, 24, 51 + bob, '#6b3c30', 2);
    line(g, 84, 44 + bob, 130, 12 + bob - flap, '#7d4a3a', 2);
    // legs
    R(g, 48, 82 + bob, 13, 22, '#4a2a2b'); R(g, 53, 84 + bob, 7, 17, '#6b3b34');
    R(g, 82, 82 + bob, 13, 22, '#432627'); R(g, 87, 84 + bob, 7, 17, '#63362f');
    R(g, 43, 102 + bob, 20, 6, '#2a181b'); R(g, 79, 102 + bob, 20, 6, '#241518');
    for (let i = 0; i < 3; i++) {
      R(g, 43 + i * 6, 106 + bob, 3, 5, '#d6c19c');
      R(g, 81 + i * 6, 106 + bob, 3, 5, '#c9b48f');
    }
    // body
    ell(g, 71, 66 + bob, 32, 25, '#4a2a2b');
    ell(g, 71, 63 + bob, 27, 20, '#704039');
    ell(g, 66, 58 + bob, 17, 12, '#8a5244');
    // chest scales
    for (let i = 0; i < 6; i++) {
      ell(g, 71, 56 + i * 4 + bob, 12 - i, 2, i % 2 ? '#8a5a45' : '#a46a4f');
    }
    // dorsal spikes
    for (let i = 0; i < 9; i++) {
      line(g, 44 + i * 6, 46 + bob, 47 + i * 6, 32 + bob - (i % 2) * 4, '#c9a05c', 2);
    }
    // neck / head
    ell(g, 93, 36 + bob, 18, 14, '#5a3331');
    ell(g, 95, 34 + bob, 14, 11, '#7a463d');
    ellipseHead(g, 110, 30 + bob, 19, 13);
    function ellipseHead(g, cx, cy, rx, ry) {
      ell(g, cx, cy, rx, ry, '#3d2528');
      ell(g, cx, cy - 1, rx - 2, ry - 2, '#6b3d36');
      ell(g, cx + 2, cy - 3, rx - 6, ry - 5, '#8a5244');
      R(g, cx + rx - 4, cy + 2, 10, 7, '#3d2528');
      R(g, cx + rx - 4, cy + 3, 9, 5, '#5a332f');
      R(g, cx + rx + 4, cy + 4, 2, 2, '#150d10');
    }
    // jaw
    R(g, 117, 38 + bob, 15, 7, '#3d2528');
    R(g, 118, 39 + bob, 13, 4, '#63372f');
    for (let i = 0; i < 5; i++) R(g, 118 + i * 3, 38 + bob, 2, 3, '#e2d3b4');
    // eye
    R(g, 111, 27 + bob, 5, 3, '#ff6a2a');
    R(g, 112, 27 + bob, 3, 2, '#ffe2a0');
    pxl(g, 112, 27 + bob, '#fff8df');
    // horns
    line(g, 98, 22 + bob, 84, 2 + bob, '#d6bd8a', 4);
    line(g, 84, 2 + bob, 78, 10 + bob, '#b89a68', 2);
    line(g, 116, 20 + bob, 126, 2 + bob, '#c9ad7c', 4);
    line(g, 126, 2 + bob, 131, 9 + bob, '#a88a5c', 2);
    // frills
    for (let i = 0; i < 4; i++) line(g, 104 + i * 3, 20 + bob, 98 + i * 4, 9 + bob, '#8a3a3a', 2);
    // fire in mouth
    pxl(g, 132, 39 + bob, '#ff8a3d'); pxl(g, 135, 38 + bob, '#ffcf5c');
    pxl(g, 138, 36 + bob, '#ff6a2a'); pxl(g, 141, 34 + bob, '#ff9a3d');
  } },

  boss_monarch: { w: 92, h: 122, draw(g, f) {
    const bob = [0, -1, 0, 1][f];
    const sway = [0, 2, 0, -2][f];
    ell(g, 46, 118, 26, 5, 'rgba(3,3,9,.65)');
    // shadow wings
    g.fillStyle = 'rgba(24,12,48,.8)';
    g.beginPath();
    g.moveTo(46, 28 + bob); g.lineTo(2 + sway, 8 + bob); g.lineTo(7, 56 + bob); g.lineTo(24, 48 + bob); g.lineTo(18, 86 + bob); g.lineTo(40, 60 + bob); g.closePath(); g.fill();
    g.fillStyle = 'rgba(38,20,74,.6)';
    g.beginPath();
    g.moveTo(46, 28 + bob); g.lineTo(8 + sway, 14 + bob); g.lineTo(12, 48 + bob); g.lineTo(28, 46 + bob); g.closePath(); g.fill();
    g.fillStyle = 'rgba(24,12,48,.8)';
    g.beginPath();
    g.moveTo(46, 28 + bob); g.lineTo(90 - sway, 8 + bob); g.lineTo(85, 56 + bob); g.lineTo(68, 48 + bob); g.lineTo(74, 86 + bob); g.lineTo(52, 60 + bob); g.closePath(); g.fill();
    g.fillStyle = 'rgba(38,20,74,.6)';
    g.beginPath();
    g.moveTo(46, 28 + bob); g.lineTo(84 - sway, 14 + bob); g.lineTo(80, 48 + bob); g.lineTo(64, 46 + bob); g.closePath(); g.fill();
    // wing runes
    for (let i = 0; i < 10; i++) {
      pxl(g, 9 + (i * 7) % 20, 14 + (i * 9) % 46, '#8d6cff');
      pxl(g, 64 + (i * 7) % 20, 14 + (i * 9) % 46, '#8d6cff');
    }
    // cape
    g.fillStyle = '#160c28';
    g.beginPath();
    g.moveTo(46, 36 + bob); g.lineTo(64, 52 + bob); g.lineTo(60, 104 + bob);
    g.lineTo(51, 92 + bob); g.lineTo(46, 110 + bob); g.lineTo(41, 92 + bob); g.lineTo(32, 104 + bob);
    g.lineTo(28, 52 + bob); g.closePath(); g.fill();
    g.fillStyle = '#2a1748';
    g.beginPath();
    g.moveTo(46, 38 + bob); g.lineTo(58, 54 + bob); g.lineTo(55, 96 + bob);
    g.lineTo(46, 100 + bob); g.lineTo(37, 96 + bob); g.lineTo(34, 54 + bob); g.closePath(); g.fill();
    // legs
    R(g, 36, 88 + bob, 7, 25, '#21172e'); R(g, 48, 88 + bob, 7, 25, '#1b1327');
    R(g, 33, 110 + bob, 12, 6, '#0f0a18'); R(g, 46, 110 + bob, 12, 6, '#0c0813');
    // armor
    R(g, 31, 52 + bob, 30, 40, '#1d1730');
    R(g, 34, 54 + bob, 24, 36, '#342752');
    R(g, 37, 56 + bob, 8, 30, '#4e3b78');
    R(g, 56, 57 + bob, 5, 28, '#271d40');
    R(g, 30, 82 + bob, 32, 6, '#120d1e');
    R(g, 38, 83 + bob, 16, 3, '#c9a04f');
    // arcane core
    disc(g, 46, 68 + bob, 7, '#120a24');
    disc(g, 46, 68 + bob, 5, '#4a2e8a');
    disc(g, 46, 68 + bob, 3, '#9d7bff');
    disc(g, 46, 68 + bob, 1, '#efe6ff');
    // shoulder pauldrons
    R(g, 20, 52 + bob, 12, 10, '#2a1d47'); R(g, 22, 53 + bob, 8, 6, '#4a3870');
    R(g, 60, 52 + bob, 12, 10, '#241a3e'); R(g, 62, 53 + bob, 8, 6, '#3d2e62');
    // spikes
    line(g, 21, 52 + bob, 12, 42 + bob, '#6a558f', 3);
    line(g, 71, 52 + bob, 80, 42 + bob, '#5a487b', 3);
    // arms
    R(g, 18, 60 + bob, 8, 26, '#2b2047'); R(g, 66, 60 + bob, 8, 26, '#241b3c');
    R(g, 20, 63 + bob, 4, 18, '#4a3870'); R(g, 67, 63 + bob, 4, 18, '#3d2e62');
    // clawed hands
    for (let i = 0; i < 3; i++) {
      R(g, 17 + i * 3, 85 + bob, 2, 5, '#8d7aa8');
      R(g, 67 + i * 3, 85 + bob, 2, 5, '#7b6898');
    }
    // head
    R(g, 39, 30 + bob, 14, 16, '#1d1730');
    R(g, 41, 31 + bob, 10, 13, '#33294e');
    R(g, 42, 33 + bob, 8, 9, '#0f0a18');
    // eyes
    R(g, 42, 35 + bob, 3, 2, '#c39bff'); R(g, 48, 35 + bob, 2, 2, '#c39bff');
    pxl(g, 43, 35 + bob, '#f3eaff'); pxl(g, 49, 35 + bob, '#f3eaff');
    // crown
    R(g, 38, 24 + bob, 16, 5, '#2c2048');
    for (let i = 0; i < 5; i++) {
      const h = i === 0 || i === 4 ? 4 : i === 2 ? 8 : 6;
      R(g, 38 + i * 3, 24 - h + bob, 2, h, '#c9a04f');
      pxl(g, 39 + i * 3, 23 - h + bob, '#f0d27a');
    }
    R(g, 42, 27 + bob, 8, 2, '#8d6cff');
    // halo
    g.strokeStyle = 'rgba(138,100,255,.55)';
    g.lineWidth = 1;
    g.beginPath(); g.ellipse(46, 20 + bob, 21, 5, 0, 0, Math.PI * 2); g.stroke();
    // floating shards
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + f * 0.4;
      const x = 46 + Math.cos(a) * 38, y = 58 + Math.sin(a) * 16 + bob;
      pxl(g, x, y, i % 2 ? '#8d6cff' : '#5ed8ff');
    }
  } },
};

export function buildBossSprites(types) {
  const out = {};
  for (const type of types) {
    const def = BOSS_ART[type];
    if (!def) continue;
    out[type] = [];
    for (let f = 0; f < 4; f++) {
      const c = makeCanvas(def.w, def.h), g = c.getContext('2d');
      def.draw(g, f);
      out[type].push(c);
    }
  }
  return out;
}
