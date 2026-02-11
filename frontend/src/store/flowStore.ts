import { create } from "zustand";
import { FlowNode, FlowEdge } from "@/types/flow";

interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  setNodes: (nodes: FlowNode[]) => void;
  setEdges: (edges: FlowEdge[]) => void;
  addNode: (node: FlowNode) => void;
  addEdge: (edge: FlowEdge) => void;
  reset: () => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) =>
    set((state) => ({ nodes: [...state.nodes, node] })),
  addEdge: (edge) =>
    set((state) => ({ edges: [...state.edges, edge] })),
  reset: () => set({ nodes: [], edges: [] }),
}));
