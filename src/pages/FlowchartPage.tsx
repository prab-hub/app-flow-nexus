
import React, { useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAppContext } from '@/context/AppContext';
import { useFlowchart } from '@/hooks/useFlowchart';
import { useFlowchartDialogs } from '@/hooks/useFlowchartDialogs';

// Components
import FlowchartCanvas from '@/components/flowchart/FlowchartCanvas';
import BundleSelector from '@/components/flowchart/BundleSelector';
import AppDetailsDialog from '@/components/flowchart/AppDetailsDialog';
import AddAppDialog from '@/components/flowchart/AddAppDialog';
import EdgeEditDialog from '@/components/flowchart/EdgeEditDialog';
import ConnectionDialog from '@/components/flowchart/ConnectionDialog';
import DeleteConfirmDialog from '@/components/flowchart/DeleteConfirmDialog';

const FlowchartPage = () => {
  const { apps } = useAppContext();
  
  const {
    nodes,
    edges,
    bundleApps,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleEdgeTypeChange,
    displayBundleChildApps,
    handleAddBundleNode,
    handleAddNode,
    handleDeleteNode,
    handleCreateConnection,
    resetFlow,
    edgeType,
    setEdgeType
  } = useFlowchart();
  
  const {
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
    onNodeClick: baseOnNodeClick,
    onEdgeClick
  } = useFlowchartDialogs();

  // Wrapping callbacks to pass the right context
  const onNodeClick = useCallback((event, node) => {
    baseOnNodeClick(event, node, apps, isEditing, nodes, edges, displayBundleChildApps);
  }, [baseOnNodeClick, apps, isEditing, nodes, edges, displayBundleChildApps]);

  const handleEdgeTypeChangeWithSelected = useCallback((type) => {
    const handler = handleEdgeTypeChange(type);
    handler(selectedEdge);
    setOpenEdgeDialog(false);
  }, [handleEdgeTypeChange, selectedEdge, setOpenEdgeDialog]);

  const handleAddNodeAndClose = useCallback((app) => {
    handleAddNode(app);
    setIsAddingNode(false);
  }, [handleAddNode, setIsAddingNode]);

  const handleCreateConnectionAndClose = useCallback(() => {
    if (handleCreateConnection(connectionSource, connectionTarget, edgeType)) {
      setConnectionSource(null);
      setConnectionTarget(null);
      setConnectDialogOpen(false);
    }
  }, [handleCreateConnection, connectionSource, connectionTarget, edgeType, setConnectionSource, setConnectionTarget, setConnectDialogOpen]);

  const handleConfirmDelete = useCallback(() => {
    handleDeleteNode(itemToDelete);
    setDeleteConfirmOpen(false);
  }, [handleDeleteNode, itemToDelete, setDeleteConfirmOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">App Relationships Flowchart</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Visualize how different applications connect and work together. Click on any bundle app to see its components in a circle.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-8">
          {nodes.length === 0 ? (
            <BundleSelector bundleApps={bundleApps} onSelectBundle={handleAddBundleNode} />
          ) : (
            <FlowchartCanvas 
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              isEditing={isEditing}
              resetFlow={resetFlow}
              setIsEditing={setIsEditing}
              setIsAddingNode={setIsAddingNode}
              setConnectDialogOpen={setConnectDialogOpen}
            />
          )}
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>
              {isEditing 
                ? "Edit mode: Click apps to select, drag to reposition. Use buttons to add apps or create connections."
                : nodes.length > 0 
                  ? "Click on any app to see more details. Drag to reposition the view."
                  : "Select a bundle app above to see its components."
              }
            </p>
          </div>
        </div>
      </main>

      <AppDetailsDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        selectedApp={selectedApp}
        isEditing={isEditing}
        onDelete={setItemToDelete}
        apps={apps}
      />
      
      <AddAppDialog 
        open={isAddingNode}
        onOpenChange={setIsAddingNode}
        apps={filteredApps}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelectApp={handleAddNodeAndClose}
      />
      
      <EdgeEditDialog 
        open={openEdgeDialog}
        onOpenChange={setOpenEdgeDialog}
        onEdgeTypeChange={handleEdgeTypeChangeWithSelected}
        onDeleteEdge={setItemToDelete}
        selectedEdge={selectedEdge}
      />
      
      <ConnectionDialog 
        open={connectDialogOpen}
        onOpenChange={setConnectDialogOpen}
        apps={apps}
        nodes={nodes}
        connectionSource={connectionSource}
        setConnectionSource={setConnectionSource}
        connectionTarget={connectionTarget}
        setConnectionTarget={setConnectionTarget}
        edgeType={edgeType}
        setEdgeType={setEdgeType}
        onCreateConnection={handleCreateConnectionAndClose}
      />
      
      <DeleteConfirmDialog 
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        itemToDelete={itemToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
      
      <Footer />
    </div>
  );
};

export default FlowchartPage;
