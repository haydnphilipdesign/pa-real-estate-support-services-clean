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
      className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
      initial={{ y: 0 }}
      animate={{ 
        y: 0,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }}
      style={{ 
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
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
            <nav className="flex items-center bg-neutral-900/50 rounded-full px-1 py-1 mr-3 relative">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 mx-1 rounded-full transition-all duration-200 relative ${
                    location.pathname === item.path
                      ? 'bg-neutral-900/60 text-white'
                      : 'text-white hover:bg-neutral-900/50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button using design system */}
            <Link
              to="/agent-portal"
              className="btn btn-secondary btn-md"
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
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-neutral-900/95 backdrop-blur-lg border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-3 ${
                    location.pathname === item.path
                      ? 'text-brand-gold'
                      : 'text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              ))}

              <Link
                to="/agent-portal"
                className="btn btn-secondary btn-md mt-4 w-full justify-center"
                onClick={() => setIsOpen(false)}
              >
                <FileText className="w-5 h-5 mr-2" />
                Start Transaction
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;