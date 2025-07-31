import { GameMode } from '../types';

interface UseAppHandlersProps {
  gameState: any;
  modalState: any;
  playerResources: any;
  inventorySystem: any;
  personalization: any;
}

export function useAppHandlers({
  gameState,
  modalState,
  playerResources,
  inventorySystem,
  personalization
}: UseAppHandlersProps) {
  
  // Removed the daily reward auto-popup logic that was causing issues

  const handleGameModeRequest = (mode: GameMode) => {
    console.log('Game mode requested:', mode);
    
    // Check if it's a multiplayer mode that needs party setup first
    if (mode === 'survival_multiplayer' || mode === 'campaign_coop' || mode === 'arena_pvp') {
      console.log('Routing to party menu for multiplayer mode:', mode);
      gameState.setCurrentPartyMode(mode);
      gameState.setUIState('party-menu');
    } else {
      // Single player modes can go through confirmation or direct to deploy
      modalState.handleGameModeConfirmation(mode);
    }
  };

  const handleConfirmGameMode = () => {
    const gameMode = modalState.handleConfirmGameMode();
    if (gameMode) {
      gameState.setUIState('deploy');
      gameState.setSelectedGameMode(gameMode as GameMode);
    }
  };

  const handleDeploy = () => {
    gameState.setUIState('game');
  };

  const handleOpenPersonalization = () => {
    modalState.setShowSettings(true);
  };

  const handleCloseTablet = () => {
    modalState.setShowTablet(false);
  };

  const handleCloseSettings = () => {
    modalState.setShowSettings(false);
  };

  const handlePartyGameStart = (mode: GameMode) => {
    console.log('Party game starting with mode:', mode);
    gameState.setSelectedGameMode(mode);
    gameState.setUIState('deploy');
  };

  return {
    handleGameModeRequest,
    handleConfirmGameMode,
    handleDeploy,
    handleOpenPersonalization,
    handleCloseTablet,
    handleCloseSettings,
    handlePartyGameStart
  };
}