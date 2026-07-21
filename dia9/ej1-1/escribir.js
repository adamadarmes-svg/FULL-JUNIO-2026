const fs = require('fs')

const mensaje = 'Hola bro'

fs.writeFile('./bro-mensaje.txt', mensaje, (err) => {
  if (err) {
    console.log('Error al escribir:', err)
    return
  }
  console.log('Archivo creado: bro-mensaje.txt')
})