import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Building, FileText, Users, Shield, Crown, Trophy, CheckCircle } from 'lucide-react';

const journeySteps = [
  {
    year: '1984',
    title: 'Graduated from Kittatinny Regional HS',
    description: 'Built a strong academic and practical foundation for future endeavors.',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600'
  },
  {
    year: '1985–1989',
    title: 'Closing Administrator, Associates Abstract, Inc.',
    description: 'Developed streamlined processes for efficient transaction handling.',
    icon: FileText,
    color: 'from-green-500 to-green-600'
  },
  {
    year: '1989–1991',
    title: 'Office Manager, MAC Mortgage Co., Inc.',
    description: 'Implemented systems to improve organizational efficiency.',
    icon: Building,
    color: 'from-purple-500 to-purple-600'
  },
  {
    year: '1998–2000',
    title: 'Bookkeeper/Secretary, John C. Ernst Company',
    description: 'Ensured accuracy in bookkeeping and administrative processes.',
    icon: Shield,
    color: 'from-amber-500 to-amber-600'
  },
  {
    year: '2000–2005',
    title: 'Executive Assistant and VP, Homes of Distinction, Inc.',
    description: 'Enhanced operations and strengthened industry partnerships.',
    icon: Users,
    color: 'from-red-500 to-red-600'
  },
  {
    year: '2005',
    title: 'PA Real Estate License, Pocono Real Estate Academy',
    description: 'Developed expertise in market analysis and client relations.',
    icon: Trophy,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    year: '2005–2006',
    title: 'Closing Administrator, Fidelity Home Abstract, Inc.',
    description: 'Coordinated transactions in alignment with legal standards.',
    icon: Briefcase,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    year: '2006–2013',
    title: 'Transaction Coordinator/Compliance Review Officer',
    description: 'Developed systems to improve transaction oversight and compliance for Bob Hay, Broker for Keller Williams.',
    icon: CheckCircle,
    color: 'from-teal-500 to-teal-600'
  },
  {
    year: '2013–Present',
    title: 'Owner/President, PA Real Estate Support Services',
    description: 'Independent transaction coordinator providing comprehensive support services.',
    icon: Crown,
    color: 'from-rose-500 to-rose-600'
  }
];

const ProfessionalJourney: React.FC = () => {
  return (
    <section className="section hero-section relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(139,92,246,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Professional Journey</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Three decades of experience building expertise in real estate, administration, and client service excellence
          </p>
        </motion.div>

        {/* Enhanced Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {journeySteps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative"
              >
                {/* Main Card Container */}
                <div className={`relative overflow-hidden rounded-3xl transition-all duration-700 group-hover:scale-[1.02] h-full ${
                  step.featured 
                    ? 'bg-gradient-to-br from-white via-white to-amber-50/30 border-2 border-amber-300/50 shadow-2xl shadow-amber-500/20' 
                    : 'bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10'
                }`}>
                  
                  {/* Sophisticated Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-60" />
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${step.color} opacity-[0.03] rounded-full blur-2xl transform translate-x-8 -translate-y-8`} />
                  
                  {/* Featured Glow Effect */}
                  {step.featured && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-rose-500/5 to-orange-500/5" />
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-orange-400/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </>
                  )}
                  
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Compact Header with Icon and Year */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Icon */}
                      <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0`}>
                        <div className="absolute inset-0 bg-white/20 rounded-xl" />
                        <IconComponent className="w-6 h-6 text-white relative z-10" />
                      </div>
                      
                      {/* Year Badge */}
                      <div className="flex-1">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 group-hover:scale-105 ${
                          step.featured 
                            ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 text-white shadow-amber-500/30'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-500/30'
                        }`}>
                          {step.year}
                        </div>
                        {step.featured && (
                          <div className="flex items-center gap-1 text-amber-600 mt-1">
                            <Trophy className="w-3 h-3" />
                            <span className="text-xs font-semibold">Current</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="flex-1">
                      <h3 className={`text-lg lg:text-xl font-bold mb-3 leading-tight transition-all duration-300 ${
                        step.featured 
                          ? 'text-transparent bg-gradient-to-r from-amber-700 via-rose-700 to-orange-700 bg-clip-text' 
                          : 'text-neutral-900 group-hover:text-neutral-800'
                      }`}>
                        {step.title}
                      </h3>
                      
                      <p className="text-neutral-600 leading-relaxed text-sm group-hover:text-neutral-700 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Bottom Accent */}
                    <div className="mt-4 pt-3 border-t border-neutral-100">
                      <div className={`w-full h-0.5 bg-gradient-to-r ${step.color} rounded-full transition-all duration-500 ${
                        step.featured ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Hover Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
                
                {/* External Glow for Featured Card */}
                {step.featured && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 via-rose-400/10 to-orange-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney; 