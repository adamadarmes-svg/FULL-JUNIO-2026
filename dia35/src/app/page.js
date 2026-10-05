import Link from 'next/link'
import SaludoCSR from '@/components/SaludoCSR'
import { formatoSaludo, formatoNumero } from '@/lib/formatoSaludo'
import { getSaludo, getNumero } from '@/services/fetchRepo'

export default async function Home() {
  const saludo = await getSaludo()
  const numero = formatoNumero(await getNumero())

  return (
    <section className="space-y-8">
      <div className="pb-6 border-b border-neutral-200">
        <h1 className="text-4xl font-light tracking-tight mb-2">API</h1>
        <p className="text-sm text-neutral-500">
          endpoints
        </p>
      </div>

      <div className="p-6 bg-white border border-neutral-200">
        <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
          recarga el server
        </p>
        <pre className="text-neutral-700 text-sm font-mono">
          {formatoSaludo(saludo)}
        </pre>
      </div>

      <SaludoCSR />

      <div className="p-6 bg-white border border-neutral-200">
        <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
          Número aleatorio
        </p>
        <p className="text-5xl font-light tabular-nums text-neutral-900">{numero.entero}</p>
        <p className="text-xs text-neutral-400 font-mono mt-2">
          Math.random() = {numero.decimal}
        </p>
        <p className="text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-200">
          El formateo se hace en lib/formatoSaludo.js y muestra seis decimales
        </p>
      </div>

      <Link
        href="/crud"
        className="inline-block px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-700 text-xs uppercase tracking-widest transition-colors"
      >
        Ir →
      </Link>
    </section>
  )
}
