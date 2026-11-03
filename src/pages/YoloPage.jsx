import React, { useState } from 'react';
import { yoloData } from '../data/yoloData';
import CodeHighlight from '../components/CodeHighlight';
import { 
  Bookmark, 
  ArrowUp, 
  MessageSquareQuote, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  Check, 
  Copy 
} from 'lucide-react';

const YOLO_KEYWORD_REGEX = /(\bOpenCV\b|\bNumPy\b|\bletterbox resizing and padding\b|\bletterbox resizing\b|\bYOLO-based object detection model\b|\bYOLO-based\b|\bYOLO\b|\bIntact:\b|\bTorn or damaged:\b|\bOpen:\b|\bMissing label:\b|\bONNX\b|\bDeepSparse\b|\bNon-Maximum Suppression \(NMS\)\b|\bNon-Maximum Suppression\b|\bNMS\b|\bPostgreSQL\b|\basynchronous data logging\b|\basynchronously\b|\bVision-Language Model\b|\bStandard Operating Procedures \(SOPs\)\b|\bvector database\b|\bbounding-box coordinates\b|\bbounding boxes\b|\bconfidence score\b)/gi;

function getYoloKeywordStyle(kw) {
  const lower = kw.toLowerCase();
  if (lower === 'opencv' || lower === 'numpy') return 'text-cyan-300 font-semibold';
  if (lower.includes('letterbox')) return 'text-teal-300 font-semibold';
  if (lower.includes('yolo')) return 'text-amber-400 font-semibold';
  if (lower.startsWith('intact')) return 'text-emerald-300 font-bold';
  if (lower.startsWith('torn')) return 'text-rose-400 font-bold';
  if (lower.startsWith('open')) return 'text-amber-300 font-bold';
  if (lower.startsWith('missing')) return 'text-purple-300 font-bold';
  if (lower === 'onnx' || lower === 'deepsparse') return 'text-emerald-300 font-semibold';
  if (lower.includes('non-maximum') || lower === 'nms') return 'text-amber-300 font-semibold';
  if (lower === 'postgresql') return 'text-sky-300 font-semibold';
  if (lower.includes('asynchronous')) return 'text-cyan-300 font-semibold';
  if (lower.includes('vision-language')) return 'text-purple-300 font-semibold';
  if (lower.includes('standard operating') || lower.includes('vector database')) return 'text-indigo-300 font-semibold';
  if (lower.includes('bounding') || lower.includes('confidence')) return 'text-zinc-200 font-medium';
  return 'text-cyan-300 font-semibold';
}

