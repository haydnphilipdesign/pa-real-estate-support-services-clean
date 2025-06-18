import React, { useState } from "react";
import { 
  FileText, 
  Users, 
  DollarSign, 
  Home, 
  Shield,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Building,
  Scale,
  ClipboardCheck
} from "lucide-react";
import { DocumentsData, AgentRole } from "@/types/transaction";

interface DocumentsSectionProps {
  role?: AgentRole | null;
  data: DocumentsData;
  onChange: (field: string, value: any) => void;
  propertyData?: {
    isBuiltBefore1978?: 'YES' | 'NO' | '';
    propertyType?: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND';
    status?: 'OCCUPIED' | 'VACANT';
  };
  propertyDetailsData?: {
    resaleCertRequired?: boolean;
    hoaName?: string;
    coRequired?: boolean;
    municipality?: string;
    homeWarranty?: boolean;
    warrantyCompany?: string;
    warrantyCost?: string;
    warrantyPaidBy?: 'SELLER' | 'BUYER' | 'AGENT' | 'SPLIT';
    attorneyRepresentation?: boolean;
    attorneyName?: string;
    firstRightOfRefusal?: boolean;
    firstRightName?: string;
  };
  commissionData?: {
    isReferral?: boolean;
    referralParty?: string;
    referralFee?: string;
  };
}

interface DocumentItem {
  name: string;
  required: boolean;
  description?: string;
  roles: AgentRole[];
  category: string;
}

