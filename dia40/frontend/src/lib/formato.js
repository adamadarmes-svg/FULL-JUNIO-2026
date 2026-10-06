function aFecha(timestamp) {
  const fecha = new Date(timestamp)
  return Number.isNaN(fecha.getTime()) ? null : fecha
}

export function formatearHora(timestamp) {
  const fecha = aFecha(timestamp)
  if (!fecha) return ''
  return fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatearFechaCompleta(timestamp) {
  const fecha = aFecha(timestamp)
  if (!fecha) return ''
  return fecha.toLocaleString('es-ES', {
    dateStyle: 'full',
    timeStyle: 'medium',
  })
}

export function inicial(nombre) {
  const letra = (nombre ?? '').trim().charAt(0)
  return letra ? letra.toUpperCase() : '?'
}

export function esMismoMinuto(a, b) {
  const fechaA = aFecha(a)
  const fechaB = aFecha(b)
  if (!fechaA || !fechaB) return false
  return Math.floor(fechaA.getTime() / 60000) === Math.floor(fechaB.getTime() / 60000)
}
