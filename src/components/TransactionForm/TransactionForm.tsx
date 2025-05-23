import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AgentRole, Client } from '@/types/transaction';
// All TransactionForm CSS is now consolidated in src/styles/pages/transaction-form.css

// Import components
import { RoleSelection } from "@/components/TransactionForm/RoleSelection";
import { PropertyInformation } from "@/components/TransactionForm/PropertyInformation";
import { ClientInformation } from "@/components/TransactionForm/ClientInformation";
import { CommissionSection } from "@/components/TransactionForm/CommissionSectionImproved";
import { DocumentsSection } from "@/components/TransactionForm/DocumentsSection";
import { PropertyDetailsSection } from "@/components/TransactionForm/PropertyDetailsSectionImproved";
import { AdditionalInfoSection } from "@/components/TransactionForm/AdditionalInfoSection";
import { SignatureSection } from "@/components/TransactionForm/SignatureSection";
import { ReviewSection } from "@/components/TransactionForm/ReviewSection";
import { SubmissionProgress } from "@/components/TransactionForm/SubmissionProgress";
import { MobileNavBar } from "@/components/TransactionForm/MobileNavBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send, Save, RefreshCw } from "lucide-react";

// Import dialog components and hooks
import { ResetFormDialog } from "./ResetFormDialog";
import { CustomValidationDialog } from "./CustomValidationDialog";
import { useTransactionForm } from "@/hooks/useTransactionForm";
import { useToast } from "@/hooks/use-toast";

// Import CSS via centralized helper
import { ensureCssImported } from "../FixedCssImport";

// Import styling
import '../../styles/pages/transaction-form.css';
import '../../styles/pages/form-ui-fixes.css';

// Ensure CSS is imported
ensureCssImported();

