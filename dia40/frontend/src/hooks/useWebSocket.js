import { useCallback, useEffect, useRef, useState } from 'react'
import { ESTADOS, RECONEXION } from '../lib/constantes'

export function useWebSocket({ url, onMensaje, activo }) {
  const socketRef = useRef(null)
  const temporizadorRef = useRef(null)
  const intentosRef = useRef(0)
  const cierreIntencionadoRef = useRef(false)
  const onMensajeRef = useRef(onMensaje)
  const conectarRef = useRef(null)

  const [estado, setEstado] = useState(activo ? ESTADOS.CONECTANDO : ESTADOS.DESCONECTADO)
  const [error, setError] = useState(null)
  const [activoPrevio, setActivoPrevio] = useState(activo)

  if (activo !== activoPrevio) {
    setActivoPrevio(activo)
    setEstado(activo ? ESTADOS.CONECTANDO : ESTADOS.DESCONECTADO)
    setError(null)
  }

  useEffect(() => {
    onMensajeRef.current = onMensaje
  }, [onMensaje])

  const limpiarTemporizador = useCallback(() => {
    if (temporizadorRef.current) {
      clearTimeout(temporizadorRef.current)
      temporizadorRef.current = null
    }
  }, [])

  const cerrarSocket = useCallback(() => {
    const socket = socketRef.current
    socketRef.current = null
    if (!socket) return
    if (socket.readyState === WebSocket.CONNECTING) {
      socket.onopen = () => socket.close()
      socket.onerror = null
      return
    }
    if (socket.readyState === WebSocket.OPEN) {
      socket.close()
    }
  }, [])

  const cerrarTodo = useCallback(() => {
    cierreIntencionadoRef.current = true
    limpiarTemporizador()
    cerrarSocket()
  }, [limpiarTemporizador, cerrarSocket])

  const conectar = useCallback(() => {
    limpiarTemporizador()
    cerrarSocket()
    if (!url) return

    cierreIntencionadoRef.current = false
    const socket = new WebSocket(url)
    socketRef.current = socket

    socket.onopen = () => {
      if (socketRef.current !== socket) return
      intentosRef.current = 0
      setEstado(ESTADOS.CONECTADO)
      setError(null)
    }

    socket.onmessage = (evento) => {
      if (socketRef.current !== socket) return
      let datos
      try {
        datos = JSON.parse(evento.data)
      } catch {
        return
      }
      onMensajeRef.current?.(datos)
    }

    socket.onerror = () => {
      if (socketRef.current !== socket) return
      setEstado(ESTADOS.ERROR)
      setError('Error de conexión')
    }

    socket.onclose = () => {
      if (socketRef.current !== socket) return
      socketRef.current = null
      if (cierreIntencionadoRef.current) return

      if (intentosRef.current < RECONEXION.INTENTOS_MAX) {
        const espera = Math.min(
          RECONEXION.ESPERA_BASE * 2 ** intentosRef.current,
          RECONEXION.ESPERA_MAX,
        )
        intentosRef.current += 1
        setEstado(ESTADOS.CONECTANDO)
        temporizadorRef.current = setTimeout(() => {
          temporizadorRef.current = null
          conectarRef.current?.()
        }, espera)
      } else {
        setEstado(ESTADOS.DESCONECTADO)
        setError('Servidor no disponible')
      }
    }
  }, [url, limpiarTemporizador, cerrarSocket])

  useEffect(() => {
    conectarRef.current = conectar
  }, [conectar])

  const enviar = useCallback((objeto) => {
    const socket = socketRef.current
    if (!socket || socket.readyState !== WebSocket.OPEN) return false
    socket.send(JSON.stringify(objeto))
    return true
  }, [])

  const desconectar = useCallback(() => {
    cerrarTodo()
    setEstado(ESTADOS.DESCONECTADO)
  }, [cerrarTodo])

  const reconectar = useCallback(() => {
    intentosRef.current = 0
    setEstado(ESTADOS.CONECTANDO)
    setError(null)
    conectar()
  }, [conectar])

  useEffect(() => {
    if (!activo) return
    intentosRef.current = 0
    conectar()
    return () => {
      cerrarTodo()
    }
  }, [activo, conectar, cerrarTodo])

  const sinUrl = activo && !url

  return {
    estado: sinUrl ? ESTADOS.ERROR : estado,
    error: sinUrl ? 'Servidor sin configurar' : error,
    enviar,
    reconectar,
    desconectar,
  }
}
