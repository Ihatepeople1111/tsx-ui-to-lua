-- Modern Glassmorphism Game HUD Component and Modal System for Meltdown Sector Z
-- Designed to match Figma UI specifications with neon effects and glass panels

local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create main GUI container
local mainGui = Instance.new("ScreenGui")
mainGui.Name = "ModernGameHUD"
mainGui.Parent = playerGui
mainGui.IgnoreGuiInset = true
mainGui.ResetOnSpawn = false

local currentUI = nil
local selectedGameMode = nil
local showingGameRules = false
local beginnerModalOpen = false
local glowConnections = {}

-- Crosshair settings
local crosshairSettings = {
    type = "cross",
    size = 20,
    thickness = 2,
    color = Color3.fromRGB(220, 38, 38)
}

-- Sound system placeholder
function playSound(soundName)
    -- Placeholder for sound system
    print("Playing sound:", soundName)
end

-- Menu navigation placeholder
function handleBackToMenu()
    print("Returning to main menu...")
end

-- Crosshair creation function
function createCrosshair()
    -- Remove existing crosshair
    local existingCrosshair = mainGui:FindFirstChild("ModernCrosshair")
    if existingCrosshair then
        existingCrosshair:Destroy()
    end
    
    local crosshairFrame = Instance.new("Frame")
    crosshairFrame.Name = "ModernCrosshair"
    crosshairFrame.Size = UDim2.new(0, crosshairSettings.size, 0, crosshairSettings.size)
    crosshairFrame.Position = UDim2.new(0.5, -crosshairSettings.size/2, 0.5, -crosshairSettings.size/2)
    crosshairFrame.BackgroundTransparency = 1
    crosshairFrame.Parent = mainGui
    
    -- Create neon crosshair lines
    local horizontalLine = Instance.new("Frame")
    horizontalLine.Size = UDim2.new(1, 0, 0, crosshairSettings.thickness)
    horizontalLine.Position = UDim2.new(0, 0, 0.5, -crosshairSettings.thickness/2)
    horizontalLine.BackgroundColor3 = crosshairSettings.color
    horizontalLine.BorderSizePixel = 0
    horizontalLine.Parent = crosshairFrame
    
    local verticalLine = Instance.new("Frame")
    verticalLine.Size = UDim2.new(0, crosshairSettings.thickness, 1, 0)
    verticalLine.Position = UDim2.new(0.5, -crosshairSettings.thickness/2, 0, 0)
    verticalLine.BackgroundColor3 = crosshairSettings.color
    verticalLine.BorderSizePixel = 0
    verticalLine.Parent = crosshairFrame
    
    -- Add glow effect to crosshair
    local hStroke = Instance.new("UIStroke")
    hStroke.Color = crosshairSettings.color
    hStroke.Thickness = 1
    hStroke.Transparency = 0.5
    hStroke.Parent = horizontalLine
    
    local vStroke = Instance.new("UIStroke")
    vStroke.Color = crosshairSettings.color
    vStroke.Thickness = 1
    vStroke.Transparency = 0.5
    vStroke.Parent = verticalLine
    
    createNeonGlow(hStroke)
    createNeonGlow(vStroke)
end

