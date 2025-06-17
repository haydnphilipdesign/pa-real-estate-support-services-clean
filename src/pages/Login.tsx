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
    <section className="min-h-screen flex items-center justify-center px-4 hero-section">
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
          <h1 className="heading-1 text-white mb-2">
            Agent Portal
          </h1>
          <p className="text-lead text-white/90">
            Access your professional real estate dashboard
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-glass p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-success-400 mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-small font-medium">Secure Login</span>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-small font-medium text-white/90">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
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
                className="p-3 bg-danger-500/20 border border-danger-500/30 rounded-lg text-danger-200 text-small"
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
                  className="w-4 h-4 text-primary-500 bg-white/10 border border-white/30 rounded focus:ring-primary-400"
                />
                <span className="text-small text-white/90">Keep me signed in</span>
              </label>
              
              <a href="#" className="text-small text-white/70 hover:text-white transition-colors">
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
                  ? 'bg-neutral-500/50 text-neutral-300 cursor-not-allowed' 
                  : 'bg-white text-primary-900 hover:bg-white/90'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-900/30 border-t-primary-900 rounded-full animate-spin" />
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
              className="text-white/70 hover:text-white transition-colors text-small"
            >
              Back to Home
            </button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-small text-white/60">
          <p>Protected by enterprise-grade security</p>
          <p className="mt-1">© 2024 PA Real Estate Support Services</p>
        </div>
      </div>
    </section>
  );
};

export default Login;