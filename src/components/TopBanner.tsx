import React, { useState } from 'react';
import { Sparkles, X, RotateCcw } from 'lucide-react';

interface TopBannerProps {
  darkMode: boolean;
  onResetDemo?: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ darkMode, onResetDemo }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full transition-all duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-1">
        <div
          className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors ${
            darkMode
              ? 'bg-[#122320] text-emerald-200 border-emerald-900/60 shadow-xs'
              : 'bg-[#E8F5E9] text-[#0B3C35] border-[#D1E7D4] shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 shrink-0 text-[#0F5257] dark:text-emerald-400" />
            <span className="font-medium leading-relaxed">
              Maquette v2 à valider. L&apos;IA est simulée ici : dans la vraie appli elle analysera ta photo.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onResetDemo && (
              <button
                onClick={onResetDemo}
                title="Réinitialiser les données de démo"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg border border-[#0F5257]/20 hover:bg-[#0F5257]/10 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Démo</span>
              </button>
            )}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Masquer la notice"
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-inherit opacity-70 hover:opacity-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
