// ============================================================
// Rare & Epic abilities
// ============================================================
export const MID_ABILITIES = [
  {
    id: 'blood', name: 'Blood Control', rarity: 'rare', color: '#ff4d6d', sigil: '🜄',
    tagline: 'Your body is a kingdom. Blood is its only citizen.',
    desc: 'The pulse beneath your skin becomes audible, then obedient. Wounds open where you point.',
    passive: { text: '+8% Lifesteal. Bleeding enemies take +10% damage from you. Max HP +8%.', mods: { lifesteal: 0.08, execute: 0.10, hpPct: 0.08 } },
    evolution: [
      { level: 5, name: 'Crimson Covenant', desc: 'Lifesteal +5%. Blood skills cost 15% less mana.', mods: { lifesteal: 0.05, manaCost: -0.15 } },
      { level: 10, name: 'Sanguine Monarch', desc: 'Killing a bleeding enemy restores 6% max HP and extends Blood Ward.', mods: { killHeal: 0.06, shieldExtend: 2 } },
    ],
    skills: [
      { name: 'Crimson Lance', desc: 'Fire a lance of your own blood that heals you for a portion of damage dealt.', kind: 'drain', mana: 16, cd: 4.2, dmg: 2.6, speed: 380, width: 16, range: 280, lifeSteal: 0.45, color: '#ff4d6d' },
      { name: 'Blood Ward', desc: 'Form a shield of coagulated blood that absorbs damage and empowers lifesteal.', kind: 'shield', mana: 20, cd: 14, shieldPct: 0.25, duration: 9, mods: { lifesteal: 0.12 }, color: '#d92b5a' },
      { name: 'Sanguine Domain', desc: 'Turn the ground into a bleeding wound for 6s, draining enemies inside.', kind: 'drainzone', mana: 28, cd: 18, dmg: 0.9, radius: 110, duration: 6, lifeSteal: 0.25, color: '#b81f4a' },
    ],
  },
  {
    id: 'spatial', name: 'Spatial Slash', rarity: 'rare', color: '#8bd4ff', sigil: '⌘',
    tagline: 'Distance is a courtesy. You may revoke it.',
    desc: 'The air cracks along invisible seams. You can feel the exact edge where one place ends and another begins.',
    passive: { text: '+10% Critical Chance. Blink and teleport skills deal +20% damage.', mods: { crit: 0.10, teleportDmg: 0.20 } },
    evolution: [
      { level: 5, name: 'Edge of Here', desc: 'Rift Slash pierces +1 enemy and cuts 15% wider.', mods: { pierce: 1, radiusPct: 0.15 } },
      { level: 10, name: 'Unmoored', desc: 'Dimension Step gains an extra charge. Critical hits reduce teleport cooldowns by 1s.', mods: { extraCharge: 1, critCdr: 1 } },
    ],
    skills: [
      { name: 'Rift Slash', desc: 'Cut a line through space. Everything on the line is struck at once.', kind: 'beam', mana: 18, cd: 5, dmg: 3.2, range: 300, width: 26, pierce: 9, color: '#a8e2ff' },
      { name: 'Dimension Step', desc: 'Slip behind the nearest enemy and deliver a spatial cut.', kind: 'blinkstrike', mana: 20, cd: 8, dmg: 3.0, radius: 48, range: 260, behind: true, color: '#8bd4ff' },
      { name: 'Collapsing Rift', desc: 'Open a sucking wound in space that pulls enemies in and grinds them.', kind: 'pull', mana: 26, cd: 14, dmg: 0.8, radius: 105, duration: 4, pull: 220, color: '#5fa8e8' },
    ],
  },
  {
    id: 'phantom', name: 'Phantom Clone', rarity: 'rare', color: '#c48cff', sigil: '⧉',
    tagline: 'Which one of you is real?',
    desc: 'Your reflection peels itself from mirrors and shadows. Each copy insists it is the original.',
    passive: { text: 'Summons gain +35% damage. +10% Dodge. Clones inherit 20% of your stats.', mods: { summonPct: 0.35, dodge: 0.10, cloneInherit: 0.2 } },
    evolution: [
      { level: 5, name: 'Through the Mirror', desc: 'Mirror Self creates an additional clone. Summons last 2s longer.', mods: { summonCount: 1, summonDuration: 2 } },
      { level: 10, name: 'Army of One', desc: 'Whenever you dodge, a phantom echo strikes your attacker.', mods: { dodgeEcho: true, summonPct: 0.2 } },
    ],
    skills: [
      { name: 'Mirror Self', desc: 'Split off a phantom clone that fights beside you for 10s.', kind: 'summon', mana: 22, cd: 15, duration: 10, summonType: 'clone', dmg: 1.6, color: '#c48cff' },
      { name: 'Veil Swap', desc: 'Swap places with an enemy and stun it, leaving a phantom in your place.', kind: 'swap', mana: 18, cd: 11, dmg: 1.4, stun: 1.0, range: 220, color: '#a86cff' },
      { name: 'Phantom Barrage', desc: 'Your phantoms fire a fan of spectral blades in every direction.', kind: 'barrage', mana: 24, cd: 9, dmg: 1.3, count: 14, speed: 330, color: '#d6b0ff' },
    ],
  },
  {
    id: 'soul', name: 'Soul Absorption', rarity: 'rare', color: '#7dffd0', sigil: '◉',
    tagline: 'Nothing truly ends. It only changes owner.',
    desc: 'When living things die near you, something thin and bright leaks upward. You have learned to drink it.',
    passive: { text: '+6% Lifesteal. Killing enemies restores 8 Mana. +10% XP gained.', mods: { lifesteal: 0.06, manaOnKill: 8, xpPct: 0.10 } },
    evolution: [
      { level: 5, name: 'Thin Veil', desc: 'Soul Drain heals +20% more. Soul Nova gains +20% radius.', mods: { healPct: 0.20, radiusPct: 0.20 } },
      { level: 10, name: 'Hollow Feast', desc: 'Each enemy killed grants a stacking +3% damage buff for 10s (max 10).', mods: { killStack: 0.03 } },
    ],
    skills: [
      { name: 'Soul Drain', desc: 'Anchor a tether of soul-light to an enemy, damaging and healing over 3s.', kind: 'drainbeam', mana: 20, cd: 8, dmg: 2.8, duration: 3, range: 240, lifeSteal: 0.5, color: '#7dffd0' },
      { name: 'Soul Nova', desc: 'Release gathered souls in a ring. Heal for each enemy struck.', kind: 'nova', mana: 24, cd: 12, dmg: 2.4, radius: 118, healPerHit: 0.02, color: '#b0ffe6' },
      { name: 'Harvest', desc: 'Reap enemies below 30% HP. Each kill grants a soul charge of power.', kind: 'execute', mana: 26, cd: 15, dmg: 2.0, executeThreshold: 0.30, executeDmg: 6, radius: 135, buff: { duration: 8, mods: { atkPct: 0.20 } }, color: '#5fffc0' },
    ],
  },
  {
    id: 'gravity', name: 'Gravity Manipulation', rarity: 'epic', color: '#b48cff', sigil: '◍',
    tagline: 'The earth is only a suggestion of weight.',
    desc: 'Dust rises around you. Rain hesitates. The world leans in when you ask it to.',
    passive: { text: '+12% Attack. Enemies you strike are pulled slightly toward you. +8% Defense.', mods: { atkPct: 0.12, defPct: 0.08, pullOnHit: 40 } },
    evolution: [
      { level: 5, name: 'Dense Star', desc: 'Gravity Well radius +25%. Your slams knock enemies down for 0.6s.', mods: { radiusPct: 0.25, stunOnSlam: 0.6 } },
      { level: 10, name: 'Event Horizon', desc: 'Singularity damage +40% and leaves a lingering gravity scar.', mods: { dmgPct: 0.4, lingering: true } },
    ],
    skills: [
      { name: 'Gravity Well', desc: 'Crush a point in space, pulling enemies in and slowing them.', kind: 'pull', mana: 22, cd: 10, dmg: 0.8, radius: 115, duration: 3.5, pull: 280, slow: 0.4, color: '#b48cff' },
      { name: 'Singularity', desc: 'Collapse gravity at the target point. Heavy damage, brief stun.', kind: 'slam', mana: 30, cd: 14, dmg: 4.6, radius: 120, delay: 0.75, stun: 1.2, color: '#8a5cff' },
      { name: 'Levitate', desc: 'Defy the ground for 6s: +25% speed, +30% defense, and immunity to knockback.', kind: 'buff', mana: 22, cd: 18, duration: 6, mods: { movePct: 0.25, defPct: 0.30, knockbackImmune: true }, color: '#c9a8ff' },
    ],
  },
  {
    id: 'necro', name: 'Necromancy', rarity: 'epic', color: '#66d18a', sigil: '☠',
    tagline: 'Death is a door that only opens one way. Unless you cheat.',
    desc: 'The dead whisper in a language older than graves. They offer to work for you, briefly.',
    passive: { text: 'Summons gain +40% damage. Killing an enemy has a 25% chance to raise a brief skeleton.', mods: { summonPct: 0.40, raiseOnKill: 0.25 } },
    evolution: [
      { level: 5, name: 'Bone Choir', desc: 'Raise Dead summons two skeletons. Minions gain +20% HP.', mods: { summonCount: 1, summonHpPct: 0.2 } },
      { level: 10, name: 'Lord of the Quiet', desc: 'Your summons explode into bone shards when they die.', mods: { summonExplode: 1.5, summonPct: 0.2 } },
    ],
    skills: [
      { name: 'Raise Dead', desc: 'Call a skeleton warrior from the ground to fight for 12s.', kind: 'summon', mana: 22, cd: 14, duration: 12, summonType: 'skeleton', dmg: 1.4, color: '#66d18a' },
      { name: 'Corpse Burst', desc: 'Detonate a corpse-like bloom of necrotic force at the target area.', kind: 'slam', mana: 24, cd: 9, dmg: 3.4, radius: 96, delay: 0.4, poison: 3, color: '#4fae6d' },
      { name: 'Death Coil', desc: 'Fire a screaming skull that damages enemies and heals you.', kind: 'drain', mana: 18, cd: 6, dmg: 2.2, speed: 300, width: 18, range: 280, lifeSteal: 0.6, color: '#8ce0a5' },
    ],
  },
  {
    id: 'time', name: 'Time Perception', rarity: 'epic', color: '#7fe6ff', sigil: '⧖',
    tagline: 'The present is a narrow room. You have found the door.',
    desc: 'Between one heartbeat and the next, you live an extra second. Nobody else notices.',
    passive: { text: '+12% Cooldown Recovery. +10% Attack Speed. +10% Dodge.', mods: { cdr: 0.12, atkSpeed: 0.10, dodge: 0.10 } },
    evolution: [
      { level: 5, name: 'Long Second', desc: 'Temporal Bubble slows enemies 10% more and lasts 1s longer.', mods: { slowDuration: 1, slowBonus: 0.1 } },
      { level: 10, name: 'Closed Loop', desc: 'Rewind heals 50% more and grants 1s of invulnerability.', mods: { healPct: 0.5, iframes: 1 } },
    ],
    skills: [
      { name: 'Temporal Bubble', desc: 'Slow time in an area for 5s. Enemies inside move and attack sluggishly.', kind: 'slowzone', mana: 24, cd: 14, dmg: 0.2, radius: 110, duration: 5, slow: 0.6, color: '#7fe6ff' },
      { name: 'Haste', desc: 'Accelerate your own timeline for 7s: +30% attack speed, +20% speed.', kind: 'buff', mana: 20, cd: 16, duration: 7, mods: { atkSpeed: 0.30, movePct: 0.20, cdr: 0.10 }, color: '#a8f0ff' },
      { name: 'Rewind', desc: 'Pull your body back to where it was three seconds ago and heal.', kind: 'rewind', mana: 26, cd: 20, healPct: 0.28, distance: 150, duration: 3, color: '#5fc9e8' },
    ],
  },
  {
    id: 'dragon', name: 'Dragon Transformation', rarity: 'epic', color: '#ff9a4d', sigil: '🜁',
    tagline: 'There is a furnace under your ribs. It has always been there.',
    desc: 'Scales itch beneath your skin. Your shadow stretches wings you do not yet have.',
    passive: { text: '+10% Max HP. +12% Attack. Taking damage builds Dragon Fury, boosting damage.', mods: { hpPct: 0.10, atkPct: 0.12, fury: true } },
    evolution: [
      { level: 5, name: 'Scalebound', desc: '+12% Defense. Dragon Breath reaches 20% farther.', mods: { defPct: 0.12, rangePct: 0.2 } },
      { level: 10, name: 'Sky Tyrant', desc: 'Draconic Form also grants flight-like speed and a burning aura.', mods: { transformBonus: 0.15, burnAura: true } },
    ],
    skills: [
      { name: 'Dragon Breath', desc: 'Exhale a cone of searing flame that burns everything in front of you.', kind: 'beam', mana: 22, cd: 7, dmg: 3.4, range: 220, width: 72, burn: 4, color: '#ff8a3d' },
      { name: 'Wing Gale', desc: 'Beat spectral wings, dashing forward and blasting enemies aside.', kind: 'dash', mana: 18, cd: 8, dmg: 2.4, distance: 200, radius: 50, knockback: 180, color: '#ffb066' },
      { name: 'Draconic Form', desc: 'Let the dragon surface for 10s: +40% attack, +20% HP, +15% speed.', kind: 'transform', mana: 34, cd: 30, duration: 10, mods: { atkPct: 0.40, hpPct: 0.20, movePct: 0.15, size: 1.15 }, color: '#ffae5c' },
    ],
  },
];
