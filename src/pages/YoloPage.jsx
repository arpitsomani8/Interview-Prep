import React, { useState } from 'react';
import { yoloData } from '../data/yoloData';
import { Eye, Bookmark, ArrowUp, ShieldCheck, MessageSquareQuote } from 'lucide-react';

export default function YoloPage() {
  const [activeBookmark, setActiveBookmark] = useState(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveBookmark(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveBookmark(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5" />
          <span>Project 3 Master Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {yoloData.title}
        </h1>
      </div>

      {/* Target Resume Bullet Point */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 shadow-xl">
        <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Target Resume Bullet Point to Defend</span>
        </div>
        <p className="text-base sm:text-lg text-slate-100 font-medium italic">
          "{yoloData.resumeBullet}"
        </p>
      </div>

      {/* 90-Second Interview Script Banner */}
      <div className="rounded-2xl bg-slate-900/90 border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="w-5 h-5" />
            <span>Executive 90-Second Interview Defense Script (Word-for-Word)</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Timing: 90s
          </span>
        </div>
        <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
          {yoloData.executiveScript}
        </blockquote>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {yoloData.metrics.map((m, idx) => (
          <div key={idx} className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 text-center space-y-1">
            <div className="text-xs text-slate-400 font-medium">{m.metric}</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400">{m.val}</div>
            <div className="text-[11px] text-slate-400">{m.context}</div>
          </div>
        ))}
      </div>

      {/* Bookmarks Bar */}
      <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Page Bookmarks (On-Page Only)</span>
          </div>
          <button onClick={scrollToTop} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['core-problem', 'data-reality', 'model-selection', 'edge-opt', 'pipeline-steps', 'db-reality', 'chunking', 'multimodal', 'ocr', 'tradeoffs-table'].map((id) => (
            <button
              key={id}
              onClick={() => scrollToId(id)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                activeBookmark === id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                  : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {id.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Core Problem */}
      <div id="core-problem" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-white">{yoloData.coreProblem.title}</h3>
        <div className="space-y-3">
          {yoloData.coreProblem.points.map((pt, i) => (
            <div key={i} className="text-sm sm:text-base text-slate-300">
              <strong className="text-cyan-300 font-semibold">{pt.label}: </strong>
              <span>{pt.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Data Reality */}
      <div id="data-reality" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-white">{yoloData.dataReality.title}</h3>
        <div className="space-y-3">
          {yoloData.dataReality.points.map((pt, i) => (
            <div key={i} className="text-sm sm:text-base text-slate-300">
              <strong className="text-cyan-300 font-semibold">{pt.label}: </strong>
              <span>{pt.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Model Selection */}
      <div id="model-selection" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-white">{yoloData.modelSelection.title}</h3>
        <div className="space-y-3">
          {yoloData.modelSelection.points.map((pt, i) => (
            <div key={i} className="text-sm sm:text-base text-slate-300">
              <strong className="text-cyan-300 font-semibold">{pt.label}: </strong>
              <span>{pt.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Edge Optimization */}
      <div id="edge-opt" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-bold text-white">{yoloData.edgeOptimization.title}</h3>
        <div className="space-y-3">
          {yoloData.edgeOptimization.points.map((pt, i) => (
            <div key={i} className="text-sm sm:text-base text-slate-300">
              <strong className="text-cyan-300 font-semibold">{pt.label}: </strong>
              <span>{pt.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Pipeline Steps */}
      <div id="pipeline-steps" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">5. End-to-End Real-Time Pipeline Steps</h3>
        <div className="space-y-3">
          {yoloData.pipelineSteps.map((s, i) => (
            <div key={i} className="text-sm sm:text-base text-slate-300">
              <strong className="text-cyan-300 font-semibold">Step {s.step}: {s.title} — </strong>
              <span>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. DB Reality */}
      <div id="db-reality" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
        <h3 className="text-xl font-bold text-white">{yoloData.databaseReality.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{yoloData.databaseReality.text}</p>
      </div>

      {/* 7. Chunking */}
      <div id="chunking" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
        <h3 className="text-xl font-bold text-white">{yoloData.chunkingDecision.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{yoloData.chunkingDecision.text}</p>
      </div>

      {/* 8. Multimodal */}
      <div id="multimodal" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
        <h3 className="text-xl font-bold text-white">{yoloData.multimodalTriage.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{yoloData.multimodalTriage.text}</p>
      </div>

      {/* 9. OCR */}
      <div id="ocr" className="scroll-mt-36 rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-3">
        <h3 className="text-xl font-bold text-white">{yoloData.ocrKillerFeature.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{yoloData.ocrKillerFeature.text}</p>
      </div>

      {/* 10. Trade-Offs Table */}
      <div id="tradeoffs-table" className="scroll-mt-36 space-y-6 pt-6 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white">10. Architecture Trade-Offs Matrix</h2>
          <p className="text-sm text-slate-400">Head-to-head architectural rationale against industry alternatives</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                <th className="p-4 font-semibold">Architecture Dimension</th>
                <th className="p-4 font-semibold text-cyan-400 bg-cyan-950/20">Our Solution (YOLO + DeepSparse)</th>
                <th className="p-4 font-semibold">Alternative 1: Faster R-CNN on GPU</th>
                <th className="p-4 font-semibold">Alternative 2: ResNet on Cloud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-300">
              {yoloData.tradeoffsTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-medium text-white">{row.dim}</td>
                  <td className="p-4 font-bold text-cyan-300 bg-cyan-950/20">{row.ours}</td>
                  <td className="p-4 text-slate-400">{row.alt1}</td>
                  <td className="p-4 text-slate-400">{row.alt2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
