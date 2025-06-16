import React from 'react';
import { 
  AlertTriangle, 
  Edit, 
  CheckCircle, 
  FileText, 
  Users, 
  DollarSign, 
  Building, 
  Home,
  Shield,
  Landmark,
  ListChecks,
  Key,
  FileSpreadsheet,
  Info
} from "lucide-react";
import { TransactionFormData } from "@/types/transaction";
import { formatDate } from '@/utils/dateUtils';
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ComprehensiveReviewSectionProps {
  data: TransactionFormData;
  skippedFields?: string[];
  onFieldFix?: (field: string) => void;
}

export const ComprehensiveReviewSection: React.FC<ComprehensiveReviewSectionProps> = ({
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

  // Format percentage
  const formatPercentage = (value: string) => {
    if (!value) return '';
    return `${value}%`;
  };

  // Check if a field is in the skipped fields list
  const isFieldSkipped = (field: string) => {
    return skippedFields.some(skipped =>
      skipped === field ||
      skipped.includes(field) ||
      field.includes(skipped)
    );
  };

  // Helper to render field with optional "Fix" button
  const renderField = (label: string, value: any, fieldName: string, required: boolean = false) => {
    const isEmpty = value === undefined || value === null || value === '';
    const isMissing = isEmpty || isFieldSkipped(fieldName);

    return (
      <div className="tf-review-field">
        <div className="tf-flex tf-justify-between tf-items-center">
          <span className="tf-review-field-label">
            {label}
            {required && <span className="tf-label-required ml-1">*</span>}
          </span>
          {isMissing && onFieldFix && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFieldFix(fieldName)}
              className="h-6 px-2 text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Fix
            </Button>
          )}
        </div>
        <span className={cn(
          "tf-review-field-value",
          isMissing && "tf-review-field-missing"
        )}>
          {isEmpty ? (required ? 'REQUIRED - Not specified' : 'Not specified') : value}
        </span>
      </div>
    );
  };

  // Helper to create section header
  const renderSectionHeader = (title: string, icon: React.ReactNode, missingCount: number = 0) => {
    return (
      <div className="tf-review-section-header">
        <div className="tf-flex tf-items-center tf-gap-3">
          <div className="tf-icon-container tf-icon-sm-container">
            {icon}
          </div>
          <h4 className="tf-heading-tertiary">{title}</h4>
          {missingCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {missingCount} Missing
            </Badge>
          )}
        </div>
      </div>
    );
  };

  // Count missing fields per section
  const getMissingFieldsCount = (fields: string[]) => {
    return fields.filter(field => {
      const value = getFieldValue(field);
      return value === undefined || value === null || value === '' || isFieldSkipped(field);
    }).length;
  };

  // Get field value by path
  const getFieldValue = (fieldPath: string): any => {
    const path = fieldPath.split('.');
    let value: any = data;
    for (const key of path) {
      value = value?.[key];
    }
    return value;
  };

  return (
    <div className="tf-comprehensive-review">
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <CheckCircle className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Comprehensive Transaction Review</h3>
            <p className="tf-text-subtitle">Complete verification of all transaction details before submission</p>
          </div>
        </div>

        <div className="tf-review-content tf-space-y-8">
          {/* Agent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {renderSectionHeader("Agent Information", <Users className="tf-icon-sm" />, getMissingFieldsCount(['agentData.role', 'agentData.name', 'agentData.email', 'agentData.phone']))}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                {renderField("Agent Role", data.agentData?.role, "agentData.role", true)}
                {renderField("Agent Name", data.signatureData?.agentName || data.agentData?.name, "agentData.name", true)}
                {renderField("Email Address", data.agentData?.email, "agentData.email", false)}
                {renderField("Phone Number", data.agentData?.phone, "agentData.phone", false)}
              </div>
            </CardContent>
          </Card>

          {/* Complete Property Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Complete Property Information", <Building className="tf-icon-sm" />, getMissingFieldsCount(['propertyData.address', 'propertyData.salePrice', 'propertyData.closingDate', 'propertyData.county', 'propertyData.propertyType']))}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
                <div className="md:col-span-2">
                  {renderField("Property Address", data.propertyData?.address, "propertyData.address", true)}
                </div>
                {renderField("MLS Number", data.propertyData?.mlsNumber, "propertyData.mlsNumber", false)}
                {renderField("Sale Price", data.propertyData?.salePrice ? formatCurrency(data.propertyData.salePrice) : null, "propertyData.salePrice", true)}
                {renderField("Closing Date", data.propertyData?.closingDate ? formatDate(data.propertyData.closingDate) : null, "propertyData.closingDate", true)}
                {renderField("County", data.propertyData?.county, "propertyData.county", true)}
                {renderField("Property Type", data.propertyData?.propertyType, "propertyData.propertyType", true)}
                {renderField("Property Status", data.propertyData?.status, "propertyData.status", false)}
                {renderField("Built Before 1978", data.propertyData?.isBuiltBefore1978, "propertyData.isBuiltBefore1978", false)}
                {renderField("Winterized", data.propertyData?.isWinterized, "propertyData.isWinterized", false)}
                {renderField("Update MLS", data.propertyData?.updateMls, "propertyData.updateMls", false)}
                {renderField("Property Access Type", data.propertyData?.propertyAccessType, "propertyData.propertyAccessType", false)}
                {data.propertyData?.propertyAccessType && data.propertyData.propertyAccessType !== 'APPOINTMENT ONLY' &&
                  renderField("Lockbox Access Code", data.propertyData?.lockboxAccessCode, "propertyData.lockboxAccessCode", false)
                }
              </div>
            </CardContent>
          </Card>

          {/* Complete Title Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Title Company Information", <Landmark className="tf-icon-sm" />, getMissingFieldsCount(['titleData.titleCompany', 'titleData.contactName', 'titleData.contactPhone']))}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                {renderField("Title Company Name", data.titleData?.titleCompany, "titleData.titleCompany", true)}
                {renderField("Contact Name", data.titleData?.contactName, "titleData.contactName", false)}
                {renderField("Contact Phone", data.titleData?.contactPhone, "titleData.contactPhone", false)}
                {renderField("Contact Email", data.titleData?.name, "titleData.name", false)}
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Client Information", <Users className="tf-icon-sm" />, data.clients?.length ? 0 : 1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.clients && data.clients.length > 0 ? (
                <div className="tf-space-y-4">
                  {data.clients.map((client, index) => (
                    <div key={client.id || index} className="tf-glass-card-light">
                      <div className="tf-flex tf-justify-between tf-items-start tf-mb-3">
                        <h5 className="tf-heading-tertiary">
                          {client.name || 'Unnamed Client'} 
                          <Badge variant="outline" className="ml-2">{client.type}</Badge>
                          <Badge variant="outline" className="ml-1">{client.maritalStatus}</Badge>
                        </h5>
                        {onFieldFix && isFieldSkipped(`clients[${index}]`) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onFieldFix(`clients[${index}]`)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Fix
                          </Button>
                        )}
                      </div>
                      <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
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
                          <div className="md:col-span-2">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onFieldFix('clients')}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Add Clients
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Complete Commission Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Complete Commission Structure", <DollarSign className="tf-icon-sm" />)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tf-space-y-6">
                {/* Commission Percentages */}
                <div>
                  <h5 className="tf-heading-tertiary mb-3">Commission Percentages</h5>
                  <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
                    {renderField("Total Commission", data.commissionData?.totalCommissionPercentage ? formatPercentage(data.commissionData.totalCommissionPercentage) : null, "commissionData.totalCommissionPercentage")}
                    {renderField("Listing Agent Commission", data.commissionData?.listingAgentPercentage ? formatPercentage(data.commissionData.listingAgentPercentage) : null, "commissionData.listingAgentPercentage")}
                    {renderField("Buyer's Agent Commission", data.commissionData?.buyersAgentPercentage ? formatPercentage(data.commissionData.buyersAgentPercentage) : null, "commissionData.buyersAgentPercentage")}
                  </div>
                </div>

                {/* Additional Fees */}
                <div>
                  <h5 className="tf-heading-tertiary mb-3">Additional Fees & Costs</h5>
                  <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                    {renderField("Has Broker Fee", data.commissionData?.hasBrokerFee ? "Yes" : "No", "commissionData.hasBrokerFee")}
                    {data.commissionData?.hasBrokerFee && 
                      renderField("Broker Fee Amount", data.commissionData?.brokerFeeAmount ? formatCurrency(data.commissionData.brokerFeeAmount) : null, "commissionData.brokerFeeAmount")
                    }
                    {renderField("Seller Paid Amount", data.commissionData?.sellerPaidAmount ? formatCurrency(data.commissionData.sellerPaidAmount) : null, "commissionData.sellerPaidAmount")}
                    {renderField("Buyer Paid Amount", data.commissionData?.buyerPaidAmount ? formatCurrency(data.commissionData.buyerPaidAmount) : null, "commissionData.buyerPaidAmount")}
                    {renderField("Has Seller's Assist", data.commissionData?.hasSellersAssist ? "Yes" : "No", "commissionData.hasSellersAssist")}
                    {data.commissionData?.hasSellersAssist &&
                      renderField("Seller's Assist Amount", data.commissionData?.sellersAssist ? formatCurrency(data.commissionData.sellersAssist) : null, "commissionData.sellersAssist")
                    }
                    {renderField("Coordinator Fee Paid By", data.commissionData?.coordinatorFeePaidBy === 'client' ? 'Client' : 'Agent', "commissionData.coordinatorFeePaidBy")}
                  </div>
                </div>

                {/* Referral Information */}
                <div>
                  <h5 className="tf-heading-tertiary mb-3">Referral Information</h5>
                  <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                    {renderField("Is Referral", data.commissionData?.isReferral ? "Yes" : "No", "commissionData.isReferral")}
                    {data.commissionData?.isReferral && (
                      <>
                        {renderField("Referral Party", data.commissionData?.referralParty, "commissionData.referralParty")}
                        {renderField("Referral Fee", data.commissionData?.referralFee ? formatCurrency(data.commissionData.referralFee) : null, "commissionData.referralFee")}
                        {renderField("Broker EIN", data.commissionData?.brokerEin, "commissionData.brokerEin")}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complete Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Complete Property Details", <Home className="tf-icon-sm" />)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tf-space-y-6">
                {/* Property Requirements */}
                <div>
                  <h5 className="tf-heading-tertiary mb-3">Property Requirements</h5>
                  <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                    {renderField("Resale Certificate Required", data.propertyDetailsData?.resaleCertRequired ? "Yes" : "No", "propertyDetailsData.resaleCertRequired")}
                    {data.propertyDetailsData?.resaleCertRequired &&
                      renderField("HOA Name", data.propertyDetailsData?.hoaName, "propertyDetailsData.hoaName", true)
                    }
                    {renderField("CO Required", data.propertyDetailsData?.coRequired ? "Yes" : "No", "propertyDetailsData.coRequired")}
                    {data.propertyDetailsData?.coRequired &&
                      renderField("Municipality", data.propertyDetailsData?.municipality, "propertyDetailsData.municipality", true)
                    }
                    {renderField("First Right of Refusal", data.propertyDetailsData?.firstRightOfRefusal ? "Yes" : "No", "propertyDetailsData.firstRightOfRefusal")}
                    {data.propertyDetailsData?.firstRightOfRefusal &&
                      renderField("First Right Name", data.propertyDetailsData?.firstRightName, "propertyDetailsData.firstRightName", true)
                    }
                    {renderField("Attorney Representation", data.propertyDetailsData?.attorneyRepresentation ? "Yes" : "No", "propertyDetailsData.attorneyRepresentation")}
                    {data.propertyDetailsData?.attorneyRepresentation &&
                      renderField("Attorney Name", data.propertyDetailsData?.attorneyName, "propertyDetailsData.attorneyName", true)
                    }
                  </div>
                </div>

                {/* Home Warranty */}
                {data.propertyDetailsData?.homeWarranty && (
                  <div>
                    <h5 className="tf-heading-tertiary mb-3">Home Warranty Information</h5>
                    <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
                      {renderField("Home Warranty", "Yes", "propertyDetailsData.homeWarranty")}
                      {renderField("Warranty Company", data.propertyDetailsData?.warrantyCompany, "propertyDetailsData.warrantyCompany", true)}
                      {renderField("Warranty Cost", data.propertyDetailsData?.warrantyCost ? formatCurrency(data.propertyDetailsData.warrantyCost) : null, "propertyDetailsData.warrantyCost", true)}
                      {renderField("Warranty Paid By", data.propertyDetailsData?.warrantyPaidBy, "propertyDetailsData.warrantyPaidBy", true)}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Document Checklist Review */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Document Checklist Review", <ListChecks className="tf-icon-sm" />)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.documentsData?.documents && data.documentsData.documents.length > 0 ? (
                <div className="tf-space-y-4">
                  <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
                    {data.documentsData.documents.map((doc, index) => (
                      <div key={index} className="tf-flex tf-items-center tf-gap-3 tf-p-3 tf-rounded-lg tf-border">
                        <div className={cn(
                          "tf-w-4 tf-h-4 tf-rounded tf-border-2 tf-flex tf-items-center tf-justify-center",
                          doc.selected ? "tf-bg-green-500 tf-border-green-500" : "tf-border-gray-300"
                        )}>
                          {doc.selected && <CheckCircle className="tf-w-3 tf-h-3 tf-text-white" />}
                        </div>
                        <div className="tf-flex-1">
                          <span className={cn(
                            "tf-text-sm",
                            doc.selected ? "tf-text-gray-900" : "tf-text-gray-500"
                          )}>
                            {doc.name}
                          </span>
                          {doc.required && (
                            <Badge variant="outline" className="tf-ml-2 tf-text-xs">Required</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="tf-flex tf-items-center tf-gap-2">
                    <CheckCircle className={cn(
                      "tf-w-5 tf-h-5",
                      data.documentsData?.confirmDocuments ? "tf-text-green-500" : "tf-text-gray-400"
                    )} />
                    <span className={cn(
                      "tf-text-sm",
                      data.documentsData?.confirmDocuments ? "tf-text-gray-900" : "tf-text-red-600"
                    )}>
                      {data.documentsData?.confirmDocuments 
                        ? "Document preparation confirmed" 
                        : "Document preparation NOT confirmed"
                      }
                    </span>
                  </div>
                </div>
              ) : (
                <div className="tf-glass-card-light tf-review-field-missing">
                  <div className="tf-flex tf-justify-between tf-items-center">
                    <p className="tf-text-description tf-flex tf-items-center">
                      <AlertTriangle className="tf-icon-sm tf-mr-2" />
                      No documents selected or confirmed
                    </p>
                    {onFieldFix && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onFieldFix('documents')}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Fix Documents
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Complete Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>
                {renderSectionHeader("Complete Additional Information", <FileText className="tf-icon-sm" />)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="tf-space-y-4">
                {data.additionalInfo?.specialInstructions ? (
                  <div>
                    <h5 className="tf-heading-tertiary tf-mb-2">Special Instructions</h5>
                    <div className="tf-glass-card-light">
                      <p className="tf-text-description tf-whitespace-pre-wrap">{data.additionalInfo.specialInstructions}</p>
                    </div>
                  </div>
                ) : (
                  <div className="tf-text-muted tf-italic">No special instructions provided</div>
                )}

                {data.additionalInfo?.urgentIssues ? (
                  <div>
                    <h5 className="tf-heading-tertiary tf-mb-2">Urgent Issues</h5>
                    <div className="tf-glass-card-light tf-border-l-4 tf-border-red-500">
                      <p className="tf-text-description tf-whitespace-pre-wrap">{data.additionalInfo.urgentIssues}</p>
                    </div>
                  </div>
                ) : (
                  <div className="tf-text-muted tf-italic">No urgent issues noted</div>
                )}

                {data.additionalInfo?.notes ? (
                  <div>
                    <h5 className="tf-heading-tertiary tf-mb-2">General Notes</h5>
                    <div className="tf-glass-card-light">
                      <p className="tf-text-description tf-whitespace-pre-wrap">{data.additionalInfo.notes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="tf-text-muted tf-italic">No general notes provided</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Review Summary */}
          <Card className="tf-border-2 tf-border-blue-200 tf-bg-blue-50">
            <CardContent className="tf-pt-6">
              <div className="tf-flex tf-items-start tf-gap-3">
                <Info className="tf-w-6 tf-h-6 tf-text-blue-600 tf-flex-shrink-0 tf-mt-1" />
                <div>
                  <h4 className="tf-font-semibold tf-text-blue-900 tf-mb-2">Review Complete</h4>
                  <p className="tf-text-sm tf-text-blue-800 tf-mb-3">
                    Please verify all information above is accurate and complete before proceeding to the signature section.
                    Any missing required fields should be completed before submission.
                  </p>
                  <p className="tf-text-xs tf-text-blue-700">
                    This comprehensive review covers all transaction details including property information, 
                    client data, commission structure, property requirements, document checklist, and additional notes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};