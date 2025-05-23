// Slideshow Debug Script
// Run this in the browser console to check slideshow status

console.log('=== SLIDESHOW DEBUG INFO ===');

console.log('Global slideshow state:', window.globalSlideshowState);
console.log('Slideshow paused:', window.slideshowPaused);
console.log('Slideshow timer active:', window.slideshowTimerActive);
console.log('Slideshow timer ID:', window.slideshowTimerId);
console.log('Slideshow interval ID:', window.slideshowIntervalId);

console.log('Available images:', window.uniqueBackgroundImages || 'Not loaded');
console.log('Current image index:', window.globalSlideshowState?.currentIndex || 0);

// Check if slideshow functions are available
console.log('Transition functions available:', !!window.coordTransition);
if (window.coordTransition) {
  console.log('Is transitioning:', window.coordTransition.isTransitioning());
}

// Check for PersistentBackground elements
const persistentBgs = document.querySelectorAll('[data-persistent-background="true"]');
console.log('PersistentBackground elements found:', persistentBgs.length);

// Check current background images
const bgImages = document.querySelectorAll('.background-slideshow img');
console.log('Background images in DOM:', bgImages.length);
bgImages.forEach((img, index) => {
  console.log(`Image ${index}:`, img.src, 'Visible:', img.style.opacity !== '0');
});

// Manual slideshow advance test
window.testSlideshowAdvance = () => {
  console.log('Testing manual slideshow advance...');
  if (window.globalSlideshowState) {
    const currentIndex = window.globalSlideshowState.currentIndex;
    const nextIndex = (currentIndex + 1) % (window.uniqueBackgroundImages?.length || 16);
    console.log(`Advancing from index ${currentIndex} to ${nextIndex}`);
    
    // Try to find the React component's setCurrentIndex function
    // This is just for testing
    window.globalSlideshowState.currentIndex = nextIndex;
    console.log('Global state updated. Check if UI updated.');
  }
};

console.log('Run window.testSlideshowAdvance() to test manual advance');
console.log('=== END DEBUG INFO ===');