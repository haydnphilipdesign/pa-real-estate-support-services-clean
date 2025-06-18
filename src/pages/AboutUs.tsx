import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ProfessionalJourney from '../components/ProfessionalJourney';
import { ArrowRight, Phone, Mail, Award, Star, CheckCircle, Shield, Clock, Users } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';

const AboutUs: React.FC = () => {
  const { Link } = useNavigation();

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
                    <span className="text-white/90 text-sm font-medium">30+ Years of Excellence</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Meet Your Transaction Expert
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    Dedicated support for your real estate business with comprehensive transaction coordination services in the Pocono Mountains
                  </p>
                </motion.div>

                {/* Key Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-3 gap-6 py-8"
                >
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">30+</div>
                    <div className="text-white/80 text-sm font-medium">Years Excellence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">2,000+</div>
                    <div className="text-white/80 text-sm font-medium">Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$500M+</div>
                    <div className="text-white/80 text-sm font-medium">Volume</div>
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
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                  >
                    Schedule a Call
                    <Phone className="w-5 h-5 ml-2 group-hover:animate-pulse" />
                  </Link>
                  <a
                    href="mailto:debbie@parealestatesupport.com"
                    className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Email
                    <Mail className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Professional Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 max-w-sm w-full">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="/optimized/debbie.jpg"
                      alt="Debbie O'Brien - Professional Transaction Coordinator"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating Achievement Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-bold text-neutral-900">Expert</div>
                      <div className="text-sm text-neutral-600">Pocono Market</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-neutral-900 leading-tight">
                About Debbie O'Brien
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-lg leading-8 text-neutral-700 mb-8"
            >
              <p>
                With over three decades of experience in real estate, Debbie O'Brien has established herself as a premier transaction coordinator in the Pocono market. Her journey began with a passion for solving complex contract coordination issues and evolved into a comprehensive service that supports agents and their clients throughout the entire process.
              </p>
              <p>
                Specializing in transaction coordination, Debbie combines her deep industry knowledge with meticulous attention to detail. Her approach ensures that your transaction lifecycle—from contract to close—is managed with precision and care.
              </p>
            </motion.div>

            {/* Areas of Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <h4 className="text-2xl font-bold text-neutral-900 mb-8">Areas of Expertise</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {[
                  'Contract Review & Compliance',
                  'Timeline Management', 
                  'Documentation Organization',
                  'Communication Facilitation',
                  'Process Optimization',
                  'Closing Coordination'
                ].map((expertise, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-neutral-700 font-medium">{expertise}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comprehensive Transaction Support Section */}
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
              Comprehensive Transaction Support
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Transaction Excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Transaction Excellence",
                description: "Every transaction is handled with meticulous attention to detail, ensuring compliance and efficiency throughout the process.",
                features: [
                  "Detailed contract review",
                  "Timeline optimization", 
                  "Document management",
                  "Progress tracking"
                ],
                icon: CheckCircle,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Quality Assurance",
                description: "Implementing rigorous quality control measures to prevent issues and maintain the highest standards of service.",
                features: [
                  "Compliance verification",
                  "Process monitoring",
                  "Risk mitigation", 
                  "Best practice implementation"
                ],
                icon: Shield,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Client Care",
                description: "Providing exceptional support and clear communication to ensure a smooth and stress-free experience.",
                features: [
                  "Regular updates",
                  "Prompt response times",
                  "Clear communication",
                  "Proactive problem-solving"
                ],
                icon: Users,
                color: "from-purple-500 to-purple-600"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{service.title}</h3>
                <p className="text-neutral-700 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 text-left">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/20">
              <blockquote className="text-2xl lg:text-3xl font-medium text-neutral-800 leading-relaxed mb-8 italic">
                "Your success is my commitment - not just a promise, but my daily practice."
              </blockquote>
              <div className="border-t border-neutral-200 pt-6">
                <div className="font-bold text-xl text-neutral-900">Debbie O'Brien</div>
                <div className="text-neutral-600">Owner & President, PA Real Estate Support Services</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Journey */}
      <ProfessionalJourney />

      {/* Core Values Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Core Values
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              The principles that guide my work and commitment to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Reliability",
                description: "You can count on me to deliver consistent, high‑quality service for every transaction, every time.",
                icon: Shield,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Precision",
                description: "I pay meticulous attention to detail, ensuring all documentation is accurate and compliant.",
                icon: CheckCircle,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Timeliness",
                description: "I respond quickly and meet all tasks to keep your transactions on schedule.",
                icon: Clock,
                color: "from-amber-500 to-amber-600"
              },
              {
                title: "Professionalism",
                description: "I maintain the highest standard of professionalism in all interactions and communications.",
                icon: Award,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Client‑Focused",
                description: "Your success is my priority. I tailor my services to meet your specific needs and preferences.",
                icon: Users,
                color: "from-red-500 to-red-600"
              },
              {
                title: "Continuous Improvement",
                description: "I continuously strive to enhance my skills and knowledge to provide you with the best possible service.",
                icon: Star,
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section matching Homepage */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Transactions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let me handle the details while you focus on growing your business.
          </p>
          <Link
            to="/work-with-me"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
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