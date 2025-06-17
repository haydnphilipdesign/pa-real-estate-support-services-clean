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
        minHeight: `calc(100vh - ${NAV_HEIGHT}px)`,
        height: 'auto',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 100,
        background: `linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
      variants={HERO_ANIMATION.variants.transaction}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Content Container */}
      <div 
        className="relative z-20 w-full flex-grow flex flex-col justify-start" 
        style={{ 
          backgroundColor: 'transparent', 
          isolation: 'isolate',
          transform: 'translateZ(0)',
          zIndex: 101
        }}
        data-hero-content="container"
      >
        <div 
          className="w-full flex-grow py-0" 
          style={{ 
            backgroundColor: 'transparent',
            position: 'relative',
            zIndex: 102
          }}
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default TransactionHero;