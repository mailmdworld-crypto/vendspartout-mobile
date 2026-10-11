import React from 'react';
import { ActiveTab, UserStats } from '../types';
import { Sun, Moon, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  stats: UserStats;
  onOpenPaywall: () => void;
  onNewArticle: () => void;
  isMobileDeviceView: boolean;
  setIsMobileDeviceView: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  stats,
  onOpenPaywall,
  onNewArticle,
  isMobileDeviceView,
  setIsMobileDeviceView,
}) => {
  const navItems: { id: ActiveTab; label: string; badge?: number | string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'new', label: 'Nouvel article' },
    { id: 'listings', label: 'Annonces', badge: stats.totalArticles },
    { id: 'stock', label: 'Mon stock' },
    { id: 'how-it-works', label: 'Comment ça marche' },
    { id: 'pricing', label: 'Tarifs' },
  ];

  const handleNavClick = (id: ActiveTab) => {
    if (id === 'new') {
      onNewArticle();
    } else {
      setActiveTab(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isMobileDeviceView ? 'max-w-none' : 'max-w-7xl'}`}>
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            {/* Maquette v2 Icon: Green rounded square with list/bullet symbol */}
            <div className="w-9 h-9 rounded-xl bg-[#0F5257] flex items-center justify-center shadow-md shadow-[#0F5257]/20 group-hover:bg-[#0B3C35] transition-all duration-200 transform group-hover:scale-105">
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Vends<span className="text-[#0F5257] dark:text-[#34D399]">Partout</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E8F5E9] text-[#0F5257] dark:bg-emerald-950/60 dark:text-emerald-300">
                v2
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop/Tablet) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative flex items-center gap-1.5 ${
                    isActive
                      ? darkMode
                        ? 'bg-[#1E2D2A] text-emerald-300 shadow-sm'
                        : 'bg-[#E8F5E9] text-[#0F5257] font-semibold shadow-xs'
                      : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {item.badge !== undefined && (
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive 
                        ? 'bg-[#0F5257] text-white' 
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Free Credits / Pro Status Button */}
            <button
              onClick={onOpenPaywall}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs ${
                stats.isPro
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/20'
                  : stats.freeCreditsRemaining > 0
                  ? darkMode
                    ? 'bg-emerald-950/80 border border-emerald-700/50 text-emerald-300'
                    : 'bg-[#E8F5E9] border border-[#0F5257]/20 text-[#0F5257] hover:bg-[#D4EBD7]'
                  : 'bg-red-50 border border-red-200 text-red-600 animate-pulse'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {stats.isPro
                  ? 'Pass Pro Actif'
                  : stats.freeCreditsRemaining > 0
                  ? `${stats.freeCreditsRemaining} essai${stats.freeCreditsRemaining > 1 ? 's' : ''} restant${stats.freeCreditsRemaining > 1 ? 's' : ''}`
                  : '0 crédit - Passer Pro'}
              </span>
            </button>

            {/* Device Simulator Toggle (Desktop only helper) */}
            <button
              onClick={() => setIsMobileDeviceView((prev) => !prev)}
              title={isMobileDeviceView ? 'Basculer en vue plein écran' : 'Tester le rendu application mobile'}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                isMobileDeviceView
                  ? 'bg-[#0F5257] text-white border-[#0F5257]'
                  : darkMode
                  ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {isMobileDeviceView ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Vue Standard</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mode Mobile</span>
                </>
              )}
            </button>

            {/* Clair / Sombre Toggle Button - Exact styling as Maquette v2 */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Basculer thème clair ou sombre"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-xs'
              }`}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Clair / Sombre</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
