import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import StatsSection from '../components/StatsSection';
import { ArrowRight, Shield, Clock, Users, Award, Phone, CheckCircle } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const Home: React.FC = () => {
  const { Link } = useNavigation();

  return (
    <div>
      {/* Enhanced Hero Section */}
      <Hero
        variant="home"
        title="Your trusted partner in reliable transaction management"
        subtitle="Empowering realtors with expert coordination services so you can focus on what matters most—your clients."
      />
      
      {/* Trust & Credibility Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(239,68,68,0.03)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Trust Indicators Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { 
                icon: Award, 
                title: "30+ Years", 
                subtitle: "Experience", 
                color: "text-amber-500",
                bgColor: "from-amber-50 to-amber-100/50",
                borderColor: "border-amber-200/50"
              },
              { 
                icon: Shield, 
                title: "2,000+", 
                subtitle: "Transactions", 
                color: "text-blue-500",
                bgColor: "from-blue-50 to-blue-100/50",
                borderColor: "border-blue-200/50"
              },
              { 
                icon: Clock, 
                title: "100%", 
                subtitle: "Compliance", 
                color: "text-green-500",
                bgColor: "from-green-50 to-green-100/50",
                borderColor: "border-green-200/50"
              },
              { 
                icon: Users, 
                title: "$500M+", 
                subtitle: "Volume", 
                color: "text-purple-500",
                bgColor: "from-purple-50 to-purple-100/50",
                borderColor: "border-purple-200/50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${item.bgColor} rounded-2xl p-6 border ${item.borderColor} text-center hover:shadow-lg transition-all duration-300 group`}
              >
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-2xl font-bold text-neutral-900 mb-1">{item.title}</div>
                <div className="text-sm text-neutral-600">{item.subtitle}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Why Choose PA Real Estate Support Services?
            </h2>
            <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
              I specialize in taking the administrative burden off your shoulders, so you can focus on what you do best—building relationships and closing deals.
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: CheckCircle,
                  title: "Save 10+ Hours Per Deal",
                  description: "Focus on selling while I handle all the paperwork and coordination"
                },
                {
                  icon: Shield,
                  title: "100% Compliance Guaranteed",
                  description: "Stay compliant with all PA regulations and never miss a deadline"
                },
                {
                  icon: Users,
                  title: "White-Glove Client Service",
                  description: "Your clients receive professional updates and seamless communication"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <benefit.icon className="w-8 h-8 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                  <p className="text-neutral-700">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Strong CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/agent-portal"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative flex items-center gap-2">
                  Start Your First Transaction
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <a
                href="tel:+5705884637"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-700 bg-white border-2 border-neutral-300 rounded-xl hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Call (570) 588-4637
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutSection />
      <Services />
      <StatsSection />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default Home;