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
    <div className="min-h-screen w-full bg-black text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header with 6 Navigation Options */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'intro' && <IntroPage setActiveTab={setActiveTab} />}
        {activeTab === 'fashion' && <FashionPage />}
        {activeTab === 'hybrid' && <HybridPage />}
        {activeTab === 'yolo' && <YoloPage />}
        {activeTab === 'definitions' && <DefinitionsPage />}
        {activeTab === 'all-definitions' && <AllDefinitionsPage />}
      </main>
    </div>
  );
}
