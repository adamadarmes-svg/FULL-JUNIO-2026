export const resumen = [
  { label: 'Visitas',  valor: '1.284' },
  { label: 'Usuarios', valor: '327'   },
  { label: 'Ventas',   valor: '48'    },
]

export const textoResumen =
  'Nací con una mente inquieta y una obsesión por entender cómo funciona el universo. Desde joven cuestioné todo, incluso aquello que otros aceptaban sin pensar. Formulé la teoría de la relatividad, mostré que el tiempo y el espacio no son absolutos y ayudé a revelar la naturaleza profunda de la luz y la energía. Mi trabajo cambió la física para siempre, pero siempre creí que la imaginación era más importante que el conocimiento. Viví buscando respuestas, y cada descubrimiento me recordó lo pequeño y maravilloso que es nuestro lugar en el cosmos.'

export const estadisticas = [
  { mes: 'Enero',   valor: 70 },
  { mes: 'Febrero', valor: 45 },
  { mes: 'Marzo',   valor: 88 },
  { mes: 'Abril',   valor: 60 },
  { mes: 'Mayo',    valor: 95 },
]

export const ajustes = [
  { titulo: 'Notificaciones', texto: 'Recibir avisos por correo', activo: true },
  { titulo: 'Modo oscuro',    texto: 'Activado por defecto',      activo: true },
  { titulo: 'Idioma',         texto: 'Español',                   activo: true },
]

export function obtenerResumen() {
  return { datos: resumen, texto: textoResumen }
}

export function obtenerEstadisticas() {
  return estadisticas
}

export function obtenerEstadisticaPorMes(mes) {
  return estadisticas.find((estadistica) => estadistica.mes.toLowerCase() === mes.toLowerCase())
}

export function filtrarEstadisticasPorMinimo(minimo) {
  return estadisticas.filter((estadistica) => estadistica.valor >= minimo)
}

export function obtenerAjustes() {
  return ajustes
}

export function obtenerAjustePorTitulo(titulo) {
  return ajustes.find((ajuste) => ajuste.titulo === titulo)
}

export function obtenerDashboard() {
  return { resumen: obtenerResumen(), estadisticas, ajustes }
}
