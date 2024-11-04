// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let clientId = 0; // Счётчик для уникальных ID клиентов

server.on('connection', (ws) => {
  ws.id = clientId++; // Назначаем уникальный ID для каждого клиента

  ws.on('message', (message) => {
    // Отправляем сообщение только другим клиентам
    server.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${ws.id}: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`);
  });
});

console.log("WebSocket сервер запущен на ws://localhost:8080");
