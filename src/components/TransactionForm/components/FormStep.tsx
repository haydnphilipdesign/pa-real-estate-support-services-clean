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
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          {/* Step Number/Icon */}
          <div className="feature-icon">
            {icon || (
              <span className="text-sm font-semibold">
                {step}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h2 className="heading-2" style={{ color: 'white' }}>
            {title}
          </h2>
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-lead" style={{ color: 'rgba(255, 255, 255, 0.8)', marginLeft: 'var(--space-12)' }}>
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