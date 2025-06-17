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
  overlayColor = 'from-slate-900 via-blue-900 to-indigo-900',
  title
}) => {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      ref={heroRef}
      className={`hero-section ${className}`}
      data-hero-component="true"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Content Container */}
      <div className="hero-content">
        <motion.div
          data-hero-content-container="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1.0]
          }}
        >
          {title && (
            <motion.h1
              data-hero-content="title"
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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