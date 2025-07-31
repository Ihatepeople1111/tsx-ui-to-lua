-- Meltdown Sector Z - Game Settings Module
-- Place this ModuleScript in ReplicatedStorage

local GameSettings = {}

-- Game Configuration
GameSettings.GAME_NAME = "Meltdown Sector Z"
GameSettings.VERSION = "1.0.0"

-- Place IDs for different game modes (you would replace these with actual Place IDs)
GameSettings.PLACE_IDS = {
    SURVIVAL_MAP = 123456789,
    CAMPAIGN_MAP = 123456790,
    ARENA_MAP = 123456791,
    LOBBY = 123456792
}

-- Game Mode Settings
GameSettings.SURVIVAL = {
    MAX_WAVES = 50,
    STARTING_ZOMBIES = 10,
    ZOMBIE_INCREASE_PER_WAVE = 5,
    PREP_TIME = 30, -- seconds
    MAX_PLAYERS = 4,
    STARTING_MONEY = 1000,
    WAVE_REWARDS = {
        [1] = 500,
        [5] = 1000,
        [10] = 2000,
        [25] = 5000,
        [50] = 10000
    }
}

GameSettings.CAMPAIGN = {
    TOTAL_CHAPTERS = 5,
    MISSIONS_PER_CHAPTER = 4,
    MAX_PLAYERS_ONLINE = 4,
    CHECKPOINT_SYSTEM = true,
    STORY_PROGRESSION = true
}

GameSettings.ARENA = {
    AIM_TRAINING = {
        TARGET_TYPES = {"Static", "Moving", "Popup", "Tracking"},
        DIFFICULTY_LEVELS = {"Beginner", "Intermediate", "Advanced", "Expert"},
        SESSION_TIME = 300, -- 5 minutes
        ACCURACY_TRACKING = true
    },
    SANDBOX = {
        UNLIMITED_RESOURCES = true,
        ALL_WEAPONS_UNLOCKED = true,
        BUILD_MODE = true,
        NO_DAMAGE = true
    },
    ENDLESS = {
        INFINITE_WAVES = true,
        DIFFICULTY_SCALING = 1.1, -- 10% increase per wave
        LEADERBOARD_TRACKING = true,
        POWER_UPS = true
    }
}

-- Weapon Categories and Stats
GameSettings.WEAPONS = {
    PISTOLS = {
        {name = "Glock 17", damage = 35, fireRate = 400, ammo = 17, price = 5000, tier = 1},
        {name = "M1911", damage = 40, fireRate = 350, ammo = 8, price = 6000, tier = 1},
        {name = "USP", damage = 38, fireRate = 380, ammo = 12, price = 8000, tier = 2},
        {name = "Desert Eagle", damage = 55, fireRate = 280, ammo = 7, price = 12000, tier = 2}
    },
    SMGS = {
        {name = "MAC-10", damage = 28, fireRate = 950, ammo = 30, price = 15000, tier = 2},
        {name = "Uzi", damage = 30, fireRate = 900, ammo = 25, price = 18000, tier = 2},
        {name = "MP5", damage = 32, fireRate = 800, ammo = 30, price = 25000, tier = 3},
        {name = "P90", damage = 35, fireRate = 850, ammo = 50, price = 35000, tier = 3}
    },
    ASSAULT_RIFLES = {
        {name = "FAMAS", damage = 50, fireRate = 650, ammo = 25, price = 40000, tier = 3},
        {name = "SCAR-L", damage = 52, fireRate = 625, ammo = 30, price = 45000, tier = 3},
        {name = "M4A1", damage = 55, fireRate = 700, ammo = 30, price = 55000, tier = 4},
        {name = "AK-47", damage = 65, fireRate = 600, ammo = 30, price = 50000, tier = 4}
    },
    SHOTGUNS = {
        {name = "Double Barrel", damage = 80, fireRate = 120, ammo = 2, price = 20000, tier = 2},
        {name = "Remington 870", damage = 85, fireRate = 150, ammo = 8, price = 30000, tier = 3},
        {name = "Mossberg 500", damage = 83, fireRate = 160, ammo = 8, price = 32000, tier = 3},
        {name = "SPAS-12", damage = 90, fireRate = 180, ammo = 8, price = 65000, tier = 4}
    },
    SNIPER_RIFLES = {
        {name = "M24", damage = 95, fireRate = 45, ammo = 5, price = 80000, tier = 4},
        {name = "Dragunov SVD", damage = 92, fireRate = 60, ammo = 10, price = 85000, tier = 4},
        {name = "AWP", damage = 100, fireRate = 40, ammo = 10, price = 120000, tier = 5},
        {name = "Barrett M82", damage = 110, fireRate = 35, ammo = 10, price = 150000, tier = 5}
    },
    HEAVY = {
        {name = "RPK", damage = 70, fireRate = 550, ammo = 75, price = 90000, tier = 4},
        {name = "M249 SAW", damage = 75, fireRate = 650, ammo = 100, price = 125000, tier = 5},
        {name = "MG42", damage = 80, fireRate = 750, ammo = 75, price = 140000, tier = 5}
    },
    ENERGY = {
        {name = "Laser Pistol", damage = 60, fireRate = 500, ammo = 20, price = 200000, tier = 5},
        {name = "Plasma Rifle", damage = 85, fireRate = 400, ammo = 30, price = 300000, tier = 5}
    }
}

