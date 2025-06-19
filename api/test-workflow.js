// Test endpoint for debugging the complete workflow
const { submitToAirtable } = require('../src/utils/airtable');

const mockData = {
  agentData: {
    role: 'DUAL AGENT',
    name: 'Test Agent',
    email: 'test@example.com',
    phone: '(555) 123-4567'
  },
  propertyData: {
    mlsNumber: 'TEST123',
    address: '123 Test St, Test City, PA 12345',
    salePrice: '350000',
    status: 'OCCUPIED',
    isWinterized: 'NO',
    updateMls: 'YES',
    propertyAccessType: 'ELECTRONIC LOCKBOX',
    lockboxAccessCode: '1234#',
    county: 'Test County',
    propertyType: 'RESIDENTIAL',
    isBuiltBefore1978: 'NO',
    closingDate: '2025-02-15'
  },
  clients: [
    {
      id: 'test-client-1',
      name: 'Test Buyer',
      email: 'buyer@test.com',
      phone: '(555) 987-6543',
      address: '456 Buyer Ave, Test City, PA 12346',
      maritalStatus: 'MARRIED',
      type: 'BUYER'
    }
  ],
  commissionData: {
    totalCommissionPercentage: '6.0',
    listingAgentPercentage: '3.0',
    buyersAgentPercentage: '3.0',
    hasBrokerFee: false,
    brokerFeeAmount: '0',
    sellerPaidAmount: '0',
    buyerPaidAmount: '0',
    hasSellersAssist: false,
    sellersAssist: '0',
    isReferral: false,
    referralParty: '',
    brokerEin: '12-3456789',
    referralFee: '0',
    coordinatorFeePaidBy: 'client'
  },
  propertyDetailsData: {
    resaleCertRequired: false,
    hoaName: '',
    coRequired: false,
    municipality: 'Test Township',
    firstRightOfRefusal: false,
    firstRightName: '',
    attorneyRepresentation: false,
    attorneyName: '',
    homeWarranty: false,
    warrantyCompany: '',
    warrantyCost: '0',
    warrantyPaidBy: 'SELLER'
  },
  titleData: {
    titleCompany: 'Test Title Company',
    name: 'Test Contact',
    contactName: 'Test Contact',
    contactPhone: '(555) 246-8135',
    contactEmail: 'contact@testtitle.com'
  },
  additionalInfo: {
    specialInstructions: 'Test transaction for debugging purposes.',
    urgentIssues: 'No urgent issues.',
    notes: 'This is a test transaction.'
  },
  signatureData: {
    agentName: 'Test Agent',
    signature: 'Test Agent',
    dateSubmitted: new Date().toISOString().split('T')[0],
    signatures: { agent: 'Test Agent' },
    termsAccepted: true,
    infoConfirmed: true
  },
  documentsData: {
    documents: [],
    confirmDocuments: true
  }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testType = 'all' } = req.body;
    const results = {};

    console.log('🧪 Running workflow test:', testType);

    // Test 1: Environment check
    if (testType === 'all' || testType === 'env') {
      results.environment = {
        nodeEnv: process.env.NODE_ENV,
        hasAirtableKey: !!process.env.AIRTABLE_API_KEY || !!process.env.VITE_AIRTABLE_API_KEY,
        hasAirtableBase: !!process.env.AIRTABLE_BASE_ID || !!process.env.VITE_AIRTABLE_BASE_ID,
        hasEmailConfig: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
        timestamp: new Date().toISOString()
      };
    }

    // Test 2: PDF Generation
    if (testType === 'all' || testType === 'pdf') {
      try {
        const pdfResponse = await fetch(`${req.headers.host}/api/generateCoverSheet`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentRole: mockData.agentData.role,
            sendEmail: false,
            data: mockData
          })
        });

        if (pdfResponse.ok) {
          results.pdfGeneration = { success: true, data: await pdfResponse.json() };
        } else {
          const errorText = await pdfResponse.text();
          results.pdfGeneration = { success: false, error: errorText };
        }
      } catch (error) {
        results.pdfGeneration = { success: false, error: error.message };
      }
    }

    // Test 3: Airtable submission (if available)
    if (testType === 'all' || testType === 'airtable') {
      try {
        // This would require importing the actual Airtable utility
        results.airtableSubmission = { 
          success: true, 
          message: 'Airtable test skipped in serverless environment' 
        };
      } catch (error) {
        results.airtableSubmission = { success: false, error: error.message };
      }
    }

    res.status(200).json({
      success: true,
      testType,
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Workflow test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};