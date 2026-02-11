"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback } from "react";
import { useFlowStore } from "@/store/flowStore";

export default function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges } = useFlowStore();

  const [rfNodes, , onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params: Connection) => {
      setRfEdges((eds) => addEdge(params, eds));
    },
    [setRfEdges]
  );

  return (
    <div className="w-full h-[80vh] bg-gray-50">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
