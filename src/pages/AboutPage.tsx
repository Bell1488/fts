import { Link } from 'react-router-dom';
import {
  Send, Star, Calculator, ArrowRight, Zap, Clock, Percent, TrendingUp,
  Layers, ShieldCheck, Target, Eye, Award, Heart,
} from 'lucide-react';
import { STATS, ADVANTAGES, COMPANY } from '@/data/content';
import { openManagerTelegram, openChannelTelegram } from '@/lib/utils';
import CTASection from '@/components/CTASection';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Clock, Percent, TrendingUp, Layers, ShieldCheck,
};

const VALUES = [
  { icon: 'ShieldCheck', title: 'Надёжность', description: 'Полное подтверждение каждого перевода. Чеки, скриншоты, документы.' },
  { icon: 'Zap', title: 'Скорость', description: 'Перевод в течение часа. Принимаем заявки круглосуточно, без выходных.' },
  { icon: 'Heart', title: 'Ответственность', description: 'Отвечаем за каждый платёж. За 6 лет — более 50 000 успешных переводов.' },
  { icon: 'Award', title: 'Профессионализм', description: 'Команда с опытом в международных платежах и работе с китайскими банками.' },
];

const VALUES_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Zap, Heart, Award,
};

const MILESTONES = [
  { year: '2020', title: 'Основание компании', description: 'Начали с обмена рублей на юани для предпринимателей.' },
  { year: '2021', title: 'Пополнение Alipay и WeChat', description: 'Запустили пополнение китайских платёжных систем.' },
  { year: '2023', title: 'Оплата инвойсов', description: 'Добавили оплату напрямую поставщикам по инвойсам и реквизитам.' },
  { year: '2024', title: 'B2B фокус', description: 'Перешли на B2B-модель, нарастили оборот до 800 млн юаней в год.' },
  { year: '2026', title: '50 000+ платежей', description: 'Более 50 000 успешных переводов, 24/7 поддержка, персональные менеджеры.' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-blob w-96 h-96 bg-brand-300/15 top-10 right-10" />

        <div className="content-layer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium text-brand-700">О компании</span>
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 leading-tight">
                FTS-Pay —{' '}
                <span className="text-brand-600">платежи в Китай</span>
                {' '}для бизнеса
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Более 6 лет мы помогаем российскому бизнесу платить китайским поставщикам, пополнять Alipay и WeChat, обменивать рубли на юани. Работаем круглосуточно, без выходных.
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
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-300/20 to-brand-500/10 rounded-3xl blur-2xl" />
              <div className="glass-card p-8 relative">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 mb-1">Текущий курс</div>
                  <div className="text-5xl font-display font-extrabold text-brand-600">
                    1 ¥ = {COMPANY.rate} ₽
                  </div>
                </div>
                <div className="space-y-3">
                  {['Комиссия от 1,5%', 'Перевод за 1 час', 'Работаем 24/7', 'Alipay, WeChat, инвойсы'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-brand-100/50">
                      <div className="w-6 h-6 rounded-full gradient-orange flex items-center justify-center flex-shrink-0">
                        <CheckCircle2Small />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-brand-600 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center mb-5 shadow-lg shadow-brand-500/20">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">Наша миссия</h2>
              <p className="text-gray-600 leading-relaxed">
                Сделать платежи в Китай простыми, быстрыми и доступными для российского бизнеса. Мы устраняем барьеры международных переводов, чтобы наши клиенты могли спокойно работать с китайскими поставщиками.
              </p>
            </div>
            <div className="glass-card p-8">
              <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center mb-5 shadow-lg shadow-brand-500/20">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-4">Наше видение</h2>
              <p className="text-gray-600 leading-relaxed">
                Быть главным платёжным сервисом для компаний, работающих с Китаем. Развивать технологию, расширять направления обмена, обеспечивать мгновенные переводы 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="relative py-16 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Почему выбирают{' '}
              <span className="text-brand-600">нас</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, index) => {
              const Icon = ICON_MAP[adv.icon] ?? ShieldCheck;
              return (
                <div key={adv.title} className="glass-card p-7 animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
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

      {/* Values */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Наши{' '}
              <span className="text-brand-600">ценности</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => {
              const Icon = VALUES_ICON_MAP[value.icon] ?? Award;
              return (
                <div key={value.title} className="glass-card p-7 text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-500/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-16 bg-gradient-to-b from-white to-brand-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              История{' '}
              <span className="text-brand-600">развития</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-300 to-brand-500" />
            <div className="space-y-8">
              {MILESTONES.map((milestone, index) => (
                <div key={milestone.year} className="relative pl-20 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="absolute left-4 w-9 h-9 rounded-xl gradient-orange flex items-center justify-center shadow-lg shadow-brand-500/20">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-display font-extrabold text-brand-600">{milestone.year}</span>
                      <TrendingUp className="w-5 h-5 text-brand-400" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="dark"
        title="Хотите стать нашим клиентом?"
        subtitle="Напишите менеджеру в Telegram — обсудим вашу задачу и предложим оптимальные условия."
      />
    </div>
  );
}

function CheckCircle2Small() {
  return (
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
