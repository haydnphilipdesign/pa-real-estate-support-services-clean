import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  uniqueBackgroundImages, 
  calculateNextChangeTime, 
  advanceToNextSlide, 
  useSlideshow,
  SLIDESHOW_CONFIG
} from '../context/GlobalSlideshowContext';
import { TRANSITION_DURATION } from './PageTransition';

// Enhanced continuous Ken Burns effect generator
// Creates smooth, flowing movements that connect seamlessly
interface KenBurnsEffect {
  scale: [number, number];
  x: [number, number];
  y: [number, number];
}

interface MotionState {
  scale: number;
  x: number;
  y: number;
}

// Generate a single continuous Ken Burns effect that flows smoothly
const generateSingleContinuousEffect = (startState?: MotionState): KenBurnsEffect => {
  // Increased zoom and reduced movement for edge safety
  const scaleMin = 1.13;
  const scaleMax = 1.18;
  const movementRadius = 12; // Max distance per effect
  const angleDeviation = Math.PI / 7; // Max ~25deg deviation per effect

  // Determine starting position
  const startScale = startState?.scale ?? (scaleMin + Math.random() * 0.025);
  const startX = startState?.x ?? (Math.random() - 0.5) * 10;
  const startY = startState?.y ?? (Math.random() - 0.5) * 6;

  // Calculate previous movement direction
  let prevAngle = 0;
  if (startState && (startState.x !== 0 || startState.y !== 0)) {
    prevAngle = Math.atan2(startState.y, startState.x);
  } else {
    prevAngle = Math.random() * 2 * Math.PI;
  }
  // Blend new angle as a gentle deviation
  const angleDelta = (Math.random() - 0.5) * 2 * angleDeviation;
  const newAngle = prevAngle + angleDelta;
  // Constant speed
  const distance = movementRadius;
  const endX = startX + Math.cos(newAngle) * distance;
  const endY = startY + Math.sin(newAngle) * distance;

  // Scale: gentle, small deviation
  const scaleDelta = (Math.random() - 0.5) * 0.02;
  let endScale = startScale + scaleDelta;
  endScale = Math.max(scaleMin, Math.min(scaleMax, endScale));

  return {
    scale: [startScale, endScale],
    x: [startX, endX],
    y: [startY, endY]
  };
};

// Global state to track the last motion state for true continuity
let globalLastState: MotionState = {
  scale: 1.12,
  x: 0,
  y: 0
};

// Generate Ken Burns effect with guaranteed continuity
const generateContinuousKenBurns = (forceNewCycle = false): KenBurnsEffect => {
  if (forceNewCycle) {
    // Reset to a clean starting state for new cycles
    globalLastState = {
      scale: 1.10 + Math.random() * 0.03,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8
    };
  }

  const effect = generateSingleContinuousEffect(globalLastState);

  // Update global state to the end position of this effect
  globalLastState = {
    scale: effect.scale[1],
    x: effect.x[1],
    y: effect.y[1]
  };

  return effect;
};

