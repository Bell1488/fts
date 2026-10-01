import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send, Star, Calculator, ArrowRight, Receipt, Wallet, MessageCircle,
  FileText, ArrowLeftRight, CreditCard, Bitcoin, ShoppingCart, Users,
  Zap, Clock, Percent, TrendingUp, Layers, ShieldCheck,
  CheckCircle2, MessageSquare,
} from 'lucide-react';
import { SERVICES, STATS, PROCESS_STEPS, ADVANTAGES, REVIEWS, FAQ_ITEMS, COMPANY, EXCHANGE_DIRECTIONS } from '@/data/content';
import { openManagerTelegram, openChannelTelegram, formatNumber, formatCurrency } from '@/lib/utils';
import CTASection from '@/components/CTASection';
import ReviewCard from '@/components/ReviewCard';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Receipt, Wallet, MessageCircle, FileText, ArrowLeftRight, CreditCard,
  Bitcoin, ShoppingCart, Users, Zap, Clock, Percent, TrendingUp, Layers,
  ShieldCheck, MessageSquare, Calculator, Send, CheckCircle2,
};

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return value;
}

function StatCard({ stat, start }: { stat: typeof STATS[0]; start: boolean }) {
  const numValue = parseInt(stat.value.replace(/\D/g, ''));
  const value = useCountUp(isNaN(numValue) ? 0 : numValue, 2000, start);
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-4xl sm:text-5xl font-display font-extrabold text-brand-600 mb-2">
        {isNaN(numValue) ? stat.value : value.toLocaleString('ru-RU')}{stat.suffix}
      </div>
      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
    </div>
  );
}

function FAQItem({ item, isOpen, onToggle }: {
  item: typeof FAQ_ITEMS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{item.question}</span>
        <ArrowRight
          className={`w-5 h-5 text-brand-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{item.answer}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [statsStart, setStatsStart] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const topServices = SERVICES.slice(0, 6);
  const topReviews = REVIEWS.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <picture className="absolute inset-0 -z-0">
          <source media="(max-width: 767px)" srcSet="/assets/hero-moile-back.png" />
          <img src="/assets/hero-back.png" alt="" className="h-full w-full object-cover object-center" />
        </picture>
        <div className="absolute inset-0 bg-white/70" />
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-blob w-[400px] h-[400px] bg-brand-300/20 top-20 right-0" />
        <div className="bg-blob w-[300px] h-[300px] bg-brand-400/10 bottom-0 left-0" />

        <div className="content-layer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-sm font-medium text-brand-700">Платежи в Китай для бизнеса</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
                Платежи в Китай —{' '}
                <span className="text-brand-600">быстро и выгодно</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Оплата поставщикам по инвойсу, пополнение Alipay и WeChat Pay, обмен рублей на юани. Переводим за час, работаем 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={openManagerTelegram} className="btn-primary text-base px-8 py-4">
                  <Send className="w-5 h-5" />
                  Написать менеджеру
                </button>
                <button onClick={openChannelTelegram} className="btn-glass text-base px-8 py-4">
                  <Star className="w-5 h-5 text-brand-500" />
                  Наши отзывы
                </button>
                <Link to="/calculator" className="btn-glass text-base px-8 py-4">
                  <Calculator className="w-5 h-5 text-brand-500" />
                  Сделать расчёт
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Перевод за 1 час', 'Комиссия от 1,5%', 'Работаем 24/7', 'Alipay и WeChat'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-300/20 to-brand-500/10 rounded-3xl blur-2xl" />
                <div className="glass-card p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Курс обмена</div>
                      <div className="text-3xl font-display font-extrabold text-brand-600">
                        1 ¥ = {COMPANY.rate} ₽
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center shadow-lg shadow-brand-500/20">
                      <ArrowLeftRight className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {EXCHANGE_DIRECTIONS.slice(0, 4).map((dir) => (
                      <div key={dir.id} className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-brand-100/50">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">{dir.from}</span>
                          <ArrowRight className="w-4 h-4 text-brand-400" />
                          <span className="font-bold text-gray-900 text-sm">{dir.to}</span>
                        </div>
                        <div className="text-sm font-semibold text-brand-600">
                          {dir.rate} {dir.to.includes('CNY') ? '¥' : '₽'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to="/calculator" className="btn-primary w-full">
                    <Calculator className="w-5 h-5" />
                    Рассчитать платёж
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} start={statsStart} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-brand-700">Услуги</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Все способы оплат в{' '}
              <span className="text-brand-600">Китай</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Оплата поставщикам, пополнение Alipay и WeChat, обмен валют — всё в одном сервисе.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((service, index) => {
              const Icon = ICON_MAP[service.icon] ?? Receipt;
              return (
                <Link
                  key={service.id}
                  to="/services"
                  className="glass-card p-7 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl gradient-orange-light border border-brand-200/50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-glass">
              Все услуги
              <ArrowRight className="w-4 h-4 text-brand-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-brand-700">Как мы работаем</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Платёж за{' '}
              <span className="text-brand-600">5 шагов</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              От заявки в Telegram до подтверждения перевода — обычно не более часа.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = ICON_MAP[step.icon] ?? MessageSquare;
              return (
                <div
                  key={step.number}
                  className="glass-card p-7 relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="absolute top-6 right-6 text-5xl font-display font-extrabold text-brand-100">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center mb-5 relative z-10 shadow-lg shadow-brand-500/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-3 relative z-10">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed relative z-10">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-brand-700">Почему мы</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Преимущества{' '}
              <span className="text-brand-600">FTS-Pay</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, index) => {
              const Icon = ICON_MAP[adv.icon] ?? ShieldCheck;
              return (
                <div
                  key={adv.title}
                  className="glass-card p-7 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-orange-light border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-gray-900 mb-2">{adv.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{adv.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="relative py-20 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-700">Отзывы</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Что говорят{' '}
              <span className="text-brand-600">наши клиенты</span>
            </h2>
            <button
              onClick={openChannelTelegram}
              className="text-brand-600 font-semibold hover:text-brand-700 inline-flex items-center gap-2 transition-colors"
            >
              Больше отзывов в нашем Telegram
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/reviews" className="btn-glass">
              Все отзывы
              <ArrowRight className="w-4 h-4 text-brand-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium text-brand-700">FAQ</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Частые{' '}
              <span className="text-brand-600">вопросы</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
