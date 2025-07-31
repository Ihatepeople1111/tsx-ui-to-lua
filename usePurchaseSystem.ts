import { useState } from 'react';
import { PurchaseItem, GamePass, InventoryItem } from '../types';
import { INITIAL_GAME_PASSES } from '../constants';

interface UsePurchaseSystemProps {
  playerCoins: number;
  setPlayerCoins: (value: number | ((prev: number) => number)) => void;
  playerGems: number;
  setPlayerGems: (value: number | ((prev: number) => number)) => void;
  playerRobux: number;
  setPlayerRobux: (value: number | ((prev: number) => number)) => void;
  setInventoryItems: (value: InventoryItem[] | ((prev: InventoryItem[]) => InventoryItem[])) => void;
}

export const usePurchaseSystem = ({
  playerCoins,
  setPlayerCoins,
  playerGems,
  setPlayerGems,
  playerRobux,
  setPlayerRobux,
  setInventoryItems,
}: UsePurchaseSystemProps) => {
  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem | null>(null);
  const [showPurchaseConfirmation, setShowPurchaseConfirmation] = useState(false);
  const [gamePasses, setGamePasses] = useState<GamePass[]>(INITIAL_GAME_PASSES);

  const handlePurchaseRequest = (item: PurchaseItem) => {
    setPurchaseItem(item);
    setShowPurchaseConfirmation(true);
  };

  const handlePurchaseConfirm = () => {
    if (!purchaseItem) return;
    
    // Check if player has enough currency
    let hasEnoughCurrency = false;
    if (purchaseItem.currency === 'coins') {
      hasEnoughCurrency = playerCoins >= purchaseItem.price;
    } else if (purchaseItem.currency === 'gems') {
      hasEnoughCurrency = playerGems >= purchaseItem.price;
    } else if (purchaseItem.currency === 'robux') {
      hasEnoughCurrency = playerRobux >= purchaseItem.price;
    }
    
    if (hasEnoughCurrency) {
      // Deduct currency
      if (purchaseItem.currency === 'coins') {
        setPlayerCoins(prev => prev - purchaseItem.price);
      } else if (purchaseItem.currency === 'gems') {
        setPlayerGems(prev => prev - purchaseItem.price);
      } else if (purchaseItem.currency === 'robux') {
        setPlayerRobux(prev => prev - purchaseItem.price);
      }
      
      // Handle different purchase types
      if (purchaseItem.type === 'gamepass') {
        // Mark game pass as owned
        setGamePasses(prev => 
          prev.map(pass => 
            pass.id === purchaseItem.id 
              ? { ...pass, owned: true }
              : pass
          )
        );
      } else if (purchaseItem.type === 'currency') {
        // Add currency to player
        if (purchaseItem.id === 'coins-1000') {
          setPlayerCoins(prev => prev + 1000);
        } else if (purchaseItem.id === 'coins-5000') {
          setPlayerCoins(prev => prev + 5000);
        } else if (purchaseItem.id === 'gems-100') {
          setPlayerGems(prev => prev + 100);
        }
      } else {
        // Add item to inventory
        const newItem: InventoryItem = {
          id: purchaseItem.id,
          name: purchaseItem.name,
          type: (purchaseItem.type as any) || 'consumable',
          quantity: 1,
          icon: purchaseItem.icon,
          description: purchaseItem.description || '',
          rarity: 'common'
        };
        
        setInventoryItems(prev => {
          const existingItem = prev.find(item => item.id === newItem.id);
          if (existingItem) {
            return prev.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prev, newItem];
          }
        });
      }
      
      console.log(`Purchased ${purchaseItem.name} for ${purchaseItem.price} ${purchaseItem.currency}`);
    }
    
    setShowPurchaseConfirmation(false);
    setPurchaseItem(null);
  };

  const handlePurchaseCancel = () => {
    setShowPurchaseConfirmation(false);
    setPurchaseItem(null);
  };

  return {
    purchaseItem,
    showPurchaseConfirmation,
    gamePasses,
    handlePurchaseRequest,
    handlePurchaseConfirm,
    handlePurchaseCancel,
  };
};