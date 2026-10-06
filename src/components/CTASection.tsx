import { Send, Star, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openManagerTelegram, openChannelTelegram } from '@/lib/utils';

export default function CTASection({
  variant = 'light',
  title = 'Готовы начать сотрудничество?',
  subtitle = 'Напишите нашему менеджеру в Telegram или рассчитайте платёж на калькуляторе.',
}: {
  variant?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
}) {
  const isDark = variant === 'dark';

  return (
    <section className="relative py-20 overflow-hidden">
      {isDark && <div className="absolute inset-0 bg-gray-900" />}
      {isDark && <div className="absolute inset-0 grid-pattern opacity-20" />}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-500/15 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card p-8 sm:p-12 text-center ${isDark ? 'glass-dark' : ''}`}>
          <h2 className={`font-display font-bold text-3xl sm:text-4xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-base sm:text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openManagerTelegram}
              className="btn-primary w-full sm:w-auto"
            >
              <Send className="w-5 h-5" />
              Написать менеджеру
            </button>
            <button
              onClick={openChannelTelegram}
              className={`btn-glass w-full sm:w-auto ${isDark ? '!bg-white/10 !text-white !border-white/20 hover:!bg-white/20' : ''}`}
            >
              <Star className="w-5 h-5 text-brand-500" />
              Наши отзывы
            </button>
            <Link
              to="/calculator"
              className={`btn-glass w-full sm:w-auto ${isDark ? '!bg-white/10 !text-white !border-white/20 hover:!bg-white/20' : ''}`}
            >
              <Calculator className="w-5 h-5 text-brand-500" />
              Сделать расчёт
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
