const express = require('express')
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

ws.on('message', (msg) => {
    wss.emit('message', msg);
  });

 ws.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});