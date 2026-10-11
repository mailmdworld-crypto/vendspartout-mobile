import React from 'react';
import { ActiveTab, UserStats } from '../types';
import { Home, Layers, Camera, Package, Sparkles } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNewArticle: () => void;
  stats: UserStats;
  darkMode?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  onNewArticle,
  stats,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 pb-safe">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around relative">
        
        {/* Tab 1: Accueil */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeTab === 'home'
              ? 'text-[#0F5257] dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1">Accueil</span>
        </button>

        {/* Tab 2: Annonces */}
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors relative ${
            activeTab === 'listings'
              ? 'text-[#0F5257] dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Layers className={`w-5 h-5 ${activeTab === 'listings' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {stats.totalArticles > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#0F5257] text-white text-[9px] font-bold flex items-center justify-center">
                {stats.totalArticles}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">Annonces</span>
        </button>

        {/* Center Prominent Camera Action Button */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            onClick={onNewArticle}
            aria-label="Prendre une photo"
            className="w-13 h-13 rounded-full bg-gradient-to-br from-[#0F5257] to-[#0A332D] text-white flex items-center justify-center shadow-lg shadow-[#0F5257]/40 ring-4 ring-white dark:ring-slate-900 active:scale-92 transition-all cursor-pointer"
          >
            <Camera className="w-6 h-6" />
          </button>
          <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 mt-1">
            Scanner
          </span>
        </div>

        {/* Tab 3: Mon stock */}
        <button
          onClick={() => setActiveTab('stock')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeTab === 'stock'
              ? 'text-[#0F5257] dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Package className={`w-5 h-5 ${activeTab === 'stock' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1">Stock</span>
        </button>

        {/* Tab 4: Tarifs / Pro */}
        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex flex-col items-center justify-center w-14 py-1 transition-colors ${
            activeTab === 'pricing'
              ? 'text-[#0F5257] dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'pricing' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1">Tarifs</span>
        </button>

      </div>
    </div>
  );
};
