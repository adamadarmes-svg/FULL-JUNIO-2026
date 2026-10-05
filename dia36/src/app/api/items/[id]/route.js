import { obtenerItem, actualizarItem, eliminarItem } from '@/controllers/itemController'

export async function GET(request, { params }) {
  const { id } = await params
  const resultado = await obtenerItem(id)

  if (!resultado.ok) {
    return Response.json({ error: resultado.error }, { status: resultado.status })
  }

  return Response.json({ item: resultado.data })
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const resultado = await actualizarItem(id, body)

    if (!resultado.ok) {
      return Response.json({ error: resultado.error }, { status: resultado.status })
    }

    return Response.json({ item: resultado.data })
  } catch {
    return Response.json({ error: 'Datos mal formados' }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params
  const resultado = await eliminarItem(id)

  if (!resultado.ok) {
    return Response.json({ error: resultado.error }, { status: resultado.status })
  }

  return Response.json(resultado.data)
}