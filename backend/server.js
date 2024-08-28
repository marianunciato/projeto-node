const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  const userId = crypto.randomUUID();
  console.log(`Client connected, assigned userId: ${userId}`);

  ws.send(JSON.stringify({ userId, type: "config" }))

  ws.on('message', (msg) => {
    console.log('Message received from client:', msg);

    try {
      const messageObject = JSON.parse(msg);
      messageObject.type = "message";

      const messageToSend = JSON.stringify(messageObject);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageToSend);
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  });

  ws.on('close', () => {
    console.log(`User with userId ${userId} disconnected.`);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});