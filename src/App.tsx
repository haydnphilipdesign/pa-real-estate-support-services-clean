import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange';

// Pages (individual imports)
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import WorkWithMe from './pages/WorkWithMe';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import AgentPortal from './pages/AgentPortal';

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

