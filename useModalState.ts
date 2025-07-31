import { useState } from 'react';

export const useModalState = () => {
  const [showTablet, setShowTablet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showGameModeConfirmation, setShowGameModeConfirmation] = useState(false);
  const [pendingGameMode, setPendingGameMode] = useState<string | null>(null);

  const handleToggleInventory = () => {
    setShowInventory(!showInventory);
  };

  const handleTutorialOpen = () => {
    setShowTutorial(true);
  };

  const handleGameModeConfirmation = (gameMode: string) => {
    setPendingGameMode(gameMode);
    setShowGameModeConfirmation(true);
  };

  const handleConfirmGameMode = () => {
    setShowGameModeConfirmation(false);
    return pendingGameMode;
  };

  const handleCancelGameMode = () => {
    setShowGameModeConfirmation(false);
    setPendingGameMode(null);
  };

  return {
    showTablet,
    setShowTablet,
    showSettings,
    setShowSettings,
    showDailyReward,
    setShowDailyReward,
    showInventory,
    setShowInventory,
    showTutorial,
    setShowTutorial,
    showGameModeConfirmation,
    setShowGameModeConfirmation,
    pendingGameMode,
    setPendingGameMode,
    handleToggleInventory,
    handleTutorialOpen,
    handleGameModeConfirmation,
    handleConfirmGameMode,
    handleCancelGameMode,
  };
};