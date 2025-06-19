const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

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

  let browser;
  
  try {
    const { formData, templateType = 'transaction' } = req.body;

    // Launch Puppeteer with appropriate settings for Vercel
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
      headless: true,
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent PDF generation
    await page.setViewport({ width: 1200, height: 800 });

    // Basic HTML template for PDF generation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Transaction Document</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin: 20px 0; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Real Estate Transaction Document</h1>
          </div>
          
          <div class="section">
            <h2>Agent Information</h2>
            <div class="field">
              <span class="label">Role:</span> ${formData?.agentData?.agentRole || 'N/A'}
            </div>
          </div>
          
          <div class="section">
            <h2>Property Information</h2>
            <div class="field">
              <span class="label">Address:</span> ${formData?.propertyData?.address || 'N/A'}
            </div>
            <div class="field">
              <span class="label">MLS Number:</span> ${formData?.propertyData?.mlsNumber || 'N/A'}
            </div>
            <div class="field">
              <span class="label">Sale Price:</span> ${formData?.propertyData?.salePrice || 'N/A'}
            </div>
          </div>
          
          <div class="section">
            <h2>Commission Information</h2>
            <div class="field">
              <span class="label">Total Commission:</span> ${formData?.commissionData?.totalCommission || 'N/A'}
            </div>
          </div>
          
          <div class="section">
            <p><em>Generated on: ${new Date().toLocaleDateString()}</em></p>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });

    await browser.close();

    // Return PDF as base64
    res.status(200).json({
      success: true,
      pdf: pdfBuffer.toString('base64'),
      message: 'PDF generated successfully'
    });

  } catch (error) {
    if (browser) {
      await browser.close();
    }
    
    console.error('PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
      error: error.message
    });
  }
};