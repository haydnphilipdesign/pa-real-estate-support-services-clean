// All layout fixes disabled - using clean CSS approach

import { useEffect } from 'react';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    heroTextObserverActive?: boolean;
  }
}

/**
 * CSS injection DISABLED - was causing form hover transparency issues
 */
export const loadLayoutFixes = () => {
  // DISABLED: This was injecting CSS that interfered with form functionality
  const injectCriticalCss = () => {
    // CSS injection disabled to fix persistent form issues
    console.log('CSS injection disabled to prevent form interference');
    return;
  };

  // DISABLED: MutationObserver was causing CSS interference
  const setupHeroTextObserver = () => {
    console.log('MutationObserver disabled to prevent CSS interference');
    return;
    
    // DISABLED CODE BELOW - was causing issues
    /*
    // Only set up once
    if (window.heroTextObserverActive) {
      return;
    }

    // Mark as active
    window.heroTextObserverActive = true;

    // Create a new observer to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      // Check if any hero elements were added or modified
      let needsUpdate = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          // Look for hero elements in added nodes
          if (mutation.addedNodes.length > 0) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Check if this element or its children have hero classes or attributes
                const element = node as Element;

                if (
                  element.id?.includes('hero') ||
                  element.className?.includes('hero') ||
                  element.hasAttribute('data-hero-content') ||
                  element.hasAttribute('data-hero-component') ||
                  element.querySelector('[data-hero-content], [data-hero-component], [id*="hero"], [class*="hero"]')
                ) {
                  needsUpdate = true;
                  break;
                }
              }
            }
          }

          // Check if attributes were modified on a hero element
          if (mutation.target.nodeType === Node.ELEMENT_NODE) {
            const element = mutation.target as Element;
            if (
              element.id?.includes('hero') ||
              element.className?.includes('hero') ||
              element.hasAttribute('data-hero-content') ||
              element.hasAttribute('data-hero-component')
            ) {
              needsUpdate = true;
            }
          }
        }
      });

      // If we found hero elements, force update their styling
      if (needsUpdate) {
        fixHeroText();
      }
    });

    // Start observing the entire document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'data-hero-content', 'data-hero-component']
    });
  };

  // Function to specifically fix hero text wherever it appears
  const fixHeroText = () => {
    // Apply direct styles to all hero elements
    const heroSelectors = [
      '#home-hero',
      '.hero-section',
      '[data-hero-content]',
      '[data-hero-component="true"]',
      'div[class*="hero"]',
      'section[class*="hero"]'
    ];

    heroSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Force heading color
        element.querySelectorAll('h1, h2').forEach(heading => {
          (heading as HTMLElement).style.color = '#FFFFFF';
          (heading as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.7)';
        });

        // Force paragraph color
        element.querySelectorAll('p').forEach(paragraph => {
          (paragraph as HTMLElement).style.color = '#FFFFFF';
          (paragraph as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.5)';
        });
      });
    });
  };

  // Inject CSS - guaranteed to run synchronously
  injectCriticalCss();

  // Use direct DOM manipulations to fix known issues
  fixHeroText();

  // Set up the observer for dynamic content
  if (typeof window !== 'undefined') {
    setupHeroTextObserver();
  }

  // Load from CDN fallback if needed
  if (typeof window !== 'undefined' && !document.querySelector('link[href*="critical-fixes.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/critical-fixes.css?v=' + Date.now();
    document.head.appendChild(link);
  }
};

/**
 * Component that loads critical layout fixes on mount
 */
const LayoutFixes = () => {
  useEffect(() => {
    loadLayoutFixes();

    // Also run after a short delay to ensure it catches dynamically rendered content
    const timeoutId = setTimeout(() => {
      loadLayoutFixes();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};

export default LayoutFixes;
