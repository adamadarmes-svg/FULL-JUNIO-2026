import { get, post, put, del } from './api'

export function listarPosts({ page, limit, autor } = {}) {
  const params = new URLSearchParams()
  if (page) params.set('page', page)
  if (limit) params.set('limit', limit)
  if (autor) params.set('autor', autor)

  const query = params.toString()
  return get(`/posts${query ? `?${query}` : ''}`)
}

export const obtenerPost = (id) => get(`/posts/${id}`)

export const crearPost = ({ titulo, contenido, imagen }) =>
  post('/posts', { titulo, contenido, imagen })

export const actualizarPost = (id, datos) => put(`/posts/${id}`, datos)

export const eliminarPost = (id) => del(`/posts/${id}`)
