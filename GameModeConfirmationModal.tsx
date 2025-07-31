import { motion } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface GameModeConfirmationModalProps {
  gameMode: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function GameModeConfirmationModal({ gameMode, onConfirm, onCancel }: GameModeConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel bg-black/60 border border-orange-500/40 rounded-2xl p-8 max-w-md w-full mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-mono text-white">CONFIRMATION</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <p className="text-white font-mono text-lg mb-4">
            Are you sure you want to load into this gamemode?
          </p>
          <div className="glass-panel bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
            <span className="text-orange-400 font-mono text-lg">
              {gameMode.toUpperCase().replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            className="flex-1 glass-panel bg-gray-600/20 border border-gray-500/40 rounded-xl py-3 px-6 text-white font-mono hover:bg-gray-600/30 transition-all duration-300"
          >
            CANCEL
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 glass-panel bg-orange-600/20 border border-orange-500/40 rounded-xl py-3 px-6 text-orange-400 font-mono hover:bg-orange-600/30 transition-all duration-300"
          >
            CONFIRM
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}