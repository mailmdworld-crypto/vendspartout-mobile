import React from 'react';
import { Camera, Sparkles, Euro, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FeatureCardsGridProps {
  darkMode: boolean;
  onOpenPhotoFeature: () => void;
  onOpenMultiTextsFeature: () => void;
  onOpenNetProfitFeature: () => void;
  onOpenSafeAccountFeature: () => void;
}

export const FeatureCardsGrid: React.FC<FeatureCardsGridProps> = ({
  darkMode,
  onOpenPhotoFeature,
  onOpenMultiTextsFeature,
  onOpenNetProfitFeature,
  onOpenSafeAccountFeature,
}) => {
  const features = [
    {
      id: 'photo',
      title: 'Photo, fiche remplie',
      description: 'Titre, marque, taille et prix conseillé proposés.',
      icon: Camera,
      onClick: onOpenPhotoFeature,
      badge: 'IA Vision',
    },
    {
      id: 'texts',
      title: 'Un texte par site',
      description: 'Court sur Vinted, local sur Leboncoin, détaillé sur eBay.',
      icon: Sparkles,
      onClick: onOpenMultiTextsFeature,
      badge: '4 Formats',
    },
    {
      id: 'profit',
      title: 'Bénéfice net',
      description: 'Prix d\'achat, frais, envoi : tu vois ce qu\'il te reste.',
      icon: Euro,
      onClick: onOpenNetProfitFeature,
      badge: 'Calculateur',
    },
    {
      id: 'safety',
      title: 'Compte protégé',
      description: 'Tu publies toi-même : rien d\'automatique, aucun risque pour ton compte.',
      icon: ShieldCheck,
      onClick: onOpenSafeAccountFeature,
      badge: '100% Conforme',
    },
  ];

  return (
    <section className="w-full pb-10 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 4 Cards Grid - Exact Layout from Maquette v2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={feature.onClick}
                className={`group relative p-6 sm:p-7 rounded-[22px] sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-700/60 shadow-lg shadow-black/20'
                    : 'bg-white border-slate-200/90 hover:border-emerald-200 shadow-md shadow-slate-200/40'
                }`}
              >
                <div>
                  {/* Top Icon Badge in Soft Mint */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        darkMode
                          ? 'bg-emerald-950/70 border border-emerald-800/40 text-emerald-400'
                          : 'bg-[#E8F5E9] border border-[#D4EBD7] text-[#0F5257]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 dark:text-slate-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-2 transition-colors ${
                    darkMode
                      ? 'text-white group-hover:text-emerald-300'
                      : 'text-slate-900 group-hover:text-[#0F5257]'
                  }`}>
                    {feature.title}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className={`text-sm leading-relaxed ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Interactive hint */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#0F5257] dark:text-emerald-400">
                  <span>{feature.badge}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Explorer →</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
