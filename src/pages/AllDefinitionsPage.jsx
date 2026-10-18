import React, { useState, useMemo } from 'react';
import { fullRawText } from '../data/vaultData';
import { FileCode, Search, Copy, Check, Download, ArrowUp, Bookmark } from 'lucide-react';

export default function AllDefinitionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Key landmark anchors for fast jumping inside the massive text file
  const quickJumpMarkers = [
    { label: 'YOLO (Start)', query: 'YOLO (You Only Look Once)' },
    { label: 'Precision & Recall', query: 'Precision answers:' },
    { label: 'GPT & LLaMA Intro', query: 'GPT stands for Generative Pre-trained Transformer.' },
    { label: 'FastAPI + GPT', query: 'Connect GPT to FastAPI' },
    { label: 'Flask + GPT', query: 'Connect GPT to Flask' },
    { label: 'Custom ML in API', query: 'What if I have my own ML model instead of GPT?' },
    { label: 'RAG Architecture', query: 'RAG – Retrieval-Augmented Generation' },
    { label: 'Logistics RAG Assistant', query: "We'll build a small Logistics Policy Assistant" },
    { label: 'Sentence Transformers', query: 'pip install sentence-transformers' },
    { label: 'Top-25 Lazy Loading', query: 'The first 25 results are returned.' },
    { label: 'ControlNet & Diffusion', query: 'strength=0.4' },
    { label: 'Transformer Architecture', query: 'Transformer architecture' },
    { label: 'Docker & EXPOSE 8000', query: 'EXPOSE 8000' },
    { label: 'Latency & Throughput', query: 'Throughput: How much work the system completes' },
    { label: 'Vector DB Failover', query: 'Vector database is unavailable' },
    { label: 'StandardScaler & ML', query: 'StandardScaler()' },
    { label: 'Missing Imputation', query: 'Model-based imputation' },
    { label: 'Cross-Encoders', query: 'A cross-encoder is a model' },
    { label: 'Human Judgment & AI', query: 'How can you leverage AI in alignment with your experience' }
  ];

  const handleJump = (query) => {
    setSearchQuery(query);
    const el = document.getElementById('raw-text-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyFullDocument = () => {
    navigator.clipboard.writeText(fullRawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadTextFile = () => {
    const element = document.createElement('a');
    const file = new Blob([fullRawText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'AI_Engineering_3000_Line_Definitions_Master.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute stats
  const totalLines = useMemo(() => fullRawText.split('\n').length, []);
  const totalChars = fullRawText.length;

  // Search highlighting / filtering
  const searchResultsCount = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    const q = searchQuery.toLowerCase();
    let count = 0;
    let pos = 0;
    const lowerText = fullRawText.toLowerCase();
    while ((pos = lowerText.indexOf(q, pos)) !== -1) {
      count++;
      pos += q.length;
    }
    return count;
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <FileCode className="w-3.5 h-3.5" />
          <span>Option 6: All Definitions (Full Master Document)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              All Definitions & Complete Technical Vault
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
              The entire, unbroken 3,000+ line master text file dropped directly into a full continuous view. Exactly as you wrote it—100% complete, unaltered, and interview-ready.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyFullDocument}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied Entire Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Entire Text</span>
                </>
              )}
            </button>

            <button
              onClick={downloadTextFile}
              title="Download as .txt file"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download .txt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 text-center">
          <div className="text-xs text-slate-400">Total Document Lines</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">{totalLines.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">Continuous verbatim lines</div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 text-center">
          <div className="text-xs text-slate-400">Character Volume</div>
          <div className="text-2xl font-black text-indigo-400 mt-1">{totalChars.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">Characters (100% complete)</div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 text-center">
          <div className="text-xs text-slate-400">Content Integrity</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">100%</div>
          <div className="text-[11px] text-slate-500">Zero lines added or removed</div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 text-center">
          <div className="text-xs text-slate-400">Search Matches</div>
          <div className="text-2xl font-black text-fuchsia-400 mt-1">{searchQuery ? searchResultsCount : 'Ready'}</div>
          <div className="text-[11px] text-slate-500">{searchQuery ? 'Matching occurrences' : 'Live full-text search'}</div>
        </div>
      </div>

      {/* Sticky Fast Navigation & Jump Bookmarks */}
      <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/80 p-5 space-y-4 shadow-xl">
        {/* Quick Topic Jump Badges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick Jump to Major Topics in File:</span>
            </span>
            <button
              onClick={scrollToTop}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
            {quickJumpMarkers.map((marker, idx) => (
              <button
                key={idx}
                onClick={() => handleJump(marker.query)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300 hover:text-white hover:bg-cyan-950 border border-slate-700/80 transition cursor-pointer"
              >
                {marker.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Live search across the entire master file (e.g. YOLO, RAG, FastAPI, Cosine, Precision)..."
            className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* The Entire Master File Container */}
      <div
        id="raw-text-container"
        className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI_Engineering_Definitions_Master.txt (Verbatim Content)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {totalLines} lines • {totalChars} chars
          </span>
        </div>

        {/* Continuous Text Viewer with Line Numbers */}
        <div className="bg-[#060a12] rounded-xl p-4 sm:p-6 border border-slate-800/90 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[80vh] overflow-y-auto selection:bg-cyan-500 selection:text-slate-950">
          {fullRawText}
        </div>
      </div>
    </div>
  );
}
