import React from 'react';
import { fashionData } from '../data/fashionData';
import { ShieldCheck, MessageSquareQuote, Layers, Database, Cpu } from 'lucide-react';

export default function FashionPage() {

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Project 1 Master Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {fashionData.title}
        </h1>
      </div>

      {/* Target Resume Bullet Point */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-cyan-500/30 p-6 shadow-xl">
        <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Target Resume Bullet Point to Defend</span>
        </div>
        <p className="text-base sm:text-lg text-zinc-100 font-medium italic">
          "{fashionData.resumeBullet}"
        </p>
      </div>

      {/* 90-Second Interview Script Banner (AI/ML Model Flow First) */}
      <div className="rounded-2xl bg-[#0a0a0c] border border-indigo-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquareQuote className="w-5 h-5" />
            <span>Executive 90-Second Interview Defense Script (Model-First Flow)</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Timing: 90s
          </span>
        </div>
        <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1 whitespace-pre-line">
          {fashionData.executiveScript}
        </blockquote>
      </div>

      {/* 3-Tier Production Storage Architecture (Cleanly Aligned Grid) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>3-Tier Production Storage Architecture</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fashionData.storageArchitecture.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0a0a0c] border border-zinc-800 p-6 space-y-4 hover:border-zinc-700 transition shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-[11px] uppercase font-mono px-2.5 py-1 rounded-md bg-zinc-900 text-cyan-300 border border-zinc-800 inline-block font-semibold">
                  {item.badge}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.tier}
                </h3>
              </div>
              <ul className="space-y-2.5 pt-3 border-t border-zinc-800/80">
                {item.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* High-Level AI/ML Pipeline Flow */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span>End-to-End AI/ML & Multimodal Pipeline Flow</span>
          </h2>
          <p className="text-sm text-zinc-400">
            Model-first execution sequence: Embedding generation, Top-K ChromaDB retrieval, PostgreSQL hydration, and GPT-4o context injection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fashionData.pipelineFlow.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0a0a0c] border border-zinc-800 hover:border-zinc-700 p-6 space-y-3 shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                  STEP {step.step}
                </span>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
