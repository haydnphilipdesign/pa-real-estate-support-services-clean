import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
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
  overlayOpacity = 'bg-black/40',
  overlayColor = 'from-black/30 via-black/20 to-black/30',
  solidBackground = false,
  title
}) => {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const isTransactionPage = location.pathname.includes('/transaction');
  const isAgentPortal = location.pathname.includes('/agent-portal') || location.pathname === '/login';
  const [isExiting, setIsExiting] = useState(false);

  // Note: Slideshow coordination removed to maintain persistent background functionality
  // The slideshow now continues seamlessly across all page transitions

  // Proper height calculation based on page type
  const NAV_HEIGHT = 80; // Standard navigation height

  // For agent portal/login pages, use full viewport height
  // For transaction pages, constrain to viewport height to prevent overflow
  const heroHeight = isAgentPortal ? '100vh' : (isTransactionPage ? '100vh' : '100vh');

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
        overflow: isTransactionPage ? 'hidden' : 'hidden',
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

      {/* Dark overlay for better text contrast on persistent background */}
      {!solidBackground && (
        <>
          {/* Base dark overlay */}
          <div className={`absolute inset-0 ${overlayOpacity} z-0`} />

          {/* Gradient overlay for enhanced visual depth */}
          <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor} z-10`}>
            <div className="absolute inset-0 opacity-20 pattern-dots" />
          </div>
        </>
      )}

      {/* Content Container - allow horizontal expansion for transaction pages */}
      <div
        className={`relative z-20 w-full ${isTransactionPage ? 'flex-grow' : 'flex-grow flex items-center justify-center'}`}
        style={{
          padding: '0',
          margin: '0',
          height: isTransactionPage ? '100%' : '100%',
          overflow: isTransactionPage ? 'visible' : 'visible' // FIXED: Allow horizontal expansion
        }}
      >
        <div className={`w-full ${isTransactionPage ? '' : 'h-full flex items-center justify-center'}`}>
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default GlobalPageHero;