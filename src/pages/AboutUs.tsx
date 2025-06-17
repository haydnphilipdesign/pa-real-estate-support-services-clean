import React from 'react';
import Hero from '../components/Hero';
import { Button } from '@/components/ui';
import { ArrowRight, Star, CheckCircle, Users, Target } from 'lucide-react';
import Timeline from '../components/Timeline';
import ProfessionalJourney from '../components/ProfessionalJourney';
import AboutSection from '../components/AboutSection';

const AboutUs: React.FC = () => {
  const sideContent = (
    <div>
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 mr-2 text-yellow-400" />
        <h3 className="text-white font-semibold">About Debbie O'Brien</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            30+ years of experience in real estate
          </p>
        </div>
        <div className="flex items-start">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Over 2,000 successful transactions
          </p>
        </div>
        <div className="flex items-start">
          <Users className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Trusted partner for agents across the Poconos
          </p>
        </div>
        <div className="flex items-start">
          <Target className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Dedicated to helping you focus on growing your business
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Hero
        title="Meet Your Transaction Expert"
        subtitle="Dedicated support for your real estate business"
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
          Get in Touch
        </Button>
      </Hero>

      <ProfessionalJourney />
    </div>
  );
};

export default AboutUs;