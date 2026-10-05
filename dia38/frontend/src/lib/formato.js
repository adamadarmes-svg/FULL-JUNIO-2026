const formateadorFecha = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatearFecha(fecha) {
  const date = new Date(fecha)
  if (Number.isNaN(date.getTime())) return ''
  return formateadorFecha.format(date)
}

export function formatearFechaRelativa(fecha) {
  const date = new Date(fecha)
  if (Number.isNaN(date.getTime())) return ''

  const segundos = Math.floor((Date.now() - date.getTime()) / 1000)
  if (segundos < 60) return 'hace un momento'

  const minutos = Math.floor(segundos / 60)
  if (minutos < 60) return minutos === 1 ? 'hace 1 minuto' : `hace ${minutos} minutos`

  const horas = Math.floor(minutos / 60)
  if (horas < 24) return horas === 1 ? 'hace 1 hora' : `hace ${horas} horas`

  const dias = Math.floor(horas / 24)
  if (dias === 1) return 'ayer'
  if (dias <= 7) return `hace ${dias} días`

  return formatearFecha(date)
}

export function recortar(texto, maximo) {
  if (!texto) return ''
  if (texto.length <= maximo) return texto

  const corte = texto.slice(0, maximo)
  const ultimoEspacio = corte.lastIndexOf(' ')
  const base = ultimoEspacio > 0 ? corte.slice(0, ultimoEspacio) : corte
  return `${base.trimEnd()}...`
}

export function inicial(nombre) {
  if (!nombre) return '?'
  return nombre.trim().charAt(0).toUpperCase() || '?'
}
