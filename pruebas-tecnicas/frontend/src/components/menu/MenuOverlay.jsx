import { useEffect, useState } from 'react'
import { useCatalog } from '../../context/CatalogContext'
import { DURACION } from '../../lib/constantes'
import MenuLink from './MenuLink'
import MenuPreview from './MenuPreview'

function MenuOverlay() {
  const { menu, menuAbierto, cerrarMenu } = useCatalog()
  const [itemActivo, setItemActivo] = useState(null)
  const [imagenPreview, setImagenPreview] = useState(null)

  useEffect(() => {
    if (!menuAbierto) return

    const alPulsarTecla = (e) => {
      if (e.key === 'Escape') cerrarMenu()
    }

    window.addEventListener('keydown', alPulsarTecla)
    return () => window.removeEventListener('keydown', alPulsarTecla)
  }, [menuAbierto, cerrarMenu])

  const limpiarHover = () => {
    setItemActivo(null)
    setImagenPreview(null)
  }

  return (
    <div
      id="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      inert={!menuAbierto}
      className={`fixed inset-0 z-40 bg-black transition-transform ease-mater ${
        menuAbierto ? 'translate-x-0' : 'pointer-events-none translate-x-full'
      }`}
      style={{ transitionDuration: `${DURACION.MENU}ms` }}
    >
      <div className="grid h-full grid-cols-1 px-6 pb-10 pt-24 md:grid-cols-2 md:gap-16 md:px-[10%] md:pt-28">
        <div className="flex min-h-0 flex-col justify-between gap-10 md:justify-center md:gap-16">
          <ul onMouseLeave={limpiarHover} className="flex flex-col gap-3 md:gap-4">
            {menu.principal.map((item, i) => (
              <MenuLink
                key={item.id}
                item={item}
                abierto={menuAbierto && itemActivo === item.slug}
                onHover={setItemActivo}
                onHoverSub={setImagenPreview}
                indice={i}
                visible={menuAbierto}
              />
            ))}
          </ul>

          <ul
            className={`flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-opacity ease-mater ${
              menuAbierto ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDuration: `${DURACION.MENU}ms`,
              transitionDelay: menuAbierto ? `${DURACION.MENU}ms` : '0ms',
            }}
          >
            {menu.secundario.map((item) => (
              <li key={item.id}>
                <a href={`#${item.slug}`} className="transition-colors duration-300 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <MenuPreview imagen={menuAbierto ? imagenPreview : null} />
      </div>
    </div>
  )
}

export default MenuOverlay
