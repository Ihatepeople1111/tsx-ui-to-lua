import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Gift, Coins, Star, Zap } from 'lucide-react';

interface DailyRewardModalProps {
  onClose: () => void;
}

export function DailyRewardModal({ onClose }: DailyRewardModalProps) {
  const [claimed, setClaimed] = useState(false);
  const [currentDay] = useState(3);
  
  const rewards = [
    { day: 1, type: 'coins', amount: 100, icon: Coins, color: 'yellow', claimed: true },
    { day: 2, type: 'xp', amount: 250, icon: Star, color: 'red', claimed: true },
    { day: 3, type: 'coins', amount: 500, icon: Coins, color: 'yellow', claimed: false },
    { day: 4, type: 'energy', amount: 50, icon: Zap, color: 'red', claimed: false },
    { day: 5, type: 'coins', amount: 750, icon: Coins, color: 'yellow', claimed: false },
    { day: 6, type: 'xp', amount: 500, icon: Star, color: 'red', claimed: false },
    { day: 7, type: 'coins', amount: 1000, icon: Coins, color: 'yellow', claimed: false },
  ];

  const colorSchemes = {
    yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-400/60', text: 'text-yellow-300', glow: 'shadow-yellow-500/50' },
    red: { bg: 'bg-red-500/20', border: 'border-red-400/60', text: 'text-red-300', glow: 'shadow-red-500/50' },
  };

  const claimReward = () => {
    setClaimed(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const currentReward = rewards[currentDay - 1];
  const scheme = colorSchemes[currentReward.color as keyof typeof colorSchemes];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-[500px] bg-gradient-to-br from-black/95 via-gray-900/30 to-red-900/30 border border-white/20 rounded-2xl backdrop-blur-md relative overflow-hidden"
      >
        {/* Particle Effects */}
        {claimed && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 500, 
                  y: Math.random() * 400, 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  y: Math.random() * 400 - 200,
                  x: Math.random() * 500 - 100,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className={`absolute w-2 h-2 ${scheme.bg} rounded-full`}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <div className="h-16 bg-gradient-to-r from-black/50 to-red-900/50 border-b border-white/20 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <Gift size={24} className="text-yellow-300" />
            <h2 className="text-xl font-mono text-white">DAILY REWARDS</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-red-500/20 border border-red-400/40 rounded-lg hover:bg-red-400/30 transition-colors"
          >
            <X size={20} className="text-red-200" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Current Day Highlight */}
          <div className="text-center mb-8">
            <motion.div
              animate={claimed ? { 
                scale: [1, 1.2, 1],
                boxShadow: [
                  `0 0 20px ${scheme.glow.includes('yellow') ? 'rgba(251,191,36,0.3)' : 'rgba(220,38,38,0.3)'}`,
                  `0 0 40px ${scheme.glow.includes('yellow') ? 'rgba(251,191,36,0.6)' : 'rgba(220,38,38,0.6)'}`,
                  `0 0 20px ${scheme.glow.includes('yellow') ? 'rgba(251,191,36,0.3)' : 'rgba(220,38,38,0.3)'}`
                ]
              } : {}}
              transition={{ duration: 0.5 }}
              className={`
                inline-flex items-center justify-center w-32 h-32 rounded-full border-4
                ${scheme.bg} ${scheme.border} backdrop-blur-sm relative
              `}
            >
              <currentReward.icon size={48} className={scheme.text} />
              
              {claimed && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 bg-green-500/20 border-4 border-green-400/60 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <div className="text-green-300 text-2xl">✓</div>
                </motion.div>
              )}
            </motion.div>
            
            <h3 className="text-2xl font-mono text-white mt-4">Day {currentDay} Reward</h3>
            <p className={`${scheme.text} text-xl font-mono mt-2`}>
              +{currentReward.amount} {currentReward.type.toUpperCase()}
            </p>
          </div>

          {/* Reward Calendar */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {rewards.map((reward) => {
              const rewardScheme = colorSchemes[reward.color as keyof typeof colorSchemes];
              const isToday = reward.day === currentDay;
              const isClaimed = reward.claimed || (isToday && claimed);
              
              return (
                <div
                  key={reward.day}
                  className={`
                    aspect-square rounded-lg border-2 backdrop-blur-sm 
                    flex flex-col items-center justify-center relative
                    ${isToday 
                      ? `${rewardScheme.bg} ${rewardScheme.border}` 
                      : isClaimed 
                        ? 'bg-green-500/20 border-green-400/40' 
                        : 'bg-white/5 border-white/20'
                    }
                  `}
                >
                  <reward.icon 
                    size={16} 
                    className={
                      isToday 
                        ? rewardScheme.text 
                        : isClaimed 
                          ? 'text-green-300' 
                          : 'text-white/40'
                    } 
                  />
                  <span className={`
                    text-xs font-mono mt-1
                    ${isToday 
                      ? rewardScheme.text 
                      : isClaimed 
                        ? 'text-green-300' 
                        : 'text-white/40'
                    }
                  `}>
                    {reward.day}
                  </span>
                  
                  {isClaimed && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="text-white text-xs">✓</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Claim Button */}
          {!claimed ? (
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 0 30px ${scheme.glow.includes('yellow') ? 'rgba(251,191,36,0.5)' : 'rgba(220,38,38,0.5)'}`
              }}
              whileTap={{ scale: 0.95 }}
              onClick={claimReward}
              className={`
                w-full py-4 ${scheme.bg} border-2 ${scheme.border} rounded-xl 
                ${scheme.text} font-mono text-lg backdrop-blur-sm
                transition-all duration-300 flex items-center justify-center space-x-3
              `}
            >
              <Gift size={24} />
              <span>CLAIM REWARD</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-green-300 text-xl font-mono mb-2">REWARD CLAIMED!</div>
              <div className="text-green-400/80 text-sm font-mono">
                +{currentReward.amount} {currentReward.type.toUpperCase()} added to your account
              </div>
            </motion.div>
          )}

          {/* Streak Info */}
          <div className="text-center mt-6 text-red-300/80 text-sm font-mono">
            Login streak: {currentDay} days • Next reward in 18h 23m
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}