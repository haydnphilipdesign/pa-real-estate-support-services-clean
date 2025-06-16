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
  Calendar
} from 'lucide-react';
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

// Lead generation benefits for agents
const leadGenBenefits = [
  {
    icon: CheckCircle2,
    title: "Free Transaction Review",
    description: "I'll analyze your current process and show you exactly where you're losing time and money",
    cta: "Get Your Free Review",
    highlight: "Save 10+ Hours Per Deal"
  },
  {
    icon: Clock,
    title: "24-Hour Response Guarantee",
    description: "When you contact me about a new transaction, I respond within 24 hours with next steps",
    cta: "Start Your Transaction",
    highlight: "Always Available"
  },
  {
    icon: Shield,
    title: "Risk-Free Trial Period",
    description: "Try my services for your first transaction with no long-term commitment required",
    cta: "Start Your Trial",
    highlight: "Zero Risk"
  }
];

// Trust indicators for conversion
const trustFactors = [
  { icon: Star, text: "5-Star Reviews", metric: "95% Agent Satisfaction" },
  { icon: Users, text: "200+ Active Agents", metric: "Serving Since 1993" },
  { icon: Calendar, text: "21-Day Average", metric: "Faster Closings" }
];

const ContactSection: React.FC = () => {
  const { Link } = useNavigation();

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Line",
      content: "(570) 588-4637",
      link: "tel:+5705884637",
      subtext: ["Available Monday-Friday", "9:00 AM - 5:00 PM EST"],
      urgent: true
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "debbie@parealestatesupport.com",
      link: "mailto:debbie@parealestatesupport.com",
      subtext: ["Quick response guaranteed", "within 24 hours"],
      urgent: false
    },
    {
      icon: MapPin,
      title: "Service Area",
      content: "Serving the Pocono Mountains",
      subtext: ["Pennsylvania's Premier", "Transaction Coordinator"],
      urgent: false
    }
  ];

  return (
    <section className="pt-24 pb-0 relative overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue/95 to-brand-blue contact-section">
      {/* Subtle background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl pb-20">
        {/* Professional Header with Urgency */}
        <PreloadedAnimationWrapper
          className="text-center mb-16"
          preloadDelay={200}
          bg="bg-transparent"
        >
          <div className="inline-flex items-center bg-green-500/20 rounded-full px-6 py-2 mb-6 border border-green-500/30">
            <CheckCircle2 className="w-4 h-4 text-green-300 mr-2" />
            <span className="text-green-300 text-sm font-medium">Available for New Clients</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-6">
            Ready to Scale Your Real Estate Business?
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-8">
            Stop spending 10+ hours per transaction on paperwork. Let a 30-year industry expert handle your coordination while you focus on what pays—closing more deals.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {trustFactors.map((factor, index) => (
              <div key={index} className="flex items-center text-white/90">
                <factor.icon className="w-4 h-4 text-brand-gold mr-2" />
                <span className="text-sm">
                  <span className="font-semibold text-white">{factor.text}</span>
                  <span className="mx-2">•</span>
                  <span>{factor.metric}</span>
                </span>
              </div>
            ))}
          </div>
        </PreloadedAnimationWrapper>

        {/* Lead Generation Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {leadGenBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card-navy p-8 text-center hover:lift group"
            >
              {/* Highlight Badge */}
              <div className="inline-flex items-center bg-brand-gold/20 rounded-full px-4 py-2 mb-4">
                <span className="text-brand-gold text-sm font-semibold">{benefit.highlight}</span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-brand-gold" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-white/90 mb-6 leading-relaxed">{benefit.description}</p>

              {/* CTA Button */}
              <Link
                to="/work-with-me"
                className="btn btn-secondary btn-sm w-full"
              >
                {benefit.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Direct Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-navy p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's Talk About Your Transaction Coordination Needs
            </h3>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Every agent's business is different. I'll create a custom coordination plan that fits your specific needs and transaction volume.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`text-center p-6 rounded-lg ${
                  item.urgent 
                    ? 'bg-green-500/20 border-2 border-green-500/30' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {item.urgent && (
                  <div className="inline-flex items-center bg-green-500/30 rounded-full px-3 py-1 mb-4">
                    <span className="text-green-300 text-xs font-semibold">FASTEST RESPONSE</span>
                  </div>
                )}

                <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-brand-gold" />
                </div>

                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-white font-medium text-lg hover:text-brand-gold transition-colors duration-300 block mb-3"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-white font-medium text-lg mb-3">{item.content}</p>
                )}

                <div className="space-y-1">
                  {item.subtext.map((text, i) => (
                    <p key={i} className="text-white/80 text-sm">{text}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/work-with-me"
                className="btn btn-secondary btn-lg"
              >
                Get Your Free Transaction Review
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <div className="text-white/90 text-sm">
                <span className="font-medium">Call now:</span> (570) 588-4637
              </div>
            </div>
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