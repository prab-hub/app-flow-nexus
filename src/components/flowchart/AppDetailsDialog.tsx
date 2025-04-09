
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import AppCategorySelector, { AppCategory } from './AppCategorySelector';

interface AppDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedApp: any;
  isEditing: boolean;
  onDelete: (item: { type: string, id: string }) => void;
  apps: any[];
  appCategory: AppCategory;
  onCategoryChange: (appId: string, category: AppCategory) => void;
}

const AppDetailsDialog: React.FC<AppDetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedApp,
  isEditing,
  onDelete,
  apps,
  appCategory,
  onCategoryChange
}) => {
  if (!selectedApp) return null;

  const handleDeleteClick = () => {
    onDelete({ type: 'node', id: selectedApp.id });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img 
              src={selectedApp.logoUrl} 
              alt={selectedApp.title}
              className="w-6 h-6 object-contain" 
            />
            {selectedApp.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm">{selectedApp.description}</p>
          
          {selectedApp.connectedApps?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Integrates with:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApp.connectedApps.map(appId => {
                  const app = apps.find(a => a.id === appId);
                  return app ? (
                    <div key={app.id} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                      <img src={app.logoUrl} alt={app.title} className="w-4 h-4 object-contain" />
                      {app.title}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {selectedApp.childAppIds?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Includes:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApp.childAppIds.map(appId => {
                  const app = apps.find(a => a.id === appId);
                  return app ? (
                    <div key={app.id} className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-full">
                      <img src={app.logoUrl} alt={app.title} className="w-4 h-4 object-contain" />
                      {app.title}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {selectedApp.replacementOptions?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Can be replaced by:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApp.replacementOptions.map(appId => {
                  const app = apps.find(a => a.id === appId);
                  return app ? (
                    <div key={app.id} className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded-full">
                      <img src={app.logoUrl} alt={app.title} className="w-4 h-4 object-contain" />
                      {app.title}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {isEditing && (
            <AppCategorySelector 
              selectedCategory={appCategory} 
              onChange={(category) => onCategoryChange(selectedApp.id, category)} 
            />
          )}
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(selectedApp.websiteUrl, '_blank')}
              className="w-full"
            >
              Visit Website
            </Button>
          </div>
          
          {isEditing && (
            <div className="pt-2">
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleDeleteClick}
                className="w-full flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Remove from Flowchart
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDetailsDialog;
