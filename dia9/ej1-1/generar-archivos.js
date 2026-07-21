const fs = require('fs')
const path = require('path')

const carpeta = './archivos-prueba'

const pequeno = 'La prueba bro.\n'.repeat(30)
fs.writeFileSync(path.join(carpeta, 'pequeno-bro.txt'), pequeno)
console.log('Creado: pequeno-bro.txt')

const mediano = 'Mediano bro.\n'.repeat(10000)
fs.writeFileSync(path.join(carpeta, 'mediano-bro.txt'), mediano)
console.log('Creado: mediano-bro.txt')

let grande = ''
for (let i = 0; i < 10000; i++) {
  grande += 'X'.repeat(1000) + '\n'
}
fs.writeFileSync(path.join(carpeta, 'grande-bro.txt'), grande)
console.log('Creado: grande-bro.txt (~10 MB)')