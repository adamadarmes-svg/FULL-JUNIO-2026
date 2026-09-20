import { useParams, useNavigate } from 'react-router-dom'

const NOMBRES = [
  'Ana Torres', 'Carlos Ruiz', 'Beatriz Gómez', 'David Salas', 'Elena Vidal',
  'Fernando Paz', 'Gabriela Rey', 'Hugo Marín', 'Irene Campos', 'Javier Soto',
]
const ROLES = ['Administrador', 'Editor', 'Colaborador', 'Invitado']
const COLORES = [
  'bg-indigo-600', 'bg-teal-600', 'bg-rose-600', 'bg-amber-600',
]

const generarUsuario = id => {
  const n = Number(id) || 0
  const nombre = NOMBRES[n % NOMBRES.length]
  const iniciales = nombre
    .split(' ')
    .map(p => p[0])
    .join('')

  return {
    id,
    nombre,
    iniciales,
    email: `${nombre.toLowerCase().replace(' ', '.')}@mail.com`,
    rol: ROLES[n % ROLES.length],
    color: COLORES[n % COLORES.length],
    activo: n % 3 !== 0,
  }
}

const User = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const usuario = generarUsuario(id)

  return (
    <div className="bg-white border border-zinc-200 p-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
        Perfil de usuario
      </h1>

      <div className="border border-zinc-200 p-6 mb-8 flex items-center gap-5">
        <div
          className={`${usuario.color} text-white text-2xl font-bold w-16 h-16 flex items-center justify-center shrink-0`}
        >
          {usuario.iniciales}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-zinc-900">{usuario.nombre}</h2>
            <span
              className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 ${
                usuario.activo
                  ? 'text-emerald-700'
              : 'text-zinc-500'}`}
            >
              {usuario.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <p className="text-zinc-500 text-sm">{usuario.email}</p>
          <p className="text-indigo-600 text-sm font-semibold mt-1">{usuario.rol}</p>
        </div>

        <div className="text-right shrink-0 border-l border-zinc-200 pl-5">
          <p className="text-zinc-400 text-xs uppercase tracking-wide">ID</p>
          <p className="text-3xl font-bold text-zinc-900">#{usuario.id}</p>
        </div>
      </div>

      <p className="text-zinc-500 text-sm mb-3">Otros ID:</p>
      <div className="flex gap-px bg-zinc-200 border border-zinc-200 w-fit">
        {[1, 7, 42, 99].map(n => (
          <button
            key={n}
            onClick={() => navigate(`/user/${n}`)}
            className={`font-semibold px-4 py-2 cursor-pointer transition-colors ${
              String(n) === id
                ? 'bg-indigo-600 text-white'
                : 'bg-white hover:bg-zinc-50 text-zinc-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

export default User