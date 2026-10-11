import React, { useState } from 'react';
import { Item, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockData';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Euro, 
  Tag, 
  Info, 
  Edit3, 
  Save, 
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ListingGeneratorViewProps {
  item: Item;
  darkMode: boolean;
  onUpdateItem: (updated: Item) => void;
  onSaveToStock: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'sparkles' | 'warning') => void;
  onBack?: () => void;
}

export const ListingGeneratorView: React.FC<ListingGeneratorViewProps> = ({
  item,
  onUpdateItem,
  onSaveToStock,
  onShowToast,
  onBack,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformId>('vinted');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedPrice, setEditedPrice] = useState(item.suggestedPrice);
  const [editedCost, setEditedCost] = useState(item.purchasePrice);

  const currentPlatformConfig = PLATFORMS.find((p) => p.id === activePlatform) || PLATFORMS[0];
  const currentListing = item.listings[activePlatform];

  // Copy text to clipboard with micro-animation & toast feedback
  const handleCopy = (text: string, sectionKey: string, toastLabel: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    onShowToast(
      `✓ Copié pour ${currentPlatformConfig.name} !`,
      `${toastLabel} est dans ton presse-papier, prêt à coller.`,
      'success'
    );

    // Subtle vibration simulation if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(35);
    }

    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleSaveEdits = () => {
    const updated: Item = {
      ...item,
      title: editedTitle,
      suggestedPrice: Number(editedPrice),
      purchasePrice: Number(editedCost),
    };
    onUpdateItem(updated);
    setIsEditing(false);
    onShowToast('Modifications enregistrées', 'La fiche article a été mise à jour.', 'info');
  };

  const handleFinalPublishClick = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0F5257', '#34D399', '#10B981', '#059669'],
    });

    onShowToast(
      `Ouverture de ${currentPlatformConfig.name}...`,
      'Colle la description dans ton annonce et valide la vente !',
      'sparkles'
    );
    window.open(currentPlatformConfig.appDeepLink, '_blank');
  };

  // Profit calculation for the active platform
  const sellingPrice = currentListing?.price || item.suggestedPrice;
  const platformFee = (sellingPrice * currentPlatformConfig.sellerFeePercent) / 100 + currentPlatformConfig.fixedFee;
  const netEarnings = Math.max(0, sellingPrice - platformFee);
  const netMargin = Math.max(0, netEarnings - item.purchasePrice);

  return (
    <div className="w-full pb-16 pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                ← Retour
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F5257] dark:text-emerald-400 bg-[#E8F5E9] dark:bg-emerald-950/70 px-2.5 py-1 rounded-full border border-[#0F5257]/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Annonces prêtes</span>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                Fiabilité IA {item.aiConfidence || 98}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Annuler' : 'Modifier les infos'}</span>
            </button>

            <button
              onClick={onSaveToStock}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#0F5257] text-white hover:bg-[#0B3C35] text-xs font-bold shadow-md shadow-[#0F5257]/20 transition-all hover:scale-102"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer dans mon stock</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Item Specs, Right Platform Listing Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Item Summary & Net Profit Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Item Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              
              {/* Image Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.photos[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>IA {item.aiConfidence || 98}%</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {item.suggestedPrice} € conseillé
                </div>
              </div>

              {/* Edit Mode or View Mode */}
              {isEditing ? (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Prix vente (€)
                      </label>
                      <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Prix achat (€)
                      </label>
                      <input
                        type="number"
                        value={editedCost}
                        onChange={(e) => setEditedCost(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveEdits}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Valider les changements
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.categoryLabel}
                    </p>
                  </div>

                  {/* Badges List */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      🏷️ {item.brand}
                    </span>
                    {item.size && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                        📏 Taille {item.size}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                      ✓ {item.condition}
                    </span>
                  </div>

                  {/* AI Detected features */}
                  {item.detectedFeatures && item.detectedFeatures.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Détails repérés par l&apos;IA
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {item.detectedFeatures.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Profit Simulation Card ("Bénéfice Net") */}
            <div className="bg-[#E8F5E9] dark:bg-[#122320] rounded-3xl p-5 sm:p-6 border border-[#0F5257]/20 dark:border-emerald-900/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0F5257] text-white flex items-center justify-center">
                    <Euro className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-[#0B3C35] dark:text-emerald-300">
                    Bénéfice net estimé ({currentPlatformConfig.name})
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 bg-white/70 dark:bg-slate-900/70 px-2.5 py-0.5 rounded-full">
                  +{Math.round((netMargin / (item.purchasePrice || 1)) * 100)}% ROI
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-emerald-900/10">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">
                    Prix Vente
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">
                    {sellingPrice} €
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-emerald-900/10">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block uppercase">
                    Frais Site
                  </span>
                  <span className="text-base font-extrabold text-slate-700 dark:text-slate-300">
                    {platformFee.toFixed(2)} €
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0F5257] text-white shadow-sm">
                  <span className="text-[10px] text-emerald-200 font-bold block uppercase">
                    Bénéfice Net
                  </span>
                  <span className="text-base font-extrabold text-white">
                    {netMargin.toFixed(2)} €
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#0B3C35]/80 dark:text-emerald-300/80 leading-snug">
                💡 {currentPlatformConfig.buyerProtection}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: 4-PLATFORM TABS & 1-CLICK COPY WORKSPACE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Platform Selector Tabs */}
            <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-4 gap-1.5">
              {PLATFORMS.map((platform) => {
                const isActive = activePlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                    className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0F5257] text-white shadow-md shadow-[#0F5257]/20 scale-102'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-white text-[11px] font-bold ${
                        isActive ? 'bg-white/20' : platform.bgBadge
                      }`}
                    >
                      {platform.letter}
                    </span>
                    <span className="hidden sm:inline">{platform.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Platform Generator Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              
              {/* Platform Info Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${currentPlatformConfig.bgBadge}`}
                  >
                    {currentPlatformConfig.letter}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Format {currentPlatformConfig.name}</span>
                      <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                        Optimisé IA
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentPlatformConfig.styleDescription}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Prix recommandé
                  </span>
                  <span className="text-lg font-extrabold text-[#0F5257] dark:text-emerald-400">
                    {sellingPrice} €
                  </span>
                </div>
              </div>

              {/* Field 1: Optimized Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#0F5257] dark:text-emerald-400" />
                    <span>Titre optimisé</span>
                  </label>
                  <button
                    onClick={() =>
                      handleCopy(
                        currentListing?.title || item.title,
                        'title',
                        'Titre'
                      )
                    }
                    className="text-xs font-semibold text-[#0F5257] dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    {copiedSection === 'title' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier le titre</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-white flex items-center justify-between">
                  <span>{currentListing?.title || item.title}</span>
                </div>
              </div>

              {/* Field 2: Optimized Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0F5257] dark:text-emerald-400" />
                    <span>Description complète prête à coller</span>
                  </label>
                  <button
                    onClick={() =>
                      handleCopy(
                        currentListing?.description || '',
                        'desc',
                        'Description'
                      )
                    }
                    className="text-xs font-semibold text-[#0F5257] dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    {copiedSection === 'desc' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier la description</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                    {currentListing?.description || 'Aucune description générée.'}
                  </pre>
                </div>
              </div>

              {/* Field 3: Tags / Hashtags */}
              {currentListing?.tags && currentListing.tags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Mots-clés & Hashtags
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          currentListing.tags.join(' '),
                          'tags',
                          'Hashtags'
                        )
                      }
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copier tout</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentListing.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Smart Tip for this platform */}
              {currentListing?.tips && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <p>
                    <strong className="font-semibold">Conseil pro {currentPlatformConfig.name} :</strong>{' '}
                    {currentListing.tips}
                  </p>
                </div>
              )}

              {/* BIG PUBLISH / ACTION BUTTONS */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1-Click Copy Everything */}
                <button
                  onClick={() =>
                    handleCopy(
                      `${currentListing.title}\n\n${currentListing.description}`,
                      'all',
                      'Annonce complète'
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#0F5257] dark:border-emerald-500 text-[#0F5257] dark:text-emerald-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#E8F5E9]/50 dark:hover:bg-emerald-950/40 transition-all cursor-pointer active:scale-98"
                >
                  {copiedSection === 'all' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>Tout est copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>1-Clic : Tout copier</span>
                    </>
                  )}
                </button>

                {/* Open Platform Deep Link */}
                <button
                  onClick={handleFinalPublishClick}
                  className={`w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-102 active:scale-98 ${currentPlatformConfig.bgBadge}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ouvrir {currentPlatformConfig.name}</span>
                </button>
              </div>

              {/* Safety notice reminder */}
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Publication manuelle assistée : 100% sans risque de bannissement</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
