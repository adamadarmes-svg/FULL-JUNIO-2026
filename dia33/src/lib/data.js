export const articulos = [
  {
    id: 1,
    titulo: 'Arepa con queso',
    descripcion: 'Un desayuno clásico: arepa asada en el budare, rellena de queso fresco que se derrite por dentro.',
    categoria: 'Comida',
  },
  {
    id: 2,
    titulo: 'Chaqueta de jean',
    descripcion: 'Una prenda que combina con casi todo y sirve para las mañanas frescas o las noches de fin de semana.',
    categoria: 'Ropa',
  },
  {
    id: 3,
    titulo: 'Café de la mañana',
    descripcion: 'Una taza caliente recién colada para empezar el día con energía antes de salir de casa.',
    categoria: 'Bebidas',
  },
  {
    id: 4,
    titulo: 'Tenis blancos',
    descripcion: 'Cómodos para caminar todo el día y fáciles de combinar con jeans, pantalonetas o sudaderas.',
    categoria: 'Calzado',
  },
  {
    id: 5,
    titulo: 'Paraguas plegable',
    descripcion: 'Pequeño y ligero, cabe en la mochila y te salva de los aguaceros inesperados de la tarde.',
    categoria: 'Día a día',
  },
]

export async function fetchRepo() {
  return articulos
}
