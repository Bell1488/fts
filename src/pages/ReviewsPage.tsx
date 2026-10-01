import { useState } from 'react';
import {
  Send, Star, Calculator, Quote, ArrowRight, MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { REVIEWS } from '@/data/content';
import { openManagerTelegram, openChannelTelegram } from '@/lib/utils';
import ReviewCard from '@/components/ReviewCard';
import CTASection from '@/components/CTASection';

const SERVICE_TYPES = [
  'Все услуги',
  'Оплата поставщикам',
  'Пополнение Alipay',
  'Пополнение WeChat Pay',
  'Оплата инвойсов',
  'Массовые платежи',
  'Оплата через USDT',
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState('Все услуги');

  const filtered = filter === 'Все услуги'
    ? REVIEWS
    : REVIEWS.filter((r) => r.service === filter);

  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-blob w-96 h-96 bg-brand-300/15 top-10 right-10" />

        <div className="content-layer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-brand-500 fill-brand-500" />
            <span className="text-sm font-medium text-brand-700">Отзывы клиентов</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 max-w-3xl">
            Что говорят о нас{' '}
            <span className="text-brand-600">наши клиенты</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Реальные отзывы компаний, которые доверили нам свои платежи в Китай. Больше отзывов — в нашем Telegram.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button onClick={openManagerTelegram} className="btn-primary">
              <Send className="w-5 h-5" />
              Написать менеджеру
            </button>
            <button onClick={openChannelTelegram} className="btn-glass">
              <Star className="w-5 h-5 text-brand-500" />
              Наши отзывы
            </button>
            <Link to="/calculator" className="btn-glass">
              <Calculator className="w-5 h-5 text-brand-500" />
              Сделать расчёт
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-display font-extrabold text-brand-600 mb-1">{avgRating}</div>
              <div className="text-sm text-gray-600">Средний рейтинг</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-display font-extrabold text-brand-600 mb-1">{REVIEWS.length}</div>
              <div className="text-sm text-gray-600">Отзывов на сайте</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-display font-extrabold text-brand-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Положительных</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-display font-extrabold text-brand-600 mb-1">50K+</div>
              <div className="text-sm text-gray-600">Переводов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Reviews */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {SERVICE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === type
                    ? 'gradient-orange text-white shadow-lg shadow-brand-500/20'
                    : 'glass text-gray-700 hover:border-brand-300/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review, index) => (
              <div key={review.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-card p-10 text-center overflow-hidden">
            <Quote className="w-16 h-16 text-brand-200 absolute top-6 left-6" />
            <div className="relative">
              <p className="text-xl sm:text-2xl font-display font-semibold text-gray-900 leading-relaxed mb-6">
                «Оплачиваем поставщикам через FTS-Pay каждый месяц. Перевод приходит за 20-30 минут, курс всегда выгодный. Раньше теряли время на банковские переводы, теперь всё в одном чате.»
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center">
                  <span className="text-white font-display font-bold text-lg">АС</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Андрей Соколов</div>
                  <div className="text-sm text-brand-600">ООО «ТехноИмпорт»</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channel CTA */}
      <section className="relative py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                Больше отзывов в нашем Telegram
              </h3>
              <p className="text-gray-600 text-sm">
                Мы публикуем реальные отзывы клиентов и кейсы по платежам.
              </p>
            </div>
            <button onClick={openChannelTelegram} className="btn-primary flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
              Перейти в Telegram
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
