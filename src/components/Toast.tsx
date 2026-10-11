import React from 'react';
import { CheckCircle2, Sparkles, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'sparkles' | 'warning';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let bg = 'bg-white text-slate-900 border-emerald-100 shadow-xl shadow-emerald-950/10';

        if (toast.type === 'sparkles') {
          icon = <Sparkles className="w-5 h-5 text-[#0F5257] shrink-0 animate-pulse" />;
          bg = 'bg-[#E8F5E9] text-[#0B3C35] border-[#0F5257]/20 shadow-xl';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
          bg = 'bg-amber-50 text-amber-900 border-amber-200 shadow-xl';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          bg = 'bg-blue-50 text-blue-900 border-blue-200 shadow-xl';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bg}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <p className="text-sm font-semibold leading-tight">{toast.title}</p>
                {toast.description && (
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{toast.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
