import { useState, useEffect } from 'react';
import { ActiveTab, Item, UserStats, PlatformId } from './types';
import { INITIAL_ITEMS, PRESET_ITEMS } from './data/mockData';
import { Header } from './components/Header';
import { TopBanner } from './components/TopBanner';
import { HeroSection } from './components/HeroSection';
import { FeatureCardsGrid } from './components/FeatureCardsGrid';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { ListingGeneratorView } from './components/ListingGeneratorView';
import { StockManagerView } from './components/StockManagerView';
import { ListingsListView } from './components/ListingsListView';
import { HowItWorksView } from './components/HowItWorksView';
import { PricingView } from './components/PricingView';
import { PaywallModal } from './components/PaywallModal';
import { SafeAccountModal } from './components/SafeAccountModal';
import { BottomNavBar } from './components/BottomNavBar';
import { Toast, ToastMessage } from './components/Toast';
import { Smartphone, Monitor, Share2, Copy, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  // Soft Dark ON by default so the maquette soft-dark palette is immediately visible
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(false);
  const [showMobileLinkBanner, setShowMobileLinkBanner] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');

  // Data states — always start from maquette demo data (no stale cache)
  const [items, setItems] = useState<Item[]>(() => {
    try {
      localStorage.removeItem('vendspartout_items_v2');
      localStorage.removeItem('vendspartout_stats_v2');
      localStorage.removeItem('vendspartout_stats_v2_soft');
    } catch {
      /* ignore */
    }
    return INITIAL_ITEMS;
  });

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // User stats — maquette v2: "2 essais restants" + Annonces (4)
  const [stats, setStats] = useState<UserStats>({
    freeCreditsRemaining: 2,
    maxFreeCredits: 3,
    isPro: false,
    totalArticles: 4,
    totalSold: INITIAL_ITEMS.filter((i) => i.status === 'sold').length,
    totalRevenue: 65,
    totalProfit: 45,
  });

  // Modals
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isSafeAccountModalOpen, setIsSafeAccountModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('vendspartout_items_v2', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('vendspartout_stats_v2_soft', JSON.stringify(stats));
  }, [stats]);

  // Soft Dark PLUS CLAIR — palette enforced on root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#2A3544';
      root.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#2A3544';
      document.body.style.color = '#F8FAFC';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F4F7F5';
      root.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#F4F7F5';
      document.body.style.color = '#1e293b';
    }
  }, [darkMode]);

  // Capture current URL for mobile sharing + auto mobile detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      if (isSmallScreen) {
        setShowMobileLinkBanner(false);
      }
    }
  }, []);

  const handleCopyMobileLink = async () => {
    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      await navigator.clipboard.writeText(url);
      addToast('Lien copié !', 'Colle-le dans Safari / Chrome sur ton iPhone ou Android.', 'success');
    } catch {
      addToast('Lien à copier', url, 'info');
    }
  };

  const handleShareMobile = async () => {
    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VendsPartout — Une photo. Des annonces prêtes.',
          text: 'Ouvre VendsPartout sur ton téléphone',
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyMobileLink();
    }
  };

  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'info' | 'sparkles' | 'warning' = 'success'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      description,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // When a new item is generated via camera/scan
  const handleItemGenerated = (newItem: Item) => {
    setItems((prev) => [newItem, ...prev]);
    setSelectedItem(newItem);
    setActiveTab('new');

    if (!stats.isPro) {
      setStats((prev) => ({
        ...prev,
        freeCreditsRemaining: Math.max(0, prev.freeCreditsRemaining - 1),
        totalArticles: prev.totalArticles + 1,
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        totalArticles: prev.totalArticles + 1,
      }));
    }

    addToast(
      '✨ 4 annonces générées avec succès !',
      'Vinted, Leboncoin, eBay et Marketplace sont prêtes.',
      'sparkles'
    );
  };

  const handleUpdateItem = (updated: Item) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setSelectedItem(updated);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
      setActiveTab('stock');
    }
    addToast('Article supprimé', undefined, 'info');
  };

  const handleMarkAsSold = (id: string, soldPrice: number, platform: PlatformId) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'sold',
            soldPrice,
            soldPlatform: platform,
            soldDate: "Aujourd'hui",
          };
        }
        return item;
      })
    );

    const found = items.find((i) => i.id === id);
    const purchaseCost = found?.purchasePrice || 0;
    const profit = Math.max(0, soldPrice - purchaseCost);

    setStats((prev) => ({
      ...prev,
      totalSold: prev.totalSold + 1,
      totalRevenue: prev.totalRevenue + soldPrice,
      totalProfit: prev.totalProfit + profit,
    }));
  };

  const handleUpgradePro = (_planId: string) => {
    setStats((prev) => ({
      ...prev,
      isPro: true,
      freeCreditsRemaining: 999,
    }));
  };

  const handleResetDemoData = () => {
    setItems(INITIAL_ITEMS);
    setSelectedItem(null);
    setStats({
      freeCreditsRemaining: 2,
      maxFreeCredits: 3,
      isPro: false,
      totalArticles: 4,
      totalSold: INITIAL_ITEMS.filter((i) => i.status === 'sold').length,
      totalRevenue: 65,
      totalProfit: 45,
    });
    addToast('Démo réinitialisée', 'Données initiales rechargées.', 'info');
  };

  // Quick preset loader for platform preview directly from Hero
  const handleSelectPlatformPreview = (_platformId: PlatformId) => {
    const defaultItem = items[0] || {
      ...PRESET_ITEMS[0],
      id: 'demo-item',
      createdAt: 'Maintenant',
      status: 'active',
      photos: PRESET_ITEMS[0].photos,
    };
    setSelectedItem(defaultItem);
    setActiveTab('new');
  };

  // Main content router
  const renderMainContent = () => {
    // If viewing the newly generated or selected item editor
    if (activeTab === 'new' && selectedItem) {
      return (
        <ListingGeneratorView
          item={selectedItem}
          darkMode={darkMode}
          onUpdateItem={handleUpdateItem}
          onSaveToStock={() => {
            setActiveTab('stock');
            addToast('Article sauvegardé', 'Retrouve-le dans ton stock.', 'success');
          }}
          onShowToast={addToast}
          onBack={() => setActiveTab('home')}
        />
      );
    }

    if (activeTab === 'new' && !selectedItem) {
      // Trigger camera automatically if no item is selected
      return (
        <div className="py-12 text-center max-w-lg mx-auto space-y-4 px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Prendre une photo pour démarrer
          </h2>
          <p className="text-sm text-slate-500">
            Prends une photo nette de ton article ou importe une image existante.
          </p>
          <button
            onClick={() => setIsCameraModalOpen(true)}
            className="px-6 py-3.5 rounded-full bg-[#0F5257] text-white font-bold text-sm shadow-xl hover:bg-[#0B3C35]"
          >
            📷 Ouvrir l&apos;appareil photo
          </button>
        </div>
      );
    }

    const forceMobile = isMobileDeviceView;

    switch (activeTab) {
      case 'home':
        return (
          <>
            <TopBanner
              darkMode={darkMode}
              onResetDemo={handleResetDemoData}
              forceMobileLayout={forceMobile}
            />
            <HeroSection
              darkMode={darkMode}
              onAddArticle={() => setIsCameraModalOpen(true)}
              onHowItWorks={() => setActiveTab('how-it-works')}
              onSelectPlatformPreview={handleSelectPlatformPreview}
              forceMobileLayout={forceMobile}
            />
            <FeatureCardsGrid
              darkMode={darkMode}
              onOpenPhotoFeature={() => setIsCameraModalOpen(true)}
              onOpenMultiTextsFeature={() => {
                setSelectedItem(items[0]);
                setActiveTab('new');
              }}
              onOpenNetProfitFeature={() => setActiveTab('stock')}
              onOpenSafeAccountFeature={() => setIsSafeAccountModalOpen(true)}
              forceMobileLayout={forceMobile}
            />
          </>
        );

      case 'listings':
        return (
          <ListingsListView
            items={items}
            darkMode={darkMode}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setActiveTab('new');
            }}
            onAddNew={() => setIsCameraModalOpen(true)}
            onShowToast={addToast}
          />
        );

      case 'stock':
        return (
          <StockManagerView
            items={items}
            darkMode={darkMode}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setActiveTab('new');
            }}
            onDeleteItem={handleDeleteItem}
            onMarkAsSold={handleMarkAsSold}
            onAddNew={() => setIsCameraModalOpen(true)}
            onShowToast={addToast}
            forceMobileLayout={forceMobile}
          />
        );

      case 'how-it-works':
        return (
          <HowItWorksView
            darkMode={darkMode}
            onStartNow={() => setIsCameraModalOpen(true)}
          />
        );

      case 'pricing':
        return (
          <PricingView
            darkMode={darkMode}
            onUpgradePro={handleUpgradePro}
            isPro={stats.isPro}
            onShowToast={addToast}
            forceMobileLayout={forceMobile}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 overflow-x-hidden ${darkMode ? 'bg-[#2A3544] text-[#F8FAFC]' : 'bg-[#F4F7F5] text-slate-800'}`}>
      
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Camera Capture & Scan Modal */}
      <CameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onItemGenerated={handleItemGenerated}
        freeCreditsRemaining={stats.freeCreditsRemaining}
        isPro={stats.isPro}
        onOpenPaywall={() => setIsPaywallModalOpen(true)}
      />

      {/* Paywall Monetization Modal */}
      <PaywallModal
        isOpen={isPaywallModalOpen}
        onClose={() => setIsPaywallModalOpen(false)}
        onUpgradePro={handleUpgradePro}
        freeCreditsRemaining={stats.freeCreditsRemaining}
      />

      {/* Safe Account Modal */}
      <SafeAccountModal
        isOpen={isSafeAccountModalOpen}
        onClose={() => setIsSafeAccountModalOpen(false)}
        onStartScanning={() => setIsCameraModalOpen(true)}
      />

      {/* Optional Desktop Mobile Shell Wrapper for Testing Native App Feel */}
      {isMobileDeviceView ? (
        <div className={`py-6 px-3 flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-[#323E50]' : 'bg-slate-700/90'}`}>
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-white text-xs font-bold uppercase tracking-wider bg-emerald-600 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mode Mobile</span>
            </span>
            <button
              onClick={() => setIsMobileDeviceView(false)}
              className="text-slate-200 hover:text-white text-xs font-semibold underline flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Vue Standard</span>
            </button>
          </div>

          {/* iPhone frame — proper flex layout so bottom nav stays inside */}
          <div
            className={`phone-frame relative w-full max-w-[390px] h-[min(844px,92vh)] rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col ${
              darkMode ? 'bg-[#2A3544]' : 'bg-white'
            }`}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 pointer-events-none" />

            <div className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden pt-6 ${darkMode ? 'bg-[#2A3544]' : 'bg-[#F4F7F5]'}`}>
              <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                stats={stats}
                onOpenPaywall={() => setIsPaywallModalOpen(true)}
                onNewArticle={() => setIsCameraModalOpen(true)}
                isMobileDeviceView={true}
                setIsMobileDeviceView={setIsMobileDeviceView}
                annoncesCount={4}
              />
              <main className="pb-20">{renderMainContent()}</main>
            </div>

            <BottomNavBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onNewArticle={() => setIsCameraModalOpen(true)}
              stats={stats}
              darkMode={darkMode}
              annoncesCount={4}
              embedded
            />
          </div>
        </div>
      ) : (
        /* Standard Responsive App */
        <div className="flex flex-col min-h-screen pb-[76px] md:pb-6">
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            stats={stats}
            onOpenPaywall={() => setIsPaywallModalOpen(true)}
            onNewArticle={() => setIsCameraModalOpen(true)}
            isMobileDeviceView={isMobileDeviceView}
            setIsMobileDeviceView={setIsMobileDeviceView}
            annoncesCount={4}
          />

          {/* Banner: lien pour ouvrir sur mobile */}
          {showMobileLinkBanner && (
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0F5257] text-white shadow-lg shadow-[#0F5257]/20 border border-emerald-800/40">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight">Ouvre VendsPartout sur ton téléphone</p>
                    <p className="text-[11px] sm:text-xs text-emerald-100/90 mt-0.5 truncate">
                      {shareUrl || 'Copie le lien de cette page et ouvre-le dans Safari / Chrome mobile'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 pl-0 sm:pl-2">
                  <button
                    onClick={handleCopyMobileLink}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#0B3C35] text-xs font-bold hover:bg-emerald-50 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier le lien</span>
                  </button>
                  <button
                    onClick={handleShareMobile}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Partager</span>
                  </button>
                  <button
                    onClick={() => setShowMobileLinkBanner(false)}
                    className="p-2 rounded-xl hover:bg-white/10 text-white/80"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1">
            {renderMainContent()}
          </main>

          {/* Mobile Native Bottom Navigation Bar */}
          <BottomNavBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewArticle={() => setIsCameraModalOpen(true)}
            stats={stats}
            darkMode={darkMode}
            annoncesCount={4}
          />

          {/* Footer (Desktop) */}
          <footer
            className={`hidden md:block border-t py-8 mt-12 transition-colors ${
              darkMode ? 'border-[#4A5A6E]' : 'border-slate-200/80'
            }`}
          >
            <div
              className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
                darkMode ? 'text-[#A8B6C8]' : 'text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#0F5257] text-white flex items-center justify-center font-bold text-xs">
                  VP
                </div>
                <span className={`font-bold ${darkMode ? 'text-[#F8FAFC]' : 'text-slate-700'}`}>
                  VP VendsPartout v2 — Une photo. Des annonces prêtes.
                </span>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setActiveTab('how-it-works')}
                  className={`font-medium hover:underline ${
                    darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sécurité & CGU
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`font-medium hover:underline ${
                    darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tarifs & Abonnements
                </button>
                <button
                  onClick={() => setIsSafeAccountModalOpen(true)}
                  className={`font-medium hover:underline ${
                    darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Compte protégé
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

    </div>
  );
}
