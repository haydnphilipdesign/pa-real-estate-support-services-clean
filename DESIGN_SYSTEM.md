# PA Real Estate Support Services - Unified Design System

**Version**: 2.0  
**Last Updated**: 2025-06-17  
**Status**: Production Ready

## Overview

This design system consolidates the professional TurboTax-quality styling from the transaction form across the entire website, ensuring visual consistency and brand cohesion throughout all pages and components.

## Design Principles

- **Professional Trust**: Clean, modern aesthetic that builds user confidence
- **Visual Consistency**: Unified color palette, typography, and spacing throughout
- **Accessibility First**: WCAG 2.1 AA compliance with proper contrast and focus states
- **Mobile Responsive**: Mobile-first design with seamless multi-device experience
- **Performance Optimized**: Efficient CSS with minimal duplication

## Design Tokens

### Color Palette

```css
/* Primary Brand Colors */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-500: #0ea5e9;    /* Primary brand blue */
--color-primary-600: #0284c7;    /* Primary button default */
--color-primary-700: #0369a1;    /* Primary button hover */
--color-primary-900: #0c4a6e;    /* Dark brand blue */

/* Neutral Grays */
--color-neutral-25: #fcfcfd;     /* Lightest background */
--color-neutral-50: #f9fafb;     /* Light background */
--color-neutral-100: #f3f4f6;    /* Card header background */
--color-neutral-200: #e5e7eb;    /* Borders */
--color-neutral-300: #d1d5db;    /* Input borders */
--color-neutral-400: #9ca3af;    /* Placeholders */
--color-neutral-500: #6b7280;    /* Help text */
--color-neutral-600: #4b5563;    /* Secondary text */
--color-neutral-700: #374151;    /* Primary text */
--color-neutral-800: #1f2937;    /* Dark text */
--color-neutral-900: #111827;    /* Darkest text */

/* Semantic Colors */
--color-success-50: #f0fdf4;     /* Success background */
--color-success-500: #22c55e;    /* Success default */
--color-success-600: #16a34a;    /* Success darker */
--color-error-50: #fef2f2;       /* Error background */
--color-error-500: #ef4444;      /* Error default */
--color-error-600: #dc2626;      /* Error darker */
--color-warning-50: #fffbeb;     /* Warning background */
--color-warning-500: #f59e0b;    /* Warning default */
--color-info-50: #eff6ff;        /* Info background */
--color-info-500: #3b82f6;       /* Info default */
```

### Typography Scale

```css
/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px - Small labels */
--font-size-sm: 0.875rem;   /* 14px - Body text, buttons */
--font-size-base: 1rem;     /* 16px - Default text */
--font-size-lg: 1.125rem;   /* 18px - Large body text */
--font-size-xl: 1.25rem;    /* 20px - Large buttons */
--font-size-2xl: 1.5rem;    /* 24px - Section headings */
--font-size-3xl: 1.875rem;  /* 30px - Page headings */
--font-size-4xl: 2.25rem;   /* 36px - Hero headings */
--font-size-5xl: 3rem;      /* 48px - Main hero title */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;   /* Form labels, navigation */
--font-weight-semibold: 600; /* Headings */
--font-weight-bold: 700;     /* Main titles */
```

### Spacing Scale (8px Grid System)

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
```

### Border Radius

```css
--radius-sm: 0.25rem;  /* 4px - Small elements */
--radius-md: 0.375rem; /* 6px - Form inputs */
--radius-lg: 0.5rem;   /* 8px - Cards */
--radius-xl: 0.75rem;  /* 12px - Large cards */
--radius-2xl: 1rem;    /* 16px - Premium cards */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

## Component Library

### Buttons

#### Primary Buttons
```css
.btn-primary {
  background: var(--color-primary-600);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: var(--color-primary-700);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

#### Secondary Buttons
```css
.btn-secondary {
  background: white;
  color: var(--color-neutral-700);
  border: 1px solid var(--color-neutral-300);
  box-shadow: var(--shadow-sm);
}
```

#### Button Sizes
- `btn-sm`: Small buttons for secondary actions
- `btn-md`: Default size for most actions
- `btn-lg`: Large buttons for primary CTAs
- `btn-xl`: Extra large for hero sections

### Cards

#### Standard Card
```css
.card {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}
```

#### Card Variants
- `card-elevated`: Enhanced shadow for emphasis
- `card-premium`: Premium styling with enhanced shadows
- `card-glass`: Glass morphism effect for special use cases

### Form Controls

#### Input Fields
```css
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast);
}

.form-input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-50);
}
```

#### Error States
```css
.form-input--error {
  border-color: var(--color-error-500);
}

.form-input--error:focus {
  box-shadow: 0 0 0 3px var(--color-error-50);
}
```

### Navigation

#### Header Navigation
```css
.nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-neutral-200);
  box-shadow: var(--shadow-sm);
}

