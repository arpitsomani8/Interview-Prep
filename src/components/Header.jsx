import React from 'react';
import { Layers, Sparkles, Cpu, Eye, BookOpen, ExternalLink } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'intro', label: 'Introduction', icon: Sparkles },
    { id: 'fashion', label: 'Fashion AI Copilot', icon: Layers },
    { id: 'hybrid', label: 'Hybrid AI Engine', icon: Cpu },
    { id: 'yolo', label: 'YOLO + DeepSparse', icon: Eye },
    { id: 'definitions', label: 'Other Definitions', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d1527]/90 backdrop-blur-md border-b border-slate-700/60 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div 
            onClick={() => setActiveTab('intro')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span>AI Engineering Master Defense</span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Senior AI / ML
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">3 Production Architectures & Technical Concept Vault</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}

            {/* Standalone HTML Guide Shortcut */}
            <a
              href="./fashion_ai_copilot_guide.html"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Standalone Interactive HTML Guide"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 hover:text-cyan-300 border border-slate-700 transition"
            >
              <span>HTML Guide</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
