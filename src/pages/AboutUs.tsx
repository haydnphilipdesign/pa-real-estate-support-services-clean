import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ProfessionalJourney from '../components/ProfessionalJourney';
import { ArrowRight, Phone, Mail, Award } from 'lucide-react';
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
      <section className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image Column */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/optimized/debbie.jpg"
                  alt="Debbie O'Brien - Professional Transaction Coordinator"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <span className="text-white font-semibold">30+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-900">
                  About Debbie O'Brien
                </h2>
                <h3 className="text-xl text-neutral-700 mb-6">
                  Owner & President, PA Real Estate Support Services
                </h3>
                <div className="space-y-4 text-lg leading-7 text-neutral-700">
                  <p>
                    With over three decades of experience in real estate administration and transaction coordination, 
                    I've dedicated my career to helping real estate professionals streamline their operations and 
                    focus on what they do best—serving their clients.
                  </p>
                  <p>
                    Since founding PA Real Estate Support Services, I've successfully coordinated over 2,000 
                    transactions totaling more than $500 million in volume. My comprehensive understanding of 
                    Pennsylvania real estate regulations and meticulous attention to detail ensure that every 
                    transaction proceeds smoothly from contract to closing.
                  </p>
                  <p>
                    Based in the Pocono Mountains, I serve as a trusted partner to real estate agents throughout 
                    the region, providing the administrative expertise and support that allows them to scale their 
                    businesses while maintaining exceptional service standards.
                  </p>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  to="/work-with-me"
                  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Schedule a Call
                  <Phone className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="mailto:debbie@parealestatesupport.com"
                  className="inline-flex items-center justify-center bg-white hover:bg-neutral-50 text-neutral-700 border-2 border-neutral-300 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border-neutral-400"
                >
                  Send Email
                  <Mail className="w-5 h-5 ml-2" />
                </a>
              </div>
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