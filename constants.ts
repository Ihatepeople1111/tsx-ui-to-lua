import { InventoryItem, GamePass, CrosshairSettings, UITheme, GameSettings, World, WeaponItem } from './types';

// Default Settings
export const DEFAULT_CROSSHAIR_SETTINGS: CrosshairSettings = {
  type: 'cross',
  size: 20,
  thickness: 2,
  opacity: 100,
  color: '#dc2626',
};

export const DEFAULT_UI_THEME: UITheme = {
  primaryColor: '#000000',
  secondaryColor: '#dc2626',
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  firstPersonMode: false,
  mouseSensitivity: 50,
  fov: 90,
  graphics: 'high',
  vsync: true,
  motionBlur: false,
};

// Worlds/Islands Data
export const WORLDS_DATA: World[] = [
  {
    id: 'abandoned-city',
    name: 'Abandoned City',
    description: 'A desolate urban wasteland overrun by the undead',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000&auto=format&fit=crop',
    status: 'unlocked',
    requiredLevel: 1,
    completionReward: 5000,
    difficulty: 'Easy',
    waves: 15,
    environment: 'Urban ruins with tactical cover opportunities'
  },
  {
    id: 'medieval',
    name: 'Medieval',
    description: 'Ancient castle grounds with medieval fortifications',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c33a?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 10,
    completionReward: 8000,
    difficulty: 'Medium',
    waves: 20,
    environment: 'Stone walls and medieval architecture provide strategic defense'
  },
  {
    id: 'cursed-dunes',
    name: 'Cursed Dunes',
    description: 'Mystical desert wasteland with supernatural threats',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 20,
    completionReward: 12000,
    difficulty: 'Hard',
    waves: 25,
    environment: 'Sandstorms and mirages obscure vision, ancient ruins provide shelter'
  },
  {
    id: 'subzero-plains',
    name: 'Subzero Plains',
    description: 'Frozen tundra with extreme weather conditions',
    image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 35,
    completionReward: 18000,
    difficulty: 'Extreme',
    waves: 30,
    environment: 'Blizzards reduce visibility, ice slows movement but provides barriers'
  },
  {
    id: 'lost-islands',
    name: 'Lost Islands',
    description: 'Mysterious archipelago with unknown dangers',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 50,
    completionReward: 25000,
    difficulty: 'Nightmare',
    waves: 40,
    environment: 'Multiple islands connected by bridges, naval combat elements'
  },
  // Additional worlds marked as "Coming Soon"
  {
    id: 'alien-mothership',
    name: 'Alien Mothership',
    description: 'Extraterrestrial vessel with advanced technology',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 65,
    completionReward: 35000,
    difficulty: 'Nightmare',
    waves: 50,
    environment: 'Zero gravity sections, energy barriers, alien technology',
    comingSoon: true
  },
  {
    id: 'volcanic-wasteland',
    name: 'Volcanic Wasteland',
    description: 'Lava fields and active volcanic activity',
    image: 'https://images.unsplash.com/photo-1603110634096-0acbd5da7d5e?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 75,
    completionReward: 45000,
    difficulty: 'Nightmare',
    waves: 60,
    environment: 'Environmental hazards, lava flows, unstable terrain',
    comingSoon: true
  },
  {
    id: 'cyberpunk-megacity',
    name: 'Cyberpunk Megacity',
    description: 'Neon-lit dystopian cityscape of the future',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000&auto=format&fit=crop',
    status: 'locked',
    requiredLevel: 85,
    completionReward: 60000,
    difficulty: 'Nightmare',
    waves: 75,
    environment: 'Vertical combat, neon visibility effects, high-tech obstacles',
    comingSoon: true
  }
];

