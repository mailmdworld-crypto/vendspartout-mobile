import React from 'react';
import { Camera, Sparkles, Copy, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { PLATFORMS, HOW_IT_WORKS_STEPS, SAFETY_POINTS } from '../data/mockData';

interface HowItWorksViewProps {
  darkMode: boolean;
  onStartNow: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onStartNow,
}) => {
  return (
    <div className="w-full pb-20 pt-2 space-y-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] dark:bg-emerald-950/70 border border-[#0F5257]/20 text-[#0F5257] dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simplicité & Sécurité</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comment fonctionne VendsPartout ?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Multiplie tes ventes de seconde main par 3 en publiant sur tous les sites sans perdre ton temps.
          </p>
        </div>

        {/* 3 Step Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS_STEPS.map((stepItem, index) => {
            return (
              <div
                key={index}
                className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#0F5257] text-white font-extrabold text-sm flex items-center justify-center">
                      {stepItem.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] dark:bg-emerald-950/70 text-[#0F5257] dark:text-emerald-400 flex items-center justify-center">
                      {index === 0 && <Camera className="w-5 h-5" />}
                      {index === 1 && <Sparkles className="w-5 h-5" />}
                      {index === 2 && <Copy className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {stepItem.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {index === 0 && '⚡ En 3 secondes chrono'}
                  {index === 1 && '🤖 4 fiches générées d\'un coup'}
                  {index === 2 && '🛡️ 100% conforme aux CGU'}
                </div>
              </div>
            );
          })}
        </div>

        {/* WHY A SINGLE TEXT DOESN'T WORK VS VENDSPARTOUT */}
        <div className="p-6 sm:p-10 rounded-[30px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Pourquoi adapter le texte à chaque plateforme ?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Chaque communauté d&apos;acheteurs a ses codes et ses critères de recherche.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLATFORMS.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center ${p.bgBadge}`}>
                    {p.letter}
                  </span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.styleDescription}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPTE PROTÉGÉ - SAFETY FOCUS CARD */}
        <div className="p-6 sm:p-10 rounded-[30px] bg-gradient-to-br from-[#0B3C35] via-[#0F5257] to-[#0A332D] text-white shadow-2xl border border-emerald-900/50 space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Sécurité Maximale</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Compte protégé : Pourquoi VendsPartout ne se fait jamais bannir
              </h2>
            </div>

            <button
              onClick={onStartNow}
              className="px-6 py-3 rounded-full bg-white text-[#0B3C35] font-bold text-sm hover:bg-emerald-50 shadow-lg cursor-pointer transition-all shrink-0"
            >
              Ajouter mon premier article
            </button>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bots / Automation (Dangerous) */}
            <div className="p-5 rounded-2xl bg-black/30 border border-red-500/30 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>Les logiciels automatisés (Bots de cross-posting)</span>
              </div>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Demandent tes mots de passe et identifiants de compte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Envoient des requêtes automatiques détectées par les algorithmes anti-fraude</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Risque élevé de bannissement définitif de ton compte Vinted / Leboncoin</span>
                </li>
              </ul>
            </div>

            {/* VendsPartout (Safe) */}
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-400/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>VendsPartout (Assistance intelligente 100% légale)</span>
              </div>
              <ul className="space-y-2 text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Zéro mot de passe : tu ne partages aucun accès privé</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Tu publies toi-même en 1 clic : aucune API clandestine ni robot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>100% conforme aux conditions générales d&apos;utilisation (CGU)</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {SAFETY_POINTS.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">✦</span>
                  <span>{pt.title}</span>
                </h4>
                <p className="text-white/80 leading-relaxed">{pt.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
