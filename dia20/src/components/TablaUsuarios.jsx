import Card from './Card'

function TablaUsuarios({ usuarios }) {
  return (
    <Card titulo="Usuarios">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] tracking-wide text-taupe-light border-b border-hairline uppercase">
            <th className="pb-2 font-medium">Nombre</th>
            <th className="pb-2 font-medium">Edad</th>
            <th className="pb-2 font-medium">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="border-b border-hairline-soft last:border-0">
              <td className="py-2.5 text-ink">{u.nombre}</td>
              <td className="py-2.5 text-taupe font-mono">{u.edad}</td>
              <td className="py-2.5 text-taupe-light">{u.ciudad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default TablaUsuarios
