import {
  obtenerDashboard,
  obtenerResumen,
  obtenerEstadisticas,
  obtenerEstadisticaPorMes,
  obtenerAjustes,
} from '@/models/dashboardModel'

export async function verDashboard() {
  return { ok: true, data: obtenerDashboard() }
}

export async function verResumen() {
  const resumen = obtenerResumen()
  if (!resumen || resumen.datos.length === 0) {
    return { ok: false, error: 'No hay datos de resumen' }
  }
  return { ok: true, data: resumen }
}

export async function verEstadisticas() {
  const estadisticas = obtenerEstadisticas()
  if (!estadisticas || estadisticas.length === 0) {
    return { ok: false, error: 'No hay estadísticas disponibles' }
  }
  return { ok: true, data: estadisticas }
}

export async function verEstadisticaDeMes(mes) {
  if (!mes || String(mes).trim() === '') {
    return { ok: false, error: 'Falta el mes' }
  }
  const estadistica = obtenerEstadisticaPorMes(String(mes))
  if (!estadistica) {
    return { ok: false, error: `No hay datos para ${mes}` }
  }
  return { ok: true, data: estadistica }
}

export async function verAjustes() {
  const ajustes = obtenerAjustes()
  if (!ajustes || ajustes.length === 0) {
    return { ok: false, error: 'No hay ajustes disponibles' }
  }
  return { ok: true, data: ajustes }
}
