import { obtenerNombres, agregarNombre } from '@/models/nombresModel'

export async function GET() {
  try {
    return Response.json({ nombres: obtenerNombres() })
  } catch {
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre } = body

    if (!nombre || !nombre.trim()) {
      return Response.json({ error: 'El nombre es obligatorio' }, { status: 400 })
    }

    const nuevo = agregarNombre(nombre)

    return Response.json({ recibido: true, nombre: nuevo }, { status: 201 })
  } catch {
    return Response.json({ error: 'Error del servidor' }, { status: 500 })
  }
}