import { createContext, useContext, useState } from 'react'

const CounterContext = createContext(null)

export const CounterProvider = ({ children }) => {
  const [contador, setContador] = useState(0)

  const incrementar = () => setContador(c => c + 1)
  const decrementar = () => setContador(c => c - 1)
  const resetear   = () => setContador(0)

  return (
    <CounterContext.Provider value={{ contador, incrementar, decrementar, resetear }}>
      {children}
    </CounterContext.Provider>
  )
}

export const useCounter = () => useContext(CounterContext)

export default CounterContext