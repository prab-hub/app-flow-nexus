
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Trash2 } from 'lucide-react';

interface FlowchartContextMenuProps {
  children: React.ReactNode;
  onDeleteNode: (id: string) => void;
  onDeleteBundleOnly: (id: string) => void;
  onDeleteEntireBundle: (id: string) => void;
  nodeId: string;
  isBundle: boolean;
  hasChildApps: boolean;
}

const FlowchartContextMenu: React.FC<FlowchartContextMenuProps> = ({
  children,
  onDeleteNode,
  onDeleteBundleOnly,
  onDeleteEntireBundle,
  nodeId,
  isBundle,
  hasChildApps
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {isBundle && hasChildApps ? (
          <>
            <ContextMenuItem 
              onClick={() => onDeleteBundleOnly(nodeId)}
              className="flex items-center gap-2 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Remove bundle only
            </ContextMenuItem>
            <ContextMenuItem 
              onClick={() => onDeleteEntireBundle(nodeId)}
              className="flex items-center gap-2 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Remove entire bundle
            </ContextMenuItem>
          </>
        ) : (
          <ContextMenuItem 
            onClick={() => onDeleteNode(nodeId)}
            className="flex items-center gap-2 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Remove from flowchart
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FlowchartContextMenu;
