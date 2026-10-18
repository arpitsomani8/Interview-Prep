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
  Terminal 
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
              <div className="space-y-5 text-xs sm:text-sm text-zinc-300">
                {/* Key Principle Alert */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400 font-mono uppercase">Key Principle & Safeguards: </strong>
                  {item.keyPrinciple}
                </div>

                {/* Real Project Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    Real Production Project: {item.realProject.name}
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
              </div>
            )}

            {/* Item 14: Vector Database */}
            {item.id === 'vector-database' && (
              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
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
          </div>
        ))}
      </div>
    </div>
  );
}
