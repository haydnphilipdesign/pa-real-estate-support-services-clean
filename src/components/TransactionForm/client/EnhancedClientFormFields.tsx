import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AgentRole, Client } from '@/types/transaction';
import { EnhancedInput, EnhancedSelect } from "@/components/ui/enhanced-field";
import { Mail, Phone, Home, Heart, User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

// Client validation result type
interface ClientValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
}

interface EnhancedClientFormFieldsProps {
  client: Client;
  onClientChange: (field: keyof Client, value: string) => void;
  agentRole?: AgentRole;
  showTypeSelector?: boolean;
  validation?: ClientValidationResult;
}

export function EnhancedClientFormFields({ 
  client, 
  onClientChange, 
  agentRole,
  showTypeSelector = false,
  validation 
}: EnhancedClientFormFieldsProps) {
  const [localClient, setLocalClient] = useState<Client>(client);

  useEffect(() => {
    setLocalClient(client);
  }, [client]);

  // Format phone number as user types (consistent format: (XXX) XXX-XXXX)
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Validate phone number format
  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    return phoneRegex.test(phone);
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (field: keyof Client, value: string) => {
    let formattedValue = value;

    // Apply formatting based on field type
    if (field === 'phone') {
      formattedValue = formatPhoneNumber(value);
    } else if (field === 'email') {
      formattedValue = value.toLowerCase().trim();
    } else if (field === 'name') {
      // Capitalize names properly
      formattedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setLocalClient(prev => ({ ...prev, [field]: formattedValue }));
    onClientChange(field, formattedValue);
  };

  const getFieldError = (field: string): string | undefined => {
    return validation?.errors?.[field];
  };

  const getFieldValidationState = (field: string) => {
    const error = getFieldError(field);
    if (error) return 'error';
    
    const value = localClient[field as keyof Client];
    if (!value) return 'default';
    
    // Field-specific validation for visual feedback
    if (field === 'email' && value && !isValidEmail(value)) return 'warning';
    if (field === 'phone' && value && !isValidPhoneNumber(value)) return 'warning';
    
    return 'success';
  };

  return (
    <div className="tf-enhanced-client-form">
      <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-6">
        {/* Client Name */}
        <div className="md:tf-col-span-2">
          <EnhancedInput
            label="Full Name"
            value={localClient.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter client's full name"
            required
            error={getFieldError('name')}
            helpText="Enter the client's legal name as it will appear on documents"
            fieldId={`${client.id}-name`}
          />
        </div>

        {/* Contact Information */}
        <EnhancedInput
          label="Email Address"
          type="email"
          value={localClient.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="client@example.com"
          error={getFieldError('email')}
          helpText="Email for transaction updates and document delivery"
          fieldId={`${client.id}-email`}
        />

        <EnhancedInput
          label="Phone Number"
          type="tel"
          value={localClient.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
          error={getFieldError('phone')}
          helpText="Primary contact number for transaction coordination"
          fieldId={`${client.id}-phone`}
        />

        {/* Address */}
        <div className="md:tf-col-span-2">
          <EnhancedInput
            label="Mailing Address"
            value={localClient.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="123 Main St, City, State 12345"
            error={getFieldError('address')}
            helpText="Complete mailing address for documents and correspondence"
            fieldId={`${client.id}-address`}
          />
        </div>

        {/* Marital Status */}
        <div>
          <Label htmlFor={`${client.id}-marital-status`} className="tf-label">
            <Heart className="tf-label-icon" />
            Marital Status
          </Label>
          <Select
            value={localClient.maritalStatus}
            onValueChange={(value) => handleChange('maritalStatus', value)}
          >
            <SelectTrigger className="tf-select" id={`${client.id}-marital-status`}>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SINGLE">Single</SelectItem>
              <SelectItem value="MARRIED">Married</SelectItem>
              <SelectItem value="DIVORCED">Divorced</SelectItem>
              <SelectItem value="DIVORCE IN PROGRESS">Divorce in Progress</SelectItem>
              <SelectItem value="WIDOWED">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Client Type (for Dual Agents) */}
        {showTypeSelector && (
          <div>
            <Label htmlFor={`${client.id}-type`} className="tf-label">
              <User className="tf-label-icon" />
              Client Type
              <span className="tf-label-required">*</span>
            </Label>
            <Select
              value={localClient.type}
              onValueChange={(value: 'BUYER' | 'SELLER') => onClientChange('type', value)}
            >
              <SelectTrigger 
                className={cn(
                  "tf-select",
                  getFieldError('type') && "tf-input-error"
                )}
                id={`${client.id}-type`}
              >
                <SelectValue placeholder="Select client type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUYER">Buyer</SelectItem>
                <SelectItem value="SELLER">Seller</SelectItem>
              </SelectContent>
            </Select>
            {getFieldError('type') && (
              <p className="tf-error-message tf-mt-1">{getFieldError('type')}</p>
            )}
          </div>
        )}

        {/* Role-Based Information */}
        {!showTypeSelector && (
          <div>
            <Label className="tf-label">
              <User className="tf-label-icon" />
              Client Type
            </Label>
            <div className="tf-flex tf-items-center tf-gap-2 tf-mt-2">
              <Badge variant="outline" className="tf-px-3 tf-py-1">
                {localClient.type}
              </Badge>
              {agentRole && (
                <Badge variant="secondary" className="tf-px-2 tf-py-1 tf-text-xs">
                  {agentRole}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Validation Warnings */}
      {validation?.warnings && validation.warnings.length > 0 && (
        <Card className="tf-mt-4 tf-border-amber-200 tf-bg-amber-50">
          <CardContent className="tf-pt-4">
            <div className="tf-flex tf-items-start tf-gap-2">
              <Mail className="tf-w-4 tf-h-4 tf-text-amber-600 tf-mt-0.5 tf-flex-shrink-0" />
              <div>
                <h5 className="tf-text-sm tf-font-semibold tf-text-amber-800 tf-mb-1">
                  Recommendations
                </h5>
                <ul className="tf-text-sm tf-text-amber-700 tf-space-y-1">
                  {validation.warnings.map((warning, index) => (
                    <li key={index} className="tf-flex tf-items-start tf-gap-1">
                      <span className="tf-w-1 tf-h-1 tf-bg-amber-600 tf-rounded-full tf-mt-2 tf-flex-shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Summary */}
      <Card className="tf-mt-4 tf-bg-gray-50">
        <CardContent className="tf-pt-4">
          <div className="tf-flex tf-items-center tf-gap-3">
            <div className="tf-icon-container tf-icon-sm-container">
              <User className="tf-icon-sm" />
            </div>
            <div className="tf-flex-1">
              <h5 className="tf-text-sm tf-font-semibold tf-text-gray-800">
                {localClient.name || 'Unnamed Client'}
              </h5>
              <div className="tf-flex tf-items-center tf-gap-2 tf-text-xs tf-text-gray-600">
                <span>{localClient.type}</span>
                <span>•</span>
                <span>{localClient.maritalStatus}</span>
                {localClient.email && (
                  <>
                    <span>•</span>
                    <span className="tf-flex tf-items-center tf-gap-1">
                      <Mail className="tf-w-3 tf-h-3" />
                      Email provided
                    </span>
                  </>
                )}
                {localClient.phone && (
                  <>
                    <span>•</span>
                    <span className="tf-flex tf-items-center tf-gap-1">
                      <Phone className="tf-w-3 tf-h-3" />
                      Phone provided
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className={cn(
              "tf-w-3 tf-h-3 tf-rounded-full",
              validation?.isValid === false ? "tf-bg-red-500" : 
              validation?.isValid === true ? "tf-bg-green-500" : "tf-bg-gray-400"
            )} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}