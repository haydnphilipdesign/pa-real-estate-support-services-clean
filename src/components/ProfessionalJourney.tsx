import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Building, FileText, Users, Shield, Crown, Trophy } from 'lucide-react';

const journeySteps = [
  {
    year: '1987-1991',
    title: 'Graduated from McAdoo Regional High School',
    description: 'Foundation in business and administrative studies',
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600'
  },
  {
    year: '1991-1995',
    title: 'Closing Administrator at Specialty Abstract, Inc.',
    description: 'Managed real estate closings and title documentation',
    icon: FileText,
    color: 'from-green-500 to-green-600'
  },
  {
    year: '1995-2000',
    title: 'Office Manager at M&T Mortgage Co., Inc.',
    description: 'Oversaw mortgage processing and client relations',
    icon: Building,
    color: 'from-purple-500 to-purple-600'
  },
  {
    year: '2000-2005',
    title: 'Bookkeeper/Secretary at John F. Patton Attorney',
    description: 'Handled legal documentation and financial records',
    icon: Shield,
    color: 'from-amber-500 to-amber-600'
  },
  {
    year: '2005-2010',
    title: 'Office Manager at Pocono Builders Association',
    description: 'Coordinated operations and member services',
    icon: Users,
    color: 'from-red-500 to-red-600'
  },
  {
    year: '2010-2015',
    title: 'Closing Administrator at Fidelity Home Abstract, Inc.',
    description: 'Managed real estate transaction processing',
    icon: Briefcase,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    year: '2015-2020',
    title: 'Transaction Coordinator/Compliance Review Officer for Bob Hay, Broker for Keller Williams',
    description: 'Managed transaction coordination and compliance review for a high-volume real estate team.',
    icon: Trophy,
    color: 'from-teal-500 to-teal-600'
  },
  {
    year: '2020-Present',
    title: 'Owner/President, PA Real Estate Support Services',
    description: 'Providing comprehensive transaction coordination services',
    icon: Crown,
    color: 'from-rose-500 to-rose-600',
    featured: true
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

      <div className="hero-content relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Professional Journey</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Three decades of experience building expertise in real estate, administration, and client service excellence
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-transparent via-white/30 to-transparent hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-16">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`group relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-blue-500 z-10 hidden lg:block" />
                  
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105 ${
                      step.featured 
                        ? 'bg-gradient-to-br from-white via-white to-amber-50/50 border-2 border-amber-200' 
                        : 'bg-white/95 backdrop-blur-sm border border-white/20'
                    }`}>
                      {/* Gradient overlay for featured */}
                      {step.featured && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-rose-500/5 pointer-events-none" />
                      )}
                      
                      <div className="p-8 relative">
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Year Badge */}
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                          step.featured 
                            ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {step.year}
                        </div>
                        
                        {/* Title */}
                        <h3 className={`text-xl lg:text-2xl font-bold mb-4 leading-tight ${
                          step.featured ? 'text-transparent bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text' : 'text-neutral-900'
                        }`}>
                          {step.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-neutral-600 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {step.featured && (
                          <div className="mt-4 text-sm font-semibold text-amber-600 flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Current Position
                          </div>
                        )}
                      </div>
                      
                      {/* Subtle accent line */}
                      <div className={`h-1 bg-gradient-to-r ${step.color} opacity-80`} />
                    </div>
                  </div>
                  
                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney; 