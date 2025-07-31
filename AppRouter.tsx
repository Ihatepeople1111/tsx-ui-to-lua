import { LoadingScreen } from './LoadingScreen';
import { MainMenu } from './MainMenu';
import { SurvivalMenu } from './SurvivalMenu';
import { CampaignMenu } from './CampaignMenu';
import { ArenaMenu } from './ArenaMenu';
import { PartyMenu } from './PartyMenu';
import { DeployScreen } from './DeployScreen';
import { GameHUD } from './GameHUD';
import { GameMode, UIState } from '../types';

interface AppRouterProps {
  uiState: UIState;
  selectedGameMode: GameMode | null;
  currentPartyMode: GameMode | null;
  onStateChange: (state: UIState) => void;
  onGameModeRequest: (mode: GameMode) => void;
  onDeploy: () => void;
  onOpenSettings: () => void;
  onOpenTutorial: () => void;
  onOpenPersonalization: () => void;
  onBackToMenu: () => void;
  gameHUDProps: any;
  deployScreenProps: any;
  partyMenuProps: any;
}

export function AppRouter({
  uiState,
  selectedGameMode,
  currentPartyMode,
  onStateChange,
  onGameModeRequest,
  onDeploy,
  onOpenSettings,
  onOpenTutorial,
  onOpenPersonalization,
  onBackToMenu,
  gameHUDProps,
  deployScreenProps,
  partyMenuProps
}: AppRouterProps) {
  console.log('AppRouter render - uiState:', uiState, 'currentPartyMode:', currentPartyMode); // Debug log
  
  switch (uiState) {
    case 'loading':
      return <LoadingScreen onComplete={() => onStateChange('menu')} />;
      
    case 'menu':
      return (
        <MainMenu 
          onSurvivalSelect={() => onStateChange('survival-menu')}
          onCampaignSelect={() => onStateChange('campaign-menu')}
          onArenaSelect={() => onStateChange('arena-menu')}
          onOpenSettings={onOpenSettings}
          onOpenTutorial={onOpenTutorial}
          onOpenPersonalization={onOpenPersonalization}
        />
      );
      
    case 'survival-menu':
      return (
        <SurvivalMenu
          onStartGame={onGameModeRequest}
          onBack={() => onStateChange('menu')}
        />
      );
      
    case 'campaign-menu':
      return (
        <CampaignMenu
          onStartGame={onGameModeRequest}
          onBack={() => onStateChange('menu')}
        />
      );
      
    case 'arena-menu':
      return (
        <ArenaMenu
          onStartGame={onGameModeRequest}
          onBack={() => onStateChange('menu')}
        />
      );
      
    case 'party-menu':
      if (!currentPartyMode) {
        console.error('Party menu rendered without currentPartyMode'); // Debug log
        return null;
      }
      return <PartyMenu {...partyMenuProps} />;
      
    case 'deploy':
      if (!selectedGameMode) {
        console.error('Deploy screen rendered without selectedGameMode'); // Debug log
        return null;
      }
      return <DeployScreen {...deployScreenProps} />;
      
    case 'game':
      return <GameHUD {...gameHUDProps} />;
      
    default:
      console.error('Unknown UI state:', uiState); // Debug log
      return null;
  }
}