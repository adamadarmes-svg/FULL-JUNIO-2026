const fs = require('fs')
const path = require('path')

function leerConStream(nombreArchivo) {
  const ruta = path.join('./archivos-prueba', nombreArchivo)
  console.log(`\nLeyendo: ${nombreArchivo}`)
  const inicio = Date.now()

  const readStream = fs.createReadStream(ruta)
  let bytes = 0
  let chunks = 0

  readStream.on('data', (chunk) => {
    bytes += chunk.length
    chunks++
  })

  readStream.on('end', () => {
    console.log(`  Finalizado en ${Date.now() - inicio} ms`)
    console.log(`  Bytes: ${bytes.toLocaleString()} | Chunks: ${chunks}`)
  })

  readStream.on('error', (err) => {
    console.log(`  Error: ${err.message}`)
  })
}

leerConStream('pequeno-bro.txt')
leerConStream('mediano-bro.txt')
leerConStream('grande-bro.txt')