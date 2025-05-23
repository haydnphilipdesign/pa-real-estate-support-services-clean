import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { TRANSITION_DURATION } from '../components/PageTransition';

// Define window interface to extend Window with our global properties
declare global {
  interface Window {
    globalSlideshowState: {
      currentIndex: number;
      lastUpdated: number;
      scrollPosition: number;
      currentPage: string;
      hasInitialized: boolean;
      isTransitioning: boolean;
      transitionStartTime: number;
      lastTransitionPath: string;
    };
    slideshowTimerActive: boolean;
    slideshowTimerId: number | null;
    slideshowIntervalId: number | null;
    slideshowPaused: boolean; // New flag to pause slideshow during transitions
    coordTransition?: {
      startTransition: () => void;
      endTransition: () => void;
      isTransitioning: () => boolean;
    };
  }
}

// Aggregate all background images from different pages
export const allBackgroundImages = [
  // Slideshow images
  '/slideshow/aaron-burden-xG8IQMqMITM-unsplash.jpg',
  '/slideshow/clock.jpg',
  '/slideshow/home-hero.jpg',
  '/slideshow/jan-kahanek-g3O5ZtRk2E4-unsplash.jpg',
  '/slideshow/laptop.jpg',
  '/slideshow/marissa-grootes-N9uOrBICcjY-unsplash.jpg',
  '/slideshow/notebooks.jpg',
  '/slideshow/patrick-perkins-ETRPjvb0KM0-unsplash.jpg',
  '/slideshow/rasul-kireev-zJ9k4xJyv34-unsplash.jpg',
  '/slideshow/raymond-eichelberger-_6BI9ExFIvY-unsplash.jpg',
  '/slideshow/scott-graham-OQMZwNd3ThU-unsplash.jpg',
  '/slideshow/services.jpg',
  '/slideshow/steve-johnson-Kr8Tc8Rugdk-unsplash.jpg',
  '/slideshow/thomas-lefebvre-gp8BLyaTaA0-unsplash.jpg',
  '/slideshow/work-with-me-hero.jpg',
  '/slideshow/writing.jpg'
];

// Filter out any duplicates
export const uniqueBackgroundImages = [...new Set(allBackgroundImages)];

// Slideshow configuration constants - GTA-style dynamic pacing
export const SLIDESHOW_CONFIG = {
  interval: 16000, // 16 seconds between transitions
  minInterval: 12000, // Minimum 12 seconds per slide
  transitionDuration: 1800, // 1.8 second crossfade
  effectDuration: 15000, // 15 seconds Ken Burns movement
};

// Initialize global state on window object if it doesn't exist
if (typeof window !== 'undefined' && !window.globalSlideshowState) {
  window.globalSlideshowState = {
    currentIndex: 0,
    lastUpdated: Date.now(),
    scrollPosition: 0,
    currentPage: '',
    hasInitialized: false,
    isTransitioning: false,
    transitionStartTime: 0,
    lastTransitionPath: ''
  };
}

// Enhanced coordination methods
if (typeof window !== 'undefined' && !window.coordTransition) {
  window.coordTransition = {
    // Start a page transition - enhanced with better timing
    startTransition: () => {
      if (window.globalSlideshowState) {
        window.globalSlideshowState.isTransitioning = true;
        window.globalSlideshowState.transitionStartTime = Date.now();
        window.slideshowPaused = true;
        
        // Pause slideshow during transitions to prevent flashing
        if (window.slideshowTimerId) {
          clearTimeout(window.slideshowTimerId);
          window.slideshowTimerId = null;
        }
        
        if (window.slideshowIntervalId) {
          clearInterval(window.slideshowIntervalId);
          window.slideshowIntervalId = null;
        }
        
        // Dispatch event for components to react
        const event = new CustomEvent('slideshowtransitionstart', { 
          detail: { timestamp: Date.now() } 
        });
        window.dispatchEvent(event);
      }
    },
    
    // End a page transition - enhanced with transition events
    endTransition: () => {
      if (window.globalSlideshowState) {
        window.globalSlideshowState.isTransitioning = false;
        window.slideshowPaused = false;
        
        // Dispatch event for components to react
        const event = new CustomEvent('slideshowtransitionend', { 
          detail: { timestamp: Date.now() } 
        });
        window.dispatchEvent(event);
      }
    },
    
    // Check if currently transitioning
    isTransitioning: () => {
      return window.globalSlideshowState ? 
        window.globalSlideshowState.isTransitioning : false;
    }
  };
}

// Global variables for slideshow control - helps maintain across page changes
if (typeof window !== 'undefined') {
  window.slideshowTimerActive = window.slideshowTimerActive || false;
  window.slideshowTimerId = window.slideshowTimerId || null;
  window.slideshowIntervalId = window.slideshowIntervalId || null;
  window.slideshowPaused = window.slideshowPaused || false;
}

// Helper function to update the global state
export const updateGlobalSlideshowState = (updates: Partial<typeof window.globalSlideshowState>) => {
  if (typeof window !== 'undefined') {
    window.globalSlideshowState = {
      ...window.globalSlideshowState,
      ...updates
    };
  }
};

