import { WebSocket } from 'ws';
import { serializar, listaUsuarios } from '../utils/mensajes.js';
import { listarUsuarios, obtenerCliente } from '../models/salaModel.js';

export const enviarA = (ws, objeto) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(serializar(objeto));
  }
};

export const difundir = (wss, objeto, excluir = null) => {
  const datos = serializar(objeto);
  wss.clients.forEach((cliente) => {
    if (cliente !== excluir && cliente.readyState === WebSocket.OPEN && obtenerCliente(cliente)) {
      cliente.send(datos);
    }
  });
};

export const difundirUsuarios = (wss) => {
  difundir(wss, listaUsuarios(listarUsuarios()));
};