-- Enhanced UI creation functions with glassmorphism support
function createGlassFrame(name, parent, properties)
    local frame = Instance.new("Frame")
    frame.Name = name
    frame.Parent = parent
    frame.Size = properties.Size or UDim2.new(0.5, 0, 0.5, 0)
    frame.Position = properties.Position or UDim2.new(0.25, 0, 0.25, 0)
    frame.BackgroundTransparency = properties.BackgroundTransparency or 0.3
    frame.BorderSizePixel = 0
    
    -- Create glass effect with gradient
    local gradient = Instance.new("UIGradient")
    gradient.Color = properties.Gradient or ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 255, 255)),
        ColorSequenceKeypoint.new(0.5, Color3.fromRGB(200, 200, 255)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(150, 150, 200))
    })
    gradient.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.7),
        NumberSequenceKeypoint.new(0.5, 0.8),
        NumberSequenceKeypoint.new(1, 0.9)
    })
    gradient.Rotation = properties.GradientRotation or 45
    gradient.Parent = frame
    
    -- Glass blur effect (simulated with multiple layers)
    local blurFrame = Instance.new("Frame")
    blurFrame.Name = "BlurLayer"
    blurFrame.Size = UDim2.new(1, 0, 1, 0)
    blurFrame.Position = UDim2.new(0, 0, 0, 0)
    blurFrame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    blurFrame.BackgroundTransparency = 0.8
    blurFrame.BorderSizePixel = 0
    blurFrame.Parent = frame
    
    -- Rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, properties.CornerRadius or 12)
    corner.Parent = frame
    
    local blurCorner = Instance.new("UICorner")
    blurCorner.CornerRadius = UDim.new(0, properties.CornerRadius or 12)
    blurCorner.Parent = blurFrame
    
    -- Neon glow stroke
    local stroke = Instance.new("UIStroke")
    stroke.Color = properties.StrokeColor or Color3.fromRGB(220, 38, 38)
    stroke.Thickness = properties.StrokeThickness or 2
    stroke.Transparency = properties.StrokeTransparency or 0.3
    stroke.Parent = frame
    
    -- Animated glow effect
    if properties.AnimatedGlow ~= false then
        createNeonGlow(stroke)
    end
    
    -- Inner highlight for glass effect
    local highlight = Instance.new("Frame")
    highlight.Name = "Highlight"
    highlight.Size = UDim2.new(1, -4, 1, -4)
    highlight.Position = UDim2.new(0, 2, 0, 2)
    highlight.BackgroundTransparency = 0.85
    highlight.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    highlight.BorderSizePixel = 0
    highlight.Parent = frame
    
    local highlightCorner = Instance.new("UICorner")
    highlightCorner.CornerRadius = UDim.new(0, (properties.CornerRadius or 12) - 2)
    highlightCorner.Parent = highlight
    
    local highlightGradient = Instance.new("UIGradient")
    highlightGradient.Color = ColorSequence.new(Color3.fromRGB(255, 255, 255))
    highlightGradient.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.7),
        NumberSequenceKeypoint.new(1, 0.95)
    })
    highlightGradient.Rotation = -45
    highlightGradient.Parent = highlight
    
    return frame
end

