import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Choice {
  id: string;
  label?: string;
  text?: string;
  action?: string;
  capitalModifier: number;
  feedback: string;
  skill: string;
}

export interface Scenario {
  id: string;
  title?: string;
  setup: string;
  trigger: string;
  choices: Choice[];
}

export type GameState = 'loading' | 'error' | 'welcome' | 'scenario' | 'feedback' | 'ended';

interface GameContextType {
  socialCapital: number;
  currentScenarioIndex: number;
  scenarios: Scenario[];
  gameState: GameState;
  selectedChoice: Choice | null;
  userName: string;
  loadScenarios: () => Promise<void>;
  chooseOption: (choiceId: string) => void;
  advanceScenario: () => void;
  resetGame: () => void;
  startGame: (name: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socialCapital, setSocialCapital] = useState<number>(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [gameState, setGameState] = useState<GameState>('loading');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [userName, setUserName] = useState<string>('');

  const loadScenarios = async () => {
    setGameState('loading');
    try {
      const response = await fetch('/scenarioData.json');
      if (!response.ok) {
        throw new Error(`Failed to load scenario data: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setScenarios(data);
        setGameState('welcome');
      } else {
        throw new Error('Invalid JSON structure: expected an array at root.');
      }
    } catch (err) {
      console.error(err);
      setGameState('error');
    }
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const chooseOption = (choiceId: string) => {
    const currentScenario = scenarios[currentScenarioIndex];
    if (!currentScenario) return;

    const choice = currentScenario.choices.find(c => c.id === choiceId);
    if (!choice) return;

    setSelectedChoice(choice);
    setSocialCapital(prev => prev + choice.capitalModifier);
    setGameState('feedback');
  };

  const advanceScenario = () => {
    setSelectedChoice(null);
    if (currentScenarioIndex + 1 < scenarios.length) {
      setCurrentScenarioIndex(prev => prev + 1);
      setGameState('scenario');
    } else {
      setGameState('ended');
    }
  };

  const resetGame = () => {
    setSocialCapital(0);
    setCurrentScenarioIndex(0);
    setSelectedChoice(null);
    setUserName('');
    if (scenarios.length > 0) {
      setGameState('welcome');
    } else {
      loadScenarios();
    }
  };

  const startGame = (name: string) => {
    setUserName(name);
    if (scenarios.length > 0) {
      setGameState('scenario');
    }
  };

  return (
    <GameContext.Provider
      value={{
        socialCapital,
        currentScenarioIndex,
        scenarios,
        gameState,
        selectedChoice,
        userName,
        loadScenarios,
        chooseOption,
        advanceScenario,
        resetGame,
        startGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
