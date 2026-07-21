const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

router.get('/publico', (req, res) => {
  res.json({ mensaje: 'Esta ruta es pública' })
})

router.get('/privado', auth, (req, res) => {
  res.json({ mensaje: 'Acceso concedido' })
})

router.get('/error', (req, res, next) => {
  next(new Error('Este es un error'))
})

module.exports = router