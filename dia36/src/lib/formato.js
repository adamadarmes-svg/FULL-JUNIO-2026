export function formatearFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const COLORES_CATEGORIA = {
  general:  'border-neutral-300 text-neutral-500',
  trabajo:  'border-sky-300 text-sky-700',
  personal: 'border-violet-300 text-violet-700',
  estudio:  'border-emerald-300 text-emerald-700',
}
