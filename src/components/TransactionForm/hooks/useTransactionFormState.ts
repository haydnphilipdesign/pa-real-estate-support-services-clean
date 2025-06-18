/**
 * Transaction Form State Management Hook
 * 
 * Consolidates state management logic from large transaction form components
 * Provides clean separation between UI and business logic
 */

import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { validateStepPermissive } from '@/utils/validation';
import type { AgentRole, Client, PropertyData, CommissionData, PropertyDetailsData, TitleCompanyData, AdditionalInfoData, SignatureData, DocumentsData, AgentData } from '@/types/transaction';
import { v4 as uuidv4 } from 'uuid';

export interface TransactionFormData {
  // Agent data
  agentData: AgentData;
  
  // Property information
  propertyData: PropertyData;
  
  // Client information
  clients: Client[];
  
  // Commission information
  commissionData: CommissionData;
  
  // Property details
  propertyDetailsData: PropertyDetailsData;
  
  // Title company information
  titleData: TitleCompanyData;
  
  // Documents
  documentsData: DocumentsData;
  
  // Additional info
  additionalInfo: AdditionalInfoData;
  
  // Signature
  signatureData: SignatureData;
  
  // Form state
  isSubmitting: boolean;
  currentStep: number;
  validationErrors: Record<string, string>;
  validationWarnings: Record<string, string>;
  missingFields: string[];
  touchedFields: Set<string>;
}

export const initialFormData: TransactionFormData = {
  agentData: {
    role: '', // No default role - user must explicitly select
    name: '',
    email: '',
    phone: ''
  },
  propertyData: {
    mlsNumber: '',
    address: '',
    salePrice: '',
    status: 'VACANT',
    isWinterized: 'NO',
    updateMls: 'NO',
    propertyAccessType: 'ELECTRONIC LOCKBOX',
    lockboxAccessCode: '',
    county: '',
    propertyType: 'RESIDENTIAL',
    isBuiltBefore1978: '',
    closingDate: ''
  },
  clients: [],
  commissionData: {
    totalCommissionPercentage: '',
    listingAgentPercentage: '',
    buyersAgentPercentage: '',
    hasBrokerFee: false,
    brokerFeeAmount: '',
    sellerPaidAmount: '',
    buyerPaidAmount: '',
    hasSellersAssist: false,
    sellersAssist: '',
    isReferral: false,
    referralParty: '',
    brokerEin: '',
    referralFee: '',
    coordinatorFeePaidBy: 'client'
  },
  propertyDetailsData: {
    resaleCertRequired: false,
    hoaName: '',
    coRequired: false,
    municipality: '',
    firstRightOfRefusal: false,
    firstRightName: '',
    attorneyRepresentation: false,
    attorneyName: '',
    homeWarranty: false,
    warrantyCompany: '',
    warrantyCost: '',
    warrantyPaidBy: 'SELLER'
  },
  titleData: {
    titleCompany: '',
    name: '',
    contactName: '',
    contactPhone: ''
  },
  documentsData: {
    documents: [],
    confirmDocuments: false
  },
  additionalInfo: {
    specialInstructions: '',
    urgentIssues: '',
    notes: ''
  },
  signatureData: {
    agentName: '',
    dateSubmitted: '',
    signatures: {},
    termsAccepted: false,
    infoConfirmed: false
  },
  isSubmitting: false,
  currentStep: 1,
  validationErrors: {},
  validationWarnings: {},
  missingFields: [],
  touchedFields: new Set(),
};

export interface TransactionFormActions {
  // Data updates
  updateField: (field: string, value: any) => void;
  updateClient: (index: number, client: Partial<Client>) => void;
  addClient: () => void;
  removeClient: (index: number) => void;
  
  // Navigation
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  
  // Validation
  validateStep: (step: number) => boolean;
  validateField: (field: string, value: any) => string | null;
  setFieldTouched: (field: string) => void;
  
