import { useState } from 'react'

const useToggle = (valorInicial: boolean = false): [boolean, () => void] => {
  const [estado, setEstado] = useState<boolean>(valorInicial)

  const alternar = (): void => {
    setEstado(prev => !prev)
  }

  return [estado, alternar]
}

export default useToggle