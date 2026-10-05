import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LIMITES } from '../../lib/constantes'
import Alerta from '../ui/Alerta'
import Boton from '../ui/Boton'
import Campo from '../ui/Campo'
import ImageInput from '../ui/ImageInput'

export default function PostForm({ postInicial, onEnviar, textoBoton = 'Publicar', titulo }) {
  const navigate = useNavigate()
  const tituloRef = useRef(null)
  const contenidoRef = useRef(null)

  const [imagen, setImagen] = useState(postInicial?.imagen ?? null)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    tituloRef.current?.focus()
  }, [])

  const fallar = (campo, mensaje, ref) => {
    setError({ campo, mensaje })
    ref?.current?.focus()
    return false
  }

  const validar = ({ titulo: t, contenido }) => {
    if (t.length < LIMITES.TITULO_MIN || t.length > LIMITES.TITULO_MAX) {
      return fallar('titulo', `El título necesita entre ${LIMITES.TITULO_MIN} y ${LIMITES.TITULO_MAX} caracteres`, tituloRef)
    }
    if (contenido.length < LIMITES.CONTENIDO_MIN || contenido.length > LIMITES.CONTENIDO_MAX) {
      return fallar(
        'contenido',
        `El contenido necesita entre ${LIMITES.CONTENIDO_MIN} y ${LIMITES.CONTENIDO_MAX} caracteres`,
        contenidoRef
      )
    }
    if (!imagen) return fallar('imagen', 'Añade una imagen de portada')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      titulo: tituloRef.current.value.trim(),
      contenido: contenidoRef.current.value.trim(),
      imagen,
    }

    if (!validar(datos)) return

    setError(null)
    setEnviando(true)
    try {
      await onEnviar(datos)
    } catch (err) {
      setError({ campo: null, mensaje: err.message })
      setEnviando(false)
    }
  }

  const errorDe = (campo) => (error?.campo === campo ? error.mensaje : undefined)

  return (
    <div className="mx-auto max-w-2xl">
      {titulo && <h1 className="mb-10 font-serif text-5xl">{titulo}</h1>}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
        {error && !error.campo && <Alerta mensaje={error.mensaje} onCerrar={() => setError(null)} />}

        <Campo
          etiqueta="Título"
          nombre="titulo"
          placeholder="Un título claro y directo"
          inputRef={tituloRef}
          maxLength={LIMITES.TITULO_MAX}
          defaultValue={postInicial?.titulo ?? ''}
          error={errorDe('titulo')}
        />

        <Campo
          etiqueta="Contenido"
          nombre="contenido"
          placeholder="Tu reseña, tu análisis o tu teoría sobre el final de esa serie…"
          inputRef={contenidoRef}
          textarea
          filas={14}
          maxLength={LIMITES.CONTENIDO_MAX}
          defaultValue={postInicial?.contenido ?? ''}
          ayuda={`Hasta ${LIMITES.CONTENIDO_MAX} caracteres. Los saltos de línea se respetan.`}
          error={errorDe('contenido')}
        />

        <div>
          <ImageInput
            onCambio={(base64) => {
              setImagen(base64)
              if (base64 && error?.campo === 'imagen') setError(null)
            }}
            valorInicial={postInicial?.imagen ?? null}
            requerida
          />
          {errorDe('imagen') && <p className="mt-2 text-xs text-red-600">{errorDe('imagen')}</p>}
        </div>

        <div className="flex justify-end gap-3 border-t border-stone-200 pt-8">
          <Boton variante="fantasma" onClick={() => navigate(-1)} deshabilitado={enviando}>
            Cancelar
          </Boton>
          <Boton tipo="submit" cargando={enviando}>
            {textoBoton}
          </Boton>
        </div>
      </form>
    </div>
  )
}
