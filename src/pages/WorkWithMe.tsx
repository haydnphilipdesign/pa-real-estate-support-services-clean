import React from 'react';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import { Button } from '@/components/ui';
import { ArrowRight, Phone, Mail, Calendar } from 'lucide-react';

const WorkWithMe: React.FC = () => {
  const sideContent = (
    <div>
      <div className="flex items-center mb-4">
        <Mail className="w-5 h-5 mr-2 text-blue-400" />
        <h3 className="text-white font-semibold">Get In Touch</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <Phone className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            (570) 588-4637
          </p>
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            debbie@parealestatesupport.com
          </p>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
          <p className="text-white/90 text-sm">
            Available Mon-Fri, 9:00 AM - 5:00 PM
          </p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 mt-4">
          <p className="text-white/90 text-sm italic">
            "Let's work together to streamline your transactions and help your business thrive."
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Hero
        title="Work With Me"
        subtitle="Let's streamline your real estate transactions together"
        sideContent={sideContent}
      >
        <Button
          to="/agent-portal"
          variant="secondary"
          size="lg"
          className="bg-white text-blue-900 hover:bg-white/90"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
        >
          Start a Transaction
        </Button>
      </Hero>
      <Contact />
      <FAQ />
    </div>
  );
};

export default WorkWithMe;