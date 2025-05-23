# Contact Section Background Fixes

## Issue
The contact section header and subheader text had an unwanted white background rectangle behind them, which looked out of place against the blue gradient background of the section.

## Root Cause
The issue was caused by the `PreloadedAnimationWrapper` component having a default background color set to white (`bg-white`), which created a white box behind the text content.

## Solution

1. Changed the default background in the `PreloadedAnimationWrapper` component:
   ```jsx
   // Changed from
   bg = 'bg-white'
   // To
   bg = 'bg-transparent'
   ```

2. Explicitly set the `bg` prop to transparent in the Contact section:
   ```jsx
   <PreloadedAnimationWrapper
     className="text-center mb-16"
     preloadDelay={200}
     bg="bg-transparent"
   >
   ```

3. Added CSS rules to ensure all elements within the contact section have transparent backgrounds:
   ```css
   /* Contact section wrapper fixes - ensure no unwanted backgrounds */
   section.bg-gradient-to-b.from-blue-800.to-blue-900 .text-center > div,
   section.bg-gradient-to-b.from-blue-800.to-blue-900 [class*="PreloadedAnimationWrapper"],
   section.bg-gradient-to-b.from-blue-800.to-blue-900 .container > div {
     background-color: transparent !important;
     background: transparent !important;
   }
   ```

## Files Modified
- `src/components/PreloadedAnimationWrapper.tsx` - Changed default background to transparent
- `src/components/ContactSection.tsx` - Added explicit bg="bg-transparent" prop
- `src/styles/critical-fixes.css` - Added CSS rules to enforce transparent backgrounds

## Result
The header and subheader text now display properly against the blue gradient background, without the white rectangle behind them.