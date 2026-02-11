"use client";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback, useRef } from "react";
import { useFlowStore } from "@/store/flowStore";
import StartNode from "./nodes/StartNode";
import MessageNode from "./nodes/MessageNode";
import EndNode from "./nodes/EndNode";

const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  end: EndNode,
};

let id = 2;
const getId = () => `${id++}`;

function FlowCanvasInner() {
  const { nodes, edges, setNodes } = useFlowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  const onConnect = useCallback(
    (params: Connection) =>
      setRfEdges((eds) => addEdge(params, eds)),
    [setRfEdges]
  );

  // 🔥 Handle Drop
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setRfNodes((nds) => nds.concat(newNode));
      setNodes([...rfNodes, newNode]);
    },
    [rfNodes, setRfNodes, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      className="w-full h-[80vh] bg-gray-50"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
