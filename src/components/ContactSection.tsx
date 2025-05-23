import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import ContentCard from './ContentCard';
import HeroButton from './HeroButton';
import HeroBadge from './HeroBadge';
import PreloadedAnimationWrapper from './PreloadedAnimationWrapper';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { ensureCssImported } from './FixedCssImport';

// Ensure CSS is imported
ensureCssImported();

const ContactSection: React.FC = () => {
  const { Link } = useNavigation();

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Line",
      content: "(570) 588-4637",
      link: "tel:+5705884637",
      subtext: ["Available Monday-Friday", "9:00 AM - 5:00 PM EST"],
      style: "glass-navy" as const
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "debbie@parealestatesupport.com",
      link: "mailto:debbie@parealestatesupport.com",
      subtext: ["Quick response guaranteed", "within 24 hours"],
      style: "glass-navy" as const
    },
    {
      icon: MapPin,
      title: "Service Area",
      content: "Serving the Pocono Mountains",
      subtext: ["Pennsylvania's Premier", "Transaction Coordinator"],
      style: "glass-navy" as const
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 contact-section">
      {/* Subtle background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.03)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <PreloadedAnimationWrapper
          className="text-center mb-16"
          preloadDelay={200}
          bg="bg-transparent"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Transform Your Business
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Ready to experience seamless transaction coordination? Connect with me to discuss how we can elevate your real estate business together.
          </p>
        </PreloadedAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: 'rgba(30, 58, 138, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderTop: '3px solid #FFB81C',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
              }}
              className="h-full flex flex-col items-center text-center rounded-2xl overflow-hidden transition-all duration-300 p-6 relative hover:shadow-xl hover:-translate-y-1"
            >
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundImage: 'none'
              }} className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 mb-6">
                <item.icon className="w-8 h-8 text-amber-400" />
              </div>

              <h3 style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                color: '#FFB81C',
                fontWeight: 700,
                fontSize: '1.25rem',
                marginBottom: '0.75rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                backgroundImage: 'none'
              }}>{item.title}</h3>

              {item.link ? (
                <a
                  href={item.link}
                  style={{
                    background: 'transparent',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    backgroundImage: 'none'
                  }}
                  className="hover:text-amber-400 transition-colors duration-300 font-medium mb-4"
                >
                  {item.content}
                </a>
              ) : (
                <p style={{
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  fontWeight: 500,
                  marginBottom: '1rem',
                  backgroundImage: 'none'
                }} className="mb-4 font-medium">
                  {item.content}
                </p>
              )}

              <div style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                lineHeight: '1.2',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.125rem'
              }} className="text-sm mt-auto subtext-container">
                {item.subtext.map((text, i) => (
                  <p key={i} style={{
                    background: 'transparent',
                    backgroundColor: 'transparent',
                    color: 'rgba(255, 255, 255, 0.9)',
                    backgroundImage: 'none',
                    lineHeight: '1.2',
                    margin: 0,
                    padding: 0
                  }} className="subtext-line">{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
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
        <div className="w-full h-full bg-brand-blue/10 rounded-full blur-xl" />
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
        <div className="w-full h-full bg-[#FFB81C]/20 rounded-full blur-xl" />
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
        <div className="w-full h-full bg-brand-blue/15 rounded-full blur-lg" />
      </motion.div>
    </section>
  );
};

export default ContactSection;