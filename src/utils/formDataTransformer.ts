/**
 * Data transformation utility for converting between UnifiedTransactionForm format
 * and the format expected by Airtable submission utilities
 */

import type { TransactionFormData as UnifiedFormData } from '@/components/TransactionForm/hooks/useTransactionFormState';
import type { TransactionFormData as AirtableFormData } from '@/types/transaction';

/**
 * Transform UnifiedTransactionForm data to Airtable submission format
 */
export function transformFormDataForAirtable(data: UnifiedFormData): AirtableFormData {
  return {
    agentData: {
      role: data.agentData.role as 'LISTING AGENT' | 'BUYERS AGENT' | 'DUAL AGENT',
      name: data.agentData.name,
      email: data.agentData.email,
      phone: data.agentData.phone
    },
    propertyData: {
      mlsNumber: data.propertyData.mlsNumber,
      address: data.propertyData.address,
      salePrice: data.propertyData.salePrice,
      status: data.propertyData.status as 'OCCUPIED' | 'VACANT',
      isWinterized: data.propertyData.isWinterized as 'YES' | 'NO',
      updateMls: data.propertyData.updateMls as 'YES' | 'NO',
      propertyAccessType: data.propertyData.propertyAccessType,
      lockboxAccessCode: data.propertyData.lockboxAccessCode,
      county: data.propertyData.county,
      propertyType: data.propertyData.propertyType as 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND',
      isBuiltBefore1978: data.propertyData.isBuiltBefore1978 as 'YES' | 'NO',
      closingDate: data.propertyData.closingDate
    },
    clients: data.clients.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      maritalStatus: client.maritalStatus as 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED',
      type: client.type as 'BUYER' | 'SELLER'
    })),
    commissionData: {
      totalCommissionPercentage: data.commissionData.totalCommissionPercentage,
      listingAgentPercentage: data.commissionData.listingAgentPercentage,
      buyersAgentPercentage: data.commissionData.buyersAgentPercentage,
      buyerPaidAmount: data.commissionData.buyerPaidAmount,
      sellersAssist: data.commissionData.sellersAssist,
      isReferral: data.commissionData.isReferral,
      referralParty: data.commissionData.referralParty,
      referralFee: data.commissionData.referralFee,
      brokerEin: data.commissionData.brokerEin,
      // Add missing fields for backwards compatibility
      hasBrokerFee: data.commissionData.hasBrokerFee,
      brokerFeeAmount: data.commissionData.brokerFeeAmount,
      sellerPaidAmount: data.commissionData.sellerPaidAmount,
      hasSellersAssist: data.commissionData.hasSellersAssist,
      coordinatorFeePaidBy: data.commissionData.coordinatorFeePaidBy
    },
    // Only include property details that have corresponding Airtable fields
    // Most property details don't exist in current Airtable schema
    propertyDetailsData: {
      // Only fields that exist in Airtable would go here
      // Currently none of the property details have corresponding field IDs
    },
    titleData: {
      // Title company data doesn't have corresponding Airtable fields
    },
    additionalInfo: {
      notes: data.additionalInfo.notes,
      specialInstructions: data.additionalInfo.specialInstructions,
      urgentIssues: data.additionalInfo.urgentIssues
    },
    signatureData: {
      ...data.signatureData,
      agentName: data.agentData.name // Use agent name from agentData
    },
    documentsData: data.documentsData || {
      acknowledgeRequired: false,
      documents: []
    }
  };
}

/**
 * Transform form data for PDF cover sheet generation
 */
export function transformFormDataForCoverSheet(data: UnifiedFormData) {
  return {
    agentRole: data.agentData.role,
    agentName: data.agentData.name,
    propertyAddress: data.propertyData.address,
    mlsNumber: data.propertyData.mlsNumber,
    salePrice: data.propertyData.salePrice,
    clientName: data.clients.length > 0 ? data.clients[0].name : '',
    clientEmail: data.clients.length > 0 ? data.clients[0].email : '',
    notes: data.additionalInfo.notes,
    specialInstructions: data.additionalInfo.specialInstructions,
    urgentIssues: data.additionalInfo.urgentIssues,
    submissionDate: new Date().toISOString()
  };
}