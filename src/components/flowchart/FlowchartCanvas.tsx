import React, { useRef, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  ConnectionLineType,
  Panel,
  useReactFlow,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowchartContextMenu from './FlowchartContextMenu';
import { useAppContext } from '@/context/AppContext';

interface FlowchartCanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
  onNodeClick: any;
  onEdgeClick: any;
  isEditing: boolean;
  resetFlow: () => void;
  setIsEditing: (value: boolean) => void;
  setIsAddingNode: (value: boolean) => void;
  setConnectDialogOpen: (value: boolean) => void;
  onDeleteNode: (id: string) => void;
  onDeleteBundleOnly: (id: string) => void;
  onDeleteEntireBundle: (id: string) => void;
}

const CustomNode = ({ 
  id, 
  data, 
  isConnectable, 
  onDeleteNode,
  onDeleteBundleOnly,
  onDeleteEntireBundle,
  ...props 
}) => {
  const { apps } = useAppContext();
  const app = apps.find(app => app.id === id);
  const isBundle = app?.isBundle || false;
  const hasChildApps = app?.childAppIds?.length > 0 || false;
  
  const nodeContent = (
    <div style={props.style} className="custom-node">
      {data.label}
    </div>
  );

  return (
    <FlowchartContextMenu
      nodeId={id}
      isBundle={isBundle}
      hasChildApps={hasChildApps}
      onDeleteNode={onDeleteNode}
      onDeleteBundleOnly={onDeleteBundleOnly}
      onDeleteEntireBundle={onDeleteEntireBundle}
    >
      {nodeContent}
    </FlowchartContextMenu>
  );
};

const FlowchartCanvas: React.FC<FlowchartCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onEdgeClick,
  isEditing,
  resetFlow,
  setIsEditing,
  setIsAddingNode,
  setConnectDialogOpen,
  onDeleteNode,
  onDeleteBundleOnly,
  onDeleteEntireBundle
}) => {
  const reactFlowWrapper = useRef(null);
  const { fitView } = useReactFlow();

  const nodeTypes = {
    default: useCallback(props => (
      <CustomNode 
        {...props} 
        onDeleteNode={onDeleteNode}
        onDeleteBundleOnly={onDeleteBundleOnly}
        onDeleteEntireBundle={onDeleteEntireBundle}
      />
    ), [onDeleteNode, onDeleteBundleOnly, onDeleteEntireBundle])
  };

  const handleNodesChange = (changes) => {
    onNodesChange(changes);
    setTimeout(() => fitView({ padding: 0.2 }), 50);
  };

  return (
    <div className="bg-background border rounded-lg h-[70vh]" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        deleteKeyCode="Delete"
      >
        <Panel position="top-left" className="bg-background p-3 rounded-md shadow-sm border">
          <div className="text-sm mb-2">
            <span className="font-semibold">Connections:</span>
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
        
        <FlowchartControls 
          isEditing={isEditing}
          resetFlow={resetFlow}
          setIsEditing={setIsEditing}
          setIsAddingNode={setIsAddingNode}
          setConnectDialogOpen={setConnectDialogOpen}
        />
        
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
};

const FlowchartControls = ({ 
  isEditing, 
  resetFlow, 
  setIsEditing, 
  setIsAddingNode, 
  setConnectDialogOpen 
}) => {
  return (
    <Panel position="top-right" className="flex gap-2">
      <button 
        className="px-2 py-1 rounded-md text-sm bg-background border shadow-sm hover:bg-muted transition-colors"
        onClick={resetFlow}
      >
        Reset
      </button>
      <button 
        className={`px-2 py-1 rounded-md text-sm flex items-center gap-1 ${isEditing ? 'bg-primary text-primary-foreground' : 'bg-background border'} shadow-sm hover:bg-muted transition-colors`}
        onClick={() => setIsEditing(!isEditing)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        {isEditing ? "Exit Edit Mode" : "Edit"}
      </button>
      {isEditing && (
        <>
          <button 
            className="px-2 py-1 rounded-md text-sm bg-background border shadow-sm hover:bg-muted transition-colors flex items-center gap-1"
            onClick={() => setIsAddingNode(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add App
          </button>
          <button 
            className="px-2 py-1 rounded-md text-sm bg-background border shadow-sm hover:bg-muted transition-colors flex items-center gap-1"
            onClick={() => setConnectDialogOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            Connect
          </button>
        </>
      )}
    </Panel>
  );
};

export default FlowchartCanvas;
