import {
  obtenerCategorias,
  obtenerCategoriaPorNombre,
  obtenerPostDeCategoria,
  obtenerPostsDestacados,
} from '@/models/blogModel'

export async function listarCategorias() {
  return { ok: true, data: obtenerCategorias() }
}

export async function listarDestacados() {
  return { ok: true, data: obtenerPostsDestacados() }
}

export async function buscarPostDelBlog(categoria, slug) {
  if (!categoria || String(categoria).trim() === '') {
    return { ok: false, error: 'Falta la categoría' }
  }
  if (!slug || String(slug).trim() === '') {
    return { ok: false, error: 'Falta el artículo' }
  }
  if (!obtenerCategoriaPorNombre(categoria)) {
    return { ok: false, error: `No existe la categoría "${categoria}"` }
  }
  const post = obtenerPostDeCategoria(categoria, slug)
  if (!post) {
    return { ok: false, error: `No hay ningún artículo "${slug}" en ${categoria}` }
  }
  return { ok: true, data: post }
}
