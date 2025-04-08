
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

interface AddAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apps: any[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectApp: (app: any) => void;
}

const AddAppDialog: React.FC<AddAppDialogProps> = ({
  open,
  onOpenChange,
  apps,
  searchTerm,
  onSearchChange,
  onSelectApp
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add App to Flowchart</DialogTitle>
        </DialogHeader>
        
        <Command>
          <CommandInput 
            placeholder="Search for apps..."
            value={searchTerm}
            onValueChange={onSearchChange}
          />
          <CommandList>
            <CommandEmpty>No apps found.</CommandEmpty>
            <CommandGroup>
              {apps.map((app) => (
                <CommandItem
                  key={app.id}
                  onSelect={() => onSelectApp(app)}
                  className="flex items-center"
                >
                  <img 
                    src={app.logoUrl} 
                    alt={app.title}
                    className="w-6 h-6 mr-2 object-contain" 
                  />
                  <span>{app.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppDialog;
