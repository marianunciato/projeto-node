const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  const userId = uuidv4();
  console.log(`Client connected, assigned userId: ${userId}`);

  // Envia uma mensagem de boas-vindas ao novo cliente com seu userId
  ws.send(JSON.stringify({ message: 'Welcome!', userId, timestamp: new Date().toISOString() }));

  ws.on('message', (msg) => {
    console.log('Message received from client:', msg);

    try {
      const messageObject = JSON.parse(msg);
      messageObject.userId = userId; // Adiciona o ID do usuário à mensagem
      messageObject.timestamp = new Date().toISOString(); // Adiciona o timestamp atual

      const messageToSend = JSON.stringify(messageObject);

      // Envia a mensagem para todos os clientes conectados
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageToSend);
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log(`User with userId ${userId} disconnected`);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});