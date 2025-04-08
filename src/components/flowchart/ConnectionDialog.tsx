
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

interface ConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apps: any[];
  nodes: any[];
  connectionSource: string | null;
  setConnectionSource: (id: string | null) => void;
  connectionTarget: string | null;
  setConnectionTarget: (id: string | null) => void;
  edgeType: string;
  setEdgeType: (type: string) => void;
  onCreateConnection: () => void;
}

const ConnectionDialog: React.FC<ConnectionDialogProps> = ({
  open,
  onOpenChange,
  apps,
  nodes,
  connectionSource,
  setConnectionSource,
  connectionTarget,
  setConnectionTarget,
  edgeType,
  setEdgeType,
  onCreateConnection
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Connection</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Source App</h3>
              <Command className="rounded-md border">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No apps found</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {nodes.map((node) => {
                      const app = apps.find(a => a.id === node.id);
                      return app ? (
                        <CommandItem
                          key={app.id}
                          onSelect={() => setConnectionSource(app.id)}
                          className={`flex items-center ${connectionSource === app.id ? 'bg-muted' : ''}`}
                        >
                          <img 
                            src={app.logoUrl} 
                            alt={app.title}
                            className="w-5 h-5 mr-2 object-contain" 
                          />
                          <span className="text-xs">{app.title}</span>
                        </CommandItem>
                      ) : null;
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Target App</h3>
              <Command className="rounded-md border">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No apps found</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {nodes.map((node) => {
                      const app = apps.find(a => a.id === node.id);
                      return app && app.id !== connectionSource ? (
                        <CommandItem
                          key={app.id}
                          onSelect={() => setConnectionTarget(app.id)}
                          className={`flex items-center ${connectionTarget === app.id ? 'bg-muted' : ''}`}
                        >
                          <img 
                            src={app.logoUrl} 
                            alt={app.title}
                            className="w-5 h-5 mr-2 object-contain" 
                          />
                          <span className="text-xs">{app.title}</span>
                        </CommandItem>
                      ) : null;
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Connection Type</h3>
            <div className="flex flex-col gap-2">
              <Button 
                variant={edgeType === 'integrate' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => setEdgeType('integrate')}
                size="sm"
              >
                <div className="w-4 h-0.5 bg-[#64748b] mr-2"></div>
                Integrates with
              </Button>
              
              <Button 
                variant={edgeType === 'bundle' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => setEdgeType('bundle')}
                size="sm"
              >
                <div className="w-4 h-0.5 bg-[#3b82f6] mr-2"></div>
                Bundle relationship
              </Button>
              
              <Button 
                variant={edgeType === 'replace' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => setEdgeType('replace')}
                size="sm"
              >
                <div className="w-4 h-0.5 bg-[#f43f5e] border-t border-dashed mr-2"></div>
                Replaces
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={onCreateConnection}
              disabled={!connectionSource || !connectionTarget}
            >
              Create Connection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionDialog;
