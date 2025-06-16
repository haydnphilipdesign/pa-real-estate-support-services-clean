import React, { useEffect } from 'react';

/**
 * Mobile Enhancements Component
 * Adds mobile-specific optimizations and touch behaviors
 */
export const MobileEnhancements: React.FC = () => {
  useEffect(() => {
    // Prevent zoom on input focus for iOS Safari
    const addInputListeners = () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('focusin', (e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            // Ensure font-size is at least 16px to prevent zoom
            const currentFontSize = window.getComputedStyle(target).fontSize;
            const fontSize = parseFloat(currentFontSize);
            if (fontSize < 16) {
              target.style.fontSize = '16px';
            }
          }
        });
      });
    };

    // Add smooth scroll behavior for mobile navigation
    const addSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    // Optimize touch scrolling for iOS
    const optimizeTouchScrolling = () => {
      document.body.style.webkitOverflowScrolling = 'touch';
    };

    // Add safe area padding for devices with notches
    const addSafeAreaSupport = () => {
      const style = document.createElement('style');
      style.textContent = `
        @supports (padding: max(0px)) {
          .safe-area-top {
            padding-top: max(env(safe-area-inset-top), 1rem);
          }
          .safe-area-bottom {
            padding-bottom: max(env(safe-area-inset-bottom), 1rem);
          }
          .safe-area-left {
            padding-left: max(env(safe-area-inset-left), 1rem);
          }
          .safe-area-right {
            padding-right: max(env(safe-area-inset-right), 1rem);
          }
        }
      `;
      document.head.appendChild(style);
    };

    // Optimize for mobile performance
    const optimizePerformance = () => {
      // Add passive event listeners for better scroll performance
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });
      
      // Add will-change hints for animated elements
      const animatedElements = document.querySelectorAll(
        '.tf-role-card, .tf-nav-button, .tf-step-button'
      );
      animatedElements.forEach(el => {
        (el as HTMLElement).style.willChange = 'transform';
      });
    };

    // Add haptic feedback for supported devices
    const addHapticFeedback = () => {
      const buttons = document.querySelectorAll(
        '.tf-role-card, .tf-nav-button, button'
      );
      
      buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
          // Add haptic feedback if available
          if ('vibrate' in navigator) {
            navigator.vibrate(10); // Very light vibration
          }
        });
      });
    };

    // Initialize all enhancements
    addInputListeners();
    addSmoothScroll();
    optimizeTouchScrolling();
    addSafeAreaSupport();
    optimizePerformance();
    addHapticFeedback();

    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.webkitOverflowScrolling = '';
    };
  }, []);

  // Add mobile-specific meta tag adjustments
  useEffect(() => {
    // Prevent viewport scaling on input focus
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    }

    // Add mobile-specific body classes
    document.body.classList.add('mobile-optimized');
    
    // Detect if device is touch-enabled
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
    }

    // Detect mobile device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      document.body.classList.add('mobile-device');
    }

    // Detect iOS specifically for iOS-specific optimizations
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      document.body.classList.add('ios-device');
    }

    return () => {
      document.body.classList.remove('mobile-optimized', 'touch-device', 'mobile-device', 'ios-device');
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileEnhancements;