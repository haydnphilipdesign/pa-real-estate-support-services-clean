import { Home, Users, UserCheck, User, Building, DollarSign, FileText, Check } from "lucide-react";
import type { AgentRole } from '@/types/transaction';
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

  return (
    <div className="tf-field-group">
      
      {/* Agent Name Input */}
      <div className="tf-card">
        <div className="flex items-center mb-6">
          <div className="tf-step-icon" style={{ width: '3rem', height: '3rem', marginBottom: '0', marginRight: 'var(--tf-space-4)' }}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="tf-section-title" style={{ marginBottom: 'var(--tf-space-1)' }}>Welcome Agent</h3>
            <p className="tf-step-description">Please enter your full name to get started</p>
          </div>
        </div>

        <div className="tf-field-group">
          <label htmlFor="agent-name" className="tf-label tf-label--required">
            Agent Name
          </label>
          <input
            id="agent-name"
            type="text"
            placeholder="Enter your full name"
            className={`tf-input ${actualShowValidation && actualErrors?.agentName ? 'tf-input--error' : ''}`}
            value={actualAgentName || ''}
            onChange={(e) => {
              actualOnAgentNameChange && actualOnAgentNameChange(e.target.value);
              onFieldTouch && onFieldTouch('agentData.name');
            }}
            aria-invalid={actualShowValidation && actualErrors?.agentName ? 'true' : 'false'}
            aria-describedby={actualErrors?.agentName ? 'agent-name-error' : 'agent-name-help'}
          />
          <div id="agent-name-help" className="tf-help-text">
            This will appear on all transaction documents
          </div>
          {actualShowValidation && actualErrors?.agentName && (
            <div id="agent-name-error" className="tf-error-text" role="alert">
              {actualErrors.agentName}
            </div>
          )}
        </div>
      </div>

      {/* Role Selection */}
      <div className="tf-card">
        <div className="flex items-center mb-6">
          <div className="tf-step-icon" style={{ width: '3rem', height: '3rem', marginBottom: '0', marginRight: 'var(--tf-space-4)' }}>
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="tf-section-title" style={{ marginBottom: 'var(--tf-space-1)' }}>Select Your Role</h3>
            <p className="tf-step-description">Choose how you are representing clients in this transaction</p>
          </div>
        </div>

        <div className="tf-radio-group">
          {roles.map(role => (
            <div
              key={role.id}
              onClick={() => {
                actualOnRoleChange && actualOnRoleChange(role.id);
                onFieldTouch && onFieldTouch('agentData.role');
              }}
              className={`tf-radio-item ${actualSelectedRole === role.id ? 'tf-radio-item--selected' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={actualSelectedRole === role.id}
              aria-describedby={actualShowValidation && actualErrors?.selectedRole ? 'role-selection-error' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  actualOnRoleChange && actualOnRoleChange(role.id);
                  onFieldTouch && onFieldTouch('agentData.role');
                }
              }}
            >
              <input
                type="radio"
                name="agentRole"
                value={role.id}
                checked={actualSelectedRole === role.id}
                onChange={() => {
                  actualOnRoleChange && actualOnRoleChange(role.id);
                  onFieldTouch && onFieldTouch('agentData.role');
                }}
                className="tf-radio-input"
                aria-describedby={`role-${role.id}-description`}
              />
              
              <div className="tf-radio-content">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gray-100">
                    <role.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h4 className="tf-radio-title">{role.title}</h4>
                </div>
                
                <p id={`role-${role.id}-description`} className="tf-radio-description mb-4">
                  {role.description}
                </p>

                <ul className="space-y-1">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {actualSelectedRole === role.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {actualShowValidation && actualErrors?.selectedRole && (
          <div id="role-selection-error" className="tf-error-text" role="alert">
            {actualErrors.selectedRole}
          </div>
        )}
      </div>

      {/* Role Selection Preview */}
      {actualSelectedRole && selectedRoleObj && (
        <div className="tf-alert tf-alert--success">
          <div className="tf-alert-title">
            Role Selected: {selectedRoleObj.title}
          </div>
          <p className="mt-2">
            {selectedRoleObj.description}. You'll complete information for property details, 
            client information, commission structure, and required documentation.
          </p>
        </div>
      )}
      
    </div>
  );
}
