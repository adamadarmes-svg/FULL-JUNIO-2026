import SinDatos from '@/components/SinDatos'
import { verEstadisticas } from '@/controllers/dashboardController'

export default async function Stats() {
  const resultado = await verEstadisticas()

  if (!resultado.ok) {
    return <SinDatos titulo="Estadísticas" mensaje={resultado.error} />
  }

  const barras = resultado.data

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">Estadísticas</h2>
        <p className="text-xs text-stone-400">
          Actividad de los últimos cinco meses
        </p>
      </div>

      <div className="border-t border-stone-200">
        {barras.map((barra) => (
          <div key={barra.mes} className="grid grid-cols-[90px_1fr_48px] items-center gap-4 border-b border-stone-200 py-4 text-sm">
            <span className="text-stone-500">{barra.mes}</span>
            <div className="h-1 bg-stone-200">
              <div
                className="h-1 bg-stone-900 transition-all"
                style={{ width: `${barra.valor}%` }}
              />
            </div>
            <span className="text-right tabular-nums">{barra.valor}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
