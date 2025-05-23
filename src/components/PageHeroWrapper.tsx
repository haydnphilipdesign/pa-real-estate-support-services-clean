import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SimpleHero from './SimpleHero';
import { InfoIcon, LayoutGrid, Mail, Phone, Shield, Star, Users, Clock, Target, FileText, CheckCircle, Calendar, HelpCircle, Download } from 'lucide-react';
import ContentCard from './ContentCard';

interface PageHeroWrapperProps {
  // Data for styling
  pageType?: string | null;
  backgroundImage?: string;
  overlayColor?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  minHeight?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A reusable hero component for all pages that connects to the global slideshow
 * Uses the same positioning and width as the Home page hero with page-specific glass cards
 */
const PageHeroWrapper: React.FC<PageHeroWrapperProps> = ({
  title,
  subtitle,
  children,
  pageType,
  style
}) => {
  // We're not splitting titles for special case "Meet Your Transaction Expert"
  // but will still split other titles to maintain existing functionality
  let firstWords, lastWord;

  if (title === "Meet Your Transaction Expert") {
    // For this specific title, keep "Meet Your" as firstWords and "Transaction Expert" as lastWord
    firstWords = "Meet Your";
    lastWord = "Transaction Expert";
  } else {
    // Original behavior for all other titles
    const words = title.split(' ');
    lastWord = words.pop();
    firstWords = words.join(' ');
  }

  // Create refs to track animation state
  const hasAnimated = useRef(false);

  // Prevent re-animation when scrolling back to top
  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated.current) {
        // If we've already animated, prevent re-animation by removing data attributes
        const heroElements = document.querySelectorAll('[data-hero-content]');
        heroElements.forEach(el => {
          if (el instanceof HTMLElement) {
            // Remove the data attribute that triggers animations
            el.removeAttribute('data-hero-content');
          }
        });
      }
    };

    // Set animation state after initial animation with longer delay
    setTimeout(() => {
      hasAnimated.current = true;
    }, 2000); // Increased from 1000ms to 2000ms for better user experience

    // Add the scrolling attribute to prevent immediate transitions
    document.body.setAttribute('data-scrolling', 'true');

    // Clear the scrolling attribute after animations complete
    setTimeout(() => {
      document.body.removeAttribute('data-scrolling');
    }, 1500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine page type if not explicitly provided
  const determinedPageType = pageType ||
    title.toLowerCase().includes('about') ? 'about' :
    title.toLowerCase().includes('service') ? 'services' :
    title.toLowerCase().includes('work') ? 'work' :
    title.toLowerCase().includes('privacy') ? 'privacy' :
    title.toLowerCase().includes('terms') ? 'terms' :
    title.toLowerCase().includes('login') ? 'login' : undefined;

  // Content for the glass card based on page type
  const getGlassCardContent = () => {
    switch (determinedPageType) {
      case 'about':
        return (
          <div className="py-2">
            <div className="flex items-center mb-2.5">
              <InfoIcon className="w-5 h-5 mr-2 text-white" />
              <h3 className="hero-card-title text-white font-medium">About Debbie O'Brien</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Star className="w-3 h-3 text-white" />
                </span>
                <p className="text-xs text-white">
                  Experienced transaction coordinator with 30+ years in real estate
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-white" />
                </span>
                <p className="text-xs text-white">
                  Handled over 2,000 successful transactions
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Users className="w-3 h-3 text-white" />
                </span>
                <p className="text-xs text-white">
                  Trusted partner for agents across the Poconos
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Target className="w-3 h-3 text-white" />
                </span>
                <p className="text-xs text-white">
                  Dedicated to helping you focus on growing your business
                </p>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div>
            <h3 className="hero-card-title flex items-center text-white font-medium mb-2">
              <LayoutGrid className="w-5 h-5 mr-2 text-white" />
              Services Highlights
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  Complete contract-to-close coordination
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  Compliance review and documentation management
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  Timeline management and deadline tracking
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  Client communication and progress updates
                </p>
              </div>
            </div>
          </div>
        );

      case 'work':
        return (
          <div>
            <h3 className="hero-card-title flex items-center text-white font-medium mb-2">
              <Mail className="w-5 h-5 mr-2 text-white" />
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  (570) 588-4637
                </p>
              </div>
              <div className="flex items-center">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  debbie@parealestatesupport.com
                </p>
              </div>
              <div className="flex items-center">
                <span className="bg-white/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm text-white">
                  Available Mon-Fri, 9:00 AM - 5:00 PM
                </p>
              </div>
              {/* Only show this quote if not on the Work With Me page */}
              {!title.toLowerCase().includes('work with me') && (
                <div className="rounded-lg bg-white/10 p-3 mt-3">
                  <p className="text-sm text-white italic">
                    "Let's work together to streamline your transactions and help your business thrive."
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div>
            <h3 className="hero-card-title flex items-center text-white font-medium mb-2">
              <Shield className="w-5 h-5 mr-2 text-white" />
              Privacy Commitment
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Your data is protected with industry-standard security measures
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Users className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  We only collect information necessary to provide our services
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <HelpCircle className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Have questions about your data? Contact us anytime
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Download className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Last updated: June 1, 2023
                </p>
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div>
            <h3 className="hero-card-title flex items-center text-white font-medium mb-2">
              <FileText className="w-5 h-5 mr-2 text-white" />
              Terms of Service
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Clear service expectations and responsibilities
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Professional confidentiality and information handling
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Documentation and intellectual property guidelines
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-400/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Download className="w-4 h-4 text-blue-300" />
                </span>
                <p className="text-sm text-white/90">
                  Last updated: June 1, 2023
                </p>
              </div>
            </div>
          </div>
        );

      case 'login':
        return (
          <div>
            <h3 className="hero-card-title flex items-center text-white font-medium mb-2">
              <Shield className="w-5 h-5 mr-2 text-white" />
              Secure Access
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="bg-brand-gold/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Clock className="w-4 h-4 text-brand-gold" />
                </span>
                <p className="text-sm text-white/90">
                  Save 15+ hours per transaction with our services
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-brand-gold/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                </span>
                <p className="text-sm text-white/90">
                  Track transaction progress in real-time
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-brand-gold/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <FileText className="w-4 h-4 text-brand-gold" />
                </span>
                <p className="text-sm text-white/90">
                  Access and manage all transaction documents online
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-brand-gold/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                  <Users className="w-4 h-4 text-brand-gold" />
                </span>
                <p className="text-sm text-white/90">
                  Join 100+ agents who trust our services
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SimpleHero style={style}>
      {/* Minimal container with content positioned high */}
      <div className="container px-4 md:px-6 lg:px-8 mx-auto pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-7xl mx-auto">
          <div className="lg:col-span-7">
            <motion.div
              className="max-w-2xl mx-auto lg:mx-0 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 0.03, 0.36, 1.0]
                }
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                exit: { duration: 0.5, ease: [0.22, 0.03, 0.36, 1.0] }
              }}
              style={{ WebkitWillChange: "opacity", willChange: "opacity" } as any}
              data-hero-content="container"
              data-transition-element="true"
              data-page-transitioning-content="true"
            >
              {/* Title - Improved contrast with brand cream and stronger text shadow */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-[#e9c77b] text-shadow-md text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 0.03, 0.36, 1.0],
                    delay: 0.1
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 0.03, 0.36, 1.0],
                    delay: 0
                  }
                }}
                style={{ willChange: "opacity, transform" } as any}
                data-hero-content="title"
                data-transition-element="true"
              >
                {firstWords && <span className="block">{firstWords}</span>}
                {lastWord && (
                  <span
                    className={`block ${lastWord === "Transaction Expert" || lastWord === "Me" ? "text-blue-400" : "text-blue-200"} drop-shadow-lg`}
                    data-special-title={lastWord === "Transaction Expert" || lastWord === "Me" ? "true" : null}
                    data-page-type={pageType || null}
                    style={lastWord === "Transaction Expert" || lastWord === "Me" || (pageType === 'about' && lastWord === "Expert") ? {color: 'var(--brand-blue)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'} : undefined}
                  >
                    {lastWord}
                  </span>
                )}
              </motion.h1>

              {/* Subtitle - Improved contrast with lighter blue text */}
              {subtitle && (
                <motion.p
                  className="text-xl md:text-2xl mb-6 md:mb-8 text-[#eff6ff] font-light text-shadow-sm text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.2
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0
                    }
                  }}
                  style={{ willChange: "opacity, transform" } as any}
                  data-hero-content="subtitle"
                  data-transition-element="true"
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Additional content */}
              {children && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.3
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0
                    }
                  }}
                  style={{ willChange: "opacity, transform" } as any}
                  data-hero-content="cta"
                  data-transition-element="true"
                  className="flex justify-center lg:justify-start space-x-4"
                >
                  {children}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right side column for glass card - enhanced contrast */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              exit: { duration: 0.5, delay: 0.15 } // Faster exit with slight delay
            }}
          >
            <ContentCard
              heroStyle={true}
              className="glass-card-navy px-6 py-3 shadow-xl"
              inHero={true}
            >
              {getGlassCardContent()}
            </ContentCard>
          </motion.div>
        </div>
      </div>
    </SimpleHero>
  );
};

export default PageHeroWrapper;