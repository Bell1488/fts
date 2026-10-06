import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import StickySupportButton from '@/components/StickySupportButton';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import CalculatorPage from '@/pages/CalculatorPage';
import AboutPage from '@/pages/AboutPage';
import ReviewsPage from '@/pages/ReviewsPage';
import ContactsPage from '@/pages/ContactsPage';
import IndividualsPage from '@/pages/IndividualsPage';
import BusinessPage from '@/pages/BusinessPage';
import { openManagerTelegram } from '@/lib/utils';
import { Calculator, MessageCircle } from 'lucide-react';

function MetrikaPageViews() {
  const location = useLocation();

  useEffect(() => {
    window.ym?.(113278379, 'hit', `${window.location.origin}${location.pathname}${location.search}`, { title: document.title });
  }, [location.pathname, location.search]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MetrikaPageViews />
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/for-you" element={<IndividualsPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <StickySupportButton />
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-100 px-3 py-2 flex gap-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <a href="/calculator" className="btn-primary flex-1 py-3 text-sm"><Calculator className="w-4 h-4" /> Рассчитать</a>
          <button onClick={openManagerTelegram} className="btn-glass flex-1 py-3 text-sm"><MessageCircle className="w-4 h-4 text-brand-500" /> Написать</button>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
