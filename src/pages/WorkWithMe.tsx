import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import { ArrowRight, Phone, Mail, Calendar, Award, Star, Clock, CheckCircle, Users, Shield } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const WorkWithMe: React.FC = () => {
  const { Link } = useNavigation();

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
                  <Award className="w-5 h-5 text-green-400" />
                  <span className="text-green-100 text-sm font-semibold">Ready to Partner With You</span>
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
                Let's Work
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  Together
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
                  Ready to streamline your real estate transactions and scale your business?
                </p>
                
                {/* Partnership Benefits */}
                <div className="space-y-3">
                  {[
                    { icon: Clock, text: "Same-day response to all inquiries", color: "text-blue-400" },
                    { icon: Shield, text: "100% compliance with PA regulations", color: "text-green-400" },
                    { icon: Users, text: "Dedicated support for your clients", color: "text-purple-400" },
                    { icon: CheckCircle, text: "Seamless transaction management", color: "text-yellow-400" }
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
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link
                  to="/agent-portal"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Start Your First Transaction
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <a
                  href="tel:+5705884637"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  (570) 588-4637
                  <span className="ml-2 text-sm text-blue-200">Call Now</span>
                </a>
              </motion.div>
              
              {/* Contact Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <p className="text-white/90 text-lg italic mb-2">
                  "Let's work together to streamline your transactions and help your business thrive."
                </p>
                <p className="text-blue-200 text-sm font-medium">- Debbie O'Brien, Transaction Coordinator</p>
              </motion.div>
            </div>

            {/* Right Side - Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative lg:block hidden"
            >
              {/* Main Contact Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  {/* Contact Header */}
                  <div className="text-center mb-8">
                    <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
                    <p className="text-blue-200">Ready to get started? Let's connect!</p>
                  </div>
                  
                  {/* Contact Methods */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Phone className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">(570) 588-4637</p>
                        <p className="text-green-200 text-sm">Call for immediate assistance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold break-all">debbie@parealestatesupport.com</p>
                        <p className="text-blue-200 text-sm">Email for detailed inquiries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Calendar className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Mon-Fri, 9:00 AM - 5:00 PM</p>
                        <p className="text-yellow-200 text-sm">Available for consultation</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Response Time Badge */}
                  <div className="mt-6 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-400" />
                        <span className="text-green-100 text-sm font-medium">Response Time</span>
                      </div>
                      <span className="text-white font-bold">&lt; 1 Hour</span>
                    </div>
                    <div className="text-xs text-green-200 mt-2">During business hours</div>
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
                  Quick Response
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
                  <Users className="w-4 h-4" />
                  Personal Service
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Contact />
      <FAQ />
    </div>
  );
};

export default WorkWithMe;