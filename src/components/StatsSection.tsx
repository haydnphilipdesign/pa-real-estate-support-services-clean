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
    number: '10,000+',
    label: 'Agent Hours Saved',
    description: 'Hours saved for agents through efficient coordination',
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
      
      <div className="w-full relative z-10 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
              Proven Excellence in Numbers
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
              A track record of success built on dedication, expertise, and unwavering commitment to excellence
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-none px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 md:gap-x-4 md:gap-y-6 2xl:gap-12 justify-items-center max-w-[1600px] mx-auto">
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group w-full max-w-[360px]"
                >
                  <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 lg:p-12 rounded-3xl shadow-xl hover:shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-500 relative overflow-hidden w-full h-[300px] md:h-[320px] flex flex-col justify-center items-center text-center">
                    {/* Icon with gradient background */}
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Number */}
                    <h3 className="text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {stat.number}
                    </h3>
                    
                    {/* Label */}
                    <div className="text-xl lg:text-2xl font-semibold text-neutral-700 mb-4">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed text-base lg:text-lg">
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
      </div>
    </section>
  );
};

export default StatsSection;