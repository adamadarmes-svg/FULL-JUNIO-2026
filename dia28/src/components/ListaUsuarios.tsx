interface Usuario {
  id: number
  nombre: string
  email: string
  rol: string
}

interface UsuarioItemProps {
  usuario: Usuario
}

const UsuarioItem = ({ usuario }: UsuarioItemProps) => {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 p-4">
      <div className="bg-gray-100 text-gray-700 font-bold w-10 h-10 flex items-center justify-center shrink-0">
        {usuario.nombre.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 truncate">{usuario.nombre}</p>
        <p className="text-gray-400 text-sm truncate">{usuario.email}</p>
      </div>
      <span className="ml-auto shrink-0 border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1">
        {usuario.rol}
      </span>
    </div>
  )
}

interface ListaUsuariosProps {
  usuarios: Usuario[]
}

const ListaUsuarios = ({ usuarios }: ListaUsuariosProps) => {
  return (
    <div className="bg-white border border-gray-200 p-6 w-80">
      <p className="text-gray-500 text-sm mb-3">
        Flavio Belisario
      </p>
      <div className="space-y-3">
        {usuarios.map((usuario) => (
          <UsuarioItem key={usuario.id} usuario={usuario} />
        ))}
      </div>
    </div>
  )
}

export default ListaUsuarios