import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ListChecks, AlertCircle, FileText, Home, FileSpreadsheet, Users, DollarSign
} from "lucide-react";
import { DocumentsData, AgentRole } from "@/types/transaction";

interface DocumentsSectionProps {
  role?: AgentRole | null;
  data: DocumentsData;
  onChange: (field: string, value: any) => void;
  titleData?: any;
  propertyData?: any;
  commissionData?: any;
}

// Define document categories type
type DocumentCategory = {
  name: string;
  icon: React.ReactNode;
  description: string;
  documents: string[];
};

export function DocumentsSection({
  role = 'BUYERS AGENT',
  data = { documents: [], confirmDocuments: false },
  onChange
}: DocumentsSectionProps) {
  const [showValidationError, setShowValidationError] = useState(false);

  // Handle confirmation checkbox
  const handleConfirmationChange = (checked: boolean) => {
    onChange('confirmDocuments', checked);
    if (checked) {
      setShowValidationError(false);
      localStorage.removeItem('documentsValidated');
    }
  };

  // Define document categories with icons and descriptions
  const documentCategories: DocumentCategory[] = [
    {
      name: "Core Transaction Documents",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      description: "Essential documents required for all transactions",
      documents: [
        "Agreement of Sale",
        "Deposit Money Notice",
        "Cooperating Broker's Compensation",
        "KW Wire Fraud Notice",
      ]
    },
    {
      name: "Agency & Disclosure Documents",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      description: "Documents related to representation and disclosures",
      documents: [
        "Buyer's Agency Contract",
        "Listing Agreement",
        "Dual Agency Disclosure",
        "Consumer Notice",
        "KW Affiliate Services Disclosure",
        "Seller's Property Disclosure",
      ]
    },
    {
      name: "Financial Documents",
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      description: "Documents related to transaction costs",
      documents: [
        "Buyer's Estimated Costs",
        "Seller's Estimated Costs",
      ]
    },
    {
      name: "Property-Specific Documents",
      icon: <Home className="h-5 w-5 text-amber-600" />,
      description: "Documents specific to the property type and condition",
      documents: [
        "Lead Based Paint Disclosure",
        "Resale Certificate",
        "Certificate of Occupancy",
      ]
    },
    {
      name: "Additional Documents",
      icon: <FileSpreadsheet className="h-5 w-5 text-gray-600" />,
      description: "Other important documents for your transaction",
      documents: [
        "Attorney Review Clause",
        "Referral Agreement & W-9",
        "Home Warranty Information",
      ]
    }
  ];

  // Filter categories based on role
  const getFilteredCategories = () => {
    return documentCategories.map(category => {
      let filteredDocs = category.documents;
      if (role === 'BUYERS AGENT') {
        filteredDocs = filteredDocs.filter(doc =>
          !doc.toLowerCase().includes('listing') &&
          !doc.toLowerCase().includes('seller')
        );
      } else if (role === 'LISTING AGENT') {
        filteredDocs = filteredDocs.filter(doc =>
          !doc.toLowerCase().includes('buyer')
        );
      }
      return {
        ...category,
        documents: filteredDocs
      };
    });
  };

  // Flatten all filtered documents into a single list
  const filteredCategories = getFilteredCategories();
  const allDocuments = filteredCategories.flatMap(cat => cat.documents);
  const uniqueDocuments = Array.from(new Set(allDocuments));

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

        {/* Document Categories */}
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
                <ul className="tf-document-list">
                  {category.documents.map((doc) => (
                    <li key={doc} className="tf-document-item">
                      <FileText className="tf-icon-sm" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
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
                I confirm that I have prepared all required documents and will upload them as required.
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
