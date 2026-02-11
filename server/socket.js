const Flow = require("./models/Flow");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chat:start", async ({ flowId }) => {
      const flow = await Flow.findById(flowId);
      if (!flow) return;

      socket.data.flow = flow;
      socket.data.currentNode = flow.nodes.find(
        (n) => n.type === "start"
      );

      socket.emit("chat:reply", {
        text: "Chat started",
      });
    });

    socket.on("chat:message", async ({ text }) => {
      const flow = socket.data.flow;
      if (!flow) return;

      // Simple mock execution
      socket.emit("chat:reply", {
        text: "You said: " + text,
      });
    });
  });
};
