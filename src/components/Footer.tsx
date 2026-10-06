import { Link } from 'react-router-dom';
import { Send, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { COMPANY, SERVICES } from '@/data/content';
import { openManagerTelegram, openChannelTelegram } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/assets/logo.png" alt="FTS-Pay" className="h-12 w-auto max-w-[200px] object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {COMPANY.description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={openManagerTelegram}
                className="w-11 h-11 rounded-xl glass-dark flex items-center justify-center text-brand-400 hover:text-white hover:bg-brand-500 transition-all duration-300 hover:scale-105"
                aria-label="Telegram менеджер"
              >
                <Send className="w-5 h-5" />
              </button>
              <button
                onClick={openChannelTelegram}
                className="w-11 h-11 rounded-xl glass-dark flex items-center justify-center text-brand-400 hover:text-white hover:bg-brand-500 transition-all duration-300 hover:scale-105"
                aria-label="Telegram канал"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-5 text-lg">Услуги</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-gray-400 text-sm hover:text-brand-400 transition-colors duration-200"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-5 text-lg">Навигация</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Главная</Link></li>
              <li><Link to="/services" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Услуги</Link></li>
              <li><Link to="/calculator" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Калькулятор</Link></li>
              <li><Link to="/for-you" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Для себя</Link></li>
              <li><Link to="/business" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Для бизнеса</Link></li>
              <li><Link to="/about" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">О компании</Link></li>
              <li><Link to="/reviews" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Отзывы</Link></li>
              <li><Link to="/contacts" className="text-gray-400 text-sm hover:text-brand-400 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-5 text-lg">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, '')}`} className="text-gray-400 text-sm hover:text-brand-400 transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY.email}`} className="text-gray-400 text-sm hover:text-brand-400 transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{COMPANY.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{COMPANY.workHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {COMPANY.fullName}. Все права защищены.
          </p>
          <p className="text-gray-500 text-sm">
            Минимальная сумма для работы: <span className="text-brand-400 font-semibold">{COMPANY.minSum} {COMPANY.minSumCurrency}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
