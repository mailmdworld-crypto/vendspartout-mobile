import React, { useState } from 'react';
import { Item, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockData';
import { Layers, Copy, Check, Sparkles, Plus, Search } from 'lucide-react';

interface ListingsListViewProps {
  items: Item[];
  darkMode: boolean;
  onSelectItem: (item: Item) => void;
  onAddNew: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'sparkles' | 'warning') => void;
}

export const ListingsListView: React.FC<ListingsListViewProps> = ({
  items,
  onSelectItem,
  onAddNew,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleQuickCopy = (item: Item, platformId: PlatformId, e: React.MouseEvent) => {
    e.stopPropagation();
    const listing = item.listings[platformId];
    if (listing) {
      navigator.clipboard.writeText(`${listing.title}\n\n${listing.description}`);
      setCopiedId(`${item.id}-${platformId}`);
      onShowToast(
        `✓ Copié pour ${PLATFORMS.find(p => p.id === platformId)?.name} !`,
        'Le titre et la description sont prêts à être collés.',
        'success'
      );
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full pb-20 pt-2 space-y-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mes Annonces Prêtes
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {items.length} article{items.length > 1 ? 's' : ''} optimisé{items.length > 1 ? 's' : ''} pour 4 plateformes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher marque, article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0F5257]"
              />
            </div>

            <button
              onClick={onAddNew}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F5257] hover:bg-[#0B3C35] text-white text-xs font-bold shadow-md shadow-[#0F5257]/20 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau</span>
            </button>
          </div>
        </div>

        {/* Listings List */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
            <Layers className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              Aucune annonce trouvée
            </p>
            <button
              onClick={onAddNew}
              className="px-5 py-2 rounded-full bg-[#0F5257] text-white text-xs font-bold"
            >
              Scanner un nouvel article
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 group"
              >
                {/* Left Item Information */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 shadow-xs group-hover:scale-103 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Prêt</span>
                      </span>
                      <span className="text-xs text-slate-400">• {item.createdAt}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1 group-hover:text-[#0F5257] dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.brand} • {item.condition} • Prix conseillé : <strong className="text-slate-800 dark:text-white">{item.suggestedPrice} €</strong>
                    </p>
                  </div>
                </div>

                {/* Right Quick 1-Click Platform Copy Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-bold uppercase hidden xl:inline mr-2">
                    Copier en 1-clic :
                  </span>

                  {PLATFORMS.map((platform) => {
                    const isCopied = copiedId === `${item.id}-${platform.id}`;
                    return (
                      <button
                        key={platform.id}
                        onClick={(e) => handleQuickCopy(item, platform.id, e)}
                        title={`Copier le texte complet optimisé pour ${platform.name}`}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                          isCopied
                            ? 'bg-emerald-600 text-white border-emerald-600 scale-105'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded text-white text-[9px] font-bold flex items-center justify-center ${platform.bgBadge}`}
                        >
                          {platform.letter}
                        </span>
                        <span>{platform.name}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
