
import { useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';

export const useFlowchartDialogs = () => {
  const { apps } = useAppContext();
  const [selectedApp, setSelectedApp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [openEdgeDialog, setOpenEdgeDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: '', id: '' });
  const [connectionSource, setConnectionSource] = useState(null);
  const [connectionTarget, setConnectionTarget] = useState(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);

  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onNodeClick = useCallback((_, node, apps, isEditing, nodes, edges, displayBundleChildApps) => {
    if (!isEditing) {
      const appData = apps.find(app => app.id === node.id);
      if (appData) {
        setSelectedApp(appData);
        setOpenDialog(true);
      }
    } else {
      const appData = apps.find(app => app.id === node.id);
      if (appData && appData.isBundle) {
        console.log(`Node clicked: ${node.id}, appData:`, appData);
        
        const childNodesExist = appData.childAppIds && appData.childAppIds.some(childId => 
          nodes.some(n => n.id === childId) && 
          edges.some(e => e.source === appData.id && e.target === childId)
        );
        
        console.log(`Child nodes exist? ${childNodesExist}`);
        
        if (!childNodesExist) {
          const nodeExists = nodes.some(n => n.id === appData.id);
          console.log(`Node exists in nodes array? ${nodeExists}`);
          
          if (nodeExists) {
            displayBundleChildApps(appData);
          } else {
            console.error(`Cannot find node ${appData.id} in nodes array:`, nodes);
          }
        }
      }
    }
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    if (isEditing) {
      event.stopPropagation();
      setSelectedEdge(edge);
      setOpenEdgeDialog(true);
    }
  }, [isEditing]);

  return {
    selectedApp,
    setSelectedApp,
    openDialog,
    setOpenDialog,
    isEditing,
    setIsEditing,
    searchTerm,
    setSearchTerm,
    isAddingNode,
    setIsAddingNode,
    selectedEdge,
    setSelectedEdge,
    openEdgeDialog,
    setOpenEdgeDialog,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    itemToDelete,
    setItemToDelete,
    connectionSource,
    setConnectionSource,
    connectionTarget,
    setConnectionTarget,
    connectDialogOpen,
    setConnectDialogOpen,
    filteredApps,
    onNodeClick,
    onEdgeClick
  };
};
