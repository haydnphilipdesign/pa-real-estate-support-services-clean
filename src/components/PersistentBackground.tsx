import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  uniqueBackgroundImages,
  useSlideshow,
  SLIDESHOW_CONFIG
} from '../context/GlobalSlideshowContext';

// Simplified Ken Burns effect
interface KenBurnsEffect {
  scale: [number, number];
  x: [number, number];
  y: [number, number];
}

// Generate a simple Ken Burns effect
const generateKenBurnsEffect = (): KenBurnsEffect => {
  const scaleStart = 1.0;
  const scaleEnd = 1.1;
  const moveRange = 5;

  return {
    scale: [scaleStart, scaleEnd],
    x: [(Math.random() - 0.5) * moveRange, (Math.random() - 0.5) * moveRange],
    y: [(Math.random() - 0.5) * moveRange, (Math.random() - 0.5) * moveRange]
  };
};

// Preload all background images to prevent flashing
const preloadImages = () => {
  uniqueBackgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

/**
 * PersistentBackground - A simplified, robust background slideshow component
 */
const PersistentBackground: React.FC = () => {
  const { currentIndex, setCurrentIndex } = useSlideshow();
  const [currentEffect, setCurrentEffect] = useState<KenBurnsEffect>(generateKenBurnsEffect());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Preload images on mount
  useEffect(() => {
    preloadImages();
    setIsInitialized(true);
  }, []);

  // Generate new Ken Burns effect when slide changes
  useEffect(() => {
    setCurrentEffect(generateKenBurnsEffect());
  }, [currentIndex]);

  // Simple slideshow timer - starts automatically and continues running
  useEffect(() => {
    if (!isInitialized) return;

    const startSlideshow = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % uniqueBackgroundImages.length
        );
      }, SLIDESHOW_CONFIG.interval);
    };

    // Start slideshow immediately
    startSlideshow();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInitialized, setCurrentIndex]);





  return (
    <div
      className="background-slideshow fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: -100,
        width: '100vw',
        height: '100vh',
        isolation: 'isolate'
      }}
      data-persistent-background="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: currentEffect.scale[1],
            x: currentEffect.x[1],
            y: currentEffect.y[1]
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 2, ease: "easeInOut" },
            scale: { duration: SLIDESHOW_CONFIG.effectDuration / 1000, ease: "linear" },
            x: { duration: SLIDESHOW_CONFIG.effectDuration / 1000, ease: "linear" },
            y: { duration: SLIDESHOW_CONFIG.effectDuration / 1000, ease: "linear" }
          }}
          style={{
            width: '110%',
            height: '110%',
            top: '-5%',
            left: '-5%'
          }}
        >
          <img
            src={uniqueBackgroundImages[currentIndex]}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.8) contrast(1.1) saturate(1.2)',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
            onLoad={() => console.log('Background image loaded:', uniqueBackgroundImages[currentIndex])}
            onError={(e) => console.error('Background image failed to load:', e)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Simple dark overlay for content readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default PersistentBackground;