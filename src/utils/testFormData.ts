import { TransactionFormData } from '@/types/transaction';

export const mockTransactionData: TransactionFormData = {
  agentData: {
    role: 'DUAL AGENT',
    name: 'John Smith',
    email: 'john.smith@realestate.com',
    phone: '(555) 123-4567'
  },
  propertyData: {
    mlsNumber: 'MLS123456',
    address: '123 Main Street, Anytown, PA 12345',
    salePrice: '350000',
    status: 'OCCUPIED',
    isWinterized: 'NO',
    updateMls: 'YES',
    propertyAccessType: 'ELECTRONIC LOCKBOX',
    lockboxAccessCode: '1234#',
    county: 'Luzerne',
    propertyType: 'RESIDENTIAL',
    isBuiltBefore1978: 'NO',
    closingDate: '2025-02-15'
  },
  clients: [
    {
      id: 'client-1',
      name: 'Jane Buyer',
      email: 'jane.buyer@email.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Somewhere, PA 12346',
      maritalStatus: 'MARRIED',
      type: 'BUYER'
    },
    {
      id: 'client-2',
      name: 'Bob Seller',
      email: 'bob.seller@email.com',
      phone: '(555) 555-5555',
      address: '789 Pine St, Elsewhere, PA 12347',
      maritalStatus: 'SINGLE',
      type: 'SELLER'
    }
  ],
  commissionData: {
    totalCommissionPercentage: '6.0',
    listingAgentPercentage: '3.0',
    buyersAgentPercentage: '3.0',
    hasBrokerFee: true,
    brokerFeeAmount: '500',
    sellerPaidAmount: '20000',
    buyerPaidAmount: '1000',
    hasSellersAssist: true,
    sellersAssist: '2000',
    isReferral: false,
    referralParty: '',
    brokerEin: '12-3456789',
    referralFee: '0',
    coordinatorFeePaidBy: 'client'
  },
  propertyDetailsData: {
    resaleCertRequired: true,
    hoaName: 'Meadowbrook HOA',
    coRequired: true,
    municipality: 'Wilkes-Barre Township',
    firstRightOfRefusal: false,
    firstRightName: '',
    attorneyRepresentation: true,
    attorneyName: 'Smith & Associates Law',
    homeWarranty: true,
    warrantyCompany: 'American Home Shield',
    warrantyCost: '550',
    warrantyPaidBy: 'SELLER'
  },
  titleData: {
    titleCompany: 'First American Title',
    name: 'Sarah Johnson',
    contactName: 'Sarah Johnson',
    contactPhone: '(555) 246-8135',
    contactEmail: 'sarah.johnson@firstam.com'
  },
  additionalInfo: {
    specialInstructions: 'Property has security system - code is 4567. Please ensure all windows are locked.',
    urgentIssues: 'Basement has minor water issue that needs attention before closing.',
    notes: 'This is a test transaction for system validation. All parties are cooperative and timeline is flexible.'
  },
  signatureData: {
    agentName: 'John Smith',
    signature: 'John Smith',
    dateSubmitted: new Date().toISOString().split('T')[0],
    signatures: {
      agent: 'John Smith'
    },
    termsAccepted: true,
    infoConfirmed: true
  },
  documentsData: {
    documents: [],
    confirmDocuments: true
  }
};

export const fillFormWithTestData = (formActions: any) => {
  console.log('🔄 Filling form with test data...');
  
  // Agent Data
  formActions.updateField('agentData.role', mockTransactionData.agentData.role);
  formActions.updateField('agentData.name', mockTransactionData.agentData.name);
  formActions.updateField('agentData.email', mockTransactionData.agentData.email);
  formActions.updateField('agentData.phone', mockTransactionData.agentData.phone);

  // Property Data
  Object.entries(mockTransactionData.propertyData).forEach(([key, value]) => {
    formActions.updateField(`propertyData.${key}`, value);
  });

  // Clients
  mockTransactionData.clients.forEach((client, index) => {
    if (index === 0) {
      formActions.addClient();
    }
    formActions.updateClient(index, client);
  });

  // Commission Data
  Object.entries(mockTransactionData.commissionData).forEach(([key, value]) => {
    formActions.updateField(`commissionData.${key}`, value);
  });

  // Property Details
  Object.entries(mockTransactionData.propertyDetailsData).forEach(([key, value]) => {
    formActions.updateField(`propertyDetailsData.${key}`, value);
  });

  // Title Data
  Object.entries(mockTransactionData.titleData).forEach(([key, value]) => {
    formActions.updateField(`titleData.${key}`, value);
  });

  // Additional Info
  Object.entries(mockTransactionData.additionalInfo).forEach(([key, value]) => {
    formActions.updateField(`additionalInfo.${key}`, value);
  });

  // Signature Data
  Object.entries(mockTransactionData.signatureData).forEach(([key, value]) => {
    if (key !== 'signatures') {
      formActions.updateField(`signatureData.${key}`, value);
    }
  });

  console.log('✅ Test data filled successfully');
};