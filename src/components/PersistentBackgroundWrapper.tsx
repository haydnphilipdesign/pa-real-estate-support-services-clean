import React from 'react';
import PersistentBackground from './PersistentBackground';
import { useSlideshow } from '../context/GlobalSlideshowContext';

/**
 * Safe wrapper for PersistentBackground that ensures provider is available
 */
const PersistentBackgroundWrapper: React.FC = () => {
  try {
    // Test if the provider is available
    useSlideshow();
    return <PersistentBackground />;
  } catch (error) {
    console.warn('SlideshowProvider not available, PersistentBackground will not render');
    return null;
  }
};

export default PersistentBackgroundWrapper;