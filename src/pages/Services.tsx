import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Clock, Users, Award, CheckCircle, TrendingUp, AlertTriangle, MessageSquare, Calendar, BarChart3 } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const Services: React.FC = () => {
  const { Link } = useNavigation();

  return (
    <div>
      {/* Beautiful 2-Column Hero Section */}
      <section className="section hero-section relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 max-w-lg w-full">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="/optimized/scott-graham-5fNmWej4tAA-unsplash.jpg"
                      alt="Professional real estate transaction support services"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>
                
                {/* Floating Service Cards */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-bold text-neutral-900">Transaction</div>
                      <div className="text-sm text-neutral-600">Coordination</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-bold text-neutral-900">Document</div>
                      <div className="text-sm text-neutral-600">Management</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                    <span className="text-white/90 text-sm font-medium">Expert Transaction Support</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Real Estate Support Services
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    Comprehensive real estate transaction support to help your business thrive with professional coordination and management services
                  </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 gap-6 py-8"
                >
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">Contract to Close</div>
                    <div className="text-white/80 text-sm font-medium">Full Management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">Compliance</div>
                    <div className="text-white/80 text-sm font-medium">Expert Oversight</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">Timeline</div>
                    <div className="text-white/80 text-sm font-medium">Critical Tracking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">Document</div>
                    <div className="text-white/80 text-sm font-medium">Secure Storage</div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/work-with-me"
                    className="group inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 transform hover:scale-105"
                  >
                    Start Working Together
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/about"
                    className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More About Me
                    <Users className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Transaction Support Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Expert Transaction Support
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Tailored services designed to streamline your real estate transactions and enhance your professional efficiency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Transaction Coordination",
                items: [
                  "Contract to closing management",
                  "Document collection and organization",
                  "Deadline tracking and reminders",
                  "Communication with all parties"
                ],
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Document Management",
                items: [
                  "Digital file organization",
                  "Secure document storage",
                  "Easy access and retrieval",
                  "Compliance documentation"
                ],
                color: "from-green-500 to-green-600"
              },
              {
                icon: Clock,
                title: "Timeline Management",
                items: [
                  "Critical date tracking",
                  "Proactive deadline management",
                  "Progress monitoring",
                  "Schedule coordination"
                ],
                color: "from-amber-500 to-amber-600"
              },
              {
                icon: CheckCircle,
                title: "Compliance Oversight",
                items: [
                  "Regulatory compliance checks",
                  "Documentation verification",
                  "Error prevention",
                  "Industry‑standard adherence"
                ],
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: AlertTriangle,
                title: "Risk Management",
                items: [
                  "Issue identification",
                  "Problem resolution",
                  "Risk assessment",
                  "Contingency planning"
                ],
                color: "from-red-500 to-red-600"
              },
              {
                icon: MessageSquare,
                title: "Client Communication",
                items: [
                  "Regular status updates",
                  "Clear communication",
                  "Question handling",
                  "Transaction transparency"
                ],
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Together Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How We Work Together
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              A simple, efficient process designed to integrate seamlessly with your business:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Initial Consultation",
                description: "We begin with a thorough review of your needs and current procedures to create a tailored solution.",
                step: "01"
              },
              {
                icon: CheckCircle,
                title: "Service Selection",
                description: "Choose the specific services that align with your business goals and transaction needs.",
                step: "02"
              },
              {
                icon: Calendar,
                title: "Implementation Planning",
                description: "We'll develop a customized plan to integrate my services with your existing workflows.",
                step: "03"
              },
              {
                icon: TrendingUp,
                title: "Ongoing Support",
                description: "I provide continuous support and adjust services as your business evolves and grows.",
                step: "04"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-neutral-50 to-white p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                  <p className="text-neutral-700 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Support Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Comprehensive Support
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Detailed breakdown of my professional services:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: FileText,
                title: "Transaction Coordination",
                items: [
                  "Initial contract review and organization",
                  "Transaction timeline creation and management",
                  "Document collection and distribution",
                  "Deadline tracking and reminder systems",
                  "Coordination with all parties (agents, lenders, title, etc.)",
                  "Regular status updates to all stakeholders",
                  "Closing preparation and attendance if needed",
                  "Post‑closing follow‑up and documentation"
                ],
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Document Management",
                items: [
                  "Digital document organization and storage",
                  "Electronic signature coordination",
                  "Document compliance verification",
                  "Required disclosure management",
                  "Secure file sharing with authorized parties",
                  "Document retention and archiving",
                  "Transaction file audits for completeness",
                  "Customized filing systems to match your workflow"
                ],
                color: "from-green-500 to-green-600"
              },
              {
                icon: CheckCircle,
                title: "Compliance Services",
                items: [
                  "Regulatory requirement monitoring",
                  "Documentation compliance verification",
                  "Disclosure timing and delivery tracking",
                  "Error identification and correction",
                  "Compliance checklist management",
                  "Industry standard updates and implementation",
                  "Audit preparation assistance",
                  "Compliance issue escalation"
                ],
                color: "from-purple-500 to-purple-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">{service.title}</h3>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to streamline your transactions?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let me handle the paperwork while you focus on growing your business.
            </p>
            <Link
              to="/work-with-me"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Working Together
              <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;