import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Plus, Minus, Play, Settings, Eye, EyeOff, Zap, Shield, Target, Gauge } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GameMode, GameSettings } from '../types';

interface PartyMenuProps {
  mode: GameMode;
  onStartGame: (mode: GameMode) => void;
  onBack: () => void;
}

export function PartyMenu({ mode, onStartGame, onBack }: PartyMenuProps) {
  const [partyMembers, setPartyMembers] = useState([
    { id: '1', name: 'You', level: 47, ready: true, isLeader: true }
  ]);
  const [partyCode, setPartyCode] = useState('ABC123');
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    firstPersonMode: false,
    mouseSensitivity: 50,
    fov: 90,
    graphics: 'high',
    vsync: true,
    motionBlur: false,
  });

  const getGameModeDisplay = () => {
    switch (mode) {
      case 'survival_multiplayer': return 'Survival - Multiplayer';
      case 'campaign_coop': return 'Campaign - Co-op';
      case 'arena_pvp': return 'Arena - PvP';
      default: return 'Unknown Mode';
    }
  };

  const handleCreateParty = () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setPartyCode(newCode);
  };

  const handleJoinParty = () => {
    // Add fake party member for demo
    const newMember = {
      id: Date.now().toString(),
      name: `Player${Math.floor(Math.random() * 1000)}`,
      level: Math.floor(Math.random() * 50) + 1,
      ready: false,
      isLeader: false
    };
    setPartyMembers(prev => [...prev, newMember]);
  };

  const handleLeaveParty = () => {
    setPartyMembers([{ id: '1', name: 'You', level: 47, ready: true, isLeader: true }]);
  };

  const handlePlayWithRandoms = () => {
    // Add random players and start immediately
    const randomPlayers = Array.from({ length: 3 }, (_, i) => ({
      id: (Date.now() + i).toString(),
      name: `Random${Math.floor(Math.random() * 1000)}`,
      level: Math.floor(Math.random() * 50) + 1,
      ready: true,
      isLeader: false
    }));
    setPartyMembers(prev => [...prev, ...randomPlayers]);
    
    setTimeout(() => {
      onStartGame(mode);
    }, 1500);
  };

  const allPlayersReady = partyMembers.every(member => member.ready);

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
          <ArrowLeft className="w-5 h-5 text-secondary" />
          <span className="text-foreground font-mono text-sm">BACK</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-4xl font-mono text-secondary mb-4"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(220, 38, 38, 0.5)",
                "0 0 20px rgba(220, 38, 38, 0.8)",
                "0 0 10px rgba(220, 38, 38, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MULTIPLAYER LOBBY
          </motion.h1>
          <div className="glass-panel bg-secondary/20 border border-secondary/40 rounded-lg p-3 inline-block">
            <span className="text-foreground font-mono text-xl">{getGameModeDisplay()}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Party Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel bg-background/80 border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-6 flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>PARTY CONTROLS</span>
            </h3>
            
            <div className="space-y-4">
              {/* Create Party */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateParty}
                className="w-full py-3 px-4 bg-green-600/20 border border-green-400/40 rounded-lg text-green-300 font-mono hover:bg-green-600/30 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>CREATE PARTY</span>
              </motion.button>

              {/* Join Party */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinParty}
                className="w-full py-3 px-4 bg-blue-600/20 border border-blue-400/40 rounded-lg text-blue-300 font-mono hover:bg-blue-600/30 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>JOIN PARTY</span>
              </motion.button>

              {/* Leave Party */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLeaveParty}
                className="w-full py-3 px-4 bg-red-600/20 border border-red-400/40 rounded-lg text-red-300 font-mono hover:bg-red-600/30 transition-colors flex items-center justify-center space-x-2"
              >
                <Minus className="w-5 h-5" />
                <span>LEAVE PARTY</span>
              </motion.button>

              {/* Party Code */}
              <div className="mt-6">
                <label className="text-foreground font-mono mb-2 block">Party Code</label>
                <div className="glass-panel bg-background/40 border border-border rounded-lg p-3">
                  <span className="text-secondary font-mono text-xl tracking-wider">{partyCode}</span>
                </div>
              </div>

              {/* Play with Randoms */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlayWithRandoms}
                className="w-full py-3 px-4 bg-purple-600/20 border border-purple-400/40 rounded-lg text-purple-300 font-mono hover:bg-purple-600/30 transition-colors flex items-center justify-center space-x-2 mt-6"
              >
                <Zap className="w-5 h-5" />
                <span>PLAY WITH RANDOMS</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Party Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel bg-background/80 border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-6">PARTY MEMBERS</h3>
            
            <div className="space-y-3">
              {partyMembers.map((member) => (
                <div
                  key={member.id}
                  className={`glass-panel rounded-lg p-3 border ${
                    member.ready 
                      ? 'border-green-400/40 bg-green-400/10' 
                      : 'border-yellow-400/40 bg-yellow-400/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        member.ready ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <div>
                        <div className="text-foreground font-mono flex items-center space-x-2">
                          <span>{member.name}</span>
                          {member.isLeader && (
                            <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded">LEADER</span>
                          )}
                        </div>
                        <div className="text-muted-foreground text-sm">Level {member.level}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-mono ${
                      member.ready ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {member.ready ? 'READY' : 'NOT READY'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Game Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-panel bg-background/80 border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-mono text-secondary mb-6 flex items-center space-x-2">
              <Settings className="w-6 h-6" />
              <span>GAME SETTINGS</span>
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
                    <p className="text-muted-foreground text-sm">Immersive perspective</p>
                  </div>
                </div>
                <Switch
                  checked={gameSettings.firstPersonMode}
                  onCheckedChange={(checked) => setGameSettings(prev => ({ ...prev, firstPersonMode: checked }))}
                />
              </div>

              {/* Graphics Quality */}
              <div>
                <label className="text-foreground font-mono mb-2 block">Graphics Quality</label>
                <Select 
                  value={gameSettings.graphics} 
                  onValueChange={(value) => setGameSettings(prev => ({ ...prev, graphics: value as any }))}
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
                  onValueChange={(value) => setGameSettings(prev => ({ ...prev, fov: value[0] }))}
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
                  onValueChange={(value) => setGameSettings(prev => ({ ...prev, mouseSensitivity: value[0] }))}
                  min={1}
                  max={100}
                  step={1}
                  className="slider"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Start Game Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={allPlayersReady ? { scale: 1.05 } : {}}
            whileTap={allPlayersReady ? { scale: 0.95 } : {}}
            onClick={() => allPlayersReady && onStartGame(mode)}
            disabled={!allPlayersReady}
            className={`glass-panel rounded-xl px-12 py-6 transition-all duration-300 ${
              allPlayersReady
                ? 'bg-secondary/20 border border-secondary/40 hover:bg-secondary/30 cursor-pointer'
                : 'bg-gray-600/20 border border-gray-500/40 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Play className={`w-8 h-8 ${allPlayersReady ? 'text-secondary' : 'text-gray-400'}`} />
              <div className="text-left">
                <div className={`font-mono text-2xl ${allPlayersReady ? 'text-foreground' : 'text-gray-400'}`}>
                  {allPlayersReady ? 'START GAME' : 'WAITING FOR PLAYERS'}
                </div>
                <div className={`font-mono text-sm ${allPlayersReady ? 'text-foreground/60' : 'text-gray-500'}`}>
                  {allPlayersReady ? 'All players ready' : 'Some players not ready'}
                </div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}