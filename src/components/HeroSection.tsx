import React, { useState } from 'react';
import { Camera, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PLATFORMS } from '../data/mockData';
import { PlatformId } from '../types';

interface HeroSectionProps {
  darkMode: boolean;
  onAddArticle: () => void;
  onHowItWorks: () => void;
  onSelectPlatformPreview?: (platformId: PlatformId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAddArticle,
  onHowItWorks,
  onSelectPlatformPreview,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('vinted');

  const handlePlatformClick = (id: PlatformId) => {
    setSelectedPlatform(id);
    if (onSelectPlatformPreview) {
      onSelectPlatformPreview(id);
    }
  };

  return (
    <section className="w-full pt-2 pb-6 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Forest Green Rounded Hero Card - Exact Maquette v2 */}
        <div className="relative overflow-hidden rounded-[26px] sm:rounded-[32px] bg-gradient-to-br from-[#0B3C35] via-[#0F5257] to-[#0A332D] text-white p-6 sm:p-10 lg:p-12 shadow-2xl shadow-[#0B3C35]/25 border border-emerald-900/40">
          
          {/* Subtle Organic Background Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
              
              {/* Badge: ✦ UNE PHOTO, PLUSIEURS SITES */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white/95 text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-xs transition-colors">
                <span className="text-emerald-300 text-xs">✦</span>
                <span>UNE PHOTO, PLUSIEURS SITES</span>
              </div>

              {/* Big Headline in 3 Lines */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
                Une photo.<br />
                Des annonces<br />
                prêtes.
              </h1>

              {/* Subtitle */}
              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                La fiche se remplit, chaque site reçoit son texte, tu gardes la main sur la publication.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                {/* White Primary Button */}
                <button
                  onClick={onAddArticle}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#0B3C35] hover:bg-emerald-50 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-black/15 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <Camera className="w-5 h-5 text-[#0F5257]" />
                  <span>Ajouter un article</span>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={onHowItWorks}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#184844]/80 text-white hover:bg-[#184844] border border-white/20 hover:border-white/40 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-xs transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                >
                  <span>Comment ça marche</span>
                </button>
              </div>

            </div>

            {/* Right Visual Card - Exact "TES ANNONCES, PRÊTES POUR" widget */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/40 dark:border-slate-800 text-slate-800 dark:text-white transition-all duration-300">
                
                {/* Widget Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    TES ANNONCES, PRÊTES POUR
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    <span>4/4 Prêtes</span>
                  </span>
                </div>

                {/* Platform List Rows */}
                <div className="space-y-2.5">
                  {PLATFORMS.map((platform) => {
                    const isSelected = selectedPlatform === platform.id;
                    return (
                      <div
                        key={platform.id}
                        onClick={() => handlePlatformClick(platform.id)}
                        className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/80 hover:bg-slate-50/70'
                        }`}
                      >
                        {/* Platform Icon & Name */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-xs ${platform.bgBadge}`}
                          >
                            {platform.letter}
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-sm text-slate-800 dark:text-white block group-hover:text-[#0F5257] dark:group-hover:text-emerald-400 transition-colors">
                              {platform.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                              {platform.id === 'vinted' && 'Texte court & #hashtags'}
                              {platform.id === 'leboncoin' && 'Localisation & remise propre'}
                              {platform.id === 'ebay' && 'Keywords SEO & specs'}
                              {platform.id === 'marketplace' && 'Direct messagerie & prix net'}
                            </span>
                          </div>
                        </div>

                        {/* Checkmark Icon ✓ */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Interactive Prompt */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span>⚡ Génération instantanée en 1 photo</span>
                  </span>
                  <button
                    onClick={onAddArticle}
                    className="text-[#0F5257] dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Essayer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
