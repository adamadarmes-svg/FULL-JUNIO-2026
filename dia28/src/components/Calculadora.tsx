import { useState } from 'react'

const sumar = (a: number, b: number): number => {
  return a + b
}

const Calculadora = () => {
  const [a, setA] = useState<number>(0)
  const [b, setB] = useState<number>(0)

  const resultado: number = sumar(a, b)

  return (
    <div className="bg-white border border-gray-200 p-6 w-80">
      <p className="text-gray-500 text-sm mb-3">
        Primer monarca ruso en adoptar el título de zar
      </p>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          value={a}
          onChange={e => setA(Number(e.target.value))}
          className="border border-gray-300 px-3 py-2 w-16 focus:outline-none focus:border-gray-900"
        />
        <span className="text-2xl font-bold text-gray-500">+</span>
        <input
          type="number"
          value={b}
          onChange={e => setB(Number(e.target.value))}
          className="border border-gray-300 px-3 py-2 w-16 focus:outline-none focus:border-gray-900"
        />
        <span className="text-2xl font-bold text-gray-500">=</span>
        <span className="text-3xl font-bold text-gray-900">{resultado}</span>
      </div>
    </div>
  )
}

export default Calculadora