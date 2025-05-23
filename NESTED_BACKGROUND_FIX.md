# Nested Background Elements Fix

## Problem
Some text elements (like "Service Area") appeared to have their own background color that didn't match the card behind them. This issue was occurring because:

1. Nested elements had their own background colors or opacities applied
2. Some wrappers around text had separate background styling
3. CSS classes were being applied that included background colors for text elements

## Solution
This fix addresses the issue of nested background colors by:

1. **Enforcing Transparent Backgrounds**:
   - Applied `background-color: transparent !important` to all text elements inside cards
   - Ensured wrapper divs around text don't have their own backgrounds
   - Disabled backdrop filters on nested elements

2. **Improved Card Structure**:
   - Simplified the HTML structure to reduce nesting
   - Removed explicit background color classes from nested elements
   - Added specific classes for better targeting with CSS

3. **Comprehensive CSS Rules**:
   - Created a dedicated `nested-background-fix.css` file for site-wide fixes
   - Added rules for elements nested at different depths
   - Added specific fixes for blue backgrounds which were most problematic

## Implementation
The fix includes:

1. Updated `contact-cards-fix.css` to ensure text elements don't have backgrounds
2. Modified `ContactSection.tsx` to simplify markup and remove background classes
3. Created `nested-background-fix.css` with comprehensive rules for similar issues across the site
4. Imported new CSS file in the main index.css

## Benefits
- Consistent visual appearance of cards
- Elimination of "stacked background" effect
- Better visual hierarchy and readability
- Site-wide solution that prevents similar issues elsewhere

## Future Recommendations
- Avoid applying background colors to text elements or their wrappers
- Use semantic HTML structure with minimal nesting
- Maintain a clear separation between container styling and text styling
- Consider a design system that enforces these principles

Applied: [Date]
