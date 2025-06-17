import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X, Home, User, BookOpen, HelpCircle, FileText, Phone } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { Link } = useNavigation();
  const [isTransactionPage, setIsTransactionPage] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on a transaction page
  useEffect(() => {
    const checkTransactionPage = () => {
      const isTransaction = 
        location.pathname.includes('agent-portal/transaction') ||
        location.pathname.includes('/transaction');
      setIsTransactionPage(isTransaction);
    };

    checkTransactionPage();
  }, [location.pathname]);

  // Force header visibility - runs continuously
  useEffect(() => {
    const forceHeaderVisibility = () => {
      if (headerRef.current) {
        const header = headerRef.current;
        header.style.zIndex = '999999';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.width = '100%';
        header.style.transform = 'translateZ(0) translateY(0px)';
        header.style.opacity = '1';
        header.style.visibility = 'visible';
        header.style.pointerEvents = 'auto';
        header.style.display = 'flex';
      }
    };

    // Force visibility immediately
    forceHeaderVisibility();

    // Keep forcing visibility every 100ms
    const interval = setInterval(forceHeaderVisibility, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle auto-hide on scroll with improved logic
  useEffect(() => {
    // Don't auto-hide on transaction pages
    if (isTransactionPage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling only
      setScrolled(currentScrollY > 20);
      
      // ALWAYS keep header visible - no auto-hide
      setIsVisible(true);
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY, isTransactionPage]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    // Always show header when navigating to a new page
    setIsVisible(true);
    setLastScrollY(0);
  }, [location.pathname]);

  // Show header on mouse move near top
  useEffect(() => {
    if (isTransactionPage) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTransactionPage]);

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {/* Gradient Bar */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-primary-600 to-green-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <img
                src="/logo-flat.png"
                alt="PA Real Estate Support Services"
                className="h-10 md:h-12 w-auto relative z-10 transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden lg:block">
              <p className={`text-sm font-bold tracking-tight ${
                scrolled ? 'text-neutral-900' : 'text-white'
              }`}>
                PA REAL ESTATE
              </p>
              <p className={`text-xs ${
                scrolled ? 'text-neutral-600' : 'text-white/80'
              }`}>
                Support Services
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  location.pathname === item.path
                    ? scrolled 
                      ? 'text-red-600' 
                      : 'text-white'
                    : scrolled
                      ? 'text-neutral-600 hover:text-red-600'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {/* Active Indicator */}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-lg ${
                      scrolled ? 'bg-red-50' : 'bg-white/10'
                    }`}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
                  scrolled ? 'bg-neutral-100' : 'bg-white/5'
                }${location.pathname === item.path ? ' hidden' : ''}`} />
                
                <span className="relative z-10 flex items-center">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Phone Number - Desktop Only */}
            <a
              href="tel:+5705884637"
              className={`hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-neutral-700 hover:text-red-600 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">(570) 588-4637</span>
            </a>

            {/* CTA Button */}
            <Link
              to="/agent-portal"
              className={`hidden md:inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                scrolled
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
                  : 'bg-white text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Start Transaction
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'text-neutral-700 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isOpen ? 'rotate-180 opacity-100' : 'rotate-0 opacity-100'
                }`}>
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-white border-t border-neutral-200 shadow-xl"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-red-50 text-red-600'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                  {location.pathname === item.path && (
                    <div className="ml-auto w-2 h-2 bg-red-600 rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 space-y-3 border-t border-neutral-200">
                <a
                  href="tel:+5705884637"
                  className="flex items-center justify-center px-4 py-3 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (570) 588-4637
                </a>
                
                <Link
                  to="/agent-portal"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Start Transaction
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;