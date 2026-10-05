import { NextResponse } from 'next/server'
import { verDashboard } from '@/controllers/dashboardController'

export async function GET() {
  try {
    const resultado = await verDashboard()
    if (!resultado.ok) {
      return NextResponse.json({ error: resultado.error }, { status: 404 })
    }
    return NextResponse.json(resultado.data)
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
