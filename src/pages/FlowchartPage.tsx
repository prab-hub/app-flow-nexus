
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const FlowchartPage = () => {
  const { apps } = useAppContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">App Flowchart</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Visualize how different applications connect and work together. This feature will be implemented in the next phase.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
            <div className="text-center p-8 max-w-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40 mx-auto">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
                <path d="M10 7h4" />
                <path d="M10 17h4" />
              </svg>
              <h2 className="text-xl font-bold mt-4">Coming Soon</h2>
              <p className="mt-2 text-muted-foreground">
                The flowchart visualization feature is under development and will be available in the next phase of the project.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FlowchartPage;
