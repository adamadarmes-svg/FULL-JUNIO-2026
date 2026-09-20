import { useState, useRef, useEffect } from 'react'

const mensajesIniciales = [
  { id: 1, texto: 'Bienvenido al ejercito',    autor: 'Sistema', tiempo: '4:00' },
  { id: 2, texto: 'Gracias por aceptarme, que debo hacer?',             autor: 'Tú',      tiempo: '4:01' },
  { id: 3, texto: 'Sigue las instrucciones y mantente alerta.', autor: 'Sistema', tiempo: '4:02' },
]

const Chat = () => {
  const [mensajes, setMensajes] = useState(mensajesIniciales)
  const [input, setInput] = useState('')

  const chatRef = useRef(null)
  const ultimoMensajeRef = useRef(null)

  useEffect(() => {
    if (ultimoMensajeRef.current) {
      ultimoMensajeRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [mensajes])

  const enviarMensaje = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const ahora = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    const nuevoMensaje = {
      id: Date.now(),
      texto: input.trim(),
      autor: 'Tú',
      tiempo: ahora,
    }

    setMensajes(prev => [...prev, nuevoMensaje])
    setInput('')

    setTimeout(() => {
      const respuestas = [
        'Interesante...',
        'Entendido',
        'Que bien',
        'si, claro.',
        'Que pasa?',
        'No estoy seguro de eso.',
      ]
      const respuesta = {
        id: Date.now() + 1,
        texto: respuestas[Math.floor(Math.random() * respuestas.length)],
        autor: 'Sistema',
        tiempo: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      }
      setMensajes(prev => [...prev, respuesta])
    }, 1000)
  }

  return (
    <div className="bg-white border border-gray-200 p-6 w-full">
      <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">
        Björn Ragnarsson
      </p>

      <div
        ref={chatRef}
        className="h-80 overflow-y-auto bg-gray-50 border border-gray-200 p-4 mb-4 w-full space-y-3"
      >
        {mensajes.map((msg, index) => {
          const esTuyo = msg.autor === 'Tú'
          const esUltimo = index === mensajes.length - 1

          return (
            <div
              key={msg.id}
              ref={esUltimo ? ultimoMensajeRef : null}
              className={`flex ${esTuyo ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md px-4 py-2 ${
                  esTuyo
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                <p className="text-sm">{msg.texto}</p>
                <p className="text-xs mt-1 text-gray-400">
                  {msg.tiempo}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <form onSubmit={enviarMensaje} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          ➤
        </button>
      </form>

    </div>
  )
}

export default Chat