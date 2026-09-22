import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import EditTask from './pages/EditTask';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTask from './pages/NewTask';
import TaskDetail from './pages/TaskDetail';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'new-task', element: <NewTask /> },
          { path: 'edit/:id', element: <EditTask /> },
          { path: 'task/:id', element: <TaskDetail /> },
        ],
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
