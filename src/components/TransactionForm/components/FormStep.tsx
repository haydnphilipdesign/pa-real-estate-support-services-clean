/**
 * FormStep Component
 * 
 * Reusable wrapper for transaction form steps
 * Provides consistent layout and animation patterns
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface FormStepProps {
  step: number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const stepVariants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: { duration: 0.3 }
  }
};

export const FormStep: React.FC<FormStepProps> = ({
  step,
  title,
  description,
  icon,
  children,
  isActive = true,
  className = ''
}) => {
  return (
    <motion.div
      className={`w-full space-y-6 ${className}`}
      variants={stepVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      layout
    >
      {/* Step Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {/* Step Number/Icon */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/10 shadow-md border border-white/20">
            {icon || (
              <span className="text-sm font-semibold text-white">
                {step}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {title}
          </h2>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-white/80 text-sm md:text-base pl-11">
            {description}
          </p>
        )}
      </div>

      {/* Step Content */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default FormStep;