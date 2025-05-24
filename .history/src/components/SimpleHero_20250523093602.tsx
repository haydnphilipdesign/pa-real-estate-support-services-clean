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
        minHeight: 'calc(100vh - 80px)', // Account for header height
        marginTop: '80px', // Space for the fixed header
        marginBottom: '-1px', // Negative margin to eliminate any gap
        paddingTop: '0', // No top padding - start content immediately
        paddingBottom: '0', // No bottom padding
        backgroundColor: 'transparent', 
        background: 'none',
        display: 'flex',
        alignItems: 'flex-start', // Align to very top
        justifyContent: 'center',
        ...style // Merge in any custom styles passed as props
      }}
    >
      {/* Content Container positioned at top */}
      <div className="relative z-10 w-full max-w-full overflow-hidden">
        {children}
      </div>
    </section>
  );
};

export default SimpleHero;