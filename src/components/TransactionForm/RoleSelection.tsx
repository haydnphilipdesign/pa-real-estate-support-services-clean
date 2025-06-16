import { Home, Users, UserCheck, User, Building, DollarSign, FileText, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { AgentRole } from '@/types/transaction';
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface RoleSelectionProps {
  selectedRole?: string;
  onRoleChange?: (role: any) => void;
  agentName?: string;
  onAgentNameChange?: (name: string) => void;
  errors?: {
    agentName?: string;
    selectedRole?: string;
  };
  showValidation?: boolean;
  // UnifiedTransactionForm props
  formData?: any;
  onChange?: (field: string, value: any) => void;
  validationErrors?: any;
  touchedFields?: any;
  onFieldTouch?: (field: string) => void;
}

const roles = [
  {
    id: "LISTING AGENT",
    title: "Listing Agent",
    description: "Representing the seller in this transaction",
    icon: Home,
    features: [
      "Submit listing information",
      "Manage seller details",
      "Track commission splits",
      "Provide property access details"
    ]
  },
  {
    id: "BUYERS AGENT",
    title: "Buyer's Agent",
    description: "Representing the buyer in this transaction",
    icon: Users,
    features: [
      "Submit purchase information",
      "Manage buyer details",
      "Submit offer details",
      "Track buyer obligations"
    ]
  },
  {
    id: "DUAL AGENT",
    title: "Dual Agent",
    description: "Representing both parties in this transaction",
    icon: UserCheck,
    features: [
      "Manage both buyer and seller",
      "Track all transaction details",
      "Handle both sides of commission",
      "Submit comprehensive documentation"
    ]
  }
];

// Remove inline styles - now using unified CSS classes

export function RoleSelection({ 
  selectedRole, 
  onRoleChange, 
  agentName, 
  onAgentNameChange, 
  errors, 
  showValidation,
  formData,
  onChange,
  validationErrors,
  touchedFields,
  onFieldTouch
}: RoleSelectionProps) {
  // Handle both prop styles - UnifiedTransactionForm vs direct props
  const actualSelectedRole = selectedRole || formData?.selectedRole;
  const actualAgentName = agentName || formData?.agentName;
  const actualOnRoleChange = onRoleChange || ((value: any) => onChange?.('selectedRole', value));
  const actualOnAgentNameChange = onAgentNameChange || ((value: string) => onChange?.('agentName', value));
  const actualErrors = errors || validationErrors;
  const actualShowValidation = showValidation || (touchedFields && Object.keys(touchedFields).length > 0);

  const selectedRoleObj = roles.find(role => role.id === actualSelectedRole);
  const [isFocused, setIsFocused] = useState(false);

  // Determine validation state for agent name
  const agentNameValidationClass = actualShowValidation && actualErrors?.agentName
    ? 'tf-field-error'
    : actualAgentName && actualAgentName.trim().length > 0
    ? 'tf-field-success'
    : '';

  // Determine validation state for role selection
  const roleValidationClass = actualShowValidation && actualErrors?.selectedRole
    ? 'tf-validation-error'
    : actualSelectedRole
    ? 'tf-validation-success'
    : '';

  return (
    <div className="tf-role-selection">
      {/* Agent Name Input - simplified structure */}
      <div className="tf-section">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <User className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Welcome Agent</h3>
            <p className="tf-text-subtitle">Please enter your full name</p>
          </div>
        </div>

        <div className="tf-form-group">
          <Input
            id="agent-name"
            placeholder="Enter your full name"
            className={`tf-input ${agentNameValidationClass}`}
            value={actualAgentName || ''}
            onChange={(e) => actualOnAgentNameChange && actualOnAgentNameChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            aria-invalid={actualShowValidation && actualErrors?.agentName ? 'true' : 'false'}
            aria-describedby={actualErrors?.agentName ? 'agent-name-error' : undefined}
            onBlur={() => setIsFocused(false)}
          />
          {showValidation && errors?.agentName && (
            <div id="agent-name-error" className="tf-error-message" role="alert">
              {errors.agentName}
            </div>
          )}
        </div>
      </div>

      {/* Role Selection Cards - simplified structure */}
      <div className="tf-section">
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <Building className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Select Your Role</h3>
            <p className="tf-text-subtitle">Choose the role that best describes your position in this transaction</p>
          </div>
        </div>

        <div className="tf-role-cards">
          {roles.map(role => (
            <div
              key={role.id}
              onClick={() => actualOnRoleChange && actualOnRoleChange(role.id)}
              className={`tf-role-card ${actualSelectedRole === role.id ? 'selected' : ''} ${roleValidationClass}`}
              role="button"
              tabIndex={0}
              aria-pressed={actualSelectedRole === role.id}
              aria-describedby={actualShowValidation && actualErrors?.selectedRole ? 'role-selection-error' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  actualOnRoleChange && actualOnRoleChange(role.id);
                }
              }}
              onTouchStart={(e) => {
                // Add touch feedback for mobile
                e.currentTarget.style.transform = 'scale(0.98)';
                e.currentTarget.style.transition = 'transform 0.1s ease';
              }}
              onTouchEnd={(e) => {
                // Reset transform after touch
                setTimeout(() => {
                  e.currentTarget.style.transform = '';
                }, 100);
              }}
            >
              {actualSelectedRole === role.id && (
                <div className="tf-role-selected-indicator">
                  <Check className="tf-icon" />
                </div>
              )}

              <div className="tf-role-card-header">
                <div className="tf-icon-container">
                  <role.icon className="tf-icon" />
                </div>
                <h4 className="tf-role-card-title">{role.title}</h4>
              </div>

              <p className="tf-role-card-description">{role.description}</p>

              <div className="tf-role-features">
                <ul>
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="tf-role-feature">
                      <div className="tf-role-feature-bullet"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {showValidation && errors?.selectedRole && (
          <div id="role-selection-error" className="tf-error-message" role="alert">
            {errors.selectedRole}
          </div>
        )}
      </div>

      {/* Selected Role Details - simplified structure */}
      {actualSelectedRole && (
        <div className="tf-section tf-selected-role-details">
          <div className="tf-flex tf-items-center tf-mb-4">
            <div className="tf-icon-container">
              <FileText className="tf-icon" />
            </div>
            <div>
              <h3 className="tf-heading-secondary">Role Selected: {selectedRoleObj?.title}</h3>
              <p className="tf-text-subtitle">{selectedRoleObj?.description}</p>
            </div>
          </div>

          <div className="tf-next-steps">
            <h4 className="tf-heading-tertiary tf-flex tf-items-center">
              <DollarSign className="tf-icon-sm tf-mr-2" style={{ color: 'var(--tf-primary-light)' }} />
              What to expect next
            </h4>
            <p className="tf-text-description tf-mb-4">
              As a {selectedRoleObj?.title.toLowerCase()}, you'll need to provide the following information to complete this transaction:
            </p>
            <div className="tf-grid tf-grid-cols-2 tf-gap-3">
              <div className="tf-info-card">
                <h5 className="tf-font-semibold tf-text-dark tf-mb-2">Property Details</h5>
                <p className="tf-text-muted">Property address, MLS number, sale price, and status</p>
              </div>
              <div className="tf-info-card">
                <h5 className="tf-font-semibold tf-text-dark tf-mb-2">Client Information</h5>
                <p className="tf-text-muted">Client contact details and relationship information</p>
              </div>
              <div className="tf-info-card">
                <h5 className="tf-font-semibold tf-text-dark tf-mb-2">Commission</h5>
                <p className="tf-text-muted">Commission percentages, fees, and payment details</p>
              </div>
              <div className="tf-info-card">
                <h5 className="tf-font-semibold tf-text-dark tf-mb-2">Documentation</h5>
                <p className="tf-text-muted">Required documents and additional information</p>
              </div>
            </div>
            <div className="tf-text-center tf-mt-4">
              <p className="tf-text-muted tf-font-medium">Click the "Next Step" button below to continue</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
