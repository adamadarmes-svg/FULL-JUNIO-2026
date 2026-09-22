import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loginUsuario, registrarUsuario } from '../services/api'

const STORAGE_KEY = 'dia32_usuario'

const UserContext = createContext(null)

const leerUsuarioGuardado = () => {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (!guardado) return null
    const datos = JSON.parse(guardado)
    if (!datos?.id || !datos?.email) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return { id: datos.id, email: datos.email }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado)

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [usuario])

  const login = useCallback(async (email, password) => {
    const data = await loginUsuario(email, password)
    const nuevoUsuario = { id: data.id, email: data.email }
    setUsuario(nuevoUsuario)
    return nuevoUsuario
  }, [])

  const registro = useCallback(async (email, password, confirmPassword) => {
    const data = await registrarUsuario(email, password, confirmPassword)
    const nuevoUsuario = { id: data.id, email: data.email }
    setUsuario(nuevoUsuario)
    return nuevoUsuario
  }, [])

  const logout = useCallback(() => {
    setUsuario(null)
  }, [])

  const value = useMemo(() => ({
    usuario,
    id: usuario?.id ?? null,
    email: usuario?.email ?? null,
    isAuthenticated: Boolean(usuario),
    login,
    registro,
    logout,
  }), [usuario, login, registro, logout])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const contexto = useContext(UserContext)
  if (!contexto) {
    throw new Error('useUser debe usarse dentro de UserProvider')
  }
  return contexto
}