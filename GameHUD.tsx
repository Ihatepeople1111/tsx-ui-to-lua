import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Tablet as TabletIcon, Package2, ArrowLeft, MapPin, Plus, Shield as ShieldIcon, Target } from 'lucide-react';
import { GameMode, CrosshairSettings, DamageEffect, GameSettings } from '../types';
import { WorldTeleport } from './WorldTeleport';
import bloodSplatterImage from 'figma:asset/8905a46638604a8a828405b8bb6cf5310d105f1a.png';

interface GameHUDProps {
  onOpenTablet: () => void;
  onOpenSettings: () => void;
  onBackToMenu: () => void;
  onOpenInventory: () => void;
  crosshairSettings: CrosshairSettings;
  gameMode: GameMode | null;
  playerCoins: number;
  playerGems: number;
  showInventory: boolean;
  hotbarItems: Array<{ id: string; name: string; icon: string; quantity?: number; model?: string; } | null>;
  selectedHotbarSlot: number;
  onHotbarSlotSelect: (slot: number) => void;
  onRemoveFromHotbar: (slot: number) => void;
  gameSettings?: GameSettings;
}

export function GameHUD({
  onOpenTablet,
  onOpenSettings,
  onBackToMenu,
  onOpenInventory,
  crosshairSettings,
  gameMode,
  playerCoins,
  playerGems,
  showInventory,
  hotbarItems,
  selectedHotbarSlot,
  onHotbarSlotSelect,
  onRemoveFromHotbar,
  gameSettings
}: GameHUDProps) {

  // Game state
  const [currentHealth, setCurrentHealth] = useState(75);
  const [maxHealth] = useState(100);
  const [currentStamina, setCurrentStamina] = useState(80);
  const [maxStamina] = useState(100);
  const [damageEffects, setDamageEffects] = useState<DamageEffect[]>([]);
  const [showWorldTeleport, setShowWorldTeleport] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isArmorActive, setIsArmorActive] = useState(false);
  const [isBandaging, setIsBandaging] = useState(false);
  const [healingProgress, setHealingProgress] = useState(0);
  const [armorProgress, setArmorProgress] = useState(0);
  const [bandageProgress, setBandageProgress] = useState(0);

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Delete':
          onOpenTablet();
          break;
        case 'End':
          onOpenSettings();
          break;
        case 't':
        case 'T':
          setShowWorldTeleport(true);
          break;
        case 'i':
        case 'I':
          onOpenInventory();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onOpenTablet, onOpenSettings, onOpenInventory]);

  // Demo health changes for testing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHealth(prev => {
        const change = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : -Math.floor(Math.random() * 15);
        return Math.max(10, Math.min(100, prev + change));
      });
      setCurrentStamina(prev => {
        const change = Math.random() > 0.6 ? Math.floor(Math.random() * 8) : -Math.floor(Math.random() * 12);
        return Math.max(5, Math.min(100, prev + change));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Clean up damage effects
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setDamageEffects(prev => prev.filter(effect => 
        now - effect.timestamp < effect.duration
      ));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const takeDamage = (amount: number) => {
    setCurrentHealth(prev => Math.max(0, prev - amount));
    
    // Add realistic blood splatter effect
    const bloodEffect: DamageEffect = {
      id: Date.now().toString(),
      type: 'blood-splatter',
      intensity: Math.min(amount / 30, 1),
      duration: 3000,
      timestamp: Date.now()
    };
    
    setDamageEffects(prev => [...prev, bloodEffect]);
  };

  const useHealthPack = () => {
    if (isHealing || isArmorActive || isBandaging) return;
    
    setIsHealing(true);
    setHealingProgress(0);
    
    // Slow healing progress bar
    const interval = setInterval(() => {
      setHealingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentHealth(prevHealth => Math.min(100, prevHealth + 50));
          setIsHealing(false);
          return 100;
        }
        return prev + 2; // Slow increment
      });
    }, 60); // Update every 60ms for slow progress
  };

  const useArmor = () => {
    if (isHealing || isArmorActive || isBandaging) return;
    
    setIsArmorActive(true);
    setArmorProgress(0);
    
    // Circular progress animation
    const interval = setInterval(() => {
      setArmorProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsArmorActive(false);
          return 100;
        }
        return prev + 2.5; // Moderate increment for circular
      });
    }, 40); // Update every 40ms
  };

  const useBandage = () => {
    if (isHealing || isArmorActive || isBandaging) return;
    
    setIsBandaging(true);
    setBandageProgress(0);
    
    // Fast bandage progress bar
    const interval = setInterval(() => {
      setBandageProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentHealth(prevHealth => Math.min(100, prevHealth + 25));
          setIsBandaging(false);
          return 100;
        }
        return prev + 6.67; // Fast increment (100/15 = 6.67)
      });
    }, 20); // Update every 20ms for fast progress
  };

  const renderCrosshair = () => {
    if (crosshairSettings.type === 'none') return null;

    const crosshairStyle = {
      color: crosshairSettings.color,
      opacity: crosshairSettings.opacity / 100,
      transform: `scale(${crosshairSettings.size / 20})`,
    };

    const strokeWidth = crosshairSettings.thickness;

    const crosshairContent = {
      dot: (
        <div 
          className="w-2 h-2 bg-current rounded-full" 
          style={{
            ...crosshairStyle,
            width: `${crosshairSettings.size / 10}px`,
            height: `${crosshairSettings.size / 10}px`,
          }} 
        />
      ),
      cross: (
        <div className="relative" style={crosshairStyle}>
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              width: `${crosshairSettings.size}px`, 
              height: `${strokeWidth}px` 
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              height: `${crosshairSettings.size}px`, 
              width: `${strokeWidth}px` 
            }} 
          />
        </div>
      ),
      circle: (
        <div 
          className="rounded-full border-current flex items-center justify-center" 
          style={{
            ...crosshairStyle,
            width: `${crosshairSettings.size}px`,
            height: `${crosshairSettings.size}px`,
            borderWidth: `${strokeWidth}px`,
          }}
        >
          <div 
            className="bg-current rounded-full" 
            style={{ 
              width: `${strokeWidth}px`, 
              height: `${strokeWidth}px` 
            }} 
          />
        </div>
      ),
      t: (
        <div className="relative" style={crosshairStyle}>
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              width: `${crosshairSettings.size}px`, 
              height: `${strokeWidth}px` 
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 translate-y-1/4" 
            style={{ 
              height: `${crosshairSettings.size / 2}px`, 
              width: `${strokeWidth}px` 
            }} 
          />
        </div>
      ),
      dynamic: (
        <div className="relative" style={crosshairStyle}>
          <div 
            className="absolute bg-current -translate-x-full -translate-y-1/2" 
            style={{ 
              width: `${crosshairSettings.size / 3}px`, 
              height: `${strokeWidth}px`,
              left: `-${crosshairSettings.size / 3}px`
            }} 
          />
          <div 
            className="absolute bg-current translate-x-full -translate-y-1/2" 
            style={{ 
              width: `${crosshairSettings.size / 3}px`, 
              height: `${strokeWidth}px`,
              left: `${crosshairSettings.size / 3}px`
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-full" 
            style={{ 
              height: `${crosshairSettings.size / 3}px`, 
              width: `${strokeWidth}px`,
              top: `-${crosshairSettings.size / 3}px`
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 translate-y-full" 
            style={{ 
              height: `${crosshairSettings.size / 3}px`, 
              width: `${strokeWidth}px`,
              top: `${crosshairSettings.size / 3}px`
            }} 
          />
        </div>
      ),
    };

    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
        {crosshairContent[crosshairSettings.type]}
      </div>
    );
  };

  const renderHealthAndStaminaBars = () => {
    const healthPercentage = (currentHealth / maxHealth) * 100;
    const staminaPercentage = (currentStamina / maxStamina) * 100;
    const depletedHealthPercentage = 100 - healthPercentage;
    const depletedStaminaPercentage = 100 - staminaPercentage;
    
    return (
      <div className="absolute bottom-6 left-6 z-10 space-y-3">
        {/* Health Bar */}
        <div className="flex items-center space-x-3">
          {/* Health Icon */}
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-400" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          
          {/* Health Value */}
          <div className="text-white font-mono text-sm w-8 text-right">
            {currentHealth}
          </div>
          
          {/* Health Bar Container */}
          <div className="relative w-48 h-4 bg-gray-800 rounded-sm border border-gray-600 overflow-hidden">
            {/* Background segments */}
            <div className="absolute inset-0 flex">
              {/* Depleted Health (Gray) */}
              <div 
                className="h-full bg-gray-700 border-r border-gray-600"
                style={{ width: `${depletedHealthPercentage}%` }}
              />
              {/* Remaining Health (Red/Green gradient) */}
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500"
                style={{ width: `${healthPercentage}%` }}
              />
            </div>
            
            {/* Health number overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-mono text-xs drop-shadow-md">
                HEALTH
              </span>
            </div>
          </div>
        </div>

        {/* Stamina Bar */}
        <div className="flex items-center space-x-3">
          {/* Stamina Icon */}
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400" fill="currentColor">
              <path d="M13,8.5L17.5,12.5L16.1,13.9L12,9.8L7.9,13.9L6.5,12.5L11,8.5L6.5,4.5L7.9,3.1L12,7.2L16.1,3.1L17.5,4.5L13,8.5Z"/>
            </svg>
          </div>
          
          {/* Stamina Value */}
          <div className="text-white font-mono text-sm w-8 text-right">
            {currentStamina}
          </div>
          
          {/* Stamina Bar Container */}
          <div className="relative w-48 h-4 bg-gray-800 rounded-sm border border-gray-600 overflow-hidden">
            {/* Background segments */}
            <div className="absolute inset-0 flex">
              {/* Depleted Stamina (Gray) */}
              <div 
                className="h-full bg-gray-700 border-r border-gray-600"
                style={{ width: `${depletedStaminaPercentage}%` }}
              />
              {/* Remaining Stamina (Blue gradient) */}
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                style={{ width: `${staminaPercentage}%` }}
              />
            </div>
            
            {/* Stamina number overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-mono text-xs drop-shadow-md">
                STAMINA
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* Game Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-80" />
      
      {/* Blood Splatter Effects */}
      <AnimatePresence>
        {damageEffects.map(effect => {
          if (effect.type === 'blood-splatter') {
            return (
              <motion.div
                key={effect.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: effect.intensity * 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                  backgroundImage: `url(${bloodSplatterImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'multiply',
                  filter: `opacity(${effect.intensity * 0.6})`
                }}
              />
            );
          }
          return null;
        })}
      </AnimatePresence>

      {/* Healing Animations - Non-overlapping */}
      <AnimatePresence>
        {/* Medkit Healing Progress */}
        {isHealing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-35"
          >
            <div className="glass-panel bg-green-500/20 border border-green-400/40 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Plus className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-green-400 font-mono mb-2">USING MEDKIT</div>
                  <div className="w-32 h-3 bg-green-900/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-75" 
                      style={{ width: `${healingProgress}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Armor Circular Progress */}
        {isArmorActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
          >
            <div className="glass-panel bg-blue-500/20 border border-blue-400/40 rounded-lg p-6">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-20 h-20">
                  {/* Background circle */}
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    {/* Progress circle with animated line */}
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#3b82f6"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 32}
                      strokeDashoffset={2 * Math.PI * 32 * (1 - armorProgress / 100)}
                      className="transition-all duration-75"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldIcon className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-mono text-lg">{Math.round(armorProgress)}%</div>
                  <div className="text-blue-300 font-mono text-sm">EQUIPPING ARMOR</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bandage Fast Progress */}
        {isBandaging && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-2/3 left-1/2 -translate-x-1/2 pointer-events-none z-35"
          >
            <div className="glass-panel bg-green-500/20 border border-green-400/40 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Plus className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-green-400 font-mono mb-2">APPLYING BANDAGE</div>
                  <div className="w-24 h-2 bg-green-900/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-75" 
                      style={{ width: `${bandageProgress}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Crosshair */}
      {renderCrosshair()}

      {/* Health and Stamina Bars - Bottom Left */}
      {renderHealthAndStaminaBars()}

      {/* Top Center Controls - Tablet and Settings */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenTablet}
          className="glass-panel bg-background/80 border border-cyan-500/30 rounded-lg p-3 hover:bg-cyan-600/10 transition-colors group"
          title="Open Tablet (Del)"
        >
          <TabletIcon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground/60 font-mono">DEL</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="glass-panel bg-background/80 border border-border rounded-lg p-3 hover:bg-foreground/10 transition-colors"
          title="Open Settings (End)"
        >
          <Settings className="w-6 h-6 text-foreground" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground/60 font-mono">END</div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWorldTeleport(true)}
          className="glass-panel bg-background/80 border border-purple-500/30 rounded-lg p-3 hover:bg-purple-600/10 transition-colors group"
          title="World Teleport (T)"
        >
          <MapPin className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground/60 font-mono">T</div>
        </motion.button>
      </div>

      {/* Top Left - Back to Menu */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToMenu}
          className="glass-panel bg-background/80 border border-secondary/30 rounded-lg p-3 flex items-center space-x-2 hover:bg-secondary/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-secondary" />
          <span className="text-foreground font-mono text-sm">MENU</span>
        </motion.button>
      </div>

      {/* Top Right - Level (primary position) */}
      <div className="absolute top-6 right-6 z-20">
        <div className="glass-panel bg-purple-600/20 border border-purple-500/30 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-purple-400 font-mono text-lg">LEVEL 47</div>
              <div className="w-24 h-2 bg-purple-900/30 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-300" style={{ width: '65%' }} />
              </div>
              <div className="text-purple-300 font-mono text-xs mt-1">6,500 / 10,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right - Coins (below level to avoid overlap) */}
      <div className="absolute top-28 right-6 z-20">
        <div className="glass-panel bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-3 flex items-center space-x-2">
          <span className="text-yellow-400 text-lg">💰</span>
          <span className="text-foreground font-mono text-lg">{playerCoins.toLocaleString()}</span>
        </div>
      </div>

      {/* Bottom Center - Hotbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center space-x-1">
          <div className="glass-panel bg-background/80 border border-border rounded-lg p-2 flex items-center space-x-1">
            {Array.from({ length: 9 }, (_, i) => {
              const item = hotbarItems[i];
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onHotbarSlotSelect(i)}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    selectedHotbarSlot === i
                      ? 'border-secondary bg-secondary/20'
                      : 'border-border bg-background/20 hover:border-foreground/50'
                  }`}
                >
                  {item ? (
                    <div className="text-center">
                      {item.model ? (
                        <img src={item.model} alt={item.name} className="w-8 h-8 object-contain" />
                      ) : (
                        <div className="text-lg">{item.icon}</div>
                      )}
                      {item.quantity && (
                        <div className="text-xs text-foreground font-mono -mt-1">{item.quantity}</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-foreground/30 text-xs font-mono">{i + 1}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenInventory}
            className="glass-panel bg-background/80 border border-border rounded-lg p-3 ml-2 hover:bg-foreground/10 transition-colors"
            title="Open Inventory (I)"
          >
            <Package2 className="w-5 h-5 text-foreground" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-foreground/60 font-mono">I</div>
          </motion.button>
        </div>
      </div>

      {/* Testing Buttons - moved to avoid overlap with health bars */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col space-y-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => takeDamage(25)}
          className="glass-panel bg-red-600/20 border border-red-400/40 rounded-lg p-2 text-red-400 font-mono text-sm hover:bg-red-600/30 transition-colors"
        >
          SHOOT
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={useHealthPack}
          className="glass-panel bg-green-600/20 border border-green-400/40 rounded-lg p-2 text-green-400 font-mono text-sm hover:bg-green-600/30 transition-colors"
        >
          MEDKIT
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={useArmor}
          className="glass-panel bg-blue-600/20 border border-blue-400/40 rounded-lg p-2 text-blue-400 font-mono text-sm hover:bg-blue-600/30 transition-colors"
        >
          ARMOR
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={useBandage}
          className="glass-panel bg-green-600/20 border border-green-400/40 rounded-lg p-2 text-green-400 font-mono text-sm hover:bg-green-600/30 transition-colors"
        >
          BANDAGE
        </motion.button>
      </div>

      {/* Game Mode Indicator */}
      <div className="absolute bottom-44 left-6 z-20">
        <div className="glass-panel bg-background/80 border border-border rounded-lg p-3">
          <div className="text-foreground font-mono text-sm">
            {gameMode?.toUpperCase().replace('_', ' ') || 'UNKNOWN MODE'}
          </div>
        </div>
      </div>

      {/* World Teleport Modal */}
      {showWorldTeleport && (
        <WorldTeleport
          onClose={() => setShowWorldTeleport(false)}
          onTeleport={(worldId) => {
            console.log('Teleporting to:', worldId);
            setShowWorldTeleport(false);
          }}
          currentLevel={47}
        />
      )}
    </div>
  );
}