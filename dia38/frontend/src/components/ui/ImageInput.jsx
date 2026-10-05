import { useRef, useState } from 'react'
import { LIMITES } from '../../lib/constantes'
import { comprimirABase64, tamanoBase64EnKB, validarArchivo } from '../../lib/imagen'
import Spinner from './Spinner'

export default function ImageInput({ onCambio, valorInicial = null, requerida = false }) {
  const inputRef = useRef(null)
  const [vistaPrevia, setVistaPrevia] = useState(valorInicial)
  const [procesando, setProcesando] = useState(false)
  const [error, setError] = useState('')

  const procesarArchivo = async (file) => {
    if (!file) return

    const { valido, error: errorValidacion } = validarArchivo(file)
    if (!valido) return setError(errorValidacion)

    setError('')
    setProcesando(true)
    try {
      const base64 = await comprimirABase64(file)
      setVistaPrevia(base64)
      onCambio?.(base64)
    } catch (err) {
      setError(err.message)
    } finally {
      setProcesando(false)
    }
  }

  const abrirSelector = () => !procesando && inputRef.current?.click()

  const quitar = () => {
    setVistaPrevia(null)
    onCambio?.(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="etiqueta text-stone-500">Portada{requerida && ' *'}</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => {
          procesarArchivo(e.target.files?.[0])
          e.target.value = ''
        }}
        className="hidden"
      />

      {vistaPrevia ? (
        <div className="border border-stone-300 bg-white">
          <img src={vistaPrevia} alt="Vista previa de la portada" className="aspect-video w-full object-cover" />
          <div className="etiqueta flex items-center justify-between px-3 py-2.5 text-stone-500">
            <span>{tamanoBase64EnKB(vistaPrevia)} KB · comprimida</span>
            <div className="flex gap-4">
              <button type="button" onClick={abrirSelector} className="cursor-pointer hover:text-stone-900">
                Cambiar
              </button>
              <button type="button" onClick={quitar} className="cursor-pointer hover:text-red-600">
                Quitar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={abrirSelector}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            procesarArchivo(e.dataTransfer.files?.[0])
          }}
          disabled={procesando}
          className={`flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed bg-white transition-colors hover:border-stone-900 disabled:cursor-not-allowed ${
            error ? 'border-red-600' : 'border-stone-300'
          }`}
        >
          {procesando ? (
            <Spinner texto="Comprimiendo…" />
          ) : (
            <>
              <span className="text-sm text-stone-900">Arrastra una imagen o haz clic para elegirla</span>
              <span className="etiqueta text-stone-500">JPG · PNG · WEBP · GIF — máx. {LIMITES.IMAGEN_MB} MB</span>
            </>
          )}
        </button>
      )}

      <p className={`text-xs ${error ? 'text-red-600' : 'text-stone-500'}`}>
        {error || 'Se comprime automáticamente antes de subirla.'}
      </p>
    </div>
  )
}
