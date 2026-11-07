// ============================================================
// Common & Uncommon abilities
// ============================================================
export const LOW_ABILITIES = [
  {
    id: 'strength', name: 'Enhanced Strength', rarity: 'common', color: '#d08b5b', sigil: '✊',
    tagline: 'The body remembers what the world forgot.',
    desc: 'Your muscles knit with a density that should tear flesh. Every blow lands with the weight of falling stone.',
    passive: { text: '+12% Attack Power. +6% Defense. Heavy attacks stagger lesser foes.', mods: { atkPct: 0.12, defPct: 0.06 } },
    evolution: [
      { level: 5, name: 'Titan\'s Sinew', desc: '+10% Attack. Shockwaves knock enemies back further.', mods: { atkPct: 0.10, knockback: 0.2 } },
      { level: 10, name: 'Worldbreaker', desc: '+15% Attack. Ground slams gain +25% radius.', mods: { atkPct: 0.15, radiusPct: 0.25 } },
    ],
    skills: [
      { name: 'Titan Fist', desc: 'Slam both fists down, sending a shockwave through nearby enemies.', kind: 'nova', mana: 10, cd: 3.2, dmg: 2.2, radius: 78, knockback: 130, color: '#e0a06a' },
      { name: 'Iron Will', desc: 'Harden your body for 8s: +30% defense, +20% attack, and reduced stagger.', kind: 'buff', mana: 16, cd: 12, duration: 8, mods: { defPct: 0.30, atkPct: 0.20, staggerResist: 0.5 }, color: '#d08b5b' },
      { name: 'Colossus Slam', desc: 'Mark a target area and bring down a devastating pillar of force.', kind: 'slam', mana: 24, cd: 9, dmg: 3.6, radius: 102, delay: 0.65, stun: 1.2, color: '#ffb066' },
    ],
  },
  {
    id: 'regen', name: 'Minor Regeneration', rarity: 'common', color: '#5fe0a0', sigil: '❈',
    tagline: 'Flesh is a temporary argument.',
    desc: 'Wounds close with green threads of living light. Pain becomes a distant suggestion.',
    passive: { text: 'Regenerate 1.8 HP per second. Healing received +15%.', mods: { regen: 1.8, healPct: 0.15 } },
    evolution: [
      { level: 5, name: 'Verdant Blood', desc: 'Regenerate 2.5 HP/s. Heal zones follow you.', mods: { regen: 0.7 } },
      { level: 10, name: 'Undying Spring', desc: 'Regenerate 4 HP/s. Fall below 20% HP to burst-heal once per minute.', mods: { regen: 1.5, lastStand: true } },
    ],
    skills: [
      { name: 'Mend', desc: 'Weave living light through your wounds, restoring 30% max HP over 3s.', kind: 'heal', mana: 14, cd: 10, healPct: 0.30, duration: 3, color: '#5fe0a0' },
      { name: 'Verdant Aura', desc: 'Create a healing grove for 6s that restores allies and burns enemies inside.', kind: 'healzone', mana: 22, cd: 14, radius: 92, duration: 6, healPerSec: 0.04, dmg: 0.5, color: '#71e8ae' },
      { name: 'Second Bloom', desc: 'A protective bloom shields you and accelerates regeneration for 7s.', kind: 'buff', mana: 18, cd: 16, duration: 7, shieldPct: 0.22, mods: { regen: 3, defPct: 0.1 }, color: '#54c98c' },
    ],
  },
  {
    id: 'nightvision', name: 'Night Vision', rarity: 'common', color: '#7aa8ff', sigil: '◐',
    tagline: 'Darkness is only a room you have not entered.',
    desc: 'The dark peels back into silver contours. Hidden things glow. Weak points become constellations.',
    passive: { text: '+8 Perception. +12% Critical Chance at night. Vision radius greatly increased.', mods: { per: 8, darkCrit: 0.12 } },
    evolution: [
      { level: 5, name: 'Silver Eyes', desc: 'Critical strikes blind enemies for 1s. +5% Critical Chance.', mods: { crit: 0.05 } },
      { level: 10, name: 'Umbral Truth', desc: 'Enemies below 30% HP are outlined and take +12% damage from you.', mods: { execute: 0.12 } },
    ],
    skills: [
      { name: 'Piercing Gaze', desc: 'Reveal all enemies in a wide radius and mark their weak points for 7s.', kind: 'mark', mana: 12, cd: 12, radius: 380, duration: 7, mods: { crit: 0.12 }, color: '#8ab8ff' },
      { name: 'Umbral Bolt', desc: 'Fire a spear of condensed darkness that pierces up to 3 enemies.', kind: 'projectile', mana: 14, cd: 4.5, dmg: 2.1, speed: 420, radius: 9, pierce: 3, color: '#7a8cff' },
      { name: 'Phantom Sight', desc: 'For 6s, see through space: +25% dodge and attacks cannot miss.', kind: 'buff', mana: 20, cd: 15, duration: 6, mods: { dodge: 0.25, crit: 0.08, truesight: true }, color: '#95b2ff' },
    ],
  },
  {
    id: 'windstep', name: 'Wind Step', rarity: 'common', color: '#7fe3d2', sigil: '≋',
    tagline: 'The air agrees to carry you.',
    desc: 'Your feet barely trouble the ground. Wind folds around your ankles and urges you forward.',
    passive: { text: '+10% Movement Speed. +6% Dodge. Dash stamina cost reduced.', mods: { movePct: 0.10, dodge: 0.06, dashCost: -0.2 } },
    evolution: [
      { level: 5, name: 'Gale Walker', desc: '+8% Movement Speed. Dashes leave a cutting wake.', mods: { movePct: 0.08 } },
      { level: 10, name: 'Eye of the Storm', desc: '+10% Dodge. Dodging releases a small wind burst.', mods: { dodge: 0.10, dodgeBurst: true } },
    ],
    skills: [
      { name: 'Gale Dash', desc: 'Rush forward as a blade of wind, cutting enemies in your path.', kind: 'dash', mana: 10, cd: 5, dmg: 1.8, distance: 170, radius: 30, iframes: 0.3, color: '#7fe3d2' },
      { name: 'Wind Blade', desc: 'Launch a crescent of compressed air that pierces and knocks back.', kind: 'projectile', mana: 12, cd: 3.8, dmg: 2.0, speed: 500, radius: 14, pierce: 4, knockback: 60, color: '#a8f5e8' },
      { name: 'Zephyr Stance', desc: 'Become one with the wind for 6s: +30% speed, +20% dodge, +15% attack speed.', kind: 'buff', mana: 16, cd: 14, duration: 6, mods: { movePct: 0.30, dodge: 0.20, atkSpeed: 0.15 }, color: '#7fe3d2' },
    ],
  },
  {
    id: 'flame', name: 'Flame Manipulation', rarity: 'uncommon', color: '#ff7a3c', sigil: '🜂',
    tagline: 'Everything wants to burn. You merely remind it.',
    desc: 'Heat gathers in your palms like a faithful animal. The air above your knuckles begins to shimmer.',
    passive: { text: '+10% Attack. Attacks apply 2s Burn for 18% of damage dealt.', mods: { atkPct: 0.10, burn: 0.18 } },
    evolution: [
      { level: 5, name: 'Ember Ascendant', desc: 'Burn damage +50%. Cinder Wall lasts 2s longer.', mods: { burn: 0.09, radiusPct: 0.1 } },
      { level: 10, name: 'Cinder Sovereign', desc: 'Fire skills detonate burning enemies for bonus area damage.', mods: { detonate: 0.3, atkPct: 0.12 } },
    ],
    skills: [
      { name: 'Ember Bolt', desc: 'Hurl a compressed fireball that explodes on impact.', kind: 'projectile', mana: 12, cd: 2.8, dmg: 2.4, speed: 330, radius: 10, explodeRadius: 46, explodeDmg: 0.8, burn: 3, color: '#ff8a3d' },
      { name: 'Cinder Wall', desc: 'Raise a wall of flame at the target line for 6s, burning anything that crosses.', kind: 'wall', mana: 20, cd: 11, dmg: 0.8, duration: 6, length: 150, width: 18, color: '#ff6a2a' },
      { name: 'Meteor', desc: 'Call a burning stone from the sky. Delayed, massive, and very loud.', kind: 'slam', mana: 28, cd: 12, dmg: 4.2, radius: 115, delay: 0.9, burn: 5, color: '#ff9a3d' },
    ],
  },
  {
    id: 'ice', name: 'Ice Spear', rarity: 'uncommon', color: '#73c9ff', sigil: '❄',
    tagline: 'Stillness, sharpened.',
    desc: 'Frost writes its geometry along your bones. You can hear water waiting inside every living thing.',
    passive: { text: '+8% Defense. Your attacks Slow enemies by 15% for 2s.', mods: { defPct: 0.08, slowOnHit: 0.15 } },
    evolution: [
      { level: 5, name: 'Winter\'s Claim', desc: 'Slow effects last 1s longer. +10% damage against slowed enemies.', mods: { slowDuration: 1, execute: 0.10 } },
      { level: 10, name: 'Absolute Zero', desc: 'Frozen enemies take +25% Critical Damage. Glacial Nova may freeze.', mods: { critDmg: 0.25, freezeChance: 0.25 } },
    ],
    skills: [
      { name: 'Frost Lance', desc: 'Launch a piercing spear of ice that slows everything it touches.', kind: 'projectile', mana: 13, cd: 3.2, dmg: 2.5, speed: 460, radius: 8, pierce: 5, slow: 0.45, color: '#8fd8ff' },
      { name: 'Glacial Nova', desc: 'Detonate a ring of frost around you, slowing and damaging nearby enemies.', kind: 'nova', mana: 22, cd: 9, dmg: 2.2, radius: 104, slow: 0.55, freeze: 0.18, color: '#73c9ff' },
      { name: 'Ice Armor', desc: 'Coat yourself in living ice for 8s: absorb damage and reflect a portion.', kind: 'shield', mana: 20, cd: 15, shieldPct: 0.28, duration: 8, reflect: 0.35, mods: { defPct: 0.15 }, color: '#a8e6ff' },
    ],
  },
  {
    id: 'shadowmove', name: 'Shadow Movement', rarity: 'uncommon', color: '#9873ff', sigil: '◑',
    tagline: 'Every shadow is a door you forgot.',
    desc: 'Your silhouette lags a heartbeat behind you. When you step into shade, the world loses track of where you are.',
    passive: { text: '+12% Movement Speed while in shade or at night. +8% Dodge.', mods: { movePct: 0.06, dodge: 0.08, darkSpeed: 0.12 } },
    evolution: [
      { level: 5, name: 'Umbral Door', desc: 'Shadowstep cooldown reduced by 20%. Leaving stealth blinds nearby enemies.', mods: { cdr: 0.06, blindOnTeleport: true } },
      { level: 10, name: 'Living Darkness', desc: 'Summons gain +30% damage and last 2s longer.', mods: { summonPct: 0.3, summonDuration: 2 } },
    ],
    skills: [
      { name: 'Shadowstep', desc: 'Step through the dark to the target point, leaving a lash of shadow behind.', kind: 'teleport', mana: 14, cd: 6, dmg: 2.0, range: 190, radius: 40, iframes: 0.25, color: '#9a7bff' },
      { name: 'Nightfall Clone', desc: 'Tear off a shadow decoy that fights for 8s and explodes when destroyed.', kind: 'summon', mana: 22, cd: 16, duration: 8, summonType: 'clone', dmg: 1.2, color: '#805fff' },
      { name: 'Eclipse Burst', desc: 'Release a wave of blind terror, damaging and fearing enemies.', kind: 'nova', mana: 20, cd: 12, dmg: 1.8, radius: 112, fear: 2.2, color: '#6d4dcc' },
    ],
  },
  {
    id: 'lightning', name: 'Lightning Touch', rarity: 'uncommon', color: '#ffe066', sigil: 'ϟ',
    tagline: 'A thought, arriving too fast.',
    desc: 'Static clings to your teeth. Your nerves hum at a frequency the world was not built to carry.',
    passive: { text: '+12% Cooldown Recovery. +1 Mana per second. Critical hits chain a spark.', mods: { cdr: 0.12, manaRegen: 1, critSpark: true } },
    evolution: [
      { level: 5, name: 'Conductor', desc: 'Chain Lightning jumps to +1 target. +10% Critical Chance.', mods: { chainBonus: 1, crit: 0.10 } },
      { level: 10, name: 'Stormheart', desc: 'Lightning skills stun for 0.5s. +15% Cooldown Recovery.', mods: { stunOnLightning: 0.5, cdr: 0.15 } },
    ],
    skills: [
      { name: 'Arc Chain', desc: 'Unleash lightning that leaps between up to 5 enemies, growing weaker each jump.', kind: 'chain', mana: 14, cd: 4, dmg: 2.2, range: 230, count: 5, color: '#ffe066' },
      { name: 'Static Field', desc: 'Charge an area for 6s. Enemies inside are slowed and repeatedly shocked.', kind: 'slowzone', mana: 20, cd: 12, dmg: 0.7, radius: 96, duration: 6, slow: 0.35, color: '#c9b84a' },
      { name: 'Thunderclap', desc: 'Blink to a target enemy and detonate a thunderclap around them.', kind: 'blinkstrike', mana: 24, cd: 10, dmg: 3.4, radius: 66, stun: 0.8, range: 200, color: '#fff0a8' },
    ],
  },
];
