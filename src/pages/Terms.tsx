import React from 'react';
import Hero from '../components/Hero';
import { FileText, CheckCircle, Shield, Download } from 'lucide-react';

const Terms: React.FC = () => {
  const sideContent = (
    <div>
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 mr-2 text-blue-400" />
        <h3 className="text-white font-semibold">Terms of Service</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Clear service expectations and responsibilities
          </p>
        </div>
        <div className="flex items-start">
          <Shield className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Professional confidentiality and information handling
          </p>
        </div>
        <div className="flex items-start">
          <FileText className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Documentation and intellectual property guidelines
          </p>
        </div>
        <div className="flex items-start">
          <Download className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Last updated: June 1, 2023
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Hero
        title="Terms of Service"
        subtitle="Guidelines for using my services"
        sideContent={sideContent}
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Terms</h2>
                <p className="text-gray-700">
                  By using the transaction coordination services provided by PA Real Estate Support Services, you agree to the following terms and conditions. These terms govern your use of my services and form a legally binding agreement between you and PA Real Estate Support Services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
                <p className="text-gray-700">
                  PA Real Estate Support Services provides transaction coordination services to real estate professionals. My services include document organization, deadline tracking, communication coordination, and other administrative support related to real estate transactions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Responsibilities</h2>
                <p className="text-gray-700 mb-4">As a client, you are responsible for:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Providing accurate and complete information about each transaction</li>
                  <li>Responding promptly to requests for information or documents</li>
                  <li>Reviewing all documents before signing</li>
                  <li>Meeting deadlines as outlined in the transaction timeline</li>
                  <li>Maintaining active communication throughout the transaction process</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Confidentiality</h2>
                <p className="text-gray-700">
                  I understand the sensitive nature of real estate transactions and commit to maintaining the confidentiality of all client information. I will not share your information with third parties unless required for the successful completion of the transaction or as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Collection and Storage</h2>
                <p className="text-gray-700">
                  Information collected through my forms and services will be stored securely and used solely for the purpose of transaction coordination. I implement appropriate security measures to protect your data from unauthorized access or disclosure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700">
                  PA Real Estate Support Services strives for accuracy and thoroughness in all services provided. However, we are not responsible for errors or omissions in documents or information provided by clients or third parties. Our liability is limited to the fees paid for our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
                <p className="text-gray-700">
                  Payment for services is due according to the terms specified in your service agreement. I reserve the right to suspend services for accounts with outstanding balances.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                <p className="text-gray-700">
                  Either party may terminate the service agreement with written notice. If termination occurs mid-transaction, fees may still apply based on the work completed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
                <p className="text-gray-700">
                  I reserve the right to modify these terms and conditions at any time. Changes will be communicated via email or my website, and continued use of my services constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-700">
                  These terms and conditions are governed by the laws of the Commonwealth of Pennsylvania. Any disputes arising from these terms will be resolved through arbitration in Pennsylvania.
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500">
                  Last updated: December 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;