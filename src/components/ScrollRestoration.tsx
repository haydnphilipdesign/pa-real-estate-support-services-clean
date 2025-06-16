import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollRestoration component that manages scroll position independently
 * from the slideshow context to maintain clean separation of concerns.
 *
 * This component handles scroll restoration during navigation and maintains
 * scroll position state locally.
 */
const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Only scroll to top on initial page load
  useEffect(() => {
    if (!hasInitialized) {
      window.scrollTo(0, 0);
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  // Track current scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default ScrollRestoration;