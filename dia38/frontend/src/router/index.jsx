import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import PostDetail from '../pages/PostDetail'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import NewPost from '../pages/NewPost'
import EditPost from '../pages/EditPost'
import MisPosts from '../pages/MisPosts'
import ErrorPage from '../pages/ErrorPage'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'post/:id', element: <PostDetail /> },
      { path: 'login', element: <Login /> },
      { path: 'registro', element: <Registro /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'nuevo', element: <NewPost /> },
          { path: 'editar/:id', element: <EditPost /> },
          { path: 'mis-posts', element: <MisPosts /> },
        ],
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
])

export default router
