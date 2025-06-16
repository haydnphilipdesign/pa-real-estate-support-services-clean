import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import WorkWithMe from './pages/WorkWithMe';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NavigationTest from './pages/NavigationTest';
import GlassCardsShowcase from './pages/GlassCardsShowcase';
import DesignSystem from './pages/DesignSystem';
import ScrollRestoration from './components/ScrollRestoration';
import AppProviders from './providers/AppProviders';
import { PortalTransactionForm } from './components/TransactionForm/PortalTransactionForm';
import ScrollIndicatorWrapper from './components/ScrollIndicatorWrapper';
import PageTransition from './components/PageTransition';
import PersistentBackground from './components/PersistentBackground';
import MobileEnhancements from './components/MobileEnhancements';
import useNavigationScroll from './hooks/useNavigationScroll';
import { loadLayoutFixes } from './components/LayoutFixes';
import AntiFlickerInitializer from './components/AntiFlickerInitializer';

const App: React.FC = () => {
  const location = useLocation();
  const hideFooterPaths = ['/agent-portal'];
  const isTransactionPage = location.pathname.includes('/agent-portal/transaction');
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  // Use the navigation scroll hook to ensure we're at the top of new pages
  useNavigationScroll();

  // Load layout fixes immediately on mount and after hydration
  useEffect(() => {
    // Apply body styles to prevent flickering
    document.body.style.backgroundColor = 'transparent';
    document.body.style.transition = 'none';
    document.body.style.willChange = 'auto';
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';

    loadLayoutFixes();

    // Also set a small delay to ensure fixes are applied after full render
    const timeoutId = setTimeout(() => {
      loadLayoutFixes();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* Single Header - rendered normally */}
      <Header />

      <AppProviders>
        {/* Add AntiFlickerInitializer to manage anti-flicker measures */}
        <AntiFlickerInitializer />
        
        {/* Mobile optimizations */}
        <MobileEnhancements />

        <div
          className="app-root relative min-h-screen overflow-x-hidden flex flex-col"
          data-app-root="true"
          style={{
            position: 'relative',
            zIndex: 0,
            marginTop: 0,
            paddingTop: 0,
            backgroundColor: 'transparent',
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <ScrollRestoration />

          {/* Position PersistentBackground inside the providers */}
          <PersistentBackground />

          <ScrollIndicatorWrapper />

          {/* Page content with transitions */}
          <main
            className={`overflow-x-hidden relative ${isTransactionPage ? 'transaction-page-main' : 'flex-grow flex flex-col'}`}
            style={{
              backgroundColor: 'transparent',
              background: 'none',
              zIndex: isTransactionPage ? 99 : 5, // Higher z-index for transaction pages
              marginTop: 0, // No margin
              paddingTop: 0, // No padding - PageTransition handles spacing
              position: 'relative',
              flex: isTransactionPage ? 'none' : '1 0 auto',
              display: isTransactionPage ? 'block' : 'flex',
              flexDirection: isTransactionPage ? 'initial' : 'column'
            }}
            data-main-content="true"
          >
            <PageTransition>
              <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/work-with-me" element={<WorkWithMe />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/login" element={<Login />} />
                <Route path="/navigation-test" element={<NavigationTest />} />
                <Route path="/glass-cards" element={<GlassCardsShowcase />} />
                <Route path="/design-system" element={<DesignSystem />} />

                {/* Protected Routes */}
                <Route
                  path="/agent-portal/transaction"
                  element={<PortalTransactionForm />}
                />
                <Route
                  path="/agent-portal"
                  element={<Login />}
                />
              </Routes>
            </PageTransition>
          </main>

          {/* Footer - Only show on non-transaction pages */}
          {shouldShowFooter && (
            <Footer key="main-footer" className="mt-auto flex-shrink-0" />
          )}
        </div>
      </AppProviders>
    </>
  );
};

export default App;