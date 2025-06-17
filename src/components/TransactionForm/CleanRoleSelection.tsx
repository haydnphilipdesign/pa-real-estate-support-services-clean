import React from 'react';
import { Home, Users, UserCheck } from 'lucide-react';
import { FormSection } from './FormSection';

interface CleanRoleSelectionProps {
  selectedRole?: string;
  onRoleChange?: (role: string) => void;
  agentName?: string;
  onAgentNameChange?: (name: string) => void;
  errors?: {
    agentName?: string;
    selectedRole?: string;
  };
}

const roles = [
  {
    id: "LISTING AGENT",
    title: "Listing Agent",
    description: "Representing the seller in this transaction",
    icon: Home,
  },
  {
    id: "BUYERS AGENT", 
    title: "Buyer's Agent",
    description: "Representing the buyer in this transaction",
    icon: Users,
  },
  {
    id: "DUAL AGENT",
    title: "Dual Agent",
    description: "Representing both buyer and seller",
    icon: UserCheck,
  }
];

export const CleanRoleSelection: React.FC<CleanRoleSelectionProps> = ({
  selectedRole,
  onRoleChange,
  agentName,
  onAgentNameChange,
  errors = {}
}) => {
  
  return (
    <FormSection
      title="Select Your Role"
      description="Choose your role in this transaction to customize the form experience."
      icon={UserCheck}
    >
      {/* Agent Name Input */}
      <div className="mb-6">
        <label className="form-label">
          Agent Name *
        </label>
        <input
          type="text"
          value={agentName || ''}
          onChange={(e) => onAgentNameChange?.(e.target.value)}
          className={`form-input ${errors.agentName ? 'error' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.agentName && (
          <div className="form-error">{errors.agentName}</div>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-4">
        <label className="form-label">
          Your Role in This Transaction *
        </label>
        
        <div className="form-grid">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <div
                key={role.id}
                onClick={() => onRoleChange?.(role.id)}
                className={`
                  cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                  ${isSelected 
                    ? 'border-brand-blue bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent 
                    className={`w-6 h-6 mt-1 ${isSelected ? 'text-brand-blue' : 'text-gray-400'}`} 
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isSelected ? 'text-brand-blue' : 'text-gray-900'}`}>
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {errors.selectedRole && (
          <div className="form-error">{errors.selectedRole}</div>
        )}
      </div>

      {/* Selected Role Display */}
      {selectedRole && (
        <div className="selected-role-display mt-6">
          <div className="selected-role-title">
            Selected: {roles.find(r => r.id === selectedRole)?.title}
          </div>
          <div className="selected-role-description">
            {roles.find(r => r.id === selectedRole)?.description}
          </div>
        </div>
      )}
    </FormSection>
  );
};

export default CleanRoleSelection;