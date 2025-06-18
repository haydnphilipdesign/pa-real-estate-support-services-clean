import React from 'react';
import { CheckCircle, Edit, Users, Home, DollarSign, Building, FileText, Shield, PenTool, Download, Printer } from "lucide-react";
import { TransactionFormData } from "@/types/transaction";
import html2pdf from 'html2pdf.js';

interface ReviewSectionProps {
  formData: {
    currentStep: number;
    goToStep: (step: number) => void;
  } & TransactionFormData;
  onChange: (field: string, value: any) => void;
  goToStep?: (step: number) => void;
  validationErrors?: Record<string, string>;
  touchedFields?: Set<string>;
  onFieldTouch?: (field: string) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  formData: data,
  goToStep
}) => {
  // Format currency values
  const formatCurrency = (value: string | number) => {
    if (!value) return 'Not specified';
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  // Format date values
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not specified';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * IMPROVED PDF GENERATION
   */
  const generatePDF = async () => {
    console.log('🔄 Starting PDF Generation...');
    
    // Cleanup any existing elements
    const existingElements = document.querySelectorAll('[id*="pdf-content"]');
    existingElements.forEach(el => el.remove());
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Helper function to get value with fallback
    const getValue = (value: any, fallback: string = '') => {
      if (value === undefined || value === null || value === '') return fallback;
      return value;
    };

    // Helper function for boolean values
    const getBooleanValue = (value: boolean | undefined) => {
      if (value === undefined) return '';
      return value ? 'Yes' : 'No';
    };

    // Fixed template structure - always shows all fields
    const sections = [
      {
        title: 'AGENT INFORMATION',
        data: [
          { label: 'Agent Name', value: getValue(data.agentData?.name) },
          { label: 'Agent Role', value: getValue(data.agentData?.role) },
          { label: 'Agent Email', value: getValue(data.agentData?.email) },
          { label: 'Agent Phone', value: getValue(data.agentData?.phone) }
        ]
      },
      {
        title: 'PROPERTY INFORMATION',
        data: [
          { label: 'Property Address', value: getValue(data.propertyData?.address) },
          { label: 'MLS Number', value: getValue(data.propertyData?.mlsNumber) },
          { label: 'Sale Price', value: data.propertyData?.salePrice ? formatCurrency(data.propertyData.salePrice) : '' },
          { label: 'Closing Date', value: data.propertyData?.closingDate ? formatDate(data.propertyData.closingDate) : '' },
          { label: 'Property Type', value: getValue(data.propertyData?.propertyType) },
          { label: 'County', value: getValue(data.propertyData?.county) },
          { label: 'Property Status', value: getValue(data.propertyData?.status) },
          { label: 'Winterized', value: getValue(data.propertyData?.isWinterized) },
          { label: 'Update MLS', value: getValue(data.propertyData?.updateMls) },
          { label: 'Property Access', value: getValue(data.propertyData?.propertyAccessType) },
          { label: 'Access Code', value: getValue(data.propertyData?.lockboxAccessCode) },
          { label: 'Built Before 1978', value: getValue(data.propertyData?.isBuiltBefore1978) }
        ]
      },
      {
        title: 'CLIENT INFORMATION',
        data: [
          // Client 1
          { label: 'Client 1 Name', value: getValue(data.clients?.[0]?.name) },
          { label: 'Client 1 Email', value: getValue(data.clients?.[0]?.email) },
          { label: 'Client 1 Phone', value: getValue(data.clients?.[0]?.phone) },
          { label: 'Client 1 Address', value: getValue(data.clients?.[0]?.address) },
          { label: 'Client 1 Type', value: getValue(data.clients?.[0]?.type) },
          { label: 'Client 1 Marital Status', value: getValue(data.clients?.[0]?.maritalStatus) },
          // Client 2
          { label: 'Client 2 Name', value: getValue(data.clients?.[1]?.name) },
          { label: 'Client 2 Email', value: getValue(data.clients?.[1]?.email) },
          { label: 'Client 2 Phone', value: getValue(data.clients?.[1]?.phone) },
          { label: 'Client 2 Address', value: getValue(data.clients?.[1]?.address) },
          { label: 'Client 2 Type', value: getValue(data.clients?.[1]?.type) },
          { label: 'Client 2 Marital Status', value: getValue(data.clients?.[1]?.maritalStatus) }
        ]
      },
      {
        title: 'COMMISSION STRUCTURE',
        data: [
          { label: 'Total Commission %', value: data.commissionData?.totalCommissionPercentage ? `${data.commissionData.totalCommissionPercentage}%` : '' },
          { label: 'Listing Agent %', value: data.commissionData?.listingAgentPercentage ? `${data.commissionData.listingAgentPercentage}%` : '' },
          { label: 'Buyer\'s Agent %', value: data.commissionData?.buyersAgentPercentage ? `${data.commissionData.buyersAgentPercentage}%` : '' },
          { label: 'Has Broker Fee', value: getBooleanValue(data.commissionData?.hasBrokerFee) },
          { label: 'Broker Fee Amount', value: data.commissionData?.brokerFeeAmount ? formatCurrency(data.commissionData.brokerFeeAmount) : '' },
          { label: 'Seller Paid Amount', value: data.commissionData?.sellerPaidAmount ? formatCurrency(data.commissionData.sellerPaidAmount) : '' },
          { label: 'Buyer Paid Amount', value: data.commissionData?.buyerPaidAmount ? formatCurrency(data.commissionData.buyerPaidAmount) : '' },
          { label: 'Has Seller\'s Assist', value: getBooleanValue(data.commissionData?.hasSellersAssist) },
          { label: 'Seller\'s Assist Amount', value: data.commissionData?.sellersAssist ? formatCurrency(data.commissionData.sellersAssist) : '' },
          { label: 'Is Referral', value: getBooleanValue(data.commissionData?.isReferral) },
          { label: 'Referral Party', value: getValue(data.commissionData?.referralParty) },
          { label: 'Referral Fee', value: getValue(data.commissionData?.referralFee) },
          { label: 'Broker EIN', value: getValue(data.commissionData?.brokerEin) },
          { label: 'Coordinator Fee Paid By', value: getValue(data.commissionData?.coordinatorFeePaidBy) }
        ]
      },
      {
        title: 'PROPERTY DETAILS',
        data: [
          { label: 'Resale Certificate Required', value: getBooleanValue(data.propertyDetailsData?.resaleCertRequired) },
          { label: 'HOA Name', value: getValue(data.propertyDetailsData?.hoaName) },
          { label: 'CO Required', value: getBooleanValue(data.propertyDetailsData?.coRequired) },
          { label: 'Municipality', value: getValue(data.propertyDetailsData?.municipality) },
          { label: 'First Right of Refusal', value: getBooleanValue(data.propertyDetailsData?.firstRightOfRefusal) },
          { label: 'First Right Name', value: getValue(data.propertyDetailsData?.firstRightName) },
          { label: 'Attorney Representation', value: getBooleanValue(data.propertyDetailsData?.attorneyRepresentation) },
          { label: 'Attorney Name', value: getValue(data.propertyDetailsData?.attorneyName) },
          { label: 'Home Warranty', value: getBooleanValue(data.propertyDetailsData?.homeWarranty) },
          { label: 'Warranty Company', value: getValue(data.propertyDetailsData?.warrantyCompany) },
          { label: 'Warranty Cost', value: data.propertyDetailsData?.warrantyCost ? formatCurrency(data.propertyDetailsData.warrantyCost) : '' },
          { label: 'Warranty Paid By', value: getValue(data.propertyDetailsData?.warrantyPaidBy) }
        ]
      },
      {
        title: 'TITLE COMPANY',
        data: [
          { label: 'Title Company', value: getValue(data.titleData?.titleCompany) }
        ]
      },
      {
        title: 'ADDITIONAL INFORMATION',
        data: [
          { label: 'Additional Information', value: getValue(data.additionalInfo?.notes) }
        ]
      },
      {
        title: 'DIGITAL SIGNATURE',
        data: [
          { label: 'Agent Name', value: getValue(data.signatureData?.agentName) },
          { label: 'Signed By', value: getValue(data.signatureData?.signature) },
          { label: 'Date Signed', value: data.signatureData?.dateSubmitted ? formatDate(data.signatureData.dateSubmitted) : '' },
          { label: 'Terms Accepted', value: getBooleanValue(data.signatureData?.termsAccepted) }
        ]
      }
    ];

    // Create container element that will be visible during generation
    const container = document.createElement('div');
    container.id = 'pdf-content-container';
    container.style.cssText = `
      position: absolute;
      top: -10000px;
      left: 0;
      width: 8.5in;
      min-height: 11in;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12px;
      line-height: 1.4;
    `;

    // Create the actual content element
    const element = document.createElement('div');
    element.id = 'pdf-content';
    element.style.cssText = `
      width: 100%;
      padding: 0.75in;
      background: white;
      color: black;
      box-sizing: border-box;
    `;
    
    element.innerHTML = `
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #003366; padding-bottom: 10px;">
        <h1 style="color: #003366; font-size: 20px; margin: 0 0 5px 0; font-weight: bold;">PA REAL ESTATE SUPPORT SERVICES</h1>
        <div style="color: #003366; font-size: 11px; margin: 0 0 8px 0; font-weight: normal;">
          Debbie O'Brien | (570) 588-4637 | debbie@parealestatesupport.com
        </div>
        <h2 style="color: #D2B48C; font-size: 14px; margin: 0 0 5px 0; font-weight: normal;">Transaction Summary</h2>
        <div style="font-size: 9px; color: #666;">Generated: ${currentDate}</div>
      </div>
      
      ${sections.map(section => `
        <div style="margin-bottom: 18px; break-inside: avoid;">
          <h3 style="color: #003366; font-size: 12px; font-weight: bold; margin: 0 0 8px 0; border-bottom: 1px solid #D2B48C; padding-bottom: 2px;">
            ${section.title}
          </h3>
          ${section.title === 'ADDITIONAL INFORMATION' ? `
            <div style="margin-bottom: 12px;">
              <div style="color: #003366; font-weight: bold; font-size: 10px; margin-bottom: 2px;">${section.data[0].label}:</div>
              <div style="color: #333; font-size: 9px; word-wrap: break-word; line-height: 1.3;">${section.data[0].value || '\u00A0'}</div>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
              ${section.data.map(item => `
                <div style="margin-bottom: 8px;">
                  <div style="color: #003366; font-weight: bold; font-size: 10px; margin-bottom: 1px;">${item.label}:</div>
                  <div style="color: #333; font-size: 9px; word-wrap: break-word; line-height: 1.2;">${item.value || '\u00A0'}</div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `).join('')}
      
      <!-- Footer -->
      <div style="margin-top: 30px; text-align: center; font-size: 8px; color: #666; border-top: 1px solid #ccc; padding-top: 8px;">
        PA Real Estate Support Services - Transaction Documentation<br/>
        Generated on ${new Date().toLocaleString()}<br/>
        <div style="margin-top: 5px;">© 2025 PA Real Estate Support Services LLC</div>
      </div>
    `;

    container.appendChild(element);
    document.body.appendChild(container);
    
    // Wait for DOM rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('📄 Element created with content');
    console.log('📐 Container dimensions:', {
      offsetWidth: container.offsetWidth,
      offsetHeight: container.offsetHeight,
      scrollWidth: container.scrollWidth,
      scrollHeight: container.scrollHeight
    });
    
    try {
      const opt = {
        margin: 0.5,
        filename: `Transaction-Summary-${currentDate.replace(/\//g, '-')}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: container.offsetWidth,
          height: container.offsetHeight
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      console.log('🎯 Starting html2pdf conversion...');
      await html2pdf().set(opt).from(element).save();
      console.log('✅ PDF generated and downloaded successfully');
      
    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      // Clean up
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
  };

  // Helper to render field with value
  const renderField = (label: string, value: any) => {
    const displayValue = value || 'Not specified';
    const isEmpty = !value || value === '';
    
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm font-semibold text-gray-600 mb-1">{label}</div>
        <div className={`text-base ${isEmpty ? 'text-gray-400 italic' : 'text-gray-900'}`}>
          {displayValue}
        </div>
      </div>
    );
  };

  // Helper to render a section with edit button
  const renderSection = (title: string, icon: React.ReactNode, stepNumber: number, children: React.ReactNode) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg mr-3">
                {icon}
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
            </div>
            {goToStep && (
              <button
                onClick={() => goToStep(stepNumber)}
                className="flex items-center px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mr-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Review Transaction</h2>
              <p className="text-emerald-100 text-lg">Review all details before submission</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={generatePDF}
              className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate PDF
            </button>
          </div>
        </div>
      </div>

      {/* Agent Information */}
      {renderSection(
        "Agent Information",
        <Users className="w-5 h-5" />,
        1,
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField("Agent Role", data.agentData?.role)}
          {renderField("Agent Name", data.agentData?.name)}
          {renderField("Email", data.agentData?.email)}
          {renderField("Phone", data.agentData?.phone)}
        </div>
      )}

      {/* Property Information */}
      {renderSection(
        "Property Information",
        <Home className="w-5 h-5" />,
        2,
        <div className="space-y-4">
          {renderField("Property Address", data.propertyData?.address)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderField("MLS Number", data.propertyData?.mlsNumber)}
            {renderField("Sale Price", data.propertyData?.salePrice ? formatCurrency(data.propertyData.salePrice) : '')}
            {renderField("Closing Date", data.propertyData?.closingDate ? formatDate(data.propertyData.closingDate) : '')}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Property Type", data.propertyData?.propertyType)}
            {renderField("County", data.propertyData?.county)}
          </div>
        </div>
      )}

      {/* Clients */}
      {data.clients && data.clients.length > 0 && renderSection(
        "Client Information",
        <Users className="w-5 h-5" />,
        3,
        <div className="space-y-6">
          {data.clients.map((client, index) => (
            <div key={client.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Client {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("Name", client.name)}
                {renderField("Email", client.email)}
                {renderField("Phone", client.phone)}
                {renderField("Type", client.type)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Commission */}
      {renderSection(
        "Commission Structure",
        <DollarSign className="w-5 h-5" />,
        4,
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField("Total Commission %", data.commissionData?.totalCommissionPercentage ? `${data.commissionData.totalCommissionPercentage}%` : '')}
          {renderField("Listing Agent %", data.commissionData?.listingAgentPercentage ? `${data.commissionData.listingAgentPercentage}%` : '')}
          {renderField("Buyer's Agent %", data.commissionData?.buyersAgentPercentage ? `${data.commissionData.buyersAgentPercentage}%` : '')}
        </div>
      )}

      {/* Title Company */}
      {renderSection(
        "Title Company",
        <Building className="w-5 h-5" />,
        6,
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField("Title Company", data.titleData?.titleCompany)}
          {renderField("Contact Name", data.titleData?.contactName)}
          {renderField("Contact Phone", data.titleData?.contactPhone)}
        </div>
      )}

      {/* Signature */}
      {renderSection(
        "Digital Signature",
        <PenTool className="w-5 h-5" />,
        8,
        <div className="space-y-4">
          {renderField("Signed By", data.signatureData?.signature)}
          {renderField("Date Signed", data.signatureData?.dateSubmitted ? formatDate(data.signatureData.dateSubmitted) : '')}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Terms Accepted", data.signatureData?.termsAccepted ? 'Yes' : 'No')}
            {renderField("Information Confirmed", data.signatureData?.infoConfirmed ? 'Yes' : 'No')}
          </div>
        </div>
      )}
    </div>
  );
};