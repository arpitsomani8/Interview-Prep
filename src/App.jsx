import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IntroPage from './pages/IntroPage';
import FashionPage from './pages/FashionPage';
import HybridPage from './pages/HybridPage';
import YoloPage from './pages/YoloPage';
import DefinitionsPage from './pages/DefinitionsPage';
import AllDefinitionsPage from './pages/AllDefinitionsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#070c17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header with 6 Navigation Options */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'intro' && <IntroPage setActiveTab={setActiveTab} />}
        {activeTab === 'fashion' && <FashionPage />}
        {activeTab === 'hybrid' && <HybridPage />}
        {activeTab === 'yolo' && <YoloPage />}
        {activeTab === 'definitions' && <DefinitionsPage />}
        {activeTab === 'all-definitions' && <AllDefinitionsPage />}
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1120] border-t border-slate-800/80 py-8 text-center text-xs text-slate-400 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
          <button onClick={() => setActiveTab('intro')} className="hover:text-cyan-400 transition cursor-pointer">Introduction</button>
          <span>•</span>
          <button onClick={() => setActiveTab('fashion')} className="hover:text-cyan-400 transition cursor-pointer">Fashion AI Copilot</button>
          <span>•</span>
          <button onClick={() => setActiveTab('hybrid')} className="hover:text-cyan-400 transition cursor-pointer">Hybrid AI Engine</button>
          <span>•</span>
          <button onClick={() => setActiveTab('yolo')} className="hover:text-cyan-400 transition cursor-pointer">YOLO + DeepSparse</button>
          <span>•</span>
          <button onClick={() => setActiveTab('definitions')} className="hover:text-cyan-400 transition cursor-pointer">Other Definitions</button>
          <span>•</span>
          <button onClick={() => setActiveTab('all-definitions')} className="hover:text-cyan-400 transition cursor-pointer">All Definitions</button>
        </div>
        <p className="text-slate-500">
          Designed for Master Interview Defense | Ready for GitHub Pages Deployment
        </p>
      </footer>
    </div>
  );
}
