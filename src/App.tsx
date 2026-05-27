import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ScenarioRenderer } from './components/ScenarioRenderer';
import { FeedbackScreen } from './components/FeedbackScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { AlertCircle, Loader, Shield } from 'lucide-react';

const GameContent: React.FC = () => {
  const { gameState, loadScenarios } = useGame();

  return (
    <div className="w-full max-w-[600px] h-full min-h-[100dvh] sm:min-h-[85vh] flex flex-col justify-between bg-black text-white sm:border sm:border-zinc-800 sm:rounded-3xl sm:shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 overflow-y-auto font-sans relative sm:my-8">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-6 shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-400" />
          <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
            New Hire Simulator
          </h1>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-3xs uppercase tracking-widest text-zinc-400 font-semibold font-mono">
            System Live
          </span>
        </div>
      </header>

      {/* Screen Routing */}
      <main className="flex-grow flex flex-col justify-between">
        {gameState === 'loading' && (
          <div className="flex-grow flex flex-col items-center justify-center space-y-4 my-auto">
            <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 animate-pulse">
              Loading scenario engine...
            </p>
          </div>
        )}

        {gameState === 'error' && (
          <div className="flex-grow flex flex-col items-center justify-center space-y-4 text-center my-auto px-4">
            <AlertCircle className="w-12 h-12 text-rose-500 animate-pulse" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">System Error</h2>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We encountered an error loading the scenarios. Please ensure scenarioData.json is present in the public/ folder.
              </p>
            </div>
            <button
              onClick={loadScenarios}
              className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {gameState === 'welcome' && <WelcomeScreen />}

        {gameState === 'scenario' && <ScenarioRenderer />}

        {gameState === 'feedback' && <FeedbackScreen />}

        {gameState === 'ended' && <CompletionScreen />}
      </main>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between shrink-0 text-3xs text-zinc-600 font-mono tracking-widest">
        <span>VER. 2026.1.0</span>
        <span>STRICTLY CONFIDENTIAL</span>
      </footer>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-zinc-950 sm:bg-gradient-to-tr sm:from-zinc-950 sm:to-black flex items-center justify-center">
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;
