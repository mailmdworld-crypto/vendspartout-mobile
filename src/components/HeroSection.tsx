import React, { useState } from 'react';
import { Camera, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PLATFORMS } from '../data/mockData';
import { PlatformId } from '../types';
import { HOME_COPY } from '../data/copy';

interface HeroSectionProps {
  darkMode: boolean;
  onAddArticle: () => void;
  onHowItWorks: () => void;
  onSelectPlatformPreview?: (platformId: PlatformId) => void;
  forceMobileLayout?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  onAddArticle,
  onHowItWorks,
  onSelectPlatformPreview,
  forceMobileLayout = false,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('vinted');

  const handlePlatformClick = (id: PlatformId) => {
    setSelectedPlatform(id);
    onSelectPlatformPreview?.(id);
  };

  const platformSubtitles = HOME_COPY.widget.platforms;
  const isCompact = forceMobileLayout;

  return (
    <section className="w-full pt-2 pb-4 sm:pb-8">
      <div className={`mx-auto max-w-7xl ${isCompact ? 'px-3' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[32px] bg-gradient-to-br from-[#0B3C35] via-[#0F5257] to-[#0A332D] text-white p-4 sm:p-10 lg:p-12 shadow-2xl shadow-[#0B3C35]/25 border border-emerald-900/30">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div
            className={`relative z-10 grid gap-5 sm:gap-8 lg:gap-12 items-center ${
              isCompact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
            }`}
          >
            {/* Left */}
            <div className={`flex flex-col items-start space-y-3.5 sm:space-y-6 ${isCompact ? '' : 'lg:col-span-7'}`}>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 border border-white/20 text-white/95 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                <span className="text-emerald-300">✦</span>
                <span>{HOME_COPY.hero.badge}</span>
              </div>

              <h1
                className={`font-extrabold text-white tracking-tight leading-[1.1] ${
                  isCompact ? 'text-[1.65rem]' : 'text-3xl sm:text-5xl lg:text-[54px]'
                }`}
              >
                {HOME_COPY.hero.titleLine1}
                <br />
                {HOME_COPY.hero.titleLine2}
                <br />
                {HOME_COPY.hero.titleLine3}
              </h1>

              <p className={`text-white/85 leading-relaxed max-w-xl ${isCompact ? 'text-[13px]' : 'text-base sm:text-lg'}`}>
                {HOME_COPY.hero.subtitle}
              </p>

              <div className="flex flex-col gap-2.5 w-full sm:w-auto sm:flex-row sm:items-center pt-0.5">
                <button
                  onClick={onAddArticle}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-white text-[#0B3C35] hover:bg-emerald-50 font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
                >
                  <Camera className="w-4 h-4 text-[#0F5257]" />
                  <span>{HOME_COPY.hero.ctaPrimary}</span>
                </button>

                <button
                  onClick={onHowItWorks}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#184844]/80 text-white border border-white/20 font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>{HOME_COPY.hero.ctaSecondary}</span>
                </button>
              </div>
            </div>

            {/* Widget */}
            <div className={`flex justify-center ${isCompact ? '' : 'lg:col-span-5 lg:justify-end'}`}>
              <div
                className={`w-full rounded-2xl p-3.5 sm:p-6 shadow-2xl border ${
                  darkMode
                    ? 'bg-[#3A4759] border-[#4A5A6E] text-[#F8FAFC]'
                    : 'bg-white border-white/40 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-[#A8B6C8]' : 'text-slate-500'}`}>
                    {HOME_COPY.widget.header}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span>{HOME_COPY.widget.ready}</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {PLATFORMS.map((platform) => {
                    const isSelected = selectedPlatform === platform.id;
                    return (
                      <div
                        key={platform.id}
                        onClick={() => handlePlatformClick(platform.id)}
                        className={`flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? darkMode
                              ? 'border-emerald-400/40 bg-emerald-500/10'
                              : 'border-emerald-500/50 bg-emerald-50/40'
                            : darkMode
                            ? 'border-[#4A5A6E] bg-[#323E50]/70'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 ${platform.bgBadge}`}>
                            {platform.letter}
                          </div>
                          <div className="min-w-0 text-left">
                            <span className={`font-bold text-sm block truncate ${darkMode ? 'text-[#F8FAFC]' : 'text-slate-800'}`}>
                              {platform.name}
                            </span>
                            {!isCompact && (
                              <span className={`text-[11px] hidden sm:block truncate ${darkMode ? 'text-[#A8B6C8]' : 'text-slate-500'}`}>
                                {platformSubtitles[platform.id]}
                              </span>
                            )}
                            {isCompact && (
                              <span className={`text-[10px] block truncate ${darkMode ? 'text-[#A8B6C8]' : 'text-slate-500'}`}>
                                {platformSubtitles[platform.id]}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`mt-3 pt-3 border-t flex items-center justify-between text-xs gap-2 ${darkMode ? 'border-[#4A5A6E]' : 'border-slate-100'}`}>
                  <span className={`truncate ${darkMode ? 'text-[#A8B6C8]' : 'text-slate-500'}`}>
                    {HOME_COPY.widget.footer}
                  </span>
                  <button
                    onClick={onAddArticle}
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-0.5 shrink-0"
                  >
                    <span>{HOME_COPY.widget.tryCta}</span>
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
