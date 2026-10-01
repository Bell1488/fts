import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Receipt, Wallet, MessageCircle, FileText, ArrowLeftRight, CreditCard,
  Bitcoin, ShoppingCart, Users, ArrowRight, CheckCircle2, Send, Star,
  Calculator,
} from 'lucide-react';
import { SERVICES, EXCHANGE_DIRECTIONS } from '@/data/content';
import { openManagerTelegram, openChannelTelegram } from '@/lib/utils';
import CTASection from '@/components/CTASection';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Receipt, Wallet, MessageCircle, FileText, ArrowLeftRight, CreditCard,
  Bitcoin, ShoppingCart, Users,
};

export default function ServicesPage() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId)!;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-blob w-96 h-96 bg-brand-300/15 top-10 right-10" />

        <div className="content-layer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-brand-700">Услуги</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 max-w-3xl">
            Все способы оплаты и переводов в{' '}
            <span className="text-brand-600">Китай</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Оплата поставщикам по инвойсу, пополнение Alipay и WeChat Pay, обмен рублей на юани, переводы на китайские карты.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>

      {/* Exchange Rates */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Направления{' '}
              <span className="text-brand-600">обмена</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выгодные курсы обмена с минимальной комиссией.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCHANGE_DIRECTIONS.map((dir, index) => {
              const Icon = ICON_MAP[dir.icon] ?? ArrowLeftRight;
              return (
                <div
                  key={dir.id}
                  className="glass-card p-7 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-500/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="font-display font-bold text-xl text-gray-900">{dir.from}</span>
                    <ArrowRight className="w-5 h-5 text-brand-400" />
                    <span className="font-display font-bold text-xl text-gray-900">{dir.to}</span>
                  </div>
                  <div className="text-3xl font-display font-extrabold text-brand-600 mb-1">
                    {dir.rate}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">курс обмена</div>
                  <div className="pt-3 border-t border-brand-100/50">
                    <div className="text-xs text-gray-500">комиссия {dir.commission}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="relative py-16 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Наши{' '}
              <span className="text-brand-600">услуги</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите услугу, чтобы узнать подробности.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              {SERVICES.map((service) => {
                const Icon = ICON_MAP[service.icon] ?? Receipt;
                const isActive = service.id === activeId;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveId(service.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                      isActive
                        ? 'glass-orange border-brand-300/60 shadow-lg shadow-brand-500/10'
                        : 'glass hover:border-brand-200/40'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive ? 'gradient-orange shadow-lg shadow-brand-500/20' : 'gradient-orange-light border border-brand-200/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-display font-semibold text-sm ${isActive ? 'text-brand-700' : 'text-gray-900'}`}>
                        {service.shortTitle}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                      isActive ? 'text-brand-500 translate-x-0' : 'text-gray-300 -translate-x-2 opacity-0'
                    }`} />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              <div key={active.id} className="glass-card p-8 animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center shadow-lg shadow-brand-500/20">
                    {(() => {
                      const Icon = ICON_MAP[active.icon] ?? Receipt;
                      return <Icon className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gray-900">{active.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{active.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {active.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-brand-50/50 border border-brand-100/50">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button onClick={openManagerTelegram} className="btn-primary">
                    <Send className="w-5 h-5" />
                    Написать менеджеру
                  </button>
                  <Link to="/calculator" className="btn-glass">
                    <Calculator className="w-5 h-5 text-brand-500" />
                    Сделать расчёт
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
