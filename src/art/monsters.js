// ============================================================
// Eclipse System — monster sprite foundry
// ============================================================
import { makeCanvas, pxl, shade, mulberry32, TAU } from '../utils.js';

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
function R(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }
function line(g, x1, y1, x2, y2, col, w = 1) {
  g.fillStyle = col;
  const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let i = 0; i <= n; i++) {
    g.fillRect(Math.round(x1 + (x2 - x1) * i / n), Math.round(y1 + (y2 - y1) * i / n), w, w);
  }
}

export const MONSTER_ART = {
  slime: { w: 32, h: 28, draw(g, f) {
    const bob = [0, -1, 0, 1][f];
    const sq = [0, 1, 2, 1][f];
    const cy = 19 + bob + sq * 0.4;
    ell(g, 16, cy + 2, 13 + sq * 0.6, 7 - sq * 0.5, 'rgba(5,10,18,.5)');
    // body
    ell(g, 16, cy, 13 + sq * 0.4, 10 - sq * 0.3, '#173d34');
    ell(g, 16, cy - 1, 12, 9, '#215c4b');
    ell(g, 15, cy - 3, 8, 5, '#2f7a5d');
    ell(g, 14, cy - 5, 4, 2, '#52a57a');
    ell(g, 16, cy + 1, 8, 6, '#1a4a3d');
    // inner core
    ell(g, 16, cy + 1, 4, 3, '#7ae0b4');
    ell(g, 16, cy, 2, 2, '#c9ffdf');
    // eyes
    R(g, 10, cy - 3, 2, 3, '#07120e'); R(g, 20, cy - 3, 2, 3, '#07120e');
    pxl(g, 10, cy - 2, '#d6fff1'); pxl(g, 20, cy - 2, '#d6fff1');
    // drips
    pxl(g, 4, cy + 4, '#2f7a5d'); pxl(g, 27, cy + 3, '#215c4b');
    pxl(g, 16, cy + 8, '#1a4a3d');
    // highlight
    pxl(g, 9, cy - 6, '#8be7bd'); pxl(g, 10, cy - 6, '#5db98c');
  } },

  wolf: { w: 48, h: 32, draw(g, f) {
    const bob = [0, -1, 0, 1][f];
    const leg = [0, 2, 0, -2][f];
    const y = 18 + bob;
    // shadow
    ell(g, 25, 29, 15, 3, 'rgba(5,10,18,.5)');
    // tail
    line(g, 9, y - 2, 3, y - 7 - leg, '#202736', 3);
    line(g, 9, y - 2, 4, y - 7 - leg, '#343d52', 1);
    // legs
    R(g, 15 + leg, y + 4, 4, 9, '#1d2433'); R(g, 17 + leg, y + 5, 2, 7, '#323b52');
    R(g, 27 - leg, y + 4, 4, 9, '#1a202e'); R(g, 29 - leg, y + 5, 2, 7, '#2c3448');
    R(g, 36 + leg, y + 4, 4, 8, '#202736'); R(g, 38 + leg, y + 5, 2, 6, '#363f56');
    R(g, 13 + leg, y + 12, 7, 3, '#161b27');
    R(g, 25 - leg, y + 12, 7, 3, '#141924');
    R(g, 34 + leg, y + 11, 7, 3, '#181e2b');
    // body
    ell(g, 24, y, 15, 8, '#232a3c');
    ell(g, 24, y - 1, 13, 6, '#343d54');
    ell(g, 21, y - 3, 8, 3, '#49536d');
    // fur spikes
    for (let i = 0; i < 5; i++) {
      g.fillStyle = '#1c2232';
      g.fillRect(15 + i * 4, y - 7 + (i % 2), 3, 3);
    }
    // head
    ell(g, 38, y - 5, 8, 6, '#2b3347');
    ell(g, 39, y - 6, 6, 4, '#3a455f');
    R(g, 43, y - 5, 5, 4, '#2b3347');
    R(g, 46, y - 4, 2, 2, '#10141d');
    // ears
    R(g, 33, y - 12, 3, 5, '#232a3c'); R(g, 39, y - 12, 3, 4, '#2b3347');
    pxl(g, 34, y - 11, '#4b566f'); pxl(g, 40, y - 11, '#4b566f');
    // eyes
    R(g, 39, y - 7, 2, 1, '#ffcf5c'); pxl(g, 40, y - 7, '#fff1b8');
    pxl(g, 41, y - 3, '#e8e8e8');
    // nose
    pxl(g, 47, y - 4, '#05070b');
    // fangs
    pxl(g, 44, y - 1, '#e8e8e0'); pxl(g, 46, y - 1, '#e8e8e0');
    // scar
    R(g, 36, y - 9, 1, 4, '#6b5b63');
  } },

  bandit: { w: 30, h: 42, draw(g, f, x) {
    const bob = [0, 1, 0, -1][f];
    const leg = [0, 1, 0, -1][f];
    ell(g, 15, 40, 9, 3, 'rgba(5,10,18,.5)');
    // legs
    R(g, 10, 29 + bob, 4, 8 + leg, '#2a2a35'); R(g, 17, 29 + bob, 4, 8 - leg, '#23232d');
    R(g, 9, 37 + bob, 6, 3, '#17171d'); R(g, 17, 37 + bob, 6, 3, '#15151a');
    // cloak
    R(g, 7, 16 + bob, 16, 16, '#3b2d2c');
    R(g, 8, 17 + bob, 13, 13, '#4a3935');
    R(g, 8, 28 + bob, 5, 3, '#2d2321'); R(g, 18, 28 + bob, 5, 3, '#2d2321');
    // torso leather
    R(g, 10, 17 + bob, 10, 10, '#2e2b2e');
    R(g, 11, 18 + bob, 4, 8, '#443f40');
    R(g, 9, 26 + bob, 12, 2, '#1c1a1b');
    R(g, 13, 26 + bob, 4, 2, '#8a6a34');
    // arms
    R(g, 6, 18 + bob, 3, 7, '#3b2d2c'); R(g, 20, 18 + bob, 3, 5, '#3b2d2c');
    R(g, 7, 24 + bob, 2, 2, '#b88968'); R(g, 21, 22 + bob, 2, 2, '#a87a5a');
    // dagger
    R(g, 21, 20 + bob, 2, 9, '#9aa0ac'); R(g, 22, 21 + bob, 1, 6, '#d8dee8');
    R(g, 19, 25 + bob, 5, 2, '#6b4a2a');
    // head / hood
    R(g, 9, 7 + bob, 12, 10, '#252025');
    R(g, 10, 8 + bob, 10, 7, '#342d31');
    R(g, 11, 10 + bob, 8, 4, '#1a171a');
    R(g, 12, 10 + bob, 6, 2, '#c9a06f');
    // mask
    R(g, 11, 9 + bob, 9, 4, '#1a1619');
    R(g, 12, 9 + bob, 2, 2, '#b88968'); R(g, 17, 9 + bob, 2, 2, '#b88968');
    R(g, 15, 12 + bob, 4, 3, '#2d292a');
    // eyes
    R(g, 12, 9 + bob, 2, 1, '#e8c47a'); R(g, 17, 9 + bob, 1, 1, '#e8c47a');
    // hood tip
    R(g, 12, 4 + bob, 6, 4, '#2d262b'); R(g, 14, 3 + bob, 3, 2, '#3a3036');
  } },

  skeleton: { w: 28, h: 42, draw(g, f) {
    const bob = [0, 1, 0, -1][f];
    const leg = [0, 2, 0, -2][f];
    ell(g, 14, 40, 9, 3, 'rgba(4,8,14,.5)');
    // legs
    R(g, 9, 30 + bob, 3, 8 + leg, '#b9b6a3'); R(g, 16, 30 + bob, 3, 8 - leg, '#9c9989');
    R(g, 9, 37 + bob, 5, 2, '#878577'); R(g, 16, 37 + bob, 5, 2, '#767467');
    R(g, 10, 33 + bob, 1, 3, '#d8d5c2'); R(g, 17, 33 + bob, 1, 3, '#c7c4b1');
    // pelvis
    R(g, 9, 27 + bob, 10, 4, '#b9b6a3');
    R(g, 11, 28 + bob, 2, 2, '#7d7b6e'); R(g, 15, 28 + bob, 2, 2, '#7d7b6e');
    // spine
    R(g, 13, 17 + bob, 2, 11, '#c9c6b2');
    for (let i = 0; i < 4; i++) R(g, 11, 19 + i * 2 + bob, 6, 1, '#8e8b7c');
    // ribs
    for (let i = 0; i < 3; i++) {
      R(g, 8, 18 + i * 3 + bob, 12, 1, '#d8d5c0');
      R(g, 8, 18 + i * 3 + bob, 2, 2, '#a9a693');
      R(g, 18, 18 + i * 3 + bob, 2, 2, '#a9a693');
    }
    // arms
    R(g, 6, 18 + bob, 3, 8, '#c2bfab'); R(g, 20, 18 + bob, 3, 7, '#a9a693');
    R(g, 6, 26 + bob, 2, 2, '#d8d5c0'); R(g, 21, 25 + bob, 2, 2, '#d8d5c0');
    // rusty sword
    R(g, 22, 17 + bob, 2, 12, '#7d7f81'); R(g, 23, 18 + bob, 1, 8, '#a8a9a6');
    R(g, 20, 24 + bob, 6, 2, '#5d4a34');
    pxl(g, 22, 16 + bob, '#c96a4a');
    // skull
    R(g, 9, 7 + bob, 10, 9, '#d8d5c0');
    R(g, 10, 6 + bob, 8, 11, '#e6e3cd');
    R(g, 9, 12 + bob, 10, 4, '#c2bfab');
    R(g, 10, 14 + bob, 8, 2, '#8f8c7d');
    R(g, 11, 10 + bob, 3, 3, '#17171d'); R(g, 16, 10 + bob, 2, 3, '#17171d');
    pxl(g, 12, 10 + bob, '#68e0c0'); pxl(g, 17, 10 + bob, '#68e0c0');
    R(g, 13, 14 + bob, 1, 1, '#6f6d61'); R(g, 15, 14 + bob, 1, 1, '#6f6d61');
    // crack
    R(g, 15, 6 + bob, 1, 3, '#8f8c7d');
    // tattered cloth
    R(g, 7, 17 + bob, 3, 7, '#302f3a'); R(g, 19, 18 + bob, 3, 6, '#25242d');
  } },

  wraith: { w: 36, h: 50, draw(g, f) {
    const bob = [0, -2, 0, 2][f];
    const sway = [0, 1, 0, -1][f];
    // shadow
    ell(g, 18, 47, 10, 2, 'rgba(4,8,18,.4)');
    // spectral trail
    for (let i = 0; i < 5; i++) {
      ell(g, 18 + sway + Math.sin(i) * 2, 38 + i * 2, 8 - i, 3, `rgba(80,100,180,${0.16 - i * 0.02})`);
    }
    // robe
    g.fillStyle = '#1c1b32';
    g.beginPath();
    g.moveTo(18, 7 + bob); g.lineTo(30, 20 + bob); g.lineTo(26, 42 + bob);
    g.lineTo(22, 38 + bob); g.lineTo(18, 45 + bob); g.lineTo(14, 38 + bob);
    g.lineTo(10, 42 + bob); g.lineTo(6, 20 + bob); g.closePath();
    g.fill();
    g.fillStyle = '#2b2a4b';
    g.beginPath();
    g.moveTo(18, 9 + bob); g.lineTo(26, 21 + bob); g.lineTo(23, 38 + bob);
    g.lineTo(18, 41 + bob); g.lineTo(12, 38 + bob); g.lineTo(9, 21 + bob); g.closePath();
    g.fill();
    // inner glow
    R(g, 13, 20 + bob, 10, 12, '#17162d');
    R(g, 15, 22 + bob, 6, 8, '#242245');
    // arms / claws
    R(g, 7, 19 + bob, 3, 10, '#24233f');
    R(g, 26, 19 + bob, 3, 10, '#24233f');
    R(g, 6, 28 + bob, 3, 5, '#3a385e');
    R(g, 27, 28 + bob, 3, 5, '#3a385e');
    pxl(g, 6, 33 + bob, '#8ea0ff'); pxl(g, 8, 32 + bob, '#8ea0ff');
    pxl(g, 28, 33 + bob, '#8ea0ff'); pxl(g, 30, 32 + bob, '#8ea0ff');
    // hood / face void
    ell(g, 18, 13 + bob, 9, 9, '#141327');
    ell(g, 18, 14 + bob, 7, 6, '#080711');
    // eyes
    R(g, 14, 13 + bob, 2, 2, '#9d7bff'); R(g, 20, 13 + bob, 2, 2, '#9d7bff');
    pxl(g, 14, 13 + bob, '#f0e8ff'); pxl(g, 20, 13 + bob, '#f0e8ff');
    // rune
    pxl(g, 18, 24 + bob, '#815cff'); pxl(g, 17, 25 + bob, '#5c46b8'); pxl(g, 19, 25 + bob, '#5c46b8');
    // wisps
    pxl(g, 5 + sway, 12 + bob, '#a78bff'); pxl(g, 31 - sway, 16 + bob, '#a78bff');
  } },

  golem: { w: 50, h: 56, draw(g, f) {
    const bob = [0, 1, 0, -1][f];
    ell(g, 25, 53, 18, 4, 'rgba(4,8,14,.55)');
    // legs
    R(g, 13, 38 + bob, 9, 15, '#353a44'); R(g, 14, 39 + bob, 6, 12, '#4a5059');
    R(g, 28, 38 + bob, 9, 15, '#2d323b'); R(g, 29, 39 + bob, 6, 12, '#42474f');
    R(g, 11, 50 + bob, 13, 4, '#252930'); R(g, 26, 50 + bob, 13, 4, '#1f2329');
    // body
    ell(g, 25, 29 + bob, 16, 15, '#3a3f49');
    ell(g, 25, 27 + bob, 13, 12, '#515760');
    R(g, 17, 20 + bob, 16, 19, '#424852');
    // rocky plates
    const r = mulberry32(77);
    for (let i = 0; i < 14; i++) {
      const x = 11 + r() * 28, y = 16 + r() * 22;
      R(g, x, y, 3 + r() * 4, 2 + r() * 3, r() > 0.5 ? '#626a74' : '#2e333c');
    }
    // arms
    R(g, 3, 22 + bob, 9, 18, '#3a3f49'); R(g, 5, 23 + bob, 5, 15, '#525860');
    R(g, 38, 22 + bob, 9, 18, '#30353e'); R(g, 40, 23 + bob, 5, 15, '#474d56');
    R(g, 1, 38 + bob, 13, 9, '#2c3139'); R(g, 36, 38 + bob, 13, 9, '#252a31');
    // core
    disc(g, 25, 29 + bob, 6, '#203e4a');
    disc(g, 25, 29 + bob, 4, '#3b8fa2');
    disc(g, 25, 29 + bob, 2, '#9df5ff');
    pxl(g, 24, 28 + bob, '#e3ffff');
    // head
    R(g, 18, 6 + bob, 14, 12, '#363b45');
    R(g, 19, 7 + bob, 11, 9, '#4b515b');
    R(g, 20, 10 + bob, 4, 2, '#9cefff'); R(g, 27, 10 + bob, 3, 2, '#9cefff');
    R(g, 22, 15 + bob, 7, 2, '#252a31');
    R(g, 17, 5 + bob, 16, 3, '#59606a');
    // moss
    for (let i = 0; i < 8; i++) pxl(g, 12 + Math.floor(r() * 26), 18 + Math.floor(r() * 26), '#3f6547');
    // cracks glow
    R(g, 19, 17 + bob, 1, 6, '#2a4a50'); R(g, 30, 24 + bob, 1, 8, '#2a4a50');
    pxl(g, 19, 21 + bob, '#5ab8c8');
  } },

  spider: { w: 44, h: 32, draw(g, f) {
    const bob = [0, 1, 0, -1][f];
    const y = 18 + bob;
    ell(g, 22, 30, 16, 3, 'rgba(4,8,14,.5)');
    // legs
    for (let i = 0; i < 4; i++) {
      const off = (i % 2 === 0 ? 1 : -1) * (f % 2 === 0 ? 2 : -2);
      line(g, 15, y, 3 + i * 2, y - 8 + off, '#1c1b25', 2);
      line(g, 3 + i * 2, y - 8 + off, 2 + i * 2, y - 1, '#2f2d3a', 2);
      line(g, 29, y, 41 - i * 2, y - 8 - off, '#17161f', 2);
      line(g, 41 - i * 2, y - 8 - off, 42 - i * 2, y - 1, '#2a2834', 2);
    }
    // abdomen
    ell(g, 15, y - 4, 10, 7, '#14131c');
    ell(g, 15, y - 5, 8, 5, '#252032');
    ell(g, 14, y - 7, 5, 2, '#3d314f');
    // hourglass mark
    R(g, 14, y - 6, 2, 2, '#d84e58'); R(g, 16, y - 5, 1, 1, '#d84e58'); R(g, 14, y - 4, 2, 1, '#d84e58');
    // cephalothorax
    ell(g, 28, y - 3, 7, 6, '#1a1924');
    ell(g, 28, y - 4, 5, 4, '#2b2638');
    // eyes
    const eyes = [[26, y - 6], [29, y - 6], [27, y - 8], [30, y - 8], [24, y - 4], [32, y - 4]];
    for (const [ex, ey] of eyes) { R(g, ex, ey, 1, 1, '#ff5773'); }
    // fangs
    R(g, 27, y + 1, 1, 3, '#d8d0c0'); R(g, 30, y + 1, 1, 3, '#d8d0c0');
    // hairs
    for (let i = 0; i < 8; i++) pxl(g, 8 + i * 3, y - 10 + (i % 3), '#4a405f');
  } },

  knight: { w: 32, h: 48, draw(g, f) {
    const bob = [0, 1, 0, -1][f];
    const leg = [0, 2, 0, -2][f];
    ell(g, 16, 45, 10, 3, 'rgba(4,8,14,.55)');
    // cape
    R(g, 7, 16 + bob, 18, 20, '#241f2d');
    R(g, 8, 17 + bob, 16, 17, '#332b3e');
    R(g, 8, 33 + bob, 5, 4, '#211d28'); R(g, 19, 33 + bob, 5, 4, '#1d1a23');
    // legs
    R(g, 10, 31 + bob, 5, 10 + leg, '#3c414d'); R(g, 17, 31 + bob, 5, 10 - leg, '#323743');
    R(g, 9, 40 + bob, 7, 4, '#262a32'); R(g, 17, 40 + bob, 7, 4, '#20242b');
    // torso armor
    R(g, 9, 17 + bob, 14, 13, '#454b57');
    R(g, 10, 18 + bob, 5, 10, '#626a78');
    R(g, 17, 18 + bob, 5, 9, '#353a45');
    R(g, 9, 27 + bob, 14, 3, '#2b2f38');
    R(g, 11, 28 + bob, 10, 1, '#c9a04f');
    // shoulder plates
    R(g, 5, 17 + bob, 6, 6, '#555c68'); R(g, 21, 17 + bob, 6, 6, '#454b57');
    R(g, 6, 17 + bob, 4, 1, '#7d8593'); R(g, 22, 17 + bob, 4, 1, '#626a78');
    // shield
    R(g, 2, 21 + bob, 8, 12, '#2b2f38');
    R(g, 3, 22 + bob, 6, 10, '#4d3947');
    R(g, 4, 23 + bob, 4, 8, '#67465b');
    R(g, 5, 24 + bob, 2, 5, '#c9a04f');
    // sword
    R(g, 22, 18 + bob, 2, 14, '#8f96a4'); R(g, 23, 19 + bob, 1, 11, '#c6ccd8');
    R(g, 19, 24 + bob, 7, 2, '#6b522f');
    pxl(g, 22, 17 + bob, '#e2e6ef');
    // helmet
    R(g, 10, 6 + bob, 12, 12, '#3b404b');
    R(g, 11, 7 + bob, 10, 9, '#555c68');
    R(g, 12, 8 + bob, 4, 6, '#737b8a');
    R(g, 12, 11 + bob, 8, 2, '#13151b');
    R(g, 14, 11 + bob, 2, 1, '#ff5773'); R(g, 18, 11 + bob, 1, 1, '#ff5773');
    R(g, 15, 4 + bob, 2, 4, '#8a3f54');
    R(g, 13, 3 + bob, 6, 2, '#b2576a');
    // crest
    R(g, 21, 8 + bob, 3, 6, '#8a3f54');
  } },

  dragonling: { w: 46, h: 40, draw(g, f) {
    const bob = [0, -1, 0, 1][f];
    const flap = [2, 0, -2, 0][f];
    ell(g, 24, 37, 13, 3, 'rgba(4,8,14,.5)');
    // tail
    line(g, 13, 26 + bob, 2, 21 + bob, '#5a2a24', 3);
    line(g, 13, 26 + bob, 3, 22 + bob, '#8a3d2c', 1);
    line(g, 2, 21 + bob, 6, 24 + bob, '#3a1d1b', 2);
    // wings
    g.fillStyle = '#4a2428';
    g.beginPath();
    g.moveTo(22, 16 + bob); g.lineTo(8, 4 + bob + flap); g.lineTo(5, 15 + bob + flap); g.lineTo(12, 14 + bob); g.lineTo(9, 24 + bob); g.closePath(); g.fill();
    g.fillStyle = '#6b3132';
    g.beginPath();
    g.moveTo(22, 16 + bob); g.lineTo(11, 7 + bob + flap); g.lineTo(9, 14 + bob + flap); g.lineTo(15, 15 + bob); g.closePath(); g.fill();
    g.fillStyle = '#3d1f24';
    g.beginPath();
    g.moveTo(28, 16 + bob); g.lineTo(42, 3 + bob - flap); g.lineTo(44, 15 + bob - flap); g.lineTo(38, 14 + bob); g.lineTo(41, 23 + bob); g.closePath(); g.fill();
    g.fillStyle = '#5c2b2e';
    g.beginPath();
    g.moveTo(28, 16 + bob); g.lineTo(40, 7 + bob - flap); g.lineTo(41, 14 + bob - flap); g.lineTo(35, 15 + bob); g.closePath(); g.fill();
    // legs
    R(g, 17, 30 + bob, 4, 7, '#4a2422'); R(g, 28, 30 + bob, 4, 7, '#3d1d1d');
    R(g, 15, 35 + bob, 7, 3, '#2a1616'); R(g, 27, 35 + bob, 7, 3, '#241313');
    // body
    ell(g, 24, 25 + bob, 11, 8, '#5a2a24');
    ell(g, 24, 24 + bob, 9, 6, '#7a392b');
    ell(g, 22, 22 + bob, 5, 3, '#a65338');
    // spine spikes
    for (let i = 0; i < 4; i++) R(g, 18 + i * 4, 16 + bob + (i % 2), 2, 3, '#c98a4a');
    // neck/head
    ell(g, 35, 17 + bob, 7, 6, '#7a392b');
    R(g, 38, 15 + bob, 7, 4, '#6b3027');
    R(g, 43, 16 + bob, 3, 2, '#4a1f1c');
    // horns
    R(g, 34, 9 + bob, 2, 5, '#b9a071'); R(g, 38, 10 + bob, 2, 4, '#8f7852');
    // eye
    R(g, 38, 15 + bob, 2, 1, '#ffd35c'); pxl(g, 39, 15 + bob, '#fff4c4');
    // fire glow
    pxl(g, 45, 17 + bob, '#ff8a3d'); pxl(g, 46, 16 + bob, '#ffcf5c');
    // chest scale
    R(g, 22, 25 + bob, 4, 3, '#c98a4a');
  } },

  cultist: { w: 30, h: 44, draw(g, f) {
    const bob = [0, -1, 0, 1][f];
    ell(g, 15, 42, 9, 3, 'rgba(4,8,14,.5)');
    // robe
    g.fillStyle = '#2a1838';
    g.beginPath();
    g.moveTo(15, 7 + bob); g.lineTo(25, 18 + bob); g.lineTo(28, 40 + bob);
    g.lineTo(15, 36 + bob); g.lineTo(2, 40 + bob); g.lineTo(5, 18 + bob); g.closePath(); g.fill();
    g.fillStyle = '#3c2450';
    g.beginPath();
    g.moveTo(15, 9 + bob); g.lineTo(21, 19 + bob); g.lineTo(23, 36 + bob);
    g.lineTo(15, 33 + bob); g.lineTo(7, 36 + bob); g.lineTo(9, 19 + bob); g.closePath(); g.fill();
    // trim
    R(g, 5, 35 + bob, 20, 2, '#6a3f86');
    R(g, 8, 22 + bob, 14, 2, '#8a5aa0');
    // arms
    R(g, 4, 19 + bob, 3, 10, '#2a1838'); R(g, 23, 19 + bob, 3, 10, '#2a1838');
    R(g, 4, 28 + bob, 2, 2, '#a784bb'); R(g, 24, 28 + bob, 2, 2, '#a784bb');
    // staff
    R(g, 26, 12 + bob, 2, 26, '#3a2a1c'); R(g, 26, 12 + bob, 1, 24, '#5c452a');
    disc(g, 27, 10 + bob, 3, '#5a2a7a'); disc(g, 27, 10 + bob, 2, '#a45cd8'); pxl(g, 27, 9 + bob, '#e6c4ff');
    // hood
    ell(g, 15, 12 + bob, 9, 9, '#241232');
    ell(g, 15, 13 + bob, 7, 7, '#0d0614');
    // eyes
    R(g, 12, 13 + bob, 2, 1, '#d45cff'); R(g, 17, 13 + bob, 2, 1, '#d45cff');
    // rune floating
    pxl(g, 20, 6 + bob, '#b47aff'); pxl(g, 10, 4 + bob, '#8a5aa0');
  } },

  boar: { w: 46, h: 32, draw(g, f) {
    const bob = [0, 1, 0, -1][f];
    const leg = [0, 2, 0, -2][f];
    ell(g, 23, 29, 15, 3, 'rgba(4,8,14,.5)');
    R(g, 12 + leg, 21 + bob, 5, 8, '#2b2430'); R(g, 18 - leg, 21 + bob, 5, 8, '#241e29');
    R(g, 29 + leg, 21 + bob, 5, 8, '#2b2430'); R(g, 35 - leg, 21 + bob, 5, 8, '#241e29');
    R(g, 10 + leg, 28 + bob, 8, 3, '#1b1720'); R(g, 16 - leg, 28 + bob, 8, 3, '#17141c');
    R(g, 27 + leg, 28 + bob, 8, 3, '#1b1720'); R(g, 33 - leg, 28 + bob, 8, 3, '#17141c');
    // body
    ell(g, 25, 18 + bob, 15, 10, '#2a2232');
    ell(g, 25, 17 + bob, 12, 8, '#3a2f45');
    ell(g, 23, 14 + bob, 8, 3, '#50405f');
    // bristles
    for (let i = 0; i < 10; i++) {
      R(g, 12 + i * 3, 8 + bob + (i % 2), 1, 4, '#17131f');
    }
    // head
    ell(g, 38, 17 + bob, 8, 7, '#33283d');
    R(g, 43, 17 + bob, 4, 4, '#241d2b');
    pxl(g, 47, 18 + bob, '#100c16'); pxl(g, 47, 20 + bob, '#100c16');
    // tusks
    R(g, 43, 21 + bob, 1, 5, '#e2d6b8'); R(g, 45, 20 + bob, 1, 5, '#cbbd9e');
    R(g, 43, 25 + bob, 2, 1, '#f0e8d0');
    // eye
    R(g, 39, 15 + bob, 2, 1, '#ff5773'); pxl(g, 40, 15 + bob, '#ffb0b8');
    // ear
    R(g, 34, 10 + bob, 3, 3, '#241d2b');
  } },
};

export function buildMonsterSprites(types) {
  const result = {};
  for (const type of types) {
    const def = MONSTER_ART[type];
    if (!def) continue;
    const frames = [];
    for (let f = 0; f < 4; f++) {
      const c = makeCanvas(def.w, def.h);
      const g = c.getContext('2d');
      def.draw(g, f);
      frames.push(c);
    }
    result[type] = frames;
  }
  return result;
}
