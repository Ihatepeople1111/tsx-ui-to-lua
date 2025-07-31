-- Game HUD Component and Modal System for Meltdown Sector Z

local showingGameRules = false
local beginnerModalOpen = false

function createGameHUD()
    if currentUI then
        currentUI:Destroy()
    end
    
    currentUI = createFrame("GameHUD", mainGui, {
        Size = UDim2.new(1, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundTransparency = 1
    })
    
    -- Game background
    local gameBackground = createFrame("GameBackground", currentUI, {
        Size = UDim2.new(1, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundColor3 = COLORS.BACKGROUND,
        BackgroundTransparency = 0,
        Gradient = ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 0, 0)),
            ColorSequenceKeypoint.new(0.5, Color3.fromRGB(32, 32, 32)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(64, 0, 0))
        })
    })
    
    -- Top center buttons
    local topButtonsFrame = createFrame("TopButtonsFrame", currentUI, {
        Size = UDim2.new(0.4, 0, 0.08, 0),
        Position = UDim2.new(0.3, 0, 0.05, 0),
        BackgroundTransparency = 1
    })
    
    local tabletButton = createButton("TabletButton", topButtonsFrame, {
        Text = "📱",
        Size = UDim2.new(0.15, 0, 1, 0),
        Position = UDim2.new(0.1, 0, 0, 0),
        BackgroundColor3 = COLORS.PRIMARY,
        StrokeColor = COLORS.PRIMARY,
        OnClick = function() 
            -- Tablet functionality would go here
            playSound("CLICK")
        end
    })
    
    local settingsButton = createButton("SettingsButton", topButtonsFrame, {
        Text = "⚙️",
        Size = UDim2.new(0.15, 0, 1, 0),
        Position = UDim2.new(0.35, 0, 0, 0),
        BackgroundColor3 = COLORS.WHITE,
        BackgroundTransparency = 0.8,
        StrokeColor = COLORS.WHITE,
        OnClick = function() 
            -- Settings functionality would go here
            playSound("CLICK")
        end
    })
    
    local backButton = createButton("BackButton", topButtonsFrame, {
        Text = "← MENU",
        Size = UDim2.new(0.2, 0, 1, 0),
        Position = UDim2.new(0.6, 0, 0, 0),
        BackgroundColor3 = COLORS.PRIMARY,
        StrokeColor = COLORS.PRIMARY,
        OnClick = function() handleBackToMenu() end
    })
    
    -- Right side stats
    local rightStatsFrame = createFrame("RightStatsFrame", currentUI, {
        Size = UDim2.new(0.25, 0, 0.4, 0),
        Position = UDim2.new(0.73, 0, 0.05, 0),
        BackgroundTransparency = 1
    })
    
    -- Coins
    local coinsFrame = createFrame("CoinsFrame", rightStatsFrame, {
        Size = UDim2.new(1, 0, 0.15, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundColor3 = COLORS.WARNING,
        BackgroundTransparency = 0.8,
        CornerRadius = 8,
        StrokeColor = COLORS.WARNING
    })
    
    local coinsIcon = createLabel("CoinsIcon", coinsFrame, {
        Text = "🪙",
        Size = UDim2.new(0, 24, 0, 24),
        Position = UDim2.new(0.1, 0, 0.5, -12),
        TextColor3 = COLORS.WARNING,
        Font = Enum.Font.GothamBold
    })
    
    local coinsLabel = createLabel("CoinsLabel", coinsFrame, {
        Text = "12,847",
        Size = UDim2.new(0.6, 0, 0.8, 0),
        Position = UDim2.new(0.35, 0, 0.1, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.GothamBold
    })
    
    -- Level
    local levelFrame = createFrame("LevelFrame", rightStatsFrame, {
        Size = UDim2.new(1, 0, 0.15, 0),
        Position = UDim2.new(0, 0, 0.2, 0),
        BackgroundColor3 = COLORS.PRIMARY,
        BackgroundTransparency = 0.8,
        CornerRadius = 8,
        StrokeColor = COLORS.PRIMARY
    })
    
    local levelIcon = createLabel("LevelIcon", levelFrame, {
        Text = "⭐",
        Size = UDim2.new(0, 24, 0, 24),
        Position = UDim2.new(0.1, 0, 0.5, -12),
        TextColor3 = COLORS.PRIMARY,
        Font = Enum.Font.GothamBold
    })
    
    local levelLabel = createLabel("LevelLabel", levelFrame, {
        Text = "LVL 23",
        Size = UDim2.new(0.6, 0, 0.8, 0),
        Position = UDim2.new(0.35, 0, 0.1, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.GothamBold
    })
    
    -- XP Bar
    local xpFrame = createFrame("XPFrame", rightStatsFrame, {
        Size = UDim2.new(1, 0, 0.1, 0),
        Position = UDim2.new(0, 0, 0.4, 0),
        BackgroundColor3 = COLORS.PRIMARY,
        BackgroundTransparency = 0.8,
        CornerRadius = 8
    })
    
    local xpLabel = createLabel("XPLabel", xpFrame, {
        Text = "XP: 75/100",
        Size = UDim2.new(1, 0, 0.4, 0),
        Position = UDim2.new(0, 0, 0.1, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.Gotham
    })
    
    local xpBarBG = createFrame("XPBarBG", xpFrame, {
        Size = UDim2.new(0.9, 0, 0.3, 0),
        Position = UDim2.new(0.05, 0, 0.6, 0),
        BackgroundColor3 = COLORS.BACKGROUND,
        BackgroundTransparency = 0.6,
        CornerRadius = 4
    })
    
    local xpBar = createFrame("XPBar", xpBarBG, {
        Size = UDim2.new(0.75, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundColor3 = COLORS.PRIMARY,
        BackgroundTransparency = 0,
        CornerRadius = 4
    })
    
    -- Bottom right clock
    local clockFrame = createFrame("ClockFrame", currentUI, {
        Size = UDim2.new(0.15, 0, 0.08, 0),
        Position = UDim2.new(0.83, 0, 0.9, 0),
        BackgroundColor3 = COLORS.WHITE,
        BackgroundTransparency = 0.9,
        CornerRadius = 8,
        StrokeColor = COLORS.WHITE,
        StrokeTransparency = 0.8
    })
    
    local clockIcon = createLabel("ClockIcon", clockFrame, {
        Text = "🕐",
        Size = UDim2.new(0, 20, 0, 20),
        Position = UDim2.new(0.1, 0, 0.3, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.GothamBold
    })
    
    local timeLabel = createLabel("TimeLabel", clockFrame, {
        Text = "22:47",
        Size = UDim2.new(0.6, 0, 0.5, 0),
        Position = UDim2.new(0.35, 0, 0.1, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.GothamBold
    })
    
    local dayLabel = createLabel("DayLabel", clockFrame, {
        Text = "Night",
        Size = UDim2.new(0.6, 0, 0.3, 0),
        Position = UDim2.new(0.35, 0, 0.65, 0),
        TextColor3 = COLORS.PRIMARY,
        Font = Enum.Font.Gotham
    })
    
    -- Bottom center inventory hotbar
    local hotbarFrame = createFrame("HotbarFrame", currentUI, {
        Size = UDim2.new(0.6, 0, 0.12, 0),
        Position = UDim2.new(0.2, 0, 0.85, 0),
        BackgroundTransparency = 1
    })
    
    -- Small inventory button above hotbar
    local inventoryButton = createButton("InventoryButton", hotbarFrame, {
        Text = "📦",
        Size = UDim2.new(0.08, 0, 0.3, 0),
        Position = UDim2.new(0.46, 0, 0, 0),
        BackgroundColor3 = COLORS.SECONDARY,
        StrokeColor = COLORS.SECONDARY,
        OnClick = function() 
            -- Inventory functionality would go here
            playSound("CLICK")
        end
    })
    
    -- Hotbar
    local hotbarContainer = createFrame("HotbarContainer", hotbarFrame, {
        Size = UDim2.new(1, 0, 0.65, 0),
        Position = UDim2.new(0, 0, 0.35, 0),
        BackgroundColor3 = COLORS.BACKGROUND,
        BackgroundTransparency = 0.6,
        CornerRadius = 8,
        StrokeColor = COLORS.WHITE,
        StrokeTransparency = 0.8
    })
    
    -- Create 9 hotbar slots
    for i = 1, 9 do
        local slot = createFrame("Slot" .. i, hotbarContainer, {
            Size = UDim2.new(0.1, 0, 0.8, 0),
            Position = UDim2.new((i - 1) * 0.11 + 0.005, 0, 0.1, 0),
            BackgroundColor3 = COLORS.PANEL,
            BackgroundTransparency = 0.8,
            CornerRadius = 4,
            StrokeColor = COLORS.WHITE,
            StrokeTransparency = 0.6
        })
        
        -- Slot number
        local slotNumber = createLabel("SlotNumber" .. i, slot, {
            Text = tostring(i),
            Size = UDim2.new(0.3, 0, 0.3, 0),
            Position = UDim2.new(0.7, 0, 0.7, 0),
            TextColor3 = COLORS.PRIMARY,
            Font = Enum.Font.GothamBold
        })
        
        -- Add sample items to some slots
        if i <= 5 then
            local itemIcon = createLabel("ItemIcon" .. i, slot, {
                Text = i == 1 and "🔫" or i == 2 and "🛡️" or i == 3 and "💊" or i == 4 and "💣" or "⚡",
                Size = UDim2.new(0.6, 0, 0.6, 0),
                Position = UDim2.new(0.2, 0, 0.1, 0),
                TextColor3 = COLORS.WHITE,
                Font = Enum.Font.GothamBold
            })
        end
    end
    
    -- Update crosshair
    createCrosshair()
    
    -- Show game rules popup
    if selectedGameMode then
        showGameRulesPopup()
    end
end

function showGameRulesPopup()
    if showingGameRules then return end
    showingGameRules = true
    
    local gameModeTitles = {
        survival_single = "SURVIVAL SINGLE PLAYER",
        campaign_offline = "CAMPAIGN OFFLINE",
        campaign_online = "CAMPAIGN ONLINE", 
        arena_aim = "AIM TRAINING",
        arena_sandbox = "SANDBOX MODE",
        arena_endless = "ENDLESS ZOMBIES"
    }
    
    local gameModeRules = {
        survival_single = "• Survive endless waves of infected zombies\n• Collect resources and upgrade weapons\n• Build defenses during prep time\n• Your goal: Survive as long as possible!",
        campaign_offline = "• Experience the story solo at your own pace\n• Complete objectives to progress\n• Explore and find secrets\n• Save progress between sessions!",
        campaign_online = "• Play story missions with other players\n• Follow objectives to progress\n• Coordinate with your team\n• Complete missions to unlock rewards!",
        arena_aim = "• All weapons unlocked for practice\n• Moving targets appear on screen\n• Track targets with your crosshair\n• Improve accuracy and reaction time!",
        arena_sandbox = "• Everything unlocked (except gamepasses)\n• No restrictions or objectives\n• Experiment with all weapons and items\n• Pure creative freedom!",
        arena_endless = "• Infinite waves of zombies spawn\n• Focus purely on combat\n• Survival timer tracks your progress\n• See how long you can survive!"
    }
    
    local rulesFrame = createFrame("GameRulesFrame", mainGui, {
        Size = UDim2.new(1, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundColor3 = COLORS.BACKGROUND,
        BackgroundTransparency = 0.3
    })
    
    local rulesPanel = createFrame("RulesPanel", rulesFrame, {
        Size = UDim2.new(0.6, 0, 0.5, 0),
        Position = UDim2.new(0.2, 0, 0.25, 0),
        BackgroundColor3 = COLORS.PANEL,
        BackgroundTransparency = 0.1,
        CornerRadius = 12,
        StrokeColor = COLORS.PRIMARY,
        StrokeThickness = 3
    })
    
    local rulesTitle = createLabel("RulesTitle", rulesPanel, {
        Text = gameModeTitles[selectedGameMode] or "GAME MODE RULES",
        Size = UDim2.new(0.9, 0, 0.15, 0),
        Position = UDim2.new(0.05, 0, 0.05, 0),
        TextColor3 = COLORS.PRIMARY,
        Font = Enum.Font.GothamBold
    })
    
    local rulesText = createLabel("RulesText", rulesPanel, {
        Text = gameModeRules[selectedGameMode] or "Have fun playing!",
        Size = UDim2.new(0.9, 0, 0.6, 0),
        Position = UDim2.new(0.05, 0, 0.2, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.Gotham
    })
    
    local gotItButton = createButton("GotItButton", rulesPanel, {
        Text = "GOT IT!",
        Size = UDim2.new(0.3, 0, 0.1, 0),
        Position = UDim2.new(0.35, 0, 0.85, 0),
        BackgroundColor3 = COLORS.SUCCESS,
        StrokeColor = COLORS.SUCCESS,
        OnClick = function()
            rulesFrame:Destroy()
            showingGameRules = false
        end
    })
    
    -- Auto close after 10 seconds
    task.spawn(function()
        task.wait(10)
        if rulesFrame.Parent then
            rulesFrame:Destroy()
            showingGameRules = false
        end
    end)
end

function createBeginnerModal(mode)
    if beginnerModalOpen then return end
    beginnerModalOpen = true
    
    local beginnerTutorials = {
        survival = {
            title = "BEGINNER GUIDE - SURVIVAL",
            content = "🎯 HOW TO PLAY SURVIVAL MODE:\n• Zombies attack in waves - each wave gets harder\n• Use prep time between waves to collect resources\n• Build barricades and traps to defend your position\n• Upgrade weapons with coins earned from kills\n• Work together in multiplayer to share resources\n\n💡 BEGINNER TIPS:\n• Start with basic weapons and upgrade gradually\n• Always keep moving to avoid being overwhelmed\n• Aim for headshots to deal more damage\n• Save some resources for emergency situations"
        },
        campaign = {
            title = "BEGINNER GUIDE - CAMPAIGN",
            content = "📖 HOW TO PLAY CAMPAIGN MODE:\n• Follow the story through structured missions\n• Complete objectives to progress to next areas\n• Watch cutscenes to understand the plot\n• Collect intel items to unlock backstory\n• Work with teammates to complete shared goals\n\n🎯 MODE DIFFERENCES:\n• Offline: Play alone, save progress, pause anytime\n• Online: Quick matchmaking with 3 other players\n• Multiplayer: Create private lobby for friends\n\n💡 BEGINNER TIPS:\n• Read mission briefings carefully\n• Explore areas to find hidden items\n• Communicate with teammates using voice/text"
        },
        arena = {
            title = "BEGINNER GUIDE - ARENA",
            content = "🎯 AIM TRAINING:\n• All weapons are available\n• Targets move in patterns\n• Track accuracy percentage\n• Practice headshot timing\n\n🛠️ SANDBOX:\n• Everything unlocked\n• No resource limits\n• Experiment freely\n• Test weapon combos\n\n⚡ ENDLESS ZOMBIES:\n• Infinite zombie spawns\n• Timer tracks survival\n• Difficulty increases\n• Kill count tracking\n\n💡 ARENA TIPS:\n• Start with Aim Training to improve accuracy\n• Use Sandbox to test expensive weapons\n• Arena modes don't affect main game progress"
        }
    }
    
    local tutorial = beginnerTutorials[mode] or beginnerTutorials.survival
    
    local modalFrame = createFrame("BeginnerModalFrame", mainGui, {
        Size = UDim2.new(1, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundColor3 = COLORS.BACKGROUND,
        BackgroundTransparency = 0.3
    })
    
    local modalPanel = createFrame("ModalPanel", modalFrame, {
        Size = UDim2.new(0.7, 0, 0.7, 0),
        Position = UDim2.new(0.15, 0, 0.15, 0),
        BackgroundColor3 = COLORS.WARNING,
        BackgroundTransparency = 0.8,
        CornerRadius = 12,
        StrokeColor = COLORS.WARNING,
        StrokeThickness = 3
    })
    
    local modalTitle = createLabel("ModalTitle", modalPanel, {
        Text = tutorial.title,
        Size = UDim2.new(0.9, 0, 0.1, 0),
        Position = UDim2.new(0.05, 0, 0.05, 0),
        TextColor3 = COLORS.WARNING,
        Font = Enum.Font.GothamBold
    })
    
    local modalContent = createLabel("ModalContent", modalPanel, {
        Text = tutorial.content,
        Size = UDim2.new(0.9, 0, 0.7, 0),
        Position = UDim2.new(0.05, 0, 0.15, 0),
        TextColor3 = COLORS.WHITE,
        Font = Enum.Font.Gotham
    })
    
    local closeButton = createButton("CloseButton", modalPanel, {
        Text = "GOT IT!",
        Size = UDim2.new(0.3, 0, 0.08, 0),
        Position = UDim2.new(0.35, 0, 0.88, 0),
        BackgroundColor3 = COLORS.WARNING,
        StrokeColor = COLORS.WARNING,
        OnClick = function()
            modalFrame:Destroy()
            beginnerModalOpen = false
        end
    })
    
    -- Animate in
    modalPanel.Position = UDim2.new(0.15, 0, 1.15, 0)
    local animTween = TweenService:Create(modalPanel, TWEEN_INFO, {
        Position = UDim2.new(0.15, 0, 0.15, 0)
    })
    animTween:Play()
end