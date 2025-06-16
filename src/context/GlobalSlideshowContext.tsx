import React, { createContext, useContext, useState } from 'react';

// Aggregate all background images from different pages
export const allBackgroundImages = [
  // Slideshow images
  '/slideshow/aaron-burden-xG8IQMqMITM-unsplash.jpg',
  '/slideshow/clock.jpg',
  '/slideshow/home-hero.jpg',
  '/slideshow/jan-kahanek-g3O5ZtRk2E4-unsplash.jpg',
  '/slideshow/laptop.jpg',
  '/slideshow/marissa-grootes-N9uOrBICcjY-unsplash.jpg',
  '/slideshow/notebooks.jpg',
  '/slideshow/patrick-perkins-ETRPjvb0KM0-unsplash.jpg',
  '/slideshow/rasul-kireev-zJ9k4xJyv34-unsplash.jpg',
  '/slideshow/raymond-eichelberger-_6BI9ExFIvY-unsplash.jpg',
  '/slideshow/scott-graham-OQMZwNd3ThU-unsplash.jpg',
  '/slideshow/services.jpg',
  '/slideshow/steve-johnson-Kr8Tc8Rugdk-unsplash.jpg',
  '/slideshow/thomas-lefebvre-gp8BLyaTaA0-unsplash.jpg',
  '/slideshow/work-with-me-hero.jpg',
  '/slideshow/writing.jpg'
];

// Filter out any duplicates
export const uniqueBackgroundImages = [...new Set(allBackgroundImages)];

// Slideshow configuration constants - Optimized for smooth persistence
export const SLIDESHOW_CONFIG = {
  interval: 8000, // 8 seconds between transitions for more dynamic feel
  minInterval: 6000, // Minimum 6 seconds per slide
  transitionDuration: 2000, // 2 second crossfade
  effectDuration: 12000, // 12 seconds Ken Burns movement
};



// Enhanced context to share state across components
interface SlideshowContextType {
  currentIndex: number;
  setCurrentIndex: (index: number | ((prev: number) => number)) => void;
}

const SlideshowContext = createContext<SlideshowContextType | undefined>(undefined);

export const SlideshowProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);



  return (
    <SlideshowContext.Provider value={{
      currentIndex,
      setCurrentIndex
    }}>
      {children}
    </SlideshowContext.Provider>
  );
};

// Custom hook to use the slideshow context
export const useSlideshow = () => {
  const context = useContext(SlideshowContext);
  if (context === undefined) {
    throw new Error('useSlideshow must be used within a SlideshowProvider');
  }
  return context;
};

