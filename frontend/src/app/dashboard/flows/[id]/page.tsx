"use client";

import { useEffect } from "react";
import { useFlowStore } from "@/store/flowStore";
import FlowCanvas from "@/components/flow/FlowCanvas";
import NodePanel from "@/components/flow/NodePanel";

export default function FlowBuilderPage() {
  const { setNodes } = useFlowStore();

  useEffect(() => {
    setNodes([
      {
        id: "1",
        type: "start",
        position: { x: 250, y: 50 },
        data: {},
      },
    ]);
  }, []);

  return (
    <div className="flex h-screen">
      <NodePanel />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          Chatbot Flow Builder
        </h1>
        <FlowCanvas />
      </div>
    </div>
  );
}
