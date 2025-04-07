
import React from 'react';
import { App } from '@/lib/db-types';
import AppCard from './AppCard';

interface AppGridProps {
  apps: App[];
  emptyMessage?: React.ReactNode;
}

const AppGrid: React.FC<AppGridProps> = ({ apps, emptyMessage = "No apps found" }) => {
  if (apps.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-muted-foreground"
          >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
          </svg>
        </div>
        <div className="text-xl font-medium text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
      {/* Decorative elements for design enhancement */}
      <div className="absolute -z-10 top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      
      {apps.map((app) => (
        <div key={app.id} className="transform transition-all duration-300 hover:translate-y-[-4px]">
          <AppCard app={app} />
        </div>
      ))}
    </div>
  );
};

export default AppGrid;