function createNeonButton(name, parent, properties)
    local button = Instance.new("TextButton")
    button.Name = name
    button.Parent = parent
    button.Size = properties.Size or UDim2.new(0.3, 0, 0.1, 0)
    button.Position = properties.Position or UDim2.new(0.35, 0, 0.45, 0)
    button.BackgroundTransparency = 0.2
    button.BorderSizePixel = 0
    button.Text = properties.Text or "BUTTON"
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.TextScaled = true
    button.Font = Enum.Font.GothamBold
    
    -- Button gradient
    local bgGradient = Instance.new("UIGradient")
    bgGradient.Color = properties.Gradient or ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(220, 38, 38)),
        ColorSequenceKeypoint.new(0.5, Color3.fromRGB(180, 20, 20)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(120, 10, 10))
    })
    bgGradient.Rotation = 90
    bgGradient.Parent = button
    
    -- Rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, properties.CornerRadius or 8)
    corner.Parent = button
    
    -- Neon stroke
    local stroke = Instance.new("UIStroke")
    stroke.Color = properties.StrokeColor or Color3.fromRGB(220, 38, 38)
    stroke.Thickness = 3
    stroke.Transparency = 0.2
    stroke.Parent = button
    
    -- Button glow animation
    createNeonGlow(stroke)
    
    -- Hover effects
    local originalGradient = bgGradient.Color
    local hoverGradient = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 60, 60)),
        ColorSequenceKeypoint.new(0.5, Color3.fromRGB(220, 38, 38)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(180, 20, 20))
    })
    
    button.MouseEnter:Connect(function()
        local hoverTween = TweenService:Create(bgGradient, TweenInfo.new(0.2, Enum.EasingStyle.Quad), {
            Color = hoverGradient
        })
        hoverTween:Play()
        
        -- Scale effect
        local scaleTween = TweenService:Create(button, TweenInfo.new(0.2, Enum.EasingStyle.Back), {
            Size = UDim2.new(properties.Size.X.Scale * 1.05, 0, properties.Size.Y.Scale * 1.05, 0)
        })
        scaleTween:Play()
    end)
    
    button.MouseLeave:Connect(function()
        local leaveTween = TweenService:Create(bgGradient, TweenInfo.new(0.2, Enum.EasingStyle.Quad), {
            Color = originalGradient
        })
        leaveTween:Play()
        
        -- Reset scale
        local scaleTween = TweenService:Create(button, TweenInfo.new(0.2, Enum.EasingStyle.Back), {
            Size = properties.Size
        })
        scaleTween:Play()
    end)
    
    -- Click effect
    button.MouseButton1Down:Connect(function()
        local clickTween = TweenService:Create(button, TweenInfo.new(0.1, Enum.EasingStyle.Quad), {
            Size = UDim2.new(properties.Size.X.Scale * 0.95, 0, properties.Size.Y.Scale * 0.95, 0)
        })
        clickTween:Play()
    end)
    
    button.MouseButton1Up:Connect(function()
        local releaseTween = TweenService:Create(button, TweenInfo.new(0.1, Enum.EasingStyle.Back), {
            Size = properties.Size
        })
        releaseTween:Play()
    end)
    
    -- Connect click handler
    if properties.OnClick then
        button.MouseButton1Click:Connect(properties.OnClick)
    end
    
    return button
end

function createNeonGlow(stroke)
    local originalTransparency = stroke.Transparency
    local glowTween = TweenService:Create(stroke, TweenInfo.new(1.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true), {
        Transparency = originalTransparency - 0.3
    })
    glowTween:Play()
    
    table.insert(glowConnections, glowTween)
    return glowTween
end

function createModernLabel(name, parent, properties)
    local label = Instance.new("TextLabel")
    label.Name = name
    label.Parent = parent
    label.Size = properties.Size or UDim2.new(0.8, 0, 0.2, 0)
    label.Position = properties.Position or UDim2.new(0.1, 0, 0.1, 0)
    label.BackgroundTransparency = 1
    label.Text = properties.Text or "LABEL"
    label.TextColor3 = properties.TextColor3 or Color3.fromRGB(255, 255, 255)
    label.TextScaled = properties.TextScaled ~= false
    label.Font = properties.Font or Enum.Font.GothamBold
    label.TextXAlignment = properties.TextXAlignment or Enum.TextXAlignment.Center
    label.TextYAlignment = properties.TextYAlignment or Enum.TextYAlignment.Center
    
    -- Text glow effect
    if properties.TextGlow then
        local textStroke = Instance.new("UIStroke")
        textStroke.Color = properties.TextGlow
        textStroke.Thickness = 2
        textStroke.Transparency = 0.7
        textStroke.Parent = label
        
        createNeonGlow(textStroke)
    end
    
    return label
end

