import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Phone,
  Users,
  CheckSquare,
  Shield,
  Clock,
  FileSearch,
  MessageCircle,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'service-1',
    icon: FileText,
    title: 'Document Management',
    description: 'Comprehensive handling of all transaction paperwork including contract review, addendums, disclosures, and closing documents. I ensure all documentation is complete, accurate, and submitted on time.',
    features: [
      'Contract review and organization',
      'Digital document management',
      'Deadline tracking',
      'Electronic signature coordination'
    ]
  },
  {
    id: 'service-2',
    icon: Calendar,
    title: 'Timeline Management',
    description: 'Proactive management of your transaction timeline from contract to closing. I track all deadlines, coordinate inspections, and ensure smooth progress through each phase.',
    features: [
      'Inspection scheduling',
      'Deadline monitoring',
      'Milestone tracking',
      'Closing coordination'
    ]
  },
  {
    id: 'service-3',
    icon: Phone,
    title: 'Communication Coordination',
    description: 'Seamless coordination between all parties including agents, buyers, sellers, title companies, lenders, and other vendors. I keep everyone informed and aligned throughout the process.',
    features: [
      'Regular status updates',
      'Vendor coordination',
      'Issue resolution',
      'Clear communication channels'
    ]
  },
  {
    id: 'service-4',
    icon: Users,
    title: 'Client Support',
    description: 'Dedicated assistance for agents and their clients throughout the entire transaction process. I handle inquiries, provide updates, and ensure a smooth experience for all parties.',
    features: [
      'Agent support',
      'Client assistance',
      'Query resolution',
      'Process guidance'
    ]
  },
  {
    id: 'service-5',
    icon: CheckSquare,
    title: 'Compliance Management',
    description: 'Ensure all transactions comply with state regulations and brokerage requirements. I maintain detailed checklists and verify all necessary documentation is properly executed.',
    features: [
      'Regulatory compliance',
      'Documentation verification',
      'Checklist management',
      'Audit preparation'
    ]
  },
  {
    id: 'service-6',
    icon: Shield,
    title: 'Risk Mitigation',
    description: 'Proactive identification and resolution of potential issues before they become problems. I help protect your interests throughout the transaction process.',
    features: [
      'Issue identification',
      'Problem resolution',
      'Risk assessment',
      'Preventive measures'
    ]
  }
];

const process = [
  {
    id: 'process-1',
    icon: FileSearch,
    title: 'Gather Info',
    description: 'Collect contracts, documents, and transaction details to build your complete file.'
  },
  {
    id: 'process-2',
    icon: Database,
    title: 'Build Your File',
    description: 'Create digital organization with timelines, checklists, and milestone tracking.'
  },
  {
    id: 'process-3',
    icon: MessageCircle,
    title: 'Manage Milestones',
    description: 'Coordinate communications, schedule inspections, and track deadlines.'
  },
  {
    id: 'process-4',
    icon: Clock,
    title: 'Finalize & Deliver',
    description: 'Ensure compliance requirements are met and coordinate seamless closing.'
  }
];

const Services: React.FC = () => {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="section hero-section">
        <div className="hero-content">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transaction Coordination Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Professional transaction coordination services designed to streamline your real estate deals from contract to closing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section bg-neutral-25">
        <div className="page-container">
          <div className="section-header">
            <h2 className="heading-2">Complete Transaction Support</h2>
            <p className="text-lead">Everything you need to manage real estate transactions efficiently</p>
          </div>
          <div className="features-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="feature-card card card-elevated"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="feature-icon">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="heading-3">{service.title}</h3>
                <p className="text-body mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={`${service.id}-feature-${featureIndex}`} className="flex items-start text-neutral-700">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="flex-1 text-left text-small">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="page-container">
          <div className="section-header">
            <h2 className="heading-2">My Process</h2>
            <p className="text-lead">A systematic approach to transaction coordination</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="process-grid">
              {process.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="process-step"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="feature-icon mx-auto mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="heading-4">{step.title}</h3>
                  <p className="text-body">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="text-3xl sm:text-2xl lg:text-4xl font-bold leading-tight mb-6 text-white">Ready to Streamline Your Transactions?</h2>
          <p className="text-lead text-white/90 mb-8">
            Let me handle the details while you focus on growing your business.
          </p>
          <Link
            to="/work-with-me"
            className="btn btn-hero btn-xl"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
