const express = require('express')
const fs      = require('fs')
const path    = require('path')

const app = express()
app.use(express.json()) 

const CARPETA = path.join(__dirname, 'archivos')

app.get('/archivo/:nombre', (req, res) => {
  const ruta = path.join(CARPETA, req.params.nombre)

  fs.readFile(ruta, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'Archivo no encontrado' })
    res.json({ archivo: req.params.nombre, contenido: data })
  })
})

app.post('/archivo/:nombre', (req, res) => {
  const ruta      = path.join(CARPETA, req.params.nombre)
  const contenido = req.body.contenido

  if (!contenido) return res.status(400).json({ error: 'Falta el campo "contenido" en el body' })

  fs.writeFile(ruta, contenido, (err) => {
    if (err) return res.status(500).json({ error: 'No se pudo crear el archivo' })
    res.status(201).json({ mensaje: `Archivo "${req.params.nombre}" creado` })
  })
})

app.delete('/archivo/:nombre', (req, res) => {
  const ruta = path.join(CARPETA, req.params.nombre)

  fs.unlink(ruta, (err) => {
    if (err) return res.status(404).json({ error: 'Archivo no encontrado' })
    res.json({ mensaje: `Archivo "${req.params.nombre}" eliminado` })
  })
})

app.listen(3000, () => {
  console.log('API express en http://localhost:3000')
})