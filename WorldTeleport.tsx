import { useState } from 'react';
import { motion } from 'motion/react';
import { X, MapPin, Lock, CheckCircle, Star, Zap, Crown, AlertTriangle } from 'lucide-react';
import { World } from '../types';
import { WORLDS_DATA } from '../constants';

interface WorldTeleportProps {
  onClose: () => void;
  onTeleport: (worldId: string) => void;
  currentLevel: number;
}

export function WorldTeleport({ onClose, onTeleport, currentLevel }: WorldTeleportProps) {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);

  const isWorldUnlocked = (world: World) => {
    if (world.id === 'abandoned-city') return true; // First world always unlocked
    return currentLevel >= world.requiredLevel && !world.comingSoon;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 border-green-400/40 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10';
      case 'Hard': return 'text-orange-400 border-orange-400/40 bg-orange-400/10';
      case 'Extreme': return 'text-red-400 border-red-400/40 bg-red-400/10';
      case 'Nightmare': return 'text-purple-400 border-purple-400/40 bg-purple-400/10';
      default: return 'text-gray-400 border-gray-400/40 bg-gray-400/10';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return <Star className="w-4 h-4" />;
      case 'Medium': return <Zap className="w-4 h-4" />;
      case 'Hard': return <AlertTriangle className="w-4 h-4" />;
      case 'Extreme': return <Crown className="w-4 h-4" />;
      case 'Nightmare': return <Crown className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel bg-background/90 border border-border rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-mono text-secondary">WORLD TELEPORTATION</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[70vh]">
          {/* World List */}
          <div className="w-1/2 p-6 border-r border-border overflow-y-auto">
            <h3 className="text-lg font-mono text-foreground mb-4">Available Worlds</h3>
            <div className="space-y-3">
              {WORLDS_DATA.map((world) => {
                const unlocked = isWorldUnlocked(world);
                return (
                  <motion.div
                    key={world.id}
                    whileHover={unlocked ? { scale: 1.02 } : {}}
                    whileTap={unlocked ? { scale: 0.98 } : {}}
                    onClick={() => unlocked && setSelectedWorld(world)}
                    className={`glass-panel rounded-lg p-4 border cursor-pointer transition-all duration-300 ${
                      selectedWorld?.id === world.id
                        ? 'border-secondary/60 bg-secondary/10'
                        : unlocked
                        ? 'border-border hover:border-secondary/30'
                        : 'border-gray-600/30 bg-gray-800/20 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div 
                        className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0 relative"
                        style={{ backgroundImage: `url(${world.image})` }}
                      >
                        {!unlocked && (
                          <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                            <Lock className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        {world.status === 'completed' && (
                          <div className="absolute -top-2 -right-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                        )}
                        {world.comingSoon && (
                          <div className="absolute inset-0 bg-purple-600/60 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-mono text-white">SOON</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-mono ${unlocked ? 'text-foreground' : 'text-gray-400'}`}>
                            {world.name}
                          </h4>
                          <div className={`px-2 py-1 rounded text-xs font-mono border ${getDifficultyColor(world.difficulty)}`}>
                            <div className="flex items-center space-x-1">
                              {getDifficultyIcon(world.difficulty)}
                              <span>{world.difficulty}</span>
                            </div>
                          </div>
                        </div>
                        <p className={`text-sm ${unlocked ? 'text-muted-foreground' : 'text-gray-500'} line-clamp-2`}>
                          {world.description}
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-xs font-mono">
                          <span className={unlocked ? 'text-secondary' : 'text-gray-500'}>
                            Level {world.requiredLevel}+
                          </span>
                          <span className={unlocked ? 'text-foreground/60' : 'text-gray-500'}>
                            {world.waves} Waves
                          </span>
                          <span className={unlocked ? 'text-yellow-400' : 'text-gray-500'}>
                            ₵{world.completionReward.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* World Details */}
          <div className="w-1/2 p-6">
            {selectedWorld ? (
              <motion.div
                key={selectedWorld.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full flex flex-col"
              >
                {/* World Image */}
                <div 
                  className="w-full h-48 rounded-lg bg-cover bg-center mb-6 relative"
                  style={{ backgroundImage: `url(${selectedWorld.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-mono text-foreground mb-1">{selectedWorld.name}</h3>
                    <div className={`px-3 py-1 rounded border inline-flex items-center space-x-2 ${getDifficultyColor(selectedWorld.difficulty)}`}>
                      {getDifficultyIcon(selectedWorld.difficulty)}
                      <span className="font-mono">{selectedWorld.difficulty}</span>
                    </div>
                  </div>
                  
                  {selectedWorld.comingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/80 text-white rounded font-mono text-sm">
                      COMING SOON
                    </div>
                  )}
                </div>

                {/* World Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="text-lg font-mono text-secondary mb-2">Mission Brief</h4>
                    <p className="text-foreground/80">{selectedWorld.description}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-mono text-secondary mb-3">Environment Details</h4>
                    <p className="text-foreground/60 text-sm">{selectedWorld.environment}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel bg-background/40 border border-border/50 rounded-lg p-3">
                      <div className="text-muted-foreground text-sm mb-1">Required Level</div>
                      <div className="text-foreground font-mono text-lg">{selectedWorld.requiredLevel}</div>
                    </div>
                    <div className="glass-panel bg-background/40 border border-border/50 rounded-lg p-3">
                      <div className="text-muted-foreground text-sm mb-1">Wave Count</div>
                      <div className="text-foreground font-mono text-lg">{selectedWorld.waves}</div>
                    </div>
                    <div className="glass-panel bg-background/40 border border-border/50 rounded-lg p-3">
                      <div className="text-muted-foreground text-sm mb-1">Completion Reward</div>
                      <div className="text-yellow-400 font-mono text-lg">₵{selectedWorld.completionReward.toLocaleString()}</div>
                    </div>
                    <div className="glass-panel bg-background/40 border border-border/50 rounded-lg p-3">
                      <div className="text-muted-foreground text-sm mb-1">Status</div>
                      <div className={`font-mono text-lg ${
                        selectedWorld.status === 'completed' ? 'text-green-400' :
                        isWorldUnlocked(selectedWorld) ? 'text-blue-400' : 'text-gray-400'
                      }`}>
                        {selectedWorld.status === 'completed' ? 'Completed' :
                         isWorldUnlocked(selectedWorld) ? 'Available' : 'Locked'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teleport Button */}
                <div className="mt-6">
                  {selectedWorld.comingSoon ? (
                    <div className="w-full py-3 px-6 bg-purple-600/20 border border-purple-500/40 rounded-lg text-purple-300 font-mono text-center">
                      COMING SOON
                    </div>
                  ) : isWorldUnlocked(selectedWorld) ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onTeleport(selectedWorld.id)}
                      className="w-full py-3 px-6 bg-secondary/20 border border-secondary/40 rounded-lg text-secondary font-mono hover:bg-secondary/30 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <MapPin className="w-5 h-5" />
                      <span>TELEPORT TO {selectedWorld.name.toUpperCase()}</span>
                    </motion.button>
                  ) : (
                    <div className="w-full py-3 px-6 bg-gray-600/20 border border-gray-500/40 rounded-lg text-gray-400 font-mono text-center flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>REQUIRES LEVEL {selectedWorld.requiredLevel}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-mono text-muted-foreground mb-2">Select a World</h3>
                  <p className="text-muted-foreground">Choose a destination from the left panel</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}