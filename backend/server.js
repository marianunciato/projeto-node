const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const requestIp = require('request-ip');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const ws = new WebSocket('ws://172.19.37.206:3001')

wss.on('connection', (ws, req) => {
  const ip = requestIp.getClientIp(req);
  const userId = uuidv4();
  console.log(`Client connected from IP: ${ip}, assigned userId: ${userId}`);

  ws.on('message', (msg) => {
    console.log('Message received from client:', msg);

    const messageObject = JSON.parse(msg);
    messageObject.userId = userId;
    messageObject.ip = ip;

    const messageToSend = JSON.stringify(messageObject);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageToSend);
      }
    });
  });

  ws.on('close', () => {
    console.log(`User with userId ${userId} disconnected from IP: ${ip}`);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
