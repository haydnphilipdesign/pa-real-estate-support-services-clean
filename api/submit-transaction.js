const Airtable = require('airtable');

/**
 * EXACT WORKING IMPLEMENTATION FROM OLD VERSION
 * This is the proven, working transaction submission API
 */
module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { baseId, tableId, formData } = req.body;

    console.log('EXACT OLD VERSION - Submitting form data:', JSON.stringify(formData, null, 2));

    // Use the exact environment variable setup from old version
    const apiKey = process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
    const actualBaseId = baseId || process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !actualBaseId) {
      console.error('Missing Airtable configuration');
      return res.status(500).json({
        success: false,
        message: 'Missing Airtable configuration'
      });
    }

    // Configure Airtable exactly like old version
    const base = new Airtable({
      apiKey: apiKey
    }).base(actualBaseId);

    // EXACT field mappings from old version working code
    const transactionFieldMap = {
      address: 'fldypnfnHhplWYcCW',
      agentName: 'fldFD4xHD0vxnSOHJ',
      brokerEin: 'fld20VbKbWzdR4Sp7',
      mlsNumber: 'fld6O2FgIXQU5G27o',
      referralParty: 'fldzVtmn8uylVxuTF',
      buyerPaidPercentage: 'flddRltdGj05Clzpa',
      buyersAgentPercentage: 'fld5KRrToAAt5kOLd',
      listingAgentPercentage: 'flduuQQT7o6XAGlRe',
      referralFee: 'fldewmjoaJVwiMF46',
      totalCommissionPercentage: 'fldE8INzEorBtx2uN',
      salePrice: 'fldhHjBZJISmnP8SK',
      sellersAssist: 'fldTvXx96Na0zRh6W',
      agentRole: 'fldOVyoxz38rWwAFy',
      propertyStatus: 'fldV2eLxz6w0TpLFU',
      updateMls: 'fldw3GlfvKtyNfIAW',
      isWinterized: 'fldExdgBDgdB1i9jy',
      notes: 'fld30htJ7euVerCLW',
      specialInstructions: 'fldDWN8jU4kdCffzu',
      urgentIssues: 'fldgW16aPdFMdspO6'
    };

    const clientFieldMap = {
      address: 'fldz1IpeR1256LhuC',
      name: 'fldSqxNOZ9B5PgSab',
      email: 'flddP6a8EG6qTJdIi',
      type: 'fldSY6vbE1zAhJZqd',
      maritalStatus: 'fldeK6mjSfxELU0MD',
      phone: 'fldBnh8W6iGW014yY'
    };

    // EXACT formatting function from old version
    const formatFieldValue = (value, fieldName) => {
      switch (fieldName) {
        case 'salePrice':
        case 'sellersAssist':
        case 'referralFee':
          return typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
        
        case 'buyerPaidPercentage':
        case 'buyersAgentPercentage':
        case 'listingAgentPercentage':
        case 'totalCommissionPercentage':
          return typeof value === 'string' ? parseFloat(value) : value;
        
        case 'phone':
          return value?.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        
        case 'updateMls':
        case 'isWinterized':
          return value?.toUpperCase() === 'YES' ? true : false;
        
        default:
          return value;
      }
    };

    const CLIENTS_TABLE_ID = 'tblvdy7T9Hv4SasdI';
    
    // Step 1: Create client records first (EXACT old version logic)
    const clientRecords = [];
    if (formData.clients && formData.clients.length > 0) {
      for (const client of formData.clients) {
        const clientFields = {};
        Object.entries(clientFieldMap).forEach(([key, fieldId]) => {
          if (client[key]) {
            clientFields[fieldId] = formatFieldValue(client[key], key);
          }
        });

        console.log("Creating client record with fields:", clientFields);
        try {
          const record = await base(CLIENTS_TABLE_ID).create(clientFields);
          clientRecords.push(record.id);
          console.log('Created client record:', record.id);
        } catch (clientError) {
          console.error('Failed to create client record:', clientError);
        }
      }
    }

    // Step 2: Create transaction record (EXACT old version logic)
    const transactionFields = {};
    
    // Map agent data
    if (formData.agentData?.role) {
      transactionFields[transactionFieldMap.agentRole] = formData.agentData.role;
    }
    if (formData.signatureData?.agentName) {
      transactionFields[transactionFieldMap.agentName] = formData.signatureData.agentName;
    }
    
    // Map property data
    if (formData.propertyData) {
      if (formData.propertyData.mlsNumber) {
        transactionFields[transactionFieldMap.mlsNumber] = formData.propertyData.mlsNumber;
      }
      if (formData.propertyData.address) {
        transactionFields[transactionFieldMap.address] = formData.propertyData.address;
      }
      if (formData.propertyData.salePrice) {
        transactionFields[transactionFieldMap.salePrice] = formatFieldValue(formData.propertyData.salePrice, 'salePrice');
      }
      if (formData.propertyData.status) {
        transactionFields[transactionFieldMap.propertyStatus] = formData.propertyData.status;
      }
      if (formData.propertyData.isWinterized) {
        transactionFields[transactionFieldMap.isWinterized] = formatFieldValue(formData.propertyData.isWinterized, 'isWinterized');
      }
      if (formData.propertyData.updateMls) {
        transactionFields[transactionFieldMap.updateMls] = formatFieldValue(formData.propertyData.updateMls, 'updateMls');
      }
    }
    
    // Map commission data
    if (formData.commissionData) {
      if (formData.commissionData.totalCommissionPercentage) {
        transactionFields[transactionFieldMap.totalCommissionPercentage] = formatFieldValue(formData.commissionData.totalCommissionPercentage, 'totalCommissionPercentage');
      }
      if (formData.commissionData.listingAgentPercentage) {
        transactionFields[transactionFieldMap.listingAgentPercentage] = formatFieldValue(formData.commissionData.listingAgentPercentage, 'listingAgentPercentage');
      }
      if (formData.commissionData.buyersAgentPercentage) {
        transactionFields[transactionFieldMap.buyersAgentPercentage] = formatFieldValue(formData.commissionData.buyersAgentPercentage, 'buyersAgentPercentage');
      }
      if (formData.commissionData.sellerPaidAmount) {
        transactionFields[transactionFieldMap.buyerPaidPercentage] = formatFieldValue(formData.commissionData.sellerPaidAmount, 'buyerPaidPercentage');
      }
      if (formData.commissionData.sellersAssist) {
        transactionFields[transactionFieldMap.sellersAssist] = formatFieldValue(formData.commissionData.sellersAssist, 'sellersAssist');
      }
      if (formData.commissionData.referralParty) {
        transactionFields[transactionFieldMap.referralParty] = formData.commissionData.referralParty;
      }
      if (formData.commissionData.referralFee) {
        transactionFields[transactionFieldMap.referralFee] = formatFieldValue(formData.commissionData.referralFee, 'referralFee');
      }
      if (formData.commissionData.brokerEin) {
        transactionFields[transactionFieldMap.brokerEin] = formData.commissionData.brokerEin;
      }
    }
    
    // Map additional info
    if (formData.additionalInfo) {
      if (formData.additionalInfo.specialInstructions) {
        transactionFields[transactionFieldMap.specialInstructions] = formData.additionalInfo.specialInstructions;
      }
      if (formData.additionalInfo.urgentIssues) {
        transactionFields[transactionFieldMap.urgentIssues] = formData.additionalInfo.urgentIssues;
      }
      if (formData.additionalInfo.notes) {
        transactionFields[transactionFieldMap.notes] = formData.additionalInfo.notes;
      }
    }

    // Add client links (EXACT old version way)
    if (clientRecords.length > 0) {
      transactionFields['fldmPyBwuOO1dgj1g'] = clientRecords;
    }

    console.log("Creating transaction record with fields:", transactionFields);
    const record = await base(tableId).create(transactionFields);
    
    console.log('Created Airtable record with ID:', record.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Transaction submitted successfully',
      recordId: record.id
    });

  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit transaction',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};