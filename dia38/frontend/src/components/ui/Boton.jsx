import { Link } from 'react-router-dom'
import Spinner from './Spinner'

const VARIANTES = {
  primario: 'bg-stone-900 text-stone-50 hover:bg-stone-700',
  secundario: 'border border-stone-300 text-stone-900 hover:border-stone-900',
  peligro: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
  fantasma: 'text-stone-500 hover:text-stone-900',
}

export default function Boton({
  variante = 'primario',
  tipo = 'button',
  cargando = false,
  deshabilitado = false,
  onClick,
  children,
  className = '',
  ancho = false,
  to,
}) {
  const clases = `inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTES[variante] || VARIANTES.primario} ${ancho ? 'w-full' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={clases}>
        {children}
      </Link>
    )
  }

  return (
    <button type={tipo} onClick={onClick} disabled={cargando || deshabilitado} aria-busy={cargando} className={clases}>
      {cargando && <Spinner pequeno />}
      {children}
    </button>
  )
}