  // Form operations
  saveDraft: () => Promise<void>;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

export interface UseTransactionFormStateResult {
  formData: TransactionFormData;
  actions: TransactionFormActions;
  stepConfig: {
    totalSteps: number;
    currentStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    canGoNext: boolean;
    canGoPrevious: boolean;
  };
}

const TOTAL_STEPS = 9;

export function useTransactionFormState(): UseTransactionFormStateResult {
  const [formData, setFormData] = useState<TransactionFormData>(initialFormData);
  const { toast } = useToast();

  // Helper function to validate a single field
  const validateSingleField = useCallback((fieldName: string, value: any, formData: TransactionFormData): boolean => {
    // Validation logic for specific fields
    switch (fieldName) {
      case 'role':
      case 'agentData.role':
        return !!(value && typeof value === 'string' && value.trim() !== '');
      
      case 'agentName':
      case 'agentData.name':
        return !!(value && typeof value === 'string' && value.trim() !== '');
      
      case 'propertyData.mlsNumber':
        if (!value || value.trim() === '') return false;
        return /^(PM-)?[0-9]{6}$/.test(value);
      
      case 'propertyData.address':
        return !!(value && typeof value === 'string' && value.trim() !== '');
      
      case 'propertyData.county':
        return !!(value && typeof value === 'string' && value.trim() !== '');
      
      case 'propertyData.salePrice':
        return !!(value && typeof value === 'string' && value.trim() !== '' && /^[0-9]*\.?[0-9]*$/.test(value));
      
      default:
        // For unknown fields, consider them valid if they have a value
        return !!(value !== null && value !== undefined && value !== '');
    }
  }, []);

  // Field update handler - supports nested updates and real-time validation
  const updateField = useCallback((field: string, value: any) => {
    // Debug logging for role field specifically
    if (field === 'agentData.role' || field === 'role') {
      console.log('=== Role Update Debug ===');
      console.log('Field:', field);
      console.log('Value:', value);
      console.log('Value type:', typeof value);
    }

    // Debug logging for property data fields
    if (field.startsWith('propertyData.') || field.startsWith('propertyDetailsData.')) {
      console.log('=== Property Data Update Debug ===');
      console.log('Field:', field);
      console.log('Value:', value);
    }

    setFormData(prev => {
      let updatedData: TransactionFormData;
      
      // Handle nested field updates like 'propertyData.mlsNumber'
      if (field.includes('.')) {
        const [section, subField] = field.split('.');
        updatedData = {
          ...prev,
          [section]: {
            ...prev[section as keyof TransactionFormData],
            [subField]: value
          },
          touchedFields: new Set([...(prev.touchedFields || []), field])
        };
      } else {
        // Handle direct field updates
        updatedData = {
          ...prev,
          [field]: value,
          touchedFields: new Set([...(prev.touchedFields || []), field])
        };
      }
      
      // Debug logging after update
      if (field === 'agentData.role' || field === 'role') {
        console.log('Updated agentData.role:', updatedData.agentData.role);
        console.log('Full agentData:', updatedData.agentData);
      }

      if (field.startsWith('propertyData.') || field.startsWith('propertyDetailsData.')) {
        console.log('Updated propertyData:', updatedData.propertyData);
        console.log('Updated propertyDetailsData:', updatedData.propertyDetailsData);
      }
      
      // Clear validation error if the field becomes valid
      const updatedErrors = { ...prev.validationErrors };
      const fieldErrorKey = field === 'agentData.role' ? 'role' : 
                           field === 'agentData.name' ? 'agentName' : field;
      
      if (validateSingleField(field, value, updatedData)) {
        delete updatedErrors[fieldErrorKey];
        updatedData.validationErrors = updatedErrors;
      }
      
      return updatedData;
    });
  }, [validateSingleField]);

  // Client management
  const updateClient = useCallback((index: number, clientUpdate: Partial<Client>) => {
    setFormData(prev => ({
      ...prev,
      clients: prev.clients.map((client, i) => 
        i === index ? { ...client, ...clientUpdate } : client
      )
    }));
  }, []);

  const addClient = useCallback(() => {
    const newClient: Client = {
      id: uuidv4(),
      name: '',
      email: '',
      phone: '',
      address: '',
      maritalStatus: 'SINGLE',
      type: 'BUYER'
    };
    
    setFormData(prev => ({
      ...prev,
      clients: [...prev.clients, newClient]
    }));
  }, []);

  const removeClient = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      clients: prev.clients.filter((_, i) => i !== index)
    }));
  }, []);

  // Navigation
  const nextStep = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, TOTAL_STEPS)
    }));
  }, []);

  const previousStep = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setFormData(prev => ({ ...prev, currentStep: step }));
    }
  }, []);

  // Validation
  const validateField = useCallback((field: string, value: any): string | null => {
    switch (field) {
      case 'agentData.role':
        return !value ? 'Please select your role' : null;
        
      case 'agentData.name':
        return !value || value.trim().length < 2 ? 'Agent name is required' : null;
      
      case 'propertyData.mlsNumber':
        if (!value) return 'MLS number is required';
        if (!/^(PM-)?[0-9]{6}$/.test(value)) return 'MLS number must be 6 digits (PM-123456 or 123456)';
        return null;
      
      case 'propertyData.address':
        return !value || value.length < 5 ? 'Valid property address is required' : null;
      
      case 'propertyData.salePrice':
        if (!value) return 'Sale price is required';
        if (isNaN(parseFloat(value))) return 'Sale price must be a valid number';
        return null;
        
      case 'propertyData.county':
        return !value ? 'County is required' : null;
        
      case 'propertyData.propertyType':
        return !value ? 'Property type is required' : null;
        
      case 'propertyData.closingDate':
        return !value ? 'Closing date is required' : null;
      
      case 'clients':
        if (!Array.isArray(value) || value.length === 0) {
          return 'At least one client is required';
        }
        for (const client of value) {
          if (!client.name) return 'Client name is required';
          if (!client.email) return 'Client email is required';
          if (!client.phone) return 'Client phone is required';
        }
        return null;
      
      default:
        return null;
    }
  }, []);

  const validateStep = useCallback((step: number, updateState = true): boolean => {
    // Transform form data to match validation function expectations
    const validationData = {
      agentData: formData.agentData,
      propertyData: formData.propertyData,
      clients: formData.clients,
      commissionData: formData.commissionData,
      propertyDetailsData: formData.propertyDetailsData,
      titleData: formData.titleData,
      additionalInfo: formData.additionalInfo,
      signatureData: formData.signatureData,
      documentsData: formData.documentsData
    };
    
    // Use the new permissive validation system
    const validationResult = validateStepPermissive(step, validationData);
    
    if (updateState) {
      setFormData(prev => ({ 
        ...prev, 
        validationErrors: validationResult.errors, // Only blocking errors
        validationWarnings: validationResult.warnings, // Non-blocking warnings
        missingFields: validationResult.missingFields 
      }));
    }
    
    // Return whether user can proceed (only blocked by critical errors)
    return validationResult.canProceed;
  }, [formData]);

  const setFieldTouched = useCallback((field: string) => {
    setFormData(prev => ({
      ...prev,
      touchedFields: new Set([...(prev.touchedFields || []), field])
    }));
  }, []);

  // Form operations
  const saveDraft = useCallback(async () => {
    try {
      // Save to localStorage as draft
      localStorage.setItem('transaction-form-draft', JSON.stringify({
        data: formData,
        timestamp: Date.now()
      }));
      
      toast({
        title: 'Draft Saved',
        description: 'Your progress has been saved locally',
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Unable to save draft',
        variant: 'destructive',
      });
    }
  }, [formData, toast]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    localStorage.removeItem('transaction-form-draft');
  }, []);

  const submitForm = useCallback(async () => {
    setFormData(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Validate all steps before submission
      let isValid = true;
      let hasWarnings = false;
      
      for (let step = 1; step <= TOTAL_STEPS; step++) {
        const stepValidation = validateStep(step, false);
        if (!stepValidation) {
          isValid = false;
          break;
        }
        // Check if there are any warnings
        if (Object.keys(formData.validationWarnings).length > 0) {
          hasWarnings = true;
        }
      }
      
      if (!isValid) {
        throw new Error('Please complete all required fields');
      }

      // Show progress notification
      toast({
        title: 'Submitting Transaction',
        description: 'Processing your submission...',
      });

      // Transform data for submission
      const { transformFormDataForAirtable, transformFormDataForCoverSheet } = await import('@/utils/formDataTransformer');
      const { submitToAirtable } = await import('@/utils/airtable');
      
      const airtableData = transformFormDataForAirtable(formData);
      const coverSheetData = transformFormDataForCoverSheet(formData);

      // Step 1: Submit to Airtable
      console.log('Submitting to Airtable...', airtableData);
      const airtableResult = await submitToAirtable(airtableData);
      console.log('Airtable submission successful:', airtableResult);
      
      // Step 2: Generate PDF Cover Sheet using the created record
      console.log('Generating PDF cover sheet for record:', airtableResult.recordId);
      
      try {
        const pdfResponse = await fetch('/api/generateCoverSheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tableId: airtableResult.tableId,
            recordId: airtableResult.recordId,
            agentRole: formData.agentData.role,
            sendEmail: true,
            data: coverSheetData // Fallback data in case Airtable fetch fails
          }),
        });

        if (!pdfResponse.ok) {
          const errorData = await pdfResponse.json();
          console.warn('PDF generation failed:', errorData);
          // Don't fail the entire submission if PDF generation fails
          toast({
            title: 'PDF Generation Warning',
            description: 'Data saved successfully, but PDF generation failed. Contact support if needed.',
            variant: 'default',
          });
        } else {
          const pdfResult = await pdfResponse.json();
          console.log('PDF generated successfully:', pdfResult);
          
          // Enhanced success message with PDF info
          toast({
            title: 'Complete Success!',
            description: hasWarnings 
              ? 'Transaction submitted, PDF generated, and email sent! Some optional fields were incomplete but your submission is valid.'
              : 'Transaction submitted successfully with complete information. PDF cover sheet generated and emailed.',
          });
          
          // Save the PDF info for reference
          localStorage.setItem('transaction-form-last-pdf', JSON.stringify({
            filename: pdfResult.filename,
            emailSent: pdfResult.emailSent,
            timestamp: Date.now()
          }));
          
          resetForm();
          return; // Early return for complete success
        }
      } catch (pdfError) {
        console.warn('PDF generation error:', pdfError);
        // Don't fail the entire submission
      }
      
      // Fallback success message (if PDF generation failed)
      toast({
        title: 'Partial Success',
        description: hasWarnings 
          ? 'Transaction data saved successfully! Some optional fields were incomplete. PDF generation failed - contact support if needed.'
          : 'Transaction data saved successfully! PDF generation failed - contact support if needed.',
      });

      // Save success state to localStorage for recovery if needed
      localStorage.setItem('transaction-form-last-success', JSON.stringify({
        timestamp: Date.now(),
        formData: formData,
        agentRole: formData.agentData.role
      }));
      
      resetForm();
    } catch (error) {
      console.error('Submission error:', error);
      
      // Save current form state for recovery
      localStorage.setItem('transaction-form-error-recovery', JSON.stringify({
        timestamp: Date.now(),
        formData: formData,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
      
      toast({
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'An error occurred during submission',
        variant: 'destructive',
      });
    } finally {
      setFormData(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [validateStep, toast, resetForm, formData]);

  // Load draft on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem('transaction-form-draft');
      if (draft) {
        const { data, timestamp } = JSON.parse(draft);
        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24 hours
        
        if (!isExpired) {
          setFormData({
            ...data,
            touchedFields: new Set(data.touchedFields || [])
          });
          toast({
            title: 'Draft Loaded',
            description: 'Your previous progress has been restored',
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load draft:', error);
    }
  }, [toast]);

  // Actions object
  const actions: TransactionFormActions = {
    updateField,
    updateClient,
    addClient,
    removeClient,
    nextStep,
    previousStep,
    goToStep,
    validateStep,
    validateField,
    setFieldTouched,
    saveDraft,
    resetForm,
    submitForm,
  };

  // Step configuration
  const stepConfig = {
    totalSteps: TOTAL_STEPS,
    currentStep: formData.currentStep,
    isFirstStep: formData.currentStep === 1,
    isLastStep: formData.currentStep === TOTAL_STEPS,
    canGoNext: Object.keys(formData.validationErrors).length === 0, // Only blocked by critical errors
    canGoPrevious: formData.currentStep > 1,
  };

  return {
    formData,
    actions,
    stepConfig,
  };
}