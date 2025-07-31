import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [showR6Warning, setShowR6Warning] = useState(true);
  const [showContinue, setShowContinue] = useState(false);

  const tips = [
    "Use cover to avoid zombie hordes",
    "Headshots deal critical damage",
    "Collect resources to upgrade weapons",
    "Team coordination is key to survival",
    "Watch for special infected types",
    "Build barricades during prep time"
  ];

  useEffect(() => {
    // Show R6 warning for 3 seconds
    const r6Timer = setTimeout(() => {
      setShowR6Warning(false);
      startLoading();
    }, 3000);

    return () => clearTimeout(r6Timer);
  }, []);

  const startLoading = () => {
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setShowContinue(true), 500);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 100);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 2000);

    return () => {
      clearInterval(loadingInterval);
      clearInterval(tipInterval);
    };
  };

  const handleContinue = () => {
    onComplete();
  };

  if (showR6Warning) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="size-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIyMCwgMzgsIDM4LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center relative z-10"
        >
          {/* Warning Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 mx-auto mb-8 bg-yellow-500/20 border-2 border-yellow-400/60 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          <h1 className="text-4xl font-mono text-yellow-300 mb-4">⚠️ RECOMMENDATION</h1>
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-xl font-mono text-white">
              For optimal experience, we recommend using
            </p>
            <div className="text-3xl font-mono text-red-300 bg-red-500/20 border border-red-400/40 rounded-lg py-4 px-6 backdrop-blur-sm">
              R6 CHARACTER TYPE
            </div>
            <p className="text-lg font-mono text-white/80">
              instead of R15
            </p>
            <p className="text-sm font-mono text-red-300/60 mt-6">
              Better weapon handling and combat mechanics
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="size-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIyMCwgMzgsIDM4LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        {/* Game Logo/Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h1
            animate={{ 
              textShadow: [
                "0 0 20px rgba(220, 38, 38, 0.8)",
                "0 0 30px rgba(220, 38, 38, 1)",
                "0 0 20px rgba(220, 38, 38, 0.8)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl font-mono text-white mb-4 tracking-wider"
          >
            MELTDOWN
          </motion.h1>
          <motion.h2
            animate={{ 
              textShadow: [
                "0 0 15px rgba(239, 68, 68, 0.6)",
                "0 0 25px rgba(239, 68, 68, 0.8)",
                "0 0 15px rgba(239, 68, 68, 0.6)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="text-4xl font-mono text-red-300 tracking-wider"
          >
            SECTOR Z
          </motion.h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-4 opacity-60"></div>
        </motion.div>

        {/* Loading Content */}
        {!showContinue ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            {/* Loading Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 font-mono text-sm">INITIALIZING TACTICAL SYSTEMS</span>
                <span className="text-red-300 font-mono text-sm">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-gray-800/50 border border-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Loading Tips */}
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel p-4 bg-white/5 border border-white/20 backdrop-blur-sm max-w-md mx-auto"
            >
              <p className="text-red-200 font-mono text-sm">
                💡 <span className="text-white">{tips[currentTip]}</span>
              </p>
            </motion.div>

            {/* Loading Status */}
            <div className="space-y-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/60 font-mono text-xs"
              >
                {progress < 30 && "Loading weapon systems..."}
                {progress >= 30 && progress < 60 && "Initializing zombie AI..."}
                {progress >= 60 && progress < 90 && "Preparing battle environment..."}
                {progress >= 90 && "Finalizing tactical interface..."}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.4)",
                  "0 0 40px rgba(220, 38, 38, 0.8)",
                  "0 0 20px rgba(220, 38, 38, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-green-400 font-mono text-lg mb-4"
            >
              ✓ SYSTEMS READY
            </motion.div>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(220, 38, 38, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="px-8 py-4 glass-panel bg-red-500/20 border border-red-400/40 rounded-lg text-red-200 font-mono text-lg backdrop-blur-sm hover:bg-red-400/30 transition-all duration-300"
            >
              PRESS ANY BUTTON TO CONTINUE
            </motion.button>
            
            <p className="text-white/40 font-mono text-xs">
              Click to enter the combat zone
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-white/30 font-mono text-xs">
          MELTDOWN SECTOR Z v1.0.0 | Zombie Wave Defense Simulator
        </p>
      </motion.div>
    </motion.div>
  );
}