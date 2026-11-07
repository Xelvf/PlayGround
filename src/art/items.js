// ============================================================
// Eclipse System — item icons
// ============================================================
import { makeCanvas, px, pxl, shade } from '../utils.js';

const cache = new Map();

function base(g, color) {
  // soft glow behind icon
  const grd = g.createRadialGradient(18, 18, 2, 18, 18, 17);
  grd.addColorStop(0, color + '33');
  grd.addColorStop(1, 'transparent');
  g.fillStyle = grd;
  g.fillRect(0, 0, 36, 36);
}

function icon(key, drawFn) {
  if (cache.has(key)) return cache.get(key);
  const c = makeCanvas(36, 36), g = c.getContext('2d');
  drawFn(g);
  cache.set(key, c);
  return c;
}

export function weaponIcon(type, color = '#b9c6d8') {
  return icon('w:' + type + ':' + color, (g) => {
    base(g, color);
    const dark = shade(color, -0.55), lite = shade(color, 0.4);
    if (type === 'sword') {
      g.save(); g.translate(8, 28); g.rotate(-0.7);
      px(g, 0, 0, 3, 16, dark); px(g, 1, 0, 1, 16, lite);
      px(g, -3, 15, 9, 2, '#9a7b3d'); px(g, -1, 17, 5, 6, '#4a3420'); px(g, 0, 22, 3, 3, '#d6ac5b');
      g.restore();
    } else if (type === 'dual') {
      g.save(); g.translate(6, 28); g.rotate(-0.75);
      px(g, 0, 0, 2, 14, dark); px(g, 1, 0, 1, 14, lite);
      px(g, -2, 13, 6, 2, '#9a7b3d'); px(g, -1, 15, 4, 5, '#4a3420');
      g.restore();
      g.save(); g.translate(20, 28); g.rotate(-0.5);
      px(g, 0, 0, 2, 14, dark); px(g, 1, 0, 1, 14, lite);
      px(g, -2, 13, 6, 2, '#9a7b3d'); px(g, -1, 15, 4, 5, '#4a3420');
      g.restore();
    } else if (type === 'dagger') {
      g.save(); g.translate(13, 28); g.rotate(-0.6);
      px(g, 0, 2, 2, 9, dark); px(g, 1, 2, 1, 9, lite);
      px(g, -2, 11, 6, 2, '#8a6a34'); px(g, 0, 13, 2, 5, '#3a2818');
      g.restore();
    } else if (type === 'spear') {
      g.save(); g.translate(8, 30); g.rotate(-0.85);
      px(g, 10, 0, 2, 28, '#5a4228'); px(g, 11, 1, 1, 27, '#83613c');
      px(g, 8, -4, 6, 4, dark); px(g, 9, -6, 4, 4, color); px(g, 10, -8, 2, 3, lite);
      g.restore();
    } else if (type === 'greatsword') {
      g.save(); g.translate(7, 30); g.rotate(-0.72);
      px(g, 0, -4, 5, 23, dark); px(g, 1, -3, 2, 21, lite);
      px(g, -4, 17, 13, 3, '#9a7b3d'); px(g, 0, 20, 5, 7, '#4a3420'); px(g, 1, 26, 3, 3, '#d6ac5b');
      g.restore();
    } else if (type === 'bow') {
      g.strokeStyle = '#7a5a32'; g.lineWidth = 2;
      g.beginPath(); g.arc(24, 18, 12, Math.PI * 0.55, Math.PI * 1.45, true); g.stroke();
      g.strokeStyle = '#d6cdb8'; g.lineWidth = 1;
      g.beginPath(); g.moveTo(18, 6); g.lineTo(18, 30); g.stroke();
      px(g, 17, 16, 18, 2, '#8a6a34'); px(g, 17, 16, 18, 1, '#b68b45');
      px(g, 33, 15, 3, 3, color);
    } else if (type === 'staff') {
      g.save(); g.translate(10, 32); g.rotate(-0.25);
      px(g, 0, -8, 3, 27, '#4a3420'); px(g, 1, -8, 1, 27, '#7a5a32');
      px(g, -3, -13, 9, 7, '#3b2a53'); px(g, -2, -12, 7, 5, '#5a3f80');
      px(g, -1, -11, 5, 3, color);
      pxl(g, 1, -10, '#fff2c8');
      g.restore();
    } else {
      // fists / gauntlet
      px(g, 12, 10, 13, 13, dark); px(g, 13, 11, 11, 11, color);
      px(g, 13, 14, 3, 7, lite); px(g, 17, 14, 3, 7, lite); px(g, 21, 14, 3, 7, lite);
      px(g, 10, 15, 3, 7, '#6a4a2a'); px(g, 24, 15, 3, 7, '#6a4a2a');
    }
  });
}

