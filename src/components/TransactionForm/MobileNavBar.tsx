import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, Info, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Remove Button dependency to eliminate potential Router context dependencies
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

// Simple Button component that doesn't depend on any contexts
const Button = ({
  variant = 'default',
  size = 'default',
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";

  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-white/20 text-white",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10"
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export interface MobileNavBarProps {
  currentStep: number;
  totalSteps: number;
  isLastStep?: boolean;
  hasMissingFields?: boolean;
  canGoNext?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSave?: () => void;
  className?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export function MobileNavBar({
  currentStep,
  totalSteps,
  isLastStep = false,
  hasMissingFields = false,
  canGoNext = true,
  onPrevious,
  onNext,
  onSave,
  className,
  onMenuOpen,
  onMenuClose,
}: MobileNavBarProps) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle menu open/close callbacks
  useEffect(() => {
    if (isMenuOpen && onMenuOpen) {
      onMenuOpen();
    } else if (!isMenuOpen && onMenuClose) {
      onMenuClose();
    }
  }, [isMenuOpen, onMenuOpen, onMenuClose]);

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.max(5, Math.min(100, (currentStep / totalSteps) * 100));
  };
  const progressPercentage = calculateProgress();

  return (
    <>
      {/* Fixed bottom navigation bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 py-1 px-2 md:hidden z-50 shadow-lg",
          "pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))]",
          "border-t-2",
          className
        )}
        style={{
          backgroundColor: '#1e3a8a',
          borderColor: '#1e40af'
        }}
      >
        {/* Extra background layer for guaranteed opacity */}
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: '#1e3a8a' }}
        ></div>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={cn(
              "flex items-center px-3 py-2 h-10 rounded-full shadow-sm touch-target",
              "text-white hover:text-white hover:bg-blue-700/50",
              "transition-all duration-200 ease-in-out",
              "min-w-[80px] text-shadow-sm font-medium",
              currentStep === 1 ? "opacity-50" : "opacity-100"
            )}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>

          {/* Hamburger Menu Button with high visibility */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(true)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "border-2 border-white bg-blue-700",
              "hover:bg-blue-800 transition-colors text-white"
            )}
            style={{
              boxShadow: '0 0 0 2px rgba(255,255,255,0.5), 0 4px 6px rgba(0,0,0,0.3)'
            }}
          >
            <Menu className="h-5 w-5 text-white" strokeWidth={2.5} />
          </Button>

          {onSave && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onSave) onSave();
                // Show toast notification for mobile
                const toast = document.createElement('div');
                toast.className = 'mobile-toast';
                toast.innerText = 'Draft saved successfully';
                document.body.appendChild(toast);
                setTimeout(() => {
                  toast.style.opacity = '0';
                  setTimeout(() => {
                    document.body.removeChild(toast);
                  }, 300);
                }, 2000);
              }}
              className={cn(
                "flex items-center px-3 py-2 h-10 rounded-full shadow-sm touch-target",
                "text-white hover:text-white hover:bg-blue-700/50",
                "transition-all duration-200 ease-in-out",
                "min-w-[80px] text-shadow-sm font-medium"
              )}
            >
              <Save className="mr-1 h-4 w-4" />
              Save
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            onClick={onNext}
            disabled={!canGoNext}
            className={cn(
              "flex items-center px-4 py-2 h-10 rounded-full shadow-md touch-target",
              "transition-all duration-200 ease-in-out",
              "min-w-[80px] font-semibold",
              isLastStep
                ? "bg-green-500 hover:bg-green-600 text-white text-shadow-sm"
                : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/30",
              !canGoNext && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLastStep ? "Submit" : "Next"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-center text-xs text-white/70 mt-0.5">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white mr-1"></div>
            <span className="text-xs">Step {currentStep}/{totalSteps}</span>
          </div>

          {hasMissingFields && (
            <div className="flex items-center text-yellow-300">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span className="text-xs">Missing fields</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Full-screen background overlay with top priority z-index to cover logo area */}
            <div
              className="fixed inset-0 z-[100] md:hidden"
              style={{ backgroundColor: '#1e3a8a', opacity: 0.98 }}
            ></div>

            {/* Animated container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[101] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Menu panel with solid background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-y-0 inset-x-0 flex flex-col justify-between p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] overflow-auto z-[102]"
                style={{
                  backgroundColor: '#1e3a8a',
                  borderColor: '#1e40af',
                  boxShadow: '0 -8px 25px rgba(0,0,0,0.5)'
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Extra solid background to prevent any transparency */}
                {/* Double-layer background for maximum opacity */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{ backgroundColor: '#1e3a8a' }}
                ></div>
                <div
                  className="absolute inset-0 -z-10 opacity-100"
                  style={{ backgroundColor: '#1e3a8a' }}
                ></div>

                {/* Menu content */}
                <div className="relative z-10">
                  {/* Header with app logo placeholder - shown at the top of the menu */}
                  <div className="py-4 flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-white rounded-md p-1.5 mr-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V12h6v10" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-white font-bold text-lg">PA Real Estate</span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1.5 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                    >
                      <X className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white drop-shadow-sm mb-4">Transaction Options</h3>

                  <div className="space-y-2">
                    <button
                      className="w-full py-3.5 px-4 rounded-lg text-white font-medium text-left flex items-center shadow-md transition-colors"
                      style={{ backgroundColor: 'rgba(37, 99, 235, 1)', border: '1px solid rgba(96, 165, 250, 0.5)' }}
                    >
                      <Save className="w-4 h-4 mr-3" strokeWidth={2.5} />
                      <span className="drop-shadow-sm">Save as Draft</span>
                    </button>

                    <button
                      className="w-full py-3.5 px-4 rounded-lg text-white font-medium text-left flex items-center shadow-md transition-colors"
                      style={{ backgroundColor: 'rgba(30, 64, 175, 0.95)', border: '1px solid rgba(96, 165, 250, 0.4)' }}
                    >
                      <Info className="w-4 h-4 mr-3" />
                      View Transaction Details
                    </button>

                    <button
                      className="w-full py-3 px-4 rounded-lg text-red-200 font-medium text-left flex items-center mt-4"
                      style={{ backgroundColor: 'rgba(220, 38, 38, 0.3)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                        <path d="M10 16l4-4m0 0l-4-4m4 4H3"></path>
                        <path d="M21 12v4a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v4z"></path>
                      </svg>
                      Exit Transaction
                    </button>
                  </div>

                  <div className="mt-6 pt-4 border-t border-blue-700">
                    <div className="text-white text-xs mb-2">Transaction Progress</div>
                    <div className="w-full h-2 bg-blue-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-white mt-1">
                      <span>Step {currentStep}/{totalSteps}</span>
                      <span>{Math.round(progressPercentage)}% complete</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}