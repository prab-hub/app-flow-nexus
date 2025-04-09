
import { useState, useCallback, useMemo } from 'react';
import { useNodesState, useEdgesState, addEdge, Node, Edge } from '@xyflow/react';
import { useAppContext } from '@/context/AppContext';
import { AppCategory } from '@/components/flowchart/AppCategorySelector';

interface EdgeStyle {
  stroke: string;
  strokeDasharray?: string;
}

interface NodeData {
  label: React.ReactNode;
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

  const getNodeStyleForCategory = (appId: string, appCategories: Record<string, AppCategory>, isBundle: boolean): React.CSSProperties => {
    const category = appCategories[appId] || 'none';
    let borderColor = isBundle ? '#93c5fd' : '#e5e7eb';
    let backgroundColor = isBundle ? '#f0f9ff' : '#ffffff';
    
    switch (category) {
      case 'need':
        borderColor = '#10b981'; // emerald-500
        backgroundColor = '#ecfdf5'; // emerald-50
        break;
      case 'want':
        borderColor = '#3b82f6'; // blue-500
        backgroundColor = '#eff6ff'; // blue-50
        break;
      case 'toBuy':
        borderColor = '#f59e0b'; // amber-500
        backgroundColor = '#fffbeb'; // amber-50
        break;
      case 'ending':
        borderColor = '#ef4444'; // red-500
        backgroundColor = '#fef2f2'; // red-50
        break;
      case 'favorite':
        borderColor = '#8b5cf6'; // purple-500
        backgroundColor = '#f5f3ff'; // purple-50
        break;
      default:
        // Use default styles
        break;
    }
    
    return {
      width: 150,
      background: backgroundColor,
      border: `2px solid ${borderColor}`, // Make border thicker for better visibility
      padding: '10px',
      borderRadius: '8px'
    };
  };

  const updateNodesStyle = useCallback((appCategories: Record<string, AppCategory>) => {
    console.log("Updating node styles with categories:", appCategories);
    setNodes(nodes => nodes.map(node => {
      const app = apps.find(a => a.id === node.id);
      if (app) {
        console.log(`Updating style for node ${node.id}, category: ${appCategories[node.id] || 'none'}`);
        return {
          ...node,
          style: getNodeStyleForCategory(node.id, appCategories, app.isBundle)
        };
      }
      return node;
    }));
  }, [apps, setNodes]);

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

  const displayBundleChildApps = useCallback((bundleApp, appCategories = {}) => {
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
            label: `${childApp.title}` 
          },
          position: { x, y },
          style: getNodeStyleForCategory(childApp.id, appCategories, false)
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

  const handleAddBundleNode = useCallback((app, appCategories = {}) => {
    console.log(`Adding bundle node for app: ${app.id}`, app);
    
    setNodes([]);
    setEdges([]);
    
    const bundleNode = {
      id: app.id,
      type: 'default',
      data: { 
        label: `${app.title}`
      },
      position: { x: 400, y: 300 },
      style: getNodeStyleForCategory(app.id, appCategories, true)
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
              label: `${childApp.title}`
            },
            position: { x, y },
            style: getNodeStyleForCategory(childApp.id, appCategories, false)
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

  const handleAddNode = useCallback((app, appCategories = {}) => {
    const xPos = Math.random() * 500 + 100;
    const yPos = Math.random() * 500 + 100;

    const newNode = {
      id: app.id,
      type: 'default',
      data: { 
        label: `${app.title}`
      },
      position: { x: xPos, y: yPos },
      style: getNodeStyleForCategory(app.id, appCategories, app.isBundle)
    };

    setNodes(nds => [...nds, newNode]);
    
    if (app.isBundle && app.childAppIds && app.childAppIds.length > 0) {
      const updatedNodes = [...nodes, newNode];
      const bundleNodeExists = updatedNodes.some(n => n.id === app.id);
      console.log(`Bundle node ${app.id} exists after adding? ${bundleNodeExists}`);
      
      if (bundleNodeExists) {
        displayBundleChildApps(app, appCategories);
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

  const handleDeleteBundleOnly = useCallback((bundleId) => {
    // Find all child nodes (preserve them)
    const bundleApp = apps.find(app => app.id === bundleId);
    if (!bundleApp || !bundleApp.childAppIds) return;

    // Remove just the bundle node
    setNodes(nodes => nodes.filter(node => node.id !== bundleId));
    
    // Remove edges connected to the bundle node but leave child nodes
    setEdges(edges => edges.filter(edge => edge.source !== bundleId));
    
    console.log(`Removed bundle ${bundleId} but kept its children`);
  }, [apps, setNodes, setEdges]);

  const handleDeleteEntireBundle = useCallback((bundleId) => {
    // Find all child nodes
    const bundleApp = apps.find(app => app.id === bundleId);
    if (!bundleApp || !bundleApp.childAppIds) return;

    // Remove the bundle node AND all child nodes
    setNodes(nodes => nodes.filter(node => 
      node.id !== bundleId && !bundleApp.childAppIds.includes(node.id)
    ));
    
    // Remove all edges connected to bundle and its children
    setEdges(edges => edges.filter(edge => 
      edge.source !== bundleId && 
      !bundleApp.childAppIds.includes(edge.source) &&
      !bundleApp.childAppIds.includes(edge.target)
    ));
    
    console.log(`Removed entire bundle ${bundleId} with all children`);
  }, [apps, setNodes, setEdges]);

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
    handleDeleteBundleOnly,
    handleDeleteEntireBundle,
    handleCreateConnection,
    resetFlow,
    selectedBundleId,
    showAppsCircle,
    edgeType,
    setEdgeType,
    updateNodesStyle,
    getNodeStyleForCategory
  };
};
