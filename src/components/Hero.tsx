import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Shield, ChevronRight, Users } from 'lucide-react';
import GlobalPageHero from './GlobalPageHeroNew';
import { UnifiedButton } from './ui/unified-button';
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

// Key features to highlight
const features = [
  { icon: CheckCircle, title: "Streamlined Transactions", description: "Simplified process from contract to closing" },
  { icon: Clock, title: "Faster Closings", description: "Efficient coordination saves valuable time" },
  { icon: Shield, title: "Compliance Expertise", description: "Stay compliant with regulatory requirements" },
  { icon: Users, title: "Client Communication", description: "Professional updates to all parties" }
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
    <GlobalPageHero title="Your trusted partner in reliable transaction management">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto w-full py-0" id="home-hero" style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7">
            <motion.div
              className="max-w-2xl mx-auto lg:mx-0"
              variants={HERO_ANIMATION.variants.container}
              initial="initial"
              animate="animate"
              exit="exit"
              data-hero-content="container"
            >
              {/* Main headline */}
              <motion.div
                variants={HERO_ANIMATION.variants.title}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-8"
                data-hero-content="title"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white text-center lg:text-left">
                  <motion.div className="overflow-hidden inline-block w-full">
                    <motion.span
                      className="inline-block"
                      variants={HERO_ANIMATION.variants.titleWithReveal}
                    >
                      Your trusted partner in
                    </motion.span>
                  </motion.div>
                  <motion.div className="overflow-visible inline-block w-full">
                    <motion.span
                      className="inline-block text-blue-300"
                      variants={HERO_ANIMATION.variants.titleWithReveal}
                      transition={{ delay: 0.35 }}
                    >
                      reliable transaction
                    </motion.span>
                  </motion.div>
                  <motion.div className="overflow-visible inline-block w-full pb-2">
                    <motion.span
                      className="inline-block text-blue-300"
                      variants={HERO_ANIMATION.variants.titleWithReveal}
                      transition={{ delay: 0.5 }}
                    >
                      management
                    </motion.span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.div
                variants={HERO_ANIMATION.variants.subtitle}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-10"
                data-hero-content="subtitle"
              >
                <p className="text-xl md:text-2xl mb-6 md:mb-8 text-blue-100 font-light text-center lg:text-left">
                  Empowering realtors with expert coordination services so you can focus on what matters most—your clients.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mt-12 mb-12 justify-center lg:justify-start items-center"
                variants={HERO_ANIMATION.variants.cta}
                initial="initial"
                animate="animate"
                exit="exit"
                data-hero-content="cta"
              >
                <div className="flex flex-wrap items-center gap-4">
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
                    Get Started
                  </UnifiedButton>
                  <UnifiedButton
                    to="/about"
                    variant="glass"
                    size="lg"
                    radius="full"
                    withAnimation={true}
                    icon={
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    }
                    iconPosition="right"
                  >
                    Learn More
                  </UnifiedButton>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side Card Section */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            variants={HERO_ANIMATION.variants.card}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ContentCard
              heroStyle={true}
              className="glass-card-navy px-8 sm:px-12 py-10 card-inner-glow card-tilt"
              inHero={true}
              data-glass-card="true"
            >
              {/* Stats section */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-white/10 p-4 rounded-xl stat-info-box">
                  <p className="text-xl font-bold text-white">{stats[0].value}</p>
                  <p className="text-xs text-blue-200">{stats[0].label}</p>
                </div>
                <div className="text-center bg-white/10 p-4 rounded-xl stat-info-box">
                  <p className="text-xl font-bold text-white">{stats[1].value}</p>
                  <p className="text-xs text-blue-200">{stats[1].label}</p>
                </div>
              </div>

              {/* Testimonial content */}
              <div className="text-4xl text-blue-200 opacity-50 font-serif mb-3">"</div>
              <div className="min-h-[160px] mb-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg font-medium mb-4 text-white/90">
                      {testimonials[currentTestimonial].quote}
                    </p>
                    <p className="text-sm text-blue-200">
                      {testimonials[currentTestimonial].name}, {testimonials[currentTestimonial].role.split(',')[0]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Testimonial navigation dots */}
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
            </ContentCard>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-14 mb-8"
          variants={HERO_ANIMATION.variants.featureContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card-navy p-4 py-3.5 card-scale card-border-shine"
              data-glass-card="true"
              variants={HERO_ANIMATION.variants.feature}
              initial="hidden"
              animate="show"
              exit="exit"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{feature.title}</h3>
                <p className="text-blue-200 text-xs">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </GlobalPageHero>
  );
};

export default Hero;