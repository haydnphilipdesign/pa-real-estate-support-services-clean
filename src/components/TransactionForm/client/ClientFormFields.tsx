import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { AgentRole, Client } from '@/types/transaction';
import { AddressInput } from "@/components/ui/AddressInput";
import { Mail, Phone, Home, Heart, User, UserPlus } from "lucide-react";

interface ClientFormFieldsProps {
  client: Client;
  onClientChange: (field: keyof Client, value: string) => void;
  role: AgentRole;
}

export function ClientFormFields({ client, onClientChange, role }: ClientFormFieldsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localClient, setLocalClient] = useState<Client>(client);

  useEffect(() => {
    setLocalClient(client);
  }, [client]);

  const handleChange = (field: keyof Client, value: string) => {
    // Clear error when field is changed
    setErrors(prev => ({ ...prev, [field]: '' }));

    // Format phone numbers as they're typed
    if (field === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        value = formatPhoneNumber(digits);
      } else {
        return; // Don't update if more than 10 digits
      }
    }

    setLocalClient(prev => ({ ...prev, [field]: value }));
    onClientChange(field, value);
  };

  // Format phone number as user types
  const formatPhoneNumber = (digits: string) => {
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  };

  // Validate phone format
  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length === 10;
  };

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: keyof Client, value: string) => {
    switch (field) {
      case 'email':
        // Only validate email if a value is provided
        return value && !validateEmail(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        // Only validate phone if a value is provided
        return value && !validatePhone(value) ? 'Please enter a valid phone number' : '';
      default:
        return value.trim() ? '' : 'This field is required';
    }
  };

  const handleBlur = (field: keyof Client) => {
    const error = validateField(field, localClient[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Determine if the agent is a dual agent
  const isDualAgent = role === "DUAL AGENT";

  // Set client type based on agent role
  useEffect(() => {
    // For listing agents, always set client type to SELLER
    if (role === "LISTING AGENT" && client.type !== "SELLER") {
      onClientChange("type", "SELLER");
    }

    // For buyers agents, always set client type to BUYER
    if (role === "BUYERS AGENT" && client.type !== "BUYER") {
      onClientChange("type", "BUYER");
    }

    // For dual agents, the type can be selected in the UI
  }, [role, client.type, onClientChange]);

  return (
    <div className="tf-property-grid">
      <div className="tf-client-form-column">
        {/* Name */}
        <div className="tf-form-group">
          <label htmlFor={`name-${client.id}`} className="tf-label">
            <User className="tf-label-icon" />
            Name <span className="tf-label-required">*</span>
          </label>
          <Input
            id={`name-${client.id}`}
            value={localClient.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            required
            placeholder="Enter full name"
            className={`tf-input ${errors.name ? 'tf-input-error' : ''}`}
          />
          {errors.name && <p className="tf-error-message">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="tf-form-group">
          <label htmlFor={`email-${client.id}`} className="tf-label">
            <Mail className="tf-label-icon" />
            Email
          </label>
          <Input
            id={`email-${client.id}`}
            type="email"
            value={localClient.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="Enter email address"
            className={`tf-input ${errors.email ? 'tf-input-error' : ''}`}
          />
          {errors.email && <p className="tf-error-message">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="tf-form-group">
          <label htmlFor={`phone-${client.id}`} className="tf-label">
            <Phone className="tf-label-icon" />
            Phone <span className="tf-label-required">*</span>
          </label>
          <Input
            id={`phone-${client.id}`}
            value={localClient.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            placeholder="123-456-7890"
            maxLength={12}
            className={`tf-input ${errors.phone ? 'tf-input-error' : ''}`}
          />
          {errors.phone && <p className="tf-error-message">{errors.phone}</p>}
        </div>
      </div>

      <div className="tf-client-form-column">
        {/* Address */}
        <div className="tf-form-group">
          <label htmlFor={`address-${client.id}`} className="tf-label">
            <Home className="tf-label-icon" />
            Address
          </label>
          <AddressInput
            value={localClient.address}
            onChange={(value: string) => handleChange("address", value)}
            label=""
            id={`address-${client.id}`}
            placeholder="Enter address"
            error={errors.address}
            className="tf-input"
          />
        </div>

        {/* Marital Status */}
        <div className="tf-form-group">
          <label htmlFor={`maritalStatus-${client.id}`} className="tf-label">
            <Heart className="tf-label-icon" />
            Marital Status <span className="tf-label-required">*</span>
          </label>
          <Select
            value={localClient.maritalStatus}
            onValueChange={(value) => handleChange("maritalStatus", value)}
          >
            <SelectTrigger id={`maritalStatus-${client.id}`} className="tf-select">
              <SelectValue placeholder="Select marital status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SINGLE">Single</SelectItem>
              <SelectItem value="MARRIED">Married</SelectItem>
              <SelectItem value="DIVORCED">Divorced</SelectItem>
              <SelectItem value="DIVORCE IN PROGRESS">Divorce in Progress</SelectItem>
              <SelectItem value="WIDOWED">Widowed</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && <p className="tf-error-message">{errors.maritalStatus}</p>}
        </div>

        {/* Client Type (only for Dual Agent) */}
        {isDualAgent && (
          <div className="tf-form-group">
            <label htmlFor={`type-${client.id}`} className="tf-label">
              <UserPlus className="tf-label-icon" />
              Client Type <span className="tf-label-required">*</span>
            </label>
            <Select
              value={localClient.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger id={`type-${client.id}`} className="tf-select">
                <SelectValue placeholder="Select client type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BUYER">Buyer</SelectItem>
                <SelectItem value="SELLER">Seller</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="tf-error-message">{errors.type}</p>}
          </div>
        )}
      </div>
    </div>
  );
}