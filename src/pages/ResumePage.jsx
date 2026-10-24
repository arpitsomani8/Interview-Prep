import React, { useState } from 'react';
import { resumeData } from '../data/resumeData';
import { 
  Bookmark, 
  ArrowUp, 
  MessageSquareQuote, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Code2, 
  Check, 
  Copy,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';

export default function ResumePage() {
  const [activeBookmark, setActiveBookmark] = useState(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentIndex = activeBookmark 
    ? resumeData.bookmarkedConcepts.findIndex(b => b.id === activeBookmark) 
    : -1;
  const currentBookmarkObj = currentIndex >= 0 ? resumeData.bookmarkedConcepts[currentIndex] : null;
  const prevBookmark = currentIndex > 0 ? resumeData.bookmarkedConcepts[currentIndex - 1] : null;
  const nextBookmark = (currentIndex >= 0 && currentIndex < resumeData.bookmarkedConcepts.length - 1) 
    ? resumeData.bookmarkedConcepts[currentIndex + 1] 
    : null;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">

      {/* Target Resume Bullet Points Card */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-cyan-500/30 p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider font-mono">
            <FileText className="w-4 h-4" />
            <span>Target Resume Bullet Points to Defend</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            ReactJS + Flask Full-Stack
          </span>
        </div>
        <div className="space-y-2.5">
          {resumeData.resumeBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 90-Second Interview Script Banner */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="w-5 h-5" />
            <span>Executive 90-Second Interview Defense Script (Architecture & Workflow)</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Timing: 90s
          </span>
        </div>
        <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1 whitespace-pre-line">
          {resumeData.executiveScript}
        </blockquote>
      </div>

      {/* Real-World User Example & High-Level Execution Flow */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-emerald-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-World Execution Trace</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
              <span>Example Request:</span>
              <span className="text-emerald-400 font-mono text-xs sm:text-sm">{resumeData.userExample.query}</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-auto">
            Latency: {resumeData.userExample.latency}
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          {resumeData.userExample.description}
        </p>

        {/* Clean Line-by-Line Execution Flow */}
        <div className="rounded-xl bg-zinc-950/80 border border-zinc-800 divide-y divide-zinc-800/80 overflow-hidden">
          {resumeData.userExample.steps.map((st) => (
            <div
              key={st.step}
              className="p-4 sm:p-5 flex flex-col md:flex-row md:items-start gap-3 md:gap-5 hover:bg-zinc-900/30 transition"
            >
              <div className="flex items-center gap-2.5 md:w-56 shrink-0">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
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

        {/* Output Showcase */}
        <div className="p-4 rounded-xl bg-black border border-emerald-900/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Compilation Result:</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
              {resumeData.userExample.sampleOutput.details.http_status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-200">
            {resumeData.userExample.sampleOutput.responseMessage}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono text-zinc-400">
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">CANDIDATE:</span>
              <span className="text-white font-semibold">{resumeData.userExample.sampleOutput.details.user_name}</span>
            </div>
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">TEMPLATE:</span>
              <span className="text-cyan-400 font-semibold">{resumeData.userExample.sampleOutput.details.template}</span>
            </div>
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">FILE SIZE:</span>
              <span className="text-zinc-300 font-semibold">{resumeData.userExample.sampleOutput.details.pdf_size}</span>
            </div>
            <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">ATS READABILITY:</span>
              <span className="text-emerald-400 font-semibold">{resumeData.userExample.sampleOutput.details.ats_score.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Bookmarks Bar */}
      <div id="bookmarks-bar" className="scroll-mt-24 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
            <Bookmark className="w-4 h-4" />
            <span>Architecture & Engineering Concepts ({resumeData.bookmarkedConcepts.length})</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">Click to view concept</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {resumeData.bookmarkedConcepts.map((item) => (
            <button
              key={item.id}
              onClick={() => selectBookmark(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer border ${
                activeBookmark === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Concept Content Section: Hidden Initially until a Bookmark is Clicked */}
      <div id="active-content-section" className="space-y-4 scroll-mt-24 pt-2">
        {!activeBookmark && (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-8 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-cyan-500/60 mx-auto" />
            <h4 className="text-sm font-semibold text-zinc-300">Select an Engineering Concept Above</h4>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Click any of the {resumeData.bookmarkedConcepts.length} concepts above to inspect its full-stack implementation details and interview defense.
            </p>
          </div>
        )}

        {currentBookmarkObj && (
          <>
            {/* Active Topic Sticky Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950/90 border border-cyan-800/40 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                  Concept {currentIndex + 1} of {resumeData.bookmarkedConcepts.length}
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
              className="scroll-mt-24 rounded-2xl bg-[#0a0a0c] border border-cyan-500 shadow-cyan-500/20 p-6 sm:p-8 space-y-5 shadow-2xl transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 text-cyan-300 border border-zinc-800 uppercase font-semibold">
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

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentBookmarkObj.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400/90 font-medium italic bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-3 mt-2">
                  {currentBookmarkObj.summary}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                {currentBookmarkObj.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold mt-0.5 text-base leading-none">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Python Flask Backend Implementation Showcase */}
      {resumeData.codeSnippet && (
        <div className="rounded-2xl bg-[#0a0a0c] border border-cyan-500/30 p-6 sm:p-7 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
              <Code2 className="w-4 h-4" />
              <span>{resumeData.codeSnippet.title}</span>
            </div>
            <button
              onClick={() => handleCopyCode(resumeData.codeSnippet.code)}
              className="text-xs font-mono text-zinc-400 hover:text-cyan-300 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono text-cyan-200/90 bg-black/90 border border-zinc-800 p-4 rounded-xl overflow-x-auto leading-relaxed">
            {resumeData.codeSnippet.code}
          </pre>
        </div>
      )}

    </div>
  );
}
