import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import ContentCard from './ContentCard';
import HeroButton from './HeroButton';
import HeroBadge from './HeroBadge';
import PreloadedAnimationWrapper from './PreloadedAnimationWrapper';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui';
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
      subtext: ["Available Monday-Friday", "9:00 AM - 5:00 PM EST"]
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "debbie@parealestatesupport.com",
      link: "mailto:debbie@parealestatesupport.com",
      subtext: ["Quick response guaranteed", "within 24 hours"]
    },
    {
      icon: MapPin,
      title: "Service Area",
      content: "Serving the Pocono Mountains",
      subtext: ["Pennsylvania's Premier", "Transaction Coordinator"]
    }
  ];

  return (
    <section className="pt-24 pb-0 relative overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue/95 to-brand-blue contact-section">
      {/* Subtle background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl pb-20">
        <PreloadedAnimationWrapper
          className="text-center mb-16"
          preloadDelay={200}
          bg="bg-transparent"
        >
          <h2 className="text-h1 text-white font-bold mb-4">
            Let's Transform Your Business
          </h2>
          <p className="text-body-lg text-white/90 max-w-2xl mx-auto">
            Ready to experience seamless transaction coordination? Connect with me to discuss how we can elevate your real estate business together.
          </p>
        </PreloadedAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="glass-card glass-card-navy border-t-4 border-t-brand-gold h-full flex flex-col items-center text-center overflow-hidden hover:lift"
            >
              {/* Icon container using design system */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/15 border border-white/20 mb-6">
                <item.icon className="w-8 h-8 text-brand-gold" />
              </div>

              {/* Title using design system typography */}
              <h3 className="text-h3 text-white font-bold mb-3 text-shadow">
                {item.title}
              </h3>

              {/* Content link or text */}
              {item.link ? (
                <a
                  href={item.link}
                  className="text-white font-medium mb-4 hover:text-brand-gold transition-colors duration-300"
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-white font-medium mb-4">
                  {item.content}
                </p>
              )}

              {/* Subtext using design system spacing */}
              <div className="flex flex-col gap-0.5 text-sm mt-auto">
                {item.subtext.map((text, i) => (
                  <p key={i} className="text-white/90 leading-tight">
                    {text}
                  </p>
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
        <div className="w-full h-full bg-brand-gold/20 rounded-full blur-xl" />
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