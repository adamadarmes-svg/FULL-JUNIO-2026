import { createBrowserRouter } from 'react-router-dom'

import Layout     from './components/Layout'
import Home       from './pages/Home'
import About      from './pages/About'
import User       from './pages/User'
import ErrorPage  from './pages/ErrorPage'
import Post, { postLoader }           from './pages/Post'
import News                            from './pages/News'
import NewsDetail, { newsLoader }      from './pages/NewsDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,       
    errorElement: <ErrorPage />,
    children: [
      { path: '/',          element: <Home />  },
      { path: '/about',     element: <About /> },
      { path: '/user/:id',  element: <User />  },
      {
        path: '/post/:id',
        element: <Post />,
        loader: postLoader,         
        errorElement: <ErrorPage />,  
      },
      { path: '/news', element: <News /> },
      {
        path: '/news/:id',
        element: <NewsDetail />,
        loader: newsLoader,
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
])

export default router