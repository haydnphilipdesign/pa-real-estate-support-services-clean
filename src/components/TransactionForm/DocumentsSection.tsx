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

  // ⭐⭐⭐ MICHELIN STAR ROLE DETECTION
  // Flawless role handling with bulletproof type safety
  const getCurrentRoleDocuments = () => {
    // DEBUG: Let's see what we're actually getting
    console.log('DocumentsSection Debug:', {
      role,
      roleType: typeof role,
      roleString: String(role),
      availableRoles: Object.keys(DOCUMENT_LISTS)
    });
    
    // Handle all possible role formats and edge cases
    const normalizedRole = role?.toString().toUpperCase().trim() as keyof typeof DOCUMENT_LISTS;
    
    console.log('Normalized role:', normalizedRole);
    console.log('Has role in list:', !!DOCUMENT_LISTS[normalizedRole]);
    
    if (!normalizedRole || !DOCUMENT_LISTS[normalizedRole]) {
      return {
        title: "Document Checklist",
        subtitle: "Please select your role to view required documents",
        documents: []
      };
    }
    
    return DOCUMENT_LISTS[normalizedRole];
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
      {/* ⭐⭐⭐ MICHELIN STAR HERO HEADER - ABSOLUTE PERFECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-10 text-white shadow-2xl">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-400/10 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
        
        <div className="relative flex items-start justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl mr-8 shadow-xl border border-white/20">
              <FileCheck className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent tracking-tight">
                {roleData.title}
              </h1>
              <p className="text-blue-100 text-xl mb-2 font-medium tracking-wide">
                {roleData.subtitle}
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-blue-200 text-sm font-medium">
                  {role ? `Expertly curated for ${role.toLowerCase()} excellence` : 'Awaiting role selection for personalized experience'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Elegant statistics card */}
          <div className="text-right">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-5xl font-black mb-2 bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
                {requiredCount}
              </div>
              <div className="text-sm text-blue-100 font-semibold mb-1">Required Documents</div>
              <div className="text-xs text-blue-300 opacity-80">{totalCount} comprehensive documents</div>
              <div className="mt-3 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                </div>
              </div>
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
              <div key={category} className={`rounded-3xl border border-white/20 ${theme.bg} shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden group`}>
                {/* ⭐⭐⭐ MICHELIN STAR CATEGORY HEADER */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-8 flex items-center justify-between hover:bg-white/20 transition-all duration-300 rounded-3xl group-hover:scale-[1.02] transform"
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-16 h-16 ${theme.accent} rounded-2xl mr-6 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/30`}>
                      {getCategoryIcon(category)}
                    </div>
                    <div className="text-left">
                      <h3 className={`text-xl font-black ${theme.text} tracking-wide mb-1 group-hover:text-slate-800 transition-colors`}>
                        {category}
                      </h3>
                      <p className={`text-sm ${theme.text}/80 font-medium`}>
                        {requiredInCategory} essential • {documents.length} comprehensive documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {isExpanded ? (
                      <ChevronUp className={`w-7 h-7 ${theme.text} transition-all duration-500 transform group-hover:scale-125 group-hover:-translate-y-1`} />
                    ) : (
                      <ChevronDown className={`w-7 h-7 ${theme.text} transition-all duration-500 transform group-hover:scale-125 group-hover:translate-y-1`} />
                    )}
                  </div>
                </button>

                {/* ⭐⭐⭐ MICHELIN STAR DOCUMENT LIST */}
                {isExpanded && (
                  <div className="border-t border-white/20 p-8 space-y-5">
                    {documents.map((doc, index) => (
                      <div key={index} className="group bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/60 hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-white/80">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <h4 className="font-black text-slate-900 mr-4 text-lg tracking-wide group-hover:text-blue-900 transition-colors">
                                {doc.name}
                              </h4>
                              {doc.required ? (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg border border-red-300 animate-pulse">
                                  ⚡ ESSENTIAL
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border border-slate-300 shadow-sm">
                                  ✨ CONDITIONAL
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed font-medium tracking-wide">
                              {doc.description}
                            </p>
                          </div>
                          <div className="ml-6 flex-shrink-0">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 border border-blue-300">
                              <FileText className="w-7 h-7 text-white drop-shadow-lg" />
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

      {/* ⭐⭐⭐ MICHELIN STAR CONFIRMATION SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 rounded-3xl p-10 shadow-2xl border border-emerald-800">
        {/* Elegant background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-radial from-emerald-400/10 to-transparent rounded-full transform -translate-x-24 translate-y-24"></div>
        
        <div className="relative flex items-start">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl mr-8 flex-shrink-0 shadow-2xl border border-emerald-300 animate-pulse">
            <CheckCircle className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent tracking-tight">
              Professional Confirmation
            </h2>
            <p className="text-emerald-100 mb-8 text-lg leading-relaxed font-medium tracking-wide">
              As a licensed real estate professional, please confirm your commitment to excellence by acknowledging 
              that all essential documents have been meticulously prepared for this transaction.
            </p>
            
            <div className="flex items-start space-x-6">
              <div className="relative">
                <input
                  type="checkbox"
                  id="documentConfirmation"
                  checked={data?.confirmDocuments || false}
                  onChange={(e) => onChange('confirmDocuments', e.target.checked)}
                  className="peer mt-2 h-6 w-6 rounded-lg border-2 border-emerald-300 bg-white/10 backdrop-blur-sm focus:ring-4 focus:ring-emerald-300/50 focus:ring-offset-2 focus:ring-offset-emerald-900 checked:bg-emerald-400 checked:border-emerald-400 transition-all duration-300 cursor-pointer"
                  style={{ accentColor: '#10b981' }}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-400/20 to-green-400/20 opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="flex-1">
                <label htmlFor="documentConfirmation" className="text-lg font-bold text-white cursor-pointer block tracking-wide">
                  <span className="text-yellow-300 mr-3 text-xl">⚡</span>
                  I solemnly confirm that all essential documents have been expertly prepared and will be delivered with professional excellence throughout this transaction.
                </label>
                <p className="text-emerald-200 mt-3 text-sm font-medium opacity-90">
                  This professional commitment enables progression to the digital signature phase of your transaction workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}