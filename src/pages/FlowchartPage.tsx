
import React, { useState, useCallback, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const FlowchartPage = () => {
  const { apps } = useAppContext();
  const [selectedApp, setSelectedApp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  // Find apps with connection data
  const appsWithConnections = useMemo(() => {
    return apps.filter(app => app.connectedApps?.length > 0 || app.childAppIds?.length > 0);
  }, [apps]);

  // Generate nodes from apps
  const initialNodes = useMemo(() => {
    return apps.map((app, index) => {
      // Calculate position to spread the nodes
      const row = Math.floor(index / 5);
      const column = index % 5;
      
      return {
        id: app.id,
        type: 'default',
        data: { 
          label: (
            <div className="flex flex-col items-center">
              <img 
                src={app.logoUrl} 
                alt={app.title}
                className="w-8 h-8 mb-1 object-contain"
              />
              <div className="text-sm font-medium">{app.title}</div>
            </div>
          ) 
        },
        position: { x: column * 200 + 100, y: row * 150 + 100 },
        style: {
          width: 150,
          background: app.isBundle ? '#f0f9ff' : '#ffffff',
          border: app.isBundle ? '1px solid #93c5fd' : '1px solid #e5e7eb'
        }
      };
    });
  }, [apps]);

  // Generate edges from connections
  const initialEdges = useMemo(() => {
    const edges = [];
    apps.forEach(app => {
      // Add edges for explicit connections
      if (app.connectedApps?.length > 0) {
        app.connectedApps.forEach(targetId => {
          edges.push({
            id: `${app.id}-${targetId}`,
            source: app.id,
            target: targetId,
            animated: false,
            style: { stroke: '#64748b' }
          });
        });
      }
      
      // Add edges for parent-child relationships
      if (app.childAppIds?.length > 0) {
        app.childAppIds.forEach(childId => {
          edges.push({
            id: `${app.id}-${childId}`,
            source: app.id,
            target: childId,
            animated: true,
            style: { stroke: '#3b82f6' }
          });
        });
      }
      
      // Add edges for replacement apps
      if (app.replacementFor) {
        edges.push({
          id: `replacement-${app.id}-${app.replacementFor}`,
          source: app.id,
          target: app.replacementFor,
          animated: false,
          style: { stroke: '#f43f5e', strokeDasharray: '5,5' },
          label: 'Replaces',
          labelStyle: { fill: '#f43f5e', fontWeight: 500 }
        });
      }
    });
    return edges;
  }, [apps]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(
      { ...params, type: 'smoothstep', animated: false },
      eds
    )),
    [setEdges]
  );

  const onNodeClick = useCallback((_, node) => {
    const appData = apps.find(app => app.id === node.id);
    if (appData) {
      setSelectedApp(appData);
      setOpenDialog(true);
    }
  }, [apps]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">App Relationships Flowchart</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Visualize how different applications connect and work together. See replacement options and bundle relationships.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-8">
          <div className="bg-background border rounded-lg h-[70vh]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
            >
              <Panel position="top-left" className="bg-background p-3 rounded-md shadow-sm border">
                <div className="text-sm mb-2">
                  <span className="font-semibold">Legend:</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#3b82f6]"></div>
                    <span className="text-xs">Bundle relationship</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#64748b]"></div>
                    <span className="text-xs">Integrates with</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#f43f5e] border-t border-dashed"></div>
                    <span className="text-xs">Replaces</span>
                  </div>
                </div>
              </Panel>
              <Controls />
              <MiniMap />
              <Background />
            </ReactFlow>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Click on any app to see more details. Drag to reposition. Connect apps to show relationships.</p>
          </div>
        </div>
      </main>

      {/* App Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedApp && (
                <>
                  <img 
                    src={selectedApp.logoUrl} 
                    alt={selectedApp.title}
                    className="w-6 h-6 object-contain" 
                  />
                  {selectedApp.title}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-4">
              <p className="text-sm">{selectedApp.description}</p>
              
              {/* Connected Apps */}
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
              
              {/* Child Apps */}
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
              
              {/* Replacement Options */}
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
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default FlowchartPage;