// Complete Weapons Database - All 20 Weapons
export const WEAPONS_DATABASE: WeaponItem[] = [
  // 🟢 Tier 1 – Starter (₵500 – ₵3,500)
  {
    id: 'rusted-9mm',
    name: 'Rusted 9mm',
    price: 500,
    currency: 'coins',
    icon: '🔫',
    description: 'Basic pistol with worn components. Reliable but limited range.',
    type: 'weapon',
    tier: 'starter',
    weaponType: 'pistol',
    damage: 9,
    fireRate: 'Medium',
    recoil: 'Low',
    ammo: 12,
    range: 40,
    accuracy: 60,
    unlockLevel: 1,
    model: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'jury-rigged-22',
    name: 'Jury-Rigged .22',
    price: 1200,
    currency: 'coins',
    icon: '🔫',
    description: 'Makeshift SMG with high fire rate but poor accuracy.',
    type: 'weapon',
    tier: 'starter',
    weaponType: 'smg',
    damage: 7,
    fireRate: 'High',
    recoil: 'High',
    ammo: 20,
    range: 30,
    accuracy: 50,
    unlockLevel: 3,
    model: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'scrap-shot',
    name: 'Scrap Shot',
    price: 2000,
    currency: 'coins',
    icon: '🔫',
    description: 'Improvised shotgun with devastating close range power.',
    type: 'weapon',
    tier: 'starter',
    weaponType: 'shotgun',
    damage: 15,
    fireRate: 'Very Slow',
    recoil: 'Medium',
    ammo: 5,
    range: 20,
    accuracy: 40,
    unlockLevel: 5,
    model: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'pipe-rifle',
    name: 'Pipe Rifle',
    price: 3500,
    currency: 'coins',
    icon: '🎯',
    description: 'Long-range pipe construction with decent accuracy.',
    type: 'weapon',
    tier: 'starter',
    weaponType: 'marksman',
    damage: 18,
    fireRate: 'Slow',
    recoil: 'High',
    ammo: 6,
    range: 80,
    accuracy: 70,
    unlockLevel: 8,
    model: 'https://images.unsplash.com/photo-1566139616781-179f37db2e4d?q=80&w=100&auto=format&fit=crop'
  },

  // 🟡 Tier 2 – Common (₵5,000 – ₵25,000)
  {
    id: 'urban-defender',
    name: 'Urban Defender',
    price: 5000,
    currency: 'coins',
    icon: '🔫',
    description: 'Reliable SMG designed for urban combat scenarios.',
    type: 'weapon',
    tier: 'common',
    weaponType: 'smg',
    damage: 10,
    fireRate: 'High',
    recoil: 'Medium',
    ammo: 30,
    range: 40,
    accuracy: 65,
    unlockLevel: 12,
    model: 'https://images.unsplash.com/photo-1577302540171-60e3bf68863c?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'c10-auto',
    name: 'C-10 Auto',
    price: 10000,
    currency: 'coins',
    icon: '🔫',
    description: 'Standard assault rifle with balanced performance.',
    type: 'weapon',
    tier: 'common',
    weaponType: 'ar',
    damage: 12,
    fireRate: 'High',
    recoil: 'Medium',
    ammo: 30,
    range: 60,
    accuracy: 70,
    unlockLevel: 15,
    model: 'https://images.unsplash.com/photo-1585637173023-7ad5be5e6bbf?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'steel-shredder',
    name: 'Steel Shredder',
    price: 15000,
    currency: 'coins',
    icon: '🔫',
    description: 'Military-grade shotgun with improved components.',
    type: 'weapon',
    tier: 'common',
    weaponType: 'shotgun',
    damage: 20,
    fireRate: 'Low',
    recoil: 'Low',
    ammo: 6,
    range: 25,
    accuracy: 50,
    unlockLevel: 18,
    model: 'https://images.unsplash.com/photo-1544943910-9e0c6de63116?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'tracer-bolt',
    name: 'Tracer Bolt',
    price: 25000,
    currency: 'coins',
    icon: '🎯',
    description: 'Designated marksman rifle with tracer rounds.',
    type: 'weapon',
    tier: 'common',
    weaponType: 'dmr',
    damage: 25,
    fireRate: 'Medium',
    recoil: 'Medium',
    ammo: 12,
    range: 85,
    accuracy: 80,
    unlockLevel: 22,
    model: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=100&auto=format&fit=crop'
  },

  // 🟠 Tier 3 – Advanced (₵40,000 – ₵100,000)
  {
    id: 'valkyrie-ar',
    name: 'Valkyrie AR',
    price: 40000,
    currency: 'coins',
    icon: '🔫',
    description: 'Advanced assault rifle with low recoil system.',
    type: 'weapon',
    tier: 'advanced',
    weaponType: 'ar',
    damage: 15,
    fireRate: 'High',
    recoil: 'Low',
    ammo: 30,
    range: 65,
    accuracy: 85,
    unlockLevel: 25,
    model: 'https://images.unsplash.com/photo-1588932925060-e30f15c4a3e6?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'phantom-smg',
    name: 'Phantom SMG',
    price: 55000,
    currency: 'coins',
    icon: '🔫',
    description: 'High-tech SMG with incredible fire rate.',
    type: 'weapon',
    tier: 'advanced',
    weaponType: 'smg',
    damage: 13,
    fireRate: 'Very High',
    recoil: 'Medium',
    ammo: 40,
    range: 45,
    accuracy: 75,
    unlockLevel: 28,
    model: 'https://images.unsplash.com/photo-1583266095949-98d0c2a45fa8?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'skull-hammer',
    name: 'Skull Hammer',
    price: 70000,
    currency: 'coins',
    icon: '🔫',
    description: 'Heavy-duty shotgun with massive stopping power.',
    type: 'weapon',
    tier: 'advanced',
    weaponType: 'shotgun',
    damage: 30,
    fireRate: 'Slow',
    recoil: 'High',
    ammo: 6,
    range: 30,
    accuracy: 60,
    unlockLevel: 32,
    model: 'https://images.unsplash.com/photo-1541506618330-7c369fc759b5?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'markseye-x3',
    name: 'MarksEye X3',
    price: 100000,
    currency: 'coins',
    icon: '🎯',
    description: 'Precision sniper rifle with advanced optics.',
    type: 'weapon',
    tier: 'advanced',
    weaponType: 'sniper',
    damage: 70,
    fireRate: 'Very Slow',
    recoil: 'Very High',
    ammo: 5,
    range: 100,
    accuracy: 95,
    unlockLevel: 35,
    model: 'https://images.unsplash.com/photo-1566139616781-179f37db2e4d?q=80&w=100&auto=format&fit=crop'
  },

  // 🔴 Tier 4 – Military (₵150,000 – ₵500,000)
  {
    id: 'g-saber-47',
    name: 'G-Saber 47',
    price: 150000,
    currency: 'coins',
    icon: '🔫',
    description: 'Military-grade assault rifle with superior firepower.',
    type: 'weapon',
    tier: 'military',
    weaponType: 'ar',
    damage: 20,
    fireRate: 'High',
    recoil: 'Low',
    ammo: 30,
    range: 70,
    accuracy: 90,
    unlockLevel: 40,
    model: 'https://images.unsplash.com/photo-1577302540171-60e3bf68863c?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'cinderstorm',
    name: 'Cinderstorm',
    price: 200000,
    currency: 'coins',
    icon: '🔥',
    description: 'Military flamethrower with continuous damage output.',
    type: 'weapon',
    tier: 'military',
    weaponType: 'flamethrower',
    damage: 8,
    fireRate: 'Continuous',
    recoil: 'None',
    ammo: 200,
    range: 15,
    accuracy: 100,
    unlockLevel: 43,
    model: 'https://images.unsplash.com/photo-1583266095949-98d0c2a45fa8?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'venom-spitter',
    name: 'Venom Spitter',
    price: 300000,
    currency: 'coins',
    icon: '⚡',
    description: 'Energy-based SMG with toxic projectiles.',
    type: 'weapon',
    tier: 'military',
    weaponType: 'energy',
    damage: 14,
    fireRate: 'Very High',
    recoil: 'Low',
    ammo: 40,
    range: 50,
    accuracy: 80,
    unlockLevel: 46,
    model: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'widowmaker-50',
    name: 'Widowmaker .50',
    price: 500000,
    currency: 'coins',
    icon: '🎯',
    description: 'Elite sniper rifle with devastating one-shot potential.',
    type: 'weapon',
    tier: 'military',
    weaponType: 'sniper',
    damage: 120,
    fireRate: 'Very Slow',
    recoil: 'Very High',
    ammo: 4,
    range: 100,
    accuracy: 98,
    unlockLevel: 50,
    model: 'https://images.unsplash.com/photo-1566139616781-179f37db2e4d?q=80&w=100&auto=format&fit=crop'
  },

  // 🔵 Tier 5 – Experimental (₵750,000 – ₵1,500,000)
  {
    id: 'arcstorm-pulse',
    name: 'Arcstorm Pulse',
    price: 750000,
    currency: 'coins',
    icon: '⚡',
    description: 'Experimental energy rifle with pulse technology.',
    type: 'weapon',
    tier: 'experimental',
    weaponType: 'energy',
    damage: 25,
    fireRate: 'High',
    recoil: 'Low',
    ammo: 30,
    range: 75,
    accuracy: 92,
    unlockLevel: 55,
    model: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'oblivion-cannon',
    name: 'Oblivion Cannon',
    price: 1000000,
    currency: 'coins',
    icon: '💥',
    description: 'Devastating heavy weapon with catastrophic damage.',
    type: 'weapon',
    tier: 'experimental',
    weaponType: 'heavy',
    damage: 250,
    fireRate: 'Very Slow',
    recoil: 'Very High',
    ammo: 1,
    range: 90,
    accuracy: 95,
    unlockLevel: 60,
    model: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'banshee-railgun',
    name: 'Banshee Railgun',
    price: 1250000,
    currency: 'coins',
    icon: '🌩️',
    description: 'Electromagnetic railgun with charge-based firing.',
    type: 'weapon',
    tier: 'experimental',
    weaponType: 'railgun',
    damage: 300,
    fireRate: 'Charge',
    recoil: 'Medium',
    ammo: 2,
    range: 100,
    accuracy: 98,
    unlockLevel: 65,
    model: 'https://images.unsplash.com/photo-1531826945558-2eece2b04ad4?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'epoch-repeater',
    name: 'Epoch Repeater',
    price: 1500000,
    currency: 'coins',
    icon: '🔮',
    description: 'Advanced plasma SMG with unlimited firing potential.',
    type: 'weapon',
    tier: 'experimental',
    weaponType: 'plasma',
    damage: 18,
    fireRate: 'Very High',
    recoil: 'None',
    ammo: 50,
    range: 60,
    accuracy: 88,
    unlockLevel: 70,
    model: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=100&auto=format&fit=crop'
  }
];

