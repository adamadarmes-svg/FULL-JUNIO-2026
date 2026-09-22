import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const estiloEnlace = ({ isActive }) =>
  `border-b px-1 py-2 text-sm font-medium transition ${
    isActive
      ? 'border-zinc-100 text-zinc-100'
      : 'border-transparent text-zinc-500 hover:text-zinc-200'
  }`;

function Navbar() {
  const { email, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide text-zinc-100 transition hover:text-zinc-300"
          >
            DIA 32
          </Link>
          <div className="flex items-center gap-4">
            <NavLink to="/" end className={estiloEnlace}>
              Mis tareas
            </NavLink>
            <NavLink to="/new-task" className={estiloEnlace}>
              Nueva tarea
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-zinc-500 sm:inline">
            {email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="border border-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100 cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
