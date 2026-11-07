// ============================================================
// Eclipse System — procedural pixel tiles
// ============================================================
import { makeCanvas, px, pxl, hash2, mulberry32, TAU } from '../utils.js';

export const TILE = 32;

export const T = {
  GRASS: 0, GRASS_DARK: 1, FOREST: 2, PATH: 3, WATER: 4, SAND: 5,
  STONE: 6, DARK: 7, DUNGEON: 8, WALL: 9, BOSS: 10, VOID: 11, LAVA: 12,
  MOSS_STONE: 13,
};

const C = {
  grass: ['#2a5135', '#315d3a', '#37683f', '#2d5838', '#234b30'],
  grassLite: '#4d7f4c', grassDark: '#1a3824',
  forest: ['#223f2c', '#284a31', '#2d5236', '#1d3827'],
  path: ['#6b5942', '#75634a', '#5e4d39', '#7c6a50'],
  water: ['#17415f', '#1b4a6b', '#215574', '#123550'],
  waterLite: '#4f9bb3',
  sand: ['#a89366', '#b39d70', '#998556'],
  stone: ['#555f6c', '#5e6875', '#4b5562'],
  darkStone: ['#2c3040', '#33384a', '#262a38'],
  dungeon: ['#3a3f4e', '#424858', '#333846'],
  dungeonWall: ['#2b3042', '#353b50', '#242939'],
  bossFloor: ['#211c30', '#29233d', '#1b1729', '#302644'],
};

function noiseFill(ctx, w, h, colors, seed) {
  const r = mulberry32(seed);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      ctx.fillStyle = colors[Math.floor(r() * colors.length)];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function grass(seed, dark = false) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  noiseFill(g, TILE, TILE, dark ? C.forest : C.grass, seed);
  const r = mulberry32(seed + 11);
  // blade clusters
  for (let i = 0; i < 13; i++) {
    const bx = 1 + Math.floor(r() * 29), by = 2 + Math.floor(r() * 28);
    const h = 1 + Math.floor(r() * 3);
    g.fillStyle = r() > 0.45 ? (dark ? '#365f40' : '#477a48') : (dark ? '#152d1d' : '#1b3925');
    g.fillRect(bx, by, 1, h);
    if (r() > 0.7) g.fillRect(bx + 1, by - (r() > 0.5 ? 1 : 0), 1, h);
  }
  // tiny flowers / mushrooms
  const n = dark ? 1 : 2;
  for (let i = 0; i < n; i++) {
    const fx = 3 + Math.floor(r() * 26), fy = 3 + Math.floor(r() * 25);
    const col = r() > 0.6 ? '#b9c8dd' : r() > 0.35 ? '#d9c36b' : '#9a7bc0';
    pxl(g, fx, fy, col);
    pxl(g, fx + 1, fy, col);
    pxl(g, fx, fy + 1, col);
  }
  // pebbles
  for (let i = 0; i < 3; i++) {
    const bx = 3 + Math.floor(r() * 26), by = 3 + Math.floor(r() * 26);
    pxl(g, bx, by, '#6b6f62');
    pxl(g, bx + 1, by, '#4d5248');
  }
  return c;
}

function path(seed) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  noiseFill(g, TILE, TILE, C.path, seed);
  const r = mulberry32(seed + 19);
  for (let i = 0; i < 12; i++) {
    const bx = Math.floor(r() * 29), by = Math.floor(r() * 29), w = 1 + Math.floor(r() * 2);
    g.fillStyle = r() > 0.55 ? '#8a765a' : '#554634';
    g.fillRect(bx, by, w, 1);
  }
  for (let i = 0; i < 6; i++) {
    pxl(g, Math.floor(r() * 31), Math.floor(r() * 31), r() > 0.5 ? '#3e3325' : '#8d7d61');
  }
  // grass tufts at edges
  if (r() > 0.4) {
    g.fillStyle = '#345f3b';
    g.fillRect(0, Math.floor(r() * 30), 2, 1);
    g.fillRect(30, Math.floor(r() * 30), 2, 1);
  }
  return c;
}

function water(seed, frame) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  noiseFill(g, TILE, TILE, C.water, seed);
  const r = mulberry32(seed + 3);
  // depth patches
  for (let i = 0; i < 5; i++) {
    g.fillStyle = '#0e2c44';
    g.fillRect(Math.floor(r() * 31), Math.floor(r() * 31), 2 + Math.floor(r() * 4), 1);
  }
  for (let y = 0; y < TILE; y += 4) {
    const off = Math.round(Math.sin((y + frame * 6) * 0.4 + seed) * 3);
    g.fillStyle = 'rgba(89,164,184,.35)';
    g.fillRect((off + 31) % 32, y + 1, 4, 1);
    if (r() > 0.5) g.fillRect((off + 14) % 32, y + 2, 3, 1);
  }
  g.fillStyle = 'rgba(173,222,227,.55)';
  g.fillRect(6 + (frame % 2), 9, 3, 1);
  g.fillRect(22 - (frame % 2), 22, 2, 1);
  return c;
}

