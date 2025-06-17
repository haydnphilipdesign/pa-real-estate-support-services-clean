import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className = ""
}) => {
  return (
    <div className={`transaction-glass-card ${className}`}>
      <div className="form-section-header">
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon className="w-6 h-6 text-brand-blue" />}
          <h2 className="form-section-title">{title}</h2>
        </div>
        {description && (
          <p className="form-section-description">{description}</p>
        )}
      </div>
      
      <div className="form-section-content">
        {children}
      </div>
    </div>
  );
};

export default FormSection;