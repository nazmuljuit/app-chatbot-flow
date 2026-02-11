"use client";

export default function NodePanel() {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      nodeType
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 bg-white border-r p-4 space-y-3">
      <h2 className="font-bold text-lg mb-4">Nodes</h2>

      <div
        className="p-3 bg-green-100 rounded cursor-grab"
        onDragStart={(e) => onDragStart(e, "start")}
        draggable
      >
        Start Node
      </div>

      <div
        className="p-3 bg-blue-100 rounded cursor-grab"
        onDragStart={(e) => onDragStart(e, "message")}
        draggable
      >
        Message Node
      </div>

      <div
        className="p-3 bg-red-100 rounded cursor-grab"
        onDragStart={(e) => onDragStart(e, "end")}
        draggable
      >
        End Node
      </div>
    </aside>
  );
}
