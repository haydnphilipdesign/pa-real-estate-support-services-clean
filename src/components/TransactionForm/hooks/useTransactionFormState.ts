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
    contactPhone: '',
    contactEmail: ''
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
    signature: '',
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
    console.log('🔧 updateField called:', { field, value, valueType: typeof value });
    
    setFormData(prev => {
      console.log('🔍 Previous formData:', prev);
      let updatedData: TransactionFormData;
      
      // Handle nested field updates like 'propertyData.mlsNumber'
      if (field.includes('.')) {
        const [section, subField] = field.split('.');
        console.log('📝 Updating nested field:', { section, subField, value });
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
        console.log('📝 Updating direct field:', { field, value });
        updatedData = {
          ...prev,
          [field]: value,
          touchedFields: new Set([...(prev.touchedFields || []), field])
        };
      }
      
      console.log('✅ Updated formData:', updatedData);
      if (field === 'agentData.role') {
        console.log('🎭 Role update - new agentData:', updatedData.agentData);
      }
      
      // Clear validation error if the field becomes valid
      const updatedErrors = { ...prev.validationErrors };
      
      // Map field paths to error keys
      const getErrorKey = (fieldPath: string): string => {
        const fieldMappings: Record<string, string> = {
          'agentData.role': 'role',
          'agentData.name': 'agentName',
          'agentData.email': 'agentEmail',
          'agentData.phone': 'agentPhone',
          'signatureData.agentName': 'agentName',
          'signatureData.signature': 'signature',
          'signatureData.termsAccepted': 'termsAccepted',
          'signatureData.infoConfirmed': 'infoConfirmed',
          'propertyData.mlsNumber': 'mlsNumber',
          'propertyData.address': 'address',
          'propertyData.salePrice': 'salePrice',
          'titleData.titleCompany': 'titleCompany',
          'titleData.contactName': 'contactName',
          'titleData.contactPhone': 'contactPhone',
          'titleData.contactEmail': 'contactEmail'
        };
        
        return fieldMappings[fieldPath] || fieldPath.split('.').pop() || fieldPath;
      };
      
      const fieldErrorKey = getErrorKey(field);
      
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
      
      const airtableData = transformFormDataForAirtable(formData);
      const coverSheetData = transformFormDataForCoverSheet(formData);

      // Use the enhanced unified submission API
      console.log('Using enhanced transaction submission API...');
      const submissionResponse = await fetch('/api/submit-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
          tableId: 'tblHyCJCpQSgjn0md',
          formData: {
            // Send the original form data structure
            ...formData,
            // Include cover sheet data for PDF generation
            coverSheetData: coverSheetData
          }
        }),
      });

      if (!submissionResponse.ok) {
        const errorData = await submissionResponse.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      const submissionResult = await submissionResponse.json();
      console.log('Enhanced submission completed:', submissionResult);

      // Check if full workflow was successful
      if (submissionResult.success && submissionResult.details) {
        const { details } = submissionResult;
        
        // Enhanced success message based on what was completed
        let successMessage = 'Transaction submitted successfully!';
        if (details.pdfGenerated && details.emailSent && details.pdfUploaded) {
          successMessage = hasWarnings 
            ? 'Complete success! Transaction submitted, PDF generated and emailed, file uploaded to storage. Some optional fields were incomplete but your submission is valid.'
            : 'Complete success! Transaction submitted with all data, PDF generated and emailed, file securely stored.';
        } else if (details.pdfGenerated && details.emailSent) {
          successMessage = 'Transaction submitted and PDF emailed successfully. File storage encountered issues but data is saved.';
        } else if (details.pdfGenerated) {
          successMessage = 'Transaction submitted and PDF generated. Email delivery encountered issues but data is saved.';
        }

        toast({
          title: 'Submission Complete!',
          description: successMessage,
        });

        // Store submission details for reference
        localStorage.setItem('transaction-form-last-submission', JSON.stringify({
          recordId: submissionResult.recordId,
          pdfGenerated: details.pdfGenerated,
          emailSent: details.emailSent,
          pdfUploaded: details.pdfUploaded,
          pdfUrl: details.pdfUrl,
          timestamp: Date.now()
        }));
      } else {
        // Partial success - data was saved but some workflow steps failed
        toast({
          title: 'Data Saved',
          description: submissionResult.message || 'Transaction data saved but some processing steps encountered issues.',
          variant: 'default',
        });
      }

      // Clear any draft data since submission was successful
      localStorage.removeItem('transaction-form-draft');
      localStorage.removeItem('transaction-form-error-recovery');
      
      // Reset form after successful submission
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
        
        if (!isExpired && data && typeof data === 'object') {
          // Ensure touchedFields is properly handled
          const touchedFieldsArray = data.touchedFields || [];
          const touchedFieldsSet = Array.isArray(touchedFieldsArray) 
            ? new Set(touchedFieldsArray)
            : new Set();
          
          setFormData({
            ...initialFormData, // Start with clean initial data
            ...data, // Apply saved data
            touchedFields: touchedFieldsSet // Ensure Set is properly created
          });
          
          toast({
            title: 'Draft Loaded',
            description: 'Your previous progress has been restored',
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load draft:', error);
      // Clear corrupted draft
      localStorage.removeItem('transaction-form-draft');
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