import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import type { Choice } from '../context/GameContext';
import { Award, Layers, Radio } from 'lucide-react';

export const ScenarioRenderer: React.FC = () => {
  const { scenarios, currentScenarioIndex, chooseOption, socialCapital, userName } = useGame();
  const [shuffledChoices, setShuffledChoices] = useState<Choice[]>([]);

  const currentScenario = scenarios[currentScenarioIndex];

  const replaceName = (text: string | undefined): string => {
    if (!text) return '';
    return text.replace(/\[Name\]/g, userName);
  };

  useEffect(() => {
    if (!currentScenario) return;
    
    // Copy options and perform Fisher-Yates shuffle
    const choicesCopy = [...currentScenario.choices];
    for (let i = choicesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choicesCopy[i], choicesCopy[j]] = [choicesCopy[j], choicesCopy[i]];
    }
    setShuffledChoices(choicesCopy);
  }, [currentScenarioIndex, currentScenario]);

  if (!currentScenario) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
        <p>No active scenario found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-grow justify-between py-2 px-1">
      {/* Top Status Bar */}
      <div className="flex flex-col border-b border-zinc-900 pb-4 mb-4 gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
              Scenario {currentScenarioIndex + 1} of {scenarios.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-850 px-2.5 py-0.5 rounded-full">
            <Award className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono font-bold text-zinc-300">
              Social Capital: {socialCapital}
            </span>
          </div>
        </div>
        {currentScenario.title && (
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider pl-1 mt-1">
            {currentScenario.title}
          </h2>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col justify-center my-auto space-y-6">
        {/* Setup card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/80 p-5 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-2xl"></div>
          <p className="text-zinc-200 text-sm leading-relaxed font-normal">
            {replaceName(currentScenario.setup)}
          </p>
        </div>

        {/* Trigger prompt */}
        <div className="flex items-start gap-3 bg-zinc-950 border border-indigo-950/40 p-4 rounded-xl">
          <div className="bg-indigo-950/80 p-1.5 rounded-lg border border-indigo-900/30 shrink-0 mt-0.5 animate-pulse">
            <Radio className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">Current Situation</h3>
            <p className="text-zinc-300 text-sm leading-snug font-medium">
              {replaceName(currentScenario.trigger)}
            </p>
          </div>
        </div>
      </div>

      {/* Action choices list */}
      <div className="mt-8 space-y-3">
        <h4 className="text-2xs uppercase tracking-widest text-zinc-500 font-bold px-1 mb-1">
          Select your response:
        </h4>
        {shuffledChoices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => chooseOption(choice.id)}
            className="w-full text-left bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 active:border-zinc-800 p-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 group flex items-start justify-between gap-4 cursor-pointer"
          >
            <span className="text-zinc-200 group-hover:text-white text-sm leading-relaxed font-medium transition-colors text-left">
              {replaceName(choice.text || choice.action)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
