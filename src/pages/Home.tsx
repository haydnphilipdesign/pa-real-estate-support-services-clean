import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero
        variant="home"
        title="Your trusted partner in reliable transaction management"
        subtitle="Empowering realtors with expert coordination services so you can focus on what matters most—your clients."
      />
      <AboutSection />
      <Services />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default Home;