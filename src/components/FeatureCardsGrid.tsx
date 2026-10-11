import React from 'react';
import { Camera, Sparkles, Euro, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { HOME_COPY } from '../data/copy';

interface FeatureCardsGridProps {
  darkMode: boolean;
  onOpenPhotoFeature: () => void;
  onOpenMultiTextsFeature: () => void;
  onOpenNetProfitFeature: () => void;
  onOpenSafeAccountFeature: () => void;
  forceMobileLayout?: boolean;
}

const ICONS = {
  photo: Camera,
  texts: Sparkles,
  profit: Euro,
  safety: ShieldCheck,
} as const;

export const FeatureCardsGrid: React.FC<FeatureCardsGridProps> = ({
  darkMode,
  onOpenPhotoFeature,
  onOpenMultiTextsFeature,
  onOpenNetProfitFeature,
  onOpenSafeAccountFeature,
  forceMobileLayout = false,
}) => {
  const handlers: Record<string, () => void> = {
    photo: onOpenPhotoFeature,
    texts: onOpenMultiTextsFeature,
    profit: onOpenNetProfitFeature,
    safety: onOpenSafeAccountFeature,
  };

  return (
    <section className="w-full pb-8 sm:pb-14">
      <div className={`mx-auto max-w-7xl ${forceMobileLayout ? 'px-3' : 'px-4 sm:px-6 lg:px-8'}`}>
        {/* Always 1 col on mobile / phone frame; 2 then 4 on larger screens */}
        <div
          className={`feature-grid grid gap-3 ${
            forceMobileLayout
              ? 'grid-cols-1'
              : 'grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {HOME_COPY.features.map((feature) => {
            const Icon = ICONS[feature.id as keyof typeof ICONS] || Sparkles;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={handlers[feature.id]}
                className={`group relative w-full text-left p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[160px] hover:shadow-xl active:scale-[0.99] ${
                  darkMode
                    ? 'bg-[#3A4759] border-[#4A5A6E] hover:border-emerald-400/40 shadow-md shadow-black/15'
                    : 'bg-white border-slate-200/90 hover:border-emerald-200 shadow-md shadow-slate-200/40'
                }`}
              >
                <div className="w-full min-w-0">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
                        darkMode
                          ? 'bg-[#323E50] border border-[#4A5A6E] text-emerald-400'
                          : 'bg-[#E8F5E9] border border-[#D4EBD7] text-[#0F5257]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className={`hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-[#A8B6C8]' : 'text-slate-400'}`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3
                    className={`text-[15px] sm:text-lg font-bold tracking-tight mb-1 break-words leading-snug ${
                      darkMode
                        ? 'text-[#F8FAFC] group-hover:text-emerald-300'
                        : 'text-slate-900 group-hover:text-[#0F5257]'
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`text-[13px] sm:text-sm leading-relaxed break-words ${
                      darkMode ? 'text-[#A8B6C8]' : 'text-slate-600'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t flex items-center justify-between text-[11px] sm:text-xs font-semibold gap-2 ${
                    darkMode
                      ? 'border-[#4A5A6E] text-emerald-400'
                      : 'border-slate-100 text-[#0F5257]'
                  }`}
                >
                  <span className="truncate">{feature.badge}</span>
                  <span className="shrink-0">{feature.explore}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
