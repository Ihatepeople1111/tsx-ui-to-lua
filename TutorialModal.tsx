import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Target, Users, Zap, Gamepad2, Heart, Shield, Crosshair } from 'lucide-react';
import { GameMode } from '../types';

interface TutorialModalProps {
  onClose: () => void;
  gameMode: GameMode;
}

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string[];
}

export function TutorialModal({ onClose, gameMode }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const getTutorialSteps = (): TutorialStep[] => {
    const commonSteps = [
      {
        id: 1,
        title: "Game Controls",
        description: "Learn the basic controls",
        icon: <Gamepad2 className="w-6 h-6" />,
        content: [
          "WASD - Move your character",
          "Mouse - Look around and aim",
          "Left Click - Shoot/Attack",
          "Right Click - Aim down sights",
          "R - Reload weapon",
          "F - Interact with objects",
          "Shift - Run/Sprint",
          "Ctrl - Crouch",
          "Space - Jump",
          "Tab - Open scoreboard"
        ]
      },
      {
        id: 2,
        title: "Health & Stamina",
        description: "Manage your vital stats",
        icon: <Heart className="w-6 h-6" />,
        content: [
          "Health - Your life force, avoid damage to survive",
          "Stamina - Used for running and special actions",
          "Use health packs to restore health",
          "Rest to regenerate stamina",
          "Take cover when health is low",
          "Watch for visual damage indicators"
        ]
      },
      {
        id: 3,
        title: "Crosshair & Aiming",
        description: "Improve your accuracy",
        icon: <Crosshair className="w-6 h-6" />,
        content: [
          "Crosshair shows where you're aiming",
          "Different weapons have different spread",
          "Aim for the head for critical damage",
          "Crouching improves accuracy",
          "Moving reduces accuracy",
          "Customize crosshair in Settings > Personalization"
        ]
      },
      {
        id: 4,
        title: "Inventory & Items",
        description: "Manage your equipment",
        icon: <Shield className="w-6 h-6" />,
        content: [
          "Use number keys 1-9 to select items",
          "Click inventory button to open full inventory",
          "Drag and drop to organize items",
          "Right-click items for options",
          "Some items stack, others don't",
          "Equipment affects your stats"
        ]
      }
    ];

    const modeSpecificSteps: Record<string, TutorialStep[]> = {
      survival_single: [
        {
          id: 5,
          title: "Survival Mode",
          description: "Survive endless waves",
          icon: <Target className="w-6 h-6" />,
          content: [
            "Face endless waves of infected zombies",
            "Each wave gets progressively harder",
            "Collect resources between waves",
            "Build defenses and barricades",
            "Upgrade your weapons and equipment",
            "Survive as long as possible"
          ]
        }
      ],
      campaign_offline: [
        {
          id: 5,
          title: "Campaign Mode",
          description: "Complete story missions",
          icon: <Target className="w-6 h-6" />,
          content: [
            "Follow the story of the outbreak",
            "Complete objectives to progress",
            "Explore different environments",
            "Discover the truth behind the infection",
            "Unlock new areas and weapons",
            "Make choices that affect the story"
          ]
        }
      ],
      campaign_online: [
        {
          id: 5,
          title: "Online Campaign",
          description: "Play story with friends",
          icon: <Users className="w-6 h-6" />,
          content: [
            "Experience the campaign with up to 4 players",
            "Coordinate with your team",
            "Share resources and support each other",
            "Revive fallen teammates",
            "Some puzzles require teamwork",
            "Communication is key to success"
          ]
        }
      ],
      arena_aim: [
        {
          id: 5,
          title: "Aim Training",
          description: "Improve your shooting skills",
          icon: <Crosshair className="w-6 h-6" />,
          content: [
            "Practice your aim with various targets",
            "Different training scenarios available",
            "Track your accuracy improvement",
            "Adjust sensitivity settings",
            "Try different weapon types",
            "Set personal records and goals"
          ]
        }
      ],
      arena_sandbox: [
        {
          id: 5,
          title: "Sandbox Mode",
          description: "Free play and experimentation",
          icon: <Zap className="w-6 h-6" />,
          content: [
            "Unlimited resources and weapons",
            "Spawn any items or enemies",
            "Test different strategies",
            "Practice building defenses",
            "Experiment with weapon combinations",
            "No pressure, just have fun!"
          ]
        }
      ],
      arena_endless: [
        {
          id: 5,
          title: "Endless Zombies",
          description: "Non-stop zombie action",
          icon: <Target className="w-6 h-6" />,
          content: [
            "Continuous waves of zombies",
            "No breaks between waves",
            "Test your endurance and skill",
            "Zombies get stronger over time",
            "Compete for high scores",
            "Perfect for skill development"
          ]
        }
      ]
    };

    return [...commonSteps, ...(modeSpecificSteps[gameMode] || [])];
  };

  const steps = getTutorialSteps();
  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-panel bg-card/90 border border-border p-6 rounded-xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              {currentStepData.icon}
            </div>
            <div>
              <h2 className="text-2xl font-mono text-white">Tutorial</h2>
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                {currentStepData.icon}
              </div>
              <div>
                <h3 className="text-xl font-mono text-white">{currentStepData.title}</h3>
                <p className="text-muted-foreground">{currentStepData.description}</p>
              </div>
            </div>

            <div className="glass-panel bg-muted/20 border border-border/50 rounded-lg p-4">
              <ul className="space-y-2">
                {currentStepData.content.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 text-white"
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span className="font-mono text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono transition-colors ${
              currentStep === 0
                ? 'bg-muted/20 text-muted-foreground cursor-not-allowed'
                : 'glass-panel bg-muted/30 border border-border text-white hover:bg-muted/40'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </motion.button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-secondary'
                    : index < currentStep
                    ? 'bg-secondary/60'
                    : 'bg-muted/30'
                }`}
              />
            ))}
          </div>

          {currentStep === totalSteps - 1 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary/20 border border-secondary/40 text-secondary font-mono rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <span>Complete</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="flex items-center space-x-2 px-4 py-2 glass-panel bg-muted/30 border border-border text-white font-mono rounded-lg hover:bg-muted/40 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            💡 Tip: You can access this tutorial anytime from the main menu or settings
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}