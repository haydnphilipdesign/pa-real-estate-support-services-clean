import React, { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Percent, Users, CircleDollarSign, Building } from "lucide-react";
import type { CommissionData, AgentRole } from '@/types/transaction';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommissionSectionProps {
  data: CommissionData;
  onChange: (field: keyof CommissionData, value: any) => void;
  role: AgentRole;
}

export const CommissionSection: React.FC<CommissionSectionProps> = ({
  data,
  onChange,
  role
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isListingOrDual = role === 'LISTING AGENT' || role === 'DUAL AGENT';

  const validateField = useCallback((field: string, value: string | boolean) => {
    if (typeof value === 'boolean') return '';

    // Allow empty values for optional fields
    if (value === '' && !['totalCommissionPercentage', 'listingAgentPercentage', 'buyersAgentPercentage'].includes(field)) {
      return '';
    }

    switch (field) {
      case 'totalCommissionPercentage':
      case 'listingAgentPercentage':
      case 'buyersAgentPercentage':
      case 'referralFee':
        const percentValue = parseFloat(value);
        if (!value.trim()) {
          return 'This field is required';
        }
        if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
          return 'Please enter a valid percentage between 0 and 100';
        }
        // Add commission split validation
        if (field === 'totalCommissionPercentage' && percentValue > 0) {
          const listing = parseFloat(data.listingAgentPercentage || '0');
          const buyers = parseFloat(data.buyersAgentPercentage || '0');
          if (listing + buyers > percentValue + 0.01) { // Allow small floating point tolerance
            return 'Total commission must be at least the sum of listing and buyer agent percentages';
          }
        }
        break;
      case 'sellerPaidAmount':
      case 'buyerPaidAmount':
        // These are percentages, not currency amounts
        const paidPercentValue = parseFloat(value);
        if (value.trim() && (isNaN(paidPercentValue) || paidPercentValue < 0 || paidPercentValue > 100)) {
          return 'Please enter a valid percentage between 0 and 100';
        }
        break;
      case 'sellersAssist':
        if (!value.trim()) {
          return 'This field is required';
        }
        const amount = parseFloat(value);
        if (isNaN(amount) || amount < 0) {
          return 'Please enter a valid amount';
        }
        if (amount > 1000000) { // Reasonable upper limit
          return 'Amount seems unusually high. Please verify.';
        }
        break;
      case 'brokerFeeAmount':
        const brokerFee = parseFloat(value);
        if (value.trim() && (isNaN(brokerFee) || brokerFee < 0)) {
          return 'Please enter a valid fee amount';
        }
        break;
      case 'referralParty':
        if (!value.trim()) {
          return 'This field is required';
        }
        if (value.trim().length < 2) {
          return 'Please enter a valid name';
        }
        break;
      case 'brokerEin':
        if (!value.trim()) {
          return 'This field is required';
        }
        // Validate EIN format (XX-XXXXXXX)
        const einPattern = /^\d{2}-\d{7}$/;
        if (!einPattern.test(value.trim())) {
          return 'Please enter EIN in format: XX-XXXXXXX';
        }
        break;
    }
    return '';
  }, [data]);

  // Safe number parsing with validation
  const safeParseFloat = useCallback((value: string | undefined): number => {
    if (!value || value === '') return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Validate percentage is within acceptable range
  const validatePercentage = useCallback((value: number): number => {
    return Math.max(0, Math.min(100, value));
  }, []);

  // Round to 2 decimal places without floating point errors
  const roundToTwo = useCallback((value: number): string => {
    return (Math.round(value * 100) / 100).toFixed(2);
  }, []);

  // Helper function to calculate automatic commission values with proper bounds checking
  const calculateCommission = useCallback((field: string, value: string, currentData: CommissionData) => {
    // Parse current values safely
    const total = safeParseFloat(currentData.totalCommissionPercentage);
    const listing = safeParseFloat(currentData.listingAgentPercentage);
    const buyers = safeParseFloat(currentData.buyersAgentPercentage);
    const newValue = safeParseFloat(value);

    // Validate input is reasonable
    if (newValue < 0 || newValue > 100) {
      return {}; // Don't auto-calculate for invalid inputs
    }

    // Store the updates we want to make
    let updates: Partial<CommissionData> = {};

    // Auto-calculate commission percentages with bounds checking
    if (field === 'totalCommissionPercentage' || field === 'listingAgentPercentage' || field === 'buyersAgentPercentage') {
      // When total percentage changes, adjust buyer's or listing agent's percentage
      if (field === 'totalCommissionPercentage') {
        if (listing > 0) {
          // If listing is known, adjust buyer's percentage: buyer = total - listing
          const calculatedBuyers = validatePercentage(newValue - listing);
          updates.buyersAgentPercentage = roundToTwo(calculatedBuyers);
        } else if (buyers > 0) {
          // If buyer's is known, adjust listing percentage: listing = total - buyer
          const calculatedListing = validatePercentage(newValue - buyers);
          updates.listingAgentPercentage = roundToTwo(calculatedListing);
        }
      }
      // When listing percentage changes, adjust buyer's or total percentage
      else if (field === 'listingAgentPercentage') {
        if (total > 0) {
          // If total is known, adjust buyer's percentage: buyer = total - listing
          const calculatedBuyers = validatePercentage(total - newValue);
          updates.buyersAgentPercentage = roundToTwo(calculatedBuyers);
        } else if (buyers > 0) {
          // If buyer's is known, calculate total: total = listing + buyer
          const calculatedTotal = validatePercentage(newValue + buyers);
          updates.totalCommissionPercentage = roundToTwo(calculatedTotal);
        }
      }
      // When buyer's percentage changes, adjust listing or total percentage
      else if (field === 'buyersAgentPercentage') {
        if (total > 0) {
          // If total is known, adjust listing percentage: listing = total - buyer
          const calculatedListing = validatePercentage(total - newValue);
          updates.listingAgentPercentage = roundToTwo(calculatedListing);
        } else if (listing > 0) {
          // If listing is known, calculate total: total = listing + buyer
          const calculatedTotal = validatePercentage(listing + newValue);
          updates.totalCommissionPercentage = roundToTwo(calculatedTotal);
        }
      }
    }

    return updates;
  }, [safeParseFloat, validatePercentage, roundToTwo]);

  const handleChange = useCallback((field: keyof CommissionData, value: string | boolean) => {
    if (typeof value === 'string') {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));

      // Calculate auto-fill values
      const updates = calculateCommission(field, value, data);

      // Apply all updates
      onChange(field, value);
      Object.entries(updates).forEach(([updateField, updateValue]) => {
        onChange(updateField as keyof CommissionData, updateValue);
      });
    } else {
      onChange(field, value);
    }

  }, [onChange, validateField, calculateCommission, data]);

  // Handle numeric input with improved validation
  const handleNumericChange = (field: keyof CommissionData, value: string) => {
    // Allow empty value for clearing
    if (value === '') {
      onChange(field, value);
      return;
    }

    // Allow partial typing (e.g., ".", "0.", "5.")
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      // Only validate completed numbers
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        onChange(field, value);
      } else if (value.endsWith('.') || value === '0' || /^\d+$/.test(value)) {
        // Allow partial typing
        onChange(field, value);
      }
    }
  };

  return (
    <div className="tf-commission-section">
      {/* Enhanced Glass Card with Wider Container - No Hover Effects */}
      <div className="tf-glass-card tf-no-hover">
        
        {/* Section Header */}
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <DollarSign className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Commission Structure</h3>
            <p className="tf-text-subtitle">Configure commission rates and distribution details</p>
          </div>
        </div>

        {/* Enhanced Responsive Layout */}
        <div className="space-y-8">
          
          {/* Commission Percentages Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg mr-3">
                <Percent className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Commission Percentages</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isListingOrDual && (
                <div className="tf-form-field">
                  <label htmlFor="totalCommissionPercentage" className="tf-form-label">
                    <Percent className="w-4 h-4 text-green-600 mr-2" />
                    Total Commission
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="totalCommissionPercentage"
                      value={data.totalCommissionPercentage}
                      onChange={(e) => handleNumericChange('totalCommissionPercentage', e.target.value)}
                      type="text"
                      placeholder="6.0"
                      required
                      className={`tf-form-input pr-8 ${errors.totalCommissionPercentage ? 'border-red-500' : ''}`}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                  </div>
                  <div className="tf-form-hint">Total commission percentage for the transaction</div>
                  {errors.totalCommissionPercentage && (
                    <div className="tf-form-error">{errors.totalCommissionPercentage}</div>
                  )}
                </div>
              )}

              {isListingOrDual && (
                <div className="tf-form-field">
                  <label htmlFor="listingAgentPercentage" className="tf-form-label">
                    <Users className="w-4 h-4 text-green-600 mr-2" />
                    Listing Agent
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="listingAgentPercentage"
                      value={data.listingAgentPercentage}
                      onChange={(e) => handleNumericChange('listingAgentPercentage', e.target.value)}
                      type="text"
                      placeholder="3.0"
                      required
                      className={`tf-form-input pr-8 ${errors.listingAgentPercentage ? 'border-red-500' : ''}`}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                  </div>
                  <div className="tf-form-hint">Commission percentage for listing agent</div>
                  {errors.listingAgentPercentage && (
                    <div className="tf-form-error">{errors.listingAgentPercentage}</div>
                  )}
                </div>
              )}

              <div className="tf-form-field">
                <label htmlFor="buyersAgentPercentage" className="tf-form-label">
                  <Users className="w-4 h-4 text-green-600 mr-2" />
                  Buyer's Agent
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="buyersAgentPercentage"
                    value={data.buyersAgentPercentage}
                    onChange={(e) => handleNumericChange('buyersAgentPercentage', e.target.value)}
                    type="text"
                    placeholder="3.0"
                    required
                    className={`tf-form-input pr-8 ${errors.buyersAgentPercentage ? 'border-red-500' : ''}`}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
                <div className="tf-form-hint">Commission percentage for buyer's agent</div>
                {errors.buyersAgentPercentage && (
                  <div className="tf-form-error">{errors.buyersAgentPercentage}</div>
                )}
              </div>
            </div>
          </div>

          {/* Fee Payment Distribution Section - Always Show */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Commission Distribution</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="tf-form-field">
                <label htmlFor="sellerPaidAmount" className="tf-form-label">
                  <DollarSign className="w-4 h-4 text-blue-600 mr-2" />
                  Seller Paid Commission
                </label>
                <div className="relative">
                  <Input
                    id="sellerPaidAmount"
                    value={data.sellerPaidAmount || ""}
                    onChange={(e) => handleNumericChange('sellerPaidAmount', e.target.value)}
                    type="text"
                    placeholder="0.0"
                    className="tf-form-input pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
                <div className="tf-form-hint">Percentage of commission paid by seller</div>
              </div>

              <div className="tf-form-field">
                <label htmlFor="buyerPaidAmount" className="tf-form-label">
                  <DollarSign className="w-4 h-4 text-blue-600 mr-2" />
                  Buyer Paid Commission
                </label>
                <div className="relative">
                  <Input
                    id="buyerPaidAmount"
                    value={data.buyerPaidAmount || ""}
                    onChange={(e) => handleNumericChange('buyerPaidAmount', e.target.value)}
                    type="text"
                    placeholder="0.0"
                    className="tf-form-input pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
                <div className="tf-form-hint">Percentage of commission paid by buyer</div>
              </div>
            </div>
          </div>

          {/* Coordinator Fee Section */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-lg mr-3">
                <CircleDollarSign className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Coordinator Fee</h4>
            </div>
            
            <div className="tf-form-field max-w-md">
              <label className="tf-form-label">
                <CircleDollarSign className="w-4 h-4 text-purple-600 mr-2" />
                Coordinator Fee Paid By
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={data.coordinatorFeePaidBy}
                onValueChange={(value: 'client' | 'agent') => handleChange('coordinatorFeePaidBy', value)}
              >
                <SelectTrigger className="tf-form-input">
                  <SelectValue placeholder="Select who pays coordinator fee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>
              <div className="tf-form-hint">Who is responsible for paying the coordinator fee</div>
            </div>
          </div>

          {/* Seller's Assist Section */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-amber-500 rounded-lg mr-3">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Seller's Assist</h4>
              </div>
              <Switch
                id="hasSellersAssist"
                checked={data.hasSellersAssist}
                onCheckedChange={(checked) => handleChange('hasSellersAssist', checked)}
              />
            </div>
            
            {data.hasSellersAssist && (
              <div className="tf-form-field max-w-md">
                <label htmlFor="sellersAssist" className="tf-form-label">
                  <DollarSign className="w-4 h-4 text-amber-600 mr-2" />
                  Assist Amount
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <Input
                    id="sellersAssist"
                    value={data.sellersAssist}
                    onChange={(e) => handleNumericChange('sellersAssist', e.target.value)}
                    type="text"
                    placeholder="5000"
                    required
                    className={`tf-form-input pl-8 ${errors.sellersAssist ? 'border-red-500' : ''}`}
                  />
                </div>
                <div className="tf-form-hint">Amount seller will assist buyer with closing costs</div>
                {errors.sellersAssist && (
                  <div className="tf-form-error">{errors.sellersAssist}</div>
                )}
              </div>
            )}
          </div>

          {/* Referral Section */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Referral Information</h4>
              </div>
              <Switch
                id="isReferral"
                checked={data.isReferral}
                onCheckedChange={(checked) => handleChange('isReferral', checked)}
              />
            </div>

            {data.isReferral && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="tf-form-field">
                  <label htmlFor="referralParty" className="tf-form-label">
                    <Users className="w-4 h-4 text-teal-600 mr-2" />
                    Referral Party
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    id="referralParty"
                    value={data.referralParty}
                    onChange={(e) => handleChange('referralParty', e.target.value)}
                    placeholder="Enter referral agent/broker name"
                    required
                    className={`tf-form-input ${errors.referralParty ? 'border-red-500' : ''}`}
                  />
                  <div className="tf-form-hint">Name of referring agent or broker</div>
                  {errors.referralParty && (
                    <div className="tf-form-error">{errors.referralParty}</div>
                  )}
                </div>

                <div className="tf-form-field">
                  <label htmlFor="brokerEin" className="tf-form-label">
                    <Building className="w-4 h-4 text-teal-600 mr-2" />
                    Broker EIN
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    id="brokerEin"
                    value={data.brokerEin}
                    onChange={(e) => handleChange('brokerEin', e.target.value)}
                    placeholder="XX-XXXXXXX"
                    required
                    className={`tf-form-input ${errors.brokerEin ? 'border-red-500' : ''}`}
                  />
                  <div className="tf-form-hint">Federal EIN in XX-XXXXXXX format</div>
                  {errors.brokerEin && (
                    <div className="tf-form-error">{errors.brokerEin}</div>
                  )}
                </div>

                <div className="tf-form-field">
                  <label htmlFor="referralFee" className="tf-form-label">
                    <Percent className="w-4 h-4 text-teal-600 mr-2" />
                    Referral Fee
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="referralFee"
                      value={data.referralFee}
                      onChange={(e) => handleNumericChange('referralFee', e.target.value)}
                      type="text"
                      placeholder="25.0"
                      required
                      className={`tf-form-input pr-8 ${errors.referralFee ? 'border-red-500' : ''}`}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                  </div>
                  <div className="tf-form-hint">Percentage of commission paid to referrer</div>
                  {errors.referralFee && (
                    <div className="tf-form-error">{errors.referralFee}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSection;