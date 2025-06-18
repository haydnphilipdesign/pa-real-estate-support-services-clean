/**
 * Clean Transaction Form - Matches Site Aesthetic Perfectly
 * No hover effects, clean design, full functionality retained
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
  AlertTriangle,
  User
} from 'lucide-react';

// Import components  
import { CleanRoleSelection } from './CleanRoleSelection';
import { PropertyInformation } from './PropertyInformation';
import { ClientInformation } from './ClientInformation';
import { CommissionSection } from './CommissionSectionImproved';
import { DocumentsSection } from './DocumentsSection';
import { PropertyDetailsSection } from './PropertyDetailsSectionImproved';
import { AdditionalInfoSection } from './AdditionalInfoSection';
import { SignatureSection } from './SignatureSection';
import { ReviewSection } from './ReviewSection';

// Import hooks
import { useTransactionFormState } from './hooks/useTransactionFormState';

// Step configuration
const FORM_STEPS = [
  {
    id: 1,
    title: 'Select Your Role',
    description: 'Choose how you are representing clients in this transaction',
    icon: <Home className="w-4 h-4 text-white" />,
    component: CleanRoleSelection
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

export interface CleanTransactionFormProps {
  className?: string;
}

export const CleanTransactionForm: React.FC<CleanTransactionFormProps> = ({
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
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData.touchedFields.size, actions]);

  // Get current step configuration
  const currentStepConfig = FORM_STEPS.find(step => step.id === stepConfig.currentStep);
  const CurrentStepComponent = currentStepConfig?.component;

  const scrollToTop = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
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
        setTimeout(() => scrollToTop(), 100);
      }
    }
  };

  const handlePrevious = () => {
    if (stepConfig.canGoPrevious) {
      actions.previousStep();
      setTimeout(() => scrollToTop(), 100);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen relative overflow-hidden clean-form-container" style={{
        background: `linear-gradient(135deg, 
          #0a1628 0%, 
          #1e40af 25%, 
          #1e3a8a 50%, 
          #3b82f6 75%, 
          #1e40af 100%
        )`
      }}>
        {/* Background Elements - Match Hero */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.15)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(147,51,234,0.12)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(239,68,68,0.08)_0%,_transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" ref={formContainerRef}>
          
          {/* Clean Form Card - Match Site Cards */}
          <div className={`bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 ${className}`}>
            
            {/* Progress Bar - Clean Style */}
            <div className="mb-12">
              <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                <span>Step {stepConfig.currentStep} of {stepConfig.totalSteps}</span>
                <span>{Math.round((stepConfig.currentStep / stepConfig.totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <motion.div 
                  className="h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stepConfig.currentStep / stepConfig.totalSteps) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Step Header - Clean Typography */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-6">
                {currentStepConfig?.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {currentStepConfig?.title}
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {currentStepConfig?.description}
              </p>
            </div>

            {/* Warnings Display */}
            {Object.keys(formData.validationWarnings).length > 0 && stepConfig.currentStep > 1 && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800 mb-2">Optional Fields</h4>
                    <p className="text-sm text-amber-700 mb-3">
                      Some information is missing but you can still proceed. Consider completing these fields for a more comprehensive transaction record.
                    </p>
                    <ul className="text-sm text-amber-700 space-y-1">
                      {Object.entries(formData.validationWarnings).map(([field, warnings]) => (
                        <li key={field} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></span>
                          {Array.isArray(warnings) ? warnings.join(', ') : warnings}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Form Step Content */}
            <AnimatePresence mode="wait">
              {currentStepConfig && CurrentStepComponent && (
                <motion.div
                  key={stepConfig.currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-12"
                >
                  {currentStepConfig.id === 1 ? (
                    <CleanRoleSelection
                      selectedRole={formData.agentData.role}
                      onRoleChange={(role) => actions.updateField('agentData.role', role)}
                      agentName={formData.agentData.name}
                      onAgentNameChange={(name) => actions.updateField('agentData.name', name)}
                      errors={{
                        selectedRole: formData.validationErrors['role'],
                        agentName: formData.validationErrors['agentName']
                      }}
                      showValidation={formData.touchedFields.size > 0}
                    />
                  ) : currentStepConfig.id === 2 ? (
                    <PropertyInformation
                      data={formData.propertyData}
                      onChange={(field, value) => actions.updateField(`propertyData.${field}`, value)}
                      role={formData.agentData.role}
                    />
                  ) : currentStepConfig.id === 3 ? (
                    <ClientInformation
                      clients={formData.clients}
                      onChange={(clients) => actions.updateField('clients', clients)}
                      onClientChange={actions.updateClient}
                      onAddClient={actions.addClient}
                      onRemoveClient={actions.removeClient}
                      role={formData.agentData.role}
                    />
                  ) : currentStepConfig.id === 4 ? (
                    <PropertyDetailsSection
                      data={formData.propertyDetailsData}
                      onChange={(field, value) => actions.updateField(`propertyDetailsData.${field}`, value)}
                      role={formData.agentData.role}
                    />
                  ) : currentStepConfig.id === 5 ? (
                    <CommissionSection
                      data={formData.commissionData}
                      onChange={(field, value) => actions.updateField(`commissionData.${field}`, value)}
                      role={formData.agentData.role}
                    />
                  ) : (
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
              <div className="bg-red-50/80 border border-red-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-800 mb-2">Please correct the following errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {Object.entries(formData.validationErrors).map(([field, error]) => (
                        <li key={field} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0"></span>
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Footer - Clean Button Design */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-200">
              
              {/* Previous Button */}
              <div className="mb-4 md:mb-0">
                {stepConfig.canGoPrevious ? (
                  <button
                    onClick={handlePrevious}
                    className="inline-flex items-center px-6 py-3 bg-white border border-neutral-300 rounded-xl font-semibold text-neutral-700 transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Center Action Buttons */}
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button
                  onClick={actions.saveDraft}
                  className="inline-flex items-center px-4 py-2 text-neutral-600 font-medium rounded-lg transition-all duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </button>
                
                <button
                  onClick={actions.resetForm}
                  className="inline-flex items-center px-4 py-2 text-neutral-600 font-medium rounded-lg transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>

              {/* Next/Submit Button */}
              <div>
                <button
                  onClick={handleNext}
                  disabled={!stepConfig.canGoNext || formData.isSubmitting}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formData.isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Submitting...
                    </>
                  ) : stepConfig.isLastStep ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Transaction
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
              
            </div>

          </div>
        </div>
      
        <Toaster />
      </div>
    </TooltipProvider>
  );
};

export default CleanTransactionForm;