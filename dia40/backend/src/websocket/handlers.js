import {
  agregarCliente,
  eliminarCliente,
  obtenerCliente,
  nombreEnUso,
  salaLlena,
  guardarEnHistorial,
  obtenerHistorial
} from '../models/salaModel.js';
import { validarNombre, validarMensaje, limpiarTexto } from '../utils/validaciones.js';
import { mensajeChat, mensajeSistema, mensajeError, historial } from '../utils/mensajes.js';
import { enviarA, difundir, difundirUsuarios } from '../controllers/messageController.js';

export const manejarEntrar = (wss, ws, datos) => {
  if (obtenerCliente(ws)) {
    enviarA(ws, mensajeError('Ya estás dentro'));
    return;
  }

  const { valido, error } = validarNombre(datos.nombre);
  if (!valido) {
    enviarA(ws, mensajeError(error));
    return;
  }

  const nombre = limpiarTexto(datos.nombre);

  if (nombreEnUso(nombre)) {
    enviarA(ws, mensajeError(`${nombre} ya está en uso`));
    return;
  }

  if (salaLlena()) {
    enviarA(ws, mensajeError('Sala llena'));
    return;
  }

  agregarCliente(ws, nombre);
  console.log(`${nombre} ha entrado al chat`);
  enviarA(ws, historial(obtenerHistorial()));
  difundir(wss, mensajeSistema(`${nombre} entró`), ws);
  difundirUsuarios(wss);
};

export const manejarMensaje = (wss, ws, datos) => {
  const cliente = obtenerCliente(ws);
  if (!cliente) {
    enviarA(ws, mensajeError('Entra primero'));
    return;
  }

  const { valido, error } = validarMensaje(datos.texto);
  if (!valido) {
    enviarA(ws, mensajeError(error));
    return;
  }

  const mensaje = mensajeChat({ id: cliente.id, nombre: cliente.nombre }, limpiarTexto(datos.texto));
  guardarEnHistorial(mensaje);
  difundir(wss, mensaje);
};

export const manejarDesconexion = (wss, ws) => {
  const cliente = eliminarCliente(ws);
  if (!cliente) return;

  console.log(`${cliente.nombre} ha salido del chat`);
  difundir(wss, mensajeSistema(`${cliente.nombre} salió`));
  difundirUsuarios(wss);
};
