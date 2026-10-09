function Alerta({ mensaje }) {
  if (!mensaje) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white p-6">
      <div
        role="alert"
        className="flex max-w-md flex-col items-center gap-6 border border-black p-8 text-center"
      >
        <p className="text-base text-black">{mensaje}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border border-black px-6 py-2 text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}

export default Alerta