function createGameHUD()
    if currentUI then
        currentUI:Destroy()
    end
    
    -- Clear previous glow connections
    for _, connection in pairs(glowConnections) do
        connection:Cancel()
    end
    glowConnections = {}
    
    currentUI = Instance.new("Frame")
    currentUI.Name = "GameHUD"
    currentUI.Parent = mainGui
    currentUI.Size = UDim2.new(1, 0, 1, 0)
    currentUI.Position = UDim2.new(0, 0, 0, 0)
    currentUI.BackgroundTransparency = 1
    
    -- Animated background with particles
    createAnimatedBackground(currentUI)
    
    -- Top control panel with glassmorphism
    local topPanel = createGlassFrame("TopPanel", currentUI, {
        Size = UDim2.new(0.6, 0, 0.12, 0),
        Position = UDim2.new(0.2, 0, 0.05, 0),
        BackgroundTransparency = 0.85,
        CornerRadius = 16,
        StrokeColor = Color3.fromRGB(59, 130, 246),
        StrokeThickness = 2
    })
    
    -- Tablet button with modern styling
    local tabletButton = createNeonButton("TabletButton", topPanel, {
        Text = "📱 TABLET",
        Size = UDim2.new(0.25, 0, 0.6, 0),
        Position = UDim2.new(0.05, 0, 0.2, 0),
        StrokeColor = Color3.fromRGB(59, 130, 246),
        Gradient = ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(59, 130, 246)),
            ColorSequenceKeypoint.new(0.5, Color3.fromRGB(37, 99, 235)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(29, 78, 216))
        }),
        OnClick = function() 
            playSound("CLICK")
        end
    })
    
    -- Settings button
    local settingsButton = createNeonButton("SettingsButton", topPanel, {
        Text = "⚙️ SETTINGS",
        Size = UDim2.new(0.25, 0, 0.6, 0),
        Position = UDim2.new(0.375, 0, 0.2, 0),
        StrokeColor = Color3.fromRGB(156, 163, 175),
        Gradient = ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(75, 85, 99)),
            ColorSequenceKeypoint.new(0.5, Color3.fromRGB(55, 65, 81)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(31, 41, 55))
        }),
        OnClick = function() 
            playSound("CLICK")
        end
    })
    
    -- Back to menu button
    local backButton = createNeonButton("BackButton", topPanel, {
        Text = "← MAIN MENU",
        Size = UDim2.new(0.25, 0, 0.6, 0),
        Position = UDim2.new(0.7, 0, 0.2, 0),
        StrokeColor = Color3.fromRGB(220, 38, 38),
        OnClick = function() handleBackToMenu() end
    })
    
    -- Stats panel (right side)
    createStatsPanel(currentUI)
    
    -- Inventory hotbar (bottom)
    createModernHotbar(currentUI)
    
    -- HUD elements
    createModernClock(currentUI)
    createCrosshair()
    
    -- Show game rules popup
    if selectedGameMode then
        showGameRulesPopup()
    end
end

function createAnimatedBackground(parent)
    local bgFrame = Instance.new("Frame")
    bgFrame.Name = "AnimatedBackground"
    bgFrame.Size = UDim2.new(1, 0, 1, 0)
    bgFrame.Position = UDim2.new(0, 0, 0, 0)
    bgFrame.BackgroundTransparency = 0
    bgFrame.BorderSizePixel = 0
    bgFrame.Parent = parent
    
    -- Animated gradient background
    local bgGradient = Instance.new("UIGradient")
    bgGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 0, 0)),
        ColorSequenceKeypoint.new(0.3, Color3.fromRGB(20, 20, 30)),
        ColorSequenceKeypoint.new(0.7, Color3.fromRGB(40, 10, 10)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(0, 0, 0))
    })
    bgGradient.Rotation = 45
    bgGradient.Parent = bgFrame
    
    -- Animate gradient rotation
    local bgTween = TweenService:Create(bgGradient, TweenInfo.new(10, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1), {
        Rotation = 405
    })
    bgTween:Play()
    
    -- Floating particles
    for i = 1, 30 do
        createFloatingParticle(bgFrame, i)
    end
end

function createFloatingParticle(parent, index)
    local particle = Instance.new("Frame")
    particle.Name = "Particle" .. index
    particle.Size = UDim2.new(0, math.random(2, 8), 0, math.random(2, 8))
    particle.Position = UDim2.new(math.random(), 0, math.random(), 0)
    particle.BackgroundColor3 = Color3.fromRGB(220, 38, 38)
    particle.BackgroundTransparency = math.random(30, 80) / 100
    particle.BorderSizePixel = 0
    particle.Parent = parent
    
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(1, 0)
    corner.Parent = particle
    
    -- Animate particle
    local moveTween = TweenService:Create(particle, TweenInfo.new(math.random(5, 15), Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true), {
        Position = UDim2.new(math.random(), 0, math.random(), 0)
    })
    moveTween:Play()
    
    local fadeTween = TweenService:Create(particle, TweenInfo.new(math.random(2, 6), Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true), {
        BackgroundTransparency = math.random(20, 90) / 100
    })
    fadeTween:Play()
