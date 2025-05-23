# Tailwind CSS Circular Dependency Fix

## Issue

When using Tailwind CSS with custom CSS selectors that target Tailwind utility classes, you may encounter a circular dependency error like this:

```
[plugin:vite:css] [postcss] Error: You cannot `@apply` the `text-white` utility here because it creates a circular dependency.
```

This happens when your CSS file tries to apply styles to elements with Tailwind utility classes (`text-white` in this case) while also using those same utilities, creating a circular reference.

## Solution

1. Replace direct targeting of Tailwind utility classes with custom class names in your CSS selectors
2. Update your components to use these custom class names instead of the Tailwind utilities

### Example

**Before (problematic):**
```css
/* In glass-card-hero-fix.css */
.glass-card[data-hero-component="true"] .text-white {
  color: rgba(255, 255, 255, 0.95) !important;
}
```

```jsx
// In a React component
<Icon className="w-8 h-8 text-white" />
```

**After (fixed):**
```css
/* In glass-card-hero-fix.css */
.glass-card[data-hero-component="true"] .hero-icon-text {
  color: rgba(255, 255, 255, 0.95) !important;
}
```

```jsx
// In a React component
<Icon className="w-8 h-8 hero-icon-text" />
```

## Where to Look for Issues

This issue commonly appears in components that use:
- Icon components in hero sections
- Text elements that need styling based on their parent containers
- Custom styling applied to elements with Tailwind utility classes

## Related Files

The main files that were fixed:
- `src/styles/fixes/glass-card-hero-fix.css`
- `src/components/ServicesOverview.tsx`
- `src/components/WorkTogether.tsx`

## Prevention

1. Avoid selectors that directly target Tailwind utility classes (like `.text-white`, `.bg-blue-500`, etc.)
2. Create custom class names for elements that need specific styling
3. If you need to target a utility-styled element, add a second custom class alongside the utility class