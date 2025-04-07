import React, { useState, useCallback, useMemo, useRef } from 'react';
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
  Panel,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import { Plus, Pencil, Trash, ArrowRight } from 'lucide-react';
import '@xyflow/react/dist/style.css';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

// Define proper edge style type to include strokeDasharray
interface EdgeStyle {
  stroke: string;
  strokeDasharray?: string;
}

const FlowchartPage = () => {
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
  const [edgeType, setEdgeType] = useState('default');
  const [connectionSource, setConnectionSource] = useState(null);
  const [connectionTarget, setConnectionTarget] = useState(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [showAppsCircle, setShowAppsCircle] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState(null);
  const reactFlowWrapper = useRef(null);
  
  // Generate initial nodes - now empty array
  const initialNodes = useMemo(() => [], []);

  // Generate initial edges - now empty array
  const initialEdges = useMemo(() => [], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(
      { ...params, type: 'smoothstep', animated: edgeType === 'bundle' },
      eds
    )),
    [setEdges, edgeType]
  );

  // Get bundle apps
  const bundleApps = useMemo(() => {
    return apps.filter(app => app.isBundle);
  }, [apps]);

  const onNodeClick = useCallback((_, node) => {
    if (!isEditing) {
      const appData = apps.find(app => app.id === node.id);
      if (appData) {
        setSelectedApp(appData);
        setOpenDialog(true);
      }
    } else {
      // In edit mode, when clicking on a bundle app node, display its child apps
      const appData = apps.find(app => app.id === node.id);
      if (appData && appData.isBundle) {
        displayBundleChildApps(appData);
      }
    }
  }, [apps, isEditing]);

  const onEdgeClick = useCallback((event, edge) => {
    if (isEditing) {
      event.stopPropagation();
      setSelectedEdge(edge);
      setOpenEdgeDialog(true);
    }
  }, [isEditing]);

  const filteredApps = useMemo(() => {
    return apps.filter(app => 
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [apps, searchTerm]);

  // Display a bundle's child apps in a circle
  const displayBundleChildApps = useCallback((bundleApp) => {
    if (!bundleApp.childAppIds || bundleApp.childAppIds.length === 0) {
      return;
    }
    
    // Check if child nodes are already displayed
    const childNodesExist = nodes.some(node => 
      bundleApp.childAppIds.includes(node.id) && 
      edges.some(edge => edge.source === bundleApp.id && edge.target === node.id)
    );
    
    if (childNodesExist) {
      return; // Child nodes are already displayed
    }
    
    const childNodes = [];
    const childEdges = [];
    
    const radius = 250;
    const childCount = bundleApp.childAppIds.length;
    
    // Get the bundle node position
    const bundleNode = nodes.find(node => node.id === bundleApp.id);
    if (!bundleNode) return;
    
    const centerX = bundleNode.position.x;
    const centerY = bundleNode.position.y;
    
    bundleApp.childAppIds.forEach((childId, index) => {
      const childApp = apps.find(a => a.id === childId);
      if (childApp) {
        // Calculate position in a circle around the bundle
        const angle = (index / childCount) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const childNode = {
          id: childApp.id,
          type: 'default',
          data: { 
            label: (
              <div className="flex flex-col items-center">
                <img 
                  src={childApp.logoUrl} 
                  alt={childApp.title}
                  className="w-8 h-8 mb-1 object-contain"
                />
                <div className="text-sm font-medium">{childApp.title}</div>
              </div>
            ) 
          },
          position: { x, y },
          style: {
            width: 150,
            background: '#ffffff',
            border: '1px solid #e5e7eb'
          }
        };
        
        childNodes.push(childNode);
        
        // Add edge from bundle to child
        childEdges.push({
          id: `${bundleApp.id}-${childApp.id}`,
          source: bundleApp.id,
          target: childApp.id,
          animated: true,
          style: { stroke: '#3b82f6' } as EdgeStyle
        });
      }
    });
    
    setNodes(nodes => [...nodes, ...childNodes]);
    setEdges(edges => [...edges, ...childEdges]);
  }, [apps, nodes, edges, setNodes, setEdges]);

  // Add a bundle node to the center
  const handleAddBundleNode = useCallback((app) => {
    // Clear existing nodes and edges
    setNodes([]);
    setEdges([]);
    
    // Add the bundle node at center
    const bundleNode = {
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
      position: { x: 400, y: 300 },
      style: {
        width: 150,
        background: '#f0f9ff',
        border: '1px solid #93c5fd'
      }
    };
    
    setNodes([bundleNode]);
    setSelectedBundleId(app.id);
    setShowAppsCircle(true);
    
    // If the app has childAppIds, show them in a circle
    if (app.childAppIds && app.childAppIds.length > 0) {
      const childNodes = [];
      const childEdges = [];
      
      const radius = 250;
      const childCount = app.childAppIds.length;
      
      app.childAppIds.forEach((childId, index) => {
        const childApp = apps.find(a => a.id === childId);
        if (childApp) {
          // Calculate position in a circle around the bundle
          const angle = (index / childCount) * 2 * Math.PI;
          const x = 400 + radius * Math.cos(angle);
          const y = 300 + radius * Math.sin(angle);
          
          const childNode = {
            id: childApp.id,
            type: 'default',
            data: { 
              label: (
                <div className="flex flex-col items-center">
                  <img 
                    src={childApp.logoUrl} 
                    alt={childApp.title}
                    className="w-8 h-8 mb-1 object-contain"
                  />
                  <div className="text-sm font-medium">{childApp.title}</div>
                </div>
              ) 
            },
            position: { x, y },
            style: {
              width: 150,
              background: '#ffffff',
              border: '1px solid #e5e7eb'
            }
          };
          
          childNodes.push(childNode);
          
          // Add edge from bundle to child
          childEdges.push({
            id: `${app.id}-${childApp.id}`,
            source: app.id,
            target: childApp.id,
            animated: true,
            style: { stroke: '#3b82f6' } as EdgeStyle
          });
        }
      });
      
      setNodes(nodes => [...nodes, ...childNodes]);
      setEdges(childEdges);
    }
  }, [apps, setNodes, setEdges]);

  const handleAddNode = useCallback((app) => {
    // Calculate a position that's not occupied by other nodes
    const xPos = Math.random() * 500 + 100;
    const yPos = Math.random() * 500 + 100;

    const newNode = {
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
      position: { x: xPos, y: yPos },
      style: {
        width: 150,
        background: app.isBundle ? '#f0f9ff' : '#ffffff',
        border: app.isBundle ? '1px solid #93c5fd' : '1px solid #e5e7eb'
      }
    };

    setNodes(nds => [...nds, newNode]);
    setIsAddingNode(false);
    
    // If it's a bundle app, automatically display its child apps
    if (app.isBundle && app.childAppIds && app.childAppIds.length > 0) {
      // We need to wait for the node to be added before we can display its child apps
      setTimeout(() => {
        displayBundleChildApps(app);
      }, 100);
    }
  }, [setNodes, displayBundleChildApps]);

  const handleDeleteNode = useCallback(() => {
    if (itemToDelete.type === 'node') {
      setNodes(nodes => nodes.filter(node => node.id !== itemToDelete.id));
      // Also remove associated edges
      setEdges(edges => edges.filter(edge => 
        edge.source !== itemToDelete.id && edge.target !== itemToDelete.id
      ));
    } else if (itemToDelete.type === 'edge') {
      setEdges(edges => edges.filter(edge => edge.id !== itemToDelete.id));
    }
    setDeleteConfirmOpen(false);
  }, [itemToDelete, setNodes, setEdges]);

  const handleEdgeTypeChange = useCallback((type) => {
    setEdgeType(type);
    
    if (selectedEdge) {
      setEdges(eds => eds.map(ed => {
        if (ed.id === selectedEdge.id) {
          let style: EdgeStyle = { ...ed.style } as EdgeStyle;
          let animated = false;
          
          switch(type) {
            case 'integrate':
              style.stroke = '#64748b';
              style.strokeDasharray = undefined;
              animated = false;
              break;
            case 'bundle':
              style.stroke = '#3b82f6';
              style.strokeDasharray = undefined;
              animated = true;
              break;
            case 'replace':
              style.stroke = '#f43f5e';
              style.strokeDasharray = '5,5';
              animated = false;
              break;
          }
          
          return {
            ...ed,
            animated,
            style,
            label: type === 'replace' ? 'Replaces' : '',
            labelStyle: type === 'replace' ? { fill: '#f43f5e', fontWeight: 500 } : null
          };
        }
        return ed;
      }));
    }
    
    setOpenEdgeDialog(false);
  }, [selectedEdge, setEdges]);

  const handleCreateConnection = useCallback(() => {
    if (connectionSource && connectionTarget) {
      let style: EdgeStyle = { stroke: '#64748b' };
      let animated = false;
      let label = '';
      let labelStyle = null;
      
      switch(edgeType) {
        case 'integrate':
          style.stroke = '#64748b';
          break;
        case 'bundle':
          style.stroke = '#3b82f6';
          animated = true;
          break;
        case 'replace':
          style.stroke = '#f43f5e';
          style.strokeDasharray = '5,5';
          label = 'Replaces';
          labelStyle = { fill: '#f43f5e', fontWeight: 500 };
          break;
      }
      
      const newEdge = {
        id: `${connectionSource}-${connectionTarget}-${Date.now()}`,
        source: connectionSource,
        target: connectionTarget,
        animated,
        style,
        label,
        labelStyle
      };
      
      setEdges(eds => [...eds, newEdge]);
      setConnectionSource(null);
      setConnectionTarget(null);
      setConnectDialogOpen(false);
    }
  }, [connectionSource, connectionTarget, edgeType, setEdges]);

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
          {nodes.length === 0 && (
            <div className="bg-background border rounded-lg h-[70vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold mb-4">Start by selecting a bundle app</h2>
              <div className="flex flex-wrap gap-4 max-w-3xl justify-center">
                {bundleApps.map(app => (
                  <Button 
                    key={app.id} 
                    variant="outline" 
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => handleAddBundleNode(app)}
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
            </div>
          )}
          
          {nodes.length > 0 && (
            <div className="bg-background border rounded-lg h-[70vh]" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                deleteKeyCode="Delete"
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
                
                <Panel position="top-right" className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => {
                      setNodes([]);
                      setEdges([]);
                      setSelectedBundleId(null);
                      setShowAppsCircle(false);
                    }}
                  >
                    Reset
                  </Button>
                  <Button 
                    size="sm" 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    {isEditing ? "Exit Edit Mode" : "Edit"}
                  </Button>
                  {isEditing && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setIsAddingNode(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add App
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setConnectDialogOpen(true)}
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    </>
                  )}
                </Panel>
                
                <Controls />
                <MiniMap />
                <Background />
              </ReactFlow>
            </div>
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
              
              {isEditing && (
                <div className="pt-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setItemToDelete({ type: 'node', id: selectedApp.id });
                      setDeleteConfirmOpen(true);
                      setOpenDialog(false);
                    }}
                    className="w-full"
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Remove from Flowchart
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add App Dialog */}
      <Dialog open={isAddingNode} onOpenChange={setIsAddingNode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add App to Flowchart</DialogTitle>
          </DialogHeader>
          
          <Command>
            <CommandInput 
              placeholder="Search for apps..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty>No apps found.</CommandEmpty>
              <CommandGroup>
                {filteredApps.map((app) => (
                  <CommandItem
                    key={app.id}
                    onSelect={() => handleAddNode(app)}
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
      
      {/* Edge Edit Dialog */}
      <Dialog open={openEdgeDialog} onOpenChange={setOpenEdgeDialog}>
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
                onClick={() => handleEdgeTypeChange('integrate')}
              >
                <div className="w-4 h-0.5 bg-[#64748b] mr-2"></div>
                Integrates with
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleEdgeTypeChange('bundle')}
              >
                <div className="w-4 h-0.5 bg-[#3b82f6] mr-2"></div>
                Bundle relationship
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => handleEdgeTypeChange('replace')}
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
                    setItemToDelete({ type: 'edge', id: selectedEdge.id });
                    setDeleteConfirmOpen(true);
                    setOpenEdgeDialog(false);
                  }
                }}
                className="w-full"
              >
                <Trash className="h-4 w-4 mr-1" />
                Remove Connection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Create Connection Dialog */}
      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
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
              <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateConnection}
                disabled={!connectionSource || !connectionTarget}
              >
                Create Connection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemToDelete.type === 'node' ? 'Remove App' : 'Remove Connection'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this {itemToDelete.type === 'node' ? 'app' : 'connection'} from the flowchart?
              This will only remove it from this visualization, not from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNode} className="bg-destructive text-destructive-foreground">
              <Trash className="h-4 w-4 mr-1" /> 
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default FlowchartPage;
