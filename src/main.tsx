import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/animation-reset.css'; // Import animation reset styles
import './styles/consistent-header-fix.css'; // Import header consistency fixes
import './styles/header-fix-2025.css'; // Import latest header fixes for black background issue
import './utils/verify-changes.js'; // Verify changes are loaded
import ErrorBoundary from './components/ErrorBoundary';

// Configure future flags for React Router v7
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
