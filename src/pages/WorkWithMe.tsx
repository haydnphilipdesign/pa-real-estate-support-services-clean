import React, { useRef, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Link } from '../components/GlobalLinkProvider';
import { ArrowRight, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';
import { UnifiedButton } from '../components/ui/unified-button';
import PageHeroWrapper from '../components/PageHeroWrapper';
import FAQ from '../components/FAQ';
import WorkTogether from '../components/WorkTogether';
import emailjs from '@emailjs/browser';
import useScrollToTop from '../hooks/useScrollToTop';
import PreloadedAnimationWrapper from '../components/PreloadedAnimationWrapper';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    description: "Let's discuss your needs directly",
    action: 'Call (570) 588-4637',
    link: 'tel:+5705884637'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Send me your questions',
    action: 'debbie@parealestatesupport.com',
    link: 'mailto:debbie@parealestatesupport.com'
  },
  {
    icon: Calendar,
    title: 'Schedule',
    description: 'Book a consultation',
    action: 'Schedule a Call',
    link: 'https://outlook.office365.com/owa/calendar/PARealEstateSupportServices@NETORG4562290.onmicrosoft.com/bookings/'
  }
];

const WorkWithMe: React.FC = () => {
  useScrollToTop();
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setFormStatus('loading');
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormStatus('success');
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Email send error:', error);
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
      setFormStatus('error');
    }
  };

  return (
    <MainLayout>
      {/* Remove the outer div wrapper to eliminate potential spacing issues */}
      {/* Using synchronized PageHeroWrapper with consistent min-h-screen height */}
      <PageHeroWrapper
        title="Work With Me"
        subtitle="Let's streamline your real estate transactions together"
        minHeight="min-h-[80vh]"
      >
        <UnifiedButton
          to="/agent-portal"
          variant="glass"
          size="lg"
          radius="full"
          withAnimation={true}
          className="mt-6"
          icon={
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          }
          iconPosition="right"
        >
          Start a Transaction
        </UnifiedButton>
      </PageHeroWrapper>

      {/* How We Work Section - Direct connection to hero with no gap */}
      <section 
        className="bg-gradient-to-br from-blue-900 to-blue-800 relative overflow-hidden" 
        style={{ 
          marginTop: '-1px', // Negative margin to eliminate any white gap
          paddingTop: '0' // No top padding to ensure seamless connection
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:32px_32px]" />
        </div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">My Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-300 mb-6">The Partnership Approach</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              I provide personalized transaction coordination tailored to your specific needs, ensuring a smooth, efficient, and successful real estate process from start to finish.
            </p>
          </div>

          {/* Work Together Steps */}
          <WorkTogether />
        </div>
      </section>
      
      {/* Direct transition to contact section - eliminating any potential hidden section headers */}
      <div className="h-16 bg-gradient-to-b from-blue-800 to-gray-50"></div>
      {/* Contact Section - Unified Design */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)]" />
          <div className="absolute inset-0 bg-grid-gray-500/[0.02] bg-[length:32px_32px]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4 shadow-sm">Connect With Me</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Options</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Have questions or ready to start? Choose how you'd like to connect
            </p>
          </div>
          
          {/* Two-column layout for contact methods and form */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Contact methods - Takes 2/5 of the width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 p-1"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg px-6 py-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                  <div className="space-y-6">
                    {contactMethods.map((method, index) => {
                      const Icon = method.icon;
                      return (
                        <motion.div
                          key={index}
                          className="group relative bg-white/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/25 transition-all duration-300 shadow-sm border border-white/10"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex items-center">
                            <div className="bg-white/30 p-3 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-white tracking-wide">{method.title}</h4>
                              <p className="text-white text-sm mb-2 font-medium">{method.description}</p>
                              <a
                                href={method.link}
                                className="inline-flex items-center text-amber-100 bg-amber-500/50 px-3 py-1 rounded-full text-sm font-medium hover:bg-amber-400/60 hover:text-white transition-all duration-300 shadow-sm border border-amber-400/30"
                              >
                                {method.action}
                                <ArrowRight className="h-3.5 w-3.5 ml-1" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
              
              <PreloadedAnimationWrapper
                className="bg-white rounded-xl shadow-xl p-6 border border-gray-100"
                preloadDelay={200}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Work With Me</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <CheckCircle className="text-brand-blue mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                    <p className="text-gray-700">Personalized service tailored to your specific needs</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-brand-blue mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                    <p className="text-gray-700">Quick response times to keep your transactions moving</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-brand-blue mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                    <p className="text-gray-700">Flexible packages to accommodate your business volume</p>
                  </div>
                </div>
              </PreloadedAnimationWrapper>
            </div>
            
            {/* Contact form - Takes 3/5 of the width on large screens */}
            <div className="lg:col-span-3">
              <PreloadedAnimationWrapper
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                preloadDelay={300}
              >
                <div className="bg-gradient-to-br from-gray-50 to-white px-8 py-10">
                  <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-2">Send a Message</span>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Information</h3>
                  <p className="text-gray-600 mb-8">
                    I'd love to hear about your transaction coordination needs. Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                  
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-70"
                    >
                      {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>

                    {formStatus === 'success' && (
                      <div className="p-4 bg-green-100 rounded-lg border border-green-300 text-green-800">
                        Thank you for your message! I'll get back to you soon.
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="p-4 bg-red-100 rounded-lg border border-red-300 text-red-800">
                        {errorMessage}
                      </div>
                    )}
                  </form>
                </div>
              </PreloadedAnimationWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)]" />
          <div className="absolute inset-0 bg-grid-gray-500/[0.02] bg-[length:32px_32px]" />
        </div>
        <div className="container mx-auto px-4 py-24 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">Common Questions</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Answers to common questions about working with a transaction coordinator
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQ />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/90 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Submit your transaction details and I'll handle the rest
          </p>
          <Link
            to="/agent-portal"
            className="group inline-flex items-center px-8 py-4 text-lg font-medium text-brand-blue bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            Start a Transaction
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default WorkWithMe;