// Enhanced context to share state across components
interface SlideshowContextType {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  pauseSlideshow: () => void;
  resumeSlideshow: () => void;
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

const SlideshowContext = createContext<SlideshowContextType | undefined>(undefined);

export const SlideshowProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(
    typeof window !== 'undefined' 
      ? window.globalSlideshowState.currentIndex 
      : 0
  );
  const [scrollPosition, setScrollPosition] = useState(
    typeof window !== 'undefined' 
      ? window.globalSlideshowState.scrollPosition 
      : 0
  );
  const [currentPage, setCurrentPage] = useState(
    typeof window !== 'undefined' 
      ? window.globalSlideshowState.currentPage 
      : ''
  );
  const [isTransitioning, setIsTransitioning] = useState(
    typeof window !== 'undefined' 
      ? window.globalSlideshowState.isTransitioning 
      : false
  );
  
  // Listen for page transition events
  useEffect(() => {
    const handleTransitionStart = (event: Event) => {
      if (typeof window !== 'undefined') {
        const customEvent = event as CustomEvent;
        setIsTransitioning(true);
        window.slideshowPaused = true;
        
        if (window.coordTransition) {
          window.coordTransition.startTransition();
        }
        
        // Update global state
        updateGlobalSlideshowState({ 
          isTransitioning: true,
          transitionStartTime: Date.now(),
          lastTransitionPath: customEvent.detail?.path || window.location.pathname
        });
      }
    };

    const handleTransitionComplete = () => {
      // Use a slight delay to ensure all animations have completed
      setTimeout(() => {
        setIsTransitioning(false);
        if (typeof window !== 'undefined') {
          window.slideshowPaused = false;
          
          if (window.coordTransition) {
            window.coordTransition.endTransition();
          }
          
          updateGlobalSlideshowState({ isTransitioning: false });
        }
      }, Math.max(
        TRANSITION_DURATION.standard.total * 1000 + 100, 
        SLIDESHOW_CONFIG.transitionDuration
      ));
    };

    // Add event listeners for custom transition events
    window.addEventListener('pagetransitionstart', handleTransitionStart);
    window.addEventListener('pagetransitioncomplete', handleTransitionComplete);
    window.addEventListener('slideshowtransitionstart', () => setIsTransitioning(true));
    window.addEventListener('slideshowtransitionend', () => setIsTransitioning(false));

    return () => {
      window.removeEventListener('pagetransitionstart', handleTransitionStart);
      window.removeEventListener('pagetransitioncomplete', handleTransitionComplete);
      window.removeEventListener('slideshowtransitionstart', () => setIsTransitioning(true));
      window.removeEventListener('slideshowtransitionend', () => setIsTransitioning(false));
    };
  }, []);

  // Update the global state when our context values change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateGlobalSlideshowState({
        currentIndex,
        scrollPosition,
        currentPage,
        isTransitioning
      });
    }
  }, [currentIndex, scrollPosition, currentPage, isTransitioning]);

  // Listen for scroll events to track position
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollPosition(window.scrollY);
        updateGlobalSlideshowState({ scrollPosition: window.scrollY });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Methods to pause and resume the slideshow
  const pauseSlideshow = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.slideshowPaused = true;
    }
  }, []);

  const resumeSlideshow = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.slideshowPaused = false;
    }
  }, []);

  return (
    <SlideshowContext.Provider value={{
      currentIndex,
      setCurrentIndex,
      scrollPosition,
      setScrollPosition,
      currentPage,
      setCurrentPage,
      pauseSlideshow,
      resumeSlideshow,
      isTransitioning,
      setIsTransitioning
    }}>
      {children}
    </SlideshowContext.Provider>
  );
};

// Custom hook to use the slideshow context
export const useSlideshow = () => {
  const context = useContext(SlideshowContext);
  if (context === undefined) {
    throw new Error('useSlideshow must be used within a SlideshowProvider');
  }
  return context;
};

// Updated utility function to calculate next image change timing
export const calculateNextChangeTime = () => {
  if (typeof window === 'undefined' || !window.globalSlideshowState) {
    return SLIDESHOW_CONFIG.interval;
  }
  
  // Skip calculation if we're in a transition
  if (window.globalSlideshowState.isTransitioning || window.slideshowPaused) {
    return SLIDESHOW_CONFIG.interval;
  }
  
  const slideshowInterval = SLIDESHOW_CONFIG.interval;
  const timeSinceLastUpdate = Date.now() - window.globalSlideshowState.lastUpdated;
  
  // Ensure we don't change slides too quickly
  return Math.max(SLIDESHOW_CONFIG.minInterval, slideshowInterval - timeSinceLastUpdate);
};

// Updated utility function to advance to next slideshow image
export const advanceToNextSlide = (setCurrentIndex: (index: number) => void) => {
  if (typeof window === 'undefined' || !window.globalSlideshowState) {
    return;
  }

  // Skip slide advancement during transitions
  if (window.globalSlideshowState.isTransitioning || window.slideshowPaused) {
    return;
  }
  
  const nextIndex = (window.globalSlideshowState.currentIndex + 1) % uniqueBackgroundImages.length;
  
  // Dispatch event before changing the slide
  const event = new CustomEvent('slideshowadvance', { 
    detail: { 
      previousIndex: window.globalSlideshowState.currentIndex,
      nextIndex: nextIndex
    } 
  });
  window.dispatchEvent(event);
  
  // Update state
  window.globalSlideshowState.currentIndex = nextIndex;
  window.globalSlideshowState.lastUpdated = Date.now();
  setCurrentIndex(nextIndex);
};