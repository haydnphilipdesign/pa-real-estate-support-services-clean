import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Database, MessageCircle, Clock } from 'lucide-react';
import { ensureCssImported } from './FixedCssImport';

// Ensure CSS is properly imported
ensureCssImported();

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  steps?: ProcessStep[];
  className?: string;
  bgColor?: string;
}

/**
 * ProcessSteps - A component that displays a process flow with numbered steps
 * Matches the exact styling from the "How We'll Work Together" section
 */
const ProcessSteps: React.FC<ProcessStepsProps> = ({
  title = "How We'll Work Together",
  subtitle = "I offer comprehensive transaction coordination services tailored to your specific needs",
  steps,
  className = "",
  bgColor = "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900",
}) => {
  // Default steps if none provided
  const defaultSteps: ProcessStep[] = [
    {
      icon: FileSearch,
      title: 'Initial Consultation',
      description: 'We begin with a thorough review of your needs and current processes to create a tailored solution.'
    },
    {
      icon: Database,
      title: 'Setup & Integration',
      description: 'I establish efficient systems and workflows customized to your business requirements.'
    },
    {
      icon: MessageCircle,
      title: 'Ongoing Support',
      description: 'Regular communication and updates ensure smooth transaction management and coordination.'
    },
    {
      icon: Clock,
      title: 'Timely Execution',
      description: 'Consistent monitoring and follow-up to keep all transactions on track and on schedule.'
    }
  ];

  const processSteps = steps || defaultSteps;

  return (
    <section className={`relative overflow-hidden ${bgColor} ${className}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(59,130,246,0.1)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 py-24 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
                    <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white/80"
            style={{
              color: 'rgba(255, 255, 255, 0.8)!important',
              textShadow: 'none',
              filter: 'none!important'
            }}
          >
            {title}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Use exact blue color and styling from screenshot */}
                                                <div
                  className="bg-blue-700 border border-blue-600 rounded-xl h-full shadow-md relative"
                  style={{
                    borderWidth: '1px',
                    minHeight: '280px',
                    backgroundColor: 'rgb(29, 78, 216)',
                    visibility: 'visible',
                    opacity: 1,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Numbered indicator */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">{index + 1}</span>
                  </div>

                  <div className="flex flex-col items-center text-center h-full p-6">
                    {/* Icon container with circular background */}
                    <div className="w-16 h-16 bg-blue-600/90 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mt-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    {/* Description with appropriate spacing */}
                    <p className="text-white/90 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
