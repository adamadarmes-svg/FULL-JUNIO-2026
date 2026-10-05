import { useCallback, useEffect, useState } from 'react'
import {
  actualizarComentario,
  crearComentario,
  eliminarComentario,
  listarComentarios,
} from '../services/commentService'

export default function useComments(postId) {
  const [comentarios, setComentarios] = useState([])
  const [error, setError] = useState(null)
  const [procesandoId, setProcesandoId] = useState(null)
  const [postIdCargado, setPostIdCargado] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    listarComentarios(postId)
      .then((data) => {
        if (controller.signal.aborted) return
        setComentarios(data.comentarios)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError' || controller.signal.aborted) return
        setComentarios([])
        setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setPostIdCargado(postId)
      })

    return () => controller.abort()
  }, [postId])

  const agregar = useCallback(
    async (contenido) => {
      setProcesandoId('nuevo')
      try {
        const data = await crearComentario(postId, contenido)
        setComentarios((prev) => [...prev, data.comentario])
        return data.comentario
      } finally {
        setProcesandoId(null)
      }
    },
    [postId]
  )

  const editar = useCallback(
    async (comentarioId, contenido) => {
      setProcesandoId(comentarioId)
      try {
        const data = await actualizarComentario(postId, comentarioId, contenido)
        setComentarios((prev) => prev.map((c) => (c.id === comentarioId ? data.comentario : c)))
        return data.comentario
      } finally {
        setProcesandoId(null)
      }
    },
    [postId]
  )

  const eliminar = useCallback(
    async (comentarioId) => {
      setProcesandoId(comentarioId)
      setError(null)
      try {
        await eliminarComentario(postId, comentarioId)
        setComentarios((prev) => prev.filter((c) => c.id !== comentarioId))
      } catch (err) {
        setError(err.message)
      } finally {
        setProcesandoId(null)
      }
    },
    [postId]
  )

  const limpiarError = useCallback(() => setError(null), [])

  const cargando = postIdCargado !== postId

  return {
    comentarios: cargando ? [] : comentarios,
    cargando,
    error,
    procesandoId,
    agregar,
    editar,
    eliminar,
    limpiarError,
  }
}
