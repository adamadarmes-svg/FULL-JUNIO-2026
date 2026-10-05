import { NextResponse } from 'next/server'
import { buscarPost } from '@/controllers/postController'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const resultado = await buscarPost(id)
    if (!resultado.ok) {
      const status = /^\d+$/.test(id) ? 404 : 400
      return NextResponse.json({ error: resultado.error }, { status })
    }
    return NextResponse.json(resultado.data)
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
