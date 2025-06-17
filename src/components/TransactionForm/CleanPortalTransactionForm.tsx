import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="tf-portal-container"
    >
      <div className="tf-portal-wrapper">
        <UnifiedTransactionForm />
      </div>
    </motion.div>
  );
};

export default CleanPortalTransactionForm;