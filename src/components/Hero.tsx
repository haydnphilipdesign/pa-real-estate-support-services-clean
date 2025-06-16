import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Shield, 
  ChevronRight, 
  Users, 
  Phone, 
  Mail, 
  Award,
  TrendingUp,
  FileCheck,
  MapPin
} from 'lucide-react';
import GlobalPageHero from './GlobalPageHero';
import { Button } from '@/components/ui';
import ContentCard from './ContentCard';
import HERO_ANIMATION from '../animations/heroAnimations';

// Real testimonials data
const testimonials = [
  {
    id: 1,
    name: "Bob Hay",
    role: "Broker at Keller Williams",
    quote: "Debbie has been my transaction coordinator since 2012. She is incredibly organized, staying on top of every step and detail to ensure smooth transactions every time.",
    image: "/bob-hay.jpg"
  },
  {
    id: 2,
    name: "Cassie Transue",
    role: "Keller Williams Realtor",
    quote: "I have had the pleasure of working alongside Debbie for the past six years. She has consistently demonstrated outstanding dedication and skill as a transaction coordinator.",
    image: "/cassie-transue.jpg"
  },
  {
    id: 3,
    name: "Robert Hoffman",
    role: "Keller Williams Realtor",
    quote: "Working with Debbie feels effortless. Her communication and customer service are easily 5-star. Debbie handles challenges with grace, keeping everything on track.",
    image: "/robert-hoffman.jpg"
  },
  {
    id: 4,
    name: "Axel Struckmeyer",
    role: "Keller Williams Realtor",
    quote: "I have used her Transaction Coordinator services for around 13-14 years. Her professionalism and expertise have been a huge asset to my business.",
    image: "/axel-struckmeyer.jpg"
  },
  {
    id: 5,
    name: "Jess Keller",
    role: "Keller Williams Realtor",
    quote: "Deb and I have been working together for over six years now. She is an exceptional team player and has consistently exceeded my expectations.",
    image: "/jess-keller.jpg"
  }
];

// Trust indicators for real estate professionals
const trustIndicators = [
  { icon: Award, value: "30+", label: "Years Experience", color: "text-blue-300" },
  { icon: FileCheck, value: "2,000+", label: "Transactions", color: "text-green-300" },
  { icon: TrendingUp, value: "$500M+", label: "Volume Coordinated", color: "text-yellow-300" },
  { icon: MapPin, value: "100%", label: "Pocono Mountains", color: "text-purple-300" }
];

// Core value propositions for agents
const coreValues = [
  { 
    icon: Clock, 
    title: "Save 10+ Hours Per Transaction", 
    description: "Focus on sales while I handle all paperwork coordination",
    metric: "Significant time savings"
  },
  { 
    icon: Shield, 
    title: "Compliance Focused", 
    description: "Pennsylvania real estate law expertise to minimize compliance risks",
    metric: "Experience-driven"
  },
  { 
    icon: CheckCircle, 
    title: "Faster Closings", 
    description: "Proactive management eliminates delays and last-minute issues",
    metric: "21 day average"
  },
  { 
    icon: Users, 
    title: "Happy Clients & Referrals", 
    description: "Professional communication keeps all parties informed",
    metric: "High satisfaction"
  }
];

// Real statistics data
const stats = [
  { id: 1, value: '30+', label: 'Years of Excellence' },
  { id: 2, value: '2,000+', label: 'Transactions' },
  { id: 3, value: '10,000+', label: 'Agent Hours Saved' },
  { id: 4, value: '$500M+', label: 'Transaction Volume' },
];

const Hero: React.FC = () => {
  // State for rotating testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const hasAnimated = useRef(false);

  // Testimonial rotation effect
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  // Prevent re-animation when scrolling back to top
  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated.current) {
        // If we've already animated, prevent re-animation
        const heroElements = document.querySelectorAll('[data-hero-content]');
        heroElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.removeAttribute('data-hero-content');
          }
        });
      }
    };

    // Set animation state after initial animation
    setTimeout(() => {
      hasAnimated.current = true;
    }, 1000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <GlobalPageHero 
      overlayColor="from-black/50 via-black/30 to-black/50"
      overlayOpacity="bg-black/20"
    >
      <div className="container px-4 md:px-6 lg:px-8 mx-auto w-full py-12" id="home-hero">
        {/* Professional Header with Immediate Credibility */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Credibility Badge */}
          <div className="inline-flex items-center bg-black/40 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-white/30">
            <Award className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white text-sm font-semibold" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}>Trusted by Pocono Mountains Realtors</span>
          </div>
          
          {/* Main Professional Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 3px 6px rgba(0, 0, 0, 0.8)' }}>
            <span className="block">Professional Transaction</span>
            <span className="block text-blue-200">Coordination Services</span>
          </h1>
          
          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto font-light" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}>
            I handle your paperwork, you focus on sales. 30+ years of expertise serving real estate professionals in the Pocono Mountains.
          </p>
        </motion.div>

        {/* Trust Indicators Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="glass-card-navy text-center p-6">
              <indicator.icon className={`w-8 h-8 mx-auto mb-3 ${indicator.color}`} />
              <div className="text-2xl font-bold text-white mb-1">{indicator.value}</div>
              <div className="text-sm text-blue-200">{indicator.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Core Value Propositions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {coreValues.map((value, index) => (
            <div key={index} className="glass-card-navy p-6 hover:lift">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-blue-100 text-sm mb-3 leading-relaxed">{value.description}</p>
                  <div className="inline-flex items-center bg-green-500/20 rounded-full px-3 py-1">
                    <TrendingUp className="w-3 h-3 text-green-300 mr-1" />
                    <span className="text-green-300 text-xs font-medium">{value.metric}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Professional CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass-card-navy p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Scale Your Real Estate Business?
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Let me handle the transaction coordination while you focus on what you do best—serving clients and closing deals.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                to="/work-with-me"
                variant="secondary"
                size="lg"
                className="bg-white text-brand-blue hover:bg-white/90"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Start Working Together
              </Button>
              
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-300" />
                  <span className="font-medium">(570) 588-4637</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-300" />
                  <span>Quick Response</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agent Testimonial Sidebar */}
        <motion.div 
          className="mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="glass-card-navy p-6">
            <div className="text-center">
              <div className="text-3xl text-blue-200 opacity-50 font-serif mb-2">"</div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-white/90 italic mb-4 text-lg">
                    {testimonials[currentTestimonial].quote}
                  </p>
                  <div className="text-blue-200 font-medium">
                    — {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-300 text-sm">
                    {testimonials[currentTestimonial].role}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Testimonial Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === index
                        ? 'bg-white w-6'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </GlobalPageHero>
  );
};

export default Hero;