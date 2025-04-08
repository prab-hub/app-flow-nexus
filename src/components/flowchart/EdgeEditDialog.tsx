
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EdgeEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdgeTypeChange: (type: string) => void;
  onDeleteEdge: (item: { type: string, id: string }) => void;
  selectedEdge: any;
}

const EdgeEditDialog: React.FC<EdgeEditDialogProps> = ({
  open,
  onOpenChange,
  onEdgeTypeChange,
  onDeleteEdge,
  selectedEdge
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Connection</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm">
            <p>Choose connection type:</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => onEdgeTypeChange('integrate')}
            >
              <div className="w-4 h-0.5 bg-[#64748b] mr-2"></div>
              Integrates with
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => onEdgeTypeChange('bundle')}
            >
              <div className="w-4 h-0.5 bg-[#3b82f6] mr-2"></div>
              Bundle relationship
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => onEdgeTypeChange('replace')}
            >
              <div className="w-4 h-0.5 bg-[#f43f5e] border-t border-dashed mr-2"></div>
              Replaces
            </Button>
          </div>
          
          <div className="pt-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                if (selectedEdge) {
                  onDeleteEdge({ type: 'edge', id: selectedEdge.id });
                  onOpenChange(false);
                }
              }}
              className="w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Remove Connection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EdgeEditDialog;
