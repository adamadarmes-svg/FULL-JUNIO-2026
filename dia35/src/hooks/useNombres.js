'use client'

import { useCallback, useEffect, useState } from 'react'
import { getNombres, postNombre, putNombre, deleteNombre } from '@/services/fetchRepo'

export default function useNombres() {
  const [nombres, setNombres] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [procesandoId, setProcesandoId] = useState(null)

  const cargar = useCallback(async () => {
    try {
      setCargando(true)
      setError(null)
      const data = await getNombres()
      setNombres(data.nombres)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  const agregar = useCallback(async (nombre) => {
    setError(null)
    const data = await postNombre(nombre)
    setNombres((prev) => [...prev, data.nombre])
    return data
  }, [])

  const editar = useCallback(async (id, nombre) => {
    try {
      setProcesandoId(id)
      setError(null)
      const data = await putNombre(id, nombre)
      setNombres((prev) => prev.map((item) => (item.id === id ? data.nombre : item)))
    } catch (err) {
      setError(err.message)
    } finally {
      setProcesandoId(null)
    }
  }, [])

  const eliminar = useCallback(async (id) => {
    try {
      setProcesandoId(id)
      setError(null)
      await deleteNombre(id)
      setNombres((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setProcesandoId(null)
    }
  }, [])

  return { nombres, cargando, error, procesandoId, agregar, editar, eliminar, recargar: cargar }
}