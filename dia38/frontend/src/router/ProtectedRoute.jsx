import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { cargando, isAuthenticated } = useAuth()
  const location = useLocation()

  if (cargando) return <Spinner texto="Comprobando tu sesión…" />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
