import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import IntroPage from './pages/IntroPage';
import FashionPage from './pages/FashionPage';
import HybridPage from './pages/HybridPage';
import YoloPage from './pages/YoloPage';
import ResumePage from './pages/ResumePage';
import AllDefinitionsPage from './pages/AllDefinitionsPage';
import ProgramsPage from './pages/ProgramsPage';

const VALID_TABS = ['intro', 'fashion', 'hybrid', 'yolo', 'resume-platform', 'all-definitions', 'programs'];

function getTabFromHash() {
  const hash = window.location.hash || '';
  const raw = hash
    .replace(/^#+/, '')
    .replace(/^\/+/, '')
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '')
    .trim()
    .toLowerCase();
  if (raw === 'eda' || raw === 'definitions' || raw === 'all-definitions') return 'all-definitions';
  if (raw === 'resume' || raw === 'resume-platform') return 'resume-platform';
  if (raw === 'programs' || raw === 'python' || raw === 'coding') return 'programs';
  return VALID_TABS.includes(raw) ? raw : 'intro';
}

const PAGE_TITLES = {
  intro: 'IPL - Interview Preparation Library | Introduction',
  fashion: 'Fashion AI Copilot | IPL',
  hybrid: 'Hybrid AI Engine | IPL',
  yolo: 'YOLO + DeepSparse | IPL',
  'resume-platform': 'Resume Platform | IPL',
  'all-definitions': 'All Definitions | IPL',
  programs: 'Python Programs | IPL',
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromHash);

  // Synchronize activeTab with URL hash on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const newTab = getTabFromHash();
      setActiveTab((prev) => (prev !== newTab ? newTab : prev));
    };

    // Normalize initial hash cleanly without unwanted redirects
    const initialTab = getTabFromHash();
    setActiveTab(initialTab);
    const targetHash = `#/${initialTab}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
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
      {/* Top Header with Navigation Options */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area Protected by ErrorBoundary */}
      <main className="flex-1 w-full">
        <ErrorBoundary>
          {activeTab === 'intro' && <IntroPage />}
          {activeTab === 'fashion' && <FashionPage />}
          {activeTab === 'hybrid' && <HybridPage />}
          {activeTab === 'yolo' && <YoloPage />}
          {activeTab === 'resume-platform' && <ResumePage />}
          {activeTab === 'all-definitions' && <AllDefinitionsPage />}
          {activeTab === 'programs' && <ProgramsPage />}
        </ErrorBoundary>
      </main>

      {/* Footer covering more than half screen */}
      <Footer />
    </div>
  );
}
