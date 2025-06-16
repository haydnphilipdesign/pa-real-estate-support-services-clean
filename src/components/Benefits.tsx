import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Streamline Your Workflow',
  'Reduce Transaction Errors',
  'Increase Client Satisfaction',
  'Save Time and Resources',
  'Ensure Compliance',
  'Focus on Growing Your Business',
];

const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 text-center text-neutral-900 font-bold mb-4">Benefits of Transaction Coordination</h2>
        <p className="text-body-lg text-center text-neutral-600 mb-12 max-w-3xl mx-auto">
          Discover how our expert transaction coordination services can transform your real estate business
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="glass-card glass-card-light flex items-center hover:lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CheckCircle className="text-brand-blue mr-4 flex-shrink-0 w-6 h-6" />
              <span className="text-body-lg font-semibold text-neutral-900">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;