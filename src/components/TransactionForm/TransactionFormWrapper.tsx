import React from 'react';

interface TransactionFormWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const TransactionFormWrapper: React.FC<TransactionFormWrapperProps> = ({
  children,
  title = "Transaction Form",
  description = "Complete your real estate transaction details"
}) => {
  return (
    <div className="transaction-form-container">
      <div className="transaction-form">
        {/* Header */}
        <div className="card card-glass text-center mb-8">
          <div className="card-body">
            <h1 className="heading-1" style={{ color: 'var(--color-primary-600)' }}>{title}</h1>
            <p className="text-lead">{description}</p>
          </div>
        </div>
        
        {/* Form Content */}
        {children}
      </div>
    </div>
  );
};

export default TransactionFormWrapper;