import React from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, Sparkles, Zap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingViewProps {
  darkMode: boolean;
  onUpgradePro: (planId: string) => void;
  isPro: boolean;
  onShowToast: (
    title: string,
    description?: string,
    type?: 'success' | 'info' | 'sparkles' | 'warning'
  ) => void;
  forceMobileLayout?: boolean;
}

export const PricingView: React.FC<PricingViewProps> = ({
  darkMode,
  onUpgradePro,
  onShowToast,
  forceMobileLayout = false,
}) => {
  const handleSelectPlan = (planId: string) => {
    onUpgradePro(planId);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0F5257', '#34D399', '#10B981'],
    });
    onShowToast(
      'Abonnement activé !',
      'Profite de tes fonctionnalités illimitées dès maintenant.',
      'sparkles'
    );
  };

  const faqs = [
    {
      q: 'Puis-je résilier à tout moment ?',
      a: 'Oui, sans aucun engagement. Tu peux stopper ton abonnement en 1 clic depuis ton espace compte sans frais.',
    },
    {
      q: 'Pourquoi payer alors que je pourrais tout écrire moi-même ?',
      a: 'Écrire 4 annonces optimisées différentes prend en moyenne 15 minutes par article. Avec VendsPartout, cela te prend 5 secondes. Pour 10 articles, tu gagnes plus de 2h30 de travail.',
    },
    {
      q: 'Est-ce compatible avec les règles de Vinted et Leboncoin ?',
      a: "À 100%. VendsPartout génère le contenu et te permet de copier-coller manuellement. Aucun script robot n'interagit avec les sites, ton compte est totalement protégé.",
    },
  ];

  return (
    <div className="w-full pb-20 pt-4 space-y-10 sm:space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header — high contrast in dark mode */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
              darkMode
                ? 'bg-emerald-950 border-emerald-700/50 text-emerald-300'
                : 'bg-[#E8F5E9] border-[#0F5257]/20 text-[#0F5257]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tarifs simples & transparents</span>
          </div>
          <h1
            className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Rentabilisé dès ta première vente
          </h1>
          <p
            className={`text-sm sm:text-lg ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Choisis la formule qui correspond à ton volume de vente.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div
          className={`grid gap-5 sm:gap-6 lg:gap-8 items-stretch ${
            forceMobileLayout ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-[24px] sm:rounded-[30px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#0F5257] to-[#0A332D] text-white shadow-2xl shadow-[#0F5257]/30 ring-2 ring-emerald-400/40 md:-translate-y-2'
                    : darkMode
                    ? 'bg-[#273549] border border-[#334155] text-[#F1F5F9] shadow-lg'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-lg'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-[#0B3C35] font-extrabold text-xs uppercase tracking-wider shadow-md">
                    Le plus populaire
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                        isPopular
                          ? 'bg-white/10 text-emerald-200'
                          : darkMode
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {plan.badge || plan.name}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold mt-3">{plan.name}</h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isPopular
                          ? 'text-white/80'
                          : darkMode
                          ? 'text-slate-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="my-5 sm:my-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-5xl font-black">{plan.price}</span>
                      {plan.period && (
                        <span
                          className={`text-sm ${
                            isPopular
                              ? 'text-emerald-200'
                              : darkMode
                              ? 'text-slate-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-emerald-300' : 'text-emerald-500'
                          }`}
                        />
                        <span
                          className={
                            isPopular
                              ? 'text-white/95'
                              : darkMode
                              ? 'text-slate-300'
                              : 'text-slate-700'
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
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
        <div
          className={`p-5 sm:p-10 rounded-[24px] sm:rounded-[30px] border shadow-xl space-y-5 sm:space-y-6 max-w-4xl mx-auto ${
            darkMode
              ? 'bg-[#273549] border-[#334155]'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <HelpCircle
              className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-[#0F5257]'}`}
            />
            <h2
              className={`text-lg sm:text-xl font-bold ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Questions Fréquentes
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border space-y-1.5 ${
                  darkMode
                    ? 'bg-[#1E293B]/80 border-[#334155]'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <h4
                  className={`font-bold text-sm ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {faq.q}
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
