import { useState, useCallback, useEffect } from 'react';
import { CrosshairSettings, UITheme, GameSettings } from '../types';
import { DEFAULT_CROSSHAIR_SETTINGS, DEFAULT_UI_THEME, DEFAULT_GAME_SETTINGS } from '../constants';

export function usePersonalization() {
  const [crosshairSettings, setCrosshairSettings] = useState<CrosshairSettings>(DEFAULT_CROSSHAIR_SETTINGS);
  const [uiTheme, setUITheme] = useState<UITheme>(DEFAULT_UI_THEME);
  const [gameSettings, setGameSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS);

  const updateCrosshairSettings = useCallback((newSettings: Partial<CrosshairSettings>) => {
    setCrosshairSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const updateUITheme = useCallback((newTheme: Partial<UITheme>) => {
    console.log('Updating UI theme:', newTheme);
    setUITheme(prev => {
      const updated = { ...prev, ...newTheme };
      console.log('Updated UI theme:', updated);
      
      // Apply theme changes to CSS variables immediately
      if (newTheme.primaryColor) {
        document.documentElement.style.setProperty('--primary', newTheme.primaryColor);
        document.documentElement.style.setProperty('--background', newTheme.primaryColor);
        document.documentElement.style.setProperty('--card', newTheme.primaryColor);
        document.documentElement.style.setProperty('--popover', newTheme.primaryColor);
        document.documentElement.style.setProperty('--sidebar', newTheme.primaryColor);
      }
      if (newTheme.secondaryColor) {
        document.documentElement.style.setProperty('--secondary', newTheme.secondaryColor);
        document.documentElement.style.setProperty('--accent', newTheme.secondaryColor);
        document.documentElement.style.setProperty('--destructive', newTheme.secondaryColor);
        document.documentElement.style.setProperty('--ring', newTheme.secondaryColor);
        document.documentElement.style.setProperty('--chart-1', newTheme.secondaryColor);
        document.documentElement.style.setProperty('--sidebar-primary', newTheme.secondaryColor);
        document.documentElement.style.setProperty('--sidebar-ring', newTheme.secondaryColor);
      }
      
      return updated;
    });
  }, []);

  const updateGameSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setGameSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    updateUITheme(uiTheme);
  }, []);

  return {
    crosshairSettings,
    updateCrosshairSettings,
    uiTheme,
    updateUITheme,
    gameSettings,
    updateGameSettings
  };
}