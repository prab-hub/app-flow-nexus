
import React from 'react';
import { Button } from '@/components/ui/button';

interface BundleSelectorProps {
  bundleApps: any[];
  onSelectBundle: (app: any) => void;
}

const BundleSelector: React.FC<BundleSelectorProps> = ({ bundleApps, onSelectBundle }) => {
  return (
    <div className="bg-background border rounded-lg h-[70vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Start by selecting a bundle app</h2>
      <div className="flex flex-wrap gap-4 max-w-3xl justify-center">
        {bundleApps.map(app => (
          <Button 
            key={app.id} 
            variant="outline" 
            className="flex flex-col items-center p-4 h-auto"
            onClick={() => onSelectBundle(app)}
          >
            <img 
              src={app.logoUrl} 
              alt={app.title}
              className="w-12 h-12 mb-2 object-contain" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (app.publisher) {
                  const companyLogoUrl = `/company-logos/${app.publisher.toLowerCase().replace(/\s+/g, '-')}.png`;
                  target.src = companyLogoUrl;
                  target.onerror = () => {
                    target.src = '/placeholder.svg';
                    target.onerror = null;
                  };
                } else {
                  target.src = '/placeholder.svg';
                }
              }}
            />
            <span>{app.title}</span>
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-8 max-w-md text-center">
        After adding apps to your flowchart, you can categorize them as needs, wants, favorites, and more by clicking on them in edit mode.
      </p>
    </div>
  );
};

export default BundleSelector;
