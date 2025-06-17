import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, CheckCircle, AlertCircle, ArrowRight, Home, Sparkles } from 'lucide-react';
import { setAuthenticated } from '../utils/authUtils';

export const ModernLogin: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState(false);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Password strength indicator
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
    } else if (password.length < 6) {
      setPasswordStrength(25);
    } else if (password.length < 10) {
      setPasswordStrength(50);
    } else if (password.length < 14) {
      setPasswordStrength(75);
    } else {
      setPasswordStrength(100);
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError('');
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === 'KWAgent2025!') {
      // Success animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (rememberMe) {
        localStorage.setItem('agentPortalAuth', 'true');
      }
      
      setAuthenticated();
      navigate('/agent-portal/transaction');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
      setPasswordStrength(0);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl mb-4 shadow-lg"
          >
            <Home className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Agent Portal
          </h1>
          <p className="text-blue-200 text-sm md:text-base">
            Access your professional real estate dashboard
          </p>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-green-400 mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Secure Login</span>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-blue-100"
              >
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`
                    w-full px-4 py-3 bg-white/10 border rounded-xl
                    text-white placeholder-blue-200/50
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition-all duration-200
                    ${error && touched ? 'border-red-400' : 'border-white/20'}
                    ${focusedField === 'password' ? 'bg-white/20' : ''}
                  `}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1 mt-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-200">Password strength</span>
                    <span className="text-xs text-blue-200">
                      {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength}%` }}
                      className={`h-full transition-all duration-300 ${
                        passwordStrength < 50 ? 'bg-red-400' :
                        passwordStrength < 75 ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && touched && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`
                    w-5 h-5 rounded border-2 transition-all duration-200
                    ${rememberMe ? 'bg-blue-500 border-blue-500' : 'bg-white/10 border-white/30'}
                    group-hover:border-blue-400
                  `}>
                    {rememberMe && (
                      <CheckCircle className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <span className="text-sm text-blue-100">Keep me signed in</span>
              </label>
              
              <a 
                href="#" 
                className="text-sm text-blue-300 hover:text-blue-100 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Need help?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-3 px-4 rounded-xl font-medium
                transition-all duration-200 flex items-center justify-center space-x-2
                ${isLoading || !password 
                  ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg'
                }
              `}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Additional Features */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <button className="text-blue-200 hover:text-white transition-colors flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>Quick Tour</span>
              </button>
              <span className="text-white/30">•</span>
              <button 
                onClick={() => navigate('/')}
                className="text-blue-200 hover:text-white transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust Indicators */}
        <div className="mt-8 text-center text-xs text-blue-200/60">
          <p>Protected by enterprise-grade security</p>
          <p className="mt-1">© 2024 PA Real Estate Support Services</p>
        </div>
      </motion.div>

      {/* Add required styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ModernLogin;