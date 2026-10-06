import 'dotenv/config';
import http from 'node:http';
import app from './src/app.js';
import iniciarWebSocket from './src/websocket/server.js';

const PORT = process.env.PORT || 8080;

const servidor = http.createServer(app);

iniciarWebSocket(servidor);

servidor.listen(PORT, () => {
  console.log(`Servidor HTTP en http://localhost:${PORT}`);
  console.log(`Servidor WebSocket en ws://localhost:${PORT}`);
});
