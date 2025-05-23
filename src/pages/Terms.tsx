import React from 'react';
import { motion } from 'framer-motion';
import GlobalPageHero from '../components/GlobalPageHeroNew';
import { Shield, Users, FileText, Clock, AlertCircle, DollarSign, Mail, Phone } from 'lucide-react';
import { UnifiedButton } from '../components/ui/unified-button';
import useScrollToTop from '../hooks/useScrollToTop';
import PreloadedAnimationWrapper from '../components/PreloadedAnimationWrapper';

const Terms: React.FC = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <GlobalPageHero>
        <div className="container px-4 md:px-6 lg:px-8 mx-auto w-full text-left" id="terms-hero">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-0 md:pt-0">
            {/* Main Hero Content */}
            <div className="lg:col-span-7">
              <motion.div
                className="max-w-2xl mx-auto lg:mx-0 use-standard-animations framer-entrance-override"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 0.03, 0.36, 1.0]
                  }
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 0.03, 0.36, 1.0]
                  }
                }}
                style={{ willChange: "opacity, transform" }}
                data-hero-content="container"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.1
                    }
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0
                    }
                  }}
                  className="use-standard-animations framer-entrance-override mb-8"
                  style={{ willChange: "opacity, transform" }}
                  data-hero-content="title"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
                    <motion.span className="text-white">Terms of </motion.span>
                    <motion.span className="text-blue-300">Service</motion.span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 1.2,
                      ease: [0.22, 0.03, 0.26, 1.0],
                      delay: 0.7
                    }
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 0.03, 0.26, 1.0],
                      delay: 0.1
                    }
                  }}
                  style={{ willChange: "opacity, transform" }}
                  className="mb-10"
                  data-hero-content="subtitle"
                >
                  <motion.p
                    className="text-xl md:text-2xl mb-6 md:mb-8 text-blue-100 font-light text-center lg:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1.6,
                        ease: [0.22, 0.03, 0.36, 1.0],
                        delay: 0.8
                      }
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                      transition: {
                        duration: 0.7,
                        ease: [0.22, 0.03, 0.36, 1.0],
                        delay: 0.15
                      }
                    }}
                  >
                    Guidelines for using our services and the commitments we make to you
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-4 mt-12 mb-12 justify-center lg:justify-start items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.7
                    }
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.2
                    }
                  }}
                  data-hero-content="cta"
                >
                  <UnifiedButton
                    variant="glass"
                    size="default"
                    radius="full"
                    className="text-shadow-sm"
                  >
                    Last updated: June 1, 2023
                  </UnifiedButton>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Add glass card for key terms summary */}
            <div className="lg:col-span-5">
              <motion.div
                className="glass-card-navy px-8 sm:px-12 py-10 card-inner-glow card-tilt"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                data-glass-card="true"
              >
                <h3 className="text-xl font-bold text-white mb-6">Key Terms Summary</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-3 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-300">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-sm text-white/90">
                      By using our services, you agree to these Terms of Service
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-300">
                        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.674 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-sm text-white/90">
                      We provide transaction coordination services as described in the document
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-300">
                        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-sm text-white/90">
                      Fees for services are outlined in your specific service agreement
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-300">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="text-sm text-white/90">
                      We take your privacy and confidentiality seriously
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </GlobalPageHero>

      {/* Main Content - Wrapped with PreloadedAnimationWrapper */}
      <PreloadedAnimationWrapper className="py-16 px-4 md:py-24" bg="bg-white">
        <div className="relative">
          {/* Background elements */}
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)]" />
            <div className="absolute inset-0 bg-grid-gray-500/[0.02] bg-[length:32px_32px]" />
          </div>
        
          <div className="container mx-auto max-w-4xl relative">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">1. Introduction</h2>
              <p className="text-gray-700 mb-8">
                Welcome to PA Real Estate Support Services. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
              </p>

              <div className="bg-blue-50 rounded-xl p-8 mb-12 border border-blue-100">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-5">
                    <AlertCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-blue-800">Important Note</h3>
                    <p className="text-blue-700">
                      These terms create a legally binding agreement between you and PA Real Estate Support Services. If you do not agree to these terms, please do not use our services.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">2. Services Description</h2>
              <p className="text-gray-700 mb-4">
                PA Real Estate Support Services provides transaction coordination services for real estate professionals, including but not limited to:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Document Management</h3>
                      <p className="text-gray-600 text-sm">Organization and handling of transaction documents</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Timeline Management</h3>
                      <p className="text-gray-600 text-sm">Tracking deadlines and key transaction milestones</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Communication Coordination</h3>
                      <p className="text-gray-600 text-sm">Facilitating communication between transaction parties</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Compliance Review</h3>
                      <p className="text-gray-600 text-sm">Ensuring transaction documentation meets requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
                <li>Provide accurate and complete information for all transactions</li>
                <li>Respond promptly to requests for additional information or clarification</li>
                <li>Review all documentation thoroughly before signing</li>
                <li>Maintain professional communication with all transaction parties</li>
                <li>Adhere to all applicable real estate laws and regulations</li>
                <li>Pay agreed-upon service fees in a timely manner</li>
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">4. Payment Terms</h2>
              <div className="bg-white rounded-xl p-8 mb-12 border border-gray-100 shadow-sm">
                <div className="flex items-start mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-5">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Fee Structure</h3>
                    <p className="text-gray-700 mb-4">
                      Our fees are based on the type of transaction and services required. Payment is typically due at closing unless other arrangements have been made.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-600 text-sm">
                        Late payments may incur additional charges. Please refer to your service agreement for specific payment terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">5. Confidentiality</h2>
              <p className="text-gray-700 mb-8">
                We take confidentiality seriously. All transaction information will be handled with the utmost care and in accordance with our Privacy Policy. We will not disclose your information to third parties unless required by law or necessary to provide our services.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-8">
                While we strive to provide accurate and reliable services, PA Real Estate Support Services is not liable for any damages arising from the use of our services, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">7. Changes to Terms</h2>
              <p className="text-gray-700 mb-8">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes indicates your acceptance of the updated terms.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">8. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-12">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Debbie O'Brien</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Email: debbie@parealestatesupport.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Phone: (570) 588-4637</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreloadedAnimationWrapper>
    </div>
  );
};

export default Terms;