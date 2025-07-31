import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Target, Skull } from 'lucide-react';
import { GameMode } from '../types';
import singlePlayerImage from 'figma:asset/1d9dc0d7448a57e97641e1404582a3997a0accaa.png';
import multiPlayerImage from 'figma:asset/fae8cecb61060d1ece87c1503c1b83abafade59a.png';

interface CampaignMenuProps {
  onStartGame: (mode: GameMode) => void;
  onBack: () => void;
}

export function CampaignMenu({ onStartGame, onBack }: CampaignMenuProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const campaignModes = [
    {
      id: 'campaign_offline' as GameMode,
      title: 'SOLO',
      subtitle: 'STORY MODE',
      description: 'Campaign story',
      image: singlePlayerImage,
      tag: null
    },
    {
      id: 'campaign_coop' as GameMode,
      title: 'CO-OP',
      subtitle: 'SHARED STORY',
      description: 'Story with friends',
      image: multiPlayerImage,
      tag: 'FREE'
    }
  ];

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    onStartGame(mode);
  };

  return (
    <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Apocalyptic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Dramatic Glitch Effects */}
      <div className="absolute inset-0">
        {/* Screen scan lines */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.1) 2px, rgba(220, 38, 38, 0.1) 4px)'
          }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Digital noise effect */}
        <motion.div 
          className="absolute inset-0 bg-secondary/20"
          animate={{ 
            opacity: [0.1, 0.6, 0.1],
            x: [0, 3, -2, 0],
            scaleX: [1, 1.002, 0.998, 1]
          }}
          transition={{ 
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Screen tear effect */}
        <motion.div 
          className="absolute inset-0 bg-black/80"
          style={{
            clipPath: 'polygon(0 40%, 100% 42%, 100% 44%, 0 42%)'
          }}
          animate={{ 
            opacity: [0, 1, 0],
            clipPath: [
              'polygon(0 40%, 100% 42%, 100% 44%, 0 42%)',
              'polygon(0 60%, 100% 62%, 100% 64%, 0 62%)',
              'polygon(0 80%, 100% 82%, 100% 84%, 0 82%)'
            ]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            times: [0, 0.1, 1]
          }}
        />
      </div>

      {/* Zombie atmosphere particles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blood spatter effect */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`blood-${i}`}
            className="absolute w-2 h-2 bg-secondary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Floating debris */}
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={`debris-${i}`}
            className="absolute w-1 h-3 bg-gray-600 opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="glass-panel bg-background/80 border border-secondary/30 rounded-lg p-3 flex items-center space-x-2 hover:bg-secondary/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
          <span className="text-foreground font-mono text-sm">BACK</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl w-full px-6">
        {/* Title with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-6xl font-mono text-secondary mb-2 relative"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(220, 38, 38, 0.5), 2px 0 0 rgba(220, 38, 38, 0.3)",
                "0 0 20px rgba(220, 38, 38, 0.8), -2px 0 0 rgba(220, 38, 38, 0.5)",
                "0 0 10px rgba(220, 38, 38, 0.5), 1px 0 0 rgba(220, 38, 38, 0.3)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.span
              animate={{ 
                x: [0, 2, -1, 0],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              MELTDOWN
            </motion.span>
          </motion.h1>
          <h2 className="text-2xl font-mono text-secondary/80 mb-8">- CAMPAIGN -</h2>
        </motion.div>

        {/* Game Mode Cards */}
        <div className="grid grid-cols-2 gap-16 mb-16">
          {campaignModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModeSelect(mode.id)}
              className="relative cursor-pointer group"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-secondary/30 group-hover:border-secondary/60 transition-all duration-300">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${mode.image})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover'
                  }}
                />
                
                {/* Minimal gradient for text readability only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Tag - Top right corner */}
                {mode.tag && (
                  <div className="absolute top-4 right-4 glass-panel bg-secondary/20 border border-secondary/40 rounded-lg px-3 py-1 z-10">
                    <span className="text-secondary font-mono text-sm">{mode.tag}</span>
                  </div>
                )}
                
                {/* Minimal description overlay - Bottom left corner only */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="glass-panel bg-background/90 border border-secondary/20 rounded-lg p-3 backdrop-blur-sm max-w-[200px]">
                    <h3 className="text-xl font-mono text-secondary mb-1 leading-tight">{mode.title}</h3>
                    <p className="text-secondary/80 font-mono text-sm mb-1">{mode.subtitle}</p>
                    <p className="text-foreground/60 text-xs">{mode.description}</p>
                  </div>
                </div>

                {/* Glitch hover effect */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  animate={{
                    background: [
                      "linear-gradient(45deg, transparent 40%, rgba(220, 38, 38, 0.1) 50%, transparent 60%)",
                      "linear-gradient(135deg, transparent 40%, rgba(220, 38, 38, 0.1) 50%, transparent 60%)",
                      "linear-gradient(225deg, transparent 40%, rgba(220, 38, 38, 0.1) 50%, transparent 60%)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Static noise on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                     style={{
                       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                       backgroundSize: '100px 100px'
                     }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-secondary/60 font-mono text-sm flex items-center justify-center gap-2">
            <Target className="w-4 h-4 animate-pulse" />
            - SELECT A GAME MODE -
            <Skull className="w-4 h-4 animate-pulse" />
          </p>
        </motion.div>
      </div>
    </div>
  );
}