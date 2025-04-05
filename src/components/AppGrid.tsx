
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
      <div className="py-12 text-center">
        {typeof emptyMessage === 'string' ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : (
          emptyMessage
        )}
      </div>
    );
  }

  return (
    <div className="app-grid">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
};

export default AppGrid;
