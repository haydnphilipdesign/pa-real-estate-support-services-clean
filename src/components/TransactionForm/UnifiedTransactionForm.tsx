/**
 * Unified Transaction Form
 * Professional TurboTax-inspired transaction form with modern design system
 * 
 * Features:
 * - Clean, trustworthy design with professional styling
 * - Responsive grid layout with consistent spacing
 * - WCAG 2.1 AA accessibility compliance
 * - Smooth animations and micro-interactions
 * - Progressive disclosure with clear step flow
 * - Comprehensive validation with inline error messaging
 */

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { 
  Home, 
  Building, 
  Users, 
  DollarSign, 
  FileText, 
  Info, 
  PenTool, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Save,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

// Import design system styles
import '@/styles/transaction-form-design-system.css';

// Import components
import { RoleSelection } from './RoleSelection';
import { PropertyInformation } from './PropertyInformation';
import { ClientInformation } from './ClientInformation';
import { CommissionSection } from './CommissionSectionImproved';
import { DocumentsSection } from './DocumentsSection';
import { PropertyDetailsSection } from './PropertyDetailsSectionImproved';
import { AdditionalInfoSection } from './AdditionalInfoSection';
import { SignatureSection } from './SignatureSection';
import { ReviewSection } from './ReviewSection';
import { FormStep } from './components/FormStep';
import { Button } from '@/components/ui';

// Import hooks and utils
import { useTransactionFormState } from './hooks/useTransactionFormState';
import { ensureCssImported } from '../FixedCssImport';
import TransactionFormFixes from '../TransactionFormFixes';

// Ensure CSS is imported
ensureCssImported();

// Step configuration
const FORM_STEPS = [
  {
    id: 1,
    title: 'Select Your Role',
    description: 'Choose how you are representing clients in this transaction',
    icon: <Home className="w-4 h-4 text-white" />,
    component: RoleSelection
  },
  {
    id: 2,
    title: 'Property Information',
    description: 'Enter the basic property details for this transaction',
    icon: <Building className="w-4 h-4 text-white" />,
    component: PropertyInformation
  },
  {
    id: 3,
    title: 'Client Information',
    description: 'Add your client contact details and preferences',
    icon: <Users className="w-4 h-4 text-white" />,
    component: ClientInformation
  },
  {
    id: 4,
    title: 'Property Details',
    description: 'Provide additional property specifications',
    icon: <Building className="w-4 h-4 text-white" />,
    component: PropertyDetailsSection
  },
  {
    id: 5,
    title: 'Commission Structure',
    description: 'Configure commission rates and distribution',
    icon: <DollarSign className="w-4 h-4 text-white" />,
    component: CommissionSection
  },
  {
    id: 6,
    title: 'Required Documents',
    description: 'Confirm all necessary documents are uploaded',
    icon: <FileText className="w-4 h-4 text-white" />,
    component: DocumentsSection
  },
  {
    id: 7,
    title: 'Additional Information',
    description: 'Add any special notes or additional details',
    icon: <Info className="w-4 h-4 text-white" />,
    component: AdditionalInfoSection
  },
  {
    id: 8,
    title: 'Digital Signature',
    description: 'Sign the transaction agreement electronically',
    icon: <PenTool className="w-4 h-4 text-white" />,
    component: SignatureSection
  },
  {
    id: 9,
    title: 'Review & Submit',
    description: 'Review all information and submit your transaction',
    icon: <CheckCircle className="w-4 h-4 text-white" />,
    component: ReviewSection
  }
];

// Animation variants for smooth step transitions
const stepVariants = {
  enter: {
    opacity: 0,
    x: 50,
    scale: 0.95
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.95
  }
};

const progressVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export interface UnifiedTransactionFormProps {
  className?: string;
}

export const UnifiedTransactionForm: React.FC<UnifiedTransactionFormProps> = ({
  className = ''
}) => {
  const { formData, actions, stepConfig } = useTransactionFormState();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Auto-save draft periodically
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData.touchedFields.size > 0) {
        actions.saveDraft();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData.touchedFields.size, actions]);

  // Get current step configuration
  const currentStepConfig = FORM_STEPS.find(step => step.id === stepConfig.currentStep);
  const CurrentStepComponent = currentStepConfig?.component;

  const scrollToTop = () => {
    // Scroll to the top of the form container
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    // Also scroll the window to ensure visibility
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const handleNext = () => {
    if (actions.validateStep(stepConfig.currentStep)) {
      if (stepConfig.isLastStep) {
        actions.submitForm();
      } else {
        actions.nextStep();
        // Scroll to top after navigation
        setTimeout(() => scrollToTop(), 100);
      }
    }
  };

  const handlePrevious = () => {
    if (stepConfig.canGoPrevious) {
      actions.previousStep();
      // Scroll to top after navigation
      setTimeout(() => scrollToTop(), 100);
    }
  };

  return (
    <TooltipProvider>
      <>
        {/* Transaction Form Fixes Component */}
        <TransactionFormFixes />
        
        {/* Main Form Container - white card with shadow */}
        <div className={`tf-form-card ${className}`} ref={formContainerRef}>
          
          {/* Compact Progress Bar */}
          <div className="tf-progress-compact" role="progressbar" 
               aria-valuenow={stepConfig.currentStep} 
               aria-valuemin={1} 
               aria-valuemax={stepConfig.totalSteps}
               aria-label={`Step ${stepConfig.currentStep} of ${stepConfig.totalSteps}`}>
            <div className="tf-progress-text">
              Step {stepConfig.currentStep} of {stepConfig.totalSteps} • {Math.round((stepConfig.currentStep / stepConfig.totalSteps) * 100)}% Complete
            </div>
            <div className="tf-progress-bar-container">
              <motion.div 
                className="tf-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${(stepConfig.currentStep / stepConfig.totalSteps) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Main Form Content */}
          <main className="tf-content-direct" role="main">
              
              {/* Step Header */}
              <div className="tf-step-header">
                <div className="tf-step-icon" aria-hidden="true">
                  {currentStepConfig?.icon}
                </div>
                <h2 className="tf-step-title">
                  {currentStepConfig?.title}
                </h2>
                <p className="tf-step-description">
                  {currentStepConfig?.description}
                </p>
              </div>

              {/* Form Step Content */}
              <AnimatePresence mode="wait">
                {currentStepConfig && CurrentStepComponent && (
                  <motion.div
                    key={stepConfig.currentStep}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {currentStepConfig.id === 1 ? (
                      // RoleSelection step - pass specific props
                      <RoleSelection
                        selectedRole={formData.agentData.role}
                        onRoleChange={(role) => actions.updateField('agentData.role', role)}
                        agentName={formData.agentData.name}
                        onAgentNameChange={(name) => actions.updateField('agentData.name', name)}
                        errors={{
                          selectedRole: formData.validationErrors['agentData.role'],
                          agentName: formData.validationErrors['agentData.name']
                        }}
                        showValidation={formData.touchedFields.size > 0}
                      />
                    ) : currentStepConfig.id === 2 ? (
                      // PropertyInformation step - pass correct props
                      <PropertyInformation
                        data={formData.propertyData}
                        onChange={(field, value) => actions.updateField(`propertyData.${field}`, value)}
                        role={formData.agentData.role}
                      />
                    ) : currentStepConfig.id === 3 ? (
                      // ClientInformation step - pass specific props
                      <ClientInformation
                        clients={formData.clients}
                        onChange={(clients) => actions.updateField('clients', clients)}
                        onClientChange={actions.updateClient}
                        onAddClient={actions.addClient}
                        onRemoveClient={actions.removeClient}
                        role={formData.agentData.role}
                      />
                    ) : currentStepConfig.id === 4 ? (
                      // PropertyDetailsSection step - pass specific props
                      <PropertyDetailsSection
                        data={formData.propertyDetailsData}
                        onChange={(field, value) => actions.updateField(`propertyDetailsData.${field}`, value)}
                        role={formData.agentData.role}
                      />
                    ) : currentStepConfig.id === 5 ? (
                      // CommissionSection step - pass specific props
                      <CommissionSection
                        data={formData.commissionData}
                        onChange={(field, value) => actions.updateField(`commissionData.${field}`, value)}
                        role={formData.agentData.role}
                      />
                    ) : (
                      // Other steps - pass standard props
                      <CurrentStepComponent
                        formData={formData}
                        onChange={actions.updateField}
                        onClientChange={actions.updateClient}
                        onAddClient={actions.addClient}
                        onRemoveClient={actions.removeClient}
                        validationErrors={formData.validationErrors}
                        touchedFields={formData.touchedFields}
                        onFieldTouch={actions.setFieldTouched}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Validation Errors Summary */}
              {Object.keys(formData.validationErrors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="tf-alert tf-alert--error"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="tf-alert-title">
                    <AlertTriangle className="inline w-4 h-4 mr-2" />
                    Please correct the following errors:
                  </div>
                  <ul className="mt-2 space-y-1">
                    {Object.entries(formData.validationErrors).map(([field, error]) => (
                      <li key={field}>• {error}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

            </main>

          {/* Navigation Footer */}
          <footer className="tf-navigation-direct" role="contentinfo">
            
            {/* Previous Button */}
            <div className="tf-nav-section">
              {stepConfig.canGoPrevious ? (
                <button
                  onClick={handlePrevious}
                  className="tf-button tf-button--secondary"
                  aria-label={`Go to previous step: ${FORM_STEPS[stepConfig.currentStep - 2]?.title || 'Previous'}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
            </div>

            {/* Center Action Buttons */}
            <div className="tf-nav-section">
              <button
                onClick={actions.saveDraft}
                className="tf-button tf-button--ghost tf-button--sm"
                aria-label="Save current progress as draft"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              
              <button
                onClick={actions.resetForm}
                className="tf-button tf-button--ghost tf-button--sm"
                aria-label="Reset form to initial state"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Next/Submit Button */}
            <div className="tf-nav-section">
              <button
                onClick={handleNext}
                disabled={!stepConfig.canGoNext || formData.isSubmitting}
                className="tf-button tf-button--primary tf-button--lg"
                aria-label={stepConfig.isLastStep ? 
                  'Submit completed transaction form' : 
                  `Continue to next step: ${FORM_STEPS[stepConfig.currentStep]?.title || 'Next'}`}
              >
                {formData.isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Submitting...
                  </>
                ) : stepConfig.isLastStep ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Submit Transaction
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            
          </footer>

        </div>
      
        <Toaster />
      </>
    </TooltipProvider>
  );
};

export default UnifiedTransactionForm;