function sand(seed) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  noiseFill(g, TILE, TILE, C.sand, seed);
  const r = mulberry32(seed + 9);
  for (let i = 0; i < 15; i++) {
    g.fillStyle = r() > 0.5 ? '#c2ac7c' : '#8e7a52';
    g.fillRect(Math.floor(r() * 31), Math.floor(r() * 31), 1 + Math.floor(r() * 2), 1);
  }
  // shore shells
  if (r() > 0.75) {
    pxl(g, 14, 18, '#e0d4bd'); pxl(g, 15, 18, '#cbbca0'); pxl(g, 15, 17, '#e0d4bd');
  }
  return c;
}

function stone(seed, dark = false) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  noiseFill(g, TILE, TILE, dark ? C.darkStone : C.stone, seed);
  const r = mulberry32(seed + 13);
  // paving cracks
  g.fillStyle = dark ? '#1c202c' : '#3d4653';
  for (let i = 0; i < 3; i++) {
    const y = 4 + Math.floor(r() * 25);
    g.fillRect(Math.floor(r() * 10), y, 8 + Math.floor(r() * 12), 1);
  }
  for (let i = 0; i < 2; i++) {
    const x = 4 + Math.floor(r() * 24);
    g.fillRect(x, Math.floor(r() * 8), 1, 9 + Math.floor(r() * 10));
  }
  // highlight chips
  for (let i = 0; i < 5; i++) {
    pxl(g, Math.floor(r() * 31), Math.floor(r() * 31), dark ? '#454c60' : '#77828f');
  }
  // moss
  if (r() > 0.58) {
    g.fillStyle = '#38543a';
    g.fillRect(2 + Math.floor(r() * 20), 22 + Math.floor(r() * 7), 2, 1);
    g.fillRect(8, 25, 1, 2);
  }
  return c;
}

function dungeonFloor(seed, boss = false) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  noiseFill(g, TILE, TILE, boss ? C.bossFloor : C.dungeon, seed);
  const r = mulberry32(seed + 17);
  const line = boss ? '#120e1e' : '#222632';
  const hi = boss ? '#40325a' : '#565d70';
  // slab seams
  g.fillStyle = line;
  g.fillRect(0, 15, 32, 1);
  g.fillRect(15, 0, 1, 16);
  g.fillRect(7, 16, 1, 16);
  g.fillRect(24, 16, 1, 16);
  g.fillStyle = boss ? 'rgba(120,76,190,.18)' : 'rgba(255,255,255,.03)';
  g.fillRect(0, 0, 32, 3);
  for (let i = 0; i < 7; i++) {
    pxl(g, Math.floor(r() * 31), Math.floor(r() * 31), hi);
  }
  if (boss) {
    // arcane veins
    g.fillStyle = '#55318b';
    let vx = 6, vy = 3;
    for (let i = 0; i < 6; i++) {
      g.fillRect(vx, vy, 1, 1);
      vx += r() > 0.5 ? 1 : 0; vy += r() > 0.4 ? 1 : 0;
    }
    g.fillStyle = '#9b6ee0';
    pxl(g, 12, 12, '#b993ff');
  }
  // crack
  if (!boss && r() > 0.5) {
    g.fillStyle = '#1b1f29';
    let cx = 4 + Math.floor(r() * 18), cy = 18;
    for (let i = 0; i < 6; i++) { g.fillRect(cx, cy, 1, 1); cx += r() > 0.5 ? 1 : -1; cy += r() > 0.4 ? 1 : 0; }
  }
  return c;
}

