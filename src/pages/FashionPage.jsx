import React, { useState } from 'react';
import { fashionData } from '../data/fashionData';
import CodeHighlight from '../components/CodeHighlight';
import { 
  Bookmark, 
  ArrowUp, 
  MessageSquareQuote, 
  Sparkles, 
  Code2, 
  Check, 
  Copy 
} from 'lucide-react';

const KEYWORD_REGEX = /(\bFirst,|\bSecond,|\bThird,|\bAzure Blob Storage\b|\bCDN URLs\b|\bCDN\b|\bPostgreSQL\b|\bChromaDB\b|\bFastAPI\b|\bAzure Key Vault\b|\bmanaged identity\b|\bprivate networking\b|\bAPI Management\b|\bApplication Gateway\b|\bWeb Application Firewall\b|\bAzure AI Vision’s multimodal embeddings API\b|\bAzure AI Vision\b|\bvectorizeImage\b|\bvectorizeText\b|\bmultimodal late vector fusion\b|\bmultimodal retrieval\b|\bL2 normalization\b|\bcosine distance metric\b|\bcosine distance\b|\bBM25 keyword retrieval\b|\bBM25\b|\bReciprocal Rank Fusion\b|\bRRF\b|\bAzure OpenAI GPT-4o\b|\bGPT-4o\b|\bLangChain\b|\bLangGraph\b|\btop[‑\-]5 candidate products\b|\btop[‑\-]5 product context\b|\btop[‑\-]5\b|\blazy loading\b|\bfirst 25 products\b|\bStable Diffusion XL\b|\bControlNet\b|\bSAM\b|\bOCR\b)/gi;

function getKeywordStyle(kw) {
  const lower = kw.toLowerCase();
  if (lower.startsWith('first') || lower.startsWith('second') || lower.startsWith('third')) {
    return 'text-cyan-400 font-bold';
  }
  if (lower === 'azure blob storage' || lower === 'cdn' || lower === 'cdn urls') {
    return 'text-cyan-300 font-semibold';
  }
  if (lower === 'postgresql') {
    return 'text-sky-300 font-semibold';
  }
  if (lower === 'chromadb' || lower.includes('cosine distance')) {
    return 'text-purple-300 font-semibold';
  }
  if (lower.includes('vectorizeimage') || lower.includes('vectorizetext')) {
    return 'text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 font-mono px-1.5 py-0.5 rounded text-[11px] inline-block';
  }
  if (lower.includes('azure ai vision') || lower === 'multimodal retrieval') {
    return 'text-teal-300 font-semibold';
  }
  if (lower.includes('multimodal late vector fusion')) {
    return 'text-fuchsia-300 font-semibold';
  }
  if (lower.includes('l2 normalization')) {
    return 'text-rose-300 font-semibold';
  }
  if (lower.includes('bm25') || lower.includes('reciprocal rank fusion') || lower === 'rrf') {
    return 'text-amber-300 font-semibold';
  }
  if (lower.includes('top-5') || lower.includes('top‑5')) {
    return 'text-emerald-300 font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded text-xs inline-block';
  }
  if (lower.includes('gpt-4o') || lower.includes('azure openai')) {
    return 'text-indigo-300 font-semibold';
  }
  if (lower.includes('langchain') || lower.includes('langgraph')) {
    return 'text-blue-300 font-semibold';
  }
  if (lower.includes('lazy loading') || lower.includes('first 25 products')) {
    return 'text-amber-300 font-semibold';
  }
  if (lower === 'fastapi' || lower.includes('managed identity') || lower.includes('azure key vault') || lower.includes('private networking') || lower.includes('web application firewall') || lower.includes('api management') || lower.includes('application gateway')) {
    return 'text-cyan-300 font-semibold';
  }
  if (lower.includes('stable diffusion xl') || lower.includes('controlnet') || lower === 'sam') {
    return 'text-rose-300 font-semibold';
  }
  if (lower === 'ocr') {
    return 'text-teal-300 font-mono font-semibold';
  }
  return 'text-cyan-300 font-semibold';
}

