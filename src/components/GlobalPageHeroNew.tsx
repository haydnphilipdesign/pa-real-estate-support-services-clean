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
 * This version doesn't contain its own slideshow, as it relies on the PersistentBackground
 */
const GlobalPageHero: React.FC<GlobalPageHeroProps> = ({
  children,
  className = '',
  minHeight = 'h-screen',
  solidBackground = false,
  title
}) => {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { pauseSlideshow, resumeSlideshow, isTransitioning, setIsTransitioning } = useSlideshow();
  const isTransactionPage = location.pathname.includes('/transaction') || location.pathname.includes('/login');
  const [isExiting, setIsExiting] = useState(false);

  // Reset any lingering data attributes when component mounts
  useEffect(() => {
    document.body.removeAttribute('data-scrolling');

    // Initialize heroRef with a blank dataset to prevent attribute conflicts
    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      Object.keys(currentHeroRef.dataset).forEach(key => {
        if (key !== 'heroComponent' && key !== 'heroContainer') {
          delete currentHeroRef.dataset[key];
        }
      });
      
      // Add data attribute to mark this as active hero
      currentHeroRef.dataset.activeHero = 'true';
    }

    // Signal transition active during mounting
    setIsTransitioning(true);
    pauseSlideshow();
    
    // After animation completes, resume slideshow
    const resumeTimer = setTimeout(() => {
      setIsTransitioning(false);
      resumeSlideshow();
    }, TRANSITION_DURATION.standard.total * 1000 + 50);

    return () => {
      // Pause slideshow during exit
      setIsExiting(true);
      pauseSlideshow();
      clearTimeout(resumeTimer);
      
      // Set transition status
      setIsTransitioning(true);
      
      if (currentHeroRef) {
        delete currentHeroRef.dataset.activeHero;
      }
    };
  }, [location.pathname, pauseSlideshow, resumeSlideshow, setIsTransitioning]);

  // Listen for transition events
  useEffect(() => {
    const handleTransitionStart = () => {
      setIsExiting(true);
      pauseSlideshow();
    };
    
    const handleTransitionComplete = () => {
      // Only handle completion if this component is still mounted
      if (heroRef.current) {
        setIsExiting(false);
        resumeSlideshow();
      }
    };
    
    // Add listeners for transition events
    window.addEventListener('pagetransitionstart', handleTransitionStart);
    window.addEventListener('pagetransitioncomplete', handleTransitionComplete);
    
    return () => {
      window.removeEventListener('pagetransitionstart', handleTransitionStart);
      window.removeEventListener('pagetransitioncomplete', handleTransitionComplete);
    };
  }, [pauseSlideshow, resumeSlideshow]);

  // Calculate the appropriate height for transaction pages vs regular pages
  // Fixed calculation to ensure transaction pages fit perfectly within viewport
  const NAV_HEIGHT = 80; // Standard navigation height (h-20 = 5rem = 80px)
  const pageHeight = isTransactionPage
    ? `calc(100vh - ${NAV_HEIGHT}px)` // Exact height minus nav for transaction pages
    : minHeight === 'min-h-0' ? 'auto' : `calc(100vh - ${NAV_HEIGHT}px)`; // Regular page height

  // Calculate appropriate padding - consistent for all page types
  const topPadding = isTransactionPage ? '4px' : '80px'; // Apply 80px padding for non-transaction pages

  return (
    <motion.section
      ref={heroRef}
      className={`relative flex flex-col max-w-full ${minHeight} ${className} use-standard-animations smooth-transition ${isTransactionPage ? 'transaction-hero' : ''}`}
      data-hero-component="true"
      data-hero-container="true"
      data-title={title || ''}
      data-during-transition={isTransitioning ? 'true' : 'false'}
      style={{
        marginTop: isTransactionPage ? `${NAV_HEIGHT}px` : '0', // Only add margin for transaction pages
        paddingTop: topPadding,
        height: pageHeight,
        overflowY: isTransactionPage ? 'hidden' : 'visible', // Allow overflow on non-transaction pages
        overflowX: 'hidden',
        backgroundColor: solidBackground ? 'white' : 'transparent',
        position: 'relative', // Use relative positioning
        zIndex: 1, // Simple z-index - just be above 0
        opacity: 1, // Start fully opaque
        perspective: 1000, // Add perspective for better 3D transitions
        transformStyle: 'preserve-3d', // Improve 3D rendering
        willChange: 'opacity, transform', // Optimize for GPU
        backfaceVisibility: 'hidden', // Prevent flickering
        transform: 'translate3d(0,0,0)' // Force GPU acceleration
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: TRANSITION_DURATION.standard.enter, // Match with PageTransition
          ease: [0.2, 0.0, 0.2, 1.0], // Smoother ease curve
          delay: 0.1 // Small delay to start animation
        }
      }}
      exit={{
        opacity: 0,
        y: -10, // Reduced movement to make transition less jarring
        transition: {
          duration: TRANSITION_DURATION.standard.exit, // Match with PageTransition
          ease: [0.2, 0.0, 0.2, 1.0], // Matching ease curve
          delay: 0
        }
      }}
      onAnimationStart={() => {
        // Signal the start of animation
        const event = new CustomEvent('heroanimationstart', {
          detail: { path: location.pathname }
        });
        window.dispatchEvent(event);
      }}
      onAnimationComplete={() => {
        // Signal animation complete
        const event = new CustomEvent('heroanimationcomplete', {
          detail: { path: location.pathname }
        });
        window.dispatchEvent(event);
        
        // Only resume if not exiting
        if (!isExiting) {
          resumeSlideshow();
          setIsTransitioning(false);
        }
      }}
    >
      {/* Optional solid background to prevent slideshow from showing through */}
      {solidBackground && (
        <div className="absolute inset-0 bg-white z-0"></div>
      )}

      {/* Content Container - with improved vertical centering */}
      <div 
        className="relative z-10 w-full flex-grow flex items-start justify-center" 
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'center',
          minHeight: 'auto',
          paddingTop: '0',
          paddingBottom: '0',
        }}
      >
        <div className="w-full py-0 pt-0">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default GlobalPageHero;