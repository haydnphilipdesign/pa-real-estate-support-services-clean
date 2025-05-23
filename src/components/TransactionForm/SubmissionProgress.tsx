import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle, PartyPopper } from "lucide-react";

export type SubmissionStep = {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
};

interface SubmissionProgressProps {
  isOpen: boolean;
  steps: SubmissionStep[];
  currentStep: number;
  error: string | null;
  onClose: () => void;
}

export function SubmissionProgress({
  isOpen,
  steps,
  currentStep,
  error,
  onClose
}: SubmissionProgressProps) {
  const [isAllComplete, setIsAllComplete] = useState(false);
  
  // Check if all steps are complete
  useEffect(() => {
    if (steps.every(step => step.status === 'complete')) {
      setIsAllComplete(true);
    } else {
      setIsAllComplete(false);
    }
  }, [steps]);

  if (!isOpen) return null;

  // Calculate progress percentage
  const progressPercentage = 
    error ? 100 : // If error, show full bar in red
    isAllComplete ? 100 : // If all complete, show full bar
    Math.min(100, Math.round(((currentStep + (steps[currentStep]?.status === 'loading' ? 0.5 : 0)) / steps.length) * 100));

  // Check if the last step was just completed (for celebration animation)
  const isJustCompleted = 
    steps.length > 0 && 
    steps[steps.length - 1].status === 'complete' && 
    !error;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{
          background: 'linear-gradient(rgba(9, 18, 43, 0.85), rgba(8, 17, 41, 0.9))',
          backdropFilter: 'blur(8px)'
        }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-md bg-[#0d1a36] border border-blue-700/30 rounded-xl shadow-2xl overflow-hidden relative"
        >
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
          
          {/* Decorative corner accents - similar to the form */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/20 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/20 rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/20 rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/20 rounded-br-xl pointer-events-none"></div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,102,204,0.03)_100%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-grid-blue-500/[0.03] bg-[length:20px_20px] pointer-events-none"></div>
          
          <div className="p-6 relative z-10">
            <h2 className="text-xl font-semibold text-white mb-1">
              {error ? "Submission Error" : 
               isAllComplete ? "Transaction Submitted Successfully!" : 
               "Processing Your Transaction"}
            </h2>
            <p className="text-blue-100/80 text-sm mb-4">
              {error 
                ? "We encountered an error while processing your submission" 
                : isAllComplete
                  ? "Your transaction has been processed and saved"
                  : "Please wait while we process your information"
              }
            </p>
            
            {/* Confetti animation for completion */}
            {isAllComplete && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-6 right-6"
                >
                  <PartyPopper className="h-8 w-8 text-amber-400" />
                </motion.div>
                
                {/* Subtle success glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500 blur-3xl"
                />
              </>
            )}
            
            {/* Progress bar */}
            <div className="w-full h-3 bg-blue-900/50 rounded-full mb-6 overflow-hidden backdrop-blur-sm">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className={`h-full rounded-full ${
                  error ? 'bg-red-500' : 
                  isAllComplete ? 'bg-emerald-500' : 
                  'bg-blue-500'
                }`}
              />
            </div>
            
            {/* Steps list */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    step.status === 'complete' ? 'bg-blue-900/30 border-blue-700/30' :
                    step.status === 'loading' ? 'bg-blue-800/50 border-blue-600/40' :
                    step.status === 'error' ? 'bg-red-900/30 border-red-700/30' :
                    'bg-blue-900/20 border-blue-900/20'
                  }`}
                  initial={{ opacity: 0.8, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: step.status === 'loading' ? 1.02 : 1
                  }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="flex-shrink-0">
                    {step.status === 'pending' && (
                      <div className="w-6 h-6 rounded-full border-2 border-blue-300/50" />
                    )}
                    {step.status === 'loading' && (
                      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                    )}
                    {step.status === 'complete' && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </motion.div>
                    )}
                    {step.status === 'error' && (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-medium ${
                      step.status === 'error' ? 'text-red-300' :
                      step.status === 'complete' ? 'text-emerald-300' :
                      step.status === 'loading' ? 'text-blue-300' :
                      'text-blue-200/70'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {error && (
              <div className="mt-5 p-4 bg-red-900/30 border border-red-700/30 rounded-md">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}
            
            {/* Only show close button for errors or after full completion */}
            {(error || isAllComplete) && onClose && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className={`mt-4 w-full py-3 font-medium transition-colors rounded-lg ${
                  error ? 
                  "bg-blue-800/70 hover:bg-blue-700/80 text-white" : 
                  "bg-emerald-800/70 hover:bg-emerald-700/80 text-white"
                }`}
              >
                {error ? "Close" : "Done"}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}