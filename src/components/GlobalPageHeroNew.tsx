import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useSlideshow } from '../context/GlobalSlideshowContext';
import { TRANSITION_DURATION } from './PageTransition';

interface GlobalPageHeroProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  overlayOpacity?: string;
  overlayColor?: string;
  solidBackground?: boolean;
  title?: string;
}

/**
 * GlobalPageHero - A hero section that uses the persistent background
 * Fixed version with proper spacing and transitions
 */
const GlobalPageHero: React.FC<GlobalPageHeroProps> = ({
  children,
  className = '',
  minHeight = 'min-h-screen',
  solidBackground = false,
  title
}) => {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { pauseSlideshow, resumeSlideshow, isTransitioning, setIsTransitioning } = useSlideshow();
  const isTransactionPage = location.pathname.includes('/transaction');
  const isAgentPortal = location.pathname.includes('/agent-portal') || location.pathname === '/login';
  const [isExiting, setIsExiting] = useState(false);

  // Handle slideshow coordination during transitions
  useEffect(() => {
    // Signal transition start
    setIsTransitioning(true);
    pauseSlideshow();
    
    // Resume after transition completes
    const resumeTimer = setTimeout(() => {
      setIsTransitioning(false);
      resumeSlideshow();
    }, TRANSITION_DURATION.standard.total * 1000 + 100);

    return () => {
      setIsExiting(true);
      pauseSlideshow();
      clearTimeout(resumeTimer);
      setIsTransitioning(true);
    };
  }, [location.pathname, pauseSlideshow, resumeSlideshow, setIsTransitioning]);

  // Proper height calculation based on page type
  const NAV_HEIGHT = 80; // Standard navigation height
  
  // For agent portal/login pages, use full viewport height
  const heroHeight = isAgentPortal ? '100vh' : (isTransactionPage ? `calc(100vh - ${NAV_HEIGHT}px)` : '100vh');
  
  // Set the appropriate class for min-height
  const heightClass = minHeight === 'min-h-0' ? '' : (isAgentPortal ? 'min-h-screen' : minHeight);

  return (
    <motion.section
      ref={heroRef}
      className={`relative flex flex-col ${heightClass} ${className} hero-section`}
      data-hero-component="true"
      data-hero-container="true"
      data-title={title || ''}
      style={{
        height: heroHeight,
        marginTop: 0, // Remove all margin-top
        paddingTop: NAV_HEIGHT, // Add padding-top to account for fixed header
        paddingBottom: 0,
        backgroundColor: solidBackground ? 'white' : 'transparent',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        transform: 'translate3d(0,0,0)',
        display: 'flex',
        flexDirection: 'column'
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: TRANSITION_DURATION.standard.enter,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: 0.1
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: TRANSITION_DURATION.standard.exit,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }}
    >
      {/* Optional solid background */}
      {solidBackground && (
        <div className="absolute inset-0 bg-white z-0"></div>
      )}

      {/* Content Container - properly centered */}
      <div 
        className="relative z-10 w-full flex-grow flex items-center justify-center"
        style={{ 
          padding: '0',
          margin: '0',
          height: '100%'
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default GlobalPageHero;