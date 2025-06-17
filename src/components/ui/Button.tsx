import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Button variant system using our design tokens
 * Consolidated from 5 different button implementations
 */
const buttonVariants = cva(
  "btn inline-flex items-center justify-center gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary actions - uses unified design system
        primary: "btn-primary",
        
        // Secondary actions - uses unified design system  
        secondary: "btn-secondary",
        
        // Ghost variant - uses unified design system
        ghost: "btn-ghost",
        
        // Success actions - uses unified design system
        success: "btn-success",
        
        // Destructive/danger actions - uses unified design system
        destructive: "btn-danger",
        
        // Accent variant - uses golden tan accent
        accent: "btn-accent",
        
        // Link style
        link: "underline-offset-4 hover:underline text-primary-500 hover:text-primary-600 p-0 h-auto shadow-none bg-transparent",
        
        // Premium card variant
        premium: "card-premium text-neutral-700 hover:text-neutral-900 border-0 shadow-xl hover:shadow-2xl",
        
        // Glass morphism effects - enhanced
        glass: "card-glass text-neutral-700 hover:text-neutral-900 border-0",
        
        // Hero variant (inverted contrast)
        hero: "bg-white hover:bg-neutral-50 text-primary-500 shadow-lg hover:shadow-xl font-semibold border-0",
      },
      size: {
        sm: "btn-sm",
        md: "text-base min-h-[2.75rem] px-6 py-3", 
        lg: "btn-lg",
        xl: "btn-xl",
        icon: "btn-icon-only",
      },
      radius: {
        default: "rounded-lg",
        sm: "rounded-sm", 
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md", 
      radius: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as child element (using Radix Slot)
   */
  asChild?: boolean;
  
  /**
   * URL for link buttons (renders as React Router Link)
   */
  to?: string;
  
  /**
   * External URL (renders as anchor tag)
   */
  href?: string;
  
  /**
   * Icon element
   */
  icon?: React.ReactNode;
  
  /**
   * Icon position
   */
  iconPosition?: "left" | "right";
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Enable hover animations
   */
  withAnimation?: boolean;
}

/**
 * Unified Button Component
 * 
 * Consolidates all button implementations from the project:
 * - Standard buttons with design system classes
 * - Glass morphism variants
 * - Hero/CTA buttons
 * - Loading states and animations
 * - Link functionality (internal and external)
 * - Icon support
 * - Full accessibility
 * 
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * 
 * // Glass card button
 * <Button variant="glass" withAnimation>
 *   Premium Action
 * </Button>
 * 
 * // Link button with icon
 * <Button variant="secondary" to="/contact" icon={<ChevronRight />} iconPosition="right">
 *   Contact Us
 * </Button>
 * 
 * // Loading button
 * <Button loading disabled>
 *   Submitting...
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    variant,
    size,
    radius,
    fullWidth,
    asChild = false,
    to,
    href,
    icon,
    iconPosition = "left",
    loading = false,
    withAnimation = false,
    children,
    type = "button",
    ...props 
  }, ref) => {
    
    // Loading spinner component
    const LoadingSpinner = () => (
      <svg 
        className="animate-spin h-4 w-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Button content with conditional icon and loading state
    const buttonContent = (
      <>
        {loading ? (
          <LoadingSpinner />
        ) : (
          iconPosition === "left" && icon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )
        )}
        <span>{children}</span>
        {!loading && iconPosition === "right" && icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    );

    // Base class names
    const classNames = `${buttonVariants({
      variant,
      size,
      radius, 
      fullWidth,
    })} ${className || ''}`;

    // Animation wrapper
    const AnimationWrapper = withAnimation ? motion.div : React.Fragment;
    const animationProps = withAnimation
      ? {
          whileHover: { scale: 1.02, y: -2 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.2, ease: "easeInOut" },
        }
      : {};

    // External link
    if (href) {
      return (
        <AnimationWrapper {...animationProps}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames}
            aria-disabled={loading || props.disabled}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {buttonContent}
          </a>
        </AnimationWrapper>
      );
    }

    // Internal link
    if (to) {
      return (
        <AnimationWrapper {...animationProps}>
          <Link
            to={to}
            className={classNames}
            aria-disabled={loading || props.disabled}
          >
            {buttonContent}
          </Link>
        </AnimationWrapper>
      );
    }

    // Regular button
    const Comp = asChild ? Slot : "button";
    
    return (
      <AnimationWrapper {...animationProps}>
        <Comp
          type={type}
          className={classNames}
          ref={ref}
          disabled={props.disabled || loading}
          aria-busy={loading}
          {...props}
        >
          {buttonContent}
        </Comp>
      </AnimationWrapper>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };