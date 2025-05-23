import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, Home, CheckCircle } from 'lucide-react';
import { useNavigation } from '../providers/SmoothNavigationProvider';
import { setAuthenticated } from '../utils/authUtils';
import { UnifiedButton } from '../components/ui/unified-button';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Logo from '/logo-flat.png';
import GlobalPageHero from '../components/GlobalPageHeroNew';

const Login = () => {
  // Add style tag and handle animation reset for the login page
  React.useEffect(() => {
    // Mark the document body with a data attribute to handle special transition rules
    document.body.setAttribute('data-login-page', 'true');
    
    // Create and inject a style element that targets specifically our agent portal heading
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      /* Target the agent portal heading with very high specificity */
      .agent-portal-title.text-4xl,
      .agent-portal-title.sm\:text-5xl,
      .agent-portal-title.md\:text-6xl,
      .agent-portal-title h1,
      .agent-portal-title span,
      h1.agent-portal-title,
      [data-hero-component] h1.agent-portal-title,
      [data-hero-content] h1.agent-portal-title,
      .hero h1.agent-portal-title,
      section h1.agent-portal-title,
      div h1.agent-portal-title {
        color: #3b82f6 !important;
        -webkit-text-fill-color: #3b82f6 !important;
      }
      
      /* Target the span specifically */
      .agent-portal-title span,
      h1.agent-portal-title span,
      [data-hero-component] h1.agent-portal-title span,
      [data-hero-content] h1.agent-portal-title span,
      .hero h1.agent-portal-title span {
        color: #3b82f6 !important;
        -webkit-text-fill-color: #3b82f6 !important;
      }
      
      /* Prevent transition jumpiness with agent portal */
      body[data-login-page="true"] .framer-motion-exit,
      body[data-login-page="true"] [data-framer-exit] {
        animation: none !important;
        transition: none !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Clean up function to remove everything when component unmounts
    return () => {
      // Remove the login page marker
      document.body.removeAttribute('data-login-page');
      
      // Remove the style element
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
      
      // Force animation reset for smoother transitions
      document.querySelectorAll('.motion-initial, .motion-animate, .motion-exit').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.animation = 'none';
          el.style.transition = 'none';
          el.style.transform = 'none';
        }
      });
    };
  }, []);

  // Ensure animations are properly triggered when the page loads
  useEffect(() => {
    // Immediately remove the navigating flag to ensure animations run properly
    document.body.removeAttribute('data-navigating');
    document.body.classList.remove('page-transitioning');
    
    // Force immediate repaint to ensure animations run correctly
    requestAnimationFrame(() => {
      document.body.style.transform = 'translateZ(0)';
      requestAnimationFrame(() => {
        document.body.style.transform = '';
      });
    });
  }, []);

  const navigate = useNavigate();
  const { Link } = useNavigation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Load remembered state on component mount
  useEffect(() => {
    const remembered = localStorage.getItem('rememberAgent');
    if (remembered === 'true') {
      setRememberMe(true);
    }
  }, []);

  // Verify the checkbox is properly saved to localStorage
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    if (checked) {
      localStorage.setItem('rememberAgent', 'true');
    } else {
      localStorage.removeItem('rememberAgent');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // We don't need to handle remember me here anymore as it's handled by the handleRememberMeChange function

    // Simple timeout to simulate loading
    setTimeout(() => {
      if (password === 'KWAgent2025!') {
        setAuthenticated();
        // Navigate using the standard router
        navigate('/agent-portal/transaction');
      } else {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GlobalPageHero
      minHeight="min-h-screen"
      className="flex items-center justify-center agent-portal-login" 
      overlayOpacity="bg-black/75" // Slightly more transparent overlay to match other heroes
    >
      <motion.div 
        id="login-page"
        className="container px-4 md:px-6 lg:px-8 mx-auto login-page-container w-full" 
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4, // Standard hero entrance duration
            ease: [0.2, 0.0, 0.2, 1.0],
            delay: 0.05
          }
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center max-w-6xl mx-auto"> 
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7">
          <motion.div
            className="max-w-2xl mx-auto text-center lg:text-left mt-2 use-standard-animations" 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.0, 0.2, 1.0], delay: 0.1 }}
          >
            {/* Pre-title badge */}
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 use-standard-animations" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.2, 0.0, 0.2, 1.0] }}
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
              <span className="text-blue-400 font-bold">Agent Transaction Portal</span>
            </motion.div>

            {/* Main headline separated into two parts to match Work With Me page */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight use-standard-animations" 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0.0, 0.2, 1.0] }}
            >
              Welcome to the
            </motion.h1>
            
            {/* Second part as a separate heading to match Work With Me page */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight mt-0 agent-portal-title text-blue-500" 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.2, 0.0, 0.2, 1.0] }}
            >
              <span 
                className="inline-block relative text-blue-500 font-bold"
              >
                Agent Portal
              </span>
            </motion.h1>

            {/* Description text */}
            <motion.p 
              className="text-gray-300 text-lg sm:text-xl mb-6" 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.3, ease: [0.2, 0.0, 0.2, 1.0] }}
            >
              Submit new transactions quickly and easily with our streamlined intake form.
            </motion.p>

            {/* Key benefits */}
            <motion.div
              className="flex flex-wrap gap-4 mb-6 justify-center lg:justify-start use-standard-animations" 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.2, 0.0, 0.2, 1.0] }}
            >
              <div className="flex items-center text-sm sm:text-base">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-300" />
                <span className="font-medium">Fast Transaction Submission</span>
              </div>
              <span className="mx-2 text-blue-400/50">•</span>
              <div className="flex items-center text-sm sm:text-base">
                <CheckCircle className="w-5 h-5 mr-2 text-blue-300" />
                <span className="font-medium">Streamlined Process</span>
              </div>
            </motion.div>

            {/* Return to home button */}
            <motion.div
              className="flex justify-center lg:justify-start use-standard-animations" /* Center on mobile, left-align on large screens */
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0, ease: [0.2, 0.0, 0.2, 1.0] }}
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium border border-white/20 transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>

          {/* Login Card - Right Side (using our new glass-card-login style) */}
        <motion.div
          className="lg:col-span-5 agent-login-card-container mx-auto w-full max-w-md mt-0 lg:mt-0" /* Adjusted spacing */
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.0, 0.2, 1.0] }}
        >
            <div className="glass-card-navy agent-login-card relative p-6 md:p-8" data-glass-card="true" data-login-card="true"> {/* Restored original padding */}
              {/* Decorative elements - removed the blue glow elements */}

            <div className="relative">
                {/* Logo with hover effect */}
              <div className="flex justify-center mb-6"> {/* Increased margin */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-gold rounded-lg opacity-0 group-hover:opacity-75 blur transition duration-300" />
                  <img
                    src={Logo}
                    alt="PA Real Estate Support Services"
                    className="h-16 relative" /* Restored original size */
                  />
                </div>
              </div>

                <h2 className="hero-card-title text-2xl font-bold text-center mb-6 text-white">Agent Login</h2> {/* Increased margin */}

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5"> {/* Restored original spacing */}
                  {/* Password field with better contrast */}
                <div className="space-y-2"> {/* Restored original spacing */}
                    <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-white/20 border-white/30 focus:border-blue-400 text-white placeholder:text-white/50 pr-10 shadow-sm login-password" /* Removed height control */
                      style={{ color: 'white !important' }}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                  {/* Remember me checkbox - Updated styling */}
                  <div className="flex items-center space-x-2"> {/* Restored original spacing */}
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        handleRememberMeChange(checked === true)
                      }
                      className="h-4 w-4 border-white/60 data-[state=checked]:bg-brand-gold data-[state=checked]:border-brand-gold text-gray-900"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleRememberMeChange(!rememberMe)}
                    >
                      Remember me on this device
                    </label>
                  </div>

                  {/* Error message */}
                {error && (
                    <div className="p-3 text-sm text-red-100 bg-red-500/30 backdrop-blur-sm rounded-md border border-red-500/30"> {/* Restored original padding */}
                    {error}
                  </div>
                )}

                {/* Submit button - Standardized with UnifiedButton */}
                <UnifiedButton
                  type="submit"
                  variant="secondary"
                  size="lg"
                  radius="full"
                  fullWidth={true}
                  withAnimation={true}
                  disabled={isLoading}
                  loading={isLoading}
                  icon={<LogIn className="h-4 w-4" />}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </UnifiedButton>
              </form>

                {/* Stats section with glass effect - restored original spacing */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                    <p className="text-xl font-bold text-white">Fast</p> {/* Restored original text size */}
                    <p className="text-xs text-blue-100">Transaction Submission</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold text-white">Secure</p> {/* Restored original text size */}
                    <p className="text-xs text-blue-100">Agent Portal Access</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
      </motion.div>
    </GlobalPageHero>
  );
};

export default Login;
