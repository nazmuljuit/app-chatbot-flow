import { Handle, Position } from "reactflow";

export default function StartNode() {
  return (
    <div className="bg-green-500 text-white px-4 py-2 rounded-xl">
      Start
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
