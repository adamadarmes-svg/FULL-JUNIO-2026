export function formatoSaludo(data) {
  if (!data?.mensaje) return 'Sin datos'
  return `${data.mensaje}/${data.timestamp}`
}

export function formatoNumero(data) {
  if (!data) return 'Sin datos'
  return {
    entero: data.entero,
    decimal: Number(data.numero).toFixed(6),
  }
}

export function formatoError(err) {
  return `${err?.message || 'Error al cargar datos'}`
}