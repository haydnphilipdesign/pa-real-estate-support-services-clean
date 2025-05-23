import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Lock, FileText, Users, Bell, HelpCircle } from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';
import PreloadedAnimationWrapper from '../components/PreloadedAnimationWrapper';
import GlobalPageHero from '../components/GlobalPageHeroNew';

const sections = [
  {
    title: "Information Collection and Use",
    icon: Database,
    content: "I collect information that you voluntarily provide when using my services, including:",
    items: [
      "Contact information (name, email, phone number)",
      "Transaction-related information",
      "Communication records and correspondence",
      "Business and professional details"
    ]
  },
  {
    title: "Use of Information",
    icon: FileText,
    content: "The information collected is used to:",
    items: [
      "Provide and improve transaction coordination services",
      "Communicate about your transactions and services",
      "Maintain accurate records",
      "Comply with legal obligations"
    ]
  },
  {
    title: "Data Security",
    icon: Lock,
    content: "I take the security of your information seriously and implement appropriate measures to protect it:",
    items: [
      "Secure storage and processing systems",
      "Limited access to personal information",
      "Regular security assessments",
      "Industry-standard encryption where applicable"
    ]
  },
  {
    title: "Information Sharing",
    icon: Users,
    content: "I may share your information with:",
    items: [
      "Third parties necessary for transaction completion (with your consent)",
      "Service providers who assist in business operations",
      "Legal authorities when required by law",
      "Professional advisors as needed"
    ]
  },
  {
    title: "Your Rights",
    icon: Shield,
    content: "You have certain rights regarding your personal information:",
    items: [
      "Access to your personal information",
      "Correction of inaccurate information",
      "Deletion of your information (subject to legal requirements)",
      "Objection to certain processing activities"
    ]
  },
  {
    title: "Updates to Privacy Policy",
    icon: Bell,
    content: "This Privacy Policy may be updated periodically:",
    items: [
      "Changes will be posted on this page",
      "Material changes will be communicated directly when possible",
      "Continued use of services constitutes acceptance of updated policy"
    ]
  },
  {
    title: "Contact Information",
    icon: HelpCircle,
    content: "If you have questions about this Privacy Policy, please contact me at:",
    items: [
      "Email: debbie@parealestatesupport.com",
      "Phone: (570) 588-4637"
    ]
  }
];

// Animation variants for item staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Privacy: React.FC = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <GlobalPageHero>
        <div className="container px-4 md:px-6 lg:px-8 mx-auto w-full text-left" id="privacy-hero">
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
                    <motion.span className="text-white">Privacy </motion.span>
                    <motion.span className="text-blue-300">Policy</motion.span>
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
                    className="text-xl md:text-2xl mb-6 md:mb-8 text-blue-100 font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1.0,
                        ease: [0.22, 0.03, 0.36, 1.0],
                        delay: 0.8
                      }
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 0.03, 0.36, 1.0],
                        delay: 0.1
                      }
                    }}
                  >
                    How I handle and protect your information
                  </motion.p>
                </motion.div>

                <motion.div
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold border border-white/30 shadow-md transition-all duration-300 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.9
                    }
                  }}
                >
                  <span className="text-shadow-sm">Last updated: June 1, 2023</span>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Add glass card for privacy summary */}
            <div className="lg:col-span-5">
              <motion.div
                className="glass-card-navy px-8 sm:px-12 py-10 card-inner-glow card-tilt backdrop-blur-md"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                data-glass-card="true"
              >
                <h3 className="text-xl font-bold text-white mb-6">Privacy Commitment</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-3 flex-shrink-0">
                      <Shield className="w-4 h-4 text-blue-300" />
                    </span>
                    <p className="text-sm text-white/90">
                      Your data is protected with industry-standard security measures
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <Users className="w-4 h-4 text-blue-300" />
                    </span>
                    <p className="text-sm text-white/90">
                      I only collect information necessary to provide my services
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <Database className="w-4 h-4 text-blue-300" />
                    </span>
                    <p className="text-sm text-white/90">
                      Information is never sold to third parties
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-blue-500/20 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <Lock className="w-4 h-4 text-blue-300" />
                    </span>
                    <p className="text-sm text-white/90">
                      You have rights to access and control your personal information
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
        
          <div className="container mx-auto max-w-5xl relative">
          <PreloadedAnimationWrapper className="text-center mb-16" preloadDelay={200}>
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">Data Protection</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Privacy Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This Privacy Policy outlines how I collect, use, and protect your personal information when you use my transaction coordination services. I am committed to ensuring the privacy and security of your data.
            </p>
          </PreloadedAnimationWrapper>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  variants={itemVariants}
                  className="group relative"
                  style={{
                    gridColumn: index === sections.length - 1 && sections.length % 2 !== 0 ? 'span 2' : 'auto'
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold to-brand-blue rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300" />
                  <div className="relative bg-white rounded-xl shadow-lg p-8 h-full transform group-hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-brand-gold/20 to-brand-blue/20 p-3 rounded-lg w-fit shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-blue transition-colors duration-300">{section.title}</h3>
                        <p className="text-gray-600 mb-4">{section.content}</p>
                        {section.items.length > 0 && (
                          <ul className="space-y-2">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <PreloadedAnimationWrapper 
            className="mt-16 p-8 rounded-xl bg-gradient-to-r from-brand-blue/5 to-brand-gold/5 border border-blue-100 text-center"
            preloadDelay={300}
          >
            <p className="text-gray-700 font-medium">
              I am committed to protecting your privacy and maintaining the confidentiality of your personal information.
              If you have any questions about this Privacy Policy, please don't hesitate to contact me.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Last updated: June 1, 2023
            </p>
          </PreloadedAnimationWrapper>
        </div>
      </div>
    </PreloadedAnimationWrapper>
    </div>
  );
};

export default Privacy;
