import React, { useState } from 'react';
import { fashionData } from '../data/fashionData';
import { Bookmark, ArrowUp, ShieldCheck, MessageSquareQuote, Layers } from 'lucide-react';

export default function FashionPage() {
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
          <Layers className="w-3.5 h-3.5" />
          <span>Project 1 Master Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {fashionData.title}
        </h1>
      </div>

      {/* Target Resume Bullet Point */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-cyan-500/30 p-6 shadow-xl">
        <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Target Resume Bullet Point to Defend</span>
        </div>
        <p className="text-base sm:text-lg text-zinc-100 font-medium italic">
          "{fashionData.resumeBullet}"
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
        <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
          {fashionData.executiveScript}
        </blockquote>
      </div>

      {/* Page Bookmarks Bar */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-md rounded-2xl border border-zinc-800 p-4 shadow-2xl">
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
          {fashionData.overviewSteps.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToId(step.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                activeBookmark === step.id
                  ? 'bg-cyan-500 text-black font-bold border-cyan-400'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {step.title.split('.')[1] || step.title}
            </button>
          ))}
          <button
            onClick={() => scrollToId('fashion-deep-dives')}
            className="text-xs px-3 py-1.5 rounded-lg border bg-indigo-950/60 text-indigo-200 border-indigo-800 hover:bg-indigo-900 transition cursor-pointer font-semibold"
          >
            Technical Deep Dives (Bookmarked Terms)
          </button>
        </div>
      </div>

      {/* Main 10 Steps */}
      <div className="space-y-8">
        {fashionData.overviewSteps.map((step) => (
          <div
            key={step.id}
            id={step.id}
            className="scroll-mt-36 rounded-2xl bg-[#0a0a0c] border border-zinc-800 hover:border-zinc-700 p-6 sm:p-8 space-y-4 shadow-xl transition"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <button onClick={scrollToTop} className="text-zinc-500 hover:text-cyan-400">
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {step.points.map((pt, i) => (
                <div key={i} className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <strong className="text-cyan-300 font-semibold">{pt.label}: </strong>
                  <span>{pt.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dives */}
      <div id="fashion-deep-dives" className="scroll-mt-36 space-y-6 pt-6 border-t border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Bookmarked Technical Deep Dives</h2>
          <p className="text-sm text-zinc-400">Clickable interview defense for terms used in Fashion AI Copilot</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fashionData.deepDives.map((dive) => (
            <div
              key={dive.id}
              id={dive.id}
              className="scroll-mt-36 rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                  Concept
                </span>
                <button onClick={scrollToTop} className="text-xs text-zinc-500 hover:text-cyan-400">Top</button>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{dive.term}</h3>
              <p className="text-xs sm:text-sm text-cyan-200/90 font-medium">{dive.summary}</p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{dive.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