// Add inline style to fix dropdowns
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
`;

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Define the form steps for the StepWizard
const formSteps = [
  { id: 1, title: "Agent Role", icon: "user" },
  { id: 2, title: "Property", icon: "home" },
  { id: 3, title: "Clients", icon: "users" },
  { id: 4, title: "Commission", icon: "dollar-sign" },
  { id: 5, title: "Property Details", icon: "clipboard" },
  { id: 6, title: "Documents", icon: "file-text" },
  { id: 7, title: "Additional Info", icon: "info" },
  { id: 8, title: "Review", icon: "check-circle" },
  { id: 9, title: "Signature", icon: "pen-tool" }
];

export function TransactionForm() {
  const { toast, dismiss } = useToast();
  const {
    currentStep,
    setCurrentStep,
    agentData,
    setAgentData,
    propertyData,
    setPropertyData,
    clients,
    setClients,
    commissionData,
    setCommissionData,
    propertyDetails,
    setPropertyDetails,
    titleData,
    setTitleData,
    additionalInfo,
    setAdditionalInfo,
    signatureData,
    setSignatureData,
    documentsData,
    setDocumentsData,
    handleStepClick,
    handleNext,
    handlePrevious,
    handleSubmit: submitTransaction,
    submitting,
    showProgressOverlay,
    closeProgressOverlay,
    submissionSteps,
    currentSubmissionStep,
    submissionError,
    skippedFields,
    getAllSkippedFields,
    isFieldSkipped,
    showValidationUI,
    validationErrors,
    handleContinueWithErrors,
    handleFixValidationError,
    closeValidationUI
  } = useTransactionForm();

  // Add a ref for the form container
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Add global styles to fix dropdowns
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.id = 'transaction-form-global-styles';

    // Add CSS rules
    styleElement.textContent = `
      /* Global dropdown fixes */
      select,
      select option,
      .select__control,
      .select__menu,
      .select__option,
      [data-status],
      .form-select {
        background-color: white !important;
        color: #1e3a8a !important;
        opacity: 1 !important;
        -webkit-appearance: menulist !important;
        appearance: menulist !important;
        background: white !important;
      }

      /* Custom scrollbar styling */
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(30, 58, 138, 0.1);
        border-radius: 4px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(59, 130, 246, 0.5);
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(59, 130, 246, 0.7);
      }

      /* Firefox scrollbar styling */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(59, 130, 246, 0.5) rgba(30, 58, 138, 0.1);
      }

      /* Direct fix for specific dropdown fields */
      select[name="propertyStatus"],
      select[name="updateMls"],
      select[name="isBuiltBefore1978"],
      select[name="propertyAccessType"] {
        background-color: white !important;
        background: white !important;
        color: #1e3a8a !important;
        opacity: 1 !important;
        border: 1px solid rgba(59, 130, 246, 0.5) !important;
      }

      /* Fix for shadcn/ui Select components */
      [data-radix-select-trigger],
      [role="combobox"],
      button[id="status"],
      button[id="updateMls"],
      button[id="builtBefore1978"],
      button[id="propertyAccessType"],
      button[id="isWinterized"] {
        background-color: white !important;
        background: white !important;
        color: #1e3a8a !important;
        opacity: 1 !important;
        border: 1px solid rgba(59, 130, 246, 0.5) !important;
      }

      /* Ensure these fields always have a white background */
      .transaction-form-container .property-status-field select,
      .transaction-form-container .update-mls-field select,
      .transaction-form-container .built-before-field select,
      .transaction-form-container .property-access-field select {
        background-color: white !important;
        background: white !important;
      }
    `;

    // Add to document head
    document.head.appendChild(styleElement);

    // Clean up
    return () => {
      const existingStyle = document.getElementById('transaction-form-global-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // Apply dropdown styling directly to all select elements
  useEffect(() => {
    const applySelectStyles = () => {
      if (formContainerRef.current) {
        const selectElements = formContainerRef.current.querySelectorAll('select');
        selectElements.forEach(select => {
          select.style.backgroundColor = 'white';
          select.style.color = '#1e3a8a';
          select.style.opacity = '1';
          select.style.appearance = 'menulist';
          select.style.webkitAppearance = 'menulist';
          select.style.background = 'white';
          select.style.borderColor = 'rgba(59, 130, 246, 0.5)';

          // Add data attribute to help with CSS targeting
          select.setAttribute('data-styled', 'true');

          // Force the background to be white by adding an inline style element
          const optionElements = select.querySelectorAll('option');
          optionElements.forEach(option => {
            option.style.backgroundColor = 'white';
            option.style.color = '#1e3a8a';
            option.style.opacity = '1';
          });
        });
      }
    };

    // Apply styles initially
    applySelectStyles();

    // Set up a mutation observer to apply styles to any new select elements
    const observer = new MutationObserver(applySelectStyles);

    if (formContainerRef.current) {
      observer.observe(formContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [currentStep]);

  // Add functionality to save form draft
  const handleSaveDraft = () => {
    try {
      const formData = {
        agentData,
        propertyData,
        clients,
        commissionData,
        propertyDetails,
        titleData,
        additionalInfo,
        signatureData,
        documentsData,
        currentStep
      };
      
      localStorage.setItem('transactionFormDraft', JSON.stringify(formData));

      // Create a timestamp for the save
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Show toast with more specific information
      toast({
        title: "Draft saved successfully",
        description: `Your form progress was saved at ${timeString}. You can return to this form later.`,
        variant: "default",
      });
      
      // Save the timestamp of the last manual save
      localStorage.setItem('lastManualSave', now.toString());
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Error saving draft",
        description: "There was a problem saving your draft. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get the selectedRole from agentData
  const selectedRole: AgentRole | undefined = agentData?.role || undefined;

  // Create a function to update the role
  const setSelectedRole = (role: AgentRole) => {
    setAgentData(prev => ({ ...prev, role }));
  };

  // Function to navigate to step with missing field
  const handleFixField = (field: string) => {
    // First, log the field for debugging
    console.log(`Attempting to navigate to field: ${field}`);

    // Clean field name - remove any nested structure notation
    const cleanField = field.includes('.') ? field.split('.').pop() || field : field;

    // Map field names to their corresponding steps - expanded with more field variations
    const fieldToStepMapping: Record<string, number> = {
      // Agent fields - Step 1
      'role': 1,
      'agentRole': 1,

      // Property fields - Step 2
      'address': 2,
      'propertyAddress': 2,
      'mlsNumber': 2,
      'mls': 2,
      'salePrice': 2,
      'price': 2,
      'closingDate': 2,
      'closing': 2,
      'county': 2,
      'propertyType': 2,
      'status': 2,
      'propertyStatus': 2,
      'propertyAccessType': 2,
      'accessType': 2,
      'lockboxAccessCode': 2,
      'lockbox': 2,
      'accessCode': 2,
      'isWinterized': 2,
      'isBuiltBefore1978': 2,
      'updateMls': 2,

      // Client fields - Step 3
      'clients': 3,
      'client': 3,
      'clientType': 3,
      'name': 3,
      'phone': 3,
      'email': 3,
      'maritalStatus': 3,
      'clientAddress': 3,

      // Commission fields - Step 4
      'totalCommissionPercentage': 4,
      'totalCommission': 4,
      'listingAgentPercentage': 4,
      'listingAgent': 4,
      'buyersAgentPercentage': 4,
      'buyersAgent': 4,
      'brokerFee': 4,
      'brokerFeeAmount': 4,
      'hasBrokerFee': 4,
      'sellersAssist': 4,
      'hasSellersAssist': 4,
      'sellerPaidAmount': 4,
      'buyerPaidAmount': 4,
      'isReferral': 4,
      'referralParty': 4,
      'brokerEin': 4,
      'referralFee': 4,
      'coordinatorFeePaidBy': 4,

      // Property Details fields - Step 5
      'municipality': 5,
      'hoaName': 5,
      'hoa': 5,
      'coRequired': 5,
      'co': 5,
      'resaleCertRequired': 5,
      'resaleCert': 5,
      'firstRightOfRefusal': 5,
      'firstRightName': 5,
      'attorneyRepresentation': 5,
      'attorneyName': 5,
      'homeWarranty': 5,
      'warrantyCompany': 5,
      'warrantyCost': 5,
      'warrantyPaidBy': 5,
      'titleCompany': 5,

      // Documents fields - Step 6
      'documents': 6,
      'confirmDocuments': 6,

      // Additional Info fields - Step 7
      'notes': 7,
      'specialInstructions': 7,
      'urgentIssues': 7,
      'additionalInfo': 7,

      // Review - Step 8
      'review': 8,

      // Signature fields - Step 9
      'agentName': 9,
      'signature': 9,
      'infoConfirmed': 9,
      'termsAccepted': 9,
      'dateSubmitted': 9
    };

    // First try exact match
    let step = fieldToStepMapping[field];

    // If not found, try with the cleaned field name
    if (!step && cleanField !== field) {
      step = fieldToStepMapping[cleanField];
    }

    // If still not found, try to find a partial match
    if (!step) {
      // Look for partial matches in the field names
      const partialMatches = Object.keys(fieldToStepMapping).filter(key =>
        field.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(field.toLowerCase())
      );

      if (partialMatches.length > 0) {
        // Use the first match if multiple are found
        step = fieldToStepMapping[partialMatches[0]];
        console.log(`Using partial match: ${partialMatches[0]} for field: ${field}`);
      }
    }

    if (step) {
      setCurrentStep(step);
      // Only show toast for direct "Fix" clicks, not for validation bypass navigation
      if (window.location.hash !== '#bypassingValidation') {
        toast({
          title: "Navigating to field",
          description: `Now fix the missing "${field}" field in step ${step}.`,
          variant: "default",
        });
      }

      // Add a temporary hash to prevent duplicate toasts
      window.location.hash = '';
    } else {
      console.error(`No mapping found for field: ${field}`);

      // If we still can't find it, use a fallback based on field naming patterns
      let fallbackStep = 0;

      if (field.toLowerCase().includes('client')) fallbackStep = 3;
      else if (field.toLowerCase().includes('property')) fallbackStep = 2;
      else if (field.toLowerCase().includes('commission') || field.toLowerCase().includes('fee')) fallbackStep = 4;
      else if (field.toLowerCase().includes('warranty') || field.toLowerCase().includes('title')) fallbackStep = 5;
      else if (field.toLowerCase().includes('document')) fallbackStep = 6;
      else if (field.toLowerCase().includes('signature') || field.toLowerCase().includes('confirm')) fallbackStep = 9;

      if (fallbackStep > 0) {
        setCurrentStep(fallbackStep);
        toast({
          title: "Field located",
          description: `Please fix the "${field}" field in this section.`,
          variant: "default",
        });
      } else {
        // As a last resort, just show the missing fields
        toast({
          title: "Field not found",
          description: `Please check all form sections for missing fields.`,
          variant: "default",
        });
      }
    }
  };

  // Modify the resetForm function
  const resetForm = () => {
    // Clear localStorage first to ensure draft is removed
    localStorage.removeItem('transactionFormDraft');
    localStorage.removeItem('documentsValidated');

    // Reset all form state
    setAgentData({
      role: "LISTING AGENT",
      name: "",
      email: "",
      phone: "",
    });
    setPropertyData({
      mlsNumber: "",
      address: "",
      salePrice: "",
      status: "OCCUPIED",
      isWinterized: "NO",
      updateMls: "NO",
      propertyAccessType: "ELECTRONIC LOCKBOX",
      lockboxAccessCode: "",
      county: "",
      propertyType: "RESIDENTIAL",
      isBuiltBefore1978: "",
      closingDate: "",
    });
    setClients([]);
    setCommissionData({
      totalCommissionPercentage: "",
      listingAgentPercentage: "",
      buyersAgentPercentage: "",
      hasBrokerFee: false,
      brokerFeeAmount: "",
      sellerPaidAmount: "",
      buyerPaidAmount: "",
      hasSellersAssist: false,
      sellersAssist: "",
      isReferral: false,
      referralParty: "",
      brokerEin: "",
      referralFee: "",
      coordinatorFeePaidBy: "client"
    });
    setPropertyDetails({
      resaleCertRequired: false,
      hoaName: "",
      coRequired: false,
      municipality: "",
      firstRightOfRefusal: false,
      firstRightName: "",
      attorneyRepresentation: false,
      attorneyName: "",
      homeWarranty: false,
      warrantyCompany: "",
      warrantyCost: "",
      warrantyPaidBy: "SELLER",
    });
    setTitleData({
      titleCompany: "",
      name: "",
      contactName: "",
      contactPhone: ""
    });
    setAdditionalInfo({
      specialInstructions: "",
      urgentIssues: "",
      notes: ""
    });
    setSignatureData({
      signature: "",
      infoConfirmed: false,
      termsAccepted: false,
      agentName: "",
      dateSubmitted: new Date().toISOString().split('T')[0],
    });
    setDocumentsData({
      documents: [],
      confirmDocuments: false
    });
    setCurrentStep(1);

    // Dismiss any existing toasts
    dismiss();

    // Show confirmation toast with shorter duration
    toast({
      title: "Form Reset",
      description: "The form has been reset to its initial state.",
      variant: "default",
      duration: 2000, // 2 seconds instead of 3
    });
  };

  const handleSubmit = async () => {
    try {
      // Use the renamed submitTransaction function from useTransactionForm
      await submitTransaction();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  // Since we added the Signature section as a separate step, adjust the total steps
  const totalSteps = 9;

  // Create a ref for the form content
  const formContentRef = React.useRef<HTMLDivElement>(null);

  // Handle resize events for responsive behavior
  useEffect(() => {
    // Add listener for resize events
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fixed version with null check for targetElement and improve scroll behavior
  useEffect(() => {
    // Only scroll to form content if needed
    if (formContentRef.current && formContainerRef.current) {
      const formContent = formContentRef.current;
      const viewportHeight = window.innerHeight;
      const formContentRect = formContent.getBoundingClientRect();
      
      // Only scroll if the top of the form content is not already visible in the viewport
      // or if it's very close to the top edge
      if (formContentRect.top < 50) {
        // Scroll only the form container if it's a scrollable container
        const container = formContainerRef.current.querySelector('.custom-scrollbar');
        if (container) {
          container.scrollTop = 0;
        }
      }
    }
  }, [currentStep]);

  // Custom step click handler that adds intelligent scroll behavior
  const handleCustomStepClick = (step: number) => {
    // Check if scrolling is needed before changing step
    if (formContentRef.current) {
      const formContent = formContentRef.current;
      const formContentRect = formContent.getBoundingClientRect();
      
      // Only scroll if the top of the form content is not already visible
      if (formContentRect.top < 50) {
        // For mobile devices, ensure container scrolls to top
        const container = formContainerRef.current?.querySelector('.custom-scrollbar');
        if (container) {
          container.scrollTop = 0;
        }
      }
    }
    
    // Apply the step change
    handleStepClick(step);
  };

  // Add the onChange handler for clients
  const clientsOnChange = (updatedClients: Client[]) => {
    setClients(updatedClients);
  };

  // Wrapper function to avoid naming conflicts
  const getSkippedFieldList = () => {
    return getAllSkippedFields();
  };

  // Enhanced navigation functions with improved scrolling
  const enhancedHandleNext = () => {
    // Only force scroll if the form top isn't already visible
    if (formContentRef.current) {
      const formContent = formContentRef.current;
      const formContentRect = formContent.getBoundingClientRect();
      
      // Only scroll if the top of the form content is not already visible or is close to the top edge
      if (formContentRect.top < 50) {
        // For mobile devices, ensure container scrolls to top
        const container = formContainerRef.current?.querySelector('.custom-scrollbar');
        if (container) {
          container.scrollTop = 0;
        }
      }
    }
    
    // Apply the step change
    handleNext();
  };

  const enhancedHandlePrevious = () => {
    // Apply the step change directly
    handlePrevious();
  };

  // Listen for vertical step wizard clicks
  useEffect(() => {
    const handleVerticalStepClick = (event: CustomEvent) => {
      if (event.detail && event.detail.step) {
        setCurrentStep(event.detail.step);
      }
    };

    // Add event listener
    window.addEventListener('verticalStepClick' as any, handleVerticalStepClick);

    // Cleanup
    return () => {
      window.removeEventListener('verticalStepClick' as any, handleVerticalStepClick);
    };
  }, []);

  // Emit step change events
  useEffect(() => {
    // Notify the parent component of step changes
    const event = new CustomEvent('stepChange', {
      detail: { step: currentStep }
    });
    window.dispatchEvent(event);
  }, [currentStep]);

  // Set the data attribute when component mounts and remove on unmount
  useEffect(() => {
    document.body.setAttribute('data-transaction-page', 'true');

    return () => {
      document.body.removeAttribute('data-transaction-page');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Add style tag for dropdown fixes */}
        <style dangerouslySetInnerHTML={{ __html: fixDropdownStyles }} />

        <div ref={formContainerRef} className="transaction-form-container flex flex-col bg-blue-900/95 rounded-xl shadow-md">
          <div className="container mx-auto px-1 sm:px-3 py-1 sm:py-3 flex-grow flex flex-col overflow-visible" style={{ height: 'auto', minHeight: '400px' }}>
            {/* Main form container with enhanced visual design */}
            <div ref={formContentRef} className="modern-form-container bg-transparent rounded-xl p-2 sm:p-3 border-0 relative flex flex-col flex-grow" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
              {/* Decorative corner accents for visual polish */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/20 rounded-tl-xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/20 rounded-tr-xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/10 rounded-bl-xl pointer-events-none hidden md:block"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-500/10 rounded-br-xl pointer-events-none hidden md:block"></div>

              {/* Form Content with section fade-in effect */}
              <div className="space-y-4 section-fade-in flex-grow overflow-visible min-h-[400px] pb-16" style={{ backgroundColor: 'transparent' }}>
                {currentStep === 1 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Enhanced section header with icon and gradient accent */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 shadow-md mr-2 border border-white/20">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M14.5 22V12C14.5 10.8954 13.6046 10 12.5 10H6.5C5.39543 10 4.5 10.8954 4.5 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.5 22H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.5 22V6C19.5 4.89543 18.6046 4 17.5 4H14.5C13.3954 4 12.5 4.89543 12.5 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7.5 22V17H11.5V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white">Select Your Role</h2>
                      </div>
                      <div className="border-t border-white/10 my-2"></div>
                      <p className="text-white/80 text-xs sm:text-sm pl-2 border-l-4 border-white/30 ml-1">
                        This form will guide you through submitting a new real estate transaction. Please select your role to get started.
                      </p>
                    </div>
                    <div className="flex-grow flex flex-col justify-center py-8">
                      <RoleSelection
                        selectedRole={agentData.role}
                        onRoleChange={(value) => setAgentData(prev => ({ ...prev, role: value }))}
                        agentName={agentData.name}
                        onAgentNameChange={(value) => {
                          setAgentData(prev => ({ ...prev, name: value }));
                          // Also update the signature data to keep it in sync
                          setSignatureData(prev => ({ ...prev, agentName: value }));
                        }}
                      />
                    </div>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Property Information section header with home icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Property Information</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Enter property details for this transaction.
                      </p>
                    </div>
                    <div className="flex-grow py-6">
                      <PropertyInformation
                        data={propertyData}
                        onChange={(field, value) => setPropertyData(prev => ({ ...prev, [field]: value }))}
                        role={agentData.role}
                      />
                    </div>
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Client Information section header with people icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Client Information</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Provide information about the client(s).
                      </p>
                    </div>
                    <ClientInformation
                      clients={clients}
                      onChange={clientsOnChange}
                      role={agentData.role}
                    />
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Commission Details section header with money icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 9.35C14.5 8.8 13.33 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C13.33 16 14.5 15.2 15 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 15V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Commission Details</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Enter commission and fee details.
                      </p>
                    </div>
                    <CommissionSection
                      data={commissionData}
                      onChange={(field, value) => setCommissionData(prev => ({ ...prev, [field]: value }))}
                      role={agentData.role}
                    />
                  </>
                )}
                {currentStep === 5 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Property & Title section header with document icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Property & Title</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Provide property and title company information.
                      </p>
                    </div>
                    <PropertyDetailsSection
                      data={propertyDetails}
                      onChange={(field, value) => setPropertyDetails(prev => ({ ...prev, [field]: value }))}
                      role={agentData.role}
                      titleData={titleData}
                      onTitleChange={(field, value) => setTitleData(prev => ({ ...prev, [field]: value }))}
                    />
                  </>
                )}
                {currentStep === 6 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Required Documents section header with clipboard icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Required Documents</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Required documents for this transaction.
                      </p>
                    </div>
                    <DocumentsSection
                      data={documentsData}
                      onChange={(field, value) => setDocumentsData(prev => ({ ...prev, [field]: value }))}
                      role={agentData.role}
                      titleData={titleData}
                      propertyData={propertyData}
                      commissionData={commissionData}
                    />
                  </>
                )}
                {currentStep === 7 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Additional Information section header with info icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Additional Information</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Any additional information or special instructions.
                      </p>
                    </div>
                    <AdditionalInfoSection
                      data={additionalInfo}
                      onChange={(field, value) => setAdditionalInfo(prev => ({ ...prev, [field]: value }))}
                    />
                  </>
                )}
                {currentStep === 8 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Review Transaction section header with magnifying glass icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 shadow-md mr-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Review Transaction</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/30 ml-1">
                        Please review your transaction details before proceeding to sign and submit.
                      </p>
                    </div>

                    {/* Review Section with enhanced styling */}
                    <div className="max-w-5xl mx-auto">
                      <div className="rounded-xl p-4 shadow-lg relative overflow-hidden bg-[#0d1a36]">
                        {/* Subtle visual accent for review section */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
                        <div className="absolute -top-14 -right-14 w-28 h-28 bg-blue-500/10 rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full"></div>

                        {/* Missing Fields Warning is now handled within the ReviewSection component */}

                        <div className="mt-2">
                          <ReviewSection
                            data={{
                              agentData,
                              propertyData,
                              clients,
                              commissionData,
                              propertyDetailsData: propertyDetails,
                              titleData,
                              additionalInfo,
                              signatureData,
                              documentsData
                            }}
                            skippedFields={getSkippedFieldList()}
                            onFieldFix={handleFixField}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 9 && (
                  <>
                    <div id="section-title" className="pt-1 md:pt-2 mb-2 sm:mb-3 pb-1 sm:pb-2">
                      {/* Sign & Submit section header with pen icon */}
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 shadow-md mr-2 animated-badge">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 2L9.586 9.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Sign & Submit</h2>
                      </div>
                      <div className="fancy-divider my-2"></div>
                      <p className="text-blue-100 text-xs sm:text-sm pl-2 border-l-4 border-blue-500/40 ml-1">
                        Please sign below to confirm all information is correct and to submit your transaction.
                      </p>
                    </div>

                    {/* Signature Section with enhanced styling */}
                    <div className="w-full">
                      <div className="bg-transparent rounded-xl p-4 border border-slate-700/30 shadow-lg relative overflow-hidden">
                        {/* Subtle visual accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
                        <div className="absolute -top-14 -right-14 w-28 h-28 bg-green-500/10 rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-green-500/10 rounded-full"></div>

                        <SignatureSection
                          data={signatureData}
                          onChange={(field, value) => setSignatureData(prev => ({ ...prev, [field]: value }))}
                          role={agentData.role}
                          skippedFields={[]}
                          onFieldFix={handleFixField}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Form actions bar - Hidden on mobile */}
              <div className="form-actions-bar relative pt-3 border-t border-gray-200 z-10 bg-white hidden sm:block">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center">
                    {/* Reset form button with enhanced styling */}
                    <ResetFormDialog onReset={resetForm} />
                    {/* Autosave indicator */}
                    <span className="text-xs text-gray-500 ml-3 flex items-center">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin opacity-40" />
                      Autosave enabled
                    </span>
                  </div>

                  {/* Form navigation buttons */}
                  <div className="flex items-center space-x-2 mt-0 form-navigation-buttons">
                    <Button
                      variant="outline"
                      className={`${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity h-8 text-sm shadow-sm bg-white border-blue-200 text-blue-700`}
                      onClick={enhancedHandlePrevious}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="mr-1 h-3 w-3" />
                      Previous
                    </Button>

                    {currentStep < 9 ? (
                      <Button
                        onClick={enhancedHandleNext}
                        className="bg-blue-600 hover:bg-blue-700 h-8 text-sm shadow-sm"
                      >
                        Next Step
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        className="bg-green-600 hover:bg-green-700 h-8 text-sm shadow-sm relative group overflow-hidden"
                        disabled={submitting || !signatureData.signature || !signatureData.infoConfirmed || !signatureData.termsAccepted}
                      >
                        <span className="relative flex items-center">
                          {submitting ? 'Submitting...' : 'Submit Transaction'}
                          <Send className="ml-1 h-3 w-3" />
                        </span>
                      </Button>
                    )}
                  </div>

                  {/* Save as draft button - moved to the side */}
                  <div className="relative hidden md:block">
                    <Button
                      variant="outline"
                      className="h-8 text-sm text-blue-600 border-blue-200 hover:bg-blue-50 shadow-sm"
                      onClick={handleSaveDraft}
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save Draft
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Navigation - Fixed at bottom - Only visible on mobile */}
            <MobileNavBar
              className="sm:hidden"
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={enhancedHandlePrevious}
              onNext={enhancedHandleNext}
              canGoNext={currentStep === 9 ? Boolean(signatureData.signature && signatureData.infoConfirmed && signatureData.termsAccepted) : true}
              isLastStep={currentStep === 9}
              hasMissingFields={Boolean(getAllSkippedFields().length)}
              onSave={handleSaveDraft}
            />

            {/* Progress indicator */}
            {showProgressOverlay && (
              <SubmissionProgress
                steps={submissionSteps}
                currentStep={currentSubmissionStep}
                error={submissionError}
                onClose={closeProgressOverlay}
                isOpen={showProgressOverlay}
              />
            )}

            {/* Toast containers */}
            <Toaster />
            <SonnerToaster position="top-center" />

            {/* Validation bypass component */}
            {showValidationUI && (
              <CustomValidationDialog
                errorCount={Object.keys(validationErrors).length}
                errors={validationErrors}
                onContinue={handleContinueWithErrors}
                onFix={handleFixField}
                onClose={closeValidationUI}
                isOpen={showValidationUI}
              />
            )}
          </div>

          {/* Enhanced elegant footer quote - moved outside the form container */}
          <div className="text-left mt-1 mb-1 px-3 md:flex md:justify-between md:items-center text-gray-400/70">
            <p className="italic font-light text-xs">
              Every transaction is a work of art, carefully crafted with expertise and precision
            </p>
            <div className="text-xs mt-0.5 md:mt-0">
              Powered by PA Real Estate Support Services
            </div>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