function HighlightedText({ text }) {
  const parts = text.split(KEYWORD_REGEX);
  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;
        if (idx % 2 === 1) {
          const style = getKeywordStyle(part);
          if (part.toLowerCase().includes('vectorize')) {
            return (
              <code key={idx} className={style}>
                {part}
              </code>
            );
          }
          return (
            <span key={idx} className={style}>
              {part}
            </span>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}

export default function FashionPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fashionData.executiveScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

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
    ? fashionData.bookmarkedConcepts.findIndex(b => b.id === activeBookmark) 
    : -1;
  const currentBookmarkObj = currentIndex >= 0 ? fashionData.bookmarkedConcepts[currentIndex] : null;
  const prevBookmark = currentIndex > 0 ? fashionData.bookmarkedConcepts[currentIndex - 1] : null;
  const nextBookmark = (currentIndex >= 0 && currentIndex < fashionData.bookmarkedConcepts.length - 1) 
    ? fashionData.bookmarkedConcepts[currentIndex + 1] 
    : null;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">

      {/* Hero Header & Resume Summary */}
      <div className="rounded-2xl bg-gradient-to-b from-[#0d0d14] via-[#0a0a0f] to-[#08080c] border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Production Interview Project Showcase</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {fashionData.title}
            </h1>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 self-start md:self-auto font-semibold">
            Catalog: 10,000+ Apparel Designs
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-xl">
          <strong className="text-cyan-400 font-mono uppercase text-xs block mb-1">Resume Architecture Summary:</strong>
          {fashionData.resumeBullet}
        </p>
      </div>

      {/* Interview Project Explanation (The Paragraphs) */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/40 p-6 sm:p-8 space-y-6 shadow-xl relative">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider font-mono">
            <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
            <span>Executive 90-Second Interview Defense Script</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              Timing: ~90s
            </span>
            <button
              onClick={handleCopyScript}
              className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-700 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Copy entire interview defense script"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Copied Script!' : 'Copy Script'}</span>
            </button>
          </div>
        </div>

        {/* Structured Sections with Colorful Titles and Highlighted Keywords */}
        <div className="space-y-6">
          {fashionData.executiveSections.map((sec) => (
            <div key={sec.id} className="space-y-3">
              {sec.title && (
                <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
                  <h3 className={`text-base sm:text-lg font-bold font-mono tracking-tight ${sec.accentColor}`}>
                    {sec.title}
                  </h3>
                  {sec.badge && (
                    <span className={`text-[10px] sm:text-xs font-mono px-2.5 py-0.5 rounded-full border ${sec.bgBadge}`}>
                      {sec.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="space-y-2.5">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    <HighlightedText text={p} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concept Bookmarks Bar (Sticky) */}
      <div id="bookmarks-bar" className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Deep-Dive Concept Bookmarks ({fashionData.bookmarkedConcepts.length} Specialized Topics)</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {fashionData.bookmarkedConcepts.length} Technical Cards
          </span>
        </div>

        {/* Horizontal Scrollable Bookmarks Ribbon */}
        <div className="flex flex-wrap gap-2 pt-1">
          {fashionData.bookmarkedConcepts.map((item) => {
            const isActive = activeBookmark === item.id;
            return (
              <button
                key={item.id}
                onClick={() => selectBookmark(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Definition Content Section */}
        <div id="active-content-section" className="space-y-4 pt-4">
          {currentBookmarkObj && (
            <>
              {/* Prev / Next & Status Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-cyan-400 font-bold">Active Concept:</span>
                  <span className="text-white font-semibold">{currentBookmarkObj.title}</span>
                  <span className="text-zinc-600">({currentIndex + 1} of {fashionData.bookmarkedConcepts.length})</span>
                </div>

                <div className="flex items-center gap-1.5">
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

                {/* 360° Multi-View Workflow Steps */}
                {currentBookmarkObj.workflowSteps && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                      360° Multi-View Synthesis Workflow (3 Steps)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      {currentBookmarkObj.workflowSteps.map((ws, wIdx) => (
                        <div key={wIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                          <div className="text-xs font-bold text-cyan-300 font-mono">{ws.step}</div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">{ws.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
