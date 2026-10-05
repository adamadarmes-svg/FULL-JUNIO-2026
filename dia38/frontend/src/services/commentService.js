import { get, post, put, del } from './api'

export const listarComentarios = (postId) => get(`/posts/${postId}/comments`)

export const crearComentario = (postId, contenido) =>
  post(`/posts/${postId}/comments`, { contenido })

export const actualizarComentario = (postId, comentarioId, contenido) =>
  put(`/posts/${postId}/comments/${comentarioId}`, { contenido })

export const eliminarComentario = (postId, comentarioId) =>
  del(`/posts/${postId}/comments/${comentarioId}`)
