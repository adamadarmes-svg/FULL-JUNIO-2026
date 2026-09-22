import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
