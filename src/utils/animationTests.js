/**
 * Page Transition Animation Test Script
 *
 * This script helps test and validate the page transition animations.
 * It can be run in the browser console to diagnose animation issues.
 */

// Function to test navigation transitions
const testPageTransitions = () => {
  console.log('🧪 Testing page transitions...');

  // Check for any conflicting transition CSS
  const heroElements = document.querySelectorAll('[data-hero-content], [data-hero-container], [data-hero-component]');
  const foundConflicts = [];

  heroElements.forEach(el => {
    if (el instanceof HTMLElement) {
      const styles = window.getComputedStyle(el);

      // Check for CSS transitions that might conflict with Framer Motion
      if (styles.transition !== 'none' && styles.transition !== '' && !el.classList.contains('framer-entrance-override')) {
        foundConflicts.push({
          element: el,
          conflictingTransition: styles.transition
        });
      }

      // Check for CSS animations that might conflict
      if (styles.animation !== 'none' && styles.animation !== '' && !el.classList.contains('framer-entrance-override')) {
        foundConflicts.push({
          element: el,
          conflictingAnimation: styles.animation
        });
      }
    }
  });

  if (foundConflicts.length > 0) {
    console.warn('⚠️ Found potential animation conflicts:', foundConflicts);
  } else {
    console.log('✅ No animation conflicts detected.');
  }

  // Check if body has appropriate transition attributes
  if (!document.body.hasAttribute('data-animating-hero') &&
      !document.body.classList.contains('page-transitioning')) {
    console.log('✅ Body is in the correct state for new transitions.');
  } else {
    console.warn('⚠️ Body may have stuck transition attributes. Consider resetting.');
  }

  // Check for animation consistency
  const pageTransitionContainer = document.querySelector('.page-transition-container');
  if (pageTransitionContainer) {
    console.log('✅ Page transition container found and ready.');
  } else {
    console.warn('⚠️ Page transition container not found.');
  }

  // Calculate durations and delays
  console.log('Animation timing settings:');
  console.log('- Hero visibility delay: 150ms');
  console.log('- Page transition entrance animation: 800ms');
  console.log('- Page transition exit animation: 600ms');
  console.log('- Hero entrance animation: 600ms');
  console.log('- Hero exit animation: 600ms');
  console.log('- Total theoretical transition time: ~1500ms');
};

// Function to simulate a page transition
const simulatePageTransition = () => {
  console.log('🔄 Simulating page transition...');

  // Mark transition start
  const startTime = performance.now();

  // Set body transition flags
  document.body.setAttribute('data-animating-hero', 'true');
  document.body.classList.add('page-transitioning');

  // Trigger exit animations on hero content
  const heroElements = document.querySelectorAll('[data-hero-content]');
  heroElements.forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-15px)';
      el.style.transition = 'opacity 600ms cubic-bezier(0.4, 0.0, 0.2, 1.0), transform 600ms cubic-bezier(0.4, 0.0, 0.2, 1.0)';
    }
  });

  // Wait for hero visibility delay
  setTimeout(() => {
    console.log('- Hero exit animation complete');

    // Reset the flags after the transition
    setTimeout(() => {
      document.body.removeAttribute('data-animating-hero');
      document.body.classList.remove('page-transitioning');

      // Trigger entrance animations
      heroElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });

      const endTime = performance.now();
      console.log(`✅ Transition complete in ${Math.round(endTime - startTime)}ms`);
    }, 600);
  }, 150);
};

// Expose functions to window for console access
if (typeof window !== 'undefined') {
  window.testPageTransitions = testPageTransitions;
  window.simulatePageTransition = simulatePageTransition;
  console.log('📝 Animation test functions available: testPageTransitions(), simulatePageTransition()');
}

export { testPageTransitions, simulatePageTransition };