import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import RutaActual from '@/components/RutaActual'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata = {
  title: 'Día 33',
  description: 'Ejercicios Día 33',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
          <RutaActual />
          {children}
        </main>
        <footer className="border-t border-line">
          <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between text-xs uppercase tracking-[0.2em] text-muted">
            <span>Día 33</span>
            <span>© 2026</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
