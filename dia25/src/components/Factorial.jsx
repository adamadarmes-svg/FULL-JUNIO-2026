import { useState } from 'react'

const factorial = (n) => {
  if (n <= 1) return 1       
  return n * factorial(n - 1)  
}

const generarPasos = (n) => {
  const pasos = []
  for (let i = n; i >= 1; i--) {
    pasos.push(i)
  }
  return pasos
}

const Factorial = () => {
  const [numero, setNumero] = useState(5)
  const resultado = factorial(numero)
  const pasos = generarPasos(numero)

  return (
    <div className="bg-gray-900 border border-gray-800 shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">
        Factorial recursivo
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-gray-300 font-medium">Número</label>
        <input
          type="number"
          min={0}
          max={12}
          value={numero}
          onChange={e => setNumero(Math.min(12, Math.max(0, Number(e.target.value))))}
          className="bg-gray-800 border border-gray-700 text-gray-100 px-3 py-2 w-24 text-center focus:outline-none focus:border-blue-500"
        />
        <span className="text-xs text-gray-500">(máx 12 para evitar overflow)</span>
      </div>

      <div className="bg-gray-800 border border-gray-700 p-4 mb-4">
        <p className="text-gray-400 text-sm mb-1">Resultado</p>
        <p className="text-3xl font-bold text-blue-400">
          {numero}! = {resultado.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-950 border border-gray-800 p-4">
        <p className="text-gray-400 text-sm font-medium mb-2">
          Cómo se calcula (recursión):
        </p>
        <div className="font-mono text-sm text-gray-300 space-y-1">
          {pasos.map((paso, index) => (
            <p key={index} style={{ paddingLeft: `${index * 12}px` }}>
              {paso === 1
                ? `factorial(1) = 1  ← caso base`
                : `factorial(${paso}) = ${paso} × factorial(${paso - 1})`
              }
            </p>
          ))}
          <p className="text-blue-400 font-bold mt-2">
            = {pasos.join(' × ')} = {resultado.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Factorial