// ============================================================
// Rarity definitions
// ============================================================
export const RARITIES = [
  { id: 'common', name: 'Common', color: '#b7c5d8', glow: '#8fa2bd', rank: 0, weight: 32, itemWeight: 46, statMul: 1.0 },
  { id: 'uncommon', name: 'Uncommon', color: '#57e0a0', glow: '#2f9c6b', rank: 1, weight: 25, itemWeight: 26, statMul: 1.18 },
  { id: 'rare', name: 'Rare', color: '#5aa8ff', glow: '#2f6bc4', rank: 2, weight: 19, itemWeight: 15, statMul: 1.42 },
  { id: 'epic', name: 'Epic', color: '#b070ff', glow: '#6c38c9', rank: 3, weight: 12, itemWeight: 8, statMul: 1.75 },
  { id: 'legendary', name: 'Legendary', color: '#ffc247', glow: '#b47c14', rank: 4, weight: 7, itemWeight: 3.6, statMul: 2.2 },
  { id: 'mythic', name: 'Mythic', color: '#ff5e8a', glow: '#b01f4e', rank: 5, weight: 3.5, itemWeight: 1.2, statMul: 2.8 },
  { id: 'divine', name: 'Divine', color: '#fff3b0', glow: '#c9a72c', rank: 6, weight: 1.5, itemWeight: 0.25, statMul: 3.6 },
];

export const RARITY = Object.fromEntries(RARITIES.map((r) => [r.id, r]));
export const RARITY_RANK = Object.fromEntries(RARITIES.map((r) => [r.id, r.rank]));
export const RARITY_COLOR = Object.fromEntries(RARITIES.map((r) => [r.id, r.color]));

export function rarityOf(id) {
  return RARITY[id] || RARITY.common;
}

// Weight abilities so the first Awakening is rare enough to feel special,
// but every rarity remains possible.
export const AWAKENING_WEIGHTS = [
  { value: 'common', weight: 27 },
  { value: 'uncommon', weight: 24 },
  { value: 'rare', weight: 19 },
  { value: 'epic', weight: 13 },
  { value: 'legendary', weight: 10 },
  { value: 'mythic', weight: 5 },
  { value: 'divine', weight: 2 },
];

export function rollItemRarity(rng = Math.random, luck = 0, floorRank = 0) {
  const weights = RARITIES.map((r) => ({
    value: r.id,
    weight: Math.max(0.02, r.itemWeight * (1 + (r.rank > 1 ? luck * 0.12 : 0))),
  }));
  let total = 0;
  for (const w of weights) {
    if (RARITY[w.value].rank >= floorRank) total += w.weight;
  }
  let roll = rng() * total;
  for (const w of weights) {
    if (RARITY[w.value].rank < floorRank) continue;
    roll -= w.weight;
    if (roll <= 0) return w.value;
  }
  return 'common';
}
