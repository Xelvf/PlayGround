// ============================================================
// Eclipse System — art registry
// ============================================================
import { buildTiles } from './tiles.js';
import { buildProps } from './props.js';
import { buildMonsterSprites, MONSTER_ART } from './monsters.js';
import { buildBossSprites, BOSS_ART } from './bosses.js';
import { buildNpcSprites, NPC_LOOKS, makePortrait, buildHeroSprites, drawPreview } from './heroes.js';
import { weaponIcon, armorIcon, accessoryIcon, consumableIcon, sigilIcon, genericIcon } from './items.js';

export { MONSTER_ART, BOSS_ART, NPC_LOOKS, makePortrait, buildHeroSprites, drawPreview, weaponIcon, armorIcon, accessoryIcon, consumableIcon, sigilIcon, genericIcon };
export { TILE, T, TILE_COLORS } from './tiles.js';

export const art = {
  tiles: null,
  props: null,
  monsters: null,
  bosses: null,
  npcs: null,
  npcPortraits: null,
  ready: false,
};

export function initArt() {
  art.tiles = buildTiles();
  art.props = buildProps();
  const monsterTypes = Object.keys(MONSTER_ART);
  art.monsters = buildMonsterSprites(monsterTypes);
  art.bosses = buildBossSprites(Object.keys(BOSS_ART));
  art.npcs = {};
  art.npcPortraits = {};
  for (const key of Object.keys(NPC_LOOKS)) {
    art.npcs[key] = buildNpcSprites(key);
    art.npcPortraits[key] = makePortrait(art.npcs[key].down[0], 64, 72, 2.6, 2);
  }
  art.ready = true;
}

export function getMonsterFrame(type, frame) {
  const set = art.monsters[type] || art.bosses[type];
  if (!set) return null;
  return set[frame % set.length];
}

export function getMonsterIcon(type, size = 50) {
  const set = art.monsters[type] || art.bosses[type];
  if (!set) return null;
  const src = set[0];
  const scale = Math.min(size / src.width, size / src.height);
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const g = c.getContext('2d');
  g.imageSmoothingEnabled = false;
  g.drawImage(src, (size - src.width * scale) / 2, (size - src.height * scale) / 2, src.width * scale, src.height * scale);
  return c;
}
