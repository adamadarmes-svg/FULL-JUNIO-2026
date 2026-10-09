import { useCallback, useEffect, useRef, useState } from 'react'
import { DURACION, UMBRAL_SCROLL, UMBRAL_SWIPE } from '../lib/constantes'

export function useScrollSlider({ total, duracionBloqueo = DURACION.BLOQUEO, activo = true }) {
  const [indice, setIndice] = useState(0)
  const [direccion, setDireccion] = useState('abajo')
  const [bloqueado, setBloqueado] = useState(false)

  const bloqueadoRef = useRef(false)
  const temporizador = useRef(null)
  const inicioTouch = useRef(null)

  const ir = useCallback(
    (nuevoIndice, dir) => {
      if (bloqueadoRef.current) return
      if (nuevoIndice < 0 || nuevoIndice >= total) return
      if (nuevoIndice === indice) return

      setIndice(nuevoIndice)
      setDireccion(dir)

      bloqueadoRef.current = true
      setBloqueado(true)

      clearTimeout(temporizador.current)
      temporizador.current = setTimeout(() => {
        bloqueadoRef.current = false
        setBloqueado(false)
      }, duracionBloqueo)
    },
    [indice, total, duracionBloqueo]
  )

  const siguiente = useCallback(() => ir(indice + 1, 'abajo'), [ir, indice])

  const anterior = useCallback(() => ir(indice - 1, 'arriba'), [ir, indice])

  const irA = useCallback(
    (i) => ir(i, i > indice ? 'abajo' : 'arriba'),
    [ir, indice]
  )

  useEffect(() => {
    if (!activo) return

    const alGirarRueda = (e) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < UMBRAL_SCROLL) return
      if (e.deltaY > 0) siguiente()
      else anterior()
    }

    const alPulsarTecla = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        siguiente()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        anterior()
      }
    }

    const alTocar = (e) => {
      inicioTouch.current = e.touches[0].clientY
    }

    const alSoltar = (e) => {
      if (inicioTouch.current === null) return
      const diferencia = inicioTouch.current - e.changedTouches[0].clientY
      inicioTouch.current = null
      if (Math.abs(diferencia) < UMBRAL_SWIPE) return
      if (diferencia > 0) siguiente()
      else anterior()
    }

    window.addEventListener('wheel', alGirarRueda, { passive: false })
    window.addEventListener('keydown', alPulsarTecla)
    window.addEventListener('touchstart', alTocar, { passive: true })
    window.addEventListener('touchend', alSoltar)

    return () => {
      window.removeEventListener('wheel', alGirarRueda)
      window.removeEventListener('keydown', alPulsarTecla)
      window.removeEventListener('touchstart', alTocar)
      window.removeEventListener('touchend', alSoltar)
    }
  }, [activo, siguiente, anterior])

  useEffect(() => {
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflowAnterior
      clearTimeout(temporizador.current)
    }
  }, [])

  return { indice, direccion, bloqueado, siguiente, anterior, irA }
}
