import React from "react";
import { 
  FileText, 
  CheckCircle,
  FileCheck,
  AlertTriangle,
  Lock
} from "lucide-react";
import { DocumentsData, AgentRole } from "@/types/transaction";

interface DocumentsSectionProps {
  formData?: any;
  role?: AgentRole | '' | null;
  data?: DocumentsData;
  onChange?: (field: string, value: any) => void;
}

interface DocumentItem {
  name: string;
  description: string;
  required: boolean;
}

interface RoleDocumentConfig {
  title: string;
  subtitle: string;
  documents: DocumentItem[];
}

export function DocumentsSection({
  formData,
  role = null,
  data = { documents: [], confirmDocuments: false },
  onChange
}: DocumentsSectionProps) {
  // Handle both direct props and formData props
  const actualRole = role || formData?.agentData?.role;
  const actualData = data || formData?.documentsData || { documents: [], confirmDocuments: false };
  const actualOnChange = onChange || ((field: string, value: any) => {
    // For generic form rendering, we need to prefix with documentsData
    if (onChange) {
      onChange(`documentsData.${field}`, value);
    }
  });

  // Document configurations by role
  const ROLE_DOCUMENTS: Record<string, RoleDocumentConfig> = {
    'LISTING AGENT': {
      title: "Listing Agent Documents",
      subtitle: "Required documentation for seller representation",
      documents: [
        {
          name: "Agreement of Sale & Addendums",
          description: "Primary purchase contract with all applicable addendums",
          required: true
        },
        {
          name: "KW Wire Fraud Advisory",
          description: "Keller Williams wire fraud prevention advisory",
          required: true
        },
        {
          name: "Cooperating Broker's Compensation Agreement (CBC)",
          description: "Commission agreement between listing and selling brokers",
          required: true
        },
        {
          name: "KW Affiliate Services Addendum",
          description: "Keller Williams affiliate services addendum",
          required: true
        },
        {
          name: "Seller's Property Disclosure",
          description: "Required seller disclosures about property condition",
          required: true
        },
        {
          name: "Buyer's Financial Qualification",
          description: "Prequalification/preapproval letter or proof of funds",
          required: true
        },
        {
          name: "Seller's Estimated Closing Costs",
          description: "Detailed closing cost estimates for seller",
          required: true
        },
        {
          name: "Lead Based Paint Disclosure",
          description: "Required for properties built before 1978",
          required: false
        },
        {
          name: "Attorney Review Clause",
          description: "Legal review period terms when applicable",
          required: false
        },
        {
          name: "Dual Agency Disclosure",
          description: "Required when representing both parties",
          required: false
        }
      ]
    },
    'BUYERS AGENT': {
      title: "Buyer's Agent Documents",
      subtitle: "Required documentation for buyer representation",
      documents: [
        {
          name: "Agreement of Sale & Addendums",
          description: "Primary purchase contract with all applicable addendums",
          required: true
        },
        {
          name: "KW Wire Fraud Advisory",
          description: "Keller Williams wire fraud prevention advisory",
          required: true
        },
        {
          name: "Cooperating Broker's Compensation Agreement (CBC)",
          description: "Commission agreement between listing and selling brokers",
          required: true
        },
        {
          name: "Consumer Notice",
          description: "PA required consumer relationship disclosure",
          required: true
        },
        {
          name: "Buyer's Agency Contract",
          description: "Exclusive representation agreement with buyer",
          required: true
        },
        {
          name: "KW Affiliate Services Disclosure",
          description: "Keller Williams affiliate services disclosure",
          required: true
        },
        {
          name: "Buyer's Financial Qualification",
          description: "Prequalification/preapproval letter or proof of funds",
          required: true
        },
        {
          name: "Deposit Money Notice",
          description: "Notice of earnest money deposit requirements",
          required: true
        },
        {
          name: "Buyer's Estimated Closing Costs",
          description: "Detailed closing cost estimates for buyer",
          required: true
        },
        {
          name: "Seller's Property Disclosure",
          description: "Seller disclosures about property condition",
          required: true
        },
        {
          name: "KW Home Warranty Waiver",
          description: "Home warranty waiver documentation",
          required: true
        },
        {
          name: "Lead Based Paint Disclosure",
          description: "Required for properties built before 1978",
          required: false
        },
        {
          name: "Attorney Review Clause",
          description: "Legal review period terms when applicable",
          required: false
        }
      ]
    },
    'DUAL AGENT': {
      title: "Dual Agent Documents",
      subtitle: "Required documentation for dual agency representation",
      documents: [
        {
          name: "Agreement of Sale & Addendums",
          description: "Primary purchase contract with all applicable addendums",
          required: true
        },
        {
          name: "KW Wire Fraud Advisory",
          description: "Keller Williams wire fraud prevention advisory",
          required: true
        },
        {
          name: "Dual Agency Disclosure",
          description: "Required disclosure for dual agency representation",
          required: true
        },
        {
          name: "Consumer Notice",
          description: "PA required consumer relationship disclosure",
          required: true
        },
        {
          name: "Buyer's Agency Contract",
          description: "Exclusive representation agreement with buyer",
          required: true
        },
        {
          name: "KW Affiliate Services Disclosure",
          description: "Keller Williams affiliate services disclosure",
          required: true
        },
        {
          name: "KW Affiliate Services Addendum",
          description: "Keller Williams affiliate services addendum",
          required: true
        },
        {
          name: "Buyer's Financial Qualification",
          description: "Prequalification/preapproval letter or proof of funds",
          required: true
        },
        {
          name: "Seller's Estimated Closing Costs",
          description: "Detailed closing cost estimates for seller",
          required: true
        },
        {
          name: "Buyer's Estimated Closing Costs",
          description: "Detailed closing cost estimates for buyer",
          required: true
        },
        {
          name: "Deposit Money Notice",
          description: "Notice of earnest money deposit requirements",
          required: true
        },
        {
          name: "Seller's Property Disclosure",
          description: "Required seller disclosures about property condition",
          required: true
        },
        {
          name: "KW Home Warranty Waiver",
          description: "Home warranty waiver documentation",
          required: true
        },
        {
          name: "Lead Based Paint Disclosure",
          description: "Required for properties built before 1978",
          required: false
        },
        {
          name: "Attorney Review Clause",
          description: "Legal review period terms when applicable",
          required: false
        }
      ]
    }
  };

  // Get current role documents
  const getCurrentRoleDocuments = (): RoleDocumentConfig => {
    if (!actualRole || actualRole === '' || actualRole === null) {
      return {
        title: "Document Checklist",
        subtitle: "Please select your agent role to view required documents",
        documents: []
      };
    }

    const normalizedRole = actualRole.toString().toUpperCase().trim();
    return ROLE_DOCUMENTS[normalizedRole] || {
      title: "Document Checklist", 
      subtitle: "Please select a valid agent role",
      documents: []
    };
  };

  const roleData = getCurrentRoleDocuments();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mr-6">
            <FileCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{roleData.title}</h2>
            <p className="text-slate-300 text-lg">{roleData.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Document List */}
      {roleData.documents.length > 0 ? (
        <div className="space-y-4">
          {roleData.documents.map((doc, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h3 className="font-bold text-gray-900 mr-3 text-lg">
                      {doc.name}
                    </h3>
                    {doc.required ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                        Conditional
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <div className="ml-6 flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Agent Role Required</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Please select your agent role in the first step to view the document requirements for your transaction.
          </p>
        </div>
      )}

      {/* Confirmation Section */}
      {roleData.documents.length > 0 && (
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-8 text-white">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mr-6 flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Document Confirmation</h3>
              <p className="text-emerald-100 mb-6 text-lg leading-relaxed">
                As a licensed real estate professional, please confirm that all required documents 
                have been prepared and will be provided for this transaction.
              </p>
              
              <div className="flex items-start space-x-4">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    id="documentConfirmation"
                    checked={actualData?.confirmDocuments || false}
                    onChange={(e) => actualOnChange('confirmDocuments', e.target.checked)}
                    className="h-5 w-5 rounded border-2 border-emerald-300 bg-emerald-800/50 focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-800 checked:bg-emerald-500 checked:border-emerald-500"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="documentConfirmation" className="text-lg font-semibold text-white cursor-pointer block">
                    I confirm that all required documents have been prepared and will be provided for this transaction.
                  </label>
                  <p className="text-emerald-200 mt-2 text-sm">
                    This confirmation is required to proceed to the signature section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}