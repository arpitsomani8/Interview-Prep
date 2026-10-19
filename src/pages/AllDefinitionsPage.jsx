import React, { useState, useMemo } from 'react';
import { definitionBookmarks, definitionsData } from '../data/allDefinitionsData';
import { 
  FileCode, 
  Bookmark, 
  ArrowUp, 
  Search, 
  Code2, 
  Check, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  Terminal,
  Globe,
  Bug,
  ShieldCheck,
  Sliders,
  Database,
  Layers,
  Zap,
  Cpu
} from 'lucide-react';

export default function AllDefinitionsPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

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

  const handleCopyCode = (id, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDefinitions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return definitionsData;
    return definitionsData.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchBadge = item.badge?.toLowerCase().includes(q);
      const matchSummary = item.summary?.toLowerCase().includes(q);
      const matchCode = item.code?.toLowerCase().includes(q);
      return (
        matchTitle ||
        matchBadge ||
        matchSummary ||
        matchCode ||
        JSON.stringify(item).toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-semibold uppercase tracking-wider">
          <FileCode className="w-3.5 h-3.5" />
          <span>Core AI Engineering Vault</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          All Definitions & Technical Master Guide
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl">
          Core concepts, mathematical formulas, trade-off comparisons, and production-ready API implementations organized for high-impact interview preparation.
        </p>
      </div>

      {/* Bookmarks Bar on Top */}
      <div id="bookmarks-bar" className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Topic Bookmarks ({definitionBookmarks.length} Chapters)</span>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>

        <p className="text-xs text-zinc-400">
          Click any bookmark to jump directly to its complete explanation, formulas, and working code:
        </p>

        {/* Clickable Bookmark Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {definitionBookmarks.map((item) => (
            <button
              key={item.id}
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
          ))}
        </div>
      </div>

      {/* Main Definitions Content Cards */}
      <div className="space-y-8">
        {filteredDefinitions.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={`scroll-mt-24 rounded-2xl bg-[#0a0a0c] p-6 sm:p-7 space-y-5 shadow-xl transition border ${
              activeBookmark === item.id
                ? 'border-cyan-500 shadow-cyan-500/10'
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {/* Header: Badge + Jump to Top */}
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

            {/* Title & Summary */}
            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-400/90 font-medium italic bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-2.5">
                {item.summary}
              </p>
            </div>

            {/* Item 1: YOLO Specific Content */}
            {item.id === 'yolo' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Real-world example */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-World Industrial Example: {item.realWorldExample.domain}</span>
                  </div>
                  <p className="leading-relaxed text-zinc-300">
                    {item.realWorldExample.context}
                  </p>
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-white mb-1.5">The system needs to detect:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.realWorldExample.detects.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 Step High Level Flow */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">End-to-End Operational Steps</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.pipelineSteps.map((step, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 flex flex-col justify-between">
                        <span className="text-[11px] font-mono font-bold text-cyan-400">{step.step}</span>
                        <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Internal Flow */}
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">YOLO Internal Pipeline Flow</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.internalFlow.map((flow, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-lg bg-black/80 border border-zinc-800">
                        <div className="text-xs font-bold text-white mb-1">{fIdx + 1}. {flow.title}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{flow.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Key Outputs */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Three Critical Model Outputs</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.keyOutputs.map((out, oIdx) => (
                      <div key={oIdx} className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                        <div className="text-xs font-bold text-cyan-300 mb-1">{out.name}</div>
                        <div className="text-xs text-zinc-300 leading-relaxed">{out.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 2: Confidence Score */}
            {item.id === 'confidence-score' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <ul className="space-y-2">
                  {item.details.map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Tradeoff Table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                    <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="p-3 border-b border-zinc-800">Threshold Setting</th>
                        <th className="p-3 border-b border-zinc-800">Detections</th>
                        <th className="p-3 border-b border-zinc-800">Recall Impact</th>
                        <th className="p-3 border-b border-zinc-800">Precision Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                      {item.tradeoffTable.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                          <td className="p-3 font-semibold text-white font-mono">{row.threshold}</td>
                          <td className="p-3 text-zinc-300">{row.detections}</td>
                          <td className="p-3 text-cyan-300 font-medium">{row.recall}</td>
                          <td className="p-3 text-zinc-300">{row.precision}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Item 3: Confusion Matrix / Precision / Recall / Accuracy / F1 */}
            {item.id === 'confusion-matrix-precision-recall' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* 4 Matrix Components */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Confusion Matrix Quadrants (Ground Truth vs Prediction)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.matrixComponents.map((c, cIdx) => (
                      <div key={cIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition">
                        <div className="text-xs font-bold text-cyan-300 font-mono mb-1">{c.term}</div>
                        <div className="text-xs text-zinc-300 leading-relaxed font-sans">{c.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 Core Classification Metrics: Accuracy, Precision, Recall, F1 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>The 4 Essential Classification Metrics</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                      Accuracy • Precision • Recall • F1
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(item.classificationMetrics || item.metrics).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-base font-bold font-mono ${m.accent || 'text-cyan-400'}`}>
                              {m.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold">
                              {m.formula}
                            </span>
                          </div>

                          {/* Verbatim Definition Callout */}
                          <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 font-sans leading-relaxed">
                            <strong className="text-white font-mono text-[11px] block mb-1">Definition:</strong>
                            {m.definition || m.question}
                          </div>

                          {m.example && (
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 px-2.5 py-1.5 rounded bg-zinc-900/60 border border-zinc-800/80">
                              <span className="text-amber-400 font-bold">› Example:</span>
                              <span className="text-zinc-200">{m.example}</span>
                            </div>
                          )}
                        </div>

                        {m.businessImpact && (
                          <div className="text-xs text-zinc-400 leading-relaxed pt-2.5 border-t border-zinc-800/80 font-sans">
                            <strong className="text-cyan-400 font-mono text-[11px]">Business Impact: </strong>
                            {m.businessImpact}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway Banner */}
                {item.takeaway && (
                  <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                    <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                    {item.takeaway}
                  </div>
                )}
              </div>
            )}

            {/* Item 4: GPT / LLaMA */}
            {item.id === 'gpt-llama' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* GPT */}
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.gptOverview.name}</h4>
                      <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {item.gptOverview.developer}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {item.gptOverview.desc}
                    </p>
                    {item.gptOverview.architecture && (
                      <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span className="text-[11px] font-bold text-cyan-300 font-mono">
                            {item.gptOverview.architecture.title}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {item.gptOverview.architecture.meaning}
                          </span>
                        </div>
                        <ul className="space-y-1 pt-1 border-t border-zinc-800/80">
                          {item.gptOverview.architecture.traits.map((tr, tIdx) => (
                            <li key={tIdx} className="text-[11px] text-zinc-300 flex items-start gap-1.5 font-sans">
                              <span className="text-cyan-400 font-mono">›</span>
                              <span>{tr}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <ul className="space-y-1.5 pt-2 border-t border-zinc-800">
                      {item.gptOverview.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* LLaMA */}
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.llamaOverview.name}</h4>
                      <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {item.llamaOverview.developer}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {item.llamaOverview.desc}
                    </p>
                    <ul className="space-y-1.5 pt-2 border-t border-zinc-800">
                      {item.llamaOverview.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Runtime Execution Contrast */}
                {item.runtimeContrast && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-400 font-mono uppercase">Runtime Execution Contrast: </strong>
                    {item.runtimeContrast}
                  </div>
                )}

                {/* Key Distinction / RAG relationship */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Key Architect Distinction: </strong>
                  {item.ragClarification}
                </div>
              </div>
            )}

            {/* Item 5: Agentic Workflow */}
            {item.id === 'agentic-workflow' && (
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <ul className="space-y-2">
                  {item.characteristics.map((char, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Item 6: GenAI vs Traditional AI */}
            {item.id === 'genai-vs-traditional-ai' && (
              <div className="overflow-x-auto pt-1">
                <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                  <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3 border-b border-zinc-800">Dimension</th>
                      <th className="p-3 border-b border-zinc-800 text-amber-400 font-bold">Traditional AI</th>
                      <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold">Generative AI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                    {item.comparison.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                        <td className="p-3 font-semibold text-white font-mono">{row.aspect}</td>
                        <td className="p-3 text-zinc-300">{row.traditional}</td>
                        <td className="p-3 text-cyan-200">{row.generative}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Item 7: Agentic AI */}
            {item.id === 'agentic-ai' && (
              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <ul className="space-y-2">
                  {item.coreDifferences.map((diff, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Item 8: AI Model */}
            {item.id === 'ai-model' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {item.patterns.map((pat, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2.5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{pat.title}</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">{pat.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-zinc-800 space-y-1.5 font-mono text-[11px]">
                      <div><strong className="text-emerald-400">Pros: </strong><span className="text-zinc-400">{pat.pros}</span></div>
                      <div><strong className="text-rose-400">Cons: </strong><span className="text-zinc-400">{pat.cons}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Item 9: Connect GPT to FastAPI */}
            {item.id === 'connect-gpt-fastapi' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                {/* Install & Run Commands */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 p-2.5 rounded-lg bg-black border border-zinc-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-cyan-400">{item.installCommand}</span>
                    <button
                      onClick={() => handleCopyCode('inst-fastapi', item.installCommand)}
                      className="text-zinc-500 hover:text-white transition p-1"
                      title="Copy command"
                    >
                      {copiedId === 'inst-fastapi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-emerald-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.runCommand}</span>
                  </div>
                </div>

                {/* Python Implementation Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>main.py (FastAPI + OpenAI Responses API)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-fastapi', item.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-fastapi' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.code}
                  </pre>
                </div>

                {/* Explanation: What just happened? */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">What Just Happened Inside the Flow?</h4>
                  <div className="space-y-1 text-xs text-zinc-300">
                    {item.workflow.map((w, wIdx) => (
                      <div key={wIdx} className="leading-relaxed">{w}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 10: Connect GPT to Flask */}
            {item.id === 'connect-gpt-flask' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                {/* Install Command */}
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800 flex items-center justify-between font-mono text-xs max-w-md">
                  <span className="text-cyan-400">{item.installCommand}</span>
                  <button
                    onClick={() => handleCopyCode('inst-flask', item.installCommand)}
                    className="text-zinc-500 hover:text-white transition p-1"
                    title="Copy command"
                  >
                    {copiedId === 'inst-flask' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Python Implementation Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>app.py (Flask + OpenAI Client)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-flask', item.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-flask' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.code}
                  </pre>
                </div>

                {/* Architectural Notes */}
                <ul className="space-y-1.5 pt-1">
                  {item.notes.map((n, nIdx) => (
                    <li key={nIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Item 11: Custom Model with FastAPI */}
            {item.id === 'custom-model-fastapi' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <p className="leading-relaxed text-zinc-300">
                  {item.context}
                </p>

                {/* Python Implementation Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>predict_service.py (FastAPI + Scikit-Learn Model via Joblib)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-custom-ml', item.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-custom-ml' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.code}
                  </pre>
                </div>

                {/* Key Advantages */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {item.keyAdvantages.map((adv, aIdx) => (
                    <div key={aIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      {adv}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item 12: RAG */}
            {item.id === 'rag' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Key Principle Alert */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400 font-mono uppercase">Key Principle & Safeguards: </strong>
                  {item.keyPrinciple}
                </div>

                {/* Two Phases of RAG: Indexing & Retrieval/Generation */}
                {item.twoPhases && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">
                          {item.twoPhases.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
                        Lifecycle Overview
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {item.twoPhases.phases.map((ph, pIdx) => (
                        <div key={pIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 hover:border-zinc-700 transition">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                              <span>{ph.phase}</span>
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-800">
                              {ph.timing}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {ph.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* With RAG vs. Without RAG */}
                {item.withVsWithoutRag && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                          {item.withVsWithoutRag.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
                        Knowledge Grounding
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {/* Without RAG */}
                      <div className="p-4 rounded-xl bg-black border border-rose-900/40 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                          <h5 className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wide">
                            Without RAG
                          </h5>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {item.withVsWithoutRag.withoutRag}
                        </p>
                      </div>

                      {/* With RAG */}
                      <div className="p-4 rounded-xl bg-black border border-emerald-900/40 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <h5 className="text-xs font-bold text-emerald-300 font-mono uppercase tracking-wide">
                            With RAG
                          </h5>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {item.withVsWithoutRag.withRag}
                        </p>
                      </div>
                    </div>

                    {/* Weight & Failure Mode Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/30 text-[11px] text-cyan-200/90 leading-relaxed font-mono">
                        <strong className="text-cyan-400 uppercase font-sans font-bold">Weights Isolation: </strong>
                        {item.withVsWithoutRag.weightNote}
                      </div>
                      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/30 text-[11px] text-amber-200/95 leading-relaxed font-mono">
                        <strong className="text-amber-400 uppercase font-sans font-bold">Failure Mode Caution: </strong>
                        {item.withVsWithoutRag.failureModes}
                      </div>
                    </div>
                  </div>
                )}

                {/* Understand the RAG Pipeline */}
                {item.ragPipelineOverview && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
                          {item.ragPipelineOverview.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
                        5 Core Stages
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {item.ragPipelineOverview.stages.map((stg, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                              {stg.step}
                            </span>
                            <span className="text-xs font-bold text-white font-mono text-cyan-300">{stg.stage}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">{stg.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {item.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-cyan-300">{faq.q}</h5>
                      <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>

                {/* How do you tune RAG retrieval in production? */}
                {item.tuningRagRetrieval && (
                  <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                            {item.tuningRagRetrieval.question}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                            {item.tuningRagRetrieval.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/40 shrink-0 self-start sm:self-auto">
                        5 Retrieval Controls
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {item.tuningRagRetrieval.steps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3 ${
                            sIdx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 font-mono text-[10px] text-cyan-300 font-bold uppercase">
                                {st.step}
                              </span>
                              <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                                {st.title}
                              </h5>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {st.summary}
                            </p>

                            {/* Tradeoff bullets */}
                            {st.bullets && (
                              <ul className="space-y-1.5 pt-1 text-[11px] text-zinc-400">
                                {st.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-1.5">
                                    <span className="text-cyan-400 mt-0.5">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Code snippet for metadata */}
                            {st.codeSnippet && (
                              <div className="pt-1">
                                <pre className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[10px] text-cyan-200 overflow-x-auto leading-relaxed">
                                  {st.codeSnippet}
                                </pre>
                              </div>
                            )}

                            {/* Reranker pipeline flow */}
                            {st.flow && (
                              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-800/40 font-mono text-[10px] text-cyan-200 font-semibold">
                                {st.flow}
                              </div>
                            )}
                          </div>

                          {/* Caution / note */}
                          {st.caution && (
                            <div className="text-[10px] font-mono text-amber-300/90 pt-2 border-t border-zinc-900 leading-relaxed">
                              ⚠️ {st.caution}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* How do you measure retrieval quality? */}
                {item.retrievalQualityMetrics && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-2.5 gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                            {item.retrievalQualityMetrics.question}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                            {item.retrievalQualityMetrics.setup}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 uppercase bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40 shrink-0 self-start sm:self-auto">
                        Benchmark Metrics
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.retrievalQualityMetrics.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3.5 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-1.5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-300 font-mono">{m.name}</span>
                              {m.fullName && (
                                <span className="text-[9px] font-mono text-zinc-500 uppercase">{m.fullName}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-300 leading-relaxed pt-1.5 font-sans">
                              {m.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5 Pipeline Pillars */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    RAG is a Multi-Component Pipeline (Not a Single Algorithm)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.pipelinePillars.map((p, pIdx) => (
                      <div key={pIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono">{p.pillar}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400">
                    <strong className="text-cyan-400 font-mono">Indexing Clarification: </strong>
                    {item.vectorSearchNote}
                  </div>
                </div>

                {/* Flow Diagram */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    End-to-End RAG Execution Flowchart
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-black border border-zinc-800">
                    {item.pipelineFlow.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300">
                          {step}
                        </span>
                        {sIdx < item.pipelineFlow.length - 1 && (
                          <span className="text-zinc-600 font-bold">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Minimal Retrieval Example (NumPy + OpenAI) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      Minimal In-Memory Vector Search (NumPy + Embeddings)
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">Pure Vector Math</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.minimalExplanation}
                  </p>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>minimal_search.py (Pure Vector Cosine Similarity)</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-min-rag', item.minimalRetrievalCode)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-min-rag' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      {item.minimalRetrievalCode}
                    </pre>
                  </div>
                </div>

                {/* Real Project Breakdown */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Full Project: {item.realProject.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.realProject.components.map((comp, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs font-bold text-white mb-0.5">{comp.name}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{comp.role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Stages: Part A & Part B */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.architectureStages.map((stage, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-cyan-300 font-mono">{stage.part}</h5>
                      <ul className="space-y-1.5 pt-1">
                        {stage.steps.map((st, stIdx) => (
                          <li key={stIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Folder Structure & Chunking Rationale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                    <h5 className="text-xs font-bold text-white font-mono uppercase">Folder Structure</h5>
                    <pre className="text-xs font-mono text-cyan-300/90 leading-relaxed bg-black/80 p-3 rounded-lg border border-zinc-800">
                      {item.folderStructure}
                    </pre>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white font-mono uppercase">Why Chunk the Document?</h5>
                      <p className="text-xs text-zinc-300 leading-relaxed mt-2">
                        {item.chunkingRationale}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-emerald-400 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.ingestRun}</span>
                    </div>
                  </div>
                </div>

                {/* Ingest Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>ingest.py (Chunking, Embedding & ChromaDB Indexing)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-ingest', item.ingestCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-ingest' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.ingestCode}
                  </pre>
                </div>

                {/* Ingest Takeaways */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h5 className="text-xs font-bold text-cyan-400 font-mono uppercase">Key Code Explanations</h5>
                  <ul className="space-y-1.5">
                    {item.ingestTakeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RAG Failure: Diagnosis, Safe Fallbacks & Monitoring */}
                {item.ragFailure && (
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/90 border border-amber-800/40 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Bug className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
                          {item.ragFailure.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 uppercase bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60 shrink-0 self-start sm:self-auto">
                        System Resiliency
                      </span>
                    </div>

                    {/* Verbatim Alert */}
                    <div className="p-4 rounded-xl bg-black border border-amber-800/50 space-y-1.5">
                      <div className="flex items-start gap-2.5">
                        <span className="text-amber-400 text-sm mt-0.5">⚠️</span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-amber-200 font-sans leading-relaxed">
                            {item.ragFailure.verbatim}
                          </p>
                          <p className="text-xs text-zinc-400 font-mono mt-1">
                            {item.ragFailure.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 4 Diagnostic Pillars */}
                    <div className="space-y-2 pt-1">
                      <h5 className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider">
                        4 Diagnostic Failure Pillars (Where RAG Breaks Down)
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {item.ragFailure.diagnosticPillars.map((pillar, pIdx) => (
                          <div key={pIdx} className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h6 className={`text-xs font-bold font-mono ${pillar.accent}`}>
                                  {pillar.name}
                                </h6>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                                  {pillar.category}
                                </span>
                              </div>
                              <div className="text-[11px] text-zinc-400">
                                <span className="text-zinc-500 font-mono">Symptoms: </span>
                                <span className="text-zinc-300 font-sans">{pillar.symptoms}</span>
                              </div>
                              <ul className="space-y-1 pt-1">
                                {pillar.causes.map((c, cIdx) => (
                                  <li key={cIdx} className="text-[11px] text-zinc-400 flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-amber-400/80">•</span>
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300">
                              <strong className="text-amber-400 font-mono">Mitigation: </strong>
                              <span>{pillar.mitigation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Safe Fallbacks and Monitoring Tactics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                      {/* Safe Fallbacks */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            Safe Fallback Strategies
                          </h5>
                        </div>
                        <div className="space-y-2.5">
                          {item.ragFailure.safeFallbacks.map((fb, fbIdx) => (
                            <div key={fbIdx} className="space-y-1">
                              <span className="text-xs font-bold text-emerald-300 font-mono">
                                • {fb.title}
                              </span>
                              <p className="text-[11px] text-zinc-400 pl-3 leading-relaxed">
                                {fb.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Monitoring Tactics */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                        <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            Production Monitoring & Tracing
                          </h5>
                        </div>
                        <div className="space-y-2.5">
                          {item.ragFailure.monitoringTactics.map((mon, mIdx) => (
                            <div key={mIdx} className="space-y-1">
                              <span className="text-xs font-bold text-cyan-300 font-mono">
                                • {mon.title}
                              </span>
                              <p className="text-[11px] text-zinc-400 pl-3 leading-relaxed">
                                {mon.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Item 13: Embedding & Query Pipeline */}
            {item.id === 'embedding' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* 4 Query Steps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Query Pipeline Lifecycle
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.querySteps.map((step, qIdx) => (
                      <div key={qIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>main.py (FastAPI Endpoint + ChromaDB Query + GPT Response)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-rag-main', item.mainCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-rag-main' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.mainCode}
                  </pre>
                </div>

                {/* Run Command & Source Citations Note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-black border border-zinc-800 flex items-center gap-3 font-mono text-xs text-emerald-400">
                    <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.runCommand}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-amber-400 font-mono uppercase">Production Metadata: </strong>
                    {item.sourceCitationNote}
                  </div>
                </div>

                {/* Request Trace Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Tracing a Single Request Through the Pipeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.traceRequest.map((tr, trIdx) => (
                      <div key={trIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                        <div className="text-xs font-bold text-white mb-1">{tr.step}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{tr.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two Model Takeaway */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Two-Model Architecture Takeaway: </strong>
                  {item.twoModelTakeaway}
                </div>

                {/* How Embeddings are Created */}
                {item.creationWorkflow && (
                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                        {item.creationWorkflow.question}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {item.creationWorkflow.answer}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.creationWorkflow.steps.map((st, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1">
                          <span className="text-xs font-bold text-white font-mono text-cyan-300">{st.stage}</span>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Different Types of Embeddings Table */}
                {item.typesOfEmbeddings && (
                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                        {item.typesOfEmbeddings.question}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {item.typesOfEmbeddings.answer}
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                        <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                          <tr>
                            <th className="p-3 border-b border-zinc-800 w-1/4">Type</th>
                            <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-3/8">Represents</th>
                            <th className="p-3 border-b border-zinc-800 text-zinc-400 font-bold w-3/8">Example Use</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                          {item.typesOfEmbeddings.table.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono">{row.type}</td>
                              <td className="p-3 text-cyan-200">{row.represents}</td>
                              <td className="p-3 text-zinc-400">{row.useCase}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      <strong className="text-amber-400 font-mono uppercase">Key Model Families: </strong>
                      {item.typesOfEmbeddings.modelFamiliesNote}
                    </div>
                  </div>
                )}

                {/* Sentence Transformers & Cosine Similarity Code Example */}
                {item.sentenceTransformersExample && (
                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                        {item.sentenceTransformersExample.title}
                      </h4>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-black px-2.5 py-1 rounded border border-zinc-800">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{item.sentenceTransformersExample.installCommand}</span>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>embeddings_similarity.py (Sentence Transformers + Scikit-Learn)</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-st-example', item.sentenceTransformersExample.code)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-st-example' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.sentenceTransformersExample.code}
                      </pre>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                        What happens here?
                      </h5>
                      <ul className="space-y-1.5">
                        {item.sentenceTransformersExample.explanation.map((exp, eIdx) => (
                          <li key={eIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Item 14: Vector Database */}
            {item.id === 'vector-database' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Concrete Operational Walkthrough */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-900/40 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-300 font-mono uppercase">
                    {item.concreteExample.title}
                  </h4>
                  <div className="p-3 rounded-lg bg-black/80 border border-zinc-800 space-y-1 font-mono text-xs text-zinc-300">
                    <div className="text-zinc-500 font-semibold mb-1">Stored Company Policies:</div>
                    {item.concreteExample.policies.map((pol, pIdx) => (
                      <div key={pIdx} className="text-cyan-200/90">{pol}</div>
                    ))}
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {item.concreteExample.steps.map((st, stIdx) => (
                      <div key={stIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 leading-relaxed text-zinc-300">
                      <span className="text-cyan-400 font-bold mr-1">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item 15: Similarity / Semantic Search */}
            {item.id === 'similarity-semantic-search' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Similarity Search */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{item.similaritySection.title}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">Vector Geometry</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.similaritySection.desc}
                  </p>
                  <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-xs text-cyan-200 italic">
                    Example: {item.similaritySection.example}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {item.similaritySection.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-lg bg-black border border-zinc-800">
                        <div className="text-xs font-bold text-cyan-300 font-mono mb-1">{m.name}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Semantic Search */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{item.semanticSection.title}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">Conceptual Matching</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.semanticSection.desc}
                  </p>
                  <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-300 font-medium">
                    {item.semanticSection.example}
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold text-white mb-1">How Semantic Search Works:</div>
                    {item.semanticSection.steps.map((st, stIdx) => (
                      <div key={stIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 16: Predictive Modeling */}
            {item.id === 'predictive-modeling' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Key Distinction from RAG: </strong>
                  {item.contrastWithRag}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    7 Steps to Build a Production Predictive Model
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.sevenSteps.map((s, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono">{s.step}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 17: Production Databases */}
            {item.id === 'production-databases' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* 5 Core Categories Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                    <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="p-3 border-b border-zinc-800">Database Type</th>
                        <th className="p-3 border-b border-zinc-800 text-cyan-400">Example Technologies</th>
                        <th className="p-3 border-b border-zinc-800">Core Purpose</th>
                        <th className="p-3 border-b border-zinc-800">AI / Logistics Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                      {item.categories.map((cat, cIdx) => (
                        <tr key={cIdx} className="hover:bg-zinc-900/40 transition">
                          <td className="p-3 font-semibold text-white font-mono">{cat.type}</td>
                          <td className="p-3 text-cyan-300 font-mono text-[11px]">{cat.tech}</td>
                          <td className="p-3 text-zinc-300">{cat.purpose}</td>
                          <td className="p-3 text-zinc-400 italic">{cat.useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Other Useful Technologies */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Advanced Data Stack Ecosystem
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.otherUsefulTech.map((tech, tIdx) => (
                      <div key={tIdx} className="p-2.5 rounded-lg bg-black/60 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete End-to-End Architecture */}
                <div className="p-4 rounded-xl bg-black border border-cyan-900/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                    End-to-End Multi-Tier Logistics Pipeline
                  </h4>
                  <div className="space-y-1.5">
                    {item.endToEndLogisticsArchitecture.map((arch, aIdx) => (
                      <div key={aIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 font-bold font-mono">{aIdx + 1}.</span>
                        <span>{arch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 18: Classical ML vs Deep Learning */}
            {item.id === 'classical-ml' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                    <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="p-3 border-b border-zinc-800">Dimension</th>
                        <th className="p-3 border-b border-zinc-800 text-amber-400 font-bold">Classical ML</th>
                        <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold">Deep Learning / Modern ML</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                      {item.comparisonTable.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                          <td className="p-3 font-semibold text-white font-mono">{row.dimension}</td>
                          <td className="p-3 text-zinc-300">{row.classical}</td>
                          <td className="p-3 text-cyan-200">{row.deepLearning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Logistics Roles */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Four Paradigm Roles in Our Logistics Architecture
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.logisticsProjectRoles.map((role, rIdx) => (
                      <div key={rIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-white font-mono">{role.role}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{role.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 19: Fine-Tuning */}
            {item.id === 'fine-tuning' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LLM Fine-Tuning */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <h4 className="text-sm font-bold text-white">{item.llmFineTuning.title}</h4>
                    <div className="space-y-1.5 pt-1">
                      {item.llmFineTuning.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">→</span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Classical ML Fine-Tuning */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <h4 className="text-sm font-bold text-white">{item.classicalFineTuning.title}</h4>
                    <div className="space-y-1.5 pt-1">
                      {item.classicalFineTuning.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">→</span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* When to use RAG vs Fine-Tuning */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    When to Use RAG vs Fine-Tuning?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {item.ragVsFineTuningDecision.map((dec, dIdx) => (
                      <div key={dIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-amber-300 font-mono">{dec.criteria}</div>
                        <div className="text-[11px] text-zinc-300 leading-relaxed">{dec.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Golden Rule */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Fundamental Law: </strong>
                  {item.goldenRule}
                </div>
              </div>
            )}

            {/* Item 20: Optimization */}
            {item.id === 'optimization' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Distinction: Scaling vs Optimization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-xs font-bold text-amber-400 font-mono uppercase">What is Scaling?</div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{item.coreDistinction.scaling}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-xs font-bold text-cyan-400 font-mono uppercase">What is Optimization?</div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{item.coreDistinction.optimization}</p>
                  </div>
                </div>

                {/* A. Optimizing Traditional ML */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      A. Optimizing a Traditional ML Model Pipeline
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">Latency Reduction</span>
                  </div>
                  <p className="text-xs text-zinc-400 italic">
                    {item.traditionalMlOptimization.scenario}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                    {item.traditionalMlOptimization.strategies.map((strat, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-white font-mono">{strat.name}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{strat.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B. Optimizing RAG Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    B. Optimizing RAG: Diagnostic Problem vs Solution Matrix
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 text-rose-400 font-bold w-1/3">Observed Problem</th>
                          <th className="p-3 border-b border-zinc-800 text-emerald-400 font-bold">Engineering Solution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                        {item.ragOptimizationTable.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-zinc-200">{row.problem}</td>
                            <td className="p-3 text-cyan-200/90 leading-relaxed">{row.solution}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Production Metrics Checklist */}
                <div className="p-4 rounded-xl bg-black border border-cyan-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                      Production Metrics & Observability Checklist
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">6 Critical KPIs</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    For an enterprise production system, monitor and alarm on these metrics continuously:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                    {item.productionMetricsChecklist.map((chk, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-amber-300 font-mono">{chk.metric}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{chk.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimizing Agentic AI Workflows Section */}
                {item.agenticAiOptimization && (
                  <div className="space-y-3 pt-2 border-t border-zinc-800">
                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-1.5">
                      <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                        {item.agenticAiOptimization.question}
                      </h4>
                      <p className="text-xs text-cyan-200/90 leading-relaxed font-medium">
                        {item.agenticAiOptimization.coreAnswer}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.agenticAiOptimization.dimensions.map((dim, dIdx) => (
                        <div key={dIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                          <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            <span>{dim.title}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">{dim.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Item 21: Scikit-Learn */}
            {item.id === 'scikit-learn' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Core Traditional ML Algorithms Provided
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.coreAlgorithms.map((algo, aIdx) => (
                      <div key={aIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-white font-mono">{algo.name}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{algo.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-cyan-900/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Unified Architecture Role: </strong>
                  {item.role}
                </div>

                {/* Scikit-Learn Pipeline */}
                {item.pipelineConcept && (
                  <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                          {item.pipelineConcept.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/40">
                        Workflow Chaining
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200 font-sans font-medium leading-relaxed">
                      {item.pipelineConcept.definition}
                    </div>

                    {/* Pipeline Code Snippet */}
                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>sklearn_pipeline.py (from sklearn.pipeline import Pipeline)</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-sklearn-pipeline', item.pipelineConcept.importSnippet)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-sklearn-pipeline' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.pipelineConcept.importSnippet}
                      </pre>
                    </div>

                    {/* Advantages */}
                    <ul className="space-y-1.5 pt-1 text-xs text-zinc-300 font-sans">
                      {item.pipelineConcept.advantages.map((adv, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold mt-0.5">•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Item 22: Joblib */}
            {item.id === 'joblib' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Definition Callout */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is Joblib? </strong>
                  {item.summary}
                </div>

                {/* Core Save & Load Snippet */}
                {item.coreSnippet && (
                  <div className="rounded-xl overflow-hidden border border-emerald-800/50 bg-black">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>quick_model_persistence.py (joblib.dump & joblib.load)</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-joblib-quick', item.coreSnippet)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-joblib-quick' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      {item.coreSnippet}
                    </pre>
                  </div>
                )}

                {/* Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>train_and_save.py (Training, Joblib Serialization & Inference)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-joblib', item.code)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-joblib' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.code}
                  </pre>
                </div>

                {/* Explanation points */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Key Execution Takeaways
                  </h4>
                  <ul className="space-y-1.5">
                    {item.explanation.map((exp, eIdx) => (
                      <li key={eIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Item 23: DeepSparse */}
            {item.id === 'deepsparse' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Core Concept: </strong>
                  Training creates a model; inference uses that trained model to make predictions. DeepSparse was designed to make inference faster on supported hardware and models.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {item.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                      <div className="text-xs font-bold text-white font-mono">{pt.title}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{pt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-black border border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Role: Inference Technology & Sparse CPU Execution</span>
                  </div>
                  <span className="font-mono text-cyan-400 text-[11px]">Not an Object Detector · Not Model Training</span>
                </div>
              </div>
            )}

            {/* Item 24: Pruning */}
            {item.id === 'pruning' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Two Common Types of Pruning
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.types.map((t, tIdx) => (
                      <div key={tIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                        <div className="text-xs font-bold text-cyan-300 font-mono">{t.name}</div>
                        <p className="text-xs text-zinc-300 leading-relaxed">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-cyan-900/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                    Why Do It? (Business & Engineering Rationale)
                  </h4>
                  <ul className="space-y-2 pt-1">
                    {item.whyPrune.map((reason, rIdx) => (
                      <li key={rIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Item 25: Quantization */}
            {item.id === 'quantization' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Visual Precision Reduction Banner */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Original Precision</span>
                    <div className="text-sm font-bold text-amber-400 font-mono">32-bit Floating Point (FP32)</div>
                    <p className="text-[11px] text-zinc-400">Standard deep learning training precision</p>
                  </div>
                  <div className="text-cyan-400 font-mono font-bold text-lg">→ 4x Compression →</div>
                  <div className="space-y-1 text-center sm:text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Quantized Precision</span>
                    <div className="text-sm font-bold text-emerald-400 font-mono">8-bit Integer (INT8)</div>
                    <p className="text-[11px] text-zinc-400">Drastically reduced memory & compute footprint</p>
                  </div>
                </div>

                {/* Technical Takeaways */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="p-4 rounded-xl bg-black border border-zinc-800 leading-relaxed text-xs text-zinc-300 flex flex-col justify-between">
                      <p>{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400 font-mono uppercase">Engineering Trade-Off: </strong>
                  Quantization can reduce memory consumption and improve inference speed on compatible hardware. However, it may introduce numerical errors and reduce accuracy if not calibrated.
                </div>
              </div>
            )}

            {/* Item 26: REST API vs FastAPI */}
            {item.id === 'rest-api-vs-fastapi' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Definition Callout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <div className="text-xs font-bold text-amber-400 font-mono uppercase">REST (Architectural Style)</div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      REST stands for Representational State Transfer. It is an architectural style for building web APIs. It is not a Python library.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <div className="text-xs font-bold text-cyan-400 font-mono uppercase">FastAPI (Python Web Framework)</div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      FastAPI is a modern, high-performance Python web framework specifically designed to build production APIs with native types and asynchronous I/O.
                    </p>
                  </div>
                </div>

                {/* Comparison Table: FastAPI vs Flask */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    FastAPI vs Flask Framework Comparison
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 w-1/4">Feature</th>
                          <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-3/8">FastAPI</th>
                          <th className="p-3 border-b border-zinc-800 text-zinc-400 font-bold w-3/8">Flask</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                        {item.comparisonTable.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-white font-mono">{row.feature}</td>
                            <td className="p-3 text-cyan-200 font-medium">{row.fastapi}</td>
                            <td className="p-3 text-zinc-400">{row.flask}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* AI / ML Selection Rationale */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Why Choose FastAPI for AI/ML? </strong>
                  {item.aiMlChoice}
                </div>

                {/* 4-Tier Backend Architecture Layers */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    4-Tier Backend Architecture Layering
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.backendLayers.map((layer, lIdx) => (
                      <div key={lIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <div className="text-xs font-bold text-white font-mono">{layer.layer}</div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">{layer.components}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Backend Components Breakdown */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    What an AI Backend System Contains
                  </h4>
                  <ul className="space-y-1.5 pt-1">
                    {item.backendComponents.map((comp, cIdx) => (
                      <li key={cIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Item 27: Onion Architecture */}
            {item.id === 'onion-architecture' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Key Principle Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Core Architectural Rule: </strong>
                  {item.keyPrinciple}
                </div>

                {/* 3 Concentric Layers */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Concentric Architecture Layers (Inward Dependency Flow)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.concentricLayers.map((layer, lIdx) => (
                      <div key={lIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-amber-300 font-mono">{layer.ring}</div>
                          <div className="text-[11px] font-mono text-cyan-300 bg-black/60 p-2 rounded border border-zinc-800/80">
                            {layer.components}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                          {layer.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flask Folder Organization */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    How Would You Organize an Onion Architecture Project in Flask?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.flaskFolderStructure.map((folder, fIdx) => (
                      <div key={fIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-white font-mono text-emerald-400">{folder.folder}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{folder.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Critical Insight: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 28: Multi-Tenant Architecture */}
            {item.id === 'multi-tenant' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* 3 Core Pillars */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    The 3 Pillars of Multi-Tenant AI Services
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.threePillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                        <div className="text-xs font-bold text-white font-mono text-cyan-300">{pillar.title}</div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* End-to-End Pipeline Execution Flow */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    Multi-Tenant Execution Lifecycle (5 Sequential Stages)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.pipelineSteps.map((step, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono">{step.step}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 29: Coding Best Practices */}
            {item.id === 'coding-best-practices' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="space-y-3.5">
                  {item.practices.map((practice, pIdx) => (
                    <div key={pIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-800/80 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                          {practice.number}
                        </span>
                        <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                          {practice.title}
                        </h4>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {practice.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs">
                          <span className="text-rose-400 font-mono font-bold uppercase text-[10px] block mb-1">
                            ✕ Bad Pattern
                          </span>
                          <span className="text-rose-200/90 leading-relaxed text-[11px]">
                            {practice.bad}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs">
                          <span className="text-emerald-400 font-mono font-bold uppercase text-[10px] block mb-1">
                            ✓ Better Architectural Approach
                          </span>
                          <span className="text-emerald-200/90 leading-relaxed text-[11px]">
                            {practice.better}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item 30: LLM */}
            {item.id === 'llm' && (
              <div className="space-y-8 text-xs sm:text-sm text-zinc-300">
                {/* LLM Architecture & Pipeline */}
                {item.llmArchitecture && (
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl">
                    <div className="space-y-2 border-b border-zinc-800 pb-3">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Core Neural Architecture</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {item.llmArchitecture.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-cyan-200/90 font-mono leading-relaxed bg-cyan-950/20 p-3 rounded-xl border border-cyan-800/30">
                        <strong className="text-cyan-400 uppercase font-sans font-bold">Definition: </strong>
                        {item.llmArchitecture.definition}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>6-Stage Language Model Forward Pass & Generation Pipeline</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {item.llmArchitecture.pipelineSteps.map((st, sIdx) => (
                          <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between hover:border-zinc-700 transition">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                                0{st.step}
                              </span>
                              <span className="text-xs font-bold text-white font-mono text-cyan-300">
                                {st.name}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-1">
                              {st.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/95 leading-relaxed font-mono">
                      <strong className="text-amber-400 uppercase font-sans font-bold">Architecture Taxonomy: </strong>
                      {item.llmArchitecture.familyArchitectureNote}
                    </div>
                  </div>
                )}

                {/* 3 Core Architecture Questions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {item.qaItems.map((qa, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-cyan-300 font-mono">
                        {qa.question}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Section 1: Hands-On Program 1 - Simple LLM Client */}
                {item.simpleLlmProgram && (
                  <div className="space-y-5 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Terminal className="w-3 h-3" />
                          <span>simple_llm/</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {item.simpleLlmProgram.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-black/60 px-3 py-1.5 rounded-lg border border-zinc-800">
                        <span>Folder:</span>
                        <span className="text-cyan-400 font-bold">{item.simpleLlmProgram.folder}</span>
                      </div>
                    </div>

                    {/* Step-by-Step Environment Setup */}
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Environment Setup & Installation</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {item.simpleLlmProgram.setupSteps.map((step, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                            <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-wide">
                              {step.label}
                            </span>
                            <div className="text-[11px] font-mono text-zinc-200 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800 break-all">
                              {step.cmd}
                            </div>
                            <span className="text-[10px] text-zinc-400">{step.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* API Key Configuration & Warning */}
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-amber-300 font-mono flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                          <span>API Key Configuration & Security Best Practice</span>
                        </div>
                        <span className="text-[10px] text-amber-400/90 font-mono font-bold uppercase bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/60">
                          {item.simpleLlmProgram.apiKeyConfig.scope}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {item.simpleLlmProgram.apiKeyConfig.note}
                      </p>
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/80 border border-amber-900/50 font-mono text-xs text-amber-200">
                        <span className="break-all">{item.simpleLlmProgram.apiKeyConfig.envCmd}</span>
                        <button
                          onClick={() => handleCopyCode('env-key', item.simpleLlmProgram.apiKeyConfig.envCmd)}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700 transition cursor-pointer shrink-0"
                        >
                          {copiedId === 'env-key' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-rose-300/90 font-mono font-bold flex items-center gap-1.5">
                        <span>⚠</span>
                        <span>{item.simpleLlmProgram.apiKeyConfig.warning}</span>
                      </p>
                    </div>

                    {/* Code Container: simple_llm/main.py */}
                    <div className="space-y-2">
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>simple_llm/{item.simpleLlmProgram.codeFilename}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">Python 3</span>
                          </div>
                          <button
                            onClick={() => handleCopyCode('code-simple-llm', item.simpleLlmProgram.code)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                          >
                            {copiedId === 'code-simple-llm' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                          {item.simpleLlmProgram.code}
                        </pre>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-mono italic">
                        * {item.simpleLlmProgram.modelNote}
                      </p>
                    </div>

                    {/* Execution & What Actually Happened */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-black border border-zinc-800 text-xs font-mono">
                        <span className="text-zinc-400">Run:</span>
                        <span className="text-emerald-400 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">{item.simpleLlmProgram.runCmd}</span>
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-400">Example input:</span>
                        <span className="text-zinc-200 italic">"{item.simpleLlmProgram.exampleInput}"</span>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                          What actually happened?
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {item.simpleLlmProgram.executionSteps.map((step, esIdx) => (
                            <div key={esIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                              <span className="text-xs font-bold text-cyan-300 font-mono">{step.step}</span>
                              <p className="text-[11px] text-zinc-400 leading-relaxed">{step.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Provider Takeaway Banner */}
                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                      <strong className="text-cyan-400 uppercase">Core Architectural Takeaway: </strong>
                      {item.simpleLlmProgram.coreTakeaway}
                    </div>
                  </div>
                )}

                {/* Section 2: Hands-On Program 2 - Simple RAG System */}
                {item.simpleRagProgram && (
                  <div className="space-y-5 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Terminal className="w-3 h-3" />
                          <span>simple_rag/</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {item.simpleRagProgram.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-black/60 px-3 py-1.5 rounded-lg border border-zinc-800">
                        <span>Architecture:</span>
                        <span className="text-emerald-400 font-bold">Dense Embeddings + NumPy Dot Product</span>
                      </div>
                    </div>

                    {/* Objective Banner */}
                    <div className="p-3.5 rounded-xl bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                      <strong className="text-emerald-400 font-mono uppercase">Primary Objective: </strong>
                      {item.simpleRagProgram.objective}
                    </div>

                    {/* Folder Structure & Dependencies Matrix */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Folder Architecture */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                        <div className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Folder Structure ({item.simpleRagProgram.folder})</span>
                        </div>
                        <div className="space-y-1.5 font-mono text-xs">
                          {item.simpleRagProgram.files.map((file, fIdx) => (
                            <div key={fIdx} className="p-2 rounded bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-cyan-300 font-bold">{file.name}</span>
                              <span className="text-[11px] text-zinc-400 font-sans">{file.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Package Dependencies & Purpose */}
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span>What Are The Packages For?</span>
                          </div>
                          <button
                            onClick={() => handleCopyCode('pip-rag', item.simpleRagProgram.installCmd)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700 transition cursor-pointer"
                          >
                            {copiedId === 'pip-rag' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy pip</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-300 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
                          {item.simpleRagProgram.installCmd}
                        </div>
                        <div className="space-y-1.5">
                          {item.simpleRagProgram.packages.map((pkg, pIdx) => (
                            <div key={pIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                              <span className="font-mono text-emerald-400 font-bold shrink-0">• {pkg.name}:</span>
                              <span className="text-zinc-400 text-[11px] leading-relaxed">{pkg.purpose}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Knowledge Source Note */}
                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2">
                      <span className="text-amber-400 font-mono font-bold mt-0.5">ℹ</span>
                      <span>{item.simpleRagProgram.knowledgeSource}</span>
                    </div>

                    {/* Code Container: simple_rag/main.py */}
                    <div className="space-y-2">
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>simple_rag/{item.simpleRagProgram.codeFilename} (Vector RAG Pipeline)</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">all-MiniLM-L6-v2</span>
                          </div>
                          <button
                            onClick={() => handleCopyCode('code-simple-rag', item.simpleRagProgram.code)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                          >
                            {copiedId === 'code-simple-rag' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-emerald-200 overflow-x-auto leading-relaxed">
                          {item.simpleRagProgram.code}
                        </pre>
                      </div>
                    </div>

                    {/* Execution & Query Walkthrough */}
                    <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="text-zinc-400">Run:</span>
                        <span className="text-emerald-400 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">{item.simpleRagProgram.runCmd}</span>
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-400">Input:</span>
                        <span className="text-zinc-200 font-semibold">{item.simpleRagProgram.exampleInput}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                        <strong className="text-emerald-400 uppercase">Under the Hood: </strong>
                        {item.simpleRagProgram.executionSummary}
                      </div>
                    </div>
                  </div>
                )}

                {/* LLM Production Failure: Discrete Category Handling */}
                {item.llmProductionFailure && (
                  <div className="space-y-5 p-5 rounded-2xl bg-zinc-950/90 border border-rose-800/40 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-rose-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-400 font-mono">
                          {item.llmProductionFailure.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-rose-300 uppercase bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800/60 shrink-0 self-start sm:self-auto">
                        SRE & Fault Tolerance
                      </span>
                    </div>

                    {/* Verbatim Alert */}
                    <div className="p-4 rounded-xl bg-black border border-rose-800/50 space-y-1.5">
                      <div className="flex items-start gap-2.5">
                        <span className="text-rose-400 text-sm mt-0.5">⚠️</span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-rose-200 font-sans leading-relaxed">
                            {item.llmProductionFailure.verbatim}
                          </p>
                          <p className="text-xs text-zinc-400 font-mono mt-1">
                            {item.llmProductionFailure.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 5 Distinct Failure Categories */}
                    <div className="space-y-3 pt-1">
                      <h5 className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider">
                        5 Separate Production Failure Modes & Handling Strategies
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {item.llmProductionFailure.failureCategories.map((cat, cIdx) => (
                          <div
                            key={cIdx}
                            className={`p-4 rounded-xl bg-black border ${cat.border} hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`text-xs font-bold font-mono ${cat.accent}`}>
                                  {cat.mode}
                                </h6>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                                  {cat.badge}
                                </span>
                              </div>
                              <div className="text-[11px] text-zinc-400">
                                <span className="text-zinc-500 font-mono">Root Cause: </span>
                                <span className="text-zinc-300 font-sans">{cat.rootCause}</span>
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
                              <strong className="text-cyan-400 font-mono block mb-1">Separate Handling:</strong>
                              <span>{cat.separateHandling}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Resilience Checklist */}
                    {item.llmProductionFailure.productionResilienceChecklist && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            Production Resilience Architecture Checklist
                          </h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.llmProductionFailure.productionResilienceChecklist.map((chk, kIdx) => (
                            <div key={kIdx} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800/80">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span className="leading-relaxed">{chk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Item 31: Azure AI Vision */}
            {item.id === 'azure-ai-vision' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-white font-mono uppercase text-cyan-400">
                    Core Functionality
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.role}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>{item.takeaway}</span>
                </div>
              </div>
            )}

            {/* Item 32: Azure OpenAI */}
            {item.id === 'azure-openai' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="text-xs font-bold text-white font-mono uppercase text-emerald-400">
                    Reasoning & Policy Interpretation
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.role}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200/90 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>{item.takeaway}</span>
                </div>
              </div>
            )}

            {/* Item 33: Transformer */}
            {item.id === 'transformer' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Transformer Architecture & Layer Anatomy */}
                {item.layerArchitecture && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs sm:text-base font-bold uppercase tracking-wider text-white font-mono">
                          {item.layerArchitecture.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
                        {item.layerArchitecture.headline}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {item.layerArchitecture.components.map((comp, cIdx) => (
                        <div key={cIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 hover:border-zinc-700 transition">
                          <h5 className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                            <span>{comp.name}</span>
                          </h5>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                            {comp.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6 Processing Steps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    How a Transformer Processes Text (6-Step Lifecycle)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.processingSteps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-white font-mono text-cyan-300">{st.step}</div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Architecture Flavors */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Three Architectural Variations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.flavorTypes.map((flv, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <div className="text-xs font-bold text-amber-300 font-mono">{flv.type}</div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{flv.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack Distinction */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Stack Level Distinction: </strong>
                  {item.stackDistinction}
                </div>

                {/* Build a Simple Transformer Application */}
                {item.simpleTransformerApp && (
                  <div className="space-y-5 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Terminal className="w-3 h-3" />
                          <span>Hugging Face Transformers</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {item.simpleTransformerApp.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-black/60 px-3 py-1.5 rounded-lg border border-zinc-800">
                        <span>Task:</span>
                        <span className="text-cyan-400 font-bold">Sentiment Analysis Inference</span>
                      </div>
                    </div>

                    {/* Three Operational Approaches */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Three Ways to Build with Transformers</span>
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {item.simpleTransformerApp.threeApproaches.map((appr, aIdx) => (
                          <div key={aIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                            <span className="text-xs font-bold text-cyan-300 font-mono">{appr.approach}</span>
                            <p className="text-[11px] text-zinc-400 leading-relaxed">{appr.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Packages & Installation */}
                    <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono">
                          Dependencies & Roles
                        </span>
                        <button
                          onClick={() => handleCopyCode('pip-transformer', item.simpleTransformerApp.installCmd)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'pip-transformer' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy pip</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
                        {item.simpleTransformerApp.installCmd}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {item.simpleTransformerApp.packages.map((pkg, pIdx) => (
                          <div key={pIdx} className="text-xs text-zinc-300 flex items-start gap-2 p-2 rounded bg-zinc-950 border border-zinc-800/80">
                            <span className="font-mono text-emerald-400 font-bold shrink-0">• {pkg.name}:</span>
                            <span className="text-zinc-400 text-[11px] leading-relaxed">{pkg.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Code Container: main.py */}
                    <div className="space-y-2">
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.simpleTransformerApp.codeFilename} (Pretrained Sentiment Pipeline)</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">DistilBERT</span>
                          </div>
                          <button
                            onClick={() => handleCopyCode('code-transformer', item.simpleTransformerApp.code)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                          >
                            {copiedId === 'code-transformer' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                          {item.simpleTransformerApp.code}
                        </pre>
                      </div>
                    </div>

                    {/* Execution & Example Inputs */}
                    <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-zinc-400">Run:</span>
                        <span className="text-emerald-400 font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">{item.simpleTransformerApp.runCmd}</span>
                      </div>
                      <div className="space-y-1.5">
                        {item.simpleTransformerApp.exampleInputs.map((ex, eIdx) => (
                          <div key={eIdx} className="p-2 rounded bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300">
                            {ex}
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-mono italic">
                        * {item.simpleTransformerApp.outputNote}
                      </p>
                    </div>

                    {/* What Happens Inside the Transformer? */}
                    <div className="space-y-2.5">
                      <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                        What happens inside the Transformer?
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                        {item.simpleTransformerApp.internalLifecycle.map((stage, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 flex flex-col justify-between">
                            <span className="text-xs font-bold text-emerald-400 font-mono">{stage.stage}</span>
                            <p className="text-[11px] text-zinc-400 leading-relaxed">{stage.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Item 34: Self-Attention */}
            {item.id === 'self-attention' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* 3 Core Architecture Concepts */}
                {item.threeCoreConcepts && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Three Fundamental Concepts in Generative AI</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {item.threeCoreConcepts.map((c, cIdx) => (
                        <div key={cIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold">
                              {c.num}
                            </span>
                            <span className="text-xs font-bold text-white font-mono text-cyan-300">{c.title}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mechanism Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Mechanism: </strong>
                  {item.mechanismDefinition || item.summary}
                </div>

                {/* QKV Vectors */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    The Three Vectors Computed for Each Token
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.qkvVectors.map((v, vIdx) => (
                      <div key={vIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                        <div className="text-xs font-bold text-white font-mono text-cyan-300">{v.vector}</div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mathematical Intuition Steps */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Attention Computation Intuition
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.intuitionSteps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-emerald-400 font-mono">{st.step}</div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multi-Head Attention */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Multi-Head Attention: </strong>
                  {item.multiHeadNote}
                </div>

                {/* PyTorch Scaled Dot-Product Attention Code */}
                {item.pytorchExample && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.pytorchExample.title}</span>
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-sans italic">{item.productionInsight}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">PyTorch Implementation</span>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.pytorchExample.filename}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-attention', item.pytorchExample.code)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-attention' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.pytorchExample.code}
                      </pre>
                    </div>

                    <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-[11px] text-zinc-300 font-mono leading-relaxed">
                      {item.pytorchExample.explanation}
                    </div>
                  </div>
                )}

                {/* Real-World Application in Fashion AI Copilot */}
                {item.copilotApplication && (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wide">
                      {item.copilotApplication.question}
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.copilotApplication.answer}
                    </p>
                  </div>
                )}

                {/* Model Mechanism vs Model Output Distinction */}
                {item.mechanismVsOutputDistinction && (
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                    <strong className="text-cyan-400 uppercase">Mechanism vs. Output Distinction: </strong>
                    {item.mechanismVsOutputDistinction}
                  </div>
                )}
              </div>
            )}

            {/* Item 35: 360° Fashion Visualization */}
            {item.id === 'fashion-360-visualization' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {item.workflowSteps.map((ws, wIdx) => (
                    <div key={wIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                      <div className="text-xs font-bold text-cyan-300 font-mono">{ws.step}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{ws.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item 36: Diffusion Model */}
            {item.id === 'diffusion-model' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Training Phase */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                      During Training (Forward Noising & Noise Prediction)
                    </h4>
                    <ul className="space-y-2 pt-1">
                      {item.trainingPhase.map((tr, tIdx) => (
                        <li key={tIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{tr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Generation Phase */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                      During Generation (Reverse Denoising)
                    </h4>
                    <ul className="space-y-2 pt-1">
                      {item.generationPhase.map((gen, gIdx) => (
                        <li key={gIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{gen}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Core Ecosystem Role */}
                {item.takeaway && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                      <span className="font-bold text-white font-mono">{item.takeaway}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 italic font-mono">{item.ecosystemContext}</span>
                  </div>
                )}
              </div>
            )}

            {/* Item 37: Vision Foundation Model */}
            {item.id === 'vision-foundation-model' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {item.modelFamilies.map((fam, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <div className="text-xs font-bold text-cyan-300 font-mono">{fam.name}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{fam.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Core Ecosystem Role */}
                {item.takeaway && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                      <span className="font-bold text-white font-mono">{item.takeaway}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 italic font-mono">{item.ecosystemContext}</span>
                  </div>
                )}
              </div>
            )}

            {/* Item 38: LangChain / LangGraph */}
            {item.id === 'langchain-langgraph' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Ecosystem Role */}
                {item.takeaway && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                      <span className="font-bold text-white font-mono">{item.takeaway}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 italic font-mono">{item.ecosystemContext}</span>
                  </div>
                )}

                {/* 3 Frameworks Comparison: LangChain, LlamaIndex, LangGraph */}
                {item.frameworksComparison && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                          Framework Roles & Comparison
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black/60 px-2.5 py-1 rounded border border-zinc-800">
                        Ecosystem Overview
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {item.frameworksComparison.map((fw, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                                {fw.name}
                              </h5>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                                {fw.badge}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {fw.role}
                            </p>
                          </div>
                          <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-900">
                            <span className="text-zinc-500 uppercase text-[10px] block font-sans">Primary Scope</span>
                            <span className="text-zinc-300">{fw.focus}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2 Frameworks Deep-dive Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.frameworks.map((fw, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <div className="text-xs font-bold text-cyan-400 font-mono uppercase">{fw.name} Architecture Details</div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{fw.role}</p>
                    </div>
                  ))}
                </div>

                {/* 4 Steps for Shopping Assistant */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    How the Shopping Assistant Executes a Request
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.shoppingAssistantSteps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                        {st}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production Architecture */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Production Architecture Components
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.productionArchitecture.map((arch, aIdx) => (
                      <div key={aIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-white font-mono text-cyan-300">{arch.comp}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{arch.role}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tool Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>tools.py (LangChain Tool Binding)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-lc-tool', item.toolCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-lc-tool' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.toolCode}
                  </pre>
                </div>

                {/* StateGraph Code Block */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>workflow.py (LangGraph StateGraph & State Transitions)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-lg-graph', item.graphCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-lg-graph' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.graphCode}
                  </pre>
                </div>

                {/* Q&A Takeaways */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.qaItems.map((qa, qIdx) => (
                    <div key={qIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-amber-300 font-mono">{qa.question}</h5>
                      <p className="text-xs text-zinc-400 leading-relaxed">{qa.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item 39: Normalization / Scaling */}
            {item.id === 'normalization-scaling' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Distinction Callout */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Core Distinction: </strong>
                  {item.coreDistinction}
                </div>

                {/* 1. Feature Scaling Section */}
                <div className="space-y-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                      1. {item.featureScaling.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.featureScaling.desc}
                    </p>
                  </div>

                  {/* MinMax & Standardization Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {item.featureScaling.methods.map((m, mIdx) => (
                      <div key={mIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono text-emerald-400">{m.name}</span>
                          <span className="text-[11px] font-mono text-cyan-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                            {m.formula}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Scikit-Learn Scaling Code */}
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>feature_scaling.py (MinMaxScaler vs StandardScaler)</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-feat-scaling', item.featureScaling.code)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-feat-scaling' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      {item.featureScaling.code}
                    </pre>
                  </div>

                  {/* When to Scale */}
                  <div className="p-3 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-white font-mono">Algorithm Applicability: </strong>
                    {item.featureScaling.whenToScale}
                  </div>

                  {/* Data Leakage Warning */}
                  <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-400 font-mono uppercase">Data Leakage Warning: </strong>
                    {item.featureScaling.dataLeakageRule}
                  </div>
                </div>

                {/* 2. Vector Normalization Section */}
                <div className="space-y-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                        2. {item.vectorNormalization.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.vectorNormalization.desc}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-cyan-300 bg-black px-2.5 py-1 rounded border border-zinc-800 self-start sm:self-auto">
                      {item.vectorNormalization.formula}
                    </span>
                  </div>

                  {/* NumPy L2 Normalization Code */}
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>vector_normalization.py (NumPy L2 Unit Normalization)</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-vec-norm', item.vectorNormalization.code)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-vec-norm' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      {item.vectorNormalization.code}
                    </pre>
                  </div>

                  {/* Vector Normalization Takeaway */}
                  <div className="p-3 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-400 font-mono">
                    <span className="text-emerald-400 font-bold">Dot Product Efficiency: </span>
                    {item.vectorNormalization.takeaway}
                  </div>
                </div>
              </div>
            )}

            {/* Item 40: Boosting */}
            {item.id === 'boosting' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Gradient Loss Principle */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Sequential Optimization Principle: </strong>
                  {item.gradientLossPrinciple}
                </div>

                {/* Popular Boosting Algorithms Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Popular Boosting Algorithms Matrix
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 w-1/4">Algorithm</th>
                          <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-3/8">Key Idea</th>
                          <th className="p-3 border-b border-zinc-800 text-zinc-400 font-bold w-3/8">When It Can Be Useful</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                        {item.popularAlgorithms.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-white font-mono text-emerald-400">{row.name}</td>
                            <td className="p-3 text-zinc-300">{row.keyIdea}</td>
                            <td className="p-3 text-cyan-200/90">{row.whenUseful}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bagging vs Boosting vs Bootstrapping */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-xs font-bold text-amber-300 font-mono uppercase">Bagging</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.baggingVsBoosting.bagging}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-xs font-bold text-cyan-400 font-mono uppercase">Boosting</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.baggingVsBoosting.boosting}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-300 font-mono uppercase">Bootstrapping</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.baggingVsBoosting.bootstrapping}</p>
                  </div>
                </div>

                {/* Python Scikit-Learn GradientBoostingClassifier Code */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Hands-On Scikit-Learn GradientBoostingClassifier Implementation
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>gradient_boosting_parcel.py (GradientBoostingClassifier Pipeline)</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-boosting', item.code)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-boosting' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      {item.code}
                    </pre>
                  </div>
                </div>

                {/* What did we do? */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                    What did we do?
                  </h5>
                  <ul className="space-y-1.5">
                    {item.workflowSteps.map((step, sIdx) => (
                      <li key={sIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What do the main parameters mean? */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                    What do the main parameters mean?
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.parameters.map((p, pIdx) => (
                      <div key={pIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1">
                        <span className="text-xs font-bold font-mono text-emerald-400">{p.param}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Does boosting require normalization? */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <div className="text-xs font-bold text-amber-300 font-mono uppercase">
                    {item.normalizationQ.question}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.normalizationQ.answer}
                  </p>
                </div>

                {/* Triad Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-900/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Triad Takeaway: </strong>
                  {item.triadTakeaway}
                </div>
              </div>
            )}

            {/* Item 41: NLP General Flow & Architecture Selection */}
            {item.id === 'nlp-general-flow' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* 4-Stage Lifecycle */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    The 4-Stage NLP General Flow
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.fourStages.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono text-emerald-400">{st.stage}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Which Approach Would I Choose (4 Options) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Which Approach Would I Choose — and Why? (Comparing 4 Options)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.fourOptions.map((opt, oIdx) => (
                      <div key={oIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-white font-mono">{opt.option}</div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                            {opt.role}
                          </span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-200/90 leading-relaxed">
                            <strong className="text-emerald-400 font-mono uppercase text-[10px] block mb-0.5">Why Choose It:</strong>
                            {opt.why}
                          </div>
                          <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-200/90 leading-relaxed">
                            <strong className="text-rose-400 font-mono uppercase text-[10px] block mb-0.5">Why Not Always / Immediately:</strong>
                            {opt.whyNot}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Rules Framework */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    My Architectural Decision Rules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.decisionRules.map((rule, rIdx) => (
                      <div key={rIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase">Requirement</div>
                        <div className="text-xs font-bold text-white font-mono">{rule.condition}</div>
                        <div className="text-xs text-emerald-400 font-medium pt-1">→ {rule.recommendation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What is Happening (Baseline Pipeline Breakdown) */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    What is Happening in the Baseline Supervised Model?
                  </h4>
                  <ul className="space-y-1.5 pt-1">
                    {item.pipelineBreakdown.map((step, sIdx) => (
                      <li key={sIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What If the Business Also Wants AI-Generated Answers? */}
                <div className="p-4 rounded-xl bg-black border border-cyan-900/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                    {item.ragExtension.title}
                  </h4>
                  <ul className="space-y-1.5 pt-1">
                    {item.ragExtension.steps.map((st, stIdx) => (
                      <li key={stIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                        <span className="text-cyan-400 font-bold font-mono">{stIdx + 1}.</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What Would Make Me Choose a Transformer Instead? */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                    {item.contextNegationExample.title} (Context & Negation)
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {item.contextNegationExample.scenario}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-black border border-rose-900/40 font-mono text-xs text-rose-300">
                      Ticket A: {item.contextNegationExample.ticketA}
                    </div>
                    <div className="p-3 rounded-lg bg-black border border-emerald-900/40 font-mono text-xs text-emerald-300">
                      Ticket B: {item.contextNegationExample.ticketB}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.contextNegationExample.explanation}
                  </p>
                </div>

                {/* Systematic Evaluation Matrix */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Systematic Evaluation Matrix (Comparing Models on the Same Test Set)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 w-1/3">Evaluation Area</th>
                          <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold">Why It Matters</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                        {item.evaluationMatrix.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-white font-mono text-emerald-400">{row.area}</td>
                            <td className="p-3 text-zinc-300 leading-relaxed">{row.why}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Engineering Wisdom */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed">
                  <strong className="text-cyan-400 font-mono uppercase">Engineering Wisdom: </strong>
                  {item.engineeringWisdom}
                </div>
              </div>
            )}

            {/* Item 42: AWS & Azure in AI/ML */}
            {item.id === 'aws-azure' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Cloud Principle Alert */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Architectural Rule: </strong>
                  {item.corePrinciple}
                </div>

                {/* Where exactly do we use AWS or Azure in an AI/ML application? */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Where Exactly Do We Use AWS or Azure in an AI/ML Application?</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.architectureLifecycle.map((stg, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono text-cyan-300">{stg.step}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{stg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AWS Ecosystem Breakdown */}
                <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                      AWS (Amazon Web Services) Ecosystem for AI/ML
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.awsServices.map((svc, aIdx) => (
                      <div key={aIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-2 flex flex-col justify-between hover:border-amber-500/30 transition">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-amber-400 font-mono">{svc.name}</span>
                            {svc.category && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-800">
                                {svc.category}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-300 leading-relaxed font-sans">{svc.role}</div>
                        </div>
                        {svc.example && (
                          <div className="pt-2 border-t border-zinc-900 text-[10px] text-zinc-400 font-sans">
                            <strong className="text-amber-400 font-mono">Example: </strong>
                            {svc.example}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed font-sans">
                    <strong className="text-amber-400 font-mono font-semibold">Supporting Infrastructure: </strong>
                    {item.awsAdditionalServices}
                  </div>
                </div>

                {/* Azure Ecosystem Breakdown */}
                <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                      Azure (Microsoft Cloud) Ecosystem for AI/ML
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.azureServices.map((az, azIdx) => (
                      <div key={azIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 flex flex-col justify-between hover:border-cyan-500/30 transition">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <div className="text-xs font-bold text-cyan-400 font-mono">{az.name}</div>
                            {az.category && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-800">
                                {az.category}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">{az.desc}</p>
                        </div>
                        {az.example && (
                          <div className="pt-2 border-t border-zinc-900 text-[10px] text-zinc-400 font-sans">
                            <strong className="text-cyan-400 font-mono">Example: </strong>
                            {az.example}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed font-sans">
                    <strong className="text-cyan-400 font-mono font-semibold">Supporting Infrastructure: </strong>
                    {item.azureAdditionalServices}
                  </div>
                </div>

                {/* Hands-On Python Boto3 Code */}
                {item.boto3Example && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.boto3Example.title}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400">{item.boto3Example.takeaway}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-400">PowerShell:</span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black border border-zinc-800 text-[11px] font-mono text-amber-300">
                          <span>{item.boto3Example.envSetup}</span>
                          <button
                            onClick={() => handleCopyCode('env-s3', item.boto3Example.envSetup)}
                            className="text-zinc-500 hover:text-zinc-300 ml-1 cursor-pointer"
                          >
                            {copiedId === 'env-s3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Code2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.boto3Example.filename}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">boto3</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-boto3', item.boto3Example.code)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-boto3' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed">
                        {item.boto3Example.code}
                      </pre>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span>Run:</span>
                      <span className="text-emerald-400 font-bold bg-black px-2 py-0.5 rounded border border-zinc-800">{item.boto3Example.runCmd}</span>
                    </div>
                  </div>
                )}

                {/* 5-Step Practical Deployment Strategy to AWS */}
                {item.deploymentStrategy && (
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Production Cloud Deployment</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight pt-1">
                          {item.deploymentStrategy.question}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 bg-black px-2.5 py-1 rounded-lg border border-zinc-800">
                        {item.deploymentStrategy.subtext}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1">
                      {item.deploymentStrategy.steps.map((st, sIdx) => (
                        <div key={sIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2 flex flex-col justify-between hover:border-amber-500/30 transition">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-700/60 inline-block">
                              {st.tag}
                            </span>
                            <div className="text-xs font-bold text-white font-mono text-amber-200">
                              {st.step}
                            </div>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                            {st.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Item 43: Testing & Deployment Evaluation */}
            {item.id === 'testing' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Philosophy Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Evaluation Philosophy: </strong>
                  {item.corePhilosophy}
                </div>

                {/* Component vs What I'd Measure Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Component-Level Quality & Metric Measurement Matrix</span>
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 w-1/4">Component</th>
                          <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-1/2">What I'd Measure</th>
                          <th className="p-3 border-b border-zinc-800 text-emerald-400 font-bold w-1/4">Evaluation Focus</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                        {item.componentMetrics.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-white font-mono text-cyan-300">{row.component}</td>
                            <td className="p-3 text-zinc-300 leading-relaxed">{row.measures}</td>
                            <td className="p-3 text-emerald-400 font-mono text-[11px]">{row.focus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Key Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 44: Text / Image Search */}
            {item.id === 'text-image-search' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    How Does Searching Work? (3 Modalities)
                  </h4>
                </div>

                {/* 3 Search Modalities Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {item.searchModalities.map((mod, mIdx) => (
                    <div key={mIdx} className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3 flex flex-col justify-between shadow-xl">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono text-cyan-300 uppercase tracking-wide">
                            {mod.mode}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                            {mIdx === 0 ? 'Text' : mIdx === 1 ? 'Vision' : 'Hybrid'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black border border-zinc-800 text-xs text-amber-200/90 font-mono">
                          {mod.queryExample}
                        </div>
                        <ul className="space-y-1.5 pt-1">
                          {mod.steps.map((st, stIdx) => (
                            <li key={stIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">•</span>
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cross-Modal Takeaway */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Search Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 45: Denoising in Generative AI */}
            {item.id === 'denoising' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Concept Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Principle: </strong>
                  {item.coreConcept}
                </div>

                {/* Forward vs Reverse Process Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>The Diffusion Process: Forward Noising vs. Reverse Denoising</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.forwardVsReverse.map((f, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2.5 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold text-white font-mono text-cyan-300">{f.stage}</span>
                          <p className="text-xs text-zinc-400 leading-relaxed mt-1">{f.desc}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] text-emerald-300 break-all">
                          {f.math}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Use Cases in Fashion AI */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Practical Applications in Fashion & Design Generation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.useCases.map((uc, uIdx) => (
                      <div key={uIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <div className="text-xs font-bold text-amber-300 font-mono">{uc.title}</div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{uc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PyTorch Denoising Step Code */}
                {item.pytorchExample && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.pytorchExample.title}</span>
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-sans italic">{item.pytorchExample.explanation}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">PyTorch Math</span>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.pytorchExample.filename}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-denoising', item.pytorchExample.code)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-denoising' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.pytorchExample.code}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Architectural Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 46: MCP (Model Context Protocol) */}
            {item.id === 'mcp' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core MCP Rule */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Standardized Protocol Rule: </strong>
                  {item.coreDefinition}
                </div>

                {/* How MCP Works (Lifecycle Steps) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How MCP Works (End-to-End Execution Flow)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.howItWorksSteps.map((stg, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono text-cyan-300">{stg.step}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{stg.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Three Main Capabilities */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Three Capabilities Exposed by MCP Servers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.threeCapabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <div className="text-xs font-bold text-amber-300 font-mono uppercase">{cap.capability}</div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{cap.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hands-On Python MCP Server Code */}
                {item.handsOnServer && (
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Terminal className="w-3 h-3" />
                          <span>mcp[cli] Python SDK</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {item.handsOnServer.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-black border border-zinc-800 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                          <span>{item.handsOnServer.installCmd}</span>
                          <button
                            onClick={() => handleCopyCode('pip-mcp', item.handsOnServer.installCmd)}
                            className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
                          >
                            {copiedId === 'pip-mcp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {item.handsOnServer.scenario}
                    </p>

                    {/* Server Code Container */}
                    <div className="space-y-2">
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.handsOnServer.filename} (MCPServer Definition)</span>
                          </div>
                          <button
                            onClick={() => handleCopyCode('code-mcp', item.handsOnServer.code)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                          >
                            {copiedId === 'code-mcp' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                          {item.handsOnServer.code}
                        </pre>
                      </div>
                      <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed font-sans">
                        <strong className="text-cyan-400 font-mono">@mcp.tool() Mechanism: </strong>
                        {item.handsOnServer.decoratorNote}
                      </div>
                    </div>

                    {/* MCP Inspector Testing */}
                    <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-zinc-400">Run Development Inspector:</span>
                        <span className="text-emerald-400 font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-700">{item.handsOnServer.runCmd}</span>
                      </div>
                      <div className="space-y-1 pt-1">
                        {item.handsOnServer.inspectorSteps.map((ins, iIdx) => (
                          <div key={iIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-cyan-400 font-mono">•</span>
                            <span className="text-[11px] text-zinc-300">{ins}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Architectural Boundaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.architecturalBoundaries.map((b, bIdx) => (
                    <div key={bIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-amber-300 font-mono uppercase">{b.title}</h5>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{b.desc}</p>
                    </div>
                  ))}
                </div>

                {/* WebMCP Section */}
                {item.webMcp && (
                  <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/90 border border-cyan-800/40 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Globe className="w-3 h-3 text-cyan-400" />
                          <span>{item.webMcp.badge}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                          <span>{item.webMcp.title}</span>
                        </h4>
                      </div>
                    </div>

                    {/* Definition Banner */}
                    <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/95 leading-relaxed font-mono">
                      <strong className="text-cyan-400 uppercase font-sans font-bold">WebMCP Definition: </strong>
                      {item.webMcp.definition}
                    </div>

                    {/* Conceptual Agent Comparison: Traditional vs WebMCP */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-zinc-300 font-mono tracking-wide">
                        {item.webMcp.differenceNote}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {item.webMcp.agentComparison.map((agent, aIdx) => (
                          <div 
                            key={aIdx} 
                            className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                              aIdx === 0 
                                ? 'bg-zinc-950/80 border-amber-500/20 text-zinc-300' 
                                : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-200'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-xs font-bold font-mono uppercase ${
                                aIdx === 0 ? 'text-amber-400' : 'text-cyan-300'
                              }`}>
                                • {agent.type}
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                aIdx === 0 ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                              }`}>
                                {agent.tag}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {agent.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MCP vs WebMCP Comparison Table */}
                    <div className="space-y-2 pt-2">
                      <h5 className="text-xs font-bold text-cyan-400 font-mono tracking-wide uppercase">
                        MCP vs WebMCP Architectural Matrix
                      </h5>
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                                <th className="p-3 w-1/4">Feature</th>
                                <th className="p-3 w-3/8 text-amber-300">MCP</th>
                                <th className="p-3 w-3/8 text-cyan-300">WebMCP</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/80 font-sans">
                              {item.webMcp.comparisonMatrix.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                                  <td className="p-3 font-semibold text-zinc-200 font-mono text-[11px]">
                                    {row.feature}
                                  </td>
                                  <td className="p-3 text-zinc-400 font-mono text-[11px]">
                                    {row.mcp}
                                  </td>
                                  <td className="p-3 text-cyan-200 font-mono text-[11px]">
                                    {row.webMcp}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Cards */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Frequently Asked MCP Architecture Questions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <h5 className="text-xs font-bold text-cyan-300 font-mono">{faq.q}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Item 47: Blockchain */}
            {item.id === 'blockchain' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Definition: </strong>
                  {item.coreDefinition}
                </div>

                {/* How It Works 5-Step Workflow */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How Blockchain Works (5 Sequential Stages)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.howItWorksSteps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono text-cyan-300">{st.step}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cryptographic Hash Chain Demonstration Code */}
                {item.hashChainDemo && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.hashChainDemo.title}</span>
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-sans italic">{item.hashChainDemo.explanation}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">SHA-256 Hashing</span>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.hashChainDemo.filename}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-blockchain', item.hashChainDemo.code)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-blockchain' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.hashChainDemo.code}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Immutability & Consensus Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 48: OCR (Optical Character Recognition) */}
            {item.id === 'ocr' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Definition: </strong>
                  {item.summary}
                </div>

                {/* Technology Comparison Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>OCR vs. Computer Vision vs. LLM vs. RAG</span>
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 w-1/4">Technology</th>
                          <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-1/3">Main Job</th>
                          <th className="p-3 border-b border-zinc-800 text-emerald-400 font-bold">Real-World Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60">
                        {item.technologyComparison.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-white font-mono text-cyan-300">{row.tech}</td>
                            <td className="p-3 text-zinc-300 leading-relaxed">{row.job}</td>
                            <td className="p-3 text-emerald-400 font-mono text-[11px]">{row.example}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Enterprise Invoice Processing Pipeline */}
                {item.genAiPipeline && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                        {item.genAiPipeline.title}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
                      {item.genAiPipeline.steps.map((st, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-black border border-zinc-800 space-y-1 flex flex-col justify-between">
                          <span className="text-[11px] font-bold text-emerald-400 font-mono">{st.step}</span>
                          <p className="text-[10px] text-zinc-400 leading-relaxed">{st.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular OCR Tools Matrix */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Which Tools Can Be Used for OCR?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.ocrTools.map((tool, tIdx) => (
                      <div key={tIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <div className="text-xs font-bold text-amber-300 font-mono">{tool.name}</div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{tool.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview FAQs */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Frequently Asked OCR Interview Questions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <h5 className="text-xs font-bold text-cyan-300 font-mono">{faq.q}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Document AI Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 49: FAISS (Facebook AI Similarity Search) */}
            {item.id === 'faiss' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Core Definition: </strong>
                  {item.coreDefinition}
                </div>

                {/* How FAISS Works (5-Step Lifecycle) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How FAISS Works (5-Stage Vector Search Workflow)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {item.howItWorksSteps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold text-white font-mono text-cyan-300">{st.step}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Index Architectures Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Core FAISS Index Architectures (Exact vs. ANN)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.indexTypes.map((idx, iIdx) => (
                      <div key={iIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-cyan-300 font-mono">{idx.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-700">
                            {idx.type}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-400">
                          Search Complexity: {idx.complexity}
                        </div>
                        <div className="space-y-1 text-xs">
                          <p className="text-zinc-300"><strong className="text-zinc-100 font-mono">Pros: </strong>{idx.pros}</p>
                          <p className="text-zinc-400"><strong className="text-zinc-100 font-mono">Trade-off: </strong>{idx.cons}</p>
                          <p className="text-cyan-200/90 text-[11px] font-mono bg-cyan-950/30 p-2 rounded border border-cyan-800/30">
                            <strong>Target Scale: </strong>{idx.useCase}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hands-on Python Code */}
                {item.handsOnCode && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Terminal className="w-3 h-3" />
                          <span>{item.handsOnCode.installCmd}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight pt-1">
                          {item.handsOnCode.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-faiss', item.handsOnCode.code)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer self-start sm:self-auto"
                      >
                        {copiedId === 'code-faiss' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.handsOnCode.filename} (k-NN Cosine Similarity)</span>
                        </div>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.handsOnCode.code}
                      </pre>
                    </div>

                    <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed font-sans">
                      <strong className="text-cyan-400 font-mono">Cosine Similarity Equivalence: </strong>
                      {item.handsOnCode.explanation}
                    </div>
                  </div>
                )}

                {/* System Comparison: FAISS vs SQL vs Managed Vector DB */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>FAISS vs. Relational SQL vs. Managed Cloud Vector DBs</span>
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                      <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                        <tr>
                          <th className="p-3 border-b border-zinc-800 w-1/5">Aspect</th>
                          <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-1/4">FAISS</th>
                          <th className="p-3 border-b border-zinc-800 text-amber-300 font-bold w-1/4">Relational SQL</th>
                          <th className="p-3 border-b border-zinc-800 text-emerald-400 font-bold">Managed Vector DB</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 bg-black/60 font-sans">
                        {item.systemComparison.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="p-3 font-semibold text-white font-mono text-zinc-200">{row.aspect}</td>
                            <td className="p-3 text-cyan-300 font-mono text-[11px]">{row.faiss}</td>
                            <td className="p-3 text-zinc-400 font-mono text-[11px]">{row.sqlDb}</td>
                            <td className="p-3 text-emerald-400 font-mono text-[11px]">{row.managedVectorDb}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Interview FAQs */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Frequently Asked FAISS & Vector Indexing Questions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <h5 className="text-xs font-bold text-cyan-300 font-mono">{faq.q}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Vector Indexing Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 50: How to Update a Deployed Model & Vector Index */}
            {item.id === 'update-deployed-model' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Scenario & Core Principle Banner */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      Real-World Scenario: {item.scenario}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                    <strong className="text-cyan-400 uppercase">Core MLOps Principle: </strong>
                    {item.corePrinciple}
                  </div>
                </div>

                {/* 7-Step Controlled Update Pipeline */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How Do You Update a Deployed Model? (7 Controlled Stages)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.updatePipeline.map((st, sIdx) => (
                      <div 
                        key={sIdx} 
                        className={`p-3.5 rounded-xl border space-y-1.5 flex flex-col justify-between ${
                          sIdx === 6 
                            ? 'bg-rose-950/20 border-rose-800/40' 
                            : 'bg-black border-zinc-800'
                        }`}
                      >
                        <span className={`text-xs font-bold font-mono ${
                          sIdx === 6 ? 'text-rose-400' : 'text-cyan-300'
                        }`}>
                          {st.step}
                        </span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules of Thumb & Best Practices */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Production Architecture Rules of Thumb
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.rulesOfThumb.map((r, rIdx) => (
                      <div key={rIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <h5 className="text-xs font-bold text-amber-300 font-mono uppercase">{r.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{r.rule}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Incremental Index Update Code */}
                {item.handsOnScript && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Terminal className="w-3 h-3 text-cyan-400" />
                          <span>Incremental Index Ingestion</span>
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight pt-1">
                          {item.handsOnScript.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-update-index', item.handsOnScript.code)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer self-start sm:self-auto"
                      >
                        {copiedId === 'code-update-index' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.handsOnScript.filename}</span>
                        </div>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                        {item.handsOnScript.code}
                      </pre>
                    </div>

                    <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/80 text-[11px] text-zinc-400 leading-relaxed font-sans">
                      <strong className="text-cyan-400 font-mono">Zero-Downtime Guarantee: </strong>
                      {item.handsOnScript.explanation}
                    </div>
                  </div>
                )}

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Production MLOps Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 51: AI-Assisted Coding Tools & Agentic Development */}
            {item.id === 'ai-assisted-coding-tools' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What Are AI-Assisted Coding Tools? </strong>
                  {item.summary}
                </div>

                {/* The Big 4 Tool Matrix */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Industry Standard AI Coding Platforms</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.tools.map((tool, tIdx) => (
                      <div key={tIdx} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/30 transition">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h5 className="text-sm font-bold text-white font-mono">{tool.name}</h5>
                              <span className="text-[10px] font-mono text-zinc-400">{tool.vendor}</span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-700">
                              {tool.tag}
                            </span>
                          </div>
                          <p className="text-xs text-cyan-200/90 leading-relaxed font-sans bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-800/30">
                            {tool.role}
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-1 border-t border-zinc-800/60">
                          {tool.features.map((feat, fIdx) => (
                            <div key={fIdx} className="text-[11px] text-zinc-400 flex items-start gap-2">
                              <span className="text-cyan-400 font-mono">•</span>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Tier Evolution of AI-Assisted Coding */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    The 4 Tiers of AI-Assisted Software Development
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.evolutionTiers.map((tier, eIdx) => (
                      <div key={eIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <span className="text-xs font-bold font-mono text-cyan-300">{tier.tier}</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{tier.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Practices for Developers */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Production Engineering Best Practices
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.engineeringBestPractices.map((bp, bIdx) => (
                      <div key={bIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <h5 className="text-xs font-bold text-amber-300 font-mono uppercase">{bp.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">{bp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Engineering Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 52: OpenAI vs. Azure AI & LLM vs. CLIP Inference */}
            {item.id === 'openai-vs-azure-ai' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">OpenAI vs. Azure AI Core Relationship: </strong>
                  {item.coreDefinition}
                </div>

                {/* Core Platforms Breakdown: OpenAI & Azure AI */}
                {item.coreEntities && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.coreEntities.map((ent, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-sm font-bold font-mono ${ent.accent}`}>
                              {ent.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-300 border border-zinc-800">
                              {ent.category}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {ent.description}
                          </p>
                        </div>
                        {ent.example && (
                          <div className="pt-2 border-t border-zinc-900 text-[11px] text-zinc-400 font-sans">
                            <strong className="text-cyan-400 font-mono">Example: </strong>
                            {ent.example}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* What Exactly Do You Use OpenAI For? */}
                {item.whatDoYouUseOpenAiFor && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="space-y-1 border-b border-zinc-800 pb-3">
                      <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>System Architecture</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight pt-0.5">
                        {item.whatDoYouUseOpenAiFor.question}
                      </h4>
                      <p className="text-xs text-cyan-200/90 font-sans leading-relaxed">
                        {item.whatDoYouUseOpenAiFor.answer}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                      {item.whatDoYouUseOpenAiFor.architecturePipeline.map((comp, cIdx) => (
                        <div key={cIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between hover:border-cyan-500/30 transition">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-700/60 inline-block">
                              {comp.tag}
                            </span>
                            <div className="text-xs font-bold text-white font-mono text-cyan-200">
                              {comp.component}
                            </div>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                            {comp.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* How is LLM Inference Different from CLIP Inference? */}
                {item.inferenceComparison && (
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.inferenceComparison.title}</span>
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-sans italic">{item.inferenceComparison.subtext}</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                        <thead className="bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase">
                          <tr>
                            <th className="p-3 border-b border-zinc-800 w-1/5">Aspect</th>
                            <th className="p-3 border-b border-zinc-800 text-cyan-400 font-bold w-2/5">LLM Inference</th>
                            <th className="p-3 border-b border-zinc-800 text-amber-300 font-bold w-2/5">CLIP Inference</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 bg-black/60 font-sans">
                          {item.inferenceComparison.matrix.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-zinc-200">{row.aspect}</td>
                              <td className="p-3 text-cyan-200 font-mono text-[11px] leading-relaxed">{row.llmInference}</td>
                              <td className="p-3 text-amber-200 font-mono text-[11px] leading-relaxed">{row.clipInference}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Ecosystem Breakdown: OpenAI vs Azure AI vs Azure OpenAI */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    OpenAI vs. Azure AI vs. Azure OpenAI Infrastructure
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.platformComparison.map((plt, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <h5 className="text-xs font-bold text-cyan-300 font-mono uppercase">{plt.feature}</h5>
                        <div className="space-y-1.5 text-xs text-zinc-400">
                          <div><strong className="text-zinc-200 font-mono">OpenAI: </strong>{plt.openAi}</div>
                          <div><strong className="text-zinc-200 font-mono">Azure AI: </strong>{plt.azureAi}</div>
                          <div className="text-cyan-200/90 bg-cyan-950/20 p-2 rounded border border-cyan-800/30">
                            <strong className="text-cyan-300 font-mono">Azure OpenAI: </strong>{plt.azureOpenAi}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Dual-Inference Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 53: Inference Systems, Metrics & Optimization */}
            {item.id === 'inference' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is Inference? </strong>
                  {item.coreDefinition}
                </div>

                {/* Static vs. Dynamic Inference & Execution */}
                {item.staticVsDynamicInference && (
                  <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                          {item.staticVsDynamicInference.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Inference Architecture
                      </span>
                    </div>

                    {/* Inference Paradigms */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                        Model Configuration & Routing:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.staticVsDynamicInference.inferenceParadigms.map((p, pIdx) => (
                          <div key={pIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold font-mono ${p.accent}`}>
                                {p.name}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                {p.badge}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                              {p.desc}
                            </p>
                            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                              {p.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Execution Paradigms */}
                    <div className="space-y-2 pt-2 border-t border-zinc-900">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                        Computation Graph & Runtime Execution:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.staticVsDynamicInference.executionParadigms.map((e, eIdx) => (
                          <div key={eIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold font-mono ${e.accent}`}>
                                {e.name}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                {e.badge}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                              {e.desc}
                            </p>
                            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                              {e.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Core Triad Metrics */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>The Inference Triad: Latency, Throughput & Concurrency</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.coreTriad.map((triad, tIdx) => (
                      <div key={tIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-white font-mono">{triad.metric}</h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-700">
                            {triad.tag}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{triad.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production Solutions & Hardware */}
                {item.productionSolutions && (
                  <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Production Inference Solutions</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-zinc-400 font-sans">
                      {item.productionSolutions.strategies.map((strat, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 p-2 rounded bg-zinc-950 border border-zinc-800/60">
                          <span className="text-cyan-400 font-mono text-[11px]">✓</span>
                          <span>{strat}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-2.5 rounded border border-zinc-800/80">
                      <strong className="text-cyan-300">Hardware Primer: </strong>
                      {item.productionSolutions.hardwareNote}
                    </p>
                  </div>
                )}

                {/* 3 Inference Modes: Batch, Streaming, Caching */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Inference Execution Modes: Batch, Streaming & Caching
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {item.inferenceModes.map((mode, mIdx) => (
                      <div key={mIdx} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h5 className="text-sm font-bold text-amber-300 font-mono uppercase">{mode.mode}</h5>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">{mode.definition}</p>
                          <div className="space-y-1 pt-1 border-t border-zinc-800/60">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Key Benefits:</span>
                            {mode.benefits.map((b, bIdx) => (
                              <div key={bIdx} className="text-[11px] text-zinc-400 flex items-start gap-1.5">
                                <span className="text-emerald-400">•</span>
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-black text-[11px] text-zinc-400 border border-zinc-800 font-sans leading-relaxed">
                          <strong className="text-amber-400 font-mono">Trade-offs & Tuning: </strong>
                          {mode.tradeoffs}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two Phases of LLM Inference: Prefill vs Decode */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>The Two Essential Phases of LLM Inference</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.llmPhases.map((phase, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-white font-mono">{phase.phase}</h5>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            pIdx === 0 
                              ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50' 
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                          }`}>
                            {phase.bound}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{phase.desc}</p>
                        <p className="text-[11px] font-mono text-zinc-400 bg-black p-2 rounded border border-zinc-800">
                          <strong className="text-cyan-400">Example: </strong>{phase.example}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Context Window & Temperature Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.hyperparameters.map((hp, hIdx) => (
                    <div key={hIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <h5 className="text-xs font-bold text-cyan-300 font-mono uppercase">{hp.param}</h5>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">{hp.role}</p>
                      <p className="text-[11px] font-mono text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-800/30">
                        <strong>Operational Insight: </strong>{hp.note}
                      </p>
                    </div>
                  ))}
                </div>

                {/* PyTorch with torch.inference_mode(): */}
                {item.torchInferenceMode && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="space-y-0.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Code2 className="w-3 h-3 text-cyan-400" />
                          <span>PyTorch Runtime Optimization</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight pt-1">
                          {item.torchInferenceMode.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-cyan-300 bg-black px-3 py-1 rounded border border-zinc-800">
                          {item.torchInferenceMode.codeSnippet}
                        </span>
                        <button
                          onClick={() => handleCopyCode('code-torch-inf', item.torchInferenceMode.codeSnippet)}
                          className="text-zinc-500 hover:text-zinc-300 cursor-pointer"
                        >
                          {copiedId === 'code-torch-inf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/95 leading-relaxed font-mono">
                      <strong className="text-cyan-400 uppercase font-sans font-bold">Execution Mechanism: </strong>
                      {item.torchInferenceMode.explanation}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                      {item.torchInferenceMode.keyBenefits.map((ben, bIdx) => (
                        <div key={bIdx} className="p-2.5 rounded-lg bg-black border border-zinc-800 text-[11px] text-zinc-300 flex items-start gap-2">
                          <span className="text-cyan-400 font-mono">✓</span>
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6 Cost-Reduction Levers */}
                {item.costOptimization && (
                  <div className="space-y-3 p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="space-y-1 border-b border-zinc-800 pb-3">
                      <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase font-bold tracking-wider">
                        <Terminal className="w-3 h-3 text-emerald-400" />
                        <span>Financial Engineering & FinOps</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight pt-0.5">
                        Cost of Inference & 6 Optimization Levers
                      </h4>
                      {item.costOptimization.definition && (
                        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200/95 leading-relaxed font-mono">
                          <strong className="text-emerald-400 uppercase font-sans font-bold">What is Inference Cost? </strong>
                          {item.costOptimization.definition}
                        </div>
                      )}
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                        {item.costOptimization.overview}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {item.costOptimization.levers.map((lev, lIdx) => (
                        <div key={lIdx} className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1">
                          <div className="text-xs font-bold text-emerald-400 font-mono">{lev.lever}</div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{lev.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inference Quality Evaluation Matrix */}
                {item.qualityEvaluation && (
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Evaluating Inference Quality (Beyond Latency)</span>
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-sans italic">{item.qualityEvaluation.headline}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.qualityEvaluation.metrics.map((qm, qIdx) => (
                        <div key={qIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                          <div className="text-xs font-bold text-white font-mono text-cyan-300">{qm.metric}</div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{qm.target}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Production Hardening Checklist */}
                <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2">
                  <h5 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider">
                    Production Hardening Checklist
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {item.productionChecklist.map((chk, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                        <span className="text-emerald-400 font-mono">✔</span>
                        <span>{chk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Production Systems Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 54: Edge Cases & Resilient System Design */}
            {item.id === 'edge-cases' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is an Edge Case? </strong>
                  {item.coreDefinition}
                </div>

                {/* 6 Core Edge Cases & Solutions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>6 Critical Fashion AI Search Edge Cases & Production Fixes</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.primaryEdgeCases.map((ec) => (
                      <div key={ec.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between hover:border-amber-500/30 transition">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                              <span className="text-amber-400">{ec.id}.</span>
                              <span>{ec.title}</span>
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-700">
                              {ec.category}
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-800/30 text-[11px] text-rose-200/90 font-sans">
                            <strong className="text-rose-400 font-mono uppercase text-[10px] block">Problem:</strong>
                            {ec.problem}
                          </div>

                          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-[11px] text-emerald-200/90 font-sans">
                            <strong className="text-emerald-400 font-mono uppercase text-[10px] block">Solution:</strong>
                            {ec.solution}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Architecture Pattern:</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-amber-300 border border-zinc-800">
                            {ec.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Production Edge Cases */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                    Systemic Infrastructure & Deployment Failure Modes
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/3">Production Edge Case</th>
                            <th className="p-3 w-1/3 text-rose-400">System Risk</th>
                            <th className="p-3 w-1/3 text-emerald-400">Engineering Mitigation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.productionEdgeCases.map((pec, pIdx) => (
                            <tr key={pIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px]">{pec.case}</td>
                              <td className="p-3 text-rose-200/90 text-[11px] leading-relaxed">{pec.risk}</td>
                              <td className="p-3 text-emerald-200/90 text-[11px] leading-relaxed font-mono">{pec.mitigation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Root Cause Debugging Principle */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-200/95 leading-relaxed font-mono">
                  <strong className="text-amber-400 uppercase font-sans font-bold">Root-Cause Debugging Philosophy: </strong>
                  {item.debuggingPrinciple}
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Resilience Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 56: Debugging AI & Search Pipelines */}
            {item.id === 'debugging' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Philosophy Callout */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-zinc-950 to-rose-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-200/95 leading-relaxed font-mono flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                    <Bug className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-400 uppercase font-sans font-bold block mb-1">
                      First Principle of AI Debugging:
                    </strong>
                    <span>{item.corePhilosophy}</span>
                  </div>
                </div>

                {/* Step-by-Step Debugging Approach */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Step-by-Step Production Debugging Framework</span>
                  </h4>
                  <div className="space-y-3">
                    {item.debuggingSteps.map((step) => (
                      <div
                        key={step.step}
                        className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/30 transition flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs shrink-0">
                            0{step.step}
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-sm font-bold text-white font-mono">
                                Step {step.step} — {step.title}
                              </h5>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-800">
                                {step.summary}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                              {step.details}
                            </p>
                          </div>
                        </div>

                        <div className="w-full md:w-auto md:max-w-xs shrink-0 p-2.5 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-amber-300/90">
                          <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Action Item:</span>
                          {step.actionItem}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Techniques for Improving Model Results */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Common Techniques for Improving Model Results</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/4">Technique</th>
                            <th className="p-3 w-1/3 text-cyan-400">What It Improves</th>
                            <th className="p-3 w-5/12 text-emerald-400">Implementation Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.techniquesTable.map((tech, tIdx) => (
                            <tr key={tIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                                  {tech.technique}
                                </span>
                              </td>
                              <td className="p-3 text-cyan-200/90 text-[11px] leading-relaxed">
                                {tech.improves}
                              </td>
                              <td className="p-3 text-zinc-400 text-[11px] leading-relaxed font-sans">
                                {tech.howItWorks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Production Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 57: Prompt Engineering vs Fine-Tuning */}
            {item.id === 'prompt-engineering' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is Prompt Engineering? </strong>
                  {item.coreDefinition}
                </div>

                {/* Prompt Engineering vs Fine-Tuning Comparison Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Prompt Engineering vs. Fine-Tuning</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/4">Aspect</th>
                            <th className="p-3 w-3/8 text-cyan-400">Prompt Engineering</th>
                            <th className="p-3 w-3/8 text-amber-400">Fine-Tuning</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.comparisonTable.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                {row.feature}
                              </td>
                              <td className="p-3 text-cyan-200/90 text-[11px] leading-relaxed">
                                {row.promptEngineering}
                              </td>
                              <td className="p-3 text-amber-200/90 text-[11px] leading-relaxed">
                                {row.fineTuning}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Golden Engineering Rule Callout */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-200/95 leading-relaxed font-mono">
                  <strong className="text-amber-400 uppercase font-sans font-bold">Core Production Principle: </strong>
                  {item.goldenRule}
                </div>

                {/* Core Techniques Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Essential Production Prompting Techniques</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.engineeringTechniques.map((tech, tIdx) => (
                      <div key={tIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 hover:border-zinc-700 transition">
                        <h5 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{tech.technique}</span>
                        </h5>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans pl-5.5">
                          {tech.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 58: Ranking & Re-ranking */}
            {item.id === 'ranking-reranking' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is Ranking? </strong>
                  {item.coreDefinition}
                </div>

                {/* Retrieval vs Ranking Distinction */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                        Retrieval (Candidate Generation)
                      </h5>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.retrievalVsRanking.retrieval}
                    </p>
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-700">
                      Goal: Maximum Recall (Don't miss good items)
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                        Ranking (Precision Ordering)
                      </h5>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.retrievalVsRanking.ranking}
                    </p>
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-700">
                      Goal: Maximum Top-K Precision (Best items first)
                    </span>
                  </div>
                </div>

                {/* How to Calculate a Ranking Score */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How Do You Calculate a Ranking Score? (3 Core Approaches)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.rankingApproaches.map((app) => (
                      <div key={app.id} className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-sm font-bold text-white font-mono">
                              {app.name}
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-400 border border-zinc-800">
                              Method {app.id}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-black border border-zinc-800/80 text-[11px] font-mono text-cyan-300">
                            {app.method}
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                            {app.details}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-zinc-800/60">
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                            {app.pros}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hard Constraint Rule Alert */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs sm:text-sm text-rose-200/95 leading-relaxed font-mono">
                  <strong className="text-rose-400 uppercase font-sans font-bold block mb-1">
                    Critical Rule: Hard Constraints vs. Soft Penalties
                  </strong>
                  <span>{item.hardConstraintRule}</span>
                </div>

                {/* Multi-Stage Reranking Pipeline */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Two-Stage Production Reranking Pipeline</span>
                    </h4>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {item.rerankingDefinition}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {item.pipelineStages.map((stg, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 relative hover:border-cyan-500/30 transition">
                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                          {stg.stage}
                        </span>
                        <div className="text-sm font-bold text-white font-mono">
                          {stg.count}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {stg.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How Do You Know Your Ranking Improvements Worked? */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>How Do You Know Ranking Improvements Worked? (Evaluation Metrics)</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.evaluationMetrics.map((met, mIdx) => (
                      <div key={mIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-amber-500/30 transition">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-white font-mono">
                            {met.metric}
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-amber-300 border border-zinc-800">
                            {met.formula}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {met.definition}
                        </p>
                        <div className="text-[11px] font-mono text-zinc-500">
                          <strong className="text-zinc-400 uppercase text-[10px]">Production Objective: </strong>
                          {met.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">System Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 59: Authentication & Authorization */}
            {item.id === 'auth-authorization' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Principles Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Core Authentication & Authorization Architecture</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.corePrinciples.map((prin, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-xl bg-black border border-zinc-800/80 flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {prin}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major GenAI Risks & Mitigations */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>5 Major GenAI Production Risks & Engineering Mitigations</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.securityRisks.map((risk) => (
                      <div key={risk.id} className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                              <span className="text-rose-400">0{risk.id}.</span>
                              <span>{risk.risk}</span>
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-rose-300 border border-zinc-800">
                              Threat
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-800/30 text-[11px] text-rose-200/90 font-sans">
                            <strong className="text-rose-400 font-mono uppercase text-[10px] block mb-0.5">Vector:</strong>
                            {risk.threat}
                          </div>
                          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-[11px] text-emerald-200/90 font-sans">
                            <strong className="text-emerald-400 font-mono uppercase text-[10px] block mb-0.5">Mitigation:</strong>
                            {risk.mitigation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Poisoning & Inference Weight Isolation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>Data Poisoning Prevention</span>
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.dataPoisoningAndWeights.dataPoisoning}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inference Weight Isolation</span>
                    </h5>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.dataPoisoningAndWeights.inferenceWeightIsolation}
                    </p>
                  </div>
                </div>

                {/* Cloud Security Matrix (AWS / Azure) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How to Secure the Application on AWS or Azure (Layered Defense)</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/4">Cloud Security Layer</th>
                            <th className="p-3 w-3/4 text-cyan-400">Controls (AWS & Azure Reference Implementations)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.cloudSecurityLayers.map((csl, cIdx) => (
                            <tr key={cIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                                  {csl.layer}
                                </span>
                              </td>
                              <td className="p-3 text-zinc-300 text-[11px] leading-relaxed font-mono">
                                {csl.controls}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">Security Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 60: Python Tuple */}
            {item.id === 'tuple' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is a Tuple? </strong>
                  {item.coreDefinition}
                </div>

                {/* Critical Nuance Alert */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-200/95 leading-relaxed font-mono flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-400 uppercase font-sans font-bold block mb-1">
                      Critical Interview Nuance:
                    </strong>
                    <span>{item.criticalNuance}</span>
                  </div>
                </div>

                {/* Python Code Example */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>tuple_examples.py (Immutability & Nested References)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-tuple', item.codeExample)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-tuple' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.codeExample}
                  </pre>
                </div>

                {/* Tuple vs List Comparison Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tuple vs. List: Core Architectural Differences</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/4">Feature</th>
                            <th className="p-3 w-3/8 text-cyan-400">Tuple</th>
                            <th className="p-3 w-3/8 text-amber-400">List</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.tupleVsList.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                {row.feature}
                              </td>
                              <td className="p-3 text-cyan-200/90 text-[11px] leading-relaxed">
                                {row.tuple}
                              </td>
                              <td className="p-3 text-amber-200/90 text-[11px] leading-relaxed">
                                {row.list}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* AI & Engineering Use Cases */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Key Applications in AI & Data Pipelines</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.aiUseCases.map((uc, uIdx) => (
                      <div key={uIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 hover:border-zinc-700 transition">
                        <h5 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{uc.title}</span>
                        </h5>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans pl-5.5">
                          {uc.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Python Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 61: Pandas */}
            {item.id === 'pandas' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Definition Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">What is Pandas? </strong>
                  {item.coreDefinition}
                </div>

                {/* Common Uses in AI/ML */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>How Pandas is Used in AI & Machine Learning Workflows</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.commonUses.map((use, uIdx) => (
                      <div key={uIdx} className="p-3 rounded-xl bg-black border border-zinc-800/80 flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {use}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Pipeline Code Example */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>pandas_data_pipeline.py (EDA, Cleaning & Aggregation)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-pandas', item.codeExample)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-pandas' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.codeExample}
                  </pre>
                </div>

                {/* Essential Methods Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Essential Pandas Methods to Master</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/4">Method</th>
                            <th className="p-3 w-3/8 text-cyan-400">Purpose</th>
                            <th className="p-3 w-3/8 text-emerald-400">Practical Example</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.methodsTable.map((meth, mIdx) => (
                            <tr key={mIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                                  {meth.method}
                                </span>
                              </td>
                              <td className="p-3 text-zinc-300 text-[11px] leading-relaxed">
                                {meth.purpose}
                              </td>
                              <td className="p-3 text-amber-200/90 text-[11px] leading-relaxed font-mono">
                                {meth.example}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase">ETL Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 62: Python Core Concepts & Idioms */}
            {item.id === 'python' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Section Overview Banner */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200/90 leading-relaxed font-mono">
                  <strong className="text-cyan-400 uppercase font-sans font-bold">Python Fundamentals: </strong>
                  {item.summary}
                </div>

                {/* 5 Core Topics */}
                <div className="space-y-6">
                  {item.topics.map((t, idx) => (
                    <div key={t.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 hover:border-zinc-700 transition">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{t.title}</span>
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                            {t.definition}
                          </p>
                        </div>
                        {t.syntax && (
                          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black text-amber-300 border border-zinc-800">
                            {t.syntax}
                          </span>
                        )}
                      </div>

                      {/* Optional Parameter Breakdown (Slicing) */}
                      {t.breakdown && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {t.breakdown.map((b, bIdx) => (
                            <div key={bIdx} className="p-2.5 rounded-lg bg-black border border-zinc-800/80 space-y-0.5">
                              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase block">
                                {b.param}
                              </span>
                              <span className="text-[11px] text-zinc-400 leading-relaxed font-sans block">
                                {b.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Optional Interview Gotcha (Generator vs Tuple) */}
                      {t.interviewGotcha && (
                        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/95 leading-relaxed font-mono">
                          <strong className="text-amber-400 uppercase font-sans font-bold block mb-1">
                            Key Interview Gotcha:
                          </strong>
                          <span>{t.interviewGotcha}</span>
                        </div>
                      )}

                      {/* Code Block with Copy */}
                      <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                        <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-950 border-b border-zinc-800">
                          <span className="font-mono text-[11px] text-zinc-500">
                            python_snippet_{idx + 1}.py
                          </span>
                          <button
                            onClick={() => handleCopyCode(`code-py-${t.id}`, t.code)}
                            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                          >
                            {copiedId === `code-py-${t.id}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px]">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[10px]">Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3.5 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                          {t.code}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Core Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 63: Time & Space Complexity */}
            {item.id === 'time-space-complexity' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Time & Space Complexity Dual Concept Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                        Time Complexity
                      </h5>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.timeComplexityDef}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                        Space Complexity
                      </h5>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {item.spaceComplexityDef}
                    </p>
                  </div>
                </div>

                {/* Big O Notation Hierarchy */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Big O Complexity Growth Rates</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/4">Complexity</th>
                            <th className="p-3 w-1/4 text-cyan-400">Name</th>
                            <th className="p-3 w-1/2 text-emerald-400">Practical Example</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.bigONotation.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-300">
                                  {row.complexity}
                                </span>
                              </td>
                              <td className="p-3 text-cyan-200/90 text-[11px] leading-relaxed font-mono">
                                {row.name}
                              </td>
                              <td className="p-3 text-zinc-300 text-[11px] leading-relaxed">
                                {row.example}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Profiling Tools Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tools for Measuring Execution Time & Memory</span>
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            <th className="p-3 w-1/5">Tool</th>
                            <th className="p-3 w-1/4 text-cyan-400">Scope</th>
                            <th className="p-3 w-1/5 text-amber-400">Origin</th>
                            <th className="p-3 w-2/5 text-emerald-400">Primary Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.profilingTools.map((pt, pIdx) => (
                            <tr key={pIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3 font-semibold text-white font-mono text-[11px] whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-300">
                                  {pt.tool}
                                </span>
                              </td>
                              <td className="p-3 text-cyan-200/90 text-[11px] leading-relaxed font-mono">
                                {pt.scope}
                              </td>
                              <td className="p-3 text-amber-200/90 text-[11px] leading-relaxed">
                                {pt.origin}
                              </td>
                              <td className="p-3 text-zinc-300 text-[11px] leading-relaxed font-sans">
                                {pt.purpose}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Profiler vs Theoretical Big O Callout */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs sm:text-sm text-amber-200/95 leading-relaxed font-mono">
                  <strong className="text-amber-400 uppercase font-sans font-bold block mb-1">
                    Crucial Distinction:
                  </strong>
                  <span>{item.profilerVsTheoryNote}</span>
                </div>

                {/* Profiling Code Example */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>benchmark_profiling.py (timeit & tracemalloc)</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode('code-profiling', item.profilingCode)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                    >
                      {copiedId === 'code-profiling' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    {item.profilingCode}
                  </pre>
                </div>

                {/* 6 Steps to Manage Complexity in Production */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>How to Manage Complexity in a Production ML System (6 Strategies)</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.productionComplexityStrategies.map((strat) => (
                      <div key={strat.step} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 hover:border-zinc-700 transition">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                            {strat.step}
                          </span>
                          <h5 className="text-xs font-bold text-white font-mono">
                            {strat.title}
                          </h5>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans pl-7">
                          {strat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-black border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed font-mono">
                    <strong className="text-cyan-400 uppercase">Quality vs Speed Tradeoff: </strong>
                    {item.qualityTradeoffRule}
                  </div>
                </div>

                {/* The 9 Pre-Deployment Steps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>The 9 Critical Steps Before Production Model Deployment</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.preDeploymentChecklist.map((chk) => (
                      <div key={chk.step} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-amber-500/30 transition">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                            <span className="text-amber-400">{chk.step}.</span>
                            <span>{chk.name}</span>
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                            Phase {chk.step}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {chk.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Production Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 64: Uvicorn */}
            {item.id === 'uvicorn' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Question & Key Points Banner */}
                <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                        {item.question}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/40 shrink-0 self-start sm:self-auto">
                      Modern Async Python Stack
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {item.keyPoints.map((kp, kIdx) => (
                      <div
                        key={kIdx}
                        className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1.5 hover:border-zinc-700 transition"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            {kp.title}
                          </h5>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans pl-4">
                          {kp.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modern API Stack Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How the Layers Work Together in Production</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {item.stackBreakdown.map((layer, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5 hover:border-zinc-700 transition flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h5 className={`text-xs font-bold font-mono uppercase ${layer.accent}`}>
                              {layer.component}
                            </h5>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                              {layer.badge}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-white block font-semibold">
                            {layer.role}
                          </span>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                            {layer.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CLI Command Example */}
                {item.commandExample && (
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Run Uvicorn in Production / Development</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-uvicorn', item.commandExample.cli)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-uvicorn' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 bg-zinc-950/60 border-b border-zinc-800/80">
                      <code className="text-xs font-mono text-cyan-300 font-bold block overflow-x-auto">
                        $ {item.commandExample.cli}
                      </code>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-black">
                      {item.commandExample.details.map((d, dIdx) => (
                        <div key={dIdx} className="space-y-1">
                          <code className="text-[11px] font-mono text-amber-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                            {d.flag}
                          </code>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pt-1">
                            {d.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Production Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 65: Async vs. Sync */}
            {item.id === 'async-sync' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Sync vs Async Dual Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.coreConcepts.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className={`p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border space-y-2.5 shadow-xl ${
                        cIdx === 0 ? 'border-rose-900/40' : 'border-emerald-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              cIdx === 0 ? 'bg-rose-400' : 'bg-emerald-400'
                            }`}
                          ></span>
                          <h4
                            className={`text-xs sm:text-sm font-bold uppercase tracking-wider font-mono ${
                              cIdx === 0 ? 'text-rose-300' : 'text-emerald-300'
                            }`}
                          >
                            {c.type}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black px-2 py-0.5 rounded border border-zinc-800">
                          {cIdx === 0 ? 'Blocking I/O' : 'Yielding I/O'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                        {c.behavior}
                      </p>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-1 border-t border-zinc-900">
                        {c.impact}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Database Querying: Vector vs PostgreSQL Relational */}
                {item.dbQueryMechanics && (
                  <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                          {item.dbQueryMechanics.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 uppercase bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40 shrink-0 self-start sm:self-auto">
                        Vector vs. Relational Indexing
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Vector Query */}
                      <div className="p-4 rounded-xl bg-black border border-cyan-800/40 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wide">
                              {item.dbQueryMechanics.vectorQuery.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                              pgvector / ANN
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {item.dbQueryMechanics.vectorQuery.explanation}
                          </p>
                          <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
                            {item.dbQueryMechanics.vectorQuery.sqlSnippet}
                          </pre>
                          <div className="text-[11px] font-mono text-zinc-400">
                            Key Clause: <code className="text-amber-300">{item.dbQueryMechanics.vectorQuery.clause}</code>
                          </div>
                        </div>

                        {/* Vector Index Card */}
                        <div className="p-3 rounded-lg bg-zinc-950 border border-cyan-800/30 space-y-1 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                              {item.dbQueryMechanics.vectorQuery.indexLabel}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500">ANN Graphs</span>
                          </div>
                          <div className="text-xs font-bold text-white font-mono">
                            {item.dbQueryMechanics.vectorQuery.indexes}
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {item.dbQueryMechanics.vectorQuery.indexDetail}
                          </p>
                        </div>
                      </div>

                      {/* PostgreSQL Relational Query */}
                      <div className="p-4 rounded-xl bg-black border border-purple-800/40 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-300 font-mono uppercase tracking-wide">
                              {item.dbQueryMechanics.relationalQuery.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                              SQL Relational
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                            {item.dbQueryMechanics.relationalQuery.explanation}
                          </p>
                          <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-purple-300 overflow-x-auto leading-relaxed">
                            {item.dbQueryMechanics.relationalQuery.sqlSnippet}
                          </pre>
                          <div className="text-[11px] font-mono text-zinc-400">
                            Key Clause: <code className="text-amber-300">{item.dbQueryMechanics.relationalQuery.clause}</code>
                          </div>
                        </div>

                        {/* Relational Index Card */}
                        <div className="p-3 rounded-lg bg-zinc-950 border border-purple-800/30 space-y-1 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                              {item.dbQueryMechanics.relationalQuery.indexLabel}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500">Scalar Trees</span>
                          </div>
                          <div className="text-xs font-bold text-white font-mono">
                            {item.dbQueryMechanics.relationalQuery.indexes}
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {item.dbQueryMechanics.relationalQuery.indexDetail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Architecture Takeaway */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Core Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 66: Load Balancing & Load Testing */}
            {item.id === 'load-balancing' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Dual Focus: Load Balancing & Load Testing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Load Balancing Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 space-y-3 shadow-xl flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                            Load Balancing
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                          Traffic Distribution
                        </span>
                      </div>
                      <p className="text-xs text-zinc-200 font-semibold font-sans">
                        {item.loadBalancingConcept.definition}
                      </p>
                      <div className="p-3 rounded-xl bg-black border border-zinc-800 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                          <span>Architecture Example:</span>
                        </div>
                        <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-300">
                          {item.loadBalancingConcept.example}
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {['API Replica #1', 'API Replica #2', 'API Replica #3'].map((rep, rIdx) => (
                            <div key={rIdx} className="p-2 rounded bg-cyan-950/20 border border-cyan-800/30 text-center font-mono text-[10px] text-cyan-200">
                              {rep}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-1.5 pt-2 text-[11px] text-zinc-400 border-t border-zinc-900 font-sans">
                      {item.loadBalancingConcept.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Load Testing & p95 Latency Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-amber-800/40 space-y-3 shadow-xl flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-amber-400" />
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                            Load Testing & Metrics
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 uppercase bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                          Capacity Validation
                        </span>
                      </div>
                      <p className="text-xs text-zinc-200 font-semibold font-sans">
                        {item.loadTestingConcept.definition}
                      </p>

                      {/* p95 Latency Box */}
                      <div className="p-3.5 rounded-xl bg-black border border-amber-900/50 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wide">
                            {item.loadTestingConcept.p95Latency.term}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            95th Percentile
                          </span>
                        </div>
                        <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
                          {item.loadTestingConcept.p95Latency.definition}
                        </p>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-1 border-t border-zinc-900">
                          {item.loadTestingConcept.p95Latency.significance}
                        </p>
                      </div>
                    </div>

                    {/* Realistic Testing Warning */}
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30 text-[11px] text-rose-200/90 leading-relaxed font-mono">
                      <strong className="text-rose-400 uppercase font-sans font-bold block mb-0.5">Testing Mandate:</strong>
                      {item.loadTestingConcept.goldenRule}
                    </div>
                  </div>
                </div>

                {/* Load Testing Tools Table/Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Industry Load Testing Tools</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.loadTestingConcept.tools.map((tool, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                              {tool.name}
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                              {tool.type}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans pt-1">
                            {tool.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Production Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 67: Docker */}
            {item.id === 'docker' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Concept Banner & Laptop vs Production Challenge */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                        Containerization Principle
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/40">
                      Immutable Environment
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans font-medium">
                    {item.containerization ? item.containerization.definition : item.coreConcept}
                  </p>
                  
                  {item.containerization && (
                    <div className="p-3.5 rounded-xl bg-black border border-cyan-900/40 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold text-sm mt-0.5">⚠️</span>
                        <div className="space-y-1">
                          <p className="text-xs text-amber-200/90 font-sans leading-relaxed">
                            {item.containerization.scenario}
                          </p>
                          <p className="text-xs text-emerald-300 font-sans font-medium pt-1">
                            ✓ {item.containerization.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* What a Container Usually Includes */}
                {item.containerization && item.containerization.includesList && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.containerization.includesTitle}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.containerization.includesList.map((inc, iIdx) => (
                        <div
                          key={iIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2.5 hover:border-zinc-700 transition"
                        >
                          <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                            0{iIdx + 1}
                          </span>
                          <span className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                            {inc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Docker vs Kubernetes Tools Breakdown */}
                {item.orchestrationTools && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Container Execution vs. Cluster Orchestration</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.orchestrationTools.map((tool, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-base font-bold font-mono ${tool.accent}`}>
                                {tool.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-300 border border-zinc-800">
                                {tool.badge}
                              </span>
                            </div>
                            <div className="text-xs text-zinc-200 font-sans font-semibold">
                              {tool.role}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-zinc-900 text-xs text-zinc-400 font-sans">
                            <strong className="text-amber-400 font-mono text-[11px]">Example: </strong>
                            {tool.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dockerfile & Directives Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>A Simple FastAPI Dockerfile</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Code Block */}
                    <div className="lg:col-span-6 rounded-xl overflow-hidden border border-zinc-800 bg-black flex flex-col justify-between">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800">
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Dockerfile</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode('code-dockerfile', item.dockerfileCode)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                        >
                          {copiedId === 'code-dockerfile' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Dockerfile</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed h-full">
                        {item.dockerfileCode}
                      </pre>
                    </div>

                    {/* Directives Breakdown */}
                    <div className="lg:col-span-6 space-y-2">
                      {item.dockerfileDirectives.map((dir, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <code className="text-[11px] font-mono text-cyan-300 font-bold">
                              {dir.directive}
                            </code>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-800">
                              {dir.purpose}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                            {dir.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Build and Run CLI Commands */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Build and Run Commands</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.cliCommands.map((cmdItem, cIdx) => (
                      <div
                        key={cIdx}
                        className="rounded-xl overflow-hidden border border-zinc-800 bg-black flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
                            <span className="text-xs font-bold text-white font-mono">
                              {cmdItem.title}
                            </span>
                            <button
                              onClick={() => handleCopyCode(`code-cmd-${cIdx}`, cmdItem.cmd)}
                              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                            >
                              {copiedId === `code-cmd-${cIdx}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="p-3.5 bg-zinc-950/50 border-b border-zinc-800/80">
                            <code className="text-xs font-mono text-cyan-300 font-bold block">
                              $ {cmdItem.cmd}
                            </code>
                          </div>
                        </div>
                        <div className="p-3 text-[11px] text-zinc-400 font-sans leading-relaxed bg-black">
                          {cmdItem.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging & Deployment Strategy */}
                {item.packageModelApi && (
                  <div className="space-y-4">
                    {/* Package (Model + API) Callout */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.packageModelApi.title}</span>
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                          Production Image
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {item.packageModelApi.desc}
                      </p>
                    </div>

                    {/* Deploy It - Options Table & Grid */}
                    {item.deploymentOptions && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{item.deploymentOptionsIntro.title}</span>
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {item.deploymentOptionsIntro.subtitle}
                          </span>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-800 bg-black">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-zinc-900/90 text-zinc-400 font-mono border-b border-zinc-800">
                              <tr>
                                <th className="py-3 px-4 font-semibold text-zinc-300 w-1/3">Deployment Option</th>
                                <th className="py-3 px-4 font-semibold text-emerald-400">When to consider it</th>
                                <th className="py-3 px-4 font-semibold text-zinc-400">Infrastructure Paradigm</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/80 font-sans">
                              {item.deploymentOptions.map((opt, oIdx) => (
                                <tr key={oIdx} className="hover:bg-zinc-900/40 transition">
                                  <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                                    <span className={opt.accent}>{opt.option}</span>
                                  </td>
                                  <td className="py-3.5 px-4 font-medium text-zinc-200">
                                    {opt.whenToConsider}
                                  </td>
                                  <td className="py-3.5 px-4">
                                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                                      {opt.badge}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="grid grid-cols-1 md:hidden gap-3">
                          {item.deploymentOptions.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-xs font-bold font-mono ${opt.accent}`}>
                                  {opt.option}
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-zinc-300 border border-zinc-800">
                                  {opt.badge}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                                {opt.whenToConsider}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Production Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 68: CI/CD */}
            {item.id === 'cicd' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Concept & 3-way CI/CD Matrix */}
                <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                        {item.coreConcept}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/40 shrink-0 self-start sm:self-auto">
                      Automated Release Gates
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.ciCdDefinitions.map((def, dIdx) => (
                      <div
                        key={dIdx}
                        className={`p-4 rounded-xl bg-black border space-y-2 flex flex-col justify-between ${def.border}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h5 className={`text-xs font-bold font-mono uppercase ${def.accent}`}>
                              {def.term}
                            </h5>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                              {def.tag}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans pt-1">
                            {def.definition}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7-Stage Typical Pipeline Flow */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>A Typical 7-Stage CI/CD Pipeline</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
                    {item.pipelineStages.map((stg) => (
                      <div
                        key={stg.step}
                        className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between hover:border-zinc-700 transition"
                      >
                        <div>
                          <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold mb-1.5">
                            {stg.step}
                          </span>
                          <h6 className="text-[11px] font-bold text-white font-mono leading-tight">
                            {stg.name}
                          </h6>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-sans leading-relaxed pt-1">
                          {stg.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Endpoint Card */}
                {item.healthEndpoint && (
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-bold text-white">{item.healthEndpoint.title}</span>
                        <code className="text-emerald-400 text-[11px]">{item.healthEndpoint.endpoint}</code>
                      </div>
                      <button
                        onClick={() => handleCopyCode('code-health', item.healthEndpoint.codeSnippet)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700 transition cursor-pointer"
                      >
                        {copiedId === 'code-health' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      <div className="lg:col-span-7">
                        <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
                          {item.healthEndpoint.codeSnippet}
                        </pre>
                      </div>
                      <div className="lg:col-span-5 text-xs text-zinc-300 font-sans leading-relaxed">
                        {item.healthEndpoint.desc}
                      </div>
                    </div>
                  </div>
                )}

                {/* Monitoring: System vs. Model vs. RAG */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dual-Track Observability: Track Both System & Model Behavior</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {item.monitoringStreams.map((mon, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h5 className={`text-xs font-bold font-mono uppercase ${mon.accent}`}>
                              {mon.category}
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                              {mon.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-sans pt-1">
                            {mon.metrics}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rollback Strategy Protocol */}
                {item.rollbackStrategy && (
                  <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-rose-900/40 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-2.5 gap-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-rose-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                          Rollback Strategy Protocol
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-rose-300 uppercase bg-rose-950/40 px-2.5 py-0.5 rounded border border-rose-800/40 shrink-0 self-start sm:self-auto">
                        Failure Recovery
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed font-medium">
                      {item.rollbackStrategy.definition}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                      {item.rollbackStrategy.steps.map((st) => (
                        <div
                          key={st.num}
                          className="p-3 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-rose-950 border border-rose-800 text-rose-400 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                              {st.num}
                            </span>
                            <span className="text-[11px] font-bold text-white font-mono">{st.title}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed pt-1">
                            {st.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Artifact Versioning Mandate */}
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-[11px] text-amber-200/90 leading-relaxed font-mono">
                      <strong className="text-amber-400 uppercase font-sans font-bold block mb-0.5">Crucial Mandate:</strong>
                      {item.rollbackStrategy.goldenRule}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Production Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 69: Model Choice */}
            {item.id === 'model-choice' && (
              <div className="space-y-6 text-xs sm:text-sm text-zinc-300">
                {/* Core Rule Callout Banner & Verbatim Checklist */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-2.5 gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-mono">
                        {item.question}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/40 shrink-0 self-start sm:self-auto">
                      Empirical Selection
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-cyan-900/50 space-y-3">
                    <div className="text-xs sm:text-sm text-cyan-200 font-sans font-semibold leading-relaxed">
                      {item.coreRule}
                    </div>
                    {item.verbatimBullets && (
                      <ul className="space-y-2 pt-1 font-sans text-xs text-zinc-300">
                        {item.verbatimBullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="text-cyan-400 font-bold mt-0.5 text-sm">•</span>
                            <span className="font-medium text-white">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* 6 Evaluation Criteria */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>The 6 Core Selection Criteria</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {item.criteria.map((crit, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                              {cIdx + 1}
                            </span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-amber-300 border border-zinc-800">
                              {crit.badge}
                            </span>
                          </div>
                          <h5 className="text-xs font-bold text-white font-mono leading-snug pt-1">
                            {crit.title}
                          </h5>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                            {crit.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 70: Production Check - Measuring AI Agents in Production */}
            {item.id === 'production-check' && (
              <div className="space-y-6">
                {/* Core Philosophy Callout */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.question}</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-800">
                      Production Observability
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-rose-900/50 space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-rose-400 font-bold text-base leading-none mt-0.5">⚠️</span>
                      <p className="text-xs sm:text-sm text-rose-200 font-sans font-semibold leading-relaxed">
                        {item.coreRule}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics Table & Visual Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Production Agent Evaluation Metrics (Metric vs. What It Tells You)</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      6 Core Production Signals
                    </span>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-800 bg-black">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900/90 text-zinc-400 font-mono border-b border-zinc-800">
                        <tr>
                          <th className="py-3 px-4 font-semibold text-zinc-300">Metric</th>
                          <th className="py-3 px-4 font-semibold text-zinc-300">Category</th>
                          <th className="py-3 px-4 font-semibold text-emerald-400">What it tells you</th>
                          <th className="py-3 px-4 font-semibold text-zinc-300">Production SRE Focus</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 font-sans">
                        {item.agentMetrics.map((m, mIdx) => (
                          <tr key={mIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                              <span className={`inline-block ${m.accent}`}>{m.metric}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                                {m.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-zinc-100">
                              {m.tellsYou}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {m.detail}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Responsive Grid View for Mobile / Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {item.agentMetrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-zinc-500">
                              0{mIdx + 1}
                            </span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-cyan-300 border border-zinc-800">
                              {m.category}
                            </span>
                          </div>
                          <div>
                            <h5 className={`text-sm font-bold font-mono ${m.accent}`}>
                              {m.metric}
                            </h5>
                            <div className="mt-1.5 p-2 rounded-lg bg-black border border-zinc-800 text-xs font-semibold text-zinc-200">
                              {m.tellsYou}
                            </div>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                            {m.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>

                {/* LLM Production Failure: Discrete Category Handling */}
                {item.llmProductionFailure && (
                  <div className="space-y-5 p-5 rounded-2xl bg-zinc-950/90 border border-rose-800/40 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-rose-400" />
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-400 font-mono">
                          {item.llmProductionFailure.headline}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-rose-300 uppercase bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800/60 shrink-0 self-start sm:self-auto">
                        SRE & Fault Tolerance
                      </span>
                    </div>

                    {/* Verbatim Alert */}
                    <div className="p-4 rounded-xl bg-black border border-rose-800/50 space-y-1.5">
                      <div className="flex items-start gap-2.5">
                        <span className="text-rose-400 text-sm mt-0.5">⚠️</span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-rose-200 font-sans leading-relaxed">
                            {item.llmProductionFailure.verbatim}
                          </p>
                          <p className="text-xs text-zinc-400 font-mono mt-1">
                            {item.llmProductionFailure.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 5 Distinct Failure Categories */}
                    <div className="space-y-3 pt-1">
                      <h5 className="text-xs font-bold text-zinc-300 font-mono uppercase tracking-wider">
                        5 Separate Production Failure Modes & Handling Strategies
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {item.llmProductionFailure.failureCategories.map((cat, cIdx) => (
                          <div
                            key={cIdx}
                            className={`p-4 rounded-xl bg-black border ${cat.border} hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-2">
                                <h6 className={`text-xs font-bold font-mono ${cat.accent}`}>
                                  {cat.mode}
                                </h6>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                                  {cat.badge}
                                </span>
                              </div>
                              <div className="text-[11px] text-zinc-400">
                                <span className="text-zinc-500 font-mono">Root Cause: </span>
                                <span className="text-zinc-300 font-sans">{cat.rootCause}</span>
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed">
                              <strong className="text-cyan-400 font-mono block mb-1">Separate Handling:</strong>
                              <span>{cat.separateHandling}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Resilience Checklist */}
                    {item.llmProductionFailure.productionResilienceChecklist && (
                      <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            Production Resilience Architecture Checklist
                          </h5>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.llmProductionFailure.productionResilienceChecklist.map((chk, kIdx) => (
                            <div key={kIdx} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800/80">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span className="leading-relaxed">{chk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Item 71: Caching - AI Systems & High-Throughput Inference */}
            {item.id === 'caching' && (
              <div className="space-y-6">
                {/* Core Principle Callout */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inference Acceleration & Cost Containment</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800">
                      Tiered AI Caching
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-amber-900/50 space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-base leading-none mt-0.5">⚡</span>
                      <div>
                        <p className="text-xs sm:text-sm text-amber-200 font-sans font-semibold leading-relaxed">
                          {item.corePrinciple}
                        </p>
                        <p className="text-xs text-zinc-400 font-mono mt-1">
                          {item.verbatimIntroduction}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common AI Caches Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>The 5 Core AI Cache Layers</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      End-to-End System Caches
                    </span>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-800 bg-black">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900/90 text-zinc-400 font-mono border-b border-zinc-800">
                        <tr>
                          <th className="py-3 px-4 font-semibold text-zinc-300">Cache Layer</th>
                          <th className="py-3 px-4 font-semibold text-cyan-400">What It Stores (Function)</th>
                          <th className="py-3 px-4 font-semibold text-zinc-300">Architecture Implementation</th>
                          <th className="py-3 px-4 font-semibold text-emerald-400">Primary System Benefit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 font-sans">
                        {item.cacheTypes.map((c, cIdx) => (
                          <tr key={cIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                              <span className={`inline-block ${c.accent}`}>{c.name}</span>
                              <div className="text-[10px] font-normal text-zinc-500 font-mono mt-0.5">
                                {c.badge}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-zinc-100">
                              {c.whatItStores}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {c.example}
                            </td>
                            <td className="py-3.5 px-4 text-emerald-300 text-xs font-medium">
                              {c.benefit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Responsive Grid View for Mobile / Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {item.cacheTypes.map((c, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-zinc-500">
                              0{cIdx + 1}
                            </span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-amber-300 border border-zinc-800">
                              {c.badge}
                            </span>
                          </div>
                          <div>
                            <h5 className={`text-sm font-bold font-mono ${c.accent}`}>
                              {c.name}
                            </h5>
                            <div className="mt-1.5 p-2 rounded-lg bg-black border border-zinc-800 text-xs font-semibold text-zinc-200">
                              {c.whatItStores}
                            </div>
                          </div>
                          <div className="space-y-1.5 pt-1 text-xs">
                            <p className="text-zinc-400 leading-relaxed font-sans">
                              <strong className="text-zinc-300 font-mono text-[11px]">System: </strong>
                              {c.example}
                            </p>
                            <p className="text-emerald-400 leading-relaxed font-sans font-medium text-[11px]">
                              <strong className="text-emerald-500 font-mono">Benefit: </strong>
                              {c.benefit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 72: Backend Architecture - Beyond Onion Architecture */}
            {item.id === 'backend-architecture' && (
              <div className="space-y-6">
                {/* Core Question & Scope Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.question}</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800">
                      System Topologies
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-cyan-900/50 space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-base leading-none mt-0.5">🏛️</span>
                      <p className="text-xs sm:text-sm text-cyan-200 font-sans leading-relaxed">
                        {item.coreContext}
                      </p>
                    </div>
                  </div>
                </div>

                {/* The 4 Architectural Paradigms Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Major Architectures Beyond Onion Architecture</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      4 Core Patterns
                    </span>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-800 bg-black">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900/90 text-zinc-400 font-mono border-b border-zinc-800">
                        <tr>
                          <th className="py-3 px-4 font-semibold text-zinc-300">Architecture Pattern</th>
                          <th className="py-3 px-4 font-semibold text-emerald-400">Core Definition</th>
                          <th className="py-3 px-4 font-semibold text-zinc-300">System Mechanics</th>
                          <th className="py-3 px-4 font-semibold text-cyan-400">Optimal Use Case</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/80 font-sans">
                        {item.architectures.map((arch, aIdx) => (
                          <tr key={aIdx} className="hover:bg-zinc-900/40 transition">
                            <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                              <span className={`inline-block ${arch.accent}`}>{arch.name}</span>
                              <div className="text-[10px] font-normal text-zinc-500 font-mono mt-0.5">
                                {arch.badge}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-zinc-100">
                              {arch.definition}
                            </td>
                            <td className="py-3.5 px-4 text-zinc-400 text-xs">
                              {arch.howItWorks}
                            </td>
                            <td className="py-3.5 px-4 text-cyan-300 text-xs font-medium">
                              {arch.whenToUse}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Responsive Grid Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.architectures.map((arch, aIdx) => (
                      <div
                        key={aIdx}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-zinc-500">
                              Pattern 0{aIdx + 1}
                            </span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-amber-300 border border-zinc-800">
                              {arch.badge}
                            </span>
                          </div>
                          <div>
                            <h5 className={`text-sm font-bold font-mono ${arch.accent}`}>
                              {arch.name}
                            </h5>
                            <div className="mt-1.5 p-2.5 rounded-lg bg-black border border-zinc-800 text-xs font-semibold text-zinc-200 font-sans">
                              {arch.definition}
                            </div>
                          </div>
                          <div className="space-y-2 pt-1 text-xs">
                            <p className="text-zinc-400 leading-relaxed font-sans">
                              <strong className="text-zinc-300 font-mono text-[11px]">Mechanics: </strong>
                              {arch.howItWorks}
                            </p>
                            <p className="text-cyan-300 leading-relaxed font-sans font-medium text-[11px] pt-1 border-t border-zinc-900">
                              <strong className="text-cyan-400 font-mono">When to Use: </strong>
                              {arch.whenToUse}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 73: ONNX - Open Neural Network Exchange & Runtime */}
            {item.id === 'onnx' && (
              <div className="space-y-6">
                {/* Core Format vs Runtime Callout */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Model Representation & Open Standard</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800">
                      Open Standard
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-cyan-900/50 space-y-3">
                    <p className="text-xs sm:text-sm text-cyan-200 font-sans leading-relaxed">
                      {item.definition}
                    </p>
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                      <strong className="text-amber-400">Key Distinction: </strong>
                      {item.formatVsRuntime}
                    </div>
                  </div>
                </div>

                {/* Why is ONNX useful? Real-world YOLO Inspection Context */}
                {item.yoloExample && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.yoloExample.title}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        YOLO Logistics Case Study
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 italic">
                      💡 {item.yoloExample.scenario}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {item.yoloExample.reasons.map((r, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-mono font-bold text-zinc-500">
                                0{rIdx + 1}
                              </span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                                {r.badge}
                              </span>
                            </div>
                            <h5 className={`text-sm font-bold font-mono ${r.accent}`}>
                              {r.title}
                            </h5>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans pt-1">
                              {r.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Operational Caveat */}
                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/50 flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-base mt-0.5 shrink-0">⚠️</span>
                      <p className="text-xs text-amber-200/90 font-sans leading-relaxed">
                        {item.caveat}
                      </p>
                    </div>
                  </div>
                )}

                {/* Related Concepts: Model Pruning & DeepSparse */}
                {item.relatedConcepts && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-purple-400" />
                      <span>Related Optimization Technologies (Pruning & Sparse Inference)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.relatedConcepts.map((concept, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className={`text-sm font-bold font-mono ${concept.accent}`}>
                              {concept.name}
                            </h5>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-300 border border-zinc-800">
                              {concept.badge}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-black border border-zinc-800 text-xs font-semibold text-zinc-200">
                            {concept.definition}
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                            {concept.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 74: GPU / CUDA & cuDNN */}
            {item.id === 'gpu-cuda' && (
              <div className="space-y-6">
                {/* Core Concept Banner & Parallel Matrix Principle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Parallel Computing Platform</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                      Hardware Acceleration
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-emerald-800/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-emerald-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                    <div className="p-3.5 rounded-xl bg-black border border-emerald-900/50 flex items-start gap-3">
                      <span className="text-emerald-400 font-bold text-base leading-none mt-0.5">⚡</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {item.gpuParallelPrinciple}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Where CUDA is Useful */}
                {item.usefulAreas && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.usefulAreasIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Workload Applications
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.usefulAreas.map((area, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[11px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                            0{aIdx + 1}
                          </span>
                          <span className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                            {area}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* The Triad: GPU vs CUDA vs cuDNN */}
                {item.triadHierarchy && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>The Hardware-to-Software Stack (GPU vs. CUDA vs. cuDNN)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {item.triadHierarchy.map((layer, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-4 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 transition space-y-2.5 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-base font-bold font-mono ${layer.accent}`}>
                                {layer.entity}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                                {layer.badge}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200 font-sans">
                              {layer.definition}
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                              {layer.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 75: AI Fairness / Auditing */}
            {item.id === 'ai-fairness-auditing' && (
              <div className="space-y-6">
                {/* Core Definitions: Fairness & Auditing */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                      <span>Responsible AI Foundations</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-800">
                      Ethics & Compliance
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fairness Card */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold font-mono text-emerald-400">
                          AI Fairness
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-emerald-300 border border-zinc-800">
                          Parity & Equity
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {item.fairnessDefinition}
                      </p>
                    </div>

                    {/* Auditing Card */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold font-mono text-cyan-400">
                          AI Auditing
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-cyan-300 border border-zinc-800">
                          Verification Process
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {item.auditingDefinition}
                      </p>
                    </div>
                  </div>
                </div>

                {/* What is an AI audit checklist? */}
                {item.checklist && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.checklistQuestion}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        7 Core Pillars
                      </span>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-800 bg-black">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-zinc-900/90 text-zinc-400 font-mono border-b border-zinc-800">
                          <tr>
                            <th className="py-3 px-4 font-semibold text-zinc-300 w-1/4">Audit Pillar</th>
                            <th className="py-3 px-4 font-semibold text-emerald-400">Key Audit Question</th>
                            <th className="py-3 px-4 font-semibold text-zinc-300">Engineering Audit Focus</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/80 font-sans">
                          {item.checklist.map((chk, cIdx) => (
                            <tr key={cIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                                <span className={chk.accent}>{chk.pillar}</span>
                                <div className="text-[10px] font-normal text-zinc-500 font-mono mt-0.5">
                                  {chk.badge}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-zinc-100">
                                {chk.question}
                              </td>
                              <td className="py-3.5 px-4 text-zinc-400 text-xs">
                                {chk.detail}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Responsive Grid Cards for Mobile */}
                    <div className="grid grid-cols-1 md:hidden gap-3">
                      {item.checklist.map((chk, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`text-sm font-bold font-mono ${chk.accent}`}>
                                {chk.pillar}
                              </span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-300 border border-zinc-800">
                                {chk.badge}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-zinc-200 font-sans">
                              {chk.question}
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
                              {chk.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 76: AutoML & ML Pipelines */}
            {item.id === 'automl' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Automated Machine Learning</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800">
                      AutoML & Pipelines
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-800/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-cyan-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                    <div className="p-3.5 rounded-xl bg-black border border-cyan-900/50 flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-base leading-none mt-0.5">🤖</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {item.automlCapability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6 Manual Developer Steps AutoML Automates */}
                {item.manualSteps && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.manualStepsIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Typical Workflow
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.manualSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono text-[11px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                            0{sIdx + 1}
                          </span>
                          <span className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                            {step.replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What AutoML Does NOT Guarantee */}
                {item.whatItDoesNotGuarantee && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.whatItDoesNotGuaranteeIntro}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.whatItDoesNotGuarantee.map((caveat, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 flex items-start gap-2.5"
                        >
                          <span className="text-rose-400 font-bold text-sm shrink-0 mt-0.5">⚠️</span>
                          <span className="text-xs text-rose-200/90 font-sans leading-relaxed">
                            {caveat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common AutoML Tools */}
                {item.commonTools && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>Common AutoML Tools & Platforms</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.commonTools.map((tool, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-purple-300 font-mono">
                              {tool.name}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                              {tool.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                            {tool.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ML Pipeline Definition Banner */}
                {item.mlPipelineDefinition && (
                  <div className="p-4 rounded-xl bg-black border border-blue-900/50 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs font-bold text-blue-300 font-mono uppercase tracking-wider">
                        {item.mlPipelineDefinition.term}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                      {item.mlPipelineDefinition.definition}
                    </p>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 77: Redis */}
            {item.id === 'redis' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-rose-400" />
                      <span>In-Memory Data Store</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-800">
                      Cache • Broker • Storage
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-rose-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-rose-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                    <div className="p-3 rounded-xl bg-black border border-rose-950 flex items-center gap-3">
                      <span className="text-rose-400 font-bold text-base leading-none">⚡</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Operates primarily in RAM with asynchronous disk persistence, achieving sub-millisecond p99 latencies for high-throughput reads and writes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Core Roles: Cache, Message Broker, Fast Data-Access Layer */}
                {item.threeCoreRoles && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>The 3 Core Redis Roles</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Architecture Pillars
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {item.threeCoreRoles.map((roleObj, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-base">{roleObj.icon}</span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                                {roleObj.badge}
                              </span>
                            </div>
                            <h5 className={`text-xs font-bold font-mono ${roleObj.accent}`}>
                              {roleObj.role}
                            </h5>
                            <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                              {roleObj.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-zinc-900 space-y-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                              Key Use Cases:
                            </span>
                            <ul className="space-y-1">
                              {roleObj.useCases.map((uc, uIdx) => (
                                <li key={uIdx} className="text-[11px] text-zinc-400 font-sans flex items-start gap-1.5 leading-snug">
                                  <span className="text-zinc-600 mt-0.5">•</span>
                                  <span>{uc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supported Data Structures Grid */}
                {item.supportedDataStructures && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Native In-Memory Data Structures</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.supportedDataStructures.map((ds, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-900/30 transition space-y-1"
                        >
                          <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                            <code className="px-1.5 py-0.5 rounded bg-black border border-cyan-950 text-cyan-300 text-[11px]">
                              {ds.name}
                            </code>
                          </span>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                            {ds.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Persistence & Reliability Options */}
                {item.persistenceAndReliability && (
                  <div className="p-4 rounded-xl bg-black border border-zinc-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-300 font-mono uppercase tracking-wider">
                        Durability, Replication & High Availability
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {item.persistenceAndReliability.map((p, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1">
                          <span className="text-xs font-bold text-zinc-200 font-mono">
                            {p.mechanism}
                          </span>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 78: Data Drift & Model Drift */}
            {item.id === 'data-model-drift' && (
              <div className="space-y-6">
                {/* Header / Intro Callout */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      <span>Production ML Monitoring & Reliability</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800">
                      MLOps • Drift Detection
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-amber-800/40 shadow-xl space-y-2">
                    <p className="text-xs sm:text-sm text-amber-200 font-sans leading-relaxed font-semibold">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Core Definitions: Data Drift vs Model Drift Split Cards */}
                {item.coreDefinitions && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Data Drift Card */}
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-900/50 hover:border-blue-800 transition flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-blue-300 font-mono">
                            {item.coreDefinitions.dataDrift.term}
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                            {item.coreDefinitions.dataDrift.math}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-black border border-blue-950">
                          <p className="text-xs text-blue-100 font-medium font-sans leading-relaxed">
                            {item.coreDefinitions.dataDrift.definition}
                          </p>
                        </div>
                        <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                          {item.coreDefinitions.dataDrift.explanation}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            Root Causes:
                          </span>
                          <ul className="space-y-1">
                            {item.coreDefinitions.dataDrift.causes.map((c, cIdx) => (
                              <li key={cIdx} className="text-[11px] text-zinc-400 font-sans flex items-start gap-1.5">
                                <span className="text-blue-400 mt-0.5">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            Statistical Detection Tests:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.coreDefinitions.dataDrift.detectionMetrics.map((m, mIdx) => (
                              <span key={mIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-blue-300 border border-zinc-800">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-black/60 border border-zinc-900 text-[11px] text-zinc-400 font-sans italic">
                        <strong className="text-blue-400 font-mono not-italic">Example: </strong>
                        {item.coreDefinitions.dataDrift.example}
                      </div>
                    </div>

                    {/* Model Drift Card */}
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-900/50 hover:border-purple-800 transition flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-purple-300 font-mono">
                            {item.coreDefinitions.modelDrift.term}
                          </h5>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                            {item.coreDefinitions.modelDrift.math}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-black border border-purple-950">
                          <p className="text-xs text-purple-100 font-medium font-sans leading-relaxed">
                            {item.coreDefinitions.modelDrift.definition}
                          </p>
                        </div>
                        <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                          {item.coreDefinitions.modelDrift.explanation}
                        </p>

                        <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            Root Causes:
                          </span>
                          <ul className="space-y-1">
                            {item.coreDefinitions.modelDrift.causes.map((c, cIdx) => (
                              <li key={cIdx} className="text-[11px] text-zinc-400 font-sans flex items-start gap-1.5">
                                <span className="text-purple-400 mt-0.5">•</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                            Performance Degradation Indicators:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.coreDefinitions.modelDrift.detectionMetrics.map((m, mIdx) => (
                              <span key={mIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-purple-300 border border-zinc-800">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-black/60 border border-zinc-900 text-[11px] text-zinc-400 font-sans italic">
                        <strong className="text-purple-400 font-mono not-italic">Example: </strong>
                        {item.coreDefinitions.modelDrift.example}
                      </div>
                    </div>
                  </div>
                )}

                {/* Head-to-Head Comparison Table */}
                {item.comparisonMatrix && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Data Drift vs. Model (Concept) Drift: Side-by-Side Comparison</span>
                    </h4>

                    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-black border-b border-zinc-800 font-mono text-[11px] text-zinc-400">
                          <tr>
                            <th className="p-3.5 w-1/4">Dimension</th>
                            <th className="p-3.5 w-3/8 text-blue-300">Data Drift (Covariate Shift)</th>
                            <th className="p-3.5 w-3/8 text-purple-300">Model Drift (Concept Drift)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 text-zinc-300">
                          {item.comparisonMatrix.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3.5 font-bold font-mono text-zinc-300 text-[11px]">
                                {row.dimension}
                              </td>
                              <td className="p-3.5 text-blue-200/90 leading-relaxed">
                                {row.dataDrift}
                              </td>
                              <td className="p-3.5 text-purple-200/90 leading-relaxed">
                                {row.modelDrift}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Production Mitigation Playbook */}
                {item.productionMitigationPlaybook && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Production Mitigation & Retraining Playbook</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.productionMitigationPlaybook.map((play, pIdx) => (
                        <div key={pIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-emerald-400 border border-emerald-950">
                                {play.tag}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-zinc-200 font-mono">
                              {play.strategy}
                            </h5>
                            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                              {play.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 79: Throughput & Latency */}
            {item.id === 'throughput-latency' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>System Performance & Serving Optimization</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                      RPS • TPS • TTFT • TPOT
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-emerald-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-emerald-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                    <div className="p-3 rounded-xl bg-black border border-emerald-950 flex items-center gap-3">
                      <span className="text-emerald-400 font-bold text-base leading-none">⏱️</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        Understanding the distinct profiles of aggregate throughput vs. user-perceived latency (TTFT and inter-token speed) determines whether your AI serving stack feels instant or sluggish.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Throughput vs. Latency: 4 Core Metric Breakdown */}
                {item.coreMetrics && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.comparisonsIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        The Core Serving Quadrant
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {item.coreMetrics.map((cm, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                                {cm.badge}
                              </span>
                            </div>
                            <h5 className={`text-sm font-bold font-mono ${cm.accent}`}>
                              {cm.metric}
                            </h5>
                            <div className="p-2.5 rounded-lg bg-black border border-zinc-900">
                              <p className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                                {cm.definition}
                              </p>
                            </div>
                            <span className="inline-block text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900">
                              Unit: {cm.unit}
                            </span>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                              {cm.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Serving Workload Trade-off Matrix */}
                {item.tradeoffMatrix && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Production Serving Trade-Offs: Interactive vs. Batch</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.tradeoffMatrix.map((tm, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <span className="text-xs font-bold font-mono text-cyan-300">
                              {tm.scenario}
                            </span>
                            <div className="p-2.5 rounded-lg bg-black border border-cyan-950 text-xs text-cyan-200/90 font-mono">
                              <strong>Goal: </strong>{tm.optimizationGoal}
                            </div>
                            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                              <strong className="text-zinc-200">Architecture Strategy: </strong>
                              {tm.servingStrategy}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-zinc-900 text-[11px] text-zinc-400 font-sans">
                            <strong className="text-amber-400 font-mono">Trade-off: </strong>
                            {tm.tradeoff}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Governing Laws: Little's Law & Prefill/Decode Asymmetry */}
                {item.governingLaws && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-purple-400" />
                      <span>Governing Systems Laws & Performance Theorems</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.governingLaws.map((law, lIdx) => (
                        <div key={lIdx} className="p-4 rounded-xl bg-black border border-purple-900/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-300 font-mono">
                              {law.law}
                            </span>
                            <code className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-purple-200 border border-purple-800">
                              {law.formula}
                            </code>
                          </div>
                          <p className="text-xs text-zinc-200 font-medium font-sans">
                            {law.meaning}
                          </p>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {law.insight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 80: PagedAttention & vLLM */}
            {item.id === 'paged-attention' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>LLM Serving Engine & KV Cache Optimization</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800">
                      vLLM • Virtual Memory Paging
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-cyan-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                  </div>
                </div>

                {/* High-Throughput Question & Answer Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black border border-amber-800/40 space-y-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-base">💡</span>
                    <h5 className="text-xs font-bold text-amber-300 font-mono uppercase tracking-wider">
                      {item.highThroughputQuestion}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed pl-6">
                    {item.highThroughputAnswer}
                  </p>
                </div>

                {/* Traditional Serving vs PagedAttention Comparison */}
                {item.traditionalVsPaged && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-rose-400" />
                      <span>Traditional KV Cache vs. PagedAttention</span>
                    </h4>

                    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-black border-b border-zinc-800 font-mono text-[11px] text-zinc-400">
                          <tr>
                            <th className="p-3.5 w-1/4">Aspect</th>
                            <th className="p-3.5 w-3/8 text-rose-300">Traditional Serving (Pre-Allocation)</th>
                            <th className="p-3.5 w-3/8 text-emerald-300">PagedAttention (vLLM Engine)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 text-zinc-300">
                          {item.traditionalVsPaged.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3.5 font-bold font-mono text-zinc-300 text-[11px]">
                                {row.aspect}
                              </td>
                              <td className="p-3.5 text-rose-200/90 leading-relaxed">
                                {row.traditional}
                              </td>
                              <td className="p-3.5 text-emerald-200/90 leading-relaxed font-medium">
                                {row.paged}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4-Step OS-Paging Architecture Mechanism */}
                {item.architectureMechanism && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>How PagedAttention Works Under the Hood</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.architectureMechanism.map((mech, mIdx) => (
                        <div key={mIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-purple-300 font-mono block mb-1">
                              {mech.step}
                            </span>
                            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                              {mech.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Production Benefits */}
                {item.keyBenefits && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Key Production Advantages</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.keyBenefits.map((b, bIdx) => (
                        <div key={bIdx} className="p-3.5 rounded-xl bg-black border border-emerald-950/60 space-y-1">
                          <span className="text-xs font-bold text-emerald-300 font-mono">
                            {b.benefit}
                          </span>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {b.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 81: Multi-Agent Orchestration */}
            {item.id === 'multi-agent-orchestration' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>Autonomous Agents & Distributed AI Workflows</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800">
                      Multi-Agent Orchestration
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-purple-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-purple-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                  </div>
                </div>

                {/* 4 Core Orchestration Patterns */}
                {item.orchestrationPatterns && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span>Core Orchestration Topologies</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Design Patterns
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.orchestrationPatterns.map((pat, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                                {pat.badge}
                              </span>
                            </div>
                            <h5 className={`text-xs font-bold font-mono ${pat.accent}`}>
                              {pat.pattern}
                            </h5>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {pat.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-zinc-900 text-[11px] text-zinc-400 font-sans italic">
                            <strong className="text-zinc-300 font-mono not-italic">Example: </strong>
                            {pat.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Why Multi-Agent? (Architectural Drivers) */}
                {item.whyMultiAgent && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Why Orchestrate Multiple Agents Instead of One?</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.whyMultiAgent.map((why, wIdx) => (
                        <div key={wIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                          <span className="text-xs font-bold text-cyan-300 font-mono block">
                            {why.benefit}
                          </span>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {why.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Frameworks & Production Challenges Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Popular Frameworks */}
                  {item.productionFrameworks && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <h5 className="text-xs font-bold text-emerald-300 font-mono uppercase tracking-wider">
                          Orchestration Frameworks
                        </h5>
                      </div>
                      <div className="space-y-2">
                        {item.productionFrameworks.map((fw, fIdx) => (
                          <div key={fIdx} className="p-2.5 rounded-lg bg-black border border-zinc-900 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-zinc-200 font-mono">{fw.name}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                {fw.type}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 font-sans">{fw.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Production Challenges */}
                  {item.keyChallenges && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-rose-950/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                        <h5 className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider">
                          Key Production Challenges & Risks
                        </h5>
                      </div>
                      <div className="space-y-2">
                        {item.keyChallenges.map((ch, cIdx) => (
                          <div key={cIdx} className="p-2.5 rounded-lg bg-black border border-rose-950/40 space-y-0.5">
                            <span className="text-xs font-bold text-rose-200 font-mono">{ch.challenge}</span>
                            <p className="text-[11px] text-zinc-400 font-sans">{ch.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 82: LLM Coherence */}
            {item.id === 'coherence' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>LLM Quality & Evaluation</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                      Coherence & Alignment
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-emerald-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-emerald-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                  </div>
                </div>

                {/* 4 Types of Coherence */}
                {item.typesOfCoherence && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.typesOfCoherenceIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        4 Dimensions
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {item.typesOfCoherence.map((typeObj, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                                {typeObj.badge}
                              </span>
                            </div>
                            <h5 className={`text-xs font-bold font-mono ${typeObj.accent}`}>
                              {typeObj.type}
                            </h5>
                            <div className="p-2.5 rounded-lg bg-black border border-zinc-900">
                              <p className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                                {typeObj.definition}
                              </p>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                              {typeObj.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5 Proven Steps to Improve Coherence */}
                {item.howToImproveSteps && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.howToImproveIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Engineering Best Practices
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.howToImproveSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-900/40 transition flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[11px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                            0{sIdx + 1}
                          </span>
                          <span className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                            {step.replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evaluation Methods (LLM-as-a-judge, NLI) */}
                {item.evaluationMethods && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>Measuring & Evaluating Coherence</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {item.evaluationMethods.map((evalObj, eIdx) => (
                        <div key={eIdx} className="p-4 rounded-xl bg-black border border-purple-900/40 space-y-1.5">
                          <span className="text-xs font-bold text-purple-300 font-mono">
                            {evalObj.method}
                          </span>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {evalObj.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 83: Document Chunking */}
            {item.id === 'chunking' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>RAG Preprocessing & Document Indexing</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800">
                      Chunking & Boundaries
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-amber-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-amber-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                  </div>
                </div>

                {/* 6-Step Ingestion Lifecycle */}
                {item.howChunkingWorksSteps && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.howChunkingWorksIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Lifecycle Pipeline
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {item.howChunkingWorksSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-900/40 transition flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[11px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                            0{sIdx + 1}
                          </span>
                          <span className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                            {step.replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chunk Size vs Chunk Overlap Split Cards */}
                {item.chunkSizeAndOverlap && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.chunkSizeAndOverlapIntro}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Core Parameters
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.chunkSizeAndOverlap.map((param, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                                {param.badge}
                              </span>
                            </div>
                            <h5 className={`text-sm font-bold font-mono ${param.accent}`}>
                              {param.concept}
                            </h5>
                            <div className="p-2.5 rounded-lg bg-black border border-zinc-900">
                              <p className="text-xs text-zinc-200 font-medium font-sans leading-relaxed">
                                {param.definition}
                              </p>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                              {param.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4 Chunking Strategies */}
                {item.chunkingStrategies && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-2">
                      <FileCode className="w-3.5 h-3.5 text-purple-400" />
                      <span>Production Chunking Strategies</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.chunkingStrategies.map((strat, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black text-purple-300 border border-purple-900/60">
                                {strat.badge}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-zinc-200 font-mono">
                              {strat.strategy}
                            </h5>
                            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                              {strat.desc}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-zinc-900 text-[10px] text-purple-300/80 font-mono">
                            <strong className="text-zinc-500 uppercase">Best for: </strong>
                            {strat.bestFor}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 84: Lexical Search */}
            {item.id === 'lexical-search' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Keyword Matching & Sparse Information Retrieval</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-800">
                      TF-IDF • BM25 • Sparse Vectors
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-cyan-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-cyan-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                    <div className="p-3 rounded-xl bg-black border border-cyan-950 flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-base leading-none mt-0.5">📊</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {item.tfidfExplanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Sparse Vector & Term Weighting Pillars */}
                {item.sparseVectorMechanics && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span>TF-IDF & Sparse Vector Mechanics</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Mathematical Formulation
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {item.sparseVectorMechanics.map((mech, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold font-mono text-amber-300">
                              {mech.component}
                            </h5>
                            <div className="p-2 rounded bg-black border border-zinc-900">
                              <code className="text-[10px] font-mono text-zinc-300 break-words">
                                {mech.formula}
                              </code>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                              {mech.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lexical vs. Semantic Head-to-Head Table */}
                {item.lexicalVsSemantic && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Lexical Search vs. Semantic Search: Side-by-Side</span>
                    </h4>

                    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-black border-b border-zinc-800 font-mono text-[11px] text-zinc-400">
                          <tr>
                            <th className="p-3.5 w-1/4">Dimension</th>
                            <th className="p-3.5 w-3/8 text-cyan-300">Lexical Search (TF-IDF / BM25)</th>
                            <th className="p-3.5 w-3/8 text-purple-300">Semantic Search (Dense Embeddings)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 text-zinc-300">
                          {item.lexicalVsSemantic.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-zinc-900/40 transition">
                              <td className="p-3.5 font-bold font-mono text-zinc-300 text-[11px]">
                                {row.dimension}
                              </td>
                              <td className="p-3.5 text-cyan-200/90 leading-relaxed">
                                {row.lexical}
                              </td>
                              <td className="p-3.5 text-purple-200/90 leading-relaxed">
                                {row.semantic}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Hybrid Search Callout Box */}
                {item.hybridSearchSynergy && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-black border border-purple-900/50 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <h5 className="text-xs font-bold text-purple-300 font-mono uppercase tracking-wider">
                        {item.hybridSearchSynergy.headline}
                      </h5>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {item.hybridSearchSynergy.desc}
                    </p>
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                      <code className="text-[11px] font-mono text-purple-200">
                        {item.hybridSearchSynergy.equation}
                      </code>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-mono font-medium">
                      ✓ {item.hybridSearchSynergy.takeaway}
                    </p>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}

            {/* Item 85: Pipelines */}
            {item.id === 'pipeline' && (
              <div className="space-y-6">
                {/* Core Concept Banner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      <span>Systems Architecture & Automated Processing</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/70 text-blue-300 border border-blue-800">
                      Processing Pipelines
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-blue-900/40 shadow-xl space-y-3">
                    <p className="text-xs sm:text-sm text-blue-200 font-sans leading-relaxed font-semibold">
                      {item.coreDefinition}
                    </p>
                    <div className="p-3 rounded-xl bg-black border border-blue-950 flex items-center gap-3">
                      <span className="text-blue-400 font-bold text-base leading-none">⚙️</span>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                        {item.pipelineTypesSummary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Different types of pipelines (6 Core Types with Definitions & Examples) */}
                {item.differentTypesOfPipelines && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.pipelineTypesHeading || "Different types of pipelines"}</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Core Classification & Examples
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {item.differentTypesOfPipelines.map((pipe, pIdx) => (
                        <div
                          key={pIdx}
                          className={`p-4 rounded-xl bg-black border ${pipe.border || 'border-zinc-800'} hover:border-zinc-700 transition flex flex-col justify-between space-y-3`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-700 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                                0{pipe.number}
                              </span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                                {pipe.badge}
                              </span>
                            </div>
                            <h5 className={`text-xs font-bold font-mono ${pipe.accent}`}>
                              {pipe.name}
                            </h5>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                              {pipe.definition}
                            </p>
                          </div>

                          <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-900 space-y-1">
                            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                              Example:
                            </span>
                            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                              {pipe.example}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Other Common Examples Alert */}
                    {item.otherCommonExamples && (
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                        <span className="text-cyan-400 font-bold text-sm leading-none mt-0.5">💡</span>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {item.otherCommonExamples}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 7 Pipeline Types Grid */}
                {item.sevenPipelineTypes && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>The 7 Core Pipeline Architectures</span>
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        End-to-End Stages
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {item.sevenPipelineTypes.map((pipe, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-base">{pipe.icon}</span>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                                {pipe.badge}
                              </span>
                            </div>
                            <h5 className={`text-xs font-bold font-mono ${pipe.accent}`}>
                              {pipe.name}
                            </h5>
                            <div className="p-2 rounded bg-black border border-zinc-900">
                              <span className="text-[10px] font-mono text-zinc-300 block leading-relaxed">
                                {pipe.stages}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                              {pipe.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-zinc-900 text-[10px] text-zinc-400 font-mono">
                            <strong className="text-zinc-500 uppercase">Standard Tools: </strong>
                            <span className="text-zinc-300">{pipe.tools}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Pipeline Engineering Principles */}
                {item.coreEngineeringPrinciples && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Production Pipeline Engineering Principles</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {item.coreEngineeringPrinciples.map((princ, prIdx) => (
                        <div key={prIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                          <span className="text-xs font-bold text-emerald-300 font-mono block">
                            {princ.principle}
                          </span>
                          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                            {princ.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Takeaway Banner */}
                <div className="p-4 rounded-xl bg-black border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 uppercase">Architecture Takeaway: </strong>
                  {item.takeaway}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
