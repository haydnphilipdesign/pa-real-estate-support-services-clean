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
import useNavigationScroll from './hooks/useNavigationScroll';
import { loadLayoutFixes } from './components/LayoutFixes';
import AntiFlickerInitializer from './components/AntiFlickerInitializer';
import './styles/transition-fixes.css'; // Import transition fixes CSS
import './styles/transition-flicker-fixes.css'; // Import additional flicker fixes

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

        <div
          className="app-root relative min-h-screen overflow-x-hidden"
          data-app-root="true"
          style={{
            position: 'relative',
            zIndex: 0, // Lower z-index to ensure header is above
            marginTop: 0,
            paddingTop: 0,
            backgroundColor: 'transparent',
            background: 'none'
          }}
        >
          <ScrollRestoration />
          
          {/* Position PersistentBackground inside the providers */}
          <PersistentBackground />

          <ScrollIndicatorWrapper />

          {/* Page content with transitions - removed flex-grow to prevent spacing issues */}
          <main 
            className="overflow-x-hidden relative" 
            style={{ 
              backgroundColor: 'transparent', 
              background: 'none',
              zIndex: 5, // Above slideshow, below page transitions
              marginTop: 0, // Remove margin - heroes will handle their own spacing
              paddingTop: 0 // Ensure no top padding
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

          {/* Footer - Always rendered for now, can be conditionally displayed later */}
          <Footer key="main-footer" />
        </div>
      </AppProviders>
    </>
  );
};

export default App;