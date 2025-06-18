import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, Shield, Download, ChevronDown, Scale, Users, Clock, Lock, ArrowRight } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const Terms: React.FC = () => {
  const { Link } = useNavigation();
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
      {/* Beautiful 2-Column Hero Section */}
      <section className="section hero-section relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    <span className="text-white/90 text-sm font-medium">Terms of Service</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Terms of
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      Service
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    Clear guidelines and expectations for using my professional transaction coordination services
                  </p>
                </motion.div>

                {/* Key Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  {[
                    { icon: CheckCircle, text: "Clear service expectations and responsibilities" },
                    { icon: Shield, text: "Professional confidentiality and information handling" },
                    { icon: FileText, text: "Documentation and intellectual property guidelines" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{item.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-4"
                >
                  <Link
                    to="/"
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                  >
                    Return Home
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Legal Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-sm w-full">
                  <h3 className="text-xl font-bold text-white mb-6">Service Agreement</h3>
                  
                  {/* Legal Protection Features */}
                  <div className="space-y-4 mb-6">
                    {[
                      { icon: Shield, title: "Protected Services", desc: "Clear boundaries & expectations" },
                      { icon: FileText, title: "Professional Standards", desc: "Industry-compliant practices" },
                      { icon: Users, title: "Client Rights", desc: "Your protections outlined" },
                      { icon: Scale, title: "Fair Terms", desc: "Balanced & transparent" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{item.title}</div>
                          <div className="text-white/70 text-xs">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Last Updated Notice */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
                    <div className="text-blue-100 text-sm font-medium mb-2">Last Updated</div>
                    <div className="text-white/90 text-sm">December 2024</div>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        
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