import React from "react";
import { UnifiedTransactionForm } from "./UnifiedTransactionForm";
import { ensureCssImported } from "../FixedCssImport";

// Ensure CSS is imported
ensureCssImported();

/**
 * TransactionForm - TurboTax-style Transaction Form
 * 
 * Clean, modern transaction form with step-by-step guidance
 * and intuitive user experience similar to TurboTax online service.
 */
export function TransactionForm() {
  return <UnifiedTransactionForm className="w-full max-w-4xl mx-auto" />;
}

export default TransactionForm;
