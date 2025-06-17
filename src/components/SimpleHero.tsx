import React from 'react';

interface SimpleHeroProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * SimpleHero - A basic hero component to use as a fallback
 */
const SimpleHero: React.FC<SimpleHeroProps> = ({ children, style }) => {
  return (
    <section
      className="relative flex flex-col text-white overflow-hidden max-w-full"
      data-hero-component="true"
      data-hero-container="true"
      style={{
        minHeight: 'calc(100vh - 80px)',
        marginTop: '0',
        marginBottom: '-1px',
        paddingTop: '80px', // Account for header height
        paddingBottom: '0',
        background: `linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
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

      {/* Content Container positioned at top */}
      <div className="relative z-10 w-full max-w-full overflow-hidden">
        {children}
      </div>
    </section>
  );
};

export default SimpleHero;