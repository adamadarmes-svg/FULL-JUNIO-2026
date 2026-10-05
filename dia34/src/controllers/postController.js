import { obtenerPosts, obtenerPostPorId, filtrarPostsPorAutor } from '@/models/postModel'

export async function listarPosts() {
  return { ok: true, data: obtenerPosts() }
}

export async function buscarPost(id) {
  if (id === undefined || id === null || String(id).trim() === '') {
    return { ok: false, error: 'Falta el id del post' }
  }
  if (!/^\d+$/.test(String(id))) {
    return { ok: false, error: 'El id del post debe ser un número' }
  }
  const post = obtenerPostPorId(id)
  if (!post) {
    return { ok: false, error: `No existe ningún post con el id ${id}` }
  }
  return { ok: true, data: post }
}

export async function listarPostsDeAutor(autor) {
  if (!autor || String(autor).trim() === '') {
    return { ok: false, error: 'Falta el nombre del autor' }
  }
  return { ok: true, data: filtrarPostsPorAutor(autor) }
}
