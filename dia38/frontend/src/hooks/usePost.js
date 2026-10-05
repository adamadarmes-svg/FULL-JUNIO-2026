import { useEffect, useState } from 'react'
import { obtenerPost } from '../services/postService'

export default function usePost(id) {
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [idCargado, setIdCargado] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    obtenerPost(id)
      .then((data) => {
        if (controller.signal.aborted) return
        setPost(data.post)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError' || controller.signal.aborted) return
        setPost(null)
        setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setIdCargado(id)
      })

    return () => controller.abort()
  }, [id])

  const cargando = idCargado !== id

  return { post: cargando ? null : post, setPost, cargando, error: cargando ? null : error }
}
