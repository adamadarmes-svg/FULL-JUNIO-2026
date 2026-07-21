const fs = require('fs')

fs.readFile('./bro-mensaje.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('Error al leer:', err)
    return
  }
  console.log('Contenido:', data)
})