end

function createStatsPanel(parent)
    local statsPanel = createGlassFrame("StatsPanel", parent, {
        Size = UDim2.new(0.28, 0, 0.5, 0),
        Position = UDim2.new(0.7, 0, 0.05, 0),
        BackgroundTransparency = 0.85,
        CornerRadius = 16,
        StrokeColor = Color3.fromRGB(34, 197, 94),
        StrokeThickness = 2
    })
    
    -- Coins display
    local coinsFrame = createGlassFrame("CoinsFrame", statsPanel, {
        Size = UDim2.new(0.9, 0, 0.15, 0),
        Position = UDim2.new(0.05, 0, 0.05, 0),
        BackgroundTransparency = 0.7,
        CornerRadius = 12,
        StrokeColor = Color3.fromRGB(234, 179, 8),
        StrokeThickness = 1
    })
    
    local coinsLabel = createModernLabel("CoinsLabel", coinsFrame, {
        Text = "🪙 12,847 CREDITS",
        Size = UDim2.new(0.9, 0, 0.8, 0),
        Position = UDim2.new(0.05, 0, 0.1, 0),
        TextColor3 = Color3.fromRGB(255, 255, 255),
        TextGlow = Color3.fromRGB(234, 179, 8)
    })
    
    -- Level display
    local levelFrame = createGlassFrame("LevelFrame", statsPanel, {
        Size = UDim2.new(0.9, 0, 0.15, 0),
        Position = UDim2.new(0.05, 0, 0.25, 0),
        BackgroundTransparency = 0.7,
        CornerRadius = 12,
        StrokeColor = Color3.fromRGB(147, 51, 234),
        StrokeThickness = 1
    })
    
    local levelLabel = createModernLabel("LevelLabel", levelFrame, {
        Text = "⭐ LEVEL 23",
        Size = UDim2.new(0.9, 0, 0.8, 0),
        Position = UDim2.new(0.05, 0, 0.1, 0),
        TextColor3 = Color3.fromRGB(255, 255, 255),
        TextGlow = Color3.fromRGB(147, 51, 234)
    })
    
    -- XP Progress bar
    local xpFrame = createGlassFrame("XPFrame", statsPanel, {
        Size = UDim2.new(0.9, 0, 0.2, 0),
        Position = UDim2.new(0.05, 0, 0.45, 0),
        BackgroundTransparency = 0.7,
        CornerRadius = 12,
        StrokeColor = Color3.fromRGB(59, 130, 246),
        StrokeThickness = 1
    })
    
    local xpText = createModernLabel("XPText", xpFrame, {
        Text = "EXPERIENCE",
        Size = UDim2.new(0.9, 0, 0.4, 0),
        Position = UDim2.new(0.05, 0, 0.05, 0),
        TextColor3 = Color3.fromRGB(200, 200, 200),
        Font = Enum.Font.Gotham
    })
    
    local xpBarBG = Instance.new("Frame")
    xpBarBG.Name = "XPBarBG"
    xpBarBG.Size = UDim2.new(0.85, 0, 0.25, 0)
    xpBarBG.Position = UDim2.new(0.075, 0, 0.6, 0)
    xpBarBG.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    xpBarBG.BackgroundTransparency = 0.5
    xpBarBG.BorderSizePixel = 0
    xpBarBG.Parent = xpFrame
    
    local xpBarCorner = Instance.new("UICorner")
    xpBarCorner.CornerRadius = UDim.new(0, 8)
    xpBarCorner.Parent = xpBarBG
    
    local xpBar = Instance.new("Frame")
    xpBar.Name = "XPBar"
    xpBar.Size = UDim2.new(0.75, 0, 1, 0)
    xpBar.Position = UDim2.new(0, 0, 0, 0)
    xpBar.BackgroundColor3 = Color3.fromRGB(59, 130, 246)
    xpBar.BorderSizePixel = 0
    xpBar.Parent = xpBarBG
    
    local xpBarFillCorner = Instance.new("UICorner")
    xpBarFillCorner.CornerRadius = UDim.new(0, 8)
    xpBarFillCorner.Parent = xpBar
    
    -- Animated XP bar
    local xpGradient = Instance.new("UIGradient")
    xpGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(59, 130, 246)),
        ColorSequenceKeypoint.new(0.5, Color3.fromRGB(37, 99, 235)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(29, 78, 216))
    })
    xpGradient.Parent = xpBar
    
    local xpProgressLabel = createModernLabel("XPProgressLabel", xpFrame, {
        Text = "2,750 / 3,500 XP",
        Size = UDim2.new(0.9, 0, 0.25, 0),
        Position = UDim2.new(0.05, 0, 0.9, 0),
        TextColor3 = Color3.fromRGB(150, 150, 150),
        Font = Enum.Font.Gotham
    })
