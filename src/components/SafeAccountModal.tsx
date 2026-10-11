import React from 'react';
import { ShieldCheck, CheckCircle2, X, Lock, FileText, Zap } from 'lucide-react';
import { SAFETY_POINTS } from '../data/mockData';

interface SafeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartScanning: () => void;
}

export const SafeAccountModal: React.FC<SafeAccountModalProps> = ({
  isOpen,
  onClose,
  onStartScanning,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0B3C35] to-[#0F5257] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Protection Totale Garantie</span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight">
            Pourquoi ton compte ne risque aucun ban
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Les solutions de vente automatique se font bloquer. Voici comment VendsPartout reste 100% légal et sécurisé.
          </p>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="space-y-3">
            {SAFETY_POINTS.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#E8F5E9] dark:bg-[#122320] border border-[#0F5257]/20 dark:border-emerald-900/50 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h4 className="font-bold text-sm text-[#0B3C35] dark:text-emerald-200">
                    {point.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 pl-6 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                0 identifiant requis
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                100% conforme CGU
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onStartScanning();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#0F5257] hover:bg-[#0B3C35] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0F5257]/20 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-300" />
              <span>Tester avec mon premier article</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
