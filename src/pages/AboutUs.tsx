import React from "react";
import { motion } from 'framer-motion';
import ProfileSection from '../components/ProfileSection';
import { ArrowRight, Calendar, CheckCircle2, Target, Presentation, Users, Award } from 'lucide-react';
import useScrollToTop from "../hooks/useScrollToTop";
import CenteredTimelineLayout from "../components/CenteredTimelineLayout";
import GlobalPageHeroNew from '../components/GlobalPageHeroNew';
import { UnifiedButton } from '../components/ui/unified-button';
import { ensureCssImported } from '../components/FixedCssImport'; // Import the CSS helper

// Ensure CSS is imported
ensureCssImported();

// Enhanced Core Value Component
const CoreValue = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<any> }) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
  >
    <div className="glass-card-on-white h-full transform group-hover:shadow-xl transition-all duration-300">
      <div className="bg-blue-600/10 p-4 rounded-full w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </motion.div>
);

const AboutUs: React.FC = () => {
  useScrollToTop();

  return (
    <div className="about-page">
      {/* Hero section with matching home page styling */}
      <GlobalPageHeroNew>
        <div className="container px-4 md:px-6 lg:px-8 mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[calc(100vh-80px)] py-20">
            <div className="lg:col-span-7">
              <motion.div
                className="max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 0.03, 0.36, 1.0]
                  }
                }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left">
                  <motion.div className="overflow-hidden inline-block w-full">
                    <motion.span
                      className="inline-block text-white text-shadow-md flex flex-col"
                      initial={{ y: 60, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 1.5,
                          ease: [0.22, 0.03, 0.26, 1.0],
                          delay: 0.2
                        }
                      }}
                    >
                      <div>Meet Your Transaction</div>
                      <div className="text-brand-blue">Coordination Expert</div>
                    </motion.span>
                  </motion.div>
                </h1>

                <motion.p
                  className="text-xl lg:text-2xl text-white font-light tracking-wide text-center lg:text-left max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.7
                    }
                  }}
                >
                  Dedicated support for your real estate business
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.03, 0.36, 1.0],
                      delay: 0.8
                    }
                  }}
                >
                  <UnifiedButton
                    to="/work-with-me"
                    variant="glass"
                    size="lg"
                    radius="full"
                    withAnimation={true}
                    icon={
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    }
                    iconPosition="right"
                  >
                    Get in Touch
                  </UnifiedButton>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Single Blue Glass Card like Services Highlights */}
            <motion.div 
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  delay: 0.5
                }
              }}
            >
              <div className="glass-card-navy p-6 rounded-xl shadow-lg">
                <h3 className="flex items-center text-white font-semibold mb-4 text-lg">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  About Debbie O'Brien
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mr-3">
                      <Award className="h-4 w-4 text-blue-200" />
                    </div>
                    <span className="text-white text-sm">30+ years of real estate industry experience</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mr-3">
                      <Target className="h-4 w-4 text-blue-200" />
                    </div>
                    <span className="text-white text-sm">Specializing in Pennsylvania real estate transactions</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-200" />
                    </div>
                    <span className="text-white text-sm">Over 2,000 successful transactions coordinated</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-blue-200" />
                    </div>
                    <span className="text-white text-sm">Dedicated partner to real estate professionals</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </GlobalPageHeroNew>

      {/* Profile Section - Add solid background to prevent slideshow from showing through */}
      <section className="relative bg-white">
        <ProfileSection />
      </section>

      {/* Journey Section - Now using CenteredTimelineLayout */}
      <section className="bg-gradient-to-br from-brand-blue via-brand-blue/95 to-brand-blue relative overflow-hidden py-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.08)_100%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
        </div>
        <CenteredTimelineLayout />
      </section>

      {/* Core Values Section - Ensure solid background */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)]" />
          <div className="absolute inset-0 bg-grid-gray-500/[0.02] bg-[length:32px_32px]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">Our Values</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide my work and commitment to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "Reliability",
                description: "You can count on me to deliver consistent, high-quality service for every transaction, every time."
              },
              {
                icon: Target,
                title: "Precision",
                description: "I pay meticulous attention to detail, ensuring all documentation is accurate and compliant."
              },
              {
                icon: Calendar,
                title: "Timeliness",
                description: "I respect deadlines and ensure all tasks are completed promptly to keep your transactions on schedule."
              },
              {
                icon: Presentation,
                title: "Professionalism",
                description: "I maintain the highest standards of professionalism in all interactions and communications."
              },
              {
                icon: Users,
                title: "Client-Focused",
                description: "Your success is my priority. I tailor my services to meet your specific needs and preferences."
              },
              {
                icon: ArrowRight,
                title: "Continuous Improvement",
                description: "I constantly seek to enhance my skills and knowledge to provide you with the best possible service."
              }
            ].map((value, index) => (
              <CoreValue key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Add solid background */}
      <motion.section
        className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/90 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-brand-blue">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to streamline your transactions?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Let me handle the paperwork while you focus on growing your business
            </p>
            <UnifiedButton
              to="/agent-portal"
              variant="secondary"
              size="lg"
              radius="full"
              withAnimation={true}
              icon={
                <ArrowRight className="w-5 h-5" />
              }
            >
              Start a Transaction
            </UnifiedButton>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;