end

function createModernHotbar(parent)
    local hotbarContainer = createGlassFrame("HotbarContainer", parent, {
        Size = UDim2.new(0.7, 0, 0.15, 0),
        Position = UDim2.new(0.15, 0, 0.82, 0),
        BackgroundTransparency = 0.85,
        CornerRadius = 20,
        StrokeColor = Color3.fromRGB(255, 255, 255),
        StrokeThickness = 2,
        AnimatedGlow = true
    })
    
    -- Inventory button (floating above)
    local inventoryButton = createNeonButton("InventoryButton", hotbarContainer, {
        Text = "📦",
        Size = UDim2.new(0.08, 0, 0.35, 0),
        Position = UDim2.new(0.46, 0, -0.4, 0),
        StrokeColor = Color3.fromRGB(34, 197, 94),
        Gradient = ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(34, 197, 94)),
            ColorSequenceKeypoint.new(0.5, Color3.fromRGB(22, 163, 74)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(21, 128, 61))
        }),
        OnClick = function() 
            playSound("CLICK")
        end
    })
    
    -- Create 9 modern hotbar slots
    for i = 1, 9 do
        local slotFrame = createGlassFrame("Slot" .. i, hotbarContainer, {
            Size = UDim2.new(0.09, 0, 0.65, 0),
            Position = UDim2.new((i - 1) * 0.105 + 0.05, 0, 0.175, 0),
            BackgroundTransparency = 0.8,
            CornerRadius = 12,
            StrokeColor = i == 1 and Color3.fromRGB(220, 38, 38) or Color3.fromRGB(100, 100, 100),
            StrokeThickness = i == 1 and 3 or 1,
            AnimatedGlow = i == 1
        })
        
        -- Slot number with glow
        local slotNumber = createModernLabel("SlotNumber" .. i, slotFrame, {
            Text = tostring(i),
            Size = UDim2.new(0.25, 0, 0.25, 0),
            Position = UDim2.new(0.75, 0, 0.75, 0),
            TextColor3 = i == 1 and Color3.fromRGB(220, 38, 38) or Color3.fromRGB(150, 150, 150),
            Font = Enum.Font.GothamBold,
            TextGlow = i == 1 and Color3.fromRGB(220, 38, 38) or nil
        })
        
        -- Add items with modern styling
        if i <= 5 then
            local items = {"🔫", "🛡️", "💊", "💣", "⚡"}
            local itemColors = {
                Color3.fromRGB(220, 38, 38),
                Color3.fromRGB(59, 130, 246),
                Color3.fromRGB(34, 197, 94),
                Color3.fromRGB(234, 179, 8),
                Color3.fromRGB(147, 51, 234)
            }
            
            local itemIcon = createModernLabel("ItemIcon" .. i, slotFrame, {
                Text = items[i],
                Size = UDim2.new(0.6, 0, 0.6, 0),
                Position = UDim2.new(0.2, 0, 0.1, 0),
                TextColor3 = Color3.fromRGB(255, 255, 255),
                Font = Enum.Font.GothamBold,
                TextGlow = itemColors[i]
            })
        end
    end
