const About = () => {
  return (
    <div className="bg-white border border-zinc-200 p-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
        Acerca de Día 31
      </h1>
      <p className="text-zinc-500 mb-8">
        Página de noticias directas, historias que importan y una mirada fresca a lo que sucede cada día.
      </p>

      <div className="border border-zinc-200 divide-y divide-zinc-200">
        <div className="p-4 flex items-baseline gap-4">
          <p className="font-mono text-sm text-zinc-900 bg-zinc-100 px-1.5 py-0.5 shrink-0">createBrowserRouter</p>
          <p className="text-zinc-500 text-sm">Define las rutas como un array de objetos</p>
        </div>
        <div className="p-4 flex items-baseline gap-4">
          <p className="font-mono text-sm text-zinc-900 bg-zinc-100 px-1.5 py-0.5 shrink-0">RouterProvider</p>
          <p className="text-zinc-500 text-sm">Renderiza el router en la app</p>
        </div>
        <div className="p-4 flex items-baseline gap-4">
          <p className="font-mono text-sm text-zinc-900 bg-zinc-100 px-1.5 py-0.5 shrink-0">loader</p>
          <p className="text-zinc-500 text-sm">Carga datos antes de renderizar el componente</p>
        </div>
        <div className="p-4 flex items-baseline gap-4">
          <p className="font-mono text-sm text-zinc-900 bg-zinc-100 px-1.5 py-0.5 shrink-0">errorElement</p>
          <p className="text-zinc-500 text-sm">Muestra una página de error si algo falla</p>
        </div>
      </div>
    </div>
  )
}

export default About