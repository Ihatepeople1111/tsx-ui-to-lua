import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, ShoppingCart, BookOpen, ArrowLeft, Users, Target, Shield, Gamepad2, Crown, Coins, User, Palette, Skull } from 'lucide-react';

interface MainMenuProps {
  onSurvivalSelect: () => void;
  onCampaignSelect: () => void;
  onArenaSelect: () => void;
  onOpenSettings: () => void;
  onOpenTutorial: () => void;
  onOpenPersonalization?: () => void;
}

export function MainMenu({ 
  onSurvivalSelect, 
  onCampaignSelect, 
  onArenaSelect, 
  onOpenSettings, 
  onOpenTutorial,
  onOpenPersonalization 
}: MainMenuProps) {
  const [showModeSelection, setShowModeSelection] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const gameModes = [
    {
      id: 'survival',
      title: 'SURVIVAL',
      subtitle: 'INFINITE WAVES',
      description: 'Fight endless zombie hordes',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
      gradient: 'from-secondary/80 to-secondary/60',
      onClick: onSurvivalSelect
    },
    {
      id: 'campaign',
      title: 'CAMPAIGN',
      subtitle: 'STORY MODE',
      description: 'Experience the full story',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000&auto=format&fit=crop',
      gradient: 'from-secondary/70 to-secondary/50',
      onClick: onCampaignSelect
    },
    {
      id: 'arena',
      title: 'ARENA',
      subtitle: 'TRAINING',
      description: 'Practice and compete',
      icon: Gamepad2,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
      gradient: 'from-secondary/60 to-secondary/40',
      onClick: onArenaSelect
    }
  ];

  const shopItems = [
    { id: '1', name: 'Weapon Pack', price: 1500, currency: 'coins', image: '🔫' },
    { id: '2', name: 'Armor Bundle', price: 2000, currency: 'coins', image: '🛡️' },
    { id: '3', name: 'VIP Pass', price: 299, currency: 'robux', image: '👑' },
    { id: '4', name: 'XP Booster', price: 150, currency: 'robux', image: '⚡' },
    { id: '5', name: 'Coin Pack', price: 99, currency: 'robux', image: '💰' },
    { id: '6', name: 'Exclusive Skin', price: 500, currency: 'robux', image: '🎨' }
  ];

  if (showShop) {
    return (
      <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Apocalyptic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Glitch Effects */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            className="absolute inset-0 bg-secondary/20"
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
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
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowShop(false)}
            className="glass-panel bg-background/80 border border-secondary/30 rounded-lg p-3 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground font-mono text-sm">BACK</span>
          </motion.button>
          
          <div className="flex items-center space-x-4">
            <div className="glass-panel bg-background/80 border border-yellow-500/30 rounded-lg p-3 flex items-center space-x-2">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-mono text-sm">15,000</span>
            </div>
            <div className="glass-panel bg-background/80 border border-green-500/30 rounded-lg p-3 flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-foreground font-mono text-sm">450</span>
            </div>
          </div>
        </div>

        {/* Shop Content */}
        <div className="relative z-10 max-w-4xl w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-mono text-secondary mb-4">SHOP</h1>
            <p className="text-secondary/80 font-mono text-lg">Gear up for the apocalypse</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {shopItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-panel bg-background/80 border border-secondary/20 rounded-xl p-6 text-center cursor-pointer hover:border-secondary/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.image}</div>
                <h3 className="text-foreground font-mono text-lg mb-2">{item.name}</h3>
                <div className="flex items-center justify-center space-x-2">
                  {item.currency === 'coins' ? (
                    <Coins className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <div className="w-4 h-4 bg-green-500 rounded" />
                  )}
                  <span className="text-foreground font-mono">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showModeSelection) {
    return (
      <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Apocalyptic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Dramatic Glitch Effects */}
        <div className="absolute inset-0">
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
          
          <motion.div 
            className="absolute inset-0 bg-secondary/20"
            animate={{ 
              opacity: [0.1, 0.6, 0.1],
              x: [0, 3, -2, 0],
            }}
            transition={{ 
              duration: 0.4,
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
            onClick={() => setShowModeSelection(false)}
            className="glass-panel bg-background/80 border border-secondary/30 rounded-lg p-3 flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
            <span className="text-foreground font-mono text-sm">BACK</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-6xl font-mono text-secondary mb-2"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(220, 38, 38, 0.5)",
                  "0 0 20px rgba(220, 38, 38, 0.8)",
                  "0 0 10px rgba(220, 38, 38, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              MELTDOWN
            </motion.h1>
            <h2 className="text-2xl font-mono text-secondary/80 mb-8">SECTOR Z</h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {gameModes.slice(0, 2).map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={mode.onClick}
                className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group border-2 border-secondary/30 hover:border-secondary/60 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${mode.image})` }}
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t ${mode.gradient} transition-opacity duration-300 group-hover:opacity-90`} />
                
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="mb-4">
                    <mode.icon className="w-12 h-12 text-foreground mb-4" />
                  </div>
                  <h3 className="text-3xl font-mono text-foreground mb-2">{mode.title}</h3>
                  <p className="text-foreground/80 font-mono text-sm mb-1">{mode.subtitle}</p>
                  <p className="text-foreground/60 text-sm">{mode.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Third Mode - Full Width */}
          {(() => {
            const ThirdModeIcon = gameModes[2].icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={gameModes[2].onClick}
                className="relative h-60 rounded-2xl overflow-hidden cursor-pointer group border-2 border-secondary/30 hover:border-secondary/60 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${gameModes[2].image})` }}
                />
                
                <div className={`absolute inset-0 bg-gradient-to-r ${gameModes[2].gradient} transition-opacity duration-300 group-hover:opacity-90`} />
                
                <div className="relative z-10 h-full flex items-center justify-between p-8">
                  <div className="flex items-center space-x-6">
                    <ThirdModeIcon className="w-16 h-16 text-foreground" />
                    <div>
                      <h3 className="text-4xl font-mono text-foreground mb-2">{gameModes[2].title}</h3>
                      <p className="text-foreground/80 font-mono text-lg mb-1">{gameModes[2].subtitle}</p>
                      <p className="text-foreground/60">{gameModes[2].description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-8"
          >
            <p className="text-secondary/60 font-mono text-sm">- SELECT A GAME MODE -</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main Menu
  return (
    <div className="size-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Apocalyptic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Dramatic Glitch Effects */}
      <div className="absolute inset-0">
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
      </div>

      {/* Zombie atmosphere particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`blood-${i}`}
            className="absolute w-2 h-2 bg-secondary rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Header Controls */}
      <div className="absolute top-6 right-6 flex items-center space-x-4 z-10">
        <div className="glass-panel bg-background/80 border border-border rounded-lg p-3 flex items-center space-x-2">
          <User className="w-4 h-4 text-foreground" />
          <span className="text-foreground font-mono text-sm">OPERATIVE</span>
        </div>
        
        {onOpenPersonalization && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPersonalization}
            className="glass-panel bg-background/80 border border-purple-500/30 rounded-lg p-3 hover:bg-purple-600/20 transition-colors"
          >
            <Palette className="w-5 h-5 text-purple-400" />
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenSettings}
          className="glass-panel bg-background/80 border border-border rounded-lg p-3 hover:bg-foreground/10 transition-colors"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1 
            className="text-8xl font-mono text-secondary mb-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(220, 38, 38, 0.5), 2px 0 0 rgba(220, 38, 38, 0.3)",
                "0 0 30px rgba(220, 38, 38, 0.8), -2px 0 0 rgba(220, 38, 38, 0.5)",
                "0 0 20px rgba(220, 38, 38, 0.5), 1px 0 0 rgba(220, 38, 38, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ 
                x: [0, 2, -1, 0],
                opacity: [1, 0.9, 1]
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              MELTDOWN
            </motion.span>
          </motion.h1>
          <h2 className="text-4xl font-mono text-secondary/80 mb-4">SECTOR Z</h2>
          <p className="text-foreground/60 font-mono text-xl">Military-grade survival experience</p>
        </motion.div>

        {/* Main Actions */}
        <div className="flex flex-col items-center space-y-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModeSelection(true)}
            className="glass-panel bg-secondary/20 border border-secondary/40 rounded-xl px-12 py-6 hover:bg-secondary/30 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-secondary" />
              <span className="text-foreground font-mono text-2xl">DEPLOY</span>
            </div>
          </motion.button>

          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShop(true)}
              className="glass-panel bg-yellow-600/20 border border-yellow-500/40 rounded-xl px-8 py-4 hover:bg-yellow-600/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-yellow-400" />
                <span className="text-foreground font-mono text-lg">SHOP</span>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTutorial}
              className="glass-panel bg-blue-600/20 border border-blue-500/40 rounded-xl px-8 py-4 hover:bg-blue-600/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span className="text-foreground font-mono text-lg">TUTORIAL</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Footer Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 glass-panel bg-background/80 border border-secondary/20 rounded-lg p-4 inline-block"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-mono text-sm">ONLINE</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-foreground font-mono text-sm">47,381 ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center space-x-2">
              <Skull className="w-4 h-4 text-secondary animate-pulse" />
              <span className="text-foreground font-mono text-sm">RANK: ELITE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}