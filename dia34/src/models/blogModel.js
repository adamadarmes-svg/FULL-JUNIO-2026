export const categorias = [
  {
    nombre: 'cocina',
    titulo: 'Cocina',
    posts: [
      {
        slug: 'tortilla-de-patatas',
        titulo: 'Tortilla de patatas',
        autor: 'carlos',
        lectura: '5 min',
        resumen: 'La receta de siempre, con cebolla y bien jugosa por dentro.',
      },
      {
        slug: 'batch-cooking',
        titulo: 'Cocinar para toda la semana',
        autor: 'ana',
        lectura: '7 min',
        resumen: 'Dos horas el domingo para tener las comidas resueltas hasta el viernes.',
      },
    ],
  },
  {
    nombre: 'hogar',
    titulo: 'Hogar',
    posts: [
      {
        slug: 'ordenar-el-armario',
        titulo: 'Ordenar el armario',
        autor: 'ana',
        lectura: '4 min',
        resumen: 'Cambio de temporada sin dramas: qué guardar, qué donar y qué dejar a mano.',
      },
    ],
  },
  {
    nombre: 'viajes',
    titulo: 'Viajes',
    posts: [
      {
        slug: 'escapada-de-fin-de-semana',
        titulo: 'Escapada de fin de semana',
        autor: 'gustavo',
        lectura: '6 min',
        resumen: 'Una mochila pequeña, un tren temprano y dos días para desconectar.',
      },
    ],
  },
]

export function obtenerCategorias() {
  return categorias
}

export function obtenerCategoriaPorNombre(nombre) {
  return categorias.find((categoria) => categoria.nombre === nombre)
}

export function obtenerPostDeCategoria(nombreCategoria, slug) {
  const categoria = obtenerCategoriaPorNombre(nombreCategoria)
  if (!categoria) return undefined
  const post = categoria.posts.find((entrada) => entrada.slug === slug)
  if (!post) return undefined
  return { ...post, categoria: categoria.nombre, categoriaTitulo: categoria.titulo }
}

export function obtenerPostsDestacados() {
  return categorias.map((categoria) => ({
    ...categoria.posts[0],
    categoria: categoria.nombre,
    categoriaTitulo: categoria.titulo,
  }))
}

export function filtrarPostsPorAutor(autor) {
  return categorias.flatMap((categoria) =>
    categoria.posts
      .filter((post) => post.autor === autor)
      .map((post) => ({ ...post, categoria: categoria.nombre, categoriaTitulo: categoria.titulo }))
  )
}
