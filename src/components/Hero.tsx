import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

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

// Home page hero
const HomeHeroContent: React.FC<{
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}> = ({ title, subtitle, children }) => {
  const testimonials = [
    {
      name: "Bob Hay",
      role: "Broker at Keller Williams",
      quote: "Debbie has been my transaction coordinator since 2012. She is incredibly organized, staying on top of every step and detail to ensure smooth transactions every time."
    },
    {
      name: "Cassie Transue", 
      role: "Keller Williams Realtor",
      quote: "I have had the pleasure of working alongside Debbie for the past six years. She has consistently demonstrated outstanding dedication and skill as a transaction coordinator."
    },
    {
      name: "Robert Hoffman",
      role: "Keller Williams Realtor", 
      quote: "Working with Debbie feels effortless. Her communication and customer service are easily 5-star. Debbie handles challenges with grace, keeping everything on track."
    },
    {
      name: "Axel Struckmeyer",
      role: "Keller Williams Realtor",
      quote: "I have used her Transaction Coordinator services for around 13-14 years. Her professionalism and expertise have been a huge asset to my business."
    },
    {
      name: "Jess Keller",
      role: "Keller Williams Realtor", 
      quote: "Deb and I have been working together for over six years now. She is an exceptional team player and has consistently exceeded my expectations."
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
          <span className="text-white text-sm font-semibold">Trusted by Pocono Mountains Realtors</span>
        </div>
        
        <h1 className="hero-title">
          Professional Transaction<br />
          <span style={{ color: 'var(--color-primary-300)' }}>Coordination Services</span>
        </h1>
        
        {subtitle && (
          <p className="hero-subtitle">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { value: "30+", label: "Years Experience" },
          { value: "2,000+", label: "Transactions" },
          { value: "$500M+", label: "Volume Coordinated" },
          { value: "100%", label: "Pocono Mountains" }
        ].map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-blue-200">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Scale Your Real Estate Business?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Let me handle the transaction coordination while you focus on what you do best—serving clients and closing deals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              to="/work-with-me"
              variant="secondary"
              size="lg"
              className="bg-white text-blue-900 hover:bg-white/90"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Start Working Together
            </Button>
            
            <div className="flex items-center gap-4 text-white">
              <span className="font-medium">(570) 588-4637</span>
              <span className="text-blue-200">Quick Response</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-white/90 italic mb-4 text-lg">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="text-blue-200 font-medium">
                — {testimonials[currentTestimonial].name}
              </div>
              <div className="text-blue-300 text-sm">
                {testimonials[currentTestimonial].role}
              </div>
            </motion.div>
          </AnimatePresence>
          
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
              />
            ))}
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