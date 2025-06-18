import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, DollarSign } from 'lucide-react';

const statsData = [
  {
    number: '30+',
    label: 'Years of Excellence',
    description: 'Decades of experience in real estate coordination',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '2,000+',
    label: 'Successful Transactions',
    description: 'Successfully coordinated transactions',
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    number: '100%',
    label: 'Client Satisfaction',
    description: 'Commitment to excellence in every transaction',
    icon: CheckCircle,
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '$500M+',
    label: 'Transaction Volume',
    description: 'Total transaction volume coordinated',
    icon: DollarSign,
    color: 'from-amber-500 to-amber-600'
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="section hero-section relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.15)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(139,92,246,0.15)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="hero-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
            Proven Excellence in Numbers
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            A track record of success built on dedication, expertise, and unwavering commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="w-full group"
              >
                <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Number */}
                  <h3 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {stat.number}
                  </h3>
                  
                  {/* Label */}
                  <div className="text-lg lg:text-xl font-semibold text-neutral-700 mb-3">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <p className="text-neutral-600 leading-relaxed">
                    {stat.description}
                  </p>
                  
                  {/* Subtle hover accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-full transform translate-x-8 -translate-y-8 transition-opacity duration-300`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;