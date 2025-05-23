import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import HERO_ANIMATION from '../animations/heroAnimations';

interface TransactionHeroProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TransactionHero - A specialized hero section specifically for transaction pages
 * This is completely separate from other page heroes to prevent styling conflicts
 * Uses standardized animation behaviors
 */
const TransactionHero: React.FC<TransactionHeroProps> = ({
  children,
  className = '',
}) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Set data attributes for transaction-specific styling
  useEffect(() => {
    document.body.setAttribute('data-transaction-page', 'true');

    // Allow body scrolling to handle overflow content properly
    document.body.style.overflow = 'auto';
    
    // Set up a resize observer to handle dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      if (heroRef.current) {
        const windowHeight = window.innerHeight;
        const navHeight = NAV_HEIGHT;
        const availableHeight = windowHeight - navHeight;
        
        // Dynamically adjust the hero height based on content
        heroRef.current.style.minHeight = `${availableHeight}px`;
      }
    });
    
    if (heroRef.current) {
      resizeObserver.observe(heroRef.current);
    }

    return () => {
      document.body.removeAttribute('data-transaction-page');
      document.body.style.overflow = '';
      if (heroRef.current) {
        resizeObserver.unobserve(heroRef.current);
      }
    };
  }, []);

  const NAV_HEIGHT = 64; // Standard navigation height

  return (
    <motion.section
      ref={heroRef}
      className={`relative flex flex-col max-w-full ${className} transaction-hero-container`}
      data-transaction-hero="true"
      data-hero-component="true"
      style={{
        marginTop: `${NAV_HEIGHT}px`,
        paddingTop: '0',
        paddingBottom: '0',
        minHeight: `calc(100vh - ${NAV_HEIGHT + 20}px)`, // Reduced height by 20px
        height: 'auto', // Change to auto height to accommodate content
        overflowY: 'auto', // Allow internal scrolling
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: '-20px' // Added negative margin to reduce space
      }}
      variants={HERO_ANIMATION.variants.transaction}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Content Container */}
      <div 
        className="relative z-10 w-full flex-grow flex flex-col justify-start" 
        style={{ backgroundColor: 'transparent', border: 'none' }}
        data-hero-content="container"
      >
        <div 
          className="w-full flex-grow py-0" 
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default TransactionHero;