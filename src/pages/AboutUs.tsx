import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ProfessionalJourney from '../components/ProfessionalJourney';
import { ArrowRight, Phone, Mail, Award, Star, CheckCircle } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const AboutUs: React.FC = () => {
  const { Link } = useNavigation();

  return (
    <div>
      {/* Hero Section with Homepage Styling */}
      <section className="section hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Meet Your Transaction Expert
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Dedicated support for your real estate business with over 30 years of experience
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Debbie O'Brien Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(139,92,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image Column */}
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/70 backdrop-blur-sm border border-white/20 p-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/optimized/debbie.jpg"
                    alt="Debbie O'Brien - Professional Transaction Coordinator"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white font-semibold text-sm">30+ Years Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Achievement Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-500" />
                  <div>
                    <div className="font-bold text-neutral-900">2,000+</div>
                    <div className="text-sm text-neutral-600">Transactions</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="font-bold text-neutral-900">$500M+</div>
                    <div className="text-sm text-neutral-600">Volume</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Text Column */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-neutral-900 leading-tight">
                    Meet Debbie O'Brien
                  </h2>
                  <h3 className="text-xl lg:text-2xl text-neutral-600 mb-8 font-medium">
                    Owner & President, PA Real Estate Support Services
                  </h3>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6 text-lg leading-8 text-neutral-700"
                >
                  <p className="relative pl-6">
                    <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    With over three decades of experience in real estate administration and transaction coordination, 
                    I've dedicated my career to helping real estate professionals streamline their operations and 
                    focus on what they do best—serving their clients.
                  </p>
                  <p className="relative pl-6">
                    <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    Since founding PA Real Estate Support Services, I've successfully coordinated over 2,000 
                    transactions totaling more than $500 million in volume. My comprehensive understanding of 
                    Pennsylvania real estate regulations and meticulous attention to detail ensure that every 
                    transaction proceeds smoothly from contract to closing.
                  </p>
                  <p className="relative pl-6">
                    <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                    Based in the Pocono Mountains, I serve as a trusted partner to real estate agents throughout 
                    the region, providing the administrative expertise and support that allows them to scale their 
                    businesses while maintaining exceptional service standards.
                  </p>
                </motion.div>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-8"
              >
                <Link
                  to="/work-with-me"
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 transform hover:scale-105"
                >
                  Schedule a Call
                  <Phone className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                </Link>
                <a
                  href="mailto:debbie@parealestatesupport.com"
                  className="group inline-flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white text-neutral-700 hover:text-neutral-900 border-2 border-neutral-200 hover:border-neutral-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                  Send Email
                  <Mail className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section from Homepage */}
      <StatsSection />

      {/* Professional Journey */}
      <ProfessionalJourney />

      {/* CTA Section matching Homepage */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Transactions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let me handle the details while you focus on growing your business.
          </p>
          <Link
            to="/work-with-me"
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;