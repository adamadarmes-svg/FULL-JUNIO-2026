function TablaProductos({ productos }) {
  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase mb-5">Productos</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] tracking-widest text-black/30 uppercase border-b border-black/15">
            <th className="pb-3 font-medium">Nombre</th>
            <th className="pb-3 font-medium">Precio</th>
            <th className="pb-3 font-medium">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-b border-black/10 last:border-0">
              <td className="py-2.5 text-black/80">{p.nombre}</td>
              <td className="py-2.5 text-amber-700 font-mono">${p.precio}</td>
              <td className="py-2.5">
                <span className={`text-[10px] px-2 py-0.5 font-mono border ${
                  p.stock === 0
                    ? 'border-black/20 text-black/30'
                    : 'border-amber-600/30 text-amber-700'
                }`}>
                  {p.stock === 0 ? 'Sin stock' : p.stock}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaProductos
