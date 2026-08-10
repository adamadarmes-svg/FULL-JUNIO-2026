const generarPares = (cantidad) =>
  Array.from({ length: cantidad }, (_, i) => (i + 1) * 2)

function NumerosPares() {
  const pares = generarPares(10)

  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase mb-5">
        Primeros 10 pares
      </h2>
      <div className="flex flex-wrap gap-2">
        {pares.map((num) => (
          <span
            key={num}
            className="w-10 h-10 border border-amber-600/30 flex items-center justify-center text-sm font-mono text-black/70 hover:border-amber-600/60 transition-colors duration-200"
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  )
}

export default NumerosPares
