import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { TransactionFormWrapper } from "./TransactionFormWrapper";
import { UnifiedTransactionForm } from "./UnifiedTransactionForm";

export const CleanPortalTransactionForm: React.FC = () => {
  
  useEffect(() => {
    // Ensure header is visible on this page
    const header = document.querySelector('header') as HTMLElement;
    if (header) {
      header.style.transform = 'translate3d(0, 0, 0)';
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.visibility = 'visible';
      header.style.opacity = '1';
      header.style.zIndex = '50';
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hero-section"
      style={{ 
        minHeight: '100vh',
        padding: 'var(--space-8)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
    >
      <div className="hero-content" style={{ marginTop: '80px', width: '100%', maxWidth: '1200px' }}>
        <TransactionFormWrapper
          title="Transaction Coordination Form"
          description="Complete your real estate transaction details. We'll handle the rest."
        >
          <UnifiedTransactionForm />
        </TransactionFormWrapper>
      </div>
    </motion.div>
  );
};

export default CleanPortalTransactionForm;