import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, ArrowRight, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export const FeedbackScreen: React.FC = () => {
  const { 
    selectedChoice, 
    socialCapital, 
    advanceScenario, 
    currentScenarioIndex, 
    scenarios,
    userName
  } = useGame();

  const replaceName = (text: string | undefined): string => {
    if (!text) return '';
    return text.replace(/\[Name\]/g, userName);
  };

  if (!selectedChoice) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
        <p>No selection found.</p>
      </div>
    );
  }

  const isPositive = selectedChoice.capitalModifier > 0;
  const isNegative = selectedChoice.capitalModifier < 0;
  const modifierColor = isPositive 
    ? 'text-emerald-400 border-emerald-950/40 bg-emerald-950/20' 
    : isNegative 
      ? 'text-rose-400 border-rose-950/40 bg-rose-950/20' 
      : 'text-zinc-400 border-zinc-900 bg-zinc-900/50';

  const isLastScenario = currentScenarioIndex === scenarios.length - 1;

  return (
    <div className="flex flex-col h-full flex-grow justify-between py-2 px-1">
      {/* Top Banner */}
      <div className="border-b border-zinc-800 pb-4 mb-4 text-center">
        <span className="text-2xs uppercase tracking-widest font-bold text-zinc-500">
          Result Analysis
        </span>
      </div>

      <div className="flex-grow flex flex-col justify-center space-y-6">
        {/* Selected Action recap */}
        <div className="border-l-2 border-zinc-700 pl-4 py-1 text-left">
          <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-1">
            Your Action {selectedChoice.label ? `— ${selectedChoice.label}` : ''}
          </p>
          <p className="text-zinc-300 text-sm italic">
            {replaceName(selectedChoice.text || selectedChoice.action)}
          </p>
        </div>

        {/* Capital Modifier Notification */}
        <div className={`border p-4 rounded-xl flex items-center justify-between ${modifierColor}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg shrink-0 bg-black/30 border border-current/10">
              {isPositive ? (
                <ArrowUpRight className="w-5 h-5" />
              ) : isNegative ? (
                <ArrowDownRight className="w-5 h-5" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Social Capital</p>
              <p className="text-sm font-semibold">
                {isPositive ? 'Increased' : isNegative ? 'Decreased' : 'Unchanged'}
              </p>
            </div>
          </div>
          <span className="text-xl font-mono font-black pr-2">
            {isPositive ? '+' : ''}{selectedChoice.capitalModifier}
          </span>
        </div>

        {/* Feedback Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl shadow-lg space-y-4">
          <div>
            <span className="text-2xs uppercase tracking-widest font-bold text-zinc-500 block mb-1">Outcome</span>
            <p className="text-zinc-200 text-sm leading-relaxed">
              {replaceName(selectedChoice.feedback)}
            </p>
          </div>

          {/* Skill learned badge */}
          {selectedChoice.skill && (
            <div className="border-t border-zinc-800/80 pt-4 flex items-start gap-3">
              <div className="bg-amber-950/20 border border-amber-900/40 p-1.5 rounded-lg shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <span className="text-2xs uppercase tracking-widest font-bold text-amber-400 block mb-0.5">Key Strategy</span>
                <p className="text-zinc-300 text-xs font-medium leading-normal">
                  {selectedChoice.skill}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Current Total Capital Panel */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 flex items-center justify-between">
          <span className="text-xs text-zinc-400 font-medium">Updated Social Capital Score</span>
          <span className="text-sm font-mono font-bold text-zinc-100 bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800">
            {socialCapital} pts
          </span>
        </div>
      </div>

      {/* Advance Button */}
      <div className="mt-8">
        <button
          onClick={advanceScenario}
          className="w-full bg-zinc-100 hover:bg-white active:bg-zinc-200 text-zinc-950 font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>{isLastScenario ? 'View Summary' : 'Next Scenario'}</span>
          <ArrowRight className="w-4 h-4 text-zinc-950 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
