'use client'

import { useCallback, useEffect, useState } from 'react'
import { getItems, postItem, putItem, deleteItem } from '@/services/fetchRepo'

export default function useItems() {
  const [items, setItems] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [exito, setExito] = useState(null)
  const [procesandoId, setProcesandoId] = useState(null)

  const cargar = useCallback(async () => {
    try {
      setCargando(true)
      setError(null)
      const data = await getItems()
      setItems(data.items)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  const notificar = useCallback((mensaje) => {
    setExito(mensaje)
    setTimeout(() => setExito(null), 3000)
  }, [])

  const agregar = useCallback(async (datos) => {
    setError(null)
    const data = await postItem(datos)
    setItems((prev) => [data.item, ...prev])
    notificar('Item creado correctamente')
  }, [notificar])

  const actualizar = useCallback(async (id, datos) => {
    try {
      setProcesandoId(id)
      setError(null)
      const data = await putItem(id, datos)
      setItems((prev) => prev.map((item) => (item.id === id ? data.item : item)))
      notificar('Item actualizado')
    } catch (err) {
      setError(err.message)
    } finally {
      setProcesandoId(null)
    }
  }, [notificar])

  const eliminar = useCallback(async (id) => {
    try {
      setProcesandoId(id)
      setError(null)
      await deleteItem(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      notificar('Item eliminado')
    } catch (err) {
      setError(err.message)
    } finally {
      setProcesandoId(null)
    }
  }, [notificar])

  return {
    items, cargando, error, exito, procesandoId,
    agregar, actualizar, eliminar, recargar: cargar,
    limpiarError: () => setError(null),
  }
}