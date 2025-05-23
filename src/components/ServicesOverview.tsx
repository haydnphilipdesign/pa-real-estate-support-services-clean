import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import { ArrowRight, FileSearch, Database, Clock, CheckSquare } from 'lucide-react';
import ContentCard from './ContentCard';
import '../index.css';

const services = [
  {
    icon: FileSearch,
    title: "Transaction\u00A0Coordination",
    description: "Expert transaction management from contract to closing. Focus on growing your business while we handle all administrative details.",
    style: "glass-navy" as const
  },
  {
    icon: Database,
    title: "Document Management",
    description: "Secure digital system for all your files. Documents are organized, accessible, and properly stored with instant retrieval when needed.",
    style: "glass-navy" as const
  },
  {
    icon: Clock,
    title: "Timeline Tracking",
    description: "Strategic oversight of all critical dates. Keep transactions on track with proactive monitoring and timely notifications to parties.",
    style: "glass-navy" as const
  },
  {
    icon: CheckSquare,
    title: "Compliance Review",
    description: "Comprehensive verification of all requirements. Ensure transactions meet industry standards and regulations to protect all parties.",
    style: "glass-navy" as const
  },
];

const ServicesOverview: React.FC = () => {
  const { Link } = useNavigation();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden services-section">
      {/* Enhanced background with rich blue gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.07)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.04] bg-[length:24px_24px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Elevate Your Real Estate Business
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Experience seamless transaction management that empowers you to grow your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="bg-blue-900/95 backdrop-blur-md rounded-xl p-7 pb-8 h-full border border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group min-h-[280px] flex flex-col card-tilt card-light-beam service-card">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#eac87d] opacity-100" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-white/30 card-float">
                    <service.icon className="w-8 h-8 text-white" style={{ color: 'white', visibility: 'visible' }} />
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight service-card-title">
                    <span className="block text-[#eac87d] font-bold" style={{ display: 'block', visibility: 'visible', whiteSpace: 'nowrap' }}>
                      {service.title}
                    </span>
                  </h3>

                  <p className="text-white/90 leading-relaxed service-description text-sm font-medium flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(to right, #eac87d, #eac87d)',
              borderRadius: '9999px',
              padding: '8px 20px',
              color: 'white',
              fontWeight: '600',
              transition: 'all 0.3s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              width: 'auto',
              textDecoration: 'none',
              borderBottom: '2px solid rgba(255, 255, 255, 0.8)'
            }}
            className="group hover:shadow-lg hover:translate-y-[-2px]"
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              View All Services
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 right-0 h-40 w-40 bg-[#eac87d]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 h-48 w-48 bg-blue-400/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default ServicesOverview;