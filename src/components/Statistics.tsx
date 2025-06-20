import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Define stats with new structure
const stats = [
  {
    id: 1,
    value: '30+',
    label: 'Years of Excellence',
    description: 'Decades of dedicated service in real estate',
  },
  {
    id: 2,
    value: '2,000+',
    label: 'Successful Transactions',
    description: 'Expert coordination from contract to closing',
  },
  {
    id: 3,
    value: '10,000+',
    label: 'Agent Hours Saved',
    description: 'Helping agents focus on their business growth',
  },
  {
    id: 4,
    value: '$500M+',
    label: 'Transaction Volume',
    description: 'Trusted with significant real estate portfolios',
  },
];

// Counter animation hook
const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef<number>(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        countRef.current = Math.floor(progress * end);
        setCount(countRef.current);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
      controls.start("visible");

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, end, duration, controls]);

  return { count, nodeRef, controls };
};

// Counter component with animation
const AnimatedCounter: React.FC<{
  value: string;
  duration?: number;
}> = ({ value, duration = 2 }) => {
  // Handle formatted numbers with '+', 'M', or currency symbols
  let numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const prefix = value.match(/^\D+/) ? value.match(/^\D+/)?.[0] : '';

  // Extract all special characters after numbers for the suffix
  const hasPlus = value.includes('+');
  const hasM = value.includes('M');
  let suffix = '';

  if (hasM) suffix += 'M';
  if (hasPlus) suffix += '+';

  const { count, nodeRef, controls } = useCounter(numericValue, duration);

  return (
    <motion.div
      ref={nodeRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
      className="text-brand-gold font-bold text-5xl md:text-6xl tracking-tight"
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
};

const Statistics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 md:py-28 relative overflow-hidden max-w-full statistics-section" id="statistics">
      {/* Enhanced background with brand colors */}
      <div className="absolute inset-0 bg-neutral-900">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-medium uppercase tracking-wider">
              Results That Speak For Themselves
            </div>
          </motion.div>

          <h2 className="text-h1 font-bold text-brand-gold mb-6 tracking-tight">
            Proven Excellence in Numbers
          </h2>

          <motion.p
            className="text-body-xl text-white max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A track record of success built on dedication, expertise, and unwavering commitment to excellence
          </motion.p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="h-full"
            >
              <div className="glass-card glass-card-navy border-t-4 border-t-brand-gold h-full hover:lift relative overflow-hidden group">
                {/* Content */}
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Number with animation */}
                  <AnimatedCounter value={stat.value} duration={2.5} />

                  <h3 className="text-brand-gold font-semibold text-h3 whitespace-nowrap">
                    {stat.label}
                  </h3>

                  <p className="text-white text-body h-12 flex items-center justify-center">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;