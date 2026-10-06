import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { ESTADOS, LIMITES, STORAGE_KEY, TIPOS } from '../lib/constantes'

const ChatContext = createContext(null)

function leerNombreGuardado() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

function guardarNombre(nombre) {
  try {
    localStorage.setItem(STORAGE_KEY, nombre)
  } catch {
    return
  }
}

function borrarNombre() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}

export function ChatProvider({ children }) {
  const [nombre, setNombre] = useState(leerNombreGuardado)
  const [enSala, setEnSala] = useState(false)
  const [mensajes, setMensajes] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [errorChat, setErrorChat] = useState(null)

  const entradaEnviadaRef = useRef(false)

  const onMensaje = useCallback(
    (datos) => {
      switch (datos?.tipo) {
        case TIPOS.HISTORIAL:
          setMensajes(Array.isArray(datos.mensajes) ? datos.mensajes : [])
          setEnSala(true)
          break
        case TIPOS.MENSAJE:
        case TIPOS.SISTEMA:
          setMensajes((previos) => [...previos, datos])
          break
        case TIPOS.USUARIOS:
          setUsuarios(Array.isArray(datos.usuarios) ? datos.usuarios : [])
          break
        case TIPOS.ERROR:
          setErrorChat(datos.texto ?? 'Error')
          if (!enSala) {
            borrarNombre()
            setNombre('')
          }
          break
        default:
          break
      }
    },
    [enSala],
  )

  const { estado, error, enviar, reconectar, desconectar } = useWebSocket({
    url: import.meta.env.VITE_WS_URL,
    onMensaje,
    activo: Boolean(nombre),
  })

  useEffect(() => {
    if (estado !== ESTADOS.CONECTADO) {
      entradaEnviadaRef.current = false
      return
    }
    if (nombre && !entradaEnviadaRef.current) {
      entradaEnviadaRef.current = enviar({ tipo: TIPOS.ENTRAR, nombre })
    }
  }, [estado, nombre, enviar])

  const entrar = useCallback((nombreElegido) => {
    const limpio = (nombreElegido ?? '').trim()
    if (limpio.length < LIMITES.NOMBRE_MIN) {
      setErrorChat(`Mínimo ${LIMITES.NOMBRE_MIN} caracteres`)
      return false
    }
    if (limpio.length > LIMITES.NOMBRE_MAX) {
      setErrorChat(`Máximo ${LIMITES.NOMBRE_MAX} caracteres`)
      return false
    }
    guardarNombre(limpio)
    setNombre(limpio)
    setErrorChat(null)
    return true
  }, [])

  const enviarMensaje = useCallback(
    (texto) => {
      const limpio = (texto ?? '').trim()
      if (!limpio) return false
      if (limpio.length > LIMITES.MENSAJE_MAX) {
        setErrorChat(`Máximo ${LIMITES.MENSAJE_MAX} caracteres`)
        return false
      }
      return enviar({ tipo: TIPOS.MENSAJE, texto: limpio })
    },
    [enviar],
  )

  const salir = useCallback(() => {
    desconectar()
    borrarNombre()
    setNombre('')
    setEnSala(false)
    setMensajes([])
    setUsuarios([])
    setErrorChat(null)
  }, [desconectar])

  const limpiarError = useCallback(() => {
    setErrorChat(null)
  }, [])

  const value = useMemo(
    () => ({
      nombre,
      enSala,
      mensajes,
      usuarios,
      errorChat,
      estado,
      error,
      entrar,
      enviarMensaje,
      salir,
      reconectar,
      limpiarError,
    }),
    [nombre, enSala, mensajes, usuarios, errorChat, estado, error, entrar, enviarMensaje, salir, reconectar, limpiarError],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const contexto = useContext(ChatContext)
  if (!contexto) {
    throw new Error('useChat debe usarse dentro de un ChatProvider')
  }
  return contexto
}
