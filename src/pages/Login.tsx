import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, ArrowRight, Home } from 'lucide-react';
import { setAuthenticated } from '../utils/authUtils';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === 'KWAgent2025!') {
      if (rememberMe) {
        localStorage.setItem('agentPortalAuth', 'true');
      }
      
      setAuthenticated();
      navigate('/agent-portal/transaction');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 border border-white/20">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Agent Portal
          </h1>
          <p className="text-blue-200">
            Access your professional real estate dashboard
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-green-400 mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Secure Login</span>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-blue-100">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-white/10 border border-white/30 rounded focus:ring-blue-400"
                />
                <span className="text-sm text-blue-100">Keep me signed in</span>
              </label>
              
              <a href="#" className="text-sm text-blue-300 hover:text-blue-100 transition-colors">
                Need help?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className={`
                w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2
                ${isLoading || !password 
                  ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' 
                  : 'bg-white text-blue-900 hover:bg-white/90'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-blue-200 hover:text-white transition-colors text-sm"
            >
              Back to Home
            </button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-xs text-blue-200/60">
          <p>Protected by enterprise-grade security</p>
          <p className="mt-1">© 2024 PA Real Estate Support Services</p>
        </div>
      </div>
    </section>
  );
};

export default Login;