import React, { useState } from 'react';
import { hybridData } from '../data/hybridData';
import { Cpu, Bookmark, ArrowUp, ShieldCheck, MessageSquareQuote } from 'lucide-react';

export default function HybridPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveBookmark(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveBookmark(null);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Project 2 Master Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {hybridData.title}
        </h1>
      </div>

      {/* Target Resume Bullet Point */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-blue-500/30 p-6 shadow-xl">
        <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Target Resume Point to Defend</span>
        </div>
        <p className="text-base sm:text-lg text-zinc-100 font-medium italic">
          "{hybridData.resumeBullet}"
        </p>
      </div>

      {/* 90-Second Interview Script Banner */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="w-5 h-5" />
            <span>Executive 90-Second Interview Defense Script (Word-for-Word)</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Timing: 90s
          </span>
        </div>
        <blockquote className="text-sm sm:text-base text-zinc-300 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
          {hybridData.executiveScript}
        </blockquote>
      </div>

      {/* Bookmarks Bar */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-md rounded-2xl border border-zinc-800 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Page Bookmarks (On-Page Only)</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => scrollToId('business-problem')}
            className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              activeBookmark === 'business-problem'
                ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                : 'bg-[#121214] text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            1. Core Business Problem
          </button>
          {hybridData.architectureSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => scrollToId(`step-${s.step}`)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                activeBookmark === `step-${s.step}`
                  ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                  : 'bg-[#121214] text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              Step {s.step}: {s.title.split(':')[0]}
            </button>
          ))}
          <button
            onClick={() => scrollToId('database-reality')}
            className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              activeBookmark === 'database-reality'
                ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                : 'bg-[#121214] text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            4. Database Reality
          </button>
          <button
            onClick={() => scrollToId('tradeoffs')}
            className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer font-semibold ${
              activeBookmark === 'tradeoffs'
                ? 'bg-indigo-500 text-white font-bold border-indigo-400'
                : 'bg-[#121214] text-indigo-300 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            5. Trade-Offs (Why This vs That)
          </button>
          <button
            onClick={() => scrollToId('edge-cases')}
            className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer font-semibold ${
              activeBookmark === 'edge-cases'
                ? 'bg-indigo-500 text-white font-bold border-indigo-400'
                : 'bg-[#121214] text-indigo-300 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            6. Edge Cases & Defense
          </button>
        </div>
      </div>

      {/* 1. Business Problem */}
      <div id="business-problem" className="scroll-mt-36 rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-lg">
        <h3 className="text-xl font-bold text-white">{hybridData.businessProblem.title}</h3>
        <p className="text-sm text-cyan-300 font-mono">{hybridData.businessProblem.subtitle}</p>
        <p className="text-sm sm:text-base text-zinc-300">{hybridData.businessProblem.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {hybridData.businessProblem.challenges.map((c, i) => (
            <div key={i} className="rounded-xl bg-black p-5 border border-zinc-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">{c.title}</h4>
              <p className="text-xs text-rose-300/90 leading-relaxed"><strong className="text-rose-400">Problem: </strong>{c.problem}</p>
              <p className="text-xs text-emerald-300/90 leading-relaxed"><strong className="text-emerald-400">Our Solution: </strong>{c.solution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">3. Step-by-Step Execution Flow</h3>
        {hybridData.architectureSteps.map((s, idx) => (
          <div key={idx} id={`step-${s.step}`} className="scroll-mt-36 rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white">Step {s.step}: {s.title}</h4>
              <button onClick={scrollToTop} className="text-zinc-500 hover:text-cyan-400">Top</button>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Database Reality */}
      <div id="database-reality" className="scroll-mt-36 rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 space-y-3">
        <h3 className="text-xl font-bold text-white">{hybridData.databaseReality.title}</h3>
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{hybridData.databaseReality.text}</p>
      </div>

      {/* Trade-Offs */}
      <div id="tradeoffs" className="scroll-mt-36 space-y-6 pt-6 border-t border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-white">5. Algorithmic Decisions & Trade-Offs</h2>
          <p className="text-sm text-zinc-400">Why this technology vs industry alternatives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hybridData.algorithmicTradeoffs.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">{item.component}</h3>
              <div className="rounded-xl bg-emerald-950/20 border border-emerald-800/40 p-3 text-xs sm:text-sm text-emerald-200">
                <strong className="text-emerald-400">Why Chosen: </strong>{item.whyChosen}
              </div>
              <div className="rounded-xl bg-rose-950/20 border border-rose-800/40 p-3 text-xs sm:text-sm text-rose-200">
                <strong className="text-rose-400">Why NOT Alternatives: </strong>{item.whyNotOthers}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge Cases Table */}
      <div id="edge-cases" className="scroll-mt-36 space-y-6 pt-6 border-t border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-white">6. The "Ifs, Buts, and Edge Cases" Interview Defense</h2>
          <p className="text-sm text-zinc-400">Word-for-word answers to tough interview challenges</p>
        </div>

        <div className="space-y-4">
          {hybridData.edgeCasesTable.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 space-y-3">
              <div className="text-sm font-bold text-cyan-300">
                <span className="text-cyan-500 font-mono mr-2">Q:</span>
                "{item.question}"
              </div>
              <div className="text-xs sm:text-sm text-zinc-200 pl-4 border-l-2 border-cyan-500/50 leading-relaxed">
                <span className="font-semibold text-zinc-300">Answer: </span>
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
