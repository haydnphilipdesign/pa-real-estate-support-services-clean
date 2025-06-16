import { TRANSITION_DURATION } from '../components/PageTransition';

// Standardized animation constants
export const HERO_ANIMATION = {
  // Base durations (consistent with PageTransition)
  duration: {
    ...TRANSITION_DURATION,
    content: {
      enter: 0.6,
      exit: 0.4
    },
    title: {
      enter: 0.7,
      exit: 0.5 
    },
    subtitle: {
      enter: 0.6,
      exit: 0.4
    },
    cta: {
      enter: 0.5,
      exit: 0.3
    },
    card: {
      enter: 0.7,
      exit: 0.5
    },
    feature: {
      enter: 0.6,
      exit: 0.4
    }
  },
  
  // Standardized delays
  delay: {
    base: 0.05,
    title: 0.1,
    subtitle: 0.3,
    description: 0.5,
    cta: 0.7,
    card: 0.4,
    features: 0.6
  },
  
  // Standard easing curves
  ease: {
    standard: [0.2, 0.0, 0.2, 1.0], // Default ease curve
    text: [0.22, 0.03, 0.36, 1.0],  // Slightly smoother for text
    card: [0.25, 0.1, 0.25, 1.0],   // Better for larger elements like cards
    feature: [0.4, 0.0, 0.2, 1.0]   // More pronounced for feature elements
  },
  
  // Standard variants for common hero elements
  variants: {
    container: {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: TRANSITION_DURATION.standard.enter,
          ease: [0.2, 0.0, 0.2, 1.0],
          delay: 0.1
        }
      },
      exit: { 
        opacity: 0, 
        y: -10,
        transition: {
          duration: TRANSITION_DURATION.standard.exit,
          ease: [0.2, 0.0, 0.2, 1.0],
          delay: 0
        }
      }
    },
    title: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0.1
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.5,
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0
        }
      }
    },
    titleWithReveal: {
      initial: { y: 60, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: [0.22, 0.03, 0.26, 1.0],
          delay: 0.2
        }
      },
      exit: {
        y: -40,
        opacity: 0,
        transition: {
          duration: 0.8, 
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0
        }
      }
    },
    subtitle: {
      initial: { opacity: 0, y: 30 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0.3
        }
      },
      exit: {
        opacity: 0,
        y: -15,
        transition: {
          duration: 0.5,
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0.1
        }
      }
    },
    cta: {
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0.5
        }
      },
      exit: {
        opacity: 0,
        y: -10,
        transition: {
          duration: 0.4,
          ease: [0.22, 0.03, 0.36, 1.0],
          delay: 0.1
        }
      }
    },
    card: {
      initial: { opacity: 0, x: 50, scale: 0.95 },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.9,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: 0.4
        }
      },
      exit: {
        opacity: 0,
        x: 30,
        scale: 0.98,
        transition: {
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1.0],
          delay: 0.1
        }
      }
    },
    feature: {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      },
      exit: {
        opacity: 0,
        y: -15,
        scale: 0.97,
        transition: {
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1.0]
        }
      }
    },
    featureContainer: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: 0.6,
          staggerChildren: 0.15,
          delayChildren: 0.7
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1.0],
          delay: 0.1,
          staggerChildren: 0.08,
          staggerDirection: -1
        }
      }
    },
    transaction: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.22, 0.03, 0.36, 1.0],
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: [0.22, 0.03, 0.36, 1.0],
        }
      }
    }
  }
};

// Helper function to get staggered animation settings
export const getStaggeredAnimation = (index: number, isExit = false) => {
  const baseDelay = isExit ? 0 : 0.1;
  const staggerDelay = isExit ? 0.05 : 0.1;
  
  return {
    delay: baseDelay + (index * staggerDelay),
    duration: isExit ? 0.4 : 0.6
  };
};

export default HERO_ANIMATION;