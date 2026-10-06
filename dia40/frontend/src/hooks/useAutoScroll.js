import { useCallback, useEffect, useRef, useState } from 'react'

const UMBRAL_FONDO = 150

export function useAutoScroll(dependencia) {
  const contenedorRef = useRef(null)
  const finalRef = useRef(null)
  const cercaDelFondoRef = useRef(true)
  const [hayNuevos, setHayNuevos] = useState(false)

  useEffect(() => {
    const contenedor = contenedorRef.current
    if (!contenedor) return

    const alHacerScroll = () => {
      const distancia = contenedor.scrollHeight - contenedor.scrollTop - contenedor.clientHeight
      cercaDelFondoRef.current = distancia < UMBRAL_FONDO
      if (cercaDelFondoRef.current) setHayNuevos(false)
    }

    contenedor.addEventListener('scroll', alHacerScroll, { passive: true })
    return () => contenedor.removeEventListener('scroll', alHacerScroll)
  }, [])

  useEffect(() => {
    if (cercaDelFondoRef.current) {
      finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else {
      setHayNuevos(true)
    }
  }, [dependencia])

  const irAlFinal = useCallback(() => {
    cercaDelFondoRef.current = true
    setHayNuevos(false)
    finalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  return { contenedorRef, finalRef, hayNuevos, irAlFinal }
}
