import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../lib/constantes'
import { iniciarSesion, obtenerPerfil, registrar } from '../services/authService'

const AuthContext = createContext(null)

function limpiarStorage() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USUARIO)
}

function leerUsuario() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEYS.USUARIO)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    limpiarStorage()
    return null
  }
}

function leerToken() {
  try {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  } catch {
    limpiarStorage()
    return null
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuario)
  const [token, setToken] = useState(leerToken)
  const [cargando, setCargando] = useState(() => Boolean(leerToken()))

  const guardarSesion = useCallback((nuevoUsuario, nuevoToken) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, nuevoToken)
    localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(nuevoUsuario))
    setUsuario(nuevoUsuario)
    setToken(nuevoToken)
  }, [])

  const logout = useCallback(() => {
    limpiarStorage()
    setUsuario(null)
    setToken(null)
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.TOKEN)) return

    let activo = true

    obtenerPerfil()
      .then((data) => {
        if (!activo) return
        setUsuario(data.usuario)
        localStorage.setItem(STORAGE_KEYS.USUARIO, JSON.stringify(data.usuario))
      })
      .catch(() => {
        if (activo) logout()
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [logout])

  const login = useCallback(
    async (email, password) => {
      const data = await iniciarSesion(email, password)
      guardarSesion(data.usuario, data.token)
      return data.usuario
    },
    [guardarSesion]
  )

  const registro = useCallback(
    async (nombre, email, password) => {
      const data = await registrar(nombre, email, password)
      guardarSesion(data.usuario, data.token)
      return data.usuario
    },
    [guardarSesion]
  )

  const value = useMemo(() => {
    const esAdmin = usuario?.rol === 'admin'
    return {
      usuario,
      token,
      cargando,
      isAuthenticated: Boolean(usuario && token),
      esAdmin,
      esAutor: (autorId) => Boolean(usuario) && (esAdmin || String(autorId) === String(usuario.id)),
      login,
      registro,
      logout,
    }
  }, [usuario, token, cargando, login, registro, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
