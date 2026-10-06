import { useChat } from '../../context/ChatContext'
import { formatearHora, inicial } from '../../lib/formato'

export default function UserList() {
  const { usuarios, nombre } = useChat()

  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-stone-500">
        En línea
        <span className="tabular-nums text-stone-900">{usuarios.length}</span>
      </h2>

      {usuarios.length === 0 ? (
        <p className="text-sm text-stone-400">Nadie</p>
      ) : (
        <ul className="divide-y divide-stone-100 border-t border-stone-200">
          {usuarios.map((usuario) => {
            const esTu = usuario.nombre === nombre
            const desde = formatearHora(usuario.conectadoEn)

            return (
              <li
                key={usuario.id ?? usuario.nombre}
                title={desde ? `Desde ${desde}` : undefined}
                className="flex items-center gap-3 py-2.5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-stone-300 font-serif text-sm"
                >
                  {inicial(usuario.nombre)}
                </span>
                <span className="min-w-0 truncate text-sm text-stone-800">{usuario.nombre}</span>
                {esTu && <span className="ml-auto text-[11px] uppercase tracking-[0.2em] text-oro">tú</span>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
