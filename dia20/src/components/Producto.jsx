function Producto({ nombre, precio }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-hairline-soft last:border-0">
      <span className="text-sm text-ink">{nombre}</span>
      <span className="text-sm font-mono text-taupe">${precio}</span>
    </div>
  )
}

export default Producto
