import React, { useState, useEffect, CSSProperties } from "react";
import { motion } from "framer-motion";
import { TransactionForm } from "./TransactionForm";
import TransactionHero from "../TransactionHero";
import { FileText, Shield, Clock } from 'lucide-react';
// Import the centralized CSS helper
import { ensureCssImported } from "../FixedCssImport";

// Ensure CSS is imported
ensureCssImported();

// Import new transaction form portal styles
import '../../styles/pages/transaction-form-portal.css';
import '../../styles/pages/additional-form-fixes.css';
import '../../styles/pages/form-ui-fixes.css';

// Add inline style to ensure dropdowns are properly styled
const fixDropdownStyles = `
  select, select option, .select__control, .select__menu, .select__option {
    background-color: white !important;
    color: #1e3a8a !important;
    opacity: 1 !important;
    -webkit-appearance: menulist !important;
    appearance: menulist !important;
    background: white !important;
  }

  /* Target specific Property Status dropdown */
  select[data-status], select[name] {
    background-color: white !important;
    background: white !important;
    color: #1e3a8a !important;
    opacity: 1 !important;
  }

  .dropdown-menu, .dropdown-content, [role="listbox"],
  .select__menu-list, .select__value-container, .select__single-value {
    background-color: white !important;
    color: #1e3a8a !important;
    border: 1px solid rgba(59, 130, 246, 0.5) !important;
    opacity: 1 !important;
  }

  /* Fix for React Select components */
  .css-1s2u09g-control, .css-1pahdxg-control,
  .css-26l3qy-menu, .css-4ljt47-MenuList {
    background-color: white !important;
    color: #1e3a8a !important;
    opacity: 1 !important;
    background: white !important;
  }

  /* Ensure dropdown items are visible */
  .select__option, [role="option"], .dropdown-item {
    background-color: white !important;
    color: #1e3a8a !important;
    opacity: 1 !important;
  }

  /* Critical fixes for mobile display */
  @media (max-width: 767px) {
    .homepage-style-title h1 {
      font-size: 1.875rem !important;
      text-align: center !important;
      width: 100% !important;
      display: block !important;
    }

    .homepage-style-title h1 span.text-blue-300 {
      display: inline !important;
      color: rgb(147, 197, 253) !important;
    }

    .homepage-style-subtitle {
      font-size: 1rem !important;
      text-align: center !important;
      width: 100% !important;
      display: block !important;
    }

    .transaction-portal-steps {
      display: flex !important;
      justify-content: center !important;
      margin: 1rem auto !important;
      width: fit-content !important;
      overflow-y: hidden !important;
    }

    /* Remove scrollbars from left column */
    .transaction-portal-container .xl\\:w-1\\/3 {
      overflow-y: hidden !important;
      max-height: none !important;
    }
  }
`;

interface PortalTransactionFormProps {
}

