import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Día 35',
  description: 'Ejercicios del día 35',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 antialiased">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
          {children}
        </main>
        <footer className="py-6 text-center text-[11px] uppercase tracking-[0.2em] text-neutral-400 bg-white border-t border-neutral-200">
          © 2026 Día 35 Ejercicios
        </footer>
      </body>
    </html>
  )
}
