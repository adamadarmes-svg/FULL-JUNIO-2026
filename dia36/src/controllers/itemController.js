import conectarDB from '@/lib/mongodb'
import Item from '@/models/Item'
import { esIdValido, validarItem, limpiarItem } from '@/lib/validaciones'

function respuestaError(error, status = 400) {
  return { ok: false, error, status }
}

export async function listarItems() {
  try {
    await conectarDB()
    const items = await Item.find().sort({ createdAt: -1 })
    return { ok: true, data: items.map((item) => item.toJSON()) }
  } catch (error) {
    console.error('ERROR DB:', error.message)
    return respuestaError('No se pudo conectar con la base de datos', 500)
  }
}

export async function obtenerItem(id) {
  if (!esIdValido(id)) return respuestaError('El identificador no es válido')

  try {
    await conectarDB()
    const item = await Item.findById(id)
    if (!item) return respuestaError('Item no encontrado', 404)
    return { ok: true, data: item.toJSON() }
  } catch {
    return respuestaError('No se pudo conectar con la base de datos', 500)
  }
}

export async function crearItem(datos) {
  const { valido, errores } = validarItem(datos)
  if (!valido) return respuestaError(errores[0])

  try {
    await conectarDB()
    const item = await Item.create(limpiarItem(datos))
    return { ok: true, data: item.toJSON(), status: 201 }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return respuestaError(Object.values(error.errors)[0].message)
    }
    return respuestaError('No se pudo guardar el item', 500)
  }
}

export async function actualizarItem(id, datos) {
  if (!esIdValido(id)) return respuestaError('El identificador no es válido')

  const esSoloToggle = typeof datos.completado === 'boolean' && !datos.titulo

  if (!esSoloToggle) {
    const { valido, errores } = validarItem(datos)
    if (!valido) return respuestaError(errores[0])
  }

  try {
    await conectarDB()

    const cambios = esSoloToggle
      ? { completado: datos.completado }
      : { ...limpiarItem(datos), completado: datos.completado }

    const item = await Item.findByIdAndUpdate(id, cambios, {
      new: true,
      runValidators: true,
    })

    if (!item) return respuestaError('Item no encontrado', 404)
    return { ok: true, data: item.toJSON() }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return respuestaError(Object.values(error.errors)[0].message)
    }
    return respuestaError('No se pudo actualizar el item', 500)
  }
}

export async function eliminarItem(id) {
  if (!esIdValido(id)) return respuestaError('El identificador no es válido')

  try {
    await conectarDB()
    const item = await Item.findByIdAndDelete(id)
    if (!item) return respuestaError('Item no encontrado', 404)
    return { ok: true, data: { id, eliminado: true } }
  } catch {
    return respuestaError('No se pudo eliminar el item', 500)
  }
}