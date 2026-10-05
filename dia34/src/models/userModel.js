export const usuarios = [
  {
    username: 'gustavo',
    nombre: 'Gustavo',
    ciudad: 'Valencia',
    bio: 'Me levanto temprano para dar un paseo por el parque antes de ir a la oficina. Por las tardes cuido del huerto que tengo en la terraza y los fines de semana salgo en bici con mis amigos. Me gusta cocinar sin prisas, escuchar la radio mientras friego los platos y terminar el día leyendo un rato en el sofá.',
  },
  {
    username: 'ana',
    nombre: 'Ana',
    ciudad: 'Madrid',
    bio: 'Trabajo desde casa y he aprendido a separar bien las horas de trabajo del resto del día. Los domingos planifico la semana con una libreta y un café, hago la compra del mercado y dejo algunas comidas preparadas. Cuando tengo un rato libre salgo a correr o quedo con mi hermana para merendar.',
  },
  {
    username: 'carlos',
    nombre: 'Carlos',
    ciudad: 'Sevilla',
    bio: 'Soy padre de dos niños y mis días empiezan con desayunos rápidos y mochilas por preparar. Me encanta improvisar cenas con lo que queda en la nevera y compartir las recetas que salen bien. Los sábados por la mañana vamos al mercado en familia y por la tarde, si hace buen tiempo, a la playa.',
  },
]

export function obtenerUsuarios() {
  return usuarios
}

export function obtenerUsuarioPorUsername(username) {
  return usuarios.find((usuario) => usuario.username === username)
}

export function filtrarUsuariosPorCiudad(ciudad) {
  return usuarios.filter((usuario) => usuario.ciudad === ciudad)
}
