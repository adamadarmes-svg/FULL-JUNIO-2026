import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Chat from '../pages/Chat'
import ErrorPage from '../pages/ErrorPage'

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <ErrorPage /> },
  { path: '/chat', element: <Chat />, errorElement: <ErrorPage /> },
  { path: '*', element: <ErrorPage /> },
])

export default router
