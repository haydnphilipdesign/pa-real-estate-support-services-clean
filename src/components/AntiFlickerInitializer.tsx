import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AntiFlickerInitializer - Component that initializes and manages anti-flicker measures
 * This component should be mounted once at the root level
 */
const AntiFlickerInitializer: React.FC = () => {
  const location = useLocation();

  // Apply fixes on mount and cleanup on unmount
  useEffect(() => {
    // Add a class to the body to indicate transitions are enabled
    document.body.classList.add('transitions-enabled');
    
    // Ensure background color is transparent to allow persistent background to show
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';

    // Add meta theme-color to help with browser UI
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#000000';
    document.head.appendChild(metaThemeColor);

    // Add style overrides for transition performance
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      * {
        transform-style: preserve-3d;
        backface-visibility: hidden;
      }
      
      /* Force compositing on key elements */
      [data-hero-component],
      [data-hero-content],
      [data-exclude-from-transition],
      .page-transition-container,
      .persistent-background {
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }
      
      /* Allow persistent background to show through */
      .app-root {
        background-color: transparent !important;
      }
      
      /* Suppress visual glitches */
      img {
        transform: translateZ(0);
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      document.body.classList.remove('transitions-enabled');
      if (metaThemeColor.parentNode) {
        metaThemeColor.parentNode.removeChild(metaThemeColor);
      }
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  // Add transition progress tracking
  useEffect(() => {
    // Set a flag when transitioning between pages
    document.body.classList.add('is-transitioning');
    
    // After transition completes, remove the flag
    const transitionTimeout = setTimeout(() => {
      document.body.classList.remove('is-transitioning');
    }, 800); // Slightly longer than animation duration
    
    return () => clearTimeout(transitionTimeout);
  }, [location.pathname]);

  // This component doesn't render anything
  return null;
};

export default AntiFlickerInitializer;