export function DocumentsSection({
  role = null,
  data = { documents: [], confirmDocuments: false },
  onChange,
  propertyData,
  propertyDetailsData,
  commissionData
}: DocumentsSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Official KW document requirements by role
  const allDocuments: DocumentItem[] = [
    // Core Transaction Documents (Both Sides)
    {
      name: "Agreement of Sale & corresponding Addendum",
      required: true,
      description: "Primary contract between buyer and seller with addendums",
      roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'],
      category: "Core Transaction"
    },
    {
      name: "KW Wire Fraud Advisory",
      required: true,
      description: "Keller Williams wire fraud prevention advisory",
      roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'],
      category: "Core Transaction"
    },
    {
      name: "Cooperating Broker's Compensation Agreement (CBC)",
      required: true,
      description: "Commission agreement between cooperating brokers",
      roles: ['BUYERS AGENT', 'LISTING AGENT'],
      category: "Core Transaction"
    },

    // Seller's Side Documents
    {
      name: "Buyer's Prequalification or Preapproval Letter or Proof of Funds",
      required: true,
      description: "Buyer's financial qualification documentation",
      roles: ['LISTING AGENT', 'DUAL AGENT'],
      category: "Financial"
    },
    {
      name: "KW Affiliate Services Addendum",
      required: true,
      description: "Keller Williams affiliate services addendum",
      roles: ['LISTING AGENT', 'DUAL AGENT'],
      category: "Agency & Disclosure"
    },
    {
      name: "Seller's Property Disclosure",
      required: true,
      description: "Required seller disclosures about property condition",
      roles: ['LISTING AGENT', 'DUAL AGENT'],
      category: "Property Disclosures"
    },
    {
      name: "Seller's Estimated Costs sheet (based on purchase price)",
      required: true,
      description: "Estimated closing costs for seller",
      roles: ['LISTING AGENT', 'DUAL AGENT'],
      category: "Financial"
    },

    // Buyer's Side Documents
    {
      name: "KW Affiliate Services Disclosure",
      required: true,
      description: "Keller Williams affiliate services disclosure",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Agency & Disclosure"
    },
    {
      name: "KW Home Warranty Waiver",
      required: true,
      description: "Home warranty waiver documentation",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Additional"
    },
    {
      name: "Consumer Notice",
      required: true,
      description: "PA required consumer relationship disclosure",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Agency & Disclosure"
    },
    {
      name: "Buyer's Agency Contract",
      required: true,
      description: "Exclusive representation agreement with buyer",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Agency & Disclosure"
    },
    {
      name: "Buyer's Prequalification/Preapproval Letter, Proof of Funds",
      required: true,
      description: "Buyer's financial qualification documentation",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Financial"
    },
    {
      name: "Deposit Money Notice",
      required: true,
      description: "Notice of earnest money deposit",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Financial"
    },
    {
      name: "Buyer's Estimated Costs",
      required: true,
      description: "Estimated closing costs for buyer",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Financial"
    },
    {
      name: "Covid-19 PAN",
      required: true,
      description: "Covid-19 Property Access Notice",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Additional"
    },
    {
      name: "KPSS ABA (if using Keystone Premier Settlement)",
      required: false,
      description: "Keystone Premier Settlement Services agreement",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Settlement"
    },
    {
      name: "For Your Protection Notice (if applicable)",
      required: false,
      description: "Consumer protection notice",
      roles: ['BUYERS AGENT', 'DUAL AGENT'],
      category: "Additional"
    },

    // Conditional Documents (Both Sides)
    {
      name: "Attorney Review Clause (if applicable)",
      required: propertyDetailsData?.attorneyRepresentation === true,
      description: propertyDetailsData?.attorneyRepresentation 
        ? "Required legal review period terms" 
        : "Only required if attorney representation is involved",
      roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'],
      category: "Legal"
    },
    {
      name: "Lead Based Paint Disclosure (if applicable)",
      required: propertyData?.isBuiltBefore1978 === 'YES',
      description: propertyData?.isBuiltBefore1978 === 'YES' 
        ? "Required for properties built before 1978" 
        : "Only required for properties built before 1978",
      roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'],
      category: "Property Disclosures"
    },
    {
      name: "Dual Agency Disclosure (if applicable)",
      required: false,
      description: "Required when both agents are from the same brokerage or single agent represents both parties",
      roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'],
      category: "Agency & Disclosure"
    },
    {
      name: "Referral Agreement & W-9 (if applicable)",
      required: commissionData?.isReferral === true,
      description: commissionData?.isReferral 
        ? "Required referral fee documentation" 
        : "Only required for referral transactions",
      roles: ['BUYERS AGENT', 'LISTING AGENT', 'DUAL AGENT'],
      category: "Additional"
    }
  ];

  // Filter documents by current role
  const getDocumentsByRole = () => {
    if (!role) {
      console.warn('DocumentsSection: No role provided, returning all documents');
      return allDocuments; // Return all documents if no role specified
    }
    return allDocuments.filter(doc => doc.roles.includes(role));
  };

  // Group documents by category
  const getDocumentsByCategory = () => {
    const roleDocuments = getDocumentsByRole();
    const categories: Record<string, DocumentItem[]> = {};
    
    roleDocuments.forEach(doc => {
      if (!categories[doc.category]) {
        categories[doc.category] = [];
      }
      categories[doc.category].push(doc);
    });
    
    return categories;
  };

  // Get category icons
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Core Transaction": <FileText className="w-5 h-5" />,
      "Agency & Disclosure": <Users className="w-5 h-5" />,
      "Financial": <DollarSign className="w-5 h-5" />,
      "Property Disclosures": <Home className="w-5 h-5" />,
      "Legal": <Scale className="w-5 h-5" />,
      "Settlement": <Building className="w-5 h-5" />,
      "Additional": <ClipboardCheck className="w-5 h-5" />
    };
    return iconMap[category] || <FileText className="w-5 h-5" />;
  };

  // Get category colors
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "Core Transaction": "bg-blue-50 border-blue-200 text-blue-900",
      "Agency & Disclosure": "bg-purple-50 border-purple-200 text-purple-900",
      "Financial": "bg-green-50 border-green-200 text-green-900",
      "Property Disclosures": "bg-amber-50 border-amber-200 text-amber-900",
      "Legal": "bg-gray-50 border-gray-200 text-gray-900",
      "Settlement": "bg-cyan-50 border-cyan-200 text-cyan-900",
      "Additional": "bg-pink-50 border-pink-200 text-pink-900"
    };
    return colorMap[category] || "bg-gray-50 border-gray-200 text-gray-900";
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const documentsByCategory = getDocumentsByCategory();
  const roleDocuments = getDocumentsByRole();
  const requiredCount = roleDocuments.filter(doc => doc.required).length;
  const totalCount = roleDocuments.length;
  
  // Debug logging
  console.log('=== DocumentsSection Debug ===');
  console.log('Props received:', {
    role,
    roleType: typeof role,
    roleValue: JSON.stringify(role),
    propertyData,
    propertyDataType: typeof propertyData,
    propertyDetailsData,
    propertyDetailsDataType: typeof propertyDetailsData,
    commissionData,
    commissionDataType: typeof commissionData
  });
  console.log('Document filtering:', {
    totalDocuments: allDocuments.length,
    roleDocuments: roleDocuments.length,
    requiredCount,
    roleThatWasPassed: role,
    roleType: typeof role
  });
  
  if (propertyData) {
    console.log('Property data contents:', {
      isBuiltBefore1978: propertyData.isBuiltBefore1978,
      propertyType: propertyData.propertyType,
      status: propertyData.status,
      allKeys: Object.keys(propertyData)
    });
  }
  
  if (propertyDetailsData) {
    console.log('Property details data contents:', {
      resaleCertRequired: propertyDetailsData.resaleCertRequired,
      homeWarranty: propertyDetailsData.homeWarranty,
      attorneyRepresentation: propertyDetailsData.attorneyRepresentation,
      allKeys: Object.keys(propertyDetailsData)
    });
  }
  
  if (commissionData) {
    console.log('Commission data contents:', {
      isReferral: commissionData.isReferral,
      allKeys: Object.keys(commissionData)
    });
  }
  
  console.log('Conditional logic checks:', {
    propertyBuiltBefore1978: propertyData?.isBuiltBefore1978,
    leadPaintRequired: propertyData?.isBuiltBefore1978 === 'YES',
    resaleCertRequired: propertyDetailsData?.resaleCertRequired,
    coRequired: propertyDetailsData?.coRequired,
    homeWarranty: propertyDetailsData?.homeWarranty,
    attorneyRepresentation: propertyDetailsData?.attorneyRepresentation,
    isReferral: commissionData?.isReferral
  });
  console.log('Filtered documents for role:', roleDocuments.map(d => `${d.name} (${d.required ? 'Required' : 'Optional'})`));

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mr-4">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Document Checklist</h3>
              <p className="text-sm text-gray-600 mt-1">
                {role?.toLowerCase().replace(' agent', '') || 'agent'} transaction requirements
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{requiredCount}</div>
            <div className="text-sm text-gray-500">Required Documents</div>
            <div className="text-xs text-gray-400">{totalCount} total documents</div>
          </div>
        </div>
      </div>

      {/* Document Categories */}
      <div className="space-y-4">
        {Object.entries(documentsByCategory).map(([category, documents]) => {
          const isExpanded = expandedCategories.has(category);
          const requiredInCategory = documents.filter(doc => doc.required).length;
          
          return (
            <div key={category} className={`rounded-xl border-2 ${getCategoryColor(category)}`}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors rounded-xl"
              >
                <div className="flex items-center">
                  <div className="mr-3 text-current">
                    {getCategoryIcon(category)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-current">{category}</h4>
                    <p className="text-sm opacity-75">
                      {requiredInCategory} required • {documents.length} total
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs bg-white/50 px-2 py-1 rounded-full mr-2">
                    {documents.length} docs
                  </span>
                  <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </div>
              </button>

              {/* Document List */}
              {isExpanded && (
                <div className="border-t border-current/20 p-4 space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="bg-white/70 rounded-lg p-3 border border-white/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h5 className="font-medium text-gray-900">{doc.name}</h5>
                            {doc.required && (
                              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Required
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                          )}
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-start">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mr-4 flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Document Confirmation</h4>
            <p className="text-sm text-gray-600 mb-4">
              Please confirm that you have prepared all required documents listed above and understand 
              which documents will be needed throughout the transaction process.
            </p>
            
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="documentConfirmation"
                checked={data?.confirmDocuments || false}
                onChange={(e) => onChange('confirmDocuments', e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 checked:bg-green-500 checked:border-green-500"
                style={{
                  accentColor: '#10b981'
                }}
              />
              <div>
                <label htmlFor="documentConfirmation" className="text-sm font-medium text-gray-900 cursor-pointer block">
                  <span className="text-red-500 mr-1">*</span>
                  I confirm that I have prepared all required documents and will provide them as needed for this transaction.
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  This confirmation is required to proceed to the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Information */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Role-Specific Requirements</p>
            <p className="text-xs text-gray-600">
              Document requirements are automatically filtered based on your role as {role?.toLowerCase()}.
              Some documents may not apply to your specific transaction type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}