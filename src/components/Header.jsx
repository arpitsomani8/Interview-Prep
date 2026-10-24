import { Layers, Sparkles, Cpu, Eye, FileCode, FileText } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'intro', label: 'Introduction', icon: Sparkles },
    { id: 'fashion', label: 'Fashion AI Copilot', icon: Layers },
    { id: 'hybrid', label: 'Hybrid AI Engine', icon: Cpu },
    { id: 'yolo', label: 'YOLO + DeepSparse', icon: Eye },
    { id: 'resume-platform', label: 'Resume Platform', icon: FileText },
    { id: 'all-definitions', label: 'All Definitions', icon: FileCode },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800/90 shadow-2xl shadow-black">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between min-h-14 py-2 gap-4 flex-wrap sm:flex-nowrap">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('intro')}
            className="flex items-center cursor-pointer group flex-shrink-0"
            title="Introduction"
            aria-label="Go to Introduction"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Layers className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </button>

          {/* Desktop Navigation Tabs (No scrollbar, full-width flex-wrap) */}
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`#/${tab.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-zinc-900 text-cyan-400 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                      : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-900/80 hover:border-zinc-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
