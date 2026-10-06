export const TIPOS = {
  ENTRAR: 'entrar',
  MENSAJE: 'mensaje',
  USUARIOS: 'usuarios',
  SISTEMA: 'sistema',
  HISTORIAL: 'historial',
  ERROR: 'error',
}

export const LIMITES = {
  NOMBRE_MIN: 2,
  NOMBRE_MAX: 20,
  MENSAJE_MAX: 500,
}

export const ESTADOS = {
  CONECTANDO: 'conectando',
  CONECTADO: 'conectado',
  DESCONECTADO: 'desconectado',
  ERROR: 'error',
}

export const RECONEXION = {
  INTENTOS_MAX: 5,
  ESPERA_BASE: 1000,
  ESPERA_MAX: 15000,
}

export const STORAGE_KEY = 'dia40_nombre'
