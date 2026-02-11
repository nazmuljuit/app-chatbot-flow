import { Handle, Position } from "reactflow";

export default function MessageNode({ data }: any) {
  return (
    <div className="bg-blue-500 text-white px-4 py-2 rounded-xl">
      {data.label || "Message"}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
