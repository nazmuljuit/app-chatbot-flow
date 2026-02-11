import { Node, Edge } from "reactflow";

export type FlowNode = Node;
export type FlowEdge = Edge;

export interface FlowData {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  isActive: boolean;
}
