import { useState } from 'react'

export const filtrarAprobados = (alumnos) => alumnos.filter((a) => a.nota >= 5)

function AlumnosAprobados({ alumnos }) {
  const [soloAprobados, setSoloAprobados] = useState(true)

  const lista = soloAprobados ? filtrarAprobados(alumnos) : alumnos

  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase">Alumnos</h2>
        <button
          onClick={() => setSoloAprobados(!soloAprobados)}
          className="text-[10px] tracking-wider uppercase text-amber-700 border border-amber-600/30 px-3 py-1.5 hover:bg-amber-500 hover:text-black transition-colors duration-200"
        >
          {soloAprobados ? 'Ver todos' : 'Ver aprobados'}
        </button>
      </div>
      <ul>
        {lista.map((alumno) => (
          <li
            key={alumno.id}
            className="flex justify-between items-center text-sm py-2.5 border-b border-black/10 last:border-0"
          >
            <span className="text-black/80">{alumno.nombre}</span>
            <span className={`font-mono text-[10px] px-2 py-0.5 border ${alumno.nota >= 5
                ? 'bg-amber-500 text-black border-amber-500'
                : 'border-black/20 text-black/30'
              }`}>
              {alumno.nota}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AlumnosAprobados
