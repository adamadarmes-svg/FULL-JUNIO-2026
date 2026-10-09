import { useCatalog } from '../../context/CatalogContext'
import { DURACION } from '../../lib/constantes'

function Header() {
  const { menuAbierto, alternarMenu } = useCatalog()

  const color = menuAbierto ? 'text-white border-white' : 'text-black border-neutral-300'
  const transicionColor = {
    transitionDuration: '300ms',
    transitionDelay: menuAbierto ? `${DURACION.MENU * 0.6}ms` : '0ms',
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-[10%] md:py-5">
      <a
        href="/"
        className={`pointer-events-auto font-serif text-lg font-bold lowercase tracking-wide transition-colors ${color}`}
        style={transicionColor}
      >
        mater
      </a>

      <button
        type="button"
        onClick={alternarMenu}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
        aria-controls="menu-overlay"
        className={`pointer-events-auto flex h-9 w-9 items-center justify-center border transition-colors ${color}`}
        style={transicionColor}
      >
        <span className="relative block h-3 w-4">
          <span
            className={`absolute right-0 top-1/2 h-px w-full bg-current transition-all duration-300 ease-mater ${
              menuAbierto ? 'translate-y-0 rotate-45' : '-translate-y-[3px] rotate-0'
            }`}
          />
          <span
            className={`absolute right-0 top-1/2 h-px bg-current transition-all duration-300 ease-mater ${
              menuAbierto ? 'w-full translate-y-0 -rotate-45' : 'w-1/2 translate-y-[3px] rotate-0'
            }`}
          />
        </span>
      </button>
    </header>
  )
}

export default Header
