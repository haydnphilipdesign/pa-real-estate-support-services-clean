// Vercel serverless function for PDF cover sheet generation
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const Airtable = require('airtable');

// Environment variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || process.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.VITE_AIRTABLE_BASE_ID;

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587');
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@parealestatesupport.com';
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'debbie@parealestatesupport.com';

/**
 * Format currency values
 */
function formatCurrency(amount) {
    if (!amount) return '';
    const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
    if (isNaN(numAmount)) return '';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numAmount);
}

/**
 * Format percentage values
 */
function formatPercentage(value) {
    if (!value) return '';
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    if (isNaN(numValue)) return '';
    return `${numValue.toFixed(1)}%`;
}

/**
 * Fetch data from Airtable
 */
async function fetchAirtableData(tableId, recordId) {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        throw new Error('Airtable credentials not configured');
    }

    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
    const record = await base(tableId).find(recordId);
    return record.fields;
}

/**
 * Generate PDF using pdf-lib
 */
async function generatePdfDocument(data, agentRole) {
    try {
        console.log('🔄 Creating PDF document...');
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([612, 792]); // Standard letter size
        
        console.log('🔄 Embedding fonts...');
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    
    // Header
    page.drawText('Transaction Cover Sheet', {
        x: 50,
        y: height - 50,
        size: 24,
        font: boldFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`${agentRole} Transaction`, {
        x: 50,
        y: height - 80,
        size: 16,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
    });

    let yPosition = height - 130;

    // Property Information
    if (data.propertyData) {
        page.drawText('Property Information', {
            x: 50,
            y: yPosition,
            size: 14,
            font: boldFont,
        });
        yPosition -= 25;

        const propertyFields = [
            ['MLS Number:', data.propertyData.mlsNumber],
            ['Address:', data.propertyData.address],
            ['Sale Price:', formatCurrency(data.propertyData.salePrice)],
            ['County:', data.propertyData.county],
            ['Property Type:', data.propertyData.propertyType],
            ['Closing Date:', data.propertyData.closingDate]
        ];

        propertyFields.forEach(([label, value]) => {
            if (value) {
                page.drawText(`${label} ${value}`, {
                    x: 70,
                    y: yPosition,
                    size: 10,
                    font: font,
                });
                yPosition -= 15;
            }
        });
    }

    yPosition -= 20;

    // Agent Information
    if (data.agentData) {
        page.drawText('Agent Information', {
            x: 50,
            y: yPosition,
            size: 14,
            font: boldFont,
        });
        yPosition -= 25;

        const agentFields = [
            ['Agent Name:', data.agentData.name],
            ['Role:', data.agentData.role],
            ['Email:', data.agentData.email],
            ['Phone:', data.agentData.phone]
        ];

        agentFields.forEach(([label, value]) => {
            if (value) {
                page.drawText(`${label} ${value}`, {
                    x: 70,
                    y: yPosition,
                    size: 10,
                    font: font,
                });
                yPosition -= 15;
            }
        });
    }

    yPosition -= 20;

    // Client Information
    if (data.clients && data.clients.length > 0) {
        page.drawText('Client Information', {
            x: 50,
            y: yPosition,
            size: 14,
            font: boldFont,
        });
        yPosition -= 25;

        data.clients.forEach((client, index) => {
            page.drawText(`Client ${index + 1}: ${client.name}`, {
                x: 70,
                y: yPosition,
                size: 10,
                font: font,
            });
            yPosition -= 15;

            if (client.email) {
                page.drawText(`Email: ${client.email}`, {
                    x: 90,
                    y: yPosition,
                    size: 10,
                    font: font,
                });
                yPosition -= 15;
            }

            if (client.phone) {
                page.drawText(`Phone: ${client.phone}`, {
                    x: 90,
                    y: yPosition,
                    size: 10,
                    font: font,
                });
                yPosition -= 15;
            }
        });
    }

    // Commission Information
    if (data.commissionData) {
        yPosition -= 20;
        page.drawText('Commission Information', {
            x: 50,
            y: yPosition,
            size: 14,
            font: boldFont,
        });
        yPosition -= 25;

        const commissionFields = [
            ['Total Commission:', formatPercentage(data.commissionData.totalCommissionPercentage)],
            ['Listing Agent:', formatPercentage(data.commissionData.listingAgentPercentage)],
            ['Buyer\'s Agent:', formatPercentage(data.commissionData.buyersAgentPercentage)]
        ];

        commissionFields.forEach(([label, value]) => {
            if (value) {
                page.drawText(`${label} ${value}`, {
                    x: 70,
                    y: yPosition,
                    size: 10,
                    font: font,
                });
                yPosition -= 15;
            }
        });
    }

    // Footer
    page.drawText(`Generated on ${new Date().toLocaleString()}`, {
        x: 50,
        y: 50,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
    });

        console.log('✅ PDF document creation completed');
        return await pdfDoc.save();
    } catch (error) {
        console.error('❌ Error in generatePdfDocument:', error);
        throw error;
    }
}

/**
 * Send email with PDF attachment
 */
async function sendEmailWithPdf(pdfBuffer, data, agentRole) {
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
        console.warn('Email not configured, skipping email send');
        return { success: false, message: 'Email not configured' };
    }

    const transporter = nodemailer.createTransporter({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: false,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });

    const filename = `${agentRole.replace(/\s+/g, '_')}_Transaction_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;

    const mailOptions = {
        from: EMAIL_FROM,
        to: EMAIL_RECIPIENT,
        subject: `New ${agentRole} Transaction - ${data.propertyData?.address || 'Property'}`,
        text: `A new ${agentRole.toLowerCase()} transaction has been submitted.\n\nProperty: ${data.propertyData?.address || 'N/A'}\nMLS: ${data.propertyData?.mlsNumber || 'N/A'}\nAgent: ${data.agentData?.name || 'N/A'}`,
        attachments: [
            {
                filename: filename,
                content: pdfBuffer,
                contentType: 'application/pdf',
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, filename };
    } catch (error) {
        console.error('Email send failed:', error);
        return { success: false, message: error.message };
    }
}

/**
 * Main handler function
 */
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { tableId, recordId, agentRole, sendEmail = false, returnBase64 = false, data: fallbackData } = req.body;
        
        console.log('📄 generateCoverSheet called with:', {
            tableId,
            recordId, 
            agentRole,
            sendEmail,
            hasData: !!fallbackData,
            hasAirtableKeys: !!(AIRTABLE_API_KEY && AIRTABLE_BASE_ID)
        });

        if (!agentRole) {
            return res.status(400).json({ error: 'Agent role is required' });
        }

        // Try to fetch data from Airtable, fall back to provided data
        let data = fallbackData;
        if (tableId && recordId && AIRTABLE_API_KEY) {
            try {
                console.log('🔄 Attempting to fetch from Airtable...');
                const airtableData = await fetchAirtableData(tableId, recordId);
                console.log('✅ Using Airtable data');
                data = airtableData;
            } catch (error) {
                console.warn('⚠️ Failed to fetch from Airtable, using fallback data:', error.message);
            }
        } else {
            console.log('⚠️ Missing Airtable credentials or IDs, using fallback data');
        }

        if (!data) {
            console.error('❌ No data available for PDF generation');
            return res.status(400).json({ error: 'No data provided for PDF generation' });
        }

        console.log('🔄 Starting PDF generation...');
        
        // Generate PDF
        const pdfBuffer = await generatePdfDocument(data, agentRole);
        const filename = `${agentRole.replace(/\s+/g, '_')}_Transaction_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;
        
        console.log('✅ PDF generated successfully');

        let emailResult = { success: false };
        
        // Send email if requested
        if (sendEmail) {
            console.log('📧 Attempting to send email...');
            emailResult = await sendEmailWithPdf(pdfBuffer, data, agentRole);
            console.log('📧 Email result:', emailResult);
        }

        // Return response with optional base64 data
        const response = {
            success: true,
            filename,
            emailSent: emailResult.success,
            message: 'PDF generated successfully'
        };

        // Include base64 data if requested
        if (returnBase64) {
            response.base64Data = pdfBuffer.toString('base64');
        }

        res.status(200).json(response);

    } catch (error) {
        console.error('❌ PDF generation error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            error: 'PDF generation failed',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};