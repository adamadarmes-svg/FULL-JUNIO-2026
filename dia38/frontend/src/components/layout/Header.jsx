import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { inicial } from '../../lib/formato'

const claseEnlace = ({ isActive }) =>
  `etiqueta transition-colors hover:text-stone-900 ${isActive ? 'text-stone-900 underline underline-offset-8' : 'text-stone-500'}`

export default function Header() {
  const { usuario, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const salir = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-10 gap-y-4 px-4 py-5">
        <Link to="/" className="font-serif text-3xl italic leading-none">
          Respawn
        </Link>

        <nav className="order-last flex w-full gap-6 sm:order-none sm:w-auto sm:flex-1">
          <NavLink to="/" end className={claseEnlace}>
            Feed
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/mis-posts" className={claseEnlace}>
                Mis posts
              </NavLink>
              <NavLink to="/nuevo" className={claseEnlace}>
                Escribir
              </NavLink>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-5 sm:ml-0">
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center border border-stone-300 font-mono text-xs">
                  {inicial(usuario?.nombre)}
                </span>
                <span className="hidden text-sm md:inline">{usuario?.nombre}</span>
              </span>
              <button type="button" onClick={salir} className="etiqueta cursor-pointer text-stone-500 transition-colors hover:text-stone-900">
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={claseEnlace}>
                Entrar
              </NavLink>
              <Link to="/registro" className="etiqueta bg-stone-900 px-3 py-2 text-stone-50 transition-colors hover:bg-stone-700">
                Unirse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
