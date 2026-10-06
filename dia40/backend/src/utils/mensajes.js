import { randomUUID } from 'node:crypto';
import { TIPOS } from '../config/constantes.js';

const crearBase = (tipo) => ({
  tipo,
  id: randomUUID(),
  timestamp: new Date().toISOString()
});

export const mensajeChat = (usuario, texto) => ({ ...crearBase(TIPOS.MENSAJE), usuario, texto });

export const mensajeSistema = (texto) => ({ ...crearBase(TIPOS.SISTEMA), texto });

export const listaUsuarios = (usuarios) => ({ ...crearBase(TIPOS.USUARIOS), usuarios });

export const historial = (mensajes) => ({ ...crearBase(TIPOS.HISTORIAL), mensajes });

export const mensajeError = (texto) => ({ ...crearBase(TIPOS.ERROR), texto });

export const serializar = (objeto) => JSON.stringify(objeto);

export const deserializar = (cadena) => {
  try {
    return JSON.parse(cadena);
  } catch {
    return null;
  }
};
