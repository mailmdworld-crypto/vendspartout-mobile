import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Sparkles, Check, X, ShieldCheck, Zap, CreditCard, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradePro: (planId: string) => void;
  freeCreditsRemaining: number;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUpgradePro,
  freeCreditsRemaining,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pass-illimite');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradePro(selectedPlanId);
      onClose();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#0F5257', '#34D399', '#10B981', '#F56B2A'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header with Forest Gradient Banner */}
        <div className="relative bg-gradient-to-br from-[#0B3C35] via-[#0F5257] to-[#0A332D] text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multiplie tes ventes de seconde main</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Passe à la vitesse supérieure
          </h2>
          <p className="text-sm text-white/80 mt-1 max-w-md">
            {freeCreditsRemaining === 0
              ? 'Tes 3 essais gratuits sont épuisés. Choisis une formule pour continuer à générer des annonces percutantes !'
              : 'Gagne des heures chaque semaine et vends plus vite sur Vinted, Leboncoin, eBay & Marketplace.'}
          </p>
        </div>

        {/* Plan Cards Selection */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRICING_PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#0F5257] dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md ring-2 ring-[#0F5257]/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#0F5257] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      Recommandé
                    </span>
                  )}

                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-xs text-slate-500">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? 'text-[#0F5257] dark:text-emerald-400 font-bold' : 'text-slate-400'}>
                      {isSelected ? '✓ Sélectionné' : 'Choisir'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Features Checklist for Selected Plan */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Inclus avec cette formule :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRICING_PLANS.find((p) => p.id === selectedPlanId)?.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment CTA Simulation */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-[#0F5257] hover:bg-[#0B3C35] text-white font-extrabold text-base shadow-xl shadow-[#0F5257]/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-101 active:scale-98 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Activation en cours...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-emerald-300" />
                  <span>Débloquer maintenant ({PRICING_PLANS.find((p) => p.id === selectedPlanId)?.price})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paiement sécurisé SSL 256 bits</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Apple Pay / CB acceptés</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sans engagement</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
