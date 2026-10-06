import Spinner from './Spinner'

const VARIANTES = {
  primario: 'bg-stone-900 text-stone-50 enabled:hover:bg-stone-700',
  secundario: 'border border-stone-300 text-stone-900 enabled:hover:border-stone-900',
  peligro: 'bg-red-700 text-white enabled:hover:bg-red-600',
}

export default function Boton({
  variante = 'primario',
  tipo = 'button',
  cargando = false,
  deshabilitado = false,
  onClick,
  children,
  ancho = false,
  className = '',
}) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado || cargando}
      aria-busy={cargando || undefined}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-oro disabled:cursor-not-allowed disabled:opacity-40 ${
        VARIANTES[variante] ?? VARIANTES.primario
      } ${ancho ? 'w-full' : ''} ${className}`}
    >
      {cargando && <Spinner pequeno />}
      {children}
    </button>
  )
}