export const PortalTransactionForm: React.FC<PortalTransactionFormProps> = () => {
  // State to track current step for the vertical wizard
  const [currentStep, setCurrentStep] = useState(1);

  // Listen for step changes from the TransactionForm component
  useEffect(() => {
    const handleStepChange = (event: CustomEvent) => {
      if (event.detail && event.detail.step) {
        setCurrentStep(event.detail.step);
      }
    };

    // Add event listener
    window.addEventListener('stepChange' as any, handleStepChange);

    // Cleanup
    return () => {
      window.removeEventListener('stepChange' as any, handleStepChange);
    };
  }, []);

  // Function to handle clicking on a step in the vertical wizard
  const handleStepClick = (stepId: number) => {
    // Only allow clicking on completed steps (steps before the current step)
    if (stepId < currentStep) {
      // Dispatch an event to notify the TransactionForm component
      const event = new CustomEvent('verticalStepClick', {
        detail: { step: stepId }
      });
      window.dispatchEvent(event);

      // Update local state as well
      setCurrentStep(stepId);
    }
  };

  // Features displayed on the sidebar
  const features = [
    {
      icon: FileText,
      title: "Fast Transaction Submission",
      description: "Submit details through our user-friendly form designed for real estate professionals."
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Your transaction information is securely processed and stored."
    },
    {
      icon: Clock,
      title: "Time-Saving",
      description: "Save hours on paperwork with our efficient coordination service."
    }
  ];

  // Inline styles for critical elements
  const titleStyles: CSSProperties = {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    wordBreak: 'normal',
    whiteSpace: 'normal'
  };

  const subtitleStyles: CSSProperties = {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    margin: '0 auto'
  };

  const stepsContainerStyles: CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem auto',
    overflow: 'hidden' // Change from 'visible' to 'hidden' to prevent scrollbars
  };

  // Style for left column to prevent scrollbars
  const leftColumnStyles: CSSProperties = {
    maxHeight: 'none',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <TransactionHero className="py-2 px-0">
      {/* Add style tag for dropdown fixes */}
      <style dangerouslySetInnerHTML={{ __html: fixDropdownStyles }} />

      <div className="transaction-portal-container mx-auto responsive-container" style={{ height: 'auto' }}>
        {/* Left side - Title and features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:w-1/3 p-4 xl:p-5 flex flex-col xl:sticky xl:top-20 self-start"
          style={{ ...leftColumnStyles, maxHeight: 'calc(100vh - 84px)' }}
        >
          {/* Title styled to match homepage hero */}
          <div className="homepage-style-title mb-3 xl:mb-4 text-center xl:text-left" style={titleStyles}>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              <span className="title-wrapper">Submit a <span className="text-blue-300">New File</span></span>
            </h1>
          </div>

          <div className="subtitle-wrapper w-full" style={subtitleStyles}>
            <p className="homepage-style-subtitle text-lg text-white/90 mb-3 xl:mb-4 leading-relaxed text-center xl:text-left">
              Create a new file for properties under contract with our streamlined intake form.
            </p>
          </div>

          {/* Features in glass cards - only shown on desktop layouts */}
          <div className="space-y-3 mt-2 hidden xl:block">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="feature-glass-card bg-blue-900/95 backdrop-blur-xl border border-blue-700/30 rounded-lg p-4 flex items-start hover:bg-blue-800/90 hover:border-blue-600/40 transition-all"
              >
                <div className="transaction-portal-feature-icon mr-3 mt-1 text-blue-300">
                  <feature.icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step indicators */}
          <div className="steps-container w-full flex justify-center xl:justify-start" style={stepsContainerStyles}>
            <div className="transaction-portal-steps mt-4 xl:mt-8 mx-auto xl:mx-0" style={{ overflowY: 'hidden' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(step => (
                <div
                  key={step}
                  className={`transaction-portal-step ${step === currentStep ? 'transaction-portal-step-active' : ''}`}
                  onClick={() => handleStepClick(step)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right side - Transaction Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="xl:w-2/3 flex-grow mt-4 xl:mt-0"
          style={{ minHeight: '600px' }}
        >
          <div className="transaction-portal-card h-full flex flex-col">
            <div className="top-wizard-container z-20 sticky top-0 bg-blue-900/95 backdrop-blur-xl px-4 py-2 rounded-t-xl border-b border-blue-700/30">
              <div className="flex justify-between overflow-x-auto space-x-2 py-1 scrollbar-hide">
                {[
                  { id: 1, title: "Agent Role" },
                  { id: 2, title: "Property" },
                  { id: 3, title: "Clients" },
                  { id: 4, title: "Commission" },
                  { id: 5, title: "Details" },
                  { id: 6, title: "Documents" },
                  { id: 7, title: "Additional" },
                  { id: 8, title: "Review" },
                  { id: 9, title: "Sign" }
                ].map(step => (
                  <button
                    key={step.id}
                    className={`flex items-center justify-center rounded-full min-w-8 h-8 text-xs font-medium transition-all tooltip-container
                      ${step.id === currentStep
                        ? 'bg-blue-500 text-white shadow-md'
                        : step.id < currentStep
                          ? 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                          : 'bg-blue-800/50 text-blue-200/50'}`}
                    aria-current={step.id === currentStep ? "step" : undefined}
                    data-step-name={step.title}
                    data-completed={step.id < currentStep ? "true" : "false"}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <span>{step.id}</span>
                    <span className="tooltip">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main form content with TransactionForm component */}
            <div className="transaction-portal-form-container flex-grow overflow-y-auto">
              <TransactionForm />
            </div>
          </div>
        </motion.div>
      </div>
    </TransactionHero>
  );
};