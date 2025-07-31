import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Settings, Eye, EyeOff, Zap, Shield, Target, Gauge } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GameMode, GameSettings } from '../types';

interface DeployScreenProps {
  gameMode: GameMode;
  gameSettings: GameSettings;
  onGameSettingsChange: (settings: Partial<GameSettings>) => void;
  onDeploy: () => void;
  onBack: () => void;
}

export function DeployScreen({ 
  gameMode, 
  gameSettings, 
  onGameSettingsChange, 
  onDeploy, 
  onBack 
}: DeployScreenProps) {
  const [deployCountdown, setDeployCountdown] = useState<number | null>(null);

  const handleDeploy = () => {
    setDeployCountdown(3);
    const interval = setInterval(() => {
      setDeployCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          onDeploy();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getGameModeDisplay = () => {
    switch (gameMode) {
      case 'survival_single': return 'Survival - Solo';
      case 'survival_multiplayer': return 'Survival - Multiplayer';
      case 'campaign_offline': return 'Campaign - Offline';
      case 'campaign_coop': return 'Campaign - Co-op';
      case 'arena_aim': return 'Arena - Aim Trainer';
      case 'arena_pvp': return 'Arena - PvP';
      default: return 'Unknown Mode';
    }
  };

  if (deployCountdown !== null) {
    return (
      <div className="size-full flex items-center justify-center relative overflow-hidden">
        {/* Dramatic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Countdown overlay */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center z-10"
        >
          <motion.div
            key={deployCountdown}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-8xl font-mono text-secondary mb-4"
            style={{
              textShadow: '0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.4)'
            }}
          >
            {deployCountdown}
          </motion.div>
          <h2 className="text-2xl font-mono text-foreground/80">DEPLOYING TO BATTLEFIELD</h2>
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-150" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Apocalyptic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Glitch Effects */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute inset-0 bg-secondary/20"
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            x: [0, 2, -1, 0]
          }}
          transition={{ 
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="glass-panel bg-background/80 border border-secondary/30 rounded-lg p-3 flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
          <span className="text-foreground font-mono text-sm">BACK</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl font-mono text-secondary mb-4"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(220, 38, 38, 0.5)",
                "0 0 20px rgba(220, 38, 38, 0.8)",
                "0 0 10px rgba(220, 38, 38, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DEPLOYMENT PREPARATION
          </motion.h1>
          <h2 className="text-xl font-mono text-secondary/80 mb-4">Configure your loadout</h2>
          <div className="glass-panel bg-secondary/20 border border-secondary/40 rounded-lg p-3 inline-block">
            <span className="text-foreground font-mono text-lg">{getGameModeDisplay()}</span>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* View Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel bg-background/80 border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-6 flex items-center space-x-2">
              <Eye className="w-6 h-6" />
              <span>VIEW SETTINGS</span>
            </h3>
            
            <div className="space-y-6">
              {/* First Person Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {gameSettings.firstPersonMode ? (
                    <Eye className="w-5 h-5 text-secondary" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <label className="text-foreground font-mono">First Person Mode</label>
                    <p className="text-muted-foreground text-sm">Immersive first-person perspective</p>
                  </div>
                </div>
                <Switch
                  checked={gameSettings.firstPersonMode}
                  onCheckedChange={(checked) => onGameSettingsChange({ firstPersonMode: checked })}
                />
              </div>

              {/* FOV Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-foreground font-mono flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Field of View</span>
                  </label>
                  <span className="text-secondary font-mono">{gameSettings.fov}°</span>
                </div>
                <Slider
                  value={[gameSettings.fov]}
                  onValueChange={(value) => onGameSettingsChange({ fov: value[0] })}
                  min={60}
                  max={120}
                  step={1}
                  className="slider"
                />
              </div>

              {/* Mouse Sensitivity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-foreground font-mono flex items-center space-x-2">
                    <Gauge className="w-4 h-4" />
                    <span>Mouse Sensitivity</span>
                  </label>
                  <span className="text-secondary font-mono">{gameSettings.mouseSensitivity}%</span>
                </div>
                <Slider
                  value={[gameSettings.mouseSensitivity]}
                  onValueChange={(value) => onGameSettingsChange({ mouseSensitivity: value[0] })}
                  min={1}
                  max={100}
                  step={1}
                  className="slider"
                />
              </div>
            </div>
          </motion.div>

          {/* Graphics Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel bg-background/80 border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-6 flex items-center space-x-2">
              <Settings className="w-6 h-6" />
              <span>GRAPHICS</span>
            </h3>
            
            <div className="space-y-6">
              {/* Graphics Quality */}
              <div>
                <label className="text-foreground font-mono mb-2 block">Graphics Quality</label>
                <Select 
                  value={gameSettings.graphics} 
                  onValueChange={(value) => onGameSettingsChange({ graphics: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="ultra">Ultra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* VSync Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-foreground font-mono">VSync</label>
                  <p className="text-muted-foreground text-sm">Prevents screen tearing</p>
                </div>
                <Switch
                  checked={gameSettings.vsync}
                  onCheckedChange={(checked) => onGameSettingsChange({ vsync: checked })}
                />
              </div>

              {/* Motion Blur Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-foreground font-mono">Motion Blur</label>
                  <p className="text-muted-foreground text-sm">Cinematic motion effects</p>
                </div>
                <Switch
                  checked={gameSettings.motionBlur}
                  onCheckedChange={(checked) => onGameSettingsChange({ motionBlur: checked })}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deploy Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeploy}
            className="glass-panel bg-secondary/20 border border-secondary/40 rounded-xl px-12 py-6 hover:bg-secondary/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-secondary" />
              <div className="text-left">
                <div className="text-foreground font-mono text-2xl">DEPLOY</div>
                <div className="text-foreground/60 font-mono text-sm">Enter the battlefield</div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}