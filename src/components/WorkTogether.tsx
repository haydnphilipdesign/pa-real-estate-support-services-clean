import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Database, MessageCircle, Clock } from 'lucide-react';
import { ensureCssImported } from './FixedCssImport';

// Ensure CSS is properly imported
ensureCssImported();

const steps = [
  {
    icon: FileSearch,
    title: 'Initial Consultation',
    description: 'I review your needs and processes to create a tailored solution for your business.'
  },
  {
    icon: Database,
    title: 'Setup & Integration',
    description: 'I establish efficient systems and workflows customized to your specific requirements.'
  },
  {
    icon: MessageCircle,
    title: 'Ongoing Support',
    description: 'I provide regular communication and updates to ensure smooth transaction management.'
  },
  {
    icon: Clock,
    title: 'Timely Execution',
    description: 'I maintain consistent monitoring and follow-up to keep transactions on schedule.'
  }
];

const WorkTogether: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto process-steps-section">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            className="glass-card-navy relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/50 to-blue-500/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-white" style={{ color: 'white', visibility: 'visible', fill: 'currentColor', stroke: 'currentColor', opacity: 1 }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 h-7 flex items-center justify-center">
                {step.title}
              </h3>
              <p className="text-blue-100 h-20 flex items-center">
                {step.description}
              </p>

              {/* Numbered indicator */}
              <div
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center process-step-number"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', visibility: 'visible' }}
              >
                <span
                  className="text-xs font-semibold text-white"
                  style={{ color: 'white', visibility: 'visible' }}
                >
                  {index + 1}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WorkTogether;