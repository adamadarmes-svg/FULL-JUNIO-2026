import { LIMITES, TIPOS_IMAGEN } from './constantes'

export function validarArchivo(file) {
  if (!file) {
    return { valido: false, error: 'No se ha seleccionado ningún archivo' }
  }
  if (!TIPOS_IMAGEN.includes(file.type)) {
    return { valido: false, error: 'Formato no permitido. Usa JPG, PNG, WEBP o GIF' }
  }
  if (file.size > LIMITES.IMAGEN_MB * 1024 * 1024) {
    return { valido: false, error: `La imagen no puede superar los ${LIMITES.IMAGEN_MB} MB` }
  }
  return { valido: true, error: null }
}

export function comprimirABase64(file, maxAncho = 1000, calidad = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))

    reader.onload = () => {
      const img = new Image()

      img.onerror = () => reject(new Error('El archivo no es una imagen válida'))

      img.onload = () => {
        try {
          const escala = img.width > maxAncho ? maxAncho / img.width : 1
          const ancho = Math.round(img.width * escala)
          const alto = Math.round(img.height * escala)

          const canvas = document.createElement('canvas')
          canvas.width = ancho
          canvas.height = alto

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Tu navegador no permite procesar imágenes'))
            return
          }

          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, ancho, alto)
          ctx.drawImage(img, 0, 0, ancho, alto)

          resolve(canvas.toDataURL('image/jpeg', calidad))
        } catch {
          reject(new Error('No se pudo comprimir la imagen'))
        }
      }

      img.src = reader.result
    }

    reader.readAsDataURL(file)
  })
}

export function tamanoBase64EnKB(cadena) {
  if (!cadena) return 0
  const datos = cadena.includes(',') ? cadena.split(',')[1] : cadena
  const relleno = datos.endsWith('==') ? 2 : datos.endsWith('=') ? 1 : 0
  const bytes = (datos.length * 3) / 4 - relleno
  return Math.round(bytes / 1024)
}
