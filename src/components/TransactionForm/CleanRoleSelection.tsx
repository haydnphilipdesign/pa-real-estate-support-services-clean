import { Home, Users, UserCheck, User } from "lucide-react";
import type { AgentRole } from '@/types/transaction';

interface CleanRoleSelectionProps {
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

export function CleanRoleSelection({ 
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
}: CleanRoleSelectionProps) {
  // Handle both prop styles
  const actualSelectedRole = selectedRole || formData?.selectedRole;
  const actualAgentName = agentName || formData?.agentName;
  const actualOnRoleChange = onRoleChange || ((value: any) => onChange?.('selectedRole', value));
  const actualOnAgentNameChange = onAgentNameChange || ((value: string) => onChange?.('agentName', value));
  const actualErrors = errors || validationErrors;
  const actualShowValidation = showValidation || (touchedFields && Object.keys(touchedFields).length > 0);

  return (
    <div className="space-y-8">
      
      {/* Agent Name Input - Premium Design */}
      <div className="agent-name-section">
        <div className="form-section-header">
          <div className="form-section-icon">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="form-section-title">Welcome Agent</h3>
            <p className="form-section-description">Please enter your full name to get started</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="agent-name" className="form-label">
            <span className="text-red-500 mr-1">*</span>
            Agent Name
          </label>
          <input
            id="agent-name"
            type="text"
            placeholder="Enter your full name"
            className={`form-input ${
              actualShowValidation && actualErrors?.agentName 
                ? 'border-red-500 bg-red-50/50' 
                : ''
            }`}
            value={actualAgentName || ''}
            onChange={(e) => {
              actualOnAgentNameChange && actualOnAgentNameChange(e.target.value);
              onFieldTouch && onFieldTouch('agentData.name');
            }}
            aria-invalid={actualShowValidation && actualErrors?.agentName ? 'true' : 'false'}
            aria-describedby={actualErrors?.agentName ? 'agent-name-error' : 'agent-name-help'}
          />
          <div id="agent-name-help" className="text-sm text-neutral-500 mt-1">
            This will appear on all transaction documents
          </div>
          {actualShowValidation && actualErrors?.agentName && (
            <div id="agent-name-error" className="text-sm text-red-600 flex items-center mt-1" role="alert">
              <span className="mr-1">⚠</span>
              {actualErrors.agentName}
            </div>
          )}
        </div>
      </div>

      {/* Role Selection - Premium Design */}
      <div className="form-section">
        <div className="form-section-header">
          <div className="form-section-icon">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="form-section-title">Select Your Role</h3>
            <p className="form-section-description">Choose how you are representing clients in this transaction</p>
          </div>
        </div>

        <div className="role-selection-grid">
          {roles.map(role => {
            const IconComponent = role.icon;
            const isSelected = actualSelectedRole === role.id;
            
            return (
              <div
                key={role.id}
                onClick={() => {
                  actualOnRoleChange && actualOnRoleChange(role.id);
                  onFieldTouch && onFieldTouch('agentData.role');
                }}
                className={`role-card ${isSelected ? 'selected' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
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
                  checked={isSelected}
                  onChange={() => {
                    actualOnRoleChange && actualOnRoleChange(role.id);
                    onFieldTouch && onFieldTouch('agentData.role');
                  }}
                  className="sr-only"
                  aria-describedby={`role-${role.id}-description`}
                />
                
                <div className="role-card-icon">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="role-card-title">
                  {role.title}
                </div>
                
                <p className="role-card-description" id={`role-${role.id}-description`}>
                  {role.description}
                </p>
                
                <ul className="space-y-2 mt-4">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-neutral-600">
                      <span className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${
                        isSelected ? 'bg-amber-500' : 'bg-neutral-400'
                      }`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {actualShowValidation && actualErrors?.selectedRole && (
          <div id="role-selection-error" className="mt-4 text-sm text-red-600 flex items-center" role="alert">
            <span className="mr-1">⚠</span>
            {actualErrors.selectedRole}
          </div>
        )}
      </div>
    </div>
  );
}

export default CleanRoleSelection;