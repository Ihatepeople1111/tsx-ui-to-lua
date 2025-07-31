# Blackout-Style Sci-Fi Game Menu System for Roblox Studio

A complete, production-ready menu system for sci-fi/futuristic games in Roblox Studio with glassmorphism effects, neon borders, smooth animations, and comprehensive game mode support.

## ✨ Features

### 🎮 Game Modes
- **Survival Mode**
  - Single Player: Solo survival against infinite zombie waves
  - Multiplayer: Team-based survival with party system
  
- **Campaign Mode** 
  - Offline: Solo story progression with save system
  - Online: Matchmaking with random players
  - Multiplayer: Play story with friends via party system
  
- **Arena Mode**
  - Aim Training: All weapons unlocked, moving targets, accuracy tracking
  - Sandbox: Everything unlocked (except gamepasses), no restrictions
  - Endless Zombies: Infinite waves with survival timer

### 🎯 UI Features
- **Glassmorphism Design**: Translucent panels with backdrop blur
- **Neon Borders**: Animated glowing outlines in multiple colors
- **Smooth Animations**: TweenService-powered transitions and effects
- **Mobile/Controller Friendly**: Large buttons, touch support, aspect ratios
- **Sound Effects**: Hover, click, and ambient sound integration
- **Beginner Tutorials**: Step-by-step UI guidance for new players

### 👥 Party System
- Create, join, and leave parties
- Real-time party list with scrollable interface
- Party leader controls and auto-transfer
- Support for up to 4 players per party
- Automatic cleanup and timeout handling

### 🎓 Tutorial System
- Main tutorial covering all features
- Mode-specific beginner guides
- Interactive step-by-step walkthroughs
- Tooltip system for contextual help

## 🚀 Installation

### 1. File Structure Setup

```
ReplicatedStorage/
├── BlackoutGameSettings (ModuleScript)
└── RemoteEvents/ (Auto-created by server script)
    ├── TeleportToGame
    ├── PartyManagement
    └── GameStatus

ServerScriptService/
└── BlackoutServerController (Script)

StarterGui/ (or StarterPlayerScripts/)
└── BlackoutMenuSystem (LocalScript)
```

### 2. Setup Steps

1. **Create the ModuleScript**:
   - In ReplicatedStorage, create a ModuleScript named `BlackoutGameSettings`
   - Paste the content from `BlackoutGameSettings.lua`

2. **Add the Server Script**:
   - In ServerScriptService, create a Script named `BlackoutServerController`
   - Paste the content from `BlackoutServerController.lua`

3. **Add the Client Script**:
   - In StarterGui (or StarterPlayerScripts), create a LocalScript named `BlackoutMenuSystem`
   - Paste the content from `BlackoutMenuSystem.lua`

4. **Configure Place IDs**:
   - Edit the `PLACE_IDS` table in `BlackoutGameSettings.lua`
   - Replace the placeholder IDs with your actual Roblox place IDs

5. **Add Sound Effects** (Optional):
   - Upload sound effects to Roblox
   - Update the `SOUNDS` table in `BlackoutGameSettings.lua` with your sound IDs

## ⚙️ Configuration

### Colors and Styling
Edit the `UI.COLORS` table in `BlackoutGameSettings.lua`:

```lua
COLORS = {
    BACKGROUND = {0, 0, 0},          -- Pure black
    PANEL = {17, 17, 17},            -- Dark gray panels
    PRIMARY = {220, 38, 38},         -- Red accent
    SECONDARY = {59, 130, 246},      -- Blue accent
    SUCCESS = {34, 197, 94},         -- Green
    WARNING = {234, 179, 8},         -- Yellow
    WHITE = {255, 255, 255},         -- White text
    GRAY = {128, 128, 128}           -- Gray text
}
```

### Animation Settings
Modify timing and easing in `UI.ANIMATIONS`:

```lua
ANIMATIONS = {
    TWEEN_TIME = 0.3,               -- Button animations
    FADE_TIME = 0.5,                -- Fade transitions
    GLOW_TIME = 1.0,                -- Glow effects
    EASING_STYLE = Enum.EasingStyle.Quart,
    EASING_DIRECTION = Enum.EasingDirection.Out
}
```

### Game Mode Settings
Customize each mode in their respective sections:

```lua
SURVIVAL = {
    SINGLE_PLAYER = {
        MAX_WAVES = 50,
        STARTING_ZOMBIES = 10,
        ZOMBIE_INCREASE_PER_WAVE = 5,
        STARTING_COINS = 1000
    }
}
```

## 🎮 Usage

