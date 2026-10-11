import React from 'react';
import { ActiveTab, UserStats } from '../types';
import { Sun, Moon, Sparkles, Smartphone } from 'lucide-react';
import { HOME_COPY } from '../data/copy';

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
  annoncesCount?: number;
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
  annoncesCount,
}) => {
  const badgeCount = annoncesCount ?? HOME_COPY.nav.listingsBadge;

  const navItems: { id: ActiveTab; label: string; badge?: number | string }[] = [
    { id: 'home', label: HOME_COPY.nav.home },
    { id: 'new', label: HOME_COPY.nav.new },
    { id: 'listings', label: HOME_COPY.nav.listings, badge: badgeCount },
    { id: 'stock', label: HOME_COPY.nav.stock },
    { id: 'how-it-works', label: HOME_COPY.nav.howItWorks },
    { id: 'pricing', label: HOME_COPY.nav.pricing },
  ];

  const handleNavClick = (id: ActiveTab) => {
    if (id === 'new') onNewArticle();
    else setActiveTab(id);
  };

  const displayCredits = stats.isPro
    ? 'Pass Pro Actif'
    : stats.freeCreditsRemaining <= 0
    ? '0 crédit - Passer Pro'
    : stats.freeCreditsRemaining === 1
    ? '1 essai restant'
    : HOME_COPY.nav.trials;

  // Compact header for phone frame OR real mobile via CSS (always show compact when isMobileDeviceView)
  if (isMobileDeviceView) {
    return (
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md border-b ${
          darkMode
            ? 'bg-[#2A3544]/95 border-[#4A5A6E]'
            : 'bg-[#F4F7F5]/95 border-slate-200/70'
        }`}
      >
        <div className="px-3 pt-1 pb-2">
          <div className="flex items-center justify-between h-11 gap-2">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 cursor-pointer select-none min-w-0"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0F5257] flex items-center justify-center shadow-md shrink-0">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1 min-w-0">
                <span className={`text-[15px] font-bold tracking-tight truncate ${darkMode ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
                  Vends<span className={darkMode ? 'text-emerald-400' : 'text-[#0F5257]'}>Partout</span>
                </span>
                <span className={`text-[9px] font-bold uppercase px-1 py-0.5 rounded shrink-0 ${darkMode ? 'bg-[#3A4759] text-emerald-300' : 'bg-[#E8F5E9] text-[#0F5257]'}`}>
                  v2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={onOpenPaywall}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${
                  stats.isPro
                    ? 'bg-amber-500 text-white'
                    : darkMode
                    ? 'bg-[#3A4759] border border-emerald-500/40 text-emerald-300'
                    : 'bg-[#E8F5E9] border border-[#0F5257]/20 text-[#0F5257]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{stats.isPro ? 'Pro' : '2 essais'}</span>
              </button>
              <button
                onClick={() => setDarkMode((p) => !p)}
                className={`p-1.5 rounded-lg border ${darkMode ? 'bg-[#3A4759] border-[#4A5A6E] text-amber-400' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
            {navItems
              .filter((i) => i.id !== 'how-it-works')
              .map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                      isActive
                        ? darkMode
                          ? 'bg-[#3A4759] text-emerald-300'
                          : 'bg-[#E8F5E9] text-[#0F5257]'
                        : darkMode
                        ? 'text-[#A8B6C8] hover:text-[#F8FAFC]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {item.label}
                    {item.badge !== undefined && (
                      <span className={`ml-1 text-[10px] px-1 rounded-full font-bold ${isActive ? 'bg-[#0F5257] text-white' : darkMode ? 'bg-[#4A5A6E] text-[#F8FAFC]' : 'bg-slate-200 text-slate-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors ${
        darkMode ? 'bg-[#2A3544]/95 border-[#4A5A6E]' : 'bg-[#F4F7F5]/90 border-slate-200/60'
      }`}
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
        {/* Mobile real viewport: compact row */}
        <div className="flex md:hidden items-center justify-between h-14 gap-2">
          <div onClick={() => setActiveTab('home')} className="flex items-center gap-2 cursor-pointer min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#0F5257] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </div>
            <span className={`text-base font-bold truncate ${darkMode ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
              Vends<span className={darkMode ? 'text-emerald-400' : 'text-[#0F5257]'}>Partout</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onOpenPaywall}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold ${
                darkMode
                  ? 'bg-[#3A4759] border border-emerald-500/40 text-emerald-300'
                  : 'bg-[#E8F5E9] border border-[#0F5257]/20 text-[#0F5257]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>2 essais</span>
            </button>
            <button
              onClick={() => setDarkMode((p) => !p)}
              className={`p-2 rounded-xl border ${darkMode ? 'bg-[#3A4759] border-[#4A5A6E] text-amber-400' : 'bg-white border-slate-200 text-slate-600'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between h-16 gap-3">
          <div onClick={() => setActiveTab('home')} className="flex items-center gap-2.5 cursor-pointer shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#0F5257] flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl font-bold ${darkMode ? 'text-[#F8FAFC]' : 'text-slate-900'}`}>
                Vends<span className={darkMode ? 'text-emerald-400' : 'text-[#0F5257]'}>Partout</span>
              </span>
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${darkMode ? 'bg-[#3A4759] text-emerald-300' : 'bg-[#E8F5E9] text-[#0F5257]'}`}>
                v2
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 lg:px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? darkMode
                        ? 'bg-[#3A4759] text-emerald-300'
                        : 'bg-[#E8F5E9] text-[#0F5257]'
                      : darkMode
                      ? 'text-[#F8FAFC] hover:bg-[#3A4759]/70'
                      : 'text-slate-600 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {item.badge !== undefined && (
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#0F5257] text-white' : darkMode ? 'bg-[#4A5A6E] text-[#F8FAFC]' : 'bg-slate-200 text-slate-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenPaywall}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                stats.isPro
                  ? 'bg-amber-500 text-white'
                  : darkMode
                  ? 'bg-[#3A4759] border border-emerald-500/40 text-emerald-300'
                  : 'bg-[#E8F5E9] border border-[#0F5257]/20 text-[#0F5257]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{displayCredits}</span>
            </button>

            <button
              onClick={() => setIsMobileDeviceView((p) => !p)}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium ${
                darkMode
                  ? 'bg-[#3A4759] text-[#F8FAFC] border-[#4A5A6E]'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mode Mobile</span>
            </button>

            <button
              onClick={() => setDarkMode((p) => !p)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
                darkMode
                  ? 'bg-[#3A4759] text-[#F8FAFC] border-[#4A5A6E]'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{HOME_COPY.nav.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-500" />
                  <span>{HOME_COPY.nav.themeToggle}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
