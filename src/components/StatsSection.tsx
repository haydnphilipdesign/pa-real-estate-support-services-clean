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
    number: '10,000+',
    label: 'Agent Hours Saved',
    description: 'Hours saved for busy real estate professionals'
  },
  {
    number: '$500M+',
    label: 'Transaction Volume',
    description: 'Total transaction volume coordinated'
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proven Excellence in Numbers
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A track record of success built on dedication, expertise, and unwavering commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;