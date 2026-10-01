import { useState, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { openManagerTelegram } from '@/lib/utils';

export default function StickySupportButton() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-slide-up">
      {expanded && (
        <div className="glass rounded-2xl p-5 shadow-2xl shadow-brand-500/20 max-w-xs animate-fade-in-up">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-gray-900 text-sm">Поддержка FTS-Pay</div>
                <div className="text-xs text-gray-500">Онлайн 24/7</div>
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Напишите нам — рассчитаем платёж и ответим на все вопросы. Работаем круглосуточно.
          </p>
          <button
            onClick={openManagerTelegram}
            className="btn-primary w-full text-sm py-3"
          >
            <Send className="w-4 h-4" />
            Открыть Telegram
          </button>
        </div>
      )}

      <button
        onClick={() => (expanded ? openManagerTelegram() : setExpanded(true))}
        className="relative gradient-orange text-white w-16 h-16 rounded-full shadow-2xl shadow-brand-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Поддержка"
      >
        {!expanded && (
          <span className="absolute inset-0 rounded-full bg-brand-400 animate-ping opacity-40" />
        )}
        <Send className="w-7 h-7 relative z-10" />
      </button>
    </div>
  );
}
