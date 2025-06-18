import React from 'react';
import { AlertTriangle, Edit, CheckCircle, FileText, Users, DollarSign, Building, Home } from "lucide-react";
import { TransactionFormData } from "@/types/transaction";
import { formatDate } from '@/utils/dateUtils';
import { Button } from "@/components/ui";
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
      <div className="tf-review-field">
        <div className="tf-flex tf-justify-between tf-items-center">
          <span className="tf-review-field-label">{label}</span>
          {isMissing && onFieldFix && (
            <button
              className="tf-button tf-button-secondary tf-button-sm"
              onClick={() => onFieldFix(fieldName)}
            >
              <Edit className="tf-button-icon" />
              Fix
            </button>
          )}
        </div>
        <span className={cn(
          "tf-review-field-value",
          isMissing && "tf-review-field-missing"
        )}>
          {isEmpty ? 'Not specified' : value}
        </span>
      </div>
    );
  };

  // Helper to create section header
  const renderSectionHeader = (title: string, step: number, icon: React.ReactNode) => {
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
      <div className="tf-review-section-header">
        <div className="tf-flex tf-items-center">
          <div className="tf-icon-container tf-icon-sm-container">
            {icon}
          </div>
          <h4 className="tf-heading-tertiary">{title}</h4>
        </div>
        {hasMissingFields && (
          <span className="tf-review-missing-badge">Missing Fields</span>
        )}
      </div>
    );
  };

  return (
    <div className="tf-review-section">
      <div className="tf-glass-card tf-no-hover">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <CheckCircle className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Review & Submit</h3>
            <p className="tf-text-subtitle">Review all information before submitting your transaction</p>
          </div>
        </div>

        <div className="tf-review-content">
          {/* Agent Info */}
          <div className="tf-review-section-group">
            {renderSectionHeader("Agent Information", 1, <Users className="tf-icon-sm" />)}
            <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
              {renderField("Role", data.agentData?.role, "role")}
              {renderField("Name", data.signatureData?.agentName || data.agentData?.name, "agentName")}
              {data.agentData?.email && renderField("Email", data.agentData.email, "email")}
              {data.agentData?.phone && renderField("Phone", data.agentData.phone, "phone")}
            </div>
          </div>

          {/* Property Info */}
          <div className="tf-review-section-group">
            {renderSectionHeader("Property Information", 2, <Building className="tf-icon-sm" />)}
            <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
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
          <div className="tf-review-section-group">
            {renderSectionHeader("Client Information", 3, <Users className="tf-icon-sm" />)}
            {data.clients && data.clients.length > 0 ? (
              <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                {data.clients.map((client, index) => (
                  <div key={client.id || index} className={cn(
                    "tf-glass-card-light",
                    isFieldSkipped(`clients[${index}]`) ? "tf-review-field-missing" : ""
                  )}>
                    <div className="tf-flex tf-justify-between tf-items-start tf-mb-3">
                      <h5 className="tf-heading-tertiary">{client.name || 'Unnamed Client'} ({client.type})</h5>
                      {onFieldFix && isFieldSkipped(`clients[${index}]`) && (
                        <button
                          className="tf-button tf-button-secondary tf-button-sm"
                          onClick={() => onFieldFix(`clients[${index}]`)}
                        >
                          <Edit className="tf-button-icon" />
                          Fix
                        </button>
                      )}
                    </div>
                    <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-2">
                      {client.phone && (
                        <div>
                          <p className="tf-text-muted">Phone</p>
                          <p className="tf-text-description">{client.phone}</p>
                        </div>
                      )}
                      {client.email && (
                        <div>
                          <p className="tf-text-muted">Email</p>
                          <p className="tf-text-description">{client.email}</p>
                        </div>
                      )}
                      {client.address && (
                        <div className="tf-col-span-2">
                          <p className="tf-text-muted">Address</p>
                          <p className="tf-text-description">{client.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tf-glass-card-light tf-review-field-missing">
                <div className="tf-flex tf-justify-between tf-items-center">
                  <p className="tf-text-description tf-flex tf-items-center">
                    <AlertTriangle className="tf-icon-sm tf-mr-2" />
                    No client information provided
                  </p>
                  {onFieldFix && (
                    <button
                      className="tf-button tf-button-secondary tf-button-sm"
                      onClick={() => onFieldFix('clients')}
                    >
                      <Edit className="tf-button-icon" />
                      Add Clients
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Commission Info */}
          <div className="tf-review-section-group">
            {renderSectionHeader("Commission Information", 4, <DollarSign className="tf-icon-sm" />)}
            <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
              {renderField("Total Commission", data.commissionData?.totalCommissionPercentage ? `${data.commissionData.totalCommissionPercentage}%` : null, "totalCommissionPercentage")}
              {renderField("Listing Agent Commission", data.commissionData?.listingAgentPercentage ? `${data.commissionData.listingAgentPercentage}%` : null, "listingAgentPercentage")}
              {renderField("Buyer's Agent Commission", data.commissionData?.buyersAgentPercentage ? `${data.commissionData.buyersAgentPercentage}%` : null, "buyersAgentPercentage")}
              {data.commissionData?.hasSellersAssist &&
                renderField("Seller's Assist", data.commissionData?.sellersAssist ? formatCurrency(data.commissionData.sellersAssist) : null, "sellersAssist")}
              {renderField("Coordinator Fee Paid By", data.commissionData?.coordinatorFeePaidBy === 'client' ? 'Client' : 'Agent', "coordinatorFeePaidBy")}
            </div>
          </div>

          {/* Property Details & Title */}
          <div className="tf-review-section-group">
            {renderSectionHeader("Property Details & Title", 5, <Home className="tf-icon-sm" />)}
            <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
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
          <div className="tf-review-section-group">
            {renderSectionHeader("Additional Information", 7, <FileText className="tf-icon-sm" />)}
            {data.additionalInfo?.notes ? (
              <div className="tf-glass-card-light">
                <h5 className="tf-heading-tertiary tf-mb-2">Notes</h5>
                <p className="tf-text-description tf-whitespace-pre-wrap">{data.additionalInfo.notes}</p>
              </div>
            ) : (
              <div className="tf-glass-card-light">
                <p className="tf-text-muted tf-italic">No additional information provided</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};