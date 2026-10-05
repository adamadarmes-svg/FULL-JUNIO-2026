import { CATEGORIAS, LIMITES } from './constantes'

export function esIdValido(id) {
  return typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)
}

export function validarItem({ titulo, descripcion, categoria }) {
  const errores = []

  if (!titulo || !titulo.trim()) {
    errores.push('El título es obligatorio')
  } else if (titulo.trim().length > LIMITES.TITULO) {
    errores.push(`El título no puede superar los ${LIMITES.TITULO} caracteres`)
  }

  if (descripcion && descripcion.length > LIMITES.DESCRIPCION) {
    errores.push(`La descripción no puede superar los ${LIMITES.DESCRIPCION} caracteres`)
  }

  if (categoria && !CATEGORIAS.includes(categoria)) {
    errores.push(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}`)
  }

  return { valido: errores.length === 0, errores }
}

export function limpiarItem({ titulo, descripcion, categoria }) {
  return {
    titulo: titulo?.trim(),
    descripcion: descripcion?.trim() || '',
    categoria: categoria || 'general',
  }
}