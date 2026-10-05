import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'Día 34',
  description: 'Nikola Tesla',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
          {children}
        </main>
        <footer className="border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between text-xs text-stone-400">
            <span>© 2026 Día 34</span>
            <span>Ejercicios</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
