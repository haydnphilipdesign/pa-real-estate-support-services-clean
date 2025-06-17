import React from 'react';
import Hero from '../components/Hero';
import { Shield, Users, HelpCircle, Download } from 'lucide-react';

const Privacy: React.FC = () => {
  const sideContent = (
    <div>
      <div className="flex items-center mb-4">
        <Shield className="w-5 h-5 mr-2 text-green-400" />
        <h3 className="text-white font-semibold">Privacy Commitment</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-start">
          <Shield className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Your data is protected with industry-standard security measures
          </p>
        </div>
        <div className="flex items-start">
          <Users className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            I only collect information necessary to provide my services
          </p>
        </div>
        <div className="flex items-start">
          <HelpCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Have questions about your data? Contact me anytime
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
        title="Privacy Policy"
        subtitle="How I handle and protect your information"
        sideContent={sideContent}
      />
      
      <section className="section bg-white">
        <div className="page-container max-w-4xl">
          <div className="prose max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="heading-2 mb-4">Information I Collect</h2>
                <p className="text-body mb-4">
                  I collect information you provide directly to me when using my transaction coordination services, including:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Real estate transaction details and documentation</li>
                  <li>Client and property information necessary for transaction coordination</li>
                  <li>Communication preferences and service requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="heading-2 mb-4">How I Use Your Information</h2>
                <p className="text-body mb-4">
                  Information collected is used exclusively for:
                </p>
                <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                  <li>Providing transaction coordination services</li>
                  <li>Communicating with you about your transactions</li>
                  <li>Maintaining accurate records for compliance purposes</li>
                  <li>Improving our services and processes</li>
                </ul>
              </div>

              <div>
                <h2 className="heading-2 mb-4">Data Security</h2>
                <p className="text-body">
                  I implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized personnel necessary for providing my services.
                </p>
              </div>

              <div>
                <h2 className="heading-2 mb-4">Information Sharing</h2>
                <p className="text-body">
                  I do not sell, trade, or otherwise transfer your personal information to third parties except as necessary to complete your real estate transactions (such as with title companies, lenders, or other involved parties) or as required by law.
                </p>
              </div>

              <div>
                <h2 className="heading-2 mb-4">Contact Us</h2>
                <p className="text-body">
                  If you have questions about this Privacy Policy or how I handle your information, please contact me at:
                </p>
                <div className="mt-4 p-4 card bg-neutral-50">
                  <p className="text-body">
                    <strong>PA Real Estate Support Services</strong><br />
                    Email: debbie@parealestatesupport.com<br />
                    Phone: (570) 588-4637
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-small text-neutral-500">
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

export default Privacy;