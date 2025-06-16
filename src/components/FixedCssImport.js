/**
 * FixedCssImport.js
 *
 * This file centralizes CSS imports to avoid path resolution issues.
 * Import this file instead of directly importing CSS files to ensure
 * proper path resolution throughout the application.
 */

// Import the main index.css (this path is relative to this file)
import '../index.css';

// Export a dummy function to make this a valid module
export const ensureCssImported = () => {
  // This function doesn't need to do anything,
  // it's just to make the import work properly
  return true;
};

export default ensureCssImported;
