import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Send } from 'lucide-react';
import { openManagerTelegram } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/services', label: 'Услуги' },
  { to: '/calculator', label: 'Калькулятор' },
  { to: '/for-you', label: 'Для себя' },
  { to: '/business', label: 'Для бизнеса' },
  { to: '/about', label: 'О компании' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-md shadow-gray-900/5 border-b border-brand-100'
          : 'bg-white/40 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/assets/logo.png" alt="FTS-Pay" className="h-11 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative group ${
                    isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 gradient-orange rounded-full transition-all duration-300 ${
                      isActive ? 'w-6' : 'w-0 group-hover:w-6'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={openManagerTelegram} className="btn-glass text-sm py-2.5 px-4">
              <Send className="w-4 h-4 text-brand-500" />
              Написать менеджеру
            </button>
            <Link to="/contacts#lead-form" className="btn-glass text-sm py-2.5 px-4">Оставить заявку</Link>
            <Link to="/calculator" className="btn-primary text-sm py-2.5 px-5">
              Сделать расчёт
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg glass"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Меню"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden pb-6 animate-fade-in-up">
            <div className="glass rounded-2xl p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-gray-700 hover:bg-brand-50/50 hover:text-brand-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-brand-100">
                <button onClick={openManagerTelegram} className="btn-glass w-full">
                  <Send className="w-4 h-4 text-brand-500" />
                  Написать менеджеру
                </button>
                <Link to="/contacts#lead-form" className="btn-glass w-full">Оставить заявку</Link>
                <Link to="/calculator" className="btn-primary w-full">
                  Сделать расчёт
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
