import React from 'react';
import { motion } from 'framer-motion';
import ServicesSection from '../components/Services';
import { ArrowRight, FileText, Shield, Clock, Users, Award, Star, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const Services: React.FC = () => {
  const { Link } = useNavigation();

  return (
    <div>
      {/* Enhanced Hero Section with Homepage Quality */}
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-blue-500/30">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-100 text-sm font-semibold">Complete Transaction Support</span>
                  <div className="flex -space-x-1 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Professional
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Real Estate
                </span>
                <span className="block">Support Services</span>
              </motion.h1>
              
              {/* Enhanced Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-xl lg:text-2xl text-blue-100 mb-6">
                  Comprehensive transaction coordination designed to streamline your deals from contract to closing.
                </p>
                
                {/* Service Highlights */}
                <div className="space-y-3">
                  {[
                    { icon: FileText, text: "Complete contract-to-close coordination", color: "text-blue-400" },
                    { icon: Shield, text: "Compliance review and documentation management", color: "text-green-400" },
                    { icon: Clock, text: "Timeline management and deadline tracking", color: "text-yellow-400" },
                    { icon: Users, text: "Client communication and progress updates", color: "text-purple-400" }
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

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/work-with-me"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Start Working Together
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link
                  to="/agent-portal"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <FileText className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start a Transaction
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Visual Impact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative lg:block hidden"
            >
              {/* Main Stats Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  {/* Service Quality Metrics */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">100%</div>
                      <div className="text-sm text-blue-200 uppercase tracking-wider">Compliance Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">24hr</div>
                      <div className="text-sm text-blue-200 uppercase tracking-wider">Response Time</div>
                    </div>
                  </div>
                  
                  {/* Service Promise */}
                  <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-100 text-sm font-medium">Service Guarantee</span>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-xs text-green-200">Save 10+ hours per transaction with our professional coordination</div>
                  </div>
                  
                  {/* Quick Service Highlights */}
                  <div className="space-y-3">
                    {[
                      { icon: Shield, text: "PA Regulation Compliant", color: "text-blue-400" },
                      { icon: Clock, text: "Never Miss a Deadline", color: "text-yellow-400" },
                      { icon: Users, text: "All-Party Coordination", color: "text-purple-400" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-white/90">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-8 -right-8 bg-gradient-to-br from-yellow-400 to-orange-400 text-neutral-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl"
                >
                  Expert Coordination
                </motion.div>
                
                <motion.div
                  animate={{ 
                    x: [-10, 10, -10],
                    y: [5, -5, 5]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  100% Compliant
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <ServicesSection />
    </div>
  );
};

export default Services;