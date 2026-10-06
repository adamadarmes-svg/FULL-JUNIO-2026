import { LIMITES } from '../config/constantes.js';

const PATRON_NOMBRE = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ _-]+$/;

export const limpiarTexto = (texto) => String(texto ?? '').trim().replace(/\s+/g, ' ');

export const validarNombre = (nombre) => {
  if (typeof nombre !== 'string' || !nombre.trim()) {
    return { valido: false, error: 'Falta el nombre' };
  }
  const limpio = nombre.trim();
  if (limpio.length < LIMITES.NOMBRE_MIN || limpio.length > LIMITES.NOMBRE_MAX) {
    return {
      valido: false,
      error: `${LIMITES.NOMBRE_MIN} a ${LIMITES.NOMBRE_MAX} caracteres`
    };
  }
  if (!PATRON_NOMBRE.test(limpio)) {
    return {
      valido: false,
      error: 'Caracteres no válidos'
    };
  }
  return { valido: true, error: null };
};

export const validarMensaje = (texto) => {
  if (typeof texto !== 'string' || !texto.trim()) {
    return { valido: false, error: 'Mensaje vacío' };
  }
  if (texto.trim().length > LIMITES.MENSAJE_MAX) {
    return {
      valido: false,
      error: `Máximo ${LIMITES.MENSAJE_MAX} caracteres`
    };
  }
  return { valido: true, error: null };
};
