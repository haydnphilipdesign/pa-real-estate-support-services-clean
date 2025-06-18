import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Clock, Lock, Eye, EyeOff, CheckCircle, RefreshCw, ChevronRight, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { Input } from '../components/ui/input';
import { toast } from '../components/ui/simple-toast';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import useScrollToTop from '../hooks/useScrollToTop';
import { useNavigation } from '../providers/SmoothNavigationProvider';

// Password for accessing the form
const FORM_PASSWORD = import.meta.env.VITE_PORTAL_PASSWORD || 'KWAgent2025!';

const AgentPortal = (): JSX.Element => {
  useScrollToTop();
  const { Link } = useNavigation();

  // State management
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordChecking, setIsPasswordChecking] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // Check for saved credentials on component mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('agentAuth');
      const rememberExpiry = localStorage.getItem('agentAuthExpiry');
      
      if (savedAuth && rememberExpiry) {
        const expiryTime = parseInt(rememberExpiry);
        const currentTime = Date.now();
        
        // Check if the saved auth is valid and not expired (7 days)
        if (savedAuth === FORM_PASSWORD && currentTime < expiryTime) {
          setIsPasswordProtected(false);
          setShowForm(true);
          setRememberMe(true);
          toast({
            title: "Welcome back!",
            description: "You've been automatically signed in",
          });
        } else {
          // Clean up expired credentials
          localStorage.removeItem('agentAuth');
          localStorage.removeItem('agentAuthExpiry');
        }
      }
    } catch (error) {
      console.error('Error checking saved credentials:', error);
      localStorage.removeItem('agentAuth');
      localStorage.removeItem('agentAuthExpiry');
    }
  }, []);

  // Handle password submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordChecking(true);

    setTimeout(() => {
      if (password === FORM_PASSWORD) {
        setIsPasswordProtected(false);
        setShowForm(true);
        
        // Handle remember me functionality
        if (rememberMe) {
          try {
            // Set expiry to 7 days from now
            const expiryTime = Date.now() + (7 * 24 * 60 * 60 * 1000);
            localStorage.setItem('agentAuth', password);
            localStorage.setItem('agentAuthExpiry', expiryTime.toString());
            
            toast({
              title: "Access granted",
              description: "Welcome to the Agent Portal. You'll stay signed in for 7 days.",
            });
          } catch (error) {
            console.error('Error saving credentials:', error);
            toast({
              title: "Access granted",
              description: "Welcome to the Agent Portal",
            });
          }
        } else {
          localStorage.removeItem('agentAuth');
          localStorage.removeItem('agentAuthExpiry');
          
          toast({
            title: "Access granted",
            description: "Welcome to the Agent Portal",
          });
        }
      } else {
        toast({
          title: "Access denied",
          description: "The password you entered is incorrect",
          variant: "destructive",
        });
      }
      setIsPasswordChecking(false);
      setPassword('');
    }, 800);
  };

  // Logout functionality
  const handleLogout = () => {
    setIsPasswordProtected(true);
    setShowForm(false);
    setPassword('');
    setRememberMe(false);
    localStorage.removeItem('agentAuth');
    localStorage.removeItem('agentAuthExpiry');
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {isPasswordProtected ? (
          // Login Screen - Bridge Design
          <motion.div
            key="login"
            className="section hero-section relative overflow-hidden min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
              {/* Animated background elements */}
              <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                
                {/* Left Column - Hero Style Welcome */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Main Headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      Secure
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                        Agent Portal
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                      Your gateway to streamlined transaction coordination and professional support services
                    </p>
                  </motion.div>

                  {/* Feature Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-4"
                  >
                    {[
                      { icon: FileText, text: "Streamlined transaction submission forms" },
                      { icon: Shield, text: "Bank-level security and data protection" },
                      { icon: Clock, text: "24/7 access to your transaction status" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                        className="flex items-start gap-3"
                      >
                        <item.icon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Return Home Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <Link
                      to="/"
                      className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Home className="w-5 h-5 mr-2" />
                      Return Home
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right Column - Transaction Form Style Login Card */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex justify-center"
                >
                  <div className="w-full max-w-md">
                    {/* Clean Transaction Form Style Card */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 relative">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl mb-4 shadow-lg">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Agent Access</h2>
                        <p className="text-gray-600">Enter your portal credentials to continue</p>
                      </div>

                      {/* Login Form */}
                      <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                            Portal Password
                          </label>
                          <div className="relative">
                            <input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-500"
                              placeholder="Enter your portal password"
                              autoComplete="new-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="relative">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            {rememberMe && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              >
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                              </motion.div>
                            )}
                          </div>
                          <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium cursor-pointer">
                            Remember me for 7 days
                          </label>
                        </div>

                        <Button
                          type="submit"
                          disabled={isPasswordChecking}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          {isPasswordChecking ? (
                            <RefreshCw className="h-5 w-5 animate-spin mx-auto" />
                          ) : (
                            <span className="flex items-center justify-center">
                              Access Portal
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </span>
                          )}
                        </Button>
                      </form>

                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Transaction Form Screen
          <motion.div
            key="form"
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logout Button */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Home className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>

            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TransactionForm />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentPortal;