import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SingleVerification } from './components/SingleVerification';
import { BatchProcessing } from './components/BatchProcessing';
import { NavItem } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'single':
        return <SingleVerification />;
      case 'batch':
        return <BatchProcessing />;
      case 'docs':
        return (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Verification Guidelines & Protocols</h1>
            <div className="prose prose-slate max-w-none">
              <h3 className="text-lg font-semibold text-slate-800">PM Surya Ghar: Muft Bijli Yojana</h3>
              <p className="text-slate-600 mb-4">
                This automated system serves to validate the existence of rooftop solar installations for subsidy disbursement.
                The AI model utilizes high-resolution satellite imagery to identify photovoltaic arrays.
              </p>
              
              <h4 className="font-medium text-slate-800 mt-6">Acceptance Criteria</h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                <li>Confidence Score &gt; 85% is required for auto-approval.</li>
                <li>Confidence Score 50-85% requires manual review.</li>
                <li>Visible wiring or inverters increase confidence but are not mandatory for visual detection.</li>
              </ul>

              <h4 className="font-medium text-slate-800 mt-6">Data Privacy</h4>
              <p className="text-slate-600">
                All uploaded imagery is processed in volatile memory and not stored permanently unless flagged for audit.
                Geolocation data is encrypted at rest.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;