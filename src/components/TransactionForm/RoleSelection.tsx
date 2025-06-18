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
      
      {/* Agent Name Input - Premium Glass Card */}
      <div className="tf-glass-card tf-no-hover">
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <User className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Welcome Agent</h3>
            <p className="tf-text-subtitle">Please enter your full name to get started</p>
          </div>
        </div>

        <div className="tf-field-group">
          <label htmlFor="agent-name" className="tf-label">
            <span className="text-red-500 mr-1">*</span>
            Agent Name
          </label>
          <input
            id="agent-name"
            type="text"
            placeholder="Enter your full name"
            className={`tf-input ${actualShowValidation && actualErrors?.agentName ? 'border-red-500' : ''}`}
            value={actualAgentName || ''}
            onChange={(e) => {
              actualOnAgentNameChange && actualOnAgentNameChange(e.target.value);
              onFieldTouch && onFieldTouch('agentData.name');
            }}
            aria-invalid={actualShowValidation && actualErrors?.agentName ? 'true' : 'false'}
            aria-describedby={actualErrors?.agentName ? 'agent-name-error' : 'agent-name-help'}
          />
          <div id="agent-name-help" className="text-sm text-gray-500 mt-2">
            This will appear on all transaction documents
          </div>
          {actualShowValidation && actualErrors?.agentName && (
            <div id="agent-name-error" className="text-sm text-red-600 mt-2 flex items-center" role="alert">
              <span className="mr-1">⚠</span>
              {actualErrors.agentName}
            </div>
          )}
        </div>
      </div>

      {/* Role Selection - Premium Glass Card */}
      <div className="tf-glass-card tf-no-hover">
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <Building className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Select Your Role</h3>
            <p className="tf-text-subtitle">Choose how you are representing clients in this transaction</p>
          </div>
        </div>

        <div className="grid gap-6">
          {roles.map(role => (
            <div
              key={role.id}
              onClick={() => {
                console.log('🎭 Role clicked:', role.id);
                console.log('🔧 actualOnRoleChange function:', actualOnRoleChange);
                actualOnRoleChange && actualOnRoleChange(role.id);
                onFieldTouch && onFieldTouch('agentData.role');
                console.log('✅ Role change called');
              }}
              className={`relative p-6 rounded-xl border-2 cursor-pointer ${
                actualSelectedRole === role.id 
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' 
                  : 'border-gray-200 bg-white'
              }`}
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
                className="sr-only"
                aria-describedby={`role-${role.id}-description`}
              />
              
              <div className="flex items-start">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 flex-shrink-0 ${
                  actualSelectedRole === role.id ? 'bg-blue-500' : 'bg-gray-100'
                }`}>
                  <role.icon className={`w-6 h-6 ${
                    actualSelectedRole === role.id ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{role.title}</h4>
                    {actualSelectedRole === role.id && (
                      <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <p id={`role-${role.id}-description`} className="text-gray-600 mb-4">
                    {role.description}
                  </p>

                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 ${
                          actualSelectedRole === role.id ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {actualShowValidation && actualErrors?.selectedRole && (
          <div id="role-selection-error" className="text-sm text-red-600 mt-4 flex items-center" role="alert">
            <span className="mr-1">⚠</span>
            {actualErrors.selectedRole}
          </div>
        )}
      </div>

      {/* Role Selection Preview - Premium Success Card */}
      {actualSelectedRole && selectedRoleObj && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mr-4 flex-shrink-0">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Role Selected: {selectedRoleObj.title}
              </h4>
              <p className="text-gray-600">
                {selectedRoleObj.description}. You'll complete information for property details, 
                client information, commission structure, and required documentation.
              </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
