import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IntroPage from './pages/IntroPage';
import FashionPage from './pages/FashionPage';
import HybridPage from './pages/HybridPage';
import YoloPage from './pages/YoloPage';
import DefinitionsPage from './pages/DefinitionsPage';
import AllDefinitionsPage from './pages/AllDefinitionsPage';

const VALID_TABS = ['intro', 'fashion', 'hybrid', 'yolo', 'definitions', 'all-definitions'];

function getTabFromHash() {
  const raw = window.location.hash.replace(/^#\/?/, '').trim().split('?')[0];
  return VALID_TABS.includes(raw) ? raw : 'intro';
}

const PAGE_TITLES = {
  intro: 'Introduction | Arpit Somani - AI Engineering',
  fashion: 'Fashion AI Copilot | Multimodal AI Search Blueprint',
  hybrid: 'Hybrid AI Engine | Dynamic Schema ML & RAG',
  yolo: 'YOLO + DeepSparse | Real-Time Edge Computer Vision',
  definitions: 'Technical Concept Vault | AI/ML Definitions',
  'all-definitions': 'Master Interview Vault | Complete Reference Guide',
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromHash);

  // Synchronize activeTab with URL hash on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const newTab = getTabFromHash();
      setActiveTab(newTab);
    };

    // If no initial hash, set it without adding extra history entry
    if (!window.location.hash || !VALID_TABS.includes(window.location.hash.replace(/^#\/?/, '').trim())) {
      window.history.replaceState(null, '', `#/intro`);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync window hash and title when tab changes
  useEffect(() => {
    const targetHash = `#/${activeTab}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    document.title = PAGE_TITLES[activeTab] || 'AI Engineering Master Defense';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header with 6 Navigation Options */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'intro' && <IntroPage />}
        {activeTab === 'fashion' && <FashionPage />}
        {activeTab === 'hybrid' && <HybridPage />}
        {activeTab === 'yolo' && <YoloPage />}
        {activeTab === 'definitions' && <DefinitionsPage />}
        {activeTab === 'all-definitions' && <AllDefinitionsPage />}
      </main>
    </div>
  );
}
