import { get } from './api'

export function obtenerProductos(signal) {
  return get('/products', signal)
}

export function obtenerMenu(signal) {
  return get('/menu', signal)
}
