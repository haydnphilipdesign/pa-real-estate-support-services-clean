import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ListChecks, AlertCircle, FileText, Home, FileSpreadsheet, Users, DollarSign, CheckCircle, Clock
} from "lucide-react";
import { DocumentsData, DocumentItem, AgentRole } from "@/types/transaction";

interface DocumentsSectionProps {
  role?: AgentRole | null;
  data: DocumentsData;
  onChange: (field: string, value: any) => void;
  titleData?: any;
  propertyData?: any;
  commissionData?: any;
}

// Define document categories with proper DocumentItem structure
type DocumentCategory = {
  name: string;
  icon: React.ReactNode;
  description: string;
  documents: DocumentItem[];
};

export function DocumentsSection({
  role = 'BUYERS AGENT',
  data = { documents: [], confirmDocuments: false },
  onChange
}: DocumentsSectionProps) {
  const [showValidationError, setShowValidationError] = useState(false);

  // Document selection is now handled only by confirmation checkbox
  // Individual document checkboxes removed

  // Handle confirmation checkbox
  const handleConfirmationChange = (checked: boolean) => {
    onChange('confirmDocuments', checked);
    if (checked) {
      setShowValidationError(false);
      localStorage.removeItem('documentsValidated');
    }
  };

  // Define comprehensive document categories with proper DocumentItem structure
  const documentCategories: DocumentCategory[] = [
    {
      name: "Core Transaction Documents",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      description: "Essential documents required for all transactions",
      documents: [
        { name: "Agreement of Sale", selected: false, required: true, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "Deposit Money Notice", selected: false, required: true, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "Cooperating Broker's Compensation", selected: false, required: true, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "KW Wire Fraud Notice", selected: false, required: true, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
      ]
    },
    {
      name: "Agency & Disclosure Documents",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      description: "Documents related to representation and disclosures",
      documents: [
        { name: "Buyer's Agency Contract", selected: false, required: true, roles: ['BUYERS AGENT', 'DUAL AGENT'] },
        { name: "Listing Agreement", selected: false, required: true, roles: ['LISTING AGENT', 'DUAL AGENT'] },
        { name: "Dual Agency Disclosure", selected: false, required: true, roles: ['DUAL AGENT'] },
        { name: "Consumer Notice", selected: false, required: true, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "KW Affiliate Services Disclosure", selected: false, required: false, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "Seller's Property Disclosure", selected: false, required: true, roles: ['LISTING AGENT', 'DUAL AGENT'] },
      ]
    },
    {
      name: "Financial Documents",
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      description: "Documents related to transaction costs",
      documents: [
        { name: "Buyer's Estimated Costs", selected: false, required: true, roles: ['BUYERS AGENT', 'DUAL AGENT'] },
        { name: "Seller's Estimated Costs", selected: false, required: true, roles: ['LISTING AGENT', 'DUAL AGENT'] },
      ]
    },
    {
      name: "Property-Specific Documents",
      icon: <Home className="h-5 w-5 text-amber-600" />,
      description: "Documents specific to the property type and condition",
      documents: [
        { name: "Lead Based Paint Disclosure", selected: false, required: false, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "Resale Certificate", selected: false, required: false, roles: ['LISTING AGENT', 'DUAL AGENT'] },
        { name: "Certificate of Occupancy", selected: false, required: false, roles: ['LISTING AGENT', 'DUAL AGENT'] },
      ]
    },
    {
      name: "Additional Documents",
      icon: <FileSpreadsheet className="h-5 w-5 text-gray-600" />,
      description: "Other important documents for your transaction",
      documents: [
        { name: "Attorney Review Clause", selected: false, required: false, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "Referral Agreement & W-9", selected: false, required: false, roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'] },
        { name: "Home Warranty Information", selected: false, required: false, roles: ['LISTING AGENT', 'DUAL AGENT'] },
      ]
    }
  ];

  // Filter categories based on role
  const getFilteredCategories = () => {
    return documentCategories.map(category => {
      const filteredDocs = category.documents.filter(doc => 
        doc.roles.includes(role || 'BUYERS AGENT')
      );
      return {
        ...category,
        documents: filteredDocs
      };
    }).filter(category => category.documents.length > 0);
  };

  // Get filtered categories for display only
  const filteredCategories = getFilteredCategories();

  return (
    <div className="tf-documents-section">
      <div className="tf-glass-card tf-no-hover">
        {/* Header */}
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <ListChecks className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Required Documents</h3>
            <p className="tf-text-subtitle">Review the documents needed for your {role?.toLowerCase().replace(' agent', '')} transaction</p>
          </div>
        </div>

        {/* Document Categories in Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCategories.map((category, index) => (
            category.documents.length > 0 && (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                {/* Category Header */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg mr-3">
                    {React.cloneElement(category.icon as React.ReactElement, { 
                      className: "w-5 h-5 text-white" 
                    })}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                {/* Document List */}
                <div className="space-y-3">
                  {category.documents.map((doc) => (
                    <div key={doc.name} className="flex items-start bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mr-3 flex-shrink-0">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {doc.name}
                          </span>
                          {doc.required && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2 flex-shrink-0">
                              Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Confirmation Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mr-4 flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Required</h4>
              <p className="text-sm text-gray-600 mb-4">
                Please confirm that you have prepared all the required documents listed above and are ready to provide them as needed throughout the transaction process.
              </p>
              
              <div className="flex items-start">
                <Checkbox
                  id="documentConfirmation"
                  checked={data.confirmDocuments}
                  onCheckedChange={(checked) => handleConfirmationChange(checked === true)}
                  className={`mt-1 ${
                    data.confirmDocuments
                      ? 'tf-checkbox-checked'
                      : showValidationError ? 'tf-checkbox-error' : ''
                  }`}
                  required
                  aria-required="true"
                  aria-invalid={showValidationError && !data.confirmDocuments ? "true" : "false"}
                />
                <div className="ml-3">
                  <label
                    htmlFor="documentConfirmation"
                    className={`text-sm font-medium cursor-pointer ${
                      showValidationError && !data.confirmDocuments ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    <span className="text-red-500 mr-1">*</span>
                    I confirm that I have prepared all required documents and will provide them as needed for this transaction.
                  </label>
                  {showValidationError && !data.confirmDocuments && (
                    <div className="flex items-center mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">This confirmation is required to proceed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
