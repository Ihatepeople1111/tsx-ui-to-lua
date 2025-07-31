import { useState } from 'react';
import { UIState, GameMode } from '../types';

export const useGameState = () => {
  const [uiState, setUIState] = useState<UIState>('loading');
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null);
  const [currentPartyMode, setCurrentPartyMode] = useState<GameMode | null>(null);

  const handleGameModeSelect = (mode: GameMode) => {
    console.log('Game mode selected:', mode); // Debug log
    
    // Check if it's a multiplayer mode that needs party setup
    if (mode === 'survival_multiplayer' || mode === 'campaign_coop' || mode === 'arena_pvp') {
      console.log('Routing to party menu for mode:', mode); // Debug log
      setCurrentPartyMode(mode);
      setUIState('party-menu');
    } else {
      console.log('Routing to deploy for single player mode:', mode); // Debug log
      // Single player modes go to deploy screen
      setSelectedGameMode(mode);
      setUIState('deploy');
    }
  };

  const handlePartyGameStart = (mode: GameMode) => {
    console.log('Party game starting with mode:', mode); // Debug log
    setSelectedGameMode(mode);
    setUIState('deploy');
  };

  const handleBackToMenu = () => {
    console.log('Returning to main menu'); // Debug log
    setUIState('menu');
    setSelectedGameMode(null);
    setCurrentPartyMode(null);
  };

  return {
    uiState,
    setUIState,
    selectedGameMode,
    setSelectedGameMode,
    currentPartyMode,
    setCurrentPartyMode,
    handleGameModeSelect,
    handlePartyGameStart,
    handleBackToMenu,
  };
};