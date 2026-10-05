import SinDatos from '@/components/SinDatos'
import { verResumen } from '@/controllers/dashboardController'

export default async function Dashboard() {
  const resultado = await verResumen()

  if (!resultado.ok) {
    return <SinDatos titulo="Resumen" mensaje={resultado.error} />
  }

  const { datos, texto } = resultado.data

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-light tracking-tight">Resumen</h2>

      <div className="grid gap-px border border-stone-200 bg-stone-200 sm:grid-cols-3">
        {datos.map((dato) => (
          <div key={dato.label} className="bg-white p-6">
            <p className="eyebrow mb-3">{dato.label}</p>
            <p className="text-4xl font-light tabular-nums">{dato.valor}</p>
          </div>
        ))}
      </div>

      <p className="max-w-2xl leading-relaxed text-stone-600">
        {texto}
      </p>
    </section>
  )
}
