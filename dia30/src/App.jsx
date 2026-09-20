import { CounterProvider } from './context/CounterContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import AuthForm from './components/AuthForm'

import ContadorGlobal from './components/ContadorGlobal'
import TemaApp from './components/TemaApp'
import SelectorIdioma from './components/SelectorIdioma'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

const Nivel = ({ numero, children }) => {
  const { t } = useLanguage()

  return (
    <section>
      <h2 className="mb-4 flex items-baseline gap-3">
        <span className="text-sm font-semibold uppercase tracking-widest">
          {t('Nivel')} {numero}
        </span>
      </h2>
      {children}
    </section>
  )
}

const Contenido = () => {
  const { tema } = useTheme()
  const { t } = useLanguage()
  const { isLoggedIn, usuario, logout } = useAuth()

  if (!isLoggedIn) {
    return (
      <div
        data-theme={tema}
        className="min-h-screen bg-bg font-sans text-ink transition-colors duration-300"
      >
        <div className="mx-auto max-w-sm px-6 py-12">
          <AuthForm />
        </div>
      </div>
    )
  }

  return (
    <div
      data-theme={tema}
      className="min-h-screen bg-bg font-sans text-ink transition-colors duration-300"
    >
      <div className="mx-auto max-w-3xl px-6 py-12 xl:max-w-7xl">
        <header className="mb-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-mute">{usuario.nombre}</span>
              <button onClick={logout} className="btn-line">
                {t('Cambiar usuario')}
              </button>
            </div>
            <button onClick={logout} className="btn-line text-danger hover:border-danger">
              {t('Cerrar sesión')}
            </button>
          </div>

          <h1 className="text-center text-4xl font-bold tracking-tight">Día 30</h1>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-[16rem_minmax(0,1fr)_19rem]">
          <aside className="xl:sticky xl:top-6">
            <TemaApp />
          </aside>

          <main className="space-y-12">
            <Nivel numero={1}>
              <div className="grid gap-6 sm:grid-cols-2">
                <ContadorGlobal />
                <SelectorIdioma />
              </div>
            </Nivel>

            <Nivel numero={2}>
              <ProductList />
            </Nivel>
          </main>

          <aside className="xl:sticky xl:top-6">
            <Cart />
          </aside>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Contenido />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </CounterProvider>
  )
}

export default App
