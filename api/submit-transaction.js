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

    console.log('Complete form data structure received:', JSON.stringify(formData, null, 2));
    
    console.log('Form data structure analysis:', {
      hasAgentData: !!formData.agentData,
      hasPropertyData: !!formData.propertyData,
      hasClients: !!formData.clients,
      hasCommissionData: !!formData.commissionData,
      hasPropertyDetailsData: !!formData.propertyDetailsData,
      hasTitleData: !!formData.titleData,
      hasAdditionalInfo: !!formData.additionalInfo,
      hasSignatureData: !!formData.signatureData,
      clientsLength: formData.clients?.length || 0,
      titleDataKeys: formData.titleData ? Object.keys(formData.titleData) : [],
      titleDataContent: formData.titleData,
      propertyDetailsKeys: formData.propertyDetailsData ? Object.keys(formData.propertyDetailsData) : [],
      propertyDetailsContent: formData.propertyDetailsData
    });

    // Check environment variables with detailed logging
    const airtableApiKey = process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
    const airtableBaseId = baseId || process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
    
    console.log('Environment variable details:', {
      hasViteApiKey: !!process.env.VITE_AIRTABLE_API_KEY,
      hasServerApiKey: !!process.env.AIRTABLE_API_KEY,
      hasViteBaseId: !!process.env.VITE_AIRTABLE_BASE_ID,
      hasServerBaseId: !!process.env.AIRTABLE_BASE_ID,
      receivedBaseId: !!baseId,
      receivedTableId: !!tableId,
      finalApiKey: airtableApiKey ? airtableApiKey.substring(0, 10) + '...' : 'MISSING',
      finalBaseId: airtableBaseId ? airtableBaseId.substring(0, 10) + '...' : 'MISSING'
    });

    if (!airtableApiKey || !airtableBaseId) {
      console.error('Missing critical Airtable configuration');
      return res.status(500).json({
        success: false,
        message: 'Missing Airtable configuration',
        details: {
          hasApiKey: !!airtableApiKey,
          hasBaseId: !!airtableBaseId
        }
      });
    }

    if (!tableId) {
      console.error('No table ID provided');
      return res.status(400).json({
        success: false,
        message: 'Table ID is required'
      });
    }

    // Configure Airtable
    const base = new Airtable({
      apiKey: airtableApiKey
    }).base(airtableBaseId);

    console.log('Processing Airtable submission using old version field mapping...');
    
    // Extract form data
    const { agentData, propertyData, clients, commissionData, propertyDetailsData, titleData } = formData;
    
    // Helper function to format field values according to Airtable field types
    function formatFieldValue(value, fieldType) {
      switch (fieldType) {
        case 'winterizedStatus':
          // singleSelect: YES, NO, WINTERIZED, NOT WINTERIZED
          if (typeof value === 'boolean') {
            return value ? 'WINTERIZED' : 'NOT WINTERIZED';
          } else if (value === 'YES') {
            return 'WINTERIZED';
          } else {
            return 'NOT WINTERIZED';
          }
        case 'updateMls':
        case 'builtBefore1978':
          // singleSelect: YES, NO
          if (typeof value === 'boolean') {
            return value ? 'YES' : 'NO';
          }
          return value || 'NO';
        case 'currency':
          // Currency fields need numeric values, no $ signs
          if (value === '' || value == null) return null;
          const currencyValue = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
          return isNaN(currencyValue) ? null : currencyValue;
        case 'number':
          // Number fields need numeric values
          if (value === '' || value == null) return null;
          const numValue = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
          return isNaN(numValue) ? null : numValue;
        case 'percentage':
          // Convert percentage to decimal number (e.g., "5.5%" -> 5.5)
          if (value === '' || value == null) return null;
          const percentValue = parseFloat(String(value).replace(/[^0-9.-]/g, ''));
          return isNaN(percentValue) ? null : percentValue;
        case 'agentRole':
          // singleSelect: BUYERS AGENT, DUAL AGENT, LISTING AGENT
          const roleMap = {
            'BUYERS_AGENT': 'BUYERS AGENT',
            'LISTING_AGENT': 'LISTING AGENT', 
            'DUAL_AGENT': 'DUAL AGENT'
          };
          return roleMap[value] || value;
        case 'propertyType':
          // singleSelect: COMMERCIAL, LAND, RESIDENTIAL
          const typeMap = {
            'COMMERCIAL': 'COMMERICAL', // Note: Airtable has typo "COMMERICAL"
            'RESIDENTIAL': 'RESIDENTIAL',
            'LAND': 'LAND'
          };
          return typeMap[value] || value;
        case 'coordinatorFeePaidBy':
          // singleSelect: AGENT, CLIENT, Agent, Client, agent, client
          return value ? value.toLowerCase() : 'client';
        case 'phone':
          // phoneNumber field - format as (555) 555-5555
          if (!value) return '';
          const cleaned = String(value).replace(/\D/g, '');
          if (cleaned.length === 10) {
            return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
          }
          return value; // Return as-is if not 10 digits
        case 'date':
          // Date field - ensure proper date format
          if (!value) return null;
          try {
            const date = new Date(value);
            return date.toISOString().split('T')[0]; // YYYY-MM-DD format
          } catch {
            return null;
          }
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
          'fldSqxNOZ9B5PgSab': client.name || '',                    // Client Name (singleLineText)
          'flddP6a8EG6qTJdIi': client.email || '',                   // Client Email (email)  
          'fldBnh8W6iGW014yY': formatFieldValue(client.phone, 'phone'), // Client Phone (phoneNumber)
          'fldz1IpeR1256LhuC': client.address || '',                 // Client Address (singleLineText)
          'fldeK6mjSfxELU0MD': client.maritalStatus || 'SINGLE',     // Marital Status (singleSelect: SINGLE, MARRIED, DIVORCED, DIVORCE IN PROGRESS, WIDOWED)
          'fldSY6vbE1zAhJZqd': client.type || 'BUYER',               // Client Type (singleSelect: BUYER, SELLER)
          'fldx7IEsPmHTJXDYS': propertyData?.address || ''           // Address (from property - to link records)
        };
        
        try {
          console.log('Attempting to create client record with fields:', JSON.stringify(clientFields, null, 2));
          const clientRecord = await base(CLIENTS_TABLE_ID).create(clientFields);
          clientRecords.push(clientRecord);
          console.log('Created client record successfully:', clientRecord.id);
        } catch (clientError) {
          console.error('Failed to create client record:', {
            error: clientError.message,
            stack: clientError.stack,
            statusCode: clientError.statusCode,
            details: clientError.error,
            clientFields: clientFields
          });
          // Continue with other clients but log the failure
        }
      }
    }

    // Step 2: Create transaction record using exact field IDs and proper data types
    const airtableFields = {
      // Agent information
      'fldOVyoxz38rWwAFy': formatFieldValue(agentData?.role, 'agentRole'),        // agentRole (singleSelect: BUYERS AGENT, DUAL AGENT, LISTING AGENT)
      'fldFD4xHD0vxnSOHJ': agentData?.name || '',                                 // agentName (singleLineText)
      
      // Property data
      'fld6O2FgIXQU5G27o': propertyData?.mlsNumber || '',                        // mlsNumber (singleLineText)
      'fldypnfnHhplWYcCW': propertyData?.address || '',                          // propertyAddress (singleLineText)
      'fldhHjBZJISmnP8SK': formatFieldValue(propertyData?.salePrice, 'currency'), // salePrice (currency)
      'fldV2eLxz6w0TpLFU': propertyData?.status || '',                           // propertyStatus (singleSelect: OCCUPIED, VACANT)
      'fldExdgBDgdB1i9jy': formatFieldValue(propertyData?.isWinterized, 'winterizedStatus'), // winterized (singleSelect: YES, NO, WINTERIZED, NOT WINTERIZED)
      'fldw3GlfvKtyNfIAW': formatFieldValue(propertyData?.updateMls, 'updateMls'), // updateMls (singleSelect: YES, NO)
      'fld7TTQpaC83ehY7H': propertyData?.propertyAccessType || '',               // propertyAccessType (singleSelect: ELECTRONIC LOCKBOX, COMBO LOCKBOX, KEYPAD, APPOINTMENT ONLY)
      'fldrh8eB5V8TjSZlR': propertyData?.lockboxAccessCode || '',                // lockboxAccessCode (singleLineText)
      'fldzM4oyw2PyKt887': formatFieldValue(propertyData?.propertyType, 'propertyType'), // propertyType (singleSelect: COMMERICAL, LAND, RESIDENTIAL)
      'fldZmPfpsSJLOtcYr': formatFieldValue(propertyData?.isBuiltBefore1978, 'builtBefore1978'), // builtBefore1978 (singleSelect: YES, NO)
      'fldacjkqtnbdTUUTx': formatFieldValue(propertyData?.closingDate, 'date'),  // closingDate (date)

      // Commission data
      'fldE8INzEorBtx2uN': formatFieldValue(commissionData?.totalCommissionPercentage, 'percentage'), // totalCommissionPercentage (number)
      'flduuQQT7o6XAGlRe': formatFieldValue(commissionData?.listingAgentPercentage, 'percentage'),    // listingAgentPercentage (number)
      'fld5KRrToAAt5kOLd': formatFieldValue(commissionData?.buyersAgentPercentage, 'percentage'),     // buyersAgentPercentage (number)
      'flddRltdGj05Clzpa': formatFieldValue(commissionData?.sellerPaidAmount, 'number'),              // sellerPaid (number)
      'fldO6MAwuLTvuFjui': formatFieldValue(commissionData?.buyerPaidAmount, 'number'),               // buyerPaid (number)
      'fldTvXx96Na0zRh6W': formatFieldValue(commissionData?.sellersAssist, 'currency'),              // sellersAssist (currency)
      'fldzVtmn8uylVxuTF': commissionData?.referralParty || '',                                       // referralParty (singleLineText)
      'fldewmjoaJVwiMF46': formatFieldValue(commissionData?.referralFee, 'number'),                  // referralFee (number)
      'fld20VbKbWzdR4Sp7': commissionData?.brokerEin || '',                                           // brokerEin (singleLineText)
      'fldrplBqdhDcoy04S': formatFieldValue(commissionData?.coordinatorFeePaidBy, 'coordinatorFeePaidBy'), // coordinatorFeePaidBy (singleSelect)
      
      // Additional property details if available
      'fld9oG6SMAkh4hvNL': propertyDetailsData?.hoaName || '',                   // HOA Name (singleLineText)
      'fld9Qw4mGeI9kk42F': propertyDetailsData?.municipality || '',              // Municipality (singleLineText)
      'fldeHKiUreeDs5n4o': propertyDetailsData?.firstRightName || '',            // First Right Name (singleLineText)
      'fld4YZ0qKHvRLK4Xg': propertyDetailsData?.attorneyName || '',              // Attorney Name (singleLineText)
      'fldRtNEH89tNNX52B': propertyDetailsData?.warrantyCompany || '',           // Home Warranty Company (singleLineText)
      'fldxH1pCpohty1e2b': formatFieldValue(propertyDetailsData?.warrantyCost, 'currency'), // Home Warranty Cost (currency)
      'fld61RStU7sCDrG01': propertyDetailsData?.warrantyPaidBy || '',            // Home Warranty Payer (singleLineText)
      
      // Title company info if available
      'fldqeArDeRkxiYz9u': titleData?.titleCompany || '',                        // Title Company (singleLineText)
      
      // Additional info fields that map to richText fields
      'fldDWN8jU4kdCffzu': formData?.additionalInfo?.specialInstructions || '', // Special Instructions (richText)
      'fldgW16aPdFMdspO6': formData?.additionalInfo?.urgentIssues || '',         // Urgent Issues (richText)
      'fld30htJ7euVerCLW': formData?.additionalInfo?.notes || ''                 // Additional Information (richText)
    };

    // Only include client links if we have any clients
    if (clientRecords.length > 0) {
      // Note: Based on schema, we need to link to specific buyer/seller fields instead of single clients field
      const buyers = clientRecords.filter((_, index) => clients[index]?.type === 'BUYER');
      const sellers = clientRecords.filter((_, index) => clients[index]?.type === 'SELLER');
      
      if (buyers.length > 0) {
        airtableFields['fldjzz0RpVOvF7Dee'] = buyers.map(r => r.id); // Buyer (multipleRecordLinks)
      }
      if (sellers.length > 0) {
        airtableFields['fldcPNXSa27EzCbOo'] = sellers.map(r => r.id); // Seller (multipleRecordLinks)
      }
    }

    console.log('Mapped transaction fields using old version field IDs:', Object.keys(airtableFields).length, 'fields');
    console.log('Client records linked:', clientRecords.length);
    
    try {
      console.log('Submitting transaction to Airtable...');
      console.log('Transaction fields to submit:', JSON.stringify(airtableFields, null, 2));
      console.log('Using table ID:', tableId);
      console.log('Using base ID:', airtableBaseId ? airtableBaseId.substring(0, 10) + '...' : 'MISSING');
      
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
        stack: airtableError.stack,
        statusCode: airtableError.statusCode,
        error: airtableError.error,
        name: airtableError.name,
        response: airtableError.response?.data || 'No response data',
        config: {
          apiKey: airtableApiKey ? airtableApiKey.substring(0, 10) + '...' : 'MISSING',
          baseId: airtableBaseId ? airtableBaseId.substring(0, 10) + '...' : 'MISSING',
          tableId: tableId
        }
      });
      
      // Try to get more specific error information
      if (airtableError.error) {
        console.error('Airtable API error response:', JSON.stringify(airtableError.error, null, 2));
      }
      
      return res.status(500).json({
        success: false,
        message: 'Failed to submit to Airtable',
        error: airtableError.message,
        airtableError: true,
        details: process.env.NODE_ENV === 'development' ? {
          statusCode: airtableError.statusCode,
          apiError: airtableError.error,
          stack: airtableError.stack
        } : undefined
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