// Preload all background images to prevent flashing
const preloadImages = () => {
  uniqueBackgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

/**
 * PersistentBackground - A background slideshow component that persists across page transitions
 */
// Type guard to ensure KenBurnsEffect is valid
function isValidEffect(effect: any): effect is KenBurnsEffect {
  return (
    effect &&
    Array.isArray(effect.scale) && effect.scale.length === 2 &&
    Array.isArray(effect.x) && effect.x.length === 2 &&
    Array.isArray(effect.y) && effect.y.length === 2 &&
    effect.scale.every((n: any) => typeof n === 'number') &&
    effect.x.every((n: any) => typeof n === 'number') &&
    effect.y.every((n: any) => typeof n === 'number')
  );
}

// --- Double-layer state for seamless crossfade ---
interface LayerProps {
  src: string;
  effect: KenBurnsEffect;
}

const PersistentBackground: React.FC = () => {
  const { 
    currentIndex, 
    setCurrentIndex, 
    isTransitioning, 
    setIsTransitioning,
    pauseSlideshow,
    resumeSlideshow
  } = useSlideshow();
  
  // Add missing currentEffect state
  const [currentEffect, setCurrentEffect] = useState<KenBurnsEffect>(
    generateContinuousKenBurns(true)
  );
  // --- Double-layer state ---
  const [isLayerAActive, setIsLayerAActive] = useState(true);
  const [layerAProps, setLayerAProps] = useState<LayerProps>({
    src: uniqueBackgroundImages?.[currentIndex] ?? '',
    effect: generateContinuousKenBurns(true)
  });
  const [layerBProps, setLayerBProps] = useState<LayerProps>({
    src: uniqueBackgroundImages?.[currentIndex] ?? '',
    effect: generateContinuousKenBurns(true)
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(isTransitioning);
  const lastIndexRef = useRef(currentIndex);
  
  // Keep ref updated with latest state
  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // Generate new Ken Burns effect when slide changes
  useEffect(() => {
    if (lastIndexRef.current !== currentIndex) {
      // Check if we've completed a full cycle (back to slide 0)
      const completedCycle = currentIndex === 0 && lastIndexRef.current === uniqueBackgroundImages.length - 1;
      const newEffect = generateContinuousKenBurns(completedCycle);
      setCurrentEffect(newEffect);
      lastIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  // Listen for page and hero transition events
  useEffect(() => {
    const handlePageTransitionStart = () => {
      setIsTransitioning(true);
      pauseSlideshow();
      
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
        slideshowTimerRef.current = null;
      }
      
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
    };
    
    const handlePageTransitionComplete = () => {
      const resumeTimer = setTimeout(() => {
        if (!isTransitioningRef.current) {
          setIsTransitioning(false);
          resumeSlideshow();
          startSlideshow();
        }
      }, TRANSITION_DURATION.standard.total * 1000 + 100);
      
      return () => clearTimeout(resumeTimer);
    };
    
    window.addEventListener('pagetransitionstart', handlePageTransitionStart);
    window.addEventListener('pagetransitioncomplete', handlePageTransitionComplete);
    window.addEventListener('slideshowtransitionstart', handlePageTransitionStart);
    window.addEventListener('slideshowtransitionend', handlePageTransitionComplete);
    
    return () => {
      window.removeEventListener('pagetransitionstart', handlePageTransitionStart);
      window.removeEventListener('pagetransitioncomplete', handlePageTransitionComplete);
      window.removeEventListener('slideshowtransitionstart', handlePageTransitionStart);
      window.removeEventListener('slideshowtransitionend', handlePageTransitionComplete);
    };
  }, [pauseSlideshow, resumeSlideshow, setIsTransitioning]);

  // Preload images when component mounts
  useEffect(() => {
    preloadImages();
  }, []);

  // Slideshow management function
  const startSlideshow = useCallback(() => {
    if (isTransitioning || slideshowTimerRef.current || slideshowIntervalRef.current) {
      return;
    }
    
    const initialDelay = calculateNextChangeTime();
    
    if (typeof window !== 'undefined') {
      window.slideshowTimerActive = true;
    }
    
    slideshowTimerRef.current = setTimeout(() => {
      if (isTransitioningRef.current) return;
      
      advanceToNextSlide(setCurrentIndex);
      
      slideshowIntervalRef.current = setInterval(() => {
        if (isTransitioningRef.current) return;
        
        advanceToNextSlide(setCurrentIndex);
      }, SLIDESHOW_CONFIG.interval);
      
      if (typeof window !== 'undefined') {
        window.slideshowIntervalId = slideshowIntervalRef.current as unknown as number;
      }
      
      slideshowTimerRef.current = null;
    }, initialDelay);
    
    if (typeof window !== 'undefined') {
      window.slideshowTimerId = slideshowTimerRef.current as unknown as number;
    }
  }, [isTransitioning, setCurrentIndex]);

  // Force slideshow to start after component mounts (emergency fallback)
  useEffect(() => {
    const forceStartTimer = setTimeout(() => {
      // Force reset all states
      setIsTransitioning(false);
      if (typeof window !== 'undefined') {
        window.slideshowPaused = false;
        if (window.globalSlideshowState) {
          window.globalSlideshowState.isTransitioning = false;
          window.globalSlideshowState.lastUpdated = Date.now();
        }
      }
      
      // Clear any existing timers
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
        slideshowTimerRef.current = null;
      }
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
      
      // Force start slideshow
      startSlideshow();
    }, 2000); // Force start after 2 seconds regardless of state
    
    return () => clearTimeout(forceStartTimer);
  }, []); // Only run once on mount

  // Set up the slideshow
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      
      // Force reset transition state and start slideshow immediately
      setIsTransitioning(false);
      if (typeof window !== 'undefined') {
        window.slideshowPaused = false;
        if (window.globalSlideshowState) {
          window.globalSlideshowState.isTransitioning = false;
        }
      }
      
      // Start slideshow after a short delay
      setTimeout(() => {
        startSlideshow();
      }, 500);
    }
    
    return () => {
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
        if (typeof window !== 'undefined') {
          window.slideshowTimerId = null;
        }
      }
      
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        if (typeof window !== 'undefined') {
          window.slideshowIntervalId = null;
          window.slideshowTimerActive = false;
        }
      }
    };
  }, [isFirstLoad, isTransitioning, startSlideshow]);

  // Restart slideshow when transitioning state changes
  useEffect(() => {
    if (!isTransitioning && !isFirstLoad) {
      // Add a small delay to ensure clean state
      setTimeout(() => {
        startSlideshow();
      }, 100);
    }
  }, [isTransitioning, isFirstLoad, startSlideshow]);

  // --- Crossfade trigger logic ---
  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    // On slide change, swap active layer and update standby
    if (isLayerAActive) {
      setLayerBProps({
        src: uniqueBackgroundImages?.[currentIndex] ?? '',
        effect: generateContinuousKenBurns()
      });
    } else {
      setLayerAProps({
        src: uniqueBackgroundImages?.[currentIndex] ?? '',
        effect: generateContinuousKenBurns()
      });
    }
    // After a tick, toggle active layer to crossfade
    const crossfadeTimeout = setTimeout(() => {
      setIsLayerAActive((prev) => !prev);
    }, 60); // Small delay for state propagation
    return () => clearTimeout(crossfadeTimeout);
  }, [currentIndex]);

  // Add consistent styling 
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      body::before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: #000000;
        z-index: 1000;
      }
      
      header, .header, nav, .navbar {
        background-color: #000000 !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 1050 !important;
        height: 80px !important;
      }
      
      /* CRITICAL: Ensure no elements block the header area */
      .background-slideshow {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: -1 !important;
        pointer-events: none !important;
      }
      
      .background-slideshow * {
        pointer-events: none !important;
      }
      
      .transitioning {
        transition: opacity 0.3s ease-out !important;
      }

      /* Ensure navigation links are clickable with maximum priority */
      header, .main-navigation-header {
        position: fixed !important;
        z-index: 1050 !important;
        pointer-events: auto !important;
        /* Ensure header can receive clicks */
        touch-action: manipulation !important;
      }
      
      header a, nav a, .navbar a, button, [role="button"],
      .main-navigation-header a, .main-navigation-header button,
      header *, nav *, .navbar *, .main-navigation-header * {
        position: relative !important;
        z-index: 1100 !important;
        pointer-events: auto !important;
        /* Force clickable behavior */
        touch-action: manipulation !important;
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Flag to freeze animations during transitions
  const freezeAnimations = isTransitioning;

  return (
    <div 
      className="background-slideshow" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
        pointerEvents: 'none',
        overflow: 'hidden' // Prevent any overflow
      }}
    >
      <div 
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-transparent"
        style={{ zIndex: -2 }}
      />
      
      {/* --- Seamless, persistent double-layer crossfade --- */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -3, overflow: 'hidden' }}>
        {/* Layer A */}
        <motion.div
          key="layerA"
          className="absolute"
          style={{ 
            zIndex: isLayerAActive ? 2 : 1,
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            right: '-5%',
            bottom: '-5%',
            width: '110%',
            height: '110%'
          }}
          initial={false}
          animate={{
            opacity: isLayerAActive ? 1 : 0,
            transition: {
              duration: 5,
              ease: [0.42, 0, 0.58, 1] // Smooth cubic-bezier
            }
          }}
        >
          {/* Ken Burns image */}
          {isValidEffect(layerAProps.effect) && (
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                scale: layerAProps.effect.scale[1],
                x: layerAProps.effect.x[1],
                y: layerAProps.effect.y[1],
                transition: {
                  duration: SLIDESHOW_CONFIG.effectDuration / 1000,
                  ease: "linear"
                }
              }}
              style={{ zIndex: 0 }}
            >
              <img
                src={layerAProps.src}
                alt="Background"
                className="w-full h-full object-cover"
                style={{
                  filter: 'saturate(1.15) brightness(0.92) contrast(1.05)',
                  transition: 'filter 0.6s ease-in-out',
                  minWidth: '110%',
                  minHeight: '110%',
                  objectPosition: 'center center'
                }}
              />
            </motion.div>
          )}
        </motion.div>
        {/* Layer B */}
        <motion.div
          key="layerB"
          className="absolute"
          style={{ 
            zIndex: isLayerAActive ? 1 : 2,
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            right: '-5%',
            bottom: '-5%',
            width: '110%',
            height: '110%'
          }}
          initial={false}
          animate={{
            opacity: isLayerAActive ? 0 : 1,
            transition: {
              duration: 5,
              ease: [0.42, 0, 0.58, 1]
            }
          }}
        >
          {isValidEffect(layerBProps.effect) && (
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{
                scale: layerBProps.effect.scale[1],
                x: layerBProps.effect.x[1],
                y: layerBProps.effect.y[1],
                transition: {
                  duration: SLIDESHOW_CONFIG.effectDuration / 1000,
                  ease: "linear"
                }
              }}
              style={{ zIndex: 0 }}
            >
              <img
                src={layerBProps.src}
                alt="Background"
                className="w-full h-full object-cover"
                style={{
                  filter: 'saturate(1.15) brightness(0.92) contrast(1.05)',
                  transition: 'filter 0.6s ease-in-out',
                  minWidth: '110%',
                  minHeight: '110%',
                  objectPosition: 'center center'
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Primary dark overlays - using fixed positioning to ensure full coverage */}
      {/* IMPORTANT: These overlays should NEVER cover the header which has z-index 9999 */}
      <div 
        className="fixed pointer-events-none"
        style={{ 
          position: 'fixed',
          top: '80px', /* Leave space for header */
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: 'calc(100vh - 80px)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center', /* Center content vertically */
          justifyContent: 'center'
        }} 
      />
      <div 
        className="fixed pointer-events-none"
        style={{ 
          position: 'fixed',
          top: '80px', /* Leave space for header */
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: 'calc(100vh - 80px)',
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
          zIndex: 6,
          display: 'flex',
          alignItems: 'center', /* Center content vertically */
          justifyContent: 'center'
        }} 
      />
      {/* Depth enhancement overlays */}
      <div 
        className="fixed pointer-events-none"
        style={{ 
          position: 'fixed',
          top: '80px', /* Leave space for header */
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: 'calc(100vh - 80px)',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent, rgba(0, 0, 0, 0.2))',
          zIndex: 7,
          display: 'flex',
          alignItems: 'center', /* Center content vertically */
          justifyContent: 'center'
        }} 
      />
      <div 
        className="fixed pointer-events-none"
        style={{ 
          position: 'fixed',
          top: '80px', /* Leave space for header */
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: 'calc(100vh - 80px)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          mixBlendMode: 'overlay',
          zIndex: 8,
          display: 'flex',
          alignItems: 'center', /* Center content vertically */
          justifyContent: 'center'
        }} 
      />
    </div>
  );
};

export default PersistentBackground;