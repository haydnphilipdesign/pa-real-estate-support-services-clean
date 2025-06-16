import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TransactionForm } from "./TransactionForm.complete";
import GlobalPageHero from "../GlobalPageHero";
import { FileText, Shield, Clock, CheckCircle, Users, Home } from 'lucide-react';
import Logo from '/logo-flat.png';

interface PortalTransactionFormProps {
}

export const PortalTransactionForm: React.FC<PortalTransactionFormProps> = () => {

  // Set data attribute for styling and ensure header visibility
  useEffect(() => {
    document.body.setAttribute('data-transaction-page', 'true');

    // Function to apply header styles
    const applyHeaderStyles = () => {
      const header = document.querySelector('header.main-navigation-header') as HTMLElement;
      if (header) {
        // Override any transform styles that might hide the header
        header.style.transform = 'translate3d(0, 0, 0)';
        header.style.position = 'fixed';
        header.style.top = '0';
        header.classList.add('site-header'); // Use design system z-index
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        return header;
      } else {
        return null;
      }
    };

    // Try to apply styles immediately
    let header = applyHeaderStyles();

    // If header not found, retry after a short delay
    if (!header) {
      const retryTimer = setTimeout(() => {
        header = applyHeaderStyles();
      }, 100);

      return () => {
        clearTimeout(retryTimer);
        document.body.removeAttribute('data-transaction-page');
      };
    }

    return () => {
      document.body.removeAttribute('data-transaction-page');
      // Reset header styles when leaving transaction page
      if (header) {
        header.style.transform = '';
        header.style.position = '';
        header.style.top = '';
        header.style.zIndex = '';
        header.style.visibility = '';
        header.style.opacity = '';
      }
    };
  }, []);

  // Force glass card styling to prevent JavaScript overrides
  useEffect(() => {
    const enforceGlassCardStyling = () => {
      const glassCard = document.getElementById('transaction-glass-card-unique');
      if (glassCard) {
        // Apply glass card styles directly via JavaScript to override any CSS conflicts
        glassCard.style.setProperty('background', 'rgba(30, 58, 138, 0.85)', 'important');
        glassCard.style.setProperty('background-color', 'rgba(30, 58, 138, 0.85)', 'important');
        glassCard.style.setProperty('backdrop-filter', 'blur(16px)', 'important');
        glassCard.style.setProperty('-webkit-backdrop-filter', 'blur(16px)', 'important');
        glassCard.style.setProperty('border', '1px solid rgba(59, 130, 246, 0.3)', 'important');
        glassCard.style.setProperty('border-radius', '0.75rem', 'important');
        glassCard.style.setProperty('box-shadow', '0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset', 'important');
        glassCard.style.setProperty('opacity', '1', 'important');
        glassCard.style.setProperty('visibility', 'visible', 'important');
        glassCard.style.setProperty('display', 'block', 'important');
      }
    };

    // Apply immediately
    enforceGlassCardStyling();

    // Also apply after a short delay to catch any late-loading CSS
    const timeoutId = setTimeout(enforceGlassCardStyling, 100);

    // Set up a MutationObserver to watch for style changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          enforceGlassCardStyling();
        }
      });
    });

    const glassCard = document.getElementById('transaction-glass-card-unique');
    if (glassCard) {
      observer.observe(glassCard, { attributes: true, attributeFilter: ['style'] });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* CRITICAL LAYOUT FIXES - Override GlobalPageHero centering for transaction portal */}
      <style>{`
        /* HEADER VISIBILITY - Ultimate fix with maximum specificity */
        html body header.main-navigation-header,
        html body .main-navigation-header,
        body[data-transaction-page="true"] header.main-navigation-header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          height: 80px !important;
          z-index: 999999 !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translate3d(0, 0, 0) !important;
          background-color: rgba(0, 0, 0, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          display: block !important;
        }

        /* TRANSACTION PAGE LAYOUT - Ensure proper spacing and visibility */
        .transaction-portal-page {
          min-height: auto !important;
          height: auto !important;
          padding-top: 0 !important; /* GlobalPageHero already accounts for header */
          padding-bottom: 2rem !important;
          margin-top: 0 !important;
          position: relative !important;
          z-index: 1 !important;
        }

        /* LEFT SIDEBAR CONTENT - Ensure visibility and proper positioning */
        .transaction-portal-page .xl\\:col-span-3 {
          position: relative !important;
          z-index: 100 !important;
          visibility: visible !important;
          opacity: 1 !important;
          display: flex !important;
          flex-direction: column !important;
        }

        /* GRID LAYOUT - Ensure proper responsive behavior */
        .transaction-portal-page .grid.grid-cols-1.xl\\:grid-cols-12 {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
        }

        @media (min-width: 1280px) {
          .transaction-portal-page .grid.grid-cols-1.xl\\:grid-cols-12 {
            grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
            gap: 3rem !important;
          }
        }

        /* CONTENT CONTAINER - Ensure proper layout flow */
        .transaction-portal-page .relative.z-20.w-full {
          position: relative !important;
          z-index: 20 !important;
          width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
          display: block !important;
          overflow: visible !important;
        }

        /* CONTAINER SPACING - Remove conflicting padding/margins */
        .transaction-portal-page .container.mx-auto {
          padding-top: 2rem !important;
          padding-bottom: 2rem !important;
          margin-top: 0 !important;
          position: relative !important;
          z-index: 10 !important;
        }

        /* MOTION ELEMENTS - Ensure animations don't break layout */
        .transaction-portal-page [data-framer-motion] {
          position: relative !important;
          z-index: inherit !important;
        }

        /* Ensure persistent background doesn't interfere with header */
        .background-slideshow {
          z-index: -1 !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          position: fixed !important;
        }

        /* Ensure overlays don't cover header */
        .background-slideshow > div[style*="z-index"] {
          z-index: 1 !important;
        }

        /* Transaction form specific styling */
        .transaction-portal-form-container {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          width: 100% !important;
          height: auto !important;
          overflow: visible !important;
          display: block !important;
        }

        /* Fix glass card container constraints */
        .glass-card-navy[data-transaction-card="true"] {
          height: auto !important;
          min-height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          width: 100% !important;
        }

        /* Ensure transaction form premium styling takes precedence */
        .transaction-portal-form-container .transaction-form-premium {
          width: 100% !important;
          max-width: none !important;
          height: auto !important;
          min-height: auto !important;
          max-height: none !important;
          overflow: visible !important;
          margin: 0 !important;
          padding: 2rem !important;
        }

        /* Form field styling for better contrast - consolidated */
        .transaction-portal-form-container input:not([type="radio"]):not([type="checkbox"]),
        .transaction-portal-form-container select,
        .transaction-portal-form-container textarea,
        .transaction-portal-form-container [data-radix-select-trigger],
        .transaction-portal-form-container [role="combobox"] {
          background-color: white !important;
          background: white !important;
          color: #1e3a8a !important;
          border: 1px solid rgba(59, 130, 246, 0.4) !important;
          border-radius: 0.5rem !important;
          padding: 0.75rem 1rem !important;
          opacity: 1 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
          transition: all 0.2s ease-in-out !important;
        }

        /* Button styling */
        .transaction-portal-form-container button {
          background-color: #3b82f6 !important;
          color: white !important;
          border: none !important;
          opacity: 1 !important;
        }

        /* Comprehensive text styling for proper contrast */
        .transaction-portal-form-container label,
        .transaction-portal-form-container .form-label,
        .transaction-portal-form-container .section-title,
        .transaction-portal-form-container h1,
        .transaction-portal-form-container h2,
        .transaction-portal-form-container h3,
        .transaction-portal-form-container h4,
        .transaction-portal-form-container h5,
        .transaction-portal-form-container h6,
        .transaction-portal-form-container p,
        .transaction-portal-form-container span,
        .transaction-portal-form-container div {
          color: white !important;
        }

        /* Placeholder styling */
        .transaction-portal-form-container input::placeholder,
        .transaction-portal-form-container textarea::placeholder {
          color: #9ca3af !important;
          opacity: 0.8 !important;
        }

        /* Focus states for form fields */
        .transaction-portal-form-container input:focus,
        .transaction-portal-form-container select:focus,
        .transaction-portal-form-container textarea:focus,
        .transaction-portal-form-container [data-radix-select-trigger]:focus,
        .transaction-portal-form-container [role="combobox"]:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
          background-color: white !important;
        }

        /* Fix for any remaining dark text elements */
        .transaction-portal-form-container .text-gray-800,
        .transaction-portal-form-container .text-gray-700,
        .transaction-portal-form-container .text-gray-600,
        .transaction-portal-form-container .text-gray-500,
        .transaction-portal-form-container .text-blue-800,
        .transaction-portal-form-container .text-blue-700,
        .transaction-portal-form-container .text-blue-600 {
          color: white !important;
        }

        /* Fix for percentage and dollar signs */
        .transaction-portal-form-container .absolute.right-3,
        .transaction-portal-form-container .absolute.left-3 {
          color: rgba(255, 255, 255, 0.7) !important;
        }

        /* Fix for error text to remain red but visible */
        .transaction-portal-form-container .text-red-500 {
          color: #f87171 !important;
        }

        /* Fix for required asterisks */
        .transaction-portal-form-container .text-red-500 {
          color: #fca5a5 !important;
        }

        /* Ultra-high specificity fixes for tf- classes */
        .transaction-portal-form-container .tf-heading-secondary,
        .transaction-portal-form-container .tf-heading-tertiary,
        .transaction-portal-form-container .tf-text-subtitle,
        .transaction-portal-form-container .tf-label,
        .transaction-portal-form-container .tf-checkbox-label,
        .transaction-portal-form-container .tf-help-text {
          color: white !important;
        }

        /* Fix for links in dark background */
        .transaction-portal-form-container .tf-link,
        .transaction-portal-form-container a {
          color: #93c5fd !important;
        }

        .transaction-portal-form-container .tf-link:hover,
        .transaction-portal-form-container a:hover {
          color: #bfdbfe !important;
        }

        /* Enhanced role selection card styling */
        .transaction-portal-form-container .tf-role-card {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 2px solid rgba(59, 130, 246, 0.5) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .transaction-portal-form-container .tf-role-card:hover {
          transform: translateY(-4px) scale(1.02) !important;
          border-color: rgba(59, 130, 246, 0.8) !important;
          box-shadow: 0 12px 25px rgba(59, 130, 246, 0.25) !important;
          background: rgba(255, 255, 255, 1) !important;
        }

        .transaction-portal-form-container .tf-role-card.selected {
          border-color: #3b82f6 !important;
          background: rgba(219, 234, 254, 0.95) !important;
          transform: translateY(-2px) scale(1.03) !important;
          box-shadow: 0 16px 30px rgba(59, 130, 246, 0.3) !important;
        }

        /* ULTRA-HIGH SPECIFICITY FIXES: Force form content to be visible and properly styled */
        html body .transaction-portal-form-container .transaction-form-premium .tf-step-content .tf-section-glass-card .tf-role-card,
        html body .transaction-portal-form-container .tf-role-card,
        html body div.transaction-portal-form-container div.transaction-form-premium div.tf-step-content div.tf-section-glass-card div.tf-role-card {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 2px solid rgba(59, 130, 246, 0.5) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          min-height: 170px !important;
          padding: 1.25rem !important;
          cursor: pointer !important;
          color: #1e40af !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: relative !important;
          z-index: 10 !important;
        }

        /* Force all form sections to be visible */
        html body .transaction-portal-form-container .transaction-form-premium,
        html body .transaction-portal-form-container .tf-step-content,
        html body .transaction-portal-form-container .tf-section-glass-card,
        html body .transaction-portal-form-container .tf-section-header {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          overflow: visible !important;
          position: relative !important;
          z-index: 1 !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Force role cards grid to be visible */
        html body .transaction-portal-form-container .tf-role-cards {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
          gap: 1rem !important;
          width: 100% !important;
          margin: 1rem 0 !important;
        }

        /* Force all text content to be visible on dark background */
        html body .transaction-portal-form-container .tf-section-header h2,
        html body .transaction-portal-form-container .tf-section-header p,
        html body .transaction-portal-form-container label,
        html body .transaction-portal-form-container span,
        html body .transaction-portal-form-container div {
          color: white !important;
        }

        /* Force form inputs to have white background and dark text */
        html body .transaction-portal-form-container input,
        html body .transaction-portal-form-container select,
        html body .transaction-portal-form-container textarea {
          background: white !important;
          color: #1e3a8a !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 0.375rem !important;
          padding: 0.5rem 0.75rem !important;
        }

        /* Force navigation buttons to be visible */
        html body .transaction-portal-form-container .tf-form-navigation {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          width: 100% !important;
          margin-top: 2rem !important;
          padding: 1rem !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.5rem !important;
        }

        html body .transaction-portal-form-container .tf-button {
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          padding: 0.5rem 1rem !important;
          border-radius: 0.375rem !important;
          cursor: pointer !important;
        }

        /* CRITICAL: Fix glass card styling to show proper transparency */
        .hero-glass-card.transaction-form-card {
          background: rgba(30, 58, 138, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset !important;
          color: white !important;
          position: relative !important;
          overflow: visible !important;
        }

        /* ULTRA-HIGH SPECIFICITY: Override any conflicting glass card styles */
        html body div.transaction-portal-page div.container div.grid div.xl\\:col-span-9 div.hero-glass-card.transaction-form-card[data-transaction-card="true"],
        html body div.transaction-portal-page div.container div.grid div.xl\\:col-span-9 div.glass-card-navy[data-transaction-card="true"],
        html body div.transaction-portal-page div.container div.grid div.xl\\:col-span-9 div[data-transaction-card="true"].hero-glass-card {
          background: rgba(30, 58, 138, 0.85) !important;
          background-color: rgba(30, 58, 138, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
        }

        /* NUCLEAR OPTION: Maximum specificity override */
        html body div.transaction-portal-page div.container.px-4.md\\:px-6.lg\\:px-8.mx-auto.transaction-page-container.w-full div.grid.grid-cols-1.xl\\:grid-cols-12.gap-8.xl\\:gap-12 div.xl\\:col-span-9.transaction-form-card-container.w-full.mt-4.xl\\:mt-0.xl\\:ml-6 div.hero-glass-card.transaction-form-card.relative.p-4.md\\:p-6[data-glass-card="true"][data-transaction-card="true"] {
          background: rgba(30, 58, 138, 0.85) !important;
          background-color: rgba(30, 58, 138, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset !important;
        }

        /* ULTIMATE OVERRIDE: ID-based targeting with maximum specificity */
        html body div.transaction-portal-page div.container div.grid div.xl\\:col-span-9 div#transaction-glass-card-unique.hero-glass-card.transaction-form-card[data-glass-card="true"][data-transaction-card="true"] {
          background: rgba(30, 58, 138, 0.85) !important;
          background-color: rgba(30, 58, 138, 0.85) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
        }
      `}</style>
      <GlobalPageHero
        minHeight="auto"
        className="transaction-portal-page"
        overlayOpacity="bg-black/85"
        overlayColor="from-blue-900/95 via-blue-900/90 to-blue-900/95"
      >
      <motion.div
        className="container px-4 md:px-6 lg:px-8 mx-auto transaction-page-container w-full portal-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.2, 0.0, 0.2, 1.0],
            delay: 0.05
          }
        }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
          {/* Left Side - Information Panel (reduced width for better form space) */}
          <motion.div
            className="xl:col-span-3 flex flex-col justify-center space-y-6 portal-sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.0, 0.2, 1.0] }}
          >
            {/* Logo and Title */}
            <div className="text-center xl:text-left">
              <div className="flex justify-center xl:justify-start mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-gold rounded-lg opacity-0 group-hover:opacity-75 blur transition duration-300" />
                  <img
                    src={Logo}
                    alt="PA Real Estate Support Services"
                    className="h-16 relative"
                  />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Transaction Intake Form
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Submit your real estate transaction details quickly and securely
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Digital Processing</h3>
                  <p className="text-blue-100 text-sm">
                    Streamlined digital workflow for faster transaction processing
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Secure & Compliant</h3>
                  <p className="text-blue-100 text-sm">
                    Bank-level security with full regulatory compliance
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Real-time Updates</h3>
                  <p className="text-blue-100 text-sm">
                    Track your transaction status with live notifications
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
                  <p className="text-blue-100 text-sm">
                    Professional guidance throughout the entire process
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats section */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-blue-100">Support Available</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Fast</p>
                <p className="text-xs text-blue-100">Processing Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">Secure</p>
                <p className="text-xs text-blue-100">Data Protection</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Transaction Form Card (expanded for better usability with increased spacing) */}
          <motion.div
            className="xl:col-span-9 transaction-form-card-container w-full mt-4 xl:mt-0 xl:ml-6 portal-form-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.0, 0.2, 1.0] }}
          >
            <div
              className="hero-glass-card transaction-form-card transaction-glass-card-fixed relative p-4 md:p-6 form-card"
              data-glass-card="true"
              data-transaction-card="true"
              id="transaction-glass-card-unique"
              style={{
                height: 'auto',
                minHeight: '600px',
                maxHeight: 'none',
                overflow: 'visible',
                background: 'rgba(30, 58, 138, 0.85)',
                backgroundColor: 'rgba(30, 58, 138, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.75rem',
                boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2) inset'
              }}
            >
              <div className="relative">
                {/* Transaction Form Container */}
                <div className="transaction-portal-form-container">
                  <TransactionForm />
                </div>

                {/* Footer */}
                <div className="transaction-portal-footer mt-4 pt-3 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">Secure</p>
                      <p className="text-xs text-blue-100">SSL Encrypted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">Support</p>
                      <p className="text-xs text-blue-100">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </GlobalPageHero>
    </>
  );
};
