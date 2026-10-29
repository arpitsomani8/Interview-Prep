// src/pages/ProgramsPage.jsx
// Python Programs & Coding Challenges Page with VS Code Dark Modern Interface
import React, { useState } from 'react';
import {
  Terminal,
  Code2,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  HardDrive,
  FileCode,
  BookOpen,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { programsData } from '../data/programsData';
import VsCodeEditor from '../components/VsCodeEditor';

export default function ProgramsPage() {
  const [selectedProgramId, setSelectedProgramId] = useState(programsData[0].id);
  const [approachIndices, setApproachIndices] = useState({
    'top-two-max': 0,
    'reverse-array': 0,
    'first-non-repeating-char': 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Current active program
  const activeProgram = programsData.find((p) => p.id === selectedProgramId) || programsData[0];
  const activeApproachIndex = approachIndices[activeProgram.id] || 0;
  const activeApproach = activeProgram.approaches[activeApproachIndex] || activeProgram.approaches[0];

  const handleSelectApproach = (programId, index) => {
    setApproachIndices((prev) => ({
      ...prev,
      [programId]: index,
    }));
  };

  const filteredPrograms = programsData.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black border border-cyan-500/20 p-6 sm:p-10 shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Terminal className="w-3.5 h-3.5" />
              Python 3.11+ Interview Programs
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              VS Code Dark Modern Theme
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              Quescol Interview Series
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Python Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Programs & Algorithmic</span> Practice
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Production-grade implementations for foundational interview problems. Compare multi-approach solutions,
            measure algorithmic trade-offs (Time vs Space), defend tricky edge cases, and run interactive code with
            authentic <strong>VS Code Dark+ IDE</strong> styling.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search programs by name, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program Selector Navigation */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            Select Python Program ({filteredPrograms.length})
          </h2>
          <span className="text-[11px] text-zinc-500">Click a problem to explore</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredPrograms.map((prog, index) => {
            const isSelected = prog.id === activeProgram.id;
            return (
              <div
                key={prog.id}
                onClick={() => setSelectedProgramId(prog.id)}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        Problem #{index + 1}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {prog.category}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {prog.difficulty}
                      </span>
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-bold transition ${
                        isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-cyan-300'
                      }`}
                    >
                      {prog.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {prog.summary}
                    </p>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition ${
                      isSelected
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                        : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Approaches pills count */}
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>{prog.approaches.length} Approaches available</span>
                  <span className="text-cyan-400/90">{prog.approaches[0].complexity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Detailed Program Workspace */}
      <section className="space-y-6">
        {/* Problem Title & Quescol Source Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">ACTIVE PROBLEM</span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400">{activeProgram.category}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeProgram.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">{activeProgram.keyTakeaway}</p>
          </div>

          <a
            href={activeProgram.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-cyan-300 hover:text-white text-xs font-semibold border border-zinc-700 hover:border-cyan-500/50 transition cursor-pointer self-start sm:self-center shadow-sm"
          >
            <span>Quescol Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Approach Selector Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
              Select Solution Approach
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {activeApproachIndex + 1} of {activeProgram.approaches.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {activeProgram.approaches.map((app, idx) => {
              const isActive = idx === activeApproachIndex;
              return (
                <button
                  key={app.id}
                  onClick={() => handleSelectApproach(activeProgram.id, idx)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                    isActive
                      ? 'bg-zinc-800 text-cyan-300 border-cyan-500/80 shadow-md shadow-cyan-950/50 ring-1 ring-cyan-500/30'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{app.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {app.complexity.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Approach Description Card */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Approach Overview: </strong>
            {activeApproach.description}
          </div>
        </div>

        {/* VS Code Dark Modern Editor Component */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Visual Studio Code (Dark Modern Editor)
            </span>
            <span className="text-[11px] text-zinc-500">Click ▶ Run Code to simulate execution</span>
          </div>

          <VsCodeEditor
            filename={activeApproach.filename}
            code={activeApproach.code}
            terminalData={activeApproach.terminal}
            activeApproachName={activeApproach.name}
          />
        </div>

        {/* Complexity Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Time Complexity */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-amber-400" />
                Time Complexity
              </span>
              <span className="text-sm font-bold font-mono px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {activeApproach.complexity.time}
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeApproach.complexity.timeExplanation}
            </p>
          </div>

          {/* Space Complexity */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                Auxiliary Space
              </span>
              <span className="text-sm font-bold font-mono px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {activeApproach.complexity.space}
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeApproach.complexity.spaceExplanation}
            </p>
          </div>
        </div>

        {/* Edge Cases & Interview Defense Section */}
        <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Critical Edge Cases to Defend in an Interview
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              {activeProgram.edgeCases.length} Scenarios
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeProgram.edgeCases.map((edge, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 space-y-2 hover:border-cyan-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">{edge.scenario}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-800">
                    {edge.example}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {edge.handling}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
