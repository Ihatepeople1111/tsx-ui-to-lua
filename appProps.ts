import { GameMode } from '../types';

export function buildGameHUDProps(props: any) {
  const {
    modalState,
    gameState,
    personalization,
    playerResources,
    inventorySystem
  } = props;

  return {
    onOpenTablet: () => modalState.setShowTablet(true),
    onOpenSettings: () => modalState.setShowSettings(true),
    onBackToMenu: gameState.handleBackToMenu,
    onOpenInventory: modalState.handleToggleInventory,
    crosshairSettings: personalization.crosshairSettings,
    gameMode: gameState.selectedGameMode,
    playerCoins: playerResources.playerCoins,
    playerGems: playerResources.playerGems,
    showInventory: modalState.showInventory,
    hotbarItems: inventorySystem.hotbarItems,
    selectedHotbarSlot: inventorySystem.selectedHotbarSlot,
    onHotbarSlotSelect: inventorySystem.setSelectedHotbarSlot,
    onRemoveFromHotbar: inventorySystem.removeItemFromHotbar,
    gameSettings: personalization.gameSettings
  };
}

export function buildDeployScreenProps(props: any) {
  const { gameState, personalization, onDeploy } = props;

  return {
    gameMode: gameState.selectedGameMode,
    gameSettings: personalization.gameSettings,
    onGameSettingsChange: personalization.updateGameSettings,
    onDeploy,
    onBack: () => gameState.setUIState('menu')
  };
}

export function buildPartyMenuProps(props: any) {
  const { gameState, handlePartyGameStart } = props;

  return {
    mode: gameState.currentPartyMode,
    onStartGame: handlePartyGameStart,
    onBack: () => gameState.setUIState('menu')
  };
}