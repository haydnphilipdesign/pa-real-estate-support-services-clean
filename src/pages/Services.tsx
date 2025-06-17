import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { Button } from '@/components/ui';
import { ArrowRight, FileText, Shield, Clock, Users } from 'lucide-react';

const Services: React.FC = () => {
  const sideContent = (
    <div>
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 mr-2 text-blue-400" />
        <h3 className="text-white font-semibold">Services Highlights</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-start">
          <FileText className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Complete contract-to-close coordination
          </p>
        </div>
        <div className="flex items-start">
          <Shield className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Compliance review and documentation management
          </p>
        </div>
        <div className="flex items-start">
          <Clock className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Timeline management and deadline tracking
          </p>
        </div>
        <div className="flex items-start">
          <Users className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Client communication and progress updates
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Hero
        title="Real Estate Support Services"
        subtitle="Comprehensive real estate transaction support to help your business thrive"
        sideContent={sideContent}
      >
        <Button
          to="/work-with-me"
          variant="secondary"
          size="lg"
          className="bg-white text-blue-900 hover:bg-white/90"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
        >
          Start Working Together
        </Button>
      </Hero>
      <Services />
    </div>
  );
};

export default Services;