import Link from 'next/link'

const capas = [
  { juego: 'Fortnite',        mensaje: 'Victoria magistral asegurada, Gustavo. Ni con el último círculo a favor me ganas.' },
  { juego: 'Minecraft',       mensaje: 'Construyo, sobrevivo y te gano en PvP. No me ganas.' },
  { juego: 'Call of Duty',    mensaje: 'Mi K/D es más alto que el burj Khalifa. No me ganas.' },
  { juego: 'EA Sports FC',    mensaje: 'Te meto goleada sin sudar. No me ganas.' },
  { juego: 'Rocket League',   mensaje: 'Aéreos, flicks y demo. No me ganas.' },
  { juego: 'Halo Infinite',   mensaje: 'Spartan de élite contra recluta. No me ganas.' },
  { juego: 'League of Legends', mensaje: 'Te gano la línea antes del minuto 10. No me ganas.' },
  { juego: 'Forza Horizon 5', mensaje: 'Solo vas a ver mis luces traseras. No me ganas.' },
]

const mensaje = 'Gustavo, soy bueno en todos estos juegos y a que no me ganas en ninguno. Elige el que quieras y te espero.'

export default function Home() {
  return (
    <section className="space-y-14">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Invitación</p>
        <h1 className="text-4xl sm:text-5xl font-light leading-tight tracking-tight">
          Gustavo agregame a Discord para jugar algun juego
        </h1>
        <p className="max-w-xl text-neutral-500 leading-relaxed">
          o a xbox también, soy adamadarmes en Discord y mi gamertag es Elpipea.
        </p>
      </div>

      <div className="border border-neutral-200 bg-white">
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
            Gustavo agregame a Discord para jugar algun juego
          </h2>
          <p className="text-lg leading-snug">{mensaje}</p>
        </div>

        <ul className="divide-y divide-neutral-200">
          {capas.map((capa, i) => (
            <li
              key={capa.juego}
              className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2rem_11rem_1fr] gap-x-4 gap-y-1 px-6 py-4 text-sm hover:bg-neutral-50 transition-colors"
            >
              <span className="font-mono text-xs text-neutral-300 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-medium">{capa.juego}</span>
              <span className="col-start-2 sm:col-start-auto text-neutral-500">{capa.mensaje}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/items"
        className="group inline-flex items-center gap-3 px-6 py-3 border border-neutral-900 bg-neutral-900 text-neutral-50 text-xs uppercase tracking-[0.2em] hover:bg-transparent hover:text-neutral-900 transition-colors"
      >
        Ir <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </section>
  )
}
