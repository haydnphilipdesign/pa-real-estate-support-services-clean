import React, { useCallback, useState, useEffect } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { useSlideshow } from '../context/GlobalSlideshowContext';
import { smoothScrollTo } from '../utils/scrollAnimation';
import { useScrollIndicator } from '../context/ScrollIndicatorContext';

interface SmoothLinkProps extends LinkProps {
  /**
   * Duration of the scroll animation in milliseconds
   * @default 500
   */
  scrollDuration?: number;

  /**
   * Whether to always scroll to top before navigation, even if already at top
   * @default false
   */
  alwaysScrollToTop?: boolean;

  /**
   * Threshold in pixels to determine if user is "scrolled down"
   * @default 100
   */
  scrollThreshold?: number;

  /**
   * Delay in milliseconds to pause after scrolling to top before navigation
   * This ensures the hero is fully visible before navigating
   * @default 400
   */
  heroVisibilityDelay?: number;

  /**
   * Duration of fade out animation in milliseconds
   * @default 300
   */
  fadeOutDuration?: number;

  /**
   * Custom className for the link
   */
  className?: string;

  /**
   * Children elements
   */
  children: React.ReactNode;
}

/**
 * SmoothLink - A Link component that smoothly scrolls to the top of the page
 * before navigating to maintain the hero section illusion.
 */
const SmoothLink: React.FC<SmoothLinkProps> = ({
  to,
  scrollDuration = 400,
  alwaysScrollToTop = true,
  scrollThreshold = 50,
  heroVisibilityDelay = 150,
  fadeOutDuration = 150,
  className = '',
  onClick,
  children,
  ...rest
}) => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const { scrollPosition } = useSlideshow();
  const { showScrollIndicator, hideScrollIndicator } = useScrollIndicator();

  // Create cleanup function for navigation
  useEffect(() => {
    if (!isNavigating) return;

    return () => {
      // Reset transition styles when navigation completes
      const heroElements = document.querySelectorAll('[data-hero-content]');
      heroElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.transition = '';
          el.style.opacity = '';
          el.style.transform = '';
        }
      });
    };
  }, [isNavigating]);

  // Handle the click event
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // If already navigating, prevent multiple clicks
    if (isNavigating) {
      e.preventDefault();
      return;
    }

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // If the default was prevented by the onClick handler, respect that
    if (e.defaultPrevented) {
      return;
    }

    // Always prevent default to handle our own navigation
    e.preventDefault();

    // Set navigating state immediately to prevent multiple clicks
    setIsNavigating(true);

    // Show the scroll indicator
    showScrollIndicator();

    // Start the page transition animation and mark as navigating to trigger animation resets
    if (!document.body.hasAttribute('data-animating-hero')) {
      // Set navigating attribute to trigger animation resets in CSS
      document.body.setAttribute('data-navigating', 'true');
      document.body.setAttribute('data-animating-hero', 'true');

      // Preserve slideshow state - mark as transitioning
      if (typeof window !== 'undefined' && window.globalSlideshowState) {
        window.globalSlideshowState.isTransitioning = true;
      }

      // Apply transition class to body for global styles
      document.body.classList.add('page-transitioning');
      document.body.classList.add('navigation-in-progress');
    }

    // Special handling for login page and agent portal transitions to reduce jumpiness
    const isLoginRelated = typeof to === 'string' && 
      (to === '/login' || to === '/agent-portal' || to === '/agent-portal/transaction' || 
       to.startsWith('/agent-portal/') || location.pathname === '/login' || 
       location.pathname.startsWith('/agent-portal/'));
    
    // Use immediate, direct transitions for login-related pages
    if (isLoginRelated) {
      // For login-related pages, use instant scrolling and immediate transitions
      window.scrollTo(0, 0);
      
      // No delay for login page transitions - navigate immediately
      hideScrollIndicator();
      
      // Navigate immediately for login pages
      if (typeof to === 'string') {
        navigate(to, { state: { scrollToTop: true, timestamp: Date.now() } });
      } else {
        navigate(to, { state: { scrollToTop: true, timestamp: Date.now() } });
      }
      
      // Reset states quickly
      requestAnimationFrame(() => {
        setIsNavigating(false);
        document.body.classList.remove('page-transitioning');
        document.body.removeAttribute('data-animating-hero');
        document.body.removeAttribute('data-navigating');
        
        if (typeof window !== 'undefined' && window.globalSlideshowState) {
          window.globalSlideshowState.isTransitioning = false;
        }
      });
      
      return; // Exit early for login pages
    }
    
    // SMOOTH APPROACH for non-login pages: Use native browser scrolling with smooth behavior
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      // Fallback for older browsers
      smoothScrollTo({
        targetPosition: 0,
        duration: 500, // Slightly reduced for snappier transitions
        easingFunction: 'easeOutQuart',
      });
    }

    // Calculate time based on scroll distance for regular pages
    const scrollDistance = window.pageYOffset;
    const scrollTime = Math.min(Math.max(scrollDistance / 3, 250), 600); // Faster scrolling

    // Wait for the scroll animation to complete before navigating
    setTimeout(() => {
      // Hide the scroll indicator
      hideScrollIndicator();

      // Add a delay to ensure the hero fills the viewport before navigation
      setTimeout(() => {
        // Navigate to new page with scroll reset state
        if (typeof to === 'string') {
          navigate(to, { state: { scrollToTop: true, timestamp: Date.now() } });
        } else {
          navigate(to, { state: { scrollToTop: true, timestamp: Date.now() } });
        }

        // Reset the navigating state after a short delay
        setTimeout(() => {
          setIsNavigating(false);
          // Remove all navigation classes and attributes
          document.body.classList.remove('page-transitioning');
          document.body.classList.remove('navigation-in-progress');
          document.body.removeAttribute('data-animating-hero');
          document.body.removeAttribute('data-navigating');

          // Reset transition flag
          if (typeof window !== 'undefined' && window.globalSlideshowState) {
            window.globalSlideshowState.isTransitioning = false;
          }

          // Force a layout recalculation to ensure animations reset
          window.requestAnimationFrame(() => {
            document.body.style.transform = 'translateZ(0)';
            window.requestAnimationFrame(() => {
              document.body.style.transform = '';
            });
          });
        }, 150); // Reduced delay for snappier transitions
      }, heroVisibilityDelay); // Added delay for hero visibility
    }, scrollTime); // Dynamic delay based on scroll distance
  }, [to, navigate, scrollPosition, scrollThreshold, alwaysScrollToTop, scrollDuration,
      heroVisibilityDelay, fadeOutDuration, onClick, isNavigating, showScrollIndicator, hideScrollIndicator]);

  return (
    <Link
      to={to}
      className={`${className} ${isNavigating ? 'pointer-events-none' : ''}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default SmoothLink;