export function armorIcon(kind, color = '#8a97ad') {
  return icon('a:' + kind + ':' + color, (g) => {
    base(g, color);
    const dark = shade(color, -0.5), lite = shade(color, 0.3);
    if (kind === 'robe') {
      g.beginPath(); g.moveTo(18, 6); g.lineTo(28, 12); g.lineTo(25, 31); g.lineTo(11, 31); g.lineTo(8, 12); g.closePath();
      g.fillStyle = dark; g.fill();
      g.beginPath(); g.moveTo(18, 9); g.lineTo(24, 14); g.lineTo(22, 28); g.lineTo(14, 28); g.lineTo(12, 14); g.closePath();
      g.fillStyle = color; g.fill();
      px(g, 17, 12, 2, 14, lite); px(g, 12, 18, 12, 2, '#c9a04f');
    } else if (kind === 'light') {
      g.beginPath(); g.moveTo(18, 6); g.lineTo(27, 11); g.lineTo(24, 28); g.lineTo(18, 31); g.lineTo(12, 28); g.lineTo(9, 11); g.closePath();
      g.fillStyle = dark; g.fill();
      g.beginPath(); g.moveTo(18, 9); g.lineTo(23, 13); g.lineTo(21, 26); g.lineTo(18, 28); g.lineTo(15, 26); g.lineTo(13, 13); g.closePath();
      g.fillStyle = color; g.fill();
      px(g, 15, 14, 6, 1, lite); px(g, 14, 20, 8, 1, lite);
      px(g, 13, 12, 10, 2, '#6b4a2a');
    } else {
      g.beginPath(); g.moveTo(18, 5); g.lineTo(28, 10); g.lineTo(26, 26); g.lineTo(18, 32); g.lineTo(10, 26); g.lineTo(8, 10); g.closePath();
      g.fillStyle = dark; g.fill();
      g.beginPath(); g.moveTo(18, 8); g.lineTo(24, 12); g.lineTo(22, 24); g.lineTo(18, 28); g.lineTo(14, 24); g.lineTo(12, 12); g.closePath();
      g.fillStyle = color; g.fill();
      px(g, 13, 12, 4, 10, lite); px(g, 20, 12, 3, 10, shade(color, -0.25));
      px(g, 10, 9, 16, 3, '#6b6f7a'); px(g, 18, 18, 2, 4, '#c9a04f');
    }
  });
}

export function accessoryIcon(kind, color = '#d6ac5b') {
  return icon('x:' + kind + ':' + color, (g) => {
    base(g, color);
    if (kind === 'amulet') {
      g.strokeStyle = '#9a8a62'; g.lineWidth = 1;
      g.beginPath(); g.arc(18, 16, 10, Math.PI * 0.15, Math.PI * 0.85); g.stroke();
      g.fillStyle = '#2a2238'; g.beginPath(); g.moveTo(18, 14); g.lineTo(24, 20); g.lineTo(18, 30); g.lineTo(12, 20); g.closePath(); g.fill();
      g.fillStyle = color; g.beginPath(); g.moveTo(18, 17); g.lineTo(22, 21); g.lineTo(18, 27); g.lineTo(14, 21); g.closePath(); g.fill();
      pxl(g, 17, 19, '#fff8d0');
    } else if (kind === 'ring') {
      g.strokeStyle = color; g.lineWidth = 3;
      g.beginPath(); g.arc(18, 21, 8, 0, Math.PI * 2); g.stroke();
      g.fillStyle = shade(color, 0.45); g.beginPath(); g.moveTo(18, 6); g.lineTo(23, 12); g.lineTo(18, 17); g.lineTo(13, 12); g.closePath(); g.fill();
      pxl(g, 17, 9, '#fff');
    } else {
      // relic orb
      g.fillStyle = '#1e1838'; g.beginPath(); g.arc(18, 18, 11, 0, Math.PI * 2); g.fill();
      g.fillStyle = color; g.beginPath(); g.arc(18, 18, 8, 0, Math.PI * 2); g.fill();
      g.fillStyle = shade(color, 0.5); g.beginPath(); g.arc(16, 16, 4, 0, Math.PI * 2); g.fill();
      pxl(g, 15, 15, '#fff');
    }
  });
}

