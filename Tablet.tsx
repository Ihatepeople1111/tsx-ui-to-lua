import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Filter, ShoppingCart, Star, Lock, ChevronRight, Settings, Package, Map, Users, Target, Gift, Plane, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { WEAPONS_DATABASE, WEAPON_TIER_COLORS, INITIAL_GAME_PASSES } from '../constants';
import { WeaponItem, GamePass } from '../types';

interface TabletProps {
  onClose: () => void;
  onOpenSettings: () => void;
  showInventory: boolean;
  onToggleInventory: () => void;
  onPurchaseRequest: (item: any) => void;
  playerCoins: number;
  playerGems: number;
  playerRobux: number;
  gamePasses: GamePass[];
}

export function Tablet({
  onClose,
  onOpenSettings,
  showInventory,
  onToggleInventory,
  onPurchaseRequest,
  playerCoins,
  playerGems,
  playerRobux,
  gamePasses
}: TabletProps) {
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedWeaponType, setSelectedWeaponType] = useState<string>('all');

  const apps = [
    { id: 'weapons', name: 'Weapons', icon: Target, color: 'text-red-400' },
    { id: 'store', name: 'Store', icon: ShoppingCart, color: 'text-green-400' },
    { id: 'map', name: 'Map', icon: Map, color: 'text-blue-400' },
    { id: 'clan', name: 'Clan', icon: Users, color: 'text-purple-400' },
    { id: 'missions', name: 'Missions', icon: Star, color: 'text-yellow-400' },
    { id: 'airdrop', name: 'Airdrop', icon: Plane, color: 'text-cyan-400' },
    { id: 'nuke', name: 'Nuke', icon: Zap, color: 'text-orange-400' },
    { id: 'rebirth', name: 'Rebirth', icon: Shield, color: 'text-pink-400' },
    { id: 'ammo', name: 'Ammo', icon: Package, color: 'text-gray-400' },
    { id: 'crosshair', name: 'Crosshair', icon: Target, color: 'text-secondary' },
  ];

  // Filter weapons based on search and filters
  const filteredWeapons = WEAPONS_DATABASE.filter(weapon => {
    const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         weapon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'all' || weapon.tier === selectedTier;
    const matchesType = selectedWeaponType === 'all' || weapon.weaponType === selectedWeaponType;
    
    return matchesSearch && matchesTier && matchesType;
  });

  const renderWeaponCard = (weapon: WeaponItem) => {
    const canAfford = playerCoins >= weapon.price;
    const tierClass = WEAPON_TIER_COLORS[weapon.tier];

    return (
      <motion.div
        key={weapon.id}
        whileHover={{ scale: 1.02 }}
        className={`glass-panel border rounded-lg p-4 cursor-pointer transition-all duration-200 ${tierClass}`}
        onClick={() => canAfford && onPurchaseRequest(weapon)}
      >
        <div className="flex items-center space-x-4">
          {/* Weapon Model Image */}
          <div className="w-20 h-20 flex-shrink-0">
            {weapon.model ? (
              <img 
                src={weapon.model} 
                alt={weapon.name}
                className="w-full h-full object-cover rounded-lg border border-border"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-3xl">
                {weapon.icon}
              </div>
            )}
          </div>

          {/* Weapon Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono text-lg truncate">{weapon.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {weapon.tier.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {weapon.description}
            </p>

            {/* Weapon Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Damage:</span>
                <span className="text-secondary">{weapon.damage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Range:</span>
                <span className="text-secondary">{weapon.range}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fire Rate:</span>
                <span className="text-secondary">{weapon.fireRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="text-secondary">{weapon.accuracy}%</span>
              </div>
            </div>

            {/* Price and Purchase */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">💰</span>
                <span className="font-mono text-lg">₵{weapon.price.toLocaleString()}</span>
              </div>
              
              {canAfford ? (
                <Button size="sm" className="bg-secondary hover:bg-secondary/80">
                  Buy Now
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  <Lock className="w-4 h-4 mr-1" />
                  Locked
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderWeaponsApp = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-mono text-secondary">WEAPONS ARSENAL</h2>
        <div className="text-right">
          <div className="text-yellow-400 font-mono">₵{playerCoins.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Available Coins</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel bg-background/40 border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search weapons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tier Filter */}
          <Select value={selectedTier} onValueChange={setSelectedTier}>
            <SelectTrigger>
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="starter">🟢 Starter</SelectItem>
              <SelectItem value="common">🟡 Common</SelectItem>
              <SelectItem value="advanced">🟠 Advanced</SelectItem>
              <SelectItem value="military">🔴 Military</SelectItem>
              <SelectItem value="experimental">🔵 Experimental</SelectItem>
            </SelectContent>
          </Select>

          {/* Weapon Type Filter */}
          <Select value={selectedWeaponType} onValueChange={setSelectedWeaponType}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pistol">Pistol</SelectItem>
              <SelectItem value="smg">SMG</SelectItem>
              <SelectItem value="shotgun">Shotgun</SelectItem>
              <SelectItem value="ar">Assault Rifle</SelectItem>
              <SelectItem value="dmr">DMR</SelectItem>
              <SelectItem value="sniper">Sniper</SelectItem>
              <SelectItem value="marksman">Marksman</SelectItem>
              <SelectItem value="flamethrower">Flamethrower</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="heavy">Heavy</SelectItem>
              <SelectItem value="railgun">Railgun</SelectItem>
              <SelectItem value="plasma">Plasma</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-muted-foreground font-mono text-sm">
        Showing {filteredWeapons.length} of {WEAPONS_DATABASE.length} weapons
      </div>

      {/* Weapons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredWeapons.map(renderWeaponCard)}
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-mono text-secondary mb-2">TACTICAL TABLET</h2>
        <p className="text-muted-foreground">Select an application to continue</p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-3 gap-4">
        {apps.map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentApp(app.id)}
            className="glass-panel bg-background/40 border border-border rounded-lg p-6 flex flex-col items-center space-y-3 hover:bg-background/60 transition-colors"
          >
            <app.icon className={`w-8 h-8 ${app.color}`} />
            <span className="text-foreground font-mono text-sm">{app.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-panel bg-background/40 border border-border rounded-lg p-4">
        <h3 className="text-lg font-mono text-secondary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onToggleInventory} variant="outline" className="justify-start">
            <Package className="w-4 h-4 mr-2" />
            Inventory
          </Button>
          <Button onClick={onOpenSettings} variant="outline" className="justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel bg-background/95 border border-border rounded-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          {currentApp && (
            <Button
              onClick={() => setCurrentApp(null)}
              variant="ghost"
              size="sm"
              className="mr-3"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </Button>
          )}
          <div className="flex-1" />
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <AnimatePresence mode="wait">
            {!currentApp && (
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {renderMainMenu()}
              </motion.div>
            )}

            {currentApp === 'weapons' && (
              <motion.div
                key="weapons"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderWeaponsApp()}
              </motion.div>
            )}

            {currentApp && currentApp !== 'weapons' && (
              <motion.div
                key={currentApp}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-mono text-secondary mb-2">
                  {apps.find(app => app.id === currentApp)?.name} App
                </h3>
                <p className="text-muted-foreground">Coming Soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}