import { WebSocketServer } from 'ws';
import { TIPOS, INTERVALO_PING } from '../config/constantes.js';
import { deserializar, mensajeError } from '../utils/mensajes.js';
import { enviarA } from '../controllers/messageController.js';
import { manejarEntrar, manejarMensaje, manejarDesconexion } from './handlers.js';

export default function iniciarWebSocket(servidorHttp) {
  const wss = new WebSocketServer({ server: servidorHttp });

  wss.on('connection', (ws, req) => {
    console.log(`Nueva conexión desde ${req.socket.remoteAddress}`);
    ws.estaVivo = true;

    ws.on('message', (mensaje) => {
      const datos = deserializar(mensaje.toString());
      if (!datos || typeof datos !== 'object') {
        enviarA(ws, mensajeError('Formato inválido'));
        return;
      }

      switch (datos.tipo) {
        case TIPOS.ENTRAR:
          manejarEntrar(wss, ws, datos);
          break;
        case TIPOS.MENSAJE:
          manejarMensaje(wss, ws, datos);
          break;
        case TIPOS.PING:
          enviarA(ws, { tipo: TIPOS.PONG, timestamp: new Date().toISOString() });
          break;
        default:
          enviarA(ws, mensajeError('Tipo desconocido'));
      }
    });

    ws.on('pong', () => {
      ws.estaVivo = true;
    });

    ws.on('close', () => {
      manejarDesconexion(wss, ws);
    });

    ws.on('error', (error) => {
      console.error('Error en la conexión WebSocket:', error.message);
    });
  });

  const intervalo = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.estaVivo === false) {
        ws.terminate();
        return;
      }
      ws.estaVivo = false;
      ws.ping();
    });
  }, INTERVALO_PING);

  wss.on('close', () => {
    clearInterval(intervalo);
  });

  return wss;
}
