const Airtable = require('airtable');
const fetch = require('node-fetch');

/**
 * Enhanced transaction submission with comprehensive workflow
 * 1. Submits data to Airtable with proper field mapping
 * 2. Generates PDF with transaction data
 * 3. Sends email with PDF attachment
 * 4. Uploads PDF to Supabase
 * 5. Updates Airtable record with PDF attachment
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
    console.log('Starting comprehensive transaction submission...');
    console.log('Request method:', req.method);
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Raw request body:', typeof req.body, req.body);
    console.log('Request body keys:', Object.keys(req.body || {}));
    
    const { baseId, tableId, formData } = req.body || {};

    if (!formData) {
      console.error('No form data provided in request');
      return res.status(400).json({
        success: false,
        message: 'No form data provided'
      });
    }

    console.log('Form data structure:', {
      hasAgentData: !!formData.agentData,
      hasPropertyData: !!formData.propertyData,
      hasClients: !!formData.clients,
      clientsLength: formData.clients?.length || 0
    });

    // Check environment variables
    const airtableApiKey = process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
    const airtableBaseId = baseId || process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
    
    console.log('Environment check:', {
      hasApiKey: !!airtableApiKey,
      hasBaseId: !!airtableBaseId,
      receivedBaseId: !!baseId,
      receivedTableId: !!tableId
    });

    if (!airtableApiKey || !airtableBaseId) {
      return res.status(500).json({
        success: false,
        message: 'Missing Airtable configuration'
      });
    }

    // Configure Airtable
    const base = new Airtable({
      apiKey: airtableApiKey
    }).base(airtableBaseId);

    console.log('Processing Airtable submission using old version field mapping...');
    
    // Extract form data
    const { agentData, propertyData, clients, commissionData, propertyDetailsData, titleData } = formData;
    
    // Helper function to format field values like the old version
    function formatFieldValue(value, fieldType) {
      switch (fieldType) {
        case 'winterizedStatus':
          if (typeof value === 'boolean') {
            return value ? 'WINTERIZED' : 'NOT WINTERIZED';
          } else if (value === 'YES') {
            return 'WINTERIZED';
          } else {
            return 'NOT WINTERIZED';
          }
        case 'updateMls':
        case 'builtBefore1978':
          if (typeof value === 'boolean') {
            return value ? 'YES' : 'NO';
          }
          return value || 'NO';
        default:
          return value;
      }
    }

    // Step 1: Create client records first (following old version pattern)
    const CLIENTS_TABLE_ID = 'tblvdy7T9Hv4SasdI';
    const clientRecords = [];
    
    if (clients && clients.length > 0) {
      console.log('Creating client records:', clients.length);
      
      for (const client of clients) {
        const clientFields = {
          'fldSqxNOZ9B5PgSab': client.name || '',           // name
          'flddP6a8EG6qTJdIi': client.email || '',          // email  
          'fldBnh8W6iGW014yY': client.phone || '',          // phone
          'fldz1IpeR1256LhuC': client.address || '',        // clientAddress
          'fldeK6mjSfxELU0MD': client.maritalStatus || 'SINGLE', // maritalStatus
          'fldSY6vbE1zAhJZqd': client.type || 'BUYER'       // type
        };
        
        try {
          const clientRecord = await base(CLIENTS_TABLE_ID).create(clientFields);
          clientRecords.push(clientRecord);
          console.log('Created client record:', clientRecord.id);
        } catch (clientError) {
          console.error('Failed to create client record:', clientError);
          // Continue with other clients
        }
      }
    }

    // Step 2: Create transaction record using exact field IDs from old version
    const airtableFields = {
      // Agent information (using exact field IDs from old version)
      'fldOVyoxz38rWwAFy': agentData?.role || '',                    // agentRole
      'fldFD4xHD0vxnSOHJ': agentData?.name || '',                    // agentName
      
      // Property data
      'fld6O2FgIXQU5G27o': propertyData?.mlsNumber || '',           // mlsNumber
      'fldypnfnHhplWYcCW': propertyData?.address || '',             // propertyAddress
      'fldhHjBZJISmnP8SK': propertyData?.salePrice || '',           // salePrice
      'fldV2eLxz6w0TpLFU': propertyData?.status || '',              // propertyStatus
      'fldExdgBDgdB1i9jy': formatFieldValue(propertyData?.isWinterized, 'winterizedStatus'), // winterizedStatus
      'fldw3GlfvKtyNfIAW': formatFieldValue(propertyData?.updateMls, 'updateMls'), // updateMls
      'fld7TTQpaC83ehY7H': propertyData?.propertyAccessType || '',  // propertyAccessType
      'fldrh8eB5V8TjSZlR': propertyData?.lockboxAccessCode || '',   // lockboxAccessCode
      'fldzM4oyw2PyKt887': propertyData?.propertyType || '',        // propertyType
      'fldZmPfpsSJLOtcYr': formatFieldValue(propertyData?.isBuiltBefore1978, 'builtBefore1978'), // builtBefore1978
      'fldacjkqtnbdTUUTx': propertyData?.closingDate || '',         // closingDate

      // Commission data
      'fldE8INzEorBtx2uN': commissionData?.totalCommissionPercentage || '', // totalCommissionPercentage
      'flduuQQT7o6XAGlRe': commissionData?.listingAgentPercentage || '',    // listingAgentPercentage
      'fld5KRrToAAt5kOLd': commissionData?.buyersAgentPercentage || '',     // buyersAgentPercentage
      'flddRltdGj05Clzpa': commissionData?.sellerPaidAmount || '',          // sellerPaid
      'fldO6MAwuLTvuFjui': commissionData?.buyerPaidAmount || '',           // buyerPaid
      'fldTvXx96Na0zRh6W': commissionData?.sellersAssist || '',             // sellersAssist
      'fldzVtmn8uylVxuTF': commissionData?.referralParty || '',             // referralParty
      'fldewmjoaJVwiMF46': commissionData?.referralFee || '',               // referralFee
      'fld20VbKbWzdR4Sp7': commissionData?.brokerEin || '',                 // brokerEin
      'fldrplBqdhDcoy04S': commissionData?.coordinatorFeePaidBy || 'client', // coordinatorFeePaidBy
      
      // Client links (single field as in old version)
      'fldmPyBwuOO1dgj1g': clientRecords.map(r => r.id)            // clients
    };

    console.log('Mapped transaction fields using old version field IDs:', Object.keys(airtableFields).length, 'fields');
    console.log('Client records linked:', clientRecords.length);
    
    try {
      console.log('Submitting transaction to Airtable...');
      
      const airtableResult = await base(tableId).create(airtableFields);
      
      console.log('Airtable submission successful:', airtableResult);
      
      const recordId = airtableResult.id;
      console.log('Transaction record created successfully:', recordId);

    // Step 2: Generate PDF and process complete workflow
    console.log('Initiating PDF generation and processing workflow...');
    
    try {
      // Prepare form data with transaction ID for PDF workflow
      const pdfFormData = {
        ...formData,
        transactionId: recordId
      };

      // Call the generate-pdf API for complete workflow
      const generatePdfUrl = process.env.NEXT_PUBLIC_HOST_URL ?
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/generate-pdf` :
        '/api/generate-pdf';

      const pdfResponse = await fetch(generatePdfUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pdfFormData)
      });

      if (pdfResponse.ok) {
        const pdfResult = await pdfResponse.json();
        console.log('PDF workflow completed successfully:', pdfResult);
        
        // Return comprehensive success response
        return res.status(200).json({
          success: true,
          recordId: recordId,
          message: 'Transaction submitted successfully with complete workflow',
          details: {
            airtableRecord: recordId,
            pdfGenerated: pdfResult.success,
            emailSent: pdfResult.emailSent,
            pdfUploaded: pdfResult.attachmentSuccess,
            pdfUrl: pdfResult.pdfUrl
          }
        });
      } else {
        // PDF workflow failed, but Airtable record was created
        console.error('PDF workflow failed:', await pdfResponse.text());
        return res.status(200).json({
          success: true,
          recordId: recordId,
          message: 'Transaction submitted successfully, but PDF processing failed',
          warning: 'PDF generation and email workflow encountered issues'
        });
      }
    } catch (pdfError) {
      console.error('Error in PDF workflow:', pdfError);
      // Return success for Airtable submission even if PDF fails
      return res.status(200).json({
        success: true,
        recordId: recordId,
        message: 'Transaction submitted successfully, but PDF processing failed',
        warning: 'PDF generation workflow encountered errors'
      });
    }

    } catch (airtableError) {
      console.error('Airtable submission failed:', airtableError);
      console.error('Airtable error details:', {
        message: airtableError.message,
        statusCode: airtableError.statusCode,
        error: airtableError.error
      });
      
      return res.status(500).json({
        success: false,
        message: 'Failed to submit to Airtable',
        error: airtableError.message,
        airtableError: true
      });
    }

  } catch (error) {
    console.error('Transaction submission error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status
    });
    
    return res.status(500).json({
      success: false,
      message: 'Failed to submit transaction',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};