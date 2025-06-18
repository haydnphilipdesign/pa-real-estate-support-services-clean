import React, { useState } from "react";
import { 
  FileText, 
  Users, 
  DollarSign, 
  Home, 
  Shield,
  CheckCircle,
  FileCheck,
  Building,
  Scale,
  ClipboardCheck,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { DocumentsData, AgentRole } from "@/types/transaction";

interface DocumentsSectionProps {
  role?: AgentRole | null;
  data: DocumentsData;
  onChange: (field: string, value: any) => void;
}

interface DocumentItem {
  name: string;
  description: string;
  category: string;
  required: boolean;
}

export function DocumentsSection({
  role = null,
  data = { documents: [], confirmDocuments: false },
  onChange
}: DocumentsSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Core Transaction']));

  // 🎯 SIMPLIFIED ROLE-BASED DOCUMENT DEFINITIONS
  // Clean, maintainable architecture with no conditional complexity
  
  const DOCUMENT_LISTS = {
    'LISTING AGENT': {
      title: "Listing Agent Documents",
      subtitle: "Complete documentation for seller representation",
      documents: [
        // Core Transaction
        {
          name: "Agreement of Sale & corresponding Addendum",
          description: "Primary contract between buyer and seller with all addendums",
          category: "Core Transaction",
          required: true
        },
        {
          name: "KW Wire Fraud Advisory",
          description: "Keller Williams wire fraud prevention advisory",
          category: "Core Transaction",
          required: true
        },
        {
          name: "Cooperating Broker's Compensation Agreement (CBC)",
          description: "Commission agreement between cooperating brokers",
          category: "Core Transaction",
          required: true
        },
        
        // Financial Documentation
        {
          name: "Buyer's Prequalification or Preapproval Letter or Proof of Funds",
          description: "Buyer's financial qualification documentation",
          category: "Financial Documentation",
          required: true
        },
        {
          name: "Seller's Estimated Costs Sheet",
          description: "Detailed closing cost estimates for seller based on purchase price",
          category: "Financial Documentation",
          required: true
        },
        
        // Agency & Disclosure
        {
          name: "KW Affiliate Services Addendum",
          description: "Keller Williams affiliate services addendum",
          category: "Agency & Disclosure",
          required: true
        },
        {
          name: "Seller's Property Disclosure",
          description: "Required seller disclosures about property condition and history",
          category: "Property Disclosures",
          required: true
        },
        
        // Conditional Documents
        {
          name: "Lead Based Paint Disclosure",
          description: "Required for properties built before 1978",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Attorney Review Clause",
          description: "Legal review period terms when attorney representation is involved",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Dual Agency Disclosure",
          description: "Required when agents are from same brokerage",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Referral Agreement & W-9",
          description: "Required documentation for referral transactions",
          category: "Conditional Documents",
          required: false
        }
      ]
    },

    'BUYERS AGENT': {
      title: "Buyer's Agent Documents",
      subtitle: "Complete documentation for buyer representation",
      documents: [
        // Core Transaction
        {
          name: "Agreement of Sale & corresponding Addendum",
          description: "Primary contract between buyer and seller with all addendums",
          category: "Core Transaction",
          required: true
        },
        {
          name: "KW Wire Fraud Advisory",
          description: "Keller Williams wire fraud prevention advisory",
          category: "Core Transaction",
          required: true
        },
        {
          name: "Cooperating Broker's Compensation Agreement (CBC)",
          description: "Commission agreement between cooperating brokers",
          category: "Core Transaction",
          required: true
        },
        
        // Agency & Disclosure
        {
          name: "KW Affiliate Services Disclosure",
          description: "Keller Williams affiliate services disclosure",
          category: "Agency & Disclosure",
          required: true
        },
        {
          name: "Consumer Notice",
          description: "PA required consumer relationship disclosure",
          category: "Agency & Disclosure",
          required: true
        },
        {
          name: "Buyer's Agency Contract",
          description: "Exclusive representation agreement with buyer",
          category: "Agency & Disclosure",
          required: true
        },
        
        // Financial Documentation
        {
          name: "Buyer's Prequalification/Preapproval Letter or Proof of Funds",
          description: "Buyer's financial qualification documentation",
          category: "Financial Documentation",
          required: true
        },
        {
          name: "Deposit Money Notice",
          description: "Notice of earnest money deposit requirements",
          category: "Financial Documentation",
          required: true
        },
        {
          name: "Buyer's Estimated Costs",
          description: "Detailed closing cost estimates for buyer",
          category: "Financial Documentation",
          required: true
        },
        
        // Property & Settlement
        {
          name: "Seller's Property Disclosure",
          description: "Seller disclosures about property condition and history",
          category: "Property Disclosures",
          required: true
        },
        {
          name: "KW Home Warranty Waiver",
          description: "Home warranty waiver documentation",
          category: "Settlement Services",
          required: true
        },
        
        // Optional Services
        {
          name: "KPSS ABA",
          description: "Keystone Premier Settlement Services agreement (if using)",
          category: "Optional Services",
          required: false
        },
        {
          name: "For Your Protection Notice",
          description: "Consumer protection notice (if applicable)",
          category: "Optional Services",
          required: false
        },
        
        // Conditional Documents
        {
          name: "Lead Based Paint Disclosure",
          description: "Required for properties built before 1978",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Attorney Review Clause",
          description: "Legal review period terms when attorney representation is involved",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Dual Agency Disclosure",
          description: "Required when agents are from same brokerage",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Referral Agreement & W-9",
          description: "Required documentation for referral transactions",
          category: "Conditional Documents",
          required: false
        }
      ]
    },

    'DUAL AGENT': {
      title: "Dual Agent Documents",
      subtitle: "Complete documentation for dual agency representation",
      documents: [
        // Core Transaction
        {
          name: "Agreement of Sale & corresponding Addendum",
          description: "Primary contract between buyer and seller with all addendums",
          category: "Core Transaction",
          required: true
        },
        {
          name: "KW Wire Fraud Advisory",
          description: "Keller Williams wire fraud prevention advisory",
          category: "Core Transaction",
          required: true
        },
        {
          name: "Dual Agency Disclosure",
          description: "Required disclosure for dual agency representation",
          category: "Core Transaction",
          required: true
        },
        
        // Agency & Disclosure
        {
          name: "KW Affiliate Services Disclosure",
          description: "Keller Williams affiliate services disclosure",
          category: "Agency & Disclosure",
          required: true
        },
        {
          name: "KW Affiliate Services Addendum",
          description: "Keller Williams affiliate services addendum",
          category: "Agency & Disclosure",
          required: true
        },
        {
          name: "Consumer Notice",
          description: "PA required consumer relationship disclosure",
          category: "Agency & Disclosure",
          required: true
        },
        {
          name: "Buyer's Agency Contract",
          description: "Exclusive representation agreement with buyer",
          category: "Agency & Disclosure",
          required: true
        },
        
        // Financial Documentation - Buyer Side
        {
          name: "Buyer's Prequalification/Preapproval Letter or Proof of Funds",
          description: "Buyer's financial qualification documentation",
          category: "Financial Documentation",
          required: true
        },
        {
          name: "Deposit Money Notice",
          description: "Notice of earnest money deposit requirements",
          category: "Financial Documentation",
          required: true
        },
        {
          name: "Buyer's Estimated Costs",
          description: "Detailed closing cost estimates for buyer",
          category: "Financial Documentation",
          required: true
        },
        {
          name: "Seller's Estimated Costs Sheet",
          description: "Detailed closing cost estimates for seller based on purchase price",
          category: "Financial Documentation",
          required: true
        },
        
        // Property Disclosures
        {
          name: "Seller's Property Disclosure",
          description: "Required seller disclosures about property condition and history",
          category: "Property Disclosures",
          required: true
        },
        
        // Settlement Services
        {
          name: "KW Home Warranty Waiver",
          description: "Home warranty waiver documentation",
          category: "Settlement Services",
          required: true
        },
        
        // Optional Services
        {
          name: "KPSS ABA",
          description: "Keystone Premier Settlement Services agreement (if using)",
          category: "Optional Services",
          required: false
        },
        {
          name: "For Your Protection Notice",
          description: "Consumer protection notice (if applicable)",
          category: "Optional Services",
          required: false
        },
        
        // Conditional Documents
        {
          name: "Lead Based Paint Disclosure",
          description: "Required for properties built before 1978",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Attorney Review Clause",
          description: "Legal review period terms when attorney representation is involved",
          category: "Conditional Documents",
          required: false
        },
        {
          name: "Referral Agreement & W-9",
          description: "Required documentation for referral transactions",
          category: "Conditional Documents",
          required: false
        }
      ]
    }
  };

  // Get documents for current role
  const getCurrentRoleDocuments = () => {
    if (!role || !DOCUMENT_LISTS[role]) {
      return {
        title: "Document Checklist",
        subtitle: "Please select your role to view required documents",
        documents: []
      };
    }
    return DOCUMENT_LISTS[role];
  };

  // Group documents by category
  const getDocumentsByCategory = () => {
    const roleData = getCurrentRoleDocuments();
    const categories: Record<string, DocumentItem[]> = {};
    
    roleData.documents.forEach(doc => {
      if (!categories[doc.category]) {
        categories[doc.category] = [];
      }
      categories[doc.category].push(doc);
    });
    
    return categories;
  };

  // 🎨 SUPERIOR DESIGN SYSTEM
  // Professional category theming with enhanced visual hierarchy
  
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Core Transaction": <FileText className="w-5 h-5" />,
      "Agency & Disclosure": <Users className="w-5 h-5" />,
      "Financial Documentation": <DollarSign className="w-5 h-5" />,
      "Property Disclosures": <Home className="w-5 h-5" />,
      "Settlement Services": <Building className="w-5 h-5" />,
      "Optional Services": <Shield className="w-5 h-5" />,
      "Conditional Documents": <ClipboardCheck className="w-5 h-5" />
    };
    return iconMap[category] || <FileText className="w-5 h-5" />;
  };

  const getCategoryTheme = (category: string) => {
    const themeMap: Record<string, {
      bg: string;
      border: string;
      text: string;
      accent: string;
    }> = {
      "Core Transaction": {
        bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
        border: "border-blue-200",
        text: "text-blue-900",
        accent: "bg-blue-600"
      },
      "Agency & Disclosure": {
        bg: "bg-gradient-to-br from-purple-50 to-violet-50",
        border: "border-purple-200",
        text: "text-purple-900",
        accent: "bg-purple-600"
      },
      "Financial Documentation": {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        border: "border-green-200",
        text: "text-green-900",
        accent: "bg-green-600"
      },
      "Property Disclosures": {
        bg: "bg-gradient-to-br from-amber-50 to-orange-50",
        border: "border-amber-200",
        text: "text-amber-900",
        accent: "bg-amber-600"
      },
      "Settlement Services": {
        bg: "bg-gradient-to-br from-cyan-50 to-blue-50",
        border: "border-cyan-200",
        text: "text-cyan-900",
        accent: "bg-cyan-600"
      },
      "Optional Services": {
        bg: "bg-gradient-to-br from-slate-50 to-gray-50",
        border: "border-slate-200",
        text: "text-slate-900",
        accent: "bg-slate-600"
      },
      "Conditional Documents": {
        bg: "bg-gradient-to-br from-pink-50 to-rose-50",
        border: "border-pink-200",
        text: "text-pink-900",
        accent: "bg-pink-600"
      }
    };
    return themeMap[category] || themeMap["Optional Services"];
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

  // Calculate document statistics
  const roleData = getCurrentRoleDocuments();
  const documentsByCategory = getDocumentsByCategory();
  const requiredCount = roleData.documents.filter(doc => doc.required).length;
  const totalCount = roleData.documents.length;

  return (
    <div className="space-y-8">
      {/* 🎯 PREMIUM HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-start justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mr-6">
              <FileCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{roleData.title}</h2>
              <p className="text-blue-100 text-lg mb-1">{roleData.subtitle}</p>
              <p className="text-blue-200 text-sm">
                {role ? `Customized for ${role.toLowerCase()} requirements` : 'Select your role to view documents'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="text-4xl font-bold mb-1">{requiredCount}</div>
              <div className="text-sm text-blue-100">Required Documents</div>
              <div className="text-xs text-blue-200">{totalCount} total documents</div>
            </div>
          </div>
        </div>
      </div>

      {/* 📋 DOCUMENT CATEGORIES */}
      {roleData.documents.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(documentsByCategory).map(([category, documents]) => {
            const isExpanded = expandedCategories.has(category);
            const requiredInCategory = documents.filter(doc => doc.required).length;
            const theme = getCategoryTheme(category);
            
            return (
              <div key={category} className={`rounded-2xl border-2 ${theme.border} ${theme.bg} shadow-sm hover:shadow-md transition-all duration-200`}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/30 transition-colors rounded-2xl group"
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 ${theme.accent} rounded-xl mr-4 text-white shadow-sm group-hover:scale-105 transition-transform`}>
                      {getCategoryIcon(category)}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-semibold ${theme.text}`}>{category}</h3>
                      <p className={`text-sm ${theme.text}/70`}>
                        {requiredInCategory} required • {documents.length} total documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs bg-white/70 ${theme.text} px-3 py-1 rounded-full font-medium`}>
                      {documents.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className={`w-5 h-5 ${theme.text} transition-transform`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${theme.text} transition-transform`} />
                    )}
                  </div>
                </button>

                {/* Document List */}
                {isExpanded && (
                  <div className="border-t border-white/30 p-6 space-y-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/90 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="font-semibold text-gray-900 mr-3">{doc.name}</h4>
                              {doc.required ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                  Required
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                  Optional
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{doc.description}</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                              <FileText className="w-5 h-5 text-gray-500" />
                            </div>
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
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Role Selected</h3>
          <p className="text-gray-600">Please select your agent role to view the document requirements.</p>
        </div>
      )}

      {/* ✅ CONFIRMATION SECTION */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-sm">
        <div className="flex items-start">
          <div className="flex items-center justify-center w-14 h-14 bg-green-600 rounded-xl mr-6 flex-shrink-0 shadow-sm">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Document Confirmation</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Please confirm that you have prepared all required documents listed above and understand 
              which documents will be needed throughout the transaction process.
            </p>
            
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                id="documentConfirmation"
                checked={data?.confirmDocuments || false}
                onChange={(e) => onChange('confirmDocuments', e.target.checked)}
                className="mt-1.5 h-5 w-5 rounded border-2 border-green-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 checked:bg-green-500 checked:border-green-500 transition-colors"
                style={{ accentColor: '#10b981' }}
              />
              <div>
                <label htmlFor="documentConfirmation" className="text-base font-medium text-gray-900 cursor-pointer block">
                  <span className="text-red-500 mr-2">*</span>
                  I confirm that I have prepared all required documents and will provide them as needed for this transaction.
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  This confirmation is required to proceed to the signature section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}