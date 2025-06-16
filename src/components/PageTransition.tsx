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
    total: 0.5
  },
  fast: {
    enter: 0.3,
    exit: 0.2,
    opacity: {
      enter: 0.25,
      exit: 0.15
    },
    total: 0.3
  }
};

// Export SLIDESHOW_CONFIG for use in background slideshow
export const SLIDESHOW_CONFIG = {
  interval: 8000,
  transitionDuration: 1500,
  effectDuration: 15000,
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransactionPage = location.pathname.includes('/agent-portal/transaction');
  // Set global transition state
  useEffect(() => {
    // Signal the beginning of a transition
    setIsTransitioning(true);
    window.dispatchEvent(new CustomEvent('pagetransitionstart'));

    // Reset transition state after completion
    const resetTransitionTimer = setTimeout(() => {
      setIsTransitioning(false);
      window.dispatchEvent(new CustomEvent('pagetransitioncomplete'));
    }, TRANSITION_DURATION.standard.total * 1000 + 100);

    return () => clearTimeout(resetTransitionTimer);
  }, [location.pathname]);

  // Ensure scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine if this is an agent portal page for faster transitions
  const isAgentPortalPath = location.pathname.includes('/agent-portal') || location.pathname === '/login';

  // Simplified page variants for smoother transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isAgentPortalPath
          ? TRANSITION_DURATION.fast.enter
          : TRANSITION_DURATION.standard.enter,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: isAgentPortalPath
          ? TRANSITION_DURATION.fast.exit
          : TRANSITION_DURATION.standard.exit,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`page-transition-container relative w-full ${isTransactionPage ? '' : 'overflow-hidden'}`}
      data-is-transitioning={isTransitioning ? 'true' : 'false'}
      style={{
        minHeight: isTransactionPage ? 'auto' : '100vh',
        height: isTransactionPage ? 'auto' : undefined,
        paddingTop: 0, // Remove padding-top
        marginTop: 0, // Remove margin-top
        zIndex: 10,
        position: 'relative',
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        overflow: isTransactionPage ? 'visible' : undefined
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="page-content-wrapper w-full"
          style={{
            position: 'relative',
            zIndex: 20,
            minHeight: isTransactionPage ? 'auto' : 'inherit',
            height: isTransactionPage ? 'auto' : undefined
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;