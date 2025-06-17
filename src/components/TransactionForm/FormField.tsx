/**
 * FormField Component
 * Reusable form field wrapper that implements the design system consistently
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  helpText,
  children,
  className = ''
}) => {
  return (
    <div className={`tf-field-group ${className}`}>
      <label 
        htmlFor={id} 
        className={`tf-label ${required ? 'tf-label--required' : ''}`}
      >
        {label}
      </label>
      
      {children}
      
      {helpText && !error && (
        <div className="tf-help-text">
          {helpText}
        </div>
      )}
      
      {error && (
        <div className="tf-error-text" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

interface FormRowProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const FormRow: React.FC<FormRowProps> = ({
  children,
  columns = 1,
  className = ''
}) => {
  const columnClass = columns === 2 ? 'tf-field-row--two-cols' : 
                     columns === 3 ? 'tf-field-row--three-cols' : '';
  
  return (
    <div className={`tf-field-row ${columnClass} ${className}`}>
      {children}
    </div>
  );
};

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon,
  children,
  className = ''
}) => {
  return (
    <div className={`tf-card ${className}`}>
      <div className="flex items-center mb-6">
        {icon && (
          <div className="tf-step-icon" style={{ 
            width: '3rem', 
            height: '3rem', 
            marginBottom: '0', 
            marginRight: 'var(--tf-space-4)' 
          }}>
            {icon}
          </div>
        )}
        <div>
          <h3 className="tf-section-title" style={{ marginBottom: 'var(--tf-space-1)' }}>
            {title}
          </h3>
          {description && (
            <p className="tf-step-description">{description}</p>
          )}
        </div>
      </div>
      
      {children}
    </div>
  );
};