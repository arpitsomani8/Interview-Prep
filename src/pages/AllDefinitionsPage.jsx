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
  Bug 
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
      return matchTitle || matchBadge || matchSummary || matchCode;
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

            {/* Item 3: Confusion Matrix / Precision / Recall */}
            {item.id === 'confusion-matrix-precision-recall' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* 4 Matrix Components */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {item.matrixComponents.map((c, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                      <div className="text-xs font-bold text-cyan-300 font-mono mb-1">{c.term}</div>
                      <div className="text-xs text-zinc-300 leading-relaxed">{c.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Precision & Recall Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {item.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-4 rounded-xl bg-black border border-cyan-900/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{m.name}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                          {m.formula}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 italic">
                        "{m.question}"
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed pt-1 border-t border-zinc-800">
                        <strong className="text-amber-400">Logistics Impact: </strong>
                        {m.businessImpact}
                      </p>
                    </div>
                  ))}
                </div>
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
              </div>
            )}

            {/* Item 22: Joblib */}
            {item.id === 'joblib' && (
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
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

                {/* 2 Frameworks Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.frameworks.map((fw, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                      <div className="text-xs font-bold text-cyan-400 font-mono uppercase">{fw.name}</div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                    {item.awsServices.map((svc, aIdx) => (
                      <div key={aIdx} className="p-3 rounded-xl bg-black border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-amber-400 font-mono">{svc.name}</div>
                        <div className="text-[11px] text-zinc-400 leading-relaxed">{svc.role}</div>
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
                      <div key={azIdx} className="p-4 rounded-xl bg-black border border-zinc-800 space-y-1.5 flex flex-col justify-between">
                        <div className="text-xs font-bold text-cyan-400 font-mono">{az.name}</div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{az.desc}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
}
