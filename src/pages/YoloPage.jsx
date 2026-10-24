import React, { useState } from 'react';
import { yoloData } from '../data/yoloData';
import CodeHighlight from '../components/CodeHighlight';
import { Bookmark, ArrowUp, MessageSquareQuote, Sparkles, CheckCircle2, Code2 } from 'lucide-react';

export default function YoloPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);

  const selectBookmark = (id) => {
    if (activeBookmark === id) {
      setActiveBookmark(null);
      return;
    }
    setActiveBookmark(id);
    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById('active-content-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
  };

  const scrollToBookmarks = () => {
    const el = document.getElementById('bookmarks-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentIndex = activeBookmark 
    ? yoloData.bookmarkedConcepts.findIndex(b => b.id === activeBookmark) 
    : -1;
  const currentBookmarkObj = currentIndex >= 0 ? yoloData.bookmarkedConcepts[currentIndex] : null;
  const prevBookmark = currentIndex > 0 ? yoloData.bookmarkedConcepts[currentIndex - 1] : null;
  const nextBookmark = (currentIndex >= 0 && currentIndex < yoloData.bookmarkedConcepts.length - 1) 
    ? yoloData.bookmarkedConcepts[currentIndex + 1] 
    : null;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">

      {/* 90-Second Interview Script Banner */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="w-5 h-5" />
            <span>Executive 90-Second Interview Defense Script (Edge Computer Vision Pipeline)</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Timing: 90s
          </span>
        </div>
        <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1 whitespace-pre-line">
          {yoloData.executiveScript}
        </blockquote>
      </div>

      {/* Real-World User Example & High-Level Execution Flow */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-World Execution Trace</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
              <span>Real-World Incident:</span>
              <span className="text-amber-400 font-mono text-xs sm:text-sm">"{yoloData.userExample.query}"</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-auto">
            Total Pipeline Reaction Time: &lt; 25ms
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          {yoloData.userExample.description}
        </p>

        {/* Clean Line-by-Line Execution Flow */}
        <div className="rounded-xl bg-zinc-950/80 border border-zinc-800 divide-y divide-zinc-800/80 overflow-hidden">
          {yoloData.userExample.steps.map((st) => (
            <div
              key={st.step}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-start gap-3 md:gap-5 hover:bg-zinc-900/30 transition"
            >
              <div className="flex items-center gap-2.5 md:w-56 shrink-0">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Step {st.step}
                </span>
                <span className="text-sm font-bold text-white tracking-tight">
                  {st.stage}
                </span>
              </div>
              <div className="flex-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {st.text}
              </div>
              <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 shrink-0 self-start">
                {st.system}
              </div>
            </div>
          ))}
        </div>

        {/* Final Output & Audit Logging Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* Diverter Action Response */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Pneumatic Diverter Action & Physical Response</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/50 p-3.5 rounded-lg border border-zinc-800/80 italic">
              "{yoloData.userExample.sampleOutput.diverterAction}"
            </p>
          </div>

          {/* On-Premises PostgreSQL Record */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recorded in Local PostgreSQL (inspections table)</span>
            </div>
            <div className="text-xs font-mono bg-black/50 p-3.5 rounded-lg border border-zinc-800/80 space-y-1 text-zinc-300">
              <div><span className="text-zinc-500">Inspection ID:</span> <span className="text-white font-bold">{yoloData.userExample.sampleOutput.inspectionRecord.inspection_id}</span></div>
              <div><span className="text-zinc-500">Conveyor:</span> {yoloData.userExample.sampleOutput.inspectionRecord.conveyor_line}</div>
              <div><span className="text-zinc-500">Defect Detected:</span> <span className="text-amber-400 font-bold">{yoloData.userExample.sampleOutput.inspectionRecord.defect_class}</span></div>
              <div><span className="text-zinc-500">CPU Inference:</span> {yoloData.userExample.sampleOutput.inspectionRecord.inference_latency}</div>
              <div><span className="text-zinc-500">Total Reaction:</span> <span className="text-emerald-400 font-semibold">{yoloData.userExample.sampleOutput.inspectionRecord.diverter_latency}</span></div>
              <div><span className="text-zinc-500">Carrier Claim:</span> <span className="text-cyan-400">{yoloData.userExample.sampleOutput.inspectionRecord.carrier_claim}</span></div>
              <div><span className="text-zinc-500">Database Status:</span> <span className="text-emerald-400 font-bold">{yoloData.userExample.sampleOutput.inspectionRecord.database_status}</span></div>
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
            Click any concept bookmark below to view its technical breakdown and interview defense rationale:
          </p>

          {/* Clickable Bookmark Badges with Alphabet-Change Comma Separators */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {yoloData.bookmarkedConcepts.map((item, index) => {
              const getInitial = (str) => {
                if (!str) return '';
                const ch = str.trim().charAt(0).toUpperCase();
                return /[A-Z]/.test(ch) ? ch : '#';
              };
              const currentInitial = getInitial(item.title);
              const nextItem = yoloData.bookmarkedConcepts[index + 1];
              const nextInitial = nextItem ? getInitial(nextItem.title) : null;
              const isAlphabetChange = nextInitial && currentInitial !== nextInitial;

              return (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => selectBookmark(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 border cursor-pointer ${
                      activeBookmark === item.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${activeBookmark === item.id ? 'text-cyan-400 fill-cyan-400' : 'text-cyan-400'}`} />
                    <span>{item.title}</span>
                  </button>
                  {isAlphabetChange && (
                    <div
                      aria-hidden="true"
                      className="basis-full w-full h-2 border-b border-zinc-800/40 my-1"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Concept Content Section: Hidden Initially until a Bookmark is Clicked */}
        <div id="active-content-section" className="space-y-4 scroll-mt-24 pt-2">
          {!activeBookmark && (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-8 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-cyan-500/60 mx-auto" />
              <h4 className="text-sm font-semibold text-zinc-300">Select a Technical Bookmark Above</h4>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Click any of the {yoloData.bookmarkedConcepts.length} bookmarked architecture concepts above to reveal its detailed technical defense and implementation rationale.
              </p>
            </div>
          )}

          {currentBookmarkObj && (
            <>
              {/* Active Topic Sticky Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950/90 border border-cyan-800/40 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                    Concept {currentIndex + 1} of {yoloData.bookmarkedConcepts.length}
                  </span>
                  <span className="text-xs font-bold text-white font-mono truncate max-w-xs sm:max-w-md">
                    {currentBookmarkObj.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {prevBookmark && (
                    <button
                      onClick={() => selectBookmark(prevBookmark.id)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center gap-1 cursor-pointer"
                      title={`Previous: ${prevBookmark.title}`}
                    >
                      <span>← Prev</span>
                    </button>
                  )}
                  {nextBookmark && (
                    <button
                      onClick={() => selectBookmark(nextBookmark.id)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center gap-1 cursor-pointer"
                      title={`Next: ${nextBookmark.title}`}
                    >
                      <span>Next →</span>
                    </button>
                  )}
                  <button
                    onClick={scrollToBookmarks}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-400 hover:text-cyan-400 border border-zinc-800 transition flex items-center gap-1 cursor-pointer"
                    title="Jump to Bookmarks"
                  >
                    <span>Bookmarks ↑</span>
                  </button>
                  <button
                    onClick={() => setActiveBookmark(null)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-rose-950/50 text-xs font-mono text-zinc-400 hover:text-rose-400 border border-zinc-800 hover:border-rose-900 transition flex items-center gap-1 cursor-pointer"
                    title="Close Section"
                  >
                    <span>✕ Close</span>
                  </button>
                </div>
              </div>

              {/* ONLY Render Active Bookmark Card */}
              <div
                id={currentBookmarkObj.id}
                className="scroll-mt-24 rounded-2xl bg-[#0a0a0c] p-6 sm:p-8 space-y-5 shadow-2xl transition border border-cyan-500 shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-mono px-2.5 py-1 rounded-md bg-zinc-900 text-cyan-300 border border-zinc-800 font-semibold">
                    {currentBookmarkObj.badge}
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
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentBookmarkObj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400/90 font-medium italic bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-3">
                    {currentBookmarkObj.summary}
                  </p>
                </div>

                <ul className="space-y-3 pt-3 border-t border-zinc-800/80">
                  {currentBookmarkObj.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                      <span className="text-cyan-400 font-bold mt-0.5 text-base leading-none">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {currentBookmarkObj.code && (
                  <div className="pt-2 space-y-1.5 border-t border-zinc-800/80">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Implementation: {currentBookmarkObj.codeFilename || 'main.py'}</span>
                    </div>
                    <CodeHighlight code={currentBookmarkObj.code} filename={currentBookmarkObj.codeFilename || 'main.py'} showHeader={true} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
