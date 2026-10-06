import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Alerta from '../components/ui/Alerta'
import Boton from '../components/ui/Boton'
import { useChat } from '../context/ChatContext'
import { LIMITES } from '../lib/constantes'

export default function Home() {
  const { nombre, enSala, entrar, errorChat, limpiarError, usuarios } = useChat()
  const navigate = useNavigate()
  const nombreRef = useRef(null)
  const [errorLocal, setErrorLocal] = useState(null)

  if (nombre && enSala) {
    return <Navigate to="/chat" replace />
  }

  const alEnviar = (evento) => {
    evento.preventDefault()
    const valor = nombreRef.current?.value.trim() ?? ''

    if (valor.length < LIMITES.NOMBRE_MIN) {
      setErrorLocal(`Mínimo ${LIMITES.NOMBRE_MIN} caracteres`)
      nombreRef.current?.focus()
      return
    }

    if (valor.length > LIMITES.NOMBRE_MAX) {
      setErrorLocal(`Máximo ${LIMITES.NOMBRE_MAX} caracteres`)
      nombreRef.current?.focus()
      return
    }

    setErrorLocal(null)
    if (entrar(valor)) {
      navigate('/chat')
    }
  }

  const hayError = Boolean(errorLocal || errorChat)

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm border border-stone-200 bg-white p-8 sm:p-10">
        <header className="mb-10 border-b border-stone-200 pb-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-oro">Chat</p>
          <h1 className="mt-2 font-serif text-5xl font-light">Sala</h1>
        </header>

        <form onSubmit={alEnviar} noValidate className="flex flex-col gap-6">
          <Alerta tipo="error" mensaje={errorLocal} onCerrar={() => setErrorLocal(null)} />
          <Alerta tipo="error" mensaje={errorChat} onCerrar={limpiarError} />

          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
              Nombre
            </label>
            <input
              id="nombre"
              ref={nombreRef}
              type="text"
              autoFocus
              autoComplete="off"
              maxLength={LIMITES.NOMBRE_MAX}
              placeholder="Ana"
              aria-invalid={hayError}
              onInput={() => errorLocal && setErrorLocal(null)}
              className="border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-base transition-colors placeholder:text-stone-300 focus:border-stone-900 focus:outline-none"
            />
            <p className="text-xs text-stone-400">
              {LIMITES.NOMBRE_MIN} a {LIMITES.NOMBRE_MAX} caracteres
            </p>
          </div>

          <Boton tipo="submit" ancho className="py-3">
            Entrar
          </Boton>
        </form>

        {usuarios.length > 0 && (
          <p className="mt-8 flex items-center gap-2 text-xs text-stone-500">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-oro" />
            {usuarios.length} en línea
          </p>
        )}
      </div>
    </main>
  )
}
