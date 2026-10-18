import React, { useState, useMemo } from 'react';
import { categoryTags, vaultTopics, fullRawText } from '../data/vaultData';
import { BookOpen, Search, ArrowUp, Tag, Copy, Check, FileText, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';

export default function DefinitionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'continuous'
  const [expandedTopics, setExpandedTopics] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return vaultTopics.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all = {};
    filteredTopics.forEach((t) => { all[t.id] = true; });
    setExpandedTopics(all);
  };

  const collapseAll = () => {
    setExpandedTopics({});
  };

  const copyTopicContent = (item) => {
    navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyFullDocument = () => {
    navigator.clipboard.writeText(fullRawText);
    setCopiedId('full-doc');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete Technical Vault (3,000+ Lines Unaltered Knowledge Base)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Other Definitions & Master Concepts Vault
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
              100% of your personal study guide content preserved word-for-word in its original language. Organized by tags with instant filtering, live search, and full text export.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Topic Cards</span>
            </button>
            <button
              onClick={() => setViewMode('continuous')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'continuous'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Raw Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Fast-Filter & Search Bar */}
      <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/80 p-5 space-y-4 shadow-xl">
        {/* Category Filter Tags */}
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

        {/* Live Search & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Live search across all 3,000+ lines (e.g., YOLO, RAG, FastAPI, Cosine, Precision, LLaMA)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div className="flex items-center gap-2">
            {viewMode === 'cards' && (
              <>
                <button
                  onClick={expandAll}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                >
                  Collapse All
                </button>
              </>
            )}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 border border-slate-700 transition cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Count Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>
            Showing <strong className="text-cyan-400">{filteredTopics.length}</strong> topics in category <strong className="text-white">"{selectedCategory}"</strong>
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

      {/* Main Content: Card View vs Continuous Raw Text View */}
      {viewMode === 'cards' ? (
        <div className="space-y-6">
          {filteredTopics.map((item) => {
            const isExpanded = expandedTopics[item.id] !== false; // Default expanded for easy reading
            return (
              <div
                key={item.id}
                id={item.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 space-y-4 shadow-lg transition"
              >
                {/* Topic Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
                      {item.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyTopicContent(item)}
                      title="Copy complete topic text"
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
                          <span>Copy Topic</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Verbatim Topic Content */}
                {isExpanded && (
                  <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 font-mono text-xs sm:text-sm overflow-x-auto">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}

          {filteredTopics.length === 0 && (
            <div className="text-center py-16 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <p className="text-lg font-semibold text-slate-300">No topics found matching your criteria</p>
              <p className="text-xs text-slate-500">Try adjusting your search query or selecting "All" categories.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Continuous Unbroken Raw File View */
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Full Continuous Text File (All 7,145 Lines)</h2>
              <p className="text-xs text-slate-400">Complete, uninterrupted master text file exactly as you wrote it</p>
            </div>
            <button
              onClick={copyFullDocument}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow transition cursor-pointer"
            >
              {copiedId === 'full-doc' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied Entire Document!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Entire Document</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[75vh] overflow-y-auto">
            {fullRawText}
          </div>
        </div>
      )}
    </div>
  );
}
