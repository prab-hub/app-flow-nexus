
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemToDelete: { type: string, id: string };
  onConfirmDelete: () => void;
  onDeleteBundleOnly?: () => void;
  onDeleteEntireBundle?: () => void;
  isBundleWithChildren?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onOpenChange,
  itemToDelete,
  onConfirmDelete,
  onDeleteBundleOnly,
  onDeleteEntireBundle,
  isBundleWithChildren = false
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogDescription>
            {isBundleWithChildren 
              ? "This is a bundle with child apps. What would you like to remove?"
              : `Are you sure you want to remove this ${itemToDelete.type === 'node' ? 'app' : 'connection'} from the flowchart?`
            }
          </DialogDescription>
        </DialogHeader>
        
        {isBundleWithChildren ? (
          <div className="space-y-3">
            <Button 
              variant="outline" 
              onClick={onDeleteBundleOnly}
              className="w-full"
            >
              Remove bundle only (keep child apps)
            </Button>
            <Button 
              variant="destructive" 
              onClick={onDeleteEntireBundle}
              className="w-full"
            >
              Remove entire bundle with all child apps
            </Button>
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <DialogFooter className="flex flex-row justify-between sm:justify-between">
            <Button 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={onConfirmDelete}
            >
              Remove
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
