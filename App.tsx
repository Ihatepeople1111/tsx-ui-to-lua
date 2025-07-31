import { AppRouter } from './components/AppRouter';
import { AppModals } from './components/AppModals';
import { useGameState } from './hooks/useGameState';
import { useModalState } from './hooks/useModalState';
import { usePlayerResources } from './hooks/usePlayerResources';
import { useInventorySystem } from './hooks/useInventorySystem';
import { usePurchaseSystem } from './hooks/usePurchaseSystem';
import { usePersonalization } from './hooks/usePersonalization';
import { useAppHandlers } from './hooks/useAppHandlers';
import { buildGameHUDProps, buildDeployScreenProps, buildPartyMenuProps } from './utils/appProps';
import { getCrosshairClass, generateBackgroundImageUrl, generateBackgroundGradient } from './utils';

export default function App() {
  // Initialize all hooks
  const gameState = useGameState();
  const modalState = useModalState();
  const playerResources = usePlayerResources();
  const inventorySystem = useInventorySystem();
  const personalization = usePersonalization();
  
  const purchaseSystem = usePurchaseSystem({
    playerCoins: playerResources.playerCoins,
    setPlayerCoins: playerResources.setPlayerCoins,
    playerGems: playerResources.playerGems,
    setPlayerGems: playerResources.setPlayerGems,
    playerRobux: playerResources.playerRobux,
    setPlayerRobux: playerResources.setPlayerRobux,
    setInventoryItems: inventorySystem.setInventoryItems,
  });

  // Get all handlers
  const handlers = useAppHandlers({
    gameState,
    modalState,
    playerResources,
    inventorySystem,
    personalization
  });

  // Build props for complex components
  const gameHUDProps = buildGameHUDProps({
    modalState,
    gameState,
    personalization,
    playerResources,
    inventorySystem
  });

  const deployScreenProps = buildDeployScreenProps({
    gameState,
    personalization,
    onDeploy: handlers.handleDeploy
  });

  const partyMenuProps = buildPartyMenuProps({
    gameState,
    handlePartyGameStart: handlers.handlePartyGameStart
  });

  return (
    <div 
      className={`size-full bg-gradient-to-br from-black via-gray-900 to-red-900 overflow-hidden relative ${getCrosshairClass(personalization.crosshairSettings.type)}`}
      style={{
        background: generateBackgroundGradient(personalization.uiTheme.primaryColor),
      }}
    >
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: generateBackgroundImageUrl(personalization.uiTheme.secondaryColor),
        }}
      />
      
      {/* Main Router */}
      <AppRouter
        uiState={gameState.uiState}
        selectedGameMode={gameState.selectedGameMode}
        currentPartyMode={gameState.currentPartyMode}
        onStateChange={gameState.setUIState}
        onGameModeRequest={handlers.handleGameModeRequest}
        onDeploy={handlers.handleDeploy}
        onOpenSettings={() => modalState.setShowSettings(true)}
        onOpenTutorial={modalState.handleTutorialOpen}
        onOpenPersonalization={handlers.handleOpenPersonalization}
        onBackToMenu={gameState.handleBackToMenu}
        gameHUDProps={gameHUDProps}
        deployScreenProps={deployScreenProps}
        partyMenuProps={partyMenuProps}
      />

      {/* Modals */}
      <AppModals
        modalState={modalState}
        personalization={personalization}
        purchaseSystem={purchaseSystem}
        playerResources={playerResources}
        inventorySystem={inventorySystem}
        gameState={gameState}
        onCloseTablet={handlers.handleCloseTablet}
        onCloseSettings={handlers.handleCloseSettings}
        onConfirmGameMode={handlers.handleConfirmGameMode}
      />
    </div>
  );
}