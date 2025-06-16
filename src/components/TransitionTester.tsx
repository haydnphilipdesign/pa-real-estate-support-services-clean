import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

/**
 * TransitionTester - Component for testing and diagnosing page transitions
 *
 * This component displays transition metrics and provides tools to test transitions
 * between different routes. It can be temporarily added to any page to help with testing.
 */
const TransitionTester: React.FC = () => {
  const location = useLocation();
  const [transitionCount, setTransitionCount] = useState(0);
  const [lastTransitionTime, setLastTransitionTime] = useState<number | null>(null);
  const [transitionDuration, setTransitionDuration] = useState<number | null>(null);
  const [transitionStart, setTransitionStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<string[]>([]);

  // Track page transitions
  useEffect(() => {
    // Increment transition count on location change
    setTransitionCount(prev => prev + 1);

    // Record transition start time
    const startTime = performance.now();
    setTransitionStart(startTime);
    setIsTransitioning(true);

    // Calculate last transition time
    if (lastTransitionTime) {
      setLastTransitionTime(startTime);
    } else {
      setLastTransitionTime(startTime);
    }

    // Add listeners for transition events
    const transitionStartHandler = () => {
      console.log('Transition started');
    };

    const transitionEndHandler = () => {
      const endTime = performance.now();
      if (transitionStart) {
        setTransitionDuration(endTime - transitionStart);
      }
      setIsTransitioning(false);
    };

    window.addEventListener('pagetransitionstart', transitionStartHandler);
    window.addEventListener('pagetransitioncomplete', transitionEndHandler);

    // Collect performance metrics
    setTimeout(() => {
      try {
        if (window.performance && window.performance.getEntriesByType) {
          const navigationEntries = window.performance.getEntriesByType('navigation');
          const paintEntries = window.performance.getEntriesByType('paint');

          setMetrics({
            navigationEntries: navigationEntries.length > 0 ? navigationEntries[0] : null,
            firstPaint: paintEntries.find(e => e.name === 'first-paint')?.startTime,
            firstContentfulPaint: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime,
          });
        }
      } catch (err) {
        setErrors(prev => [...prev, String(err)]);
      }
    }, 1000);

    return () => {
      window.removeEventListener('pagetransitionstart', transitionStartHandler);
      window.removeEventListener('pagetransitioncomplete', transitionEndHandler);
    };
  }, [location.pathname]);

  // Animation debug routes - common transitions to test
  const testRoutes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/work-with-me', label: 'Work With Me' },
    { path: '/login', label: 'Login' },
    { path: '/agent-portal/transaction', label: 'Transaction' }
  ];

  // Apply debugging utilities
  const debugTransition = () => {
    // Use transparent background to allow slideshow to show through
    document.body.style.backgroundColor = 'transparent';

    // Log current state
    console.log('Current transition state:', {
      location: location.pathname,
      isTransitioning,
      transitionCount,
      lastTransitionTime,
      transitionDuration
    });

    // Check for common issues
    const issues = [];

    // Check for proper background
    const backgrounds = document.querySelectorAll('[data-persistent-background="true"]');
    if (backgrounds.length === 0) {
      issues.push("No persistent background found");
    }

    // Check for hero components
    const heroes = document.querySelectorAll('[data-hero-component="true"]');
    if (heroes.length === 0) {
      issues.push("No hero components found");
    }

    // Check for proper z-index stacking
    const allElements = [
      ...Array.from(backgrounds),
      ...Array.from(heroes),
      ...Array.from(document.querySelectorAll('.page-content-wrapper'))
    ];

    const zIndexIssues = allElements.filter(el => {
      if (el instanceof HTMLElement) {
        const computed = window.getComputedStyle(el);
        return computed.zIndex === 'auto' || computed.position === 'static';
      }
      return false;
    });

    if (zIndexIssues.length > 0) {
      issues.push(`${zIndexIssues.length} elements with potential z-index issues`);
    }

    // Update error state
    if (issues.length > 0) {
      setErrors(prev => [...prev, ...issues]);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 max-w-full bg-black/80 text-white p-4 z-50 rounded-tl-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2 flex justify-between">
        Transition Tester
        <button
          onClick={() => debugTransition()}
          className="px-2 py-1 bg-blue-600 text-xs rounded"
        >
          Debug
        </button>
      </h3>

      <div className="mb-4 text-sm">
        <div><span className="font-semibold">Current route:</span> {location.pathname}</div>
        <div><span className="font-semibold">Transition count:</span> {transitionCount}</div>
        <div>
          <span className="font-semibold">Status:</span>
          <span className={isTransitioning ? "text-yellow-300" : "text-green-300"}>
            {isTransitioning ? "Transitioning..." : "Idle"}
          </span>
        </div>
        {transitionDuration !== null && (
          <div><span className="font-semibold">Last transition duration:</span> {transitionDuration.toFixed(2)}ms</div>
        )}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-1">Test Routes</h4>
        <div className="flex flex-wrap gap-2">
          {testRoutes.map(route => (
            <Link
              key={route.path}
              to={route.path}
              className="text-xs bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded transition-colors"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-red-400 mb-1">Issues Detected</h4>
          <ul className="text-xs list-disc pl-4 text-red-300">
            {errors.slice(-3).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs opacity-50">
        This component is for testing only and should be removed in production.
      </div>
    </div>
  );
};

export default TransitionTester;