function HighlightedYoloText({ text }) {
  const lines = text.split('\n\n');
  return (
    <div className="space-y-3">
      {lines.map((line, lIdx) => {
        if (line.startsWith('### ')) {
          return (
            <h4 key={lIdx} className="text-base sm:text-lg font-bold font-mono text-cyan-300 pt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{line.replace('### ', '')}</span>
            </h4>
          );
        }
        const parts = line.split(YOLO_KEYWORD_REGEX);
        return (
          <p key={lIdx} className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans whitespace-pre-line">
            {parts.map((part, pIdx) => {
              if (!part) return null;
              if (pIdx % 2 === 1) {
                const style = getYoloKeywordStyle(part);
                return <span key={pIdx} className={style}>{part}</span>;
              }
              if (part.includes('**')) {
                const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <span key={pIdx}>
                    {boldParts.map((bp, bIdx) => {
                      if (bp.startsWith('**') && bp.endsWith('**')) {
                        return <strong key={bIdx} className="text-white font-bold">{bp.slice(2, -2)}</strong>;
                      }
                      return bp;
                    })}
                  </span>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function YoloPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(yoloData.executiveScript);
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
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/40 p-6 sm:p-8 space-y-6 shadow-xl relative">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm sm:text-base uppercase tracking-wider font-mono">
            <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
            <span>Executive 90-Second Interview Defense Script (Edge Computer Vision Pipeline)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              Timing: 90s
            </span>
            <button
              onClick={handleCopyScript}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs sm:text-sm font-mono text-zinc-300 hover:text-white border border-zinc-700 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Copy entire interview defense script"
            >
              {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript ? 'Copied Script!' : 'Copy Script'}</span>
            </button>
          </div>
        </div>

        {/* Structured Sections with Colorful Titles and Highlighted Keywords */}
        <div className="space-y-6">
          {yoloData.executiveSections.map((sec) => (
            <div 
              key={sec.id} 
              className="p-5 sm:p-6 rounded-xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700/80 transition space-y-4 shadow-sm"
            >
              {sec.title && (
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3.5 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <h3 className={`text-lg sm:text-xl font-bold font-mono tracking-tight ${sec.accentColor}`}>
                      {sec.title}
                    </h3>
                  </div>
                  {sec.badge && (
                    <span className={`text-xs sm:text-[13px] font-mono px-3 py-1 rounded-full border ${sec.bgBadge}`}>
                      {sec.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="space-y-3.5">
                {sec.paragraphs.map((p, pIdx) => (
                  <HighlightedYoloText key={pIdx} text={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
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
          <span className="text-xs sm:text-sm font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 self-start sm:self-auto">
            Total Pipeline Reaction Time: &lt; 25ms
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
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
                <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {st.stage}
                </span>
              </div>
              <div className="flex-1 text-sm sm:text-base text-zinc-200 leading-relaxed">
                {st.text}
              </div>
              <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 shrink-0 self-start">
                {st.system}
              </div>
            </div>
          ))}
        </div>

        {/* Final Output & Audit Logging Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* Diverter Action Response */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-2.5">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Pneumatic Diverter Action & Physical Response</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed bg-black/50 p-4 rounded-lg border border-zinc-800/80 italic">
              "{yoloData.userExample.sampleOutput.diverterAction}"
            </p>
          </div>

          {/* On-Premises PostgreSQL Record */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-5 space-y-2.5">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recorded in Local PostgreSQL (inspections table)</span>
            </div>
            <div className="text-xs sm:text-sm font-mono bg-black/50 p-4 rounded-lg border border-zinc-800/80 space-y-1.5 text-zinc-300">
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
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Bookmarked Technical Concepts & Interview Defense</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-400">
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
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 border cursor-pointer ${
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
              <p className="text-zinc-400 text-sm font-medium">No concept selected.</p>
              <p className="text-zinc-600 text-xs">
                Select any bookmarked concept above to inspect its architecture, code snippet, and interview defense answer.
              </p>
            </div>
          )}

          {currentBookmarkObj && (
            <div
              id={currentBookmarkObj.id}
              className="rounded-2xl bg-[#0a0a0c] p-6 sm:p-8 space-y-5 shadow-2xl transition border border-cyan-500 shadow-cyan-500/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-md bg-zinc-900 text-cyan-300 border border-zinc-800 font-semibold">
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
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentBookmarkObj.title}
                </h3>
                <p className="text-sm sm:text-base text-cyan-400/90 font-medium italic bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-3.5">
                  {currentBookmarkObj.summary}
                </p>
              </div>

              <ul className="space-y-3 pt-3 border-t border-zinc-800/80">
                {currentBookmarkObj.details.map((detail, dIdx) => (
                  <li key={dIdx} className="text-sm sm:text-base text-zinc-200 flex items-start gap-3 leading-relaxed">
                    <span className="text-cyan-400 font-bold mt-1 text-base leading-none">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {currentBookmarkObj.code && (
                <div className="pt-2 space-y-2 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-cyan-400">
                    <Code2 className="w-4 h-4" />
                    <span>Implementation: {currentBookmarkObj.codeFilename || 'main.py'}</span>
                  </div>
                  <CodeHighlight code={currentBookmarkObj.code} filename={currentBookmarkObj.codeFilename || 'main.py'} showHeader={true} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