### Basic Navigation
- **Main Menu**: Shows three primary game modes
- **ESC Key**: Returns to main menu from any submenu
- **Controller Support**: Navigate with D-pad and A/B buttons
- **Mobile Support**: Large touch-friendly buttons

### Game Mode Selection
1. Click **SURVIVAL** for zombie wave survival
2. Click **CAMPAIGN** for story missions  
3. Click **ARENA** for training and challenges
4. Click **🆘 BEGINNER** for guided tutorials

### Party System
1. Select **MULTIPLAYER** from any game mode
2. **Create Party**: Start a new party as leader
3. **Join Party**: Browse and join existing parties
4. **Leave Party**: Exit your current party

### Beginner Mode
1. Click **🆘 BEGINNER MODE** on main menu
2. Follow step-by-step instructions
3. Learn UI navigation and game modes
4. Access mode-specific tutorials

## 🔧 Customization

### Adding New Game Modes
1. Add mode configuration to `GameSettings`
2. Create new menu function in client script
3. Add teleportation logic in server script
4. Update tutorial steps if needed

### Custom Sound Effects
```lua
-- In BlackoutGameSettings.lua
SOUNDS = {
    HOVER = "rbxassetid://YOUR_HOVER_SOUND",
    CLICK = "rbxassetid://YOUR_CLICK_SOUND",
    SUCCESS = "rbxassetid://YOUR_SUCCESS_SOUND",
    ERROR = "rbxassetid://YOUR_ERROR_SOUND",
    AMBIENT = "rbxassetid://YOUR_AMBIENT_MUSIC"
}
```

### Mobile Optimization
```lua
MOBILE = {
    LARGE_BUTTONS = true,           -- Bigger buttons for touch
    ASPECT_RATIO = 4,              -- Button width/height ratio
    TOUCH_SUPPORT = true,          -- Touch gesture support
    CONTROLLER_SUPPORT = true      -- Gamepad navigation
}
```

## 🐛 Troubleshooting

### Common Issues

**Menu not appearing**:
- Check that LocalScript is in StarterGui or StarterPlayerScripts
- Verify ModuleScript is in ReplicatedStorage
- Check for script errors in Developer Console

**Teleportation not working**:
- Verify Place IDs are correct in `BlackoutGameSettings`
- Check that target places exist and are published
- Ensure server script has proper permissions

**Buttons not responsive**:
- Check if GUI elements are properly layered
- Verify ZIndex and parent relationships
- Test with different screen resolutions

**Party system errors**:
- Ensure RemoteEvents are properly created
- Check server script for connection issues
- Verify party data structures

### Performance Tips

1. **Optimize animations**: Reduce tween count for lower-end devices
2. **Limit particle effects**: Disable complex visual effects on mobile
3. **Reduce transparency**: Use fewer transparent elements
4. **Optimize images**: Use smaller, compressed textures

## 📱 Mobile & Controller Support

### Mobile Features
- **Large Touch Targets**: Buttons sized for finger interaction
- **Swipe Gestures**: Scroll through party lists and menus
- **Haptic Feedback**: Vibration on button presses (if supported)
- **Responsive Layout**: Adapts to different screen sizes

### Controller Features
- **D-Pad Navigation**: Move between menu items
- **A Button**: Select/confirm actions
- **B Button**: Cancel/go back
- **Menu Button**: Access main menu

## 🎨 Visual Effects

### Glassmorphism
- Semi-transparent panels with backdrop blur
- Layered depth with proper transparency
- Subtle gradient overlays

### Neon Borders
- Animated glow effects using UIStroke
- Color-coded by game mode
- Pulsing animation for emphasis

### Smooth Animations
- TweenService-powered movements
- Elastic easing for satisfying feedback
- Staggered animations for list items

## 📊 Analytics & Tracking

The system includes hooks for tracking:
- Menu navigation patterns
- Game mode popularity
- Party formation success rates
- Tutorial completion rates

Add your analytics code in the respective event handlers.

## 🔒 Security Considerations

- All teleportation logic runs on server
- Client-side validation with server verification
- Rate limiting for party operations
- Anti-exploit measures for game mode access

## 📄 License

This menu system is provided as-is for educational and development purposes. Feel free to modify and adapt for your projects.

## 🤝 Contributing

To contribute improvements:
1. Test thoroughly in Roblox Studio
2. Ensure mobile/controller compatibility
3. Follow existing code style conventions
4. Update documentation for new features

---

**Happy coding! 🚀**

For questions or support, refer to the Roblox Developer Hub or community forums.