import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, HelpCircle, Download, ChevronDown, Database, Lock, Eye, FileCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const Privacy: React.FC = () => {
  const { Link } = useNavigation();
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
  const [openSection, setOpenSection] = useState<number | null>(0);

  const tableOfContents = [
    { title: "Information I Collect", id: "collect" },
    { title: "How I Use Your Information", id: "usage" },
    { title: "Data Security", id: "security" },
    { title: "Information Sharing", id: "sharing" },
    { title: "Your Rights", id: "rights" },
    { title: "Contact Information", id: "contact" }
  ];

  const sections = [
    {
      id: "collect",
      title: "1. Information I Collect",
      icon: Database,
      content: "I collect information you provide directly to me when using my transaction coordination services, including:",
      list: [
        "Contact information (name, email, phone number)",
        "Real estate transaction details and documentation", 
        "Client and property information necessary for transaction coordination",
        "Communication preferences and service requirements"
      ]
    },
    {
      id: "usage",
      title: "2. How I Use Your Information",
      icon: Eye,
      content: "Information collected is used exclusively for:",
      list: [
        "Providing transaction coordination services",
        "Communicating with you about your transactions",
        "Maintaining accurate records for compliance purposes", 
        "Improving our services and processes"
      ]
    },
    {
      id: "security",
      title: "3. Data Security",
      icon: Lock,
      content: "I implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized personnel necessary for providing my services."
    },
    {
      id: "sharing",
      title: "4. Information Sharing",
      icon: Users,
      content: "I do not sell, trade, or otherwise transfer your personal information to third parties except as necessary to complete your real estate transactions (such as with title companies, lenders, or other involved parties) or as required by law."
    },
    {
      id: "rights",
      title: "5. Your Rights",
      icon: FileCheck,
      content: "You have the right to:",
      list: [
        "Access and review your personal information",
        "Request corrections to inaccurate information",
        "Request deletion of your data (subject to legal requirements)",
        "Opt-out of non-essential communications",
        "Receive a copy of your data in a portable format"
      ]
    },
    {
      id: "contact",
      title: "6. Contact Information",
      icon: HelpCircle,
      content: "If you have questions about this Privacy Policy or how I handle your information, please contact me using the information below."
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
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    <span className="text-white/90 text-sm font-medium">Privacy Commitment</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Privacy
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                      Policy
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    Your privacy is paramount. Here's how I protect and handle your information with care
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
                    { icon: Shield, text: "Industry-standard security measures protect your data" },
                    { icon: Users, text: "I only collect information necessary to provide services" },
                    { icon: HelpCircle, text: "Questions about your data? Contact me anytime" }
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

            {/* Right Column - Data Protection Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-sm w-full">
                  <h3 className="text-xl font-bold text-white mb-6">Data Protection</h3>
                  
                  {/* Privacy Protection Features */}
                  <div className="space-y-4 mb-6">
                    {[
                      { icon: Lock, title: "Secure Storage", desc: "Bank-level encryption" },
                      { icon: Eye, title: "Limited Access", desc: "Need-to-know basis only" },
                      { icon: Shield, title: "Compliance", desc: "Industry standards met" },
                      { icon: FileCheck, title: "Your Rights", desc: "Access, modify, delete" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{item.title}</div>
                          <div className="text-white/70 text-xs">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Contact for Privacy Questions */}
                  <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-100 text-sm font-medium mb-2">Privacy Questions?</div>
                    <div className="text-white/90 text-sm">Contact me anytime</div>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(34,197,94,0.03)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">Privacy Topics</h3>
                  <div className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">
                          {index + 1}
                        </span>
                        <span className="text-neutral-700 group-hover:text-green-600 transition-colors text-sm">{item.title}</span>
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
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
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
                                      <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-neutral-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              
                              {/* Special Contact Section */}
                              {section.id === 'contact' && (
                                <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200/50">
                                  <h4 className="font-semibold text-neutral-900 mb-4">Contact Information</h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <Mail className="w-5 h-5 text-green-600" />
                                      <a href="mailto:debbie@parealestatesupport.com" className="text-green-600 hover:text-green-700 font-medium">
                                        debbie@parealestatesupport.com
                                      </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <Phone className="w-5 h-5 text-blue-600" />
                                      <a href="tel:+5705884637" className="text-blue-600 hover:text-blue-700 font-medium">
                                        (570) 588-4637
                                      </a>
                                    </div>
                                    <div className="text-sm text-neutral-600 mt-3">
                                      <strong>PA Real Estate Support Services</strong><br />
                                      Serving the Pocono Mountains region
                                    </div>
                                  </div>
                                </div>
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
                  className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-neutral-900">Privacy Policy Updates</span>
                  </div>
                  <p className="text-neutral-700">
                    This privacy policy was last updated in December 2024. Any changes will be communicated to existing clients via email. Continued use of my services constitutes acceptance of any updates.
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

export default Privacy;