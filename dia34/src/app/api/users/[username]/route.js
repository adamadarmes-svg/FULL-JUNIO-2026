import { NextResponse } from 'next/server'
import { buscarUsuario } from '@/controllers/userController'

export async function GET(request, { params }) {
  try {
    const { username } = await params
    const resultado = await buscarUsuario(username)
    if (!resultado.ok) {
      const status = username && username.trim() !== '' ? 404 : 400
      return NextResponse.json({ error: resultado.error }, { status })
    }
    return NextResponse.json(resultado.data)
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