function wall(seed, variant = 0) {
  const H = 48;
  const c = makeCanvas(TILE, H), g = c.getContext('2d');
  noiseFill(g, TILE, H, C.dungeonWall, seed);
  const r = mulberry32(seed + 23);
  // top cap
  g.fillStyle = '#4a5268';
  g.fillRect(0, 0, 32, 3);
  g.fillStyle = '#5c6580';
  g.fillRect(0, 0, 32, 1);
  g.fillStyle = '#1c202d';
  g.fillRect(0, 12, 32, 2);
  // brick rows
  for (let row = 0; row < 4; row++) {
    const y = 5 + row * 10;
    g.fillStyle = '#1e2230';
    g.fillRect(0, y + 8, 32, 2);
    const off = row % 2 ? 0 : 8;
    for (let bx = -8; bx < 32; bx += 16) {
      g.fillStyle = row % 2 ? '#343a4c' : '#2f3546';
      g.fillRect(bx + off + 1, y, 14, 8);
      g.fillStyle = 'rgba(255,255,255,.05)';
      g.fillRect(bx + off + 1, y, 14, 1);
      g.fillStyle = 'rgba(0,0,0,.22)';
      g.fillRect(bx + off + 1, y + 7, 14, 1);
    }
  }
  for (let i = 0; i < 8; i++) {
    pxl(g, Math.floor(r() * 31), 4 + Math.floor(r() * 41), r() > 0.5 ? '#454d62' : '#1c2030');
  }
  if (variant === 1) {
    // mossy
    for (let i = 0; i < 16; i++) {
      const mx = Math.floor(r() * 30), my = 14 + Math.floor(r() * 30);
      g.fillStyle = r() > 0.5 ? '#35543d' : '#26452f';
      g.fillRect(mx, my, 1 + Math.floor(r() * 3), 1);
    }
  }
  if (variant === 2) {
    // root / crack
    g.fillStyle = '#171a24';
    let cx = 8 + Math.floor(r() * 12), cy = 14;
    for (let i = 0; i < 14; i++) { g.fillRect(cx, cy, 1, 1); cx += r() > 0.5 ? 1 : -1; cy += 1; }
  }
  return c;
}

function voidTile(seed) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  g.fillStyle = '#080511';
  g.fillRect(0, 0, 32, 32);
  const r = mulberry32(seed);
  for (let i = 0; i < 22; i++) {
    pxl(g, Math.floor(r() * 31), Math.floor(r() * 31), r() > 0.7 ? '#3a2260' : '#160d28');
  }
  for (let i = 0; i < 4; i++) {
    pxl(g, Math.floor(r() * 31), Math.floor(r() * 31), r() > 0.5 ? '#8d6cd4' : '#4aa4c8');
  }
  return c;
}

function lava(seed, frame) {
  const c = makeCanvas(TILE, TILE), g = c.getContext('2d');
  const r = mulberry32(seed);
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const v = Math.sin((x + frame * 3) * 0.45) + Math.cos((y - frame * 2) * 0.5) + r() * 0.8;
      g.fillStyle = v > 1.25 ? '#f5b84a' : v > 0.5 ? '#dd672f' : v > -0.4 ? '#b33b25' : '#7d241c';
      g.fillRect(x, y, 1, 1);
    }
  }
  return c;
}

export function buildTiles() {
  const tiles = {};
  tiles[T.GRASS] = [grass(101), grass(102), grass(103), grass(104)];
  tiles[T.GRASS_DARK] = [grass(201, true), grass(202, true), grass(203, true)];
  tiles[T.FOREST] = [grass(301, true), grass(302, true), grass(303, true), grass(304, true)];
  tiles[T.PATH] = [path(401), path(402), path(403)];
  tiles[T.WATER] = [
    [water(501, 0), water(502, 0), water(503, 0)],
    [water(501, 1), water(502, 1), water(503, 1)],
    [water(501, 2), water(502, 2), water(503, 2)],
  ];
  tiles[T.SAND] = [sand(601), sand(602)];
  tiles[T.STONE] = [stone(701), stone(702), stone(703)];
  tiles[T.DARK] = [stone(801, true), stone(802, true)];
  tiles[T.DUNGEON] = [dungeonFloor(901), dungeonFloor(902), dungeonFloor(903)];
  tiles[T.WALL] = [wall(1001, 0), wall(1002, 1), wall(1003, 2)];
  tiles[T.BOSS] = [dungeonFloor(1101, true), dungeonFloor(1102, true)];
  tiles[T.VOID] = [voidTile(1201), voidTile(1202)];
  tiles[T.LAVA] = [[lava(1301, 0), lava(1302, 0)], [lava(1301, 1), lava(1302, 1)]];
  tiles[T.MOSS_STONE] = [stone(1401), stone(1402, true)];
  return tiles;
}

export const TILE_COLORS = {
  [T.GRASS]: '#315d3a', [T.GRASS_DARK]: '#274833', [T.FOREST]: '#1f3c29',
  [T.PATH]: '#75634a', [T.WATER]: '#1b4a6b', [T.SAND]: '#a89366',
  [T.STONE]: '#56606d', [T.DARK]: '#2c3040', [T.DUNGEON]: '#3b4050',
  [T.WALL]: '#242939', [T.BOSS]: '#241e36', [T.VOID]: '#080511', [T.LAVA]: '#c94a26',
  [T.MOSS_STONE]: '#4b5c55',
};