end

function createModernClock(parent)
    local clockFrame = createGlassFrame("ClockFrame", parent, {
        Size = UDim2.new(0.18, 0, 0.1, 0),
        Position = UDim2.new(0.8, 0, 0.88, 0),
        BackgroundTransparency = 0.85,
        CornerRadius = 16,
        StrokeColor = Color3.fromRGB(156, 163, 175),
        StrokeThickness = 1
    })
    
    local timeLabel = createModernLabel("TimeLabel", clockFrame, {
        Text = "🕐 22:47",
        Size = UDim2.new(0.9, 0, 0.5, 0),
        Position = UDim2.new(0.05, 0, 0.1, 0),
        TextColor3 = Color3.fromRGB(255, 255, 255),
        Font = Enum.Font.GothamBold
    })
    
    local dayLabel = createModernLabel("DayLabel", clockFrame, {
        Text = "NIGHT CYCLE",
        Size = UDim2.new(0.9, 0, 0.3, 0),
        Position = UDim2.new(0.05, 0, 0.65, 0),
        TextColor3 = Color3.fromRGB(147, 51, 234),
        Font = Enum.Font.Gotham,
        TextGlow = Color3.fromRGB(147, 51, 234)
    })
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
    
    local rulesFrame = createGlassFrame("GameRulesFrame", mainGui, {
        Size = UDim2.new(1, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundTransparency = 0.3,
        CornerRadius = 20,
        StrokeColor = Color3.fromRGB(220, 38, 38),
        StrokeThickness = 3
    })
    
    local rulesPanel = createGlassFrame("RulesPanel", rulesFrame, {
        Size = UDim2.new(0.6, 0, 0.5, 0),
        Position = UDim2.new(0.2, 0, 0.25, 0),
        BackgroundTransparency = 0.1,
        CornerRadius = 12,
        StrokeColor = Color3.fromRGB(59, 130, 246),
        StrokeThickness = 3
    })
    
    local rulesTitle = createModernLabel("RulesTitle", rulesPanel, {
        Text = gameModeTitles[selectedGameMode] or "GAME MODE RULES",
        Size = UDim2.new(0.9, 0, 0.15, 0),
        Position = UDim2.new(0.05, 0, 0.05, 0),
        TextColor3 = Color3.fromRGB(59, 130, 246),
        Font = Enum.Font.GothamBold
    })
    
    local rulesText = createModernLabel("RulesText", rulesPanel, {
        Text = gameModeRules[selectedGameMode] or "Have fun playing!",
        Size = UDim2.new(0.9, 0, 0.6, 0),
        Position = UDim2.new(0.05, 0, 0.2, 0),
        TextColor3 = Color3.fromRGB(255, 255, 255),
        Font = Enum.Font.Gotham
    })
    
    local gotItButton = createNeonButton("GotItButton", rulesPanel, {
        Text = "GOT IT!",
        Size = UDim2.new(0.3, 0, 0.1, 0),
        Position = UDim2.new(0.35, 0, 0.85, 0),
        BackgroundColor3 = Color3.fromRGB(34, 197, 94),
        StrokeColor = Color3.fromRGB(34, 197, 94),
        Gradient = ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(34, 197, 94)),
            ColorSequenceKeypoint.new(0.5, Color3.fromRGB(22, 163, 74)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(21, 128, 61))
        }),
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
    
    local modalFrame = createGlassFrame("BeginnerModalFrame", mainGui, {
        Size = UDim2.new(1, 0, 1, 0),
        Position = UDim2.new(0, 0, 0, 0),
        BackgroundTransparency = 0.3,
        CornerRadius = 20,
        StrokeColor = Color3.fromRGB(220, 38, 38),
        StrokeThickness = 3
    })
    
    local modalPanel = createGlassFrame("ModalPanel", modalFrame, {
        Size = UDim2.new(0.7, 0, 0.7, 0),
        Position = UDim2.new(0.15, 0, 0.15, 0),
        BackgroundTransparency = 0.8,
        CornerRadius = 12,
        StrokeColor = Color3.fromRGB(220, 38, 38),
        StrokeThickness = 3
    })
    
    local modalTitle = createModernLabel("ModalTitle", modalPanel, {
        Text = tutorial.title,
        Size = UDim2.new(0.9, 0, 0.1, 0),
        Position = UDim2.new(0.05, 0, 0.05, 0),
        TextColor3 = Color3.fromRGB(220, 38, 38),
        Font = Enum.Font.GothamBold
    })
    
    local modalContent = createModernLabel("ModalContent", modalPanel, {
        Text = tutorial.content,
        Size = UDim2.new(0.9, 0, 0.7, 0),
        Position = UDim2.new(0.05, 0, 0.15, 0),
        TextColor3 = Color3.fromRGB(255, 255, 255),
        Font = Enum.Font.Gotham
    })
    
    local closeButton = createNeonButton("CloseButton", modalPanel, {
        Text = "GOT IT!",
        Size = UDim2.new(0.3, 0, 0.08, 0),
        Position = UDim2.new(0.35, 0, 0.88, 0),
        BackgroundColor3 = Color3.fromRGB(220, 38, 38),
        StrokeColor = Color3.fromRGB(220, 38, 38),
        Gradient = ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(220, 38, 38)),
            ColorSequenceKeypoint.new(0.5, Color3.fromRGB(180, 20, 20)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(120, 10, 10))
        }),
        OnClick = function()
            modalFrame:Destroy()
            beginnerModalOpen = false
        end
    })
    
    -- Animate in
    modalPanel.Position = UDim2.new(0.15, 0, 1.15, 0)
    local animTween = TweenService:Create(modalPanel, TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
        Position = UDim2.new(0.15, 0, 0.15, 0)
    })
    animTween:Play()
