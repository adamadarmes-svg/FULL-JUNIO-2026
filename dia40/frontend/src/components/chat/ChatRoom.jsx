import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'
import Alerta from '../ui/Alerta'
import Boton from '../ui/Boton'
import ConnectionStatus from './ConnectionStatus'
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import UserList from './UserList'

export default function ChatRoom() {
  const { nombre, usuarios, errorChat, limpiarError, salir } = useChat()
  const navigate = useNavigate()
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false)

  const alSalir = () => {
    salir()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="relative flex items-center justify-between gap-4 border-b border-stone-200 bg-white px-4 py-4 sm:px-8">
        <div className="flex min-w-0 items-baseline gap-5">
          <h1 className="font-serif text-3xl font-light">Sala</h1>
          <ConnectionStatus />
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => setMostrarUsuarios((visible) => !visible)}
            aria-expanded={mostrarUsuarios}
            aria-controls="usuarios-movil"
            className="cursor-pointer border border-stone-300 px-3 py-1.5 text-xs tabular-nums transition-colors hover:border-stone-900 md:hidden"
          >
            {usuarios.length}
            <span className="sr-only"> en línea</span>
          </button>

          <span className="hidden max-w-40 truncate text-sm text-stone-500 sm:inline">{nombre}</span>

          <Boton variante="secundario" onClick={alSalir}>
            Salir
          </Boton>
        </div>

        {mostrarUsuarios && (
          <div
            id="usuarios-movil"
            className="absolute right-4 top-full z-20 max-h-80 w-64 overflow-y-auto border border-stone-200 bg-white p-5 md:hidden"
          >
            <UserList />
          </div>
        )}
      </header>

      {errorChat && (
        <div className="px-4 pt-3 sm:px-8">
          <Alerta tipo="error" mensaje={errorChat} onCerrar={limpiarError} />
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          <MessageList />
          <MessageForm />
        </main>

        <aside className="hidden w-64 shrink-0 overflow-y-auto border-l border-stone-200 p-6 md:block">
          <UserList />
        </aside>
      </div>
    </div>
  )
}
