import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send, Star, Calculator, Mail, Phone, MapPin, Clock, MessageCircle,
  ArrowRight, Building2, User, FileText, Zap,
} from 'lucide-react';
import { COMPANY } from '@/data/content';
import { openManagerTelegram, openChannelTelegram, trackMetrikaGoal } from '@/lib/utils';
import CTASection from '@/components/CTASection';

export default function ContactsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setFormStatus('sending');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formElement).entries())),
      });
      if (!response.ok) throw new Error('Lead submission failed');
      formElement.reset();
      setFormStatus('success');
      trackMetrikaGoal('lead_form_success');
      openManagerTelegram();
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-blob w-96 h-96 bg-brand-300/15 top-10 right-10" />

        <div className="content-layer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-brand-700">Контакты</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 max-w-3xl">
            Свяжитесь с{' '}
            <span className="text-gradient-orange">нами</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Напишите нашему менеджеру в Telegram — мы отвечаем круглосуточно, 24/7. Рассчитаем платёж и проведём перевод в течение часа.
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

      {/* Contact Cards */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button onClick={openManagerTelegram} className="glass-card p-7 text-left group">
              <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center mb-5 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-300">
                <Send className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Telegram менеджер</h3>
              <p className="text-sm text-gray-600 mb-4">Напишите нам — отвечаем 24/7, обычно в течение 15 минут.</p>
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                Открыть чат
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button onClick={openChannelTelegram} className="glass-card p-7 text-left group">
              <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center mb-5 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Telegram канал</h3>
              <p className="text-sm text-gray-600 mb-4">Отзывы клиентов и актуальные курсы обмена.</p>
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                Перейти
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, '')}`} className="glass-card p-7 group">
              <div className="w-14 h-14 rounded-2xl gradient-orange-light border border-brand-200/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Телефон</h3>
              <p className="text-sm text-gray-600 mb-4">{COMPANY.phone}</p>
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                Позвонить
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>

            <a href={`mailto:${COMPANY.email}`} className="glass-card p-7 group">
              <div className="w-14 h-14 rounded-2xl gradient-orange-light border border-brand-200/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Email</h3>
              <p className="text-sm text-gray-600 mb-4 break-all">{COMPANY.email}</p>
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                Написать
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Info & Form */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Информация</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl gradient-orange-light border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Компания</div>
                      <div className="text-gray-900 font-semibold">{COMPANY.fullName}</div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-brand-100">
                    <div><div className="text-sm text-gray-500 font-medium">ОГРН</div><div className="text-gray-900 font-semibold">{COMPANY.ogrn}</div></div>
                    <div><div className="text-sm text-gray-500 font-medium">ИНН / КПП</div><div className="text-gray-900 font-semibold">{COMPANY.inn} / {COMPANY.kpp}</div></div>
                    <div><div className="text-sm text-gray-500 font-medium">Генеральный директор</div><div className="text-gray-900 font-semibold">{COMPANY.director}</div></div>
                    <div><div className="text-sm text-gray-500 font-medium">Дата регистрации</div><div className="text-gray-900 font-semibold">{COMPANY.registrationDate}</div></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl gradient-orange-light border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Адрес</div>
                      <div className="text-gray-900 font-semibold">{COMPANY.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl gradient-orange-light border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Режим работы</div>
                      <div className="text-gray-900 font-semibold">{COMPANY.workHours}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl gradient-orange-light border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Минимальная сумма</div>
                      <div className="text-gray-900 font-semibold">{COMPANY.minSum} {COMPANY.minSumCurrency} для всех направлений</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 gradient-orange-light border-brand-200/50">
                <h3 className="font-display font-bold text-lg text-gray-900 mb-3">
                  Почему стоит написать в Telegram?
                </h3>
                <ul className="space-y-3">
                  {[
                    'Отвечаем 24/7 — обычно в течение 15 минут',
                    'Можно сразу прислать инвойс или реквизиты поставщика',
                    'Менеджер зафиксирует курс и рассчитает сумму',
                    'Подтверждение перевода и чек — в одном чате',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full gradient-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={openManagerTelegram} className="btn-primary w-full mt-6">
                  <Send className="w-5 h-5" />
                  Написать менеджеру
                </button>
              </div>
            </div>

            <div id="lead-form" className="glass-card p-8 scroll-mt-28">
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Оставить заявку</h2>
              <p className="text-gray-600 text-sm mb-6">
                Заполните форму — мы свяжемся с вами в Telegram. Но быстрее — написать напрямую.
              </p>

              <form
                onSubmit={handleLeadSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ваше имя</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Иван Иванов"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-300/50 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Компания</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      placeholder="ООО «Ваша компания»"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-300/50 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telegram или телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="contact"
                      required
                      placeholder="@username или +7..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-300/50 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Сумма и направление</label>
                  <textarea
                    name="details"
                    rows={4}
                    placeholder="Например: 100 000 ₽ → юани, оплата поставщику на Alipay"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-300/50 outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                  />
                </div>

                                <button type="submit" disabled={formStatus === 'sending'} className="btn-primary w-full disabled:opacity-60 disabled:cursor-wait">
                  <Send className="w-5 h-5" />
                  {formStatus === 'sending' ? 'Отправка...' : 'Отправить заявку'}
                </button>

                {formStatus === 'success' && <p role="status" className="text-sm text-emerald-700 text-center">Заявка отправлена. Мы свяжемся с вами.</p>}
                {formStatus === 'error' && <p role="alert" className="text-sm text-red-700 text-center">Не удалось отправить заявку. Напишите менеджеру в Telegram.</p>}

                <p className="text-xs text-gray-500 text-center">Заявка будет отправлена менеджеру в Telegram.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Готовы сделать платёж?"
        subtitle="Напишите менеджеру — зафиксируем курс и проведём перевод в течение часа. Работаем 24/7."
      />
    </div>
  );
}
