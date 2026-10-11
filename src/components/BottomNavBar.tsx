import React from 'react';
import { ActiveTab, UserStats } from '../types';
import { Home, Layers, Camera, Package, Sparkles } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNewArticle: () => void;
  stats: UserStats;
  darkMode?: boolean;
  annoncesCount?: number;
  /** When true, bar is absolute (phone frame) instead of fixed viewport */
  embedded?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  onNewArticle,
  stats,
  darkMode = false,
  annoncesCount,
  embedded = false,
}) => {
  const count = annoncesCount ?? stats.totalArticles;
  const inactive = darkMode ? 'text-[#A8B6C8] hover:text-[#F8FAFC]' : 'text-slate-400 hover:text-slate-600';
  const active = darkMode ? 'text-emerald-400 font-bold' : 'text-[#0F5257] font-bold';

  return (
    <div
      className={`bottom-nav-bar z-40 backdrop-blur-lg border-t pb-safe ${
        embedded
          ? 'absolute left-0 right-0 bottom-0'
          : 'fixed left-0 right-0 bottom-0 md:hidden'
      } ${
        darkMode
          ? 'bg-[#2A3544]/97 border-[#4A5A6E]'
          : 'bg-white/97 border-slate-200/80'
      }`}
    >
      <div className="max-w-md mx-auto px-2 h-[64px] flex items-end justify-around pb-1.5 relative">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeTab === 'home' ? active : inactive
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Accueil</span>
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors relative ${
            activeTab === 'listings' ? active : inactive
          }`}
        >
          <div className="relative">
            <Layers className={`w-5 h-5 ${activeTab === 'listings' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {count > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-0.5 rounded-full bg-[#0F5257] text-white text-[9px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Annonces</span>
        </button>

        {/* Center scan button */}
        <div className="relative -top-3 flex flex-col items-center w-14">
          <button
            onClick={onNewArticle}
            aria-label="Prendre une photo"
            className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#0F5257] to-[#0A332D] text-white flex items-center justify-center shadow-lg shadow-[#0F5257]/35 active:scale-95 transition-all ${
              darkMode ? 'ring-[3px] ring-[#2A3544]' : 'ring-[3px] ring-white'
            }`}
          >
            <Camera className="w-5 h-5" />
          </button>
          <span className={`text-[9px] font-bold mt-0.5 ${darkMode ? 'text-[#A8B6C8]' : 'text-slate-500'}`}>
            Scanner
          </span>
        </div>

        <button
          onClick={() => setActiveTab('stock')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeTab === 'stock' ? active : inactive
          }`}
        >
          <Package className={`w-5 h-5 ${activeTab === 'stock' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Stock</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeTab === 'pricing' ? active : inactive
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'pricing' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Tarifs</span>
        </button>
      </div>
    </div>
  );
};
