const express = require('express')
const configPackage = require('config')  
const miConfig = require('./config')     

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor funcionando',
    entorno: miConfig.entorno,
    appNombre: configPackage.get('app.nombre'),
    puerto: configPackage.get('app.puerto'),
    db: configPackage.get('db.url')
  })
})

const puerto = configPackage.get('app.puerto')

app.listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}`)
  console.log(`App: ${configPackage.get('app.nombre')}`)
  console.log(`DB: ${configPackage.get('db.url')}`)
})