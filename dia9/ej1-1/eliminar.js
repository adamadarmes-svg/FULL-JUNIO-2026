const fs = require('fs')

fs.unlink('./bro-mensaje.txt', (err) => {
  if (err) {
    console.log('Error al eliminar:', err)
    return
  }
  console.log('Archivo eliminado.')
})