end

-- API Functions for external use
function setGameMode(mode)
    selectedGameMode = mode
end

function showHUD()
    createGameHUD()
end

function hideHUD()
    if currentUI then
        currentUI:Destroy()
        currentUI = nil
    end
end

function showTutorial(mode)
    createBeginnerModal(mode or "survival")
end

-- Initialize the modern HUD system
function initializeModernHUD(gameMode)
    selectedGameMode = gameMode
    createGameHUD()
    
    -- Set up input handling for ESC key
    UserInputService.InputBegan:Connect(function(input, gameProcessed)
        if gameProcessed then return end
        
        if input.KeyCode == Enum.KeyCode.Escape then
            if showingGameRules or beginnerModalOpen then
                -- Close any open modals
                local rulesFrame = mainGui:FindFirstChild("GameRulesFrame")
                if rulesFrame then
                    rulesFrame:Destroy()
                    showingGameRules = false
                end
                
                local modalFrame = mainGui:FindFirstChild("BeginnerModalFrame")
                if modalFrame then
                    modalFrame:Destroy()
                    beginnerModalOpen = false
                end
            else
                handleBackToMenu()
            end
        end
    end)
    
    print("Modern Glassmorphism HUD initialized with game mode:", gameMode)
end

-- Auto-initialize if no game mode is set
task.spawn(function()
    task.wait(1) -- Wait for everything to load
    if not selectedGameMode then
        initializeModernHUD("survival_single")
    end
end)

-- Export for module usage
return {
    initializeModernHUD = initializeModernHUD,
    setGameMode = setGameMode,
    showHUD = showHUD,
    hideHUD = hideHUD,
    showTutorial = showTutorial,
    createGameHUD = createGameHUD
}