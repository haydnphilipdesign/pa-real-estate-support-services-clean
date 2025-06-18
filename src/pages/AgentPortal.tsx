import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Clock, Lock, Eye, EyeOff, CheckCircle, RefreshCw, ChevronRight, Home, ArrowUpRight, Users } from 'lucide-react';
import { Button } from '@/components/ui';
import { Input } from '../components/ui/input';
import { toast } from '../components/ui/simple-toast';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import useScrollToTop from '../hooks/useScrollToTop';
import { Link } from '../components/GlobalLinkProvider';
// Import CSS via centralized helper
import { ensureCssImported } from '../components/FixedCssImport';

// Ensure CSS is imported
ensureCssImported();

// Password for accessing the form - use from environment variables if available
const FORM_PASSWORD = import.meta.env.VITE_PORTAL_PASSWORD || 'KWAgent2025!';

const AgentPortal = (): JSX.Element => {
  useScrollToTop();

  // State for password protection
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordChecking, setIsPasswordChecking] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('agentAuth');
    if (savedAuth === FORM_PASSWORD) {
      setIsPasswordProtected(false);
      setShowForm(true);
    }
  }, []);

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordChecking(true);

    // Simulate a slight delay for UX
    setTimeout(() => {
      if (password === FORM_PASSWORD) {
        setIsPasswordProtected(false);
        setShowForm(true);
        if (rememberMe) {
          localStorage.setItem('agentAuth', password);
        }
        toast({
          title: "Access granted",
          description: "Welcome to the Agent Portal",
        });
      } else {
        toast({
          title: "Access denied",
          description: "The password you entered is incorrect",
          variant: "destructive",
        });
      }
      setIsPasswordChecking(false);
    }, 800);
  };

  // Features list for the password-protected view
  const features = [
    {
      icon: FileText,
      title: "Streamlined Documentation",
      description: "Submit transaction details through a user-friendly form designed for real estate professionals."
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Your transaction information is securely processed and stored with industry-standard encryption."
    },
    {
      icon: Clock,
      title: "Time-Saving",
      description: "Save hours on paperwork and follow-ups with our efficient transaction coordination service."
    }
  ];

  // Additional features and stats for enhanced display
  const stats = [
    { value: "500+", label: "Transactions Completed" },
    { value: "24/7", label: "Support Available" },
    { value: "15+", label: "Counties Served" }
  ];

    // Testimonial content is now shown directly in the JSX

  return (
    <>
      {/* Add direct styles to override any global CSS */}
      <style>{`
        #agent-portal-page {
          min-height: 100vh !important;
          overflow: auto !important;
        }
        
        #agent-portal-container {
          min-height: 100vh !important;
          height: auto !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        #agent-portal-container .lg\\:col-span-2 {
          display: block !important;
          padding-top: 0.5rem !important;
          padding-bottom: 2rem !important;
          justify-content: flex-start !important;
          align-items: flex-start !important;
        }
        
        @media (min-width: 1024px) {
          #agent-portal-container .lg\\:col-span-2 {
            padding-top: 1rem !important;
          }
        }
        
        .agent-portal-nav {
          padding-top: 0.25rem !important;
          padding-bottom: 0.25rem !important;
        }
        
        .agent-portal-login-form {
          margin-top: 0.5rem !important;
        }
        
        #agent-portal-container .w-full.max-w-md {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300" id="agent-portal-page">
      <AnimatePresence mode="wait">
        {isPasswordProtected ? (
          <motion.div
            key="login"
            className="min-h-screen flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 0.03, 0.36, 1.0]
              }
            }}
            exit={{
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.5,
                ease: [0.22, 0.03, 0.36, 1.0]
              }
            }}
            id="agent-portal-container"
          >
            {/* Navigation for the login screen */}
            <div className="bg-white/10 backdrop-blur-md shadow-md agent-portal-nav flex-shrink-0">
              <div className="container mx-auto px-4 py-1">
                <div className="flex justify-between items-center">
                  <Link to="/" className="flex items-center gap-2 text-white">
                    <Home size={16} />
                    <span className="font-medium text-xs">Return to Homepage</span>
                  </Link>
                  <div className="flex items-center space-x-3">
                    <Link to="/services" className="text-white/90 hover:text-white flex items-center gap-1 text-xs">
                      <Users size={12} />
                      <span>Services</span>
                    </Link>
                    <Link to="/workwithme" className="text-white/90 hover:text-white flex items-center gap-1 text-xs">
                      <ArrowUpRight size={12} />
                      <span>Work With Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 grid lg:grid-cols-5">
              {/* Left side - Password form (2 columns) */}
              <motion.div
                className="col-span-full lg:col-span-2 bg-white p-4 lg:px-8 lg:pt-1 lg:pb-8 relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Decorative checkmarks */}
                <div className="absolute top-4 left-8 opacity-10 hidden lg:block">
                  <CheckCircle className="h-12 w-12 text-blue-500" />
                </div>
                <div className="absolute bottom-32 right-12 opacity-10 hidden lg:block">
                  <CheckCircle className="h-16 w-16 text-blue-600" />
                </div>
                <div className="w-full max-w-md mx-auto space-y-4 relative z-10 pt-0">
                  <div>
                    <div className="flex justify-center mb-2">
                      <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-brand-blue rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <Lock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 text-center">Agent Login</h1>
                    <p className="mt-1 text-gray-600 text-center text-sm">
                      Enter the password to access the transaction form
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-3 agent-portal-login-form">
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-600" />
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 py-3"
                          placeholder="Enter portal password"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="relative h-5 w-5">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        {rememberMe && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          </motion.div>
                        )}
                      </div>
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me on this device
                      </label>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        disabled={isPasswordChecking}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-brand-blue hover:shadow-lg transition-all duration-300 text-white font-medium"
                      >
                        {isPasswordChecking ? (
                          <RefreshCw className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            <span>🔒 Sign in</span>
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>

                  {/* Return to Home Button */}
                  <div className="flex justify-center mt-4">
                    <Link to="/" className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <Home className="w-4 h-4 mr-2" />
                      Return to Home
                    </Link>
                  </div>

                  {/* Testimonial */}
                  <motion.div
                    className="mt-4 pt-3 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="relative">
                      <svg className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 h-8 w-8 text-blue-400 opacity-30" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="relative text-gray-600 italic">
                        "The transaction portal has saved our team countless hours. It's become an essential part of our workflow."
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">JD</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">John Doe</p>
                          <p className="text-xs text-gray-500">Top Producing Agent</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right side - Features (3 columns) */}
              <motion.div
                className="hidden lg:block lg:col-span-3 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Background with pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900">
                  <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
                  {/* Decorative circles */}
                  <div className="absolute top-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-400/10 rounded-full blur-xl"></div>
                </div>

                <div className="relative h-full z-10 flex items-center justify-center p-4 lg:p-6">
                  <div className="max-w-2xl w-full">
                    {/* Header */}
                    <div className="mb-6 text-center lg:text-left">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm mb-3">
                        <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                        <span>Secure Agent Portal</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Welcome to the<br className="hidden lg:block" /><span className="text-blue-300">Agent Portal</span></h2>
                      <p className="text-white/80 text-sm lg:text-base">
                        Submit new transactions quickly and easily with our streamlined intake form.
                      </p>
                    </div>

                    {/* Features with enhanced styling */}
                    <div className="space-y-3 mb-4 w-full">
                      {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                          <motion.div
                            key={index}
                            className="flex gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                            whileHover={{ y: -5 }}
                          >
                            <div className="bg-gradient-to-br from-blue-500 to-brand-blue p-3 rounded-lg shadow-lg flex-shrink-0">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                              <p className="text-white/80 mt-1 text-sm">{feature.description}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Stats section */}
                    <motion.div
                      className="grid grid-cols-3 gap-3 w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      {stats.map((stat, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
                          <p className="text-xl font-bold text-white">{stat.value}</p>
                          <p className="text-xs text-blue-200 uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>

                    {/* Fast and Secure labels */}
                    <div className="flex justify-between items-center mt-6">
                      <div className="text-center">
                        <p className="text-white font-semibold">Fast</p>
                        <p className="text-white/70 text-xs">Transaction Submission</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold">Secure</p>
                        <p className="text-white/70 text-xs">Agent Portal Access</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.22, 0.03, 0.36, 1.0]
              }
            }}
            exit={{
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.5,
                ease: [0.22, 0.03, 0.36, 1.0]
              }
            }}
          >
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <TransactionForm />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default AgentPortal;