export function consumableIcon(kind) {
  return icon('c:' + kind, (g) => {
    if (kind === 'hp') {
      base(g, '#ff5773');
      px(g, 12, 10, 12, 5, '#2a3344');
      px(g, 14, 8, 8, 3, '#0e1520');
      px(g, 11, 14, 14, 17, '#3a1620');
      px(g, 12, 15, 12, 15, '#7a2030');
      px(g, 13, 15, 4, 14, '#d84a60');
      px(g, 14, 18, 8, 10, '#ff5773');
      px(g, 16, 20, 4, 6, '#ffb0bf');
      px(g, 16, 18, 1, 10, '#ffe0e5'); px(g, 12, 22, 9, 1, '#ffe0e5');
    } else if (kind === 'mp') {
      base(g, '#5ed8ff');
      px(g, 12, 10, 12, 5, '#23324a');
      px(g, 14, 8, 8, 3, '#0e1520');
      px(g, 11, 14, 14, 17, '#122a3a');
      px(g, 12, 15, 12, 15, '#1c4a6b');
      px(g, 13, 15, 4, 14, '#3a9bc0');
      px(g, 14, 18, 8, 10, '#5ed8ff');
      px(g, 16, 20, 4, 6, '#c8f4ff');
      px(g, 16, 18, 1, 10, '#effdff'); px(g, 12, 22, 9, 1, '#effdff');
    } else if (kind === 'essence') {
      base(g, '#b79bff');
      g.fillStyle = '#2a1b4d'; g.beginPath(); g.moveTo(18, 5); g.lineTo(28, 15); g.lineTo(23, 31); g.lineTo(13, 31); g.lineTo(8, 15); g.closePath(); g.fill();
      g.fillStyle = '#6b4fc4'; g.beginPath(); g.moveTo(18, 9); g.lineTo(24, 16); g.lineTo(21, 27); g.lineTo(15, 27); g.lineTo(12, 16); g.closePath(); g.fill();
      g.fillStyle = '#c2aaff'; g.beginPath(); g.moveTo(18, 13); g.lineTo(21, 18); g.lineTo(18, 24); g.lineTo(15, 18); g.closePath(); g.fill();
      pxl(g, 18, 16, '#fff');
    } else {
      // ore / material
      base(g, '#b9a06a');
      g.fillStyle = '#3a352c'; g.beginPath(); g.moveTo(8, 20); g.lineTo(14, 9); g.lineTo(25, 11); g.lineTo(30, 21); g.lineTo(22, 30); g.lineTo(10, 28); g.closePath(); g.fill();
      g.fillStyle = '#6b6353'; g.beginPath(); g.moveTo(12, 19); g.lineTo(16, 12); g.lineTo(23, 14); g.lineTo(26, 21); g.lineTo(21, 26); g.lineTo(13, 25); g.closePath(); g.fill();
      g.fillStyle = '#b9a06a'; px(g, 15, 16, 5, 3, '#b9a06a'); px(g, 21, 20, 4, 3, '#c9b07a');
      pxl(g, 17, 16, '#fff2c8'); pxl(g, 22, 21, '#fff2c8');
    }
  });
}

export function sigilIcon(kind = 'eclipse', color = '#b79bff') {
  return icon('s:' + kind + ':' + color, (g) => {
    base(g, color);
    g.fillStyle = '#1a1330';
    g.beginPath(); g.moveTo(18, 3); g.lineTo(30, 10); g.lineTo(30, 26); g.lineTo(18, 33); g.lineTo(6, 26); g.lineTo(6, 10); g.closePath(); g.fill();
    g.strokeStyle = color; g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(18, 6); g.lineTo(27, 11); g.lineTo(27, 25); g.lineTo(18, 30); g.lineTo(9, 25); g.lineTo(9, 11); g.closePath(); g.stroke();
    g.fillStyle = color;
    g.beginPath(); g.arc(18, 18, 6, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#0c0818';
    g.beginPath(); g.arc(20, 17, 5, 0, Math.PI * 2); g.fill();
    pxl(g, 15, 15, '#fff');
    pxl(g, 18, 26, color);
  });
}

export function genericIcon(key, glyph, color = '#5ed8ff') {
  return icon('g:' + key + ':' + color, (g) => {
    base(g, color);
    g.fillStyle = '#0c1628';
    g.beginPath(); g.moveTo(18, 4); g.lineTo(30, 11); g.lineTo(30, 25); g.lineTo(18, 32); g.lineTo(6, 25); g.lineTo(6, 11); g.closePath(); g.fill();
    g.strokeStyle = color + '88'; g.lineWidth = 1; g.stroke();
    g.fillStyle = color; g.font = '18px "Rajdhani", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(glyph, 18, 19);
  });
}
