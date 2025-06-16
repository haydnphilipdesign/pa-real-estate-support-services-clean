import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, UserPlus, Trash, User, UserCheck, AlertTriangle } from "lucide-react";
import { ClientFormFields } from './client/ClientFormFields';
import type { Client, AgentRole } from '@/types/transaction';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

// Type guard to ensure valid client type
const isValidClientType = (type: string): type is Client['type'] => {
  return type === 'BUYER' || type === 'SELLER';
};

// Type guard to ensure valid marital status
const isValidMaritalStatus = (status: string): status is Client['maritalStatus'] => {
  return ['SINGLE', 'MARRIED', 'DIVORCED', 'DIVORCE IN PROGRESS', 'WIDOWED'].includes(status);
};

// Client validation interface
interface ClientValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
}

// Enhanced client validation
const validateClient = (client: Client, role?: AgentRole): ClientValidationResult => {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  // Required field validation
  if (!client.name || client.name.trim().length < 2) {
    errors.name = 'Client name must be at least 2 characters';
  }

  // Email validation (optional but must be valid if provided)
  if (client.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(client.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Phone validation (optional but must be valid if provided)
  if (client.phone) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(client.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
  }

  // Type consistency validation
  if (role === 'LISTING AGENT' && client.type !== 'SELLER') {
    errors.type = 'Listing agents should only have seller clients';
  }
  if (role === 'BUYERS AGENT' && client.type !== 'BUYER') {
    errors.type = 'Buyer\'s agents should only have buyer clients';
  }

  // Address validation (recommend format)
  if (client.address && client.address.length > 0) {
    const addressParts = client.address.split(',').map(part => part.trim());
    if (addressParts.length < 2) {
      warnings.push('Consider using format: Street, City, State ZIP for better accuracy');
    }
  }

  // Marital status validation for married clients
  if (client.maritalStatus === 'MARRIED' && !client.email && !client.phone) {
    warnings.push('Contact information recommended for married clients');
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings
  };
};

// Role-based minimum client requirements
const getMinimumClientRequirements = (role?: AgentRole) => {
  switch (role) {
    case 'BUYERS AGENT':
      return { min: 1, type: 'BUYER' as const, label: 'buyer' };
    case 'LISTING AGENT':
      return { min: 1, type: 'SELLER' as const, label: 'seller' };
    case 'DUAL AGENT':
      return { min: 1, type: null, label: 'client' };
    default:
      return { min: 1, type: null, label: 'client' };
  }
};

interface EnhancedClientInformationProps {
  clients: Client[];
  onChange: (clients: Client[]) => void;
  agentRole?: AgentRole;
  onValidationChange?: (isValid: boolean, errors: Record<string, string[]>) => void;
}

export const EnhancedClientInformation: React.FC<EnhancedClientInformationProps> = ({
  clients,
  agentRole,
  onChange,
  onValidationChange
}) => {
  const [validationResults, setValidationResults] = useState<Record<string, ClientValidationResult>>({});
  const [globalErrors, setGlobalErrors] = useState<string[]>([]);

  // Safely determine client type based on role
  const getClientTypeForRole = useCallback((role?: AgentRole): Client['type'] => {
    switch (role) {
      case 'LISTING AGENT':
        return 'SELLER';
      case 'BUYERS AGENT':
        return 'BUYER';
      case 'DUAL AGENT':
        return 'BUYER'; // Default to buyer for dual agent
      default:
        return 'BUYER';
    }
  }, []);

  // Create a new client with proper type safety
  const createNewClient = useCallback((): Client => {
    const clientType = getClientTypeForRole(agentRole);
    
    return {
      id: uuidv4(),
      name: '',
      email: '',
      phone: '',
      address: '',
      maritalStatus: 'SINGLE',
      type: clientType
    };
  }, [agentRole, getClientTypeForRole]);

  // Validate all clients
  const validateAllClients = useCallback(() => {
    const results: Record<string, ClientValidationResult> = {};
    const globalErrs: string[] = [];
    
    // Validate each client
    clients.forEach(client => {
      results[client.id] = validateClient(client, agentRole);
    });

    // Check minimum client requirements
    const requirements = getMinimumClientRequirements(agentRole);
    if (clients.length < requirements.min) {
      globalErrs.push(`At least ${requirements.min} ${requirements.label} is required`);
    }

    // Check for duplicate names
    const names = clients.map(c => c.name.trim().toLowerCase()).filter(name => name.length > 0);
    const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicateNames.length > 0) {
      globalErrs.push('Duplicate client names found. Please ensure each client has a unique name.');
    }

    // Check type consistency for dual agents
    if (agentRole === 'DUAL AGENT') {
      const hasBuyer = clients.some(c => c.type === 'BUYER');
      const hasSeller = clients.some(c => c.type === 'SELLER');
      if (clients.length > 0 && (!hasBuyer || !hasSeller)) {
        globalErrs.push('Dual agents typically need both buyer and seller clients');
      }
    }

    setValidationResults(results);
    setGlobalErrors(globalErrs);

    // Notify parent of validation state
    if (onValidationChange) {
      const allErrors: Record<string, string[]> = {};
      Object.entries(results).forEach(([clientId, result]) => {
        if (!result.isValid) {
          allErrors[clientId] = Object.values(result.errors);
        }
      });
      if (globalErrs.length > 0) {
        allErrors['global'] = globalErrs;
      }
      
      const isValid = Object.keys(allErrors).length === 0;
      onValidationChange(isValid, allErrors);
    }
  }, [clients, agentRole, onValidationChange]);

  // Run validation when clients or role changes
  useEffect(() => {
    validateAllClients();
  }, [validateAllClients]);

  // Handle adding a new client
  const handleAddClient = useCallback(() => {
    const newClient = createNewClient();
    onChange([...clients, newClient]);
  }, [clients, onChange, createNewClient]);

  // Handle removing a client with validation
  const handleRemoveClient = useCallback((id: string) => {
    const requirements = getMinimumClientRequirements(agentRole);
    const remainingClients = clients.filter(client => client.id !== id);
    
    // Check if removal would violate minimum requirements
    if (remainingClients.length < requirements.min) {
      setGlobalErrors([`Cannot remove client. At least ${requirements.min} ${requirements.label} is required.`]);
      return;
    }

    // For dual agents, check if we still have required types
    if (agentRole === 'DUAL AGENT' && remainingClients.length > 0) {
      const clientToRemove = clients.find(c => c.id === id);
      const remainingTypes = remainingClients.map(c => c.type);
      
      if (clientToRemove?.type === 'BUYER' && !remainingTypes.includes('BUYER')) {
        setGlobalErrors(['Cannot remove the only buyer client for a dual agent transaction']);
        return;
      }
      if (clientToRemove?.type === 'SELLER' && !remainingTypes.includes('SELLER')) {
        setGlobalErrors(['Cannot remove the only seller client for a dual agent transaction']);
        return;
      }
    }

    onChange(remainingClients);
  }, [clients, onChange, agentRole]);

  // Handle client field changes with type safety
  const handleClientChange = useCallback((id: string, field: keyof Client, value: any) => {
    const updatedClients = clients.map(client => {
      if (client.id !== id) return client;

      // Type-safe field updates
      const updatedClient = { ...client };
      
      switch (field) {
        case 'type':
          if (isValidClientType(value)) {
            updatedClient.type = value;
          }
          break;
        case 'maritalStatus':
          if (isValidMaritalStatus(value)) {
            updatedClient.maritalStatus = value;
          }
          break;
        case 'name':
        case 'email':
        case 'phone':
        case 'address':
          if (typeof value === 'string') {
            updatedClient[field] = value;
          }
          break;
        default:
          // Fallback for any other fields
          (updatedClient as any)[field] = value;
      }

      return updatedClient;
    });

    onChange(updatedClients);
  }, [clients, onChange]);

  // Update client types when role changes (with proper type safety)
  useEffect(() => {
    if (!agentRole || clients.length === 0) return;

    let needsUpdate = false;
    const updatedClients = clients.map(client => {
      const expectedType = getClientTypeForRole(agentRole);
      
      // Only auto-correct for non-dual agents
      if (agentRole !== 'DUAL AGENT' && client.type !== expectedType) {
        needsUpdate = true;
        return { ...client, type: expectedType };
      }
      
      return client;
    });

    if (needsUpdate) {
      onChange(updatedClients);
    }
  }, [agentRole, clients, onChange, getClientTypeForRole]);

  // Get client type label
  const getClientTypeLabel = () => {
    switch (agentRole) {
      case 'LISTING AGENT':
        return 'Seller';
      case 'BUYERS AGENT':
        return 'Buyer';
      case 'DUAL AGENT':
        return 'Client';
      default:
        return 'Client';
    }
  };

  // Check if client can be removed
  const canRemoveClient = (clientId: string) => {
    const requirements = getMinimumClientRequirements(agentRole);
    return clients.length > requirements.min;
  };

  return (
    <div className="tf-enhanced-client-info">
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <Users className="tf-icon" />
          </div>
          <div className="tf-flex-1">
            <h3 className="tf-heading-secondary">{getClientTypeLabel()} Information</h3>
            <p className="tf-text-subtitle">
              Manage {getClientTypeLabel().toLowerCase()} information with enhanced validation
            </p>
          </div>
          <Button
            onClick={handleAddClient}
            className="tf-button tf-button-primary"
          >
            <UserPlus className="tf-button-icon" />
            Add {getClientTypeLabel()}
          </Button>
        </div>

        {/* Global Errors */}
        {globalErrors.length > 0 && (
          <Alert className="tf-mb-6" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {globalErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Client List */}
        <div className="tf-client-list tf-space-y-6">
          {clients.length === 0 ? (
            <div className="tf-glass-card-light tf-text-center tf-py-8">
              <Users className="tf-icon tf-mx-auto tf-mb-4 tf-text-gray-400" />
              <h4 className="tf-heading-tertiary tf-mb-2">No {getClientTypeLabel()}s Added</h4>
              <p className="tf-text-muted tf-mb-4">
                Add at least one {getClientTypeLabel().toLowerCase()} to continue with the transaction.
              </p>
              <Button onClick={handleAddClient} className="tf-button tf-button-primary">
                <UserPlus className="tf-button-icon" />
                Add First {getClientTypeLabel()}
              </Button>
            </div>
          ) : (
            clients.map((client, index) => {
              const validation = validationResults[client.id];
              const hasErrors = validation && !validation.isValid;
              const hasWarnings = validation && validation.warnings.length > 0;

              return (
                <div
                  key={client.id}
                  className={cn(
                    "tf-glass-card-light tf-relative",
                    hasErrors && "tf-border-red-300 tf-bg-red-50"
                  )}
                >
                  <div className="tf-flex tf-justify-between tf-items-start tf-mb-4">
                    <div className="tf-flex tf-items-center tf-gap-3">
                      <div className="tf-icon-container tf-icon-sm-container">
                        {hasErrors ? (
                          <AlertTriangle className="tf-icon-sm tf-text-red-500" />
                        ) : (
                          <UserCheck className="tf-icon-sm tf-text-green-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="tf-heading-tertiary">
                          {client.name || `${getClientTypeLabel()} ${index + 1}`}
                        </h4>
                        <p className="tf-text-muted">
                          {client.type} • {client.maritalStatus}
                        </p>
                      </div>
                    </div>
                    {canRemoveClient(client.id) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveClient(client.id)}
                        className="tf-text-red-600 hover:tf-bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Validation Errors */}
                  {hasErrors && (
                    <Alert className="tf-mb-4" variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside space-y-1">
                          {Object.values(validation.errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Validation Warnings */}
                  {hasWarnings && (
                    <Alert className="tf-mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside space-y-1">
                          {validation.warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Client Form Fields */}
                  <ClientFormFields
                    client={client}
                    onClientChange={(field, value) => handleClientChange(client.id, field, value)}
                    agentRole={agentRole}
                    showTypeSelector={agentRole === 'DUAL AGENT'}
                    validation={validation}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Summary Info */}
        {clients.length > 0 && (
          <div className="tf-mt-6 tf-p-4 tf-rounded-lg tf-bg-blue-50 tf-border tf-border-blue-200">
            <div className="tf-flex tf-items-center tf-gap-2 tf-text-sm tf-text-blue-800">
              <UserCheck className="h-4 w-4" />
              <span>
                {clients.length} {getClientTypeLabel().toLowerCase()}{clients.length !== 1 ? 's' : ''} added
                {agentRole === 'DUAL AGENT' && (
                  <>
                    {' • '}
                    {clients.filter(c => c.type === 'BUYER').length} buyer(s), {' '}
                    {clients.filter(c => c.type === 'SELLER').length} seller(s)
                  </>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};