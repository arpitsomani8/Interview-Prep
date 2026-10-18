import React, { useState } from 'react';
import { fashionData } from '../data/fashionData';
import { ShieldCheck, MessageSquareQuote, Layers, Bookmark, ArrowUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FashionPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveBookmark(id);
    }
  };

  const scrollToBookmarks = () => {
    const el = document.getElementById('bookmarks-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">
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

      {/* 90-Second Interview Script Banner (AI/ML Model Flow First) */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="w-5 h-5" />
            <span>Executive 90-Second Interview Defense Script (End-to-End Architecture Flow)</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Timing: 90s
          </span>
        </div>
        <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1 whitespace-pre-line">
          {fashionData.executiveScript}
        </blockquote>
      </div>

      {/* Real-World User Example & High-Level Execution Flow */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-pink-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-World Execution Trace</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Example Query:</span>
              <span className="text-pink-400 font-mono">"{fashionData.userExample.query}"</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-auto">
            Total Pipeline Latency: &lt; 200ms
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          {fashionData.userExample.description}
        </p>

        {/* 6 Sequential Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fashionData.userExample.steps.map((st) => (
            <div
              key={st.step}
              className="rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-5 space-y-3 hover:border-pink-500/40 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30">
                    STEP {st.step}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {st.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {st.title}
                </h3>
                <div className="text-xs text-pink-300/90 font-medium">
                  {st.system}
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {st.action}
                </p>
              </div>

              <div className="pt-2.5 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-400 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-zinc-900">
                <span className="text-zinc-500 font-bold block mb-1">Under the Hood:</span>
                {st.technicalDetail}
              </div>
            </div>
          ))}
        </div>

        {/* Final Output & Order Placement Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* GPT-4o Response */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Grounded GPT-4o Answer to Retailer</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/50 p-3.5 rounded-lg border border-zinc-800/80 italic">
              "{fashionData.userExample.sampleOutput.aiResponse}"
            </p>
          </div>

          {/* PostgreSQL Order Record */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Order Created in PostgreSQL (orders table)</span>
            </div>
            <div className="text-xs font-mono bg-black/50 p-3.5 rounded-lg border border-zinc-800/80 space-y-1 text-zinc-300">
              <div><span className="text-zinc-500">Order ID:</span> <span className="text-white font-bold">{fashionData.userExample.sampleOutput.orderRecord.order_id}</span></div>
              <div><span className="text-zinc-500">Buyer:</span> {fashionData.userExample.sampleOutput.orderRecord.retailer_id}</div>
              <div><span className="text-zinc-500">Item:</span> {fashionData.userExample.sampleOutput.orderRecord.product_id} (Pink Crewneck)</div>
              <div><span className="text-zinc-500">Sizes:</span> {fashionData.userExample.sampleOutput.orderRecord.breakdown}</div>
              <div><span className="text-zinc-500">Total:</span> <span className="text-emerald-400 font-bold">{fashionData.userExample.sampleOutput.orderRecord.total_units} units ({fashionData.userExample.sampleOutput.orderRecord.total_value})</span></div>
              <div><span className="text-zinc-500">Status:</span> <span className="text-emerald-400 font-bold">{fashionData.userExample.sampleOutput.orderRecord.status}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Technical Concepts & Interview Defense */}
      <div id="bookmarks-bar" className="space-y-6 pt-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Bookmarked Technical Concepts & Interview Defense</span>
          </div>
          <p className="text-sm text-zinc-400">
            Click any concept bookmark below to jump directly to its technical breakdown and interview defense rationale:
          </p>

          {/* Clickable Bookmark Badges */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {fashionData.bookmarkedConcepts.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 border cursor-pointer ${
                  activeBookmark === item.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${activeBookmark === item.id ? 'text-cyan-400 fill-cyan-400' : 'text-cyan-400'}`} />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fashionData.bookmarkedConcepts.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={`scroll-mt-24 rounded-2xl bg-[#0a0a0c] p-6 sm:p-7 space-y-4 shadow-xl transition flex flex-col justify-between border ${
                activeBookmark === item.id
                  ? 'border-cyan-500 shadow-cyan-500/10'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-mono px-2.5 py-1 rounded-md bg-zinc-900 text-cyan-300 border border-zinc-800 font-semibold">
                    {item.badge}
                  </span>
                  <button
                    onClick={scrollToBookmarks}
                    className="text-xs font-mono text-zinc-500 hover:text-cyan-400 transition flex items-center gap-1 cursor-pointer"
                    title="Back to Bookmarks"
                  >
                    <span>Top</span>
                    <ArrowUp className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400/90 font-medium italic bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-2.5">
                  {item.summary}
                </p>
              </div>

              <ul className="space-y-2.5 pt-3 border-t border-zinc-800/80">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

