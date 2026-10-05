import { get, post } from './api'

export const registrar = (nombre, email, password) =>
  post('/auth/registro', { nombre, email, password })

export const iniciarSesion = (email, password) =>
  post('/auth/login', { email, password })

export const obtenerPerfil = () => get('/auth/perfil')
