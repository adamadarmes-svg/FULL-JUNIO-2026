interface Usuario {
  nombre: string
  edad: number
  activo: boolean
}

interface UsuarioCardProps {
  usuario: Usuario
}

const UsuarioCard = ({ usuario }: UsuarioCardProps) => {
  return (
    <div
      className={`bg-white border p-6 w-80 transition-all ${
        usuario.activo ? 'border-gray-900' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className={`w-3 h-3 shrink-0 ${usuario.activo ? 'bg-gray-900' : 'bg-gray-300'}`} />
        <div>
          <p className="text-xl font-bold text-gray-900">{usuario.nombre}</p>
          <p className="text-gray-500 text-sm">Edad: {usuario.edad} años</p>
        </div>
      </div>
      <span
        className={`text-sm font-semibold px-3 py-1 border ${
          usuario.activo
            ? 'border-gray-900 text-gray-900'
            : 'border-gray-200 text-gray-400'
        }`}
      >
        {usuario.activo ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  )
}

export default UsuarioCard