// Initial Inventory Items
export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'ak47',
    name: 'AK-47',
    type: 'weapon',
    quantity: 1,
    icon: '🔫',
    description: 'High damage assault rifle with moderate recoil',
    rarity: 'rare',
    model: 'https://images.unsplash.com/photo-1577302540171-60e3bf68863c?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'healthpack',
    name: 'Health Pack',
    type: 'consumable',
    quantity: 5,
    icon: '❤️',
    description: 'Restores 50 health points',
    rarity: 'common'
  },
  {
    id: 'armor',
    name: 'Body Armor',
    type: 'equipment',
    quantity: 1,
    icon: '🦺',
    description: 'Reduces damage taken by 25%',
    rarity: 'uncommon'
  },
  {
    id: 'bandage',
    name: 'Bandage',
    type: 'consumable',
    quantity: 10,
    icon: '🩹',
    description: 'Quickly restores 25 health points',
    rarity: 'common'
  }
];

// Initial Game Passes
export const INITIAL_GAME_PASSES: GamePass[] = [
  {
    id: 'double-xp',
    name: '2x XP Boost',
    price: 199,
    description: 'Double XP gain permanently',
    icon: '⚡',
    benefits: ['2x Experience Points', 'Faster leveling', 'Permanent effect'],
    owned: false
  },
  {
    id: 'double-coins',
    name: '2x Coins',
    price: 299,
    description: 'Double coin rewards from all sources',
    icon: '💰',
    benefits: ['2x Coin rewards', 'Faster progression', 'All game modes'],
    owned: false
  },
  {
    id: 'unlock-guns',
    name: 'Unlock All Weapons',
    price: 499,
    description: 'Instantly unlock all weapons',
    icon: '🔓',
    benefits: ['All weapons unlocked', 'No level requirements', 'Full arsenal access'],
    owned: false
  }
];

// Player Resource Defaults
export const DEFAULT_PLAYER_RESOURCES = {
  coins: 2000000, // Increased for testing experimental weapons
  gems: 250,
  robux: 100,
};

// Weapon Tier Colors
export const WEAPON_TIER_COLORS = {
  starter: 'border-green-400 bg-green-400/10 text-green-400',
  common: 'border-yellow-400 bg-yellow-400/10 text-yellow-400',
  advanced: 'border-orange-400 bg-orange-400/10 text-orange-400',
  military: 'border-red-400 bg-red-400/10 text-red-400',
  experimental: 'border-blue-400 bg-blue-400/10 text-blue-400'
};

// Weapon Type Icons
export const WEAPON_TYPE_ICONS = {
  pistol: '🔫',
  smg: '🔫',
  shotgun: '🔫',
  marksman: '🎯',
  ar: '🔫',
  dmr: '🎯',
  sniper: '🎯',
  flamethrower: '🔥',
  energy: '⚡',
  heavy: '💥',
  railgun: '🌩️',
  plasma: '🔮'
};