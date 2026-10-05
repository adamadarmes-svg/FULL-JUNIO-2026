import { listarItems, crearItem } from '@/controllers/itemController'

export async function GET() {
  const resultado = await listarItems()

  if (!resultado.ok) {
    return Response.json({ error: resultado.error }, { status: resultado.status })
  }

  return Response.json({ items: resultado.data })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const resultado = await crearItem(body)

    if (!resultado.ok) {
      return Response.json({ error: resultado.error }, { status: resultado.status })
    }

    return Response.json({ item: resultado.data }, { status: 201 })
  } catch {
    return Response.json({ error: 'Datos mal formados' }, { status: 400 })
  }
}