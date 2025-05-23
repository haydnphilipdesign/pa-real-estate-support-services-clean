import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalPageHero from '../components/GlobalPageHeroNew';
import { motion } from 'framer-motion';
import TransitionTester from '../components/TransitionTester';
import HERO_ANIMATION from '../animations/heroAnimations';

/**
 * NavigationTest - A page for testing transitions between routes
 * This page provides UI for triggering different types of transitions and validating animations
 */
const NavigationTest: React.FC = () => {
  const navigate = useNavigate();
  const [testMode, setTestMode] = useState<'standard' | 'rapid' | 'sequence'>('standard');
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{route: string; duration: number}>>([]);
  
  // Routes to test
  const testRoutes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/work-with-me', label: 'Work With Me' },
    { path: '/login', label: 'Login' },
    { path: '/agent-portal/transaction', label: 'Transaction' }
  ];
  
  // Start automated test sequence
  const startTestSequence = () => {
    setIsTestRunning(true);
    setTestResults([]);
    
    // Different test patterns based on mode
    if (testMode === 'rapid') {
      // Rapid tests - quickly navigate through pages with minimal delay
      let counter = 0;
      const rapidTest = () => {
        if (counter >= testRoutes.length) {
          setIsTestRunning(false);
          return;
        }
        
        const route = testRoutes[counter];
        const startTime = performance.now();
        
        navigate(route.path);
        
        // Capture performance metrics
        setTimeout(() => {
          const duration = performance.now() - startTime;
          setTestResults(prev => [...prev, { route: route.path, duration }]);
          counter++;
          rapidTest();
        }, 800); // Just slightly longer than transition duration
      };
      
      rapidTest();
    } else if (testMode === 'sequence') {
      // Sequential test - visit each page with enough time to view the full animation
      let counter = 0;
      const sequentialTest = () => {
        if (counter >= testRoutes.length) {
          setIsTestRunning(false);
          return;
        }
        
        const route = testRoutes[counter];
        const startTime = performance.now();
        
        navigate(route.path);
        
        // Capture performance metrics
        setTimeout(() => {
          const duration = performance.now() - startTime;
          setTestResults(prev => [...prev, { route: route.path, duration }]);
          counter++;
          sequentialTest();
        }, 2500); // Enough time to see the full animation
      };
      
      sequentialTest();
    } else {
      // Standard test - just provide manual testing UI
      setIsTestRunning(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <GlobalPageHero title="Transition Testing Page">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6" 
            variants={HERO_ANIMATION.variants.container}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.h1 
              className="text-3xl font-bold mb-6 text-white"
              variants={HERO_ANIMATION.variants.title}
            >
              Navigation & Transition Testing
            </motion.h1>
            
            <motion.p 
              className="mb-6 text-blue-100"
              variants={HERO_ANIMATION.variants.subtitle}
            >
              Use this page to test transitions between different routes and verify the smoothness
              of animations and background persistence.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3 text-white">Manual Testing</h3>
                <div className="space-y-2">
                  {testRoutes.map(route => (
                    <button
                      key={route.path}
                      onClick={() => navigate(route.path)}
                      className="block w-full text-left px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded transition-colors text-white"
                    >
                      {route.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3 text-white">Automated Testing</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-blue-100">
                      <input
                        type="radio"
                        name="testMode"
                        checked={testMode === 'standard'}
                        onChange={() => setTestMode('standard')}
                        className="mr-2"
                      />
                      Manual Mode
                    </label>
                    <label className="flex items-center text-blue-100">
                      <input
                        type="radio"
                        name="testMode"
                        checked={testMode === 'rapid'}
                        onChange={() => setTestMode('rapid')}
                        className="mr-2"
                      />
                      Rapid Navigation (800ms)
                    </label>
                    <label className="flex items-center text-blue-100">
                      <input
                        type="radio"
                        name="testMode"
                        checked={testMode === 'sequence'}
                        onChange={() => setTestMode('sequence')}
                        className="mr-2"
                      />
                      Sequential (2.5s pause)
                    </label>
                  </div>
                  
                  <button
                    onClick={startTestSequence}
                    disabled={isTestRunning || testMode === 'standard'}
                    className={`w-full py-2 rounded ${
                      isTestRunning || testMode === 'standard'
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white transition-colors`}
                  >
                    {isTestRunning ? 'Test Running...' : 'Start Test Sequence'}
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3 text-white">Test Results</h3>
                {testResults.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto text-blue-100">
                    {testResults.map((result, i) => (
                      <div key={i} className="text-sm flex justify-between">
                        <span>{result.route}</span>
                        <span>{result.duration.toFixed(2)}ms</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-blue-100/70 italic">No test results yet</p>
                )}
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Visual Inspection Checklist</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-100">
                <li>Background slideshow continues smoothly without jumps</li>
                <li>No white flashes between pages</li>
                <li>Hero content transitions smoothly in/out</li>
                <li>No z-index issues with header or hero elements</li>
                <li>Animation timing feels natural and not jarring</li>
                <li>Transitions work consistently after multiple navigations</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </GlobalPageHero>
      
      {/* Include the TransitionTester component for metrics */}
      <TransitionTester />
    </div>
  );
};

export default NavigationTest;