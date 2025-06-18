import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
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
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
      setFormStatus('error');
    }
  };

  const faqs = [
    {
      id: 'faq-1',
      question: "What is a Transaction Coordinator?",
      answer: "A Transaction Coordinator manages all administrative aspects of real estate transactions, from contract to closing. We handle paperwork, deadlines, and communication between all parties involved."
    },
    {
      id: 'faq-2',
      question: "How quickly do you respond to inquiries?",
      answer: "I aim to respond to all inquiries within 1 business hour during normal business hours. For urgent matters, I'm available by phone."
    },
    {
      id: 'faq-3',
      question: "What areas do you service?",
      answer: "I primarily serve real estate agents in the Pocono Mountains region, working with Keller Williams agents and other brokerages in the area."
    }
  ];

  return (
    <div className="bg-neutral-50">
      {/* Hero Section - Updated to match design system */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.1)_0%,_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(239,68,68,0.1)_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get in Touch</h2>
            <p className="text-xl text-white/90">
              Let's discuss how I can help streamline your real estate transactions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-12">
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
              </motion.div>

              {/* FAQ Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20"
              >
                <h2 className="text-2xl font-bold mb-6 text-neutral-900">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-neutral-200 pb-4 last:border-0"
                    >
                      <h3 className="font-semibold text-lg mb-2 text-neutral-900">{faq.question}</h3>
                      <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

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
                  className="flex flex-col items-center justify-center h-full text-center py-8"
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
