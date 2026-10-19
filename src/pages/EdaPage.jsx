import React, { useState, useMemo } from 'react';
import { edaData, userBookmarks } from '../data/edaData';
import { BarChart3, Bookmark, ArrowUp, Search, Code2, Sparkles } from 'lucide-react';

export default function EdaPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredConcepts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return edaData.bookmarkedConcepts;
    return edaData.bookmarkedConcepts.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.badge.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.details.some((d) => d.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-semibold uppercase tracking-wider">
          <BarChart3 className="w-3 h-3" />
          <span>Data Science & Statistics Master Vault</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {edaData.title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          {edaData.subtitle}
        </p>
      </div>

      {/* 5-Stage Core Pipeline Overview Banner */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-cyan-500/30 p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Core End-to-End EDA Workflow</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
          {edaData.pipelineOverview.map((item) => (
            <div
              key={item.step}
              className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                  STAGE {item.step}
                </span>
                <h4 className="text-sm font-bold text-white mt-2">{item.name}</h4>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 leading-relaxed pt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bookmarked Technical Concepts Bar */}
      <div id="bookmarks-bar" className="space-y-6 pt-2">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Bookmark className="w-4 h-4 text-cyan-400" />
              <span>EDA Technical Bookmarks ({userBookmarks.length} Topics)</span>
            </div>
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search concepts or formulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            Click any concept bookmark to jump directly to its complete explanation, formulas, and Python code:
          </p>

          {/* Clickable Bookmark Badges with Alphabet-Change Comma Separators */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {userBookmarks.map((item, index) => {
              const getInitial = (str) => {
                if (!str) return '';
                const ch = str.trim().charAt(0).toUpperCase();
                return /[A-Z]/.test(ch) ? ch : '#';
              };
              const currentInitial = getInitial(item.label);
              const nextItem = userBookmarks[index + 1];
              const nextInitial = nextItem ? getInitial(nextItem.label) : null;
              const isAlphabetChange = nextInitial && currentInitial !== nextInitial;

              return (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => scrollToId(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border cursor-pointer ${
                      activeBookmark === item.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/10'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 ${activeBookmark === item.id ? 'text-cyan-400 fill-cyan-400' : 'text-cyan-400'}`} />
                    <span>{item.label}</span>
                  </button>
                  {isAlphabetChange && (
                    <span
                      aria-hidden="true"
                      className="self-center text-cyan-400 font-bold text-base px-1 select-none font-mono"
                    >
                      ,
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Detailed Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredConcepts.map((item) => (
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

              {/* Detail Points */}
              <ul className="space-y-2 pt-2 border-t border-zinc-800/80">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Code Snippet Box */}
              {item.code && (
                <div className="mt-3 pt-3 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mb-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Python Implementation:</span>
                  </div>
                  <pre className="text-[11px] font-mono text-cyan-200/90 bg-black/80 border border-zinc-800/90 p-3 rounded-lg overflow-x-auto leading-relaxed">
                    {item.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
