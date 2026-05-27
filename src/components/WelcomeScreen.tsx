import React from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Sparkles, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { startGame } = useGame();

  const [name, setName] = React.useState('');

  return (
    <div className="flex flex-col h-full flex-grow justify-between py-4 px-1 text-center">
      {/* Top Banner decoration */}
      <div className="flex justify-center mb-4 shrink-0">
        <div className="bg-indigo-950/30 border border-indigo-900/40 p-3 rounded-2xl animate-pulse-soft">
          <Shield className="w-10 h-10 text-indigo-400" />
        </div>
      </div>

      {/* Centered Scrollable Core Content */}
      <div className="flex-grow flex flex-col justify-center max-w-md mx-auto space-y-6 my-auto">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block">
            Phase One: Induction
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Welcome to the Next Level
          </h1>
        </div>

        <div className="space-y-4 text-zinc-300 text-sm leading-relaxed font-normal">
          <p>
            You made it through the interviews and landed the role. <strong className="text-white font-semibold">But let’s get one thing straight before we begin: this simulation is not about learning to "act corporate."</strong>
          </p>
          <p>
            Wearing a mask 9-to-5 is exhausting and unsustainable. Instead, this is about mastering the physics of human interaction. In college, you were graded on individual output. In the real world, whether in a boardroom, a relationship, or a community project, you are evaluated on a hidden metric: <strong className="text-indigo-400 font-semibold">Social Capital</strong>.
          </p>
          
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold pt-2">
            Every day, your actions do one of two things:
          </p>

          {/* Clean trust indicators grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-1">
            <div className="bg-zinc-900/50 border border-emerald-950/20 p-3.5 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Build Trust</span>
              </div>
              <p className="text-2xs text-zinc-400 leading-normal">
                You make things easier for the people around you, take ownership, and communicate clearly.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-rose-950/20 p-3.5 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-rose-400">
                <TrendingDown className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Burn Trust</span>
              </div>
              <p className="text-2xs text-zinc-400 leading-normal">
                You create unnecessary friction, hide your struggles, or let your ego dictate your reactions.
              </p>
            </div>
          </div>

          <div className="bg-indigo-950/15 border-l-4 border-l-amber-500/80 border-y border-r border-indigo-900/30 p-5 rounded-r-xl rounded-l-md space-y-2 text-center mt-4 shadow-[0_4px_25px_rgba(245,158,11,0.03)]">
            <div className="flex items-center justify-center gap-2 text-amber-400">
              <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Your Mission</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-normal">
              You are about to face a series of everyday pressure-tests. Your goal isn't to be "polite." Your goal is to choose the path that minimizes friction and builds Social Capital.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              These aren't just career hacks. They are the foundational skills for a high-functioning life. Let's see how you handle them.
            </p>
          </div>
        </div>
      </div>

      {/* Highlighted Name Input & Action CTA Button Sub-card */}
      <div className="mt-8 space-y-4 shrink-0 bg-zinc-950/60 border border-zinc-900/80 p-5 rounded-2xl shadow-xl max-w-md mx-auto w-full">
        <div className="space-y-2 text-left max-w-md mx-auto relative">
          <div className="flex items-center justify-between px-1">
            <label htmlFor="name-input" className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400">
              Induction Persona
            </label>
            {name.trim().length === 0 && (
              <span className="text-[9px] text-zinc-500 uppercase font-bold animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Required to begin
              </span>
            )}
          </div>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={25}
            className="w-full bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500/80 p-4 rounded-xl text-sm text-zinc-100 placeholder-zinc-750 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-center tracking-wide shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          />
        </div>

        <button
          onClick={() => startGame(name.trim())}
          disabled={name.trim().length === 0}
          className="w-full bg-zinc-100 hover:bg-white active:bg-zinc-200 text-zinc-950 font-semibold p-4 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 flex items-center justify-center gap-2 cursor-pointer group disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Initialize Simulation</span>
          <ArrowRight className="w-4 h-4 text-zinc-950 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
