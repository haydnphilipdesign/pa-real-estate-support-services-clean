import { TransactionFormData, AgentRole } from "@/types/transaction";

/**
 * Enhanced Validation System
 * Provides comprehensive form validation with accessibility features
 */

// Centralized error messages dictionary
export const ValidationMessages = {
  required: (field: string) => `${field} is required`,
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number (10+ digits)",
  mls: "Invalid MLS format. Expected: PM-123456 or 123456",
  currency: "Please enter a valid amount",
  percentage: "Please enter a percentage between 0 and 100",
  date: "Please enter a valid date",
  dateRange: "Date must be within a reasonable range (up to 90 days)",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  pattern: (pattern: string) => `Must match pattern: ${pattern}`,
  custom: (message: string) => message
} as const;

// Field validation rules
export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  mls?: boolean;
  currency?: boolean;
  percentage?: boolean;
  date?: boolean;
  dateRange?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, data: TransactionFormData) => string | null;
  requiredWhen?: (data: TransactionFormData) => boolean;
}

// Field validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Enhanced validation functions
export const ValidationUtils = {
  email: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  phone: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  },

  mls: (mls: string): boolean => {
    return /^(PM-)?[0-9]{6}$/.test(mls);
  },

  currency: (value: string): boolean => {
    const num = parseFloat(value.replace(/[$,]/g, ''));
    return !isNaN(num) && num >= 0;
  },

  percentage: (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 100;
  },

  date: (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  },

  dateRange: (dateStr: string, maxDays: number = 90): boolean => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
    
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + maxDays);
    
    return date <= maxDate && date >= new Date();
  }
};

// Role-based field requirements
export const RoleBasedRequirements = {
  'BUYERS AGENT': {
    commission: ['buyersAgentPercentage'],
    documents: ['Agreement of Sale', 'Buyer\'s Agency Contract', 'Consumer Notice'],
    propertyDetails: ['titleCompany']
  },
  'LISTING AGENT': {
    commission: ['totalCommissionPercentage', 'listingAgentPercentage'],
    documents: ['Agreement of Sale', 'Listing Agreement', 'Consumer Notice', 'Seller\'s Property Disclosure'],
    propertyDetails: ['titleCompany']
  },
  'DUAL AGENT': {
    commission: ['totalCommissionPercentage', 'listingAgentPercentage', 'buyersAgentPercentage'],
    documents: ['Agreement of Sale', 'Dual Agency Disclosure', 'Consumer Notice'],
    propertyDetails: ['titleCompany']
  }
} as const;

// Validate a single field
export const validateField = (
  value: any,
  rules: ValidationRule,
  fieldName: string,
  data: TransactionFormData
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if field is required
  const isRequired = rules.required || (rules.requiredWhen && rules.requiredWhen(data));
  
  // Handle empty values
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    if (isRequired) {
      errors.push(ValidationMessages.required(fieldName));
    }
    return { isValid: errors.length === 0, errors, warnings };
  }

  // Apply validation rules
  if (rules.email && !ValidationUtils.email(value)) {
    errors.push(ValidationMessages.email);
  }

  if (rules.phone && !ValidationUtils.phone(value)) {
    errors.push(ValidationMessages.phone);
  }

  if (rules.mls && !ValidationUtils.mls(value)) {
    errors.push(ValidationMessages.mls);
  }

  if (rules.currency && !ValidationUtils.currency(value)) {
    errors.push(ValidationMessages.currency);
  }

  if (rules.percentage && !ValidationUtils.percentage(value)) {
    errors.push(ValidationMessages.percentage);
  }

  if (rules.date && !ValidationUtils.date(value)) {
    errors.push(ValidationMessages.date);
  }

  if (rules.dateRange && !ValidationUtils.dateRange(value)) {
    errors.push(ValidationMessages.dateRange);
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(ValidationMessages.minLength(rules.minLength));
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(ValidationMessages.maxLength(rules.maxLength));
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(ValidationMessages.pattern(rules.pattern.source));
  }

  if (rules.custom) {
    const customError = rules.custom(value, data);
    if (customError) {
      errors.push(customError);
    }
  }

  return { isValid: errors.length === 0, errors, warnings };
};

