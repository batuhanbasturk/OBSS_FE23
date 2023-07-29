const WebSocket = require("ws");

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8490 });

// Event: When a new client connects
wss.on("connection", (ws) => {
  console.log("A client connected");

  // Event: When the server receives a message from the client
  ws.on("message", (message) => {
    console.log("Received message:", message);

    // Echo the message back to the client
    ws.send(`Server echoes: ${message}`);
  });

  // Event: When the client closes the connection
  ws.on("close", () => {
    console.log("A client disconnected");
  });
});

console.log("WebSocket server is running on port 8490");
