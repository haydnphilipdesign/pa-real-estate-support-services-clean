import React from 'react';
import { motion } from 'framer-motion';

const statsData = [
  {
    number: '30+',
    label: 'Years of Excellence',
    description: 'Decades of experience in real estate coordination'
  },
  {
    number: '2,000+',
    label: 'Successful Transactions',
    description: 'Successfully coordinated transactions'
  },
  {
    number: '100%',
    label: 'Client Satisfaction',
    description: 'Commitment to excellence in every transaction'
  },
  {
    number: '$500M+',
    label: 'Transaction Volume',
    description: 'Total transaction volume coordinated'
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="section hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="text-3xl sm:text-2xl lg:text-4xl font-bold leading-tight mb-6 text-white">
            Proven Excellence in Numbers
          </h2>
          <p className="text-lead text-white/90">
            A track record of success built on dedication, expertise, and unwavering commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full"
            >
              <div className="bg-neutral-50 p-6 md:p-8 rounded-2xl shadow-lg hover:transform hover:scale-105 transition-all duration-300 h-full">
                <h3 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-3">
                  {stat.number}
                </h3>
                <div className="text-lg md:text-xl font-semibold text-gray-700 mb-3">
                  {stat.label}
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;