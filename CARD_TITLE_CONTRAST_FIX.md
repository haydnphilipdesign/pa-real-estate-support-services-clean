# Card Title Contrast Fix

## Problem
The title text on service cards (and other dark blue cards) was too dark to read. Specifically, the blue card titles on blue backgrounds had insufficient contrast, making them difficult to read.

## Solution
This fix improves the readability of title text on cards by:

1. **Enhanced Title Contrast**: Changed title text color to bright white with text shadow
2. **Accent Color for Titles**: Applied amber/gold accent color to titles for better visibility
3. **Improved Typography**: Made font weight bolder for better visibility
4. **Added Visual Separation**: Enhanced contrast with text shadows and consistent styling

## Implementation
The fix includes:

1. Created `card-title-fix.css` with specific selectors for card titles
2. Updated `ServicesOverview.tsx` to use better title styling
3. Enhanced `card-fixes.css` with general card title improvements
4. Added CSS imports to ensure all fixes are applied

## Benefits
- Much better readability of card titles on dark backgrounds
- Consistent visual hierarchy across all cards
- Alignment with brand colors (amber accents)
- Improved accessibility with better contrast

## Future Recommendations
- Consider a design system that enforces minimum contrast ratios
- Use WCAG AA standards for text contrast (4.5:1 for normal text, 3:1 for large text)
- Test card components on various background colors

Applied: [Date]
