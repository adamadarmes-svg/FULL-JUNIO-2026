let nombres = [
  { id: 1, nombre: 'Gustavo' },
  { id: 2, nombre: 'Alison' },
  { id: 3, nombre: 'Violet' },
]

let siguienteId = 4

export function obtenerNombres() {
  return nombres
}

export function obtenerNombrePorId(id) {
  return nombres.find((item) => item.id === Number(id))
}

export function agregarNombre(nombre) {
  const nuevo = { id: siguienteId++, nombre: nombre.trim() }
  nombres.push(nuevo)
  return nuevo
}

export function actualizarNombre(id, nombre) {
  const item = obtenerNombrePorId(id)
  if (!item) return null
  item.nombre = nombre.trim()
  return item
}

export function eliminarNombre(id) {
  const indice = nombres.findIndex((item) => item.id === Number(id))
  if (indice === -1) return null
  const [eliminado] = nombres.splice(indice, 1)
  return eliminado
}