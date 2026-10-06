import { randomUUID } from 'node:crypto';
import { LIMITES } from '../config/constantes.js';

const clientes = new Map();
let mensajes = [];

export const agregarCliente = (ws, nombre) => {
  const datos = { id: randomUUID(), nombre, conectadoEn: new Date().toISOString() };
  clientes.set(ws, datos);
  return datos;
};

export const eliminarCliente = (ws) => {
  const datos = clientes.get(ws);
  if (!datos) return null;
  clientes.delete(ws);
  return datos;
};

export const obtenerCliente = (ws) => clientes.get(ws) ?? null;

export const nombreEnUso = (nombre) => {
  const buscado = nombre.toLowerCase();
  return [...clientes.values()].some((cliente) => cliente.nombre.toLowerCase() === buscado);
};

export const listarUsuarios = () =>
  [...clientes.values()]
    .map(({ id, nombre, conectadoEn }) => ({ id, nombre, conectadoEn }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

export const totalUsuarios = () => clientes.size;

export const salaLlena = () => clientes.size >= LIMITES.USUARIOS_MAX;

export const guardarEnHistorial = (mensaje) => {
  mensajes.push(mensaje);
  if (mensajes.length > LIMITES.HISTORIAL_MAX) {
    mensajes = mensajes.slice(-LIMITES.HISTORIAL_MAX);
  }
};

export const obtenerHistorial = () => [...mensajes];
// se me olvido usar esta aquí no me dio tiempo.
export const obtenerClientesWs = () => [...clientes.keys()];
