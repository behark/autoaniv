import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

// Layout components
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const VehiclesPage = lazy(() => import('@/pages/VehiclesPage'));
const VehicleDetailPage = lazy(() => import('@/pages/VehicleDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const FinancingPage = lazy(() => import('@/pages/FinancingPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const BrandPage = lazy(() => import('@/pages/BrandPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  useTranslation(); // Initialize translation

  return (
    <>
      <Helmet>
        <title>AutoAni - Premium Automotive Dealership</title>
        <meta
          name="description"
          content="AutoAni - Leading automotive dealership in Kosovo. Premium vehicles from top brands including Mercedes, BMW, Audi, and more."
        />
        <meta
          name="keywords"
          content="AutoAni, cars, automotive, luxury cars, Mercedes, BMW, Audi, Kosovo, dealership, vehicles"
        />
        <meta property="og:title" content="AutoAni - Premium Automotive Dealership" />
        <meta
          property="og:description"
          content="Discover luxury vehicles at AutoAni. Premium cars from top brands with exceptional service."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://autoani.com" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/vehicle/:slug" element={<VehicleDetailPage />} />
              <Route path="/brand/:brandName" element={<BrandPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/financing" element={<FinancingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
