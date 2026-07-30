import { useState } from 'react'
import Button from './Button'

const HISTORY_KEY = 'dia18-calculator-history'

function loadHistory() {
  const stored = sessionStorage.getItem(HISTORY_KEY)
  return stored ? JSON.parse(stored) : []
}

function Calculator({ className = '' }) {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState(loadHistory)

  const canOperate =
    a !== '' && b !== '' && !Number.isNaN(parseFloat(a)) && !Number.isNaN(parseFloat(b))

  const operate = (op) => {
    if (!canOperate) return
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    let res
    if (op === '+') res = numA + numB
    if (op === '-') res = numA - numB
    if (op === '*') res = numA * numB
    if (op === '/') res = numB !== 0 ? numA / numB : 'Error'

    setResult(res)
    setHistory((prev) => {
      const next = [...prev, `${numA} ${op} ${numB} = ${res}`]
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(next))
      return next
    })
  }

  const clearHistory = () => {
    setHistory([])
    sessionStorage.removeItem(HISTORY_KEY)
  }

  return (
    <div className={`bg-paper border border-ink p-6 ${className}`}>
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 text-gold">
        Calculadora
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Número 1"
          className="border border-ink px-3 py-2 w-full focus-outline-none focus-border-gold transition-colors duration-200"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Número 2"
          className="border border-ink px-3 py-2 w-full focus-outline-none focus-border-gold transition-colors duration-200"
        />
      </div>
      <div className="flex gap-2 mb-4">
        {['+', '-', '*', '/'].map((op) => (
          <Button key={op} text={op} onClick={() => operate(op)} disabled={!canOperate} />
        ))}
      </div>
      {result !== null && (
        <p className="text-lg font-bold">
          Resultado: <span className="text-gold">{result}</span>
        </p>
      )}

      {history.length > 0 && (
        <div className="mt-4 border-t border-ink pt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest">
              Historial
            </h3>
            <Button
              text="Limpiar"
              variant="danger"
              onClick={clearHistory}
              className="px-2-py-1-text-xs"
            />
          </div>
          <ul className="text-sm text-ink-70 space-y-1 max-h-40 overflow-y-auto">
            {history.map((entry, i) => (
              <li key={i} className="transition-colors duration-200 hover-text-ink">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Calculator