// Field validation schema
export const ValidationSchema = {
  // Agent Information
  agentRole: { required: true },
  agentName: { required: true, minLength: 2 },
  agentEmail: { email: true },
  agentPhone: { phone: true },

  // Property Information
  propertyAddress: { required: true, minLength: 10 },
  propertyCounty: { required: true },
  propertyType: { required: true },
  closingDate: { required: true, date: true, dateRange: true },
  salePrice: { currency: true },
  mlsNumber: { mls: true },

  // Client Information
  clientName: { required: true, minLength: 2 },
  clientEmail: { email: true },
  clientPhone: { phone: true },

  // Commission
  totalCommissionPercentage: {
    percentage: true,
    requiredWhen: (data: TransactionFormData) => 
      data.agentData?.role === 'LISTING AGENT' || data.agentData?.role === 'DUAL AGENT'
  },
  listingAgentPercentage: {
    percentage: true,
    requiredWhen: (data: TransactionFormData) => 
      data.agentData?.role === 'LISTING AGENT' || data.agentData?.role === 'DUAL AGENT'
  },
  buyersAgentPercentage: {
    percentage: true,
    requiredWhen: (data: TransactionFormData) => 
      data.agentData?.role === 'BUYERS AGENT' || data.agentData?.role === 'DUAL AGENT'
  },

  // Property Details
  hoaName: {
    requiredWhen: (data: TransactionFormData) => 
      data.propertyDetailsData?.resaleCertRequired === true
  },
  municipality: {
    requiredWhen: (data: TransactionFormData) => 
      data.propertyDetailsData?.coRequired === true
  },
  firstRightName: {
    requiredWhen: (data: TransactionFormData) => 
      data.propertyDetailsData?.firstRightOfRefusal === true
  },
  attorneyName: {
    requiredWhen: (data: TransactionFormData) => 
      data.propertyDetailsData?.attorneyRepresentation === true
  },
  warrantyCompany: {
    requiredWhen: (data: TransactionFormData) => 
      data.propertyDetailsData?.homeWarranty === true
  },
  warrantyCost: {
    currency: true,
    requiredWhen: (data: TransactionFormData) => 
      data.propertyDetailsData?.homeWarranty === true
  },

  // Documents
  confirmDocuments: { required: true },

  // Signature
  agentSignatureName: { required: true, minLength: 2 },
  signature: { required: true },
  infoConfirmed: { required: true },
  termsAccepted: { required: true }
} as const;

