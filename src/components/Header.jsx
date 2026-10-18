import React from 'react';
import { Layers, Sparkles, Cpu, Eye, BookOpen, FileCode } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'intro', label: 'Introduction', icon: Sparkles },
    { id: 'fashion', label: 'Fashion AI Copilot', icon: Layers },
    { id: 'hybrid', label: 'Hybrid AI Engine', icon: Cpu },
    { id: 'yolo', label: 'YOLO + DeepSparse', icon: Eye },
    { id: 'definitions', label: 'Other Definitions', icon: BookOpen },
    { id: 'all-definitions', label: 'All Definitions', icon: FileCode },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800/90 shadow-2xl shadow-black">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between min-h-16 py-2.5 gap-4 flex-wrap lg:flex-nowrap">
          {/* Logo / Title */}
          <div 
            onClick={() => setActiveTab('intro')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>AI Engineering Master Defense</span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Senior AI / ML
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AMOLED Dark Theme
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">3 Production Architectures & Technical Concept Vault</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs (No scrollbar, full-width flex-wrap) */}
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-zinc-900 text-cyan-400 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                      : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-900/80 hover:border-zinc-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
