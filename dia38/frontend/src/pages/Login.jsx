import { Navigate, useLocation } from 'react-router-dom'
import FormularioAuth from '../components/auth/FormularioAuth'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) return <Navigate to={location.state?.from?.pathname || '/'} replace />

  return <FormularioAuth modo="login" />
}
