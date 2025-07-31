import { Tablet } from './Tablet';
import { SettingsModal } from './SettingsModal';
import { DailyRewardModal } from './DailyRewardModal';
import { PurchaseConfirmationModal } from './PurchaseConfirmationModal';
import { TutorialModal } from './TutorialModal';
import { InventoryModal } from './InventoryModal';
import { GameModeConfirmationModal } from './GameModeConfirmationModal';

interface AppModalsProps {
  modalState: any;
  personalization: any;
  purchaseSystem: any;
  playerResources: any;
  inventorySystem: any;
  gameState: any;
  onCloseTablet: () => void;
  onCloseSettings: () => void;
  onConfirmGameMode: () => void;
}

export function AppModals({
  modalState,
  personalization,
  purchaseSystem,
  playerResources,
  inventorySystem,
  gameState,
  onCloseTablet,
  onCloseSettings,
  onConfirmGameMode
}: AppModalsProps) {
  return (
    <>
      {modalState.showTablet && (
        <Tablet 
          onClose={onCloseTablet}
          onOpenSettings={() => {
            modalState.setShowTablet(false);
            modalState.setShowSettings(true);
          }}
          showInventory={modalState.showInventory}
          onToggleInventory={modalState.handleToggleInventory}
          onPurchaseRequest={purchaseSystem.handlePurchaseRequest}
          playerCoins={playerResources.playerCoins}
          playerGems={playerResources.playerGems}
          playerRobux={playerResources.playerRobux}
          gamePasses={purchaseSystem.gamePasses}
        />
      )}

      {modalState.showSettings && (
        <SettingsModal 
          onClose={onCloseSettings}
          crosshairSettings={personalization.crosshairSettings}
          onCrosshairSettingsChange={personalization.updateCrosshairSettings}
          gameSettings={personalization.gameSettings}
          onGameSettingsChange={personalization.updateGameSettings}
          uiTheme={personalization.uiTheme}
          onUIThemeChange={personalization.updateUITheme}
        />
      )}

      {modalState.showInventory && (
        <InventoryModal 
          onClose={() => modalState.setShowInventory(false)}
          playerCoins={playerResources.playerCoins}
          playerGems={playerResources.playerGems}
          inventoryItems={inventorySystem.inventoryItems}
          onUseItem={inventorySystem.useInventoryItem}
          onRemoveItem={(itemId) => inventorySystem.setInventoryItems(prev => prev.filter(item => item.id !== itemId))}
          onAddToHotbar={inventorySystem.addToHotbar}
        />
      )}

      {/* Removed auto-showing daily reward modal */}
      {modalState.showDailyReward && (
        <DailyRewardModal onClose={() => modalState.setShowDailyReward(false)} />
      )}

      {modalState.showTutorial && (
        <TutorialModal 
          onClose={() => modalState.setShowTutorial(false)}
          gameMode={gameState.selectedGameMode || 'survival_single'}
        />
      )}

      {modalState.showGameModeConfirmation && modalState.pendingGameMode && (
        <GameModeConfirmationModal
          gameMode={modalState.pendingGameMode}
          onConfirm={onConfirmGameMode}
          onCancel={modalState.handleCancelGameMode}
        />
      )}

      {purchaseSystem.showPurchaseConfirmation && purchaseSystem.purchaseItem && (
        <PurchaseConfirmationModal
          item={purchaseSystem.purchaseItem}
          onConfirm={purchaseSystem.handlePurchaseConfirm}
          onCancel={purchaseSystem.handlePurchaseCancel}
          playerCoins={playerResources.playerCoins}
          playerGems={playerResources.playerGems}
          playerRobux={playerResources.playerRobux}
        />
      )}
    </>
  );
}