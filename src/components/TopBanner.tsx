import React, { useState } from 'react';
import { Sparkles, X, RotateCcw } from 'lucide-react';
import { HOME_COPY } from '../data/copy';

interface TopBannerProps {
  darkMode: boolean;
  onResetDemo?: () => void;
  forceMobileLayout?: boolean;
}

export const TopBanner: React.FC<TopBannerProps> = ({ darkMode, onResetDemo, forceMobileLayout = false }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="w-full">
      <div className={`mx-auto max-w-7xl pt-3 pb-1 ${forceMobileLayout ? 'px-3' : 'px-4 sm:px-6 lg:px-8'}`}>
        <div
          className={`flex items-start sm:items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
            darkMode
              ? 'bg-[#3A4759] text-[#F8FAFC] border-[#4A5A6E]'
              : 'bg-[#E8F5E9] text-[#0B3C35] border-[#D1E7D4]'
          }`}
        >
          <div className="flex items-start sm:items-center gap-2 min-w-0">
            <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${darkMode ? 'text-emerald-400' : 'text-[#0F5257]'}`} />
            <span className="font-medium leading-snug">{HOME_COPY.banner.text}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {onResetDemo && (
              <button
                onClick={onResetDemo}
                className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-lg border ${
                  darkMode
                    ? 'border-[#4A5A6E] hover:bg-[#323E50] text-emerald-300'
                    : 'border-[#0F5257]/20 hover:bg-[#0F5257]/10 text-[#0B3C35]'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{HOME_COPY.banner.reset}</span>
              </button>
            )}
            <button
              onClick={() => setDismissed(true)}
              className={`p-1 rounded-lg opacity-70 hover:opacity-100 ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
