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
  "btn inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary actions - uses design system btn-primary
        primary: "btn-primary btn-md",
        
        // Secondary actions - uses design system btn-secondary  
        secondary: "btn-secondary btn-md",
        
        // Destructive actions
        destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 shadow-md hover:shadow-lg",
        
        // Outline variants
        outline: "border-2 border-primary-500 bg-transparent hover:bg-primary-500/10 text-primary-500 focus-visible:ring-primary-500",
        
        // Ghost variant
        ghost: "bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900",
        
        // Link style
        link: "underline-offset-4 hover:underline text-primary-500 hover:text-primary-600 p-0 h-auto shadow-none",
        
        // Glass morphism effects
        glass: "glass-card glass-card-light hover:transform hover:translateY(-2px)",
        glassNavy: "glass-card glass-card-navy hover:transform hover:translateY(-2px)",
        glassBlue: "glass-card glass-card-blue hover:transform hover:translateY(-2px)",
        glassGold: "glass-card glass-card-gold hover:transform hover:translateY(-2px)",
        
        // Hero variant (inverted contrast)
        hero: "bg-white hover:bg-neutral-50 text-primary-500 shadow-lg hover:shadow-xl font-semibold",
      },
      size: {
        sm: "btn-sm text-sm h-9 px-3",
        md: "btn-md text-base h-10 px-4", 
        lg: "btn-lg text-lg h-11 px-6",
        xl: "text-xl h-12 px-8",
        icon: "h-10 w-10 p-2",
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