// Enhanced step validation
export const validateStepEnhanced = (
  step: number,
  data: TransactionFormData
): { errors: Record<string, string[]>; isValid: boolean; missingFields: string[] } => {
  const errors: Record<string, string[]> = {};
  const missingFields: string[] = [];

  const addError = (field: string, error: string) => {
    if (!errors[field]) errors[field] = [];
    errors[field].push(error);
    if (!missingFields.includes(field)) {
      missingFields.push(field);
    }
  };

  // Step-specific validation logic
  switch (step) {
    case 1: // Agent Information
      const agentResult = validateField(data.agentData?.role, { required: true }, 'Agent Role', data);
      if (!agentResult.isValid) {
        agentResult.errors.forEach(error => addError('role', error));
      }
      break;

    case 2: // Property Information
      ['propertyAddress', 'propertyCounty', 'propertyType', 'closingDate'].forEach(field => {
        const value = data.propertyData?.[field as keyof typeof data.propertyData];
        const schema = ValidationSchema[field as keyof typeof ValidationSchema];
        if (schema) {
          const result = validateField(value, schema, field, data);
          if (!result.isValid) {
            result.errors.forEach(error => addError(field, error));
          }
        }
      });
      break;

    case 3: // Client Information
      if (!data.clients || data.clients.length === 0) {
        addError('clients', 'At least one client is required');
      } else {
        data.clients.forEach((client, index) => {
          const nameResult = validateField(client.name, { required: true, minLength: 2 }, 'Client Name', data);
          if (!nameResult.isValid) {
            nameResult.errors.forEach(error => addError(`clients[${index}].name`, error));
          }

          if (client.email) {
            const emailResult = validateField(client.email, { email: true }, 'Client Email', data);
            if (!emailResult.isValid) {
              emailResult.errors.forEach(error => addError(`clients[${index}].email`, error));
            }
          }

          if (client.phone) {
            const phoneResult = validateField(client.phone, { phone: true }, 'Client Phone', data);
            if (!phoneResult.isValid) {
              phoneResult.errors.forEach(error => addError(`clients[${index}].phone`, error));
            }
          }
        });
      }
      break;

    case 4: // Commission
      const role = data.agentData?.role;
      if (role === 'LISTING AGENT' || role === 'DUAL AGENT') {
        ['totalCommissionPercentage', 'listingAgentPercentage'].forEach(field => {
          const value = data.commissionData?.[field as keyof typeof data.commissionData];
          const result = validateField(value, { required: true, percentage: true }, field, data);
          if (!result.isValid) {
            result.errors.forEach(error => addError(field, error));
          }
        });
      }
      if (role === 'BUYERS AGENT' || role === 'DUAL AGENT') {
        const value = data.commissionData?.buyersAgentPercentage;
        const result = validateField(value, { required: true, percentage: true }, 'buyersAgentPercentage', data);
        if (!result.isValid) {
          result.errors.forEach(error => addError('buyersAgentPercentage', error));
        }
      }
      break;

    case 5: // Property Details
      ['hoaName', 'municipality', 'firstRightName', 'attorneyName', 'warrantyCompany', 'warrantyCost'].forEach(field => {
        const schema = ValidationSchema[field as keyof typeof ValidationSchema];
        if (schema) {
          const value = data.propertyDetailsData?.[field as keyof typeof data.propertyDetailsData];
          const result = validateField(value, schema, field, data);
          if (!result.isValid) {
            result.errors.forEach(error => addError(field, error));
          }
        }
      });
      break;

    case 6: // Documents
      const confirmResult = validateField(data.documentsData?.confirmDocuments, { required: true }, 'Document Confirmation', data);
      if (!confirmResult.isValid) {
        confirmResult.errors.forEach(error => addError('confirmDocuments', error));
      }
      break;

    case 9: // Signature
      ['agentSignatureName', 'signature', 'infoConfirmed', 'termsAccepted'].forEach(field => {
        const schema = ValidationSchema[field as keyof typeof ValidationSchema];
        if (schema) {
          const value = data.signatureData?.[field as keyof typeof data.signatureData];
          const result = validateField(value, schema, field, data);
          if (!result.isValid) {
            result.errors.forEach(error => addError(field, error));
          }
        }
      });
      break;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    missingFields
  };
};

// Accessibility helpers
export const AccessibilityHelpers = {
  // Generate aria-describedby for error messages
  getAriaDescribedBy: (fieldName: string, hasError: boolean, hasHelp: boolean = false): string | undefined => {
    const ids: string[] = [];
    if (hasError) ids.push(`${fieldName}-error`);
    if (hasHelp) ids.push(`${fieldName}-help`);
    return ids.length > 0 ? ids.join(' ') : undefined;
  },

  // Generate error message ID
  getErrorId: (fieldName: string): string => `${fieldName}-error`,

  // Generate help text ID
  getHelpId: (fieldName: string): string => `${fieldName}-help`,

  // Announce validation state change
  announceValidationChange: (fieldName: string, isValid: boolean, errors: string[]): void => {
    const message = isValid 
      ? `${fieldName} is valid`
      : `${fieldName} has ${errors.length} error${errors.length > 1 ? 's' : ''}: ${errors.join(', ')}`;
    
    // Create temporary element for screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

export default {
  ValidationMessages,
  ValidationUtils,
  RoleBasedRequirements,
  validateField,
  ValidationSchema,
  validateStepEnhanced,
  AccessibilityHelpers
};