
import { useState, useCallback, useMemo } from 'react';
import { useNodesState, useEdgesState, addEdge, Node, Edge } from '@xyflow/react';
import { useAppContext } from '@/context/AppContext';

interface EdgeStyle {
  stroke: string;
  strokeDasharray?: string;
}

export const useFlowchart = () => {
  const { apps } = useAppContext();
  const [edgeType, setEdgeType] = useState('default');
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [showAppsCircle, setShowAppsCircle] = useState(false);
  
  const initialNodes = useMemo(() => [], []);
  const initialEdges = useMemo(() => [], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const bundleApps = useMemo(() => {
    return apps.filter(app => app.isBundle);
  }, [apps]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(
      { ...params, type: 'smoothstep', animated: edgeType === 'bundle' },
      eds
    )),
    [setEdges, edgeType]
  );

  const handleEdgeTypeChange = useCallback((type) => {
    setEdgeType(type);
    
    return (selectedEdge) => {
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
    };
  }, [setEdges]);

  const displayBundleChildApps = useCallback((bundleApp) => {
    if (!bundleApp.childAppIds || bundleApp.childAppIds.length === 0) {
      console.log(`Bundle app ${bundleApp.id} has no child apps`);
      return;
    }
    
    console.log(`Displaying child apps for bundle: ${bundleApp.id}`, bundleApp.childAppIds);
    
    const bundleNode = nodes.find(node => node.id === bundleApp.id);
    if (!bundleNode) {
      console.log("Could not find bundle node in nodes array");
      return;
    }
    
    const existingChildNodeIds = nodes
      .filter(node => edges.some(edge => edge.source === bundleApp.id && edge.target === node.id))
      .map(node => node.id);
    
    console.log("Existing child node IDs:", existingChildNodeIds);
    
    const childNodesToAdd = [];
    const childEdgesToAdd = [];
    
    const radius = 250;
    const childAppIds = bundleApp.childAppIds.filter(id => !existingChildNodeIds.includes(id));
    const childCount = childAppIds.length;
    
    const centerX = bundleNode.position.x;
    const centerY = bundleNode.position.y;
    
    childAppIds.forEach((childId, index) => {
      const childApp = apps.find(a => a.id === childId);
      if (childApp) {
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
        
        childNodesToAdd.push(childNode);
        
        childEdgesToAdd.push({
          id: `${bundleApp.id}-${childApp.id}`,
          source: bundleApp.id,
          target: childApp.id,
          animated: true,
          style: { stroke: '#3b82f6' } as EdgeStyle
        });
      }
    });
    
    console.log(`Adding ${childNodesToAdd.length} new child nodes and ${childEdgesToAdd.length} edges`);
    
    if (childNodesToAdd.length > 0) {
      setNodes(currentNodes => [...currentNodes, ...childNodesToAdd]);
      setEdges(currentEdges => [...currentEdges, ...childEdgesToAdd]);
    }
  }, [apps, nodes, edges, setNodes, setEdges]);

  const handleAddBundleNode = useCallback((app) => {
    console.log(`Adding bundle node for app: ${app.id}`, app);
    
    setNodes([]);
    setEdges([]);
    
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
    
    if (app.childAppIds && app.childAppIds.length > 0) {
      const childNodes = [];
      const childEdges = [];
      
      const radius = 250;
      const childCount = app.childAppIds.length;
      
      app.childAppIds.forEach((childId, index) => {
        const childApp = apps.find(a => a.id === childId);
        if (childApp) {
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
          
          childEdges.push({
            id: `${app.id}-${childApp.id}`,
            source: app.id,
            target: childApp.id,
            animated: true,
            style: { stroke: '#3b82f6' } as EdgeStyle
          });
        }
      });
      
      console.log(`Adding ${childNodes.length} child nodes and ${childEdges.length} edges for initial bundle`);
      
      if (childNodes.length > 0) {
        setNodes(currentNodes => [...currentNodes, ...childNodes]);
        setEdges(childEdges);
      }
    }
  }, [apps, setNodes, setEdges]);

  const handleAddNode = useCallback((app) => {
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
    
    if (app.isBundle && app.childAppIds && app.childAppIds.length > 0) {
      const updatedNodes = [...nodes, newNode];
      const bundleNodeExists = updatedNodes.some(n => n.id === app.id);
      console.log(`Bundle node ${app.id} exists after adding? ${bundleNodeExists}`);
      
      if (bundleNodeExists) {
        displayBundleChildApps(app);
      }
    }
    
    return newNode;
  }, [nodes, setNodes, displayBundleChildApps]);

  const handleDeleteNode = useCallback((itemToDelete) => {
    if (itemToDelete.type === 'node') {
      setNodes(nodes => nodes.filter(node => node.id !== itemToDelete.id));
      setEdges(edges => edges.filter(edge => 
        edge.source !== itemToDelete.id && edge.target !== itemToDelete.id
      ));
    } else if (itemToDelete.type === 'edge') {
      setEdges(edges => edges.filter(edge => edge.id !== itemToDelete.id));
    }
  }, [setNodes, setEdges]);

  const handleCreateConnection = useCallback((connectionSource, connectionTarget, type) => {
    if (connectionSource && connectionTarget) {
      let style: EdgeStyle = { stroke: '#64748b' };
      let animated = false;
      let label = '';
      let labelStyle = null;
      
      switch(type) {
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
      return true;
    }
    return false;
  }, [setEdges]);

  const resetFlow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedBundleId(null);
    setShowAppsCircle(false);
  }, [setNodes, setEdges]);

  return {
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
    selectedBundleId,
    showAppsCircle,
    edgeType,
    setEdgeType
  };
};
