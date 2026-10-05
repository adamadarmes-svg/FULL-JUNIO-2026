import { obtenerNombrePorId, actualizarNombre, eliminarNombre } from '@/models/nombresModel'

export async function GET(request, { params }) {
  const { id } = await params
  const item = obtenerNombrePorId(id)

  if (!item) {
    return Response.json({ error: 'Nombre no encontrado' }, { status: 404 })
  }

  return Response.json({ nombre: item })
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { nombre } = await request.json()

    if (!nombre || !nombre.trim()) {
      return Response.json({ error: 'El nombre es obligatorio' }, { status: 400 })
    }

    const actualizado = actualizarNombre(id, nombre)

    if (!actualizado) {
      return Response.json({ error: 'Nombre no encontrado' }, { status: 404 })
    }

    return Response.json({ actualizado: true, nombre: actualizado })
  } catch {
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const eliminado = eliminarNombre(id)

    if (!eliminado) {
      return Response.json({ error: 'Nombre no encontrado' }, { status: 404 })
    }

    return Response.json({ eliminado: true, nombre: eliminado })
  } catch {
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}