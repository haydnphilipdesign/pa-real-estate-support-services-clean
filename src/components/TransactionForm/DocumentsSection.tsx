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
    <div className="space-y-8 w-full documents-section">
      <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900 dark:text-white">
        <ListChecks className="h-5 w-5 mr-2 text-blue-700 dark:text-blue-300" />
        Document Checklist
      </h3>
      <p className="text-sm mb-4 text-gray-900 dark:text-gray-100">
        Please review the list of required documents below. Ensure all are prepared and ready before confirming.
      </p>
      <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {uniqueDocuments.map((doc) => (
          <li key={doc} className="text-base flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="h-4 w-4 text-blue-700 dark:text-blue-200" />
            <span className="whitespace-normal">{doc}</span>
          </li>
        ))}
      </ul>
      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <Checkbox
            id="documentConfirmation"
            checked={data.confirmDocuments}
            onCheckedChange={(checked) => handleConfirmationChange(checked === true)}
            className={`h-5 w-5 rounded-sm
              ${data.confirmDocuments
                ? 'border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600'
                : showValidationError ? 'border-red-500 ring-2 ring-red-200' : 'border-blue-300'}
            `}
            required
            aria-required="true"
            aria-invalid={showValidationError && !data.confirmDocuments ? "true" : "false"}
          />
          <div className="flex flex-col justify-center">
            <label
              htmlFor="documentConfirmation"
              className={`text-sm font-medium ${showValidationError && !data.confirmDocuments ? 'text-red-600' : 'text-blue-800'}`}
            >
              <span className="text-red-500 mr-1">*</span>
              I confirm that I have prepared all required documents and will upload them as required.
            </label>
            {showValidationError && !data.confirmDocuments ? (
              <div className="flex items-center text-red-600 text-xs mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>This confirmation is required to proceed</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
