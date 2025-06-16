import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import { 
  ArrowRight, 
  Award, 
  MapPin, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Building
} from 'lucide-react';
import ContentSection from './ContentSection';

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
    <ContentSection dark={false} className="py-24 overflow-x-hidden max-w-full relative !bg-white">
      {/* Professional background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(30,64,175,0.03)_100%)]" />
        <div className="absolute inset-0 bg-grid-brand-blue/[0.015] bg-[length:32px_32px]" />
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
          <div className="inline-flex items-center bg-brand-blue/10 rounded-full px-6 py-2 mb-6 border border-brand-blue/20">
            <Building className="w-4 h-4 text-brand-blue mr-2" />
            <span className="text-brand-blue text-sm font-medium">Professional Transaction Coordinator</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Your Success Is My Mission
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Dedicated to helping real estate professionals achieve more by handling the details that matter most
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Professional Image with Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-brand-blue/20 to-brand-gold/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-50" />
              <div className="relative">
                <img
                  src="/optimized/desk.jpg"
                  alt="Professional real estate workspace"
                  className="relative rounded-xl shadow-2xl w-full object-cover h-[400px] transform group-hover:scale-[1.02] transition-transform duration-300"
                />
                
                {/* Professional Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card-light p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-neutral-900">Industry Leader</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-neutral-600">Serving Pocono Mountains Realtors Since 1993</p>
                  </div>
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
              <h3 className="text-2xl font-bold text-neutral-900">
                Three Decades of Transaction Excellence
              </h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Since 1993, I've been the trusted transaction coordinator for hundreds of real estate professionals throughout the Pocono Mountains. My deep understanding of Pennsylvania real estate law, combined with meticulous attention to detail, ensures your transactions close on time, every time.
                </p>
                <p>
                  I've built my reputation on one simple principle: your success is my success. By handling every aspect of transaction coordination—from contract to closing—I free you to focus on what you do best: building relationships and growing your business.
                </p>
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
                  className="glass-card-light p-4 text-center hover:lift"
                >
                  <credential.icon className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <div className="text-lg font-bold text-neutral-900 mb-1">
                    {credential.title}
                  </div>
                  <div className="text-xs text-neutral-600 mb-2">
                    {credential.description}
                  </div>
                  <div className="inline-flex items-center bg-brand-gold/20 rounded-full px-2 py-1">
                    <span className="text-brand-blue text-xs font-semibold">{credential.highlight}</span>
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

        {/* Professional Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card-light p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">
            Why Real Estate Professionals Choose Me
          </h3>
          <p className="text-neutral-600 mb-8 text-lg max-w-3xl mx-auto">
            Proven expertise, reliable processes, and a commitment to your success that you can count on
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">99.8% On-Time Closings</h4>
              <p className="text-neutral-600">Consistent, reliable results you can depend on</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">21-Day Average</h4>
              <p className="text-neutral-600">Faster closings mean quicker commissions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2">5-Star Reviews</h4>
              <p className="text-neutral-600">Consistently rated excellent by agents</p>
            </div>
          </div>
        </motion.div>
      </div>
    </ContentSection>
  );
};

export default AboutSection;