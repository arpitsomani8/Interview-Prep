import React from 'react';
import { introData } from '../data/introData';
import { Sparkles, ArrowRight, CheckCircle2, Layers, Cpu, Eye, BookOpen } from 'lucide-react';

export default function IntroPage({ setActiveTab }) {
  const getTabIcon = (id) => {
    switch (id) {
      case 'fashion': return Layers;
      case 'hybrid': return Cpu;
      case 'yolo': return Eye;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0e172a] to-[#0b1329] border border-cyan-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master System Blueprint & Interview Defense</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Production AI & Computer Vision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Technical Defense Hub
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {introData.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('fashion')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition cursor-pointer"
            >
              <span>Explore Fashion AI Copilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('definitions')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Technical Definitions Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Flagship Projects */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">3 Production Architectures</h2>
          <p className="text-sm text-slate-400">Complete blueprints with 90-second interview scripts and zero theoretical blind spots</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {introData.projects.map((proj) => {
            const Icon = getTabIcon(proj.id);
            return (
              <div
                key={proj.id}
                onClick={() => setActiveTab(proj.id)}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
                      {proj.category}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                      {proj.title}
                    </h3>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.stack.map((t, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Deep Defense</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
