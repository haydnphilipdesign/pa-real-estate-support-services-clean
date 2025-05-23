import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Export TRANSITION_DURATION for use in other components
export const TRANSITION_DURATION = {
  standard: {
    enter: 0.5,
    exit: 0.4,
    opacity: {
      enter: 0.5,
      exit: 0.3
    },
    total: 0.5 // Maximum duration for timing calculations
  },
  fast: {
    enter: 0.3,
    exit: 0.2,
    opacity: {
      enter: 0.25,
      exit: 0.15
    },
    total: 0.3 // Maximum duration for timing calculations
  }
};

// Export SLIDESHOW_CONFIG for use in background slideshow
export const SLIDESHOW_CONFIG = {
  interval: 8000, // Time between transitions in ms
  transitionDuration: 1500, // Duration of the transition in ms
  effectDuration: 15000, // Duration of the Ken Burns effect in ms
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Set global transition state for coordination with background
  useEffect(() => {
    if (typeof window !== 'undefined' && window.globalSlideshowState) {
      // Signal the beginning of a transition
      window.globalSlideshowState.isTransitioning = true;
      setIsTransitioning(true);
      
      // Reset transition state after completion
      const resetTransitionTimer = setTimeout(() => {
        if (window.globalSlideshowState) {
          window.globalSlideshowState.isTransitioning = false;
          setIsTransitioning(false);
        }
      }, 800); // Time slightly longer than the longest animation duration
      
      return () => clearTimeout(resetTransitionTimer);
    }
  }, [location.pathname]);

  // Handle hero visibility issue by ensuring viewport scrolls to top
  // This helps ensure the hero is properly visible
  useEffect(() => {
    if (window.scrollY > 0) {
      // Use a very small delay to ensure the new page has begun to mount
      const scrollTimer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto' // Use 'auto' for immediate scroll without animation
        });
      }, 50);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [location.pathname]);

  // Handle hero background elements with improved timing
  useEffect(() => {
    if (!containerRef.current) return;

    // When a new page comes in, we need to prepare for the transition
    const prepareTransition = () => {
      // Find hero elements that should be excluded from the page transition
      const excludedElements = document.querySelectorAll('[data-exclude-from-transition="true"]');

      // Handle special positioning for excluded elements with improved z-index handling
      excludedElements.forEach(element => {
        if (element instanceof HTMLElement) {
          // Save original position for restoration
          const originalPosition = element.style.position;
          const originalZIndex = element.style.zIndex;

          // Fix the position of excluded elements
          element.style.position = 'fixed';
          element.style.zIndex = '1'; // Above the background, below the content
          element.dataset.transitionActive = 'true'; // Mark as being in transition

          // Restore original properties after transition with more precise timing
          setTimeout(() => {
            if (element && element.dataset.transitionActive === 'true') {
              element.style.position = originalPosition || '';
              element.style.zIndex = originalZIndex || '';
              delete element.dataset.transitionActive;
            }
          }, 800); // Ensure this is longer than the longest animation
        }
      });
    };

    prepareTransition();

    // Clean up function with improved error handling
    return () => {
      try {
        const excludedElements = document.querySelectorAll('[data-exclude-from-transition="true"]');
        excludedElements.forEach(element => {
          if (element instanceof HTMLElement) {
            // Reset any styles we might have set
            element.style.position = '';
            element.style.zIndex = '';
            delete element.dataset.transitionActive;
          }
        });
      } catch (error) {
        console.error('Error during page transition cleanup:', error);
      }
    };
  }, [location.pathname]);

  // Define elegant, high-end real estate style transitions
  // More subtle, sophisticated transitions suitable for luxury real estate
  // Optimized for seamless hero transitions and smoother login/portal transitions
  const isAgentPortalPath = location.pathname.includes('/agent-portal') || location.pathname === '/login';
  
  // Use optimized transitions for agent portal and login pages
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 1.0, // No scaling to ensure perfect hero alignment
      zIndex: 15, // Above slideshow, below header
      x: 0, // Ensure no horizontal movement
    },
    animate: {
      opacity: 1,
      scale: 1,
      zIndex: 15, // Above slideshow, below header
      x: 0, // Ensure no horizontal movement
      transition: {
        type: 'tween',
        ease: [0.2, 0.0, 0.2, 1.0], // Smoother easing curve for transitions
        duration: isAgentPortalPath 
          ? TRANSITION_DURATION.fast.enter 
          : TRANSITION_DURATION.standard.enter,
        opacity: { 
          duration: isAgentPortalPath 
            ? TRANSITION_DURATION.fast.opacity.enter 
            : TRANSITION_DURATION.standard.opacity.enter,
          ease: [0.2, 0.0, 0.2, 1.0]
        }
      }
    },
    exit: {
      opacity: 0,
      scale: 1.0, // No scaling to ensure perfect hero alignment
      zIndex: 14, // Below current page but above slideshow
      x: 0, // Ensure no horizontal movement
      transition: {
        type: 'tween',
        ease: [0.2, 0.0, 0.2, 1.0], // Smoother easing curve
        duration: isAgentPortalPath 
          ? TRANSITION_DURATION.fast.exit 
          : TRANSITION_DURATION.standard.exit,
        opacity: { 
          duration: isAgentPortalPath 
            ? TRANSITION_DURATION.fast.opacity.exit 
            : TRANSITION_DURATION.standard.opacity.exit,
          ease: [0.2, 0.0, 0.2, 1.0] 
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="page-transition-container relative w-full flex-grow overflow-hidden smooth-transition"
      data-is-transitioning={isTransitioning ? 'true' : 'false'}
      data-page-transition-container="true"
      style={{
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        willChange: 'opacity, transform',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        zIndex: 10, // Above slideshow, below header
        marginTop: '80px' // Start below header
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="page-content-wrapper w-full flex-grow overflow-hidden smooth-transition"
          style={{
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            willChange: 'opacity, transform',
            transformStyle: 'preserve-3d',
            zIndex: 20 // Above slideshow, below header
          }}
          onAnimationStart={() => {
            // Additional safety - ensure transition flag is set
            if (window.globalSlideshowState) {
              window.globalSlideshowState.isTransitioning = true;
            }
          }}
          onAnimationComplete={() => {
            // Mark transition as complete for this element
            if (window.globalSlideshowState) {
              window.globalSlideshowState.isTransitioning = false;
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;