import { useState, useCallback } from 'react';
import { InventoryItem, HotbarItem } from '../types';
import { INITIAL_INVENTORY_ITEMS } from '../constants';

export function useInventorySystem() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(INITIAL_INVENTORY_ITEMS);
  const [hotbarItems, setHotbarItems] = useState<(HotbarItem | null)[]>(Array(9).fill(null));
  const [selectedHotbarSlot, setSelectedHotbarSlot] = useState(0);

  const addToHotbar = useCallback((item: InventoryItem, slot?: number) => {
    const targetSlot = slot !== undefined ? slot : selectedHotbarSlot;
    
    if (targetSlot < 0 || targetSlot >= 9) return false;

    const hotbarItem: HotbarItem = {
      id: item.id,
      name: item.name,
      icon: item.icon,
      quantity: item.quantity,
      type: item.type,
      slot: targetSlot
    };

    setHotbarItems(prev => {
      const newItems = [...prev];
      newItems[targetSlot] = hotbarItem;
      return newItems;
    });

    return true;
  }, [selectedHotbarSlot]);

  const removeItemFromHotbar = useCallback((slot: number) => {
    if (slot < 0 || slot >= 9) return;
    
    setHotbarItems(prev => {
      const newItems = [...prev];
      newItems[slot] = null;
      return newItems;
    });
  }, []);

  const useInventoryItem = useCallback((itemId: string) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'consumable') {
      setInventoryItems(prev => prev.map(i => 
        i.id === itemId 
          ? { ...i, quantity: Math.max(0, i.quantity - 1) }
          : i
      ).filter(i => i.quantity > 0));

      // Update hotbar quantity if item is there
      setHotbarItems(prev => prev.map(hotbarItem => 
        hotbarItem && hotbarItem.id === itemId
          ? { ...hotbarItem, quantity: Math.max(0, (hotbarItem.quantity || 1) - 1) }
          : hotbarItem
      ).map(hotbarItem => 
        hotbarItem && (hotbarItem.quantity || 0) <= 0 ? null : hotbarItem
      ));

      return { success: true, message: `Used ${item.name}` };
    }

    if (item.type === 'equipment') {
      return { success: true, message: `Equipped ${item.name}` };
    }

    return { success: false, message: 'Cannot use this item' };
  }, [inventoryItems]);

  const findEmptyHotbarSlot = useCallback(() => {
    return hotbarItems.findIndex(item => item === null);
  }, [hotbarItems]);

  const addItemToInventory = useCallback((item: InventoryItem) => {
    setInventoryItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  return {
    inventoryItems,
    setInventoryItems,
    hotbarItems,
    setHotbarItems,
    selectedHotbarSlot,
    setSelectedHotbarSlot,
    addToHotbar,
    removeItemFromHotbar,
    useInventoryItem,
    findEmptyHotbarSlot,
    addItemToInventory,
  };
}