import Link from 'next/link'
import NoEncontrado from '@/components/NoEncontrado'
import { buscarUsuario, listarUsuarios } from '@/controllers/userController'

export default async function Perfil({ params }) {
  const { username } = await params

  const resultado = await buscarUsuario(username)

  if (!resultado.ok) {
    return <NoEncontrado titulo="Usuario no encontrado" mensaje={resultado.error} />
  }

  const usuario = resultado.data
  const lista = await listarUsuarios()
  const usuarios = lista.ok ? lista.data.map((u) => u.username) : []

  return (
    <section>
      <div className="flex items-end gap-6 pb-14">
        <div className="w-20 h-20 shrink-0 bg-stone-900 text-white flex items-center justify-center text-3xl font-light">
          {usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="eyebrow mb-2">{usuario.nombre} · {usuario.ciudad}</p>
          <h1 className="text-5xl font-light tracking-tight">@{usuario.username}</h1>
        </div>
      </div>

      <div className="border-t border-stone-200 py-10">
        <p className="max-w-2xl text-lg leading-relaxed text-stone-600">
          {usuario.bio}
        </p>
      </div>

      <div className="border-t border-stone-200 pt-8">
        <p className="eyebrow mb-4">Otros perfiles</p>
        <div className="inline-flex border border-stone-300 divide-x divide-stone-300">
          {usuarios.map((u) => (
            <Link
              key={u}
              href={`/user/${u}`}
              className={`px-5 py-2.5 text-sm transition-colors ${
                u === usuario.username
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              @{u}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
