export const posts = [
  {
    id: 1,
    titulo: 'Cómo organizo la semana los domingos',
    autor: 'ana',
    fecha: '2 de junio de 2026',
    lectura: '4 min',
    resumen: 'Una libreta, un café y veinte minutos bastan para planificar comidas, recados y ratos libres sin agobios.',
  },
  {
    id: 2,
    titulo: 'Cinco cenas rápidas para días largos',
    autor: 'carlos',
    fecha: '9 de junio de 2026',
    lectura: '6 min',
    resumen: 'Recetas sencillas que se preparan en menos de media hora con lo que suele haber en la nevera.',
  },
  {
    id: 3,
    titulo: 'Mi paseo favorito antes del trabajo',
    autor: 'gustavo',
    fecha: '16 de junio de 2026',
    lectura: '3 min',
    resumen: 'Media hora caminando por el parque cambia por completo cómo empiezo el día.',
  },
]

export function obtenerPosts() {
  return posts
}

export function obtenerPostPorId(id) {
  return posts.find((post) => post.id === Number(id))
}

export function filtrarPostsPorAutor(autor) {
  return posts.filter((post) => post.autor === autor)
}
