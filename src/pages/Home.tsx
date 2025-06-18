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
      
      {/* Transforming Complex Transactions Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.03)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(239,68,68,0.03)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                  Transforming Complex Transactions into Seamless Success Stories
                </h2>
                <h3 className="text-xl lg:text-2xl text-blue-600 font-semibold mb-8">
                  Three Decades of Excellence in the Pocono Mountains
                </h3>
              </div>
              
              <div className="space-y-6 text-lg leading-8 text-neutral-700">
                <p className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                  At PA Real Estate Support Services, I specialize in turning complex real estate transactions into seamless experiences. With a deep understanding of the unique challenges in today's market, I provide comprehensive coordination services that empower real estate professionals to scale their business while maintaining exceptional client service.
                </p>
                <p className="relative pl-6">
                  <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                  My extensive experience in the Pocono Mountains real estate market, combined with a commitment to cutting‑edge technology and personalized service, ensures that every transaction is handled with precision and care. From contract to closing, I'm dedicated to being your trusted partner in success.
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                >
                  Discover My Approach
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/70 backdrop-blur-sm border border-white/20 p-2 max-w-sm w-full">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/optimized/debbie.jpg"
                    alt="Debbie O'Brien - Professional Transaction Coordinator"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900 mb-1">30+</div>
                  <div className="text-sm text-neutral-600">Years Excellence</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900 mb-1">$500M+</div>
                  <div className="text-sm text-neutral-600">Volume</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elevate Your Real Estate Business Section */}
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
              Elevate Your Real Estate Business
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Experience seamless transaction management that empowers you to grow your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Transaction Coordination",
                description: "Expert management of your real estate transactions from contract to closing, allowing you to focus on growing your business."
              },
              {
                icon: Shield,
                title: "Document Management",
                description: "Secure digital handling of all your transaction documents, ensuring everything is stored, organized, and easily accessible."
              },
              {
                icon: Clock,
                title: "Timeline Tracking",
                description: "Strategic oversight of critical dates and deadlines, keeping your transactions on track with proactive monitoring and timely updates."
              },
              {
                icon: Award,
                title: "Compliance Review",
                description: "Comprehensive reviews covering all regulatory requirements and industry standards."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{service.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="group inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
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
              What Our Clients Say
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl lg:text-2xl text-neutral-700 leading-relaxed mb-8 italic">
                  "Debbie has been my transaction coordinator since 2012, and from the moment she came on board things got orderly, on time, and easily tracked and fully under my control. I can't say enough good things about the way she manages the transaction, and I have full confidence in the professionalism she brings to even the most difficult situations. I would suggest that to my team. She is, without a doubt, the best."
                </blockquote>
                <div className="border-t border-neutral-200 pt-8">
                  <div className="font-bold text-xl text-neutral-900 mb-2">Bob Hay</div>
                  <div className="text-neutral-600">Broker at Keller Williams</div>
                  <div className="text-neutral-600">Former President of the Pennsylvania Association of Realtors (PAR)</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <StatsSection />

      {/* Let's Transform Your Business Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Let's Transform Your Business
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Ready to experience seamless transaction coordination? Connect with me to discuss how we can elevate your real estate business together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Phone,
                title: "Direct Line",
                description: "(570) 588‑4637",
                subtitle: "Monday–Friday 9:00 AM–5:00 PM"
              },
              {
                icon: Users,
                title: "Email Support",
                description: "debbie@parealestatesupport.com",
                subtitle: "Professional email coordination"
              },
              {
                icon: Shield,
                title: "Service Area",
                description: "Pocono Mountains",
                subtitle: "Serving Realtors throughout the region"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-50 to-white p-8 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <contact.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{contact.title}</h3>
                <p className="text-lg font-semibold text-blue-600 mb-2">{contact.description}</p>
                <p className="text-neutral-600">{contact.subtitle}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/agent-portal"
              className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
            >
              Start Your Success Journey
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;