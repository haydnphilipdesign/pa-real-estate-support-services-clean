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

  // Handle auto-hide on scroll with improved logic
  useEffect(() => {
    // Don't auto-hide on transaction pages
    if (isTransactionPage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      
      // Update scrolled state for styling
      setScrolled(currentScrollY > 20);
      
      // Determine visibility based on scroll direction and position
      if (currentScrollY <= 60) {
        // Always show header near top of page
        setIsVisible(true);
      } else if (scrollDifference > 3) {
        // Hide when scrolling down
        setIsVisible(false);
      } else if (scrollDifference < -3) {
        // Show when scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Show header after scroll stops
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Show after 1.5 seconds of no scrolling
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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg' : 'bg-black'
      } main-navigation-header`}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }}
      style={{ 
        zIndex: 99999,
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
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
            <div className="flex items-center bg-black/50 rounded-full px-1 py-1 mr-3 relative">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 mx-1 rounded-full transition-all duration-200 relative ${
                    location.pathname === item.path
                      ? 'bg-black/60 text-white'
                      : 'text-white hover:bg-black/50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/agent-portal"
              className="bg-[#eac87d] text-[#1a202c] px-6 py-2 rounded-full font-semibold flex items-center hover:bg-opacity-90 transition-all"
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
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
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
                      ? 'text-[#eac87d]'
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
                className="flex items-center py-3 mt-4 bg-[#eac87d] text-[#1a202c] px-4 rounded-lg justify-center hover:bg-opacity-90 transition-all"
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