.nav-link {
  color: var(--color-neutral-700);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary-600);
  background: var(--color-primary-50);
}
```

### Hero Sections

#### Hero Container
```css
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-700) 100%);
  color: white;
  position: relative;
  overflow: hidden;
}
```

#### Hero Content
```css
.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-6);
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-normal);
  margin-bottom: var(--space-8);
  opacity: 0.9;
  line-height: 1.6;
}
```

### Layout Components

#### Page Container
```css
.page-container {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}
```

#### Section Container
```css
.section {
  padding: var(--space-20) 0;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto var(--space-16) auto;
}
```

### Alert Components

#### Alert Types
```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-6);
  border-left: 4px solid;
  box-shadow: var(--shadow-sm);
}

.alert--success {
  background: var(--color-success-50);
  border-color: var(--color-success-500);
}

.alert--error {
  background: var(--color-error-50);
  border-color: var(--color-error-500);
}
```

## Responsive Design

### Breakpoints
- **Mobile**: `max-width: 768px`
- **Tablet**: `min-width: 769px` and `max-width: 1024px`
- **Desktop**: `min-width: 1025px`

### Mobile Adaptations
```css
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .form-row--two-cols,
  .form-row--three-cols {
    grid-template-columns: 1fr;
  }
  
  .nav-links {
    display: none;
  }
  
  .nav-mobile-toggle {
    display: block;
  }
}
```

## Accessibility Features

### Focus Management
- All interactive elements have visible focus states
- Focus rings use `outline: 2px solid var(--color-primary-500)`
- Proper tab order maintained throughout

### Color Contrast
- All text meets WCAG 2.1 AA contrast requirements
- Error states use sufficient contrast ratios
- Interactive elements have accessible hover states

### Screen Reader Support
- Proper semantic markup with headings hierarchy
- Form labels associated with inputs
- Alert regions with `role="alert"`
- Progress indicators with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

## Usage Guidelines

### Component Selection
1. **Buttons**: Use `btn-primary` for main actions, `btn-secondary` for secondary actions
2. **Cards**: Use `card` for content containers, `card-elevated` for emphasis
3. **Forms**: Always use `form-input`, `form-label`, and error states consistently
4. **Navigation**: Use `nav-link` classes for consistent hover effects

### Layout Patterns
1. **Hero Sections**: Use `hero-section` with `hero-content` for all page headers
2. **Content Sections**: Use `section` with `page-container` for consistent spacing
3. **Feature Grids**: Use `features-grid` for service/feature listings

### Performance Considerations
- CSS custom properties provide efficient theming
- Transition properties are optimized for performance
- Shadow and blur effects use hardware acceleration

## Migration Notes

### Legacy Classes Removed
- Old glass card variants replaced with unified system
- Custom color classes replaced with design tokens
- Inconsistent spacing replaced with 8px grid system

### Backward Compatibility
- Legacy transaction form aliases maintained (`--tf-*` variables)
- Existing Tailwind classes continue to work alongside design system
- Gradual migration path allows for iterative updates

## Implementation Examples

### Basic Page Structure
```tsx
import React from 'react';
import { Button } from '@/components/ui';

const Page: React.FC = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Page Title</h1>
          <p className="hero-subtitle">Page description</p>
          <Button variant="primary" size="lg">
            Call to Action
          </Button>
        </div>
      </section>
      
      <section className="section">
        <div className="page-container">
          <div className="section-header">
            <h2 className="heading-2">Section Title</h2>
            <p className="text-lead">Section description</p>
          </div>
          <div className="features-grid">
            {/* Feature cards */}
          </div>
        </div>
      </section>
    </div>
  );
};
```

### Form Implementation
```tsx
const ContactForm: React.FC = () => {
  return (
    <form className="form-group">
      <div className="form-row form-row--two-cols">
        <div>
          <label className="form-label form-label-required">Name</label>
          <input className="form-input" type="text" required />
        </div>
        <div>
          <label className="form-label form-label-required">Email</label>
          <input className="form-input" type="email" required />
        </div>
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
```

### Card Layout
```tsx
const ServiceCard: React.FC = () => {
  return (
    <div className="card card-elevated">
      <div className="card-header">
        <h3 className="heading-3">Service Title</h3>
      </div>
      <div className="card-body">
        <p className="text-body">Service description</p>
      </div>
      <div className="card-footer">
        <Button variant="secondary">Learn More</Button>
      </div>
    </div>
  );
};
```

## Future Enhancements

### Planned Features
- Dark mode support with CSS custom property switching
- Additional card variants for specialized use cases
- Enhanced animation utilities
- Form validation styling improvements

### Maintenance
- Regular accessibility audits
- Performance monitoring
- Browser compatibility testing
- Design token updates based on brand evolution

---

## Support

For questions about the design system or implementation guidance:
- Review this documentation
- Check existing component implementations
- Maintain consistency with established patterns
- Test across all supported devices and browsers

**Last Updated**: 2025-06-17 by Claude Code Assistant