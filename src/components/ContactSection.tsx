import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Shield,
  Star,
  Users,
  Calendar,
  FileText
} from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import PreloadedAnimationWrapper from './PreloadedAnimationWrapper';

const ContactSection: React.FC = () => {
  const { Link } = useNavigation();

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Line",
      content: "(570) 588-4637",
      link: "tel:+5705884637",
      subtext: ["Monday-Friday", "9:00 AM - 5:00 PM"],
      urgent: true
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "debbie@parealestatesupport.com",
      link: "mailto:debbie@parealestatesupport.com",
      subtext: [],
      urgent: false
    },
    {
      icon: MapPin,
      title: "Service Area",
      content: "Serving Realtors in the Pocono Mountains",
      subtext: [],
      urgent: false
    }
  ];

  return (
    <section className="section hero-section">
      {/* Subtle background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:32px_32px]" />
      </div>

      <div className="hero-content">
        {/* Professional Header with Urgency */}
        <PreloadedAnimationWrapper
          className="text-center mb-16"
          preloadDelay={200}
          bg="bg-transparent"
        >
          
          <h2 className="text-3xl sm:text-2xl lg:text-4xl font-bold leading-tight mb-6 text-white">
            Let's Transform Your Business
          </h2>
          <p className="text-lead text-white/90 max-w-4xl mx-auto mb-8">
            Ready to experience seamless transaction coordination? Connect with me to discuss how we can elevate your real estate business together.
          </p>

        </PreloadedAnimationWrapper>


        {/* Redesigned Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Contact Card with Split Design */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Top Section - Dark Background with CTA */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 md:p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Get Started
              </h3>
              <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                Ready to save 10+ hours per transaction? I'm here to help.
              </p>
              
              {/* Primary Phone CTA */}
              <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <span className="text-sm text-neutral-400 uppercase tracking-wider mb-2">Call Now</span>
                <a 
                  href="tel:+5705884637" 
                  className="text-3xl md:text-4xl font-bold text-white hover:text-red-400 transition-colors"
                >
                  (570) 588-4637
                </a>
                <span className="text-sm text-neutral-400 mt-2">Mon-Fri • 9AM-5PM EST</span>
              </div>
            </div>

            {/* Bottom Section - Light Background with Contact Methods */}
            <div className="bg-neutral-50 p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Quick Connect */}
                <div className="text-center group">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">Quick Connect</h4>
                  <p className="text-neutral-600 mb-3">Direct line for urgent matters</p>
                  <a 
                    href="tel:+5705884637" 
                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    Call Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

                {/* Email Support */}
                <div className="text-center group">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">Email Support</h4>
                  <p className="text-neutral-600 mb-3">Detailed inquiries & documents</p>
                  <a 
                    href="mailto:debbie@parealestatesupport.com" 
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Send Email
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

                {/* Start Transaction */}
                <div className="text-center group">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">Start Now</h4>
                  <p className="text-neutral-600 mb-3">Begin your transaction today</p>
                  <Link 
                    to="/agent-portal"
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Trust Indicators Bar */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-neutral-600">24-Hour Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-neutral-600">Pocono Mountains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-neutral-600">30+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-4 right-8 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Available Now
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-20 left-20 w-32 h-32 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-full h-full bg-primary-500/10 rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-full h-full bg-warning-500/20 rounded-full blur-xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-40 w-16 h-16 hidden lg:block"
        animate={{
          x: [0, 15, 0],
          y: [0, -10, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="w-full h-full bg-primary-500/15 rounded-full blur-lg" />
      </motion.div>
    </section>
  );
};

export default ContactSection;