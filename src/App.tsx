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
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <StickySupportButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
