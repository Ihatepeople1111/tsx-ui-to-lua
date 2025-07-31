import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Package2, Search, Plus, Trash2 } from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryModalProps {
  onClose: () => void;
  playerCoins: number;
  playerGems: number;
  inventoryItems: InventoryItem[];
  onUseItem: (itemId: string) => { success: boolean; message: string } | undefined;
  onRemoveItem: (itemId: string) => void;
  onAddToHotbar?: (item: InventoryItem, slot?: number) => boolean;
}

export function InventoryModal({ 
  onClose, 
  playerCoins, 
  playerGems, 
  inventoryItems, 
  onUseItem, 
  onRemoveItem,
  onAddToHotbar 
}: InventoryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'weapons' | 'equipment' | 'consumables'>('all');

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                     (selectedTab === 'weapons' && item.type === 'weapon') ||
                     (selectedTab === 'equipment' && item.type === 'equipment') ||
                     (selectedTab === 'consumables' && item.type === 'consumable');
    return matchesSearch && matchesTab;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-400/10';
      case 'uncommon': return 'border-green-400 bg-green-400/10';
      case 'rare': return 'border-blue-400 bg-blue-400/10';
      case 'epic': return 'border-purple-400 bg-purple-400/10';
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const handleAddToHotbar = (item: InventoryItem) => {
    if (onAddToHotbar) {
      const success = onAddToHotbar(item);
      if (success) {
        // Show success feedback
        console.log(`Added ${item.name} to hotbar`);
      }
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
        className="glass-panel bg-background/90 border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Package2 className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-mono text-secondary">INVENTORY</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-lg">💰</span>
                <span className="text-foreground font-mono">{playerCoins.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 text-lg">💎</span>
                <span className="text-foreground font-mono">{playerGems.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-border">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground font-mono placeholder-muted-foreground focus:border-secondary/60 focus:outline-none"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'weapons', label: 'Weapons' },
              { id: 'equipment', label: 'Equipment' },
              { id: 'consumables', label: 'Consumables' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-secondary/20 text-secondary border border-secondary/40'
                    : 'bg-muted/20 text-muted-foreground hover:bg-muted/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Package2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-mono text-muted-foreground mb-2">No Items Found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try a different search term' : 'Your inventory is empty'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-panel p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${getRarityColor(item.rarity)}`}
                >
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h3 className="text-foreground font-mono text-lg">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="text-xs font-mono px-2 py-1 bg-background/50 rounded capitalize">
                        {item.type}
                      </span>
                      <span className="text-xs font-mono px-2 py-1 bg-background/50 rounded capitalize">
                        {item.rarity}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs font-mono px-2 py-1 bg-secondary/20 text-secondary rounded">
                          x{item.quantity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {item.type === 'consumable' ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUseItem(item.id)}
                        className="flex-1 py-2 bg-green-500/20 border border-green-400/40 rounded-lg text-green-200 font-mono text-sm hover:bg-green-400/30 transition-colors"
                      >
                        Use
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUseItem(item.id)}
                        className="flex-1 py-2 bg-blue-500/20 border border-blue-400/40 rounded-lg text-blue-200 font-mono text-sm hover:bg-blue-400/30 transition-colors"
                      >
                        Equip
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToHotbar(item)}
                      className="px-3 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-secondary hover:bg-secondary/30 transition-colors"
                      title="Add to Hotbar"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onRemoveItem(item.id)}
                      className="px-3 py-2 bg-red-500/20 border border-red-400/40 rounded-lg text-red-200 hover:bg-red-400/30 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}