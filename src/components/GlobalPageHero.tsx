import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface GlobalPageHeroProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  overlayOpacity?: string;
  overlayColor?: string;
  title?: string;
}

// Define container animations
const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

// Note: Background slideshow logic removed - now handled by PersistentBackground component

const GlobalPageHero: React.FC<GlobalPageHeroProps> = ({
  children,
  className = '',
  minHeight = 'h-screen',
  overlayOpacity = 'bg-black/85',
  overlayColor = 'from-blue-900/90 via-blue-900/80 to-blue-900/90',
  title
}) => {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);

  // Note: Slideshow management removed - now handled by PersistentBackground component
  // This component now focuses solely on content presentation

  return (
    <motion.section
      ref={heroRef}
      className={`relative ${minHeight} overflow-hidden ${className}`}
      data-hero-component="true"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        marginTop: '0', // Remove gap - background should extend behind header
        minHeight: '90vh', // Reduced height to ensure content fits
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        zIndex: 0,
        pointerEvents: 'auto',
        userSelect: 'auto',
        paddingTop: '7rem' // Account for header height + extra spacing for transaction pages
      }}
    >
      {/* Note: Background slideshow removed - now handled by PersistentBackground component */}

      {/* Optional overlay for this specific hero section */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor} z-0`}>
        <div className="absolute inset-0 opacity-20 pattern-dots" />
      </div>

      {/* Animated dots in corner - decorative element */}
      <div className="absolute top-20 right-20 w-32 h-32 hidden lg:block">
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-400 absolute"
          animate={{
            x: [0, 10, 0],
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-300 absolute left-10"
          animate={{
            x: [0, -10, 0],
            y: [0, 5, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-blue-200 absolute left-20 top-10"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 w-full max-w-full overflow-hidden" style={{ marginTop: '0' }}>
        {/* This container should transition with the page */}
        <motion.div
          data-hero-content-container="true"
          className="overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }} // Keep opacity at 1 during exit to prevent premature fade
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1.0] // Match the page transition ease
          }}
        >
          {title && (
            <motion.h1
              data-hero-content="title"
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ willChange: 'opacity, transform', textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
            >
              {title}
            </motion.h1>
          )}
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GlobalPageHero;