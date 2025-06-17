import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import { 
  ArrowRight, 
  Award, 
  MapPin, 
  Users, 
  TrendingUp,
  Star,
  Building
} from 'lucide-react';

// Professional credentials and expertise data
const credentials = [
  {
    icon: Award,
    title: "30+ Years Experience",
    description: "Three decades of real estate transaction expertise",
    highlight: "Since 1993"
  },
  {
    icon: MapPin,
    title: "Pocono Mountains Expert",
    description: "Deep local market knowledge and connections",
    highlight: "Local Specialist"
  },
  {
    icon: Users,
    title: "200+ Agent Partners",
    description: "Trusted by top Keller Williams professionals",
    highlight: "Proven Track Record"
  },
  {
    icon: TrendingUp,
    title: "$500M+ Coordinated",
    description: "Successfully managed half a billion in transactions",
    highlight: "High Volume"
  }
];

const AboutSection: React.FC = () => {
  const { Link } = useNavigation();
  return (
    <section className="section bg-neutral-25">
      <div className="page-container">
        {/* Professional Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-2 mb-6 border border-primary-200">
            <Building className="w-4 h-4 text-primary-600 mr-2" />
            <span className="text-primary-600 text-sm font-medium">Professional Transaction Coordinator</span>
          </div>
          
          <h2 className="heading-2">
            Complex Real Estate Transactions—Handled Seamlessly
          </h2>
          <p className="text-lead">
            Three decades of expertise serving Pocono Mountains realtors
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Professional Image with Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="card card-elevated overflow-hidden">
              <img
                src="/optimized/desk.jpg"
                alt="Professional real estate workspace"
                className="w-full object-cover h-[400px]"
              />
              
              {/* Professional Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="card-glass p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-warning-500" />
                    <span className="font-semibold text-neutral-900">Industry Leader</span>
                    <Star className="w-4 h-4 text-warning-500" />
                  </div>
                  <p className="text-sm text-neutral-600">Serving Pocono Mountains Realtors Since 1993</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expertise Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main Story */}
            <div className="space-y-6">
              <div className="space-y-6">
              <h3 className="heading-3 mb-4">What I Solve For You:</h3>
              <ul className="space-y-3 text-body">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Paperwork chaos and missed deadlines</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Time lost on coordination instead of client relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Compliance risks and documentation errors</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <span>Stress from managing multiple moving parts</span>
                </li>
              </ul>
            </div>
            </div>

            {/* Professional Credentials Grid */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="card card-elevated text-center feature-card"
                >
                  <div className="feature-icon mx-auto mb-3">
                    <credential.icon className="w-6 h-6" />
                  </div>
                  <div className="heading-4 mb-2">
                    {credential.title}
                  </div>
                  <div className="text-small mb-3">
                    {credential.description}
                  </div>
                  <div className="inline-flex items-center bg-primary-50 rounded-full px-3 py-1">
                    <span className="text-primary-600 text-xs font-semibold">{credential.highlight}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="btn btn-primary btn-lg"
                >
                  Learn More About My Experience
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/work-with-me"
                  className="btn btn-secondary btn-lg"
                >
                  Start Working Together
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;