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
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(false);

  // Data states
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('vendspartout_items_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ITEMS;
      }
    }
    return INITIAL_ITEMS;
  });

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // User stats & credits
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('vendspartout_stats_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {
          freeCreditsRemaining: 3,
          maxFreeCredits: 3,
          isPro: false,
          totalArticles: INITIAL_ITEMS.length,
          totalSold: INITIAL_ITEMS.filter((i) => i.status === 'sold').length,
          totalRevenue: 65,
          totalProfit: 45,
        };
      }
    }
    return {
      freeCreditsRemaining: 3,
      maxFreeCredits: 3,
      isPro: false,
      totalArticles: INITIAL_ITEMS.length,
      totalSold: INITIAL_ITEMS.filter((i) => i.status === 'sold').length,
      totalRevenue: 65,
      totalProfit: 45,
    };
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
    localStorage.setItem('vendspartout_stats_v2', JSON.stringify(stats));
  }, [stats]);

  // Dark mode effect on html class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
      freeCreditsRemaining: 3,
      maxFreeCredits: 3,
      isPro: false,
      totalArticles: INITIAL_ITEMS.length,
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

    switch (activeTab) {
      case 'home':
        return (
          <>
            <TopBanner darkMode={darkMode} onResetDemo={handleResetDemoData} />
            <HeroSection
              darkMode={darkMode}
              onAddArticle={() => setIsCameraModalOpen(true)}
              onHowItWorks={() => setActiveTab('how-it-works')}
              onSelectPlatformPreview={handleSelectPlatformPreview}
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
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0F1715] text-slate-100' : 'bg-[#F4F7F5] text-slate-800'}`}>
      
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
        <div className="py-8 px-4 flex flex-col items-center justify-center min-h-screen bg-slate-900/90">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-white text-xs font-bold uppercase tracking-wider bg-emerald-600 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Simulateur Application Mobile Native</span>
            </span>
            <button
              onClick={() => setIsMobileDeviceView(false)}
              className="text-slate-300 hover:text-white text-xs font-semibold underline flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Quitter le mode mobile</span>
            </button>
          </div>

          {/* iPhone 15 Pro Physical Frame */}
          <div className="relative w-full max-w-[420px] h-[860px] rounded-[50px] border-[10px] border-slate-800 bg-white dark:bg-[#0F1715] shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-3 border border-slate-800" />
            </div>

            {/* In-Frame App Content */}
            <div className="flex-1 overflow-y-auto pt-6 pb-20">
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
              />
              <main>{renderMainContent()}</main>
            </div>

            {/* In-Frame Bottom Navigation */}
            <BottomNavBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onNewArticle={() => setIsCameraModalOpen(true)}
              stats={stats}
              darkMode={darkMode}
            />
          </div>
        </div>
      ) : (
        /* Standard Responsive App */
        <div className="flex flex-col min-h-screen pb-20 md:pb-6">
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
          />

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
          />

          {/* Footer (Desktop) */}
          <footer className="hidden md:block border-t border-slate-200/80 dark:border-slate-800/80 py-8 mt-12 transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#0F5257] text-white flex items-center justify-center font-bold text-xs">
                  VP
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">VendsPartout v2</span>
                <span>— Une photo. Des annonces prêtes.</span>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={() => setActiveTab('how-it-works')} className="hover:underline">
                  Sécurité & CGU
                </button>
                <button onClick={() => setActiveTab('pricing')} className="hover:underline">
                  Tarifs & Abonnements
                </button>
                <button onClick={() => setIsSafeAccountModalOpen(true)} className="hover:underline">
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