-- Zombie Types
GameSettings.ZOMBIES = {
    WALKER = {health = 100, speed = 12, damage = 20, reward = 10},
    RUNNER = {health = 80, speed = 20, damage = 15, reward = 15},
    CRAWLER = {health = 60, speed = 8, damage = 30, reward = 20},
    SPITTER = {health = 120, speed = 10, damage = 25, reward = 25},
    BRUTE = {health = 300, speed = 8, damage = 50, reward = 100},
    SCREAMER = {health = 150, speed = 15, damage = 20, reward = 50, special = "attracts_zombies"},
    EXPLOSIVE = {health = 200, speed = 16, damage = 75, reward = 75, special = "explodes_on_death"}
}

-- UI Colors (RGB values for Roblox Color3)
GameSettings.COLORS = {
    BLACK = {0, 0, 0},
    RED = {220, 38, 38},
    RED_LIGHT = {239, 68, 68},
    WHITE = {255, 255, 255},
    GRAY = {128, 128, 128},
    GREEN = {34, 197, 94},
    BLUE = {59, 130, 246},
    YELLOW = {234, 179, 8},
    PURPLE = {147, 51, 234}
}

-- Convert RGB values to Color3
function GameSettings.GetColor3(colorName)
    local rgb = GameSettings.COLORS[colorName]
    if rgb then
        return Color3.fromRGB(rgb[1], rgb[2], rgb[3])
    end
    return Color3.fromRGB(255, 255, 255) -- Default to white
end

-- Party Settings
GameSettings.PARTY = {
    MAX_PARTY_SIZE = 4,
    PARTY_TIMEOUT = 3600, -- 1 hour in seconds
    MAX_PARTIES = 100,
    PARTY_TYPES = {
        "Casual", "Competitive", "Beginner Friendly", 
        "Expert Only", "Speed Run", "Role Play"
    }
}

-- Progression System
GameSettings.PROGRESSION = {
    MAX_LEVEL = 100,
    XP_PER_KILL = 10,
    XP_PER_WAVE = 100,
    XP_PER_MISSION = 500,
    PRESTIGE_LEVELS = 10,
    PRESTIGE_BONUS = 0.1 -- 10% XP bonus per prestige
}

-- Currency System
GameSettings.CURRENCY = {
    STARTING_COINS = 1000,
    COINS_PER_KILL = 5,
    COINS_PER_WAVE = 50,
    DAILY_BONUS = 500,
    WEEKLY_BONUS = 2500
}

-- Crosshair Settings
GameSettings.CROSSHAIR = {
    TYPES = {"none", "dot", "cross", "circle", "t", "dynamic"},
    DEFAULT_SIZE = 20,
    DEFAULT_THICKNESS = 2,
    DEFAULT_OPACITY = 100,
    DEFAULT_COLOR = "RED"
}

return GameSettings