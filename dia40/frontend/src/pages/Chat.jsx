import { Navigate } from 'react-router-dom'
import ChatRoom from '../components/chat/ChatRoom'
import ConnectionStatus from '../components/chat/ConnectionStatus'
import Spinner from '../components/ui/Spinner'
import { useChat } from '../context/ChatContext'

export default function Chat() {
  const { nombre, enSala, error } = useChat()

  if (!nombre) {
    return <Navigate to="/" replace />
  }

  if (!enSala) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4">
        <Spinner texto="Entrando" />
        <ConnectionStatus />
        {error && <p className="max-w-sm text-center text-xs text-stone-400">{error}</p>}
      </main>
    )
  }

  return <ChatRoom />
}
