import React, { useState } from 'react';
import { Item, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockData';
import { 
  TrendingUp, 
  Package, 
  Euro, 
  CheckCircle2, 
  Sliders, 
  Plus, 
  Trash2, 
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StockManagerViewProps {
  items: Item[];
  darkMode: boolean;
  onSelectItem: (item: Item) => void;
  onDeleteItem: (id: string) => void;
  onMarkAsSold: (id: string, soldPrice: number, platform: PlatformId) => void;
  onAddNew: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'sparkles' | 'warning') => void;
}

export const StockManagerView: React.FC<StockManagerViewProps> = ({
  items,
  onSelectItem,
  onDeleteItem,
  onMarkAsSold,
  onAddNew,
  onShowToast,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'sold'>('all');
  const [showProfitCalculator, setShowProfitCalculator] = useState(false);
  
  // Custom calculator state
  const [calcSalePrice, setCalcSalePrice] = useState(50);
  const [calcCostPrice, setCalcCostPrice] = useState(15);
  const [calcShipping, setCalcShipping] = useState(0);

  // Sold modal state
  const [sellingModalItem, setSellingModalItem] = useState<Item | null>(null);
  const [modalSoldPrice, setModalSoldPrice] = useState<number>(0);
  const [modalPlatform, setModalPlatform] = useState<PlatformId>('vinted');

  // Computed metrics
  const totalArticles = items.length;
  const activeItems = items.filter((i) => i.status === 'active');
  const soldItems = items.filter((i) => i.status === 'sold');
  
  const totalRevenue = soldItems.reduce((acc, i) => acc + (i.soldPrice || i.suggestedPrice), 0);
  const totalCostOfSold = soldItems.reduce((acc, i) => acc + i.purchasePrice, 0);
  const totalNetProfit = Math.max(0, totalRevenue - totalCostOfSold);
  const potentialStockValue = activeItems.reduce((acc, i) => acc + i.suggestedPrice, 0);

  const filteredItems = items.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const handleOpenSoldModal = (item: Item, e: React.MouseEvent) => {
    e.stopPropagation();
    setSellingModalItem(item);
    setModalSoldPrice(item.suggestedPrice);
    setModalPlatform('vinted');
  };

  const handleConfirmSold = () => {
    if (sellingModalItem) {
      onMarkAsSold(sellingModalItem.id, modalSoldPrice, modalPlatform);
      setSellingModalItem(null);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0F5257', '#34D399', '#F56B2A', '#0064D2'],
      });
      onShowToast(
        '🎉 Vente enregistrée !',
        `+${(modalSoldPrice - sellingModalItem.purchasePrice).toFixed(2)} € de bénéfice net ajouté à vos stats !`,
        'sparkles'
      );
    }
  };

  return (
    <div className="w-full pb-20 pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mon Stock & Bénéfices
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Suis tes marges nettes, tes articles en ligne et tes ventes conclues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowProfitCalculator(!showProfitCalculator)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <Sliders className="w-4 h-4 text-[#0F5257] dark:text-emerald-400" />
              <span>Simulateur de Marge</span>
            </button>

            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0F5257] hover:bg-[#0B3C35] text-white text-xs font-bold shadow-md shadow-[#0F5257]/20 transition-all hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un article</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          
          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                En vente active
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeItems.length}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
              Valeur : {potentialStockValue} €
            </span>
          </div>

          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Ventes conclues
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {soldItems.length}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
              CA : {totalRevenue} €
            </span>
          </div>

          <div className="p-5 rounded-2xl sm:rounded-3xl bg-[#0F5257] text-white shadow-xl shadow-[#0F5257]/20 border border-emerald-900/40 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Bénéfice Net Encaissé
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center">
                <Euro className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              +{totalNetProfit.toFixed(2)} €
            </div>
            <span className="text-xs text-emerald-200 mt-1 block">
              Après coût d&apos;achat & frais
            </span>
          </div>

          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Rentabilité Moyenne
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalCostOfSold > 0 ? `+${Math.round((totalNetProfit / totalCostOfSold) * 100)}%` : '+220%'}
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
              Multiplicateur x3.2
            </span>
          </div>

        </div>

        {/* Interactive Profit Simulator Tool (Collapsible) */}
        {showProfitCalculator && (
          <div className="p-6 rounded-3xl bg-[#E8F5E9] dark:bg-[#122320] border border-[#0F5257]/20 dark:border-emerald-900/40 shadow-lg space-y-5 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0F5257] text-white flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#0B3C35] dark:text-emerald-300">
                    Simulateur de Bénéfice Net Multi-Plateformes
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Ajuste tes prix et compare instantanément ce qu&apos;il te reste sur chaque site.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowProfitCalculator(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Fermer ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Prix de vente estimé (€)
                </label>
                <input
                  type="number"
                  value={calcSalePrice}
                  onChange={(e) => setCalcSalePrice(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Prix d&apos;achat / Coût (€)
                </label>
                <input
                  type="number"
                  value={calcCostPrice}
                  onChange={(e) => setCalcCostPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Frais de port / Emballage (€)
                </label>
                <input
                  type="number"
                  value={calcShipping}
                  onChange={(e) => setCalcShipping(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold"
                />
              </div>
            </div>

            {/* Platform comparison row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {PLATFORMS.map((platform) => {
                const fee = (calcSalePrice * platform.sellerFeePercent) / 100 + platform.fixedFee;
                const net = Math.max(0, calcSalePrice - fee - calcCostPrice - calcShipping);
                return (
                  <div
                    key={platform.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold ${platform.bgBadge}`}>
                        {platform.letter}
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-white">
                        {platform.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Frais : {fee.toFixed(2)} €</span>
                      <span className="text-base font-extrabold text-[#0F5257] dark:text-emerald-400 block mt-0.5">
                        +{net.toFixed(2)} € Net
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === 'all'
                  ? 'bg-[#0F5257] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Tous ({totalArticles})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === 'active'
                  ? 'bg-[#0F5257] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              En vente ({activeItems.length})
            </button>
            <button
              onClick={() => setFilterStatus('sold')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === 'sold'
                  ? 'bg-[#0F5257] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Vendus ({soldItems.length})
            </button>
          </div>
        </div>

        {/* Items Grid List */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              Aucun article dans cette section
            </p>
            <button
              onClick={onAddNew}
              className="px-5 py-2 rounded-full bg-[#0F5257] text-white text-xs font-bold"
            >
              Ajouter un article en 1 photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => {
              const isSold = item.status === 'sold';
              const profit = (isSold ? item.soldPrice || item.suggestedPrice : item.suggestedPrice) - item.purchasePrice;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`group relative p-4 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 ${
                    isSold
                      ? 'bg-slate-50/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-90'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Image & Status Tag */}
                    <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={item.photos[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-2.5 left-2.5">
                        {isSold ? (
                          <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-emerald-400 font-bold text-[11px] shadow-sm flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Vendu {item.soldPrice} €</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] shadow-sm">
                            En vente
                          </span>
                        )}
                      </div>

                      {/* Platforms Ready Indicators */}
                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg">
                        {PLATFORMS.map((p) => (
                          <span
                            key={p.id}
                            className={`w-4 h-4 rounded text-[9px] font-bold text-white flex items-center justify-center ${p.bgBadge}`}
                          >
                            {p.letter}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Brand */}
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.brand} • Taille {item.size || 'Unique'} • {item.createdAt}
                      </p>
                    </div>

                    {/* Price & Margin Pill */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Prix Vente
                        </span>
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">
                          {isSold ? item.soldPrice : item.suggestedPrice} €
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Bénéfice Net
                        </span>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          +{profit.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {!isSold ? (
                      <button
                        onClick={(e) => handleOpenSoldModal(item, e)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Marquer comme vendu</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Vendu sur {item.soldPlatform ? PLATFORMS.find(p => p.id === item.soldPlatform)?.name : 'Vinted'}
                      </span>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteItem(item.id);
                        }}
                        title="Supprimer l'article"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* SOLD CONFIRMATION MODAL */}
      {sellingModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Enregistrer la vente
                </h3>
              </div>
              <button
                onClick={() => setSellingModalItem(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Félicitations pour la vente de <strong className="text-slate-800 dark:text-white">{sellingModalItem.title}</strong> !
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Prix final de vente (€)
                </label>
                <input
                  type="number"
                  value={modalSoldPrice}
                  onChange={(e) => setModalSoldPrice(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Plateforme où l&apos;article a été vendu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setModalPlatform(p.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        modalPlatform === p.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded text-white text-[10px] font-bold flex items-center justify-center ${p.bgBadge}`}>
                        {p.letter}
                      </span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleConfirmSold}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
              >
                Valider la vente 🎉
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
