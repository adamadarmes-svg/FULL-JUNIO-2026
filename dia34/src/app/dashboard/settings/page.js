import SinDatos from '@/components/SinDatos'
import { verAjustes } from '@/controllers/dashboardController'

export default async function Settings() {
  const resultado = await verAjustes()

  if (!resultado.ok) {
    return <SinDatos titulo="Ajustes" mensaje={resultado.error} />
  }

  const ajustes = resultado.data

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">Ajustes</h2>
        <p className="text-xs text-stone-400">
          Preferencias de tu cuenta
        </p>
      </div>

      <div className="border-t border-stone-200">
        {ajustes.map((ajuste) => (
          <div key={ajuste.titulo} className="flex items-center justify-between border-b border-stone-200 py-5">
            <div>
              <p className="text-sm font-medium">{ajuste.titulo}</p>
              <p className="text-sm text-stone-500">{ajuste.texto}</p>
            </div>
            <span className="flex items-center gap-2 border border-stone-200 px-3 py-1 text-xs text-stone-600">
              <span className="w-1.5 h-1.5 bg-emerald-500" />
              {ajuste.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
