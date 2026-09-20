import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    usuario: null,
  })
  const [registrados, setRegistrados] = useState([])

  const entrar = (u) => {
    setAuth({
      isLoggedIn: true,
      usuario: { nombre: u.nombre, rol: 'Usuario' }
    })
  }

  const login = (email, password) => {
    const u = registrados.find(r => r.email === email && r.password === password)
    if (!u) return 'Email o contraseña incorrectos'
    entrar(u)
    return null
  }

  const registrar = (nombre, email, password) => {
    if (registrados.some(r => r.email === email)) return 'Ese email ya está registrado'
    const u = { nombre, email, password }
    setRegistrados([...registrados, u])
    entrar(u)
    return null
  }

  const logout = () => {
    setAuth({ isLoggedIn: false, usuario: null })
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
