import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { RefreshCw, Key, CheckCircle, ArrowLeft, Sparkles, Trophy, AlertCircle, ShieldAlert } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const CompletionScreen: React.FC = () => {
  const { socialCapital, resetGame, scenarios, userName } = useGame();
  const [showRedoNudge, setShowRedoNudge] = useState<boolean>(false);
  const [showIdealPath, setShowIdealPath] = useState<boolean>(false);

  useEffect(() => {
    const saveScore = async () => {
      try {
        const { error } = await supabase
          .from('simulation_scores')
          .insert([{ name: userName || 'Anonymous', score: socialCapital }]);
        if (error) throw error;
        console.log('Simulation score persisted successfully!');
      } catch (err) {
        console.error('Error persisting simulation score to Supabase:', err);
      }
    };
    saveScore();
  }, []);

  // Helper to intercept dynamic [Name] string placeholder in text
  const replaceName = (text: string | undefined): string => {
    if (!text) return '';
    return text.replace(/\[Name\]/g, userName);
  };

  // Define dynamic top icon based on socialCapital score
  const renderScoreIcon = () => {
    const iconSizeClass = "w-12 h-12";
    if (socialCapital >= 8) {
      return (
        <div className="p-5 rounded-full border border-emerald-950/40 bg-emerald-950/10 inline-flex items-center justify-center animate-bounce duration-1000">
          <Trophy className={`${iconSizeClass} text-emerald-400`} />
        </div>
      );
    } else if (socialCapital >= 4) {
      return (
        <div className="p-5 rounded-full border border-amber-950/40 bg-amber-950/10 inline-flex items-center justify-center animate-pulse">
          <AlertCircle className={`${iconSizeClass} text-amber-400`} />
        </div>
      );
    } else {
      return (
        <div className="p-5 rounded-full border border-rose-950/40 bg-rose-950/10 inline-flex items-center justify-center animate-pulse">
          <ShieldAlert className={`${iconSizeClass} text-rose-400`} />
        </div>
      );
    }
  };

  const handleViewIdealPath = () => {
    if (socialCapital >= 8) {
      setShowIdealPath(true);
    } else {
      setShowRedoNudge(true);
    }
  };

  // Standard Score View
  if (!showRedoNudge && !showIdealPath) {
    return (
      <div className="flex flex-col h-full flex-grow justify-between py-2 px-1 text-center">
        {/* Top Banner */}
        <div className="border-b border-zinc-800 pb-4 mb-4">
          <span className="text-2xs uppercase tracking-widest font-bold text-zinc-500">
            Simulation Complete
          </span>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center space-y-6 my-auto">
          {/* Dynamic Top Score Icon */}
          {renderScoreIcon()}

          {/* Final Score */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Final Assessment</h2>
            <h1 className="text-5xl font-black tracking-tight text-white font-sans mt-1">
              {socialCapital} <span className="text-zinc-500 font-light text-xl">/ 10</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400 font-sans pt-1">
              Social Capital Score
            </p>
          </div>

          {/* Custom review paragraph */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl max-w-sm">
            <p className="text-zinc-300 text-sm leading-relaxed">
              {socialCapital >= 5 
                ? `Excellent performance, ${userName || 'Node'}. You demonstrated highly active signal calibration and prioritized collaborative team trust.`
                : `Simulation complete, ${userName || 'Node'}. Your choices revealed opportunities to improve operational alignment and active corporate listening.`
              }
            </p>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleViewIdealPath}
            className="w-full bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 active:border-zinc-800 text-white font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Key className="w-4 h-4 text-indigo-400" />
            <span>View Ideal Path</span>
          </button>

          <button
            onClick={resetGame}
            className="w-full bg-zinc-100 hover:bg-white active:bg-zinc-200 text-zinc-950 font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <RefreshCw className="w-4 h-4 text-zinc-950 transition-transform group-hover:rotate-45" />
            <span>Restart Simulation</span>
          </button>
        </div>

        {/* Highlighted Simulation Takeaway */}
        <div className="mt-8 bg-indigo-950/15 border-l-4 border-l-indigo-500 border-y border-r border-indigo-900/30 p-5 rounded-r-xl rounded-l-md text-left shrink-0 shadow-[0_4px_25px_rgba(99,102,241,0.03)]">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest block">
              Simulation Takeaway
            </span>
          </div>
          <p className="text-zinc-200 text-sm leading-relaxed font-normal">
            Notice the pattern? The optimal choices have nothing to do with corporate compliance or being submissive. They are about managing your ego, communicating with extreme clarity, and protecting the focus of the people around you. Master these protocols here, and you will find they eliminate friction in every other area of your life.
          </p>
        </div>
      </div>
    );
  }

  // The Nudge UI
  if (showRedoNudge && !showIdealPath) {
    return (
      <div className="flex flex-col h-full flex-grow justify-between py-2 px-1 text-center">
        {/* Top Banner */}
        <div className="border-b border-zinc-800 pb-4 mb-4">
          <span className="text-2xs uppercase tracking-widest font-bold text-zinc-500">
            Growth Advisory
          </span>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center space-y-6 my-auto max-w-sm mx-auto">
          {/* Circle Alert */}
          <div className="p-4 rounded-full border border-amber-950/40 bg-amber-950/10 inline-flex items-center justify-center animate-pulse">
            <RefreshCw className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 pl-1">Iterative Improvement</h2>
            <p className="text-zinc-200 text-sm leading-relaxed font-normal">
              You scored {socialCapital}/10. In the professional world, growth comes from iteration. We highly encourage you to run the simulation again to deduce the optimal paths before looking at the answer key.
            </p>
          </div>
        </div>

        {/* Nudge Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={resetGame}
            className="w-full bg-zinc-100 hover:bg-white active:bg-zinc-200 text-zinc-950 font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Try Again (Recommended)</span>
          </button>

          <button
            onClick={() => setShowIdealPath(true)}
            className="w-full bg-zinc-950 hover:bg-zinc-900 active:bg-zinc-950 border border-zinc-900 hover:border-zinc-800 active:border-zinc-900 text-zinc-400 hover:text-zinc-300 text-xs font-semibold p-3.5 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer"
          >
            <span>Show Answers Anyway</span>
          </button>
        </div>
      </div>
    );
  }

  // The Ideal Path UI
  return (
    <div className="flex flex-col h-full flex-grow justify-between py-2 px-1">
      {/* Top Banner */}
      <div className="border-b border-zinc-900 pb-4 mb-4 flex items-center justify-between">
        <button 
          onClick={() => {
            setShowIdealPath(false);
            setShowRedoNudge(false);
          }}
          className="flex items-center gap-1 text-2xs uppercase tracking-widest font-bold text-zinc-500 hover:text-zinc-400 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-2xs uppercase tracking-widest font-bold text-zinc-500">
          Ideal Decision Matrix
        </span>
      </div>

      {/* Scannable Scenarios List */}
      <div className="flex-grow overflow-y-auto space-y-5 pr-1 py-2">
        {scenarios.map((scenario, index) => {
          // Find the perfect choice with modifier === 2
          const idealChoice = scenario.choices.find(c => c.capitalModifier === 2);

          return (
            <div 
              key={scenario.id} 
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl relative overflow-hidden flex flex-col"
            >
              {/* Green indicator bar on left */}
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>

              {/* Protocol Header */}
              <div className="flex items-center justify-between border-b border-zinc-850 px-5 py-3.5 bg-zinc-900/30">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                    Protocol {index + 1}
                  </span>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider mt-0.5">
                    {scenario.title || `Scenario ${index + 1}`}
                  </h3>
                </div>
                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-950/30 self-center">
                  +2 pts
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Context Block (Setup and Trigger) */}
                <div className="space-y-2 text-left bg-zinc-950/40 border border-zinc-850/30 p-3.5 rounded-xl">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest block mb-0.5">Situation</span>
                    <p className="text-zinc-300 text-xs leading-relaxed font-normal">
                      {replaceName(scenario.setup)}
                    </p>
                  </div>
                  <div className="border-t border-zinc-850/30 pt-2">
                    <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest block mb-0.5">Trigger</span>
                    <p className="text-zinc-300 text-xs font-semibold leading-relaxed">
                      {replaceName(scenario.trigger)}
                    </p>
                  </div>
                </div>

                {/* Optimal Decision & Strategy Block */}
                {idealChoice ? (
                  <div className="space-y-3 pt-1">
                    {/* Decision Text */}
                    <div className="text-left bg-emerald-950/5 border border-emerald-950/20 p-3.5 rounded-xl space-y-1.5">
                      <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-widest block">Optimal Decision</span>
                      <p className="text-zinc-200 text-xs font-medium leading-relaxed italic border-l-2 border-emerald-500/50 pl-3">
                        {replaceName(idealChoice.text || idealChoice.action)}
                      </p>
                    </div>

                    {/* Underlying Skill */}
                    <div className="flex items-start gap-3 text-left pl-1">
                      <div className="bg-emerald-950/30 border border-emerald-900/30 p-1.5 rounded-lg shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block mb-0.5">Key Strategy</span>
                        <p className="text-zinc-400 text-xs leading-relaxed font-normal">
                          {idealChoice.skill}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-zinc-500 text-xs italic text-left pl-1">No ideal option mapped for this scenario.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Done / Reset Button */}
      <div className="mt-8 shrink-0">
        <button
          onClick={resetGame}
          className="w-full bg-zinc-100 hover:bg-white active:bg-zinc-200 text-zinc-950 font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <RefreshCw className="w-4 h-4 text-zinc-950 transition-transform group-hover:rotate-45" />
          <span>Restart Simulation</span>
        </button>
      </div>

      {/* Highlighted Simulation Takeaway */}
      <div className="mt-8 bg-indigo-950/15 border-l-4 border-l-indigo-500 border-y border-r border-indigo-900/30 p-5 rounded-r-xl rounded-l-md text-left shrink-0 shadow-[0_4px_25px_rgba(99,102,241,0.03)]">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
          <span className="text-[10px] uppercase font-extrabold tracking-widest block">
            Simulation Takeaway
          </span>
        </div>
        <p className="text-zinc-200 text-sm leading-relaxed font-normal">
          Notice the pattern? The optimal choices have nothing to do with corporate compliance or being submissive. They are about managing your ego, communicating with extreme clarity, and protecting the focus of the people around you. Master these protocols here, and you will find they eliminate friction in every other area of your life.
        </p>
      </div>
    </div>
  );
};
