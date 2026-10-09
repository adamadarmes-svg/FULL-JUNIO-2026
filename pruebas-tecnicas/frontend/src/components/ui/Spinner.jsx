function Spinner({ texto = 'Cargando...' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-black border-t-transparent" />
      {texto && <p className="text-sm tracking-wide text-black">{texto}</p>}
    </div>
  )
}

export default Spinner
