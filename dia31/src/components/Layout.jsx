import { NavLink, Outlet } from 'react-router-dom'

const enlaces = [
  { to: '/',          texto: 'Home'     },
  { to: '/about',     texto: 'About'    },
  { to: '/user/42',   texto: 'Usuario'  },
  { to: '/post/1',    texto: 'Post'     },
  { to: '/news',      texto: 'Noticias' },
]

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">

      <nav className="bg-white border-b border-zinc-200 px-8 sticky top-0 z-10">
        <div className="flex flex-wrap items-center gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mr-2 py-4">
            <span className="text-zinc-900 font-semibold tracking-tight">Día 31</span>
          </div>
          {enlaces.map(enlace => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              className={({ isActive }) =>
                `text-sm font-medium py-4 border-b-2 transition-colors ${
                  isActive
                    ? 'text-zinc-900 border-indigo-600'
                    : 'text-zinc-500 border-transparent hover:text-zinc-900'
                }`
              }
              end={enlace.to === '/'}
            >
              {enlace.texto}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto p-8">
        <Outlet />
      </main>

    </div>
  )
}

export default Layout