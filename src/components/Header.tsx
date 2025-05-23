import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X, Home, User, BookOpen, HelpCircle, FileText } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

// Navigation links configuration
const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: User },
  { path: '/services', label: 'Services', icon: BookOpen },
  { path: '/work-with-me', label: 'Work With Me', icon: HelpCircle },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { Link } = useNavigation();
  const [isTransactionPage, setIsTransactionPage] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Ensure header is always visible
  useEffect(() => {
    // Force header visibility
    const ensureHeaderVisibility = () => {
      if (headerRef.current) {
        headerRef.current.style.display = 'block';
        headerRef.current.style.visibility = 'visible';
        headerRef.current.style.opacity = '1';
        headerRef.current.style.zIndex = '9999';
      }
    };

    // Initial visibility
    ensureHeaderVisibility();

    // Set interval to keep checking visibility
    const visibilityInterval = setInterval(ensureHeaderVisibility, 100);

    // Clean up
    return () => clearInterval(visibilityInterval);
  }, []);

  // Check if we're on a transaction page
  useEffect(() => {
    const checkTransactionPage = () => {
      const isTransaction = 
        document.body.hasAttribute('data-transaction-page') || 
        location.pathname.includes('agent-portal') ||
        location.pathname.includes('transaction');
      setIsTransactionPage(isTransaction);
    };

    checkTransactionPage();
    
    // Set up observer to watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-transaction-page') {
          checkTransactionPage();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    return () => observer.disconnect();
  }, [location.pathname]);

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 w-full z-50 bg-black main-navigation-header" 
      style={{ 
        zIndex: 99999, // Increased z-index to ensure visibility
        margin: 0, 
        padding: 0, 
        backgroundColor: '#000000', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        transition: 'none',
        visibility: 'visible',
        opacity: 1,
        transform: 'none',
        position: 'fixed', // Ensure fixed positioning
        display: 'block' // Force display
      }}>
      {/* Add a spacer div to prevent content jump when navigating between pages */}
      {/* Spacer for transaction page, remains hidden */}
      {isTransactionPage && <div className="h-20 w-full hidden"></div>}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/logo-flat.png"
                alt="PA Real Estate Support Services"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Pill Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-black/50 rounded-full px-1 py-1 mr-3 relative" style={{ zIndex: 1100 }}>
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 mx-1 rounded-full transition-all duration-200 relative ${
                    location.pathname === item.path
                      ? 'bg-black/60 text-white'
                      : 'text-white hover:bg-black/50'
                  }`}
                  style={{ zIndex: 1110 }}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/agent-portal"
              className="bg-[#eac87d] text-[#1a202c] px-6 py-2 rounded-full font-semibold flex items-center hover:bg-opacity-90 transition-all relative"
              style={{ zIndex: 1100 }}
            >
              <FileText className="w-5 h-5 mr-2" />
              Start Transaction
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-3">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-3 ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}

            <Link
              to="/agent-portal"
              className="flex items-center py-3 mt-4 bg-[#eac87d] text-[#1a202c] px-4 rounded-lg justify-center hover:bg-opacity-90 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="w-5 h-5 mr-2" />
              Start Transaction
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;