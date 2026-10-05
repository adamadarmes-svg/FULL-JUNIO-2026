import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:py-16">
        <Outlet />
      </main>
      <footer className="border-t border-stone-200">
        <div className="etiqueta mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-stone-500 sm:flex-row sm:justify-between">
          <span>Respawn © {new Date().getFullYear()}</span>
          <span>Escrito con café y lo-fi de fondo</span>
        </div>
      </footer>
    </div>
  )
}
