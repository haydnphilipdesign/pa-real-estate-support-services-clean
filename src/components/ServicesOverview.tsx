import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import { 
  ArrowRight, 
  FileText, 
  Calendar, 
  Phone, 
  Shield,
  Clock,
  DollarSign,
  CheckCircle2,
  Target
} from 'lucide-react';
import ContentCard from './ContentCard';

const professionalServices = [
  {
    icon: FileText,
    title: "Complete Transaction Coordination",
    description: "End-to-end management from contract to closing. I handle all paperwork, deadlines, and coordination so you can focus on your next sale.",
    benefit: "Save 10+ hours per deal",
    results: ["99.8% on-time closings", "Zero missed deadlines", "All parties informed"],
    style: "glass-navy" as const
  },
  {
    icon: Calendar,
    title: "Proactive Timeline Management", 
    description: "Strategic planning and monitoring of all critical dates. Stay ahead of inspections, appraisals, and closing requirements.",
    benefit: "21-day average closing",
    results: ["No last-minute surprises", "Smooth closings", "Happy clients"],
    style: "glass-navy" as const
  },
  {
    icon: Phone,
    title: "Professional Communication",
    description: "Regular updates to all parties including buyers, sellers, lenders, and title companies. Clear, timely communication every step.",
    benefit: "95% client satisfaction",
    results: ["Weekly status updates", "Quick issue resolution", "Professional image"],
    style: "glass-navy" as const
  },
  {
    icon: Shield,
    title: "Pennsylvania Compliance Expert",
    description: "Deep knowledge of PA real estate law and regulations. Ensure every transaction meets state requirements and protects all parties.",
    benefit: "100% compliant deals",
    results: ["No legal issues", "Protected transactions", "Peace of mind"],
    style: "glass-navy" as const
  }
];

const ServicesOverview: React.FC = () => {
  const { Link } = useNavigation();
  return (
    <section className="py-24 md:py-32 relative overflow-hidden services-section">
      {/* Professional background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue via-brand-blue/95 to-brand-blue">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Professional Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
            <Target className="w-4 h-4 text-brand-gold mr-2" />
            <span className="text-white/90 text-sm font-medium">Comprehensive Transaction Management</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            How I Help Real Estate Professionals
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Proven systems and processes that save you time, reduce stress, and increase your closing success rate
          </p>
        </motion.div>

        {/* Services Grid with Results Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {professionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="glass-card-navy p-8 h-full hover:lift group">
                {/* Header with Icon and Benefit */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-brand-gold/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 text-brand-gold" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <div className="inline-flex items-center bg-green-500/20 rounded-full px-3 py-1 mb-3">
                      <CheckCircle2 className="w-3 h-3 text-green-300 mr-1" />
                      <span className="text-green-300 text-sm font-medium">{service.benefit}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/90 leading-relaxed mb-6 text-base">
                  {service.description}
                </p>

                {/* Results List */}
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-sm mb-3">What You Get:</h4>
                  {service.results.map((result, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-white/80">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card-navy p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Simple Process, Proven Results
          </h3>
          <p className="text-white/90 mb-8 text-lg max-w-3xl mx-auto">
            From contract acceptance to closing day, I manage every detail so you can focus on what matters most—serving your clients and growing your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-brand-gold font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Contract Received</h4>
              <p className="text-white/80 text-sm">Send me your executed contract and I take over from there</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-brand-gold font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Full Coordination</h4>
              <p className="text-white/80 text-sm">I manage all deadlines, parties, and requirements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-brand-gold font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Smooth Closing</h4>
              <p className="text-white/80 text-sm">On-time closing with happy clients and commission in your pocket</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/services"
              className="btn btn-secondary btn-lg"
            >
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span className="font-medium">(570) 588-4637</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;