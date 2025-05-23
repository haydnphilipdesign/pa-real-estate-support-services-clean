import React from 'react';
import { AlertTriangle, Edit } from "lucide-react";
import { TransactionFormData } from "@/types/transaction";
import { formatDate } from '@/utils/dateUtils';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReviewMissingFieldsIndicator } from './ReviewMissingFieldsIndicator';

interface ReviewSectionProps {
  data: TransactionFormData;
  skippedFields?: string[];
  onFieldFix?: (field: string) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  data,
  skippedFields = [],
  onFieldFix
}) => {
  // Format currency values
  const formatCurrency = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(value, 10));
  };

  // Filter out signature related fields from skipped fields for review page
  const filteredSkippedFields = skippedFields.filter(field => {
    if (field.includes('signature') || field.includes('infoConfirmed') || 
        field.includes('termsAccepted') || field.includes('agentName')) {
      return false;
    }
    return true;
  });
  
  // Check if a field is in the skipped fields list
  const isFieldSkipped = (field: string) => {
    // For signature related fields, don't show as skipped on review page
    if (field.includes('signature') || field.includes('infoConfirmed') || 
        field.includes('termsAccepted') || field.includes('agentName')) {
      return false;
    }
    
    return filteredSkippedFields.some(skipped => 
      skipped === field || 
      skipped.includes(field) || 
      field.includes(skipped)
    );
  };

  // Helper to render field with optional "Fix" button
  const renderField = (label: string, value: any, fieldName: string) => {
    const isEmpty = value === undefined || value === null || value === '';
    const isMissing = isEmpty || isFieldSkipped(fieldName);
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="field-label">{label}</span>
          {isMissing && onFieldFix && (
            <Button 
              variant="ghost" 
              size="sm"
              className="fix-button"
              onClick={() => onFieldFix(fieldName)}
            >
              Fix
            </Button>
          )}
        </div>
        <span className={cn(
          "field-value",
          isMissing && "missing-field"
        )}>
          {isEmpty ? 'Not specified' : value}
        </span>
      </div>
    );
  };

  // Helper to create section header
  const renderSectionHeader = (title: string, step: number) => {
    // Don't check for signature fields on review page
    const relevantSkippedFields = skippedFields.filter(field => {
      if (field.includes('signature') || field.includes('infoConfirmed') || 
          field.includes('termsAccepted') || field.includes('agentName')) {
        return false;
      }
      return true;
    });
    
    const hasMissingFields = relevantSkippedFields.some(field => {
      // Check relevant fields based on section
      switch (step) {
        case 1: // Agent Info
          return field.includes('role') || field.includes('agent');
        case 2: // Property
          return field.includes('property') || field.includes('address') || field.includes('price');
        case 3: // Clients
          return field.includes('client');
        case 4: // Commission
          return field.includes('commission') || field.includes('fee');
        case 5: // Property Details
          return field.includes('hoa') || field.includes('warranty') || field.includes('title');
        case 7: // Additional Info
          return field.includes('notes') || field.includes('additional');
        default:
          return false;
      }
    });

    return (
      <div className="section-header">
        <h4>{title}</h4>
        {hasMissingFields && (
          <span className="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-400 text-yellow-900 font-semibold">Missing Fields</span>
        )}
      </div>
    );
  };

  return (
    <div className="review-section">
      
      
      <div>
        {/* Agent Info */}
        <div className="field-group">
          {renderSectionHeader("Agent Information", 1)}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Role", data.agentData?.role, "role")}
            {renderField("Name", data.signatureData?.agentName || data.agentData?.name, "agentName")}
            {data.agentData?.email && renderField("Email", data.agentData.email, "email")}
            {data.agentData?.phone && renderField("Phone", data.agentData.phone, "phone")}
          </div>
        </div>

        {/* Property Info */}
        <div className="field-group">
          {renderSectionHeader("Property Information", 2)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {renderField("Address", data.propertyData?.address, "address")}
            </div>
            {renderField("MLS Number", data.propertyData?.mlsNumber, "mlsNumber")}
            {renderField("Sale Price", data.propertyData?.salePrice ? formatCurrency(data.propertyData.salePrice) : null, "salePrice")}
            {renderField("Closing Date", data.propertyData?.closingDate ? formatDate(data.propertyData.closingDate) : null, "closingDate")}
            {renderField("County", data.propertyData?.county, "county")}
            {renderField("Property Type", data.propertyData?.propertyType, "propertyType")}
            {renderField("Status", data.propertyData?.status, "status")}
          </div>
        </div>

        {/* Client Info */}
        <div className="field-group">
          {renderSectionHeader("Client Information", 3)}
          {data.clients && data.clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.clients.map((client, index) => (
                <div key={client.id || index} className={cn(
                  "p-3 rounded-lg",
                  isFieldSkipped(`clients[${index}]`) ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                )}>
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-700">{client.name || 'Unnamed Client'} ({client.type})</p>
                    {onFieldFix && isFieldSkipped(`clients[${index}]`) && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 px-2 py-0 text-blue-600 hover:bg-blue-50"
                        onClick={() => onFieldFix(`clients[${index}]`)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Fix
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {client.phone && (
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm">{client.phone}</p>
                      </div>
                    )}
                    {client.email && (
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm">{client.email}</p>
                      </div>
                    )}
                    {client.address && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm">{client.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 rounded-lg border border-slate-700 bg-transparent">
              <div className="flex justify-between items-center">
                <p className="text-sm text-yellow-300 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  No client information provided
                </p>
                {onFieldFix && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 px-2 text-yellow-300 border-yellow-300 hover:bg-yellow-900/10"
                    onClick={() => onFieldFix('clients')}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Add Clients
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Commission Info */}
        <div className="field-group">
          {renderSectionHeader("Commission Information", 4)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField("Total Commission", data.commissionData?.totalCommissionPercentage ? `${data.commissionData.totalCommissionPercentage}%` : null, "totalCommissionPercentage")}
            {renderField("Listing Agent Commission", data.commissionData?.listingAgentPercentage ? `${data.commissionData.listingAgentPercentage}%` : null, "listingAgentPercentage")}
            {renderField("Buyer's Agent Commission", data.commissionData?.buyersAgentPercentage ? `${data.commissionData.buyersAgentPercentage}%` : null, "buyersAgentPercentage")}
            {data.commissionData?.hasSellersAssist && 
              renderField("Seller's Assist", data.commissionData?.sellersAssist ? formatCurrency(data.commissionData.sellersAssist) : null, "sellersAssist")}
            {renderField("Coordinator Fee Paid By", data.commissionData?.coordinatorFeePaidBy === 'client' ? 'Client' : 'Agent', "coordinatorFeePaidBy")}
          </div>
        </div>
        
        {/* Property Details & Title */}
        <div className="py-6">
          {renderSectionHeader("Property Details & Title", 5)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderField("Title Company", data.titleData?.titleCompany, "titleCompany")}
            {renderField("Municipality", data.propertyDetailsData?.municipality, "municipality")}
            {data.propertyDetailsData?.hoaName && 
              renderField("HOA Name", data.propertyDetailsData.hoaName, "hoaName")}
            {renderField("CO Required", data.propertyDetailsData?.coRequired ? "Yes" : "No", "coRequired")}
            {data.propertyDetailsData?.homeWarranty && 
              renderField("Warranty Company", data.propertyDetailsData.warrantyCompany, "warrantyCompany")}
            {data.propertyDetailsData?.homeWarranty && 
              renderField("Warranty Cost", data.propertyDetailsData.warrantyCost ? formatCurrency(data.propertyDetailsData.warrantyCost) : null, "warrantyCost")}
            {data.propertyDetailsData?.homeWarranty && 
              renderField("Warranty Paid By", data.propertyDetailsData.warrantyPaidBy, "warrantyPaidBy")}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          {renderSectionHeader("Additional Information", 7)}
          {data.additionalInfo?.notes ? (
            <div className="p-4 rounded-lg border border-slate-700 bg-transparent">
              <h5 className="text-slate-200 font-medium mb-2">Notes</h5>
              <p className="text-sm text-white whitespace-pre-wrap">{data.additionalInfo.notes}</p>
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-slate-700 bg-transparent">
              <p className="text-sm text-slate-400 italic">No additional information provided</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 