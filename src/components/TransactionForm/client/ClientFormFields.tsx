import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { AgentRole, Client } from '@/types/transaction';
import { AddressInput } from "@/components/ui/AddressInput";
import { Mail, Phone, Home, Heart, User, UserPlus, Contact, MapPin, Briefcase } from "lucide-react";

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
    <div className="space-y-8">
      {/* Contact Information Section */}
      <div className="form-subsection">
        <div className="form-subsection-header">
          <Contact className="w-4 h-4 text-blue-600" />
          <h5 className="form-subsection-title">Contact Information</h5>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div className="form-group">
            <label htmlFor={`name-${client.id}`} className="form-label">
              <User className="w-4 h-4" />
              Full Name 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id={`name-${client.id}`}
              value={localClient.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              required
              placeholder="Enter full legal name"
              className={`form-input ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <span className="mr-1">⚠</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor={`email-${client.id}`} className="form-label">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <Input
              id={`email-${client.id}`}
              type="email"
              value={localClient.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="Enter email address"
              className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <span className="mr-1">⚠</span>
                {errors.email}
              </p>
            )}
            <div className="text-sm text-neutral-500 mt-1">
              For important transaction updates
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor={`phone-${client.id}`} className="form-label">
              <Phone className="w-4 h-4" />
              Phone Number 
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id={`phone-${client.id}`}
              value={localClient.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="123-456-7890"
              maxLength={12}
              className={`form-input ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.phone && (
              <p className="text-sm text-red-600 flex items-center mt-1">
                <span className="mr-1">⚠</span>
                {errors.phone}
              </p>
            )}
            <div className="text-sm text-neutral-500 mt-1">
              Primary contact number
            </div>
          </div>
        </div>
      </div>

      {/* Personal & Legal Information Section */}
      <div className="form-subsection">
        <div className="form-subsection-header">
          <Briefcase className="w-4 h-4 text-green-600" />
          <h5 className="form-subsection-title">Personal & Legal Information</h5>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address */}
          <div className="form-group">
            <label htmlFor={`address-${client.id}`} className="form-label">
              <MapPin className="w-4 h-4" />
              Current Address
            </label>
            <AddressInput
              value={localClient.address}
              onChange={(value: string) => handleChange("address", value)}
              id={`address-${client.id}`}
              placeholder="123 Main St, City, State 12345"
              error={errors.address}
              className="form-input"
            />
            <div className="text-sm text-neutral-500 mt-1">
              Current residential address
            </div>
          </div>

          <div className="space-y-6">
            {/* Marital Status */}
            <div className="form-group">
              <label htmlFor={`maritalStatus-${client.id}`} className="form-label">
                <Heart className="w-4 h-4" />
                Marital Status 
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={localClient.maritalStatus}
                onValueChange={(value) => handleChange("maritalStatus", value)}
              >
                <SelectTrigger id={`maritalStatus-${client.id}`} className="form-select">
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
              {errors.maritalStatus && (
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <span className="mr-1">⚠</span>
                  {errors.maritalStatus}
                </p>
              )}
              <div className="text-sm text-neutral-500 mt-1">
                Required for legal documentation
              </div>
            </div>

            {/* Client Type (only for Dual Agent) */}
            {isDualAgent && (
              <div className="form-group">
                <label htmlFor={`type-${client.id}`} className="form-label">
                  <UserPlus className="w-4 h-4" />
                  Client Type 
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Select
                  value={localClient.type}
                  onValueChange={(value) => handleChange("type", value)}
                >
                  <SelectTrigger id={`type-${client.id}`} className="form-select">
                    <SelectValue placeholder="Select client type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUYER">Buyer</SelectItem>
                    <SelectItem value="SELLER">Seller</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <span className="mr-1">⚠</span>
                    {errors.type}
                  </p>
                )}
                <div className="text-sm text-neutral-500 mt-1">
                  Are they buying or selling?
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}