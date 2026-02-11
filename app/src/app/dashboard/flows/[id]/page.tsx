import FlowCanvas from "@/components/flow/FlowCanvas";

export default function FlowBuilderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Chatbot Flow Builder
      </h1>
      <FlowCanvas />
    </div>
  );
}
