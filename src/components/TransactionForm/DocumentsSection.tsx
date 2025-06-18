import { useState, useEffect } from "react";
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
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <ListChecks className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Document Checklist</h3>
            <p className="tf-text-subtitle">Review and confirm all required documents are prepared</p>
          </div>
        </div>

        {/* Document Reference List */}
        <div className="tf-document-categories tf-mb-6">
          {filteredCategories.map((category, index) => (
            category.documents.length > 0 && (
              <div key={index} className="tf-glass-card-light tf-mb-4">
                <div className="tf-flex tf-items-center tf-mb-3">
                  <div className="tf-icon-container tf-icon-sm-container">
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="tf-heading-tertiary">{category.name}</h4>
                    <p className="tf-text-muted">{category.description}</p>
                  </div>
                </div>
                <div className="tf-document-list">
                  {category.documents.map((doc) => (
                    <div key={doc.name} className="tf-document-item tf-document-reference">
                      <FileText className="tf-icon-sm" />
                      <span className="tf-document-name">
                        {doc.name}
                        {doc.required && <span className="tf-label-required ml-1">*</span>}
                      </span>
                      {doc.required && (
                        <span className="tf-required-badge">Required</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Confirmation Section */}
        <div className="tf-glass-card-light">
          <div className="tf-checkbox-group">
            <Checkbox
              id="documentConfirmation"
              checked={data.confirmDocuments}
              onCheckedChange={(checked) => handleConfirmationChange(checked === true)}
              className={`tf-checkbox ${
                data.confirmDocuments
                  ? 'tf-checkbox-checked'
                  : showValidationError ? 'tf-checkbox-error' : ''
              }`}
              required
              aria-required="true"
              aria-invalid={showValidationError && !data.confirmDocuments ? "true" : "false"}
            />
            <div className="tf-checkbox-content">
              <label
                htmlFor="documentConfirmation"
                className={`tf-checkbox-label ${
                  showValidationError && !data.confirmDocuments ? 'tf-text-error' : ''
                }`}
              >
                <span className="tf-label-required">*</span>
                I confirm that I have prepared all required documents listed above and will provide them as needed for this transaction.
              </label>
              {showValidationError && !data.confirmDocuments && (
                <div className="tf-error-message tf-flex tf-items-center">
                  <AlertCircle className="tf-icon-sm tf-mr-1" />
                  <span>This confirmation is required to proceed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
