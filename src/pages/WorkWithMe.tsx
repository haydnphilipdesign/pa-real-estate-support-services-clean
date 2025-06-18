import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import FAQ from '../components/FAQ';
import { ArrowRight, Phone, Mail, Calendar, Award, Star, Clock, CheckCircle, Users, Shield, MapPin, Send } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import emailjs from '@emailjs/browser';

const WorkWithMe: React.FC = () => {
  const { Link } = useNavigation();
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

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
      setErrorMessage('Failed to send message. Please try again or contact me directly.');
      setFormStatus('error');
    }
  };

  return (
    <div>
      {/* Beautiful 2-Column Hero Section */}
      <section className="section hero-section relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                    <span className="text-white/90 text-sm font-medium">Professional Transaction Support</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Work With Me
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    Let's streamline your real estate transactions together with comprehensive coordination services
                  </p>
                </motion.div>

                {/* Partnership Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  {[
                    { icon: Clock, text: "Same-day response to all inquiries", color: "text-blue-400" },
                    { icon: Shield, text: "100% compliance with PA regulations", color: "text-green-400" },
                    { icon: Users, text: "Dedicated support for your clients", color: "text-purple-400" },
                    { icon: CheckCircle, text: "Seamless transaction management", color: "text-yellow-400" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <item.icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                      <span className="text-white/90">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/agent-portal"
                    className="group inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 transform hover:scale-105"
                  >
                    Start Your First Transaction
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="tel:+5705884637"
                    className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    (570) 588-4637
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Main Contact Card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-lg w-full">
                  {/* Contact Header */}
                  <div className="text-center mb-8">
                    <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
                    <p className="text-white/80">Ready to get started? Let's connect!</p>
                  </div>
                  
                  {/* Contact Methods */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Phone className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">(570) 588-4637</p>
                        <p className="text-white/70 text-sm">Call for immediate assistance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Mail className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold text-sm break-all">debbie@parealestatesupport.com</p>
                        <p className="text-white/70 text-sm">Email for detailed inquiries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Calendar className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-semibold">Mon-Fri, 9:00 AM - 5:00 PM</p>
                        <p className="text-white/70 text-sm">Available for consultation</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Response Time Badge */}
                  <div className="mt-6 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-400" />
                        <span className="text-white/90 text-sm font-medium">Response Time</span>
                      </div>
                      <span className="text-white font-bold">&lt; 1 Hour</span>
                    </div>
                    <div className="text-xs text-white/70 mt-2">During business hours</div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-neutral-900">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50">
                  <Phone className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Phone</p>
                    <a href="tel:+5705884637" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      (570) 588-4637
                    </a>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200/50">
                  <Mail className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Email</p>
                    <a href="mailto:debbie@parealestatesupport.com" className="text-green-600 hover:text-green-700 font-medium transition-colors break-all">
                      debbie@parealestatesupport.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200/50">
                  <MapPin className="w-6 h-6 text-purple-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Location</p>
                    <p className="text-neutral-700">Pocono Mountains, PA</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200/50">
                  <Clock className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Business Hours</p>
                    <p className="text-neutral-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-neutral-700">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* How We'll Work Together */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h3 className="text-xl font-bold mb-4 text-neutral-900">How We'll Work Together</h3>
                <div className="space-y-4 text-sm text-neutral-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Initial Consultation:</strong> We begin with a thorough review of your needs and current procedures to create a tailored solution.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Setup & Integration:</strong> I establish efficient systems and workflows customized to your business requirements.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Ongoing Support:</strong> Regular communication and updates ensure smooth transaction management and coordination.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Timely Execution:</strong> Consistent monitoring and follow‑up to keep all transactions on track and on schedule.</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-neutral-900">Send Me a Message</h2>
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-neutral-900">Message Sent!</h3>
                  <p className="text-neutral-700">I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="from_firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                        First Name
                      </label>
                      <input
                        id="from_firstName"
                        name="from_firstName"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-neutral-900 placeholder-neutral-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="from_lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                        Last Name
                      </label>
                      <input
                        id="from_lastName"
                        name="from_lastName"
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-neutral-900 placeholder-neutral-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email
                    </label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-neutral-900 placeholder-neutral-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="from_phone" className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone
                    </label>
                    <input
                      id="from_phone"
                      name="from_phone"
                      type="tel"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-neutral-900 placeholder-neutral-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-neutral-900 placeholder-neutral-500 resize-vertical"
                    ></textarea>
                  </div>
                  {formStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Quick Benefits */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-neutral-700">Personalized service tailored to your specific needs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-neutral-700">Quick response times to keep your transactions moving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-neutral-700">Flexible packages to accommodate your business volume</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Width FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>
    </div>
  );
};

export default WorkWithMe;