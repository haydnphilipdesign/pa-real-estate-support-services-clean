import Airtable from 'airtable';
import { TransactionFormData } from '@/types/transaction';

const airtableBase = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const TRANSACTIONS_TABLE_ID = 'tblHyCJCpQSgjn0md';
const CLIENTS_TABLE_ID = 'tblvdy7T9Hv4SasdI';

const transactionsTable = airtableBase(TRANSACTIONS_TABLE_ID);
const clientsTable = airtableBase(CLIENTS_TABLE_ID);

// Field mappings for fields that actually exist in Airtable (based on complete schema)
const transactionFieldMap = {
  // Property Information
  mlsNumber: 'fld6O2FgIXQU5G27o',
  address: 'fldypnfnHhplWYcCW',
  propertyStatus: 'fldV2eLxz6w0TpLFU',
  salePrice: 'fldhHjBZJISmnP8SK',
  isWinterized: 'fldExdgBDgdB1i9jy',
  updateMls: 'fldw3GlfvKtyNfIAW',
  propertyAccessType: 'fld7TTQpaC83ehY7H',
  lockboxAccessCode: 'fldrh8eB5V8TjSZlR',
  propertyType: 'fldzM4oyw2PyKt887',
  isBuiltBefore1978: 'fldZmPfpsSJLOtcYr',
  closingDate: 'fldacjkqtnbdTUUTx',
  
  // Agent Information
  agentName: 'fldFD4xHD0vxnSOHJ',
  agentRole: 'fldOVyoxz38rWwAFy',
  
  // Commission Data
  totalCommissionPercentage: 'fldE8INzEorBtx2uN',
  listingAgentPercentage: 'flduuQQT7o6XAGlRe',
  buyersAgentPercentage: 'fld5KRrToAAt5kOLd',
  sellerPaid: 'flddRltdGj05Clzpa',
  buyerPaid: 'fldO6MAwuLTvuFjui',
  sellersAssist: 'fldTvXx96Na0zRh6W',
  referralParty: 'fldzVtmn8uylVxuTF',
  referralFee: 'fldewmjoaJVwiMF46',
  brokerEin: 'fld20VbKbWzdR4Sp7',
  coordinatorFeePaidBy: 'fldrplBqdhDcoy04S',
  
  // Property Details
  hoaName: 'fld9oG6SMAkh4hvNL',
  municipality: 'fld9Qw4mGeI9kk42F',
  firstRightName: 'fldeHKiUreeDs5n4o',
  attorneyName: 'fld4YZ0qKHvRLK4Xg',
  warrantyCompany: 'fldRtNEH89tNNX52B',
  warrantyCost: 'fldxH1pCpohty1e2b',
  warrantyPaidBy: 'fld61RStU7sCDrG01',
  titleCompany: 'fldqeArDeRkxiYz9u',
  
  // Additional Information
  specialInstructions: 'fldDWN8jU4kdCffzu',
  urgentIssues: 'fldgW16aPdFMdspO6',
  notes: 'fld30htJ7euVerCLW',
  
  // Client Links
  buyerLinks: 'fldjzz0RpVOvF7Dee',
  sellerLinks: 'fldcPNXSa27EzCbOo'
};

const clientFieldMap = {
  name: 'fldSqxNOZ9B5PgSab',
  email: 'flddP6a8EG6qTJdIi',
  phone: 'fldBnh8W6iGW014yY',
  address: 'fldz1IpeR1256LhuC',
  type: 'fldSY6vbE1zAhJZqd',
  maritalStatus: 'fldeK6mjSfxELU0MD'
};

// Helper function to format data according to field types
const formatFieldValue = (value: any, fieldName: string): any => {
  switch (fieldName) {
    case 'salePrice':
    case 'sellersAssist':
    case 'totalCommission':
    case 'fixedCommissionAmount':
    case 'referralFee':
      // Convert to number and ensure 2 decimal places
      return typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    
    case 'buyerPaidPercentage':
    case 'buyersAgentPercentage':
    case 'listingAgentPercentage':
    case 'totalCommissionPercentage':
      // Convert to number and ensure 2 decimal places
      return typeof value === 'string' ? parseFloat(value) : value;
    
    case 'phone':
      // Format phone number
      return value?.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
    case 'updateMls':
    case 'isWinterized':
    case 'isBuiltBefore1978':
      // For singleSelect fields, return the string value as-is
      return value;
    
    case 'isReferral':
    case 'requiresFollowUp':
    case 'resaleCertRequired':
    case 'coRequired':
    case 'firstRightOfRefusal':
    case 'attorneyRepresentation':
    case 'homeWarranty':
      // For boolean/checkbox fields, keep boolean values
      if (typeof value === 'boolean') return value;
      return value?.toUpperCase() === 'YES' ? true : false;
    
    default:
      return value;
  }
};

