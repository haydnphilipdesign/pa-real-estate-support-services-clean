import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange';

// Pages (explicit .tsx import to avoid EISDIR on Vercel)
import {
  Home,
  AboutUs,
  Services,
  WorkWithMe,
  Privacy,
  Terms,
  Login,
  AgentPortal
} from './pages/index.tsx';

import { CleanPortalTransactionForm } from './components/TransactionForm/CleanPortalTransactionForm';

const App: React.FC = () => {
  return (
    <Layout>
      <ScrollToTopOnRouteChange />
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent-portal" element={<AgentPortal />} />
          <Route
            path="/agent-portal/transaction"
            element={<CleanPortalTransactionForm />}
          />
        </Routes>
      </main>
      
      <Footer />
    </Layout>
  );
};

export default App;

