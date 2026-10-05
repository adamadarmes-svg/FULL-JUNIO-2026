import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Día 36 / Ejercicios',
  description: 'Espero tu respuesta Gustavo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
          {children}
        </main>
        <footer className="border-t border-neutral-200">
          <div className="max-w-3xl mx-auto px-6 py-6 flex justify-between text-xs uppercase tracking-[0.2em] text-neutral-400">
            <span>© 2026</span>
            <span>Día 36 / Ejercicios</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
