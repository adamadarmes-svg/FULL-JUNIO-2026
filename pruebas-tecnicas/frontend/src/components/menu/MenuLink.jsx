import { DURACION } from '../../lib/constantes'
import SubMenu from './SubMenu'

const RETARDO_ESCALONADO = 80

function MenuLink({ item, abierto, onHover, onHoverSub, indice, visible }) {
  const tieneSubmenu = item.submenu?.length > 0

  return (
    <li
      onMouseEnter={() => onHover(item.slug)}
      className={`transition-all ease-mater ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{
        transitionDuration: `${DURACION.MENU}ms`,
        transitionDelay: visible ? `${DURACION.MENU / 2 + indice * RETARDO_ESCALONADO}ms` : '0ms',
      }}
    >
      <a
        href={`#${item.slug}`}
        onFocus={() => onHover(item.slug)}
        aria-expanded={tieneSubmenu ? abierto : undefined}
        className="inline-block text-4xl font-light leading-tight text-white transition-transform duration-300 ease-mater hover:translate-x-3 md:text-6xl"
      >
        {item.label}
      </a>

      {tieneSubmenu && <SubMenu items={item.submenu} abierto={abierto} onHoverItem={onHoverSub} />}
    </li>
  )
}

export default MenuLink
