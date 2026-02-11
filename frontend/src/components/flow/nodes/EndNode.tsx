import { Handle, Position } from "reactflow";

export default function EndNode() {
  return (
    <div className="bg-red-500 text-white px-4 py-2 rounded-xl">
      End
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
