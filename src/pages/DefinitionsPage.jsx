import React, { useState, useMemo } from 'react';
import { categoryTags, definitionsData } from '../data/definitionsData';
import { BookOpen, Search, ArrowUp, Tag, Sparkles, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function DefinitionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const filteredDefinitions = useMemo(() => {
    return definitionsData.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.interviewTip && item.interviewTip.toLowerCase().includes(q)) ||
        (item.keyPoints && item.keyPoints.some(b => b.toLowerCase().includes(q)));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const copyTip = (item) => {
    const textToCopy = `Topic: ${item.title}\n\nDefinition: ${item.definition}\n\nInterview Tip: ${item.interviewTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Concept Vault (3,000+ Lines Knowledge Base)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Comprehensive Technical Definitions & Interview Flashcards
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
          All core machine learning, computer vision, RAG, and MLOps topics from your 3,000+ lines vault. Use the category tags and instant search to rapidly review answers during interview preparation.
        </p>
      </div>

      {/* Filter Tags & Search */}
      <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/80 p-5 space-y-4 shadow-xl">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mr-2">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast Filter:</span>
          </span>
          {categoryTags.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold border-cyan-400 shadow-sm shadow-cyan-500/30'
                  : 'bg-slate-800/90 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, algorithms, tips (e.g. YOLO, Cosine, LightGBM, RAG, Drift)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>
          <button
            onClick={scrollToTop}
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 border border-slate-700 transition cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>
            Showing <strong className="text-cyan-400">{filteredDefinitions.length}</strong> topics in category <strong className="text-white">"{selectedCategory}"</strong>
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {filteredDefinitions.map((item) => {
          const isExpanded = expandedCard === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 space-y-4 shadow-lg transition"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyTip(item)}
                    title="Copy concept and interview tip"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-cyan-300 border border-slate-700 transition cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Concept</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-cyan-400 hover:bg-slate-700 transition cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less' : 'More'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Definition */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {item.definition}
              </p>

              {/* Key Points */}
              {item.keyPoints && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                  {item.keyPoints.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Interview Tip */}
              {item.interviewTip && (
                <div className="rounded-xl bg-slate-950 border border-cyan-900/40 p-4 space-y-1">
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Interview Defense Angle:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-cyan-500 pl-3">
                    "{item.interviewTip}"
                  </p>
                </div>
              )}

              {/* Code Snippet */}
              {isExpanded && item.codeSnippet && (
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Code / Architecture Reference:
                  </div>
                  <div className="text-xs sm:text-sm text-cyan-300 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto">
                    <pre>{item.codeSnippet}</pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
