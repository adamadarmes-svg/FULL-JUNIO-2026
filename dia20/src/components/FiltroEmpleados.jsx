import { useState } from 'react'
import Card from './Card'

function FiltroEmpleados({ empleados }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [salarioMin, setSalarioMin] = useState('')

  const resultado = empleados
    .filter((e) => e.nombre.toLowerCase().includes(nombre.toLowerCase()))
    .filter((e) => e.apellido.toLowerCase().includes(apellido.toLowerCase()))
    .filter((e) => salarioMin === '' || e.salario >= Number(salarioMin))

  const inputClass = "w-full bg-linen/40 border border-hairline px-3.5 py-2.5 text-sm text-ink placeholder:text-taupe-light focus:outline-none focus:border-ink focus:bg-paper transition-colors duration-300"

  return (
    <Card titulo="Filtrar empleados">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] tracking-wide text-taupe-light uppercase">Nombre</span>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Cualquiera" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] tracking-wide text-taupe-light uppercase">Apellido</span>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Cualquiera" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] tracking-wide text-taupe-light uppercase">Salario mín.</span>
          <input type="number" value={salarioMin} onChange={(e) => setSalarioMin(e.target.value)} placeholder="0" className={inputClass} />
        </label>
      </div>
      <p className="text-xs text-taupe-light">{resultado.length} resultado{resultado.length !== 1 ? 's' : ''}</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] tracking-wide text-taupe-light border-b border-hairline uppercase">
            <th className="pb-2 font-medium">Nombre</th>
            <th className="pb-2 font-medium">Apellido</th>
            <th className="pb-2 font-medium">Salario</th>
          </tr>
        </thead>
        <tbody>
          {resultado.map((e) => (
            <tr key={e.id} className="border-b border-hairline-soft last:border-0">
              <td className="py-2.5 text-ink">{e.nombre}</td>
              <td className="py-2.5 text-taupe">{e.apellido}</td>
              <td className="py-2.5 font-mono text-taupe">${e.salario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

export default FiltroEmpleados
