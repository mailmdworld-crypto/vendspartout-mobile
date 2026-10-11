import React from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, Sparkles, Zap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingViewProps {
  darkMode: boolean;
  onUpgradePro: (planId: string) => void;
  isPro: boolean;
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'sparkles' | 'warning') => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onUpgradePro,
  onShowToast,
}) => {
  const handleSelectPlan = (planId: string) => {
    onUpgradePro(planId);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0F5257', '#34D399', '#10B981'],
    });
    onShowToast('Abonnement activé !', 'Profite de tes fonctionnalités illimitées dès maintenant.', 'sparkles');
  };

  const faqs = [
    {
      q: 'Puis-je résilier à tout moment ?',
      a: 'Oui, sans aucun engagement. Tu peux stopper ton abonnement en 1 clic depuis ton espace compte sans frais.'
    },
    {
      q: 'Pourquoi payer alors que je pourrais tout écrire moi-même ?',
      a: 'Écrire 4 annonces optimisées différentes prend en moyenne 15 minutes par article. Avec VendsPartout, cela te prend 5 secondes. Pour 10 articles, tu gagnes plus de 2h30 de travail.'
    },
    {
      q: 'Est-ce compatible avec les règles de Vinted et Leboncoin ?',
      a: 'À 100%. VendsPartout génère le contenu et te permet de copier-coller manuellement. Aucun script robot n\'interagit avec les sites, ton compte est totalement protégé.'
    }
  ];

  return (
    <div className="w-full pb-20 pt-2 space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/70 border border-[#0F5257]/20 text-[#0F5257] dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tarifs simples & transparents</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rentabilisé dès ta première vente
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Choisis la formule qui correspond à ton volume de vente.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-[30px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#0F5257] to-[#0A332D] text-white shadow-2xl shadow-[#0F5257]/30 ring-2 ring-emerald-400/40 md:-translate-y-2'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-lg'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-[#0B3C35] font-extrabold text-xs uppercase tracking-wider shadow-md">
                    Le plus populaire
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                      isPopular ? 'bg-white/10 text-emerald-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      {plan.badge || plan.name}
                    </span>
                    <h3 className="text-2xl font-extrabold mt-3">{plan.name}</h3>
                    <p className={`text-xs mt-1 leading-relaxed ${isPopular ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black">{plan.price}</span>
                      {plan.period && (
                        <span className={`text-sm ${isPopular ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-emerald-300' : 'text-emerald-600'}`} />
                        <span className={isPopular ? 'text-white/95' : 'text-slate-700 dark:text-slate-300'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-white text-[#0B3C35] hover:bg-emerald-50 shadow-xl'
                      : 'bg-[#0F5257] text-white hover:bg-[#0B3C35] shadow-md'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{plan.ctaText}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="p-8 sm:p-10 rounded-[30px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#0F5257] dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Questions Fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
