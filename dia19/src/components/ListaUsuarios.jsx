function ListaUsuarios({ usuarios }) {
  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase mb-5">Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="flex items-center gap-3 text-sm py-2.5 border-b border-black/10 last:border-0">
            <div className="w-8 h-8 bg-amber-500 text-black flex items-center justify-center text-xs font-semibold">
              {usuario.nombre.charAt(0)}
            </div>
            <span className="text-black/80">{usuario.nombre}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaUsuarios
