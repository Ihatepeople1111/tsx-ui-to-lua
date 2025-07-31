export type UIState = 'loading' | 'menu' | 'survival-menu' | 'campaign-menu' | 'arena-menu' | 'party-menu' | 'deploy' | 'game';

export type GameMode = 
  | 'survival_single' 
  | 'survival_multiplayer' 
  | 'campaign_single' 
  | 'campaign_coop' 
  | 'arena_solo' 
  | 'arena_pvp';

export type CrosshairType = 'none' | 'dot' | 'cross' | 'circle' | 't' | 'dynamic';

export interface CrosshairSettings {
  type: CrosshairType;
  size: number;
  thickness: number;
  opacity: number;
  color: string;
}

export interface UITheme {
  primaryColor: string;
  secondaryColor: string;
}

export interface GameSettings {
  firstPersonMode: boolean;
  mouseSensitivity: number;
  fov: number;
  graphics: 'low' | 'medium' | 'high' | 'ultra';
  vsync: boolean;
  motionBlur: boolean;
}

export interface DamageEffect {
  id: string;
  type: 'screen-flash' | 'blood-splatter' | 'heal-effect' | 'armor-effect';
  intensity: number;
  duration: number;
  timestamp: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'consumable' | 'equipment';
  quantity: number;
  icon: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  model?: string; // For weapon models
}

export interface WeaponItem {
  id: string;
  name: string;
  price: number;
  currency: 'coins' | 'gems' | 'robux';
  icon: string;
  description: string;
  type: 'weapon';
  tier: 'starter' | 'common' | 'advanced' | 'military' | 'experimental';
  weaponType: 'pistol' | 'smg' | 'shotgun' | 'ar' | 'dmr' | 'sniper' | 'marksman' | 'flamethrower' | 'energy' | 'heavy' | 'railgun' | 'plasma';
  damage: number;
  fireRate: 'Very Slow' | 'Slow' | 'Medium' | 'High' | 'Very High' | 'Continuous' | 'Charge';
  recoil: 'None' | 'Low' | 'Medium' | 'High' | 'Very High';
  ammo: number;
  range: number;
  accuracy: number;
  unlockLevel: number;
  model?: string; // For 3D weapon models
}

export interface GamePass {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  benefits: string[];
  owned: boolean;
}

export interface World {
  id: string;
  name: string;
  description: string;
  image: string;
  status: 'locked' | 'unlocked';
  requiredLevel: number;
  completionReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme' | 'Nightmare';
  waves: number;
  environment: string;
  comingSoon?: boolean;
}

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  currency: 'coins' | 'gems' | 'robux';
  icon: string;
  description: string;
  type: 'weapon' | 'consumable' | 'equipment' | 'gamepass';
}