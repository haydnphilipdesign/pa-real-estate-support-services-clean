import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, Shield, Download, ChevronDown, Scale, Users, Clock, Lock } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

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

  const { Link } = useNavigation();
  const [openSection, setOpenSection] = useState<number | null>(0);

  const tableOfContents = [
    { title: "General Terms", id: "general" },
    { title: "Services", id: "services" },
    { title: "Client Responsibilities", id: "responsibilities" },
    { title: "Confidentiality", id: "confidentiality" },
    { title: "Data Collection", id: "data" },
    { title: "Limitation of Liability", id: "liability" },
    { title: "Payment Terms", id: "payment" },
    { title: "Termination", id: "termination" },
    { title: "Changes to Terms", id: "changes" },
    { title: "Governing Law", id: "law" }
  ];

  const sections = [
    {
      id: "general",
      title: "1. General Terms",
      icon: Scale,
      content: "By using the transaction coordination services provided by PA Real Estate Support Services, you agree to the following terms and conditions. These terms govern your use of my services and form a legally binding agreement between you and PA Real Estate Support Services."
    },
    {
      id: "services",
      title: "2. Services",
      icon: FileText,
      content: "PA Real Estate Support Services provides transaction coordination services to real estate professionals. My services include document organization, deadline tracking, communication coordination, and other administrative support related to real estate transactions."
    },
    {
      id: "responsibilities",
      title: "3. Client Responsibilities",
      icon: Users,
      content: "As a client, you are responsible for:",
      list: [
        "Providing accurate and complete information about each transaction",
        "Responding promptly to requests for information or documents",
        "Reviewing all documents before signing",
        "Meeting deadlines as outlined in the transaction timeline",
        "Maintaining active communication throughout the transaction process"
      ]
    },
    {
      id: "confidentiality",
      title: "4. Confidentiality",
      icon: Lock,
      content: "I understand the sensitive nature of real estate transactions and commit to maintaining the confidentiality of all client information. I will not share your information with third parties unless required for the successful completion of the transaction or as required by law."
    },
    {
      id: "data",
      title: "5. Data Collection and Storage",
      icon: Shield,
      content: "Information collected through my forms and services will be stored securely and used solely for the purpose of transaction coordination. I implement appropriate security measures to protect your data from unauthorized access or disclosure."
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      icon: CheckCircle,
      content: "PA Real Estate Support Services strives for accuracy and thoroughness in all services provided. However, we are not responsible for errors or omissions in documents or information provided by clients or third parties. Our liability is limited to the fees paid for our services."
    },
    {
      id: "payment",
      title: "7. Payment Terms",
      icon: Clock,
      content: "Payment for services is due according to the terms specified in your service agreement. I reserve the right to suspend services for accounts with outstanding balances."
    },
    {
      id: "termination",
      title: "8. Termination",
      icon: FileText,
      content: "Either party may terminate the service agreement with written notice. If termination occurs mid-transaction, fees may still apply based on the work completed."
    },
    {
      id: "changes",
      title: "9. Changes to Terms",
      icon: Download,
      content: "I reserve the right to modify these terms and conditions at any time. Changes will be communicated via email or my website, and continued use of my services constitutes acceptance of the modified terms."
    },
    {
      id: "law",
      title: "10. Governing Law",
      icon: Scale,
      content: "These terms and conditions are governed by the laws of the Commonwealth of Pennsylvania. Any disputes arising from these terms will be resolved through arbitration in Pennsylvania."
    }
  ];

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="section hero-section">
        <div className="hero-content">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Content */}
            <div className="text-left">
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-600/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-green-500/30">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="text-green-100 text-sm font-semibold">Terms of Service</span>
                </div>
              </motion.div>
            
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Terms of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Service
                </span>
              </motion.h1>
              
              {/* Enhanced Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-xl lg:text-2xl text-blue-100 mb-6">
                  Clear guidelines for using my professional transaction coordination services.
                </p>
                
                {/* Service Highlights */}
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle, text: "Clear service expectations and responsibilities", color: "text-green-400" },
                    { icon: Shield, text: "Professional confidentiality and information handling", color: "text-blue-400" },
                    { icon: FileText, text: "Documentation and intellectual property guidelines", color: "text-yellow-400" },
                    { icon: Download, text: "Last updated: December 2024", color: "text-purple-400" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <item.icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                      <span className="text-white/90">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Table of Contents */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative lg:block hidden"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6">Table of Contents</h3>
                  <div className="space-y-3">
                    {tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                      >
                        <span className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-white/90 group-hover:text-white transition-colors">{item.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(239,68,68,0.03)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Mobile Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">Quick Navigation</h3>
                  <div className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {index + 1}
                        </span>
                        <span className="text-neutral-700 group-hover:text-blue-600 transition-colors text-sm">{item.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenSection(openSection === index ? null : index)}
                      className="w-full p-6 text-left hover:bg-white/50 transition-colors focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <section.icon className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-xl font-bold text-neutral-900">{section.title}</h2>
                        </div>
                        <motion.div
                          animate={{ rotate: openSection === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-neutral-600"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openSection === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="border-t border-neutral-200 pt-6">
                              <p className="text-neutral-700 leading-relaxed mb-4">
                                {section.content}
                              </p>
                              {section.list && (
                                <ul className="space-y-3 mt-4">
                                  {section.list.map((item, listIndex) => (
                                    <li key={listIndex} className="flex items-start gap-3">
                                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-neutral-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Footer Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-neutral-900">Last Updated</span>
                  </div>
                  <p className="text-neutral-700">
                    These terms were last updated in December 2024. For questions about these terms, please contact me at{' '}
                    <a href="mailto:debbie@parealestatesupport.com" className="text-blue-600 hover:text-blue-700 font-medium">
                      debbie@parealestatesupport.com
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;