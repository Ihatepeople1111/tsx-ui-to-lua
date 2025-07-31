import { motion } from 'motion/react';
import { X, AlertTriangle, Coins, Gem } from 'lucide-react';
import { PurchaseItem } from '../types';

interface PurchaseConfirmationModalProps {
  item: PurchaseItem;
  onConfirm: () => void;
  onCancel: () => void;
  playerCoins: number;
  playerGems: number;
  playerRobux: number;
}

export function PurchaseConfirmationModal({ 
  item, 
  onConfirm, 
  onCancel, 
  playerCoins, 
  playerGems,
  playerRobux
}: PurchaseConfirmationModalProps) {
  const getPlayerCurrency = () => {
    switch (item.currency) {
      case 'coins': return playerCoins;
      case 'gems': return playerGems;
      case 'robux': return playerRobux;
      default: return 0;
    }
  };

  const getCurrencyIcon = () => {
    switch (item.currency) {
      case 'coins': return <Coins className="w-4 h-4 text-yellow-400" />;
      case 'gems': return <Gem className="w-4 h-4 text-blue-400" />;
      case 'robux': return <div className="w-4 h-4 bg-green-500 rounded" />;
      default: return <Coins className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getCurrencyName = () => {
    switch (item.currency) {
      case 'coins': return 'Coins';
      case 'gems': return 'Gems';
      case 'robux': return 'Robux';
      default: return 'Currency';
    }
  };

  const playerCurrency = getPlayerCurrency();
  const hasEnoughCurrency = playerCurrency >= item.price;
  const CurrencyIcon = getCurrencyIcon;

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
        className="glass-panel bg-card/90 border border-border p-6 rounded-xl max-w-md w-full mx-auto"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-mono text-white">Confirm Purchase</h3>
              <p className="text-sm text-muted-foreground">Are you sure you want to buy this item?</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Details */}
        <div className="glass-panel bg-muted/30 border border-border/50 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{item.icon}</div>
            <div className="flex-1">
              <h4 className="font-mono text-white">{item.name}</h4>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <CurrencyIcon />
                <span className="font-mono text-yellow-400">{item.price.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm">
                  {getCurrencyName()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Balance */}
        <div className="flex items-center justify-between mb-4 p-3 bg-muted/20 rounded-lg">
          <span className="text-sm text-muted-foreground">Your Balance:</span>
          <div className="flex items-center space-x-2">
            <CurrencyIcon />
            <span className="font-mono text-white">{playerCurrency.toLocaleString()}</span>
          </div>
        </div>

        {/* Insufficient Funds Warning */}
        {!hasEnoughCurrency && (
          <div className="flex items-center space-x-2 p-3 bg-destructive/20 border border-destructive/30 rounded-lg mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive font-mono">
              Insufficient {getCurrencyName().toLowerCase()}!
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            className="flex-1 px-4 py-2 glass-panel bg-muted/30 border border-border text-white font-mono rounded-lg hover:bg-muted/40 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: hasEnoughCurrency ? 1.02 : 1 }}
            whileTap={{ scale: hasEnoughCurrency ? 0.98 : 1 }}
            onClick={hasEnoughCurrency ? onConfirm : undefined}
            disabled={!hasEnoughCurrency}
            className={`flex-1 px-4 py-2 font-mono rounded-lg transition-colors ${
              hasEnoughCurrency
                ? 'bg-secondary/20 border border-secondary/40 text-secondary hover:bg-secondary/30'
                : 'bg-muted/10 border border-muted/20 text-muted-foreground cursor-not-allowed'
            }`}
          >
            {hasEnoughCurrency ? 'Purchase' : 'Cannot Afford'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}