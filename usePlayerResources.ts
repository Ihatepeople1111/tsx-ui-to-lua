import { useState } from 'react';
import { DEFAULT_PLAYER_RESOURCES } from '../constants';

export const usePlayerResources = () => {
  const [playerCoins, setPlayerCoins] = useState(DEFAULT_PLAYER_RESOURCES.coins);
  const [playerGems, setPlayerGems] = useState(DEFAULT_PLAYER_RESOURCES.gems);
  const [playerRobux, setPlayerRobux] = useState(DEFAULT_PLAYER_RESOURCES.robux);

  return {
    playerCoins,
    setPlayerCoins,
    playerGems,
    setPlayerGems,
    playerRobux,
    setPlayerRobux,
  };
};