export const submitToAirtable = async (data: TransactionFormData) => {
  try {
    console.log("Submitting form data to Airtable:", JSON.stringify(data, null, 2));
    
    // Create client records first
    const clientRecords = await Promise.all(
      data.clients.map(async (client) => {
        const fields = Object.entries(clientFieldMap).reduce((acc, [key, fieldId]) => ({
          ...acc,
          [fieldId]: formatFieldValue(client[key as keyof typeof client], key)
        }), {});

        console.log("Creating client record with fields:", fields);
        const record = await clientsTable.create({ fields });
        return record.getId();
      })
    );

    // Create transaction record
    const transactionFields: Record<string, any> = {};
    
    // Map agent data
    if (data.agentData) {
      if (data.agentData.role) {
        transactionFields[transactionFieldMap.agentRole] = data.agentData.role;
      }
      if (data.agentData.name) {
        transactionFields[transactionFieldMap.agentName] = data.agentData.name;
      }
    }
    
    // Map property data (only fields that exist in Airtable)
    if (data.propertyData) {
      if (data.propertyData.mlsNumber) {
        transactionFields[transactionFieldMap.mlsNumber] = data.propertyData.mlsNumber;
      }
      if (data.propertyData.address) {
        transactionFields[transactionFieldMap.address] = data.propertyData.address;
      }
      if (data.propertyData.salePrice) {
        transactionFields[transactionFieldMap.salePrice] = formatFieldValue(data.propertyData.salePrice, 'salePrice');
      }
      if (data.propertyData.status) {
        transactionFields[transactionFieldMap.propertyStatus] = data.propertyData.status;
      }
      if (data.propertyData.isWinterized) {
        transactionFields[transactionFieldMap.isWinterized] = formatFieldValue(data.propertyData.isWinterized, 'isWinterized');
      }
      if (data.propertyData.updateMls) {
        transactionFields[transactionFieldMap.updateMls] = formatFieldValue(data.propertyData.updateMls, 'updateMls');
      }
      if (data.propertyData.propertyAccessType) {
        transactionFields[transactionFieldMap.propertyAccessType] = data.propertyData.propertyAccessType;
      }
      if (data.propertyData.lockboxAccessCode) {
        transactionFields[transactionFieldMap.lockboxAccessCode] = data.propertyData.lockboxAccessCode;
      }
      if (data.propertyData.propertyType) {
        transactionFields[transactionFieldMap.propertyType] = data.propertyData.propertyType;
      }
      if (data.propertyData.isBuiltBefore1978) {
        transactionFields[transactionFieldMap.isBuiltBefore1978] = data.propertyData.isBuiltBefore1978;
      }
      if (data.propertyData.closingDate) {
        transactionFields[transactionFieldMap.closingDate] = data.propertyData.closingDate;
      }
    }
    
    // Map commission data (only fields that exist in Airtable)
    if (data.commissionData) {
      if (data.commissionData.totalCommissionPercentage) {
        transactionFields[transactionFieldMap.totalCommissionPercentage] = formatFieldValue(data.commissionData.totalCommissionPercentage, 'totalCommissionPercentage');
      }
      if (data.commissionData.listingAgentPercentage) {
        transactionFields[transactionFieldMap.listingAgentPercentage] = formatFieldValue(data.commissionData.listingAgentPercentage, 'listingAgentPercentage');
      }
      if (data.commissionData.buyersAgentPercentage) {
        transactionFields[transactionFieldMap.buyersAgentPercentage] = formatFieldValue(data.commissionData.buyersAgentPercentage, 'buyersAgentPercentage');
      }
      if (data.commissionData.sellerPaidAmount) {
        transactionFields[transactionFieldMap.sellerPaid] = formatFieldValue(data.commissionData.sellerPaidAmount, 'sellerPaid');
      }
      if (data.commissionData.buyerPaidAmount) {
        transactionFields[transactionFieldMap.buyerPaid] = formatFieldValue(data.commissionData.buyerPaidAmount, 'buyerPaid');
      }
      if (data.commissionData.coordinatorFeePaidBy) {
        transactionFields[transactionFieldMap.coordinatorFeePaidBy] = data.commissionData.coordinatorFeePaidBy;
      }
      if (data.commissionData.sellersAssist) {
        transactionFields[transactionFieldMap.sellersAssist] = formatFieldValue(data.commissionData.sellersAssist, 'sellersAssist');
      }
      if (data.commissionData.referralParty) {
        transactionFields[transactionFieldMap.referralParty] = data.commissionData.referralParty;
      }
      if (data.commissionData.referralFee) {
        transactionFields[transactionFieldMap.referralFee] = formatFieldValue(data.commissionData.referralFee, 'referralFee');
      }
      if (data.commissionData.brokerEin) {
        transactionFields[transactionFieldMap.brokerEin] = data.commissionData.brokerEin;
      }
    }
    
    // Map additional info (notes, special instructions, urgent issues, and follow-up flag)
    if (data.additionalInfo) {
      if (data.additionalInfo.notes) {
        transactionFields[transactionFieldMap.notes] = data.additionalInfo.notes;
      }
      if (data.additionalInfo.specialInstructions) {
        transactionFields[transactionFieldMap.specialInstructions] = data.additionalInfo.specialInstructions;
      }
      if (data.additionalInfo.urgentIssues) {
        transactionFields[transactionFieldMap.urgentIssues] = data.additionalInfo.urgentIssues;
      }
    }
    
    // Map property details data
    if (data.propertyDetailsData) {
      if (data.propertyDetailsData.hoaName) {
        transactionFields[transactionFieldMap.hoaName] = data.propertyDetailsData.hoaName;
      }
      if (data.propertyDetailsData.municipality) {
        transactionFields[transactionFieldMap.municipality] = data.propertyDetailsData.municipality;
      }
      if (data.propertyDetailsData.firstRightName) {
        transactionFields[transactionFieldMap.firstRightName] = data.propertyDetailsData.firstRightName;
      }
      if (data.propertyDetailsData.attorneyName) {
        transactionFields[transactionFieldMap.attorneyName] = data.propertyDetailsData.attorneyName;
      }
      if (data.propertyDetailsData.warrantyCompany) {
        transactionFields[transactionFieldMap.warrantyCompany] = data.propertyDetailsData.warrantyCompany;
      }
      if (data.propertyDetailsData.warrantyCost) {
        transactionFields[transactionFieldMap.warrantyCost] = formatFieldValue(data.propertyDetailsData.warrantyCost, 'warrantyCost');
      }
      if (data.propertyDetailsData.warrantyPaidBy) {
        transactionFields[transactionFieldMap.warrantyPaidBy] = data.propertyDetailsData.warrantyPaidBy;
      }
    }

    // Map title data
    if (data.titleData?.titleCompany) {
      transactionFields[transactionFieldMap.titleCompany] = data.titleData.titleCompany;
    }

    // Map signature data
    if (data.signatureData?.agentName) {
      transactionFields[transactionFieldMap.agentName] = data.signatureData.agentName;
    }

    // Add client links based on client types
    const buyerRecords = clientRecords.filter((_, index) => data.clients?.[index]?.type === 'BUYER');
    const sellerRecords = clientRecords.filter((_, index) => data.clients?.[index]?.type === 'SELLER');
    
    if (buyerRecords.length > 0) {
      transactionFields[transactionFieldMap.buyerLinks] = buyerRecords;
    }
    if (sellerRecords.length > 0) {
      transactionFields[transactionFieldMap.sellerLinks] = sellerRecords;
    }

    console.log("Creating transaction record with fields:", transactionFields);
    
    // Try direct API call since SDK might have issues
    const response = await fetch(`https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${TRANSACTIONS_TABLE_ID}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: transactionFields
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Direct API call failed:', errorData);
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }
    
    const result = await response.json();
    const recordId = result.id;
    
    console.log("Transaction record created with ID:", recordId);

    return { 
      success: true, 
      recordId: recordId,
      tableId: TRANSACTIONS_TABLE_ID,
      clientRecords: clientRecords
    };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};
