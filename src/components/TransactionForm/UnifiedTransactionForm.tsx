/**
 * Unified Transaction Form
 * 
 * Refactored transaction form that consolidates functionality from:
 * - TransactionForm.complete.tsx (1,457 lines)
 * - TransactionForm.tsx (557 lines) 
 * - PortalTransactionForm.tsx (716 lines)
 * 
 * Key improvements:
 * - Modular step-based architecture
 * - Centralized state management
 * - Consistent error handling
 * - Performance optimizations
 * - Clean separation of concerns
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
  RotateCcw
} from 'lucide-react';

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

// CSS fix for dropdowns (consolidated from original components)
const formStyles = `
  .unified-transaction-form select,
  .unified-transaction-form select option,
  .unified-transaction-form .select__control,
  .unified-transaction-form .select__menu,
  .unified-transaction-form .select__option {
    background-color: white !important;
    color: #1e3a8a !important;
    opacity: 1 !important;
    -webkit-appearance: menulist !important;
    appearance: menulist !important;
  }
  
  .unified-transaction-form input:not([type="radio"]):not([type="checkbox"]),
  .unified-transaction-form textarea {
    background-color: white !important;
    color: #1e3a8a !important;
    border: 1px solid rgba(59, 130, 246, 0.3) !important;
    border-radius: 0.375rem !important;
  }
  
  .unified-transaction-form label,
  .unified-transaction-form .form-label {
    color: white !important;
  }
`;

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

  const handleNext = () => {
    if (actions.validateStep(stepConfig.currentStep)) {
      if (stepConfig.isLastStep) {
        actions.submitForm();
      } else {
        actions.nextStep();
      }
    }
  };

  const handlePrevious = () => {
    if (stepConfig.canGoPrevious) {
      actions.previousStep();
    }
  };

  return (
    <TooltipProvider>
      {/* Transaction Form Fixes Component */}
      <TransactionFormFixes />
      
      {/* Inject form styles */}
      <style dangerouslySetInnerHTML={{ __html: formStyles }} />
      
      <div 
        ref={formContainerRef}
        className={`unified-transaction-form w-full h-auto ${className}`}
      >
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-white/80 mb-2">
            <span>Step {stepConfig.currentStep} of {stepConfig.totalSteps}</span>
            <span>{Math.round((stepConfig.currentStep / stepConfig.totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-400 to-blue-300 h-2 rounded-full"
              style={{ width: `${(stepConfig.currentStep / stepConfig.totalSteps) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(stepConfig.currentStep / stepConfig.totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentStepConfig && CurrentStepComponent && (
              <FormStep
                key={stepConfig.currentStep}
                step={stepConfig.currentStep}
                title={currentStepConfig.title}
                description={currentStepConfig.description}
                icon={currentStepConfig.icon}
                isActive={true}
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
              </FormStep>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
          {/* Left side - Previous button */}
          <div>
            {stepConfig.canGoPrevious ? (
              <Button
                variant="ghost"
                size="lg"
                onClick={handlePrevious}
                icon={<ArrowLeft className="w-4 h-4" />}
                className="text-white hover:bg-white/10"
              >
                Previous
              </Button>
            ) : (
              <div></div> // Placeholder for alignment
            )}
          </div>

          {/* Center - Action buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="default"
              onClick={actions.saveDraft}
              icon={<Save className="w-4 h-4" />}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Save Draft
            </Button>
            
            <Button
              variant="outline"
              size="default"
              onClick={actions.resetForm}
              icon={<RotateCcw className="w-4 h-4" />}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Reset
            </Button>
          </div>

          {/* Right side - Next/Submit button */}
          <div>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleNext}
              disabled={!stepConfig.canGoNext || formData.isSubmitting}
              loading={formData.isSubmitting}
              icon={stepConfig.isLastStep ? 
                <CheckCircle className="w-4 h-4" /> : 
                <ArrowRight className="w-4 h-4" />
              }
              iconPosition="right"
            >
              {stepConfig.isLastStep ? 'Submit Transaction' : 'Continue'}
            </Button>
          </div>
        </div>

        {/* Validation errors summary */}
        {Object.keys(formData.validationErrors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <h4 className="text-red-200 font-medium mb-2">Please correct the following errors:</h4>
            <ul className="list-disc list-inside text-red-200 text-sm space-y-1">
              {Object.entries(formData.validationErrors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      <Toaster />
    </TooltipProvider>
  );
};

export default UnifiedTransactionForm;