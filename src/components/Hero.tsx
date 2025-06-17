import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Star, Clock, Shield, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { useNavigation } from '../providers/SmoothNavigationProvider';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'home' | 'page';
  sideContent?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  children,
  variant = 'page',
  sideContent
}) => {
  return (
    <section className="hero-section">
      <div className="page-container">
        {variant === 'home' ? (
          <HomeHeroContent 
            title={title} 
            subtitle={subtitle} 
            children={children} 
          />
        ) : (
          <PageHeroContent 
            title={title} 
            subtitle={subtitle} 
            children={children}
            sideContent={sideContent}
          />
        )}
      </div>
    </section>
  );
};

// Home page hero - Completely redesigned
const HomeHeroContent: React.FC<{
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}> = ({ title, subtitle, children }) => {
  const { Link } = useNavigation();
  
  const features = [
    { icon: Clock, text: "Same-Day Response", color: "text-red-400" },
    { icon: Shield, text: "100% Compliance", color: "text-green-400" },
    { icon: TrendingUp, text: "Scale Your Business", color: "text-blue-400" },
    { icon: Users, text: "White-Glove Service", color: "text-purple-400" }
  ];

  const benefits = [
    "Save 10+ hours per transaction",
    "Never miss a deadline again",
    "Focus on selling, not paperwork",
    "Impress clients with seamless closings"
  ];

  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Split Layout Container */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Content */}
        <div className="text-left">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-yellow-500/30">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-100 text-sm font-semibold">30+ Years Trusted by Pocono Realtors</span>
              <div className="flex -space-x-1 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>
        
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Expert
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Transaction
            </span>
            <span className="block">Coordinator</span>
          </motion.h1>
          
          {/* Dynamic Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xl lg:text-2xl text-blue-100 mb-4">
              Stop drowning in paperwork. Start closing more deals.
            </p>
            
            {/* Animated Benefits */}
            <div className="h-8 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentBenefit}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-white/80 absolute"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 inline mr-2" />
                  {benefits[currentBenefit]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              to="/work-with-me"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Start Your First Transaction
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <a
              href="tel:+5705884637"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              (570) 588-4637
              <span className="ml-2 text-sm text-blue-200">Quick Response</span>
            </a>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-sm text-white/80">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Visual Impact */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative lg:block hidden"
        >
          {/* Main Stats Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              {/* Success Metrics */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">2,000+</div>
                  <div className="text-sm text-blue-200 uppercase tracking-wider">Transactions Closed</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">$500M+</div>
                  <div className="text-sm text-blue-200 uppercase tracking-wider">Volume Managed</div>
                </div>
              </div>
              
              {/* Live Activity Indicator */}
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-100 text-sm font-medium">Currently Managing</span>
                  </div>
                  <span className="text-2xl font-bold text-white">47</span>
                </div>
                <div className="text-xs text-green-200">Active Transactions This Month</div>
              </div>
              
              {/* Client Testimonial Preview */}
              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    BH
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/90 italic mb-2">
                      "Debbie has saved me countless hours and headaches. She's the secret weapon every successful realtor needs."
                    </p>
                    <p className="text-xs text-blue-200">- Bob Hay, Keller Williams</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 bg-gradient-to-br from-yellow-400 to-orange-400 text-neutral-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl"
            >
              30+ Years Experience
            </motion.div>
            
            <motion.div
              animate={{ 
                x: [-10, 10, -10],
                y: [5, -5, 5]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Save 10+ Hours/Deal
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 pt-12 border-t border-white/10"
      >
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-400" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">100% Compliant</div>
              <div className="text-xs text-white/60">PA Real Estate Standards</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Trusted by</div>
              <div className="text-xs text-white/60">Pocono Realtors</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Scale Faster</div>
              <div className="text-xs text-white/60">Handle More Deals</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Page hero
const PageHeroContent: React.FC<{
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  sideContent?: React.ReactNode;
}> = ({ title, subtitle, children, sideContent }) => {
  const words = title.split(' ');
  const lastWord = words.pop();
  const firstWords = words.join(' ');

  return (
    <div className={`grid gap-8 items-center ${sideContent ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center lg:text-left"
      >
        <h1 className="hero-title">
          {firstWords && <span className="block">{firstWords}</span>}
          {lastWord && <span className="block" style={{ color: 'var(--color-primary-300)' }}>{lastWord}</span>}
        </h1>
        
        {subtitle && (
          <p className="hero-subtitle">
            {subtitle}
          </p>
        )}
        
        {children && (
          <div className="flex justify-center lg:justify-start">
            {children}
          </div>
        )}
      </motion.div>

      {sideContent && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            {sideContent}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;