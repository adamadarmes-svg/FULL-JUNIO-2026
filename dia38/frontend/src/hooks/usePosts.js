import { useCallback, useEffect, useState } from 'react'
import { POSTS_POR_PAGINA } from '../lib/constantes'
import { eliminarPost, listarPosts } from '../services/postService'

export default function usePosts({ autor } = {}) {
  const [posts, setPosts] = useState([])
  const [paginacion, setPaginacion] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [pagina, setPagina] = useState(1)
  const [recargas, setRecargas] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    listarPosts({ page: pagina, limit: POSTS_POR_PAGINA, autor })
      .then((data) => {
        if (controller.signal.aborted) return
        setPosts(data.posts)
        setPaginacion(data.paginacion)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError' || controller.signal.aborted) return
        setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false)
      })

    return () => controller.abort()
  }, [pagina, autor, recargas])

  const eliminar = useCallback(async (id) => {
    await eliminarPost(id)
    setPosts((prev) => prev.filter((post) => post.id !== id))
    setPaginacion((prev) => (prev ? { ...prev, total: Math.max(0, prev.total - 1) } : prev))
  }, [])

  const cambiarPagina = useCallback(
    (nuevaPagina) => {
      if (nuevaPagina === pagina) return
      setCargando(true)
      setPagina(nuevaPagina)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [pagina]
  )

  const recargar = useCallback(() => {
    setCargando(true)
    setRecargas((n) => n + 1)
  }, [])

  return { posts, paginacion, cargando, error, pagina, eliminar, cambiarPagina, recargar }
}
