import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Target, Settings as SettingsIcon, Eye, EyeOff, Gauge, Monitor, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CrosshairSettings, GameSettings, UITheme } from '../types';

interface SettingsModalProps {
  onClose: () => void;
  crosshairSettings: CrosshairSettings;
  onCrosshairSettingsChange: (settings: Partial<CrosshairSettings>) => void;
  gameSettings?: GameSettings;
  onGameSettingsChange?: (settings: Partial<GameSettings>) => void;
  uiTheme?: UITheme;
  onUIThemeChange?: (theme: Partial<UITheme>) => void;
}

export function SettingsModal({
  onClose,
  crosshairSettings,
  onCrosshairSettingsChange,
  gameSettings,
  onGameSettingsChange,
  uiTheme,
  onUIThemeChange
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'crosshair' | 'game' | 'personalization'>('crosshair');

  const renderCrosshairPreview = () => {
    const style = {
      color: crosshairSettings.color,
      opacity: crosshairSettings.opacity / 100,
    };

    const strokeWidth = crosshairSettings.thickness;
    const size = crosshairSettings.size;

    const previews = {
      none: <div className="text-muted-foreground">No crosshair</div>,
      dot: (
        <div 
          className="bg-current rounded-full" 
          style={{
            ...style,
            width: `${size / 4}px`,
            height: `${size / 4}px`,
          }} 
        />
      ),
      cross: (
        <div className="relative" style={style}>
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              width: `${size}px`, 
              height: `${strokeWidth}px` 
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              height: `${size}px`, 
              width: `${strokeWidth}px` 
            }} 
          />
        </div>
      ),
      circle: (
        <div 
          className="rounded-full border-current flex items-center justify-center" 
          style={{
            ...style,
            width: `${size}px`,
            height: `${size}px`,
            borderWidth: `${strokeWidth}px`,
          }}
        >
          <div 
            className="bg-current rounded-full" 
            style={{ 
              width: `${strokeWidth}px`, 
              height: `${strokeWidth}px` 
            }} 
          />
        </div>
      ),
      t: (
        <div className="relative" style={style}>
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-1/2" 
            style={{ 
              width: `${size}px`, 
              height: `${strokeWidth}px` 
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 translate-y-1/4" 
            style={{ 
              height: `${size / 2}px`, 
              width: `${strokeWidth}px` 
            }} 
          />
        </div>
      ),
      dynamic: (
        <div className="relative" style={style}>
          <div 
            className="absolute bg-current -translate-x-full -translate-y-1/2" 
            style={{ 
              width: `${size / 3}px`, 
              height: `${strokeWidth}px`,
              left: `-${size / 3}px`
            }} 
          />
          <div 
            className="absolute bg-current translate-x-full -translate-y-1/2" 
            style={{ 
              width: `${size / 3}px`, 
              height: `${strokeWidth}px`,
              left: `${size / 3}px`
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 -translate-y-full" 
            style={{ 
              height: `${size / 3}px`, 
              width: `${strokeWidth}px`,
              top: `-${size / 3}px`
            }} 
          />
          <div 
            className="absolute bg-current -translate-x-1/2 translate-y-full" 
            style={{ 
              height: `${size / 3}px`, 
              width: `${strokeWidth}px`,
              top: `${size / 3}px`
            }} 
          />
        </div>
      ),
    };

    return previews[crosshairSettings.type];
  };

  const colorPresets = [
    { name: 'Default Red', primary: '#000000', secondary: '#dc2626' },
    { name: 'Electric Blue', primary: '#0a0a0a', secondary: '#3b82f6' },
    { name: 'Cyber Green', primary: '#0f1419', secondary: '#10b981' },
    { name: 'Purple Neon', primary: '#1a0b2e', secondary: '#a855f7' },
    { name: 'Orange Fire', primary: '#1a0f0a', secondary: '#f97316' },
    { name: 'Pink Plasma', primary: '#1a0a1a', secondary: '#ec4899' },
    { name: 'Yellow Lightning', primary: '#1a1a0a', secondary: '#eab308' },
    { name: 'Cyan Matrix', primary: '#0a1a1a', secondary: '#06b6d4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel bg-background/95 border border-border rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-secondary" />
            <h2 className="text-2xl font-mono text-foreground">GAME SETTINGS</h2>
          </div>
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            onClick={() => setActiveTab('crosshair')}
            variant={activeTab === 'crosshair' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Target className="w-4 h-4" />
            <span>Crosshair</span>
          </Button>
          <Button
            onClick={() => setActiveTab('game')}
            variant={activeTab === 'game' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Monitor className="w-4 h-4" />
            <span>Game</span>
          </Button>
          <Button
            onClick={() => setActiveTab('personalization')}
            variant={activeTab === 'personalization' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Palette className="w-4 h-4" />
            <span>Personalization</span>
          </Button>
        </div>

        {/* Crosshair Settings */}
        {activeTab === 'crosshair' && (
          <div className="space-y-6">
            <div className="glass-panel bg-background/40 border border-border rounded-lg p-4">
              <h3 className="text-lg font-mono text-secondary mb-4">Crosshair Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Crosshair Controls */}
                <div className="space-y-4">
                  {/* Crosshair Type */}
                  <div>
                    <label className="text-foreground font-mono mb-2 block">Crosshair Type</label>
                    <Select 
                      value={crosshairSettings.type} 
                      onValueChange={(value) => onCrosshairSettingsChange({ type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="dot">Dot</SelectItem>
                        <SelectItem value="cross">Cross</SelectItem>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="t">T-Shape</SelectItem>
                        <SelectItem value="dynamic">Dynamic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Crosshair Color */}
                  <div>
                    <label className="text-foreground font-mono mb-2 block">Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={crosshairSettings.color}
                        onChange={(e) => onCrosshairSettingsChange({ color: e.target.value })}
                        className="w-12 h-8 rounded border border-border bg-transparent"
                      />
                      <span className="text-muted-foreground font-mono">{crosshairSettings.color}</span>
                    </div>
                  </div>

                  {/* Size Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-foreground font-mono">Size</label>
                      <span className="text-secondary font-mono">{crosshairSettings.size}px</span>
                    </div>
                    <Slider
                      value={[crosshairSettings.size]}
                      onValueChange={(value) => onCrosshairSettingsChange({ size: value[0] })}
                      min={8}
                      max={50}
                      step={1}
                      className="slider"
                    />
                  </div>

                  {/* Thickness Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-foreground font-mono">Thickness</label>
                      <span className="text-secondary font-mono">{crosshairSettings.thickness}px</span>
                    </div>
                    <Slider
                      value={[crosshairSettings.thickness]}
                      onValueChange={(value) => onCrosshairSettingsChange({ thickness: value[0] })}
                      min={1}
                      max={8}
                      step={1}
                      className="slider"
                    />
                  </div>

                  {/* Opacity Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-foreground font-mono">Opacity</label>
                      <span className="text-secondary font-mono">{crosshairSettings.opacity}%</span>
                    </div>
                    <Slider
                      value={[crosshairSettings.opacity]}
                      onValueChange={(value) => onCrosshairSettingsChange({ opacity: value[0] })}
                      min={10}
                      max={100}
                      step={5}
                      className="slider"
                    />
                  </div>
                </div>

                {/* Crosshair Preview */}
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center border border-border relative">
                    {renderCrosshairPreview()}
                  </div>
                  <p className="text-muted-foreground font-mono text-sm mt-2">Preview</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Settings */}
        {activeTab === 'game' && gameSettings && onGameSettingsChange && (
          <div className="space-y-6">
            <div className="glass-panel bg-background/40 border border-border rounded-lg p-4">
              <h3 className="text-lg font-mono text-secondary mb-4">Game Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* First Person Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {gameSettings.firstPersonMode ? (
                        <Eye className="w-5 h-5 text-secondary" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <label className="text-foreground font-mono">First Person Mode</label>
                        <p className="text-muted-foreground text-sm">Immersive perspective</p>
                      </div>
                    </div>
                    <Switch
                      checked={gameSettings.firstPersonMode}
                      onCheckedChange={(checked) => onGameSettingsChange({ firstPersonMode: checked })}
                    />
                  </div>

                  {/* Graphics Quality */}
                  <div>
                    <label className="text-foreground font-mono mb-2 block">Graphics Quality</label>
                    <Select 
                      value={gameSettings.graphics} 
                      onValueChange={(value) => onGameSettingsChange({ graphics: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* VSync Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-foreground font-mono">VSync</label>
                      <p className="text-muted-foreground text-sm">Vertical synchronization</p>
                    </div>
                    <Switch
                      checked={gameSettings.vsync}
                      onCheckedChange={(checked) => onGameSettingsChange({ vsync: checked })}
                    />
                  </div>

                  {/* Motion Blur Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-foreground font-mono">Motion Blur</label>
                      <p className="text-muted-foreground text-sm">Camera motion effects</p>
                    </div>
                    <Switch
                      checked={gameSettings.motionBlur}
                      onCheckedChange={(checked) => onGameSettingsChange({ motionBlur: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* FOV Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-foreground font-mono flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Field of View</span>
                      </label>
                      <span className="text-secondary font-mono">{gameSettings.fov}°</span>
                    </div>
                    <Slider
                      value={[gameSettings.fov]}
                      onValueChange={(value) => onGameSettingsChange({ fov: value[0] })}
                      min={60}
                      max={120}
                      step={1}
                      className="slider"
                    />
                  </div>

                  {/* Mouse Sensitivity */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-foreground font-mono flex items-center space-x-2">
                        <Gauge className="w-4 h-4" />
                        <span>Mouse Sensitivity</span>
                      </label>
                      <span className="text-secondary font-mono">{gameSettings.mouseSensitivity}%</span>
                    </div>
                    <Slider
                      value={[gameSettings.mouseSensitivity]}
                      onValueChange={(value) => onGameSettingsChange({ mouseSensitivity: value[0] })}
                      min={1}
                      max={100}
                      step={1}
                      className="slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personalization Settings */}
        {activeTab === 'personalization' && uiTheme && onUIThemeChange && (
          <div className="space-y-6">
            <div className="glass-panel bg-background/40 border border-border rounded-lg p-4">
              <h3 className="text-lg font-mono text-secondary mb-4">UI Customization</h3>
              
              <div className="space-y-6">
                {/* Color Presets */}
                <div>
                  <label className="text-foreground font-mono mb-4 block">Theme Presets</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        onClick={() => onUIThemeChange({ 
                          primaryColor: preset.primary, 
                          secondaryColor: preset.secondary 
                        })}
                        variant="outline"
                        className="h-16 flex flex-col items-center space-y-1 p-2"
                        style={{
                          background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                          borderColor: preset.secondary,
                        }}
                      >
                        <div className="text-xs font-mono text-white">{preset.name}</div>
                        <div className="flex space-x-1">
                          <div 
                            className="w-3 h-3 rounded-full border border-white/30" 
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div 
                            className="w-3 h-3 rounded-full border border-white/30" 
                            style={{ backgroundColor: preset.secondary }}
                          />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Primary Color */}
                  <div>
                    <label className="text-foreground font-mono mb-2 block">Primary Color (Background)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={uiTheme.primaryColor}
                        onChange={(e) => onUIThemeChange({ primaryColor: e.target.value })}
                        className="w-16 h-12 rounded border border-border bg-transparent"
                      />
                      <div className="flex-1">
                        <div className="text-muted-foreground font-mono text-sm mb-1">HEX: {uiTheme.primaryColor}</div>
                        <div className="text-muted-foreground text-xs">Used for backgrounds and panels</div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div>
                    <label className="text-foreground font-mono mb-2 block">Secondary Color (Accent)</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={uiTheme.secondaryColor}
                        onChange={(e) => onUIThemeChange({ secondaryColor: e.target.value })}
                        className="w-16 h-12 rounded border border-border bg-transparent"
                      />
                      <div className="flex-1">
                        <div className="text-muted-foreground font-mono text-sm mb-1">HEX: {uiTheme.secondaryColor}</div>
                        <div className="text-muted-foreground text-xs">Used for buttons and highlights</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="text-foreground font-mono mb-2 block">Preview</label>
                  <div 
                    className="glass-panel border rounded-lg p-4 h-32"
                    style={{
                      backgroundColor: `${uiTheme.primaryColor}80`,
                      borderColor: `${uiTheme.secondaryColor}40`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-mono text-white">UI Preview</h4>
                      <div 
                        className="px-3 py-1 rounded text-white text-sm font-mono"
                        style={{ backgroundColor: uiTheme.secondaryColor }}
                      >
                        Button
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ backgroundColor: `${uiTheme.secondaryColor}60` }}
                      />
                      <div 
                        className="h-2 rounded-full w-3/4"
                        style={{ backgroundColor: `${uiTheme.secondaryColor}40` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}